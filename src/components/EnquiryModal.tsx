import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Calendar, User, Mail, Phone, Briefcase, CheckCircle } from "lucide-react";
import React, { useState } from "react";
import { cn } from "../lib/utils";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+61",
    date: "",
    type: "Tours",
  });

  const [submittedEmail, setSubmittedEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const cleanedPhone = formData.phone.replace(/\D/g, "").replace(/^0+/, "");
      const phone = `${formData.countryCode}${cleanedPhone}`;

      const data = {
        name: formData.name,
        phone,
        date: formData.date,
        email: formData.email,
        enquiry: formData.type,
        // nationality: "Australia",
        // destination: "Website enquiry"
      };

      console.log("Sending payload:", data);

      const response = await fetch(
        "https://api.maduratravel.com/api/lead/website",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(data).toString(),
        }
      );

      const text = await response.text();
      console.log("Server response:", text);

      if (!response.ok) {
        throw new Error(`CRM error: ${response.status} ${text ? `- ${text}` : ""}`);
      }

      setSubmittedEmail(formData.email);
      setIsSubmitted(true);

      setFormData({
        name: "",
        email: "",
        phone: "",
        countryCode: "+61",
        date: "",
        type: "Tours",
      });
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
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto mt-10"
          >
            {/* Header */}
            <div className="bg-primary p-8 text-white relative">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white/60 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-3xl font-bold mb-2 text-white">
                Turn Your Travel Dreams Into Reality
              </h2>

              <p className="text-white/70 text-sm">
                Fill in the details and our experts will contact you.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-12 text-center flex flex-col items-center space-y-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-primary mb-2">
                    Thank You!
                  </h3>

                  <p className="text-slate-500">
                    Your enquiry has been received. Our specialists will contact
                    you at{" "}
                    <span className="text-primary font-bold">
                      {submittedEmail}
                    </span>{" "}
                    shortly.
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
                  <label className="text-xs font-bold text-slate-400 uppercase">
                    Full Name
                  </label>

                  <div className="relative mt-1">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                    <input
                      required
                      type="text"
                      placeholder="John Doe"
                      className="w-full bg-slate-50 border rounded-xl py-3 pl-11 pr-4 text-sm"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">
                    Email Address
                  </label>

                  <div className="relative mt-1">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                    <input
                      required
                      type="email"
                      placeholder="john@example.com"
                      className="w-full bg-slate-50 border rounded-xl py-3 pl-11 pr-4 text-sm"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">
                    Phone Number
                  </label>

                  <div className="flex gap-2 mt-1">
                    <select
                      value={formData.countryCode}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          countryCode: e.target.value,
                        })
                      }
                      className="bg-slate-50 border rounded-xl py-3 px-2 text-xs"
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
                        placeholder="0412 345 678"
                        className="w-full bg-slate-50 border rounded-xl py-3 pl-11 pr-4 text-sm"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">
                    Date of Travel
                  </label>

                  <div className="relative mt-1">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                    <input
                      required
                      type="date"
                      className="w-full bg-slate-50 border rounded-xl py-3 pl-11 pr-4 text-sm"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Enquiry */}
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">
                    Type of Enquiry
                  </label>

                  <div className="relative mt-1">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                    <select
                      className="w-full bg-slate-50 border rounded-xl py-3 pl-11 pr-4 text-sm"
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
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
                  disabled={isSubmitting}
                  className={cn(
                    "w-full bg-accent text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2",
                    isSubmitting && "opacity-70 cursor-not-allowed"
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