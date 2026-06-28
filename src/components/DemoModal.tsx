import React, { useState, useEffect } from 'react';
import { X, Check, ArrowRight, ShieldCheck, Sparkles, Building2, User, KeyRound } from 'lucide-react';
import { motion } from 'motion/react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: string; // "Login" | "Signup" | "FreeTrial" | "ContactSales"
}

export default function DemoModal({ isOpen, onClose, initialMode = "FreeTrial" }: DemoModalProps) {
  const [mode, setMode] = useState(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    setMode(initialMode);
    setFormSubmitted(false);
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Dark overlay backdrop */}
      <div className="absolute inset-0 bg-brand-black/80 backdrop-blur-md" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg glass-card p-8 sm:p-10 rounded-3xl border-brand-cyan/25 shadow-[0_0_50px_rgba(0,242,255,0.15)] bg-[#0d0f14] z-10 overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-cyan/10 rounded-full filter blur-2xl pointer-events-none" />

        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-brand-gray hover:text-white p-1 rounded-full bg-white/5 border border-white/5 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {formSubmitted ? (
          <div className="text-center py-8 space-y-6">
            <div className="w-16 h-16 bg-brand-cyan/10 border border-brand-cyan/30 rounded-full flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(0,242,255,0.2)]">
              <ShieldCheck className="w-8 h-8 text-brand-cyan" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">System Synchronized</h3>
              <p className="text-brand-gray text-sm max-w-sm mx-auto">
                {mode === "ContactSales" 
                  ? "We have received your utility scale deployment query. A specialist will reach out within 4 hours."
                  : "Welcome to NovaAI! Your sandbox environment is configured and ready for live solar mapping."
                }
              </p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-xs text-brand-cyan font-mono flex items-center justify-between">
              <span>PRO_SYSTEM_STATUS</span>
              <span>ONLINE / 100% SECURE</span>
            </div>
            <button 
              onClick={onClose}
              className="w-full py-3.5 bg-brand-cyan text-brand-black font-bold rounded-xl hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              Access Dashboard
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1 text-left">
              <span className="text-[10px] uppercase tracking-widest font-mono text-brand-cyan flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Security Gateway
              </span>
              <h3 className="text-2xl font-bold text-white">
                {mode === "Login" && "Login to NovaAI"}
                {mode === "Signup" && "Create NovaAI Account"}
                {mode === "FreeTrial" && "Start Pro 14-Day Free Trial"}
                {mode === "ContactSales" && "Contact Sales"}
              </h3>
              <p className="text-brand-gray text-xs">
                {mode === "ContactSales" 
                  ? "Reach our grid-infrastructure specialists to customize API configurations." 
                  : "Configure your solar portfolio and deploy deep AI mapping models."
                }
              </p>
            </div>

            {/* Modal Input Fields */}
            <div className="space-y-4">
              {(mode === "Signup" || mode === "FreeTrial" || mode === "ContactSales") && (
                <div className="relative">
                  <User className="absolute left-4 top-3.5 w-5 h-5 text-brand-gray" />
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-brand-black/60 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white placeholder-brand-gray focus:outline-none focus:ring-1 focus:ring-brand-cyan focus:border-brand-cyan transition-all"
                  />
                </div>
              )}

              <div className="relative">
                <User className="absolute left-4 top-3.5 w-5 h-5 text-brand-gray" />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-brand-black/60 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white placeholder-brand-gray focus:outline-none focus:ring-1 focus:ring-brand-cyan focus:border-brand-cyan transition-all"
                />
              </div>

              {mode === "ContactSales" && (
                <div className="relative">
                  <Building2 className="absolute left-4 top-3.5 w-5 h-5 text-brand-gray" />
                  <input 
                    type="text" 
                    placeholder="Company Name" 
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                    className="w-full bg-brand-black/60 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white placeholder-brand-gray focus:outline-none focus:ring-1 focus:ring-brand-cyan focus:border-brand-cyan transition-all"
                  />
                </div>
              )}

              {mode !== "ContactSales" && (
                <div className="relative">
                  <KeyRound className="absolute left-4 top-3.5 w-5 h-5 text-brand-gray" />
                  <input 
                    type="password" 
                    placeholder="Security Code (Password)" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-brand-black/60 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white placeholder-brand-gray focus:outline-none focus:ring-1 focus:ring-brand-cyan focus:border-brand-cyan transition-all"
                  />
                </div>
              )}
            </div>

            {/* CTA button */}
            <button 
              type="submit" 
              className="w-full py-4 bg-brand-cyan text-brand-black font-black rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-[0_4px_20px_rgba(0,242,255,0.2)] flex items-center justify-center gap-2 cursor-pointer"
            >
              {mode === "Login" && "Login to Dashboard"}
              {mode === "Signup" && "Create Developer Account"}
              {mode === "FreeTrial" && "Start 14-Day Free Trial"}
              {mode === "ContactSales" && "Submit Sales Inquiry"}
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Bottom Swappers */}
            <div className="pt-4 border-t border-white/5 text-center">
              {mode === "Login" ? (
                <p className="text-xs text-brand-gray">
                  Don't have an account?{" "}
                  <button type="button" onClick={() => setMode("Signup")} className="text-brand-cyan font-bold hover:underline cursor-pointer">
                    Sign up free
                  </button>
                </p>
              ) : mode === "Signup" || mode === "FreeTrial" ? (
                <p className="text-xs text-brand-gray">
                  Already have an account?{" "}
                  <button type="button" onClick={() => setMode("Login")} className="text-brand-cyan font-bold hover:underline cursor-pointer">
                    Log in
                  </button>
                </p>
              ) : (
                <p className="text-xs text-brand-gray">
                  Need direct developer setup support?{" "}
                  <a href="mailto:support@novaai.com" className="text-brand-cyan font-bold hover:underline">
                    Contact tech support
                  </a>
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
