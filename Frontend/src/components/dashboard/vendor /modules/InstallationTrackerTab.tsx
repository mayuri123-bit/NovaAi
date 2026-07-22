import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Zap, 
  Activity, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  Plus,
  Trash2,
  Users,
  Search,
  Download,
  Check,
  X
} from 'lucide-react';

export interface Installation {
  id: string;
  client: string;
  size: string;
  progress: number;
  step: string;
  date: string;
  status: string;
  location?: string;
  team?: string;
}

interface InstallationTrackerTabProps {
  installations: Installation[];
  onUpdateProgress?: (id: string, step: string, progress: number) => void;
  onAddInstallation?: (newInst: Installation) => void;
  onDeleteInstallation?: (id: string) => void;
  showToast?: (text: string, type?: 'success' | 'info') => void;
}

export default function InstallationTrackerTab({ 
  installations, 
  onUpdateProgress,
  onAddInstallation,
  onDeleteInstallation,
  showToast = () => {} 
}: InstallationTrackerTabProps) {
  const [selectedInst, setSelectedInst] = useState<Installation | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal State for New Project
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [newClient, setNewClient] = useState('');
  const [newSize, setNewSize] = useState('5 kW');
  const [newLocation, setNewLocation] = useState('Mumbai, MH');
  const [newTeam, setNewTeam] = useState('Alpha Squad');
  const [newProgress, setNewProgress] = useState(15);

  // Local state for upcoming projects (from HTML mockup) to show en-route/scheduled work
  const [upcomingProjects, setUpcomingProjects] = useState([
    { id: 'up-1', client: 'Harborview Estate', location: 'Sector 4G', team: 'Zeta Team', date: 'Oct 12, 2026', status: 'Pre-Deployment' },
    { id: 'up-2', client: 'Summit Peak Lodge', location: 'High Alt. Zone', team: 'Echo Logistics', date: 'Oct 15, 2026', status: 'Survey Pending' },
  ]);

  // Handle Export Data
  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(installations, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "solarnexus_installations.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('📊 Exported installation log data successfully!', 'success');
  };

  // Dynamic Completed Quota calculation
  const completedCount = installations.filter(i => i.status === 'Completed').length;
  const activeCount = installations.filter(i => i.status !== 'Completed').length;
  const totalCount = installations.length;
  // Safe quota target
  const quotaTarget = Math.max(15, totalCount + 3);

  // Filtered list
  const filteredInstallations = installations.filter(inst => {
    const matchSearch = inst.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (inst.location || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                        inst.step.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSearch;
  });

  // Promote upcoming project to active
  const handlePromoteUpcoming = (proj: typeof upcomingProjects[0]) => {
    if (!onAddInstallation) return;
    const newInst: Installation = {
      id: `inst-${Date.now()}`,
      client: proj.client,
      size: '8 kW',
      progress: 10,
      step: 'Site Survey & Permit Approval',
      date: 'Started Today',
      status: 'Active',
      location: proj.location,
      team: proj.team
    };
    onAddInstallation(newInst);
    setUpcomingProjects(upcomingProjects.filter(p => p.id !== proj.id));
    showToast(`🚀 ${proj.client} promoted to Active Installations!`, 'success');
  };

  // Handle creation of new installation
  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient.trim()) {
      showToast('⚠️ Please enter a client name.', 'info');
      return;
    }

    if (onAddInstallation) {
      const stepName = newProgress < 40 
        ? 'Site Survey & Permit Approval' 
        : newProgress < 80 
          ? 'Panel Mounting & Wiring' 
          : 'MNRE Approval Sync';

      const newInst: Installation = {
        id: `inst-${Date.now()}`,
        client: newClient,
        size: newSize,
        progress: newProgress,
        step: stepName,
        date: 'Scheduled Today',
        status: newProgress === 100 ? 'Completed' : 'Active',
        location: newLocation,
        team: newTeam
      };

      onAddInstallation(newInst);
      showToast(`✨ New installation created for ${newClient}!`, 'success');
      
      // Reset form & close
      setNewClient('');
      setIsNewProjectModalOpen(false);
    }
  };

  // Helper to resolve milestone state based on progress
  const getMilestoneState = (progress: number, milestoneIndex: number) => {
    // 0: Survey, 1: Mounting, 2: Grid-In
    if (milestoneIndex === 0) {
      if (progress >= 40) return 'Done';
      if (progress > 0) return 'Active';
      return 'Pending';
    } else if (milestoneIndex === 1) {
      if (progress >= 80) return 'Done';
      if (progress >= 40) return 'Active';
      return 'Pending';
    } else {
      if (progress === 100) return 'Done';
      if (progress >= 80) return 'Active';
      return 'Pending';
    }
  };

  const handleAdvanceStep = (inst: Installation) => {
    if (!onUpdateProgress) return;
    
    let nextStep = inst.step;
    let nextProgress = inst.progress;

    if (inst.progress < 40) {
      nextStep = 'Panel Mounting & Wiring';
      nextProgress = 60;
    } else if (inst.progress < 80) {
      nextStep = 'MNRE Approval Sync & Net-Metering';
      nextProgress = 85;
    } else if (inst.progress < 100) {
      nextStep = 'Net Meter Handover & Live';
      nextProgress = 100;
    }

    onUpdateProgress(inst.id, nextStep, nextProgress);
    showToast(`⚙️ Milestone updated for ${inst.client} to ${nextProgress}%!`, 'success');
    if (selectedInst?.id === inst.id) {
      setSelectedInst({ ...inst, step: nextStep, progress: nextProgress });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in text-left">
      {/* Top action header bar */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/5">
        <div>
          <nav className="flex items-center gap-2 text-[10px] text-on-surface-variant uppercase tracking-widest mb-2 font-mono">
            <span>Admin</span>
            <span className="text-xs">/</span>
            <span className="text-primary-fixed">Installations</span>
          </nav>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00f0ff] animate-pulse">precision_manufacturing</span>
            Installation Hub
          </h2>
          <p className="text-sm text-[#b9cacb] mt-1">Monitor deployment logistics across the regional grid in real-time. High-fidelity operational tracking enabled.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b9cacb]/60 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search active field orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-black/25 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/50 w-60 placeholder-white/20"
            />
          </div>
          <button 
            onClick={handleExportData}
            className="glass-panel px-4 py-2.5 rounded-xl flex items-center gap-2 text-xs font-semibold text-[#b9cacb] hover:text-[#00f0ff] hover:border-[#00f0ff]/30 transition-all border-white/10"
          >
            <Download className="w-3.5 h-3.5" />
            Export Data
          </button>
          <button 
            onClick={() => setIsNewProjectModalOpen(true)}
            className="bg-[#00f0ff] text-[#002022] font-black px-4 py-2.5 rounded-xl text-xs hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,240,255,0.2)]"
          >
            <Plus className="w-4 h-4" />
            New Project
          </button>
        </div>
      </div>

      {/* Grid containing Active installations, Sidebar, Completed widget */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Active Installations Grid - Col span 2 */}
        <div className="xl:col-span-2 space-y-8">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-xs text-[#00f0ff] bg-[#00f0ff]/10 p-1 rounded-md">pending_actions</span>
                <h3 className="text-lg font-black text-white">Ongoing Field Deployments</h3>
                <span className="bg-[#00f0ff]/10 text-[#00f0ff] text-[10px] font-bold px-2 py-0.5 rounded-md font-mono flex items-center gap-1.5 ml-2">
                  <span className="w-1.5 h-1.5 bg-[#00f0ff] rounded-full animate-pulse" />
                  {activeCount} Active
                </span>
              </div>
            </div>

            {filteredInstallations.filter(i => i.status !== 'Completed').length === 0 ? (
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-10 text-center text-[#b9cacb]/60">
                <p className="text-sm">No ongoing deployments match your query.</p>
                <button 
                  onClick={() => setIsNewProjectModalOpen(true)}
                  className="mt-4 text-xs font-bold text-[#00f0ff] hover:underline bg-transparent border-none cursor-pointer"
                >
                  Create an installation project
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredInstallations.filter(i => i.status !== 'Completed').map((inst) => {
                  const sState = getMilestoneState(inst.progress, 0);
                  const mState = getMilestoneState(inst.progress, 1);
                  const gState = getMilestoneState(inst.progress, 2);

                  return (
                    <div 
                      key={inst.id} 
                      className={`glass-panel p-6 rounded-2xl flex flex-col justify-between hover:border-[#00f0ff]/30 transition-all duration-300 group ${
                        selectedInst?.id === inst.id ? 'border-[#00f0ff]/40 bg-white/[0.04]' : 'border-white/5'
                      }`}
                      onClick={() => setSelectedInst(inst)}
                    >
                      <div>
                        {/* Card Header */}
                        <div className="flex justify-between items-start gap-3 mb-4">
                          <div>
                            <h4 className="font-headline-md text-base text-white font-bold group-hover:text-[#00f0ff] transition-colors">{inst.client}</h4>
                            <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#b9cacb]/80 mt-1 font-mono">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-[#00f0ff]" />
                                {inst.location || 'Mumbai, MH'}
                              </span>
                              <span>•</span>
                              <span>Size: {inst.size}</span>
                            </div>
                          </div>
                          
                          <div className="bg-white/5 px-2 py-1 rounded border border-white/5 shrink-0">
                            <span className="text-[10px] font-bold text-[#cf5cff] font-mono">{inst.team || 'Alpha Squad'}</span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-6">
                          <div className="flex justify-between items-center mb-1 text-xs">
                            <span className="text-[#b9cacb] font-mono truncate max-w-[150px]">{inst.step}</span>
                            <span className="text-[#00f0ff] font-bold font-mono">{inst.progress}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-[#10131a] rounded-full overflow-hidden border border-white/5">
                            <div 
                              className="h-full bg-gradient-to-r from-[#00f0ff] to-[#cf5cff] glow-pulse transition-all duration-500" 
                              style={{ width: `${inst.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Milestones Checklist */}
                      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5">
                        <div className="space-y-1">
                          <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest font-mono">Survey</p>
                          <div className="flex items-center gap-1.5">
                            {sState === 'Done' ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            ) : sState === 'Active' ? (
                              <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse shrink-0" />
                            ) : (
                              <span className="w-2 h-2 rounded-full bg-white/20 shrink-0" />
                            )}
                            <span className={`text-[10px] font-bold ${sState === 'Done' ? 'text-emerald-400' : sState === 'Active' ? 'text-[#00f0ff]' : 'text-[#b9cacb]/40'}`}>
                              {sState}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest font-mono">Mounting</p>
                          <div className="flex items-center gap-1.5">
                            {mState === 'Done' ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            ) : mState === 'Active' ? (
                              <span className="w-2 h-2 rounded-full bg-[#cf5cff] animate-pulse shrink-0" />
                            ) : (
                              <span className="w-2 h-2 rounded-full bg-white/20 shrink-0" />
                            )}
                            <span className={`text-[10px] font-bold ${mState === 'Done' ? 'text-emerald-400' : mState === 'Active' ? 'text-[#cf5cff]' : 'text-[#b9cacb]/40'}`}>
                              {mState}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest font-mono">Grid-In</p>
                          <div className="flex items-center gap-1.5">
                            {gState === 'Done' ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            ) : gState === 'Active' ? (
                              <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse shrink-0" />
                            ) : (
                              <span className="w-2 h-2 rounded-full bg-white/20 shrink-0" />
                            )}
                            <span className={`text-[10px] font-bold ${gState === 'Done' ? 'text-emerald-400' : gState === 'Active' ? 'text-[#00f0ff]' : 'text-[#b9cacb]/40'}`}>
                              {gState}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Upcoming Installations Section from Mockup */}
          <div className="pt-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-xs text-[#cf5cff] bg-[#cf5cff]/10 p-1 rounded-md">calendar_month</span>
              <h3 className="text-lg font-black text-white">Upcoming Deployments</h3>
            </div>

            <div className="space-y-3">
              {upcomingProjects.map((proj) => (
                <div 
                  key={proj.id}
                  className="glass-panel p-5 rounded-2xl flex flex-wrap md:flex-nowrap items-center justify-between gap-6 hover:bg-white/[0.02] border-white/5 hover:border-white/10 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-black/20 flex flex-col items-center justify-center border border-white/5 shrink-0 text-center font-mono">
                      <span className="text-[9px] text-[#b9cacb] uppercase font-bold tracking-wider">Date</span>
                      <span className="text-sm font-black text-[#00f0ff] mt-0.5">{proj.date.split(' ')[1]?.replace(',', '') || '12'}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-[#00f0ff] transition-colors">{proj.client}</h4>
                      <div className="flex items-center gap-3 text-xs text-[#b9cacb]/60 mt-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {proj.location}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {proj.team}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-[#cf5cff]/10 border border-[#cf5cff]/20 px-3 py-1.5 rounded-lg text-center font-mono">
                      <span className="text-[9px] text-[#b9cacb] uppercase tracking-wider block">Status</span>
                      <span className="text-[10px] font-bold text-[#cf5cff]">{proj.status}</span>
                    </div>

                    <button 
                      onClick={() => handlePromoteUpcoming(proj)}
                      className="px-3.5 py-2 bg-white/5 hover:bg-[#00f0ff]/20 hover:text-[#00f0ff] border border-white/10 rounded-xl text-xs font-bold transition-all flex items-center gap-1 shrink-0"
                    >
                      Deploy Now
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Controls and Quota Widgets - Col span 1 */}
        <div className="space-y-8">
          
          {/* Active Sidebar Controls */}
          <div className="bg-white/[0.01] border border-white/5 rounded-2xl overflow-hidden">
            <div className="p-4 bg-white/5 border-b border-white/5">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-xs text-[#00f0ff]">dashboard_customize</span>
                Operational Control Center
              </h3>
            </div>

            {selectedInst ? (
              <div className="p-6 space-y-6">
                <div>
                  <span className="text-[10px] text-[#00f0ff] font-mono uppercase tracking-wider font-bold block mb-1">PROJECT TARGET</span>
                  <h4 className="text-lg font-black text-white">{selectedInst.client}</h4>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-[#b9cacb] font-mono">Cap: {selectedInst.size}</span>
                    <span className="text-xs text-white/40 font-mono">|</span>
                    <span className="text-xs text-[#b9cacb] font-mono">Team: {selectedInst.team || 'Alpha Squad'}</span>
                  </div>
                </div>

                <div className="bg-black/20 border border-white/5 rounded-xl p-4 space-y-3 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#b9cacb]/80">Current Phase:</span>
                    <span className="text-[#cf5cff] font-bold">{selectedInst.step}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#b9cacb]/80">Project Progress:</span>
                    <span className="text-white font-bold">{selectedInst.progress}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#b9cacb]/80">Sync Schedule:</span>
                    <span className="text-[#00f0ff] font-bold">{selectedInst.date}</span>
                  </div>
                </div>

                {selectedInst.progress < 100 ? (
                  <button 
                    onClick={() => handleAdvanceStep(selectedInst)}
                    className="w-full py-3 bg-[#00f0ff] text-[#002022] font-black rounded-xl text-xs hover:brightness-110 active:scale-95 transition-all border-none cursor-pointer flex justify-center items-center gap-1.5"
                  >
                    Advance Project Milestone
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold p-3.5 rounded-xl flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Project successfully synchronized and live on grid!</span>
                  </div>
                )}

                <div className="bg-black/10 p-4 rounded-xl border border-white/5 text-[11px] leading-relaxed text-[#b9cacb]/80">
                  <span className="text-[#00f0ff] font-bold font-mono uppercase block mb-1">Safety & Compliance</span>
                  <p>Check standard earthing wires, secure wind-loading clamps, and verify dual-conduit isolating breaker before sync handover.</p>
                </div>

                {onDeleteInstallation && (
                  <button 
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to delete ${selectedInst.client}'s installation tracker?`)) {
                        onDeleteInstallation(selectedInst.id);
                        setSelectedInst(null);
                        showToast('🗑️ Project installation deleted.', 'info');
                      }
                    }}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 hover:bg-red-500/10 text-red-400 hover:text-red-300 rounded-xl text-xs font-bold transition-all border border-dashed border-red-500/20 bg-transparent cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Decommission Tracker
                  </button>
                )}
              </div>
            ) : (
              <div className="p-10 text-center space-y-4">
                <span className="material-symbols-outlined text-4xl text-[#ecb2ff]/40 block animate-bounce">touch_app</span>
                <p className="text-xs text-[#b9cacb]/80">Select any ongoing field deployment card to view operational control logs, advance tasks, or trigger synchronization commands.</p>
              </div>
            )}
          </div>

          {/* Completed Quota Box (from HTML design) */}
          <div className="glass-panel rounded-2xl overflow-hidden border-white/5">
            <div className="p-6 bg-white/5 border-b border-white/5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-[#b9cacb] uppercase tracking-widest font-mono">Monthly Grid-In Quota</span>
                <span className="text-xs text-[#00f0ff] font-bold font-mono">{completedCount} / 15 Units</span>
              </div>
              <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 shadow-[0_0_10px_rgba(52,211,153,0.4)] transition-all duration-1000" 
                  style={{ width: `${(completedCount / 15) * 100}%` }}
                />
              </div>
            </div>

            {/* Completed List (dynamically sync'ed) */}
            <div className="divide-y divide-white/5 max-h-60 overflow-y-auto custom-scrollbar">
              {installations.filter(i => i.status === 'Completed').length === 0 ? (
                <div className="p-6 text-center text-xs text-[#b9cacb]/40">
                  No projects completed this month yet.
                </div>
              ) : (
                installations.filter(i => i.status === 'Completed').map(inst => (
                  <div key={inst.id} className="p-4 hover:bg-white/5 transition-all group flex justify-between items-center">
                    <div>
                      <p className="font-bold text-xs text-white truncate max-w-[140px]">{inst.client}</p>
                      <p className="text-[10px] text-[#b9cacb]/60 mt-0.5">Capacity: {inst.size}</p>
                    </div>
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase">
                      Grid-Live
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

      {/* New Project Dialog/Modal */}
      {isNewProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsNewProjectModalOpen(false)} />

          {/* Modal Card */}
          <div className="relative bg-[#191c22] border border-white/10 rounded-2xl w-full max-w-lg p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 animate-fade-in">
            <button 
              onClick={() => setIsNewProjectModalOpen(false)}
              className="absolute right-4 top-4 p-2 text-on-surface-variant hover:text-white rounded-full bg-transparent border-none cursor-pointer focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-white mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00f0ff]">add_task</span>
              Initiate Installation Project
            </h3>
            <p className="text-xs text-[#b9cacb] mb-6">Create a high-fidelity logistics tracking workflow for a newly synchronized customer order.</p>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#00f0ff] block font-mono mb-1.5" htmlFor="client">
                  Client / Company Name
                </label>
                <input
                  id="client"
                  type="text"
                  required
                  placeholder="e.g. Sterling Residences, Sunil K."
                  value={newClient}
                  onChange={(e) => setNewClient(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00f0ff] transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#00f0ff] block font-mono mb-1.5" htmlFor="size">
                    System Size (kW)
                  </label>
                  <select
                    id="size"
                    value={newSize}
                    onChange={(e) => setNewSize(e.target.value)}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00f0ff] transition-all"
                  >
                    <option value="4 kW" className="bg-[#191c22]">4 kW</option>
                    <option value="5 kW" className="bg-[#191c22]">5 kW</option>
                    <option value="8 kW" className="bg-[#191c22]">8 kW</option>
                    <option value="12 kW" className="bg-[#191c22]">12 kW</option>
                    <option value="15 kW" className="bg-[#191c22]">15 kW</option>
                    <option value="25 kW" className="bg-[#191c22]">25 kW</option>
                    <option value="50 kW" className="bg-[#191c22]">50 kW</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#00f0ff] block font-mono mb-1.5" htmlFor="team">
                    Assigned Field Team
                  </label>
                  <select
                    id="team"
                    value={newTeam}
                    onChange={(e) => setNewTeam(e.target.value)}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00f0ff] transition-all"
                  >
                    <option value="Alpha Squad" className="bg-[#191c22]">Alpha Squad</option>
                    <option value="Omega Eng." className="bg-[#191c22]">Omega Eng.</option>
                    <option value="Zeta Team" className="bg-[#191c22]">Zeta Team</option>
                    <option value="Echo Logistics" className="bg-[#191c22]">Echo Logistics</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#00f0ff] block font-mono mb-1.5" htmlFor="location">
                    Installation Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    required
                    placeholder="e.g. Austin, TX"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00f0ff] transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#00f0ff] block font-mono mb-1.5" htmlFor="progress">
                    Starting Progress
                  </label>
                  <select
                    id="progress"
                    value={newProgress}
                    onChange={(e) => setNewProgress(Number(e.target.value))}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00f0ff] transition-all"
                  >
                    <option value="15" className="bg-[#191c22]">15% (Survey Phase)</option>
                    <option value="50" className="bg-[#191c22]">50% (Mounting Phase)</option>
                    <option value="85" className="bg-[#191c22]">85% (Sync/Approval Phase)</option>
                    <option value="100" className="bg-[#191c22]">100% (Completed Live)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewProjectModalOpen(false)}
                  className="flex-1 py-3 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/5 text-[#b9cacb] transition-all bg-transparent cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#00f0ff] text-[#002022] rounded-xl text-xs font-black hover:brightness-110 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all border-none cursor-pointer"
                >
                  Deploy Tracker
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
