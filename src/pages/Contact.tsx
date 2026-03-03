import { MapPin, Phone, Mail, Clock } from "lucide-react"
import ContactForm from "../components/ContactForm"




const contactInfo = [
  { icon: MapPin, title: "Our Office", details: ["1-11 Rosa Crescent Castle Hill 2154 NSW, Australia"] },
  { icon: Phone, title: "Phone", details: ["+61 434 500 743"] },
  { icon: Mail, title: "Email", details: ["australia@maduraglobal.com"] },
]

export default function ContactPage() {
  return (
    <div className="pt-28">
      {/* Hero */}
      <div className="bg-primary py-20 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Get in Touch
          </span>
          <h1 className="mt-3 font-serif text-white font-bold text-primary-foreground md:text-5xl">
            Contact Us
          </h1>
          <p className="mt-4 text-white leading-relaxed">
            Have a question or ready to plan your next adventure? Our travel experts are
            here to help create your perfect journey.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Contact Info Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {contactInfo.map((info) => (
            <div
              key={info.title}
              className="rounded-2xl border border-border bg-card p-6 text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10">
                <info.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mt-4 font-semibold text-card-foreground">
                {info.title}
              </h3>
              {info.details.map((detail) => (
                <p key={detail} className="mt-1 text-sm text-muted-foreground">
                  {detail}
                </p>
              ))}
            </div>
          ))}
        </div>
        

        

          {/* Form + Map */}
        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <ContactForm />
          <div className="overflow-hidden rounded-2xl border border-border">
            <iframe
              title="Office location"
              src="https://www.google.com/maps/embed?origin=mfe&pb=!1m2!2m1!1s1-11+Rosa+Crescent+Castle+Hill+2154+NSW+Australia"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 480 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
     </div>

      {/* <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1 space-y-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white">Contact Information</h2>
                <p className="text-zinc-400 leading-relaxed">
                  Have questions about our packages or need a customized itinerary? Reach out to us and our travel experts will get back to you within 24 hours.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="text-emerald-500" size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Our Office</h4>
                    <p className="text-zinc-400 text-sm">Madura Travel Service (P) Ltd,<br />Chennai, Tamil Nadu, India</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="text-emerald-500" size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Phone Number</h4>
                    <p className="text-zinc-400 text-sm">+91 44 2819 1234<br />+91 98400 12345</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="text-emerald-500" size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Email Address</h4>
                    <p className="text-zinc-400 text-sm">info@maduratravel.com<br />support@maduratravel.com</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="text-emerald-500" size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Working Hours</h4>
                    <p className="text-zinc-400 text-sm">Mon - Sat: 9:00 AM - 7:00 PM<br />Sun: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <ContactForm />
            </div>

          </div>
        </div>
      </section> */}
       
    </div>
  )
}