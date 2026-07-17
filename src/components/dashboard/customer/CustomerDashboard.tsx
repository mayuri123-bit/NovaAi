import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  LayoutDashboard, 
  Bot, 
  Map, 
  Calculator, 
  Building, 
  FileText, 
  Bookmark, 
  BookOpen, 
  Bell, 
  User, 
  Settings, 
  LogOut, 
  Search, 
  DollarSign, 
  Sun, 
  Leaf, 
  ShieldCheck, 
  Store, 
  Star, 
  MapPin, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  MessageSquare,
  Send,
  HelpCircle,
  Clock,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CustomerDashboardProps {
  user: {
    fullName: string;
    email: string;
    location: string;
  };
  onLogout: () => void;
}

export default function CustomerDashboard({ user, onLogout }: CustomerDashboardProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'ai' | 'nearby' | 'calculator' | 'schemes' | 'quotations' | 'vendors' | 'learning'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Interactive Cost Calculator state
  const [monthlyBill, setMonthlyBill] = useState(150);
  const [roofArea, setRoofArea] = useState(400); // sq ft
  const [sunlightHours, setSunlightHours] = useState(5.2); // hours/day

  // Toast notification state
  const [toast, setToast] = useState<{ id: string; text: string; type: 'success' | 'info' } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToast({ id, text, type });
    setTimeout(() => {
      setToast(current => current?.id === id ? null : current);
    }, 4000);
  };
  
  // AI chat states
  const [messages, setMessages] = useState<Array<{ id: string; sender: 'user' | 'assistant'; text: string; time: string }>>([
    { id: '1', sender: 'assistant', text: `Hello ${user.fullName}! I've analyzed your location (${user.location}). How can I assist you with your solar transition today?`, time: '10:00 AM' }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  // Interactive Saved Vendors state
  const [vendors, setVendors] = useState([
    { id: '1', name: 'Lumina Sun Solutions', verified: true, desc: 'Premium Tier-1 panel specialist with 15 years experience.', rating: 4.9, reviews: 242, distance: 2.4, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1b8HZe9CL08s7o7PQSb5XQsZLZWj7x_SQvajIQ5Yw-wxT5jSFsEgsUPo3EmpJnLjdcgjjjqofn-UGkigngnNtm1XKJceWofgqbRC5cfZ-oSt2_TtpxE2X21q5uBU7aMQgkDMDfbXv5JLeMtORgR2zbvSscBhlPMCayQroME1WcXLqr6jjVSqj6QvMQGcTig5BFc7ZEDRS7-PCa-zl6RBPiJa4UdQLl2cuaz3V54WSVEfHg74VV-reYg', saved: true },
    { id: '2', name: 'Helios Prime Energy', verified: true, desc: 'Smart-grid integration and residential battery experts.', rating: 4.7, reviews: 180, distance: 4.1, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCruZpfqN8JDOtVg48ZJaGaWXN_i5ho3ZoQuhfnudGz7uEUmjcd2jW_cj5sRrS2gofX9uubZHgtfGArFiv0e_RLhuzF0K-mEJozjigI51woWIevuyAed9Z8RVxf5stYv8CxeUqBImrnCkgmTDjf-XrOFNJIxkAvZvCqJnVJ6CXbWraZv3M0GVKOFfBGds2_U2_DCAEEEs3KtGOChXQtN3ISQ97Vtv_Tf6Fa4w3pT0dVAGPtrwLhIam2tw', saved: true },
    { id: '3', name: 'Apex Grid Solar', verified: false, desc: 'Affordable, fast-installation monocrystalline panels and inverters.', rating: 4.5, reviews: 92, distance: 5.6, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1b8HZe9CL08s7o7PQSb5XQsZLZWj7x_SQvajIQ5Yw-wxT5jSFsEgsUPo3EmpJnLjdcgjjjqofn-UGkigngnNtm1XKJceWofgqbRC5cfZ-oSt2_TtpxE2X21q5uBU7aMQgkDMDfbXv5JLeMtORgR2zbvSscBhlPMCayQroME1WcXLqr6jjVSqj6QvMQGcTig5BFc7ZEDRS7-PCa-zl6RBPiJa4UdQLl2cuaz3V54WSVEfHg74VV-reYg', saved: false },
    { id: '4', name: 'Evergreen Volt', verified: true, desc: '100% eco-responsible microinverters and net-metering specialists.', rating: 4.8, reviews: 114, distance: 3.2, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCruZpfqN8JDOtVg48ZJaGaWXN_i5ho3ZoQuhfnudGz7uEUmjcd2jW_cj5sRrS2gofX9uubZHgtfGArFiv0e_RLhuzF0K-mEJozjigI51woWIevuyAed9Z8RVxf5stYv8CxeUqBImrnCkgmTDjf-XrOFNJIxkAvZvCqJnVJ6CXbWraZv3M0GVKOFfBGds2_U2_DCAEEEs3KtGOChXQtN3ISQ97Vtv_Tf6Fa4w3pT0dVAGPtrwLhIam2tw', saved: false }
  ]);

  // Quotations state
  const [quotations, setQuotations] = useState([
    { id: 'Q-9801', vendor: 'Lumina Sun Solutions', systemSize: '8.4 kWp', estimatedCost: '$16,500', status: 'Pending Review', date: 'Jul 05, 2026', savings: '$482/mo' },
    { id: 'Q-9452', vendor: 'Helios Prime Energy', systemSize: '9.2 kWp', estimatedCost: '$18,200', status: 'Approved & Signed', date: 'Jul 02, 2026', savings: '$510/mo' }
  ]);

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'quote', text: 'Lumina Sun just revised your proposal', time: '2 hours ago', active: true },
    { id: 2, type: 'milestone', text: 'You reached $5,000 in lifetime savings', time: 'Yesterday', active: true },
    { id: 3, type: 'alert', text: 'State subsidy for EV chargers added', time: 'Oct 12, 2023', active: false }
  ]);

  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Search & Filters for local installers
  const [nearbySearch, setNearbySearch] = useState('');
  const [nearbyFilter, setNearbyFilter] = useState<'all' | 'verified' | 'saved'>('all');

  // Helper calculations for Solar ROI
  const calculatedCapacity = Math.min((monthlyBill / 0.15) / (30 * sunlightHours), roofArea * 0.015);
  const estimatedCost = calculatedCapacity * 3200;
  const subsidyAmount = estimatedCost * 0.40; // 40%
  const finalCost = estimatedCost - subsidyAmount;
  const yearlySavings = monthlyBill * 12 * 0.90; // Assume 90% bill reduction
  const paybackYears = finalCost / yearlySavings;

  const handleSendMessage = (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const textToSend = customText || inputMsg;
    if (!textToSend.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user' as const,
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMsg('');

    // Simulated response
    setTimeout(() => {
      let botResponse = `That is an excellent point! Based on your location in ${user.location}, solar efficiency remains high. Let me know if you would like me to draft a custom ROI projection.`;
      
      if (textToSend.toLowerCase().includes('calculator') || textToSend.toLowerCase().includes('cost')) {
        botResponse = `Based on your estimated monthly electric bill of $${monthlyBill}, a ${calculatedCapacity.toFixed(1)} kW system is recommended. With the 40% federal subsidy, your total estimated out-of-pocket investment would be $${finalCost.toLocaleString('en-US', {maximumFractionDigits: 0})}, paying itself off in approximately ${paybackYears.toFixed(1)} years!`;
      } else if (textToSend.toLowerCase().includes('subsidy') || textToSend.toLowerCase().includes('scheme')) {
        botResponse = `In ${user.location}, you are eligible for the 40% Federal Solar Investment Tax Credit (ITC). Additionally, local net metering policies let you sell excess energy back to the grid for extra monthly savings!`;
      } else if (textToSend.toLowerCase().includes('lumina') || textToSend.toLowerCase().includes('installer')) {
        botResponse = `Lumina Sun Solutions is our highest-rated Tier-1 installer in your area, located just 2.4 miles away with a 4.9-star rating. They have received your query and we expect a customized quote shortly.`;
      }

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'assistant' as const,
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };

  const handleToggleSaveVendor = (id: string) => {
    setVendors(prev => prev.map(v => {
      if (v.id === id) {
        const updatedSaved = !v.saved;
        showToast(updatedSaved ? `📌 ${v.name} added to your bookmarks!` : `Removed bookmark for ${v.name}.`, 'info');
        return { ...v, saved: updatedSaved };
      }
      return v;
    }));
  };

  const handleRequestQuote = (vendorName: string) => {
    const newQuoteId = `Q-${Math.floor(1000 + Math.random() * 9000)}`;
    const newQuote = {
      id: newQuoteId,
      vendor: vendorName,
      systemSize: `${calculatedCapacity.toFixed(1)} kWp`,
      estimatedCost: `$${estimatedCost.toLocaleString('en-US', {maximumFractionDigits: 0})}`,
      status: 'Pending Review',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      savings: `$${(monthlyBill * 0.9).toFixed(0)}/mo`
    };
    setQuotations(prev => [newQuote, ...prev]);
    
    // Add notification
    setNotifications(prev => [
      { id: Date.now(), type: 'quote', text: `Sent quote request to ${vendorName}`, time: 'Just now', active: true },
      ...prev
    ]);

    showToast(`✉️ Quote request successfully transmitted to ${vendorName}!`);
  };

  return (
    <div className="flex min-h-screen bg-[#0b0e14] text-[#e1e2eb] font-sans selection:bg-[#00f0ff]/30 selection:text-white">
      {/* Scope Encapsulated CSS Elements */}
      <style>{`
        .glass-panel {
          background: rgba(29, 32, 38, 0.55);
          backdrop-filter: blur(40px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.08);
          transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        }
        /* Premium Card Interaction */
        .premium-card {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.12);
          transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(32px);
        }
        .premium-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1.5px;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent 50%, rgba(0,219,233,0.08));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          transition: all 0.5s ease;
        }
        .premium-card:hover {
          transform: translateY(-8px) scale(1.02);
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(0, 219, 233, 0.4);
          box-shadow: 
            0 25px 50px -12px rgba(0, 0, 0, 0.6),
            0 0 30px -5px rgba(0, 219, 233, 0.3),
            inset 0 0 20px rgba(0, 219, 233, 0.1);
        }
        .premium-card:hover::before {
          background: linear-gradient(135deg, rgba(0,219,233,0.7), transparent 40%, rgba(255,255,255,0.3));
          opacity: 1;
        }
        
        .neon-glow {
          filter: drop-shadow(0 0 8px #00dbe9);
        }
        .shimmer-text {
          background: linear-gradient(90deg, #dbfcff 0%, #00dbe9 50%, #dbfcff 100%);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }
        @keyframes shimmer {
          to { background-position: 200% center; }
        }
        @keyframes reveal-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .reveal-item {
          opacity: 0;
          animation: reveal-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .float-anim {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        /* Icon Floating Animation */
        .icon-float {
          animation: icon-float 4s ease-in-out infinite;
        }
        @keyframes icon-float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-4px) scale(1.05); }
        }

        .sidebar-active {
          background: linear-gradient(90deg, rgba(0, 219, 233, 0.2) 0%, rgba(0, 219, 233, 0) 100%);
          color: #00dbe9;
          box-shadow: inset 4px 0 16px -4px rgba(0, 219, 233, 0.5);
          position: relative;
        }
        .sidebar-active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 15%;
          height: 70%;
          width: 3px;
          background: #00dbe9;
          box-shadow: 0 0 10px #00dbe9;
          border-radius: 0 4px 4px 0;
        }
        .nav-item-hover:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #dbfcff;
          transform: translateX(4px);
        }
        .pulse-indicator {
          position: relative;
        }
        .pulse-indicator::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: inherit;
          animation: pulse-ring 2s infinite;
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(3); opacity: 0; }
        }

        .sparkline {
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .intelligence-card {
          min-height: 220px !important;
          padding: 2.5rem !important;
        }
        .intelligence-card:hover .icon-float {
          transform: translateY(-8px) scale(1.15) !important;
        }
      `}</style>

      {/* Desktop Sidebar Navigation */}
      <aside className="w-64 glass-panel border-r border-white/5 flex-col hidden lg:flex sticky top-0 h-screen z-40">
        <div className="p-6">
          <div className="font-headline-md text-headline-md font-bold text-[#dbfcff] tracking-tighter flex items-center gap-2 mb-10 select-none">
            <Zap className="w-6 h-6 text-[#00dbe9] neon-glow shrink-0" />
            <span>NovaAI</span>
          </div>

          <nav className="space-y-1">
            {[
              { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { key: 'ai', label: 'AI Assistant', icon: Bot, isNew: true },
              { key: 'nearby', label: 'Nearby Solar', icon: Map },
              { key: 'calculator', label: 'Calculator', icon: Calculator },
              { key: 'schemes', label: 'Gov Schemes', icon: Building },
              { key: 'quotations', label: 'Quotations', icon: FileText },
              { key: 'vendors', label: 'Saved Vendors', icon: Bookmark },
              { key: 'learning', label: 'Learning Hub', icon: BookOpen },
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key as any)}
                  className={`w-full flex items-center justify-between px-6 py-3.5 transition-all text-left font-semibold text-sm cursor-pointer ${
                    isActive
                      ? 'sidebar-active text-[#00dbe9]'
                      : 'text-[#b9cacb] hover:bg-white/5 hover:text-white hover:translate-x-1'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <Icon className={`w-4.5 h-4.5 shrink-0 ${isActive ? 'text-[#00dbe9]' : 'text-[#b9cacb]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.isNew && (
                    <span className="bg-[#dbfcff]/20 text-[#dbfcff] text-[10px] px-1.5 py-0.5 rounded-md font-bold border border-[#dbfcff]/20">
                      NEW
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-white/5 space-y-1">
          <button
            onClick={() => setActiveTab('ai')}
            className="w-full flex items-center gap-4 px-6 py-3 text-[#b9cacb] hover:text-[#00dbe9] transition-all text-left text-sm cursor-pointer font-semibold"
          >
            <Bell className="w-4.5 h-4.5 shrink-0" />
            <span>Notifications</span>
          </button>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-6 py-3 text-red-400/80 hover:text-red-400 transition-all text-left text-sm cursor-pointer font-semibold"
          >
            <LogOut className="w-4.5 h-4.5 shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 min-w-0 flex flex-col pb-24 lg:pb-0">
        
        {/* Top App Bar Header */}
        <header className="h-20 glass-panel border-b border-white/5 flex items-center justify-between px-6 lg:px-12 sticky top-0 z-30">
          
          {/* Mobile Menu Button / Logo */}
          <div className="flex items-center gap-4 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="text-lg font-bold text-[#dbfcff] tracking-tighter flex items-center gap-1.5 select-none font-headline-md">
              <Zap className="w-5 h-5 text-[#00dbe9] neon-glow shrink-0" />
              <span>NovaAI</span>
            </div>
          </div>

          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#b9cacb] group-focus-within:text-[#00dbe9] transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search solar insights, government rebates..."
                className="w-full bg-[#0a0b0d]/50 border border-white/10 rounded-full py-2.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-[#00dbe9]/20 focus:border-[#00dbe9] transition-all text-sm text-white"
              />
            </div>
          </div>

          {/* User profile actions */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Notifications Button */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all text-[#b9cacb] hover:text-brand-cyan"
              >
                <Bell className="w-4.5 h-4.5" />
                {notifications.some(n => n.active) && (
                  <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-brand-cyan rounded-full" />
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-3 w-80 bg-[#12151d] border border-white/10 rounded-2xl p-4 shadow-2xl z-50 text-xs"
                  >
                    <div className="flex justify-between items-center pb-2 border-b border-white/5 mb-2">
                      <span className="font-bold text-white uppercase tracking-wider">Recent Activity</span>
                      <button 
                        onClick={() => setNotifications(prev => prev.map(n => ({ ...n, active: false })))}
                        className="text-brand-cyan hover:underline font-semibold"
                      >
                        Mark read
                      </button>
                    </div>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {notifications.map(noti => (
                        <div key={noti.id} className="flex gap-3 text-left p-1 rounded hover:bg-white/5 transition-all">
                          <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${noti.active ? 'bg-brand-cyan' : 'bg-white/20'}`} />
                          <div className="flex-1">
                            <p className="text-white font-semibold">{noti.text}</p>
                            <span className="text-[10px] text-brand-gray/60 block mt-0.5">{noti.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Avatar Card */}
            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              <div className="text-right hidden sm:block">
                <div className="font-semibold text-sm text-white">{user.fullName}</div>
                <div className="text-xs text-[#b9cacb]/80 font-mono tracking-tight">{user.location}</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-brand-cyan p-[1.5px] flex items-center justify-center overflow-hidden shrink-0">
                <img 
                  className="w-full h-full object-cover rounded-full" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbII2hnjb_GIVacmaJlTopOvprJevADjqyeJUxL5MQsBBQw6zpSjBlAjzGvKABkhIhMlC4yO1lZ2hvgqx7XCQ2cmtYWGcKxONGM9FGt_c99qn0XyJX4tZCVWxd7aPhiZTFwG5bTHT9TRE2RLNg3sDi4KSLfGkGEE6deihYUsj5pF8cEEa_yRTa1NgSCgybu9WRjD3njGf1Ed2XBsi_d4z0Mk9fTGK9gf_77IExkmghF4e9vBxCQ0zo5Q"
                  alt="Avatar"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="fixed inset-0 z-40 bg-[#0d0f14] lg:hidden pt-20 flex flex-col p-6 w-72 border-r border-white/10"
            >
              <div className="space-y-2 mt-4">
                {[
                  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                  { key: 'ai', label: 'AI Assistant', icon: Bot },
                  { key: 'nearby', label: 'Nearby Solar', icon: Map },
                  { key: 'calculator', label: 'Calculator', icon: Calculator },
                  { key: 'schemes', label: 'Gov Schemes', icon: Building },
                  { key: 'quotations', label: 'Quotations', icon: FileText },
                  { key: 'vendors', label: 'Saved Vendors', icon: Bookmark },
                  { key: 'learning', label: 'Learning Hub', icon: BookOpen },
                ].map(item => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => {
                        setActiveTab(item.key as any);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-semibold text-sm transition-all text-left cursor-pointer ${
                        isActive
                          ? 'bg-[#00dbe9]/10 text-[#00dbe9] border-l-2 border-[#00dbe9]'
                          : 'text-[#b9cacb] hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4.5 h-4.5 shrink-0" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-auto border-t border-white/5 pt-6 space-y-2">
                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-4 px-4 py-3 text-red-400/80 hover:text-red-400 font-semibold transition-all text-left text-sm"
                >
                  <LogOut className="w-4.5 h-4.5" />
                  <span>Logout</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Inner Tab Canvas Content */}
        <div className="p-6 lg:p-12 max-w-7xl mx-auto w-full flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-10"
            >
              
              {/* TAB 1: OVERVIEW DASHBOARD */}
              {activeTab === 'dashboard' && (
                <>
                  {/* Hero Section */}
                  <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center reveal-item">
                    <div className="lg:col-span-7 space-y-6 text-left">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dbfcff]/10 border border-[#dbfcff]/20 text-[#dbfcff] text-xs font-bold uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#dbfcff] animate-pulse"></span>
                        AI Analysis Live
                      </div>
                      <h1 className="font-headline-xl text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-white">
                        Good Morning, <br/><span className="text-[#dbfcff] font-bold italic">{user.fullName.split(' ')[0]} 👋</span>
                      </h1>
                      <p className="text-[#b9cacb] text-base md:text-lg max-w-xl font-medium leading-relaxed">
                        Welcome back to your AI-powered solar dashboard. Your energy ecosystem is performing at <span className="shimmer-text font-bold text-[#00dbe9]">98% efficiency</span> today.
                      </p>
                    </div>
                    <div className="lg:col-span-5 relative">
                      <div className="premium-card p-6 rounded-2xl relative overflow-hidden group float-anim">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#dbfcff]/10 rounded-full blur-3xl group-hover:bg-[#dbfcff]/20 transition-all"></div>
                        <img 
                          className="w-full h-auto rounded-xl shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-105" 
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDUfq4VOrB8Zf6xqJnrwgnUmn_AxEnzKVr4_Jy5Lo_xC7t5rxTAkKXRwoDYQMxLTAUjZubsha4OUhBIP-BpxxbhMsSe20U8SxssxcDVl7Ge2rO6WYsN-tqgF26JVyU13Ox2FWf8_k-qQ47mN4xldO1_9-roTqfPJRwR9AXXJ-mBxyIl0z9-s1bpyBeC8YZnhlyxqw8cIz42lhL4SgVTDFhJBrxuhxNLfLixfmGWxvR2rGOvGQJpai9wA"
                          alt="Solar Panel Setup"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute bottom-4 right-4 z-20 glass-panel px-4 py-2 rounded-lg flex items-center gap-2 border-[#dbfcff]/30">
                          <Zap className="w-4 h-4 text-[#00dbe9] neon-glow" />
                          <span className="text-xs font-bold text-white">{calculatedCapacity.toFixed(1)} kW Active</span>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Insights Stats */}
                  <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="premium-card rounded-2xl space-y-6 p-8 hover:scale-105 transition-all text-left">
                      <div className="flex justify-between items-start">
                        <DollarSign className="w-8 h-8 text-[#00dbe9] neon-glow" />
                        <div className="text-right">
                          <div className="text-[#dbfcff] text-xs font-bold">+12% vs last mo</div>
                          <svg className="w-20 h-8 mt-1 text-[#00dbe9]/50" viewBox="0 0 100 40">
                            <path className="sparkline" d="M0,35 Q10,32 20,28 T40,25 T60,18 T80,12 T100,5"></path>
                          </svg>
                        </div>
                      </div>
                      <div>
                        <div className="text-[#b9cacb] text-xs uppercase tracking-wider font-semibold opacity-70">Monthly Savings</div>
                        <div className="text-2xl lg:text-3xl font-bold text-white mt-1">₹{(monthlyBill * 83).toLocaleString('en-IN', {maximumFractionDigits: 0})}</div>
                      </div>
                    </div>

                    <div className="premium-card rounded-2xl space-y-6 p-8 hover:scale-105 transition-all text-left">
                      <div className="flex justify-between items-start">
                        <Zap className="w-8 h-8 text-[#ecb2ff] neon-glow" />
                        <div className="text-right">
                          <div className="text-[#ecb2ff] text-xs font-bold">Perfect Fit</div>
                          <svg className="w-20 h-8 mt-1 text-[#ecb2ff]/50" viewBox="0 0 100 40">
                            <path className="sparkline" d="M0,38 Q20,35 40,30 T70,15 T100,2"></path>
                          </svg>
                        </div>
                      </div>
                      <div>
                        <div className="text-[#b9cacb] text-xs uppercase tracking-wider font-semibold opacity-70">Ideal System Size</div>
                        <div className="text-2xl lg:text-3xl font-bold text-white mt-1">{calculatedCapacity.toFixed(1)} kWp <span className="text-sm font-medium opacity-70">(Recommended)</span></div>
                      </div>
                    </div>

                    <div className="premium-card rounded-2xl space-y-6 p-8 hover:scale-105 transition-all text-left">
                      <div className="flex justify-between items-start">
                        <ShieldCheck className="w-8 h-8 text-[#dbfcff] neon-glow" />
                        <span className="text-[#00dbe9] text-xs font-bold">Available Now</span>
                      </div>
                      <div>
                        <div className="text-[#b9cacb] text-xs uppercase tracking-wider font-semibold opacity-70">Subsidy Eligibility</div>
                        <div className="text-2xl lg:text-3xl font-bold text-white mt-1">Up to 40%</div>
                      </div>
                    </div>
                  </section>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
                    {/* Main Content Left */}
                    <div className="lg:col-span-8 space-y-10">
                      {/* Intelligence Suite */}
                      <section>
                        <h2 className="text-xl lg:text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                          <LayoutDashboard className="w-6 h-6 text-[#00dbe9] shrink-0" />
                          Intelligence Suite
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                          {[
                            { key: 'ai', label: 'AI Assistant', icon: Bot, bg: 'bg-[#dbfcff]/10', color: 'text-[#dbfcff]' },
                            { key: 'nearby', label: 'Nearby Solar', icon: Map, bg: 'bg-[#ecb2ff]/10', color: 'text-[#ecb2ff]' },
                            { key: 'calculator', label: 'Cost Calculator', icon: Calculator, bg: 'bg-[#dbfcff]/10', color: 'text-[#dbfcff]' },
                            { key: 'schemes', label: 'Gov Schemes', icon: Building, bg: 'bg-[#dbfcff]/10', color: 'text-[#00dbe9]' },
                            { key: 'quotations', label: 'Quotations', icon: FileText, bg: 'bg-[#dbfcff]/15', color: 'text-[#dbfcff]' },
                            { key: 'vendors', label: 'Saved Vendors', icon: Bookmark, bg: 'bg-[#b9cacb]/10', color: 'text-[#b9cacb]' },
                          ].map((item) => {
                            const Icon = item.icon;
                            return (
                              <button
                                key={item.key}
                                onClick={() => setActiveTab(item.key as any)}
                                className="premium-card rounded-2xl group flex flex-col items-center justify-center text-center space-y-3 p-8 intelligence-card cursor-pointer"
                              >
                                <div className={`w-16 h-16 rounded-xl ${item.bg} flex items-center justify-center ${item.color} transition-transform icon-float`}>
                                  <Icon className="w-8 h-8 neon-glow shrink-0" />
                                </div>
                                <span className="font-bold text-white text-base">{item.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </section>

                      {/* Top Rated Installers */}
                      <section className="space-y-6">
                        <div className="flex justify-between items-end">
                          <h2 className="text-xl lg:text-2xl font-bold flex items-center gap-3 text-white">
                            <Store className="w-6 h-6 text-[#00dbe9] shrink-0" />
                            Top Rated Installers
                          </h2>
                          <button
                            onClick={() => setActiveTab('nearby')}
                            className="text-[#00dbe9] text-xs font-bold flex items-center gap-2 hover:underline cursor-pointer"
                          >
                            Explore all
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="space-y-4">
                          {vendors.slice(0, 3).map(vendor => (
                            <div key={vendor.id} className="premium-card p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6 group">
                              <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/5 overflow-hidden shadow-lg">
                                <img 
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                  src={vendor.image} 
                                  alt={vendor.name}
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                              <div className="flex-1 text-center md:text-left space-y-1">
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                                  <h3 className="text-lg font-bold text-white">{vendor.name}</h3>
                                  {vendor.verified && (
                                    <span className="px-2 py-0.5 rounded bg-[#00dbe9]/10 text-[#00dbe9] border border-[#00dbe9]/20 text-[10px] uppercase font-bold flex items-center gap-1">
                                      <ShieldCheck className="w-3.5 h-3.5 text-[#00dbe9]" /> Verified
                                    </span>
                                  )}
                                </div>
                                <p className="text-[#b9cacb] text-sm font-medium leading-relaxed">{vendor.desc}</p>
                                <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
                                  <div className="flex items-center text-yellow-400 text-xs font-semibold">
                                    <Star className="w-3.5 h-3.5 fill-current mr-1" />
                                    <span>{vendor.rating} ({vendor.reviews}+ reviews)</span>
                                  </div>
                                  <div className="flex items-center text-[#b9cacb] text-xs">
                                    <MapPin className="w-3.5 h-3.5 mr-1" />
                                    <span>{vendor.distance} miles away</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <button 
                                  onClick={() => handleRequestQuote(vendor.name)}
                                  className="px-5 py-2.5 rounded-xl bg-[#00dbe9] text-black text-xs font-bold hover:shadow-[0_0_20px_rgba(0,219,233,0.4)] transition-all whitespace-nowrap shadow-md cursor-pointer"
                                >
                                  Request Quote
                                </button>
                                <button 
                                  onClick={() => handleToggleSaveVendor(vendor.id)}
                                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all cursor-pointer"
                                  title={vendor.saved ? "Remove Bookmark" : "Save Installer"}
                                >
                                  <Bookmark className={`w-4 h-4 ${vendor.saved ? 'fill-current text-[#00dbe9]' : ''}`} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                    </div>

                    {/* Right Sidepanel */}
                    <div className="lg:col-span-4 space-y-8">
                      {/* AI Assistant Tip Card */}
                      <div className="premium-card p-8 rounded-2xl border-[#00dbe9]/30 relative overflow-hidden text-left">
                        <div className="absolute top-0 right-0 p-4">
                          <Sparkles className="w-5 h-5 text-[#00dbe9]/40 animate-pulse" />
                        </div>
                        <h3 className="text-lg mb-4 flex items-center gap-2 font-bold text-white">
                          AI Assistant Tip
                        </h3>
                        <p className="text-[#b9cacb] text-sm italic border-l-2 border-[#00dbe9] pl-4 mb-6 font-medium leading-relaxed">
                          "Based on your roof's 245° SW orientation, you can maximize ROI by installing an East-West configuration to capture evening energy spikes."
                        </p>
                        <button 
                          onClick={() => setActiveTab('ai')}
                          className="w-full py-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-xs font-bold text-white cursor-pointer"
                        >
                          Ask a Question
                        </button>
                      </div>

                      {/* Recent Activity */}
                      <section className="premium-card p-8 rounded-2xl min-h-[400px] text-left">
                        <h3 className="text-xs uppercase tracking-widest text-[#b9cacb] mb-8 font-bold opacity-60">Recent Activity</h3>
                        <div className="space-y-8">
                          {notifications.map((noti, idx) => (
                            <div key={noti.id || idx} className="flex gap-4 group">
                              <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${noti.active ? 'bg-[#00f2ff] pulse-indicator' : 'bg-white/20'}`} />
                              <div className="space-y-1">
                                <div className="font-bold text-white group-hover:text-[#00f2ff] transition-colors text-sm">
                                  {noti.type === 'quote' ? 'Quotation Updated' : noti.type === 'milestone' ? 'Savings Milestone' : 'New Scheme Alert'}
                                </div>
                                <div className="text-xs text-[#b9cacb] font-medium leading-relaxed">{noti.text}</div>
                                <div className="text-[10px] text-[#b9cacb]/50 uppercase mt-1 font-bold tracking-wider">{noti.time}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>

                      {/* Gov Updates Card */}
                      <div className="premium-card p-8 rounded-2xl bg-gradient-to-br from-[#dbfcff]/10 via-transparent to-transparent text-left">
                        <h3 className="text-lg mb-3 font-bold text-white">Government Updates</h3>
                        <p className="text-[#b9cacb] text-xs mb-6 font-medium leading-relaxed">Stay informed on the latest green energy policies and tax exemptions.</p>
                        <ul className="space-y-4">
                          <li 
                            onClick={() => setActiveTab('schemes')}
                            className="flex items-start gap-3 group cursor-pointer"
                          >
                            <FileText className="w-4 h-4 text-[#00dbe9] mt-1 group-hover:translate-x-1 transition-transform shrink-0" />
                            <span className="text-xs text-white/90 group-hover:text-[#00dbe9] font-semibold transition-colors">Net Metering Policy 2026</span>
                          </li>
                          <li 
                            onClick={() => setActiveTab('schemes')}
                            className="flex items-start gap-3 group cursor-pointer"
                          >
                            <FileText className="w-4 h-4 text-[#00dbe9] mt-1 group-hover:translate-x-1 transition-transform shrink-0" />
                            <span className="text-xs text-white/90 group-hover:text-[#00dbe9] font-semibold transition-colors">Federal Solar Tax Credit FAQ</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* TAB 2: AI CHAT ASSISTANT */}
              {activeTab === 'ai' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
                  {/* Left Column: Chat Canvas */}
                  <div className="lg:col-span-8 flex flex-col h-[550px] premium-card rounded-3xl overflow-hidden border-[#00dbe9]/20">
                    <div className="bg-white/5 px-6 py-4 border-b border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#00dbe9]/10 border border-[#00dbe9]/20 flex items-center justify-center">
                          <Bot className="w-5 h-5 text-[#00dbe9] neon-glow" />
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-sm">NovaAI Intelligent Copilot</h3>
                          <p className="text-[10px] text-green-400 flex items-center gap-1 font-mono">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
                            ONLINE / ORBITAL MODEL ACTIVE
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-[#b9cacb]/60 font-mono">LUMINA PROTOCOL V4</span>
                    </div>

                    {/* Messages Panel */}
                    <div className="flex-1 p-6 overflow-y-auto space-y-4">
                      {messages.map(msg => (
                        <div 
                          key={msg.id}
                          className={`flex gap-3 max-w-lg ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                            msg.sender === 'user' 
                              ? 'bg-gradient-to-r from-[#00dbe9] to-[#cf5cff] text-black text-xs font-bold' 
                              : 'bg-white/5 text-[#00dbe9]'
                          }`}>
                            {msg.sender === 'user' ? user.fullName[0].toUpperCase() : <Bot className="w-4 h-4" />}
                          </div>
                          <div className={`p-4 rounded-2xl text-sm ${
                            msg.sender === 'user'
                              ? 'bg-gradient-to-r from-[#00dbe9]/20 to-[#cf5cff]/20 border border-[#00dbe9]/20 text-white rounded-tr-none'
                              : 'bg-white/5 border border-white/5 text-[#b9cacb] rounded-tl-none'
                          }`}>
                            <p className="leading-relaxed">{msg.text}</p>
                            <span className="text-[10px] text-brand-gray/50 block text-right mt-1.5">{msg.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Chat Input form */}
                    <form onSubmit={handleSendMessage} className="p-4 bg-[#0d0f14] border-t border-white/5 flex gap-2">
                      <input
                        type="text"
                        value={inputMsg}
                        onChange={(e) => setInputMsg(e.target.value)}
                        placeholder="Ask about installation costs, tax credits, optimal roof tilt..."
                        className="flex-1 bg-[#12151d] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-brand-gray/50 focus:outline-none focus:border-[#00dbe9]"
                      />
                      <button 
                        type="submit"
                        className="p-3 rounded-xl bg-[#00dbe9] text-black hover:brightness-110 active:scale-95 transition-all shadow-[0_0_15px_rgba(0,242,255,0.2)]"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </div>

                  {/* Right Column: Prompt templates & recommendations */}
                  <div className="lg:col-span-4 space-y-6">
                    <div className="premium-card p-6 rounded-2xl space-y-4">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#00dbe9]" />
                        Smart Recommendation Prompts
                      </h4>
                      <p className="text-xs text-[#b9cacb]/80 leading-relaxed">
                        Click any prompt query to automatically send it to the intelligent energy analysis model:
                      </p>
                      <div className="space-y-2">
                        {[
                          'What is the standard solar payback period in my area?',
                          'What are the active federal subsidies and government schemes?',
                          'Should I install batteries or rely entirely on net metering?',
                          'Draft a quote request for Lumina Sun Solutions.'
                        ].map((prompt, index) => (
                          <button
                            key={index}
                            onClick={() => handleSendMessage(undefined, prompt)}
                            className="w-full text-left p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#00dbe9]/30 hover:bg-white/10 text-xs text-white transition-all block"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: NEARBY SOLAR INSTALLERS */}
              {activeTab === 'nearby' && (
                <div className="space-y-6 text-left">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white">Solar Installer Registry</h2>
                      <p className="text-sm text-[#b9cacb]">Verified Tier-1 local panel installation companies near {user.location}.</p>
                    </div>
                    <div className="text-xs font-mono bg-white/5 border border-white/5 px-4 py-2 rounded-xl text-[#00dbe9]">
                      SATELLITE SYNC: ACTIVE / {user.location.toUpperCase()} REGION
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div className="relative flex-1">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#b9cacb]" />
                      <input 
                        type="text"
                        value={nearbySearch}
                        onChange={(e) => setNearbySearch(e.target.value)}
                        placeholder="Search installers by name or specialties..."
                        className="w-full bg-[#0d1117] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#00f2ff]"
                      />
                    </div>
                    <div className="flex gap-2 overflow-x-auto">
                      {[
                        { key: 'all', label: 'All Partners' },
                        { key: 'verified', label: '🏆 Verified' },
                        { key: 'saved', label: '📌 Bookmarks' }
                      ].map((pill) => (
                        <button
                          key={pill.key}
                          onClick={() => setNearbyFilter(pill.key as any)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border whitespace-nowrap cursor-pointer ${
                            nearbyFilter === pill.key
                              ? 'bg-brand-cyan/10 border-brand-cyan text-brand-cyan'
                              : 'bg-transparent border-white/5 text-[#b9cacb] hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          {pill.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* List of installers */}
                    <div className="lg:col-span-8 space-y-4">
                      {(() => {
                        const filtered = vendors.filter(v => {
                          const matchesSearch = v.name.toLowerCase().includes(nearbySearch.toLowerCase()) || 
                                                v.desc.toLowerCase().includes(nearbySearch.toLowerCase());
                          const matchesFilter = nearbyFilter === 'all' 
                            || (nearbyFilter === 'verified' && v.verified)
                            || (nearbyFilter === 'saved' && v.saved);
                          return matchesSearch && matchesFilter;
                        });

                        if (filtered.length === 0) {
                          return (
                            <div className="premium-card p-12 rounded-2xl text-center space-y-3">
                              <HelpCircle className="w-10 h-10 text-brand-gray/40 mx-auto animate-bounce" />
                              <p className="text-sm font-bold text-white">No local installers found</p>
                              <p className="text-xs text-[#b9cacb]/60">Try resetting your search query or switching to 'All Partners'.</p>
                              <button 
                                onClick={() => { setNearbySearch(''); setNearbyFilter('all'); }}
                                className="text-xs text-[#00f2ff] hover:underline font-bold"
                              >
                                Reset search criteria
                              </button>
                            </div>
                          );
                        }

                        return filtered.map(vendor => (
                          <div key={vendor.id} className="premium-card p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-center">
                            <img 
                              src={vendor.image} 
                              alt={vendor.name} 
                              className="w-24 h-24 rounded-2xl object-cover border border-white/5 shrink-0"
                              referrerPolicy="no-referrer"
                            />
                            <div className="flex-1 space-y-2 text-center md:text-left">
                              <div className="flex flex-wrap gap-2 items-center justify-center md:justify-start">
                                <h3 className="text-xl font-bold text-white">{vendor.name}</h3>
                                {vendor.verified && (
                                  <span className="px-2 py-0.5 rounded bg-brand-cyan/10 border border-brand-cyan/20 text-[10px] text-brand-cyan font-bold uppercase tracking-wider flex items-center gap-1">
                                    <ShieldCheck className="w-3.5 h-3.5 text-brand-cyan" /> Verified Partner
                                  </span>
                                )}
                              </div>
                              <p className="text-[#b9cacb] text-sm font-medium">{vendor.desc}</p>
                              
                              <div className="flex flex-wrap gap-4 text-xs text-[#b9cacb]/80 justify-center md:justify-start pt-1">
                                <span className="flex items-center text-yellow-400 font-semibold">
                                  <Star className="w-4 h-4 fill-current mr-1" />
                                  {vendor.rating} ({vendor.reviews} reviews)
                                </span>
                                <span className="flex items-center">
                                  <MapPin className="w-4 h-4 mr-1 text-brand-cyan" />
                                  {vendor.distance} miles away ({user.location})
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex flex-row md:flex-col gap-2 shrink-0 w-full md:w-auto">
                              <button 
                                onClick={() => handleRequestQuote(vendor.name)}
                                className="flex-1 px-5 py-3 rounded-xl bg-brand-cyan text-brand-black font-bold text-xs hover:brightness-110 active:scale-95 transition-all text-center whitespace-nowrap shadow-md cursor-pointer"
                              >
                                Request Quote
                              </button>
                              <button 
                                onClick={() => handleToggleSaveVendor(vendor.id)}
                                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-xs transition-all text-center cursor-pointer"
                              >
                                {vendor.saved ? '📌 Bookmarked' : 'Save'}
                              </button>
                            </div>
                          </div>
                        ));
                      })()}
                    </div>

                    {/* Satellite Map Preview Box */}
                    <div className="lg:col-span-4">
                      <div className="premium-card p-6 rounded-2xl space-y-4">
                        <h3 className="font-bold text-white text-sm flex items-center gap-2">
                          <Map className="w-4.5 h-4.5 text-[#00dbe9]" />
                          Satellite Location Mapping
                        </h3>
                        <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                          <img 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuALNY112M2qzisJQjvwINsLl0vdPc48yzIYJIX5eRW-ZGZBzP7frvdKns1DMxWlTdr1o6jEPe-2EiYo8afT5VxxiBbc9EFuI6NapPwK9Xpr8g1WtkDmOrlDyglHJD1k51uFsnxny6FpbNPfMJtyLn81FBB3B9H7APXED5RRg1J3Lw0Cjcn6oy7egqjm-mxmAxp0lyT82uzcPsm7e6EcSSObZE2-UTE7eg83sWEl01_3_2kgF7vXtE2Eig" 
                            alt="Satellite Map Grid" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e14] via-transparent to-transparent pointer-events-none" />
                          <div className="absolute bottom-4 left-4 z-10 bg-black/70 backdrop-blur-md border border-[#00dbe9]/30 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-[10px] font-mono text-[#00dbe9]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00dbe9] animate-ping" />
                            GPS ACTIVE
                          </div>
                        </div>
                        <p className="text-xs text-[#b9cacb]/80 leading-relaxed text-center">
                          Areal solar incidence coordinates scanned for <strong className="text-white">{user.location}</strong>. High solar irradiance index confirmed.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: ADVANCED ROI COST CALCULATOR */}
              {activeTab === 'calculator' && (
                <div className="space-y-6 text-left">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Interactive Solar Cost &amp; ROI Simulator</h2>
                    <p className="text-sm text-[#b9cacb]">Input your custom residential attributes to model precise solar economics.</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Input Sliders */}
                    <div className="lg:col-span-5 space-y-6">
                      <div className="premium-card p-6 rounded-2xl space-y-6">
                        <h3 className="font-bold text-white text-sm border-b border-white/5 pb-2 flex justify-between items-center">
                          <span>Simulator Attributes</span>
                          <span className="text-[10px] text-[#00dbe9] font-mono">CALC V2.4</span>
                        </h3>
                        
                        {/* Quick Presets Selectors */}
                        <div className="space-y-2">
                          <span className="text-[10px] font-bold text-brand-cyan uppercase tracking-wider">Quick Preset Profiles</span>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { label: 'Eco Townhouse', bill: 90, roof: 200, sunlight: 4.5, icon: '🏡', desc: 'Compact footprint' },
                              { label: 'Suburban Family', bill: 180, roof: 450, sunlight: 5.2, icon: '🏠', desc: 'Balanced average' },
                              { label: 'High Yield Estate', bill: 380, roof: 900, sunlight: 6.2, icon: '🏰', desc: 'Max coverage' }
                            ].map((p, idx) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  setMonthlyBill(p.bill);
                                  setRoofArea(p.roof);
                                  setSunlightHours(p.sunlight);
                                  showToast(`Applied "${p.label}" presets successfully!`, 'info');
                                }}
                                type="button"
                                className="p-2 rounded-xl bg-white/5 border border-white/5 hover:border-[#00dbe9]/40 hover:bg-white/10 text-left transition-all group cursor-pointer"
                              >
                                <div className="text-base mb-0.5">{p.icon}</div>
                                <div className="text-[10px] font-black text-white group-hover:text-[#00dbe9] transition-colors truncate">{p.label}</div>
                                <div className="text-[8px] text-[#b9cacb]/60 truncate leading-none mt-0.5">{p.desc}</div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Monthly Electric Bill Input */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs font-semibold text-[#b9cacb]">
                            <span>Monthly Electric Bill</span>
                            <span className="text-brand-cyan">${monthlyBill} / mo</span>
                          </div>
                          <input 
                            type="range" 
                            min="50" 
                            max="800" 
                            step="10"
                            value={monthlyBill}
                            onChange={(e) => setMonthlyBill(Number(e.target.value))}
                            className="w-full accent-brand-cyan bg-white/10 h-1.5 rounded-full appearance-none cursor-pointer"
                          />
                          <span className="text-[10px] text-[#b9cacb]/60 flex justify-between">
                            <span>$50</span>
                            <span>$800</span>
                          </span>
                        </div>

                        {/* Available Roof Area */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs font-semibold text-[#b9cacb]">
                            <span>Usable Roof Area</span>
                            <span className="text-brand-cyan">{roofArea} sq ft</span>
                          </div>
                          <input 
                            type="range" 
                            min="100" 
                            max="1500" 
                            step="20"
                            value={roofArea}
                            onChange={(e) => setRoofArea(Number(e.target.value))}
                            className="w-full accent-brand-cyan bg-white/10 h-1.5 rounded-full appearance-none cursor-pointer"
                          />
                          <span className="text-[10px] text-[#b9cacb]/60 flex justify-between">
                            <span>100 sq ft</span>
                            <span>1500 sq ft</span>
                          </span>
                        </div>

                        {/* Daily sunlight hours */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs font-semibold text-[#b9cacb]">
                            <span>Avg Sunlight Exposure</span>
                            <span className="text-brand-cyan">{sunlightHours} hrs / day</span>
                          </div>
                          <input 
                            type="range" 
                            min="3.0" 
                            max="8.0" 
                            step="0.1"
                            value={sunlightHours}
                            onChange={(e) => setSunlightHours(Number(e.target.value))}
                            className="w-full accent-brand-cyan bg-white/10 h-1.5 rounded-full appearance-none cursor-pointer"
                          />
                          <span className="text-[10px] text-[#b9cacb]/60 flex justify-between">
                            <span>3.0 hrs</span>
                            <span>8.0 hrs</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Calculations Outputs */}
                    <div className="lg:col-span-7 space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="premium-card p-6 rounded-2xl space-y-2">
                          <span className="text-xs text-[#b9cacb]/80 block">Recommended Capacity</span>
                          <span className="text-3xl font-bold text-brand-cyan">{calculatedCapacity.toFixed(1)} kWp</span>
                          <p className="text-[10px] text-[#b9cacb]/60 leading-normal">Optimally sized to offset approximately 90% of your energy footprint.</p>
                        </div>
                        
                        <div className="premium-card p-6 rounded-2xl space-y-2">
                          <span className="text-xs text-[#b9cacb]/80 block">Estimated System Cost</span>
                          <span className="text-3xl font-bold text-white">${estimatedCost.toLocaleString('en-US', {maximumFractionDigits: 0})}</span>
                          <p className="text-[10px] text-[#b9cacb]/60 leading-normal">Based on average local high-efficiency panel and inverter pricing.</p>
                        </div>

                        <div className="premium-card p-6 rounded-2xl space-y-2">
                          <span className="text-xs text-[#b9cacb]/80 block">Gov Investment Credit (Rebate)</span>
                          <span className="text-3xl font-bold text-green-400">-${subsidyAmount.toLocaleString('en-US', {maximumFractionDigits: 0})}</span>
                          <p className="text-[10px] text-green-400/80 leading-normal">Federal ITC reduces direct investment requirements by 40% immediately.</p>
                        </div>

                        <div className="premium-card p-6 rounded-2xl space-y-2">
                          <span className="text-xs text-[#b9cacb]/80 block">Net Out-of-pocket Cost</span>
                          <span className="text-3xl font-bold text-brand-cyan">${finalCost.toLocaleString('en-US', {maximumFractionDigits: 0})}</span>
                          <p className="text-[10px] text-[#b9cacb]/60 leading-normal">Your actual customized solar capital cost after state/federal offsets.</p>
                        </div>
                      </div>

                      <div className="premium-card p-6 rounded-2xl bg-gradient-to-br from-brand-cyan/5 via-transparent to-transparent space-y-4">
                        <h4 className="text-base font-bold text-white flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-brand-cyan" />
                          Lifetime Financial Projections
                        </h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                          <div className="space-y-1">
                            <span className="text-xs text-[#b9cacb]/80 block">Yearly Utility Cost Savings</span>
                            <span className="text-2xl font-bold text-white">${yearlySavings.toLocaleString('en-US', {maximumFractionDigits: 0})} / yr</span>
                          </div>
                          
                          <div className="space-y-1">
                            <span className="text-xs text-[#b9cacb]/80 block">Simulated Payback Period</span>
                            <span className="text-2xl font-bold text-brand-cyan">{paybackYears.toFixed(1)} Years</span>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-white/5 flex gap-2">
                          <button 
                            onClick={() => {
                              setActiveTab('nearby');
                              alert("Redirecting to local installer network to submit these dynamic calculator requirements.");
                            }}
                            className="px-6 py-3 rounded-xl bg-[#00dbe9] text-black font-bold text-xs hover:shadow-[0_0_20px_rgba(0,242,255,0.3)] transition-all"
                          >
                            Find Installer for this System
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: GOVERNMENT SCHEMES */}
              {activeTab === 'schemes' && (
                <div className="space-y-6 text-left">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Active Government Incentives &amp; Subsidies</h2>
                    <p className="text-sm text-[#b9cacb]">Explore federal, state, and utility-specific policies for renewable development.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="premium-card p-6 rounded-2xl space-y-4">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-green-400/10 text-green-400 border border-green-400/20 text-[10px] font-bold uppercase tracking-wider">
                        Federal Scheme
                      </div>
                      <h3 className="text-lg font-bold text-white">Federal Residential Clean Energy Credit (ITC)</h3>
                      <p className="text-xs text-[#b9cacb]/90 leading-relaxed font-medium">
                        Allows home owners to deduct up to 30-40% of their complete solar installation costs from federal taxes. Applies to solar panel arrays, inverters, and standalone home battery backups.
                      </p>
                      <div className="border-t border-white/5 pt-3 flex justify-between items-center text-xs">
                        <span className="text-brand-cyan font-semibold">Active through 2032</span>
                        <a href="https://www.energy.gov" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1 text-brand-cyan">
                          IRS Form 5695 <ArrowRight className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    <div className="premium-card p-6 rounded-2xl space-y-4">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-purple-400/10 text-purple-400 border border-purple-400/20 text-[10px] font-bold uppercase tracking-wider">
                        State Rebates
                      </div>
                      <h3 className="text-lg font-bold text-white">SGIP Smart Battery Storage Subsidies</h3>
                      <p className="text-xs text-[#b9cacb]/90 leading-relaxed font-medium">
                        Provides massive incentives and up to 40% rebate offsets for installing qualifying smart home lithium-ion batteries. Enhances resilience against seasonal electrical blackouts.
                      </p>
                      <div className="border-t border-white/5 pt-3 flex justify-between items-center text-xs">
                        <span className="text-purple-400 font-semibold">Limited Funding Available</span>
                        <button className="text-brand-cyan hover:underline flex items-center gap-1 bg-transparent border-none">
                          Check Eligibility <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="premium-card p-6 rounded-2xl space-y-4">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20 text-[10px] font-bold uppercase tracking-wider">
                        Utility Incentive
                      </div>
                      <h3 className="text-lg font-bold text-white">Net Energy Metering 3.0 (NEM)</h3>
                      <p className="text-xs text-[#b9cacb]/90 leading-relaxed font-medium">
                        Sell excess solar energy generated during premium sunlight hours back into your municipal utility grid in exchange for credits. Offsets standard winter utility costs.
                      </p>
                      <div className="border-t border-white/5 pt-3 flex justify-between items-center text-xs">
                        <span className="text-brand-cyan font-semibold">Available locally</span>
                        <button className="text-brand-cyan hover:underline flex items-center gap-1 bg-transparent border-none">
                          Policy Guide <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: QUOTATIONS TRACKER */}
              {activeTab === 'quotations' && (
                <div className="space-y-6 text-left">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold text-white">Quotations &amp; Proposals</h2>
                      <p className="text-sm text-[#b9cacb]">Track, compare, and execute pending agreements with partner solar developers.</p>
                    </div>
                    <button 
                      onClick={() => setActiveTab('nearby')}
                      className="px-4 py-2 bg-brand-cyan text-brand-black rounded-xl font-bold text-xs hover:brightness-110 active:scale-95 transition-all shadow-md"
                    >
                      Request New Quote
                    </button>
                  </div>

                  <div className="premium-card rounded-2xl overflow-hidden border-white/5">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-white/5 border-b border-white/5 text-xs text-[#b9cacb] uppercase tracking-wider">
                            <th className="p-4 font-bold">Quote ID</th>
                            <th className="p-4 font-bold">Installer Name</th>
                            <th className="p-4 font-bold">Recommended Size</th>
                            <th className="p-4 font-bold">Estimated Cost</th>
                            <th className="p-4 font-bold">Savings</th>
                            <th className="p-4 font-bold">Date Received</th>
                            <th className="p-4 font-bold text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-xs">
                          {quotations.map(quote => (
                            <tr key={quote.id} className="hover:bg-white/5 transition-colors">
                              <td className="p-4 font-mono font-bold text-white">{quote.id}</td>
                              <td className="p-4 font-semibold text-brand-cyan">{quote.vendor}</td>
                              <td className="p-4 font-mono">{quote.systemSize}</td>
                              <td className="p-4 text-white font-semibold">{quote.estimatedCost}</td>
                              <td className="p-4 text-green-400 font-semibold">{quote.savings}</td>
                              <td className="p-4 text-[#b9cacb]">{quote.date}</td>
                              <td className="p-4 text-right">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  quote.status === 'Approved & Signed' ? 'bg-green-400/10 text-green-400 border border-green-400/20' : 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20'
                                }`}>
                                  {quote.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 7: SAVED VENDORS */}
              {activeTab === 'vendors' && (
                <div className="space-y-6 text-left">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Bookmarked Providers</h2>
                    <p className="text-sm text-[#b9cacb]">Manage your short-listed solar contractors and installer teams.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {vendors.filter(v => v.saved).length === 0 ? (
                      <div className="p-10 premium-card rounded-2xl text-center col-span-2 text-[#b9cacb]/60">
                        <Bookmark className="w-10 h-10 mx-auto text-[#b9cacb]/40 mb-3" />
                        No saved vendors. Go to Nearby Solar to bookmark contractors.
                      </div>
                    ) : (
                      vendors.filter(v => v.saved).map(vendor => (
                        <div key={vendor.id} className="premium-card p-6 rounded-2xl flex gap-4">
                          <img 
                            src={vendor.image} 
                            alt={vendor.name} 
                            className="w-16 h-16 rounded-xl object-cover shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1 space-y-1">
                            <h3 className="font-bold text-white text-base">{vendor.name}</h3>
                            <p className="text-xs text-[#b9cacb]/80 leading-normal line-clamp-2">{vendor.desc}</p>
                            <div className="flex justify-between items-center pt-2">
                              <span className="text-yellow-400 text-xs flex items-center">
                                <Star className="w-3.5 h-3.5 fill-current mr-1" /> {vendor.rating}
                              </span>
                              <button 
                                onClick={() => handleToggleSaveVendor(vendor.id)}
                                className="text-red-400 hover:underline text-xs bg-transparent border-none"
                              >
                                Remove bookmark
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB 8: LEARNING HUB */}
              {activeTab === 'learning' && (
                <div className="space-y-6 text-left">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Renewable Learning &amp; Academy</h2>
                    <p className="text-sm text-[#b9cacb]">Expand your knowledge on panels, energy efficiency, net metering, and batteries.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="premium-card p-6 rounded-2xl space-y-3">
                      <BookOpen className="w-8 h-8 text-brand-cyan" />
                      <h3 className="text-lg font-bold text-white">Understanding Solar Panel Efficiency Ratings</h3>
                      <p className="text-xs text-[#b9cacb] leading-relaxed">
                        Learn how Tier-1 solar panels, monocrystalline cells, and modern smart micro-inverters interact to maximize electricity production in lower sunlight conditions.
                      </p>
                      <button className="text-xs text-brand-cyan font-bold hover:underline">Read Article (5 min read) &rarr;</button>
                    </div>

                    <div className="premium-card p-6 rounded-2xl space-y-3">
                      <Zap className="w-8 h-8 text-purple-400" />
                      <h3 className="text-lg font-bold text-white">Standalone Battery Backups vs Net Metering</h3>
                      <p className="text-xs text-[#b9cacb] leading-relaxed">
                        A detailed cost/benefit breakdown between building a fully self-reliant off-grid micro-grid using batteries versus connecting to net-energy-metering policies.
                      </p>
                      <button className="text-xs text-purple-400 font-bold hover:underline">Read Article (8 min read) &rarr;</button>
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Global footer */}
        <footer className="mt-auto py-10 px-6 lg:px-12 glass-panel border-t border-white/5 text-left text-xs text-[#b9cacb]/60">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <span className="font-bold text-white">Nova Solar Customer Portal</span> - Professional Installer Platform
            </div>
            <div className="flex gap-4">
              <span className="hover:text-white transition-colors cursor-pointer">Support</span>
              <span>&bull;</span>
              <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
              <span>&bull;</span>
              <span>&copy; {new Date().getFullYear()} Nova Solar Inc.</span>
            </div>
          </div>
        </footer>

      </main>

      {/* Interactive Mobile Navigation Bottom Drawer Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 glass-panel border-t border-white/10 px-4 py-3 flex justify-between items-center z-40">
        {[
          { key: 'dashboard', label: 'Dash', icon: LayoutDashboard },
          { key: 'ai', label: 'AI', icon: Bot },
          { key: 'nearby', label: 'Solar', icon: Map },
          { key: 'calculator', label: 'Calc', icon: Calculator },
          { key: 'learning', label: 'Hub', icon: BookOpen }
        ].map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key as any)}
              className={`flex flex-col items-center gap-1.5 transition-colors select-none cursor-pointer ${
                activeTab === item.key ? 'text-brand-cyan' : 'text-[#b9cacb]'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Elegant Floating Toast Component */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 lg:bottom-8 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] border border-[#00dbe9]/30 bg-[#0c1219]/95 backdrop-blur-md max-w-sm"
          >
            <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${toast.type === 'success' ? 'bg-[#00f2ff] animate-pulse' : 'bg-amber-400'}`} />
            <p className="text-xs font-semibold text-white leading-relaxed">{toast.text}</p>
            <button 
              onClick={() => setToast(null)}
              className="ml-auto text-white/40 hover:text-white transition-colors text-xs font-bold pl-2"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}