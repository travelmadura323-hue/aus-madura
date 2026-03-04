import React, { useState } from "react"
import { motion } from "motion/react"
import { Send } from "lucide-react"

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    countryCode: "+1",
    subject: "General Inquiry",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formData)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 md:p-12 text-center flex flex-col items-center"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
          <Send className="h-8 w-8 text-primary" />
        </div>
        <h3 className="mt-4 text-xl font-bold text-primary">
          Message Sent!
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Thank you for reaching out. We'll respond within 24 hours.
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card p-8 md:p-12"
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="John Doe"
              className="w-full bg-background border border-primary/30 rounded-xl px-4 py-3 text-primary placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="john@example.com"
              className="w-full bg-background border border-primary/30 rounded-xl px-4 py-3 text-primary placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 1234567890"
              className="w-full bg-background border border-primary/30 rounded-xl px-4 py-3 text-primary placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              Subject
            </label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full bg-background border border-primary/30 rounded-xl px-4 py-3 text-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors appearance-none"
            >
              <option>General Inquiry</option>
              <option>Tour Package Booking</option>
              <option>Customized Trip</option>
              <option>Corporate Travel</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            Message
          </label>
          <textarea
            rows={5}
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Tell us about your dream trip..."
            className="w-full bg-background border border-primary/30 rounded-xl px-4 py-3 text-primary placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
        >
          Send Message <Send size={18} />
        </button>
      </form>
    </motion.div>
  )
}