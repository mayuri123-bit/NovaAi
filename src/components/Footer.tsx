import React, { useState } from 'react';

interface FooterProps {
  onChangeView: (view: 'home' | 'features' | 'how-it-works') => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function Footer({ onChangeView, onScrollToSection }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().includes("@")) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setSubscribed(false);
      }, 4000);
    }
  };

  const handleFooterNav = (view: 'home' | 'features' | 'how-it-works', sectionId?: string) => {
    onChangeView(view);
    if (sectionId) {
      setTimeout(() => {
        onScrollToSection(sectionId);
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="pt-24 pb-12 px-6 border-t border-white/5 bg-brand-dark">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Info */}
          <div className="space-y-6">
            <button 
              onClick={() => handleFooterNav('home')} 
              className="text-2xl font-bold tracking-tight text-white flex items-center gap-1 cursor-pointer bg-transparent border-none p-0"
            >
              Nova<span className="text-brand-cyan">AI</span>
            </button>
            <p className="text-sm text-brand-gray leading-relaxed">
              Precision Energy Intelligence for a sustainable horizon.
            </p>
          </div>

          {/* Column 2: Product */}
          <div>
            <h4 className="font-bold mb-6 text-sm text-white">Product</h4>
            <ul className="space-y-4 text-sm text-brand-gray">
              <li>
                <button onClick={() => handleFooterNav('home')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Platform
                </button>
              </li>
              <li>
                <button onClick={() => handleFooterNav('features')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Features Overview
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="font-bold mb-6 text-sm text-white">Resources</h4>
            <ul className="space-y-4 text-sm text-brand-gray">
              <li>
                <button onClick={() => handleFooterNav('home', 'pricing')} className="hover:text-white transition-colors cursor-pointer text-left">
                  API Docs &amp; Pricing
                </button>
              </li>
              <li>
                <button onClick={() => handleFooterNav('how-it-works')} className="hover:text-white transition-colors cursor-pointer text-left">
                  How It Works
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors block">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-6">
            <h4 className="font-bold text-sm text-white">Newsletter</h4>
            
            {subscribed ? (
              <div className="p-3 bg-brand-cyan/10 border border-brand-cyan/20 rounded-lg text-brand-cyan text-xs font-semibold animate-pulse">
                ✓ Subscribed! Thank you for joining NovaAI.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative">
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm text-white placeholder-brand-gray focus:outline-none focus:ring-1 focus:ring-brand-cyan focus:border-brand-cyan transition-all"
                />
                <button 
                  type="submit" 
                  aria-label="Subscribe"
                  className="absolute right-2 top-2 bg-brand-cyan text-brand-black p-1.5 rounded-md hover:brightness-110 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom copyright & socials */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-brand-gray uppercase tracking-widest">
          <p>© 2024 NOVAAI. PRECISION ENERGY INTELLIGENCE.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Dribbble</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
