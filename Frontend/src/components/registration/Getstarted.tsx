import React, { useState, useEffect } from 'react';
import { X, Check, ArrowRight, ShieldCheck, Sparkles, Building2, User, KeyRound, ArrowLeft, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import CustomerRegistration from './CustomerRegistration';
import VendorRegistration from './VendorRegistration';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: string; // "Login" | "Signup" | "FreeTrial" | "ContactSales"
  onCustomerSuccess?: (data: { fullName: string; email: string; location: string; role?: 'customer' | 'vendor' }) => void;
}

export default function DemoModal({ isOpen, onClose, initialMode = "FreeTrial", onCustomerSuccess }: DemoModalProps) {
  const [mode, setMode] = useState(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loginRole, setLoginRole] = useState<'customer' | 'vendor'>('customer');
  const [error, setError] = useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = useState(false);

  useEffect(() => {
    setError(null);
    setResetSuccess(false);
  }, [mode, loginRole]);

  useEffect(() => {
    if (initialMode === "Signup") {
      setMode("ChooseAccountType");
    } else {
      setMode(initialMode);
    }
    setFormSubmitted(false);
    setError(null);
    // Reset form fields
    setName("");
    setEmail("");
    setPassword("");
    setCompany("");
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  if (mode === "ChooseAccountType") {
    return (
      <div className="fixed inset-0 z-[100] bg-[#0d0f14] overflow-y-auto font-sans antialiased selection:bg-brand-cyan/30 selection:text-white">
        {/* Ambient Grid overlay and glowing background highlights */}
        <div 
          className="absolute inset-0 pointer-events-none z-0 opacity-40 mix-blend-overlay" 
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        {/* Soft background glow spots */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-cyan/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-blue/5 blur-[120px] pointer-events-none" />

        <div className="relative z-10 min-h-screen flex flex-col max-w-7xl mx-auto px-6 py-8">
          {/* Header Bar */}
          <header className="flex items-center justify-between h-16 w-full mb-12 sm:mb-16">
            {/* Left Side: Brand Logo and Back Option */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div 
                onClick={onClose}
                className="flex items-center gap-2.5 cursor-pointer group select-none animate-fade-in"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-cyan flex items-center justify-center shadow-[0_0_15px_rgba(0,242,255,0.4)] group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-5 h-5 text-brand-black" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-xl font-bold tracking-tight text-white">Nova<span className="text-brand-cyan">AI</span></span>
              </div>

              <div className="w-[1px] h-4 bg-white/15" />

              <button
                onClick={onClose}
                className="flex items-center gap-1.5 text-xs font-semibold text-brand-gray hover:text-white transition-colors bg-transparent border-none cursor-pointer focus:outline-none"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Landing</span>
              </button>
            </div>

            {/* Log In Link */}
            <button
              onClick={() => setMode("Login")}
              className="text-xs tracking-widest font-bold text-brand-gray hover:text-white transition-colors bg-transparent border-none cursor-pointer focus:outline-none uppercase"
            >
              LOG IN
            </button>
          </header>

          {/* Main Body */}
          <div className="flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto w-full">
            {/* Centered Heading and Description */}
            <div className="text-center max-w-2xl mx-auto space-y-4 mb-12 sm:mb-14">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white">
                Choose Your Path
              </h1>
              <p className="text-brand-gray text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mx-auto">
                Select the account type that best describes your needs. Whether you're harnessing solar for your home or scaling a renewable enterprise, NovaAI has the tools for you.
              </p>
            </div>

            {/* Twin Grid Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full pb-12">
              
              {/* Card 1: Customer */}
              <div 
                onClick={() => {
                  setMode("CustomerSignup");
                }}
                className="group relative rounded-3xl border border-white/5 bg-[#0f111a]/90 p-6 sm:p-8 hover:border-brand-cyan/30 hover:shadow-[0_0_45px_rgba(0,242,255,0.08)] transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Image Frame */}
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 border border-white/5 bg-brand-black/40">
                    <img 
                      src={new URL('../../../assets/images/customerImg.png', import.meta.url).href} 
                      alt="Customer Holographic System" 
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-bold text-center text-white mb-5 select-none relative transition-all group-hover:text-brand-cyan">
                    Customer
                    <span className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-8 h-[2px] bg-brand-cyan opacity-0 group-hover:opacity-100 transition-opacity blur-[1px]" />
                  </h3>
                </div>

                {/* Bullets List */}
                <div className="space-y-3.5 max-w-xs mx-auto w-full pt-2">
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-brand-gray">
                    <div className="w-5 h-5 rounded-full bg-brand-cyan/10 flex items-center justify-center text-brand-cyan shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>Precision AI Solar Calculator</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-brand-gray">
                    <div className="w-5 h-5 rounded-full bg-brand-cyan/10 flex items-center justify-center text-brand-cyan shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>Verified Vendor Network</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-brand-gray">
                    <div className="w-5 h-5 rounded-full bg-brand-cyan/10 flex items-center justify-center text-brand-cyan shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>Subsidy & Grant Tracking</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Solar Vendor */}
              <div 
                onClick={() => setMode("SolarCompanySignup")}
                className="group relative rounded-3xl border border-white/5 bg-[#0f111a]/90 p-6 sm:p-8 hover:border-white/15 hover:shadow-[0_0_45px_rgba(255,255,255,0.03)] transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Image Frame */}
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 border border-white/5 bg-brand-black/40">
                    <img 
                      src={new URL('../../../assets/images/companyImg.png', import.meta.url).href} 
                      alt="Solar Vendor Enterprise Hub" 
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-bold text-center text-white mb-5 select-none transition-all">
                    Solar Vendor
                  </h3>
                </div>

                {/* Bullets List */}
                <div className="space-y-3.5 max-w-xs mx-auto w-full pt-2">
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-brand-gray">
                    <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-gray shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>Business Growth Engine</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-brand-gray">
                    <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-gray shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>AI Quote Generation</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-brand-gray">
                    <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-gray shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>Crm Lead Management</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }

  if (mode === "CustomerSignup") {
    return (
      <CustomerRegistration
        onClose={onClose}
        onSuccess={(data) => {
          console.log("Customer setup successfully:", data);
          if (onCustomerSuccess) {
            onCustomerSuccess({
              fullName: data.fullName || "Alex Johnson",
              email: data.email || "alex@example.com",
              location: data.location || "San Francisco, CA",
              role: 'customer'
            });
          }
          onClose();
        }}
        onSwitchToLogin={() => {
          setLoginRole('customer');
          setMode("Login");
        }}
        onBackToPaths={() => setMode("ChooseAccountType")}
      />
    );
  }

  if (mode === "SolarCompanySignup") {
    return (
      <VendorRegistration
        onClose={onClose}
        onSuccess={(data) => {
          console.log("Vendor setup successfully:", data);
          if (onCustomerSuccess) {
            onCustomerSuccess({
              fullName: data.contactName || data.vendorName || "Helios Solar Dynamics",
              email: data.email || "vendor@example.com",
              location: "Mumbai, MH",
              role: 'vendor'
            });
          }
          onClose();
        }}
        onSwitchToLogin={() => {
          setLoginRole('vendor');
          setMode("Login");
        }}
        onBackToPaths={() => setMode("ChooseAccountType")}
      />
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === "ForgotPassword") {
      if (!email) {
        setError("Please enter your registered email address.");
        return;
      }
      const registeredUsers = JSON.parse(localStorage.getItem('nova_registered_users') || '[]');
      const userIndex = registeredUsers.findIndex(
        (u: any) => u.email.toLowerCase() === email.toLowerCase() && u.role === loginRole
      );

      if (userIndex !== -1) {
        if (password) {
          registeredUsers[userIndex].password = password;
          localStorage.setItem('nova_registered_users', JSON.stringify(registeredUsers));
        }
      } else {
        // Register user with new reset password
        registeredUsers.push({
          fullName: loginRole === 'vendor' ? 'Helios Solar Dynamics' : 'Customer User',
          email,
          password: password || 'password123',
          location: loginRole === 'vendor' ? 'Mumbai, MH' : 'Delhi, IN',
          role: loginRole
        });
        localStorage.setItem('nova_registered_users', JSON.stringify(registeredUsers));
      }

      setResetSuccess(true);
      return;
    }

    if (mode === "Login") {
      const registeredUsers = JSON.parse(localStorage.getItem('nova_registered_users') || '[]');
      const foundUser = registeredUsers.find(
        (u: any) => u.email.toLowerCase() === email.toLowerCase() && u.role === loginRole
      );

      if (foundUser) {
        if (foundUser.password && foundUser.password !== password) {
          setError("Incorrect password. Please verify your credentials.");
          return;
        }
        // Match registration details
        setName(foundUser.fullName || foundUser.companyName || "");
        setEmail(foundUser.email);
        setCompany(foundUser.companyName || "");
      } else {
        // Fallback demo credentials
        setName(loginRole === 'vendor' ? "Helios Solar Dynamics" : "Alex Johnson");
      }
    }

    setFormSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Dark overlay backdrop */}
      <div className="absolute inset-0 bg-brand-black/80 backdrop-blur-md" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg glass-card p-8 sm:p-10 rounded-3xl border-brand-cyan/25 shadow-[0_0_50px_rgba(0,242,255,0.15)] bg-[#0d0f14] z-10 overflow-hidden transition-all duration-300">
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
                {mode === "ContactSales" && "We have received your utility scale deployment query. A specialist will reach out within 4 hours."}
                {mode === "CustomerSignup" && "Welcome to NovaAI! Your customer dashboard is configured and ready for live home solar tracking."}
                {mode === "SolarCompanySignup" && "Welcome to NovaAI! Your company profile has been configured. Start managing multi-megawatt assets now."}
                {mode === "FreeTrial" && "Welcome to NovaAI! Your sandbox environment is configured and ready for live solar mapping."}
                {mode === "Login" && "Welcome back to NovaAI! Opening your power monitoring console..."}
              </p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-xs text-brand-cyan font-mono flex items-center justify-between">
              <span>PRO_SYSTEM_STATUS</span>
              <span>ONLINE / 100% SECURE</span>
            </div>
            <button 
              onClick={() => {
                if (onCustomerSuccess) {
                  onCustomerSuccess({
                    fullName: name || (loginRole === 'vendor' ? "Helios Solar Dynamics" : "Alex Johnson"),
                    email: email || (loginRole === 'vendor' ? "vendor@example.com" : "alex@example.com"),
                    location: loginRole === 'vendor' ? "Mumbai, MH" : "San Francisco, CA",
                    role: loginRole
                  });
                }
                onClose();
              }}
              className="w-full py-3.5 bg-brand-cyan text-brand-black font-bold rounded-xl hover:brightness-110 active:scale-95 transition-all cursor-pointer border-none"
            >
              Access Dashboard
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Back button to account type selector */}
            {(mode === "CustomerSignup" || mode === "SolarCompanySignup") && (
              <button
                type="button"
                onClick={() => setMode("ChooseAccountType")}
                className="group inline-flex items-center gap-2 text-xs text-brand-gray hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                Back to Account Type
              </button>
            )}

            <div className="space-y-1 text-left">
              <span className="text-[10px] uppercase tracking-widest font-mono text-brand-cyan flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Security Gateway
              </span>
              <h3 className="text-2xl font-bold text-white">
                {mode === "Login" && "Login to NovaAI"}
                {mode === "ForgotPassword" && "Reset Password"}
                {mode === "CustomerSignup" && "Customer Registration"}
                {mode === "SolarCompanySignup" && "Solar Company Registration"}
                {mode === "FreeTrial" && "Start Pro 14-Day Free Trial"}
                {mode === "ContactSales" && "Contact Sales"}
              </h3>
              <p className="text-brand-gray text-xs">
                {mode === "CustomerSignup" && "Join as a private grid client to monitor dynamic solar output."}
                {mode === "SolarCompanySignup" && "Register your enterprise portfolio and developer APIs."}
                {mode === "ContactSales" && "Reach our grid-infrastructure specialists to customize API configurations."}
                {mode === "Login" && "Configure your solar portfolio and deploy deep AI mapping models."}
                {mode === "ForgotPassword" && "Enter your registered email address and set a new password."}
                {mode === "FreeTrial" && "Configure your solar portfolio and deploy deep AI mapping models."}
              </p>
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold p-3.5 rounded-xl animate-pulse mt-3 text-left">
                  {error}
                </div>
              )}
            </div>

            {resetSuccess ? (
              <div className="text-center py-6 space-y-5">
                <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                  <ShieldCheck className="w-7 h-7 text-emerald-400" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-xl font-bold text-white">Password Updated Successfully!</h4>
                  <p className="text-brand-gray text-xs max-w-sm mx-auto leading-relaxed">
                    Your password for <span className="text-brand-cyan font-mono">{email}</span> has been updated. You can now log in using your new credentials.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setResetSuccess(false);
                    setMode("Login");
                  }}
                  className="w-full py-3.5 bg-brand-cyan text-brand-black font-bold rounded-xl hover:brightness-110 active:scale-95 transition-all cursor-pointer border-none"
                >
                  Proceed to Login
                </button>
              </div>
            ) : (
              <>
                {(mode === "Login" || mode === "ForgotPassword") && (
                  <div className="flex bg-black/40 border border-white/10 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setLoginRole('customer')}
                      className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all border-none cursor-pointer ${
                        loginRole === 'customer'
                          ? 'bg-brand-cyan text-brand-black shadow-md'
                          : 'text-brand-gray hover:text-white bg-transparent'
                      }`}
                    >
                      Customer {mode === "ForgotPassword" ? "Account" : "Login"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setLoginRole('vendor')}
                      className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all border-none cursor-pointer ${
                        loginRole === 'vendor'
                          ? 'bg-brand-cyan text-brand-black shadow-md'
                          : 'text-brand-gray hover:text-white bg-transparent'
                      }`}
                    >
                      Vendor {mode === "ForgotPassword" ? "Account" : "Login"}
                    </button>
                  </div>
                )}

                {/* Modal Input Fields */}
                <div className="space-y-4">
                  {(mode === "CustomerSignup" || mode === "SolarCompanySignup" || mode === "FreeTrial" || mode === "ContactSales") && (
                    <div className="relative">
                      <User className="absolute left-4 top-3.5 w-5 h-5 text-brand-gray" />
                      <input 
                        type="text" 
                        placeholder={mode === "SolarCompanySignup" ? "Representative Name" : "Full Name"} 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full bg-brand-black/60 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white placeholder-brand-gray focus:outline-none focus:ring-1 focus:ring-brand-cyan focus:border-brand-cyan transition-all"
                      />
                    </div>
                  )}

                  {mode === "SolarCompanySignup" && (
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

                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 w-5 h-5 text-brand-gray" />
                    <input 
                      type="email" 
                      placeholder={mode === "SolarCompanySignup" ? "Company Email Address" : "Email Address"} 
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
                    <div className="space-y-1.5">
                      <div className="relative">
                        <KeyRound className="absolute left-4 top-3.5 w-5 h-5 text-brand-gray" />
                        <input 
                          type="password" 
                          placeholder={
                            mode === "ForgotPassword"
                              ? "Enter New Password"
                              : mode === "SolarCompanySignup" 
                              ? "Corporate Password" 
                              : "Security Code (Password)"
                          } 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="w-full bg-brand-black/60 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white placeholder-brand-gray focus:outline-none focus:ring-1 focus:ring-brand-cyan focus:border-brand-cyan transition-all"
                        />
                      </div>

                      {mode === "Login" && (
                        <div className="flex justify-end pt-1">
                          <button
                            type="button"
                            onClick={() => {
                              setError(null);
                              setResetSuccess(false);
                              setMode("ForgotPassword");
                            }}
                            className="text-xs text-brand-cyan hover:underline bg-transparent border-none cursor-pointer p-0 font-medium"
                          >
                            Forgot password?
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* CTA button */}
                <button 
                  type="submit" 
                  className="w-full py-4 bg-brand-cyan text-brand-black font-black rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-[0_4px_20px_rgba(0,242,255,0.2)] flex items-center justify-center gap-2 cursor-pointer border-none"
                >
                  {mode === "Login" && "Login to Dashboard"}
                  {mode === "ForgotPassword" && "Reset & Update Password"}
                  {mode === "CustomerSignup" && "Complete Customer Signup"}
                  {mode === "SolarCompanySignup" && "Complete Enterprise Signup"}
                  {mode === "FreeTrial" && "Start 14-Day Free Trial"}
                  {mode === "ContactSales" && "Submit Sales Inquiry"}
                  <ArrowRight className="w-5 h-5" />
                </button>

                {/* Bottom Swappers */}
                <div className="pt-4 border-t border-white/5 text-center">
                  {mode === "Login" ? (
                    <p className="text-xs text-brand-gray flex items-center justify-center gap-2">
                      <span>Don't have an account?</span>
                      <button type="button" onClick={() => setMode("ChooseAccountType")} className="text-brand-cyan font-bold hover:underline cursor-pointer bg-transparent border-none">
                        Sign up free
                      </button>
                    </p>
                  ) : mode === "ForgotPassword" ? (
                    <p className="text-xs text-brand-gray flex items-center justify-center gap-2">
                      <span>Remembered password?</span>
                      <button type="button" onClick={() => setMode("Login")} className="text-brand-cyan font-bold hover:underline cursor-pointer bg-transparent border-none">
                        Back to Login
                      </button>
                    </p>
                  ) : mode === "CustomerSignup" || mode === "SolarCompanySignup" || mode === "FreeTrial" ? (
                    <p className="text-xs text-brand-gray flex items-center justify-center gap-2">
                      <span>Already have an account?</span>
                      <button type="button" onClick={() => setMode("Login")} className="text-brand-cyan font-bold hover:underline cursor-pointer bg-transparent border-none">
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
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
