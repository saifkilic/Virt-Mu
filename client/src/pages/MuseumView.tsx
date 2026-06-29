// src/pages/MuseumView.tsx - UPDATED VERSION WITH MINIMALIST CLEAN PANEL DESIGN

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import type { Artifact } from '../services/api';
import { CommentsList } from '../components/Commentslist';
import { CommentForm } from '../components/Commentform';
import { ArrowLeft, X, Eye, Loader2, Heart, Info, ZoomIn } from 'lucide-react';
import toast from 'react-hot-toast';

// ======================
// MUSEUM CONFIGURATION
// ======================

export const VALID_IDS = ['lahore', 'taxila', 'national_karachi', 'mohenjo_daro'];

export const MUSEUM_CONFIG: Record<string, {
  name: { en: string; ur: string };
  accent: string;
  accentText: string;
  background: string;
}> = {
  lahore: {
    name: { en: 'Lahore Museum', ur: 'لاہور میوزیم' },
    accent: 'border-orange-500',
    accentText: 'text-orange-500',
    background: 'from-orange-50 to-amber-50',
  },
  taxila: {
    name: { en: 'Taxila Museum', ur: 'ٹیکسلا میوزیم' },
    accent: 'border-blue-800',
    accentText: 'text-blue-800',
    background: 'from-blue-50 to-indigo-50',
  },
  national_karachi: {
    name: { en: 'National Museum of Pakistan', ur: 'قومی میوزیم پاکستان' },
    accent: 'border-yellow-600',
    accentText: 'text-yellow-600',
    background: 'from-yellow-50 to-amber-50',
  },
  mohenjo_daro: {
    name: { en: 'Mohenjo-daro Museum', ur: 'موہنجوڑاں میوزیم' },
    accent: 'border-amber-900',
    accentText: 'text-amber-900',
    background: 'from-amber-50 to-yellow-50',
  },
};

// ======================
// COMPONENT
// ======================

