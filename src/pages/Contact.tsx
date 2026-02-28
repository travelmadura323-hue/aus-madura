import { MapPin, Phone, Mail } from "lucide-react"


const contactInfo = [
  { icon: MapPin, title: "Our Office", details: ["1-11 Rosa Crescent Castle Hill 2154 NSW, Australia"] },
  { icon: Phone, title: "Phone", details: ["+61 434 500 743"] },
  { icon: Mail, title: "Email", details: ["guru@maduraglobal.com"] },
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
          <h1 className="mt-3 font-serif text-4xl font-bold text-primary-foreground md:text-5xl">
            Contact Us
          </h1>
          <p className="mt-4 text-primary-foreground/70 leading-relaxed">
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
          {/* <ContactForm /> */}

          <div className="overflow-hidden rounded-2xl border border-border">
            <iframe
              title="Office location"
              src="https://www.google.com/maps?q=1-11+Rosa+Crescent+Castle+Hill+2154+NSW+Australia&output=embed"
              width="100%"
              height="480"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>
    // </div>
  )
}