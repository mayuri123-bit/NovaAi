import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Calendar, 
  DollarSign, 
  Briefcase, 
  Sparkles,
  MapPin,
  CheckCircle2,
  ChevronRight,
  TrendingDown,
  Activity,
  ArrowUpRight,
  Zap,
  Globe,
  Award,
  Clock,
  Download,
  MoreVertical,
  Layers,
  FileText
} from 'lucide-react';

interface BusinessAnalyticsTabProps {
  location?: string;
}

export default function BusinessAnalyticsTab({ location = 'Maharashtra' }: BusinessAnalyticsTabProps) {
  const [timeRange, setTimeRange] = useState<'year' | 'quarter'>('year');
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  // Dynamic values based on timeRange
  const stats = {
    leads: timeRange === 'year' ? '2,482' : '624',
    leadsTrend: timeRange === 'year' ? '+12%' : '+4.5%',
    quotes: timeRange === 'year' ? '1,120' : '285',
    quotesTrend: timeRange === 'year' ? '+8%' : '+3.1%',
    active: timeRange === 'year' ? '45' : '18',
    completed: timeRange === 'year' ? '892' : '210',
    revenue: timeRange === 'year' ? '₹14.2M' : '₹3.6M',
    revenueTrend: timeRange === 'year' ? '+24%' : '+18.5%',
    csat: '98%',
  };

  const regionalData = [
    { name: 'North', height: '60%', value: '145 units', desc: 'Delhi NCR, Punjab' },
    { name: 'South', height: '85%', value: '290 units', desc: 'Bangalore, Chennai' },
    { name: 'East', height: '45%', value: '98 units', desc: 'Kolkata, Patna' },
    { name: 'West', height: '70%', value: '215 units', desc: 'Mumbai, Pune' },
    { name: 'Central', height: '95%', value: '344 units', desc: 'Hyderabad, Nagpur' },
  ];

  return (
    <div className="space-y-8 animate-fade-in text-left">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-4xl font-black text-[#00f0ff] tracking-tight mb-2 neon-text-glow">Business Analytics</h1>
          <p className="text-on-surface-variant max-w-2xl text-sm leading-relaxed">
            Real-time intelligence feed for your solar operations. Monitor sales conversion, installation pipelines, and revenue growth with AI-powered forecasting.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-[#1d2026] rounded-xl p-1 border border-white/5">
            <button 
              onClick={() => setTimeRange('year')}
              className={`px-4 py-2 rounded-lg font-bold text-xs transition-all cursor-pointer border-none ${
                timeRange === 'year' 
                  ? 'bg-[#00f0ff] text-[#002022]' 
                  : 'text-on-surface-variant hover:text-white bg-transparent'
              }`}
            >
              Current Year
            </button>
            <button 
              onClick={() => setTimeRange('quarter')}
              className={`px-4 py-2 rounded-lg font-bold text-xs transition-all cursor-pointer border-none ${
                timeRange === 'quarter' 
                  ? 'bg-[#00f0ff] text-[#002022]' 
                  : 'text-on-surface-variant hover:text-white bg-transparent'
              }`}
            >
              Quarterly
            </button>
          </div>
          <button 
            onClick={() => alert('📄 Initiating high-resolution data export (PDF/Excel) for SolarNexus Pro analytics.')}
            className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl hover:bg-white/10 active:scale-95 transition-all text-xs font-bold text-white cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#00f0ff]" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {/* Total Leads */}
        <div className="bg-[#1d2026]/40 border border-white/5 p-6 rounded-2xl flex flex-col justify-between group hover:border-[#00f0ff]/30 hover:shadow-[0_0_20px_rgba(0,240,255,0.02)] transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-5 h-5 text-[#00f0ff]" />
            <span className="text-emerald-400 font-bold text-xs flex items-center gap-0.5 font-mono">
              {stats.leadsTrend} <TrendingUp className="w-3 h-3" />
            </span>
          </div>
          <div>
            <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-wider font-mono mb-1">Total Leads</p>
            <h3 className="text-3xl font-black text-white">{stats.leads}</h3>
          </div>
        </div>

        {/* Quotations Sent */}
        <div className="bg-[#1d2026]/40 border border-white/5 p-6 rounded-2xl flex flex-col justify-between group hover:border-[#cf5cff]/30 hover:shadow-[0_0_20px_rgba(207,92,255,0.02)] transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <FileText className="w-5 h-5 text-[#cf5cff]" />
            <span className="text-emerald-400 font-bold text-xs flex items-center gap-0.5 font-mono">
              {stats.quotesTrend} <TrendingUp className="w-3 h-3" />
            </span>
          </div>
          <div>
            <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-wider font-mono mb-1">Quotations Sent</p>
            <h3 className="text-3xl font-black text-white">{stats.quotes}</h3>
          </div>
        </div>

        {/* Active Installations */}
        <div className="bg-[#1d2026]/40 border border-white/5 p-6 rounded-2xl flex flex-col justify-between group hover:border-[#00dbe9]/30 hover:shadow-[0_0_20px_rgba(0,219,233,0.02)] transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <Activity className="w-5 h-5 text-[#00dbe9]" />
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-bold font-mono">
              ON TRACK
            </span>
          </div>
          <div>
            <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-wider font-mono mb-1">Active Installs</p>
            <h3 className="text-3xl font-black text-white">{stats.active}</h3>
          </div>
        </div>

        {/* Completed Projects */}
        <div className="bg-[#1d2026]/40 border border-white/5 p-6 rounded-2xl flex flex-col justify-between group hover:border-white/10 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/20 px-2 py-0.5 rounded text-[10px] font-bold font-mono">
              MILESTONE
            </span>
          </div>
          <div>
            <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-wider font-mono mb-1">Completed Projects</p>
            <h3 className="text-3xl font-black text-white">{stats.completed}</h3>
          </div>
        </div>

        {/* Revenue Overview */}
        <div className="bg-[#1d2026]/40 border border-white/5 p-6 rounded-2xl flex flex-col justify-between group hover:border-[#00f0ff]/30 hover:shadow-[0_0_20px_rgba(0,240,255,0.02)] transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-5 h-5 text-[#00f0ff]" />
            <span className="text-emerald-400 font-bold text-xs flex items-center gap-0.5 font-mono">
              {stats.revenueTrend} <TrendingUp className="w-3 h-3" />
            </span>
          </div>
          <div>
            <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-wider font-mono mb-1">Revenue (INR)</p>
            <h3 className="text-3xl font-black text-white">{stats.revenue}</h3>
          </div>
        </div>

        {/* Customer Satisfaction */}
        <div className="bg-[#1d2026]/40 border border-white/5 p-6 rounded-2xl flex flex-col justify-between group hover:border-emerald-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.02)] transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <Award className="w-5 h-5 text-emerald-400" />
            <span className="bg-gradient-to-r from-[#00dbe9] to-[#cf5cff] text-[#002022] font-black px-2 py-0.5 rounded text-[9px] uppercase tracking-wider font-mono">
              ELITE
            </span>
          </div>
          <div>
            <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-wider font-mono mb-1">Satisfaction</p>
            <h3 className="text-3xl font-black text-white">{stats.csat}</h3>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Trends (Line Chart) */}
        <div className="bg-[#1d2026]/40 border border-white/5 p-8 rounded-3xl min-h-[450px] relative overflow-hidden flex flex-col hover:border-[#00f0ff]/20 transition-all duration-300">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#00f0ff]/5 blur-3xl rounded-full" />
          
          <div className="flex items-center justify-between mb-8 z-10">
            <div>
              <h4 className="text-xl font-bold text-white mb-1">Revenue Velocity</h4>
              <p className="text-xs text-on-surface-variant font-medium">Monthly growth projection vs actual</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#00f0ff]" />
                <span className="text-[10px] font-bold text-on-surface-variant uppercase font-mono">Actual</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#cf5cff] opacity-60" />
                <span className="text-[10px] font-bold text-on-surface-variant uppercase font-mono">Forecast</span>
              </div>
            </div>
          </div>

          <div className="flex-1 relative border-l border-b border-white/10 mt-4 flex items-end justify-between px-4 pb-4">
            {/* Custom chart grid lines background */}
            <div className="absolute inset-0 chart-grid opacity-30 pointer-events-none" />

            {/* SVG Chart Logic for UI */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none px-4" preserveAspectRatio="none" viewBox="0 0 800 300">
              <defs>
                <linearGradient id="lineGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="forecastGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#cf5cff" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#cf5cff" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* Forecast Area */}
              <path d="M0,260 L100,240 L200,210 L300,190 L400,160 L500,130 L600,110 L700,90 L800,60 V300 H0 Z" fill="url(#forecastGrad)" opacity="0.5" />
              <path d="M0,260 L100,240 L200,210 L300,190 L400,160 L500,130 L600,110 L700,90 L800,60" fill="none" stroke="#cf5cff" strokeWidth="2" strokeDasharray="4 4" opacity="0.7" />

              {/* Actual Area */}
              <path d="M0,270 L100,230 L200,245 L300,180 L400,205 L500,115 L600,95 L700,135 L800,75 V300 H0 Z" fill="url(#lineGrad)" />
              <path d="M0,270 L100,230 L200,245 L300,180 L400,205 L500,115 L600,95 L700,135 L800,75" fill="none" stroke="#00f0ff" strokeWidth="3" className="glow-line" />
            </svg>

            {/* Mock Data Labels */}
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'].map((mon) => (
              <span key={mon} className="text-[10px] font-bold text-on-surface-variant/50 font-mono z-10">{mon}</span>
            ))}
          </div>
        </div>

        {/* Project Throughput (Bar Chart) */}
        <div className="bg-[#1d2026]/40 border border-white/5 p-8 rounded-3xl min-h-[450px] flex flex-col hover:border-[#00f0ff]/20 transition-all duration-300">
          <div className="flex items-center justify-between mb-8 z-10">
            <div>
              <h4 className="text-xl font-bold text-white mb-1">Project Throughput</h4>
              <p className="text-xs text-on-surface-variant font-medium">Units completed by geographic region</p>
            </div>
            <button className="text-on-surface-variant hover:text-white border-none bg-transparent cursor-pointer">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 flex items-end justify-between gap-4 mt-4 pb-4">
            {regionalData.map((reg) => (
              <div 
                key={reg.name} 
                className="flex-1 flex flex-col items-center gap-3 group relative cursor-pointer"
                onMouseEnter={() => setHoveredRegion(reg.name)}
                onMouseLeave={() => setHoveredRegion(null)}
              >
                {/* Tooltip for the bar */}
                {hoveredRegion === reg.name && (
                  <div className="absolute -top-12 bg-[#191c22] border border-[#00f0ff]/30 px-3 py-1.5 rounded-lg shadow-xl z-20 text-center pointer-events-none animate-fade-in font-mono text-[10px]">
                    <span className="text-[#00f0ff] font-bold block">{reg.value}</span>
                    <span className="text-[#b9cacb]/60">{reg.desc}</span>
                  </div>
                )}

                <div 
                  className="w-full bg-white/5 rounded-t-lg relative overflow-hidden transition-all duration-300" 
                  style={{ height: reg.height }}
                >
                  <div 
                    className={`absolute bottom-0 w-full bg-[#00f0ff]/20 border-t border-[#00f0ff] transition-all duration-700 ease-out ${
                      hoveredRegion === reg.name ? 'h-full bg-[#00f0ff]/40' : 'h-1/2'
                    }`} 
                  />
                </div>
                <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider font-mono">{reg.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Intelligence Feed (Detailed Section) */}
      <div className="bg-[#1d2026]/40 border border-white/5 p-8 rounded-3xl hover:border-[#00f0ff]/20 transition-all duration-300">
        <div className="flex items-center justify-between mb-8">
          <h4 className="text-xl font-black text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#00f0ff]" />
            Live Intelligence Feed
          </h4>
          <span className="flex items-center gap-2 text-[#00f0ff] text-xs font-bold font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] animate-pulse" />
            Syncing Live Data...
          </span>
        </div>

        <div className="space-y-4">
          {/* Feed Item 1 */}
          <div className="flex items-center justify-between p-4 bg-white/[0.01] hover:bg-white/[0.04] rounded-2xl transition-all duration-300 group border border-transparent hover:border-white/5">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-xl bg-[#00f0ff]/10 flex items-center justify-center border border-[#00f0ff]/20 group-hover:scale-105 transition-all">
                <Sparkles className="w-5 h-5 text-[#00f0ff]" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-white group-hover:text-[#00f0ff] transition-colors">New Lead Detected: Commercial Complex X</h5>
                <p className="text-xs text-on-surface-variant mt-1">Potential 200kW installation in Bangalore North. High conversion probability (88%).</p>
              </div>
            </div>
            <div className="text-right font-mono">
              <p className="text-sm font-black text-[#00f0ff]">₹1.2Cr</p>
              <p className="text-[10px] text-on-surface-variant/60 font-semibold mt-1">2 mins ago</p>
            </div>
          </div>

          {/* Feed Item 2 */}
          <div className="flex items-center justify-between p-4 bg-white/[0.01] hover:bg-white/[0.04] rounded-2xl transition-all duration-300 group border border-transparent hover:border-white/5">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:scale-105 transition-all">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">Project Completed: Vertex Apartments</h5>
                <p className="text-xs text-on-surface-variant mt-1">Commissioning complete. Warranty certification issued. CSAT Score: 5/5.</p>
              </div>
            </div>
            <div className="text-right font-mono">
              <p className="text-sm font-black text-emerald-400">Completed</p>
              <p className="text-[10px] text-on-surface-variant/60 font-semibold mt-1">1 hour ago</p>
            </div>
          </div>

          {/* Feed Item 3 */}
          <div className="flex items-center justify-between p-4 bg-white/[0.01] hover:bg-white/[0.04] rounded-2xl transition-all duration-300 group border border-transparent hover:border-white/5">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-xl bg-[#cf5cff]/10 flex items-center justify-center border border-[#cf5cff]/20 group-hover:scale-105 transition-all">
                <Clock className="w-5 h-5 text-[#cf5cff]" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-white group-hover:text-[#cf5cff] transition-colors">Quotation Pending Approval</h5>
                <p className="text-xs text-on-surface-variant mt-1">Awaiting vendor signature for the Hyderabad Industrial Zone tender.</p>
              </div>
            </div>
            <div className="text-right font-mono">
              <p className="text-sm font-black text-[#cf5cff]">Action Required</p>
              <p className="text-[10px] text-on-surface-variant/60 font-semibold mt-1">4 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

