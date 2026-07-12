import React, { useState } from 'react';
import { Phone, ShieldAlert, Menu, X, Sparkles, Star, ChevronRight } from 'lucide-react';

interface HeaderProps {
  activeTab: 'home' | 'services' | 'about' | 'contact';
  setActiveTab: (tab: 'home' | 'services' | 'about' | 'contact') => void;
  onOpenQuoteModal: () => void;
  onOpenAdminDashboard: () => void;
}

export default function Header({ 
  activeTab, 
  setActiveTab, 
  onOpenQuoteModal, 
  onOpenAdminDashboard 
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems: { id: 'home' | 'services' | 'about' | 'contact'; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Our Services' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleNavClick = (tabId: 'home' | 'services' | 'about' | 'contact') => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 24/7 Priority Emergency Alert Notification Strip */}
      <div className="bg-red-600 text-white py-2 px-4 text-center text-[11px] md:text-xs font-bold tracking-wide flex items-center justify-center gap-2 relative z-50 shadow-md">
        <ShieldAlert className="w-4 h-4 animate-pulse shrink-0 text-red-100" />
        <span className="font-display">🚨 24/7 EMERGENCY TEAM ACTIVE: Response under 45 mins.</span>
        <a 
          href="tel:8005557586" 
          className="underline hover:text-red-100 font-extrabold ml-1 inline-flex items-center gap-1 shrink-0 font-mono"
        >
          Call Dispatch: (800) 555-7586
        </a>
      </div>

      {/* Sticky Glass-morphism Navigation Bar */}
      <header className="sticky top-0 z-40 glass-header text-white px-4 md:px-12 py-3.5 flex items-center justify-between shadow-lg">
        {/* Brand Logo & State Licensing Badges */}
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
        >
          <div className="w-9 h-9 bg-accent-blue rounded-xl flex items-center justify-center text-white font-black font-display shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            P
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black text-base md:text-lg tracking-tight">
                Reliable<span className="text-accent-blue font-bold">Plumbing</span>
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[9px] text-blue-200/90 font-mono tracking-wider uppercase font-semibold">
                Lic #PL-827419 • Bonded & Insured
              </span>
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs md:text-sm font-semibold text-blue-100/90">
          {navigationItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer relative ${
                  isActive 
                    ? 'text-white font-bold bg-white/10 shadow-sm' 
                    : 'hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-accent-blue rounded-full" />
                )}
              </button>
            );
          })}
          
          {/* Admin Dispatcher Ledger Link */}
          <button 
            id="nav-admin-portal-link"
            onClick={onOpenAdminDashboard}
            className="text-[11px] bg-slate-900/60 hover:bg-slate-900 text-slate-300 hover:text-accent-blue border border-slate-700/60 px-3 py-1.5 rounded-lg font-mono transition-all cursor-pointer flex items-center gap-1"
            title="Inspect captured incoming leads in real-time"
          >
            <Sparkles className="w-3 h-3 text-accent-blue animate-pulse" />
            <span>Admin Ledger</span>
          </button>
        </nav>

        {/* Hotlines & Quick Pulsing CTA */}
        <div className="flex items-center gap-3">
          {/* Dispatch Phone Line */}
          <a 
            href="tel:8005557586" 
            className="hidden sm:flex items-center gap-2.5 text-right group"
          >
            <div className="bg-blue-900/40 border border-blue-800/30 p-2 rounded-xl group-hover:bg-blue-800/60 transition-colors">
              <Phone className="w-3.5 h-3.5 text-accent-blue" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-blue-300 font-bold uppercase tracking-widest leading-none">Dispatcher Available</span>
              <span className="text-xs font-black text-white font-mono group-hover:text-accent-blue transition-colors mt-0.5">(800) 555-7586</span>
            </div>
          </a>

          {/* Prompt Free Quote Button (With Custom Pulse Alert) */}
          <button
            id="header-book-online-btn"
            onClick={onOpenQuoteModal}
            className="hidden sm:inline-flex px-4.5 py-2.5 bg-accent-blue hover:bg-blue-600 text-white rounded-xl text-xs md:text-sm font-extrabold tracking-wide transition-all shadow-md shadow-blue-500/10 active:scale-95 cursor-pointer animate-pulse-quote"
          >
            Get Free Quote
          </button>

          {/* Mobile Hamburguer Icon */}
          <button
            id="mobile-hamburger-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Slide-out Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-slate-950/80 backdrop-blur-sm flex justify-end">
          <div className="w-72 bg-slate-900 h-full p-6 text-white flex flex-col justify-between border-l border-slate-800/80 shadow-2xl relative">
            
            <div className="space-y-6">
              {/* Header inside Menu */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-accent-blue rounded-lg flex items-center justify-center text-white font-extrabold font-display">
                    P
                  </div>
                  <span className="font-display font-extrabold text-sm tracking-tight">
                    Reliable<span className="text-accent-blue">Plumbing</span>
                  </span>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="space-y-2">
                {navigationItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl font-bold font-display text-sm flex items-center justify-between transition-colors ${
                        isActive 
                          ? 'bg-accent-blue text-white' 
                          : 'bg-slate-800/30 text-slate-300 hover:bg-slate-800/60 hover:text-white'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="w-4 h-4 opacity-75" />
                    </button>
                  );
                })}
              </div>

              {/* Admin dispatch trigger inside Mobile */}
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAdminDashboard();
                }}
                className="w-full text-left px-4 py-2.5 rounded-xl border border-dashed border-slate-700 hover:border-slate-500 bg-slate-950 text-xs font-mono text-slate-400 hover:text-white flex items-center gap-2 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-accent-blue" />
                <span>Open Dispatch Ledger</span>
              </button>
            </div>

            {/* Mobile Contact Footer info */}
            <div className="space-y-4 pt-6 border-t border-slate-800/80">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                <span className="text-[9px] text-slate-500 uppercase tracking-widest block font-bold">24 Hours Emergency Dispatch</span>
                <a href="tel:8005557586" className="text-accent-blue font-mono font-bold text-sm block mt-1 hover:underline">
                  (800) 555-7586
                </a>
              </div>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="w-full py-3 bg-accent-blue hover:bg-blue-600 text-white rounded-xl text-center font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-500/20"
              >
                Get Free Quote
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
