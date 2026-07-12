import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Wrench, 
  Droplet, 
  Flame, 
  AlertTriangle, 
  MapPin, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle, 
  Sparkles, 
  Phone, 
  User, 
  Mail, 
  DollarSign,
  Briefcase
} from 'lucide-react';
import { Booking } from '../types';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingSuccess: (booking: Booking) => void;
  initialServiceId?: string;
}

const SERVICES = [
  { id: 'pipe_repair', title: 'Pipe Repair & Replace', baseMin: 150, baseMax: 350, icon: Wrench, desc: 'Leaky pipes, copper repiping, burst water line repair' },
  { id: 'leak_detection', title: 'Smart Leak Detection', baseMin: 180, baseMax: 400, icon: Droplet, desc: 'Slab leak, thermal imaging, hidden moisture localization' },
  { id: 'drain_cleaning', title: 'Hydro-Jet Drain Cleaning', baseMin: 120, baseMax: 290, icon: Flame, desc: 'Rooter service, clogged toilets, main line hydro-jetting' },
  { id: 'water_heater', title: 'Water Heater Service', baseMin: 200, baseMax: 600, icon: Flame, desc: 'Tankless & conventional heater diagnostic, repair or install' },
  { id: 'emergency_plumbing', title: '24/7 Emergency Dispatch', baseMin: 250, baseMax: 500, icon: AlertTriangle, desc: 'Immediate flood response, sewer backup, critical leaks' },
];

const URGENCY_LEVELS = [
  { id: 'same_day', label: 'Emergency - Same Day', multiplier: 1.3, extraFee: 49, desc: 'Plumber dispatched within 45 mins. Priority queue.' },
  { id: 'soon', label: 'Within 48 Hours', multiplier: 1.0, extraFee: 0, desc: 'Scheduled slot within the next 2 days. Free dispatch.' },
  { id: 'standard', label: 'Routine / Flexible Date', multiplier: 0.9, extraFee: -15, desc: 'Standard booking. Save on non-urgent projects.' }
];

