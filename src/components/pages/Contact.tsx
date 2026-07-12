import React, { useState } from 'react';
import { Phone, Clock, Mail, MapPin, Send, CheckCircle2, ShieldCheck, HelpCircle, Sparkles, AlertCircle } from 'lucide-react';
import { Booking } from '../../types';

interface ContactProps {
  onBookingSuccess: (booking: Booking) => void;
}

export default function Contact({ onBookingSuccess }: ContactProps) {
  // Form States
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [serviceType, setServiceType] = useState('Leak Detection');
  const [zipCode, setZipCode] = useState('');
  const [details, setDetails] = useState('');
  const [isEmergency, setIsEmergency] = useState(false);
  
  // Validation / Feedback states
  const [errors, setErrors] = useState<string[]>([]);
  const [submittedBooking, setSubmittedBooking] = useState<Booking | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableServices = [
    'Emergency Plumbing',
    'Drain Cleaning & Hydro-Jetting',
    'Leak Detection',
    'Pipe Repair & Replacement',
    'Water Heater Diagnostic',
    'Faucets & Fixtures Install'
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];

    // Basic Validations
    if (!name.trim()) newErrors.push('Please enter your full name.');
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      newErrors.push('Please enter a valid 10-digit phone number.');
    }
    if (!zipCode.trim() || !/^\d{5}$/.test(zipCode)) {
      newErrors.push('Please enter a valid 5-digit US Zip Code.');
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors([]);
    setIsSubmitting(true);

    // Simulate database insert & estimate generator
    setTimeout(() => {
      // Calculate a realistic plumbing cost range
      let baseCost = 140;
      if (serviceType.includes('Emergency')) baseCost = 280;
      if (serviceType.includes('Drain')) baseCost = 165;
      if (serviceType.includes('Leak')) baseCost = 195;
      
      const emergencyPremium = isEmergency ? 95 : 0;
      const minPrice = baseCost + emergencyPremium;
      const maxPrice = Math.round(minPrice * 1.35);

      const generatedBooking: Booking = {
        id: `PL-${Math.floor(10000 + Math.random() * 90000)}`,
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || 'Not specified',
        serviceType: serviceType,
        zipCode: zipCode.trim(),
        estimatedPrice: `$${minPrice} - $${maxPrice}`,
        timestamp: new Date().toLocaleString(),
        urgency: isEmergency ? 'same_day' : 'soon',
        details: details.trim() || 'Urgent repair requested',
        status: isEmergency ? 'scheduled' : 'pending'
      };

      // Push back to primary App state so dispatcher ledger is instantly refreshed
      onBookingSuccess(generatedBooking);
      setSubmittedBooking(generatedBooking);
      setIsSubmitting(false);

      // Clear fields
      setName('');
      setPhone('');
      setEmail('');
      setZipCode('');
      setDetails('');
      setIsEmergency(false);
    }, 1000);
  };

  const businessHours = [
    { day: 'Monday', hours: '24 Hours Open', tag: 'Emergency staff active' },
    { day: 'Tuesday', hours: '24 Hours Open', tag: 'Emergency staff active' },
    { day: 'Wednesday', hours: '24 Hours Open', tag: 'Emergency staff active' },
    { day: 'Thursday', hours: '24 Hours Open', tag: 'Emergency staff active' },
    { day: 'Friday', hours: '24 Hours Open', tag: 'Emergency staff active' },
    { day: 'Saturday', hours: '24 Hours Open', tag: 'Weekend crew active' },
    { day: 'Sunday', hours: '24 Hours Open', tag: 'Weekend crew active' }
  ];

  return (
    <div className="space-y-16 animate-fade-in-up">
      
      {/* Contact Banner Section */}
      <section className="bg-gradient-to-br from-[#003366] to-[#004B93] text-white py-16 px-6 md:px-12 text-center relative overflow-hidden rounded-[2rem] md:rounded-[3rem] mx-4 md:mx-8 mt-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto space-y-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-200 text-xs font-bold uppercase px-3 py-1 rounded-full border border-blue-500/10 font-display">
            Reach Dispatch
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-black tracking-tight text-white">
            Connect With Us 24/7
          </h1>
          <p className="text-sm md:text-base text-blue-100/90 max-w-xl mx-auto leading-relaxed">
            Fill out the high-conversion inquiry form below to lock your price quote range or trigger priority emergency dispatch immediately.
          </p>
        </div>
      </section>

      {/* Main Form and contact cards split */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Block: Lead-Focused High-Conversion Form */}
          <div className="lg:col-span-7 bg-white border border-slate-100 rounded-[2rem] p-6 md:p-8 shadow-sm space-y-6">
            
            <div className="border-b border-slate-100 pb-4">
              <h2 className="font-display font-extrabold text-[#003366] text-xl">
                Request Service & Price Quote
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Your submission is transmitted instantly to our Active Dispatcher ledger dashboard.
              </p>
            </div>

            {/* Error notifications */}
            {errors.length > 0 && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-800 rounded-xl space-y-1 text-xs">
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span>Please correct the following fields:</span>
                </div>
                <ul className="list-disc list-inside space-y-1 ml-1">
                  {errors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Form Success feedback card */}
            {submittedBooking && (
              <div className="p-6 bg-green-50 border border-green-100 rounded-2xl space-y-4 text-slate-800 animate-fade-in-up">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-green-500 text-white rounded-xl shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-green-900 text-sm md:text-base">
                      Lead Transmitted Successfully!
                    </h4>
                    <span className="text-[10px] font-mono text-green-700 bg-green-100 px-2 py-0.5 rounded mt-1 inline-block">
                      Ref Code: {submittedBooking.id}
                    </span>
                    <p className="text-xs text-green-800 mt-2 leading-relaxed">
                      Thank you, <strong>{submittedBooking.name}</strong>. Your estimate range is locked. An active field technician is preparing to contact you at <strong className="font-mono text-green-950">{submittedBooking.phone}</strong>.
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-green-100 p-4 rounded-xl flex items-center justify-between text-xs font-medium">
                  <div>
                    <span className="text-[9px] text-slate-400 block uppercase font-bold">Estimated Cost Range</span>
                    <span className="text-sm font-black text-[#003366] font-display">{submittedBooking.estimatedPrice}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-slate-400 block uppercase font-bold">Dispatch Status</span>
                    <span className="text-xs text-green-600 font-extrabold">
                      {submittedBooking.status === 'scheduled' ? 'Active Dispatch' : 'Awaiting Review'}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSubmittedBooking(null)}
                  className="w-full text-center py-2 text-xs font-bold text-accent-blue hover:underline"
                >
                  Submit Another Request
                </button>
              </div>
            )}

            {/* Standard contact form */}
            {!submittedBooking && (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-accent-blue focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-3 text-slate-800 text-xs md:text-sm transition-all focus:outline-none"
                    />
                  </div>

                  {/* Phone field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. (555) 555-5555"
                      className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-accent-blue focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-3 text-slate-800 font-mono text-xs md:text-sm transition-all focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email address */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-accent-blue focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-3 text-slate-800 text-xs md:text-sm transition-all focus:outline-none"
                    />
                  </div>

                  {/* ZIP code */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={5}
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ''))}
                      placeholder="e.g. 10001"
                      className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-accent-blue focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-3 text-slate-800 font-mono text-xs md:text-sm transition-all focus:outline-none"
                    />
                  </div>
                </div>

                {/* Service Type dropdown selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Service Needed *
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-accent-blue focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-3 text-slate-800 text-xs md:text-sm transition-all focus:outline-none cursor-pointer"
                  >
                    {availableServices.map((svc) => (
                      <option key={svc} value={svc}>
                        {svc}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Comments / Details */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Problem Details / Symptoms
                  </label>
                  <textarea
                    rows={3}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Briefly describe what is leaking or clogged (e.g. low pressure, rusty water...)"
                    className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-accent-blue focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-3 text-slate-800 text-xs md:text-sm transition-all focus:outline-none resize-none"
                  />
                </div>

                {/* Emergency dispatch override toggle */}
                <div className="bg-red-50 border border-red-100/60 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-xs font-extrabold text-red-950 block">This is an urgent water emergency</span>
                    <span className="text-[10px] text-red-700 block mt-0.5">Alert dispatcher for immediate arrival.</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsEmergency(!isEmergency)}
                    className={`w-12 h-6.5 rounded-full p-1 transition-colors relative cursor-pointer ${
                      isEmergency ? 'bg-red-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`block w-4.5 h-4.5 bg-white rounded-full shadow transform transition-transform ${
                        isEmergency ? 'translate-x-5.5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Submit Inquiry button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-accent-blue hover:bg-blue-600 disabled:bg-slate-300 text-white font-extrabold rounded-xl transition-all shadow-lg shadow-blue-500/20 text-center flex items-center justify-center gap-2 text-xs md:text-sm cursor-pointer uppercase tracking-wider font-display"
                >
                  {isSubmitting ? (
                    <span>Transmitting Lead...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit & Lock Estimate</span>
                    </>
                  )}
                </button>

              </form>
            )}

          </div>

          {/* Right Block: Hotlines & Business Hours & Map Placeholders */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Hotline Dial Card */}
            <div className="bg-gradient-to-br from-[#003366] to-[#004B93] text-white p-6 rounded-[2rem] border border-blue-950/40 space-y-4">
              <div className="space-y-1">
                <span className="text-xs text-blue-200 block font-bold uppercase tracking-wider">
                  24/7 Telephone Line
                </span>
                <h3 className="font-display font-black text-xl leading-snug">
                  Speak Directly with Dispatch Supervisor
                </h3>
              </div>

              <a
                href="tel:8005557586"
                className="block w-full py-3.5 bg-white hover:bg-blue-50 text-slate-900 font-extrabold text-center rounded-xl transition-all font-mono shadow text-sm"
              >
                Call: (800) 555-7586
              </a>

              <div className="flex items-center gap-2 text-[10px] text-blue-200">
                <ShieldCheck className="w-4 h-4 text-green-400 shrink-0" />
                <span>Zero service call dispatch fees with repair pre-approval.</span>
              </div>
            </div>

            {/* Operating business hours */}
            <div className="bg-white border border-slate-100 rounded-[2rem] p-6 space-y-4">
              <h4 className="font-display font-extrabold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-3">
                <Clock className="w-4 h-4 text-accent-blue" />
                <span>Dispatch Availability Calendar</span>
              </h4>

              <div className="divide-y divide-slate-100">
                {businessHours.map((bh, i) => (
                  <div key={i} className="flex items-center justify-between py-2 text-xs">
                    <span className="font-semibold text-slate-800">{bh.day}</span>
                    <div className="text-right">
                      <span className="font-mono text-green-600 font-bold block">{bh.hours}</span>
                      <span className="text-[9px] text-slate-400 block leading-none mt-0.5">{bh.tag}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coverage Map placeholder graphic as requested */}
            <div className="bg-slate-950 text-white rounded-[2rem] p-6 border border-slate-800/80 space-y-4 text-center overflow-hidden relative">
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent-blue/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Metro Coverage Region</span>
                <h4 className="font-display text-xs font-bold text-slate-200">Interactive Dispatch Hotspots</h4>
              </div>

              {/* Styled Vector graphic mockup representing coverage radius circles */}
              <div className="relative h-28 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
                
                {/* Visual radar wave effect */}
                <div className="absolute w-20 h-20 bg-accent-blue/5 border border-accent-blue/20 rounded-full animate-pulse" />
                <div className="absolute w-12 h-12 bg-accent-blue/10 border border-accent-blue/30 rounded-full" />
                <div className="absolute w-4 h-4 bg-accent-blue rounded-full flex items-center justify-center shadow-lg shadow-blue-500/50">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                </div>

                <div className="absolute top-3 left-4 text-[9px] font-mono text-slate-500">Dispatch Central</div>
                <div className="absolute bottom-3 right-4 text-[9px] font-mono text-green-400 flex items-center gap-1 bg-green-500/10 px-1.5 py-0.5 rounded border border-green-500/15">
                  <span className="w-1 h-1 rounded-full bg-green-400 animate-ping" />
                  <span>GPS Trucks Active</span>
                </div>
              </div>

              <p className="text-[10px] text-slate-400 leading-normal">
                Serving all main suburbs and downtown centers. Standard arrival time is less than 45 minutes from submission.
              </p>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
