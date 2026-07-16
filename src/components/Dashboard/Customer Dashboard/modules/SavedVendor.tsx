import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Vendor {
  id: string;
  name: string;
  verified: boolean;
  desc: string;
  rating: number;
  reviews: number;
  distance: number;
  image?: string;
  saved: boolean;
}

interface SavedVendorsTabProps {
  vendors: Vendor[];
  handleToggleSaveVendor: (id: string) => void;
  handleRequestQuote?: (vendorName: string) => void;
  setActiveTab?: (tab: 'dashboard' | 'ai' | 'nearby' | 'calculator' | 'schemes' | 'quotations' | 'vendors' | 'learning') => void;
}

const VENDOR_TAGS: Record<string, string[]> = {
  '1': ['Rooftop Installation', 'Battery Storage'],
  '2': ['Energy Audit', 'Rooftop Installation'],
  '3': ['Battery Storage', 'Maintenance'],
  '4': ['Smart Inverters', 'Net Metering'],
};

const VENDOR_LOGOS: Record<string, string> = {
  '1': 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4V0aByG2xzm18qS6JqeVtJhQD4nX_WCUXQ_wW4krCwG0_DFjUNBRQTcWpEyb-TY_wTTUq3c-COV9fCD4kr8WRLQouUBNI__dhus1JCr8Z51g7A5qpkAUSpFLVxOqd1VgQ-oEzmQPB5T0V2T6rjIT0Kws1JFaf0T6YKw76V6GK90olefWR-akH6V1Jy6hc8WzodgCHSJu712ueHA_kjOnj8Uqt8DBd9ODaVoiaRJ63NdMd3E4GWwIQ1Q',
  '2': 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7yZdQMJCpRW7W1ovcnbOHiFkRnI79XwGJA3ww4fQUbCMgDV9COo4GBFQ5C0tOPJhNvE6kW6CouyjtSUeoOoPULUnvPJoZ53fi9P8GxfZPGj20QX1EkjNlB4Zu-6Dp-shTWuApiczty_UfJ1LGnhWCDLJiTkYpKN6fK5K-cmXcnY-7yD038to0FiHFWGl1pI1RR4VWfs_Cs9M6YctmYFZJ71GDQWe0C1K_XWGnsKK7AnHJdgrmxoWwIw',
  '3': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDM8OVj8yivBkhqV5AiQlPnsucwNfF9avbzvrGsalvTHUB7jL3Cp4fk4frzu-tYvm3zOPMvcpn83r-AqgGLmPUAgjutCoaKdqcBX0hFZyHFfwMrOJzFSGlMEJ3fl0l-4VFDAWK7hwjs18SFk7rnvGUvtFQ50kp7ig3F91qLaO5lJN2ZiSKF4WW-umPt-F5FTTwwBBiqVgNQL2G4VQjVhbfPyBN5iGBrAeUg-Oq7uwnofulxCTd9XUXdWQ',
  '4': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCruZpfqN8JDOtVg48ZJaGaWXN_i5ho3ZoQuhfnudGz7uEUmjcd2jW_cj5sRrS2gofX9uubZHgtfGArFiv0e_RLhuzF0K-mEJozjigI51woWIevuyAed9Z8RVxf5stYv8CxeUqBImrnCkgmTDjf-XrOFNJIxkAvZvCqJnVJ6CXbWraZv3M0GVKOFfBGds2_U2_DCAEEEs3KtGOChXQtN3ISQ97Vtv_Tf6Fa4w3pT0dVAGPtrwLhIam2tw',
};

const VENDOR_LOCATIONS: Record<string, string> = {
  '1': 'Mumbai, MH',
  '2': 'Pune, MH',
  '3': 'Mumbai, MH',
  '4': 'Thane, MH',
};

