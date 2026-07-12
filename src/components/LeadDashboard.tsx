import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  Trash2, 
  Calendar, 
  MapPin, 
  Phone, 
  User, 
  ShieldAlert, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  Inbox
} from 'lucide-react';
import { Booking } from '../types';

interface LeadDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRefresh: number;
}

const PRESEEDED_LEADS: Booking[] = [
  {
    id: 'PL-82741',
    timestamp: '2026-07-11 14:32:10',
    name: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    phone: '(415) 555-0198',
    zipCode: '94103',
    serviceType: 'Hydro-Jet Drain Cleaning',
    urgency: 'same_day',
    details: 'Kitchen drain is completely backed up. Standing water has begun to smell. Need urgent dispatch.',
    status: 'scheduled',
    estimatedPrice: '$200 - $350'
  },
  {
    id: 'PL-49201',
    timestamp: '2026-07-11 11:15:43',
    name: 'Robert Miller',
    email: 'r.miller@example.com',
    phone: '(415) 555-7824',
    zipCode: '94112',
    serviceType: 'Pipe Repair & Replace',
    urgency: 'soon',
    details: 'Water piping under the bathroom sink is slowly dripping at the shut-off valve joint.',
    status: 'pending',
    estimatedPrice: '$150 - $280'
  }
];

export default function LeadDashboard({ isOpen, onClose, triggerRefresh }: LeadDashboardProps) {
  const [leads, setLeads] = useState<Booking[]>([]);

  useEffect(() => {
    // Load leads
    const stored = JSON.parse(localStorage.getItem('plumbing_leads') || '[]');
    if (stored.length === 0) {
      // Seed initial data if none exists
      localStorage.setItem('plumbing_leads', JSON.stringify(PRESEEDED_LEADS));
      setLeads(PRESEEDED_LEADS);
    } else {
      setLeads(stored);
    }
  }, [isOpen, triggerRefresh]);

  const handleDelete = (id: string) => {
    const filtered = leads.filter(l => l.id !== id);
    localStorage.setItem('plumbing_leads', JSON.stringify(filtered));
    setLeads(filtered);
  };

  const handleStatusChange = (id: string, newStatus: 'pending' | 'scheduled' | 'completed') => {
    const updated = leads.map(l => {
      if (l.id === id) {
        return { ...l, status: newStatus };
      }
      return l;
    });
    localStorage.setItem('plumbing_leads', JSON.stringify(updated));
    setLeads(updated);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full max-w-xl bg-slate-900 text-slate-100 h-full flex flex-col shadow-2xl relative border-l border-slate-800"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="bg-accent-blue/10 p-2.5 rounded-xl border border-accent-blue/20 text-accent-blue">
              <ShieldAlert className="w-5 h-5 animate-pulse-subtle" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold">Admin Dispatch Ledger</h3>
              <p className="text-slate-400 text-xs">Real-time incoming job leads & customer quotes</p>
            </div>
          </div>
          <button 
            id="close-admin-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-3 gap-2 p-4 bg-slate-900 border-b border-slate-800">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Leads</span>
            <span className="font-display text-lg font-extrabold text-slate-100 mt-0.5 block">{leads.length}</span>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider block">Urgent Action</span>
            <span className="font-display text-lg font-extrabold text-red-400 mt-0.5 block">
              {leads.filter(l => l.urgency === 'same_day' && l.status === 'pending').length}
            </span>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-green-400 font-bold uppercase tracking-wider block">Est. Revenue</span>
            <span className="font-display text-lg font-extrabold text-green-400 mt-0.5 block flex items-center justify-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" />
              {leads.length * 280}$
            </span>
          </div>
        </div>

        {/* Lead List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950">
          {leads.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Inbox className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-slate-400 text-sm">No incoming leads captured yet.</p>
              <p className="text-slate-500 text-xs">Use the Quote Assistant on the landing page to test lead submission.</p>
            </div>
          ) : (
            leads.map((l) => (
              <motion.div
                key={l.id}
                layout
                id={`lead-card-${l.id}`}
                className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5 space-y-4 hover:border-slate-700 transition-all shadow-sm"
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-display font-bold text-sm text-slate-200">{l.name}</span>
                      <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 font-mono">{l.id}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                        l.urgency === 'same_day' 
                        ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                        : l.urgency === 'soon' 
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-green-500/10 text-green-400 border border-green-500/20'
                      }`}>
                        {l.urgency.replace('_', ' ')}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-accent-blue block">{l.serviceType}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-extrabold text-sm text-green-400 bg-green-500/5 px-2.5 py-1 rounded-lg border border-green-500/15">
                      {l.estimatedPrice}
                    </span>
                    <button
                      id={`delete-lead-${l.id}`}
                      onClick={() => handleDelete(l.id)}
                      className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                      title="Delete Lead"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Details Paragraph */}
                <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800/50 leading-relaxed font-medium">
                  {l.details}
                </p>

                {/* Meta details */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 text-[11px] text-slate-400 border-t border-slate-800/60 pt-3">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    <span className="font-semibold text-slate-300">{l.phone}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span className="font-semibold text-slate-300">ZIP: {l.zipCode}</span>
                  </div>
                  <div className="flex items-center gap-1.5 col-span-2 md:col-span-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span className="font-semibold text-slate-300 truncate" title={l.timestamp}>{l.timestamp.split(',')[0]}</span>
                  </div>
                </div>

                {/* Status Toggle Actions */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/40 text-[11px]">
                  <span className="text-slate-400 font-bold uppercase tracking-wider">Status:</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      id={`status-pending-${l.id}`}
                      onClick={() => handleStatusChange(l.id, 'pending')}
                      className={`px-2.5 py-1 rounded-lg border font-semibold transition-all cursor-pointer ${
                        l.status === 'pending'
                        ? 'bg-blue-500/10 text-accent-blue border-accent-blue/30'
                        : 'bg-transparent text-slate-500 border-slate-800 hover:text-slate-300'
                      }`}
                    >
                      Pending
                    </button>
                    <button
                      id={`status-scheduled-${l.id}`}
                      onClick={() => handleStatusChange(l.id, 'scheduled')}
                      className={`px-2.5 py-1 rounded-lg border font-semibold transition-all cursor-pointer ${
                        l.status === 'scheduled'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-400/30'
                        : 'bg-transparent text-slate-500 border-slate-800 hover:text-slate-300'
                      }`}
                    >
                      Dispatched
                    </button>
                    <button
                      id={`status-completed-${l.id}`}
                      onClick={() => handleStatusChange(l.id, 'completed')}
                      className={`px-2.5 py-1 rounded-lg border font-semibold transition-all cursor-pointer ${
                        l.status === 'completed'
                        ? 'bg-green-500/10 text-green-400 border-green-400/30'
                        : 'bg-transparent text-slate-500 border-slate-800 hover:text-slate-300'
                      }`}
                    >
                      Completed
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-center text-[10px] text-slate-500 font-medium">
          Only visible during developer evaluation. Stored locally in browser state.
        </div>
      </motion.div>
    </div>
  );
}
