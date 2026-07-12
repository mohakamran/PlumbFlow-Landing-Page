import React, { useState } from 'react';
import { ShieldCheck, Award, MapPin, Users, Heart, CheckCircle2, ChevronRight, HelpCircle, Sparkles, Building, Briefcase } from 'lucide-react';

export default function AboutUs() {
  const [zipCode, setZipCode] = useState('');
  const [zipCheckResult, setZipCheckResult] = useState<{
    checked: boolean;
    isCovered: boolean;
    arrivalEstimate: string;
    message: string;
  } | null>(null);

  // Simple active coverage validator
  const handleCheckCoverage = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanZip = zipCode.trim();
    if (!cleanZip) return;

    // Simulate coverage logic
    // Cover typical metro codes like 10001, 20002, 90210, etc, or any 5 digit code ending with odd numbers
    const isFiveDigit = /^\d{5}$/.test(cleanZip);
    if (!isFiveDigit) {
      setZipCheckResult({
        checked: true,
        isCovered: false,
        arrivalEstimate: '',
        message: 'Please enter a valid 5-digit US Zip Code.'
      });
      return;
    }

    const lastDigit = parseInt(cleanZip.charAt(4));
    // Let's pretend codes ending with 0, 1, 2, 3, 5, 7, 8 are covered (80% coverage rate)
    const isCovered = [0, 1, 2, 3, 5, 7, 8].includes(lastDigit);

    if (isCovered) {
      // Generate realistic arrival estimate based on ZIP number
      const minutes = 25 + (lastDigit * 2);
      setZipCheckResult({
        checked: true,
        isCovered: true,
        arrivalEstimate: `${minutes} Minutes`,
        message: `Excellent news! ZIP ${cleanZip} is inside our Priority Dispatch Grid. Plumbers are active in your area.`
      });
    } else {
      setZipCheckResult({
        checked: true,
        isCovered: false,
        arrivalEstimate: '',
        message: `ZIP ${cleanZip} is outside our standard 45-minute rapid response area. Please contact our main office directly to request scheduled custom bookings.`
      });
    }
  };

  const teamMembers = [
    {
      name: 'Thomas Miller',
      role: 'Master Plumber & Founder',
      experience: '24 Years Experience',
      cert: 'NATE & PHCC Certified',
      bio: 'Thomas founded Reliable Plumbing with a simple dream: upfront flat pricing and absolute meticulous cleanups.',
      avatarInitials: 'TM',
      badge: 'Owner'
    },
    {
      name: 'Marcus Vance',
      role: 'Lead Commercial specialist',
      experience: '12 Years Experience',
      cert: 'OSHA 30 Certified',
      bio: 'Marcus manages commercial sewer lines, massive boiler replacements, and multi-unit diagnostic jobs.',
      avatarInitials: 'MV',
      badge: 'Chief'
    },
    {
      name: 'Elena Rostova',
      role: 'Head Dispatch Supervisor',
      experience: '8 Years Experience',
      cert: 'FEMA Crisis Response Trained',
      bio: 'Elena coordinates our active fleet coordinates, ensuring trucks arrive at your doorstep in under 45 minutes.',
      avatarInitials: 'ER',
      badge: 'Dispatch'
    }
  ];

  const credentials = [
    { title: 'PHCC Registered Master', detail: 'Plumbing-Heating-Cooling Contractors Association active membership.' },
    { title: 'Fully Bonded & Insured', detail: '$2,000,000 General Liability policy covers all residential plumbing systems.' },
    { title: 'EPA Lead-Safe Certified', detail: 'Safe operations, clean water pipelines, and non-toxic materials guaranteed.' },
    { title: 'OSHA Safety Compliant', detail: 'Our entire field crew strictly adheres to strict accident-free guidelines.' }
  ];

  return (
    <div className="space-y-16 animate-fade-in-up">
      
      {/* About Us Banner Section */}
      <section className="bg-gradient-to-br from-[#003366] to-[#004B93] text-white py-16 px-6 md:px-12 text-center relative overflow-hidden rounded-[2rem] md:rounded-[3rem] mx-4 md:mx-8 mt-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto space-y-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-200 text-xs font-bold uppercase px-3 py-1 rounded-full border border-blue-500/10 font-display">
            Our Legacy
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-black tracking-tight text-white">
            Our Story & Values
          </h1>
          <p className="text-sm md:text-base text-blue-100/90 max-w-xl mx-auto leading-relaxed">
            Family-owned, state-licensed, and local. We deliver modern diagnostic techniques with old-school customer service values.
          </p>
        </div>
      </section>

      {/* Narrative block */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-accent-blue text-xs font-black tracking-widest uppercase block font-display">
                How We Started
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-slate-950">
                Over Two Decades of Uncompromised Quality
              </h2>
            </div>
            
            <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
              Founded in 2002 by Thomas Miller, Reliable Plumbing was built to solve a simple problem: homeowners were tired of bait-and-switch hourly rates and messy, ruined floorboards. Thomas wanted to create a firm that combined premium tool kits with honest flat fees.
            </p>
            <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
              Today, we operate a fleet of fully loaded mobile service trucks, ready to handle everything from midnight water heater repairs to sewer line hydro-jetting. Our core value remains identical: treat every customer's home like our own mother's.
            </p>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                <span className="font-display font-black text-2xl text-primary-navy block">24+</span>
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mt-1">Years Active</span>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                <span className="font-display font-black text-2xl text-primary-navy block">15k+</span>
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mt-1">Homes Serviced</span>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                <span className="font-display font-black text-2xl text-primary-navy block">100%</span>
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mt-1">Written Warranty</span>
              </div>
            </div>
          </div>

          {/* Interactive ZIP coverage checker block */}
          <div className="p-6 md:p-8 bg-slate-50 border border-slate-100 rounded-[2rem] space-y-6 shadow-sm">
            <div className="space-y-1">
              <span className="text-accent-blue text-xs font-black tracking-widest uppercase block font-display">
                Service Region Validator
              </span>
              <h3 className="font-display text-xl font-extrabold text-slate-900">
                Are You Inside Our 45-Min Zone?
              </h3>
              <p className="text-xs text-slate-500">
                Enter your 5-digit ZIP code below to verify current dispatcher presence and live arrival windows.
              </p>
            </div>

            <form onSubmit={handleCheckCoverage} className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={5}
                  value={zipCode}
                  onChange={(e) => {
                    setZipCode(e.target.value.replace(/\D/g, ''));
                    setZipCheckResult(null);
                  }}
                  placeholder="e.g. 10001"
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-mono font-bold text-sm focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-300"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-accent-blue hover:bg-blue-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Verify Area
                </button>
              </div>

              {zipCheckResult?.checked && (
                <div 
                  className={`p-4 rounded-xl border text-xs leading-relaxed animate-fade-in-up ${
                    zipCheckResult.isCovered
                      ? 'bg-green-50 border-green-100 text-green-800'
                      : 'bg-amber-50 border-amber-100 text-amber-800'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <div className="p-1 rounded-full shrink-0 mt-0.5">
                      {zipCheckResult.isCovered ? (
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      ) : (
                        <MapPin className="w-4 h-4 text-amber-600" />
                      )}
                    </div>
                    <div>
                      <strong className="font-extrabold block mb-1">
                        {zipCheckResult.isCovered ? '✓ Active Service Zone' : 'ℹ Limited Response'}
                      </strong>
                      <p>{zipCheckResult.message}</p>
                      {zipCheckResult.isCovered && (
                        <div className="mt-3 flex items-center gap-1.5 font-mono text-[11px] bg-green-100/60 text-green-900 px-2.5 py-1 rounded-md w-fit">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                          <span>Est. Arrival: <strong>{zipCheckResult.arrivalEstimate}</strong></span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </form>

            <div className="border-t border-slate-200/60 pt-4 text-[11px] text-slate-400 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-300 shrink-0" />
              <span>Covering the entire metropolitan area and surrounding residential counties.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Safety & certifications credentials layout */}
      <section className="bg-slate-900 text-white py-12 px-6 md:px-12 rounded-[2.5rem] mx-4 md:mx-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-accent-blue text-xs font-black tracking-widest uppercase block font-display">
              Strict Standards
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold">
              Safety, Licenses & Compliance
            </h2>
            <p className="text-xs text-slate-400 max-w-lg mx-auto">
              Our firm maintains the absolute highest licensing requirements inside the state. Here are our certified standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {credentials.map((cred, i) => (
              <div 
                key={i} 
                className="bg-slate-950 p-6 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-colors space-y-2"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-accent-blue flex items-center justify-center font-bold text-xs">
                  0{i+1}
                </div>
                <h4 className="font-bold text-sm text-slate-100 font-display">
                  {cred.title}
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {cred.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the team section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-8 pb-4">
        <div className="text-center space-y-2">
          <span className="text-accent-blue text-xs font-black tracking-widest uppercase block font-display">
            Local Heroes
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-slate-950">
            Meet Our Master Plumbers
          </h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            These are the certified field dispatch supervisors who keep your systems humming perfectly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((member, i) => (
            <div 
              key={i}
              className="bg-white border border-slate-100 rounded-3xl p-6 hover-scale-card space-y-4 text-left"
            >
              <div className="flex items-center gap-4">
                {/* Initials Avatar */}
                <div className="w-14 h-14 bg-gradient-to-br from-[#003366] to-[#0056b3] text-white rounded-2xl flex items-center justify-center text-lg font-black font-display shrink-0 shadow-md">
                  {member.avatarInitials}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-slate-900 text-sm md:text-base font-display">
                      {member.name}
                    </h3>
                    <span className="text-[9px] bg-blue-100 text-accent-blue font-bold px-1.5 py-0.5 rounded-full font-mono">
                      {member.badge}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 font-medium block">
                    {member.role}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 border-t border-slate-100 pt-3 text-xs text-slate-600">
                <div className="flex items-center gap-1.5 font-bold">
                  <Award className="w-3.5 h-3.5 text-accent-blue" />
                  <span>{member.experience}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[10px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                  <span>{member.cert}</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed italic">
                "{member.bio}"
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
