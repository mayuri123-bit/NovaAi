import React from 'react';
import { 
  MapPin, Bot, Calculator, FileText, 
  Clock, Wrench, Landmark, LayoutDashboard, Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';

export default function Features() {
  const featureList = [
    {
      icon: <MapPin className="w-6 h-6 text-brand-cyan" />,
      title: "Smart Vendor Discovery",
      description: "Find trusted solar vendors near your location.",
      gradient: "from-brand-cyan/20 to-brand-blue/5",
      accent: "rgba(0, 242, 255, 0.15)",
      visual: (
        <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none">
          <div className="w-24 h-24 rounded-full border border-brand-cyan/30 animate-pulse flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border border-brand-cyan/50 flex items-center justify-center">
              <div className="w-3 h-3 bg-brand-cyan rounded-full shadow-[0_0_10px_rgba(0,242,255,1)]" />
            </div>
          </div>
          <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-brand-cyan/20 to-transparent" />
        </div>
      )
    },
    {
      icon: <Bot className="w-6 h-6 text-brand-cyan" />,
      title: "AI Solar Assistant",
      description: "Get instant AI-powered solar guidance.",
      gradient: "from-purple-500/20 to-pink-500/5",
      accent: "rgba(168, 85, 247, 0.15)",
      visual: (
        <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none">
          <div className="w-28 h-20 rounded-2xl border border-purple-500/30 flex flex-col justify-around p-2">
            <div className="h-1.5 w-1/2 bg-purple-500/40 rounded" />
            <div className="h-1.5 w-3/4 bg-purple-500/20 rounded self-end" />
            <div className="h-1.5 w-2/3 bg-purple-500/30 rounded" />
          </div>
        </div>
      )
    },
    {
      icon: <Calculator className="w-6 h-6 text-brand-cyan" />,
      title: "Smart Cost Calculator",
      description: "Estimate system size, cost, and savings.",
      gradient: "from-emerald-500/20 to-teal-500/5",
      accent: "rgba(16, 185, 129, 0.15)",
      visual: (
        <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none">
          <div className="grid grid-cols-3 gap-1.5 w-20">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="h-3 bg-emerald-500/20 rounded border border-emerald-500/10" />
            ))}
          </div>
        </div>
      )
    },
    {
      icon: <FileText className="w-6 h-6 text-brand-cyan" />,
      title: "Instant Quotations",
      description: "Request and compare vendor quotations.",
      gradient: "from-blue-500/20 to-brand-cyan/5",
      accent: "rgba(59, 130, 246, 0.15)",
      visual: (
        <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none">
          <div className="w-16 h-20 rounded-lg border border-blue-500/30 p-2.5 space-y-2 rotate-6">
            <div className="h-1 w-full bg-blue-500/40 rounded" />
            <div className="h-1 w-5/6 bg-blue-500/20 rounded" />
            <div className="h-1 w-full bg-blue-500/30 rounded" />
            <div className="h-2 w-1/2 bg-brand-cyan/40 rounded" />
          </div>
        </div>
      )
    },
    {
      icon: <Clock className="w-6 h-6 text-brand-cyan" />,
      title: "Installation Tracking",
      description: "Track installation progress in real time.",
      gradient: "from-amber-500/20 to-orange-500/5",
      accent: "rgba(245, 158, 11, 0.15)",
      visual: (
        <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none">
          <div className="w-24 h-1.5 bg-amber-500/10 rounded-full overflow-hidden">
            <div className="w-2/3 h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
          </div>
          <div className="absolute w-8 h-8 rounded-full border-2 border-amber-500/40 border-t-transparent animate-spin" />
        </div>
      )
    },
    {
      icon: <Wrench className="w-6 h-6 text-brand-cyan" />,
      title: "Service & Maintenance",
      description: "Book maintenance and manage service requests.",
      gradient: "from-rose-500/20 to-red-500/5",
      accent: "rgba(244, 63, 94, 0.15)",
      visual: (
        <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none">
          <div className="w-20 h-20 rounded-full border border-dashed border-rose-500/30 flex items-center justify-center animate-spin-slow">
            <div className="w-12 h-12 rounded-full border border-rose-500/40" />
          </div>
        </div>
      )
    },
    {
      icon: <Landmark className="w-6 h-6 text-brand-cyan" />,
      title: "Government Schemes",
      description: "Explore available solar subsidies.",
      gradient: "from-indigo-500/20 to-violet-500/5",
      accent: "rgba(99, 102, 241, 0.15)",
      visual: (
        <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none">
          <div className="w-24 h-16 rounded-xl border border-indigo-500/30 flex items-end justify-around p-2">
            <div className="w-2 h-8 bg-indigo-500/30 rounded-t" />
            <div className="w-2 h-12 bg-indigo-500/50 rounded-t" />
            <div className="w-2 h-6 bg-indigo-500/20 rounded-t" />
          </div>
        </div>
      )
    },
    {
      icon: <LayoutDashboard className="w-6 h-6 text-brand-cyan" />,
      title: "Vendor Dashboard",
      description: "Manage leads, quotations, and installations.",
      gradient: "from-sky-500/20 to-blue-500/5",
      accent: "rgba(14, 165, 233, 0.15)",
      visual: (
        <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none">
          <div className="w-24 h-16 bg-sky-500/5 rounded-lg border border-sky-500/30 p-2 space-y-1.5">
            <div className="flex justify-between">
              <div className="w-3 h-3 bg-sky-500/40 rounded-full" />
              <div className="w-12 h-2 bg-sky-500/20 rounded" />
            </div>
            <div className="w-full h-1 bg-sky-500/30 rounded" />
            <div className="w-5/6 h-1 bg-sky-500/10 rounded" />
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="features" className="py-24 px-6 relative overflow-hidden bg-brand-black border-y border-white/5">
      {/* Background Glowing Ambient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-cyan/5 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-blue/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Simple & Literal Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-brand-cyan/10 border border-brand-cyan/20 px-3 py-1 rounded-full text-xs font-semibold text-brand-cyan">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NovaAI Features</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            NovaAI Power Solutions
          </h2>
          <p className="text-brand-gray text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Discover our comprehensive suite designed specifically to bring visibility, clarity, and control to your solar energy portfolio.
          </p>
        </div>

        {/* Premium 4x2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
          {featureList.map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="glass-card p-6 rounded-3xl flex flex-col justify-between border-white/10 hover:border-brand-cyan/40 bg-white/[0.01] hover:bg-white/[0.03] transition-all relative overflow-hidden group min-h-[340px]"
              style={{
                boxShadow: `0 4px 30px rgba(0, 0, 0, 0.4)`
              }}
            >
              {/* Card Background Glow and Tech-style Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
              <div className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-br ${feature.gradient} filter blur-2xl opacity-40 group-hover:opacity-80 transition-opacity pointer-events-none`} />

              {/* Graphical Illustration Container */}
              <div className="h-32 rounded-2xl bg-brand-black/40 border border-white/5 relative overflow-hidden flex items-center justify-center mb-6">
                {feature.visual}
                {/* Float Card Icon */}
                <div className="relative z-10 p-3.5 rounded-2xl bg-brand-black/80 border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.5)] text-brand-cyan group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
              </div>

              {/* Title & Description Text Block */}
              <div className="space-y-2 relative z-10 text-left">
                <h3 className="text-base font-bold text-white group-hover:text-brand-cyan transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-xs text-brand-gray leading-relaxed font-normal">
                  {feature.description}
                </p>
              </div>

              {/* Accent neon bottom bar */}
              <div 
                className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-brand-cyan transition-all duration-300 group-hover:w-full"
                style={{ boxShadow: `0 0 10px ${feature.accent}` }}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
