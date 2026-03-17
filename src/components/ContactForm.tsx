import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Mail, Phone, Calendar, Briefcase, CheckCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

interface FormData {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  date: string;
  type: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData & { website: string }>({
    name: '',
    email: '',
    phone: '',
    countryCode: '+61',
    date: '',
    type: 'Tours',
    website: ''
  });

  const [errors, setErrors] = useState<{ phone?: string; date?: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  // ─── Validation helpers ────────────────────────────────────────────────────

  const validatePhone = (phone: string, countryCode: string): string | undefined => {
    const digits = phone.replace(/\D/g, "").replace(/^0+/, "");
    if (!digits) return "Phone number is required.";

    const rules: Record<string, { min: number; max: number; label: string }> = {
      "+61": { min: 9,  max: 9,  label: "Australian numbers must be 9 digits (e.g. 412 345 678)." },
      "+91": { min: 10, max: 10, label: "Indian numbers must be 10 digits." },
      "+1":  { min: 10, max: 10, label: "US/Canada numbers must be 10 digits." },
      "+44": { min: 10, max: 10, label: "UK numbers must be 10 digits." },
      "+65": { min: 8,  max: 8,  label: "Singapore numbers must be 8 digits." },
      "+60": { min: 9,  max: 10, label: "Malaysian numbers must be 9–10 digits." },
      "+84": { min: 9,  max: 10, label: "Vietnamese numbers must be 9–10 digits." },
      "+94": { min: 9,  max: 9,  label: "Sri Lankan numbers must be 9 digits." },
      "+971":{ min: 9,  max: 9,  label: "UAE numbers must be 9 digits." },
    };

    const rule = rules[countryCode];
    if (rule) {
      if (digits.length < rule.min || digits.length > rule.max) return rule.label;
    } else {
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

  // Dynamic placeholder per country code
  const phonePlaceholder = () => {
    const map: Record<string, string> = {
      "+91":  "98765 43210",
      "+61":  "412 345 678",
      "+65":  "8123 4567",
      "+44":  "7123 456789",
      "+1":   "202 555 0123",
      "+60":  "12 345 6789",
      "+84":  "91 234 5678",
      "+94":  "71 234 5678",
      "+971": "50 123 4567",
    };
    return map[formData.countryCode] || "Enter phone number";
  };

  // ─── Live field handlers ───────────────────────────────────────────────────

  const handlePhoneChange = (value: string) => {
    setFormData(prev => ({ ...prev, phone: value }));
    setErrors(prev => ({ ...prev, phone: validatePhone(value, formData.countryCode) }));
  };

  const handleCountryCodeChange = (value: string) => {
    setFormData(prev => ({ ...prev, countryCode: value }));
    if (formData.phone) {
      setErrors(prev => ({ ...prev, phone: validatePhone(formData.phone, value) }));
    }
  };

  const handleDateChange = (value: string) => {
    setFormData(prev => ({ ...prev, date: value }));
    setErrors(prev => ({ ...prev, date: validateDate(value) }));
  };

  // ─── Submit ────────────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.website.trim() !== "") {
      console.log("Bot detected (honeypot)");
      return;
    }

    // Full validation on submit
    const phoneErr = validatePhone(formData.phone, formData.countryCode);
    const dateErr = validateDate(formData.date);
    if (phoneErr || dateErr) {
      setErrors({ phone: phoneErr, date: dateErr });
      return;
    }

    if (!executeRecaptcha) {
      console.log("Recaptcha still loading...");
      alert("Security check not ready. Please wait a moment and try again.");
      return;
    }

    const token = await executeRecaptcha("contact_form");
    if (!token) {
      alert("Captcha failed. Try again.");
      return;
    }

    setIsSubmitting(true);

    try {
      const cleanedPhone = formData.phone.replace(/\D/g, "").replace(/^0+/, "");
      const phone = `${formData.countryCode}${cleanedPhone}`;

      const response = await fetch(import.meta.env.VITE_CRM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          name: formData.name,
          phone,
          date: formData.date,
          enquiry: formData.type,
          email: formData.email,
          nationality: "Australia",
          destination: "Website enquiry",
          captchaToken: token
        }).toString()
      });

      if (!response.ok) throw new Error("Submission failed");

      setFormData({
        name: '', email: '', phone: '', countryCode: '+61',
        date: '', type: 'Tours', website: ''
      });
      setErrors({});
      setSubmitted(true);

    } catch (error) {
      console.error(error);
      alert("Error sending message");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Error message component ───────────────────────────────────────────────

  const FieldError = ({ message }: { message?: string }) =>
    message ? (
      <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
        <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10A8 8 0 1 1 2 10a8 8 0 0 1 16 0zm-7 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1-9a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0V6a1 1 0 0 0-1-1z" clipRule="evenodd" />
        </svg>
        {message}
      </p>
    ) : null;

  // ─── Success state ─────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-lg border border-slate-100 p-12 text-center flex flex-col items-center justify-center min-h-[400px]"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-primary mb-3">Enquiry Sent!</h3>
        <p className="text-slate-500 max-w-xs leading-relaxed">
          Thank you for reaching out. Our travel experts will get back to you within 24 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-8 text-sm font-bold text-accent hover:text-primary transition-colors"
        >
          Send another enquiry →
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-primary p-8 text-white">
        <h2 className="text-3xl font-bold text-white mb-2">Turn Your Travel Dreams Into Reality</h2>
        <p className="text-white/60 text-sm">Fill in the details and our experts will contact you.</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-8 space-y-5">

        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
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
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
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
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Phone Number</label>
          <div className="flex gap-2">
            <select
              className="bg-slate-50/80 border border-slate-200 rounded-2xl py-3.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={formData.countryCode}
              onChange={(e) => handleCountryCodeChange(e.target.value)}
            >
              <option value="+61">+61 (AU)</option>
              <option value="+91">+91 (IN)</option>
              <option value="+1">+1 (US)</option>
              <option value="+44">+44 (UK)</option>
              <option value="+65">+65 (SG)</option>
              <option value="+60">+60 (MY)</option>
              <option value="+84">+84 (VN)</option>
              <option value="+94">+94 (LK)</option>
              <option value="+971">+971 (UAE)</option>
            </select>
            <div className="relative flex-1">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                required
                type="tel"
                placeholder={phonePlaceholder()}
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
          <FieldError message={errors.phone} />
        </div>

        {/* Date of Travel */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Date of Travel</label>
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
          <FieldError message={errors.date} />
        </div>

        {/* Type of Enquiry */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Type of Enquiry</label>
          <div className="relative">
            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
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
        <div style={{ display: "none" }}>
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
            "w-full bg-accent text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 group shadow-accent-premium hover:bg-accent/90 min-h-[52px] touch-manipulation",
            (isSubmitting || !!errors.phone || !!errors.date) && "opacity-70 cursor-not-allowed"
          )}
        >
          {isSubmitting ? "Processing..." : "Submit Enquiry"}
          {!isSubmitting && <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
        </button>
      </form>
    </motion.div>
  );
}