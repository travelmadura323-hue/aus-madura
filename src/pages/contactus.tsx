import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Mail, Phone, Calendar, Briefcase, CheckCircle } from 'lucide-react';
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

    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const todayString = () => new Date().toISOString().split("T")[0];
    const maxDateString = () => {
        const d = new Date();
        d.setFullYear(d.getFullYear() + 5);
        return d.toISOString().split("T")[0];
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitError(null);

        const crmUrl = import.meta.env.VITE_CRM_URL2;
        if (!crmUrl) {
            setSubmitError("CRM URL not configured");
            return;
        }

        setIsSubmitting(true);

        try {
            const payload = {
                name: formData.name,
                phone: formData.phone,
                date: formData.date,
                enquiry: formData.type,
                email: formData.email,
            };

            const response = await fetch(crmUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(payload).toString()
            });

            if (!response.ok) {
                setSubmitError("Server error");
                return;
            }

            setSubmitted(true);

        } catch (error) {
            setSubmitError("CORS issue or server unreachable");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-slate-200">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-10 rounded-3xl shadow-lg text-center"
                >
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold">Enquiry Sent!</h3>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-slate-200 px-4">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl bg-white rounded-3xl shadow-lg p-8"
            >

                <h2 className="text-2xl font-bold mb-4 text-center">Contact Us</h2>

                {submitError && (
                    <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-center">
                        {submitError}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Name */}
                    <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input required type="text" placeholder="John Doe"
                                className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-sm"
                                value={formData.name}
                                onChange={(e) => setFormData(f => ({ ...f, name: e.target.value }))}
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input required type="email" placeholder="john@example.com"
                                className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-sm"
                                value={formData.email}
                                onChange={(e) => setFormData(f => ({ ...f, email: e.target.value }))}
                            />
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Phone Number</label>
                        <div className="flex gap-2">
                            <select
                                className="bg-slate-50 border border-slate-200 rounded-2xl py-3 px-3 text-sm"
                                value={formData.countryCode}
                                onChange={(e) => setFormData(f => ({ ...f, countryCode: e.target.value }))}
                            >
                                <option value="+61">+61</option>
                                <option value="+91">+91</option>
                            </select>

                            <div className="relative flex-1">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input required type="tel"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-sm"
                                    value={formData.phone}
                                    onChange={(e) => setFormData(f => ({ ...f, phone: e.target.value }))}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Date */}
                    <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Date of Travel</label>
                        <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input required type="date"
                                min={todayString()}
                                max={maxDateString()}
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-sm"
                                value={formData.date}
                                onChange={(e) => setFormData(f => ({ ...f, date: e.target.value }))}
                            />
                        </div>
                    </div>

                    {/* Enquiry */}
                    <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Type of Enquiry</label>
                        <div className="relative">
                            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <select
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-sm"
                                value={formData.type}
                                onChange={(e) => setFormData(f => ({ ...f, type: e.target.value }))}
                            >
                                <option value="Tours">Tours</option>
                                <option value="Visa">Visa</option>
                            </select>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white font-bold py-3 rounded-2xl flex justify-center items-center gap-2"
                    >
                        {isSubmitting ? "Processing..." : <>Submit <Send className="w-4 h-4" /></>}
                    </button>

                </form>
            </motion.div>
        </div>
    );
}