// import { MapPin, Phone, Mail, Clock } from "lucide-react"
import ContactForm from "../components/ContactForm"
import { MapPin, Globe, Phone, Mail, Clock } from "lucide-react"





const contactInfo = [
  {
    title: "India Office",
    icon: MapPin,
    details: [
      { label: "Madura Travel Service (P) Ltd,Chennai, Tamil Nadu, India" },
      { label: "+91 9092949494 ", link: "tel:+91 9092949494" },
      { label: "mail@maduratravel.com", link: "mailto:mail@maduratravel.com" },
    ],
  },
  {
    title: "Australia Office",
    icon: Globe,
    details: [
      { label: "1-11 Rosa Crescent, Castle Hill NSW 2154, Australia" },
      { label: "+61 434 500 743", link: "tel:+61 434 500 743" },
      { label: "australia@maduraglobal.com", link: "mailto:australia@maduraglobal.com" },
    ],
  },
];


export default function ContactPage() {
  return (
    <div className="pt-20">

      {/* Hero */}
      <div className="bg-primary py-20 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="text-4xl font-bold text-white">Contact Us</h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">

        {/* Contact Cards */}
        <div className="grid gap-8 md:grid-cols-2">

          {contactInfo.map((info) => (
            <div
              key={info.title}
              className="rounded-2xl border mt-25 border-border bg-card p-8 text-center hover:shadow-lg transition-all duration-300"
            >

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-accent/10">
                <info.icon className="h-7 w-7 text-accent" />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-card-foreground">
                {info.title}
              </h3>

              <div className="mt-4 space-y-2">
                {info.details.map((detail, i) =>
                  detail.link ? (
                    <a
                      key={i}
                      href={detail.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-muted-foreground hover:text-accent transition"
                    >
                      {detail.label}
                    </a>
                  ) : (
                    <p key={i} className="text-sm text-muted-foreground">
                      {detail.label}
                    </p>
                  )
                )}
              </div>

            </div>
          ))}

        </div>

        {/* Form + Map */}
        <div className="mt-16 grid gap-10 lg:grid-cols-2"> <ContactForm /> <div className="overflow-hidden rounded-2xl border border-border"> <iframe title="Office location" src="https://www.google.com/maps/embed?origin=mfe&pb=!1m2!2m1!1s1-11+Rosa+Crescent+Castle+Hill+2154+NSW+Australia" width="100%" height="100%" style={{ border: 0, minHeight: 480 }} allowFullScreen loading="lazy" />
        </div>
        </div>
      </div>
    </div>
  )
}