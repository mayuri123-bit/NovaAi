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
  X,
  Pencil,
  Upload
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import OverviewTab from './OverviewTab';
import AIAssistantTab from './AiAssistantTab';
import NearbySolarTab from './NearbyVendor';
import CalculatorTab from './CalculatorTab';
import GovSchemesTab from './GovSchemesTab';
import PriceEstimateTab from './Pric/PriceEstimate';
import SavedVendorsTab from './SavedVendor';

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

  // Local user profile state for live modifications & uploadable photo
  const [currentUser, setCurrentUser] = useState({
    fullName: user.fullName,
    email: user.email,
    location: user.location,
    avatarUrl: '' // Empty by default to respect: "default main rANDOM PHoto maat dalo"
  });

  // Profile Modal states
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editName, setEditName] = useState(currentUser.fullName);
  const [editCity, setEditCity] = useState('');
  const [editState, setEditState] = useState('');
  const [editAvatarUrl, setEditAvatarUrl] = useState(currentUser.avatarUrl);

  const openProfileModal = () => {
    setEditName(currentUser.fullName);
    const parts = currentUser.location.split(',');
    setEditCity(parts[0]?.trim() || '');
    setEditState(parts[1]?.trim() || '');
    setEditAvatarUrl(currentUser.avatarUrl);
    setShowProfileModal(true);
  };

  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name
      .trim()
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast('Image size should be less than 2MB', 'info');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setEditAvatarUrl(event.target.result as string);
          showToast('Photo loaded successfully! Save changes to apply.', 'success');
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
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
    { id: 'Q-9801', vendor: 'Lumina Sun Solutions', systemSize: '8.4 kWp', estimatedCost: '₹16,500', status: 'Pending Review', date: 'Jul 05, 2026', savings: '₹482/mo' },
    { id: 'Q-9452', vendor: 'Helios Prime Energy', systemSize: '9.2 kWp', estimatedCost: '₹18,200', status: 'Approved & Signed', date: 'Jul 02, 2026', savings: '₹510/mo' }
  ]);

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'quote', text: 'Lumina Sun just revised your proposal', time: '2 hours ago', active: true },
    { id: 2, type: 'milestone', text: 'You reached ₹5,000 in lifetime savings', time: 'Yesterday', active: true },
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

  const navIconMap: Record<string, React.ElementType> = {
    dashboard: LayoutDashboard,
    ai: Bot,
    nearby: Map,
    calculator: Calculator,
    schemes: Building,
    quotations: FileText,
    vendors: Bookmark,
    learning: BookOpen,
  };

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

    // Simulated response with fun, kind, emoji-rich personality
    setTimeout(() => {
      let botResponse = `Hello friend! 🌟 That is an absolutely brilliant question! 🚀 Since you are located in beautiful ${user.location}, solar energy here is like catching free sunshine-gold on your rooftop! ☀️✨ Let me know if you want me to cook up a customized, super-powered ROI projection for you, or help you discover local solar installation wizards! 🧙‍♂️ Let's make your roof shine together! 💪🌱`;
      
      const queryLower = textToSend.toLowerCase();
      if (queryLower.includes('calculator') || queryLower.includes('cost') || queryLower.includes('invest') || queryLower.includes('price')) {
        const rupeeBill = Math.round(monthlyBill * 83);
        const rupeeCost = Math.round(finalCost * 83);
        botResponse = `Oh, let's do some fun sunshine math! 🧮☀️ Based on your current monthly power bill of ₹${rupeeBill.toLocaleString('en-IN')}, here is your tailored energy formula: We highly recommend a gorgeous ${calculatedCapacity.toFixed(1)} kW solar system! ⚡ Thanks to the super-generous 40% government subsidy scheme, your final out-of-pocket installation cost drops to just ₹${rupeeCost.toLocaleString('en-IN')}! 🎉 This incredible system pays itself off completely in only ${paybackYears.toFixed(1)} years! ⏳ Think about having virtual FREE electricity forever after that! How amazing is that? 🙌💚`;
      } else if (queryLower.includes('subsidy') || queryLower.includes('scheme') || queryLower.includes('benefit') || queryLower.includes('discount')) {
        botResponse = `Yay, you are in luck! 🍀 Exciting solar rewards are waiting for you in ${user.location}! 🎁 First off, you are 100% eligible for the huge 40% Solar Rooftop Subsidy scheme! That's a direct, massive discount on your setup cost! 💸 Secondly, you get full Net Metering support! 🔄 Think of it as a reverse cash register: on bright sunny days, your electricity meter spins backward, feeding power back to the utility grid and adding credits to your account! 📉⚡ Energy independence is super fun! Let's get these cash-back solar vibes rolling! ☀️🕺`;
      } else if (queryLower.includes('lumina') || queryLower.includes('installer') || queryLower.includes('vendor') || queryLower.includes('partner') || queryLower.includes('apex') || queryLower.includes('helios')) {
        botResponse = `Oh, I am super excited to tell you about our local partners! 🥳 Lumina Sun Solutions is our golden-tier champion installer in your area, located just 2.4 miles down the road! 🗺️ With an outstanding 4.9-star rating ⭐, their team is highly vetted and certified! I have successfully beamed your interest over to them, and they are already customizing a gorgeous, free site estimate for your roof! ⚡📬 You're in safe hands, friend! Exciting updates will reach your inbox shortly! 🚀✨`;
      } else if (queryLower.includes('hello') || queryLower.includes('hi') || queryLower.includes('hey')) {
        botResponse = `Hey there, superstar! 👋☀️ Welcome to SolarPulse AI! I am absolutely thrilled to guide you on your journey to clean, green energy! 🌿 Whether you want to calculate your savings, explore massive government subsidies, or scan the map for local installer heroes, I've got your back! 🚀 Let's make today bright and beautiful! What's on your mind? 😊✨`;
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
      estimatedCost: `₹${estimatedCost.toLocaleString('en-IN', {maximumFractionDigits: 0})}`,
      status: 'Pending Review',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      savings: `₹${(monthlyBill * 0.9).toFixed(0)}/mo`
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
          <div className="font-headline-md text-2xl font-bold text-primary tracking-tighter flex items-center gap-2 mb-10 select-none">
            <Zap className="w-7 h-7 text-primary neon-glow" />
            <span>NovaAI</span>
          </div>

          <nav className="space-y-1">
            {[
              { key: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
              { key: 'ai', label: 'AI Assistant', icon: 'ai', isNew: true },
              { key: 'nearby', label: 'Nearby Solar', icon: 'nearby' },
              { key: 'calculator', label: 'Calculator', icon: 'calculator' },
              { key: 'schemes', label: 'Gov Schemes', icon: 'schemes' },
              { key: 'quotations', label: 'Quotations', icon: 'quotations' },
              { key: 'vendors', label: 'Saved Vendors', icon: 'vendors' },
              { key: 'learning', label: 'Learning Hub', icon: 'learning' },
            ].map(item => {
              const isActive = activeTab === item.key;
              const IconComponent = navIconMap[item.icon] || LayoutDashboard;
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key as any)}
                  className={`w-full flex items-center justify-between px-6 py-3.5 transition-all text-left font-semibold text-sm cursor-pointer rounded-xl ${
                    isActive
                      ? 'sidebar-active text-[#00dbe9]'
                      : 'text-[#b9cacb] hover:bg-white/5 hover:text-white hover:translate-x-1'
                  }`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${isActive ? 'bg-[#00dbe9]/10' : 'bg-white/5'}`}>
                      <IconComponent className={`w-5 h-5 ${isActive ? 'text-[#00dbe9]' : 'text-[#b9cacb]'}`} strokeWidth={1.8} />
                    </div>
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.isNew && (
                    <span className="bg-primary/20 text-primary text-[10px] px-1.5 py-0.5 rounded-md font-bold border border-primary/20">
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
            <Bell className="w-5 h-5" strokeWidth={1.8} />
            <span>Notifications</span>
          </button>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-6 py-3 text-red-400/80 hover:text-red-400 transition-all text-left text-sm cursor-pointer font-semibold"
          >
            <LogOut className="w-5 h-5" strokeWidth={1.8} />
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
              <Zap className="w-5 h-5 text-primary neon-glow" />
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
                placeholder="Search insights, vendors, or solar data..."
                className="w-full bg-[#0b0e14]/50 border border-white/10 rounded-full py-2.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-[#00dbe9]/20 focus:border-[#00dbe9] transition-all text-sm text-white"
              />
            </div>
          </div>

          {/* User profile actions */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Notifications Button */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all text-[#b9cacb] hover:text-[#00f2ff]"
              >
                <Bell className="w-5 h-5" strokeWidth={1.8} />
                {notifications.some(n => n.active) && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_#00dbe9]" />
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
                <div className="font-semibold text-sm text-white select-none">{currentUser.fullName}</div>
                <div className="text-xs text-[#b9cacb]/80 font-mono tracking-tight select-none">{currentUser.location}</div>
              </div>
              <div 
                onClick={openProfileModal}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00dbe9] to-[#cf5cff] p-[1.5px] flex items-center justify-center overflow-hidden shrink-0 cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-[0_0_12px_rgba(0,240,255,0.3)] group relative"
                title="Manage user profile & photo"
              >
                {currentUser.avatarUrl ? (
                  <img 
                    className="w-full h-full object-cover rounded-full select-none" 
                    src={currentUser.avatarUrl}
                    alt="Avatar"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full bg-[#0d0f14] rounded-full flex items-center justify-center select-none">
                    <span className="text-white text-xs font-black tracking-wider">{getInitials(currentUser.fullName)}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full">
                  <Pencil className="w-3.5 h-3.5 text-white" strokeWidth={2} />
                </div>
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
                  { key: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
                  { key: 'ai', label: 'AI Assistant', icon: 'ai' },
                  { key: 'nearby', label: 'Nearby Solar', icon: 'nearby' },
                  { key: 'calculator', label: 'Calculator', icon: 'calculator' },
                  { key: 'schemes', label: 'Gov Schemes', icon: 'schemes' },
                  { key: 'quotations', label: 'Quotations', icon: 'quotations' },
                  { key: 'vendors', label: 'Saved Vendors', icon: 'vendors' },
                  { key: 'learning', label: 'Learning Hub', icon: 'learning' },
                ].map(item => {
                  const isActive = activeTab === item.key;
                  const IconComponent = navIconMap[item.icon] || LayoutDashboard;
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
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${isActive ? 'bg-[#00dbe9]/10' : 'bg-white/5'}`}>
                        <IconComponent className={`w-5 h-5 ${isActive ? 'text-[#00dbe9]' : 'text-[#b9cacb]'}`} strokeWidth={1.8} />
                      </div>
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
                  <LogOut className="w-5 h-5" strokeWidth={1.8} />
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
                <OverviewTab
                  user={currentUser}
                  calculatedCapacity={calculatedCapacity}
                  monthlyBill={monthlyBill}
                  vendors={vendors}
                  notifications={notifications}
                  setActiveTab={setActiveTab}
                  handleRequestQuote={handleRequestQuote}
                  handleToggleSaveVendor={handleToggleSaveVendor}
                />
              )}

              {/* TAB 2: AI CHAT ASSISTANT */}
              {activeTab === 'ai' && (
                <AIAssistantTab
                  user={currentUser}
                  messages={messages}
                  inputMsg={inputMsg}
                  setInputMsg={setInputMsg}
                  handleSendMessage={handleSendMessage}
                  setActiveTab={setActiveTab}
                  monthlyBill={monthlyBill}
                  calculatedCapacity={calculatedCapacity}
                  finalCost={finalCost}
                  paybackYears={paybackYears}
                />
              )}

              {/* TAB 3: NEARBY SOLAR INSTALLERS */}
              {activeTab === 'nearby' && (
                <NearbySolarTab
                  user={currentUser}
                  vendors={vendors}
                  nearbySearch={nearbySearch}
                  setNearbySearch={setNearbySearch}
                  nearbyFilter={nearbyFilter}
                  setNearbyFilter={setNearbyFilter}
                  handleRequestQuote={handleRequestQuote}
                  handleToggleSaveVendor={handleToggleSaveVendor}
                />
              )}

              {/* TAB 4: ADVANCED ROI COST CALCULATOR */}
              {activeTab === 'calculator' && (
                <CalculatorTab
                  monthlyBill={monthlyBill}
                  setMonthlyBill={setMonthlyBill}
                  roofArea={roofArea}
                  setRoofArea={setRoofArea}
                  sunlightHours={sunlightHours}
                  setSunlightHours={setSunlightHours}
                  calculatedCapacity={calculatedCapacity}
                  estimatedCost={estimatedCost}
                  subsidyAmount={subsidyAmount}
                  finalCost={finalCost}
                  yearlySavings={yearlySavings}
                  paybackYears={paybackYears}
                  setActiveTab={setActiveTab}
                  showToast={showToast}
                />
              )}

              {/* TAB 5: GOVERNMENT SCHEMES */}
              {activeTab === 'schemes' && (
                <GovSchemesTab 
                  setActiveTab={setActiveTab}
                  monthlyBill={monthlyBill}
                  calculatedCapacity={calculatedCapacity}
                  showToast={showToast}
                />
              )}

              {/* TAB 6: QUOTATIONS TRACKER */}
              {activeTab === 'quotations' && (
                <PriceEstimateTab
                  quotations={quotations}
                  setQuotations={setQuotations}
                  setActiveTab={setActiveTab}
                  showToast={showToast}
                />
              )}

              {/* TAB 7: SAVED VENDORS */}
              {activeTab === 'vendors' && (
                <SavedVendorsTab
                  vendors={vendors}
                  handleToggleSaveVendor={handleToggleSaveVendor}
                  handleRequestQuote={handleRequestQuote}
                  setActiveTab={setActiveTab}
                />
              )}

              {/* TAB 8: LEARNING HUB */}
          

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
          { key: 'dashboard', label: 'Dash', icon: 'dashboard' },
          { key: 'ai', label: 'AI', icon: 'ai' },
          { key: 'nearby', label: 'Solar', icon: 'nearby' },
          { key: 'calculator', label: 'Calc', icon: 'calculator' },
          { key: 'learning', label: 'Hub', icon: 'learning' }
        ].map(item => {
          const isActive = activeTab === item.key;
          const IconComponent = navIconMap[item.icon] || LayoutDashboard;
          return (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key as any)}
              className={`flex flex-col items-center gap-1.5 transition-colors select-none cursor-pointer ${
                isActive ? 'text-primary' : 'text-[#b9cacb]'
              }`}
            >
              <IconComponent className={`w-5 h-5 ${isActive ? 'text-[#00dbe9]' : 'text-[#b9cacb]'}`} strokeWidth={1.8} />
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
      {/* Elegant Profile Settings and Photo Uploader Modal */}
      <AnimatePresence>
        {showProfileModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            {/* Modal Body */}
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg glass-panel p-8 sm:p-10 rounded-3xl border-[#00dbe9]/30 shadow-[0_0_50px_rgba(0,242,255,0.15)] bg-[#0d0f14]"
            >
              <button 
                onClick={() => setShowProfileModal(false)}
                className="absolute top-6 right-6 text-[#b9cacb] hover:text-white p-1 rounded-full bg-white/5 border border-white/5 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-6 text-left">
                <div>
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <User className="w-5 h-5 text-[#00dbe9]" />
                    Profile Settings
                  </h3>
                  <p className="text-xs text-[#b9cacb] mt-1">Configure your personal solar profile details and display picture.</p>
                </div>

                {/* Profile Photo Customization Zone */}
                <div className="space-y-4">
                  <label className="text-xs font-bold text-primary uppercase tracking-widest block">Profile Photo</label>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/10">
                    {/* Live Preview */}
                    <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#00dbe9] to-[#cf5cff] p-[2px] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                      {editAvatarUrl ? (
                        <img 
                          className="w-full h-full object-cover rounded-full" 
                          src={editAvatarUrl}
                          alt="Avatar Preview"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#0d0f14] rounded-full flex items-center justify-center">
                          <span className="text-white text-lg font-black">{getInitials(editName)}</span>
                        </div>
                      )}
                      
                      {editAvatarUrl && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditAvatarUrl('');
                            showToast('Photo cleared. Initials placeholder will be used.', 'info');
                          }}
                          className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white text-xs border border-[#0d0f14] shadow-md transition-all cursor-pointer"
                          title="Remove Photo"
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    {/* Photo Uploader / Selector */}
                    <div className="flex-1 w-full space-y-3">
                      <div className="relative group border border-dashed border-white/20 hover:border-[#00dbe9]/50 rounded-xl p-4 text-center cursor-pointer transition-all bg-black/10">
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={handleFileChange}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                        />
                        <Upload className="w-6 h-6 text-[#b9cacb] group-hover:text-[#00dbe9] transition-colors" />
                        <p className="text-xs text-[#b9cacb] mt-1 font-semibold">
                          Upload custom photo
                        </p>
                        <p className="text-[10px] text-[#b9cacb]/60 mt-0.5">
                          Drag & drop or click to browse (Max 2MB)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                 {/* Profile Details Inputs */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase tracking-widest mb-2">Full Name</label>
                    <input 
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      required
                      className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[#00dbe9] focus:ring-2 focus:ring-[#00dbe9]/10 transition-all"
                      placeholder="Your Full Name"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-primary uppercase tracking-widest mb-2">City</label>
                      <input 
                        type="text"
                        value={editCity}
                        onChange={(e) => setEditCity(e.target.value)}
                        required
                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[#00dbe9] focus:ring-2 focus:ring-[#00dbe9]/10 transition-all"
                        placeholder="e.g. San Francisco"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-primary uppercase tracking-widest mb-2">State</label>
                      <input 
                        type="text"
                        value={editState}
                        onChange={(e) => setEditState(e.target.value)}
                        required
                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[#00dbe9] focus:ring-2 focus:ring-[#00dbe9]/10 transition-all"
                        placeholder="e.g. CA"
                      />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setShowProfileModal(false)}
                    className="flex-1 py-3.5 rounded-xl border border-white/10 text-[#b9cacb] hover:text-white text-xs font-bold uppercase tracking-widest bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!editName.trim()) {
                        showToast('Name cannot be empty', 'info');
                        return;
                      }
                      const locationStr = editCity && editState ? `${editCity}, ${editState}` : (editCity || editState || currentUser.location);
                      setCurrentUser({
                        fullName: editName,
                        email: currentUser.email,
                        location: locationStr,
                        avatarUrl: editAvatarUrl
                      });
                      setShowProfileModal(false);
                      showToast('User profile updated successfully!', 'success');
                    }}
                    className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#00dbe9] to-[#cf5cff] text-black hover:brightness-110 font-bold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
