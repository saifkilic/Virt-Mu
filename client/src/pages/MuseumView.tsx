import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { UI_STRINGS } from '../context/translation';
import { api } from '../services/api';
import type { Artifact } from '../services/api';
import { ArrowLeft, X, Eye, Clock, Loader2, Heart, Share2, Info, Volume2 } from 'lucide-react';

// 1. Isolated Static Config out of the Render Loop to optimize memory footprint
const MUSEUM_CONFIG: Record<string, {
  accent: string;
  accentBg: string;
  accentText: string;
  name: string;
  urduName: string;
  badge: string;
}> = {
  lahore: {
    accent: 'border-[#FF7F00]',
    accentBg: 'bg-[#FF7F00]',
    accentText: 'text-[#FF7F00]',
    name: 'Lahore Museum',
    urduName: 'لاہور میوزیم',
    badge: 'MUGHAL SPLENDOR'
  },
  taxila: {
    accent: 'border-[#1E3A8A]',
    accentBg: 'bg-[#1E3A8A]',
    accentText: 'text-[#1E3A8A]',
    name: 'Taxila Museum',
    urduName: 'ٹیکسلا میوزیم',
    badge: 'UNESCO SITE'
  },
  national: {
    accent: 'border-[#D4AF37]',
    accentBg: 'bg-[#D4AF37]',
    accentText: 'text-[#D4AF37]',
    name: 'National Museum',
    urduName: 'قومی میوزیم',
    badge: 'GLOBAL COLLECTION'
  },
  mohenjo: {
    accent: 'border-[#8B7355]',
    accentBg: 'bg-[#8B7355]',
    accentText: 'text-[#8B7355]',
    name: 'Mohenjo-daro',
    urduName: 'موہنجوڈاڑو',
    badge: '3300 BCE'
  }
};

