import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Home from './components/pages/Home';
import Services from './components/pages/Services';
import AboutUs from './components/pages/AboutUs';
import Contact from './components/pages/Contact';
import Footer from './components/Footer';
import QuoteModal from './components/QuoteModal';
import LeadDashboard from './components/LeadDashboard';
import { Booking } from './types';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'services' | 'about' | 'contact'>('home');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [initialServiceId, setInitialServiceId] = useState<string | undefined>(undefined);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [refreshLeadsTrigger, setRefreshLeadsTrigger] = useState(0);
  const [latestBooking, setLatestBooking] = useState<Booking | null>(null);

  const handleOpenQuoteModal = (svcId?: string) => {
    setInitialServiceId(svcId);
    setIsQuoteModalOpen(true);
  };

  const handleBookingSuccess = (booking: Booking) => {
    setLatestBooking(booking);
    setRefreshLeadsTrigger(prev => prev + 1);
    
    // Auto-clear notification toast after 10 seconds
    setTimeout(() => {
      setLatestBooking(null);
    }, 10000);
  };

  // Render proper view page based on active tab state
  const renderActivePage = () => {
    switch (activeTab) {
      case 'home':
        return (
          <Home 
            onOpenQuoteModal={() => handleOpenQuoteModal()} 
            setActiveTab={setActiveTab} 
          />
        );
      case 'services':
        return (
          <Services 
            onOpenQuoteModal={(svcId) => handleOpenQuoteModal(svcId)} 
          />
        );
      case 'about':
        return <AboutUs />;
      case 'contact':
        return (
          <Contact 
            onBookingSuccess={handleBookingSuccess} 
          />
        );
      default:
        return (
          <Home 
            onOpenQuoteModal={() => handleOpenQuoteModal()} 
            setActiveTab={setActiveTab} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-accent-blue selection:text-white relative overflow-x-hidden">
      
      {/* Toast Notification for Real-time Intake Submissions */}
      <AnimatePresence>
        {latestBooking && (
          <div className="fixed bottom-6 left-6 z-50 max-w-sm w-full bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-slate-800/80 flex items-start gap-3 animate-fade-in-up">
            <div className="p-2 bg-green-500/15 text-green-400 rounded-xl border border-green-500/20 shrink-0">
              <CheckCircle2 className="w-5 h-5 animate-pulse" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[10px] text-green-400 tracking-wider uppercase font-display">New Lead Captured!</span>
                <button 
                  onClick={() => setLatestBooking(null)} 
                  className="text-slate-400 hover:text-slate-200 text-xs font-semibold cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
              <p className="text-xs text-slate-200 leading-normal font-medium">
                <strong>{latestBooking.name}</strong> has requested <strong>{latestBooking.serviceType}</strong> in ZIP <strong>{latestBooking.zipCode}</strong>.
              </p>
              <div className="pt-1 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>{latestBooking.id}</span>
                <span className="font-bold text-accent-blue">{latestBooking.estimatedPrice}</span>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Action Badge to trigger Admin View */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          id="floating-admin-ledger-btn"
          onClick={() => setIsAdminOpen(true)}
          className="p-3.5 bg-slate-900 hover:bg-slate-800 text-slate-100 hover:text-white rounded-full shadow-2xl border border-slate-800/60 transition-all transform hover:scale-105 active:scale-95 group flex items-center gap-2 cursor-pointer"
          title="Open Dispatch Ledger Panel"
        >
          <div className="relative">
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
            <Sparkles className="w-5 h-5 text-accent-blue group-hover:rotate-12 transition-transform" />
          </div>
          <span className="text-xs font-bold font-mono tracking-wider pr-1 hidden sm:inline-block">Dispatch Ledger</span>
        </button>
      </div>

      {/* Sticky Header and Branding */}
      <Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenQuoteModal={() => handleOpenQuoteModal()}
        onOpenAdminDashboard={() => setIsAdminOpen(true)}
      />

      {/* Primary Page Navigation Wrapper */}
      <main className="pb-16">
        {renderActivePage()}
      </main>

      {/* Footer and Statistics */}
      <Footer 
        setActiveTab={setActiveTab}
        onOpenAdminDashboard={() => setIsAdminOpen(true)} 
      />

      {/* Dynamic Interactive Modal for Pricing & Quote Booking */}
      <AnimatePresence>
        {isQuoteModalOpen && (
          <QuoteModal 
            isOpen={isQuoteModalOpen}
            onClose={() => {
              setIsQuoteModalOpen(false);
              setInitialServiceId(undefined);
            }}
            onBookingSuccess={handleBookingSuccess}
            initialServiceId={initialServiceId}
          />
        )}
      </AnimatePresence>

      {/* Drawer Administrative Dashboard */}
      <AnimatePresence>
        {isAdminOpen && (
          <LeadDashboard 
            isOpen={isAdminOpen}
            onClose={() => setIsAdminOpen(false)}
            triggerRefresh={refreshLeadsTrigger}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
