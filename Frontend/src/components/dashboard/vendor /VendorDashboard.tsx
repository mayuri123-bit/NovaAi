import React, { useState } from 'react';
import { 
  Zap, 
  LayoutDashboard, 
  Users, 
  FileText, 
  Wrench, 
  BarChart3, 
  Building2, 
  Award, 
  Search, 
  Bell, 
  Grid, 
  ArrowRight, 
  TrendingUp, 
  MapPin, 
  CheckCircle2, 
  LogOut, 
  Settings, 
  HelpCircle,
  Clock,
  Briefcase,
  Layers,
  ChevronRight,
  ExternalLink,
  Plus,
  CircleDollarSign
} from 'lucide-react';

// Import Modular Tab Components
import CustomerLeadsTab, { Lead } from './modules/CustomerLeadsTab';
import QuotationManageTab, { Quotation } from './modules/QuotationManageTab';
import InstallationTrackerTab, { Installation } from './modules/InstallationTrackerTab';
import BusinessAnalyticsTab from './modules/BusinessAnalyticsTab';
import CompanyProfileTab, { CompanyDetails } from './modules/CompanyProfileTab';
import SetupGuideTab from './modules/SetupGuideTab';

interface VendorDashboardProps {
  user: {
    fullName: string;
    email: string;
    location: string;
  };
  onLogout: () => void;
}

