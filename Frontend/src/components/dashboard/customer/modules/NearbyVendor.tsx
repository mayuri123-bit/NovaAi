import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Search, 
  Clock, 
  Tag, 
  ChevronRight, 
  ArrowLeft, 
  HelpCircle, 
  Award, 
  CheckCircle, 
  Bookmark, 
  Share2, 
  Zap, 
  Sun, 
  ShieldCheck, 
  TrendingUp, 
  Lightbulb,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LearningHubTabProps {
  setActiveTab?: (tab: any) => void;
  showToast?: (text: string, type?: 'success' | 'info') => void;
  [key: string]: any;
}

interface Article {
  id: string;
  title: string;
  category: 'solar101' | 'subsidies' | 'netmetering' | 'maintenance';
  readTime: string;
  tag: string;
  summary: string;
  icon: string;
  featured?: boolean;
  content: {
    overview: string;
    keyTakeaways: string[];
    sections: { heading: string; body: string }[];
  };
}

const ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Complete Rooftop Solar Buying Guide 2026',
    category: 'solar101',
    readTime: '6 min read',
    tag: 'Beginner Guide',
    featured: true,
    icon: 'wb_sunny',
    summary: 'Everything you need to know before installing solar on your terrace, from roof structural checks to panel selection.',
    content: {
      overview: 'Transitioning your household to rooftop solar power is one of the most effective ways to drastically eliminate monthly electricity bills while increasing home equity.',
      keyTakeaways: [
        'Ensure your terrace gets 4-6 hours of unshaded sunlight daily.',
        'Choose Mono-PERC or TOPCon panels for maximum efficiency in hot weather.',
        'A 3kW system satisfies typical 3-4 bedroom household energy needs.'
      ],
      sections: [
        {
          heading: '1. Assessing Your Terrace Structural Feasibility',
          body: 'Before purchasing panels, evaluate your terrace load capacity and shading. Modern silicon solar panels weigh around 15-20 kg per module. Ensure your roof slab is structurally sound and free from high shade obstructions like water tanks or tall neighboring buildings between 10 AM and 4 PM.'
        },
        {
          heading: '2. On-Grid vs Off-Grid vs Hybrid Systems',
          body: 'On-Grid systems connect directly to your local electricity discom with net metering, making them the most affordable option. Off-Grid systems use heavy battery banks for remote areas without reliable grid power. Hybrid systems combine net metering with back-up battery storage for uninterrupted power during outages.'
        },
        {
          heading: '3. Calculating Your Optimal System Capacity',
          body: 'As a rule of thumb, every 1 kW of solar capacity requires approximately 100 sq. ft. of clear rooftop space and generates 4 kWh (units) of electricity per sunny day.'
        }
      ]
    }
  },
  {
    id: 'art-2',
    title: 'PM Surya Ghar: How to Claim Your ₹78,000 Subsidy',
    category: 'subsidies',
    readTime: '4 min read',
    tag: 'Govt Subsidy',
    featured: true,
    icon: 'account_balance',
    summary: 'A step-by-step walkthrough of the national rooftop solar subsidy portal, required documents, and direct bank payout timeline.',
    content: {
      overview: 'The PM Surya Ghar: Muft Bijli Yojana provides direct financial subsidies to residential homeowners installing grid-connected solar rooftop systems.',
      keyTakeaways: [
        'Get up to ₹30,000 per kW for 1 kW & 2 kW systems.',
        'Maximum central subsidy capped at ₹78,000 for 3 kW setups.',
        'Subsidies are credited directly into your Aadhaar-linked bank account.'
      ],
      sections: [
        {
          heading: '1. Subsidy Slab Breakdown',
          body: 'Systems up to 2 kW receive ₹30,000 per kW. For the 3rd kW, an additional ₹18,000 is granted. Systems above 3 kW receive a total capped subsidy of ₹78,000.'
        },
        {
          heading: '2. Step-by-Step Portal Registration',
          body: 'Register on the national portal (pmsuryaghar.gov.in) with your Electricity Consumer Number, mobile, and state DISCOM details. Choose an empanelled vendor, get feasibility approval, install the system, and submit net metering inspection report.'
        }
      ]
    }
  },
  {
    id: 'art-3',
    title: 'Understanding Net Metering & Utility Billing',
    category: 'netmetering',
    readTime: '5 min read',
    tag: 'Grid Integration',
    icon: 'electric_meter',
    summary: 'How bidirectional electric meters turn your home into a clean power plant and credit excess energy generation back to your bill.',
    content: {
      overview: 'Net metering is a billing mechanism that credits solar energy system owners for the electricity they add to the power grid.',
      keyTakeaways: [
        'Bidirectional meters measure power drawn vs power exported.',
        'Excess units generated during daytime are rolled over to offset night usage.',
        'Annual settlement payouts depend on state DISCOM policy rates.'
      ],
      sections: [
        {
          heading: 'How Net Metering Works Daily',
          body: 'During peak sunlight hours, your solar system generates more electricity than your home consumes. The excess flows back into the electrical grid, causing your meter to run backwards. At night when solar panels are idle, you draw electricity from the grid.'
        }
      ]
    }
  },
  {
    id: 'art-4',
    title: 'Solar Panel Maintenance & Cleaning Checklist',
    category: 'maintenance',
    readTime: '3 min read',
    tag: 'Care & Maintenance',
    icon: 'cleaning_services',
    summary: 'Pro-tips on keeping your solar panels free of dust and debris to maintain peak annual energy generation efficiency.',
    content: {
      overview: 'Dust, leaves, and bird droppings can decrease panel generation efficiency by 10-20%. Proper routine cleaning ensures optimal ROI.',
      keyTakeaways: [
        'Clean panels once every 2-3 weeks using plain water and soft sponge.',
        'Avoid harsh chemicals or high-pressure washers that can micro-crack glass.',
        'Schedule early morning or evening cleaning when panels are cool.'
      ],
      sections: [
        {
          heading: 'Best Practices for Cleaning Solar Modules',
          body: 'Clean modules in the early morning when ambient temperatures are cooler to avoid thermal shock on hot tempered glass. Never step directly on the solar glass or metal framing.'
        }
      ]
    }
  }
];

