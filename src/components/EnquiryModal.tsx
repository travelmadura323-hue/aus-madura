import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Calendar, User, Mail, Phone, Briefcase, CheckCircle } from "lucide-react";
import React, { useState } from "react";
import { cn } from "../lib/utils";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Wrapper to provide reCAPTCHA context
export default function EnquiryModalWrapper(props: EnquiryModalProps) {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}>
      <EnquiryModal {...props} />
    </GoogleReCaptchaProvider>
  );
}

function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+61",
    date: "",
    type: "Tours",
    website: "", // honeypot
    source: "",
  });

  const [errors, setErrors] = useState<{ phone?: string; date?: string }>({});
  const [formStartTime] = useState(Date.now());
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ─── Validation helpers ────────────────────────────────────────────────────

  const validatePhone = (phone: string, countryCode: string): string | undefined => {
    const digits = phone.replace(/\D/g, "").replace(/^0+/, "");

    if (!digits) return "Phone number is required.";

    // Min/max digit counts by country code (after stripping leading zero)
    const rules: Record<string, { min: number; max: number; label: string }> = {
      "+61": { min: 9,  max: 9,  label: "Australian numbers must be 9 digits (e.g. 412 345 678)." },
      "+91": { min: 10, max: 10, label: "Indian numbers must be 10 digits." },
      "+1":  { min: 10, max: 10, label: "US/Canada numbers must be 10 digits." },
      "+44": { min: 10, max: 10, label: "UK numbers must be 10 digits." },
    };

    const rule = rules[countryCode];
    if (rule) {
      if (digits.length < rule.min || digits.length > rule.max) return rule.label;
    } else {
      // Generic: 6–15 digits (ITU-T E.164)
      if (digits.length < 6 || digits.length > 15) return "Enter a valid phone number (6–15 digits).";
    }

    return undefined;
  };

  const validateDate = (date: string): string | undefined => {
    if (!date) return "Please select a travel date.";

    const selected = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(selected.getTime())) return "Invalid date.";
    if (selected < today) return "Travel date must be today or in the future.";

    // Cap at 5 years from now
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 5);
    if (selected > maxDate) return "Please choose a date within the next 5 years.";

    return undefined;
  };

  // Returns today's date string in YYYY-MM-DD for the min attribute
  const todayString = (): string => {
    const d = new Date();
    return d.toISOString().split("T")[0];
  };

  // Returns 5-years-from-now string for the max attribute
  const maxDateString = (): string => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 5);
    return d.toISOString().split("T")[0];
  };

  // ─── Field-level live validation ──────────────────────────────────────────

  const handlePhoneChange = (value: string) => {
    setFormData({ ...formData, phone: value });
    const err = validatePhone(value, formData.countryCode);
    setErrors(prev => ({ ...prev, phone: err }));
  };

  const handleCountryCodeChange = (value: string) => {
    setFormData({ ...formData, countryCode: value });
    if (formData.phone) {
      const err = validatePhone(formData.phone, value);
      setErrors(prev => ({ ...prev, phone: err }));
    }
  };

  const handleDateChange = (value: string) => {
    setFormData({ ...formData, date: value });
    const err = validateDate(value);
    setErrors(prev => ({ ...prev, date: err }));
  };

  // ─── Submit ────────────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot spam protection
    if (formData.website.trim() !== "") {
      console.log("Bot detected. Submission blocked.");
      return;
    }

    // Anti-bot timing check
    if (Date.now() - formStartTime < 3000) {
      console.log("Bot detected (too fast).");
      return;
    }

    // Run full validation before submit
    const phoneErr = validatePhone(formData.phone, formData.countryCode);
    const dateErr = validateDate(formData.date);

    if (phoneErr || dateErr) {
      setErrors({ phone: phoneErr, date: dateErr });
      return;
    }

    if (!executeRecaptcha) {
      alert("reCAPTCHA not ready");
      return;
    }

    setIsSubmitting(true);

    try {
      const captchaToken = await executeRecaptcha("enquiry_form");

      const cleanedPhone = formData.phone.replace(/\D/g, "").replace(/^0+/, "");
      const phone = `${formData.countryCode}${cleanedPhone}`;

      const data = {
        name: formData.name,
        email: formData.email,
        phone,
        date: formData.date,
        enquiry: formData.type,
        source: "Global website",
        website: "",
        captchaToken,
      };

      console.log("Sending payload:", data);

      const response = await fetch(import.meta.env.VITE_CRM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
      });

      const text = await response.text();
      console.log("Server response:", text);

      if (!response.ok) throw new Error(`CRM error: ${response.status} ${text ? `- ${text}` : ""}`);

      setSubmittedEmail(formData.email);
      setIsSubmitted(true);

      setFormData({
        name: "",
        email: "",
        phone: "",
        countryCode: "+61",
        date: "",
        type: "Tours",
        website: "",
        source: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 24 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white rounded-3xl mt-10 shadow-2xl border border-slate-100 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary p-8 text-white relative">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 -m-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-3xl font-bold mb-2 text-white">Turn Your Travel Dreams Into Reality</h2>
              <p className="text-white/70 text-sm">Fill in the details and our experts will contact you.</p>
            </div>

            {isSubmitted ? (
              <div className="p-12 text-center flex flex-col items-center space-y-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-2">Thank You!</h3>
                  <p className="text-slate-500">
                    Your enquiry has been received. Our specialists will contact you at{" "}
                    <span className="text-primary font-bold">{submittedEmail}</span> shortly.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-accent"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 space-y-5">

                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      required
                      type="text"
                      placeholder="John Doe"
                      className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      required
                      type="email"
                      placeholder="john@example.com"
                      className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Phone Number
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={formData.countryCode}
                      onChange={(e) => handleCountryCodeChange(e.target.value)}
                      className="bg-slate-50/80 border border-slate-200 rounded-2xl py-3.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="+61">+61 (AU)</option>
                      <option value="+91">+91 (IN)</option>
                      <option value="+1">+1 (US)</option>
                      <option value="+44">+44 (UK)</option>
                    </select>
                    <div className="relative flex-1">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        required
                        type="tel"
                        placeholder="412 345 678"
                        className={cn(
                          "w-full bg-slate-50/80 border rounded-2xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 transition-all",
                          errors.phone
                            ? "border-red-400 focus:ring-red-200"
                            : "border-slate-200 focus:ring-primary/20 focus:border-primary/50"
                        )}
                        value={formData.phone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                      />
                    </div>
                  </div>
                  {errors.phone && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10A8 8 0 1 1 2 10a8 8 0 0 1 16 0zm-7 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1-9a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0V6a1 1 0 0 0-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Date */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Date of Travel
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      required
                      type="date"
                      min={todayString()}
                      max={maxDateString()}
                      className={cn(
                        "w-full bg-slate-50/80 border rounded-2xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 transition-all",
                        errors.date
                          ? "border-red-400 focus:ring-red-200"
                          : "border-slate-200 focus:ring-primary/20 focus:border-primary/50"
                      )}
                      value={formData.date}
                      onChange={(e) => handleDateChange(e.target.value)}
                    />
                  </div>
                  {errors.date && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10A8 8 0 1 1 2 10a8 8 0 0 1 16 0zm-7 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1-9a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0V6a1 1 0 0 0-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.date}
                    </p>
                  )}
                </div>

                {/* Enquiry Type */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Type of Enquiry
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <select
                      className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    >
                      <option value="Air Ticket">Air Ticket</option>
                      <option value="Visa">Visa</option>
                      <option value="Tours">Tours</option>
                      <option value="Forex">Forex</option>
                      <option value="Passport">Passport</option>
                    </select>
                  </div>
                </div>

                {/* Honeypot */}
                <div className="hidden">
                  <input
                    type="text"
                    name="website"
                    autoComplete="off"
                    tabIndex={-1}
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting || !!errors.phone || !!errors.date}
                  className={cn(
                    "w-full bg-accent text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-accent-premium hover:bg-accent/90 transition-all min-h-[52px] touch-manipulation",
                    (isSubmitting || !!errors.phone || !!errors.date) && "opacity-70 cursor-not-allowed"
                  )}
                >
                  {isSubmitting ? "Processing..." : "Submit Enquiry"}
                  {!isSubmitting && <Send className="w-4 h-4" />}
                </button>

              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}