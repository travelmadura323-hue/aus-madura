import { motion } from 'framer-motion';
import { Building2, Users, Briefcase, Award, Globe, CheckCircle2 } from 'lucide-react';

export default function MICE() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center overflow-hidden">
        <img
          src="https://picsum.photos/seed/mice-hero/1920/1080"
          alt="MICE Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">MICE Services</h1>
            <p className="text-xl text-slate-300 max-w-2xl">
              Meetings, Incentives, Conferences, and Exhibitions. We deliver world-class corporate travel and event management solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Our Corporate Solutions</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              From small executive meetings to large-scale international conferences, we handle every detail with precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Users className="w-10 h-10 text-accent" />, title: 'Meetings', desc: 'Seamlessly organized corporate meetings in premium venues worldwide.' },
              { icon: <Award className="w-10 h-10 text-accent" />, title: 'Incentives', desc: 'Reward your top performers with unforgettable luxury travel experiences.' },
              { icon: <Briefcase className="w-10 h-10 text-accent" />, title: 'Conferences', desc: 'End-to-end management of large-scale professional conferences.' },
              { icon: <Building2 className="w-10 h-10 text-accent" />, title: 'Exhibitions', desc: 'Strategic planning and execution of trade shows and exhibitions.' }
            ].map((service, idx) => (
              <div key={idx} className="bg-secondary p-8 rounded-2xl border border-slate-100 hover:shadow-xl transition-all">
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-4">{service.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why MICE with us */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">Why Choose Our MICE Services?</h2>
              <div className="space-y-6">
                {[
                  'Global network of premium hotel partners and venues',
                  'Dedicated corporate account managers',
                  'Cost-effective solutions without compromising quality',
                  '24/7 on-ground support for all events',
                  'Advanced event technology and registration systems'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <CheckCircle2 className="w-6 h-6 text-accent" />
                    <span className="text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://picsum.photos/seed/m1/400/500" className="rounded-2xl h-80 w-full object-cover" />
              <img src="https://picsum.photos/seed/m2/400/500" className="rounded-2xl h-80 w-full object-cover mt-12" />
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry */}
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold text-primary mb-6">Request a Proposal</h2>
              <p className="text-slate-500 mb-10 text-lg">
                Tell us about your upcoming corporate event, and our MICE experts will get back to you with a customized proposal within 24 hours.
              </p>
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                <h4 className="font-bold text-primary mb-4">Trusted by Leading Brands</h4>
                <div className="grid grid-cols-3 gap-8 opacity-50 grayscale">
                  <div className="h-12 bg-slate-200 rounded" />
                  <div className="h-12 bg-slate-200 rounded" />
                  <div className="h-12 bg-slate-200 rounded" />
                </div>
              </div>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center justify-center text-center">
              <Briefcase className="w-16 h-16 text-accent mb-6" />
              <h3 className="text-2xl font-bold text-primary mb-4">Corporate Proposal Request</h3>
              <p className="text-slate-500 mb-8">Click the button below to open our corporate enquiry form.</p>
              <button 
                onClick={() => {
                  const btn = document.querySelector('button[onClick*="setIsEnquiryModalOpen(true)"]') as HTMLButtonElement;
                  if (btn) btn.click();
                }}
                className="bg-accent text-white font-bold px-10 py-4 rounded-full hover:bg-primary transition-all shadow-lg shadow-accent/20"
              >
                Request Proposal
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
