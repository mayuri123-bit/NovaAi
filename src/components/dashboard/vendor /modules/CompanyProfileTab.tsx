import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Star, 
  FileText, 
  CheckCircle2, 
  Award, 
  Edit, 
  Save, 
  Trash2,
  Plus,
  Mail,
  Phone,
  Briefcase,
  Users,
  Shield,
  Upload,
  Globe,
  Sun,
  Camera,
  Layers,
  ArrowRight
} from 'lucide-react';

export interface CompanyDetails {
  name: string;
  regId: string;
  gstin: string;
  address: string;
  mnreId: string;
  certifications: string[];
  rating: number;
  reviews: number;
  completedProjects: number;
  description?: string;
  experience?: string;
  email?: string;
  phone?: string;
  jurisdictions?: string[];
  services?: string[];
  gallery?: { title: string; location: string; url: string; }[];
}

interface CompanyProfileTabProps {
  companyDetails: CompanyDetails;
  onUpdateCompanyDetails: (details: CompanyDetails) => void;
  showToast?: (text: string, type?: 'success' | 'info') => void;
}

export default function CompanyProfileTab({ 
  companyDetails, 
  onUpdateCompanyDetails,
  showToast = () => {}
}: CompanyProfileTabProps) {
  const [isEditing, setIsEditing] = useState(false);

  // Core editable fields
  const [name, setName] = useState(companyDetails.name);
  const [regId, setRegId] = useState(companyDetails.regId);
  const [gstin, setGstin] = useState(companyDetails.gstin);
  const [address, setAddress] = useState(companyDetails.address);
  const [mnreId, setMnreId] = useState(companyDetails.mnreId);
  
  // Custom new fields
  const [description, setDescription] = useState(
    companyDetails.description || 
    'Pioneering intelligent energy grids with AI-driven installation protocols and next-generation storage solutions across metropolitan regions.'
  );
  const [experience, setExperience] = useState(companyDetails.experience || '12+ Years');
  const [email, setEmail] = useState(companyDetails.email || 'ops@novaaisolar.com');
  const [phone, setPhone] = useState(companyDetails.phone || '+1 (800) 555-NOVA');
  
  const [jurisdictions, setJurisdictions] = useState<string[]>(
    companyDetails.jurisdictions || ['California', 'Arizona', 'Nevada', 'Texas']
  );
  const [newJurisdiction, setNewJurisdiction] = useState('');

  const [services, setServices] = useState<string[]>(
    companyDetails.services || ['Grid-Tie Installation', 'AI Power Analytics', 'Storage Retrofitting', 'EV-Charger Integration']
  );
  const [newService, setNewService] = useState('');

  const [certs, setCerts] = useState<string[]>(companyDetails.certifications);
  const [newCert, setNewCert] = useState('');

  const [gallery, setGallery] = useState<{ title: string; location: string; url: string; }[]>(
    companyDetails.gallery || [
      { 
        title: 'Omni-Plaza Grid', 
        location: 'San Francisco, CA', 
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCLiwg3pYT6sfkta6OAXAIvHnt-R-oS0NYiRFJxwNwvqiI7jPB-yKoSZorK-ems_Ypq9hLKUZwGF_UE8mlynsvXliXJYPkE_lzOgGe6H2V_mzSaae6-s6wbuNDK25pC28Az6B4r3FgHitwSBsfuRxQJP8J_Nwv_wNwfd3UCSgEAaYUNHXXyAgUkBzeRERIz1LwmfGKPqjHzsIxywmvtchCs3DOlP8m5SgeXgWWwn2iAet_nEX62BJVGQ' 
      },
      { 
        title: 'Eco-Villa Smart Hub', 
        location: 'Beverly Hills, CA', 
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1goF_26bGwE5CJopuBY4n0VZu0OhF2Pnh-4YKlrmSsBQh2muGYxubsmHH7ckLuU-PYkRorsCveRH5XpaMZqHXVqHbP0CV8A02SBChYFbXHudUFxcHHxEbXA8h7jStggjv3w7wnqQrPd2s3jdgw308arJQtC7gTnpmxR9lO4RNoG5hnzEMW7G6tiCvz6UD8aP_R0IcY3APgGYmTVOxJiJFMM_LZrbtMaJFxp2JwBptxDSAh1wW1YCZyw' 
      },
      { 
        title: 'Helios-9 Array', 
        location: 'Mojave Desert, NV', 
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALKOGvKla1i3fNL9pAWT8V1xBtzZvbljBSBfukwfj5zTWIsgCVv1Rns3cj3YSj7bwt3j9uXMwXgZVZOeqJGatG0sbLJW8S-4AsG2r8pdmeL64nzfddRKEyPCHiijnOagRqdbJEYNwmGbIA-O0Zh-FjIiyaNrTZPr6P8ekswowRMKBx7RpXrKVBuGpMrrF2grIRgAQJMAWYphEURIhIAKucZHgRExwq2fnmhRy_9PEaexAUAIFb6NxeSw' 
      },
    ]
  );

  // Gallery item inputs
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoLoc, setNewPhotoLoc] = useState('');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateCompanyDetails({
      ...companyDetails,
      name,
      regId,
      gstin,
      address,
      mnreId,
      certifications: certs,
      description,
      experience,
      email,
      phone,
      jurisdictions,
      services,
      gallery
    });
    setIsEditing(false);
    showToast('✨ Corporate credentials and public capabilities saved successfully!', 'success');
  };

  const handleAddCert = () => {
    if (newCert.trim() && !certs.includes(newCert.trim())) {
      setCerts([...certs, newCert.trim()]);
      setNewCert('');
    }
  };

  const handleAddJurisdiction = () => {
    if (newJurisdiction.trim() && !jurisdictions.includes(newJurisdiction.trim())) {
      setJurisdictions([...jurisdictions, newJurisdiction.trim()]);
      setNewJurisdiction('');
    }
  };

  const handleAddService = () => {
    if (newService.trim() && !services.includes(newService.trim())) {
      setServices([...services, newService.trim()]);
      setNewService('');
    }
  };

  const handleAddPhoto = () => {
    if (newPhotoTitle.trim() && newPhotoUrl.trim()) {
      setGallery([...gallery, {
        title: newPhotoTitle.trim(),
        location: newPhotoLoc.trim() || 'General Region',
        url: newPhotoUrl.trim()
      }]);
      setNewPhotoTitle('');
      setNewPhotoLoc('');
      setNewPhotoUrl('');
      showToast('📸 Added photo to showcase portfolio!', 'success');
    } else {
      showToast('⚠️ Please provide at least a Photo Title and Image URL.', 'info');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in text-left">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-white/5">
        <div>
          <h2 className="text-4xl font-black text-[#00f0ff] mb-2 tracking-tight neon-text-glow">Company Profile</h2>
          <p className="text-[#b9cacb] font-body-md text-sm max-w-2xl leading-relaxed">
            Manage your organizational identity, service capabilities, and public-facing credentials on the SolarNexus network.
          </p>
        </div>
        <div className="flex gap-3">
          {isEditing ? (
            <>
              <button 
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 font-bold text-xs text-white border border-white/10 transition-all cursor-pointer"
              >
                Cancel Edit
              </button>
              <button 
                onClick={handleSave}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00dbe9] to-[#cf5cff] font-bold text-xs text-[#002022] hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all cursor-pointer flex items-center gap-2 border-none"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 font-bold text-xs text-white border border-white/10 transition-all cursor-pointer flex items-center gap-2"
            >
              <Edit className="w-4 h-4 text-[#00f0ff]" />
              Edit Profile
            </button>
          )}
        </div>
      </section>

      {isEditing ? (
        /* ==================== EDIT FORM LAYOUT ==================== */
        <form onSubmit={handleSave} className="space-y-8 max-w-4xl text-xs text-left animate-fade-in">
          <div className="bg-[#1d2026]/40 border border-[#00f0ff]/20 p-8 rounded-[2rem] space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#00f0ff]" />
              Identity & Registration Credentials
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5 col-span-1 md:col-span-2">
                <label className="text-[10px] text-[#00f0ff] font-mono uppercase tracking-wider">Company Trade Name</label>
                <input 
                  type="text" 
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00f0ff]"
                />
              </div>

              <div className="space-y-1.5 col-span-1 md:col-span-2">
                <label className="text-[10px] text-[#00f0ff] font-mono uppercase tracking-wider">Public Bio Description</label>
                <textarea 
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00f0ff]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-[#00f0ff] font-mono uppercase tracking-wider">Vendor registration ID</label>
                <input 
                  type="text" 
                  required 
                  value={regId}
                  onChange={(e) => setRegId(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00f0ff]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-[#00f0ff] font-mono uppercase tracking-wider">GST/Tax Classification ID</label>
                <input 
                  type="text" 
                  required 
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00f0ff]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-[#00f0ff] font-mono uppercase tracking-wider">MNRE / National Empanelment ID</label>
                <input 
                  type="text" 
                  required 
                  value={mnreId}
                  onChange={(e) => setMnreId(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00f0ff]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-[#00f0ff] font-mono uppercase tracking-wider">Years of Experience</label>
                <input 
                  type="text" 
                  required 
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00f0ff]"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contacts & Logistics */}
            <div className="bg-[#1d2026]/40 border border-white/5 p-8 rounded-3xl space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#cf5cff]" />
                Logistics & Core Contacts
              </h3>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#00f0ff] font-mono uppercase tracking-wider">Registered Headquarters</label>
                  <textarea 
                    required 
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00f0ff]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#00f0ff] font-mono uppercase tracking-wider">Primary Email Address</label>
                  <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00f0ff]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#00f0ff] font-mono uppercase tracking-wider">Primary Phone Line</label>
                  <input 
                    type="text" 
                    required 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00f0ff]"
                  />
                </div>
              </div>
            </div>

            {/* Jurisdictions & Services */}
            <div className="bg-[#1d2026]/40 border border-white/5 p-8 rounded-3xl space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#00dbe9]" />
                Expertise & Regional Scope
              </h3>

              <div className="space-y-6">
                {/* Jurisdictions */}
                <div className="space-y-2">
                  <label className="text-[10px] text-[#00f0ff] font-mono uppercase tracking-wider block">Operational Jurisdictions</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Add zone..." 
                      value={newJurisdiction}
                      onChange={(e) => setNewJurisdiction(e.target.value)}
                      className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    />
                    <button 
                      type="button" 
                      onClick={handleAddJurisdiction}
                      className="bg-[#00f0ff] text-[#002022] font-bold p-2.5 rounded-xl border-none cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1.5">
                    {jurisdictions.map(j => (
                      <span key={j} className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
                        {j}
                        <button type="button" onClick={() => setJurisdictions(jurisdictions.filter(x => x !== j))} className="text-red-400 hover:text-red-300 font-bold border-none bg-transparent cursor-pointer">×</button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Services */}
                <div className="space-y-2">
                  <label className="text-[10px] text-[#00f0ff] font-mono uppercase tracking-wider block">Service Offerings</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Add offering..." 
                      value={newService}
                      onChange={(e) => setNewService(e.target.value)}
                      className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    />
                    <button 
                      type="button" 
                      onClick={handleAddService}
                      className="bg-[#00f0ff] text-[#002022] font-bold p-2.5 rounded-xl border-none cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1.5">
                    {services.map(s => (
                      <span key={s} className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
                        {s}
                        <button type="button" onClick={() => setServices(services.filter(x => x !== s))} className="text-red-400 hover:text-red-300 font-bold border-none bg-transparent cursor-pointer">×</button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Accreditations & Showcase Portfolio Edit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Certifications Accreditations */}
            <div className="bg-[#1d2026]/40 border border-white/5 p-8 rounded-3xl space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                Accreditations & Certificates
              </h3>

              <div className="space-y-3">
                <label className="text-[10px] text-[#00f0ff] font-mono uppercase tracking-wider block">Managed Certifications</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="e.g. ISO 9001 Certified" 
                    value={newCert}
                    onChange={(e) => setNewCert(e.target.value)}
                    className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                  <button 
                    type="button" 
                    onClick={handleAddCert}
                    className="bg-[#00f0ff] text-[#002022] font-bold p-2.5 rounded-xl border-none cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {certs.map((cert) => (
                    <span key={cert} className="bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/20 px-3 py-1.5 rounded-full text-[10px] font-bold font-mono flex items-center gap-1.5">
                      ✓ {cert}
                      <button 
                        type="button"
                        onClick={() => setCerts(certs.filter(c => c !== cert))}
                        className="hover:text-red-400 p-0.5 border-none bg-transparent cursor-pointer text-xs"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Gallery Image Manager */}
            <div className="bg-[#1d2026]/40 border border-white/5 p-8 rounded-3xl space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Camera className="w-5 h-5 text-[#00f0ff]" />
                Showcase Portfolio Manager
              </h3>

              <div className="space-y-3 p-4 bg-black/20 rounded-xl border border-white/5 space-y-3.5">
                <p className="text-[10px] text-on-surface-variant font-bold font-mono uppercase">Add Showcase Photo</p>
                
                <input 
                  type="text" 
                  placeholder="Photo Title (e.g. Omni-Plaza Grid)" 
                  value={newPhotoTitle}
                  onChange={(e) => setNewPhotoTitle(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />

                <input 
                  type="text" 
                  placeholder="Installation Location (e.g. San Francisco, CA)" 
                  value={newPhotoLoc}
                  onChange={(e) => setNewPhotoLoc(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />

                <input 
                  type="text" 
                  placeholder="Image URL (e.g. https://...)" 
                  value={newPhotoUrl}
                  onChange={(e) => setNewPhotoUrl(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />

                <button 
                  type="button" 
                  onClick={handleAddPhoto}
                  className="w-full bg-gradient-to-r from-[#00dbe9] to-[#cf5cff] text-[#002022] font-black py-2.5 rounded-xl border-none cursor-pointer flex justify-center items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  Add Photo to Showcase
                </button>
              </div>

              {/* Gallery list view to delete */}
              <div className="space-y-1.5">
                <p className="text-[10px] text-on-surface-variant font-bold font-mono uppercase mb-2">Showcase Gallery Items ({gallery.length})</p>
                <div className="max-h-[140px] overflow-y-auto space-y-2 pr-1 no-scrollbar">
                  {gallery.map((g) => (
                    <div key={g.title} className="flex items-center justify-between p-2 bg-white/5 rounded-lg border border-white/5">
                      <div className="flex items-center gap-3">
                        <img src={g.url} alt="thumbnail" className="w-10 h-8 object-cover rounded" referrerPolicy="no-referrer" />
                        <div className="text-left">
                          <p className="font-bold text-white truncate max-w-[150px]">{g.title}</p>
                          <p className="text-[10px] text-on-surface-variant truncate">{g.location}</p>
                        </div>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => setGallery(gallery.filter(x => x.title !== g.title))}
                        className="p-1 text-on-surface-variant hover:text-red-400 border-none bg-transparent cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-[#00dbe9] to-[#cf5cff] text-[#002022] font-black py-4 rounded-xl hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] active:scale-[0.98] transition-all border-none cursor-pointer flex justify-center items-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Corporate Identity
            </button>
          </div>
        </form>
      ) : (
        /* ==================== BEAUTIFUL BENTO GRID PRESENTATION ==================== */
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-fade-in">
          
          {/* Company Identity Card */}
          <div className="md:col-span-8 bg-[#1d2026]/40 border border-white/5 rounded-3xl p-8 flex flex-col md:flex-row gap-8 relative overflow-hidden group hover:border-[#00dbe9]/30 hover:shadow-[0_0_30px_rgba(0,240,255,0.04)] transition-all duration-300">
            {/* Background Panel Structure Graphic */}
            <div className="absolute top-0 right-0 w-64 h-64 opacity-10 pointer-events-none transition-transform duration-500 group-hover:scale-105">
              <img 
                className="w-full h-full object-cover grayscale brightness-50" 
                src="https://lh3.googleusercontent.com/aida/AP1WRLuuyFfwfTFDfErzowehoRRdjmu0qjG6uU9mgj7-zw_tK_a58EIyKStcjPj7wadiKjau/612x612" 
                alt="Solar Panels Blueprint"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback if background image has issues
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>

            <div className="relative z-10 w-32 h-32 md:w-48 md:h-48 rounded-2xl border border-white/10 bg-black/40 p-4 flex items-center justify-center shrink-0">
              <Sun className="w-20 h-20 text-[#00f0ff] animate-pulse" />
            </div>

            <div className="relative z-10 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="font-headline-md text-2xl font-black text-white">{name}</h3>
                  <span className="bg-[#00f0ff]/10 border border-[#00f0ff]/40 text-[#00f0ff] px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1.5 tracking-wider uppercase">
                    <Shield className="w-3.5 h-3.5 text-[#00f0ff]" />
                    VERIFIED VENDOR
                  </span>
                </div>
                <p className="text-on-surface-variant text-sm font-medium leading-relaxed mb-6">
                  {description}
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 border-t border-white/5 pt-6 text-xs font-mono">
                <div>
                  <p className="text-on-surface-variant uppercase tracking-widest text-[9px] font-bold mb-1">Vendor ID</p>
                  <p className="font-black text-white">{mnreId}</p>
                </div>
                <div>
                  <p className="text-on-surface-variant uppercase tracking-widest text-[9px] font-bold mb-1">GST/Tax ID</p>
                  <p className="font-black text-white">{gstin}</p>
                </div>
                <div>
                  <p className="text-on-surface-variant uppercase tracking-widest text-[9px] font-bold mb-1">Experience</p>
                  <p className="font-black text-white">{experience}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="md:col-span-4 bg-[#1d2026]/40 border border-white/5 rounded-3xl p-8 flex flex-col justify-between group hover:border-[#cf5cff]/30 hover:shadow-[0_0_30px_rgba(207,92,255,0.04)] transition-all duration-300">
            <h4 className="font-label-md font-bold text-on-surface-variant text-[10px] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#cf5cff]" />
              PERFORMANCE METRICS
            </h4>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-black text-white">{(companyDetails.completedProjects * 14).toLocaleString()}+</p>
                  <p className="text-[10px] text-on-surface-variant font-bold font-mono uppercase tracking-wider">Installations</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#00f0ff]/10 flex items-center justify-center border border-[#00f0ff]/20">
                  <Sun className="w-6 h-6 text-[#00f0ff]" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-black text-white">{(companyDetails.completedProjects * 9).toLocaleString()}</p>
                  <p className="text-[10px] text-on-surface-variant font-bold font-mono uppercase tracking-wider">Active Customers</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                  <Users className="w-6 h-6 text-[#cf5cff]" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-black text-white">42</p>
                  <p className="text-[10px] text-on-surface-variant font-bold font-mono uppercase tracking-wider">Cities Covered</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <MapPin className="w-6 h-6 text-emerald-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Business Details & Services */}
          <div className="md:col-span-6 bg-[#1d2026]/40 border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-all duration-300">
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
              <Building2 className="w-5 h-5 text-[#00f0ff]" />
              Business Operations
            </h4>

            <div className="space-y-8">
              <div>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold font-mono mb-3">Registered Headquarters</p>
                <div className="flex gap-4">
                  <MapPin className="w-5 h-5 text-on-surface-variant shrink-0" />
                  <p className="text-sm text-on-surface leading-relaxed font-semibold">{address}</p>
                </div>
              </div>

              <div>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold font-mono mb-3">Operational Jurisdictions</p>
                <div className="flex flex-wrap gap-2">
                  {jurisdictions.map(j => (
                    <span key={j} className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-semibold text-on-surface">
                      {j}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold font-mono mb-3">Primary Contact Info</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-sm font-semibold text-on-surface">
                    <Mail className="w-4 h-4 text-[#cf5cff]" />
                    <span>{email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-semibold text-on-surface">
                    <Phone className="w-4 h-4 text-[#00f0ff]" />
                    <span>{phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Services & Certifications */}
          <div className="md:col-span-6 bg-[#1d2026]/40 border border-white/5 rounded-3xl p-8 flex flex-col justify-between hover:border-white/10 transition-all duration-300">
            <div>
              <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                <Sun className="w-5 h-5 text-yellow-400" />
                Expertise & Credibility
              </h4>

              <div className="space-y-8">
                <div>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold font-mono mb-3">Service Offerings</p>
                  <div className="grid grid-cols-2 gap-3">
                    {services.map(s => (
                      <div key={s} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 group hover:bg-[#00f0ff]/10 transition-colors">
                        <CheckCircle2 className="w-4 h-4 text-[#00f0ff] shrink-0" />
                        <span className="text-xs font-semibold">{s}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold font-mono mb-3">Accreditations</p>
                  <div className="flex gap-4">
                    {certs.slice(0, 3).map((cert, index) => {
                      const icons = [Award, Shield, Layers];
                      const SelectedIcon = icons[index % icons.length];
                      const colors = ['text-yellow-400', 'text-[#00f0ff]', 'text-[#cf5cff]'];
                      
                      return (
                        <div key={cert} className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center p-2 text-center" title={cert}>
                          <SelectedIcon className={`w-5 h-5 ${colors[index % colors.length]}`} />
                          <span className="text-[8px] font-bold mt-1 text-on-surface truncate w-full">{cert}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project Showcase Gallery */}
          <div className="md:col-span-12 bg-[#1d2026]/40 border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-all duration-300">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 text-left">
              <div>
                <h4 className="text-xl font-bold text-white flex items-center gap-3">
                  <Camera className="w-5 h-5 text-[#00f0ff]" />
                  Showcase Gallery
                </h4>
                <p className="text-xs text-on-surface-variant mt-1">Stunning clean installations delivered by our elite engineering crew.</p>
              </div>
              <button 
                onClick={() => {
                  setIsEditing(true);
                  showToast('💡 Scroll down the editor to add new images or modify the portfolio list.', 'info');
                }}
                className="text-[#00f0ff] font-bold text-xs hover:underline flex items-center gap-1.5 border-none bg-transparent cursor-pointer"
              >
                Manage Portfolio
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {gallery.map((item) => (
                <div key={item.title} className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-black/20 border border-white/5">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    src={item.url} 
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=400&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-left">
                    <p className="text-white font-bold text-sm">{item.title}</p>
                    <p className="text-on-surface-variant text-[10px] mt-0.5">{item.location}</p>
                  </div>
                </div>
              ))}

              <div 
                onClick={() => {
                  setIsEditing(true);
                  showToast('📸 Open portfolio manager on edit view to add new images.', 'info');
                }}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] border-2 border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer hover:border-[#00f0ff]/40 hover:bg-white/5 transition-all"
              >
                <Camera className="w-8 h-8 text-on-surface-variant group-hover:scale-110 group-hover:text-[#00f0ff] transition-all" />
                <p className="text-xs font-bold text-on-surface-variant mt-2">Add Project</p>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
