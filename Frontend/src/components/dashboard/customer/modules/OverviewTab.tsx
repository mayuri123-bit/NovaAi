import React from 'react';
import { Bot, Bookmark, Calculator, FileText, Landmark, MapPinned } from 'lucide-react';
import { UserInfo } from '../../types';
import customerImage from '../../../../../assets/images/customerImg.png';

interface OverviewTabProps {
  user: UserInfo;
  calculatedCapacity: number;
  monthlyBill: number;
  vendors?: Array<{
    id: string;
    name: string;
    verified: boolean;
    desc: string;
    rating: number;
    reviews: number;
    distance: number;
    image: string;
    saved: boolean;
  }>;
  setActiveTab: (tab: any) => void;
  handleRequestQuote?: (vendorName: string) => void;
  handleToggleSaveVendor?: (id: string) => void;
  [key: string]: any;
}

export default function OverviewTab({
  user,
  calculatedCapacity,
  monthlyBill,
  vendors = [],
  setActiveTab,
  handleRequestQuote,
  handleToggleSaveVendor
}: OverviewTabProps) {
  // Simple calculation to display a dynamic, interactive currency value
  const estimatedSavingsInRupees = (monthlyBill * 83).toLocaleString('en-IN', {
    maximumFractionDigits: 0
  });

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center reveal-item" style={{ animationDelay: '0.1s' }}>
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-label-sm text-xs uppercase tracking-widest font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            Smart Update
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
            Good Morning, <br />
            <span className="text-primary font-bold italic">
              {user.fullName.split(' ')[0]} 👋
            </span>
          </h1>
          <p className="text-on-surface-variant text-base md:text-lg max-w-xl font-medium leading-relaxed">
            Welcome back to your AI-powered solar dashboard. Your energy ecosystem is performing at <span className="shimmer-text font-bold">98% efficiency</span> today.
          </p>
        </div>
        <div className="lg:col-span-5 relative">
          <div className="premium-card p-6 rounded-2xl relative overflow-hidden group float-anim">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all"></div>
            <img 
              className="w-full h-auto rounded-xl shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-105" 
              src={customerImage}
              alt="Solar panels grid installation illustration mockup"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-4 right-4 z-20 glass-panel px-4 py-2 rounded-lg flex items-center gap-2 border-primary/30">
              <span className="material-symbols-outlined text-primary neon-glow" style={{ fontVariationSettings: '"FILL" 1' }}>bolt</span>
              <span className="font-label-md text-xs font-bold text-white">{calculatedCapacity.toFixed(1)} kW Active</span>
            </div>
          </div>
        </div>
      </section>

      {/* Insights Stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="premium-card rounded-2xl space-y-6 reveal-item p-8 hover:scale-105 transition-all text-left" style={{ animationDelay: '0.2s' }}>
          <div className="flex justify-between items-start">
            <span className="material-symbols-outlined text-primary text-3xl neon-glow">savings</span>
            <div className="text-right">
              <div className="text-primary-fixed-dim font-label-sm text-xs font-bold text-[#7df4ff]">+12% vs last mo</div>
              <svg className="w-20 h-8 mt-1 text-primary/50" viewBox="0 0 100 40">
                <path className="sparkline" d="M0,35 Q10,32 20,28 T40,25 T60,18 T80,12 T100,5"></path>
              </svg>
            </div>
          </div>
          <div>
            <div className="text-on-surface-variant font-label-md text-xs uppercase tracking-wider font-semibold opacity-70">Monthly Savings</div>
            <div className="text-3xl font-bold text-white mt-1">₹{estimatedSavingsInRupees}</div>
          </div>
        </div>

        <div className="premium-card rounded-2xl space-y-6 reveal-item p-8 hover:scale-105 transition-all text-left" style={{ animationDelay: '0.3s' }}>
          <div className="flex justify-between items-start">
            <span className="material-symbols-outlined text-secondary text-3xl neon-glow">solar_power</span>
            <div className="text-right">
              <div className="text-secondary font-label-sm text-xs font-bold text-secondary">Perfect Fit</div>
              <svg className="w-20 h-8 mt-1 text-secondary/50" viewBox="0 0 100 40">
                <path className="sparkline" d="M0,38 Q20,35 40,30 T70,15 T100,2"></path>
              </svg>
            </div>
          </div>
          <div>
            <div className="text-on-surface-variant font-label-md text-xs uppercase tracking-wider font-semibold opacity-70">Ideal System Size</div>
            <div className="text-3xl font-bold text-white mt-1">{calculatedCapacity.toFixed(1)} kWp <span className="text-sm font-medium opacity-70">(Suggested)</span></div>
          </div>
        </div>

        <div className="premium-card rounded-2xl space-y-6 reveal-item p-8 hover:scale-105 transition-all text-left" style={{ animationDelay: '0.5s' }}>
          <div className="flex justify-between items-start">
            <span className="material-symbols-outlined text-primary-container text-3xl neon-glow">verified</span>
            <span className="text-primary-container font-label-sm text-xs font-bold text-[#00f0ff]">Available Now</span>
          </div>
          <div>
            <div className="text-on-surface-variant font-label-md text-xs uppercase tracking-wider font-semibold opacity-70">Available Discount</div>
            <div className="text-3xl font-bold text-white mt-1">Up to 40%</div>
          </div>
        </div>
      </section>

      {/* Grid Layout of Tools and Sidebars */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
        {/* Main Content Left */}
        <div className="lg:col-span-8 space-y-10">
          {/* Main Tools Grid */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white reveal-item">
              <span className="material-symbols-outlined text-primary text-2xl">grid_view</span>
              Main Tools
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { key: 'ai', label: 'AI Assistant', Icon: Bot, colorClass: 'text-primary bg-primary/10', animDelay: '0s' },
                { key: 'nearby', label: 'Nearby Solar', Icon: MapPinned, colorClass: 'text-secondary bg-secondary/10', animDelay: '0.5s' },
                { key: 'calculator', label: 'Cost Calculator', Icon: Calculator, colorClass: 'text-primary bg-primary/10', animDelay: '1s' },
                { key: 'schemes', label: 'Government Help', Icon: Landmark, colorClass: 'text-tertiary-fixed-dim bg-tertiary-container/20', animDelay: '1.5s' },
                { key: 'quotations', label: 'Price Estimates', Icon: FileText, colorClass: 'text-primary-fixed-dim bg-primary-fixed-dim/20', animDelay: '2s' },
                { key: 'vendors', label: 'Saved Vendors', Icon: Bookmark, colorClass: 'text-on-surface-variant bg-on-surface-variant/10', animDelay: '2.5s' },
              ].map((tool) => (
                <button
                  key={tool.key}
                  onClick={() => setActiveTab(tool.key as any)}
                  className="premium-card rounded-2xl group flex flex-col items-center justify-center text-center space-y-3 reveal-item intelligence-card cursor-pointer"
                >
                  <div className={`w-20 h-20 rounded-xl ${tool.colorClass} flex items-center justify-center transition-transform icon-float`} style={{ animationDelay: tool.animDelay }}>
                    <tool.Icon className="w-11 h-11 neon-glow" strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <span className="font-label-md font-bold text-on-surface text-lg">{tool.label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Featured Companies - Best Local Experts */}
          <section className="reveal-item" style={{ animationDelay: '1s' }}>
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-3 text-white">
                <span className="material-symbols-outlined text-primary text-2xl">storefront</span>
                Best Local Experts
              </h2>
              <button 
                onClick={() => setActiveTab('nearby')}
                className="text-primary font-label-md text-sm flex items-center gap-2 hover:underline font-bold bg-transparent border-none cursor-pointer"
              >
                Explore all ({vendors.length || 4})
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>

            {vendors.length === 0 ? (
              <div className="premium-card p-10 rounded-2xl flex flex-col items-center justify-center min-h-[220px] border border-white/10 text-center">
                <p className="text-on-surface-variant text-base font-medium">Discover top-rated verified solar professionals in your area.</p>
                <button 
                  onClick={() => setActiveTab('nearby')}
                  className="mt-6 px-8 py-3 rounded-xl bg-primary text-on-primary font-bold hover:shadow-[0_0_20px_rgba(0,219,233,0.4)] transition-all cursor-pointer"
                >
                  Start Searching
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {vendors.slice(0, 2).map((vendor) => (
                  <div 
                    key={vendor.id}
                    className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-[#00dbe9]/30 transition-all flex flex-col justify-between space-y-4 group bg-black/40 hover:bg-black/60"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3 items-center">
                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                          {vendor.image ? (
                            <img src={vendor.image} alt={vendor.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                          ) : (
                            <span className="material-symbols-outlined text-2xl text-[#00dbe9]">bolt</span>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-bold text-white text-base group-hover:text-[#00dbe9] transition-colors">{vendor.name}</h4>
                            {vendor.verified && (
                              <span className="material-symbols-outlined text-[#00dbe9] text-base" style={{ fontVariationSettings: '"FILL" 1' }}>verified</span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-[#b9cacb] mt-0.5">
                            <span className="text-amber-400 font-bold flex items-center gap-0.5">⭐ {vendor.rating} ({vendor.reviews})</span>
                            <span>•</span>
                            <span>📍 {vendor.distance} km away</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleToggleSaveVendor?.(vendor.id)}
                        className={`p-2 rounded-lg transition-all cursor-pointer ${
                          vendor.saved 
                            ? 'bg-[#00dbe9]/20 text-[#00dbe9] border border-[#00dbe9]/40' 
                            : 'bg-white/5 text-[#b9cacb] hover:text-white hover:bg-white/10'
                        }`}
                        title={vendor.saved ? "Saved to Bookmarks" : "Save Vendor"}
                      >
                        <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: vendor.saved ? '"FILL" 1' : '"FILL" 0' }}>bookmark</span>
                      </button>
                    </div>

                    <p className="text-xs text-[#b9cacb]/80 line-clamp-2 leading-relaxed">
                      {vendor.desc}
                    </p>

                    <div className="flex gap-2 pt-2 border-t border-white/5">
                      <button
                        onClick={() => handleRequestQuote?.(vendor.name)}
                        className="flex-1 py-2 px-3 rounded-xl bg-[#00dbe9] hover:brightness-110 text-black font-extrabold text-xs transition-all cursor-pointer text-center"
                      >
                        Request Free Quote
                      </button>
                      <button
                        onClick={() => setActiveTab('nearby')}
                        className="py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs transition-all cursor-pointer text-center"
                      >
                        View Map
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Right Sidepanel */}
        <div className="lg:col-span-4 space-y-8">
          {/* AI Insight Panel */}
          <div className="premium-card p-8 rounded-2xl border-primary/30 relative overflow-hidden reveal-item text-left" style={{ animationDelay: '0.8s' }}>
            <div className="absolute top-0 right-0 p-4">
              <span className="material-symbols-outlined text-primary/40 animate-pulse">auto_awesome</span>
            </div>
            <h3 className="text-xl mb-4 flex items-center gap-2 font-bold text-white">
              AI Assistant Tip
            </h3>
            <p className="text-on-surface-variant text-sm italic border-l-2 border-primary pl-4 mb-6 font-medium leading-relaxed font-sans">
              "Based on your roof's 245° SW orientation, you can maximize ROI by installing an East-West configuration to capture evening energy spikes."
            </p>
            <button 
              onClick={() => setActiveTab('ai')}
              className="w-full py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-label-md text-xs font-bold text-white relative z-20 cursor-pointer"
            >
              Ask a Question
            </button>
          </div>

          {/* Recent Activity ("What's New") */}
          <section className="premium-card p-10 rounded-2xl reveal-item min-h-[420px] text-left" style={{ animationDelay: '1.1s' }}>
            <h3 className="font-label-md text-xs uppercase tracking-widest text-on-surface-variant mb-10 font-bold opacity-60">What's New</h3>
            <div className="space-y-10">
              <div className="flex gap-6 group">
                <div className="w-2.5 h-2.5 rounded-full bg-primary mt-2 pulse-indicator"></div>
                <div className="space-y-1">
                  <div className="font-label-md font-bold text-white group-hover:text-primary transition-colors text-lg">Quotation Updated</div>
                  <div className="text-sm text-on-surface-variant font-medium">Lumina Sun just revised your proposal</div>
                  <div className="text-[10px] text-on-surface-variant/50 uppercase mt-1 font-bold tracking-wider">2 hours ago</div>
                </div>
              </div>
              <div className="flex gap-6 group">
                <div className="w-2.5 h-2.5 rounded-full bg-secondary mt-2 pulse-indicator"></div>
                <div className="space-y-1">
                  <div className="font-label-md font-bold text-white group-hover:text-secondary transition-colors text-lg">Savings Milestone</div>
                  <div className="text-sm text-on-surface-variant font-medium">You've reached ₹5,000 in lifetime savings</div>
                  <div className="text-[10px] text-on-surface-variant/50 uppercase mt-1 font-bold tracking-wider">Yesterday</div>
                </div>
              </div>
              <div className="flex gap-6 group">
                <div className="w-2.5 h-2.5 rounded-full bg-white/20 mt-2"></div>
                <div className="space-y-1">
                  <div className="font-label-md font-bold text-white opacity-80 text-lg">New Scheme Alert</div>
                  <div className="text-sm text-on-surface-variant font-medium">State subsidy for EV chargers added</div>
                  <div className="text-[10px] text-on-surface-variant/50 uppercase mt-1 font-bold tracking-wider">Oct 12, 2023</div>
                </div>
              </div>
            </div>
          </section>

          {/* Gov Updates Card */}
          <div className="premium-card p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-transparent reveal-item text-left" style={{ animationDelay: '1.3s' }}>
            <h3 className="text-xl mb-3 font-bold text-white">Government Updates</h3>
            <p className="text-on-surface-variant text-sm mb-8 font-medium">Stay informed on the latest green energy policies and tax exemptions.</p>
            <ul className="space-y-6">
              <li 
                onClick={() => setActiveTab('schemes')}
                className="flex items-start gap-3 group cursor-pointer"
              >
                <span className="material-symbols-outlined text-primary text-sm mt-1 group-hover:translate-x-1 transition-transform">article</span>
                <span className="text-sm text-white/90 group-hover:text-primary font-semibold transition-colors">Net Metering Policy 2026</span>
              </li>
              <li 
                onClick={() => setActiveTab('schemes')}
                className="flex items-start gap-3 group cursor-pointer"
              >
                <span className="material-symbols-outlined text-primary text-sm mt-1 group-hover:translate-x-1 transition-transform">article</span>
                <span className="text-sm text-white/90 group-hover:text-primary font-semibold transition-colors">Federal Solar Tax Credit FAQ</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
