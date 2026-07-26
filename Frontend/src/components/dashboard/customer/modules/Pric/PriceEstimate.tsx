import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  ArrowLeft, 
  Download, 
  CreditCard, 
  TrendingUp, 
  Coins, 
  ShieldCheck, 
  FileSignature, 
  Building, 
  DollarSign, 
  Percent, 
  Sparkles,
  Info,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Quotation {
  id: string;
  vendor: string;
  systemSize: string;
  estimatedCost: string;
  status: string;
  date: string;
  savings: string;
}

interface PriceEstimateTabProps {
  quotations: Quotation[];
  setQuotations?: React.Dispatch<React.SetStateAction<Quotation[]>>;
  setActiveTab: (tab: any) => void;
  showToast?: (text: string, type?: 'success' | 'info') => void;
}

export default function PriceEstimateTab({ 
  quotations, 
  setQuotations, 
  setActiveTab,
  showToast = () => {} 
}: PriceEstimateTabProps) {
  const [selectedQuote, setSelectedQuote] = useState<Quotation | null>(null);
  const [showSignModal, setShowSignModal] = useState(false);
  const [signatureName, setSignatureName] = useState('');
  const [hasSigned, setHasSigned] = useState(false);
  const [isSubmittingSignature, setIsSubmittingSignature] = useState(false);
  
  // Financing Calculator States
  const [downPaymentPercent, setDownPaymentPercent] = useState(20); // %
  const [loanTenureYears, setLoanTenureYears] = useState(5); // years
  const [interestRate, setInterestRate] = useState(8.5); // % interest

  // Parse cost to numerical value
  const parseCost = (costStr: string) => {
    return parseFloat(costStr.replace(/[^0-9.]/g, '')) || 15000;
  };

  const currentCost = selectedQuote ? parseCost(selectedQuote.estimatedCost) : 15000;
  const subsidyAmount = currentCost * 0.40; // 40% Govt Rooftop Solar Subsidy
  const netCost = currentCost - subsidyAmount;
  
  // EMI calculation formulas
  const downPaymentAmount = (netCost * downPaymentPercent) / 100;
  const loanAmount = netCost - downPaymentAmount;
  const monthlyInterestRate = (interestRate / 12) / 100;
  const totalMonths = loanTenureYears * 12;
  
  const monthlyEMI = loanAmount > 0 
    ? (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths)) / 
      (Math.pow(1 + monthlyInterestRate, totalMonths) - 1)
    : 0;

  // Monthly savings parsed
  const monthlySavingsVal = selectedQuote ? parseFloat(selectedQuote.savings.replace(/[^0-9.]/g, '')) || 350 : 350;

  const handleOpenEstimate = (quote: Quotation) => {
    setSelectedQuote(quote);
    setHasSigned(quote.status === 'Approved & Signed');
    setSignatureName('');
  };

  const handleSignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signatureName.trim()) return;
    
    setIsSubmittingSignature(true);
    
    setTimeout(() => {
      setIsSubmittingSignature(false);
      setHasSigned(true);
      setShowSignModal(false);
      
      // Update the quotation status globally
      if (setQuotations) {
        setQuotations(prev => prev.map(q => {
          if (q.id === selectedQuote?.id) {
            return { ...q, status: 'Approved & Signed' };
          }
          return q;
        }));
      }
      
      showToast(`✍️ Proposal ${selectedQuote?.id} digitally signed by ${signatureName}!`, 'success');
    }, 1500);
  };

  const handleDownloadPDF = (quote: Quotation) => {
    showToast(`📄 Downloading official price estimate proposal: ${quote.id}.pdf...`, 'success');
  };

  return (
    <div className="space-y-8 animate-fade-in text-left">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/5">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-brand-cyan">request_quote</span>
            Price Estimates & Quotations
          </h2>
          <p className="text-sm text-[#b9cacb] mt-1">Review official installer estimates, customize financing structures, and digitally sign proposals.</p>
        </div>
        <button 
          onClick={() => setActiveTab('dashboard')}
          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Dashboard
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Quotes list and detail view */}
        <div className="lg:col-span-2 space-y-6">
          {!selectedQuote ? (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-cyan" />
                Your Active Pricing Proposals
              </h3>
              
              {quotations.length === 0 ? (
                <div className="glass-panel p-12 text-center rounded-2xl space-y-4">
                  <span className="material-symbols-outlined text-5xl text-brand-gray/40">description</span>
                  <p className="text-brand-gray text-sm">No active proposals found. Head to "Nearby Solar Installers" to request your first rooftop estimate!</p>
                  <button 
                    onClick={() => setActiveTab('nearby')}
                    className="px-5 py-2.5 bg-brand-cyan text-brand-black font-extrabold rounded-xl text-xs hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all border-none cursor-pointer"
                  >
                    Find Nearby Installers
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quotations.map((quote) => (
                    <div 
                      key={quote.id} 
                      className={`glass-panel p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${
                        quote.status === 'Approved & Signed' 
                          ? 'border-emerald-500/30 bg-emerald-950/10' 
                          : 'border-white/10 hover:border-brand-cyan/40 hover:bg-white/[0.03]'
                      }`}
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-radial from-brand-cyan/5 to-transparent -mr-8 -mt-8 rounded-full group-hover:scale-125 transition-all duration-500" />
                      
                      <div className="flex justify-between items-start mb-4 relative z-10">
                        <div>
                          <span className="text-[10px] font-mono text-brand-cyan bg-brand-cyan/10 px-2.5 py-1 rounded-md border border-brand-cyan/20">
                            {quote.id}
                          </span>
                          <h4 className="text-base font-bold text-white mt-2.5">{quote.vendor}</h4>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-md border font-mono ${
                          quote.status === 'Approved & Signed' 
                            ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20' 
                            : 'bg-amber-500/15 text-amber-400 border-amber-500/20'
                        }`}>
                          {quote.status.toUpperCase()}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 my-4 py-3 border-y border-white/5 text-xs relative z-10">
                        <div>
                          <span className="text-brand-gray block">SYSTEM CAPACITY</span>
                          <span className="text-white font-bold text-sm mt-0.5 block">{quote.systemSize}</span>
                        </div>
                        <div>
                          <span className="text-brand-gray block">EST. MONTHLY SAVINGS</span>
                          <span className="text-emerald-400 font-bold text-sm mt-0.5 block">{quote.savings}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-2 relative z-10">
                        <div>
                          <span className="text-xs text-brand-gray block">ESTIMATED PRICE</span>
                          <span className="text-xl font-black text-white">{quote.estimatedCost}</span>
                        </div>
                        <button 
                          onClick={() => handleOpenEstimate(quote)}
                          className="px-4 py-2 rounded-xl bg-brand-cyan/10 hover:bg-brand-cyan text-brand-cyan hover:text-brand-black font-bold text-xs transition-all border border-brand-cyan/20 hover:border-transparent flex items-center gap-1 cursor-pointer"
                        >
                          View Estimate
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            // Detail View
            <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 space-y-6 animate-fade-in relative">
              {/* Back to list */}
              <button 
                onClick={() => setSelectedQuote(null)}
                className="text-brand-gray hover:text-white flex items-center gap-1 text-xs font-bold border-none bg-transparent cursor-pointer"
              >
                &larr; Back to all proposals
              </button>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-brand-cyan bg-brand-cyan/10 px-2.5 py-1 rounded-md border border-brand-cyan/20">
                      {selectedQuote.id}
                    </span>
                    <span className="text-xs text-brand-gray">• Issued on {selectedQuote.date}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white mt-2">{selectedQuote.vendor}</h3>
                </div>
                
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handleDownloadPDF(selectedQuote)}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-brand-gray hover:text-white transition-all cursor-pointer"
                    title="Download Proposal Document"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-md border font-mono ${
                    selectedQuote.status === 'Approved & Signed' 
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20' 
                      : 'bg-amber-500/15 text-amber-400 border-amber-500/20'
                  }`}>
                    {selectedQuote.status.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Cost Summary Visual Board */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-black/30 p-5 rounded-2xl border border-white/5">
                <div className="space-y-1">
                  <span className="text-xs text-brand-gray font-mono">GROSS PROJECT COST</span>
                  <p className="text-2xl font-bold text-white/90">{selectedQuote.estimatedCost}</p>
                  <p className="text-[10px] text-brand-gray">Standard market pricing</p>
                </div>
                <div className="space-y-1 border-y md:border-y-0 md:border-x border-white/5 py-4 md:py-0 md:px-5">
                  <span className="text-xs text-amber-400 font-mono flex items-center gap-1">
                    GOVT SUBSIDY SAVINGS (40%)
                    <Sparkles className="w-3 h-3 text-amber-400" />
                  </span>
                  <p className="text-2xl font-bold text-amber-400">-₹{subsidyAmount.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
                  <p className="text-[10px] text-amber-400/80">Direct solar rooftop scheme</p>
                </div>
                <div className="space-y-1 md:ps-5">
                  <span className="text-xs text-brand-cyan font-mono">NET OUT-OF-POCKET PRICE</span>
                  <p className="text-2xl font-black text-brand-cyan">₹{netCost.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
                  <p className="text-[10px] text-brand-cyan/80">Your final clean investment</p>
                </div>
              </div>

              {/* Itemized Project Scope Specification Sheet */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Itemized Cost Estimate Breakdown</h4>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center p-3 bg-white/[0.01] border border-white/5 rounded-xl">
                    <div>
                      <p className="text-white font-medium">Tier-1 Monocrystalline Solar Modules ({selectedQuote.systemSize})</p>
                      <p className="text-brand-gray text-[10px]">High density PV panels with 25-year structural warranty</p>
                    </div>
                    <span className="font-bold text-white">₹{(currentCost * 0.45).toLocaleString('en-IN', {maximumFractionDigits: 0})}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-white/[0.01] border border-white/5 rounded-xl">
                    <div>
                      <p className="text-white font-medium">Smart Hybrid Grid-Tied Inverter Set</p>
                      <p className="text-brand-gray text-[10px]">Efficiency optimizers with real-time app performance logs</p>
                    </div>
                    <span className="font-bold text-white">₹{(currentCost * 0.20).toLocaleString('en-IN', {maximumFractionDigits: 0})}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-white/[0.01] border border-white/5 rounded-xl">
                    <div>
                      <p className="text-white font-medium">Rooftop Mount Structure & Hardware</p>
                      <p className="text-brand-gray text-[10px]">Hot-dip galvanized anti-rust iron wind-resistant mounting rail</p>
                    </div>
                    <span className="font-bold text-white">₹{(currentCost * 0.12).toLocaleString('en-IN', {maximumFractionDigits: 0})}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-white/[0.01] border border-white/5 rounded-xl">
                    <div>
                      <p className="text-white font-medium">Electrical Wiring, AC/DB Boxes & Grounding</p>
                      <p className="text-brand-gray text-[10px]">Copper conduits, surge protection devices, earthing rods</p>
                    </div>
                    <span className="font-bold text-white">₹{(currentCost * 0.08).toLocaleString('en-IN', {maximumFractionDigits: 0})}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-white/[0.01] border border-white/5 rounded-xl">
                    <div>
                      <p className="text-white font-medium">Engineering, Net-Metering approvals & Labor</p>
                      <p className="text-brand-gray text-[10px]">Site analysis, utility grid filing, physical commissioning</p>
                    </div>
                    <span className="font-bold text-white">₹{(currentCost * 0.15).toLocaleString('en-IN', {maximumFractionDigits: 0})}</span>
                  </div>
                </div>
              </div>

              {/* Terms of Agreement */}
              <div className="bg-[#10131c] border border-white/5 p-4 rounded-xl space-y-2 text-xs">
                <span className="text-brand-cyan font-bold font-mono flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-brand-cyan" />
                  Installer Warranty Protection
                </span>
                <p className="text-brand-gray leading-relaxed">
                  By executing this agreement, you lock in the 40% State Subsidy benefits. {selectedQuote.vendor} provides a full 25-year performance warranty on modules, 10 years on inverter modules, and 5 years on general craftsmanship. Pricing is inclusive of all utility net-metering synchronization approvals.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/5">
                <button 
                  onClick={() => setSelectedQuote(null)}
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl text-xs transition-all cursor-pointer"
                >
                  Return to Proposals List
                </button>
                
                {hasSigned ? (
                  <div className="flex-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 py-3 rounded-xl font-bold text-xs flex justify-center items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Agreement Digitally Signed & Locked
                  </div>
                ) : (
                  <button 
                    onClick={() => setShowSignModal(true)}
                    className="flex-1 bg-brand-cyan text-brand-black font-extrabold py-3 rounded-xl text-xs hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] active:scale-[0.98] transition-all flex justify-center items-center gap-2 border-none cursor-pointer"
                  >
                    <FileSignature className="w-4 h-4" />
                    Review & Sign Solar Proposal
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Financing & EMI Calculator Module */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
            <div className="space-y-1.5">
              <span className="text-xs text-brand-cyan font-mono flex items-center gap-1">
                <Coins className="w-4 h-4 text-brand-cyan" />
                Solar Finance Planner
              </span>
              <h3 className="text-lg font-bold text-white">Toggle Your Loan & EMI</h3>
              <p className="text-xs text-brand-gray">Design your downpayment and loan tenure structure to match monthly utility cashflow.</p>
            </div>

            <div className="space-y-5 text-xs text-left pt-2 border-t border-white/5">
              {/* Downpayment slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-brand-gray">DOWNPAYMENT PERCENT</span>
                  <span className="text-brand-cyan font-bold">{downPaymentPercent}%</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="80" 
                  step="5"
                  value={downPaymentPercent} 
                  onChange={(e) => setDownPaymentPercent(parseInt(e.target.value))}
                  className="w-full accent-brand-cyan h-1 bg-black/40 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-brand-gray/60 font-mono">
                  <span>10% (Min)</span>
                  <span>Amount: ₹{downPaymentAmount.toLocaleString('en-IN', {maximumFractionDigits: 0})}</span>
                  <span>80% (Max)</span>
                </div>
              </div>

              {/* Loan Tenure Toggle Button Grid */}
              <div className="space-y-2">
                <span className="text-brand-gray block font-mono text-xs">LOAN TENURE (YEARS)</span>
                <div className="grid grid-cols-3 gap-2">
                  {[3, 5, 7].map((years) => (
                    <button
                      key={years}
                      type="button"
                      onClick={() => setLoanTenureYears(years)}
                      className={`py-2.5 rounded-xl font-bold font-mono text-xs transition-all border cursor-pointer ${
                        loanTenureYears === years 
                          ? 'bg-brand-cyan/25 text-brand-cyan border-brand-cyan/40' 
                          : 'bg-black/30 text-brand-gray border-white/5 hover:border-white/15'
                      }`}
                    >
                      {years} Years
                    </button>
                  ))}
                </div>
              </div>

              {/* Interest Rate */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-brand-gray">INTEREST RATE (APR)</span>
                  <span className="text-brand-cyan font-bold">{interestRate}%</span>
                </div>
                <input 
                  type="range" 
                  min="4.5" 
                  max="12.5" 
                  step="0.5"
                  value={interestRate} 
                  onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                  className="w-full accent-brand-cyan h-1 bg-black/40 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-brand-gray/60 font-mono">
                  <span>4.5% (Subsidized)</span>
                  <span>12.5% (Standard)</span>
                </div>
              </div>
            </div>

            {/* Live Financial Statement Sheet */}
            <div className="bg-[#10131c] p-4 rounded-xl space-y-3.5 border border-white/5 text-xs text-left">
              <div className="flex justify-between">
                <span className="text-brand-gray">Principal Loaned:</span>
                <span className="text-white font-mono font-bold">₹{loanAmount.toLocaleString('en-IN', {maximumFractionDigits: 0})}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-gray">Estimated Downpayment:</span>
                <span className="text-white font-mono font-bold">₹{downPaymentAmount.toLocaleString('en-IN', {maximumFractionDigits: 0})}</span>
              </div>
              <div className="flex justify-between items-center border-t border-white/5 pt-3">
                <span className="text-brand-cyan font-bold font-mono">YOUR MONTHLY EMI:</span>
                <span className="text-brand-cyan font-black text-lg font-mono">₹{Math.round(monthlyEMI)}/mo</span>
              </div>
              <div className="flex justify-between items-center bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/10 mt-2">
                <span className="text-emerald-400 font-bold text-[11px] font-mono">EST. UTILITY SAVINGS:</span>
                <span className="text-emerald-400 font-black text-sm font-mono">+₹{Math.round(monthlySavingsVal)}/mo</span>
              </div>

              <div className="pt-2">
                <div className="p-3 bg-black/30 border border-white/5 rounded-lg flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-brand-cyan flex-shrink-0 mt-0.5" />
                  <p className="text-[10px] text-brand-gray leading-relaxed">
                    Solar savings of <strong className="text-emerald-400">₹{Math.round(monthlySavingsVal)}/mo</strong> directly cover your monthly loan EMI of <strong className="text-brand-cyan">₹{Math.round(monthlyEMI)}/mo</strong>, yielding a net positive cashflow of <strong className="text-white">₹{Math.round(Math.max(0, monthlySavingsVal - monthlyEMI))}/mo</strong> from Day 1!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Digital E-Sign Proposal Modal */}
      <AnimatePresence>
        {showSignModal && selectedQuote && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0f1118] border border-[#00f0ff]/30 p-6 rounded-3xl max-w-md w-full shadow-[0_0_50px_rgba(0,240,255,0.15)] space-y-6 text-left relative"
            >
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <FileSignature className="w-5 h-5 text-brand-cyan" />
                  Digital E-Sign Proposal
                </h4>
                <button 
                  onClick={() => setShowSignModal(false)}
                  className="p-1 rounded-lg hover:bg-white/5 border-none text-brand-gray hover:text-white cursor-pointer bg-transparent"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="bg-[#161a24] p-4 rounded-xl border border-white/5">
                  <span className="text-brand-gray font-mono uppercase block text-[10px]">CONTRACT SUBJECT</span>
                  <span className="text-white font-bold text-sm block mt-1">{selectedQuote.vendor} - Proposal {selectedQuote.id}</span>
                  <div className="flex justify-between mt-3 pt-3 border-t border-white/5">
                    <span className="text-brand-gray">Net Price:</span>
                    <span className="text-brand-cyan font-mono font-bold">₹{netCost.toLocaleString('en-IN', {maximumFractionDigits: 0})}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-brand-gray">System Capacity:</span>
                    <span className="text-white font-mono font-bold">{selectedQuote.systemSize}</span>
                  </div>
                </div>

                <p className="text-brand-gray leading-relaxed text-[11px]">
                  By typing your name below, you authorize the formal deployment application, confirm terms of net-metering approvals, and execute this document as a binding digital agreement.
                </p>

                <form onSubmit={handleSignSubmit} className="space-y-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-brand-cyan font-mono uppercase">FULL LEGAL NAME AS SIGNATURE</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Alex Johnson" 
                      value={signatureName}
                      onChange={(e) => setSignatureName(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-cyan"
                    />
                  </div>

                  {/* Draw Signature Pad Simulation */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-brand-gray font-mono uppercase">PREVIEW SIGNATURE</label>
                    <div className="w-full h-20 bg-black/60 rounded-xl border border-white/5 flex items-center justify-center relative overflow-hidden">
                      {signatureName ? (
                        <p className="text-xl text-brand-cyan font-mono italic tracking-wide select-none">
                          {signatureName}
                        </p>
                      ) : (
                        <p className="text-brand-gray/40 text-[10px] uppercase font-mono select-none">
                          Signature will render here
                        </p>
                      )}
                      <div className="absolute bottom-2 right-2 flex items-center gap-1.5 opacity-60">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                        <span className="text-[8px] font-mono text-brand-gray uppercase">Secure E-Sign Logged</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button 
                      type="button"
                      onClick={() => setShowSignModal(false)}
                      className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl text-xs border border-white/10 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      disabled={isSubmittingSignature}
                      className="flex-1 bg-brand-cyan text-brand-black font-extrabold py-2.5 rounded-xl text-xs hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] active:scale-95 transition-all flex justify-center items-center gap-1.5 border-none cursor-pointer disabled:opacity-50"
                    >
                      {isSubmittingSignature ? (
                        <>
                          <span className="animate-spin text-sm">⌛</span>
                          Signing...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Approve & Sign
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
