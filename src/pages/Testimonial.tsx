import React from "react"
import { Star } from "lucide-react"
import { image } from "framer-motion/client";

const cel = import.meta.glob('/images/celebrity/*.{png,jpg,jpeg,svg}', {
  eager: true,
  import: 'default',
});
const gal = import.meta.glob('/images/*.{png,jpg,jpeg,svg}', {
  eager: true,
  import: 'default',
});



const testimonials = [
  {
    name: "Mr.YB Wong Hon Wai",
    Designation: "Minister of Tourism, Malaysia",
    rating:5,
    text: "I'm Happy For the Arrangement by the Madura Travel Service For past two weeks.I have the opportunityto travel to a few places an interesting Attraction one other the Unesco monuments Chennai .I m happy with the services rendered Thank you",
    image: gal["/images/YB.jpg"] as string
  },
  {
    name: "Mr. Anbil Mahesh",
    designation: "Minister for Education - Government of Tamilnadu",
    rating: 5,
    image: cel["/images/celebrity/Anbil mahesh.jpg"] as string,
    text: "I extend my heartfelt thanks to the entire Madura Travel Service team for their professional assistance in organizing international trips for the students of Tamil Nadu's government schools, helping them realize their dreams. Traveling with the students made me feel like a young boy again, as I thoroughly enjoyed the beautifully planned tours to destinations like Singapore, Malaysia, Japan, South Korea, and more. Kudos to Madura Travel Service for their incredible efforts."
  },
  {
    name: "Mr. Napoleon",
    designation: "Cine Actor & Politician",
    rating: 5,
    image: cel["/images/celebrity/nepolean.jpg"] as string,
    text: "Mr. Sriharan Balan and his exceptional team provided seamless service, taking on the monumental task of organizing my son’s wedding in Tokyo, Japan, in November 2024, with absolute ease. Every guest was treated like a VIP from start to finish, ensuring a memorable and stress-free experience for all involved."
  },
  {
    name: "Mr. Kamal Haasan",
    designation: "Cine Actor & Director",
    rating: 5,
    image: cel["/images/celebrity/Kamalhasan.jpg"] as string,
    text: "Mr. V.K.T. Balan was more than just a travel consultant; he was a cherished friend and pillar of support throughout my decades-long journey in cinema, right from my early days. His guidance and expertise enriched numerous travel programs and shoots. I extend my heartfelt wishes for continued success and prosperity to his entire team."
  },
  {
    name: "Mr. Venkatesh Bhat",
    designation: "TCDC Fame & CEO, Accord Hotels",
    rating: 5,
    image: cel["/images/celebrity/Venkatesh-Bhat.jpg"] as string,
    text: "My long-standing association with Madura Travel Service has made my global travels seamless and stress-free. Their expertise in handling visas ensures timely approvals without any delays, making them my trusted travel partner. Truly exceptional service every time!"
  },
  {
    name: "Mrs. P. Susheela",
    designation: "Legendary Singer",
    rating: 5,
    image: cel["/images/celebrity/susheela.jpg"] as string,
    text: "My journey with Madura Travel Service began when Mr. VKT Balan helped me obtain my first passport. Since then, he has been a constant support, helping me travel the world and share my voice globally. He is like a son to me, and Madura Travel Service feels like family."
  },
  {
    name: "Mr. Sandy",
    designation: "Dance Master",
    rating: 5,
    image: cel['/images/celebrity/sandy.jpg'] as string,
    text: "Mr. Sriharan Balan has been a tremendous support during my international shows. His professional team is always available 24/7, ensuring that my travel experiences are smooth and enjoyable. I truly appreciate their dedication and commitment to making every journey a seamless and positive experience"
  },
  {
    name: "Mr.Vijay",
    rating:5,
    text: "We had a wonderful experience for our Sri Lanka trip. All arrangements were seamless and Mr. Sudharsan ensured we were comfortable throughout.",
    image: gal["/images/v.png"] as string
  },
  {
    name: "Hariharan Balasubramanian",
    rating:5,
    text: "Systematic and careful VISA processing. Timely updates were provided and my family is delighted with the customer service.",
  image: gal["/images/hari.png"] as string
  },
  {
    name: "Subhashini Srivatsan",
    rating:5,
    text: "Excellent, personalised, professional and patient service by Ms. Deepa and her team.",
  image: gal["/images/suba.png"] as string
  },
  {
    name: "Jagadeesh Jayaraman",
    rating:5,
    text: "They understood our requirements perfectly and gave us a well-planned tour. Wonderful coordination and experience!",
    image:"/images/jaga.png"
  }
]

export default function TestimonialsPage() {
  return (
    <div className="pt-28 bg-white min-h-screen">

      {/* HEADER */}
      <div className="bg-[#191975] py-24 text-center text-white">
        <div className="mx-auto max-w-3xl px-6">
          <span className="text-sm font-semibold uppercase tracking-widest text-red-500">
            Happy Travelers
          </span>

          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-white">
            Testimonials
          </h1>

          <p className="mt-6 text-gray-300 leading-relaxed">
            Real stories from real travelers who experienced the Madura Global difference.
          </p>
        </div>
      </div>

      {/* TESTIMONIAL GRID */}
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg transition"
            >
              {/* Stars */}
              <div className="flex gap-1 text-red-500">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-red-500" />
                ))}
              </div>

              {/* Text */}
              <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                “{t.text}”
              </p>

              {/* Profile Section */}
              <div className="mt-6 border-t border-gray-200 pt-4 flex items-center gap-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover shadow-md"
                />

                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {t.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {t.designation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}