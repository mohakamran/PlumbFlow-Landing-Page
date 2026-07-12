import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Testimonial } from '../types';

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Jenkins',
    role: 'Homeowner, Richmond',
    rating: 4,
    title: 'Fast and professional service',
    review: 'Our hot water heater burst in the middle of the night. Their emergency crew was at our doorstep within 30 minutes, diagnosed the leak, and replaced the valve. Incredibly clean work.',
    date: 'July 2, 2026'
  },
  {
    id: 't2',
    name: 'Robert Miller',
    role: 'Property Manager, Downtown',
    rating: 4,
    title: 'Highly reliable team',
    review: 'They cleared out a stubborn tree root blockage in our main line using hydro-jetting. Upfront pricing, clear communications, and very thorough diagnostic camera check.',
    date: 'June 28, 2026'
  },
  {
    id: 't3',
    name: 'Emily Davis',
    role: 'Resident, Parkside',
    rating: 4,
    title: 'Exceptional leak detection',
    review: 'We had a high water bill but couldn’t locate the water leak. Their specialist used high-tech thermal cameras to find the slab leak under our flooring without tearing up our tile.',
    date: 'June 15, 2026'
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials-section" className="py-12 px-6">
      <div className="max-w-4xl mx-auto text-center space-y-3 mb-10">
        <span className="text-accent-blue text-xs font-extrabold tracking-widest uppercase block">
          Customer Testimonials
        </span>
        <h3 className="font-display text-2xl md:text-3xl font-extrabold text-slate-950">
          What Our Clients Say About Us
        </h3>
        <div className="w-12 h-1 bg-accent-blue/30 mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS_DATA.map((t) => (
          <div
            key={t.id}
            id={`testimonial-card-${t.id}`}
            className="bg-white border border-slate-100 rounded-3xl p-6 shadow-md shadow-slate-100/50 hover:shadow-lg hover:shadow-slate-200/40 transition-all flex flex-col justify-between relative overflow-hidden group"
          >
            {/* Quote Icon Accent */}
            <div className="absolute top-4 right-4 text-slate-100 group-hover:text-blue-50/70 transition-colors">
              <Quote className="w-10 h-10 transform rotate-180" />
            </div>

            <div className="space-y-4 relative z-10">
              {/* Rating Section - exactly 4 gold stars, 1 gray star */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < t.rating
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-200 fill-slate-200'
                    }`}
                  />
                ))}
                <span className="text-xs text-slate-400 font-bold ml-1">4.0 / 5.0</span>
              </div>

              {/* Bold Title */}
              <h4 className="font-display font-extrabold text-[#003366] text-base underline decoration-blue-200 underline-offset-4">
                "{t.title}"
              </h4>

              {/* Customer Review Paragraph */}
              <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-medium">
                {t.review}
              </p>
            </div>

            {/* Author Profile */}
            <div className="flex items-center gap-3 border-t border-slate-100/80 pt-4 mt-6 relative z-10">
              <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-xs text-accent-blue font-display">
                {t.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">{t.name}</span>
                <span className="text-[10px] text-slate-400 block font-medium">{t.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
