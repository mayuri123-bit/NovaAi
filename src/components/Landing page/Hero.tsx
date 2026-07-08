import React from 'react';
import { ArrowRight, Sparkles, ChevronRight, Zap, Shield, TrendingUp, Cpu } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onChangeView: (view: 'home' | 'features' | 'how-it-works') => void;
  onOpenDemo: () => void;
}

export default function Hero({ onChangeView, onOpenDemo }: HeroProps) {
  return (
    <section id="home" className="relative pt-8 pb-12 md:pt-12 md:pb-16 px-6 overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 right-0 w-full lg:w-[60%] aspect-square hero-gradient pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          
          {/* Hero Content Column */}
          <div className="space-y-6">
            {/* NEXT-GEN ENERGY INTELLIGENCE Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="inline-flex items-center space-x-2.5 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.02)]"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-cyan"></span>
              </span>
              <span className="text-[11px] uppercase tracking-widest font-bold text-brand-cyan">
                Next-Gen Energy Intelligence
              </span>
            </motion.div>
 
            {/* One Platform heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight text-white"
            >
              One Platform for <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue font-extrabold">
                Customers &amp; <br className="sm:hidden" /> Service Providers
              </span>
            </motion.h1>
 
            {/* Subtext description */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
              className="text-lg text-brand-gray max-w-xl leading-relaxed"
            >
              Optimize your solar investments with AI-driven intelligence for grid efficiency, forecasting, and vendor management.
            </motion.p>
 
            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-1"
            >
              <button 
                onClick={onOpenDemo}
                className="bg-brand-cyan text-brand-black px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:brightness-110 hover:scale-[1.03] active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(0,242,255,0.25)] cursor-pointer border-none"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => { onChangeView('features'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="bg-white/5 border border-white/10 px-8 py-4 rounded-xl font-bold hover:bg-white/10 hover:border-white/25 active:scale-[0.98] transition-all text-white cursor-pointer"
              >
                Explore Features
              </button>
            </motion.div>
 
            {/* Trusted by Leaders section */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="pt-8 border-t border-white/5"
            >
              <p className="text-[10px] uppercase tracking-widest text-brand-gray mb-4">
                Trusted by leaders in energy
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center opacity-60">
                <div className="flex items-center gap-1.5 text-white font-semibold tracking-wider text-xs">
                  <Zap className="w-4 h-4 text-brand-cyan" /> HELIOS LABS
                </div>
                <div className="flex items-center gap-1.5 text-white font-semibold tracking-wider text-xs">
                  <Cpu className="w-4 h-4 text-brand-cyan" /> APEX POWER
                </div>
                <div className="flex items-center gap-1.5 text-white font-semibold tracking-wider text-xs">
                  <Shield className="w-4 h-4 text-brand-cyan" /> TRUSTGRID
                </div>
                <div className="flex items-center gap-1.5 text-white font-semibold tracking-wider text-xs">
                  <TrendingUp className="w-4 h-4 text-brand-cyan" /> SOL-IQ
                </div>
              </div>
            </motion.div>
          </div>
 
          {/* Hero Visual Column */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="relative"
          >
            {/* Solar Panel High-Fidelity 3D Render Image Container */}
            <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square flex items-center justify-center">
              {/* Floating micro animation container */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-full overflow-hidden rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] bg-brand-dark/40 group"
              >
                {/* Glowing edge accents */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-cyan/40 to-transparent z-10 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-blue/40 to-transparent z-10" />
                
                {/* The main high fidelity render image */}
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxfeyNO6Wj1tOh-AwRV_rrLNwiB2EkIu-8r9cdvStTUB_voFORhoWc18eAg3BHGliAkoiGpk1FLTqaGqm3-qNNpLARK4Q4hC4X-RdF0WbjLmt0dC2ytagXxEyLUy7KG5kZ7xRGpx7-wf5ikOiIJXNpE7z6cnL-Nll47aTXyEu2ToGRaK5DoFmAvoBT2GFX6oNqgobHDgGqZ-sMutJOldaphcUgApk-luLHcc97l9P0xsQu0o6RBbItqMgMdSmFYT71v-pOZleELpE5" 
                  alt="Futuristic Solar Energy Farm and Grid" 
                  className="w-full h-full object-cover select-none pointer-events-none group-hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                
                {/* Cybernetic holographic overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/40 via-transparent to-transparent pointer-events-none" />
              </motion.div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