export default function VendorDashboard({ user, onLogout }: VendorDashboardProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'leads' | 'quotations' | 'installations' | 'analytics' | 'profile' | 'setup'>('dashboard');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState<'30days' | '6months'>('30days');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [toast, setToast] = useState<{ text: string; type: 'success' | 'info' } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' = 'success') => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Synchronized Application States passed to modules
  const [leads, setLeads] = useState<Lead[]>([
    { id: 'lead-1', name: 'Arjun Mehra', city: 'Bangalore', size: '7.5 kW', phone: '+91 98765 43210', date: 'Just now', status: 'New', address: 'Indiranagar, Bangalore, KA', email: 'arjun.mehra@example.com', monthlyBill: '₹12,400' },
    { id: 'lead-2', name: 'Priya Sharma', city: 'Pune', size: '5.0 kW', phone: '+91 91234 56789', date: '2 hours ago', status: 'In Progress', address: 'Kothrud, Pune, MH', email: 'priya.s@cloudnet.in', monthlyBill: '₹8,900' },
    { id: 'lead-3', name: 'Vikram Singh', city: 'Jaipur', size: '10.0 kW', phone: '+91 99887 76655', date: 'Yesterday', status: 'Contacted', address: 'Malviya Nagar, Jaipur, RJ', email: 'v.singh@royalhomes.com', monthlyBill: '₹21,200' },
    { id: 'lead-4', name: 'Anjali Gupta', city: 'Gurgaon', size: '3.0 kW', phone: '+91 95554 33221', date: '2 days ago', status: 'New', address: 'DLF Phase 3, Gurgaon, HR', email: 'anjali.gupta@outlook.com', monthlyBill: '₹5,400' },
    { id: 'lead-5', name: 'Rahul Verma', city: 'Hyderabad', size: '12.0 kW', phone: '+91 88776 65544', date: '3 days ago', status: 'New', address: 'Gachibowli, Hyderabad, TS', email: 'rahul.verma@techhub.com', monthlyBill: '₹28,500' },
  ]);

  const [quotations, setQuotations] = useState<Quotation[]>([
    { 
      id: 'q-8821', 
      client: 'Acme Corporation', 
      kW: '5 kW', 
      cost: '₹5,25,000', 
      status: 'Accepted', 
      date: 'Oct 24, 2023', 
      savings: '₹80,000/yr',
      subsidy: '₹78,000',
      finalAmount: '₹4,47,000',
      phone: '+91 98765 43210',
      email: 'ops@acme.corp',
      address: 'Level 4, Sky Tower, Business District, Bengaluru 560001',
      propertyType: 'Commercial Rooftop',
      monthlyBill: '₹24,500 Avg.',
      preferredInstall: 'Nov 15, 2023',
      remarks: 'Customer requested specific mounting structure for shaded areas. Quote includes customized high-rise rails.'
    },
    { 
      id: 'q-8822', 
      client: 'Rajesh Kumar', 
      kW: '3 kW', 
      cost: '₹3,20,000', 
      status: 'Sent', 
      date: 'Oct 26, 2023', 
      savings: '₹48,000/yr',
      subsidy: '₹45,000',
      finalAmount: '₹2,75,000',
      phone: '+91 91234 56789',
      email: 'rajesh.kumar@example.com',
      address: 'Kothrud, Pune, MH - 411038',
      propertyType: 'Residential Rooftop',
      monthlyBill: '₹8,900',
      preferredInstall: 'Dec 01, 2023',
      remarks: 'Standard residential rooftop proposal using Waaree panels.'
    },
    { 
      id: 'q-8829', 
      client: 'Sterling Residency', 
      kW: '15 kW', 
      cost: '₹14,50,000', 
      status: 'Pending', 
      date: 'Oct 28, 2023', 
      savings: '₹2,40,000/yr',
      subsidy: '₹2,10,000',
      finalAmount: '₹12,40,000',
      phone: '+91 99887 76655',
      email: 'v.singh@royalhomes.com',
      address: 'Malviya Nagar, Jaipur, RJ',
      propertyType: 'Apartment Complex Rooftop',
      monthlyBill: '₹55,000',
      preferredInstall: 'Nov 30, 2023',
      remarks: 'Large rooftop scale proposal. Subsidy is optimized for group residential society housing rules.'
    },
  ]);

  const [installations, setInstallations] = useState<Installation[]>([
    { id: 'inst-1', client: 'Kiran Shah', size: '5 kW', progress: 85, step: 'MNRE Approval Sync', date: 'Site Work Complete', status: 'Active' },
    { id: 'inst-2', client: 'Anil Mehta', size: '12 kW', progress: 40, step: 'Panel Mounting', date: 'Scheduled for Tomorrow', status: 'Active' },
    { id: 'inst-3', client: 'Meera Nair', size: '4 kW', progress: 100, step: 'Net Meter Handover', date: 'Completed July 10', status: 'Completed' },
  ]);

  const [companyDetails, setCompanyDetails] = useState<CompanyDetails>({
    name: 'Helios Solar Dynamics',
    regId: 'U40106MH2024PTC123456',
    gstin: '27AAAAA1111A1Z1',
    address: 'Vikas Center, Santacruz East, Mumbai, MH - 400055',
    mnreId: 'MNRE-1409-G',
    certifications: ['ISO 9001:2015', 'MNRE Tier 1 Authorized', 'GST Registered', 'Udyam Certified'],
    rating: 4.8,
    reviews: 142,
    completedProjects: 84,
  });

  // Quotation Creator state pre-fills when clicked from Lead Detail/Card
  const [preFilledClient, setPreFilledClient] = useState('');
  const [preFilledkW, setPreFilledkW] = useState('5');

  const handleAddLead = (newLead: Omit<Lead, 'id' | 'date'>) => {
    const newlyCreated: Lead = {
      ...newLead,
      id: `lead-${Math.floor(100 + Math.random() * 900)}`,
      date: 'Just now'
    };
    setLeads([newlyCreated, ...leads]);
    showToast(`✨ Customer lead for ${newLead.name} created successfully!`, 'success');
  };

  const handleSendQuotationFromLead = (lead: Lead) => {
    setPreFilledClient(lead.name);
    setPreFilledkW(lead.size.replace(' kW', ''));
    setActiveTab('quotations');
    showToast(`📝 Proposal configurations ready for ${lead.name}!`, 'info');
  };

  return (
    <div className="min-h-screen bg-[#10131a] text-[#e1e2eb] font-sans antialiased selection:bg-[#00dbe9]/30 selection:text-white flex w-full relative overflow-x-hidden">
      
      {/* Dynamic Toast System */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0f1118] border border-[#00f0ff]/30 text-white px-5 py-3.5 rounded-2xl shadow-[0_0_30px_rgba(0,240,255,0.25)] flex items-center gap-3 text-xs font-mono font-bold animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
          <span>{toast.text}</span>
        </div>
      )}

      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#00f0ff]/5 filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[10%] w-[400px] h-[400px] rounded-full bg-[#cf5cff]/5 filter blur-[120px] pointer-events-none opacity-40" />

      {/* Sidebar Navigation */}
      <aside className="w-[260px] shrink-0 bg-surface-container/60 backdrop-blur-xl border-r border-white/10 shadow-2xl flex flex-col py-8 px-4 z-40 sticky top-0 h-screen hidden md:flex">
        <div className="mb-10 px-2 select-none">
          <div className="flex items-center gap-2">
            <Zap className="w-7 h-7 text-[#00dbe9]" />
            <h1 className="font-headline-md text-xl font-bold text-white tracking-tight">NovaAI</h1>
          </div>
          <p className="text-[10px] text-on-surface-variant tracking-widest uppercase opacity-70 mt-1 font-mono">
            Solar Intelligence
          </p>
        </div>

        <nav className="flex-1 space-y-1">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 border-none bg-transparent text-left cursor-pointer ${
              activeTab === 'dashboard' 
                ? 'text-primary font-bold border-r-2 border-primary-container bg-primary/5' 
                : 'text-on-surface-variant font-medium hover:bg-white/5 hover:text-primary'
            }`}
          >
            <LayoutDashboard className={`w-5 h-5 ${activeTab === 'dashboard' ? 'text-primary' : 'text-on-surface-variant'}`} />
            <span className="text-sm">Dashboard</span>
          </button>

          <button 
            onClick={() => setActiveTab('leads')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 border-none bg-transparent text-left cursor-pointer ${
              activeTab === 'leads' 
                ? 'text-primary font-bold border-r-2 border-primary-container bg-primary/5' 
                : 'text-on-surface-variant font-medium hover:bg-white/5 hover:text-primary'
            }`}
          >
            <Users className={`w-5 h-5 ${activeTab === 'leads' ? 'text-primary' : 'text-on-surface-variant'}`} />
            <span className="text-sm">Customer Leads</span>
          </button>

          <button 
            onClick={() => setActiveTab('quotations')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 border-none bg-transparent text-left cursor-pointer ${
              activeTab === 'quotations' 
                ? 'text-primary font-bold border-r-2 border-primary-container bg-primary/5' 
                : 'text-on-surface-variant font-medium hover:bg-white/5 hover:text-primary'
            }`}
          >
            <FileText className={`w-5 h-5 ${activeTab === 'quotations' ? 'text-primary' : 'text-on-surface-variant'}`} />
            <span className="text-sm">Quotations</span>
          </button>

          <button 
            onClick={() => setActiveTab('installations')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 border-none bg-transparent text-left cursor-pointer ${
              activeTab === 'installations' 
                ? 'text-primary font-bold border-r-2 border-primary-container bg-primary/5' 
                : 'text-on-surface-variant font-medium hover:bg-white/5 hover:text-primary'
            }`}
          >
            <Wrench className={`w-5 h-5 ${activeTab === 'installations' ? 'text-primary' : 'text-on-surface-variant'}`} />
            <span className="text-sm">Installations</span>
          </button>

          <button 
            onClick={() => setActiveTab('analytics')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 border-none bg-transparent text-left cursor-pointer ${
              activeTab === 'analytics' 
                ? 'text-primary font-bold border-r-2 border-primary-container bg-primary/5' 
                : 'text-on-surface-variant font-medium hover:bg-white/5 hover:text-primary'
            }`}
          >
            <BarChart3 className={`w-5 h-5 ${activeTab === 'analytics' ? 'text-primary' : 'text-on-surface-variant'}`} />
            <span className="text-sm">Business Analytics</span>
          </button>

          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 border-none bg-transparent text-left cursor-pointer ${
              activeTab === 'profile' 
                ? 'text-primary font-bold border-r-2 border-primary-container bg-primary/5' 
                : 'text-on-surface-variant font-medium hover:bg-white/5 hover:text-primary'
            }`}
          >
            <Building2 className={`w-5 h-5 ${activeTab === 'profile' ? 'text-primary' : 'text-on-surface-variant'}`} />
            <span className="text-sm">Company Profile</span>
          </button>

          <button 
            onClick={() => setActiveTab('setup')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 border-none bg-transparent text-left cursor-pointer ${
              activeTab === 'setup' 
                ? 'text-primary font-bold border-r-2 border-primary-container bg-primary/5' 
                : 'text-on-surface-variant font-medium hover:bg-white/5 hover:text-primary'
            }`}
          >
            <Award className={`w-5 h-5 ${activeTab === 'setup' ? 'text-primary' : 'text-on-surface-variant'}`} />
            <span className="text-sm">Setup Guide</span>
          </button>
        </nav>

        <div className="mt-auto pt-8 border-t border-white/5 space-y-2">
          <button className="w-full bg-[#00f0ff] text-[#002022] font-bold py-3 rounded-xl hover:opacity-90 transition-all active:scale-95 mb-4 shadow-lg shadow-[#00f0ff]/20 text-xs border-none cursor-pointer">
            Upgrade Plan
          </button>
          
          <button 
            onClick={() => setActiveTab('profile')}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-on-surface-variant hover:text-primary transition-all text-sm bg-transparent border-none text-left cursor-pointer"
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
          
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all text-sm bg-transparent border-none text-left cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Navbar */}
        <header className="h-20 w-full border-b border-white/5 bg-[#10131a]/80 backdrop-blur-xl flex items-center justify-between px-10 z-30 sticky top-0">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md focus-within:ring-2 focus-within:ring-primary/50 rounded-full transition-all">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
              <input 
                className="w-full bg-black/20 border border-white/10 rounded-full py-2 pl-12 pr-4 text-sm text-on-surface focus:outline-none focus:border-primary/50 transition-colors" 
                placeholder="Search leads, projects, or analytics..." 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="p-2 text-on-surface-variant hover:bg-white/10 rounded-full transition-colors active:scale-90 relative border-none bg-transparent cursor-pointer">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#00f0ff] rounded-full border-2 border-background" />
            </button>
            
            <button className="p-2 text-on-surface-variant hover:bg-white/10 rounded-full transition-colors active:scale-90 border-none bg-transparent cursor-pointer">
              <Grid className="w-5 h-5" />
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-3 hover:bg-white/5 p-1.5 rounded-2xl transition-all border-none bg-transparent cursor-pointer text-left focus:outline-none"
              >
                <div className="h-10 w-10 rounded-full border border-primary/30 p-0.5 overflow-hidden ring-2 ring-primary/10 select-none shrink-0">
                  <img 
                    className="w-full h-full object-cover rounded-full" 
                    alt="A professional vendor portrait"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhyAtbKcDbohmpZnU2ls7m3SnaiT3zLPPlvSzSkbi9XRLHWycADtEK27srtF-KySo4mWq8QK6_yoR_daBFO4DiXnd0a7gWJYamuE3atx_6OdEOSAKQh8x3n0-AvPV2Izn8v8geIWf819bJcWmjoZiHNtxu7j2_cOcVidYjvxlEKCAF3YH9pQhYeqPBe4IDetfjZS73wsAY8FsZXpAD2l3WKMVddeJTte0QDdh6F2-IQ9xSQA06ln9fzw"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="hidden md:block text-left shrink-0">
                  <p className="text-xs font-bold text-white leading-tight">{user.fullName || 'Helios Dynamics'}</p>
                  <p className="text-[10px] text-on-surface-variant font-mono flex items-center gap-1">
                    MNRE Certified Vendor
                    <span className="text-xs">▾</span>
                  </p>
                </div>
              </button>

              {profileDropdownOpen && (
                <>
                  {/* Invisible full-screen backdrop to close the dropdown on outer click */}
                  <div className="fixed inset-0 z-40" onClick={() => setProfileDropdownOpen(false)} />
                  
                  {/* Dropdown Card */}
                  <div className="absolute right-0 mt-3 w-80 bg-[#191c22] border border-white/10 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.6)] py-4 z-50 animate-fade-in text-left">
                    <div className="px-5 pb-3 border-b border-white/5">
                      <p className="text-xs font-bold text-white">{user.fullName || 'Helios Dynamics'}</p>
                      <p className="text-[10px] text-on-surface-variant font-mono mt-0.5 truncate">{user.email}</p>
                      <div className="flex items-center gap-1.5 mt-2 bg-[#00f0ff]/10 border border-[#00f0ff]/30 rounded-lg px-2.5 py-1 w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
                        <span className="text-[9px] font-bold text-[#00f0ff] uppercase tracking-wider font-mono">Verified Partner</span>
                      </div>
                    </div>

                    <div className="p-2 space-y-1">
                      <button
                        onClick={() => {
                          setActiveTab('profile');
                          setProfileDropdownOpen(false);
                          showToast('🏢 Navigating to Company Profile Setup', 'info');
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left text-xs text-[#e1e2eb] hover:bg-white/5 hover:text-white transition-all border-none bg-transparent cursor-pointer font-semibold"
                      >
                        <Building2 className="w-4 h-4 text-[#00f0ff]" />
                        <div>
                          <p>Company Profile Creation</p>
                          <p className="text-[9px] text-on-surface-variant font-normal">Manage brand identity, showcase gallery & certs</p>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab('setup');
                          setProfileDropdownOpen(false);
                          showToast('⚙️ Opening Business Setup checklist', 'info');
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left text-xs text-[#e1e2eb] hover:bg-white/5 hover:text-white transition-all border-none bg-transparent cursor-pointer font-semibold"
                      >
                        <Award className="w-4 h-4 text-[#cf5cff]" />
                        <div>
                          <p>Business Setup Guide</p>
                          <p className="text-[9px] text-on-surface-variant font-normal">Finalize GST, UDYAM & tax registrations</p>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab('analytics');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left text-xs text-[#e1e2eb] hover:bg-white/5 hover:text-white transition-all border-none bg-transparent cursor-pointer font-semibold"
                      >
                        <BarChart3 className="w-4 h-4 text-emerald-400" />
                        <div>
                          <p>Business Analytics</p>
                          <p className="text-[9px] text-on-surface-variant font-normal">Revenue velocities, forecasts & KPIs</p>
                        </div>
                      </button>
                    </div>

                    <div className="border-t border-white/5 p-2 mt-2">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          onLogout();
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left text-xs text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all border-none bg-transparent cursor-pointer font-semibold"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out of SolarNexus</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Content View Routing */}
        <main className="flex-1 overflow-y-auto px-10 py-12 max-w-[1440px] mx-auto w-full">
          
          {activeTab === 'dashboard' && (
            <div className="space-y-12 animate-fade-in">
              {/* Header Section */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left mb-12">
                <div>
                  <p className="text-xs font-bold text-[#00f0ff] uppercase tracking-wider mb-2 opacity-90">
                    Welcome back, to solar vendor platform
                  </p>
                  <h2 className="text-4xl font-black text-white tracking-tighter mb-2 neon-text-glow">
                    Vendor Help &amp; Support Center
                  </h2>
                  <p className="text-sm text-on-surface-variant opacity-80">
                    Manage your solar business operations with intelligent data.
                  </p>
                </div>
                <div>
                  <div className="bg-[#1d2026]/60 backdrop-blur-xl px-6 py-3.5 rounded-2xl border-l-4 border-l-[#00f0ff] flex items-center gap-4 border border-white/5">
                    <div className="text-right">
                      <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">Current Revenue</p>
                      <p className="text-2xl font-black text-[#00f0ff]">₹12.4L</p>
                    </div>
                    <CircleDollarSign className="w-7 h-7 text-[#00f0ff]" />
                  </div>
                </div>
              </div>

              {/* 6 Grid Modules */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                {/* Module 1: Customer Leads */}
                <div 
                  onClick={() => {
                    setSelectedLead(null);
                    setActiveTab('leads');
                  }}
                  className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] hover:border-[#00f0ff]/30 hover:shadow-[0_0_30px_rgba(0,240,255,0.05)] cursor-pointer transition-all duration-300 group flex flex-col justify-between min-h-[280px]"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-[#00f0ff]/10 flex items-center justify-center mb-6 group-hover:bg-[#00f0ff]/20 transition-colors">
                      <Users className="w-7 h-7 text-[#00f0ff]" />
                    </div>
                    <h3 className="text-xl font-bold text-on-surface mb-3">Customer Leads</h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      Track and manage your new customer enquiries.
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-[#00f0ff] font-bold text-sm">
                        {leads.filter(l => l.status === 'New').length} New
                      </span>
                      <span className="text-on-surface-variant text-[11px]">
                        {leads.filter(l => l.status !== 'New').length} In-Progress
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#00f0ff] opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0" />
                  </div>
                </div>

                {/* Module 2: Quotation Management */}
                <div 
                  onClick={() => setActiveTab('quotations')}
                  className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] hover:border-[#cf5cff]/30 hover:shadow-[0_0_30px_rgba(207,92,255,0.05)] cursor-pointer transition-all duration-300 group flex flex-col justify-between min-h-[280px]"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-[#cf5cff]/10 flex items-center justify-center mb-6 group-hover:bg-[#cf5cff]/20 transition-colors">
                      <FileText className="w-7 h-7 text-[#cf5cff]" />
                    </div>
                    <h3 className="text-xl font-bold text-on-surface mb-3">Quotation Management</h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      Create, send, and track customized solar project quotations in real-time.
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-[#cf5cff] font-bold text-sm">₹4.2L Pending</span>
                      <span className="text-on-surface-variant text-[11px]">{quotations.length} Drafts</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#cf5cff] opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0" />
                  </div>
                </div>

                {/* Module 3: Installation Management */}
                <div 
                  onClick={() => setActiveTab('installations')}
                  className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] hover:border-[#ecb2ff]/30 hover:shadow-[0_0_30px_rgba(236,178,255,0.05)] cursor-pointer transition-all duration-300 group flex flex-col justify-between min-h-[280px]"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-[#ecb2ff]/10 flex items-center justify-center mb-6 group-hover:bg-[#ecb2ff]/20 transition-colors">
                      <Wrench className="w-7 h-7 text-[#ecb2ff]" />
                    </div>
                    <h3 className="text-xl font-bold text-on-surface mb-3">Installation Management</h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      Track active installation progress, logistics, and site schedules.
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-[#ecb2ff] font-bold text-sm">
                        {installations.filter(i => i.status !== 'Completed').length || 5} ACTIVE PROJECTS
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#ecb2ff] opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0" />
                  </div>
                </div>

                {/* Module 4: Business Analytics */}
                <div 
                  onClick={() => setActiveTab('analytics')}
                  className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] hover:border-[#00f0ff]/30 hover:shadow-[0_0_30px_rgba(0,240,255,0.05)] cursor-pointer transition-all duration-300 group flex flex-col justify-between min-h-[280px]"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-[#00f0ff]/10 flex items-center justify-center mb-6 group-hover:bg-[#00f0ff]/20 transition-colors">
                      <BarChart3 className="w-7 h-7 text-[#00f0ff]" />
                    </div>
                    <h3 className="text-xl font-bold text-on-surface mb-3">Business Analytics</h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      Monitor overall business performance, conversion rates, and ROI insights.
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-[#00f0ff] font-bold text-sm">+18% Growth</span>
                      <span className="text-on-surface-variant text-[11px]">vs Last Month</span>
                    </div>
                    <TrendingUp className="w-4 h-4 text-[#00f0ff] opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0" />
                  </div>
                </div>

                {/* Module 5: Company Profile */}
                <div 
                  onClick={() => setActiveTab('profile')}
                  className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] hover:border-white/15 hover:shadow-[0_0_30px_rgba(255,255,255,0.02)] cursor-pointer transition-all duration-300 group flex flex-col justify-between min-h-[280px]"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                      <Building2 className="w-7 h-7 text-[#e1e2eb]" />
                    </div>
                    <h3 className="text-xl font-bold text-on-surface mb-3">Company Profile</h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      Manage your company digital identity, portfolio, and certifications.
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-6">
                    <div className="flex -space-x-2 font-mono">
                      <div className="w-8 h-8 rounded-full border border-[#10131a] bg-[#1d2026] flex items-center justify-center text-[10px] font-bold text-[#00dbe9]">ISO</div>
                      <div className="w-8 h-8 rounded-full border border-[#10131a] bg-[#1d2026] flex items-center justify-center text-[10px] font-bold text-[#cf5cff]">GST</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#e1e2eb] opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0" />
                  </div>
                </div>

                {/* Module 6: Business Setup Guide */}
                <div 
                  onClick={() => setActiveTab('setup')}
                  className="bg-[#00dbe9]/5 border border-[#00dbe9]/15 p-8 rounded-[2rem] hover:border-[#00dbe9]/30 cursor-pointer transition-all duration-300 group flex flex-col justify-between min-h-[280px]"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-[#00dbe9]/20 flex items-center justify-center mb-6 group-hover:bg-[#00dbe9]/30 transition-colors">
                      <Award className="w-7 h-7 text-[#00dbe9]" />
                    </div>
                    <h3 className="text-xl font-bold text-on-surface mb-3">Business Setup Guide</h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      Finalize your GST, UDYAM, and vendor verification for full access.
                    </p>
                  </div>
                  <div className="mt-6 text-left">
                    <div className="w-full bg-[#1d2026] h-2 rounded-full overflow-hidden mb-2">
                      <div className="bg-[#00dbe9] h-full shadow-[0_0_10px_#00dbe9]" style={{ width: '75%' }} />
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-[#00dbe9] font-mono">75% COMPLETE</span>
                      <ArrowRight className="w-4 h-4 text-[#00dbe9] opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Analytics, Leads Queue & Regional Map */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
                {/* Column 1: Market Trends Simulated Chart */}
                <div className="bg-[#1d2026]/40 border border-white/5 p-8 rounded-[2.5rem] flex flex-col justify-between">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                    <div>
                      <h4 className="text-lg font-bold text-on-surface">Market Trends</h4>
                      <p className="text-[11px] text-on-surface-variant mt-0.5">Estimated demand for Solar in {user.location?.split(',')[0] || 'Maharashtra'} Region</p>
                    </div>
                    <select 
                      value={timeFilter} 
                      onChange={(e) => setTimeFilter(e.target.value as any)}
                      className="bg-[#1d2026] border-none rounded-xl text-[10px] px-3 py-1.5 text-white cursor-pointer"
                    >
                      <option value="30days">Last 30 Days</option>
                      <option value="6months">Last 6 Months</option>
                    </select>
                  </div>

                  {/* Columns */}
                  <div className="h-44 flex items-end justify-between gap-2 px-2 relative mt-6 select-none">
                    <div className="absolute inset-0 flex flex-col justify-between opacity-5 pointer-events-none">
                      <div className="border-t border-white" />
                      <div className="border-t border-white" />
                      <div className="border-t border-white" />
                    </div>

                    {/* Weekly Columns */}
                    <div className="flex-1 bg-[#00f0ff]/10 rounded-t-lg h-[40%] hover:bg-[#00f0ff]/30 transition-all cursor-help relative group">
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#10131a] border border-white/10 px-2 py-1 rounded text-[9px] font-mono opacity-0 group-hover:opacity-100 transition-opacity">₹4.2L</div>
                    </div>
                    <div className="flex-1 bg-[#00f0ff]/15 rounded-t-lg h-[60%] hover:bg-[#00f0ff]/35 transition-all cursor-help relative group">
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#10131a] border border-white/10 px-2 py-1 rounded text-[9px] font-mono opacity-0 group-hover:opacity-100 transition-opacity">₹6.8L</div>
                    </div>
                    <div className="flex-1 bg-[#00f0ff]/25 rounded-t-lg h-[55%] hover:bg-[#00f0ff]/45 transition-all cursor-help relative group">
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#10131a] border border-white/10 px-2 py-1 rounded text-[9px] font-mono opacity-0 group-hover:opacity-100 transition-opacity">₹5.9L</div>
                    </div>
                    <div className="flex-1 bg-[#00f0ff]/20 rounded-t-lg h-[80%] hover:bg-[#00f0ff]/40 transition-all cursor-help relative group">
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#10131a] border border-white/10 px-2 py-1 rounded text-[9px] font-mono opacity-0 group-hover:opacity-100 transition-opacity">₹8.1L</div>
                    </div>
                    <div className="flex-1 bg-[#00f0ff]/35 rounded-t-lg h-[95%] hover:bg-[#00f0ff]/55 transition-all cursor-help relative group">
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#10131a] border border-white/10 px-2 py-1 rounded text-[9px] font-mono opacity-0 group-hover:opacity-100 transition-opacity">₹9.5L</div>
                    </div>
                    <div className="flex-1 bg-[#00f0ff]/30 rounded-t-lg h-[70%] hover:bg-[#00f0ff]/50 transition-all cursor-help relative group">
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#10131a] border border-white/10 px-2 py-1 rounded text-[9px] font-mono opacity-0 group-hover:opacity-100 transition-opacity">₹7.2L</div>
                    </div>
                    <div className="flex-1 bg-[#00f0ff]/60 rounded-t-lg h-[85%] hover:bg-[#00f0ff]/80 transition-all cursor-help relative group shadow-[0_-3px_10px_rgba(0,219,233,0.3)] border-t border-[#00f0ff]">
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#10131a] border border-white/10 px-2 py-1 rounded text-[9px] font-mono opacity-0 group-hover:opacity-100 transition-opacity">₹12.4L</div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-4 text-[9px] text-on-surface-variant font-medium px-2 font-mono">
                    <span>W1</span><span>W2</span><span>W3</span><span>W4</span><span>W5</span><span>W6</span><span>CURRENT</span>
                  </div>
                </div>

                {/* Column 2: Recent Leads Queue */}
                <div className="bg-[#1d2026]/40 border border-white/5 p-8 rounded-[2.5rem] flex flex-col justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-on-surface mb-1">Recent Leads Queue</h4>
                    <p className="text-xs text-on-surface-variant mb-4">Click to view direct details &amp; initiate proposal</p>
                  </div>
                  <div className="flex-1 space-y-2.5 max-h-[170px] overflow-y-auto pr-1">
                    {leads.slice(0, 3).map((lead) => (
                      <div 
                        key={lead.id}
                        onClick={() => {
                          setSelectedLead(lead);
                          setActiveTab('leads');
                        }}
                        className="p-3 bg-[#10131a]/60 hover:bg-[#00f0ff]/5 hover:border-[#00f0ff]/30 border border-white/5 rounded-xl cursor-pointer transition-all flex items-center justify-between group/item"
                      >
                        <div className="text-left">
                          <p className="text-xs font-bold text-white group-hover/item:text-[#00f0ff] transition-colors">{lead.name}</p>
                          <p className="text-[10px] text-on-surface-variant font-mono mt-0.5">{lead.city} • {lead.size}</p>
                        </div>
                        <span className="text-[9px] font-black px-2 py-0.5 rounded bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/10">
                          {lead.status.toUpperCase()}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <button 
                      onClick={() => {
                        setSelectedLead(null);
                        setActiveTab('leads');
                      }}
                      className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl text-xs transition-all flex justify-center items-center gap-1.5 border border-white/5 cursor-pointer"
                    >
                      View All Leads ({leads.length})
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Column 3: Regional Territory Map Card */}
                <div className="bg-[#1d2026]/40 border border-white/5 p-8 rounded-[2.5rem] flex flex-col justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-on-surface mb-1">Regional Map</h4>
                    <p className="text-xs text-on-surface-variant mb-4">Active Territory where consumer leads are peaking</p>
                  </div>
                  
                  <div className="flex-1 min-h-[140px] relative rounded-2xl overflow-hidden grayscale contrast-125 opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                    <div 
                      className="w-full h-full bg-cover bg-center" 
                      style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuA7MSLIdYp4pul2ptJm9UsisDPxGlVS_2-F8OrWnr9OGWz7Il7I_qxtiqFu9wNEjhxP-JjwbUlMee7ExfLeVv1DLwub_Q2grNTi3iRyPf8h7JFA5uH2T6H7uNoKwxp7BiNOb1xrLmMSpHwNqNdgihyl1eEc9-ZWvilSeDpm6vZnOGGC8HWFZUvqloHQpwONLoM5gEClDgYsTgpnK9IGNI8SFn0-VcxkYedtsC1r4RFvRvCTstcwtwCuzA")` }} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent pointer-events-none" />
                    
                    {/* Pulse Animation Dots */}
                    <div className="absolute top-1/3 left-1/2 w-4 h-4 bg-primary rounded-full animate-ping" />
                    <div className="absolute top-1/3 left-1/2 w-3 h-3 bg-[#00dbe9] rounded-full shadow-[0_0_10px_#00dbe9]" />
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/5 text-left">
                    <span className="text-[9px] text-on-surface-variant uppercase tracking-wider">Active Territory</span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <MapPin className="w-4 h-4 text-[#00f0ff]" />
                      <span className="text-sm font-bold text-white">{user.location || 'Mumbai, MH'}</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <a 
                      href="https://www.google.com/business/" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-xl border border-primary/30 bg-primary/5 text-[#00f0ff] font-bold text-[11px] hover:bg-primary/10 transition-all active:scale-95 group decoration-none"
                    >
                      <span>Add your company on Google Maps</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Render Modularized Tab Sections */}
          {activeTab === 'leads' && (
            <CustomerLeadsTab 
              leads={leads}
              onAddLead={handleAddLead}
              onSendQuotation={handleSendQuotationFromLead}
              selectedLead={selectedLead}
              setSelectedLead={setSelectedLead}
            />
          )}

          {activeTab === 'quotations' && (
            <QuotationManageTab 
              quotations={quotations}
              onAddQuotation={(newQ) => {
                const addedQ: Quotation = {
                  ...newQ,
                  id: `q-${Math.floor(8000 + Math.random() * 1000)}`,
                  date: 'Today'
                };
                setQuotations([addedQ, ...quotations]);
              }}
              onDeleteQuotation={(id) => {
                setQuotations(quotations.filter(q => q.id !== id));
                showToast('🗑️ Quotation draft deleted.', 'info');
              }}
              preFilledClientName={preFilledClient}
              preFilledSize={preFilledkW}
              onClearPreFilled={() => {
                setPreFilledClient('');
                setPreFilledkW('5');
              }}
              showToast={showToast}
            />
          )}

          {activeTab === 'installations' && (
            <InstallationTrackerTab 
              installations={installations}
              onUpdateProgress={(id, step, progress) => {
                setInstallations(installations.map(inst => {
                  if (inst.id === id) {
                    const isCompleted = progress === 100;
                    return { 
                      ...inst, 
                      step, 
                      progress, 
                      status: isCompleted ? 'Completed' : 'Active',
                      date: isCompleted ? 'Completed Today' : inst.date
                    };
                  }
                  return inst;
                }));
              }}
              onAddInstallation={(newInst) => {
                setInstallations([newInst, ...installations]);
              }}
              onDeleteInstallation={(id) => {
                setInstallations(installations.filter(inst => inst.id !== id));
              }}
              showToast={showToast}
            />
          )}

          {activeTab === 'analytics' && (
            <BusinessAnalyticsTab location={user.location} />
          )}

          {activeTab === 'profile' && (
            <CompanyProfileTab 
              companyDetails={companyDetails}
              onUpdateCompanyDetails={(details) => setCompanyDetails(details)}
              showToast={showToast}
            />
          )}

          {activeTab === 'setup' && (
            <SetupGuideTab showToast={showToast} />
          )}

        </main>
      </div>
    </div>
  );
}
