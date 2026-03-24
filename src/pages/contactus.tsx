import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Mail, Phone, Calendar, Briefcase, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface FormData {
    name: string;
    email: string;
    phone: string;
    countryCode: string;
    date: string;
    type: string;
    website: string;
}

// ✅ No reCAPTCHA — removed entirely, uses honeypot + timing protection
export default function ContactForm() {
    const [formData, setFormData] = useState<FormData>({
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
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [formStartTime] = useState(Date.now());

    const validatePhone = (phone: string, countryCode: string): string | undefined => {
        const digits = phone.replace(/\D/g, "").replace(/^0+/, "");
        if (!digits) return "Phone number is required.";
        const rules: Record<string, { min: number; max: number; label: string }> = {
            "+61": { min: 9, max: 9, label: "Australian numbers must be 9 digits (e.g. 412 345 678)." },
            "+91": { min: 10, max: 10, label: "Indian numbers must be 10 digits." },
            "+1": { min: 10, max: 10, label: "US/Canada numbers must be 10 digits." },
            "+44": { min: 10, max: 10, label: "UK numbers must be 10 digits." },
            "+65": { min: 8, max: 8, label: "Singapore numbers must be 8 digits." },
            "+60": { min: 9, max: 10, label: "Malaysian numbers must be 9–10 digits." },
            "+84": { min: 9, max: 10, label: "Vietnamese numbers must be 9–10 digits." },
            "+94": { min: 9, max: 9, label: "Sri Lankan numbers must be 9 digits." },
            "+971": { min: 9, max: 9, label: "UAE numbers must be 9 digits." },
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

    const phonePlaceholder = () => {
        const map: Record<string, string> = {
            "+91": "98765 43210", "+61": "412 345 678", "+65": "8123 4567",
            "+44": "7123 456789", "+1": "202 555 0123", "+60": "12 345 6789",
            "+84": "91 234 5678", "+94": "71 234 5678", "+971": "50 123 4567",
        };
        return map[formData.countryCode] || "Enter phone number";
    };

    const handlePhoneChange = (value: string) => {
        setFormData(prev => ({ ...prev, phone: value }));
        setErrors(prev => ({ ...prev, phone: validatePhone(value, formData.countryCode) }));
    };

    const handleCountryCodeChange = (value: string) => {
        setFormData(prev => ({ ...prev, countryCode: value }));
        if (formData.phone) setErrors(prev => ({ ...prev, phone: validatePhone(formData.phone, value) }));
    };

    const handleDateChange = (value: string) => {
        setFormData(prev => ({ ...prev, date: value }));
        setErrors(prev => ({ ...prev, date: validateDate(value) }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitError(null);

        // Honeypot
        if (formData.website.trim() !== "") return;

        // Timing check
        if (Date.now() - formStartTime < 2000) return;

        const phoneErr = validatePhone(formData.phone, formData.countryCode);
        const dateErr = validateDate(formData.date);
        if (phoneErr || dateErr) {
            setErrors({ phone: phoneErr, date: dateErr });
            return;
        }

        const crmUrl = import.meta.env.VITE_CRM_URL2;
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
                phone,
                date: formData.date,
                enquiry: formData.type,
                email: formData.email,
                nationality: "Australia",
                destination: "Website enquiry",
                source: "Global website",
            };




            const response = await fetch(crmUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json, text/plain, */*',
                },
                body: new URLSearchParams(payload).toString()
            });

            const text = await response.text();
            console.log("CRM response status:", response.status);


            if (!response.ok) {
                setSubmitError(`Server error ${response.status}.${text ? ` Details: ${text.substring(0, 200)}` : ""}`);
                return;
            }

            setFormData({ name: '', email: '', phone: '', countryCode: '+61', date: '', type: 'Tours', website: '' });
            setErrors({});
            setSubmitted(true);

        } catch (error: any) {
            console.error("Submit error:", error);
            if (error instanceof TypeError && error.message.toLowerCase().includes("fetch")) {
                setSubmitError("Cannot reach the server. This may be a CORS issue — the backend needs to allow requests from maduraglobal.com.");
            } else {
                setSubmitError(error?.message || "Unexpected error. Please try again.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const FieldError = ({ message }: { message?: string }) =>
        message ? (
            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />{message}
            </p>
        ) : null;

    if (submitted) {
        return (

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-white/70 backdrop-blur-xl"
            >
                {/* Gradient Glow Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />

                {/* Header */}
                <div className="relative p-10 bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-white">
                    <h2 className="text-3xl font-bold mb-2 tracking-tight">
                        Turn Your Travel Dreams Into Reality ✈️
                    </h2>
                    <p className="text-white/70 text-sm">
                        Fill in your details and our experts will contact you shortly.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="relative p-8 space-y-6">

                    {/* Error Banner */}
                    {submitError && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 shadow-sm">
                            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                            <div>
                                <p className="text-sm font-semibold text-red-700">Submission Failed</p>
                                <p className="text-xs text-red-600">{submitError}</p>
                            </div>
                        </div>
                    )}

                    {/* Common Input Style */}
                    {/** Use this class everywhere */}
                    {/** inputClass */}
                    {/** improves UI consistency */}

                    {/* Name */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Full Name
                        </label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition" />
                            <input
                                required
                                type="text"
                                placeholder="John Doe"
                                className="w-full bg-white/80 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                                value={formData.name}
                                onChange={(e) => setFormData(f => ({ ...f, name: e.target.value }))}
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Email Address
                        </label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition" />
                            <input
                                required
                                type="email"
                                placeholder="john@example.com"
                                className="w-full bg-white/80 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                                value={formData.email}
                                onChange={(e) => setFormData(f => ({ ...f, email: e.target.value }))}
                            />
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Phone Number
                        </label>
                        <div className="flex gap-2">
                            <select
                                className="bg-white/80 border border-slate-200 rounded-xl px-3 text-sm shadow-sm focus:ring-2 focus:ring-primary/30"
                                value={formData.countryCode}
                                onChange={(e) => handleCountryCodeChange(e.target.value)}
                            >
                                <option value="+61">+61 (AU)</option>
                                <option value="+91">+91 (IN)</option>
                                <option value="+1">+1 (US)</option>
                                <option value="+44">+44 (UK)</option>
                            </select>

                            <div className="relative flex-1 group">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition" />
                                <input
                                    required
                                    type="tel"
                                    placeholder={phonePlaceholder()}
                                    className="w-full bg-white/80 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-sm shadow-sm focus:ring-2 focus:ring-primary/30 transition-all"
                                    value={formData.phone}
                                    onChange={(e) => handlePhoneChange(e.target.value)}
                                />
                            </div>
                        </div>
                        <FieldError message={errors.phone} />
                    </div>

                    {/* Date */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Date of Travel
                        </label>
                        <div className="relative group">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition" />
                            <input
                                required
                                type="date"
                                min={todayString()}
                                max={maxDateString()}
                                className="w-full bg-white/80 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-sm shadow-sm focus:ring-2 focus:ring-primary/30 transition-all"
                                value={formData.date}
                                onChange={(e) => handleDateChange(e.target.value)}
                            />
                        </div>
                        <FieldError message={errors.date} />
                    </div>

                    {/* Enquiry Type */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Type of Enquiry
                        </label>
                        <div className="relative group">
                            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition" />
                            <select
                                className="w-full bg-white/80 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-sm shadow-sm focus:ring-2 focus:ring-primary/30 appearance-none"
                                value={formData.type}
                                onChange={(e) => setFormData(f => ({ ...f, type: e.target.value }))}
                            >
                                <option value="Air Ticket">Air Ticket</option>
                                <option value="Visa">Visa</option>
                                <option value="Tours">Tours</option>
                                <option value="Forex">Forex</option>
                                <option value="Passport">Passport</option>
                            </select>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isSubmitting || !!errors.phone || !!errors.date}
                        className="w-full bg-gradient-to-r from-accent to-accent/80 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                        {isSubmitting ? (
                            "Processing..."
                        ) : (
                            <>
                                Submit Enquiry
                                <Send className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>
            </motion.div>
        );

    }
}