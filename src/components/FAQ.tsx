import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

const FAQS_DATA: FAQItem[] = [
  {
    q: 'Do you charge a dispatch or trip fee?',
    a: 'No! Unlike other plumbing companies, we have $0 dispatch fees. Our technician will come to your home, assess the issue, and provide a clear upfront flat-rate estimate. You only pay for actual repairs.'
  },
  {
    q: 'How fast can you arrive for plumbing emergencies?',
    a: 'We guarantee a 45-minute average response time for emergencies in central service areas. Our lines are open 24/7, and we have fully equipped vehicles on standby to handle water heater bursts, sewage backups, or major line leaks.'
  },
  {
    q: 'Are your plumbers licensed and insured?',
    a: 'Absolutely. Every plumber on our team is fully licensed (Lic #PL-827419), bonded, background-checked, and carries comprehensive liability insurance. Your property is in safe hands.'
  },
  {
    q: 'What warranties do you offer on work?',
    a: 'We provide a 2-Year parts and labor workmanship warranty on all piping repairs, valve replacements, and major fixtures. We stand by our work 100% and will resolve any recurrent issues immediately.'
  }
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq-section" className="py-16 px-6 max-w-4xl mx-auto">
      <div className="text-center space-y-3 mb-10">
        <span className="text-accent-blue text-xs font-extrabold tracking-widest uppercase block">
          Frequently Asked Questions
        </span>
        <h3 className="font-display text-2xl md:text-3xl font-extrabold text-slate-950">
          Got Questions? We’ve Got Answers
        </h3>
        <p className="text-slate-500 text-sm max-w-md mx-auto">
          Learn about our flat-rate pricing, scheduling speed, and safety standards.
        </p>
      </div>

      <div className="space-y-4">
        {FAQS_DATA.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              id={`faq-item-${idx}`}
              className="bg-white border border-slate-100 rounded-2xl overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 font-display font-bold text-slate-900 text-sm md:text-base hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-accent-blue/80 shrink-0" />
                  <span>{item.q}</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                  >
                    <div className="px-5 pb-5 pt-1 border-t border-slate-50 text-xs md:text-sm text-slate-500 leading-relaxed font-medium">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
