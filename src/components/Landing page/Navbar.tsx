import React, { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface NavbarProps {
  currentView: 'home' | 'features' | 'how-it-works';
  onChangeView: (view: 'home' | 'features' | 'how-it-works') => void;
  onScrollToSection: (sectionId: string) => void;
  onOpenDemo: () => void;
}

export default function Navbar({ currentView, onChangeView, onScrollToSection, onOpenDemo }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: 'home' | 'features' | 'how-it-works', sectionId?: string) => {
    onChangeView(view);
    setMobileMenuOpen(false);
    if (sectionId) {
      setTimeout(() => {
        onScrollToSection(sectionId);
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-12">
          <button 
            onClick={() => handleNavClick('home')} 
            className="text-2xl font-bold tracking-tight text-white flex items-center gap-1 cursor-pointer bg-transparent border-none p-0"
          >
            Nova<span className="text-brand-cyan">AI</span>
          </button>
          <div className="hidden md:flex space-x-8 text-sm font-medium text-brand-gray">
            <button 
              onClick={() => handleNavClick('home')} 
              className={`transition-colors cursor-pointer text-left ${currentView === 'home' ? 'text-brand-cyan font-bold' : 'hover:text-white'}`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('features')} 
              className={`transition-colors cursor-pointer text-left ${currentView === 'features' ? 'text-brand-cyan font-bold' : 'hover:text-white'}`}
            >
              Features
            </button>
            <button 
              onClick={() => handleNavClick('how-it-works')} 
              className={`transition-colors cursor-pointer text-left ${currentView === 'how-it-works' ? 'text-brand-cyan font-bold' : 'hover:text-white'}`}
            >
              How It Works
            </button>
            <button 
              onClick={() => handleNavClick('home', 'pricing')} 
              className="hover:text-white transition-colors cursor-pointer text-left"
            >
              Pricing
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <button 
            onClick={onOpenDemo}
            className="bg-brand-cyan text-brand-black px-5 py-2.5 rounded-full text-sm font-bold hover:brightness-110 hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(0,242,255,0.3)] flex items-center gap-1.5 cursor-pointer border-none"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white hover:text-brand-cyan transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-20 left-0 w-full bg-brand-black/95 backdrop-blur-xl border-b border-white/10 px-6 py-8 flex flex-col space-y-6"
        >
          <button 
            onClick={() => handleNavClick('home')} 
            className="text-lg font-medium text-brand-gray hover:text-white transition-colors text-left"
          >
            Home
          </button>
          <button 
            onClick={() => handleNavClick('features')} 
            className="text-lg font-medium text-brand-gray hover:text-white transition-colors text-left"
          >
            Features
          </button>
          <button 
            onClick={() => handleNavClick('how-it-works')} 
            className="text-lg font-medium text-brand-gray hover:text-white transition-colors text-left"
          >
            How It Works
          </button>
          <button 
            onClick={() => handleNavClick('home', 'pricing')} 
            className="text-lg font-medium text-brand-gray hover:text-white transition-colors text-left"
          >
            Pricing
          </button>
        </motion.div>
      )}
    </nav>
  );
}
