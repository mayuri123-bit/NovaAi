
import React, { useState, useEffect, useMemo } from 'react';
import { 
  MapPin, 
  Star, 
  ShieldCheck, 
  Bookmark, 
  Sparkles, 
  Search, 
  SlidersHorizontal, 
  Info, 
  Check, 
  Sliders, 
  Award, 
  Clock, 
  ChevronRight, 
  Zap,
  Phone,
  Mail,
  ThumbsUp,
  BookmarkCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NearbySolarTabProps {
  user: {
    fullName: string;
    email: string;
    location: string;
    avatarUrl?: string;
  };
  vendors: Array<{
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
  nearbySearch: string;
  setNearbySearch: (val: string) => void;
  nearbyFilter: 'all' | 'verified' | 'saved';
  setNearbyFilter: (val: 'all' | 'verified' | 'saved') => void;
  handleRequestQuote: (vendorName: string) => void;
  handleToggleSaveVendor: (id: string) => void;
  setActiveTab?: (tab: any) => void;
}

// Coordinate mappings for the tactical SVG map grid (expressed in percentage coordinates)
const PIN_COORDINATES: Record<string, { x: number; y: number }> = {
  '1': { x: 42, y: 38 },
  '2': { x: 68, y: 55 },
  '3': { x: 28, y: 72 },
  '4': { x: 74, y: 24 },
};

// Helper function to resolve dynamic user coordinates based on string location input
function getDeterministicCoords(locationStr: string): [number, number] {
  const normalized = (locationStr || '').toLowerCase();
  
  // Quick pre-set list for common target locations
  if (normalized.includes('pune')) return [18.5204, 73.8567];
  if (normalized.includes('delhi') || normalized.includes('ncr')) return [28.6139, 77.2090];
  if (normalized.includes('bangalore') || normalized.includes('bengaluru')) return [12.9716, 77.5946];
  if (normalized.includes('thane')) return [19.2183, 72.9781];
  if (normalized.includes('san francisco') || normalized.includes('sf') || normalized.includes('ca') || normalized.includes('california')) return [37.7749, -122.4194];
  if (normalized.includes('london')) return [51.5074, -0.1278];
  if (normalized.includes('new york') || normalized.includes('ny')) return [40.7128, -74.0060];
  if (normalized.includes('nav mumb') || normalized.includes('vashi')) return [19.0330, 73.0297];
  
  // default fallback is Mumbai (Santa Cruz area)
  return [19.0760, 72.8550];
}

// Simulated mock brand offerings and reviews for each company for high-fidelity profile views
const VENDOR_EXTRAS: Record<string, {
  experience: number;
  brands: string[];
  projectsCompleted: number;
  phone: string;
  email: string;
  reviewsList: Array<{ author: string; rating: number; date: string; text: string }>;
}> = {
  '1': {
    experience: 15,
    brands: ['Canadian Solar', 'REC Alpha', 'Tesla Powerwall', 'Enphase'],
    projectsCompleted: 840,
    phone: '+91 98200 12345',
    email: 'contact@luminasun.com',
    reviewsList: [
      { author: 'Vikram Mehta', rating: 5, date: 'Jul 10, 2026', text: 'Excellent workmanship! The PM Surya Ghar subsidy was approved in exactly 24 days thanks to their prompt documentation filing. Highly recommended.' },
      { author: 'Sunita Rao', rating: 4.8, date: 'Jun 28, 2026', text: 'Extremely professional team. Clean wiring work on the terrace, and they helped coordinate with MSEDCL for the net-meter integration perfectly.' },
      { author: 'Rajesh Patil', rating: 4.9, date: 'May 15, 2026', text: 'Superb customer support. Explanations of hybrid inverter capabilities were very detailed.' }
    ]
  },
  '2': {
    experience: 12,
    brands: ['Jinko Solar', 'Trina Solar', 'Growatt', 'Solis'],
    projectsCompleted: 610,
    phone: '+91 98330 98765',
    email: 'info@heliosprime.in',
    reviewsList: [
      { author: 'Amit Sharma', rating: 5, date: 'Jul 04, 2026', text: 'Installed an 8 kW system. Smart grid integration features are amazing, can trace live generations from my phone app easily. Very responsive staff.' },
      { author: 'Pooja Deshmukh', rating: 4.5, date: 'Jun 12, 2026', text: 'Had some initial delays due to monsoons, but the team made up for it with exceptionally robust rack setups. Structure looks very solid.' }
    ]
  },
  '3': {
    experience: 5,
    brands: ['Waaree', 'Vikram Solar', 'Luminous', 'Microtek'],
    projectsCompleted: 340,
    phone: '+91 98110 54321',
    email: 'sales@apexgridsolar.com',
    reviewsList: [
      { author: 'Karan Malhotra', rating: 4.6, date: 'Jul 01, 2026', text: 'Best budget pricing I found in Bandra. Setup was quick. Satisfied with the mono-PERC panels performance.' },
      { author: 'Devendra Joshi', rating: 4.4, date: 'May 20, 2026', text: 'Standard fast installation. Cabling could have been slightly cleaner, but generation matches expectations perfectly.' }
    ]
  },
  '4': {
    experience: 10,
    brands: ['Adani Solar', 'Panasonic Solar', 'Fronius', 'Enphase Microinverters'],
    projectsCompleted: 520,
    phone: '+91 98920 67890',
    email: 'support@evergreenvolt.org',
    reviewsList: [
      { author: 'Nisha Fernandes', rating: 5, date: 'Jul 08, 2026', text: 'Enphase microinverters they installed are phenomenal. Individual panel monitoring means no shadow impacts our total generation. Brilliant design!' },
      { author: 'Gaurav Sen', rating: 4.7, date: 'Jun 22, 2026', text: 'Highly knowledgeable about local Net-metering policies. Solved all our queries patiently and delivered exactly on time.' }
    ]
  }
};

export default function NearbySolarTab({
  user,
  vendors,
  nearbySearch,
  setNearbySearch,
  nearbyFilter,
  setNearbyFilter,
  handleRequestQuote,
  handleToggleSaveVendor,
  setActiveTab
}: NearbySolarTabProps) {
  // Geolocation and View Mode States
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [customLatLng, setCustomLatLng] = useState<[number, number] | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [gpsActive, setGpsActive] = useState<boolean>(false);

  // Dynamic coordinates resolved from user's location (supports real-world browser GPS)
  const userLatLng = useMemo<[number, number]>(() => {
    return customLatLng || getDeterministicCoords(user.location);
  }, [customLatLng, user.location]);

  const pinLatLngs = useMemo<Record<string, [number, number]>>(() => {
    const [lat, lng] = userLatLng;
    return {
      '1': [lat - 0.0110, lng - 0.0300],
      '2': [lat - 0.0010, lng + 0.0220],
      '3': [lat - 0.0210, lng - 0.0150],
      '4': [lat + 0.0190, lng + 0.0100],
    };
  }, [userLatLng]);

  // Local filters
  const [ratingFilter, setRatingFilter] = useState<string>('all');
  const [expFilter, setExpFilter] = useState<string>('all');

  // Filter the vendors list (defined early to support leaflet markers)
  const filteredVendors = vendors.filter(v => {
    // 1. Search Query
    const query = nearbySearch.toLowerCase().trim();
    const nameMatch = v.name.toLowerCase().includes(query);
    const descMatch = v.desc.toLowerCase().includes(query);
    const matchesSearch = query === '' || nameMatch || descMatch;

    // 2. Tab Filter (all, verified, saved)
    let matchesTab = true;
    if (nearbyFilter === 'verified') matchesTab = v.verified;
    if (nearbyFilter === 'saved') matchesTab = v.saved;

    // 3. Rating Filter
    let matchesRating = true;
    if (ratingFilter === '4.5') matchesRating = v.rating >= 4.5;
    if (ratingFilter === '4.8') matchesRating = v.rating >= 4.8;

    // 4. Experience Filter
    let matchesExp = true;
    const exp = VENDOR_EXTRAS[v.id]?.experience || 5;
    if (expFilter === '5') matchesExp = exp >= 5;
    if (expFilter === '10') matchesExp = exp >= 10;

    return matchesSearch && matchesTab && matchesRating && matchesExp;
  });
  
  // Interactive selected vendor states
  const [selectedVendorId, setSelectedVendorId] = useState<string>('1');
  const [hoveredVendorId, setHoveredVendorId] = useState<string | null>(null);
  
  // Modal state
  const [profileModalVendorId, setProfileModalVendorId] = useState<string | null>(null);
  const [inquirySent, setInquirySent] = useState<boolean>(false);
  const [inquiryMsg, setInquiryMsg] = useState<string>('');

  // Map state
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [mapStyle, setMapStyle] = useState<'street' | 'radar'>('street');
  const [isMapReady, setIsMapReady] = useState<boolean>(false);

  // Leaflet map instance ref
  const leafletMapInstance = React.useRef<any>(null);
  const leafletMarkersRef = React.useRef<any[]>([]);

  // Dynamic Leaflet map setup for real-world interactive street view
  useEffect(() => {
    if (viewMode !== 'map' || mapStyle !== 'street') {
      if (leafletMapInstance.current) {
        try {
          leafletMapInstance.current.remove();
        } catch (e) {
          console.error("Failed to remove leaflet map on cleanup", e);
        }
        leafletMapInstance.current = null;
      }
      setIsMapReady(false);
      return;
    }

    // Load Leaflet CSS if not already present
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    const initMap = () => {
      const L = (window as any).L;
      if (!L) return;

      const container = document.getElementById('real-leaflet-map');
      if (!container) return;

      if (leafletMapInstance.current) {
        return;
      }

      // Safeguard: Reset Leaflet internal container tracker if any previous instantiation left it set
      if ((container as any)._leaflet_id) {
        (container as any)._leaflet_id = null;
      }

      try {
        const map = L.map('real-leaflet-map', {
          zoomControl: false,
          attributionControl: false
        }).setView(userLatLng, 13);

        leafletMapInstance.current = map;

        // Beautiful dark-themed CartoDB map tiles for cohesive dashboard theme integration
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          maxZoom: 19
        }).addTo(map);

        // Register global callback so buttons inside leaflet popup can change state
        (window as any).selectVendorFromMap = (id: string) => {
          setSelectedVendorId(id);
        };

        // Pulsing Marker for User's House
        const houseIcon = L.divIcon({
          html: `<div class="relative flex items-center justify-center">
                   <div class="absolute w-10 h-10 bg-emerald-500/20 rounded-full animate-ping"></div>
                   <div class="absolute w-6 h-6 bg-emerald-500/35 rounded-full animate-pulse"></div>
                   <div class="w-5 h-5 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981] border-2 border-white flex items-center justify-center font-bold text-[10px]">🏠</div>
                 </div>`,
          className: '',
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });
        L.marker(userLatLng, { icon: houseIcon })
          .addTo(map)
          .bindPopup(`<div style="color: black; font-family: sans-serif; font-size: 11px;"><b>My Residence</b><br>Active radar center in ${user.location}</div>`);

        setIsMapReady(true);
      } catch (error) {
        console.error("Leaflet initialization failed", error);
      }
    };

    // Load Leaflet JS script and trigger map initialization
    const loadScript = () => {
      const scriptId = 'leaflet-js-script';
      if (document.getElementById(scriptId)) {
        const L = (window as any).L;
        if (L) {
          initMap();
        } else {
          // Script exists but is still loading
          const scriptEl = document.getElementById(scriptId) as HTMLScriptElement;
          if (scriptEl) {
            const currentOnload = scriptEl.onload;
            scriptEl.onload = (e) => {
              if (typeof currentOnload === 'function') currentOnload.call(scriptEl, e);
              initMap();
            };
          }
        }
        return;
      }

      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = initMap;
      document.body.appendChild(script);
    };

    loadScript();

    return () => {
      if (leafletMapInstance.current) {
        try {
          leafletMapInstance.current.remove();
        } catch (e) {
          console.error("Failed to remove leaflet map on cleanup", e);
        }
        leafletMapInstance.current = null;
      }
      setIsMapReady(false);
    };
  }, [mapStyle, userLatLng, viewMode]);

  // Separate effect to synchronize markers only when filtered list, selection, or map readiness changes
  useEffect(() => {
    const L = (window as any).L;
    const map = leafletMapInstance.current;
    if (!L || !map || !isMapReady) return;

    // Clear existing markers
    leafletMarkersRef.current.forEach(m => {
      try {
        m.remove();
      } catch (e) {
        // Safe catch
      }
    });
    leafletMarkersRef.current = [];

    filteredVendors.forEach(vendor => {
      const latLng = pinLatLngs[vendor.id];
      if (!latLng) return;

      const isSelected = selectedVendorId === vendor.id;

      const markerHtml = `
        <div class="relative flex items-center justify-center group cursor-pointer">
          ${isSelected ? `<div class="absolute -inset-3 rounded-full bg-[#00dbe9]/30 animate-ping"></div>` : ''}
          <div class="w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
            isSelected 
              ? 'bg-gradient-to-br from-[#00dbe9] to-[#cf5cff] text-black border-white shadow-[0_0_15px_#00f0ff]' 
              : 'bg-[#12151d] text-[#00dbe9] border-[#00dbe9]/50 hover:border-[#00dbe9]'
          }">
            <span style="font-size: 14px;">⚡</span>
          </div>
        </div>
      `;

      const icon = L.divIcon({
        html: markerHtml,
        className: '',
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const marker = L.marker(latLng, { icon })
        .addTo(map)
        .on('click', () => {
          setSelectedVendorId(vendor.id);
        });

      const popupContent = `
        <div style="color: black; font-family: sans-serif; min-width: 170px; text-align: left; padding: 4px;">
          <b style="font-size: 12px; display: block; margin-bottom: 2px; color: #111;">${vendor.name}</b>
          <span style="color: #4b5563; font-size: 10px; display: block; margin-bottom: 6px;">📍 ${vendor.distance} km • ⭐ ${vendor.rating} (${vendor.reviews} reviews)</span>
          <div style="display: flex; gap: 4px;">
            <button onclick="window.selectVendorFromMap('${vendor.id}')" style="flex: 1; border: none; background: #00dbe9; color: black; font-size: 9px; font-weight: bold; padding: 5px 6px; border-radius: 4px; cursor: pointer;">Select Team</button>
            <a href="tel:${VENDOR_EXTRAS[vendor.id]?.phone || '+91'}" style="display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; background: #f3f4f6; border-radius: 4px; color: #374151; text-decoration: none; font-size: 10px;">📞</a>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);
      leafletMarkersRef.current.push(marker);
    });
  }, [filteredVendors, selectedVendorId, isMapReady, mapStyle, pinLatLngs]);

  // Synchronize selection changes with map centering/panning
  useEffect(() => {
    const L = (window as any).L;
    const map = leafletMapInstance.current;
    if (L && map && selectedVendorId && mapStyle === 'street') {
      const latLng = pinLatLngs[selectedVendorId];
      if (latLng) {
        map.setView(latLng, 14, { animate: true, duration: 1 });
      }
    }
  }, [selectedVendorId, mapStyle, pinLatLngs]);

  // Quick scan trigger
  const triggerRadarScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 1800);
  };

  // Browser Geolocation API Syncing with graceful fallback
  const requestGeolocation = () => {
    if (!navigator.geolocation) {
      setGpsError("Geolocation is not supported by your browser.");
      return;
    }

    setIsLocating(true);
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCustomLatLng([latitude, longitude]);
        setGpsActive(true);
        setIsLocating(false);
        triggerRadarScan();

        if (leafletMapInstance.current) {
          leafletMapInstance.current.setView([latitude, longitude], 13, { animate: true });
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setIsLocating(false);
        setGpsActive(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setGpsError("Location access denied by user. Please verify browser permissions.");
            break;
          case error.POSITION_UNAVAILABLE:
            setGpsError("GPS position unavailable. Using regional default coordinates.");
            break;
          case error.TIMEOUT:
            setGpsError("GPS request timed out. Using regional default coordinates.");
            break;
          default:
            setGpsError("GPS error occurred. Using regional default coordinates.");
        }
      },
      { enableHighAccuracy: true, timeout: 6000, maximumAge: 0 }
    );
  };

  // Run a quick scan on load to look super high-tech and premium
  useEffect(() => {
    triggerRadarScan();
  }, []);

  // Get active selected vendor details
  const selectedVendor = vendors.find(v => v.id === selectedVendorId) || vendors[0];
  const selectedExtras = VENDOR_EXTRAS[selectedVendor.id] || VENDOR_EXTRAS['1'];

  // Detail Modal Vendor info
  const modalVendor = vendors.find(v => v.id === profileModalVendorId);
  const modalExtras = profileModalVendorId ? VENDOR_EXTRAS[profileModalVendorId] : null;

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryMsg.trim()) return;
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setInquiryMsg('');
      setProfileModalVendorId(null);
    }, 2500);
  };

  const handleConsultNova = (vendorName: string) => {
    if (setActiveTab) {
      const prompt = `Hey Nova, I am interested in getting solar installed from ${vendorName} in my location (${user.location}). Can you help me compare their typical panel models with state solar guidelines, and analyze if they offer net-meter support?`;
      // We can redirect to AI Chat tab and copy prompt if possible
      setActiveTab('ai');
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-10 reveal-item w-full text-left">
      {/* 1. Header Section */}
      <header className="border-b border-white/10 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="inline-block px-3 py-1 rounded-full border border-[#00dbe9]/30 bg-[#00dbe9]/10 text-[#00dbe9] text-[10px] font-bold uppercase tracking-widest mb-3">
            NovaAI Geographical Discovery
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight flex items-center gap-2">
            Nearby Solar Partners
          </h1>
          <p className="text-[#b9cacb] text-sm mt-1 max-w-2xl leading-relaxed">
            Locate and connect with MNRE-approved, pre-vetted solar installers offering high-efficiency panels and fast net-metering synchronization in your area.
          </p>
        </div>
        {setActiveTab && (
          <button 
            onClick={() => setActiveTab('dashboard')}
            className="px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shrink-0"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>Dashboard</span>
          </button>
        )}
      </header>

      {/* 2. Interactive Search & Advanced Filter Controls */}
      <section className="glass-panel p-5 rounded-2xl border-white/10 bg-gradient-to-r from-[#1d2026]/80 to-[#191c22]/50 shadow-xl flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row gap-4 items-center w-full">
          {/* Search Input */}
          <div className="relative w-full lg:flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#00dbe9] select-none flex items-center justify-center">
              <Search className="w-5 h-5" />
            </span>
            <input 
              type="text"
              value={nearbySearch}
              onChange={(e) => setNearbySearch(e.target.value)}
              placeholder="Search solar companies by name or key specs..."
              className="w-full bg-black/30 border border-white/10 hover:border-white/20 focus:border-[#00dbe9] rounded-xl py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-[#b9cacb]/40 focus:outline-none focus:ring-2 focus:ring-[#00dbe9]/10 transition-all"
            />
            {nearbySearch && (
              <button 
                onClick={() => setNearbySearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#b9cacb] hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Tab Segmented Selector (Synced with global props) */}
          <div className="flex bg-black/40 p-1.5 rounded-xl border border-white/5 w-full lg:w-auto shrink-0">
            {(['all', 'verified', 'saved'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setNearbyFilter(tab)}
                className={`flex-1 lg:flex-none px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  nearbyFilter === tab
                    ? 'bg-gradient-to-r from-[#00dbe9]/20 to-[#cf5cff]/20 border border-[#00dbe9]/30 text-white'
                    : 'text-[#b9cacb] hover:text-white hover:bg-white/5'
                }`}
              >
                {tab === 'all' && 'All Partners'}
                {tab === 'verified' && 'Verified Only'}
                {tab === 'saved' && 'Bookmarked'}
              </button>
            ))}
          </div>
        </div>

        {/* Dropdown Filters and Quick Summary */}
        <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-4 pt-3 border-t border-white/5">
          <div className="flex flex-wrap items-center gap-3">
            {/* Rating Filter Dropdown */}
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg border border-white/5 text-xs text-[#b9cacb]">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Rating:</span>
              <select 
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="bg-transparent text-white border-none focus:ring-0 p-0 text-xs font-semibold cursor-pointer outline-none"
              >
                <option value="all" className="bg-[#0d0f14]">Any Rating</option>
                <option value="4.5" className="bg-[#0d0f14]">4.5+ Stars</option>
                <option value="4.8" className="bg-[#0d0f14]">4.8+ Stars</option>
              </select>
            </div>

            {/* Experience Filter Dropdown */}
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg border border-white/5 text-xs text-[#b9cacb]">
              <Clock className="w-3.5 h-3.5 text-[#cf5cff]" />
              <span>Experience:</span>
              <select 
                value={expFilter}
                onChange={(e) => setExpFilter(e.target.value)}
                className="bg-transparent text-white border-none focus:ring-0 p-0 text-xs font-semibold cursor-pointer outline-none"
              >
                <option value="all" className="bg-[#0d0f14]">Any Experience</option>
                <option value="5" className="bg-[#0d0f14]">5+ Years Exp</option>
                <option value="10" className="bg-[#0d0f14]">10+ Years Exp</option>
              </select>
            </div>

            {/* Reset Filters Option */}
            {(ratingFilter !== 'all' || expFilter !== 'all' || nearbySearch !== '') && (
              <button
                onClick={() => {
                  setRatingFilter('all');
                  setExpFilter('all');
                  setNearbySearch('');
                  setNearbyFilter('all');
                }}
                className="text-xs text-[#00dbe9] hover:underline font-bold flex items-center gap-1 cursor-pointer"
              >
                Clear all filters
              </button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
            <div className="text-xs text-[#b9cacb]/80 font-medium font-mono select-none">
              Showing <span className="text-[#00dbe9] font-bold">{filteredVendors.length}</span> verified teams in <span className="text-white font-bold">{user.location}</span>
              {gpsActive && <span className="ml-1.5 text-emerald-400 font-bold">• GPS Live</span>}
            </div>

            {/* View Mode Switcher */}
            <div className="flex bg-black/45 p-1 rounded-xl border border-white/5 shadow-inner shrink-0">
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`px-3.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-gradient-to-r from-[#00dbe9]/20 to-[#cf5cff]/20 border border-[#00dbe9]/30 text-white shadow-[0_0_10px_rgba(0,240,255,0.1)]'
                    : 'text-[#b9cacb] hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[13px]">list_alt</span>
                <span>List View</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setViewMode('map');
                  requestGeolocation();
                }}
                className={`px-3.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'map'
                    ? 'bg-gradient-to-r from-[#00dbe9]/20 to-[#cf5cff]/20 border border-[#00dbe9]/30 text-white shadow-[0_0_10px_rgba(0,240,255,0.1)]'
                    : 'text-[#b9cacb] hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[13px]">map</span>
                <span>View on Map</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Geolocation API Status or GPS Error Banner */}
      {(isLocating || gpsError) && (
        <div className={`p-4 rounded-2xl border flex items-center justify-between text-xs transition-all ${
          gpsError 
            ? 'bg-rose-500/10 border-rose-500/20 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.05)]' 
            : 'bg-[#00dbe9]/10 border-[#00dbe9]/20 text-[#00dbe9] shadow-[0_0_15px_rgba(0,240,255,0.05)]'
        }`}>
          <div className="flex items-center gap-3 text-left">
            {isLocating ? (
              <div className="w-4 h-4 border-2 border-[#00dbe9] border-t-transparent rounded-full animate-spin" />
            ) : (
              <span className="material-symbols-outlined text-base">warning</span>
            )}
            <p className="font-semibold leading-relaxed">
              {isLocating ? "Syncing live GPS: Reading browser high-accuracy satellite coordinates..." : gpsError}
            </p>
          </div>
          {gpsError && (
            <button 
              type="button"
              onClick={() => setGpsError(null)}
              className="text-[#b9cacb] hover:text-white font-extrabold px-2.5 py-1 text-[10px] uppercase border border-white/10 rounded-lg bg-white/5 transition-all"
            >
              Dismiss
            </button>
          )}
        </div>
      )}

      {/* 3. Main Layout Grid: Map and Vendors List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Map and Matching Cards */}
        <div className="lg:col-span-8 space-y-8">
          
          {viewMode === 'map' ? (
            <>
              {/* Tactical Vector Grid & Interactive Street Map */}
              <div className="glass-panel rounded-3xl overflow-hidden h-[480px] relative border-white/10 bg-gradient-to-b from-black/80 to-[#0d0f14] shadow-2xl flex flex-col justify-between p-4 select-none group">
            
            {/* 1. Real Street Map View container */}
            <div 
              id="real-leaflet-map" 
              className={`absolute inset-0 w-full h-full rounded-3xl transition-opacity duration-500 bg-neutral-900 ${
                mapStyle === 'street' ? 'opacity-100 z-0' : 'opacity-0 -z-10 pointer-events-none'
              }`}
            />

            {/* 2. Radar/Vector Map Background elements */}
            {mapStyle === 'radar' && (
              <>
                {/* Map background grids and concentric circles */}
                <div className="absolute inset-0 pointer-events-none opacity-40">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid-pattern" width="30" height="30" patternUnits="userSpaceOnUse">
                        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(0, 240, 255, 0.1)" strokeWidth="1"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                    
                    {/* Concentric Coordinate Radar Rings */}
                    <circle cx="50%" cy="50%" r="90" fill="none" stroke="rgba(0, 240, 255, 0.12)" strokeWidth="1" strokeDasharray="4 4" />
                    <circle cx="50%" cy="50%" r="160" fill="none" stroke="rgba(0, 240, 255, 0.08)" strokeWidth="1" />
                    <circle cx="50%" cy="50%" r="220" fill="none" stroke="rgba(207, 92, 255, 0.05)" strokeWidth="1" strokeDasharray="8 8" />
                  </svg>
                </div>

                {/* Radar Sweep Effect */}
                <div className={`absolute inset-0 pointer-events-none bg-gradient-to-r from-[#00dbe9]/5 to-transparent origin-center rounded-3xl ${isScanning ? 'animate-spin' : 'hidden'}`} style={{ animationDuration: '1.8s' }} />

                {/* Map Canvas viewport Container */}
                <div 
                  className="absolute inset-0 flex items-center justify-center transition-all duration-500"
                  style={{ transform: `scale(${zoomLevel})` }}
                >
                  {/* Pulsing Central User Marker */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                    <div className="relative flex items-center justify-center">
                      <div className="absolute w-12 h-12 bg-emerald-500/15 rounded-full animate-ping" />
                      <div className="absolute w-6 h-6 bg-emerald-500/25 rounded-full animate-pulse" />
                      <div className="w-4 h-4 bg-emerald-400 rounded-full shadow-[0_0_12px_#10b981] border-2 border-white" />
                    </div>
                    <div className="mt-1 bg-black/80 px-2 py-0.5 rounded-md border border-white/10 text-[9px] text-white font-black whitespace-nowrap uppercase tracking-widest shadow-md">
                      My House
                    </div>
                  </div>

                  {/* Dynamic Vendor Pins representing coordinates */}
                  {filteredVendors.map((vendor) => {
                    const coords = PIN_COORDINATES[vendor.id] || { x: 50, y: 50 };
                    const isSelected = selectedVendorId === vendor.id;
                    const isHovered = hoveredVendorId === vendor.id;
                    
                    return (
                      <div
                        key={vendor.id}
                        className="absolute"
                        style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
                        onMouseEnter={() => setHoveredVendorId(vendor.id)}
                        onMouseLeave={() => setHoveredVendorId(null)}
                        onClick={() => setSelectedVendorId(vendor.id)}
                      >
                        <div className="relative cursor-pointer transition-all hover:scale-110 active:scale-95 group">
                          {/* Outer pulsing ring for selected pin */}
                          {isSelected && (
                            <span className="absolute -inset-4 rounded-full bg-[#00dbe9]/20 animate-ping" />
                          )}
                          
                          {/* Glowing pin bubble */}
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                            isSelected 
                              ? 'bg-gradient-to-br from-[#00dbe9] to-[#cf5cff] text-black border-white shadow-[0_0_15px_#00f0ff]' 
                              : 'bg-[#1d2026] text-[#00dbe9] border-[#00dbe9]/40 hover:border-[#00dbe9] shadow-lg'
                          }`}>
                            <MapPin className="w-4 h-4" />
                          </div>

                          {/* Micro Float-Card Tooltip (Shows on hover or active selection) */}
                          {(isSelected || isHovered) && (
                            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 mb-1.5 transition-all z-20">
                              <div className="glass-panel p-3 rounded-xl border border-white/15 bg-black/90 shadow-[0_4px_24px_rgba(0,0,0,0.8)] min-w-[200px] text-left space-y-1">
                                <div className="flex justify-between items-center gap-2">
                                  <p className="text-xs font-extrabold text-white truncate max-w-[120px]">{vendor.name}</p>
                                  {vendor.verified && (
                                    <span className="text-[#00dbe9] text-[10px] font-bold uppercase tracking-wider">Vetted</span>
                                  )}
                                </div>
                                
                                <p className="text-[10px] text-[#b9cacb] flex items-center gap-1.5">
                                  <span className="flex items-center text-amber-400">★ {vendor.rating}</span>
                                  <span>•</span>
                                  <span>{vendor.distance} km away</span>
                                </p>
                                
                                <p className="text-[9px] text-[#b9cacb]/70 truncate">{vendor.desc}</p>
                              </div>
                              
                              {/* Triangle Arrow */}
                              <div className="w-2.5 h-2.5 bg-black border-r border-b border-white/15 rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2" />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* 3. Global HUD Overlays on Map Container (Overlaid on either Street or Radar maps) */}
            
            {/* Top Row: Map Type Toggle Button */}
            <div className="absolute top-4 left-4 flex items-center gap-2.5 z-10">
              <div className="flex bg-black/85 p-1 rounded-xl border border-white/15 shadow-xl">
                <button
                  type="button"
                  onClick={() => setMapStyle('street')}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                    mapStyle === 'street'
                      ? 'bg-gradient-to-r from-[#00dbe9] to-[#cf5cff] text-black shadow-[0_0_10px_rgba(0,240,255,0.4)] font-extrabold'
                      : 'text-[#b9cacb] hover:text-white hover:bg-white/5'
                  }`}
                >
                  🗺️ Street View
                </button>
                <button
                  type="button"
                  onClick={() => setMapStyle('radar')}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                    mapStyle === 'radar'
                      ? 'bg-gradient-to-r from-[#00dbe9] to-[#cf5cff] text-black shadow-[0_0_10px_rgba(0,240,255,0.4)] font-extrabold'
                      : 'text-[#b9cacb] hover:text-white hover:bg-white/5'
                  }`}
                >
                  📡 Radar Grid
                </button>
              </div>
            </div>

            {/* Map Controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
              {mapStyle === 'radar' && (
                <div className="glass-panel p-1 rounded-xl flex flex-col border-white/10 bg-black/80 shadow-lg">
                  <button 
                    onClick={() => setZoomLevel(p => Math.min(2, p + 0.25))}
                    className="p-2.5 text-xs font-black text-[#00dbe9] hover:bg-white/10 rounded-lg transition-all cursor-pointer"
                    title="Zoom In"
                  >
                    ＋
                  </button>
                  <div className="h-px bg-white/10 mx-2" />
                  <button 
                    onClick={() => setZoomLevel(p => Math.max(0.5, p - 0.25))}
                    className="p-2.5 text-xs font-black text-[#00dbe9] hover:bg-white/10 rounded-lg transition-all cursor-pointer"
                    title="Zoom Out"
                  >
                    －
                  </button>
                </div>
              )}
              <button 
                onClick={() => {
                  if (mapStyle === 'street' && leafletMapInstance.current) {
                    leafletMapInstance.current.setView(userLatLng, 13, { animate: true });
                  } else {
                    triggerRadarScan();
                  }
                }}
                className="glass-panel p-2.5 rounded-xl border border-white/10 bg-black/80 text-[#00dbe9] hover:bg-[#00dbe9]/10 transition-all shadow-lg flex items-center justify-center cursor-pointer"
                title={mapStyle === 'street' ? "Recenter on Residence" : "Recenter & Radar Scan"}
              >
                <span className={`material-symbols-outlined text-lg ${isScanning ? 'animate-spin' : ''}`}>
                  {mapStyle === 'street' ? 'home' : 'sync'}
                </span>
              </button>
            </div>

            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 glass-panel px-4 py-2 rounded-xl flex items-center gap-4 border border-white/10 bg-black/85 text-[10px] uppercase font-bold tracking-wider text-[#b9cacb] z-10 shadow-md">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00dbe9] shadow-[0_0_8px_#00dbe9]" />
                <span>Selected</span>
              </div>
              <div className="w-px h-3 bg-white/15" />
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#cf5cff] shadow-[0_0_8px_#cf5cff]" />
                <span>Partners</span>
              </div>
              <div className="w-px h-3 bg-white/15" />
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                <span>Residence</span>
              </div>
            </div>

            {/* Corner Decorative High-Tech Coordinates */}
            <div className="absolute bottom-4 right-4 text-[9px] font-mono text-[#b9cacb]/50 text-right z-10 bg-black/45 px-2 py-1 rounded-md">
              {mapStyle === 'street' ? 'STREETS_LOADED: LIVE' : `SCANNING_SENSORS: ACTIVE`} • {userLatLng[0].toFixed(4)}°, {userLatLng[1].toFixed(4)}°
            </div>
          </div>

          {/* Focused Selected Vendor Highlight Card for Map View */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-[#00dbe9] uppercase tracking-wider flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">location_searching</span>
                <span>Selected Partner Pin Details</span>
              </h3>
              <span className="text-[10px] font-mono text-[#b9cacb]/50">Click on map pins to switch partners</span>
            </div>

            {selectedVendor ? (
              (() => {
                const extras = VENDOR_EXTRAS[selectedVendor.id] || { experience: 5, projectsCompleted: 100 };
                return (
                  <div className="premium-card p-6 rounded-3xl border border-[#00dbe9]/40 bg-gradient-to-br from-[#00dbe9]/5 via-black/40 to-[#cf5cff]/5 flex flex-col justify-between space-y-6 shadow-[0_0_30px_rgba(0,240,255,0.08)]">
                    {/* Header Zone */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1d2026] to-black border border-[#00dbe9]/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
                            <span className="text-[#00dbe9] text-base font-black tracking-wider">{getInitials(selectedVendor.name)}</span>
                          </div>
                          <div className="text-left">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-lg font-black text-white leading-tight">{selectedVendor.name}</h3>
                              {selectedVendor.verified && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#00dbe9]/15 border border-[#00dbe9]/30 text-[#00dbe9] text-[9px] font-black uppercase tracking-wider">
                                  <ShieldCheck className="w-3 h-3" />
                                  <span>Vetted</span>
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-amber-400 mt-1 font-bold">
                              <Star className="w-3.5 h-3.5 fill-amber-400" />
                              <span>{selectedVendor.rating}</span>
                              <span className="text-[#b9cacb]/60 font-medium">({selectedVendor.reviews} reviews)</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-[#b9cacb] leading-relaxed text-left">
                        {selectedVendor.desc}
                      </p>
                    </div>

                    {/* Stats Zone */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5 text-center">
                      <div>
                        <p className="text-[10px] text-[#b9cacb]/60 uppercase font-black">Distance</p>
                        <p className="text-sm font-bold text-white mt-0.5">{selectedVendor.distance} km</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-[#b9cacb]/60 uppercase font-black">Experience</p>
                        <p className="text-sm font-bold text-white mt-0.5">{extras.experience} Yrs</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-[#b9cacb]/60 uppercase font-black">Completed</p>
                        <p className="text-sm font-bold text-white mt-0.5">{extras.projectsCompleted}＋</p>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2.5 pt-2">
                      <button
                        type="button"
                        onClick={() => setProfileModalVendorId(selectedVendor.id)}
                        className="flex-1 py-3 text-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                      >
                        Profile
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRequestQuote(selectedVendor.name)}
                        className="flex-1 py-3 text-center rounded-xl bg-gradient-to-r from-[#00dbe9] to-[#cf5cff] text-black font-extrabold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-primary-container/10 hover:shadow-primary-container/20 transition-all cursor-pointer"
                      >
                        Get Quote
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleSaveVendor(selectedVendor.id)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-center shrink-0 ${
                          selectedVendor.saved 
                            ? 'bg-[#cf5cff]/10 border-[#cf5cff]/40 text-[#cf5cff]' 
                            : 'bg-white/5 border-white/10 text-[#b9cacb] hover:text-white hover:bg-white/10'
                        }`}
                        title={selectedVendor.saved ? "Remove Bookmark" : "Save to Bookmarks"}
                      >
                        {selectedVendor.saved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                );
              })()
            ) : (
              <div className="p-8 text-center glass-panel rounded-3xl border border-white/10">
                <p className="text-xs text-[#b9cacb]">Select a vendor pin on the map to see their profile details here.</p>
              </div>
            )}
          </div>
        </>
      ) : (
        /* Grid list of interactive cards */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
            {filteredVendors.length === 0 ? (
              <div className="col-span-full py-16 text-center glass-panel rounded-3xl border-dashed border-white/10 space-y-4">
                <span className="material-symbols-outlined text-4xl text-[#b9cacb]/40">search_off</span>
                <p className="text-sm text-[#b9cacb]">No matching solar installation partners found.</p>
                <button
                  onClick={() => {
                    setRatingFilter('all');
                    setExpFilter('all');
                    setNearbySearch('');
                    setNearbyFilter('all');
                  }}
                  className="px-4 py-2 bg-[#00dbe9]/10 hover:bg-[#00dbe9]/20 border border-[#00dbe9]/30 text-[#00dbe9] rounded-xl text-xs font-bold uppercase"
                >
                  Reset Active Filters
                </button>
              </div>
            ) : (
              filteredVendors.map((vendor) => {
                const isSelected = selectedVendorId === vendor.id;
                const extras = VENDOR_EXTRAS[vendor.id] || { experience: 5, projectsCompleted: 100 };
                
                return (
                  <div
                    key={vendor.id}
                    onClick={() => setSelectedVendorId(vendor.id)}
                    className={`premium-card p-6 rounded-3xl cursor-pointer transition-all border flex flex-col justify-between space-y-6 ${
                      isSelected 
                        ? 'border-[#00dbe9] bg-[#00dbe9]/5 shadow-[0_0_25px_rgba(0,240,255,0.1)]' 
                        : 'border-white/5 bg-white/2 hover:bg-white/5'
                    }`}
                  >
                    {/* Header Zone */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex items-center gap-3">
                          {/* Logo replacement initials or dynamic asset */}
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1d2026] to-black border border-white/10 flex items-center justify-center shrink-0">
                            <span className="text-[#00dbe9] text-sm font-black tracking-wider">{getInitials(vendor.name)}</span>
                          </div>
                          <div className="text-left">
                            <h3 className="text-base font-black text-white group-hover:text-primary transition-colors leading-tight">{vendor.name}</h3>
                            <div className="flex items-center gap-1.5 text-xs text-amber-400 mt-1 font-bold">
                              <Star className="w-3.5 h-3.5 fill-amber-400" />
                              <span>{vendor.rating}</span>
                              <span className="text-[#b9cacb]/60 font-medium">({vendor.reviews} reviews)</span>
                            </div>
                          </div>
                        </div>

                        {vendor.verified && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#00dbe9]/15 border border-[#00dbe9]/30 text-[#00dbe9] text-[9px] font-black uppercase tracking-wider">
                            <ShieldCheck className="w-3 h-3" />
                            <span>Vetted</span>
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-[#b9cacb] leading-relaxed line-clamp-3 text-left">
                        {vendor.desc}
                      </p>
                    </div>

                    {/* Stats Zone */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5 text-center">
                      <div>
                        <p className="text-[10px] text-[#b9cacb]/60 uppercase font-black">Distance</p>
                        <p className="text-sm font-bold text-white mt-0.5">{vendor.distance} km</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-[#b9cacb]/60 uppercase font-black">Experience</p>
                        <p className="text-sm font-bold text-white mt-0.5">{extras.experience} Yrs</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-[#b9cacb]/60 uppercase font-black">Completed</p>
                        <p className="text-sm font-bold text-white mt-0.5">{extras.projectsCompleted}＋</p>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2.5 pt-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setProfileModalVendorId(vendor.id);
                        }}
                        className="flex-1 py-3 text-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                      >
                        Profile
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRequestQuote(vendor.name);
                        }}
                        className="flex-1 py-3 text-center rounded-xl bg-gradient-to-r from-[#00dbe9] to-[#cf5cff] text-black font-extrabold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-primary-container/10 hover:shadow-primary-container/20 transition-all cursor-pointer"
                      >
                        Get Quote
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleSaveVendor(vendor.id);
                        }}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-center shrink-0 ${
                          vendor.saved 
                            ? 'bg-[#cf5cff]/10 border-[#cf5cff]/40 text-[#cf5cff]' 
                            : 'bg-white/5 border-white/10 text-[#b9cacb] hover:text-white hover:bg-white/10'
                        }`}
                        title={vendor.saved ? "Remove Bookmark" : "Save to Bookmarks"}
                      >
                        {vendor.saved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          )}
        </div>

        {/* Right Side: NovaAI Recommendations and Safety Badges */}
        <aside className="lg:col-span-4 space-y-6">
          
          {/* NovaAI Custom Recommendation Card */}
          <div className="glass-panel p-6 rounded-3xl border-[#00dbe9]/30 bg-gradient-to-br from-[#00dbe9]/10 via-transparent to-transparent relative overflow-hidden group">
            {/* Glowing orb backdrop */}
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-[#00dbe9]/10 rounded-full blur-[60px] group-hover:bg-[#00dbe9]/20 transition-all duration-700" />
            
            <div className="space-y-6 text-left">
              <div className="flex items-center gap-2.5">
                <span className="w-10 h-10 rounded-xl bg-[#00dbe9]/10 flex items-center justify-center text-[#00dbe9]">
                  <Sparkles className="w-5 h-5" />
                </span>
                <div>
                  <h4 className="text-xs uppercase font-black text-[#00dbe9] tracking-wider">NovaAI Recommendations</h4>
                  <p className="text-[10px] text-[#b9cacb]">Geographical Match Analyzer</p>
                </div>
              </div>

              <p className="text-xs text-[#b9cacb] leading-relaxed font-medium">
                "Based on your registered location in <span className="text-[#00dbe9] font-bold">{user.location}</span> and system configurations, I recommend partnering with <span className="text-white font-bold">{selectedVendor.name}</span>."
              </p>

              {/* Dynamic Key Selling Points based on selection */}
              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 flex flex-col gap-1 hover:border-[#00dbe9]/20 transition-all">
                  <div className="flex justify-between items-center text-[10px] font-bold text-[#00dbe9]">
                    <span>Speed-to-Commission</span>
                    <span>Avg {selectedVendor.id === '1' ? '12' : selectedVendor.id === '2' ? '15' : '20'} Days</span>
                  </div>
                  <p className="text-xs font-extrabold text-white">{selectedVendor.name}</p>
                  <p className="text-[10px] text-[#b9cacb]/70">Fastest net-meter integration speed recorded by local state regulators.</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 flex flex-col gap-1 hover:border-[#cf5cff]/20 transition-all">
                  <div className="flex justify-between items-center text-[10px] font-bold text-[#cf5cff]">
                    <span>Product Catalog Match</span>
                    <span>High Fidelity</span>
                  </div>
                  <p className="text-xs font-extrabold text-white">Brands Offered</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {selectedExtras.brands.slice(0, 3).map((brand, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-white/5 text-[9px] text-[#b9cacb] font-bold">
                        {brand}
                      </span>
                    ))}
                    {selectedExtras.brands.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded bg-[#cf5cff]/15 text-[9px] text-[#cf5cff] font-bold">
                        ＋{selectedExtras.brands.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => handleConsultNova(selectedVendor.name)}
                  className="w-full py-3 bg-gradient-to-r from-[#00dbe9] to-[#cf5cff] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl hover:brightness-110 shadow-lg shadow-primary-container/10 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Consult Assistant</span>
                </button>
                <p className="text-[10px] text-[#b9cacb]/50 text-center">Nova will pre-populate queries regarding solar hardware matching.</p>
              </div>
            </div>
          </div>

          {/* Verification Shield / Lumina Protection */}
          <div className="glass-panel p-6 rounded-3xl border-white/10 bg-black/30 relative overflow-hidden">
            <div className="space-y-4 text-left">
              <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-[#cf5cff]" />
                <span>Verification Shield</span>
              </h4>
              <p className="text-[11px] text-[#b9cacb] leading-relaxed">
                All solar companies listed on SolarPulse undergo a comprehensive 20-point vetting checklist before receiving the verified badge.
              </p>
              <div className="space-y-3.5 pt-2 text-[11px] text-[#b9cacb]">
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <span className="font-bold text-white block">Licensing & Credentials</span>
                    <span>Verified active MNRE registry credentials, building permits, and electrical certifications.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <span className="font-bold text-white block">Lumina Shield Protection</span>
                    <span>Up to 5 years hardware construction warranty and grid transition insurance included by default.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* 4. Company Deep Profile Modal */}
      <AnimatePresence>
        {profileModalVendorId && modalVendor && modalExtras && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            {/* Modal Body */}
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl glass-panel p-8 sm:p-10 rounded-3xl border-[#00dbe9]/30 shadow-[0_0_50px_rgba(0,242,255,0.15)] bg-[#0d0f14] max-h-[90vh] overflow-y-auto scroll-hide"
            >
              {/* Close Button */}
              <button 
                onClick={() => {
                  setProfileModalVendorId(null);
                  setInquirySent(false);
                }}
                className="absolute top-6 right-6 text-[#b9cacb] hover:text-white p-1 rounded-full bg-white/5 border border-white/5 transition-all cursor-pointer z-10"
              >
                ✕
              </button>

              <div className="space-y-6 text-left">
                {/* Header Profile Zone */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1d2026] to-black border border-white/10 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
                      <span className="text-[#00dbe9] text-xl font-black tracking-wider">{getInitials(modalVendor.name)}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white leading-tight">{modalVendor.name}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs">
                        <span className="flex items-center text-amber-400 font-bold gap-0.5">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{modalVendor.rating}</span>
                        </span>
                        <span className="text-[#b9cacb]/60">•</span>
                        <span className="text-[#b9cacb] font-medium">{modalVendor.reviews} Reviews</span>
                        <span className="text-[#b9cacb]/60">•</span>
                        <span className="text-[#00dbe9] font-mono">{modalVendor.distance} km away</span>
                      </div>
                    </div>
                  </div>

                  {modalVendor.verified && (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#00dbe9]/10 border border-[#00dbe9]/30 text-[#00dbe9] text-[10px] font-black uppercase tracking-wider">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>MNRE Approved</span>
                    </span>
                  )}
                </div>

                {/* Main Modal Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Left Column: Vendor Stats and Brand Catalog */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h4 className="text-xs font-black text-white uppercase tracking-wider">About Company</h4>
                      <p className="text-xs text-[#b9cacb] leading-relaxed">
                        {modalVendor.desc} They maintain high installation standards, supporting both off-grid battery arrays and on-grid bidirectional net meters.
                      </p>
                    </div>

                    {/* Specifications */}
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-[#b9cacb]">Active Projects</span>
                        <span className="text-white font-extrabold">{modalExtras.projectsCompleted} Installations</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-[#b9cacb]">Installer Registry</span>
                        <span className="text-[#00dbe9] font-mono">MNRE-{modalVendor.id}409-G</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-[#b9cacb]">Workforce Strength</span>
                        <span className="text-white font-bold">25+ Cert. Electricians</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-[#b9cacb]">Warranty Period</span>
                        <span className="text-white font-bold">5 Years on Execution</span>
                      </div>
                    </div>

                    {/* Offered Brands */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-black text-white uppercase tracking-wider">Approved Panels & Hardware</h4>
                      <div className="flex flex-wrap gap-2">
                        {modalExtras.brands.map((brand, i) => (
                          <span key={i} className="px-3 py-1.5 rounded-xl bg-black/40 border border-white/5 text-xs text-[#b9cacb] font-bold">
                            {brand}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Direct Contact info */}
                    <div className="space-y-2.5 pt-2 text-xs text-[#b9cacb]">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-[#00dbe9]" />
                        <span>{modalExtras.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-[#cf5cff]" />
                        <span className="underline">{modalExtras.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Customer Reviews or Quick Inquiry Form */}
                  <div className="space-y-6">
                    {inquirySent ? (
                      <div className="p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-4 flex flex-col items-center justify-center h-full min-h-[250px]">
                        <div className="w-12 h-12 rounded-full bg-emerald-500 text-black flex items-center justify-center">
                          <Check className="w-6 h-6 stroke-[3]" />
                        </div>
                        <h4 className="text-base font-extrabold text-white">Inquiry Sent Successfully!</h4>
                        <p className="text-xs text-[#b9cacb] leading-relaxed max-w-xs mx-auto">
                          Your contact coordinates and solar parameters have been securely compiled and sent to <span className="text-white font-bold">{modalVendor.name}</span>. Expect an email with system specifications in 24 hours.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <h4 className="text-xs font-black text-white uppercase tracking-wider">Send Direct Inquiry</h4>
                        
                        <form onSubmit={handleInquirySubmit} className="space-y-4">
                          <div>
                            <label className="block text-[10px] font-black text-[#b9cacb] uppercase tracking-wider mb-1.5">My Custom Message</label>
                            <textarea 
                              value={inquiryMsg}
                              onChange={(e) => setInquiryMsg(e.target.value)}
                              required
                              rows={4}
                              className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-[#00dbe9] focus:ring-2 focus:ring-[#00dbe9]/10 transition-all resize-none"
                              placeholder={`Hey, I would like to get a quote on a residential solar rooftop system of size ${user.location === 'Mumbai' ? '3 kW' : '5 kW'}...`}
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full py-3 bg-[#00dbe9] hover:brightness-110 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-primary-container/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                          >
                            <span>Send Custom Inquiry</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </form>

                        {/* Recent Reviews Panel */}
                        <div className="space-y-3 pt-2">
                          <h4 className="text-xs font-black text-white uppercase tracking-wider">Recent Reviews</h4>
                          <div className="space-y-3 max-h-[160px] overflow-y-auto scroll-hide pr-1">
                            {modalExtras.reviewsList.map((rev, i) => (
                              <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/5 text-left space-y-1">
                                <div className="flex justify-between items-center text-[10px] font-bold">
                                  <span className="text-white">{rev.author}</span>
                                  <span className="text-amber-400">★ {rev.rating}</span>
                                </div>
                                <p className="text-[10px] text-[#b9cacb]/80 leading-relaxed italic">
                                  "{rev.text}"
                                </p>
                                <p className="text-[9px] text-[#b9cacb]/50 text-right">{rev.date}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Cancel / Contact buttons */}
                <div className="flex gap-3 pt-4 border-t border-white/5 justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setProfileModalVendorId(null);
                      setInquirySent(false);
                    }}
                    className="px-6 py-3 rounded-xl border border-white/10 text-[#b9cacb] hover:text-white text-xs font-bold uppercase tracking-wider bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
                  >
                    Close
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