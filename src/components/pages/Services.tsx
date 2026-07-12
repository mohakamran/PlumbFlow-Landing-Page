import React, { useState } from 'react';
import { ShieldCheck, Flame, Droplet, Wind, Wrench, Settings, ArrowRight, ShieldAlert, Sparkles, Check, HelpCircle } from 'lucide-react';

interface ServicesProps {
  onOpenQuoteModal: (initialService?: string) => void;
}

interface ServiceCard {
  id: string;
  name: string;
  priceRange: string;
  timeframe: string;
  icon: React.ReactNode;
  bgIconColor: string;
  description: string;
  bullets: string[];
  severity: 'high' | 'medium' | 'normal';
}

export default function Services({ onOpenQuoteModal }: ServicesProps) {
  const [selectedEstimatorService, setSelectedEstimatorService] = useState('leak');
  const [pipeLength, setPipeLength] = useState(15);
  const [isEmergency, setIsEmergency] = useState(false);

  const servicesList: ServiceCard[] = [
    {
      id: 'emergency',
      name: 'Emergency Plumbing',
      priceRange: '$180 - $450',
      timeframe: 'Immediate Response (< 45 mins)',
      icon: <ShieldAlert className="w-6 h-6 text-red-500" />,
      bgIconColor: 'bg-red-50',
      description: 'Massive pipe bursts, sewer backups, non-stop leaking, or completely blocked toilets. Our dispatch trucks are ready for midnight emergencies.',
      bullets: [
        '24/7/365 midnight dispatch',
        'Direct connection to plumber on call',
        'Fast water-shutoff guidance over the phone',
        'State-of-the-art diagnostic instruments on-board'
      ],
      severity: 'high'
    },
    {
      id: 'drain',
      name: 'Drain Cleaning & Hydro-Jetting',
      priceRange: '$95 - $290',
      timeframe: 'Same-Day Dispatch',
      icon: <Flame className="w-6 h-6 text-amber-500" />,
      bgIconColor: 'bg-amber-50',
      description: 'Slow sinks, standing sewer line blockages, or roots choking your main lines. We use heavy-duty snakes and high-pressure jet streams.',
      bullets: [
        'High-definition main sewer camera scan included',
        'Safe, chemical-free hydro-jetting',
        'Completely removes tree roots, scale & grease',
        'Backed by a 1-year clog-free warranty'
      ],
      severity: 'medium'
    },
    {
      id: 'leak',
      name: 'Advanced Leak Detection',
      priceRange: '$150 - $350',
      timeframe: 'Scheduled or Same-Day',
      icon: <Droplet className="w-6 h-6 text-[#007BFF]" />,
      bgIconColor: 'bg-blue-50',
      description: 'Mysterious high water bills or damp walls. We locate hidden underground, ceiling, slab, or wall leaks using acoustic and thermal technology.',
      bullets: [
        'Non-invasive diagnostic tools',
        'Infrared thermal camera imaging',
        'Electronic slab leak detection',
        'Written diagnostic report for homeowner insurance'
      ],
      severity: 'normal'
    },
    {
      id: 'repair',
      name: 'Pipe Repair & Replacement',
      priceRange: '$120 - $550',
      timeframe: 'Same-Day or Scheduled',
      icon: <Wrench className="w-6 h-6 text-green-500" />,
      bgIconColor: 'bg-green-50',
      description: 'Fixing copper pipes, installing durable modern PEX, replacing rusty valves, or complete whole-house repiping to secure clean water.',
      bullets: [
        'Modern PEX piping upgrades (corrosion resistant)',
        'Copper pipe soldering & joint repairs',
        'Water pressure regulator valve fixes',
        'All work backed by a 2-year warranty'
      ],
      severity: 'normal'
    }
  ];

  // Logic to calculate estimated quote based on interactive widgets
  const calculateLiveEstimate = () => {
    let basePrice = 120;
    if (selectedEstimatorService === 'emergency') basePrice = 280;
    if (selectedEstimatorService === 'drain') basePrice = 160;
    if (selectedEstimatorService === 'leak') basePrice = 190;
    if (selectedEstimatorService === 'repair') basePrice = 140;

    const lengthMarkup = pipeLength * 6.5;
    const emergencyMarkup = isEmergency ? 85 : 0;
    const totalMin = Math.round(basePrice + lengthMarkup + emergencyMarkup);
    const totalMax = Math.round(totalMin * 1.35);

    return { min: totalMin, max: totalMax };
  };

  const { min: estMin, max: estMax } = calculateLiveEstimate();

  return (
    <div className="space-y-16 animate-fade-in-up">
      
      {/* Services Header Banner */}
      <section className="bg-gradient-to-br from-[#003366] to-[#004B93] text-white py-16 px-6 md:px-12 text-center relative overflow-hidden rounded-[2rem] md:rounded-[3rem] mx-4 md:mx-8 mt-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto space-y-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-200 text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full border border-blue-500/10">
            Professional Scope
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-black tracking-tight text-white">
            Our Certified Services
          </h1>
          <p className="text-sm md:text-base text-blue-100/90 max-w-xl mx-auto leading-relaxed">
            From direct emergency repairs to advanced diagnostics, explore our list of upfront flat-rate plumbing procedures designed to safeguard your home.
          </p>
        </div>
      </section>

      {/* Services detailed card blocks */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {servicesList.map((svc) => (
            <div 
              key={svc.id}
              className="bg-white border border-slate-100 rounded-[2rem] p-6 md:p-8 hover-scale-card flex flex-col justify-between space-y-6 relative group overflow-hidden"
            >
              {/* Highlight ribbon for high severity */}
              {svc.severity === 'high' && (
                <div className="absolute top-0 right-0 bg-red-500 text-white text-[9px] font-bold uppercase tracking-widest px-4 py-1 rounded-bl-xl">
                  Critical Response Active
                </div>
              )}

              <div className="space-y-4">
                {/* Header info with Icon */}
                <div className="flex items-center gap-4">
                  <div className={`p-3.5 ${svc.bgIconColor} rounded-2xl shrink-0 border border-slate-100/60`}>
                    {svc.icon}
                  </div>
                  <div>
                    <h2 className="font-display font-extrabold text-[#003366] text-lg md:text-xl">
                      {svc.name}
                    </h2>
                    <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                      Average Price: <strong className="text-slate-800">{svc.priceRange}</strong> • {svc.timeframe}
                    </span>
                  </div>
                </div>

                <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                  {svc.description}
                </p>

                {/* Bullets lists */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Service Deliverables:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {svc.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-accent-blue shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-600 font-medium">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Book Now Button */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  <span className="text-[11px] text-slate-500 font-mono">Licensed & Bonded</span>
                </div>

                <button
                  onClick={() => onOpenQuoteModal(svc.id)}
                  className="px-6 py-3 bg-accent-blue hover:bg-blue-600 text-white font-bold rounded-xl text-xs tracking-wider uppercase transition-all shadow-md shadow-blue-500/10 cursor-pointer"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Tool Section: Live Price Estimator widget */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 md:p-12 border border-slate-800/80 relative overflow-hidden shadow-2xl">
          <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-accent-blue/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Left Column: Estimator inputs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 text-xs font-bold uppercase px-3 py-1 rounded-full border border-blue-500/10 font-display">
                  <Settings className="w-3.5 h-3.5 text-accent-blue animate-spin" /> Interactive Calculators
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white">
                  Instantly Estimate Your Repair Price
                </h3>
                <p className="text-xs text-slate-400">
                  Select variables below to calculate average local service costs. Zero obligations!
                </p>
              </div>

              {/* Estimator Inputs block */}
              <div className="space-y-5 bg-slate-950/60 p-6 rounded-2xl border border-slate-800/80">
                
                {/* Variable 1: Select Service Type */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase block tracking-wider">
                    1. Choose Service Category
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'emergency', label: 'Emergency' },
                      { id: 'drain', label: 'Drain Jet' },
                      { id: 'leak', label: 'Leak Find' },
                      { id: 'repair', label: 'Pipe Fix' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedEstimatorService(item.id)}
                        className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-center border cursor-pointer ${
                          selectedEstimatorService === item.id
                            ? 'bg-accent-blue border-accent-blue text-white shadow-md'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Variable 2: Estimated length scale */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      2. Scope of Area / Pipe Length
                    </label>
                    <span className="text-xs font-mono font-bold text-accent-blue bg-blue-500/10 px-2 py-0.5 rounded-md">
                      {pipeLength} Linear Feet
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="60"
                    step="5"
                    value={pipeLength}
                    onChange={(e) => setPipeLength(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-accent-blue"
                  />
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span>Minor (5 ft)</span>
                    <span>Standard (25 ft)</span>
                    <span>Major (60 ft)</span>
                  </div>
                </div>

                {/* Variable 3: Emergency Dispatch Switch */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <div>
                    <span className="text-xs font-bold text-slate-300 block">Immediate Emergency Dispatch?</span>
                    <span className="text-[10px] text-slate-500 block">Priority response within 45 minutes.</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsEmergency(!isEmergency)}
                    className={`w-14 h-7 rounded-full p-1 transition-colors relative cursor-pointer ${
                      isEmergency ? 'bg-red-500' : 'bg-slate-800'
                    }`}
                  >
                    <span
                      className={`block w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                        isEmergency ? 'translate-x-7' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

              </div>
            </div>

            {/* Right Column: Display calculated estimate */}
            <div className="lg:col-span-5 bg-slate-950 p-6 md:p-8 rounded-3xl border border-slate-800 flex flex-col justify-between text-center space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block">
                  Calculated Price Range
                </span>
                
                {/* Massive Pricing readout */}
                <div className="py-4">
                  <span className="font-display font-black text-3xl md:text-5xl text-white tracking-tight">
                    ${estMin} - ${estMax}
                  </span>
                  <p className="text-[11px] text-slate-400 mt-1 font-medium">
                    Fully-inclusive of labor, local parts, & clean-up
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 bg-slate-900 p-2.5 rounded-xl border border-slate-800/80 text-left">
                  <HelpCircle className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="text-[10px] text-slate-400 leading-normal">
                    Estimate based on regional plumbing schedules. Standard diagnostics are waived if you approve the physical repair.
                  </span>
                </div>

                <button
                  onClick={() => onOpenQuoteModal(selectedEstimatorService)}
                  className="w-full py-4 bg-accent-blue hover:bg-blue-600 text-white font-extrabold rounded-xl transition-all shadow-lg shadow-blue-500/20 cursor-pointer text-sm"
                >
                  Lock Estimate & Book Repair
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
