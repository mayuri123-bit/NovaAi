import React, { useState } from 'react';

interface GovSchemesTabProps {
  setActiveTab?: (tab: any) => void;
  monthlyBill?: number;
  calculatedCapacity?: number;
  showToast?: (text: string, type?: 'success' | 'info') => void;
  [key: string]: any;
}

interface UploadedFiles {
  aadhaar?: { name: string; url: string };
  bill?: { name: string; url: string };
  bank?: { name: string; url: string };
}

export default function GovSchemesTab({
  setActiveTab,
  monthlyBill = 150,
  calculatedCapacity = 3.5,
  showToast,
}: GovSchemesTabProps) {
  // Local state for dynamic subsidy estimator
  const defaultCapacity = Math.max(1, Math.round(calculatedCapacity * 10) / 10);
  const [capacity, setCapacity] = useState<number>(defaultCapacity);
  
  // Interactive Document checklist upload states
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFiles>({});
  const [activeStep, setActiveStep] = useState<number>(1);

  // PM Surya Ghar subsidy calculation formula:
  // - ₹30,000 per kW up to 2 kW
  // - ₹18,000 for the 3rd kW (Total ₹78,000 for 3 kW or higher)
  // - Capped at ₹78,000
  const calculateSubsidy = (kW: number) => {
    if (kW <= 0) return 0;
    if (kW <= 2) return kW * 30000;
    return 78000; // Capped at 78,000 for 3 kW and above
  };

  const subsidyAmount = calculateSubsidy(capacity);
  const estimatedCost = capacity * 65000; // Approximate cost in ₹ per kW
  const consumerShare = Math.max(0, estimatedCost - subsidyAmount);

  const handleFileUpload = (docType: 'aadhaar' | 'bill' | 'bank', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast?.('File size exceeds 5MB limit', 'info');
        return;
      }
      const fileUrl = URL.createObjectURL(file);
      setUploadedFiles((prev) => ({
        ...prev,
        [docType]: { name: file.name, url: fileUrl },
      }));
      showToast?.(`Uploaded ${file.name} successfully!`, 'success');
    }
  };

  const handleAskNova = () => {
    if (setActiveTab) {
      showToast?.('Redirecting to Nova AI assistant with PM Surya Ghar scheme query!', 'success');
      setActiveTab('ai');
    }
  };

  // Check progress of document uploads
  const totalUploaded = Object.keys(uploadedFiles).length;

  return (
    <div className="space-y-10 reveal-item w-full text-left">
      {/* 1. Header Section */}
      <header className="border-b border-white/10 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="inline-block px-3 py-1 rounded-full border border-[#cf5cff]/30 bg-[#cf5cff]/10 text-[#cf5cff] text-[10px] font-bold uppercase tracking-widest mb-3">
            National Subsidy Gateway
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Government Solar Schemes
          </h1>
          <p className="text-[#b9cacb] text-sm mt-1 max-w-2xl leading-relaxed">
            Harness PM Surya Ghar: Muft Bijli Yojana to claim direct state benefits, zero-out electricity bills, and verify subsidy payout criteria.
          </p>
        </div>
        {setActiveTab && (
          <button 
            onClick={() => setActiveTab('dashboard')}
            className="px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shrink-0"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>Dashboard Overview</span>
          </button>
        )}
      </header>

      {/* Grid Layout for Featured Scheme and Real-Time Subsidy Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* 2. Featured Scheme Card */}
        <div className="lg:col-span-7 premium-card p-8 md:p-10 rounded-3xl relative overflow-hidden group flex flex-col justify-between min-h-[380px] bg-gradient-to-br from-[#00dbe9]/10 via-transparent to-transparent">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-container/5 rounded-full blur-[80px] group-hover:bg-primary-container/10 transition-colors duration-500"></div>
          
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00dbe9]/10 border border-[#00dbe9]/20 text-primary font-bold text-[10px] uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00dbe9] animate-pulse"></span>
              MNRE Approved Scheme
            </span>
            
            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
                PM Surya Ghar: <br/>
                <span className="text-[#00dbe9]">Muft Bijli Yojana</span>
              </h2>
              <p className="text-[#b9cacb] text-sm md:text-base max-w-lg leading-relaxed font-medium">
                The flagship initiative by the Govt. of India supporting standard residential rooftop solar installations. Achieve absolute energy autonomy, supply power back to the grid, and claim direct bank transfers.
              </p>
            </div>
          </div>

          <div className="pt-8 flex flex-wrap gap-4">
            <a 
              href="https://pmsuryaghar.gov.in" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-6 py-3.5 bg-[#00dbe9] text-black hover:brightness-110 rounded-xl font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Apply via Official Portal</span>
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </a>
            <button 
              onClick={handleAskNova}
              className="px-6 py-3.5 border border-white/10 hover:border-primary/30 bg-white/5 text-[#b9cacb] hover:text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Query Nova AI</span>
              <span className="material-symbols-outlined text-sm">smart_toy</span>
            </button>
          </div>
        </div>

        {/* 3. Interactive Subsidy Calculator Card */}
        <div className="lg:col-span-5 glass-panel p-8 rounded-3xl flex flex-col justify-between border-white/10 relative overflow-hidden bg-gradient-to-b from-[#1d2026]/70 to-[#0d0f14]/80">
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-white/5">
              <h3 className="text-xs font-black text-[#cf5cff] uppercase tracking-wider">Subsidy Calculator</h3>
              <span className="material-symbols-outlined text-[#00dbe9] text-xl" style={{ fontVariationSettings: '"FILL" 1' }}>verified</span>
            </div>

            {/* Capacity Input Controls */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs text-[#b9cacb] font-bold uppercase tracking-wider">Proposed System Size</label>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-white">{capacity}</span>
                  <span className="text-xs text-[#b9cacb] font-bold">kW</span>
                </div>
              </div>

              {/* Slider Input */}
              <input 
                type="range" 
                min="1" 
                max="10" 
                step="0.5" 
                value={capacity}
                onChange={(e) => setCapacity(parseFloat(e.target.value))}
                className="w-full accent-[#00dbe9] h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer"
              />

              {/* Preset Buttons */}
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 5].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setCapacity(val)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all border ${
                      capacity === val 
                        ? 'bg-[#00dbe9]/10 border-[#00dbe9] text-[#00dbe9]' 
                        : 'bg-white/5 border-white/5 hover:border-white/10 text-[#b9cacb]'
                    }`}
                  >
                    {val} kW
                  </button>
                ))}
              </div>
            </div>

            {/* Output Summary */}
            <div className="space-y-4 pt-4">
              <div className="p-4 rounded-2xl bg-black/30 border border-white/5 flex flex-col items-center justify-center text-center space-y-1">
                <span className="text-[10px] text-[#b9cacb] uppercase font-bold tracking-widest">Estimated Govt Subsidy</span>
                <span className="text-3xl md:text-4xl font-black text-[#00dbe9] tracking-tight">₹{subsidyAmount.toLocaleString('en-IN')}</span>
                <span className="text-[10px] text-emerald-400 font-bold uppercase">Credited Directly to Bank</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-[#b9cacb]">
                  <span>Total System Cost (Est)</span>
                  <span className="text-white font-medium">₹{estimatedCost.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#b9cacb]">
                  <span>Subsidy Amount</span>
                  <span className="text-[#00dbe9] font-bold">- ₹{subsidyAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/5 text-sm">
                  <span className="text-white font-bold">Net Out-of-Pocket</span>
                  <span className="text-primary-container font-black">₹{consumerShare.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Required Documents Section with Mock File Attachment Options */}
      <section className="space-y-6 pt-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-[#cf5cff]">description</span>
              Required Documents
            </h2>
            <p className="text-xs text-[#b9cacb]">Attach scan or photo copies to secure high probability verification status.</p>
          </div>
          <div className="text-right shrink-0">
            <span className="inline-block px-3 py-1.5 rounded-full bg-[#00dbe9]/10 text-[#00dbe9] text-[10px] font-bold uppercase tracking-wider">
              Document Progress: {totalUploaded} of 3 Attached
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Document 1: Aadhaar */}
          <div className="premium-card p-6 rounded-2xl flex flex-col justify-between space-y-4 hover:border-primary-container/30 transition-all bg-white/5 border border-white/10 group relative">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#cf5cff]/10 flex items-center justify-center text-[#cf5cff] shrink-0">
                <span className="material-symbols-outlined text-2xl">badge</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-0.5">Aadhaar Card</h4>
                <p className="text-[11px] text-[#b9cacb] leading-relaxed">Proof of applicant identity & terrace location address.</p>
              </div>
            </div>

            <div className="pt-2">
              {uploadedFiles.aadhaar ? (
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs text-emerald-400">
                  <span className="truncate max-w-[150px] font-semibold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    {uploadedFiles.aadhaar.name}
                  </span>
                  <button 
                    onClick={() => setUploadedFiles(p => ({ ...p, aadhaar: undefined }))}
                    className="text-red-400 hover:text-red-300 font-bold text-xs p-1"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <label className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-dashed border-white/20 hover:border-[#00dbe9]/40 bg-white/5 hover:bg-white/10 text-xs text-[#b9cacb] hover:text-white font-semibold cursor-pointer transition-all">
                  <span className="material-symbols-outlined text-sm">cloud_upload</span>
                  <span>Upload Photo / PDF</span>
                  <input 
                    type="file" 
                    accept="image/*,application/pdf"
                    className="hidden" 
                    onChange={(e) => handleFileUpload('aadhaar', e)}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Document 2: Electricity Bill */}
          <div className="premium-card p-6 rounded-2xl flex flex-col justify-between space-y-4 hover:border-primary-container/30 transition-all bg-white/5 border border-white/10 group relative">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#cf5cff]/10 flex items-center justify-center text-[#cf5cff] shrink-0">
                <span className="material-symbols-outlined text-2xl">electric_meter</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-0.5">Electricity Bill</h4>
                <p className="text-[11px] text-[#b9cacb] leading-relaxed">Must be latest 6 months. To verify consumption and CA number.</p>
              </div>
            </div>

            <div className="pt-2">
              {uploadedFiles.bill ? (
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs text-emerald-400">
                  <span className="truncate max-w-[150px] font-semibold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    {uploadedFiles.bill.name}
                  </span>
                  <button 
                    onClick={() => setUploadedFiles(p => ({ ...p, bill: undefined }))}
                    className="text-red-400 hover:text-red-300 font-bold text-xs p-1"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <label className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-dashed border-white/20 hover:border-[#00dbe9]/40 bg-white/5 hover:bg-white/10 text-xs text-[#b9cacb] hover:text-white font-semibold cursor-pointer transition-all">
                  <span className="material-symbols-outlined text-sm">cloud_upload</span>
                  <span>Upload Photo / PDF</span>
                  <input 
                    type="file" 
                    accept="image/*,application/pdf"
                    className="hidden" 
                    onChange={(e) => handleFileUpload('bill', e)}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Document 3: Bank Details */}
          <div className="premium-card p-6 rounded-2xl flex flex-col justify-between space-y-4 hover:border-primary-container/30 transition-all bg-white/5 border border-white/10 group relative">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#cf5cff]/10 flex items-center justify-center text-[#cf5cff] shrink-0">
                <span className="material-symbols-outlined text-2xl">account_balance</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-0.5">Bank Passbook / Cheque</h4>
                <p className="text-[11px] text-[#b9cacb] leading-relaxed">Required for direct subsidy bank transfer disbursement.</p>
              </div>
            </div>

            <div className="pt-2">
              {uploadedFiles.bank ? (
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs text-emerald-400">
                  <span className="truncate max-w-[150px] font-semibold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    {uploadedFiles.bank.name}
                  </span>
                  <button 
                    onClick={() => setUploadedFiles(p => ({ ...p, bank: undefined }))}
                    className="text-red-400 hover:text-red-300 font-bold text-xs p-1"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <label className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-dashed border-white/20 hover:border-[#00dbe9]/40 bg-white/5 hover:bg-white/10 text-xs text-[#b9cacb] hover:text-white font-semibold cursor-pointer transition-all">
                  <span className="material-symbols-outlined text-sm">cloud_upload</span>
                  <span>Upload Photo / PDF</span>
                  <input 
                    type="file" 
                    accept="image/*,application/pdf"
                    className="hidden" 
                    onChange={(e) => handleFileUpload('bank', e)}
                  />
                </label>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Interactive Application Process Timeline */}
      <section className="space-y-6 pt-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white">Application Process</h2>
          <p className="text-xs text-[#b9cacb]">Click each chronological stage below to reveal precise requirements.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {[
            { step: 1, icon: 'person_search', title: 'Verify Eligibility', desc: 'Determine roof shadow-free space and consumption parameters.' },
            { step: 2, icon: 'handshake', title: 'Empaneled Vendor', desc: 'Select an authorized MNRE solar contractor in your zone.' },
            { step: 3, icon: 'construction', title: 'Array Installation', desc: 'Hardware setup, safety review, and dynamic net-meter synchronization.' },
            { step: 4, icon: 'payments', title: 'Subsidy Payout', desc: 'Grid clearance inspection, followed by direct bank credit.' }
          ].map((item) => (
            <div 
              key={item.step}
              onClick={() => setActiveStep(item.step)}
              className={`p-6 rounded-2xl text-center flex flex-col items-center space-y-4 cursor-pointer transition-all border ${
                activeStep === item.step 
                  ? 'bg-gradient-to-b from-[#00dbe9]/10 to-[#cf5cff]/10 border-[#00dbe9] shadow-[0_0_20px_rgba(0,240,255,0.1)] scale-102' 
                  : 'bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/10'
              }`}
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all ${
                activeStep === item.step 
                  ? 'bg-[#00dbe9] text-black border-[#00dbe9]' 
                  : 'bg-black/40 text-[#00dbe9] border-white/10'
              }`}>
                <span className="material-symbols-outlined text-2xl">{item.icon}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#b9cacb]/60">Stage 0{item.step}</span>
                <h4 className="text-sm font-bold text-white">{item.title}</h4>
                <p className="text-[11px] text-[#b9cacb] leading-relaxed line-clamp-2">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Detail Panel for the Selected Stage */}
        <div className="premium-card p-6 md:p-8 rounded-3xl bg-black/20 border border-white/10">
          {activeStep === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2 space-y-4">
                <span className="inline-block px-2.5 py-1 rounded bg-[#00dbe9]/10 text-[#00dbe9] text-[10px] font-bold uppercase">Stage 01 Detail Guidelines</span>
                <h3 className="text-lg font-bold text-white">Rooftop & Electrical Verification</h3>
                <p className="text-xs text-[#b9cacb] leading-relaxed">
                  Before applying, ensure you have a minimum of 100 sq. ft. of clean, shadow-free roof or terrace space per kilowatt of installation. The consumer connection capacity must match or exceed the proposed solar array size.
                </p>
                <ul className="text-xs text-[#b9cacb] space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#00dbe9] rounded-full"></span>
                    <span>Verify with local utility standard consumer capacity guidelines</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#00dbe9] rounded-full"></span>
                    <span>Generate custom sizing model recommendations via our <button onClick={() => setActiveTab?.('calculator')} className="text-[#00dbe9] hover:underline font-bold">Calculator Tab</button></span>
                  </li>
                </ul>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-3">
                <span className="material-symbols-outlined text-3xl text-[#00dbe9]">domain</span>
                <p className="text-[11px] text-[#b9cacb] font-medium">Verify your exact rooftop suitability using our interactive simulator.</p>
                <button 
                  onClick={() => setActiveTab?.('calculator')}
                  className="w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[11px] font-bold uppercase transition-all"
                >
                  Configure Sizing
                </button>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2 space-y-4">
                <span className="inline-block px-2.5 py-1 rounded bg-[#00dbe9]/10 text-[#00dbe9] text-[10px] font-bold uppercase">Stage 02 Detail Guidelines</span>
                <h3 className="text-lg font-bold text-white">Partner with MNRE Registered Contractors</h3>
                <p className="text-xs text-[#b9cacb] leading-relaxed">
                  Only systems commissioned through officially empaneled solar contractors qualify for the government subsidy payment. These companies follow standard building protocols, utilize certified non-hazardous modules, and execute the final electrical filings.
                </p>
                <ul className="text-xs text-[#b9cacb] space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#00dbe9] rounded-full"></span>
                    <span>Ensure 5-year replacement hardware warranty is included</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#00dbe9] rounded-full"></span>
                    <span>Check our curated, rated team matches in the <button onClick={() => setActiveTab?.('nearby')} className="text-[#00dbe9] hover:underline font-bold">Nearby Solar Companies</button> list</span>
                  </li>
                </ul>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-3">
                <span className="material-symbols-outlined text-3xl text-[#00dbe9]">groups</span>
                <p className="text-[11px] text-[#b9cacb] font-medium">Access verified nearby installers with instant direct quotation requests.</p>
                <button 
                  onClick={() => setActiveTab?.('nearby')}
                  className="w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[11px] font-bold uppercase transition-all"
                >
                  Find Installers
                </button>
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2 space-y-4">
                <span className="inline-block px-2.5 py-1 rounded bg-[#00dbe9]/10 text-[#00dbe9] text-[10px] font-bold uppercase">Stage 03 Detail Guidelines</span>
                <h3 className="text-lg font-bold text-white">System Delivery & Net-Meter Setup</h3>
                <p className="text-xs text-[#b9cacb] leading-relaxed">
                  The chosen contractor delivers raw solar hardware, mounts structurally resilient racks, and hooks up the high-efficiency inverter module. Post-installation, the local electricity board installs an advanced bi-directional net-meter.
                </p>
                <ul className="text-xs text-[#b9cacb] space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#00dbe9] rounded-full"></span>
                    <span>Bi-directional meters measure excess power exports back to grid</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#00dbe9] rounded-full"></span>
                    <span>Contractor handles joint inspection filings with power authorities</span>
                  </li>
                </ul>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-3">
                <span className="material-symbols-outlined text-3xl text-[#00dbe9]">bolt</span>
                <p className="text-[11px] text-[#b9cacb] font-medium">Have questions on bi-directional grid export rules? Nova is here to explain.</p>
                <button 
                  onClick={handleAskNova}
                  className="w-full py-2 rounded-lg bg-[#00dbe9] text-black hover:brightness-110 text-[11px] font-bold uppercase transition-all"
                >
                  Consult AI
                </button>
              </div>
            </div>
          )}

          {activeStep === 4 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2 space-y-4">
                <span className="inline-block px-2.5 py-1 rounded bg-[#00dbe9]/10 text-[#00dbe9] text-[10px] font-bold uppercase">Stage 04 Detail Guidelines</span>
                <h3 className="text-lg font-bold text-white">Final Direct Subsidy Bank Credit</h3>
                <p className="text-xs text-[#b9cacb] leading-relaxed">
                  Once the net-meter is initialized and active, the joint commissioning report is uploaded onto the PM Surya Ghar National Portal. Local officers authorize inspection credentials, and the subsidy funds transfer triggers directly to your bank.
                </p>
                <ul className="text-xs text-[#b9cacb] space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#00dbe9] rounded-full"></span>
                    <span>Disbursals post-approval generally clear in 30 working days</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#00dbe9] rounded-full"></span>
                    <span>Make sure your uploaded Bank details match your Aadhaar name registry</span>
                  </li>
                </ul>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-3">
                <span className="material-symbols-outlined text-3xl text-[#00dbe9]">credit_card</span>
                <p className="text-[11px] text-[#b9cacb] font-medium">Ready to claim the official government solar rebate subsidy?</p>
                <a 
                  href="https://pmsuryaghar.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block w-full py-2 rounded-lg bg-gradient-to-r from-[#00dbe9] to-[#cf5cff] text-black text-[11px] font-bold uppercase text-center transition-all"
                >
                  Start Portal Application
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 6. Call to Action Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        {/* Ask Nova AI Card */}
        <div className="glass-panel rounded-3xl p-8 flex flex-col items-center text-center justify-between group border-white/10 relative overflow-hidden bg-gradient-to-br from-[#cf5cff]/5 via-transparent to-transparent">
          <div className="w-16 h-16 rounded-2xl bg-[#cf5cff]/10 flex items-center justify-center text-[#cf5cff] mb-6 group-hover:scale-105 transition-transform duration-300">
            <span className="material-symbols-outlined text-3xl">smart_toy</span>
          </div>
          <div className="space-y-3 mb-6">
            <h3 className="text-lg font-bold text-white">Need Help Deciphering the Fine Print?</h3>
            <p className="text-xs text-[#b9cacb] leading-relaxed max-w-sm mx-auto">
              Our intelligent, real-time AI consultant Nova has comprehensive knowledge of MNRE rooftop guidelines, technical specifications, and tax credits.
            </p>
          </div>
          <button 
            onClick={handleAskNova}
            className="w-full py-3.5 rounded-xl border border-[#cf5cff]/30 text-[#cf5cff] hover:bg-[#cf5cff]/10 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            Consult Nova Solar Assistant
          </button>
        </div>

        {/* PM Surya Ghar Official Website Card */}
        <div className="glass-panel rounded-3xl p-8 flex flex-col items-center text-center justify-between group border-white/10 relative overflow-hidden bg-gradient-to-br from-[#00dbe9]/5 via-transparent to-transparent">
          <div className="w-16 h-16 rounded-2xl bg-[#00dbe9]/10 flex items-center justify-center text-[#00dbe9] mb-6 group-hover:scale-105 transition-transform duration-300">
            <span className="material-symbols-outlined text-3xl">account_balance</span>
          </div>
          <div className="space-y-3 mb-6">
            <h3 className="text-lg font-bold text-white">Official Government Portal</h3>
            <p className="text-xs text-[#b9cacb] leading-relaxed max-w-sm mx-auto">
              Initiate your official registration, upload physical inspection checklists, and trace live subsidy disbursement stages directly at the National Portal.
            </p>
          </div>
          <a 
            href="https://pmsuryaghar.gov.in" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all text-center"
          >
            Visit National Portal website
          </a>
        </div>
      </section>
    </div>
  );
}
