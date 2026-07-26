import React, { useState, useEffect, useRef } from 'react';
import { X, User, Mail, Lock, Eye, EyeOff, MapPin, ShieldCheck, Shield, Zap, Sparkles, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CustomerRegistrationProps {
  onClose: () => void;
  onSuccess: (formData: any) => void;
  onSwitchToLogin: () => void;
  onBackToPaths: () => void;
}

export default function CustomerRegistration({
  onClose,
  onSuccess,
  onSwitchToLogin,
  onBackToPaths,
}: CustomerRegistrationProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const location = city && stateName ? `${city}, ${stateName}` : (city || stateName);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLocationFocused, setIsLocationFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse move handler for map coordinates preview
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({
      x: e.clientX + 15,
      y: e.clientY - 160
    });
  };

  const getPasswordStrength = () => {
    if (!password) return 0;
    let strength = 1;
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) strength++;
    return strength; // returns 1, 2, 3, or 4
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) return;
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Save customer to localStorage for dynamic persistent login
      const registeredUsers = JSON.parse(localStorage.getItem('nova_registered_users') || '[]');
      const filteredUsers = registeredUsers.filter((u: any) => u.email.toLowerCase() !== email.toLowerCase());
      filteredUsers.push({
        fullName,
        email,
        password,
        location,
        role: 'customer'
      });
      localStorage.setItem('nova_registered_users', JSON.stringify(filteredUsers));

      setTimeout(() => {
        onSuccess({ fullName, email, location });
      }, 1500);
    }, 2000);
  };

  const strength = getPasswordStrength();

  return (
    <div 
      className="fixed inset-0 z-[110] bg-[#10131a] text-[#e1e2eb] overflow-y-auto font-sans antialiased selection:bg-[#00f0ff]/30 selection:text-white flex flex-col lg:flex-row"
      onMouseMove={handleMouseMove}
    >
      {/* Absolute Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-[120] text-[#b9cacb] hover:text-[#00f0ff] p-2 rounded-full bg-white/5 border border-white/5 hover:border-[#00f0ff]/20 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.5)]"
        title="Exit Registration"
      >
        <X className="w-5 h-5" />
      </button>

      {/* LEFT SIDE: Brand Visual & Narrative (Hidden on Mobile, flex on Desktop) */}
      <section className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center bg-[#0b0e14] border-r border-white/5">
        {/* Glowing background circles */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#00f0ff]/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#cf5cff]/5 blur-[100px] pointer-events-none" />
        
        {/* Blueprint Grid Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay" 
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative z-10 px-16 py-12 max-w-xl">
          {/* Logo Brand Title */}
          <div className="flex items-center gap-4 mb-10 animate-pulse">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00dbe9] to-[#cf5cff] p-[2px] shadow-[0_0_20px_rgba(0,240,255,0.3)]">
              <div className="w-full h-full bg-[#0b0e14] rounded-[10px] flex items-center justify-center">
                <Zap className="w-7 h-7 text-[#00f0ff]" />
              </div>
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-[#00f0ff] uppercase drop-shadow-[0_0_10px_rgba(0,240,255,0.2)]">
              Nova<span className="text-[#dbfcff]">AI</span>
            </h1>
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight mb-6 leading-tight text-white">
            Precision Energy Intelligence starts here.
          </h2>
          <p className="text-lg text-[#b9cacb] mb-12 leading-relaxed">
            Join the global network of engineers and decision-makers optimizing the next generation of solar infrastructure with predictive artificial intelligence.
          </p>

          {/* Stat Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-[#1d2026]/40 backdrop-blur-md border border-white/8 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-6 rounded-2xl relative overflow-hidden group hover:border-[#00f0ff]/30 transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <span className="text-[10px] tracking-wider text-[#00f0ff] uppercase block mb-2 font-mono">Efficiency Boost</span>
              <span className="text-3xl font-extrabold text-white group-hover:text-[#00f0ff] transition-colors">+32%</span>
            </div>
            <div className="bg-[#1d2026]/40 backdrop-blur-md border border-white/8 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-6 rounded-2xl relative overflow-hidden group hover:border-[#cf5cff]/30 transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <span className="text-[10px] tracking-wider text-[#00f0ff] uppercase block mb-2 font-mono">Network Nodes</span>
              <span className="text-3xl font-extrabold text-white group-hover:text-[#cf5cff] transition-colors">1.2M+</span>
            </div>
          </div>
        </div>

        {/* Absolute decorative protocol text */}
        <div className="absolute bottom-10 left-16 text-[#b9cacb]/30 font-mono text-xs tracking-[0.2em] select-none">
          LUMINA ORBITAL PROTOCOL V4.0
        </div>
      </section>

      {/* RIGHT SIDE: Interactive Registration Form */}
      <section className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 md:p-16 bg-[#10131a] relative">
        {/* Glow point */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#00f0ff]/5 rounded-full filter blur-3xl pointer-events-none" />

        {/* Back navigation option */}
        <button
          onClick={onBackToPaths}
          className="absolute top-6 left-6 flex items-center gap-1.5 text-xs text-[#b9cacb] hover:text-white font-semibold transition-colors bg-white/5 px-3 py-1.5 rounded-full border border-white/5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Choose Path
        </button>

        {/* Mobile Logo Only */}
        <div className="lg:hidden absolute top-6 right-20 flex items-center gap-2">
          <Zap className="w-5 h-5 text-[#00f0ff]" />
          <span className="text-lg font-black text-[#00f0ff] uppercase">NovaAI</span>
        </div>

        <div className="w-full max-w-md my-auto pt-8">
          <div className="mb-10">
            <h2 className="text-3xl font-extrabold text-white tracking-tight mb-2">Create Account</h2>
            <p className="text-sm text-[#b9cacb]">Step into the future of solar energy management.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Full Name Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#b9cacb] block" htmlFor="full_name">Full Name</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b9cacb] flex items-center justify-center">
                  <User className="w-[18px] h-[18px]" />
                </span>
                <input
                  id="full_name"
                  type="text"
                  required
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#0a0b0d]/80 border border-[#849495]/30 focus:border-[#00f0ff] focus:shadow-[0_0_12px_rgba(0,240,255,0.25)] rounded-xl py-3.5 pl-12 pr-4 text-sm text-white placeholder-[#849495]/40 transition-all duration-300 outline-none"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#b9cacb] block" htmlFor="email">Email Address</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b9cacb] flex items-center justify-center">
                  <Mail className="w-[18px] h-[18px]" />
                </span>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0a0b0d]/80 border border-[#849495]/30 focus:border-[#00f0ff] focus:shadow-[0_0_12px_rgba(0,240,255,0.25)] rounded-xl py-3.5 pl-12 pr-4 text-sm text-white placeholder-[#849495]/40 transition-all duration-300 outline-none"
                />
              </div>
            </div>

            {/* Password Input & Dynamic Strength Meter */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#b9cacb] block" htmlFor="password">Security Key</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b9cacb] flex items-center justify-center">
                  <Lock className="w-[18px] h-[18px]" />
                </span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0a0b0d]/80 border border-[#849495]/30 focus:border-[#00f0ff] focus:shadow-[0_0_12px_rgba(0,240,255,0.25)] rounded-xl py-3.5 pl-12 pr-12 text-sm text-white placeholder-[#849495]/40 transition-all duration-300 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#b9cacb] hover:text-[#00f0ff] transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                </button>
              </div>

              {/* Security strength visual bars */}
              <div className="flex gap-1.5 mt-2.5">
                <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${strength >= 1 ? 'bg-[#00f0ff] opacity-100 shadow-[0_0_8px_#00f0ff]' : 'bg-white/10'}`} />
                <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${strength >= 2 ? 'bg-[#00dbe9] opacity-100 shadow-[0_0_8px_#00dbe9]' : 'bg-white/10'}`} />
                <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${strength >= 3 ? 'bg-[#cf5cff] opacity-100 shadow-[0_0_8px_#cf5cff]' : 'bg-white/10'}`} />
                <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${strength >= 4 ? 'bg-[#faf3ff] opacity-100 shadow-[0_0_8px_#faf3ff]' : 'bg-white/10'}`} />
              </div>
            </div>

            {/* Location: City and State (Separated, no Country option) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#b9cacb] block" htmlFor="city">City</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b9cacb] flex items-center justify-center">
                    <MapPin className="w-[18px] h-[18px]" />
                  </span>
                  <input
                    id="city"
                    type="text"
                    required
                    placeholder="e.g. San Francisco"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onFocus={() => setIsLocationFocused(true)}
                    onBlur={() => setIsLocationFocused(false)}
                    className="w-full bg-[#0a0b0d]/80 border border-[#849495]/30 focus:border-[#00f0ff] focus:shadow-[0_0_12px_rgba(0,240,255,0.25)] rounded-xl py-3.5 pl-12 pr-4 text-sm text-white placeholder-[#849495]/40 transition-all duration-300 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#b9cacb] block" htmlFor="stateName">State</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b9cacb] flex items-center justify-center">
                    <MapPin className="w-[18px] h-[18px]" />
                  </span>
                  <input
                    id="stateName"
                    type="text"
                    required
                    placeholder="e.g. CA"
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    onFocus={() => setIsLocationFocused(true)}
                    onBlur={() => setIsLocationFocused(false)}
                    className="w-full bg-[#0a0b0d]/80 border border-[#849495]/30 focus:border-[#00f0ff] focus:shadow-[0_0_12px_rgba(0,240,255,0.25)] rounded-xl py-3.5 pl-12 pr-4 text-sm text-white placeholder-[#849495]/40 transition-all duration-300 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Terms and Privacy Policy */}
            <div className="flex items-start gap-3 py-1">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="w-4 h-4 rounded bg-[#0a0b0d] border-[#849495]/40 text-[#00f0ff] focus:ring-[#00f0ff] focus:ring-offset-[#10131a] transition-all cursor-pointer"
                />
              </div>
              <label htmlFor="terms" className="text-xs text-[#b9cacb] leading-relaxed cursor-pointer select-none">
                I agree to the <span className="text-[#00f0ff] hover:underline">Service Terms</span> and <span className="text-[#00f0ff] hover:underline">Data Intelligence Privacy Policy</span>.
              </label>
            </div>

            {/* Action button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-[#00dbe9] to-[#cf5cff] text-[#0a0b0d] font-bold text-sm tracking-wide hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] cursor-pointer flex items-center justify-center gap-2 border-none font-sans"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-[#0a0b0d]" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Syncing Array...
                </>
              ) : isSuccess ? (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  Initialized
                </>
              ) : (
                'Register Account'
              )}
            </button>
          </form>

          {/* Alternative Switcher */}
          <div className="mt-8 text-center text-sm text-[#b9cacb] flex items-center justify-center gap-2">
            <span>Already part of the network?</span>
            <button
              onClick={onSwitchToLogin}
              className="text-[#00f0ff] font-bold hover:underline cursor-pointer bg-transparent border-none outline-none"
            >
              Log In
            </button>
            <span>•</span>
            <button
              onClick={onSwitchToLogin}
              className="text-[#00f0ff] font-bold hover:underline cursor-pointer bg-transparent border-none outline-none"
            >
              Forgot Password?
            </button>
          </div>

          {/* Decorative Footer */}
          <div className="mt-14 pt-6 border-t border-white/5 flex items-center justify-between opacity-50 text-xs text-[#b9cacb]">
            <div className="flex gap-4">
              <ShieldCheck className="w-4 h-4 hover:text-[#00f0ff] transition-colors" />
              <Shield className="w-4 h-4 hover:text-[#00f0ff] transition-colors" />
              <Zap className="w-4 h-4 hover:text-[#00f0ff] transition-colors" />
            </div>
            <span className="font-mono text-[10px] tracking-wider uppercase">ENCRYPTED END-TO-END</span>
          </div>
        </div>
      </section>

      {/* Floating Map Satellite Preview (Only visible on focus) */}
      <AnimatePresence>
        {isLocationFocused && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              left: mousePos.x,
              top: mousePos.y,
            }}
            className="z-[150] hidden sm:block pointer-events-none bg-[#1d2026]/90 backdrop-blur-md p-4 rounded-2xl w-64 border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
          >
            <div className="relative w-full h-32 rounded-xl overflow-hidden mb-3 bg-white/5">
              <img
                alt="Orbital Satellite View Grid"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuALNY112M2qzisJQjvwINsLl0vdPc48yzIYJIX5eRW-ZGZBzP7frvdKns1DMxWlTdr1o6jEPe-2EiYo8afT5VxxiBbc9EFuI6NapPwK9Xpr8g1WtkDmOrlDyglHJD1k51uFsnxny6FpbNPfMJtyLn81FBB3B9H7APXED5RRg1J3Lw0Cjcn6oy7egqjm-mxmAxp0lyT82uzcPsm7e6EcSSObZE2-UTE7eg83sWEl01_3_2kgF7vXtE2Eig"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1d2026] via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 flex items-center gap-1.5 text-[9px] font-mono text-[#00f0ff] bg-[#0a0b0d]/80 px-2 py-0.5 rounded-full border border-[#00f0ff]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
                ORBITAL_SYNC
              </div>
            </div>
            <div className="text-xs font-mono text-[#00f0ff] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>{location ? `Mapped: ${location}` : 'Scanning Geometry...'}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
