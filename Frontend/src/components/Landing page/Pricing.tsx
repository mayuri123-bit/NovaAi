import React, { useState } from 'react';
import { Check, Info, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface PricingProps {
  onOpenDemo: (planName?: string) => void;
}

export default function Pricing({ onOpenDemo }: PricingProps) {
  const [isAnnually, setIsAnnually] = useState(false);

  return (
    <section id="pricing" className="py-8 md:py-12 px-6 relative bg-brand-black">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-cyan/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header with reveal animation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 space-y-2"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white">Scalable Intelligence</h2>
          <p className="text-brand-gray text-sm max-w-xl mx-auto leading-relaxed">
            Free for everyone, upgrade for power. Choose the plan that matches your energy ambitions.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex justify-center items-center gap-3 pt-1">
            <span className={`text-xs ${!isAnnually ? 'text-brand-cyan font-semibold' : 'text-brand-gray'}`}>Monthly Billing</span>
            <button 
              onClick={() => setIsAnnually(!isAnnually)}
              className="w-10 h-5 rounded-full bg-white/10 p-0.5 flex items-center transition-colors relative cursor-pointer border-none"
            >
              <div className={`w-3.5 h-3.5 rounded-full bg-brand-cyan transition-transform ${isAnnually ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
            <span className={`text-xs ${isAnnually ? 'text-brand-cyan font-semibold' : 'text-brand-gray'} flex items-center gap-1`}>
              Annually <span className="text-[9px] bg-brand-cyan/20 text-brand-cyan px-1.5 py-0.5 rounded-full font-bold">SAVE 20%</span>
            </span>
          </div>
        </motion.div>

        {/* Plan Cards Grid with staggered reveal animation */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch max-w-5xl mx-auto">
          
          {/* Plan 1: Basic */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card p-6 flex flex-col justify-between bg-white/[0.01] hover:border-white/15 hover:bg-white/[0.02] transition-all rounded-2xl group"
          >
            <div>
              <h3 className="text-lg font-bold text-white flex justify-between items-start">
                Basic
              </h3>
              <span className="text-brand-cyan text-[11px] font-semibold block mt-0.5">Free Service</span>

              {/* Price Row */}
              <div className="my-5">
                <span className="text-3xl font-black text-white font-mono">₹0</span>
                <span className="text-brand-gray ml-1.5 text-xs font-medium">/mo</span>
                <p className="text-brand-cyan text-[9px] font-bold uppercase tracking-widest mt-1.5">
                  Free for everyone
                </p>
              </div>

              {/* Features checklist */}
              <ul className="space-y-2.5 mb-6 text-xs text-brand-gray">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                  <span>Solar Potential Map</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                  <span>Basic ROI Calculator</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                  <span>Vendor Directory</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={() => onOpenDemo("Basic Plan")}
              className="w-full py-2.5 rounded-lg border border-white/10 hover:bg-white/5 active:scale-95 transition-all text-white font-bold text-xs cursor-pointer"
            >
              Get Started
            </button>
          </motion.div>

          {/* Plan 2: Pro Intelligence (Most Popular Highlighted Card) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-6 flex flex-col justify-between relative border-brand-cyan/40 bg-white/[0.04] shadow-[0_0_30px_rgba(0,242,255,0.05)] hover:border-brand-cyan/60 hover:shadow-[0_0_40px_rgba(0,242,255,0.1)] transition-all rounded-2xl group"
          >
            
            {/* Centered Most Popular Header Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-cyan text-brand-black text-[9px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-[0_0_10px_rgba(0,242,255,0.3)]">
              Most Popular
            </div>

            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-white">Pro Intelligence</h3>
                  <span className="text-brand-blue text-[11px] font-semibold block mt-0.5">Advanced Versions</span>
                </div>
              </div>

              {/* Upgrade tag */}
              <span className="inline-block mt-2 px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] text-brand-gray font-mono">
                Upgrade for advanced features
              </span>

              {/* Price Row */}
              <div className="my-5">
                <span className="text-3xl font-black text-white font-mono">
                  {isAnnually ? '₹79' : '₹99'}
                </span>
                <span className="text-brand-gray ml-1.5 text-xs font-medium">/mo</span>
                {isAnnually && (
                  <p className="text-brand-cyan text-[9px] font-bold uppercase tracking-widest mt-1.5">
                    Billed ₹948 annually
                  </p>
                )}
              </div>

              {/* Features checklist */}
              <ul className="space-y-2.5 mb-6 text-xs">
                <li className="flex items-center gap-2 text-white">
                  <Check className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                  <span>Hyperlocal Yield Mapping</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <Check className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                  <span>Automated Bid Management</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <Check className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                  <span>Tax Credit Automation</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <Check className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                  <span>Live Efficiency Alerts</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={() => onOpenDemo("Pro Intelligence Plan")}
              className="w-full py-2.5 rounded-lg bg-brand-cyan text-brand-black font-black text-xs hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_4px_15px_rgba(0,242,255,0.2)] cursor-pointer border-none"
            >
              Start 14-Day Free Trial
            </button>
          </motion.div>

          {/* Plan 3: Enterprise */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card p-6 flex flex-col justify-between bg-white/[0.01] hover:border-white/15 hover:bg-white/[0.02] transition-all rounded-2xl group"
          >
            <div>
              <h3 className="text-lg font-bold text-white flex justify-between items-start">
                Enterprise
              </h3>
              <span className="text-brand-gray text-[11px] font-semibold block mt-0.5">SLA &amp; Custom Integration</span>

              {/* Price Row */}
              <div className="my-5">
                <span className="text-2xl font-extrabold text-white font-mono">₹ Contact Us</span>
                <p className="text-brand-gray text-[9px] font-bold uppercase tracking-widest mt-2.5">
                  Tailored for utility scale
                </p>
              </div>

              {/* Features checklist */}
              <ul className="space-y-2.5 mb-6 text-xs text-brand-gray">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                  <span>Fleet-scale Monitoring</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                  <span>White-label Dashboards</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                  <span>Grid-API Access</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                  <span>Dedicated Success Rep</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={() => onOpenDemo("Enterprise Plan")}
              className="w-full py-2.5 rounded-lg border border-white/10 hover:bg-white/5 active:scale-95 transition-all text-white font-bold text-xs cursor-pointer"
            >
              Contact Sales
            </button>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
