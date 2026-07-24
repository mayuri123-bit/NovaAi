import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Send,
  User,
  Home,
  Building,
  CheckCircle2,
  Clock,
  Trash2,
  X,
  Mail,
  Phone,
  MapPin,
  TrendingUp,
  Download,
  Eye,
  Edit3,
  Zap,
  Activity,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

export interface Quotation {
  id: string;
  client: string;
  kW: string; // e.g. "5 kW"
  cost: string; // e.g. "₹5,25,000"
  status: string; // 'Accepted' | 'Sent' | 'Pending' | 'Rejected' | 'Draft'
  date: string; // e.g. "Oct 24, 2023"
  savings?: string; // e.g. "₹1,25,000/yr"
  subsidy?: string; // e.g. "₹78,000"
  finalAmount?: string; // e.g. "₹4,47,000"
  phone?: string;
  email?: string;
  address?: string;
  propertyType?: string;
  monthlyBill?: string;
  preferredInstall?: string;
  remarks?: string;
}

interface QuotationManageTabProps {
  quotations: Quotation[];
  onAddQuotation: (q: Omit<Quotation, 'id' | 'date'>) => void;
  onDeleteQuotation?: (id: string) => void;
  preFilledClientName?: string;
  preFilledSize?: string;
  onClearPreFilled?: () => void;
  showToast?: (text: string, type?: 'success' | 'info') => void;
}

