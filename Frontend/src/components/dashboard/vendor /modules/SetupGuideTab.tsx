import React, { useState } from 'react';
import { 
  CheckCircle2, 
  HelpCircle, 
  AlertCircle, 
  Loader2, 
  ArrowRight, 
  Link2,
  Lock
} from 'lucide-react';

interface SetupGuideTabProps {
  showToast?: (text: string, type?: 'success' | 'info') => void;
}

export default function SetupGuideTab({ showToast = () => {} }: SetupGuideTabProps) {
  const [bankLinked, setBankLinked] = useState(false);
  const [linking, setLinking] = useState(false);

  const handleLinkBank = () => {
    setLinking(true);
    setTimeout(() => {
      setBankLinked(true);
      setLinking(false);
      showToast('🎉 ESCROW Bank account linked safely via Razorpay!', 'success');
    }, 2000);
  };

  const completedCount = bankLinked ? 3 : 2;
  const progressPercent = Math.round((completedCount / 3) * 100);

  return (
    <div className="space-y-8 animate-fade-in text-left">
      <div className="bg-[#1d2026]/40 border border-white/5 p-8 rounded-[2rem] max-w-3xl space-y-8">
        <div>
          <h2 className="text-2xl font-black text-white">Onboarding Setup Checklist</h2>
          <p className="text-sm text-[#b9cacb] mt-1">Complete these core operations to unlock full regional lead routing and instant subsidy payouts.</p>
        </div>

        {/* Dynamic Progress indicator */}
        <div className="space-y-3 font-mono">
          <div className="flex justify-between text-xs text-[#00f0ff] font-bold">
            <span>STATUS: {bankLinked ? 'FULLY OPERATIONAL' : 'FINALIZING LINK'}</span>
            <span>{progressPercent}% COMPLETED</span>
          </div>
          <div className="w-full bg-[#10131a] h-3 rounded-full overflow-hidden border border-white/5">
            <div 
              className="bg-gradient-to-r from-[#00dbe9] to-[#cf5cff] h-full transition-all duration-700 shadow-[0_0_15px_rgba(0,240,255,0.4)]" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t border-white/5">
          {/* Milestone 1 */}
          <div className="flex items-start gap-4 bg-white/[0.01] border border-white/5 p-4 rounded-xl">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-white">Corporate Identity & GSTIN</h4>
              <p className="text-xs text-[#b9cacb]/80 mt-1">Verified with Ministry of Corporate Affairs and GSTN database registry. Approved.</p>
            </div>
          </div>

          {/* Milestone 2 */}
          <div className="flex items-start gap-4 bg-white/[0.01] border border-white/5 p-4 rounded-xl">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-white">MNRE Empanelment Certification</h4>
              <p className="text-xs text-[#b9cacb]/80 mt-1">Empaneled under Ministry of New and Renewable Energy tier-1 vendor list (ID: MNRE-1409-G).</p>
            </div>
          </div>

          {/* Milestone 3: Dynamic */}
          <div className={`flex items-start gap-4 p-4 rounded-xl border transition-all duration-500 ${
            bankLinked 
              ? 'bg-white/[0.01] border-white/5' 
              : 'bg-[#00f0ff]/5 border-[#00f0ff]/30'
          }`}>
            {bankLinked ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-[#00f0ff] mt-0.5 shrink-0 animate-pulse" />
            )}
            <div className="flex-1">
              <h4 className="text-sm font-bold text-white">Link ESCROW Bank Account</h4>
              <p className="text-xs text-[#b9cacb]/80 mt-1">Required to facilitate secure state-granted consumer subsidies and payouts safely.</p>
              
              {bankLinked ? (
                <div className="mt-2.5 flex items-center gap-2 text-xs text-emerald-400 font-bold font-mono">
                  <Lock className="w-4 h-4" />
                  <span>State Bank of India (ESCROW xxxx-8490) Verified & Locked</span>
                </div>
              ) : (
                <button 
                  onClick={handleLinkBank}
                  disabled={linking}
                  className="bg-[#00f0ff] text-[#002022] font-black text-[11px] px-4 py-2 rounded-xl mt-3 border-none hover:opacity-90 transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
                >
                  {linking ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Connecting Razorpay API...
                    </>
                  ) : (
                    <>
                      <Link2 className="w-3.5 h-3.5" />
                      Connect ESCROW Bank Account
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
