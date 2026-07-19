import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  MapPin, 
  Mail, 
  Phone, 
  DollarSign, 
  Calendar, 
  Plus, 
  ArrowLeft, 
  Zap, 
  FileText, 
  ChevronRight, 
  User, 
  TrendingUp, 
  Activity, 
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export interface Lead {
  id: string;
  name: string;
  city: string;
  size: string;
  phone: string;
  date: string;
  status: string;
  address: string;
  email?: string;
  monthlyBill?: string;
  energyNeed?: string;
  notes?: string[];
}

interface CustomerLeadsTabProps {
  leads: Lead[];
  onAddLead: (lead: Omit<Lead, 'id' | 'date'>) => void;
  onSendQuotation: (lead: Lead) => void;
  selectedLead: Lead | null;
  setSelectedLead: (lead: Lead | null) => void;
}

export default function CustomerLeadsTab({ 
  leads, 
  onAddLead, 
  onSendQuotation, 
  selectedLead, 
  setSelectedLead 
}: CustomerLeadsTabProps) {
  const [filter, setFilter] = useState<string>('All');
  const [search, setSearch] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  
  // Form states for manual lead addition
  const [newName, setNewName] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newSize, setNewSize] = useState('5');
  const [newPhone, setNewPhone] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newBill, setNewBill] = useState('8500');

  // Filter and search logic
  const filteredLeads = leads.filter(lead => {
    const matchesFilter = filter === 'All' || lead.status === filter;
    const matchesSearch = 
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.city.toLowerCase().includes(search.toLowerCase()) ||
      lead.address.toLowerCase().includes(search.toLowerCase()) ||
      lead.size.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddLead({
      name: newName,
      city: newCity,
      size: `${newSize} kW`,
      phone: newPhone,
      status: 'New',
      address: newAddress,
      email: newEmail || `${newName.toLowerCase().replace(/\s+/g, '')}@example.com`,
      monthlyBill: `₹${parseFloat(newBill).toLocaleString('en-IN')}`,
    });
    // Reset form
    setNewName('');
    setNewCity('');
    setNewSize('5');
    setNewPhone('');
    setNewAddress('');
    setNewEmail('');
    setNewBill('8500');
    setShowAddModal(false);
  };

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'New':
        return 'bg-[#00f0ff]/15 text-[#00f0ff] border-[#00f0ff]/20';
      case 'In Contact':
        return 'bg-[#cf5cff]/15 text-[#cf5cff] border-[#cf5cff]/20';
      case 'Proposal Sent':
        return 'bg-green-500/15 text-green-400 border-green-500/20';
      default:
        return 'bg-white/5 text-on-surface-variant border-white/10';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in text-left">
      {/* Detail View Overlay / Panel */}
      {selectedLead ? (
        <div className="bg-[#1d2026]/40 border border-white/5 p-8 rounded-[2.5rem] space-y-8 animate-fade-in">
          {/* Back Action */}
          <div className="flex justify-between items-center pb-6 border-b border-white/5">
            <button 
              onClick={() => setSelectedLead(null)}
              className="text-on-surface-variant hover:text-white flex items-center gap-2 text-xs font-bold border-none bg-transparent cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Marketplace Leads
            </button>
            <span className={`text-[10px] font-bold px-3 py-1.5 rounded-md border font-mono ${getStatusStyle(selectedLead.status)}`}>
              {selectedLead.status.toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Info Column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex gap-4 items-center">
                <div className="w-16 h-16 rounded-2xl bg-[#00f0ff]/10 flex items-center justify-center border border-[#00f0ff]/20">
                  <User className="w-8 h-8 text-[#00f0ff]" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">{selectedLead.name}</h3>
                  <p className="text-sm text-on-surface-variant mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#00f0ff]" />
                    {selectedLead.address}
                  </p>
                </div>
              </div>

              {/* Subsidies and Project Metrics Box */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-[#10131a] p-6 rounded-2xl border border-white/5 font-mono text-xs">
                <div>
                  <span className="text-[#b9cacb]/60 uppercase">System Target Size</span>
                  <p className="text-lg font-black text-[#00f0ff] mt-1">{selectedLead.size}</p>
                </div>
                <div>
                  <span className="text-[#b9cacb]/60 uppercase">Monthly Bill Status</span>
                  <p className="text-lg font-black text-white mt-1">{selectedLead.monthlyBill || '₹12,400'}</p>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <span className="text-emerald-400 uppercase flex items-center gap-1">
                    NovaAI Score
                    <Zap className="w-3 h-3 text-emerald-400" />
                  </span>
                  <p className="text-lg font-black text-emerald-400 mt-1">9.8 / 10</p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Contact Coordinates</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="bg-[#10131a] p-4 rounded-xl border border-white/5 flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#00f0ff]" />
                    <div>
                      <span className="text-[#b9cacb]/40 block text-[9px] uppercase">Phone Line</span>
                      <a href={`tel:${selectedLead.phone}`} className="text-white hover:text-[#00f0ff] font-bold text-sm">{selectedLead.phone}</a>
                    </div>
                  </div>
                  <div className="bg-[#10131a] p-4 rounded-xl border border-white/5 flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#cf5cff]" />
                    <div>
                      <span className="text-[#b9cacb]/40 block text-[9px] uppercase">Secure Email</span>
                      <a href={`mailto:${selectedLead.email || 'customer@example.com'}`} className="text-white hover:text-[#cf5cff] font-bold text-sm">{selectedLead.email || `${selectedLead.name.toLowerCase().replace(/\s/g, '')}@example.com`}</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Solar Predictive Analytics Section */}
              <div className="space-y-4 bg-white/[0.01] border border-white/5 p-6 rounded-2xl">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#00f0ff]" />
                  NovaAI Predictive Yield Breakdown
                </h4>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-on-surface-variant">Estimated Solar Panel Space Needed</span>
                    <span className="text-white font-bold font-mono">{(parseInt(selectedLead.size) * 10 || 50)} sq. ft.</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-on-surface-variant">Annual Generation Potential</span>
                    <span className="text-white font-bold font-mono">{(parseInt(selectedLead.size) * 1450 || 7250).toLocaleString()} kWh / Year</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-on-surface-variant">Estimated Payback Period</span>
                    <span className="text-emerald-400 font-bold font-mono">4.2 Years</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Action Panel */}
            <div className="space-y-6">
              <div className="bg-[#10131a] border border-white/5 p-6 rounded-2xl space-y-6">
                <div>
                  <h4 className="text-base font-bold text-white">Direct Actions</h4>
                  <p className="text-xs text-on-surface-variant mt-1">Deploy pricing, negotiate terms, or finalize the survey.</p>
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={() => onSendQuotation(selectedLead)}
                    className="w-full bg-[#00f0ff] hover:opacity-90 active:scale-95 text-[#002022] font-black py-3 rounded-xl text-xs transition-all flex justify-center items-center gap-2 border-none cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    Send Solar Proposal
                  </button>

                  <a 
                    href={`tel:${selectedLead.phone}`}
                    className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl text-xs transition-all flex justify-center items-center gap-2 border border-white/10 text-center cursor-pointer decoration-none"
                  >
                    <Phone className="w-4 h-4" />
                    Initiate Direct Call
                  </a>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <span className="text-[10px] text-[#b9cacb]/40 font-mono block uppercase">Verification Level</span>
                  <div className="flex items-center gap-2 mt-2 text-xs text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>MNRE Subsidy-Eligible Candidate</span>
                  </div>
                </div>
              </div>

              {/* Status Update Card */}
              <div className="bg-[#10131a] border border-white/5 p-6 rounded-2xl space-y-4">
                <span className="text-xs text-on-surface-variant font-mono uppercase">Update Lead Status</span>
                <p className="text-xs text-[#b9cacb]/80">Synchronize client milestones directly inside SolarNexus.</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {['New', 'In Contact', 'Proposal Sent'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => {
                        selectedLead.status = st;
                        setSelectedLead({ ...selectedLead });
                      }}
                      className={`py-2 rounded-lg font-bold border transition-all cursor-pointer ${
                        selectedLead.status === st 
                          ? 'bg-[#00f0ff]/10 text-[#00f0ff] border-[#00f0ff]/20'
                          : 'bg-transparent text-on-surface-variant border-white/5 hover:border-white/15'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // List View
        <>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-4xl font-black text-[#00f0ff] mb-2 tracking-tight neon-text-glow">Customer Leads</h2>
              <p className="text-sm text-on-surface-variant max-w-xl">
                Monitor and manage high-intent solar inquiries generated by NovaAI's advanced predictive engine.
              </p>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-[#00dbe9] to-[#cf5cff] text-[#002022] font-bold text-xs rounded-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 border-none cursor-pointer shadow-lg shadow-[#00f0ff]/10"
            >
              <Plus className="w-4 h-4" />
              Add Lead Manually
            </button>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
            <div className="flex gap-3 overflow-x-auto w-full md:w-auto pb-2 no-scrollbar">
              {['All', 'New', 'In Contact', 'Proposal Sent'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilter(st)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                    filter === st 
                      ? 'bg-[#00f0ff]/10 text-[#00f0ff] border-[#00f0ff]/40' 
                      : 'bg-[#10131a] border-white/10 text-on-surface-variant hover:border-white/20'
                  }`}
                >
                  {st === 'All' ? 'All Leads' : st} ({st === 'All' ? leads.length : leads.filter(l => l.status === st).length})
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
              <input 
                type="text"
                placeholder="Search customer leads, locations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#1d2026] border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-xs text-on-surface focus:outline-none focus:border-[#00f0ff]"
              />
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
            {filteredLeads.map((lead) => (
              <div 
                key={lead.id} 
                onClick={() => setSelectedLead(lead)}
                className="bg-[#1d2026]/40 border border-white/5 p-6 rounded-xl hover:border-[#00f0ff]/30 hover:shadow-[0_0_30px_rgba(0,240,255,0.05)] cursor-pointer transition-all duration-300 group flex flex-col justify-between min-h-[340px]"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg bg-[#00f0ff]/10 flex items-center justify-center border border-[#00f0ff]/20">
                        <User className="w-6 h-6 text-[#00f0ff]" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-bold text-white group-hover:text-[#00f0ff] transition-colors">{lead.name}</h3>
                        <div className="flex items-center gap-1.5 text-on-surface-variant mt-1">
                          <MapPin className="w-3.5 h-3.5 text-[#00f0ff]" />
                          <span className="text-xs font-semibold">{lead.city}, Maharashtra</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full border text-[10px] uppercase font-bold tracking-widest font-mono ${getStatusStyle(lead.status)}`}>
                      {lead.status}
                    </span>
                  </div>

                  <div className="space-y-4 mb-8 text-left">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 rounded-lg bg-white/5 border border-white/5 font-mono">
                        <p className="text-[10px] uppercase text-on-surface-variant font-bold tracking-wider mb-1">System Size</p>
                        <p className="text-lg font-black text-[#00f0ff]">{lead.size}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-white/5 border border-white/5 font-mono">
                        <p className="text-[10px] uppercase text-on-surface-variant font-bold tracking-wider mb-1">Monthly Bill</p>
                        <p className="text-lg font-black text-[#00f0ff]">{lead.monthlyBill || '₹12,400'}</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 font-mono text-xs">
                      <div className="flex items-center gap-3 text-on-surface-variant">
                        <Mail className="w-4 h-4 text-[#cf5cff]" />
                        <span className="truncate">{lead.email || `${lead.name.toLowerCase().replace(/\s+/g, '')}@example.com`}</span>
                      </div>
                      <div className="flex items-center gap-3 text-on-surface-variant">
                        <Phone className="w-4 h-4 text-[#00f0ff]" />
                        <span>{lead.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-white/5" onClick={(e) => e.stopPropagation()}>
                  <button 
                    onClick={() => setSelectedLead(lead)}
                    className="flex-1 py-3 px-4 rounded-lg border border-white/10 hover:bg-white/5 text-white font-bold text-xs transition-colors cursor-pointer text-center"
                  >
                    View Details
                  </button>
                  <button 
                    onClick={() => onSendQuotation(lead)}
                    className="flex-1 py-3 px-4 rounded-lg bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 text-[#00f0ff] font-bold text-xs border border-[#00f0ff]/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Zap className="w-4 h-4" />
                    Contact Customer
                  </button>
                </div>
              </div>
            ))}

            {filteredLeads.length === 0 && (
              <div className="col-span-full py-16 text-center border-2 border-dashed border-white/5 rounded-2xl space-y-4">
                <span className="material-symbols-outlined text-4xl text-on-surface-variant/40">search_off</span>
                <p className="text-on-surface-variant text-sm font-bold">No leads match your search criteria.</p>
                <button 
                  onClick={() => { setSearch(''); setFilter('All'); }}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl text-xs cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* Lead Management Stats (Bento Component) */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
            <div className="bg-[#1d2026]/40 border border-white/5 p-6 rounded-xl col-span-1 md:col-span-2 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#00f0ff]/5 blur-3xl rounded-full" />
              <h4 className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-6 font-bold font-mono">Market Insight</h4>
              <p className="text-lg text-[#dbfcff] leading-relaxed mb-4">
                "The Maharashtra residential cluster shows an <span className="text-[#00f0ff] font-bold">18% increase</span> in solar search intent this week."
              </p>
              <div className="flex items-center gap-2 text-[#00dbe9] text-xs font-mono">
                <TrendingUp className="w-4 h-4 text-[#00dbe9]" />
                <span>NovaAI Forecast: High Opportunity</span>
              </div>
            </div>

            <div className="bg-[#1d2026]/40 border border-white/5 p-6 rounded-xl flex flex-col justify-between">
              <Activity className="w-8 h-8 text-[#00f0ff]" />
              <div className="mt-4">
                <p className="text-3xl font-black text-white">1.4 hrs</p>
                <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider font-mono mt-1">Avg. Response Time</p>
              </div>
            </div>

            <div className="bg-[#1d2026]/40 border border-white/5 p-6 rounded-xl flex flex-col justify-between">
              <CheckCircle2 className="w-8 h-8 text-[#ecb2ff]" />
              <div className="mt-4">
                <p className="text-3xl font-black text-white">68%</p>
                <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider font-mono mt-1">Conversion Rate</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Manual Addition Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-[#0f1118] border border-[#00f0ff]/30 p-6 rounded-3xl max-w-md w-full shadow-[0_0_50px_rgba(0,240,255,0.15)] space-y-6 text-left relative">
            <div className="flex justify-between items-center pb-4 border-b border-white/5">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-[#00f0ff]" />
                Add Lead Manually
              </h4>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg hover:bg-white/5 border-none text-brand-gray hover:text-white cursor-pointer bg-transparent"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-[10px] text-[#00f0ff] font-mono uppercase">CLIENT NAME</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Sanjay Verma" 
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00f0ff]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#00f0ff] font-mono uppercase">CITY</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Pune" 
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00f0ff]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#00f0ff] font-mono uppercase">PHONE NUMBER</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. +91 98234 56789" 
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00f0ff]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#00f0ff] font-mono uppercase">SYSTEM SIZE (kW)</label>
                  <select 
                    value={newSize} 
                    onChange={(e) => setNewSize(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00f0ff]"
                  >
                    {[3, 5, 8, 10, 15].map(n => (
                      <option key={n} value={n}>{n} kW</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#00f0ff] font-mono uppercase">MONTHLY BILL (₹)</label>
                  <input 
                    type="number" 
                    required 
                    placeholder="e.g. 7500" 
                    value={newBill}
                    onChange={(e) => setNewBill(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00f0ff]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-[#00f0ff] font-mono uppercase">ADDRESS</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Kothrud, Pune, MH" 
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00f0ff]"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl text-xs border border-white/10 cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#00dbe9] to-[#cf5cff] text-white font-extrabold py-2.5 rounded-xl text-xs hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] active:scale-95 transition-all border-none cursor-pointer"
                >
                  Create & Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
