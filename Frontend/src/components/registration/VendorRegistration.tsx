import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Building, Fingerprint, User, Mail, ShieldCheck, ArrowRight, Zap } from 'lucide-react';

interface VendorRegistrationProps {
  onClose: () => void;
  onSuccess: (formData: any) => void;
  onSwitchToLogin: () => void;
  onBackToPaths: () => void;
}

export default function VendorRegistration({
  onClose,
  onSuccess,
  onSwitchToLogin,
  onBackToPaths,
}: VendorRegistrationProps) {
  const [vendorName, setVendorName] = useState('');
  const [regId, setRegId] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  // Background radial light track effect on mouse movement across the card
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
        cardRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 219, 233, 0.08) 0%, rgba(255, 255, 255, 0.03) 50%)`;
      } else {
        cardRef.current.style.background = `rgba(255, 255, 255, 0.03)`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Save vendor to localStorage for dynamic persistent login
      const registeredUsers = JSON.parse(localStorage.getItem('nova_registered_users') || '[]');
      const filteredUsers = registeredUsers.filter((u: any) => u.email.toLowerCase() !== email.toLowerCase());
      filteredUsers.push({
        fullName: contactName || vendorName || "Helios Solar Dynamics",
        companyName: vendorName,
        regId,
        email,
        password,
        location: "Mumbai, MH",
        role: 'vendor'
      });
      localStorage.setItem('nova_registered_users', JSON.stringify(filteredUsers));

      setTimeout(() => {
        onSuccess({ vendorName, regId, contactName, email, password });
      }, 1500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[110] bg-[#10131a] text-[#e1e2eb] overflow-y-auto font-sans antialiased selection:bg-[#00dbe9]/30 selection:text-white flex flex-col min-h-screen">
      
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#00dbe9] filter blur-[80px] pointer-events-none opacity-40 animate-pulse z-0" />
      <div className="absolute bottom-[-5%] right-[10%] w-[400px] h-[400px] rounded-full bg-[#cf5cff] filter blur-[80px] pointer-events-none opacity-20 z-0" />

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 w-full z-50 flex justify-between items-center px-6 py-6 lg:px-16 bg-[#10131a]/20 backdrop-blur-md border-b border-white/5">
        <div 
          onClick={onBackToPaths}
          className="flex items-center gap-2 cursor-pointer group select-none"
        >
          <span className="material-symbols-outlined text-[#00dbe9] text-3xl" style={{ fontVariationSettings: '"FILL" 1' }}>
            solar_power
          </span>
          <h1 className="text-xl font-bold tracking-tighter uppercase text-white font-mono">
            Nova<span className="text-[#00dbe9]">AI</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onSwitchToLogin}
            className="text-xs lg:text-sm text-[#b9cacb] hover:text-[#00dbe9] transition-colors duration-300 flex items-center gap-1 cursor-pointer bg-transparent border-none focus:outline-none"
          >
            Already registered? <span className="text-[#00dbe9] font-bold ml-1">Log In</span>
          </button>
          <span className="text-[#b9cacb]/40 text-xs">•</span>
          <button
            onClick={onSwitchToLogin}
            className="text-xs lg:text-sm text-[#00dbe9] font-bold hover:underline transition-colors duration-300 cursor-pointer bg-transparent border-none focus:outline-none"
          >
            Forgot Password?
          </button>
        </div>
      </header>

      {/* Main Grid Onboarding Layout */}
      <main className="flex-1 min-h-screen grid grid-cols-1 lg:grid-cols-2 pt-28 pb-12 px-6 lg:px-16 items-center z-10 relative">
        
        {/* Left Side: Visual & Narrative */}
        <section className="relative hidden lg:flex flex-col justify-center space-y-8 pr-12">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#00dbe9] animate-ping" />
              <span className="text-[10px] uppercase tracking-widest text-[#00dbe9] font-bold font-mono">
                Solar Intelligence Grid
              </span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
              Powering the <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00dbe9] to-[#cf5cff]">
                Next Generation
              </span> of Energy.
            </h2>
            
            <p className="text-base lg:text-lg text-[#b9cacb] mb-10 leading-relaxed">
              Connect to NovaAI's neural grid. Unlock real-time precision analytics and automated solar enterprise management.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="glass-card bg-white/[0.03] p-6 rounded-xl border border-white/8 backdrop-blur-md">
                <span className="material-symbols-outlined text-[#00dbe9] mb-3 text-2xl">analytics</span>
                <h4 className="text-sm font-bold text-[#00dbe9] mb-1 font-mono">AI Precision</h4>
                <p className="text-xs text-[#b9cacb] leading-relaxed">99.8% accurate forecasting for PV array outputs.</p>
              </div>

              <div className="glass-card bg-white/[0.03] p-6 rounded-xl border border-white/8 backdrop-blur-md">
                <span className="material-symbols-outlined text-[#cf5cff] mb-3 text-2xl">hub</span>
                <h4 className="text-sm font-bold text-[#cf5cff] mb-1 font-mono">Grid Sync</h4>
                <p className="text-xs text-[#b9cacb] leading-relaxed">Seamless integration with global solar infrastructure.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Right Side: Onboarding/Registration Card */}
        <section className="flex flex-col justify-center items-center py-4 w-full">
          <div 
            ref={cardRef}
            className="w-full max-w-md bg-white/[0.03] backdrop-blur-2xl rounded-2xl border border-white/8 p-8 lg:p-12 relative overflow-hidden transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] text-left"
          >
            {/* Decorative Top Accent Border */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#00dbe9] to-[#cf5cff]" />

            <div className="mb-10 text-center lg:text-left">
              <h3 className="text-2xl font-black text-[#00dbe9] tracking-tight mb-2">Company Registration</h3>
              <p className="text-xs sm:text-sm text-[#b9cacb]">Onboard your organization to the precision energy platform.</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              
              {/* Company Name */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#00dbe9] block font-mono" htmlFor="company_name">
                  Company Name
                </label>
                <div className="relative flex items-center border border-white/10 bg-black/20 rounded-lg hover:border-white/20 focus-within:border-[#00dbe9] focus-within:shadow-[0_0_12px_rgba(0,219,233,0.3)] transition-all duration-300">
                  <span className="absolute left-4 text-[#b9cacb] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">business</span>
                  </span>
                  <input
                    id="company_name"
                    type="text"
                    required
                    placeholder="e.g. Helios Solar Dynamics"
                    value={vendorName}
                    onChange={(e) => setVendorName(e.target.value)}
                    className="w-full bg-transparent border-none py-3.5 pl-12 pr-4 text-sm text-white placeholder-white/20 transition-all duration-300 outline-none focus:ring-0"
                  />
                </div>
              </div>

              {/* Business ID */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#00dbe9] block font-mono" htmlFor="reg_id">
                  Business Registration ID
                </label>
                <div className="relative flex items-center border border-white/10 bg-black/20 rounded-lg hover:border-white/20 focus-within:border-[#00dbe9] focus-within:shadow-[0_0_12px_rgba(0,219,233,0.3)] transition-all duration-300">
                  <span className="absolute left-4 text-[#b9cacb] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">fingerprint</span>
                  </span>
                  <input
                    id="reg_id"
                    type="text"
                    required
                    placeholder="Official Entity Identifier"
                    value={regId}
                    onChange={(e) => setRegId(e.target.value)}
                    className="w-full bg-transparent border-none py-3.5 pl-12 pr-4 text-sm text-white placeholder-white/20 transition-all duration-300 outline-none focus:ring-0"
                  />
                </div>
              </div>

              {/* Contact Person */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#00dbe9] block font-mono" htmlFor="contact_name">
                  Contact Person
                </label>
                <div className="relative flex items-center border border-white/10 bg-black/20 rounded-lg hover:border-white/20 focus-within:border-[#00dbe9] focus-within:shadow-[0_0_12px_rgba(0,219,233,0.3)] transition-all duration-300">
                  <span className="absolute left-4 text-[#b9cacb] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">person</span>
                  </span>
                  <input
                    id="contact_name"
                    type="text"
                    required
                    placeholder="Full legal name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-transparent border-none py-3.5 pl-12 pr-4 text-sm text-white placeholder-white/20 transition-all duration-300 outline-none focus:ring-0"
                  />
                </div>
              </div>

              {/* Corporate Email */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#00dbe9] block font-mono" htmlFor="email">
                  Corporate Email
                </label>
                <div className="relative flex items-center border border-white/10 bg-black/20 rounded-lg hover:border-white/20 focus-within:border-[#00dbe9] focus-within:shadow-[0_0_12px_rgba(0,219,233,0.3)] transition-all duration-300">
                  <span className="absolute left-4 text-[#b9cacb] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">alternate_email</span>
                  </span>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-none py-3.5 pl-12 pr-4 text-sm text-white placeholder-white/20 transition-all duration-300 outline-none focus:ring-0"
                  />
                </div>
              </div>

              {/* Corporate Password */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#00dbe9] block font-mono" htmlFor="password">
                  Corporate Password
                </label>
                <div className="relative flex items-center border border-white/10 bg-black/20 rounded-lg hover:border-white/20 focus-within:border-[#00dbe9] focus-within:shadow-[0_0_12px_rgba(0,219,233,0.3)] transition-all duration-300">
                  <span className="absolute left-4 text-[#b9cacb] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">lock</span>
                  </span>
                  <input
                    id="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-none py-3.5 pl-12 pr-4 text-sm text-white placeholder-white/20 transition-all duration-300 outline-none focus:ring-0"
                  />
                </div>
              </div>

              {/* Submit Action Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00dbe9] to-[#cf5cff] text-[#0a0b0d] font-bold text-sm tracking-wide hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all shadow-[0_0_20px_rgba(0,219,233,0.4)] hover:shadow-[0_0_30px_rgba(0,219,233,0.6)] cursor-pointer flex justify-center items-center gap-2 group border-none font-sans"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-[#0a0b0d]" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Syncing...
                  </>
                ) : isSuccess ? (
                  <>
                    <ShieldCheck className="w-5 h-5 text-[#0a0b0d]" />
                    Initialized
                  </>
                ) : (
                  <>
                    Initialize Onboarding
                    <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </>
                )}
              </button>

              <p className="text-center text-[10px] text-[#b9cacb]/60 pt-4 leading-relaxed">
                By registering, you agree to our <span className="underline cursor-pointer hover:text-[#00dbe9]">Terms of Service</span> and <span className="underline cursor-pointer hover:text-[#00dbe9]">Security Protocols</span>.
              </p>
            </form>
          </div>

          {/* Mobile visible marketing card context */}
          <div className="lg:hidden mt-12 text-center w-full max-w-sm px-4">
            <div 
              className="w-full h-44 rounded-xl bg-cover bg-center mb-6 opacity-65 border border-white/5 shadow-md"
              style={{ 
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC77C5LSrTXbTXnCmFY7H17WEhJab3gyEzDUTk2q9aYEiLUW1gzH8a9hS-2IkYVmdGgc2qOFxcUOLGvJUAfxDSQ8rJJMRTLpl3ryKi6Pd4NKREzQX3FnIEEVXnHZrblF_ki2OAyHCRMZa7Gd5kTSwf7AWp8dMoPZRJM7vVx6MqdocD5F1bl_E_M9enYAwps9lER8abXmsVvZDzF6Nt0oStgtmTo4phOgOoI9NDIN29gniN7LQxNrfbe1Q')`
              }}
            />
            <p className="text-xs uppercase tracking-widest text-[#00dbe9] font-bold mb-2">
              Trusted by 200+ Enterprises
            </p>
          </div>
        </section>
      </main>

      {/* Transactional Footer */}
      <footer className="w-full py-6 px-6 lg:px-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#b9cacb]/60 z-10 relative">
        <div>© 2024 NovaAI. Precision Energy Intelligence.</div>
        <div className="flex gap-6">
          <span className="hover:text-[#00dbe9] cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-[#00dbe9] cursor-pointer transition-colors">Support</span>
          <span className="hover:text-[#00dbe9] cursor-pointer transition-colors">API Docs</span>
        </div>
      </footer>
    </div>
  );
}
