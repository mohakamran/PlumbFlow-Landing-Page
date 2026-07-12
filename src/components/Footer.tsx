import React from 'react';
import { ShieldCheck, Flame, Users, Calendar, Settings, ChevronRight } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: 'home' | 'services' | 'about' | 'contact') => void;
  onOpenAdminDashboard: () => void;
}

export default function Footer({ setActiveTab, onOpenAdminDashboard }: FooterProps) {
  
  const handlePageLinkClick = (tabId: 'home' | 'services' | 'about' | 'contact') => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#002244] text-white border-t border-blue-950/50">
      
      {/* Footer Statistics Section */}
      <div className="bg-gradient-to-r from-[#001D3A] via-[#003366] to-[#002244] py-12 px-6 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Stat 1 */}
          <div className="space-y-2 border-r border-blue-900/30 last:border-0 md:border-r md:border-b-0 pb-6 md:pb-0">
            <div className="inline-flex p-3 bg-blue-500/10 rounded-full text-blue-300 mb-2">
              <Users className="w-6 h-6" />
            </div>
            <span className="font-display font-extrabold text-4xl md:text-5xl text-white tracking-tight block">
              24,756+
            </span>
            <span className="text-xs md:text-sm font-bold text-blue-200 tracking-wider uppercase block">
              Happy Homeowners
            </span>
            <span className="text-[11px] text-blue-300/70 font-medium max-w-xs mx-auto block leading-relaxed">
              Highly rated for responsive, clean workmanship in the local metropolitan area.
            </span>
          </div>

          {/* Stat 2 */}
          <div className="space-y-2 border-r border-blue-900/30 last:border-0 md:border-r md:border-b-0 pb-6 md:pb-0">
            <div className="inline-flex p-3 bg-blue-500/10 rounded-full text-blue-300 mb-2">
              <Calendar className="w-6 h-6" />
            </div>
            <span className="font-display font-extrabold text-4xl md:text-5xl text-white tracking-tight block">
              4,786+
            </span>
            <span className="text-xs md:text-sm font-bold text-blue-200 tracking-wider uppercase block">
              Repipes & Heaters Fixed
            </span>
            <span className="text-[11px] text-blue-300/70 font-medium max-w-xs mx-auto block leading-relaxed">
              Completed on-time PEX repipes, smart water heater replacements, and sewer line diagnostic camera surveys.
            </span>
          </div>

          {/* Stat 3 */}
          <div className="space-y-2">
            <div className="inline-flex p-3 bg-blue-500/10 rounded-full text-blue-300 mb-2">
              <Flame className="w-6 h-6" />
            </div>
            <span className="font-display font-extrabold text-4xl md:text-5xl text-white tracking-tight block">
              4,930+
            </span>
            <span className="text-xs md:text-sm font-bold text-blue-200 tracking-wider uppercase block">
              Urgent Calls Managed
            </span>
            <span className="text-[11px] text-blue-300/70 font-medium max-w-xs mx-auto block leading-relaxed">
              Dispatched certified crews and emergency trucks under 45 minutes from online intake forms.
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Sitemap & Links */}
      <div className="py-12 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 text-sm text-blue-200/90">
        
        {/* Brand statement column */}
        <div className="space-y-4 md:col-span-5">
          <button 
            onClick={() => handlePageLinkClick('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none"
          >
            <div className="w-7.5 h-7.5 bg-accent-blue rounded-lg flex items-center justify-center text-white font-extrabold font-display text-sm">
              P
            </div>
            <span className="font-display font-black text-lg text-white tracking-tight">
              Reliable<span className="text-accent-blue font-bold">Plumbing</span>
            </span>
          </button>
          <p className="text-xs leading-relaxed max-w-sm text-slate-300">
            Professional water pipeline installations, master drain treatments, and modern leak localized diagnostics with real upfront quotes and 2-year warranty safety locks.
          </p>
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold text-blue-300">
            <ShieldCheck className="w-4 h-4 text-green-400 shrink-0" />
            <span>State Registration Lic: #PL-827419</span>
          </div>
        </div>

        {/* Sitemap Page Navigation Column */}
        <div className="md:col-span-3">
          <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider mb-4">Sitemap Directory</h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button 
                onClick={() => handlePageLinkClick('home')}
                className="hover:text-white hover:underline transition-colors text-left text-slate-300"
              >
                Home Landing Page
              </button>
            </li>
            <li>
              <button 
                onClick={() => handlePageLinkClick('services')}
                className="hover:text-white hover:underline transition-colors text-left text-slate-300"
              >
                Our Services Guide
              </button>
            </li>
            <li>
              <button 
                onClick={() => handlePageLinkClick('about')}
                className="hover:text-white hover:underline transition-colors text-left text-slate-300"
              >
                About Our Plumbers
              </button>
            </li>
            <li>
              <button 
                onClick={() => handlePageLinkClick('contact')}
                className="hover:text-white hover:underline transition-colors text-left text-slate-300"
              >
                Contact & Map
              </button>
            </li>
          </ul>
        </div>

        {/* Services shortcut Column */}
        <div className="md:col-span-2">
          <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider mb-4">Plumbing Services</h4>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li>
              <button 
                onClick={() => handlePageLinkClick('services')}
                className="hover:text-white hover:underline transition-colors text-left"
              >
                Pipe Repairs
              </button>
            </li>
            <li>
              <button 
                onClick={() => handlePageLinkClick('services')}
                className="hover:text-white hover:underline transition-colors text-left"
              >
                Leak Detection
              </button>
            </li>
            <li>
              <button 
                onClick={() => handlePageLinkClick('services')}
                className="hover:text-white hover:underline transition-colors text-left"
              >
                Drain Cleaning
              </button>
            </li>
            <li>
              <button 
                onClick={() => handlePageLinkClick('services')}
                className="hover:text-white hover:underline transition-colors text-left"
              >
                Water Heaters
              </button>
            </li>
          </ul>
        </div>

        {/* Administrative / Ledger column */}
        <div className="md:col-span-2">
          <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider mb-4">System Console</h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button 
                onClick={onOpenAdminDashboard} 
                className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-left font-bold text-accent-blue bg-blue-500/10 px-2.5 py-1.5 rounded-lg border border-blue-500/10 text-[11px]"
              >
                <Settings className="w-3.5 h-3.5 animate-spin" />
                <span>Dispatch Ledger</span>
              </button>
            </li>
            <li><span className="text-slate-400 block text-[11px]">24 Hour Phone Line:</span></li>
            <li>
              <a href="tel:8005557586" className="text-slate-200 hover:text-white font-bold font-mono text-[11px]">
                (800) 555-7586
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Copy and policy links */}
      <div className="bg-[#001D3A] py-6 px-6 border-t border-blue-950 text-center text-xs text-blue-300/60 font-semibold">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span>© 2026 Reliable Plumbing Services Inc. All rights reserved. Registered, Insured and Bonded.</span>
          <div className="flex items-center gap-4 text-[11px]">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-white">Guarantees</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
