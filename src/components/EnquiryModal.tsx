import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Calendar, User, Mail, Phone, Briefcase, CheckCircle, AlertCircle } from "lucide-react";
import React, { useState } from "react";
import { cn } from "../lib/utils";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// ✅ No reCAPTCHA — uses honeypot + timing bot protection instead
export default function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+61",
    date: "",
    type: "Tours",
    website: "", // honeypot
  });
  const [otherType, setOtherType] = useState("");

  const [errors, setErrors] = useState<{ phone?: string; date?: string }>({});
  const [formStartTime] = useState(Date.now());
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validatePhone = (phone: string, countryCode: string): string | undefined => {
    const digits = phone.replace(/\D/g, "").replace(/^0+/, "");
    if (!digits) return "Phone number is required.";
    const rules: Record<string, { min: number; max: number; label: string }> = {
      "+61": { min: 9, max: 9, label: "Australian numbers must be 9 digits (e.g. 412 345 678)." },
      "+91": { min: 10, max: 10, label: "Indian numbers must be 10 digits." },
      "+1": { min: 10, max: 10, label: "US/Canada numbers must be 10 digits." },
      "+44": { min: 10, max: 10, label: "UK numbers must be 10 digits." },
    };
    const rule = rules[countryCode];
    if (rule && (digits.length < rule.min || digits.length > rule.max)) return rule.label;
    if (!rule && (digits.length < 6 || digits.length > 15)) return "Enter a valid phone number (6–15 digits).";
    return undefined;
  };

  const validateDate = (date: string): string | undefined => {
    if (!date) return "Please select a travel date.";
    const selected = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (isNaN(selected.getTime())) return "Invalid date.";
    if (selected < today) return "Travel date must be today or in the future.";
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 5);
    if (selected > maxDate) return "Please choose a date within the next 5 years.";
    return undefined;
  };

  const todayString = () => new Date().toISOString().split("T")[0];
  const maxDateString = () => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 5);
    return d.toISOString().split("T")[0];
  };

  const handlePhoneChange = (value: string) => {
    setFormData(f => ({ ...f, phone: value }));
    setErrors(prev => ({ ...prev, phone: validatePhone(value, formData.countryCode) }));
  };

  const handleCountryCodeChange = (value: string) => {
    setFormData(f => ({ ...f, countryCode: value }));
    if (formData.phone) setErrors(prev => ({ ...prev, phone: validatePhone(formData.phone, value) }));
  };

  const handleDateChange = (value: string) => {
    setFormData(f => ({ ...f, date: value }));
    setErrors(prev => ({ ...prev, date: validateDate(value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Honeypot bot check
    if (formData.website.trim() !== "") return;

    // Timing bot check
    if (Date.now() - formStartTime < 2000) return;

    // Validate fields
    const phoneErr = validatePhone(formData.phone, formData.countryCode);
    const dateErr = validateDate(formData.date);
    if (phoneErr || dateErr) {
      setErrors({ phone: phoneErr, date: dateErr });
      return;
    }

    const crmUrl = import.meta.env.VITE_CRM_URL;
    if (!crmUrl) {
      setSubmitError("CRM URL is not configured. Please contact support.");
      return;
    }

    setIsSubmitting(true);

    try {
      const cleanedPhone = formData.phone.replace(/\D/g, "").replace(/^0+/, "");
      const phone = `${formData.countryCode}${cleanedPhone}`;

      const payload: Record<string, string> = {
        name: formData.name,
        email: formData.email,
        phone,
        date: formData.date,
        enquiry: formData.type === "Other" ? otherType : formData.type,
        source: "Global website",
      };



      const response = await fetch(crmUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json, text/plain, */*",
        },
        body: new URLSearchParams(payload).toString(),
      });

      const text = await response.text();
      console.log("CRM response status:", response.status);


      if (!response.ok) {
        setSubmitError(
          `Server error ${response.status}.${text ? ` Details: ${text.substring(0, 200)}` : ""}`
        );
        return;
      }

      // ✅ Success
      setSubmittedEmail(formData.email);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", countryCode: "+61", date: "", type: "Tours", website: "" });
      setErrors({});

    } catch (error: any) {
      console.error("Submission error:", error);
      if (error instanceof TypeError && error.message.toLowerCase().includes("fetch")) {
        setSubmitError(
          "Cannot reach the server. This may be a CORS issue — ask your backend team to allow requests from maduraglobal.com."
        );
      } else {
        setSubmitError(error?.message || "Unexpected error. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 24 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
            {/* Header */}
            <div className="bg-primary p-5 text-white relative">
              <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-3xl font-bold mb-1 text-white">Turn Your Travel Dreams Into Reality</h2>
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
                <button onClick={onClose} className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-accent transition-colors">
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-5 space-y-3">

                {/* Error Banner */}
                {submitError && (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-red-700 mb-1">Submission Failed</p>
                      <p className="text-xs text-red-600">{submitError}</p>
                    </div>
                  </div>
                )}

                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input required type="text" placeholder="John Doe"
                      className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData(f => ({ ...f, name: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input required type="email" placeholder="john@example.com"
                      className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                      value={formData.email}
                      onChange={(e) => setFormData(f => ({ ...f, email: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Phone Number</label>
                  <div className="flex gap-2">
                    <select value={formData.countryCode} onChange={(e) => handleCountryCodeChange(e.target.value)}
                      className="bg-slate-50/80 border border-slate-200 rounded-2xl py-3.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="+61">+61 (AU)</option>
                      <option value="+91">+91 (IN)</option>
                      <option value="+1">+1 (US)</option>
                      <option value="+44">+44 (UK)</option>
                      <option value="+65">+65 (SG) </option>
                      <option value="+971">+971 (AE) </option>

                    </select>
                    <div className="relative flex-1">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input required type="tel" placeholder="412 345 678"
                        className={cn("w-full bg-slate-50/80 border rounded-2xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 transition-all",
                          errors.phone ? "border-red-400 focus:ring-red-200" : "border-slate-200 focus:ring-primary/20 focus:border-primary/50")}
                        value={formData.phone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                      />
                    </div>
                  </div>
                  {errors.phone && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />{errors.phone}
                    </p>
                  )}
                </div>

                {/* Date */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Date of Travel</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input required type="date" min={todayString()} max={maxDateString()}
                      className={cn("w-full bg-slate-50/80 border rounded-2xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 transition-all",
                        errors.date ? "border-red-400 focus:ring-red-200" : "border-slate-200 focus:ring-primary/20 focus:border-primary/50")}
                      value={formData.date}
                      onChange={(e) => handleDateChange(e.target.value)}
                    />
                  </div>
                  {errors.date && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />{errors.date}
                    </p>
                  )}
                </div>

                {/* Enquiry Type */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Type of Enquiry</label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <select
                      className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
                      value={formData.type}
                      onChange={(e) => setFormData(f => ({ ...f, type: e.target.value }))}
                    >
                      <option value="Air Ticket">Air Ticket</option>
                      <option value="Visa">Visa Services</option>
                      <option value="Tour Packages">Tour Packages</option>
                      <option value="Transport">Transport Booking</option>
                      <option value="Other">Other</option>

                    </select>
                  </div>
                  {formData.type === "Other" && (
                    <div className="mt-3">
                      <input
                        type="text"
                        placeholder="Enter your enquiry type"
                        className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl py-3.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
                        value={otherType}
                        onChange={(e) => setOtherType(e.target.value)}
                        required
                      />
                    </div>
                  )}
                </div>

                {/* Honeypot — hidden from humans, visible to bots */}
                <div className="hidden" aria-hidden="true">
                  <input type="text" name="website" autoComplete="off" tabIndex={-1}
                    value={formData.website}
                    onChange={(e) => setFormData(f => ({ ...f, website: e.target.value }))}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting || !!errors.phone || !!errors.date}
                  className={cn(
                    "w-full bg-accent text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-accent/90 transition-all min-h-[52px] touch-manipulation",
                    (isSubmitting || !!errors.phone || !!errors.date) && "opacity-70 cursor-not-allowed"
                  )}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <>Submit Enquiry <Send className="w-4 h-4" /></>
                  )}
                </button>

              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}