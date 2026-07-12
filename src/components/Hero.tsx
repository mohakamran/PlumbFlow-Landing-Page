import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Star, Clock, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenQuoteModal: () => void;
}

export default function Hero({ onOpenQuoteModal }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-[#003366] to-[#0056b3] text-white pt-12 pb-36 md:pt-16 md:pb-48 px-6 md:px-12 overflow-hidden">
      {/* Decorative vector background lighting */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent-blue/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 left-1/3 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Headline and CTA */}
        <div className="lg:col-span-7 space-y-6 md:space-y-8">
          {/* Trust Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-blue-900/40 border border-blue-700/30 px-3.5 py-1.5 rounded-full"
          >
            <Sparkles className="w-4 h-4 text-blue-300 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-blue-100">
              Top Rated Metro Plumbing Provider
            </span>
            <div className="flex items-center gap-0.5 border-l border-blue-700/50 pl-2">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="text-xs font-extrabold text-white">4.9 / 5</span>
            </div>
          </motion.div>

          {/* Headline */}
          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white"
            >
              Reliable Plumbing <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-100 via-blue-200 to-white">
                Solutions for Your Home
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-lg text-blue-100/90 leading-relaxed max-w-xl"
            >
              Expert pipe repair, smart leak detection, and high-performance drain cleaning. Available 24/7 with zero dispatch fees and a 100% satisfaction guarantee.
            </motion.p>
          </div>

          {/* Call to Action Button */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <button
              id="hero-get-quote-btn"
              onClick={onOpenQuoteModal}
              className="px-8 py-4 bg-white hover:bg-blue-50 text-primary-navy font-bold rounded-full text-base tracking-wide shadow-lg shadow-black/15 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-center cursor-pointer"
            >
              Get Free Quote
            </button>

            {/* Quick stats on emergency dispatch */}
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl">
              <Clock className="w-5 h-5 text-blue-300 shrink-0" />
              <div>
                <span className="text-xs text-blue-200 block font-bold leading-none">Emergency Service</span>
                <span className="text-sm text-white font-extrabold block mt-0.5 font-mono">45-Min Guaranteed Arrival</span>
              </div>
            </div>
          </motion.div>

          {/* Trust Elements */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="pt-4 border-t border-blue-900/40 grid grid-cols-3 gap-4 text-xs font-bold text-blue-200"
          >
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
              <span>100% Guaranteed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Licensed Plumbers</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Upfront Pricing</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: High Quality Plumber Photo */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', damping: 20 }}
          className="lg:col-span-5 relative flex justify-center"
        >
          {/* Framed plumber layout */}
          <div className="relative w-full max-w-[340px] md:max-w-[360px] aspect-[3/4] rounded-[2.5rem] overflow-hidden border-4 border-white/10 shadow-2xl bg-slate-900/20">
            {/* Ambient overlay inside image frame */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#002244]/80 via-transparent to-transparent z-10" />

            <img
              src="/src/assets/images/plumber_hero_portrait_1783837635429.jpg"
              alt="Professional Smiling Plumber"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />

            {/* Float badge inside image */}
            <div className="absolute bottom-5 left-5 right-5 z-20 bg-white/95 backdrop-blur-md text-slate-900 p-4 rounded-2xl flex items-center gap-3 shadow-lg border border-white/20">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 border border-green-100 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block leading-none">Technician Status</span>
                <span className="text-xs text-slate-800 font-extrabold block mt-1">David G. (Dispatch Ready)</span>
              </div>
            </div>
          </div>

          {/* Underlay decoration mimicking pipe fixture */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 border-r-8 border-b-8 border-blue-400/10 rounded-br-[3rem] pointer-events-none" />
          <div className="absolute -top-6 -left-6 w-32 h-32 border-l-8 border-t-8 border-blue-400/10 rounded-tl-[3rem] pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
