import React, { useState } from 'react';

interface CalculatorTabProps {
  monthlyBill: number;
  setMonthlyBill: (val: number) => void;
  setActiveTab: (tab: any) => void;
  showToast: (text: string, type?: 'success' | 'info') => void;
  [key: string]: any;
}

export default function CalculatorTab({
  monthlyBill,
  setMonthlyBill,
  setActiveTab,
  showToast,
}: CalculatorTabProps) {
  // Initialize with the current bill value converted to Rupees, or blank
  const [billVal, setBillVal] = useState<string>(
    monthlyBill ? Math.round(monthlyBill * 83).toString() : '0'
  );
  
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<{
    size: string;
    cost: string;
    subsidy: string;
    finalCost: string;
    savings: string;
    unitsSaved: string;
    co2Reduced: string;
    treesPlanted: string;
    paybackYears: string;
  } | null>(null);

  const calculateResults = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const bill = parseFloat(billVal);
    
    if (isNaN(bill) || bill <= 0) {
      showToast('Please enter a valid monthly bill amount greater than 0', 'info');
      return;
    }
    
    // Update parent's state
    setMonthlyBill(bill / 83);
  
    
    // Calculate estimates based on high fidelity standard ratios (e.g. 5kW for ₹6,000 monthly bill)
    const sizeNum = Math.round((bill / 1200) * 2) / 2 || 0.5;
    const size = sizeNum.toFixed(1);
    
    const costNum = Math.round(sizeNum * 90000);
    const cost = costNum.toLocaleString('en-IN');
    
    const subsidyNum = Math.round(sizeNum * 15600);
    const subsidy = subsidyNum.toLocaleString('en-IN');
    
    const finalCostNum = costNum - subsidyNum;
    const finalCost = finalCostNum.toLocaleString('en-IN');
    
    const savingsNum = Math.round(sizeNum * 1300);
    const savings = savingsNum.toLocaleString('en-IN');

    // Additional report fields
    const unitsSaved = Math.round(sizeNum * 125 * 12).toLocaleString('en-IN'); // kWh/year
    const co2Reduced = (sizeNum * 1.2).toFixed(1); // Tons/year
    const treesPlanted = Math.round(sizeNum * 18).toString();
    const paybackYears = (savingsNum > 0 ? (finalCostNum / (savingsNum * 12)).toFixed(1) : '4.8');

    setResults({
      size,
      cost,
      subsidy,
      finalCost,
      savings,
      unitsSaved,
      co2Reduced,
      treesPlanted,
      paybackYears
    });
    setShowResults(true);
    showToast('Precision solar transition report generated!', 'success');
  };

  const handleDownloadEstimate = () => {
    showToast('Your custom solar savings report PDF download has started!', 'success');
  };

  const handleSaveEstimate = () => {
    showToast('Solar savings estimate pinned to your profile history!', 'success');
  };

  const handleEditInputs = () => {
    setShowResults(false);
  };

  return (
    <div className="py-6 flex flex-col items-center max-w-7xl mx-auto relative z-10 w-full text-left">
      {!showResults ? (
        <>
          {/* Header Section */}
          <header className="text-center mb-16 max-w-3xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-widest mb-6">
              Efficiency Estimator
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary mb-6 leading-tight tracking-tight text-white">
              Solar Investment Intelligence
            </h1>
            <p className="text-base md:text-lg text-on-surface-variant font-medium max-w-2xl mx-auto leading-relaxed">
              Harness our AI-driven models to predict your energy independence. Enter your current expenses to unlock a precise transition roadmap.
            </p>
          </header>

          {/* Calculator Card */}
          <section className="w-full max-w-2xl mx-auto">
            <form onSubmit={calculateResults} className="glass-card p-8 md:p-12 rounded-3xl relative overflow-hidden transition-all duration-500">
              <div className="space-y-8">
                <div>
                  <label 
                    className="block text-xs font-bold text-primary mb-4 uppercase tracking-widest" 
                    htmlFor="monthly-bill"
                  >
                    Monthly Electricity Bill (₹)
                  </label>
                  <div className="relative group">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-bold text-on-surface-variant">₹</span>
                    <input 
                      className="w-full bg-black/20 border border-white/10 rounded-2xl py-6 pl-12 pr-6 text-2xl font-semibold text-primary focus:outline-none focus:border-primary-container focus:ring-4 focus:ring-primary-container/10 transition-all duration-300 placeholder:text-white/10" 
                      id="monthly-bill" 
                      placeholder="0.00" 
                      type="number"
                      value={billVal}
                      onChange={(e) => setBillVal(e.target.value)}
                    />
                  </div>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary-container to-secondary-container py-5 rounded-2xl text-xs font-bold text-brand-black hover:text-black uppercase tracking-[0.2em] glow-hover transition-all duration-300 active:scale-[0.98] cursor-pointer"
                >
                  Calculate Savings
                </button>
              </div>
            </form>
          </section>
        </>
      ) : (
        /* Detailed Lumina Portal Price Estimate Layout */
        <div className="w-full space-y-10 reveal-item text-left">
          {/* Custom style block to support the exact glassmorphism design tokens */}
          <style dangerouslySetInnerHTML={{ __html: `
            :root {
              --glass-bg: rgba(16, 19, 26, 0.45);
              --glass-border: rgba(255, 255, 255, 0.08);
              --neon-primary: #00dbe9;
            }
            .lumina-glass {
              background-color: var(--glass-bg);
              border: 1px solid var(--glass-border);
              backdrop-filter: blur(16px);
              -webkit-backdrop-filter: blur(16px);
            }
            .lumina-neon-glow {
              box-shadow: 0 0 20px rgba(0, 219, 233, 0.15);
            }
            .lumina-neon-glow-hover:hover {
              box-shadow: 0 0 25px rgba(0, 219, 233, 0.35);
              border-color: rgba(0, 219, 233, 0.4);
            }
          `}} />

          {/* Report Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-8">
            <div>
              <div className="flex items-center gap-2 text-[#00dbe9] font-bold text-xs uppercase tracking-[0.2em] mb-2 font-mono">
                <span className="w-2 h-2 rounded-full bg-[#00dbe9] animate-pulse"></span>
                Verified Price Estimate • Lumina Portal
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Solar Transition Roadmap
              </h1>
              <p className="text-[#b9cacb] text-sm mt-1 font-medium">
                Engineered for monthly energy expenses of <span className="text-[#00dbe9] font-bold">₹{parseFloat(billVal).toLocaleString('en-IN')}</span>
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleEditInputs}
                className="px-5 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">edit</span>
                <span>Edit Bill</span>
              </button>
            </div>
          </div>

          {/* Core Estimates Row - Lumina Portal 6-Card Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1: System Size */}
            <div className="lumina-glass lumina-neon-glow-hover p-8 rounded-2xl flex flex-col justify-between transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <span className="p-3 bg-[#00dbe9]/10 rounded-xl border border-[#00dbe9]/20">
                  <span className="material-symbols-outlined text-[#00dbe9] text-2xl" style={{ fontVariationSettings: '"FILL" 1' }}>
                    solar_power
                  </span>
                </span>
                <span className="text-[9px] font-bold font-mono text-[#00dbe9] uppercase tracking-wider bg-[#00dbe9]/10 px-2.5 py-1 rounded-full">Recommended</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-[#b9cacb] uppercase tracking-widest font-mono">System Size</h3>
                <div className="flex items-baseline space-x-1.5">
                  <span className="text-4xl md:text-5xl font-black text-white tracking-tight">{results?.size}</span>
                  <span className="text-base font-bold text-[#b9cacb] font-mono">kW</span>
                </div>
              </div>
            </div>

            {/* Card 2: Estimated Installation Cost */}
            <div className="lumina-glass lumina-neon-glow-hover p-8 rounded-2xl flex flex-col justify-between transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <span className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="material-symbols-outlined text-[#b9cacb] text-2xl">
                    account_balance_wallet
                  </span>
                </span>
                <span className="text-[9px] font-bold font-mono text-[#b9cacb] uppercase tracking-wider bg-white/5 px-2.5 py-1 rounded-full">Asset Valuation</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-[#b9cacb] uppercase tracking-widest font-mono">Installation Cost</h3>
                <div className="flex items-baseline space-x-1">
                  <span className="text-xl font-extrabold text-[#b9cacb] font-sans">₹</span>
                  <span className="text-4xl md:text-5xl font-black text-white tracking-tight">{results?.cost}</span>
                </div>
              </div>
            </div>

            {/* Card 3: Government Subsidy */}
            <div className="lumina-glass lumina-neon-glow-hover p-8 rounded-2xl flex flex-col justify-between transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <span className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                  <span className="material-symbols-outlined text-emerald-400 text-2xl">
                    account_balance
                  </span>
                </span>
                <span className="text-[9px] font-bold font-mono text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2.5 py-1 rounded-full">State Rebate</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-[#b9cacb] uppercase tracking-widest font-mono">Government Subsidy</h3>
                <div className="flex items-baseline space-x-1">
                  <span className="text-xl font-extrabold text-emerald-400 font-sans">-₹</span>
                  <span className="text-4xl md:text-5xl font-black text-emerald-400 tracking-tight">{results?.subsidy}</span>
                </div>
              </div>
            </div>

            {/* Card 4: Final Estimated Cost */}
            <div className="lumina-glass lumina-neon-glow p-8 rounded-2xl flex flex-col justify-between border-[#00dbe9]/30 shadow-[0_0_20px_rgba(0,219,233,0.06)]">
              <div className="flex justify-between items-start mb-6">
                <span className="p-3 bg-[#00dbe9]/10 rounded-xl border border-[#00dbe9]/30">
                  <span className="material-symbols-outlined text-[#00dbe9] text-2xl" style={{ fontVariationSettings: '"FILL" 1' }}>
                    payments
                  </span>
                </span>
                <span className="text-[9px] font-bold font-mono text-[#00dbe9] uppercase tracking-wider bg-[#00dbe9]/15 px-2.5 py-1 rounded-full font-sans">Net Outlay</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-[#b9cacb] uppercase tracking-widest font-mono">Final Estimated Cost</h3>
                <div className="flex items-baseline space-x-1">
                  <span className="text-xl font-black text-[#00dbe9] font-sans">₹</span>
                  <span className="text-4xl md:text-5xl font-black text-[#00dbe9] tracking-tight">{results?.finalCost}</span>
                </div>
              </div>
            </div>

            {/* Card 5: Estimated Monthly Savings */}
            <div className="lumina-glass lumina-neon-glow-hover p-8 rounded-2xl flex flex-col justify-between transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <span className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                  <span className="material-symbols-outlined text-purple-400 text-2xl" style={{ fontVariationSettings: '"FILL" 1' }}>
                    trending_down
                  </span>
                </span>
                <span className="text-[9px] font-bold font-mono text-purple-400 uppercase tracking-wider bg-purple-500/10 px-2.5 py-1 rounded-full">Yield Return</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-[#b9cacb] uppercase tracking-widest font-mono">Monthly Savings</h3>
                <div className="flex items-baseline space-x-1">
                  <span className="text-xl font-extrabold text-purple-400 font-sans">₹</span>
                  <span className="text-4xl md:text-5xl font-black text-white tracking-tight">{results?.savings}</span>
                </div>
              </div>
            </div>

            {/* Card 6: Payback Period */}
            <div className="lumina-glass lumina-neon-glow-hover p-8 rounded-2xl flex flex-col justify-between transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <span className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
                  <span className="material-symbols-outlined text-amber-400 text-2xl">
                    history_edu
                  </span>
                </span>
                <span className="text-[9px] font-bold font-mono text-amber-400 uppercase tracking-wider bg-amber-500/10 px-2.5 py-1 rounded-full">Asset Payback</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-[#b9cacb] uppercase tracking-widest font-mono font-sans">Payback Period</h3>
                <div className="flex items-baseline space-x-1.5">
                  <span className="text-4xl md:text-5xl font-black text-white tracking-tight">{results?.paybackYears}</span>
                  <span className="text-base font-bold text-[#b9cacb] font-mono">Years</span>
                </div>
              </div>
            </div>

          </div>

          {/* AI Recommendation & Intelligence Card */}
          <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#0b0e14]/60 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00dbe9]/5 rounded-full filter blur-3xl pointer-events-none" />
            
            <div className="space-y-2 max-w-2xl text-left">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#00dbe9] font-mono flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">smart_toy</span>
                AI Intelligence Recommendation
              </h4>
              <p className="text-sm text-[#b9cacb] leading-relaxed">
                Our advanced AI models recommend a <strong className="text-white font-semibold">{results?.size}kW</strong> solar setup for your energy needs. This customized array configuration maximizes thermal capture efficiency, reduces net line dependency, and accelerates your payback timeline down to <strong className="text-white font-semibold">{results?.paybackYears} years</strong>.
              </p>
            </div>

            <div className="shrink-0 font-mono text-[10px] tracking-widest text-[#00dbe9]/40 border border-[#00dbe9]/10 px-3 py-1 rounded bg-[#00dbe9]/5">
              CORES_OPTIMAL_100%
            </div>
          </div>

          {/* Quick Actions Action Bar */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 py-6 border-y border-white/5">
            <button 
              onClick={() => {
                setActiveTab('quotations');
                showToast('Initiating quotation request workflow with local vetted vendors!', 'success');
              }}
              className="w-full sm:w-auto px-10 py-4.5 rounded-xl bg-gradient-to-r from-[#00dbe9] to-[#cf5cff] text-[#0a0b0d] font-bold text-xs uppercase tracking-wider hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(0,219,233,0.3)] hover:shadow-[0_0_30px_rgba(0,219,233,0.5)] cursor-pointer flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">assignment_turned_in</span>
              <span>Request Quotation</span>
            </button>
            <button 
              onClick={handleSaveEstimate}
              className="w-full sm:w-auto px-8 py-4.5 rounded-xl border border-white/10 hover:border-[#00dbe9]/40 bg-white/5 text-[#b9cacb] hover:text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:bg-white/10 cursor-pointer flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">bookmark</span>
              <span>Save Estimate</span>
            </button>
            <button 
              onClick={handleDownloadEstimate}
              className="w-full sm:w-auto px-8 py-4.5 rounded-xl border border-white/10 hover:border-[#00dbe9]/40 bg-white/5 text-[#b9cacb] hover:text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:bg-white/10 cursor-pointer flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">download</span>
              <span>Download Estimate</span>
            </button>
          </div>

          {/* Detailed Engineering Specs Drawer (Cumulative Returns, Eco Impact & Rooftop specifications) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
            
            {/* Year-by-Year Cumulative Returns */}
            <div className="lg:col-span-8 lumina-glass p-8 rounded-2xl space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-white">25-Year Cumulative Returns</h3>
                  <p className="text-xs text-[#b9cacb]">Projected lifetime savings of your solar rooftop asset</p>
                </div>
                <span className="px-3.5 py-1 bg-[#00dbe9]/10 rounded-full border border-[#00dbe9]/20 text-[#00dbe9] font-bold text-[10px] uppercase font-mono">
                  ROI PAYBACK: {results?.paybackYears} YEARS
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-xs text-[#b9cacb] uppercase tracking-wider">
                      <th className="pb-4 font-bold">Timeline</th>
                      <th className="pb-4 font-bold">Grid Power Cost (Est)</th>
                      <th className="pb-4 font-bold">Your Solar Cost</th>
                      <th className="pb-4 font-bold text-right">Net Cumulative Savings</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-xs text-white">
                    {[
                      { year: 'Year 1', grid: billVal ? Math.round(parseFloat(billVal) * 12).toLocaleString('en-IN') : '0', solar: '0', savings: results?.savings ? Math.round(parseFloat(results.savings.replace(/,/g, '')) * 12).toLocaleString('en-IN') : '0' },
                      { year: 'Year 5', grid: billVal ? Math.round(parseFloat(billVal) * 12 * 5 * 1.2).toLocaleString('en-IN') : '0', solar: '0', savings: results?.savings ? Math.round(parseFloat(results.savings.replace(/,/g, '')) * 12 * 5 * 1.15).toLocaleString('en-IN') : '0' },
                      { year: 'Year 10', grid: billVal ? Math.round(parseFloat(billVal) * 12 * 10 * 1.5).toLocaleString('en-IN') : '0', solar: '0', savings: results?.savings ? Math.round(parseFloat(results.savings.replace(/,/g, '')) * 12 * 10 * 1.4).toLocaleString('en-IN') : '0' },
                      { year: 'Year 25', grid: billVal ? Math.round(parseFloat(billVal) * 12 * 25 * 2.8).toLocaleString('en-IN') : '0', solar: '0', savings: results?.savings ? Math.round(parseFloat(results.savings.replace(/,/g, '')) * 12 * 25 * 2.6).toLocaleString('en-IN') : '0' },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-colors">
                        <td className="py-4 font-bold text-[#00dbe9]">{row.year}</td>
                        <td className="py-4 text-[#b9cacb]">₹{row.grid}</td>
                        <td className="py-4 text-emerald-400 font-medium">₹{row.solar} <span className="text-[10px] text-emerald-500/80">(Free Grid Credits)</span></td>
                        <td className="py-4 text-right text-[#00dbe9] font-extrabold text-sm">₹{row.savings}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Environmental & Asset Specs panel */}
            <div className="lg:col-span-4 space-y-6">
              {/* Sustainability Impact Metrics */}
              <div className="lumina-glass p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent space-y-6 border-emerald-500/20">
                <h4 className="text-sm uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1.5 font-mono">
                  <span className="material-symbols-outlined text-lg">eco</span>
                  Ecological Footprint
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-white/5">
                    <span className="text-xs text-[#b9cacb]">Clean Generation</span>
                    <span className="text-sm font-bold text-white">{results?.unitsSaved} kWh/yr</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-white/5">
                    <span className="text-xs text-[#b9cacb]">Carbon Prevented</span>
                    <span className="text-sm font-bold text-white">{results?.co2Reduced} Metric Tons/yr</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#b9cacb]">Offset Equivalent</span>
                    <span className="text-sm font-bold text-emerald-400 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">forest</span>
                      {results?.treesPlanted} Trees Grown
                    </span>
                  </div>
                </div>
              </div>

              {/* Asset Engineering Insights */}
              <div className="lumina-glass p-6 rounded-2xl space-y-4">
                <h4 className="text-xs uppercase tracking-widest text-[#00dbe9] font-bold flex items-center gap-1.5 font-mono">
                  <span className="material-symbols-outlined text-lg">engineering</span>
                  Rooftop Engineering Profile
                </h4>
                <ul className="space-y-3 text-xs text-[#b9cacb]">
                  <li className="flex gap-2">
                    <span className="text-[#00dbe9] font-bold">•</span>
                    <span>Requires approximately <strong className="text-white">{(parseFloat(results?.size || '5') * 80).toFixed(0)} sq. ft.</strong> of shadow-free terrace space.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#00dbe9] font-bold">•</span>
                    <span>Best orientation target: <strong className="text-white font-semibold">245° South-West</strong> to align with highest grid tariff rates.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#00dbe9] font-bold">•</span>
                    <span>Recommended panel technology: <strong className="text-white font-semibold">Monocrystalline PERC</strong> modules for premium yield.</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>

          {/* Decorative Footer Visual Hint */}
          <footer className="pt-10 pb-4 border-t border-white/5 text-center text-xs font-mono tracking-widest text-[#b9cacb]/40">
            Precision Engineering &bull; Advanced AI &bull; Sustainable Future
          </footer>

        </div>
      )}
    </div>
  );
}
