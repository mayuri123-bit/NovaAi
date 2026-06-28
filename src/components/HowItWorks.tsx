import React, { useState } from 'react';
import { 
  ArrowRight, Sparkles, UserPlus, MapPin, Calculator, 
  MessageSquare, Wrench, Search, Star, CheckCircle
} from 'lucide-react';
import { motion } from 'motion/react';

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  // Simple state machines for interactive steps
  const [selectedRole, setSelectedRole] = useState<'Customer' | 'Vendor'>('Customer');
  const [calcBill, setCalcBill] = useState(6000);
  const [vendorFilter, setVendorFilter] = useState("");
  const [contactMessageSent, setContactMessageSent] = useState(false);
  const [activeMaintenanceType, setActiveMaintenanceType] = useState('Panel Wash');

  const steps = [
    {
      num: "01",
      title: "Sign Up",
      description: "Create your account and choose your role to get started.",
      badge: "Step 01: Account Creation",
      icon: UserPlus,
      illustration: (
        <div className="space-y-4">
          <div className="bg-white/5 border border-white/5 p-4 rounded-xl space-y-3">
            <div>
              <label className="block text-[10px] text-brand-gray uppercase font-mono mb-2">Select Your Role</label>
              <div className="grid grid-cols-2 gap-2 bg-brand-black/40 p-1 rounded-lg border border-white/5">
                <button 
                  onClick={() => setSelectedRole('Customer')}
                  className={`text-[10px] py-1.5 rounded-md font-bold transition-all cursor-pointer ${
                    selectedRole === 'Customer' 
                      ? 'bg-brand-cyan text-brand-black shadow-[0_0_8px_rgba(0,242,255,0.4)]' 
                      : 'text-brand-gray hover:text-white'
                  }`}
                >
                  Customer / Buyer
                </button>
                <button 
                  onClick={() => setSelectedRole('Vendor')}
                  className={`text-[10px] py-1.5 rounded-md font-bold transition-all cursor-pointer ${
                    selectedRole === 'Vendor' 
                      ? 'bg-brand-cyan text-brand-black shadow-[0_0_8px_rgba(0,242,255,0.4)]' 
                      : 'text-brand-gray hover:text-white'
                  }`}
                >
                  Solar Vendor
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="p-2.5 rounded bg-brand-black/40 border border-white/5 text-[10px] text-brand-gray">
                Role selected: <span className="text-white font-bold">{selectedRole === 'Customer' ? 'Property Owner' : 'Certified Solar Provider'}</span>
              </div>
              <button className="w-full py-2 bg-brand-cyan text-brand-black rounded-lg text-xs font-bold hover:brightness-110 transition-all cursor-pointer border-none">
                Create My Account
              </button>
            </div>
          </div>
        </div>
      )
    },
    {
      num: "02",
      title: "Find Nearby Vendors",
      description: "Search and explore verified solar vendors near your location.",
      badge: "Step 02: Regional Search",
      icon: MapPin,
      illustration: (
        <div className="space-y-3">
          <div className="bg-white/5 border border-white/5 p-3 rounded-xl space-y-2">
            <div className="flex items-center gap-2 bg-brand-black/40 px-2.5 py-1.5 rounded-lg border border-white/5">
              <Search className="w-3.5 h-3.5 text-brand-cyan" />
              <input 
                type="text" 
                value={vendorFilter}
                onChange={(e) => setVendorFilter(e.target.value)}
                placeholder="Type location (e.g., Delhi, Gurugram)..."
                className="bg-transparent border-none text-[10px] text-white focus:outline-none w-full font-mono placeholder-brand-gray/50"
              />
            </div>

            <div className="space-y-1.5 max-h-[100px] overflow-y-auto pr-1">
              {[
                { name: "Helios Energy", loc: "Delhi NCR", dist: "1.2 km", rate: "4.9" },
                { name: "Zenith Solar Systems", loc: "Noida Sector 62", dist: "2.4 km", rate: "4.8" },
                { name: "Aura Smart Grids", loc: "Gurugram", dist: "4.1 km", rate: "4.7" }
              ].filter(v => v.name.toLowerCase().includes(vendorFilter.toLowerCase()) || v.loc.toLowerCase().includes(vendorFilter.toLowerCase())).map((v, i) => (
                <div key={i} className="flex justify-between items-center p-2 rounded bg-white/5 border border-white/5 text-[9px]">
                  <div>
                    <p className="font-bold text-white text-[9px]">{v.name}</p>
                    <p className="text-[8px] text-brand-gray">{v.loc} • {v.dist}</p>
                  </div>
                  <span className="flex items-center gap-0.5 text-brand-cyan font-bold text-[9px]">
                    {v.rate} <Star className="w-2.5 h-2.5 fill-brand-cyan text-brand-cyan" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      num: "03",
      title: "Calculate Solar Cost",
      description: "Enter your electricity usage to estimate the ideal solar system, cost, and savings.",
      badge: "Step 03: ROI Calculation",
      icon: Calculator,
      illustration: (
        <div className="space-y-3">
          <div className="bg-white/5 border border-white/5 p-3 rounded-xl space-y-2.5">
            <div>
              <div className="flex justify-between text-[10px] mb-1 font-mono">
                <span className="text-brand-gray">Electricity Bill:</span>
                <span className="text-white font-bold">₹{calcBill.toLocaleString()}/month</span>
              </div>
              <input 
                type="range" 
                min="1000" 
                max="20000" 
                step="500"
                value={calcBill} 
                onChange={(e) => setCalcBill(Number(e.target.value))}
                className="w-full accent-brand-cyan h-1 bg-white/10 rounded-lg cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 bg-brand-black/40 p-2 rounded-lg border border-white/5 text-[10px]">
              <div>
                <span className="text-[8px] text-brand-gray block uppercase">Recommended Size</span>
                <span className="text-white font-bold font-mono">{(calcBill / 1500).toFixed(1)} kW System</span>
              </div>
              <div className="text-right">
                <span className="text-[8px] text-brand-gray block uppercase">Est. Monthly Savings</span>
                <span className="text-brand-cyan font-bold font-mono">₹{Math.round(calcBill * 0.85).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      num: "04",
      title: "Connect with a Vendor",
      description: "View vendor details and contact the best provider for your requirements.",
      badge: "Step 04: Vendor Connection",
      icon: MessageSquare,
      illustration: (
        <div className="space-y-3">
          <div className="bg-white/5 border border-white/5 p-3 rounded-xl space-y-2">
            <div className="flex items-center gap-2 pb-2 border-b border-white/5">
              <div className="w-6 h-6 rounded-full bg-brand-cyan/20 flex items-center justify-center text-[10px] text-brand-cyan font-bold">
                HE
              </div>
              <div>
                <p className="text-[9px] font-bold text-white">Helios Energy Systems</p>
                <p className="text-[8px] text-brand-gray">Verified Solar Vendor</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="p-2 rounded bg-brand-black/40 text-[9px] text-brand-gray leading-relaxed">
                Rating: <span className="text-white font-bold">4.9 ★</span> • Completed Installations: <span className="text-white font-bold">320+</span>
              </div>
              {contactMessageSent ? (
                <div className="p-2 rounded bg-brand-cyan/10 border border-brand-cyan/20 text-[9px] text-brand-cyan text-center">
                  Message Sent to Vendor! ✓
                </div>
              ) : (
                <button 
                  onClick={() => setContactMessageSent(true)}
                  className="w-full py-1.5 bg-brand-cyan text-brand-black text-[10px] font-bold rounded hover:brightness-110 transition-all cursor-pointer border-none"
                >
                  Contact Vendor
                </button>
              )}
            </div>
          </div>
        </div>
      )
    },
    {
      num: "05",
      title: "Installation & Support",
      description: "Track installation progress and request maintenance whenever needed.",
      badge: "Step 05: Setup & Support",
      icon: Wrench,
      illustration: (
        <div className="space-y-3">
          <div className="bg-white/5 border border-white/5 p-3 rounded-xl space-y-2.5">
            <div className="flex justify-between items-center text-[9px]">
              <span className="text-white font-bold">Rooftop Setup Progress</span>
              <span className="text-brand-cyan font-bold font-mono">75% Completed</span>
            </div>
            
            <div className="grid grid-cols-3 gap-1">
              <div className="h-1.5 rounded-full bg-brand-cyan" />
              <div className="h-1.5 rounded-full bg-brand-cyan" />
              <div className="h-1.5 rounded-full bg-white/10 relative overflow-hidden">
                <div className="absolute left-0 top-0 h-full w-1/4 bg-brand-cyan animate-pulse" />
              </div>
            </div>

            <div className="flex justify-between items-center text-[9px] bg-brand-black/40 p-1.5 rounded-lg border border-white/5">
              <span className="text-brand-gray">Maintenance:</span>
              <div className="flex gap-1">
                {['Panel Wash', 'Technical Audit'].map((opt) => (
                  <button 
                    key={opt}
                    onClick={() => setActiveMaintenanceType(opt)}
                    className={`px-1.5 py-0.5 rounded text-[8px] font-bold transition-all cursor-pointer ${
                      activeMaintenanceType === opt 
                        ? 'bg-brand-cyan text-brand-black' 
                        : 'bg-white/5 text-brand-gray hover:text-white'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 relative bg-brand-black border-b border-white/5">
      {/* Background radial effects */}
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-brand-cyan/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[300px] h-[300px] bg-brand-blue/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Simple & Literal Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-brand-cyan/10 border border-brand-cyan/20 px-3 py-1 rounded-full text-xs font-semibold text-brand-cyan">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Process Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            How NovaAI Works
          </h2>
          <p className="text-brand-gray text-base sm:text-lg max-w-2xl mx-auto">
            Review our clear five-step process to get your solar setup fully configured, connected, and optimized.
          </p>
        </div>

        {/* 2 Column Bento Grid */}
        <div className="grid lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Column 1: Step-by-Step selector list */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            {steps.map((st, i) => {
              const StepIcon = st.icon;
              const isSelected = activeStep === i;

              return (
                <div 
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={`flex gap-5 items-start cursor-pointer text-left p-5 rounded-2xl border transition-all ${
                    isSelected 
                      ? 'bg-white/[0.03] border-brand-cyan/40 shadow-[0_0_20px_rgba(0,242,255,0.04)]' 
                      : 'border-transparent opacity-50 hover:opacity-100 hover:bg-white/[0.01]'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-brand-cyan text-brand-black font-black' : 'bg-white/5 text-brand-gray'
                  }`}>
                    <StepIcon className="w-5 h-5" />
                  </div>
                  
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-base text-white">{st.title}</h3>
                      <span className="text-[10px] font-mono text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded-full font-bold">
                        {st.num}
                      </span>
                    </div>
                    <p className="text-brand-gray text-xs leading-relaxed">{st.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Column 2: Live preview frame */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="glass-card p-6 sm:p-8 rounded-3xl relative overflow-hidden border-brand-cyan/10 flex flex-col justify-between min-h-[350px] bg-brand-dark/30">
              
              {/* Card top bar */}
              <div>
                <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-6">
                  <span className="text-[10px] uppercase tracking-wider font-mono text-brand-cyan bg-brand-cyan/10 px-3 py-1 rounded-full font-bold">
                    {steps[activeStep].badge}
                  </span>
                  <div className="flex space-x-1.5">
                    <span className="w-2.5 h-2.5 bg-red-500 rounded-full opacity-70" />
                    <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full opacity-70" />
                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full opacity-70" />
                  </div>
                </div>

                {/* Render the illustration component for this step */}
                <div className="py-2">
                  {steps[activeStep].illustration}
                </div>
              </div>

              {/* Card footer triggers */}
              <div className="pt-6 border-t border-white/5 flex justify-between items-center mt-6">
                <span className="text-[10px] font-mono text-brand-gray">Interactive Steps Preview</span>
                <button 
                  onClick={() => {
                    const nextIndex = (activeStep + 1) % steps.length;
                    setActiveStep(nextIndex);
                  }}
                  className="text-brand-cyan hover:text-white transition-colors text-xs font-bold flex items-center gap-1.5 cursor-pointer bg-transparent border-none p-0"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
