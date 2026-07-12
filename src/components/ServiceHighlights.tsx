import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export default function ServiceHighlights() {
  const HIGHLIGHTS = [
    {
      title: 'Pipe Repair & Replacement',
      desc: 'Prompt repair of copper repiping, burst pipes, slab leaks, and fitting failures. We restore water flow safely with high-grade components.',
      bullets: ['Copper & PEX piping experts', 'Burst pipe repair & flood prevention', 'Water shutoff valve upgrades']
    },
    {
      title: 'High-Tech Leak Detection',
      desc: 'Acoustic sensing and thermal camera technology to precisely pinpoint hidden wall or sub-slab plumbing leaks without destroying your home.',
      bullets: ['Non-invasive slab leak locating', 'Moisture mapped diagnostics', 'Underground pipe tracking']
    },
    {
      title: 'Hydro-Jet Drain Cleaning',
      desc: 'Clearing tough grease, hair, scale, and intrusive tree roots from your lines using ultra-high-pressure clean-water jet flushing.',
      bullets: ['Complete main line snaking', 'Clog prevention camera audits', 'Kitchen & bath drain restoration']
    }
  ];

  return (
    <section id="services-section" className="py-16 px-6 border-t border-slate-100 bg-slate-50/40">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: White Service Van Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl">
              <img
                src="/src/assets/images/service_van_highlight_1783837646636.jpg"
                alt="Reliable Plumbing Services Service Fleet Van"
                referrerPolicy="no-referrer"
                className="w-full object-cover aspect-[4/3] transform hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              
              {/* Badge Overlay */}
              <div className="absolute bottom-4 left-4 bg-primary-navy text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg border border-blue-900 flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <span>Modern Emergency Fleet on Call</span>
              </div>
            </div>

            {/* Background design elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-100 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-100 rounded-full blur-2xl pointer-events-none animate-pulse-subtle" />
          </div>

          {/* Right Column: Service Highlights Checklist */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            <div className="space-y-3">
              <span className="text-accent-blue text-xs font-extrabold tracking-widest uppercase block">
                Plumbing Service Excellence
              </span>
              <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight">
                Complete Residential & Commercial Care
              </h3>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                From emergency fixes to routine maintenance upgrades, our fully-stocked vans are ready with premium parts to solve your issue on the very first visit.
              </p>
            </div>

            <div className="space-y-6">
              {HIGHLIGHTS.map((item, index) => (
                <div 
                  key={index}
                  id={`service-highlight-${index}`}
                  className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-md hover:shadow-slate-100/60 border border-transparent hover:border-slate-100/50 transition-all"
                >
                  {/* Blue checkmark icon */}
                  <div className="p-1 rounded-full bg-blue-50 text-accent-blue shrink-0 mt-1">
                    <CheckCircle2 className="w-6 h-6 fill-blue-50" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-display font-extrabold text-slate-900 text-base md:text-lg">
                      {item.title}
                    </h4>
                    <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-medium">
                      {item.desc}
                    </p>
                    {/* Nested bullets */}
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1.5 pt-1">
                      {item.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="text-[11px] text-slate-400 font-bold flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
