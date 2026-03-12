import React, { useState } from "react"

export default function CareersPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    qualification: "",
    role: "",
    experience: "",
    resume: null,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, files } = e.target

    if (type === "file") {
      setFormData({ ...formData, resume: (files && files[0]) || null })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const cleanedPhone = formData.phone.replace(/\D/g, "").replace(/^0+/, "")
      const phone = cleanedPhone.startsWith("+" as any) ? cleanedPhone : `+${cleanedPhone}`

      const today = new Date()
      const date = today.toISOString().slice(0, 10) // YYYY-MM-DD

      const response = await fetch("https://api.maduratravel.com/api/lead/website", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          phone,
          date,
          enquiry: "Careers",
          email: formData.email,
          nationality: "India",
          destination: `Careers Application - Role: ${formData.role || "N/A"}, Exp: ${formData.experience || "N/A"}`
        }).toString(),
      })

      const text = await response.text()
      if (!response.ok) {
        throw new Error(text || `CRM error: ${response.status}`)
      }

      alert("Application Submitted Successfully!")
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        qualification: "",
        role: "",
        experience: "",
        resume: null,
      })
    } catch (err) {
      console.error(err)
      alert("Failed to submit. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pt-28 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-16">
        
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          We’re Hiring – Join Now!
        </h1>
        <div className="w-16 h-1 bg-red-600 mt-3 mb-10 rounded"></div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-2xl shadow-sm border border-gray-200 space-y-6"
        >

          {/* First + Last Name */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                First Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                required
                placeholder="Enter your first name"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Last Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                required
                placeholder="Enter your last name"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Phone <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              required
              placeholder="+91 9876543210"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="your@email.com"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          {/* Qualification */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Educational Qualification
            </label>
            <input
              type="text"
              name="qualification"
              placeholder="e.g., B.Tech, MBA, etc."
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Role <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="role"
              required
              placeholder="e.g., Travel Consultant, Marketing Executive"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          {/* Experience Level */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Experience Level? <span className="text-red-600">*</span>
            </label>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="experience"
                  value="Fresher"
                  required
                  onChange={handleChange}
                  className="accent-red-600"
                />
                Fresher
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="experience"
                  value="Experienced"
                  required
                  onChange={handleChange}
                  className="accent-red-600"
                />
                Experienced
              </label>
            </div>
          </div>

          {/* Resume Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Upload Resume <span className="text-red-600">*</span>
            </label>

            <input
              type="file"
              name="resume"
              required
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md file:bg-[#cc1715] file:text-white hover:file:bg-red-700"
            />

            <p className="text-xs text-gray-500 mt-2">
              Accepted formats: PDF, DOC, DOCX
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto bg-[#191975] items-center text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}