const FAQS = [
  {
    q: 'How long do rooftop solar panels typically last?',
    a: 'Most tier-1 solar panels come with a 25-year linear performance warranty. After 25 years, panels continue producing electricity at approximately 80-85% of their initial rated output.'
  },
  {
    q: 'Will solar panels generate electricity during rainy or cloudy days?',
    a: 'Yes! Solar panels convert ambient sunlight into electricity even on overcast days, producing around 20-40% of their peak capacity depending on cloud density.'
  },
  {
    q: 'What happens during a grid power outage if I have an On-Grid system?',
    a: 'For safety reasons, standard On-Grid systems automatically shut off during a blackout to prevent back-feeding electricity while line workers repair the grid (anti-islanding protection). Hybrid systems with battery backup keep critical home loads running.'
  },
  {
    q: 'How much rooftop space do I need for a 3kW system?',
    a: 'A 3kW system requires roughly 250 to 300 square feet of shadow-free rooftop space facing South or South-West.'
  }
];

export default function LearningHubTab({
  setActiveTab,
  showToast = () => {}
}: LearningHubTabProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'solar101' | 'subsidies' | 'netmetering' | 'maintenance'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['art-1']);
  
  // Quiz state
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const toggleBookmark = (id: string, title: string) => {
    setBookmarkedIds(prev => {
      const exists = prev.includes(id);
      if (exists) {
        showToast(`Removed "${title.slice(0, 20)}..." from bookmarks`, 'info');
        return prev.filter(item => item !== id);
      } else {
        showToast(`Saved "${title.slice(0, 20)}..." to reading list`, 'success');
        return [...prev, id];
      }
    });
  };

  const filteredArticles = ARTICLES.filter(art => {
    const matchesCat = selectedCategory === 'all' || art.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const quizQuestions = [
    {
      q: 'How much central subsidy is granted for a 3 kW PM Surya Ghar installation?',
      options: ['₹30,000', '₹60,000', '₹78,000', '₹1,00,000'],
      correct: 2
    },
    {
      q: 'Which panel angle direction yields maximum solar absorption in India?',
      options: ['Facing North', 'Facing South / South-West', 'Facing East only', 'Facing West only'],
      correct: 1
    },
    {
      q: 'What device converts DC solar power into AC electricity for home appliances?',
      options: ['Transformer', 'Inverter', 'Capacitor', 'Battery Charger'],
      correct: 1
    }
  ];

  const handleQuizSubmit = () => {
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) {
        score += 1;
      }
    });
    setQuizScore(score);
    showToast(`Quiz completed! You scored ${score} out of ${quizQuestions.length}.`, 'success');
  };

  return (
    <div className="space-y-10 reveal-item w-full text-left">
      {/* Header */}
      <header className="border-b border-white/10 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="inline-block px-3 py-1 rounded-full border border-[#00dbe9]/30 bg-[#00dbe9]/10 text-[#00dbe9] text-[10px] font-bold uppercase tracking-widest mb-3">
            Solar Knowledge Base
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-[#00dbe9]" />
            Solar Learning Hub
          </h1>
          <p className="text-[#b9cacb] text-sm mt-1 max-w-2xl leading-relaxed">
            Master rooftop solar economics, PM Surya Ghar subsidy rules, net metering policies, and maintenance best practices.
          </p>
        </div>
        {setActiveTab && (
          <button 
            onClick={() => setActiveTab('dashboard')}
            className="px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shrink-0"
          >
            <ArrowLeft className="w-4 h-4 text-[#00dbe9]" />
            <span>Dashboard Overview</span>
          </button>
        )}
      </header>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scroll-hide">
          {[
            { id: 'all', label: 'All Guides' },
            { id: 'solar101', label: 'Solar 101' },
            { id: 'subsidies', label: 'Subsidies' },
            { id: 'netmetering', label: 'Net Metering' },
            { id: 'maintenance', label: 'Maintenance' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                selectedCategory === cat.id
                  ? 'bg-[#00dbe9] text-black border-[#00dbe9] shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                  : 'bg-white/5 text-[#b9cacb] border-white/5 hover:border-white/10 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b9cacb]/60" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides, FAQs..."
            className="w-full bg-black/40 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs text-white placeholder:text-[#b9cacb]/40 focus:outline-none focus:border-[#00dbe9] transition-all"
          />
        </div>
      </div>

      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredArticles.map((art) => {
          const isBookmarked = bookmarkedIds.includes(art.id);

          return (
            <div
              key={art.id}
              className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-[#00dbe9]/40 bg-gradient-to-b from-black/40 to-[#12151d] transition-all duration-300 flex flex-col justify-between space-y-4 group hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="px-2.5 py-1 rounded-md bg-[#00dbe9]/10 border border-[#00dbe9]/20 text-[#00dbe9] text-[10px] font-extrabold uppercase tracking-wider">
                    {art.tag}
                  </span>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-[#b9cacb]/60 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" />
                      {art.readTime}
                    </span>
                    <button
                      onClick={() => toggleBookmark(art.id, art.title)}
                      className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                        isBookmarked ? 'text-[#00dbe9] bg-[#00dbe9]/10' : 'text-[#b9cacb]/60 hover:text-white'
                      }`}
                      title={isBookmarked ? "Remove Bookmark" : "Save Guide"}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-[#00dbe9] transition-colors leading-snug">
                  {art.title}
                </h3>

                <p className="text-xs text-[#b9cacb]/80 leading-relaxed line-clamp-2">
                  {art.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                <button
                  onClick={() => setSelectedArticle(art)}
                  className="text-xs font-bold text-[#00dbe9] hover:underline flex items-center gap-1 cursor-pointer bg-transparent border-none p-0"
                >
                  <span>Read Full Article</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    showToast('Article link copied to clipboard!', 'success');
                  }}
                  className="p-1.5 rounded-lg text-[#b9cacb]/60 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                  title="Share Article"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Article Modal Reader */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel p-8 md:p-10 rounded-3xl border border-white/10 bg-[#0d0f14] max-w-3xl w-full max-h-[85vh] overflow-y-auto space-y-6 text-left relative shadow-2xl"
            >
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#b9cacb] hover:text-white transition-all cursor-pointer"
              >
                ✕
              </button>

              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-[#00dbe9]/10 border border-[#00dbe9]/20 text-[#00dbe9] text-[10px] font-extrabold uppercase tracking-widest inline-block">
                  {selectedArticle.tag} • {selectedArticle.readTime}
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
                  {selectedArticle.title}
                </h2>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-xs text-[#b9cacb] leading-relaxed">
                <strong className="text-white block mb-1">Executive Summary:</strong>
                {selectedArticle.content.overview}
              </div>

              {/* Key Takeaways */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#00dbe9] flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" />
                  Key Takeaways
                </h4>
                <ul className="space-y-1.5 pl-2">
                  {selectedArticle.content.keyTakeaways.map((point, i) => (
                    <li key={i} className="text-xs text-white/90 flex items-start gap-2">
                      <span className="text-[#00dbe9] font-bold">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Body Sections */}
              <div className="space-y-6 pt-2 border-t border-white/5">
                {selectedArticle.content.sections.map((sec, idx) => (
                  <div key={idx} className="space-y-2">
                    <h3 className="text-base font-bold text-white">{sec.heading}</h3>
                    <p className="text-xs text-[#b9cacb] leading-relaxed whitespace-pre-wrap">{sec.body}</p>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                <button
                  onClick={() => {
                    setSelectedArticle(null);
                    if (setActiveTab) setActiveTab('calculator');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#00dbe9] text-black font-extrabold text-xs hover:brightness-110 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  <span>Open ROI Calculator</span>
                </button>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs transition-all cursor-pointer"
                >
                  Close Article
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Solar Knowledge Quiz Card */}
      <div className="glass-panel p-8 rounded-3xl border border-[#cf5cff]/30 bg-gradient-to-br from-[#cf5cff]/10 via-black/40 to-black/60 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <span className="px-3 py-1 rounded-full bg-[#cf5cff]/20 text-[#cf5cff] text-[10px] font-extrabold uppercase tracking-widest inline-block mb-2">
              Solar Smart Quiz
            </span>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-[#cf5cff]" />
              Test Your Solar Readiness
            </h2>
            <p className="text-xs text-[#b9cacb] mt-1">Answer 3 quick questions to verify your rooftop solar knowledge.</p>
          </div>
          {quizScore !== null && (
            <div className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold">
              Score: {quizScore} / {quizQuestions.length}
            </div>
          )}
        </div>

        <div className="space-y-6">
          {quizQuestions.map((q, qIdx) => (
            <div key={qIdx} className="space-y-3 p-4 rounded-2xl bg-black/30 border border-white/5">
              <p className="text-xs font-bold text-white">{qIdx + 1}. {q.q}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options.map((opt, optIdx) => (
                  <button
                    key={optIdx}
                    onClick={() => setSelectedAnswers(prev => ({ ...prev, [qIdx]: optIdx }))}
                    className={`p-2.5 rounded-xl text-xs text-left transition-all cursor-pointer border ${
                      selectedAnswers[qIdx] === optIdx
                        ? 'bg-[#cf5cff]/20 border-[#cf5cff] text-white font-bold'
                        : 'bg-white/5 border-white/5 text-[#b9cacb] hover:bg-white/10'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleQuizSubmit}
          disabled={Object.keys(selectedAnswers).length < quizQuestions.length}
          className={`w-full py-3 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer ${
            Object.keys(selectedAnswers).length >= quizQuestions.length
              ? 'bg-gradient-to-r from-[#cf5cff] to-[#00dbe9] text-black shadow-lg hover:brightness-110'
              : 'bg-white/5 text-white/30 cursor-not-allowed'
          }`}
        >
          Submit Answers & Check Result
        </button>
      </div>

      {/* Frequently Asked Questions Accordion */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#00dbe9]" />
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <details key={idx} className="glass-panel p-5 rounded-2xl border border-white/10 group cursor-pointer bg-black/30">
              <summary className="text-xs font-bold text-white flex justify-between items-center list-none select-none">
                <span>{faq.q}</span>
                <span className="text-[#00dbe9] text-base group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-xs text-[#b9cacb] leading-relaxed mt-3 pt-3 border-t border-white/5">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
