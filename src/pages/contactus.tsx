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
        return undefined;
    };

    const validateDate = (date: string): string | undefined => {
        if (!date) return "Please select a travel date.";
        return undefined;
    };

    const todayString = () => new Date().toISOString().split("T")[0];
    const maxDateString = () => {
        const d = new Date();
        d.setFullYear(d.getFullYear() + 5);
        return d.toISOString().split("T")[0];
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitError(null);

        if (formData.website.trim() !== "") return;
        if (Date.now() - formStartTime < 2000) return;

        const crmUrl = import.meta.env.VITE_CRM_URL2;
        if (!crmUrl) {
            setSubmitError("CRM URL is not configured.");
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
                setSubmitError(`Server error ${response.status}`);
                return;
            }

            setSubmitted(true);

        } catch (error: any) {
            // ✅ CORS ERROR HANDLING
            setSubmitError(
                "Cannot reach server. Possible CORS issue. Backend must allow your domain."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-slate-200 px-4">
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

                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>

                {submitError && (
                    <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
                        {submitError}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full border p-3 rounded"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full border p-3 rounded"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>

                </form>

            </motion.div>

        </div>
    );
}