export default function SavedVendorsTab({
  vendors,
  handleToggleSaveVendor,
  handleRequestQuote,
  setActiveTab,
}: SavedVendorsTabProps) {
  const [localSearch, setLocalSearch] = useState('');

  // 1. Get saved vendors
  const savedList = vendors.filter(v => v.saved);

  // 2. Filter by local search term
  const filteredSaved = savedList.filter(v => {
    const term = localSearch.toLowerCase().trim();
    if (!term) return true;
    return (
      v.name.toLowerCase().includes(term) ||
      v.desc.toLowerCase().includes(term) ||
      (VENDOR_LOCATIONS[v.id] || 'Mumbai, MH').toLowerCase().includes(term)
    );
  });

  const handleViewProfile = (vendorName: string) => {
    if (setActiveTab) {
      setActiveTab('nearby');
    }
  };

  return (
    <div className="relative p-0 max-w-[1200px] mx-auto space-y-12 reveal-item">
      {/* Search Bar & Title Row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-white/5">
        <div>
          <h2 className="font-headline-lg text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00dbe9] text-3xl">bookmarks</span>
            My Saved Network
          </h2>
          <p className="text-[#b9cacb] mt-1 text-sm max-w-xl">
            Manage your curated list of premium solar installation partners and energy storage specialists.
          </p>
        </div>
        
        {/* Local Search Input */}
        <div className="relative shrink-0">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b9cacb] text-[18px]">
            search
          </span>
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="bg-[#12151d] border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-xs w-full md:w-64 focus:ring-2 focus:ring-[#00f0ff]/20 focus:border-[#00dbe9] transition-all outline-none text-white placeholder-[#b9cacb]/50"
            placeholder="Search saved vendors..."
          />
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {filteredSaved.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {filteredSaved.map((vendor) => {
              const tags = VENDOR_TAGS[vendor.id] || ['Rooftop Installation', 'Battery Storage'];
              const logo = VENDOR_LOGOS[vendor.id] || vendor.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4V0aByG2xzm18qS6JqeVtJhQD4nX_WCUXQ_wW4krCwG0_DFjUNBRQTcWpEyb-TY_wTTUq3c-COV9fCD4kr8WRLQouUBNI__dhus1JCr8Z51g7A5qpkAUSpFLVxOqd1VgQ-oEzmQPB5T0V2T6rjIT0Kws1JFaf0T6YKw76V6GK90olefWR-akH6V1Jy6hc8WzodgCHSJu712ueHA_kjOnj8Uqt8DBd9ODaVoiaRJ63NdMd3E4GWwIQ1Q';
              const location = VENDOR_LOCATIONS[vendor.id] || 'Mumbai, MH';

              return (
                <motion.div
                  key={vendor.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="glass-panel rounded-2xl p-6 group hover:shadow-[0_0_25px_rgba(0,219,233,0.15)] hover:-translate-y-1 transition-all duration-300 backdrop-blur-xl relative border border-white/5 flex flex-col justify-between min-h-[320px]"
                >
                  <div>
                    {/* Top logo and delete actions */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-3 overflow-hidden">
                        <img 
                          className="w-full h-full object-contain" 
                          src={logo} 
                          alt={`${vendor.name} Logo`}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <button 
                        onClick={() => handleToggleSaveVendor(vendor.id)}
                        className="p-2.5 rounded-lg text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
                        title="Remove Bookmark"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>

                    {/* Vendor details */}
                    <div className="mb-6 space-y-2">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-white text-lg tracking-tight group-hover:text-[#00dbe9] transition-colors">
                          {vendor.name}
                        </h3>
                        {vendor.verified && (
                          <span 
                            className="material-symbols-outlined text-[#00dbe9] text-[18px] select-none" 
                            style={{ fontVariationSettings: '"FILL" 1' }}
                            title="Verified Vetted Partner"
                          >
                            verified
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-xs text-[#b9cacb]">
                        <div className="flex items-center text-amber-400 gap-0.5 font-semibold">
                          <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                          <span>{vendor.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[#b9cacb]/80">
                          <span className="material-symbols-outlined text-[16px]">location_on</span>
                          <span>{location}</span>
                        </div>
                      </div>

                      <p className="text-xs text-[#b9cacb]/70 leading-relaxed mt-2.5 line-clamp-2">
                        {vendor.desc}
                      </p>

                      {/* Attribute Badges */}
                      <div className="flex flex-wrap gap-2 mt-4 pt-1">
                        {tags.map((tag, idx) => (
                          <span 
                            key={idx} 
                            className="px-2 py-1 rounded-full bg-[#00dbe9]/5 text-[#00dbe9] text-[10px] uppercase tracking-wider font-extrabold border border-[#00dbe9]/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/5">
                    <button 
                      onClick={() => handleViewProfile(vendor.name)}
                      className="py-2.5 px-4 rounded-xl border border-white/10 text-white hover:text-[#00dbe9] hover:bg-white/5 font-bold text-xs transition-all cursor-pointer whitespace-nowrap text-center"
                    >
                      View Profile
                    </button>
                    <button 
                      onClick={() => handleRequestQuote?.(vendor.name)}
                      className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#00dbe9] to-[#00f0ff] hover:brightness-110 text-black font-extrabold text-xs transition-all cursor-pointer whitespace-nowrap text-center hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                    >
                      Request Quote
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          /* Empty state */
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center text-center py-16 px-6 glass-panel rounded-3xl border border-dashed border-white/10"
          >
            <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-[#b9cacb]/40">
              <span className="material-symbols-outlined text-4xl">bookmarks</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No saved vendors found</h3>
            <p className="text-[#b9cacb]/80 max-w-sm text-sm leading-relaxed mb-8">
              {localSearch 
                ? "No saved installation partners match your current search criteria. Try a different query." 
                : "Start exploring our network of verified solar experts to find the perfect match for your home transition!"}
            </p>
            {setActiveTab && (
              <button 
                onClick={() => setActiveTab('nearby')}
                className="py-3 px-8 rounded-xl bg-gradient-to-r from-[#00dbe9] to-[#00f0ff] text-black hover:brightness-110 font-bold text-sm transition-all cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
              >
                Explore Nearby Installers
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Statistics for context */}
      <div className="mt-20 pt-10 border-t border-white/5">
        <h3 className="text-sm font-extrabold uppercase tracking-widest text-[#00dbe9] mb-6 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00dbe9] animate-pulse" />
          Network Highlights & Diagnostics
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl flex items-center gap-6 backdrop-blur-xl border border-white/5">
            <div className="w-12 h-12 rounded-full bg-[#00dbe9]/10 flex items-center justify-center text-[#00dbe9] shrink-0">
              <span className="material-symbols-outlined">trending_up</span>
            </div>
            <div>
              <p className="text-[10px] text-[#b9cacb] uppercase tracking-wider font-extrabold">Average Savings</p>
              <h4 className="text-2xl font-bold text-white mt-0.5">22% Lower</h4>
              <p className="text-[11px] text-[#b9cacb]/60 mt-1">Achieved via direct partner net metering</p>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl flex items-center gap-6 backdrop-blur-xl border border-white/5">
            <div className="w-12 h-12 rounded-full bg-[#cf5cff]/10 flex items-center justify-center text-[#cf5cff] shrink-0">
              <span className="material-symbols-outlined">shield</span>
            </div>
            <div>
              <p className="text-[10px] text-[#b9cacb] uppercase tracking-wider font-extrabold">Insurance Coverage</p>
              <h4 className="text-2xl font-bold text-white mt-0.5">100% Vetted</h4>
              <p className="text-[11px] text-[#b9cacb]/60 mt-1">Guaranteed structural & performance insurance</p>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl flex items-center gap-6 backdrop-blur-xl border border-white/5">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
              <span className="material-symbols-outlined">bolt</span>
            </div>
            <div>
              <p className="text-[10px] text-[#b9cacb] uppercase tracking-wider font-extrabold">Active Installations</p>
              <h4 className="text-2xl font-bold text-white mt-0.5">1,240+ Units</h4>
              <p className="text-[11px] text-[#b9cacb]/60 mt-1">Clean solar panels deployed region-wide</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
