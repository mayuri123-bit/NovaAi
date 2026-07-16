import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Trash2, 
  Mic, 
  Plus, 
  History, 
  Calculator, 
  Compass, 
  ArrowRight, 
  Check, 
  Volume2, 
  BookOpen, 
  HelpCircle,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AIAssistantTabProps {
  user: {
    fullName: string;
    email: string;
    location: string;
    avatarUrl?: string;
  };
  messages: Array<{ id: string; sender: 'user' | 'assistant'; text: string; time: string }>;
  inputMsg: string;
  setInputMsg: (val: string) => void;
  handleSendMessage: (e?: React.FormEvent, customText?: string) => void;
  setActiveTab?: (tab: any) => void;
  monthlyBill?: number;
  calculatedCapacity?: number;
  finalCost?: number;
  paybackYears?: number;
}

const PRESET_SUGGESTIONS = [
  {
    title: "Calculate My Costs",
    subtitle: "Check my system recommendations and estimated payback period",
    query: "Calculate my recommended solar system size and payback period."
  },
  {
    title: "Subsidy Benefits",
    subtitle: "Explore PM Surya Ghar solar rooftop scheme details & eligibility",
    query: "What subsidies and benefits am I eligible for in this region?"
  },
  {
    title: "Compare Installers",
    subtitle: "Compare top pre-vetted teams near my location in detail",
    query: "Who is the highest rated solar installer near me?"
  },
  {
    title: "Net Metering Info",
    subtitle: "Understand bidirection energy exchange with my utility provider",
    query: "How does net metering work with local utility?"
  }
];

const RECENT_CONVERSATIONS = [
  { id: 'rec-1', topic: 'Residential Solar Cost in Mumbai', desc: 'Detailed 5kW calculations', date: 'Just now', query: 'What is the detailed cost breakdown of a 5kW rooftop system?' },
  { id: 'rec-2', topic: 'Net Metering Application Guide', desc: 'Steps for utility synchrony', date: '2 hours ago', query: 'What are the exact steps to apply for utility net metering?' },
  { id: 'rec-3', topic: 'Monofacial vs Bifacial Panels', desc: 'Panel efficiency comparisons', date: 'Yesterday', query: 'Which panels are better for high-heat tropical regions?' },
  { id: 'rec-4', topic: 'PM Surya Ghar rooftop scheme', desc: 'Subsidy caps & limits', date: '3 days ago', query: 'Can you explain the subsidy limit for a 3kW PM Surya Ghar setup?' }
];