export default function QuoteModal({ isOpen, onClose, onBookingSuccess, initialServiceId }: QuoteModalProps) {
  const [step, setStep] = useState(1);
  const [serviceType, setServiceType] = useState(() => {
    if (initialServiceId) {
      if (initialServiceId === 'emergency') return 'emergency_plumbing';
      if (initialServiceId === 'drain') return 'drain_cleaning';
      if (initialServiceId === 'leak') return 'leak_detection';
      if (initialServiceId === 'repair') return 'pipe_repair';
      return initialServiceId;
    }
    return 'pipe_repair';
  });
  const [urgency, setUrgency] = useState<'same_day' | 'soon' | 'standard'>('soon');
  const [propertyType, setPropertyType] = useState<'residential' | 'commercial'>('residential');
  const [zipCode, setZipCode] = useState('');
  const [zipError, setZipError] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [details, setDetails] = useState('');
  const [formError, setFormError] = useState('');

  // Estimate calculation
  const getEstimate = () => {
    const service = SERVICES.find(s => s.id === serviceType) || SERVICES[0];
    const urgencyObj = URGENCY_LEVELS.find(u => u.id === urgency) || URGENCY_LEVELS[1];
    const propMultiplier = propertyType === 'commercial' ? 1.25 : 1.0;
    
    const minPrice = Math.round((service.baseMin * urgencyObj.multiplier * propMultiplier) + urgencyObj.extraFee);
    const maxPrice = Math.round((service.baseMax * urgencyObj.multiplier * propMultiplier) + urgencyObj.extraFee);
    return { min: minPrice, max: maxPrice };
  };

  const handleNextStep = () => {
    if (step === 3) {
      // Validate Zip Code
      if (!zipCode || zipCode.trim().length < 5) {
        setZipError('Please enter a valid 5-digit ZIP code.');
        return;
      }
      setZipError('');
    }
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) {
      setFormError('Please fill in your name, phone, and email address.');
      return;
    }
    setFormError('');

    const pricing = getEstimate();
    const serviceObj = SERVICES.find(s => s.id === serviceType);

    const booking: Booking = {
      id: 'PL-' + Math.floor(Math.random() * 90000 + 10000),
      timestamp: new Date().toLocaleString(),
      name,
      email,
      phone,
      zipCode,
      serviceType: serviceObj?.title || 'General Plumbing',
      urgency,
      details: details || 'No additional details provided.',
      status: 'pending',
      estimatedPrice: `$${pricing.min} - $${pricing.max}`
    };

    // Store in localStorage
    const existing = JSON.parse(localStorage.getItem('plumbing_leads') || '[]');
    localStorage.setItem('plumbing_leads', JSON.stringify([booking, ...existing]));

    onBookingSuccess(booking);
    setStep(6); // Success screen
  };

  const currentEstimate = getEstimate();
  const progressPercent = Math.min((step / 5) * 100, 100);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100"
      >
        {/* Header decoration */}
        <div className="bg-primary-navy px-6 py-5 text-white flex items-center justify-between">
          <div>
            <h3 className="font-display text-xl font-bold tracking-tight">Interactive Price & Booking Assistant</h3>
            <p className="text-blue-100 text-xs mt-0.5">Instant estimate • Local licensed plumbers</p>
          </div>
          <button 
            id="close-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar */}
        {step <= 5 && (
          <div className="w-full bg-slate-100 h-1">
            <div 
              className="bg-accent-blue h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}

        <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto">
          {step === 1 && (
            <motion.div 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="text-center max-w-md mx-auto mb-6">
                <span className="text-accent-blue text-xs font-semibold tracking-wider uppercase">Step 1 of 5</span>
                <h4 className="font-display text-xl font-bold text-slate-900 mt-1">What service do you need?</h4>
                <p className="text-slate-500 text-sm mt-1">Choose the primary plumbing issue to calculate your instant pricing range.</p>
              </div>

              <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
                {SERVICES.map((s) => {
                  const IconComponent = s.icon;
                  const isSelected = serviceType === s.id;
                  return (
                    <button
                      key={s.id}
                      id={`service-select-${s.id}`}
                      onClick={() => setServiceType(s.id)}
                      className={`text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-4 hover:border-accent-blue/50 ${
                        isSelected 
                        ? 'border-accent-blue bg-blue-50/50 shadow-sm shadow-blue-50' 
                        : 'border-slate-100 bg-white'
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-accent-blue text-white' : 'bg-slate-100 text-slate-600'}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="font-semibold text-slate-900 text-sm block">{s.title}</span>
                        <span className="text-xs text-slate-500 block leading-relaxed">{s.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-6 flex justify-end">
                <button
                  id="modal-next-step-1"
                  onClick={handleNextStep}
                  className="px-6 py-3 bg-accent-blue hover:bg-blue-600 text-white rounded-xl font-semibold text-sm flex items-center gap-2 shadow-lg shadow-blue-200 hover:shadow-xl transition-all cursor-pointer"
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-5"
            >
              <div className="text-center max-w-md mx-auto mb-6">
                <span className="text-accent-blue text-xs font-semibold tracking-wider uppercase">Step 2 of 5</span>
                <h4 className="font-display text-xl font-bold text-slate-900 mt-1">How urgent is this job?</h4>
                <p className="text-slate-500 text-sm mt-1">We offer 24/7 same-day dispatch for immediate plumbing emergencies.</p>
              </div>

              <div className="space-y-3">
                {URGENCY_LEVELS.map((u) => {
                  const isSelected = urgency === u.id;
                  return (
                    <button
                      key={u.id}
                      id={`urgency-select-${u.id}`}
                      onClick={() => setUrgency(u.id as any)}
                      className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between hover:border-accent-blue/50 ${
                        isSelected 
                        ? 'border-accent-blue bg-blue-50/50 shadow-sm shadow-blue-50' 
                        : 'border-slate-100 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-accent-blue bg-accent-blue' : 'border-slate-300'}`}>
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <div>
                          <span className="font-semibold text-slate-900 text-sm block">{u.label}</span>
                          <span className="text-xs text-slate-500 block mt-0.5">{u.desc}</span>
                        </div>
                      </div>
                      {u.extraFee !== 0 && (
                        <div className="text-right">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-md ${u.extraFee > 0 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                            {u.extraFee > 0 ? `+$${u.extraFee} Dispatch` : `-$${Math.abs(u.extraFee)} Discount`}
                          </span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="pt-6 flex justify-between items-center">
                <button
                  id="modal-prev-step-2"
                  onClick={handlePrevStep}
                  className="px-4 py-2.5 text-slate-500 hover:text-slate-900 font-semibold text-sm flex items-center gap-1.5 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button
                  id="modal-next-step-2"
                  onClick={handleNextStep}
                  className="px-6 py-3 bg-accent-blue hover:bg-blue-600 text-white rounded-xl font-semibold text-sm flex items-center gap-2 shadow-lg shadow-blue-200 hover:shadow-xl transition-all cursor-pointer"
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="text-center max-w-md mx-auto mb-2">
                <span className="text-accent-blue text-xs font-semibold tracking-wider uppercase">Step 3 of 5</span>
                <h4 className="font-display text-xl font-bold text-slate-900 mt-1">Property & Location</h4>
                <p className="text-slate-500 text-sm mt-1">Estimates are adjusted based on property type complexity and local regional costs.</p>
              </div>

              <div className="space-y-5 max-w-md mx-auto">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Property Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      id="property-type-residential"
                      onClick={() => setPropertyType('residential')}
                      className={`py-3 px-4 rounded-xl border-2 font-semibold text-sm text-center transition-all ${
                        propertyType === 'residential'
                        ? 'border-accent-blue bg-blue-50/50 text-accent-blue'
                        : 'border-slate-100 hover:border-slate-300 text-slate-600 bg-white'
                      }`}
                    >
                      Residential Home
                    </button>
                    <button
                      type="button"
                      id="property-type-commercial"
                      onClick={() => setPropertyType('commercial')}
                      className={`py-3 px-4 rounded-xl border-2 font-semibold text-sm text-center transition-all ${
                        propertyType === 'commercial'
                        ? 'border-accent-blue bg-blue-50/50 text-accent-blue'
                        : 'border-slate-100 hover:border-slate-300 text-slate-600 bg-white'
                      }`}
                    >
                      Commercial Facility
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="modal-zipcode" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Service ZIP Code</label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3.5 text-slate-400 w-5 h-5" />
                    <input
                      type="text"
                      id="modal-zipcode"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                      placeholder="e.g. 90210"
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-semibold text-slate-800 placeholder-slate-400 focus:bg-white focus:border-accent-blue focus:outline-none transition-all text-sm"
                    />
                  </div>
                  {zipError && (
                    <span className="text-xs font-medium text-red-500 block mt-1">{zipError}</span>
                  )}
                  <span className="text-[11px] text-slate-400 block mt-1">We service all central metro areas and surrounding suburbs.</span>
                </div>
              </div>

              <div className="pt-6 flex justify-between items-center">
                <button
                  id="modal-prev-step-3"
                  onClick={handlePrevStep}
                  className="px-4 py-2.5 text-slate-500 hover:text-slate-900 font-semibold text-sm flex items-center gap-1.5 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button
                  id="modal-next-step-3"
                  onClick={handleNextStep}
                  className="px-6 py-3 bg-accent-blue hover:bg-blue-600 text-white rounded-xl font-semibold text-sm flex items-center gap-2 shadow-lg shadow-blue-200 hover:shadow-xl transition-all cursor-pointer"
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="text-center max-w-md mx-auto mb-2">
                <span className="text-accent-blue text-xs font-semibold tracking-wider uppercase">Step 4 of 5</span>
                <h4 className="font-display text-xl font-bold text-slate-900 mt-1">Your Instant Price Estimate</h4>
                <p className="text-slate-500 text-sm mt-1">Based on local dispatch rates and selected job profile options.</p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 text-center max-w-md mx-auto space-y-4">
                <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">Estimated Job Range</span>
                <div className="flex items-center justify-center gap-1 text-slate-900">
                  <DollarSign className="w-8 h-8 text-slate-400 -mt-2" />
                  <span className="font-display text-4xl md:text-5xl font-extrabold tracking-tight">
                    {currentEstimate.min} - {currentEstimate.max}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                  This range covers standard parts and labor diagnostics. Our technician will confirm the exact price before starting any work.
                </p>

                <div className="border-t border-slate-200/60 pt-4 mt-2 grid grid-cols-2 gap-2 text-left text-xs">
                  <div>
                    <span className="text-slate-400 block font-medium">Service Area:</span>
                    <span className="font-semibold text-slate-800 block">ZIP Code {zipCode}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Urgency:</span>
                    <span className={`font-semibold block ${urgency === 'same_day' ? 'text-red-500' : 'text-slate-800'}`}>
                      {URGENCY_LEVELS.find(u => u.id === urgency)?.label}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100/60 flex items-start gap-3 max-w-md mx-auto">
                <Sparkles className="w-5 h-5 text-accent-blue shrink-0 mt-0.5" />
                <p className="text-xs text-blue-900 leading-relaxed font-medium">
                  <strong>Conversion Advantage:</strong> Proceed to submit details to secure this locked-in estimate and book priority slot scheduling. No credit card required.
                </p>
              </div>

              <div className="pt-6 flex justify-between items-center">
                <button
                  id="modal-prev-step-4"
                  onClick={handlePrevStep}
                  className="px-4 py-2.5 text-slate-500 hover:text-slate-900 font-semibold text-sm flex items-center gap-1.5 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button
                  id="modal-next-step-4"
                  onClick={handleNextStep}
                  className="px-6 py-3 bg-accent-blue hover:bg-blue-600 text-white rounded-xl font-semibold text-sm flex items-center gap-2 shadow-lg shadow-blue-200 hover:shadow-xl transition-all cursor-pointer"
                >
                  Secure Estimate & Book <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-5"
            >
              <div className="text-center max-w-md mx-auto mb-3">
                <span className="text-accent-blue text-xs font-semibold tracking-wider uppercase">Step 5 of 5</span>
                <h4 className="font-display text-xl font-bold text-slate-900 mt-1">Where should we send your plumber?</h4>
                <p className="text-slate-500 text-sm mt-1">Provide your contact info to schedule a final technician confirmation call.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
                {formError && (
                  <div className="p-3 bg-red-50 text-red-600 rounded-xl border border-red-100 text-xs font-semibold">
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="modal-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Your Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 text-slate-400 w-4.5 h-4.5" />
                      <input
                        type="text"
                        id="modal-name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-slate-800 placeholder-slate-400 focus:bg-white focus:border-accent-blue focus:outline-none transition-all text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="modal-phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3.5 text-slate-400 w-4.5 h-4.5" />
                      <input
                        type="tel"
                        id="modal-phone"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(555) 000-0000"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-slate-800 placeholder-slate-400 focus:bg-white focus:border-accent-blue focus:outline-none transition-all text-sm font-medium"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="modal-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 text-slate-400 w-4.5 h-4.5" />
                    <input
                      type="email"
                      required
                      id="modal-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-slate-800 placeholder-slate-400 focus:bg-white focus:border-accent-blue focus:outline-none transition-all text-sm font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="modal-details" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Describe the issue (Optional)</label>
                  <textarea
                    id="modal-details"
                    rows={3}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="E.g. water heater leaking at the base, main kitchen sink is clogged..."
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-slate-800 placeholder-slate-400 focus:bg-white focus:border-accent-blue focus:outline-none transition-all text-sm font-medium resize-none"
                  />
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button
                    type="button"
                    id="modal-prev-step-5"
                    onClick={handlePrevStep}
                    className="px-4 py-2.5 text-slate-500 hover:text-slate-900 font-semibold text-sm flex items-center gap-1.5 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    type="submit"
                    id="modal-submit-booking-btn"
                    className="px-6 py-3 bg-primary-navy hover:bg-slate-800 text-white rounded-xl font-semibold text-sm flex items-center gap-2 shadow-lg shadow-slate-300 transition-all cursor-pointer"
                  >
                    Submit Booking Request <CheckCircle className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {step === 6 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 space-y-6 max-w-md mx-auto"
            >
              <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto border-2 border-green-100 animate-bounce">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h4 className="font-display text-2xl font-bold text-slate-900">Request Submitted Successfully!</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  We've received your booking request. Our dispatcher is reviewing your estimate and will call you at <strong className="text-slate-800">{phone}</strong> within 15 minutes.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-left text-xs space-y-2.5">
                <div className="flex justify-between border-b border-slate-200/50 pb-2">
                  <span className="text-slate-400 font-medium">Estimated Range:</span>
                  <span className="font-bold text-slate-800">{currentEstimate.min} - {currentEstimate.max}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/50 pb-2">
                  <span className="text-slate-400 font-medium">Service ZIP:</span>
                  <span className="font-semibold text-slate-800">{zipCode}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/50 pb-2">
                  <span className="text-slate-400 font-medium">Urgency:</span>
                  <span className="font-semibold text-red-500 uppercase tracking-wider text-[10px]">
                    {URGENCY_LEVELS.find(u => u.id === urgency)?.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Reference Code:</span>
                  <span className="font-mono font-bold text-accent-blue">PL-{Math.floor(Math.random() * 90000 + 10000)}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  id="modal-success-close-btn"
                  onClick={onClose}
                  className="w-full py-3 bg-primary-navy hover:bg-slate-800 text-white rounded-xl font-semibold text-sm transition-all cursor-pointer"
                >
                  Close & Return Home
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
