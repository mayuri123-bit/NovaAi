import {useState} from "react";
import Navbar from './components/Landing page/Navbar';
import Hero from './components/Landing page/Hero';
import Features from './components/Landing page/Features';
import HowItWorks from './components/Landing page/HowItWorks';
import Pricing from './components/Landing page/Pricing';
import Footer from './components/Landing page/Footer';
import Getstarted from './components/registration/Getstarted';
import { ArrowLeft, Home, Sparkles } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'features' | 'how-it-works'>('home');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"Login" | "Signup" | "FreeTrial" | "ContactSales" | "ChooseAccountType">("ChooseAccountType");

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenDemo = (_mode: string = "FreeTrial") => {
    setModalMode("ChooseAccountType");
    setModalOpen(true);
  };

  return (
    <div className="bg-brand-black min-h-screen text-white font-sans antialiased overflow-x-hidden selection:bg-brand-cyan/30 selection:text-white">
      {/* Dynamic Navigation Pane */}
      <Navbar 
        currentView={currentView}
        onChangeView={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onScrollToSection={handleScrollToSection} 
        onOpenDemo={() => handleOpenDemo("Login")} 
      />

      {/* Main Page Canvas Sections */}
      <main className="relative z-10 pt-20">
        
        {currentView === 'home' && (
          <>
            {/* Section 1: Hero Cover Area */}
            <Hero 
              onChangeView={(view) => {
                setCurrentView(view);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenDemo={() => handleOpenDemo("Login")} 
            />

            {/* Section 2: Scalable Intelligence pricing matrices */}
            <Pricing 
              onOpenDemo={handleOpenDemo} 
            />
          </>
        )}

        {currentView === 'features' && (
          <div className="max-w-7xl mx-auto px-6 py-12">
            {/* Breadcrumb / Back Navigation */}
            <div className="flex items-center space-x-4 mb-8">
              <button 
                onClick={() => { setCurrentView('home'); window.scrollTo({ top: 0 }); }}
                className="flex items-center gap-2 text-sm font-semibold text-brand-cyan hover:text-white transition-colors bg-white/5 border border-white/10 px-4 py-2 rounded-xl cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </button>
              <span className="text-brand-gray text-sm">/</span>
              <span className="text-brand-gray text-sm">Features Page</span>
            </div>

            {/* Standalone Header */}
            <div className="border-b border-white/5 pb-10 mb-10">
              <div className="inline-flex items-center space-x-2 bg-brand-cyan/10 border border-brand-cyan/20 px-3 py-1 rounded-full text-xs font-semibold text-brand-cyan mb-4">
                <Sparkles className="w-3 h-3" />
                <span>Deep Energy Analytics Suite</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-white">NovaAI Features Platform</h1>
              <p className="text-brand-gray mt-2 max-w-2xl text-lg">
                Explore our full spectrum of grid optimization systems, real-time satellite solar mapping, and automated tax compliance workflows.
              </p>
            </div>

            {/* Core Feature Content */}
            <Features />
            
            {/* CTA block in bottom of standalone page */}
            <div className="mt-16 glass-card p-8 sm:p-12 rounded-3xl border-brand-cyan/20 relative overflow-hidden text-center">
              <div className="absolute top-0 right-0 w-80 h-80 bg-brand-cyan/5 rounded-full filter blur-[100px] pointer-events-none" />
              <h3 className="text-2xl sm:text-3xl font-bold text-white">Ready to unlock precision yield metrics?</h3>
              <p className="text-brand-gray mt-2 max-w-xl mx-auto text-sm">
                Deploy our advanced AI forecasting engine to your custom solar footprint in less than 5 minutes.
              </p>
              <div className="flex justify-center gap-4 mt-8">
                <button 
                  onClick={() => handleOpenDemo("FreeTrial")}
                  className="bg-brand-cyan text-brand-black px-8 py-3.5 rounded-xl font-bold hover:brightness-110 hover:scale-105 transition-all shadow-[0_0_15px_rgba(0,242,255,0.3)] cursor-pointer border-none"
                >
                  Start Pro Free Trial
                </button>
                <button 
                  onClick={() => { setCurrentView('home'); window.scrollTo({ top: 0 }); }}
                  className="bg-white/5 border border-white/10 px-6 py-3.5 rounded-xl hover:bg-white/10 transition-all text-white font-semibold cursor-pointer"
                >
                  View Plans
                </button>
              </div>
            </div>
          </div>
        )}

        {currentView === 'how-it-works' && (
          <div className="max-w-7xl mx-auto px-6 py-12">
            {/* Breadcrumb / Back Navigation */}
            <div className="flex items-center space-x-4 mb-8">
              <button 
                onClick={() => { setCurrentView('home'); window.scrollTo({ top: 0 }); }}
                className="flex items-center gap-2 text-sm font-semibold text-brand-cyan hover:text-white transition-colors bg-white/5 border border-white/10 px-4 py-2 rounded-xl cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </button>
              <span className="text-brand-gray text-sm">/</span>
              <span className="text-brand-gray text-sm">How It Works Page</span>
            </div>

            {/* Standalone Header */}
            <div className="border-b border-white/5 pb-10 mb-10">
              <div className="inline-flex items-center space-x-2 bg-brand-cyan/10 border border-brand-cyan/20 px-3 py-1 rounded-full text-xs font-semibold text-brand-cyan mb-4">
                <Sparkles className="w-3 h-3" />
                <span>Integration Protocol</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-white">How NovaAI Works</h1>
              <p className="text-brand-gray mt-2 max-w-2xl text-lg">
                Step-by-step developer deployment workflows to connect modern meters, run micro-grid simulations, and automate yield auditing.
              </p>
            </div>

            {/* Core How It Works content */}
            <HowItWorks />

            {/* CTA block in bottom of standalone page */}
            <div className="mt-16 glass-card p-8 sm:p-12 rounded-3xl border-brand-cyan/20 relative overflow-hidden text-center">
              <div className="absolute top-0 right-0 w-80 h-80 bg-brand-cyan/5 rounded-full filter blur-[100px] pointer-events-none" />
              <h3 className="text-2xl sm:text-3xl font-bold text-white">Integrate in under 5 minutes</h3>
              <p className="text-brand-gray mt-2 max-w-xl mx-auto text-sm">
                Get developer API tokens and configure Webhooks immediately in your custom developer console.
              </p>
              <div className="flex justify-center gap-4 mt-8">
                <button 
                  onClick={() => handleOpenDemo("FreeTrial")}
                  className="bg-brand-cyan text-brand-black px-8 py-3.5 rounded-xl font-bold hover:brightness-110 hover:scale-105 transition-all shadow-[0_0_15px_rgba(0,242,255,0.3)] cursor-pointer border-none"
                >
                  Create Sandbox Account
                </button>
                <button 
                  onClick={() => { setCurrentView('home'); window.scrollTo({ top: 0 }); }}
                  className="bg-white/5 border border-white/10 px-6 py-3.5 rounded-xl hover:bg-white/10 transition-all text-white font-semibold cursor-pointer"
                >
                  Return Home
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Interactive Global Footer */}
      <Footer 
        onChangeView={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onScrollToSection={handleScrollToSection} 
      />

      {/* Glassmorphic Interaction Modal Overlay */}
      <Getstarted
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        initialMode={modalMode} 
      />
    </div>
  );
}