export default function AIAssistantTab({
  user,
  messages,
  inputMsg,
  setInputMsg,
  handleSendMessage,
  setActiveTab,
  monthlyBill = 150,
  calculatedCapacity = 5,
  finalCost = 8000,
  paybackYears = 6.2
}: AIAssistantTabProps) {
  const [searchHistory, setSearchHistory] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [proUpgraded, setProUpgraded] = useState(false);
  const [isReadingAloudId, setIsReadingAloudId] = useState<string | null>(null);
  
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll chat to bottom when messages update
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle preset suggestion click
  const handleSuggestionClick = (query: string) => {
    handleSendMessage(undefined, query);
  };

  // Clear Chat function inside active screen
  const [localMessages, setLocalMessages] = useState<Array<{ id: string; sender: 'user' | 'assistant'; text: string; time: string }>>([]);
  
  // Use messages from props but allow filtering local view if required
  const displayMessages = messages;

  // Sync typing indicator when the last message is from user
  const isTyping = displayMessages.length > 0 && displayMessages[displayMessages.length - 1].sender === 'user';

  const triggerVoiceSimulation = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      handleSendMessage(undefined, "Show solar options for " + user.location);
    }, 2200);
  };

  // Text to Speech simulator
  const handleReadAloud = (id: string, text: string) => {
    if (isReadingAloudId === id) {
      setIsReadingAloudId(null);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    } else {
      setIsReadingAloudId(id);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => setIsReadingAloudId(null);
        window.speechSynthesis.speak(utterance);
      } else {
        // Fallback simulator
        setTimeout(() => setIsReadingAloudId(null), 3000);
      }
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };

  const filteredHistory = RECENT_CONVERSATIONS.filter(item => 
    item.topic.toLowerCase().includes(searchHistory.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchHistory.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start w-full text-left reveal-item">
      {/* LEFT CHAT CANVAS & PRESET CONTROLS */}
      <div className="xl:col-span-8 flex flex-col space-y-6">
        
        {/* Chat window viewport */}
        <div className="glass-panel rounded-3xl border-white/10 bg-gradient-to-b from-black/50 via-[#0d0f14]/80 to-[#10131a] shadow-2xl h-[550px] flex flex-col justify-between overflow-hidden relative">
          
          {/* Header row in the viewport */}
          <div className="px-6 py-4 border-b border-white/5 bg-black/40 flex justify-between items-center z-10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00dbe9] to-[#cf5cff] p-[1px]">
                  <div className="w-full h-full rounded-[11px] bg-black flex items-center justify-center overflow-hidden">
                    <span className="material-symbols-outlined text-transparent bg-clip-text bg-gradient-to-r from-[#00dbe9] to-[#cf5cff] text-xl font-bold">smart_toy</span>
                  </div>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#10131a]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-white">NovaAI Assistant</span>
                  <span className="px-1.5 py-0.5 bg-[#00dbe9]/15 border border-[#00dbe9]/30 rounded-md text-[8px] font-black text-[#00dbe9] tracking-widest uppercase">Beta</span>
                </div>
                <p className="text-[10px] text-[#b9cacb]/60">Solar Intelligence Engine • Active in {user.location}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={triggerVoiceSimulation}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#b9cacb] hover:text-white transition-all cursor-pointer"
                title="Simulate Voice Input"
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Chat messages canvas */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scroll-hide">
            {displayMessages.map((msg) => {
              const isAssistant = msg.sender === 'assistant';
              
              return (
                <div
                  key={msg.id}
                  className={`flex gap-4 ${isAssistant ? '' : 'flex-row-reverse'}`}
                >
                  {/* Avatar indicator */}
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                    isAssistant 
                      ? 'bg-[#00dbe9]/10 border-[#00dbe9]/20 text-[#00dbe9]' 
                      : 'bg-white/5 border-white/10 text-white'
                  }`}>
                    {isAssistant ? (
                      <Bot className="w-4 h-4" />
                    ) : (
                      <span className="text-xs font-black">{getInitials(user.fullName)}</span>
                    )}
                  </div>

                  {/* Message bubble */}
                  <div className="max-w-[75%] space-y-1 text-left">
                    <div className={`p-4 rounded-2xl ${
                      isAssistant 
                        ? 'rounded-tl-none bg-[#1d2026]/90 border border-white/5 text-[#e1e2eb]' 
                        : 'rounded-tr-none bg-gradient-to-r from-[#00dbe9]/10 to-[#cf5cff]/10 border border-[#00dbe9]/20 text-white'
                    }`}>
                      <p className="text-xs leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    </div>
                    
                    {/* Message metadata under-line */}
                    <div className={`flex items-center gap-3 text-[9px] text-[#b9cacb]/50 px-1 ${
                      isAssistant ? 'justify-start' : 'justify-end'
                    }`}>
                      <span>{msg.time}</span>
                      {isAssistant && (
                        <>
                          <span>•</span>
                          <button 
                            onClick={() => handleReadAloud(msg.id, msg.text)}
                            className={`flex items-center gap-1 hover:text-white transition-colors cursor-pointer ${
                              isReadingAloudId === msg.id ? 'text-[#00dbe9] animate-pulse' : ''
                            }`}
                          >
                            <Volume2 className="w-3 h-3" />
                            <span>{isReadingAloudId === msg.id ? 'Reading...' : 'Listen'}</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Simulated Live typing indicator */}
            {isTyping && (
              <div className="flex gap-4">
                <div className="w-9 h-9 rounded-xl bg-[#00dbe9]/10 border border-[#00dbe9]/20 text-[#00dbe9] flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 animate-bounce" />
                </div>
                <div className="p-4 rounded-2xl rounded-tl-none bg-[#1d2026]/90 border border-white/5 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#00dbe9] animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-[#00dbe9] animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-[#00dbe9] animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* Chat input form container */}
          <div className="px-6 pb-6 pt-4 bg-gradient-to-t from-[#10131a] via-[#10131a]/95 to-transparent shrink-0">
            {isListening && (
              <div className="mb-3 px-4 py-2 rounded-xl bg-[#00dbe9]/10 border border-[#00dbe9]/20 flex items-center justify-between text-xs text-white">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span>NovaAI is listening to your speech...</span>
                </span>
                <span className="font-mono text-[10px] text-[#00dbe9]">Mumbai Radar active</span>
              </div>
            )}

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(e);
              }}
              className="glass-panel p-2.5 rounded-2xl border-white/10 bg-black/60 shadow-xl flex items-center gap-2"
            >
              <button
                type="button"
                onClick={() => {
                  setInputMsg('');
                  if (setActiveTab) setActiveTab('dashboard');
                }}
                className="w-10 h-10 rounded-xl bg-white/5 text-[#b9cacb] hover:text-white hover:bg-white/10 flex items-center justify-center transition-all cursor-pointer"
                title="Return Home"
              >
                <Compass className="w-4 h-4" />
              </button>

              <input 
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Ask NovaAI about your solar needs (e.g. costs, payback period, net metering)..."
                className="flex-1 bg-transparent border-none text-xs text-white placeholder:text-[#b9cacb]/40 focus:ring-0 focus:outline-none px-2"
                disabled={isTyping}
              />

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={triggerVoiceSimulation}
                  className="w-10 h-10 rounded-xl bg-white/5 text-[#b9cacb] hover:text-[#00dbe9] hover:bg-white/10 flex items-center justify-center transition-all cursor-pointer"
                  title="Voice Command"
                >
                  <Mic className="w-4 h-4" />
                </button>
                <button
                  type="submit"
                  disabled={!inputMsg.trim() || isTyping}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                    inputMsg.trim() && !isTyping
                      ? 'bg-gradient-to-r from-[#00dbe9] to-[#cf5cff] text-black shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:brightness-110'
                      : 'bg-white/5 text-[#b9cacb]/30'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
            <p className="text-center text-[9px] text-[#b9cacb]/40 mt-2.5 uppercase tracking-wider font-bold">
              NovaAI is configured for {user.location} local grid standards. Always verify parameters.
            </p>
          </div>
        </div>

        {/* Dynamic Suggested Prompts Grid */}
        <div className="space-y-3 text-left">
          <span className="text-[10px] font-black uppercase text-[#b9cacb]/60 tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#00dbe9]" />
            <span>Suggested Prompts (Click to Send)</span>
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PRESET_SUGGESTIONS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSuggestionClick(preset.query)}
                className="glass-panel p-4 rounded-2xl border-white/5 bg-white/2 hover:bg-white/5 hover:border-[#00dbe9]/30 transition-all text-left flex flex-col justify-between h-24 cursor-pointer group"
              >
                <div className="space-y-1">
                  <h5 className="text-xs font-black text-white group-hover:text-[#00dbe9] transition-colors">{preset.title}</h5>
                  <p className="text-[10px] text-[#b9cacb]/70 leading-snug">{preset.subtitle}</p>
                </div>
                <div className="flex items-center justify-end text-[#00dbe9] text-[10px] font-bold group-hover:translate-x-1 transition-all gap-1">
                  <span>Ask Nova</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE PANEL: QUICK TOOLS & CONVERSATION ARCHIVE */}
      <aside className="xl:col-span-4 space-y-6 flex flex-col">
        
        {/* Quick Tools Routing Section */}
        <div className="glass-panel p-6 rounded-3xl border-white/10 bg-black/30">
          <div className="space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#00dbe9]" />
              <span>Interactive Quick Tools</span>
            </h4>
            <p className="text-[11px] text-[#b9cacb] leading-relaxed">
              Launch dedicated smart panels designed to map and customize your solar rooftop specifications directly.
            </p>
            
            <div className="space-y-3 pt-2">
              <button
                onClick={() => setActiveTab?.('calculator')}
                className="w-full p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between hover:translate-x-1 transition-all cursor-pointer group text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#00dbe9]/10 text-[#00dbe9] flex items-center justify-center shrink-0">
                    <Calculator className="w-4.5 h-4.5" />
                  </span>
                  <div>
                    <span className="text-xs font-black text-white block group-hover:text-[#00dbe9] transition-colors">Cost & Payback Calculator</span>
                    <span className="text-[9px] text-[#b9cacb]/60">Customize bill offsets & area inputs</span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#b9cacb] group-hover:text-white" />
              </button>

              <button
                onClick={() => setActiveTab?.('nearby')}
                className="w-full p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between hover:translate-x-1 transition-all cursor-pointer group text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#cf5cff]/10 text-[#cf5cff] flex items-center justify-center shrink-0">
                    <Compass className="w-4.5 h-4.5" />
                  </span>
                  <div>
                    <span className="text-xs font-black text-white block group-hover:text-[#cf5cff] transition-colors">Discover Nearby Teams</span>
                    <span className="text-[9px] text-[#b9cacb]/60">Find pre-vetted local suppliers</span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#b9cacb] group-hover:text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Conversation Archive / History */}
        <div className="glass-panel p-6 rounded-3xl border-white/10 bg-black/30 flex-1 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                <History className="w-4 h-4 text-[#cf5cff]" />
                <span>Local Search Archives</span>
              </h4>
              <span className="px-1.5 py-0.5 rounded bg-[#cf5cff]/10 text-[#cf5cff] text-[9px] font-black uppercase font-mono">
                {filteredHistory.length}
              </span>
            </div>

            {/* Mini Search Archive Input */}
            <div className="relative">
              <input 
                type="text"
                value={searchHistory}
                onChange={(e) => setSearchHistory(e.target.value)}
                placeholder="Search historic logs..."
                className="w-full bg-black/40 border border-white/5 rounded-xl py-2 px-3 pl-8 text-[10px] text-white placeholder:text-[#b9cacb]/40 focus:outline-none focus:border-[#cf5cff] transition-all"
              />
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-[#b9cacb]/40">🔍</span>
            </div>

            <div className="space-y-2.5 max-h-[220px] overflow-y-auto scroll-hide">
              {filteredHistory.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSuggestionClick(item.query)}
                  className="w-full block p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 text-left transition-all cursor-pointer group"
                >
                  <p className="text-xs font-bold text-white group-hover:text-[#00dbe9] transition-colors truncate">{item.topic}</p>
                  <div className="flex justify-between items-center text-[9px] text-[#b9cacb]/60 mt-1">
                    <span>{item.desc}</span>
                    <span>{item.date}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Upgrade to Pro Promo Card */}
          <div className="mt-6 p-5 rounded-2xl relative overflow-hidden bg-gradient-to-br from-[#00dbe9]/10 via-transparent to-transparent border border-[#00dbe9]/20 flex flex-col justify-between min-h-[140px] text-left">
            <div className="space-y-1 relative z-10">
              <div className="flex items-center gap-1.5 text-[10px] font-black text-[#00dbe9] uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" />
                <span>Nova Premium Pro</span>
              </div>
              <h5 className="text-xs font-extrabold text-white">Upgrade Your Account</h5>
              <p className="text-[10px] text-[#b9cacb]/80 leading-relaxed">
                Unlock automated roof layout mapping, 3D solar calculations, and direct bidder comparison.
              </p>
            </div>
            
            <div className="pt-4 relative z-10">
              <button
                onClick={() => {
                  setProUpgraded(true);
                  setTimeout(() => setProUpgraded(false), 4000);
                }}
                className="w-full py-2 bg-gradient-to-r from-[#00dbe9] to-[#cf5cff] text-black font-black text-[10px] uppercase tracking-widest rounded-lg hover:brightness-110 shadow-lg shadow-primary-container/10 transition-all cursor-pointer text-center block"
              >
                {proUpgraded ? "✓ Premium Pro Active" : "Upgrade to Pro"}
              </button>
            </div>
            
            {/* Background absolute badge */}
            <span className="material-symbols-outlined text-6xl text-white/5 absolute -right-3 -bottom-3 z-0 select-none">
              workspace_premium
            </span>
          </div>
        </div>
      </aside>
    </div>
  );
}