export const MuseumView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);
  const [viewedIds, setViewedIds] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  
  // NEW: Real favorites from backend
  const [favorites, setFavorites] = useState<string[]>([]);
  const [togglegingFavorite, setTogglingFavorite] = useState(false);
  
  // NEW: Comments UI state
  const [showComments, setShowComments] = useState(false);

  // NEW: Image viewer state
  const [showImageViewer, setShowImageViewer] = useState(false);
  
  const dir = language === 'ur' ? 'rtl' : 'ltr';
  const config = MUSEUM_CONFIG[id as string] || MUSEUM_CONFIG.lahore;

  // Resize Listener Optimization
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load artifacts
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
        toast.error(language === 'en' ? 'Failed to load artifacts' : 'نوادرات لوڈ کرنے میں ناکام');
      } finally {
        setLoading(false);
      }
    };

    loadArtifacts();
  }, [id, language]);

  // NEW: Load user favorites on mount
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favoriteIds = await api.getUserFavorites();
        setFavorites(favoriteIds);
      } catch (err) {
        // Don't show error toast - this is secondary data
      }
    };

    loadFavorites();
  }, []);

  const handleSelectArtifact = (artifact: Artifact) => {
    setSelectedArtifact(artifact);
    setShowImageViewer(false); // Reset image viewer when selecting new artifact
    if (!viewedIds.includes(artifact._id)) {
      setViewedIds((prev) => [...prev, artifact._id]);
    }
  };

  // NEW: Updated toggleFavorite with API integration
  const toggleFavorite = async (artifactId: string) => {
    try {
      setTogglingFavorite(true);
      const response = await api.toggleFavorite(artifactId);
      
      // Update local state
      if (response.isFavorited) {
        setFavorites((prev) => [...prev, artifactId]);
        toast.success(
          language === 'en' 
            ? 'Added to favorites' 
            : 'پسندیدہ میں شامل کیا گیا'
        );
      } else {
        setFavorites((prev) => prev.filter((id) => id !== artifactId));
        toast.success(
          language === 'en' 
            ? 'Removed from favorites' 
            : 'پسندیدہ سے ہٹایا گیا'
        );
      }
    } catch (err) {
      toast.error(
        language === 'en' 
          ? 'Failed to update favorite' 
          : 'پسندیدہ اپڈیٹ کرنے میں ناکام'
      );
    } finally {
      setTogglingFavorite(false);
    }
  };

  // Guard Rails for Route Parameters
  if (!id || !VALID_IDS.includes(id)) {
    return (
      <div className="text-center py-20 space-y-6">
        <p className="text-deep-navy/60 text-lg">
          {language === 'en' ? 'Museum not found.' : 'میوزیم نہیں ملا۔'}
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-deep-gold text-white rounded-lg font-body font-bold hover:bg-deep-gold/90 transition-colors"
        >
          {language === 'en' ? 'Go Home' : 'گھر جائیں'}
        </button>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${config.background} transition-all duration-300 flex flex-col relative`} dir={dir}>
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-light-gray/40 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-lg hover:bg-light-gray/60 transition-colors text-deep-navy"
            aria-label="Go back"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>

          <div className="flex-1 text-center px-4">
            <h1 className={`text-2xl font-display font-bold text-deep-navy ${language === 'ur' ? 'font-urdu' : ''}`}>
              {config.name[language]}
            </h1>
          </div>

          <div className="w-10" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex flex-col md:flex-row relative max-w-7xl mx-auto w-full">
        {/* Artifacts Gallery - Left Side (Desktop) / Full Width (Mobile) */}
        <div className={`flex-1 overflow-y-auto p-6 space-y-4 ${isMobile ? 'w-full' : 'flex-1'}`}>
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <Loader2 className="h-8 w-8 animate-spin text-deep-gold" />
            </div>
          ) : error ? (
            <div className="text-center py-16 space-y-4">
              <p className="text-deep-navy/60 text-lg">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-deep-gold text-white rounded-lg font-body font-bold hover:bg-deep-gold/90 transition-colors"
              >
                {language === 'en' ? 'Retry' : 'دوبارہ کوشش'}
              </button>
            </div>
          ) : artifacts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-deep-navy/60 text-lg">
                {language === 'en' ? 'No artifacts found.' : 'کوئی نوادرات نہیں ملے۔'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {artifacts.map((artifact) => (
                <button
                  key={artifact._id}
                  onClick={() => handleSelectArtifact(artifact)}
                  className={`relative aspect-square rounded-xl overflow-hidden group transition-all duration-300 border-2 ${
                    selectedArtifact?._id === artifact._id
                      ? `${config.accent} shadow-lg scale-105`
                      : 'border-light-gray/40 hover:border-deep-gold/60'
                  }`}
                >
                  {/* Image */}
                  <img
                    src={artifact.images?.[0]?.url || 'https://picsum.photos/id/1015/800/600'}
                    alt={artifact.name[language]}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <Eye className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Viewed Badge */}
                  {viewedIds.includes(artifact._id) && (
                    <div className="absolute top-2 right-2 bg-deep-gold/90 rounded-full p-1">
                      <Info className="h-3 w-3 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Image Viewer Modal - Fullscreen */}
        {showImageViewer && selectedArtifact && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
            <button
              onClick={() => setShowImageViewer(false)}
              className="absolute top-6 right-6 z-50 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
              aria-label="Close image viewer"
            >
              <X className="h-6 w-6" />
            </button>
          
            <div className="w-full h-full flex items-center justify-center max-w-5xl max-h-[90vh]">
              <img
                src={selectedArtifact.images?.[0]?.url || 'https://picsum.photos/id/1015/800/600'}
                alt={selectedArtifact.name[language]}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}

        {/* Slide-out Detail Panel - MINIMALIST CLEAN DESIGN */}
        {selectedArtifact && (
          <aside 
            className={`fixed z-50 bg-white text-deep-navy transition-all duration-300 ease-out shadow-2xl overflow-hidden
              ${isMobile 
                ? 'bottom-0 left-0 right-0 h-[95vh] w-full rounded-t-3xl animate-in slide-in-from-bottom-5' 
                : 'top-0 right-0 h-full w-[55%] max-w-[700px] animate-in slide-in-from-right-5'
              }`}
          >
            <div className="h-full flex flex-col relative">
              {/* Header Bar with Close Button */}
              <div className={`flex-shrink-0 px-6 py-4 flex items-center justify-between border-b border-light-gray/40 bg-white`}>
                <span className={`text-xs font-body font-semibold uppercase tracking-widest ${config.accentText}`}>
                  {language === 'en' ? 'Artifact Details' : 'نوادرات کی تفصیلات'}
                </span>
                <button
                  onClick={() => setSelectedArtifact(null)}
                  className="p-2 rounded-lg hover:bg-light-gray/50 transition-all duration-300 text-deep-navy/60 hover:text-deep-navy focus-visible:outline-2 focus-visible:outline-deep-gold focus-visible:outline-offset-2"
                  aria-label="Close panel"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto flex-grow">
                {/* Hero Image Section */}
                <div className="px-6 pt-8">
                  <div className="relative rounded-2xl overflow-hidden bg-light-gray/60 aspect-[4/3] shadow-md mb-6 group">
                    <img
                      src={selectedArtifact.images?.[0]?.url || 'https://picsum.photos/id/1015/800/600'}
                      alt={selectedArtifact.name[language] || 'Artifact'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={() => setShowImageViewer(true)}
                      className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/20 transition-colors duration-300 opacity-0 hover:opacity-100 group-hover:opacity-100"
                      aria-label="View full image"
                    >
                      <div className="p-3 rounded-full bg-white/90 text-deep-navy">
                        <ZoomIn className="h-5 w-5" />
                      </div>
                    </button>
                  </div>
                </div>

                {/* Title & Metadata Section */}
                <div className="px-6 space-y-4">
                  <div className="space-y-2">
                    <h2 className={`text-2xl md:text-3xl font-display font-bold text-deep-navy leading-tight ${language === 'ur' ? 'font-urdu' : ''}`}>
                      {selectedArtifact.name[language]}
                    </h2>
                    <p className={`text-sm font-body font-semibold uppercase tracking-wider ${config.accentText} ${language === 'ur' ? 'font-urdu' : ''}`}>
                      {selectedArtifact.historicalPeriod?.[language] || 'Unknown Period'}
                    </p>
                  </div>

                  {/* Favorite Button - Prominent */}
                  <button
                    onClick={() => toggleFavorite(selectedArtifact._id)}
                    disabled={togglegingFavorite}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all duration-300 disabled:opacity-50"
                    style={{
                      borderColor: favorites.includes(selectedArtifact._id) ? '#c41e3a' : '#d1d5db',
                      backgroundColor: favorites.includes(selectedArtifact._id) ? '#fef2f2' : '#f9fafb',
                    }}
                    aria-label={favorites.includes(selectedArtifact._id) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Heart
                      className={`h-5 w-5 transition-all duration-300 ${
                        favorites.includes(selectedArtifact._id) 
                          ? 'fill-museum-red text-museum-red' 
                          : 'text-deep-navy/40'
                      }`}
                    />
                    <span className={`text-sm font-body font-semibold ${
                      favorites.includes(selectedArtifact._id)
                        ? 'text-museum-red'
                        : 'text-deep-navy/60'
                    }`}>
                      {favorites.includes(selectedArtifact._id)
                        ? (language === 'en' ? 'Added to Favorites' : 'پسندیدہ میں شامل')
                        : (language === 'en' ? 'Add to Favorites' : 'پسندیدہ میں شامل کریں')}
                    </span>
                  </button>
                </div>

                {/* Description Section */}
                <div className="px-6 mt-8 pt-8 border-t border-light-gray/40">
                  <h3 className={`text-xs font-body font-bold uppercase tracking-widest text-deep-navy/50 mb-3 ${language === 'ur' ? 'font-urdu' : ''}`}>
                    {language === 'en' ? 'About This Artifact' : 'اس نوادرات کے بارے میں'}
                  </h3>
                  <p className={`text-sm leading-relaxed text-deep-navy/80 ${language === 'ur' ? 'font-urdu text-base text-right' : 'font-body'}`} dir={language === 'ur' ? 'rtl' : 'ltr'}>
                    {selectedArtifact.description[language]}
                  </p>
                </div>

                {/* Details Grid */}
                <div className="px-6 mt-8 space-y-6">
                  {selectedArtifact.material && (
                    <div className="pb-6 border-b border-light-gray/40">
                      <h3 className={`text-xs font-body font-bold uppercase tracking-widest text-deep-navy/50 mb-3 ${language === 'ur' ? 'font-urdu' : ''}`}>
                        {language === 'en' ? 'Material' : 'مواد'}
                      </h3>
                      <p className={`text-sm text-deep-navy/80 ${language === 'ur' ? 'font-urdu text-base text-right' : 'font-body'}`}>
                        {selectedArtifact.material}
                      </p>
                    </div>
                  )}

                  {selectedArtifact.dimensions && (
                    <div className="pb-6 border-b border-light-gray/40">
                      <h3 className={`text-xs font-body font-bold uppercase tracking-widest text-deep-navy/50 mb-3 ${language === 'ur' ? 'font-urdu' : ''}`}>
                        {language === 'en' ? 'Dimensions' : 'ابعادات'}
                      </h3>
                      <p className={`text-sm text-deep-navy/80 ${language === 'ur' ? 'font-urdu text-base text-right' : 'font-body'}`}>
                        {typeof selectedArtifact.dimensions === 'object' 
                          ? `${selectedArtifact.dimensions.height || '—'} x ${selectedArtifact.dimensions.width || '—'} x ${selectedArtifact.dimensions.depth || '—'} ${selectedArtifact.dimensions.unit || 'cm'}`
                          : selectedArtifact.dimensions}
                      </p>
                    </div>
                  )}
                </div>

                {/* Comments Section */}
                <div className="px-6 mt-8 pt-8 border-t border-light-gray/40 pb-8">
                  <button
                    onClick={() => setShowComments(!showComments)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-deep-navy/5 hover:bg-deep-navy/10 text-deep-navy font-body font-bold transition-all duration-300"
                  >
                    <span className={`text-deep-navy ${language === 'ur' ? 'font-urdu' : ''}`}>
                      {showComments 
                        ? (language === 'en' ? 'Hide Comments' : 'تبصرے چھپائیں')
                        : (language === 'en' ? 'View Comments' : 'تبصرے دیکھیں')}
                    </span>
                    <span className="text-sm bg-deep-navy text-white px-3 py-1 rounded-full font-bold">
                      {showComments ? '−' : '+'}
                    </span>
                  </button>

                  {showComments && (
                    <div className="mt-6 space-y-6 bg-deep-navy/3 p-6 rounded-lg border border-deep-navy/10">
                      <CommentForm 
                        artifactId={selectedArtifact._id}
                        museumCode={id as string}
                        onCommentAdded={() => {
                          // Handle comment added if needed
                        }}
                        language={language}
                      />
                      <CommentsList 
                        artifactId={selectedArtifact._id}
                        language={language}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Fixed Bottom Action */}
              <div className="flex-shrink-0 px-6 py-6 border-t border-light-gray/40 bg-white">
                <button
                  onClick={() => setSelectedArtifact(null)}
                  className={`w-full font-body font-bold py-3 rounded-lg transition-all duration-300 min-h-[48px] focus-visible:outline-2 focus-visible:outline-offset-2 ${config.accentText} border-2 ${config.accent} hover:bg-light-gray/20`}
                >
                  {language === 'en' ? 'Close' : 'بند کریں'}
                </button>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};
