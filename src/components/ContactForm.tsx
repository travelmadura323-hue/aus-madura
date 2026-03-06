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
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    countryCode: '+61',
    date: '',
    type: 'tours',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: "43dd3943-e03b-40eb-af68-3a2618020a2e", // Web3Forms Access Key
          subject: `Contact Form Enquiry: ${formData.type} from ${formData.name}`,
          from_name: "Madura Travel Contact Form",
          name: formData.name,
          email: formData.email,
          phone: `${formData.countryCode} ${formData.phone}`,
          travel_date: formData.date,
          enquiry_type: formData.type,
          recipient: "travelmadura323@gmail.com"
        })
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Error sending message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <h2 className="text-3xl font-bold text-white mb-2">Enquiry Form</h2>
        <p className="text-white/60 text-sm">Fill in the details and our experts will contact you.</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-8 space-y-5">

        {/* Full Name */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Full Name</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              required
              type="text"
              placeholder="John Doe"
              className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-accent transition-colors"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              required
              type="email"
              placeholder="john@example.com"
              className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-accent transition-colors"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Phone Number</label>
          <div className="flex gap-2">
            <select
              className="bg-slate-50 border border-slate-100 rounded-xl py-3 px-2 text-xs focus:outline-none focus:border-accent"
              value={formData.countryCode}
              onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
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
                placeholder={
                  formData.countryCode === '+91' ? '98765 43210' :
                    formData.countryCode === '+61' ? '0412 345 678' :
                      formData.countryCode === '+65' ? '8123 4567' :
                        formData.countryCode === '+44' ? '7123 456789' :
                          formData.countryCode === '+1' ? '202 555 0123' :
                            'Enter phone number'
                }
                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-accent transition-colors"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Date of Travel */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Date of Travel</label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              required
              type="date"
              className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-accent transition-colors"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>
        </div>

        {/* Type of Enquiry */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Type of Enquiry</label>
          <div className="relative">
            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select
              className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-accent appearance-none transition-colors"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="air-ticket">Air Ticket</option>
              <option value="visa">Visa</option>
              <option value="tours">Tours</option>
              <option value="forex">Forex</option>
              <option value="passport">Passport</option>
            </select>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "w-full bg-accent text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-accent/20",
            isSubmitting && "opacity-70 cursor-not-allowed"
          )}
        >
          {isSubmitting ? "Processing..." : "Submit Enquiry"}
          {!isSubmitting && <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
        </button>
      </form>
    </motion.div>
  );
}