import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Star, Clock, Sparkles, Flame, CheckCircle2, PhoneCall, ArrowRight, ShieldAlert, Award, ThumbsUp } from 'lucide-react';
import { Testimonial } from '../../types';

interface HomeProps {
  onOpenQuoteModal: () => void;
  setActiveTab: (tab: 'home' | 'services' | 'about' | 'contact') => void;
}

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

export default function Home({ onOpenQuoteModal, setActiveTab }: HomeProps) {
  return (
    <div className="space-y-16 animate-fade-in-up">
      
      {/* Premium Hero Banner Section */}
      <section className="relative bg-gradient-to-br from-[#003366] to-[#0056b3] text-white pt-12 pb-36 md:pt-16 md:pb-48 px-4 md:px-12 overflow-hidden">
        {/* Ambient background blur circles */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent-blue/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-12 left-1/3 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Block: Bold Headline and Direct Call Actions */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            {/* Guarantee Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-900/40 border border-blue-700/30 px-3.5 py-1.5 rounded-full">
              <Sparkles className="w-4 h-4 text-blue-300 animate-pulse shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-100 font-display">
                Top Rated Metro Plumbing Provider
              </span>
              <div className="flex items-center gap-0.5 border-l border-blue-700/50 pl-2 shrink-0">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span className="text-xs font-black text-white">4.9/5</span>
              </div>
            </div>

            {/* Powerful H1 with strict semantic hierarchy */}
            <div className="space-y-4">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
                Reliable Plumbing <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-100 via-blue-200 to-white">
                  Solutions for Your Home
                </span>
              </h1>

              <p className="text-base md:text-lg text-blue-100/90 leading-relaxed max-w-xl">
                Expert pipe repair, smart leak detection, and high-performance drain cleaning. Available 24/7 with zero dispatch fees and a 100% satisfaction guarantee.
              </p>
            </div>

            {/* Primary Calls to Action */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                id="hero-get-quote-btn"
                onClick={onOpenQuoteModal}
                className="px-8 py-4 bg-white hover:bg-blue-50 text-primary-navy font-bold rounded-full text-base tracking-wide shadow-lg shadow-black/15 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-center cursor-pointer font-display animate-pulse-quote"
              >
                Get Free Quote
              </button>

              {/* 45-Min Guaranteed response badge */}
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl">
                <Clock className="w-5 h-5 text-blue-300 shrink-0" />
                <div>
                  <span className="text-xs text-blue-200 block font-bold leading-none">Emergency Service</span>
                  <span className="text-sm text-white font-extrabold block mt-1.5 font-mono">45-Min Arrival Guarantee</span>
                </div>
              </div>
            </div>

            {/* Horizontal Trust Badges */}
            <div className="pt-4 border-t border-blue-900/40 grid grid-cols-3 gap-4 text-xs font-bold text-blue-200">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4.5 h-4.5 text-blue-400 shrink-0" />
                <span>100% Guaranteed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4.5 h-4.5 text-blue-400 shrink-0" />
                <span>Licensed Crew</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4.5 h-4.5 text-blue-400 shrink-0" />
                <span>No Hidden Fees</span>
              </div>
            </div>
          </div>

          {/* Right Block: Clean Plumber Portrait Picture */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-[340px] md:max-w-[360px] aspect-[3/4] rounded-[2.5rem] overflow-hidden border-4 border-white/10 shadow-2xl bg-slate-900/20">
              <div className="absolute inset-0 bg-gradient-to-t from-[#002244]/75 via-transparent to-transparent z-10" />

              <img
                src="/src/assets/images/plumber_hero_portrait_1783837635429.jpg"
                alt="Professional Smiling Plumber Crew member standing proudly in workshop"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />

              {/* Float badge inside image */}
              <div className="absolute bottom-5 left-5 right-5 z-20 bg-white/95 backdrop-blur-md text-slate-900 p-4 rounded-2xl flex items-center gap-3 shadow-lg border border-white/25">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 border border-green-100 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block leading-none">Technician Status</span>
                  <span className="text-xs text-slate-800 font-extrabold block mt-1">David G. (Dispatch Ready)</span>
                </div>
              </div>
            </div>

            {/* Frame geometric decorations */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-r-8 border-b-8 border-blue-400/10 rounded-br-[3rem] pointer-events-none" />
            <div className="absolute -top-6 -left-6 w-32 h-32 border-l-8 border-t-8 border-blue-400/10 rounded-tl-[3rem] pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Main Container Overlaying the Hero */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 -mt-24 md:-mt-32 pb-4">
        <div className="bg-white rounded-[2.5rem] md:rounded-[4rem] shadow-2xl border border-slate-100 p-6 md:p-12 space-y-16">
          
          {/* Quick trust strip inside card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-slate-50 rounded-2xl p-6 border border-slate-100/50">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 text-accent-blue rounded-xl shrink-0 font-display text-xs font-bold">01</div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Select Service</h4>
                <p className="text-xs text-slate-500 mt-1">Pick emergency diagnostic, pipe fix, or custom pipe replacement.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 text-accent-blue rounded-xl shrink-0 font-display text-xs font-bold">02</div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Lock Estimate</h4>
                <p className="text-xs text-slate-500 mt-1">Use our interactive tool to calculate average local quotes.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 text-accent-blue rounded-xl shrink-0 font-display text-xs font-bold">03</div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Rapid Dispatch</h4>
                <p className="text-xs text-slate-500 mt-1">Our GPS-tracked service trucks arrive loaded with repair parts.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 text-accent-blue rounded-xl shrink-0 font-display text-xs font-bold">04</div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Relax & Smile</h4>
                <p className="text-xs text-slate-500 mt-1">All labor and components backed by a 2-Year warranty.</p>
              </div>
            </div>
          </div>

          {/* Trust Building "Why Choose Us" featuring fleet van */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-4">
            {/* Left side: Premium Van Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-[2rem] overflow-hidden border-4 border-white shadow-xl bg-slate-100">
                <img
                  src="/src/assets/images/service_van_highlight_1783837646636.jpg"
                  alt="Fully equipped white plumbing fleet vehicle ready for emergency dispatch"
                  referrerPolicy="no-referrer"
                  className="w-full object-cover aspect-[4/3] transform hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute bottom-4 left-4 bg-[#003366] text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-lg border border-blue-900 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span>On-the-go Mobile Workshop</span>
                </div>
              </div>
            </div>

            {/* Right side: Detailed core benefits */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-accent-blue text-xs font-black tracking-widest uppercase block font-display">
                  Plumbing Service Excellence
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-extrabold text-slate-950 tracking-tight">
                  Why Metro Homeowners Choose Us
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed">
                  We don't believe in surprise hourly charges, messy workspaces, or cutting corners. Our family-owned plumbing firm delivers long-lasting pipe, drain, and heater fixes at upfront flat rates.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100/40 flex gap-3">
                  <Award className="w-5 h-5 text-accent-blue shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm font-display">Certified Masters</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Fully certified and bonded plumbing technicians.</p>
                  </div>
                </div>
                <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100/40 flex gap-3">
                  <ThumbsUp className="w-5 h-5 text-accent-blue shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm font-display">No Overtime Charges</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Flat pricing includes weekends and evenings.</p>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/60 flex gap-3">
                  <Clock className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm font-display">24/7 Priority Hotline</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Always talk to a real local dispatcher, not a bot.</p>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/60 flex gap-3">
                  <ShieldCheck className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm font-display">2-Year Warranty</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Full written workmanship guarantee on every repair.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Services Overview Quick Cards with Click-Through */}
          <section className="space-y-8 pt-4">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
              <div className="space-y-1">
                <span className="text-accent-blue text-xs font-black tracking-widest uppercase block font-display">
                  Our Expertise
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-extrabold text-slate-950 tracking-tight">
                  Professional Solutions Ready to Go
                </h3>
              </div>
              <button 
                onClick={() => {
                  setActiveTab('services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group inline-flex items-center gap-1.5 text-xs font-bold text-accent-blue hover:text-blue-600 transition-colors font-display uppercase tracking-wider"
              >
                <span>View Full Services Guide</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white border border-slate-100 rounded-3xl hover-scale-card text-left space-y-3">
                <div className="w-10 h-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center font-bold">🚨</div>
                <h4 className="font-bold text-slate-900 text-base font-display">Emergency Response</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Clogged sewers, burst lines, and massive overflows can cause thousands in water damage. Call us immediately.
                </p>
                <button
                  onClick={() => handleNavClick('services', setActiveTab)}
                  className="text-xs font-bold text-accent-blue hover:underline"
                >
                  Learn More
                </button>
              </div>

              <div className="p-6 bg-white border border-slate-100 rounded-3xl hover-scale-card text-left space-y-3">
                <div className="w-10 h-10 bg-blue-50 text-accent-blue rounded-xl flex items-center justify-center font-bold">💧</div>
                <h4 className="font-bold text-slate-900 text-base font-display">Leak Detection</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Using state-of-the-art acoustic listeners and thermal imaging to find hidden wall leaks without tearing up drywall.
                </p>
                <button
                  onClick={() => handleNavClick('services', setActiveTab)}
                  className="text-xs font-bold text-accent-blue hover:underline"
                >
                  Learn More
                </button>
              </div>

              <div className="p-6 bg-white border border-slate-100 rounded-3xl hover-scale-card text-left space-y-3">
                <div className="w-10 h-10 bg-green-50 text-green-500 rounded-xl flex items-center justify-center font-bold">🌀</div>
                <h4 className="font-bold text-slate-900 text-base font-display">Drain Hydro-Jetting</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Blast tree roots, scale, grease, and years of build-up completely clear using safe, high-pressure water jet streams.
                </p>
                <button
                  onClick={() => handleNavClick('services', setActiveTab)}
                  className="text-xs font-bold text-accent-blue hover:underline"
                >
                  Learn More
                </button>
              </div>
            </div>
          </section>

          {/* Social Proof & Client Testimonials Grid */}
          <section id="testimonials-block" className="space-y-8 pt-4">
            <div className="text-center space-y-2">
              <span className="text-accent-blue text-xs font-black tracking-widest uppercase block font-display">
                Satisfied Customers
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
                  className="bg-slate-50/50 border border-slate-100 rounded-3xl p-6 hover-scale-card flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-0.5 text-amber-400">
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
                    </div>
                    <h4 className="font-display font-extrabold text-[#003366] text-sm underline decoration-blue-200 underline-offset-4">
                      "{t.title}"
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {t.review}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 border-t border-slate-200/40 pt-4 mt-6">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-accent-blue flex items-center justify-center font-bold text-xs font-display">
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block leading-none">{t.name}</span>
                      <span className="text-[10px] text-slate-400 block mt-1 font-medium">{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Click Call to Action Strip */}
          <section className="bg-gradient-to-r from-primary-navy to-[#002244] rounded-[2rem] p-8 md:p-12 text-white relative overflow-hidden shadow-xl border border-blue-950">
            <div className="absolute top-0 right-0 w-80 h-80 bg-accent-blue/15 rounded-full blur-3xl pointer-events-none" />
            <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
              <span className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-200 text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full border border-blue-500/10 font-display">
                <PhoneCall className="w-3.5 h-3.5" /> Speak with Dispatch
              </span>
              <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight">
                Prefer a Direct Phone Call?
              </h3>
              <p className="text-xs md:text-sm text-blue-100/90 max-w-xl mx-auto leading-relaxed font-sans">
                Our dispatch line is fully staffed 24/7/365. Connect directly with our dispatch supervisors to schedule emergency appointments or discuss larger commercial projects.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <a 
                  href="tel:8005557586" 
                  className="w-full sm:w-auto px-8 py-4 bg-accent-blue hover:bg-blue-600 text-white font-extrabold rounded-full tracking-wide shadow-lg shadow-blue-500/20 transition-all text-center flex items-center justify-center gap-2 text-sm"
                >
                  Call (800) 555-7586
                </a>
                <button
                  onClick={onOpenQuoteModal}
                  className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-extrabold rounded-full tracking-wide transition-all text-center text-sm cursor-pointer"
                >
                  Book Online Assistant
                </button>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

// Simple internal link helper
function handleNavClick(tabId: 'home' | 'services' | 'about' | 'contact', setActiveTab: any) {
  setActiveTab(tabId);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