export default function QuotationManageTab({ 
  quotations, 
  onAddQuotation, 
  onDeleteQuotation,
  preFilledClientName = '',
  preFilledSize = '5',
  onClearPreFilled,
  showToast = () => {}
}: QuotationManageTabProps) {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [selectedQuote, setSelectedQuote] = useState<Quotation | null>(null);

  // Quote Creator Form State
  const [client, setClient] = useState(preFilledClientName);
  const [size, setSize] = useState(preFilledSize);
  const [panel, setPanel] = useState('Waaree Mono PERC');
  const [battery, setBattery] = useState('None');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [propertyType, setPropertyType] = useState('Residential Rooftop');
  const [monthlyBill, setMonthlyBill] = useState('₹12,400');
  const [remarks, setRemarks] = useState('');

  // Auto-trigger when pre-filled is passed (e.g. clicking Send Quotation from Leads tab)
  useEffect(() => {
    if (preFilledClientName) {
      setClient(preFilledClientName);
      setSize(preFilledSize);
      setShowForm(true);
      // Auto generate email for placeholder
      setEmail(`${preFilledClientName.toLowerCase().replace(/\s+/g, '')}@example.com`);
    }
  }, [preFilledClientName, preFilledSize]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sizeNum = parseFloat(size) || 5;
    const baseCost = sizeNum * 105000; // Realistic cost representation matching their Acme ₹5.25L for 5kW (105k per kW)
    const subsidyAmt = Math.round(baseCost * 0.15); // e.g. ~15% subsidy (78k on 5.25L is ~15%)
    const finalAmt = baseCost - subsidyAmt;
    const estimatedSavings = Math.round(sizeNum * 16000);

    onAddQuotation({
      client: client || 'Walk-in Customer',
      kW: `${sizeNum} kW`,
      cost: `₹${baseCost.toLocaleString('en-IN')}`,
      status: 'Pending',
      savings: `₹${estimatedSavings.toLocaleString('en-IN')}/yr`,
      subsidy: `₹${subsidyAmt.toLocaleString('en-IN')}`,
      finalAmount: `₹${finalAmt.toLocaleString('en-IN')}`,
      phone: phone,
      email: email || `${client.toLowerCase().replace(/\s+/g, '')}@example.com`,
      address: address || 'Mumbai Region, Maharashtra',
      propertyType: propertyType,
      monthlyBill: monthlyBill,
      preferredInstall: 'Nov 15, 2023',
      remarks: remarks || 'Standard rooftop implementation.'
    });

    // Reset Form
    setClient('');
    setSize('5');
    setPanel('Waaree Mono PERC');
    setBattery('None');
    setPhone('+91 98765 43210');
    setEmail('');
    setAddress('');
    setPropertyType('Residential Rooftop');
    setMonthlyBill('₹12,400');
    setRemarks('');
    setShowForm(false);
    
    if (onClearPreFilled) {
      onClearPreFilled();
    }
    
    showToast('✨ Commercial proposal generated & queued for review!', 'success');
  };

  const parseCost = (costStr: string): number => {
    return parseInt(costStr.replace(/[^0-9]/g, ''), 10) || 0;
  };

  // Filter and Sort Logic
  const filteredQuotations = quotations.filter(q => {
    const matchesSearch = q.client.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          q.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (statusFilter === 'all') return matchesSearch;
    return matchesSearch && q.status.toLowerCase() === statusFilter.toLowerCase();
  });

  const sortedQuotations = [...filteredQuotations].sort((a, b) => {
    if (sortBy === 'latest') {
      return b.id.localeCompare(a.id);
    }
    if (sortBy === 'oldest') {
      return a.id.localeCompare(b.id);
    }
    if (sortBy === 'value-high') {
      const aVal = a.finalAmount ? parseCost(a.finalAmount) : parseCost(a.cost);
      const bVal = b.finalAmount ? parseCost(b.finalAmount) : parseCost(b.cost);
      return bVal - aVal;
    }
    if (sortBy === 'value-low') {
      const aVal = a.finalAmount ? parseCost(a.finalAmount) : parseCost(a.cost);
      const bVal = b.finalAmount ? parseCost(b.finalAmount) : parseCost(b.cost);
      return aVal - bVal;
    }
    return 0;
  });

  const getStatusBadgeStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'accepted':
      case 'approved':
      case 'approved & signed':
        return 'bg-[#00f0ff]/10 border-[#00f0ff]/30 text-[#00f0ff] glow-badge-accepted';
      case 'sent':
        return 'bg-[#00dbe9]/10 border-[#00dbe9]/30 text-[#00dbe9] glow-badge-sent';
      case 'rejected':
      case 'declined':
        return 'bg-red-500/10 border-red-500/20 text-red-400 glow-badge-rejected';
      case 'pending':
      default:
        return 'bg-[#cf5cff]/10 border-[#cf5cff]/30 text-[#cf5cff] glow-badge-pending';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in text-left">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-4xl font-black text-[#00f0ff] mb-1 tracking-tight neon-text-glow">Quotation Management</h2>
          <p className="text-on-surface-variant font-body-md text-sm">Create and manage high-efficiency solar project proposals in real-time.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-6 py-3 bg-[#00f0ff] text-[#002022] font-black rounded-xl hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer shadow-[0_0_20px_rgba(0,240,255,0.2)] border-none"
        >
          <Plus className="w-5 h-5" />
          <span>{showForm ? 'CLOSE CONFIGURATOR' : 'CREATE QUOTE'}</span>
        </button>
      </section>

      {/* Overview stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-[#1d2026]/40 border border-white/5 p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold font-mono mb-1">Total Quotations</p>
            <h3 className="text-3xl font-black text-white">{quotations.length || 156}</h3>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
            <FileText className="w-6 h-6 text-[#00f0ff]" />
          </div>
        </div>

        <div className="bg-[#1d2026]/40 border border-white/5 p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold font-mono mb-1">Pending Review</p>
            <h3 className="text-3xl font-black text-[#cf5cff]">
              {quotations.filter(q => q.status.toLowerCase() === 'pending').length || 24}
            </h3>
          </div>
          <div className="p-3 bg-[#cf5cff]/10 rounded-xl border border-[#cf5cff]/10">
            <Clock className="w-6 h-6 text-[#cf5cff]" />
          </div>
        </div>

        <div className="bg-[#1d2026]/40 border border-white/5 p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold font-mono mb-1">Distributed / Sent</p>
            <h3 className="text-3xl font-black text-[#00dbe9]">
              {quotations.filter(q => q.status.toLowerCase() === 'sent').length || 88}
            </h3>
          </div>
          <div className="p-3 bg-[#00dbe9]/10 rounded-xl border border-[#00dbe9]/10">
            <Send className="w-6 h-6 text-[#00dbe9]" />
          </div>
        </div>
      </section>

      {/* Quote creation form */}
      {showForm && (
        <div className="bg-[#1d2026]/60 border border-[#00f0ff]/20 p-6 md:p-8 rounded-[2rem] max-w-2xl animate-fade-in space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00f0ff]">edit_document</span>
            Configure Solar Proposal
          </h3>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-left">
            <div className="space-y-1.5 col-span-2">
              <label className="text-[10px] text-[#00f0ff] font-mono uppercase">CLIENT / LEAD NAME</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Acme Corporation or Rajesh Kumar" 
                value={client}
                onChange={(e) => setClient(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00f0ff]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-[#00f0ff] font-mono uppercase">PHONE NUMBER</label>
              <input 
                type="text" 
                placeholder="+91 98765 43210" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00f0ff]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-[#00f0ff] font-mono uppercase">EMAIL ADDRESS</label>
              <input 
                type="email" 
                placeholder="ops@acme.corp" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00f0ff]"
              />
            </div>

            <div className="space-y-1.5 col-span-2">
              <label className="text-[10px] text-[#00f0ff] font-mono uppercase">INSTALLATION ADDRESS</label>
              <input 
                type="text" 
                placeholder="Level 4, Sky Tower, Business District, Bengaluru" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00f0ff]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-[#00f0ff] font-mono uppercase">PROPERTY TYPE</label>
              <select 
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00f0ff]"
              >
                <option value="Residential Rooftop">Residential Rooftop</option>
                <option value="Commercial Rooftop">Commercial Rooftop</option>
                <option value="Industrial Shed">Industrial Shed</option>
                <option value="Agricultural Solar Pump">Agricultural Solar Pump</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-[#00f0ff] font-mono uppercase">CURRENT MONTHLY ELECTRICITY BILL</label>
              <input 
                type="text" 
                placeholder="₹12,400" 
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00f0ff]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-[#00f0ff] font-mono uppercase">SYSTEM CAPACITY (kW)</label>
              <select 
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00f0ff]"
              >
                <option value="3">3 kW (Small Residential)</option>
                <option value="5">5 kW (Standard Home)</option>
                <option value="8">8 kW (Large Home / Villa)</option>
                <option value="10">10 kW (Commercial Light)</option>
                <option value="12">12 kW (Mid Commercial)</option>
                <option value="15">15 kW (Heavy Commercial)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-[#00f0ff] font-mono uppercase">PANEL MODULE BRAND</label>
              <select 
                value={panel}
                onChange={(e) => setPanel(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00f0ff]"
              >
                <option value="Waaree Mono PERC">Waaree Mono PERC (440W)</option>
                <option value="Tata Power Bifacial">Tata Power Bifacial (550W)</option>
                <option value="Vikram Solar Poly">Vikram Solar Polycrystalline</option>
              </select>
            </div>

            <div className="space-y-1.5 col-span-2">
              <label className="text-[10px] text-[#00f0ff] font-mono uppercase">BATTERY STORAGE INTEGRATION</label>
              <select 
                value={battery}
                onChange={(e) => setBattery(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00f0ff]"
              >
                <option value="None">None (Standard On-Grid Net Meter Only)</option>
                <option value="5kWh">5 kWh Lithium-Ion Storage (+₹70,000)</option>
                <option value="10kWh">10 kWh Lithium-Ion Storage (+₹1,20,000)</option>
              </select>
            </div>

            <div className="space-y-1.5 col-span-2">
              <label className="text-[10px] text-[#00f0ff] font-mono uppercase">VENDOR REMARKS / SPECIAL NOTES</label>
              <textarea 
                placeholder="Customer requested specific high-rise structures..." 
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00f0ff] h-20"
              />
            </div>

            <div className="flex items-end col-span-2 pt-4">
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-[#00dbe9] to-[#cf5cff] text-[#002022] font-extrabold py-3.5 rounded-xl hover:brightness-110 active:scale-[0.98] transition-all text-xs border-none cursor-pointer flex justify-center items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Generate & Distribute Proposal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search & Filter Bar */}
      <section className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative group">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-[#00f0ff] transition-colors" />
          <input 
            type="text"
            placeholder="Search Customer Name or Quote ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1d2026]/80 border border-white/5 rounded-xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-[#00f0ff] focus:border-transparent outline-none text-on-surface placeholder:text-on-surface-variant/40 transition-all text-sm"
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#1d2026] border border-white/5 rounded-xl px-6 py-3.5 outline-none focus:ring-2 focus:ring-[#00f0ff] transition-all text-on-surface text-sm appearance-none min-w-[160px] cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="sent">Sent</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>

          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#1d2026] border border-white/5 rounded-xl px-6 py-3.5 outline-none focus:ring-2 focus:ring-[#00f0ff] transition-all text-on-surface text-sm appearance-none min-w-[180px] cursor-pointer"
          >
            <option value="latest">Sort by Latest</option>
            <option value="oldest">Sort by Oldest</option>
            <option value="value-high">Value: High to Low</option>
            <option value="value-low">Value: Low to High</option>
          </select>
        </div>
      </section>

      {/* Quotation list of card elements */}
      <section className="space-y-4">
        {sortedQuotations.map((q) => {
          // Standard defaults computed dynamically if not present
          const finalAmt = q.finalAmount || q.cost;
          const originalCostStr = q.cost.replace(/[^0-9]/g, '');
          const originalCostNum = parseInt(originalCostStr, 10) || 525000;
          const computedSubsidy = q.subsidy || `₹${Math.round(originalCostNum * 0.15).toLocaleString('en-IN')}`;

          return (
            <div 
              key={q.id}
              onClick={() => setSelectedQuote(q)}
              className="bg-[#1d2026]/40 border border-white/5 p-6 rounded-2xl flex flex-col xl:flex-row items-center gap-8 cursor-pointer hover:bg-white/[0.03] hover:border-[#00f0ff]/30 hover:shadow-[0_0_20px_rgba(0,240,255,0.03)] transition-all duration-300 group text-left"
            >
              <div className="flex-1 flex items-center gap-4 w-full">
                <div className="w-14 h-14 rounded-full bg-[#00f0ff]/10 flex items-center justify-center border border-[#00f0ff]/20 shrink-0">
                  <User className="w-6 h-6 text-[#00f0ff]" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-on-surface group-hover:text-[#00f0ff] transition-colors">{q.client}</h4>
                  <div className="flex gap-4 mt-1 font-mono text-xs">
                    <span className="text-on-surface-variant">ID: {q.id.toUpperCase()}</span>
                    <span className="text-on-surface-variant">Req: {q.date}</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-6 w-full text-xs font-mono">
                <div>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-tighter mb-1 font-bold">System Size</p>
                  <p className="font-black text-white text-sm">{q.kW}</p>
                </div>
                <div>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-tighter mb-1 font-bold">Install Cost</p>
                  <p className="font-black text-white text-sm">{q.cost}</p>
                </div>
                <div>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-tighter mb-1 font-bold">Govt Subsidy</p>
                  <p className="font-black text-red-400 text-sm">− {computedSubsidy}</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#00f0ff] uppercase tracking-tighter mb-1 font-bold">Final Amount</p>
                  <p className="font-black text-[#00f0ff] text-sm">{finalAmt}</p>
                </div>
              </div>

              <div className="flex items-center gap-8 w-full xl:w-auto justify-between xl:justify-end border-t xl:border-t-0 border-white/5 pt-4 xl:pt-0" onClick={(e) => e.stopPropagation()}>
                <span className={`px-4 py-1.5 rounded-full border text-[11px] font-bold uppercase tracking-wider font-mono ${getStatusBadgeStyle(q.status)}`}>
                  {q.status}
                </span>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => setSelectedQuote(q)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors group border-none bg-transparent cursor-pointer" 
                    title="View Details"
                  >
                    <Eye className="w-4 h-4 text-on-surface-variant group-hover:text-[#00f0ff]" />
                  </button>
                  <button 
                    onClick={() => {
                      setClient(q.client);
                      setSize(q.kW.replace(' kW', ''));
                      setPhone(q.phone || '+91 98765 43210');
                      setEmail(q.email || '');
                      setAddress(q.address || '');
                      setPropertyType(q.propertyType || 'Commercial Rooftop');
                      setMonthlyBill(q.monthlyBill || '');
                      setRemarks(q.remarks || '');
                      setShowForm(true);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors group border-none bg-transparent cursor-pointer" 
                    title="Edit Proposal"
                  >
                    <Edit3 className="w-4 h-4 text-on-surface-variant group-hover:text-[#00f0ff]" />
                  </button>
                  <button 
                    onClick={() => {
                      showToast(`📩 Proposal for ${q.client} successfully dispatched to consumer!`, 'success');
                    }}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors group border-none bg-transparent cursor-pointer" 
                    title="Resend to Customer"
                  >
                    <Send className="w-4 h-4 text-on-surface-variant group-hover:text-[#00f0ff]" />
                  </button>
                  {onDeleteQuotation && (
                    <button 
                      onClick={() => onDeleteQuotation(q.id)}
                      className="p-2 hover:bg-red-500/10 rounded-lg transition-colors group border-none bg-transparent cursor-pointer" 
                      title="Delete Draft"
                    >
                      <Trash2 className="w-4 h-4 text-on-surface-variant group-hover:text-red-400" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {sortedQuotations.length === 0 && (
          <div className="border-2 border-dashed border-white/5 rounded-2xl p-12 text-center text-on-surface-variant">
            <ShieldAlert className="w-12 h-12 text-on-surface-variant/40 mx-auto mb-4" />
            <p className="font-bold text-base">No quotations found</p>
            <p className="text-xs opacity-60 mt-2">Try adjusting your filters or create a new quote above.</p>
          </div>
        )}
      </section>

      {/* Side drawer detail panel */}
      {selectedQuote && (
        <>
          {/* Overlay background */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300"
            onClick={() => setSelectedQuote(null)}
          />

          {/* Right Panel Drawer */}
          <aside className="fixed top-0 right-0 h-full w-full max-w-[500px] bg-[#191c22] z-[70] shadow-2xl border-l border-white/10 overflow-y-auto no-scrollbar flex flex-col justify-between animate-fade-in text-left">
            <div className="p-8 space-y-8">
              {/* Drawer Title */}
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <div>
                  <h3 className="text-xl font-black text-[#00f0ff] tracking-tight font-sans">Quotation Details</h3>
                  <p className="text-xs text-on-surface-variant font-mono mt-1">ID: {selectedQuote.id.toUpperCase()}</p>
                </div>
                <button 
                  onClick={() => setSelectedQuote(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition-all border-none bg-transparent cursor-pointer"
                >
                  <X className="w-5 h-5 text-on-surface-variant hover:text-[#00f0ff]" />
                </button>
              </div>

              {/* Customer Section */}
              <section className="space-y-4">
                <h4 className="text-xs font-bold text-[#00f0ff] uppercase tracking-widest font-mono">Customer Information</h4>
                <div className="space-y-3 text-xs bg-white/[0.01] border border-white/5 p-4 rounded-xl font-mono">
                  <div className="flex justify-between items-center">
                    <span className="text-on-surface-variant">Client Name</span>
                    <span className="text-white font-bold">{selectedQuote.client}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-on-surface-variant">Phone</span>
                    <span className="text-white font-bold">{selectedQuote.phone || '+91 98765 43210'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-on-surface-variant">Email Address</span>
                    <span className="text-white font-bold truncate max-w-[200px]">
                      {selectedQuote.email || `${selectedQuote.client.toLowerCase().replace(/\s+/g, '')}@example.com`}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5 pt-2 border-t border-white/5">
                    <span className="text-on-surface-variant">Installation Address</span>
                    <span className="text-on-surface text-xs leading-relaxed font-sans font-semibold">
                      {selectedQuote.address || 'Level 4, Sky Tower, Business District, Bengaluru 560001'}
                    </span>
                  </div>
                </div>
              </section>

              {/* Project Section */}
              <section className="space-y-4">
                <h4 className="text-xs font-bold text-[#00f0ff] uppercase tracking-widest font-mono">Project Overview</h4>
                <div className="grid grid-cols-2 gap-4 bg-white/5 p-5 rounded-xl border border-white/5 text-xs font-mono">
                  <div>
                    <p className="text-[10px] text-on-surface-variant uppercase mb-1">Property Type</p>
                    <p className="font-bold text-white font-sans">{selectedQuote.propertyType || 'Commercial Rooftop'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-on-surface-variant uppercase mb-1">Monthly Bill</p>
                    <p className="font-bold text-white">{selectedQuote.monthlyBill || '₹24,500 Avg.'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-on-surface-variant uppercase mb-1">Proposed Size</p>
                    <p className="font-bold text-[#00f0ff]">{selectedQuote.kW} Proposed</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-on-surface-variant uppercase mb-1">Preferred Install</p>
                    <p className="font-bold text-white font-sans">{selectedQuote.preferredInstall || 'Nov 15, 2023'}</p>
                  </div>
                </div>
              </section>

              {/* Financial Breakdown */}
              <section className="space-y-4">
                <h4 className="text-xs font-bold text-[#00f0ff] uppercase tracking-widest font-mono">Financial Breakdown</h4>
                <div className="space-y-3 text-xs font-mono bg-white/[0.01] border border-white/5 p-4 rounded-xl">
                  {/* Panels computed dynamically */}
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Solar Panels (Tier 1)</span>
                    {/* Calculated estimation split: panels represent ~60% of total */}
                    <span className="text-white">
                      ₹{Math.round((parseInt(selectedQuote.cost.replace(/[^0-9]/g, ''), 10) || 525000) * 0.65).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Inverter &amp; Monitoring</span>
                    <span className="text-white">
                      ₹{Math.round((parseInt(selectedQuote.cost.replace(/[^0-9]/g, ''), 10) || 525000) * 0.23).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Installation &amp; Liasoning</span>
                    <span className="text-white">
                      ₹{Math.round((parseInt(selectedQuote.cost.replace(/[^0-9]/g, ''), 10) || 525000) * 0.12).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-red-400 border-t border-white/5 pt-3">
                    <span>Central/State Subsidy</span>
                    <span>− {selectedQuote.subsidy || '₹78,000'}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#00f0ff] border-t-2 border-[#00f0ff]/20 pt-3 mt-3">
                    <span>Final Quote</span>
                    <span>{selectedQuote.finalAmount || selectedQuote.cost}</span>
                  </div>
                </div>
              </section>

              {/* Remarks/Notes */}
              <section className="space-y-3">
                <label className="text-xs font-bold text-[#00f0ff] uppercase tracking-widest font-mono block">Vendor Remarks</label>
                <textarea 
                  value={selectedQuote.remarks || 'Customer requested premium bifacial modules. Pricing accounts for elevated structures and custom grounding.'}
                  readOnly
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs text-on-surface-variant focus:outline-none focus:ring-1 focus:ring-[#00f0ff] h-24 font-sans leading-relaxed"
                />
              </section>
            </div>

            {/* Bottom Panel Actions sticky footer */}
            <div className="p-6 border-t border-white/5 bg-[#191c22] sticky bottom-0 grid grid-cols-3 gap-3">
              <button 
                onClick={() => {
                  setClient(selectedQuote.client);
                  setSize(selectedQuote.kW.replace(' kW', ''));
                  setPhone(selectedQuote.phone || '+91 98765 43210');
                  setEmail(selectedQuote.email || '');
                  setAddress(selectedQuote.address || '');
                  setPropertyType(selectedQuote.propertyType || 'Commercial Rooftop');
                  setMonthlyBill(selectedQuote.monthlyBill || '');
                  setRemarks(selectedQuote.remarks || '');
                  setShowForm(true);
                  setSelectedQuote(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex flex-col items-center justify-center gap-1.5 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border-none text-white font-bold cursor-pointer"
              >
                <Edit3 className="w-5 h-5 text-on-surface" />
                <span className="text-[9px] uppercase tracking-wider font-mono">Edit</span>
              </button>
              <button 
                onClick={() => {
                  showToast(`📩 Proposal for ${selectedQuote.client} successfully emailed!`, 'success');
                  setSelectedQuote(null);
                }}
                className="flex flex-col items-center justify-center gap-1.5 p-3 bg-[#00f0ff]/10 text-[#00f0ff] rounded-xl hover:bg-[#00f0ff]/20 border border-[#00f0ff]/20 font-bold cursor-pointer"
              >
                <Send className="w-5 h-5" />
                <span className="text-[9px] uppercase tracking-wider font-mono">Send</span>
              </button>
              <button 
                onClick={() => {
                  showToast('📄 PDF report generation initiated!', 'info');
                }}
                className="flex flex-col items-center justify-center gap-1.5 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border-none text-white font-bold cursor-pointer"
              >
                <Download className="w-5 h-5 text-on-surface" />
                <span className="text-[9px] uppercase tracking-wider font-mono">PDF</span>
              </button>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}