const VALID_IDS = Object.keys(MUSEUM_CONFIG);

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const MuseumView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  // Unused assignment retained if needed elsewhere, otherwise safe to drop
  // const t = UI_STRINGS[language]; 

  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);
  const [viewedIds, setViewedIds] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const dir = language === 'ur' ? 'rtl' : 'ltr';

  // Resize Listener Optimization
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Spatial Session Counter Timer
  useEffect(() => {
    const timer = setInterval(() => setTimeElapsed((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  // Unified Data Sync Pipeline
 useEffect(() => {
  if (!id || !VALID_IDS.includes(id)) return;
  
  const loadArtifacts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.getArtifactsByMuseum(id);
      
      const validatedData = Array.isArray(res) 
        ? res 
        : ((res as any)?.data || []);
        
      setArtifacts(validatedData);
    } catch (err) {
      setError(language === 'en' ? 'Failed to sync exhibit records.' : 'نمائش کا ریکارڈ مطابقت پذیری کرنے میں ناکام۔');
    } finally {
      setLoading(false);
    }
  };

  loadArtifacts();
}, [id, language]);

  const handleSelectArtifact = (artifact: Artifact) => {
    setSelectedArtifact(artifact);
    if (!viewedIds.includes(artifact._id)) {
      setViewedIds((prev) => [...prev, artifact._id]);
    }
  };

  const toggleFavorite = (artifactId: string) => {
    setFavorites((prev) =>
      prev.includes(artifactId)
        ? prev.filter((item) => item !== artifactId)
        : [...prev, artifactId]
    );
  };

  // Guard Rails for Route Parameters
  if (!id || !VALID_IDS.includes(id)) {
    return (
      <div className="text-center py-20 space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-museum-red/10 rounded-full">
          <Info className="h-8 w-8 text-museum-red" />
        </div>
        <div className="space-y-2">
          <p className={`text-lg font-display font-bold text-museum-red ${language === 'ur' ? 'font-urdu' : ''}`}>
            {language === 'en' ? 'Museum Not Found' : 'میوزیم نہیں ملا'}
          </p>
          <p className={`text-sm text-deep-navy/60 ${language === 'ur' ? 'font-urdu' : 'font-body'}`}>
            {language === 'en' ? 'The museum you are looking for does not exist.' : 'جو میوزیم آپ تلاش کر رہے ہیں وہ موجود نہیں ہے۔'}
          </p>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-deep-navy text-white font-body font-semibold rounded-lg hover:bg-deep-navy/90 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-deep-gold focus-visible:outline-offset-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {language === 'en' ? 'Return Home' : 'ہوم پیج پر جائیں'}
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <div className="relative">
          <div className="absolute inset-0 bg-deep-gold/20 rounded-full blur-lg animate-pulse" />
          <Loader2 className="relative h-12 w-12 animate-spin text-deep-gold" />
        </div>
        <div className="text-center space-y-2">
          <p className={`text-lg font-display font-bold text-deep-navy ${language === 'ur' ? 'font-urdu' : ''}`}>
            {language === 'en' ? 'Loading Exhibition...' : 'نمائش لوڈ ہو رہی ہے...'}
          </p>
          <p className={`text-sm text-deep-navy/60 ${language === 'ur' ? 'font-urdu' : 'font-body'}`}>
            {language === 'en' ? 'Preparing artifacts and historical data' : 'نوادرات اور تاریخی ڈیٹا کی تیاری'}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-museum-red/10 rounded-full">
          <X className="h-8 w-8 text-museum-red" />
        </div>
        <div className="space-y-2">
          <p className={`text-lg font-display font-bold text-museum-red ${language === 'ur' ? 'font-urdu' : ''}`}>
            {error}
          </p>
          <p className={`text-sm text-deep-navy/60 max-w-sm ${language === 'ur' ? 'font-urdu' : 'font-body'}`}>
            {language === 'en' ? 'Unable to load exhibition data. Please try again.' : 'نمائش کا ڈیٹا لوڈ نہیں ہو سکا۔ براہ کرم دوبارہ کوشش کریں۔'}
          </p>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-deep-navy text-white font-body font-semibold rounded-lg hover:bg-deep-navy/90 transition-all duration-300"
        >
          <ArrowLeft className="h-4 w-4" />
          {language === 'en' ? 'Return Home' : 'ہوم پیج پر جائیں'}
        </button>
      </div>
    );
  }

  const config = MUSEUM_CONFIG[id];

  return (
    <div className="space-y-6" dir={dir}>
      {/* Back Button & Header Control Group */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-4 py-3 text-deep-navy hover:text-deep-gold font-body font-semibold transition-all duration-300 rounded-lg focus-visible:outline-2 focus-visible:outline-deep-gold focus-visible:outline-offset-2 group"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
          <span>{language === 'en' ? 'Back to Dashboard' : 'ڈیش بورڈ پر واپس جائیں'}</span>
        </button>

        {/* Progress & Temporal Tracker */}
        <div className="flex items-center gap-4 px-6 py-3 bg-white border border-light-gray/60 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 text-sm font-body font-semibold text-deep-navy">
            <Eye className="h-4 w-4 text-deep-gold" />
            <span>{viewedIds.length}/{artifacts.length}</span>
          </div>
          <div className="w-24 h-2 bg-light-gray rounded-full overflow-hidden" role="progressbar" aria-valuenow={viewedIds.length} aria-valuemax={artifacts.length}>
            <div
              className={`h-full ${config.accentBg} transition-all duration-300`}
              style={{ width: `${(viewedIds.length / Math.max(artifacts.length, 1)) * 100}%` }}
            />
          </div>
          <div className="flex items-center gap-2 text-sm font-body text-deep-navy/60">
            <Clock className="h-4 w-4" />
            <span>{formatTime(timeElapsed)}</span>
          </div>
        </div>
      </div>

      {/* Museum Context Banner */}
      <div className={`bg-white border-l-8 ${config.accent} rounded-r-2xl p-8 md:p-12 shadow-[0_4px_20px_rgba(0,0,0,0.05)] relative overflow-hidden`}>
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-light-gray to-transparent rounded-full -z-0 opacity-50" />
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className={`inline-block px-4 py-2 ${config.accentBg} text-white text-xs font-display font-bold rounded-lg`}>
            {config.badge}
          </div>
          <div className="space-y-2">
            <h1 className={`text-4xl md:text-5xl font-display font-bold text-rich-brown ${language === 'ur' ? 'font-urdu' : ''}`}>
              {language === 'ur' ? config.urduName : config.name}
            </h1>
            <p className={`text-base md:text-lg text-deep-navy/70 max-w-2xl leading-relaxed ${language === 'ur' ? 'font-urdu text-right' : 'font-body'}`}>
              {language === 'en'
                ? 'Immerse yourself in centuries of history with interactive 3D artifacts and detailed historical narratives.'
                : 'انٹرایکٹو 3D نوادرات اور تفصیلی تاریخی بیانات کے ساتھ صدیوں کی تاریخ میں ڈوب جائیں۔'}
            </p>
          </div>
        </div>
      </div>

      {/* Responsive Structural Layer */}
      <div className="pt-4">
        {isMobile ? (
          /* Mobile View: Linear Media Card List Layout */
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-cream to-soft-white border border-light-gray/60 p-4 rounded-2xl text-center">
              <p className={`text-xs font-body font-semibold text-deep-navy/40 uppercase tracking-wider ${language === 'ur' ? 'font-urdu' : ''}`}>
                {language === 'en' ? 'Mobile Mode: Gallery View' : 'موبائل موڈ: گیلری کا نظارہ'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {artifacts.map((artifact, idx) => (
                <div 
                  key={artifact._id}
                  className="group bg-white rounded-2xl border border-light-gray/60 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer active:scale-[0.98]"
                  onClick={() => handleSelectArtifact(artifact)}
                  style={{
                    animation: 'slideIn 0.4s ease-out forwards',
                    animationDelay: `${idx * 50}ms`,
                    opacity: 0
                  }}
                >
                  <div className="h-48 overflow-hidden relative bg-gradient-to-br from-light-gray to-light-gray/50">
                    <img 
                      src={artifact.images?.[0]?.url || 'https://picsum.photos/id/1015/800/600'} 
                      alt={artifact.name[language] || 'Artifact Asset'}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                  </div>
                  
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-grow">
                        <h4 className={`font-display font-bold text-lg text-rich-brown group-hover:${config.accentText} transition-colors ${language === 'ur' ? 'font-urdu' : ''}`}>
                          {artifact.name[language]}
                        </h4>
                        <p className={`text-xs text-deep-gold font-body font-semibold uppercase tracking-wider mt-1 ${language === 'ur' ? 'font-urdu' : ''}`}>
                         {artifact.historicalPeriod?.[language] || 'Unknown Period'}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(artifact._id);
                        }}
                        className="p-2 rounded-lg hover:bg-cream/50 transition-colors"
                        aria-label="Toggle Selection Favorite"
                      >
                        <Heart
                          className={`h-5 w-5 transition-all duration-300 ${
                            favorites.includes(artifact._id)
                              ? 'fill-museum-red text-museum-red'
                              : 'text-deep-navy/40'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-deep-navy/60 font-body">
                      <Eye className="h-3.5 w-3.5 text-deep-gold" />
                      <span>{viewedIds.includes(artifact._id) ? (language === 'en' ? 'Viewed' : 'دیکھا گیا') : (language === 'en' ? 'View' : 'دیکھیں')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Desktop View: Interactive Canvas & Nested Sidebar Controls */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-gradient-to-br from-rich-brown to-deep-navy h-[550px] rounded-2xl relative overflow-hidden border border-light-gray/20 shadow-[inset_0_2px_8px_rgba(0,0,0,0.1)]">
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-deep-navy/40 via-rich-brown/60 to-deep-navy/80" />
                <div className="absolute top-0 right-0 w-80 h-80 bg-deep-gold/5 rounded-full blur-3xl" />
              </div>

              <div className="relative z-20 p-6 flex items-start justify-between">
                <div className="space-y-2">
                  <div className="bg-deep-navy/60 backdrop-blur-md px-4 py-2 rounded-lg text-xs font-body uppercase tracking-widest border border-white/10">
                    <span className="text-cream/80">
                      {language === 'en' ? '3D Spatial Canvas' : '3D کینوس'}
                    </span>
                  </div>
                </div>
                <Info className="h-5 w-5 text-cream/60" />
              </div>

              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="text-center space-y-8 px-6">
                  <div className="space-y-4">
                    <p className="text-sm font-body text-cream/70 max-w-md mx-auto leading-relaxed">
                      {language === 'en'
                        ? 'Interactive 3D spatial viewport. Click artifacts below to explore and rotate models in real-time.'
                        : 'انٹرایکٹو 3D کینوس۔ نیچے نوادرات پر کلک کر کے اور حقیقی وقت میں ماڈلز کو گھمائیں۔'}
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-4">
                    {Array.isArray(artifacts) && artifacts.slice(0, 4).map((artifact, idx) => (
  <button
    key={artifact._id}
    onClick={() => handleSelectArtifact(artifact)}
    className={`group relative w-14 h-14 rounded-full border-2 border-white/30 flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 active:scale-95 ${config.accentBg}`}
    aria-label={artifact.name[language]}
    style={{
      animation: 'float 3s ease-in-out infinite',
      animationDelay: `${idx * 200}ms`
    }}
  >
    <Eye className="h-5 w-5 text-white" />
    <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-2 bg-deep-navy/90 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
      {artifact.name[language]}
    </div>
  </button>
))}
                  </div>
                </div>
              </div>

              <style>{`
                @keyframes float {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(-10px); }
                }
                @keyframes slideIn {
                  from {
                    opacity: 0;
                    transform: translateY(20px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
              `}</style>
            </div>

            {/* Selection Dynamic Desktop Sidebar Content */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-white border border-light-gray/60 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className={`text-lg font-display font-bold text-rich-brown ${language === 'ur' ? 'font-urdu' : ''}`}>
                  {language === 'en' ? 'Collection' : 'مجموعہ'}
                </h3>

                <div className="space-y-2 max-h-[450px] overflow-y-auto scroll-smooth">
                  {Array.isArray(artifacts) && artifacts.map((artifact) => {
                    const isSelected = selectedArtifact?._id === artifact._id;
                    return (
                      <button
                        key={artifact._id}
                        onClick={() => handleSelectArtifact(artifact)}
                        aria-current={isSelected ? 'true' : undefined}
                        className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all duration-300 group ${
                          isSelected
                            ? `${config.accentBg} text-white border-transparent`
                            : 'bg-cream/40 text-deep-navy border-light-gray/40 hover:bg-cream hover:border-deep-gold/30'
                        }`}
                      >
                        <p className={`font-display font-bold text-sm line-clamp-1 ${language === 'ur' ? 'font-urdu' : ''}`}>
                          {artifact.name[language]}
                        </p>
                        <p className={`text-xs ${isSelected ? 'text-white/80' : 'text-deep-navy/60'} mt-0.5 line-clamp-1 ${language === 'ur' ? 'font-urdu' : 'font-body'}`}>
                          {artifact.historicalPeriod?.[language] || 'Unknown Period'}
                        </p>
                      </button>
                    );
                  })}
                </div>

                <p className={`text-xs text-deep-navy/50 text-center italic ${language === 'ur' ? 'font-urdu' : 'font-body'}`}>
                  {language === 'en' ? 'Scroll to view all' : 'سب دیکھنے کے لیے اسکرول کریں'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Slide-out Overlay/Drawer Panel for Selected Items */}
      {selectedArtifact && (
        <aside 
          className={`fixed z-50 bg-gradient-to-br from-deep-navy/95 to-rich-brown/95 backdrop-blur-xl text-white border-l-8 ${config.accent} transition-all duration-300 ease-out shadow-2xl overflow-y-auto
            ${isMobile 
              ? 'bottom-0 left-0 right-0 h-[60vh] w-full rounded-t-3xl animate-in slide-in-from-bottom-5' 
              : 'top-0 right-0 h-full w-[35%] max-w-[500px] animate-in slide-in-from-right-5'
            }`}
        >
          <div className="p-8 h-full flex flex-col justify-between relative">
            <button
              onClick={() => setSelectedArtifact(null)}
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 text-white focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              aria-label="Close panel"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="space-y-6 pt-8">
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-black/20 border border-white/10 shadow-lg">
                <img
                  src={selectedArtifact.images?.[0]?.url || 'https://picsum.photos/id/1015/800/600'}
                  alt={selectedArtifact.name[language] || 'Artifact Asset Visual View'}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-grow">
                    <h2 className={`text-3xl font-display font-bold leading-tight ${language === 'ur' ? 'font-urdu' : ''}`}>
                      {selectedArtifact.name[language]}
                    </h2>
                    <p className={`text-xs font-body font-semibold uppercase tracking-wider ${config.accentText} mt-3 ${language === 'ur' ? 'font-urdu' : ''}`}>
                      {selectedArtifact.historicalPeriod?.[language] || 'Unknown Period'}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleFavorite(selectedArtifact._id)}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 flex-shrink-0"
                    aria-label="Favorite this artifact"
                  >
                    <Heart
                      className={`h-6 w-6 transition-all duration-300 ${
                        favorites.includes(selectedArtifact._id) ? 'fill-current text-museum-red' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>

              <p className={`text-base leading-relaxed text-cream/90 ${language === 'ur' ? 'font-urdu text-right text-lg' : 'font-body'}`} dir={language === 'ur' ? 'rtl' : 'ltr'}>
                {selectedArtifact.description[language]}
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 text-sm font-body font-semibold">
                  <Share2 className="h-4 w-4" />
                  {language === 'en' ? 'Share' : 'شیئر کریں'}
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 text-sm font-body font-semibold">
                  <Volume2 className="h-4 w-4" />
                  {language === 'en' ? 'Audio' : 'آڈیو'}
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3">
              <button
                onClick={() => setSelectedArtifact(null)}
                className="w-full bg-gradient-to-r from-deep-gold to-gold-accent text-rich-brown font-body font-bold py-4 rounded-lg hover:shadow-2xl transition-all duration-300 min-h-[56px] focus-visible:outline-2 focus-visible:outline-white"
              >
                {language === 'en' ? 'Close Panel' : 'پینل بند کریں'}
              </button>
              <button className="w-full px-4 py-4 bg-white/5 hover:bg-white/10 rounded-lg text-white font-body font-semibold transition-all duration-300 min-h-[56px] border border-white/10">
                {language === 'en' ? 'View in 3D' : '3D میں دیکھیں'}
              </button>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
};