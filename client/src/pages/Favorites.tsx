// src/pages/Favorites.tsx - UPDATED WITH REAL DATA

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { UI_STRINGS } from '../context/translation';
import { api } from '../services/api';
import type { Artifact } from '../services/api';
import { Heart, Filter, Grid3x3, List, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export const Favorites: React.FC = () => {
  const { language } = useLanguage();
  const t = UI_STRINGS[language];
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const dir = language === 'ur' ? 'rtl' : 'ltr';

  // NEW: Real data from backend
  const [favoriteArtifacts, setFavoriteArtifacts] = useState<Artifact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filters = [
    { id: 'all', label: language === 'en' ? 'All Museums' : 'تمام میوزیمز' },
    { id: 'lahore', label: 'Lahore' },
    { id: 'taxila', label: 'Taxila' },
    { id: 'national_karachi', label: language === 'en' ? 'National Museum' : 'قومی میوزیم' },
    { id: 'mohenjo_daro', label: language === 'en' ? 'Mohenjo-daro' : 'موہنجوڑاں' },
  ];

  // NEW: Load favorites on mount
  useEffect(() => {
    loadFavorites();
  }, [language]);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      setError(null);
      const artifacts = await api.getUserFavoritesWithDetails();
      setFavoriteArtifacts(artifacts);
    } catch (err) {
      console.error('Failed to load favorites:', err);
      setError(
        language === 'en'
          ? 'Failed to load your favorites'
          : 'آپ کی پسندیدہ چیزیں لوڈ کرنے میں ناکام'
      );
      toast.error(
        language === 'en'
          ? 'Failed to load favorites'
          : 'پسندیدہ لوڈ کرنے میں ناکام'
      );
    } finally {
      setLoading(false);
    }
  };

  // Filter artifacts based on selected museum
  const filteredItems = selectedFilter === 'all'
    ? favoriteArtifacts
    : favoriteArtifacts.filter(item => 
        item.museumCode === selectedFilter || 
        item.museumCode?.toLowerCase().includes(selectedFilter.toLowerCase())
      );

  // Get museum color mapping
  const MUSEUM_COLORS: Record<string, string> = {
    lahore: 'bg-[#FF7F00]',
    taxila: 'bg-[#1E3A8A]',
    national_karachi: 'bg-[#D4AF37]',
    mohenjo_daro: 'bg-[#8B7355]',
  };

  const getMappedValue = (key: string | undefined): string => {
    const mappings: Record<string, string> = {
      lahore: 'lahore',
      'lahore museum': 'lahore',
      taxila: 'taxila',
      'taxila museum': 'taxila',
      'national_karachi': 'national_karachi',
      'national museum': 'national_karachi',
      'mohenjo_daro': 'mohenjo_daro',
      'mohenjo-daro': 'mohenjo_daro',
    };
    return mappings[key?.toLowerCase() || ''] || 'lahore';
  };

  // Calculate stats
  const stats = {
    total: favoriteArtifacts.length,
    museums: new Set(favoriteArtifacts.map(a => a.museumCode)).size,
    explored: Math.round((favoriteArtifacts.length / 100) * 100),
  };

  return (
    <div className="space-y-8" dir={dir}>
      {/* Header Section */}
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-deep-gold/20 rounded-xl blur-lg" />
              <div className="relative bg-gradient-to-br from-deep-gold to-gold-accent rounded-xl p-3 shadow-lg">
                <Heart className="h-6 w-6 text-rich-brown fill-current" />
              </div>
            </div>
            <div>
              <h1 className={`text-4xl md:text-5xl font-display font-bold text-rich-brown ${language === 'ur' ? 'font-urdu' : ''}`}>
                {language === 'en' ? 'Saved Artifacts' : 'محفوظ کردہ نوادرات'}
              </h1>
              <p className={`text-sm text-deep-navy/60 mt-2 ${language === 'ur' ? 'font-urdu' : 'font-body'}`}>
                {language === 'en'
                  ? `You have ${stats.total} artifacts in your collection`
                  : `آپ کے مجموعہ میں ${stats.total} نوادرات ہیں`}
              </p>
            </div>
          </div>
        </div>

        {/* Hero Card */}
        <div className="bg-gradient-to-br from-deep-navy/5 to-pk-green/5 border border-deep-gold/20 rounded-2xl p-8 backdrop-blur-sm">
          <div className="space-y-4">
            <p className={`text-sm font-body font-semibold text-deep-gold uppercase tracking-wider ${language === 'ur' ? 'font-urdu' : ''}`}>
              {language === 'en' ? 'Your Collection' : 'آپ کا مجموعہ'}
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <p className="text-4xl font-display font-bold text-rich-brown">
                  {stats.total}
                </p>
                <p className={`text-sm text-deep-navy/70 ${language === 'ur' ? 'font-urdu' : 'font-body'}`}>
                  {language === 'en' ? 'Total Items' : 'کل اشیاء'}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-4xl font-display font-bold text-deep-gold">{stats.museums}</p>
                <p className={`text-sm text-deep-navy/70 ${language === 'ur' ? 'font-urdu' : 'font-body'}`}>
                  {language === 'en' ? 'Museums' : 'میوزیمز'}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-4xl font-display font-bold text-pk-green">{stats.explored}%</p>
                <p className={`text-sm text-deep-navy/70 ${language === 'ur' ? 'font-urdu' : 'font-body'}`}>
                  {language === 'en' ? 'Explored' : 'دریافت کیا گیا'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and View Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-light-gray/40">
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2 rounded-lg font-body font-semibold text-sm transition-all duration-300 ${
                selectedFilter === filter.id
                  ? 'bg-deep-gold text-white shadow-lg'
                  : 'bg-light-gray/30 text-deep-navy hover:bg-light-gray/50'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 bg-light-gray/30 rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded transition-all duration-300 ${
              viewMode === 'grid'
                ? 'bg-white text-deep-navy shadow-md'
                : 'text-deep-navy/60 hover:text-deep-navy'
            }`}
            aria-label="Grid view"
          >
            <Grid3x3 className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded transition-all duration-300 ${
              viewMode === 'list'
                ? 'bg-white text-deep-navy shadow-md'
                : 'text-deep-navy/60 hover:text-deep-navy'
            }`}
            aria-label="List view"
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-6">
          <div className="relative">
            <div className="absolute inset-0 bg-deep-gold/20 rounded-full blur-lg animate-pulse" />
            <Loader2 className="relative h-12 w-12 animate-spin text-deep-gold" />
          </div>
          <p className={`text-lg font-display font-bold text-deep-navy ${language === 'ur' ? 'font-urdu' : ''}`}>
            {language === 'en' ? 'Loading your favorites...' : 'آپ کی پسندیدہ چیزیں لوڈ ہو رہی ہیں...'}
          </p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <div className="text-center space-y-2">
            <p className={`text-lg font-display font-bold text-red-600 ${language === 'ur' ? 'font-urdu' : ''}`}>
              {language === 'en' ? 'Error Loading Favorites' : 'پسندیدہ لوڈ کرنے میں خرابی'}
            </p>
            <p className={`text-sm text-deep-navy/60 ${language === 'ur' ? 'font-urdu' : 'font-body'}`}>
              {error}
            </p>
          </div>
          <button
            onClick={() => loadFavorites()}
            className="px-6 py-3 bg-deep-navy text-white font-body font-semibold rounded-lg hover:bg-deep-navy/90"
          >
            {language === 'en' ? 'Retry' : 'دوبارہ کوشش'}
          </button>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-light-gray rounded-full">
            <Heart className="h-8 w-8 text-deep-navy/30" />
          </div>
          <div className="text-center space-y-2">
            <p className={`text-lg font-display font-bold text-deep-navy ${language === 'ur' ? 'font-urdu' : ''}`}>
              {language === 'en' ? 'No Artifacts Found' : 'کوئی نوادرات نہیں ملے'}
            </p>
            <p className={`text-sm text-deep-navy/60 max-w-sm ${language === 'ur' ? 'font-urdu' : 'font-body'}`}>
              {language === 'en'
                ? 'Start exploring museums to save your favorite artifacts.'
                : 'اپنی پسندیدہ نوادرات کو محفوظ کرنے کے لیے میوزیمز کی تلاش شروع کریں۔'}
            </p>
          </div>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
          {filteredItems.map((artifact, index) => {
            const museumColor = MUSEUM_COLORS[getMappedValue(artifact.museumCode)] || MUSEUM_COLORS.lahore;
            return (
              <div
                key={artifact._id}
                className="group overflow-hidden rounded-2xl border border-light-gray/60 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-all duration-300 hover:border-deep-gold/40 cursor-pointer"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-light-gray to-light-gray/50">
                  <img
                    src={artifact.images?.[0]?.url || 'https://picsum.photos/id/1015/800/600'}
                    alt={artifact.name[language]}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />

                  {/* Badge */}
                  <div className={`absolute top-4 right-4 ${museumColor} text-white px-3 py-1.5 rounded-lg text-xs font-body font-semibold shadow-lg`}>
                    <Heart className="h-3 w-3 fill-current inline mr-1" />
                    {language === 'en' ? 'Saved' : 'محفوظ'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <p className={`text-xs font-body font-semibold text-deep-gold uppercase tracking-wider ${language === 'ur' ? 'font-urdu' : ''}`}>
                      {artifact.museumCode?.replace(/_/g, ' ').toUpperCase() || 'Museum'}
                    </p>
                    <h3 className={`text-lg font-display font-bold text-rich-brown group-hover:text-deep-gold transition-colors ${language === 'ur' ? 'font-urdu' : ''}`}>
                      {artifact.name[language]}
                    </h3>
                    <p className={`text-sm text-deep-navy/70 ${language === 'ur' ? 'font-urdu' : 'font-body'}`}>
                      {artifact.historicalPeriod?.[language] || 'Unknown Period'}
                    </p>
                  </div>

                  {/* Action Button */}
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-deep-gold/10 to-gold-accent/10 border border-deep-gold/30 rounded-lg text-deep-gold font-body font-semibold text-sm hover:from-deep-gold/20 hover:to-gold-accent/20 hover:border-deep-gold/60 transition-all duration-300 group/btn">
                    {language === 'en' ? 'View Details' : 'تفصیلات دیکھیں'}
                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-3 animate-in fade-in duration-500">
          {filteredItems.map((artifact, index) => {
            const museumColor = MUSEUM_COLORS[getMappedValue(artifact.museumCode)] || MUSEUM_COLORS.lahore;
            return (
              <div
                key={artifact._id}
                className="group flex flex-col md:flex-row gap-6 p-6 bg-white border border-light-gray/60 rounded-2xl hover:border-deep-gold/40 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Image */}
                <div className="relative w-full md:w-40 h-40 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-light-gray to-light-gray/50">
                  <img
                    src={artifact.images?.[0]?.url || 'https://picsum.photos/id/1015/800/600'}
                    alt={artifact.name[language]}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                </div>

                {/* Content */}
                <div className="flex-grow flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1.5">
                        <p className={`text-xs font-body font-semibold text-deep-gold uppercase tracking-wider ${language === 'ur' ? 'font-urdu' : ''}`}>
                          {artifact.museumCode?.replace(/_/g, ' ').toUpperCase() || 'Museum'}
                        </p>
                        <h3 className={`text-xl font-display font-bold text-rich-brown group-hover:text-deep-gold transition-colors ${language === 'ur' ? 'font-urdu' : ''}`}>
                          {artifact.name[language]}
                        </h3>
                        <p className={`text-sm text-deep-navy/70 ${language === 'ur' ? 'font-urdu' : 'font-body'}`}>
                          {artifact.historicalPeriod?.[language] || 'Unknown Period'}
                        </p>
                      </div>
                      <div className={`${museumColor} text-white px-4 py-2 rounded-lg flex-shrink-0`}>
                        <Heart className="h-5 w-5 fill-current" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-light-gray/40">
                    <p className={`text-xs text-deep-navy/50 ${language === 'ur' ? 'font-urdu' : 'font-body'}`}>
                      {language === 'en' ? 'Saved artifact' : 'محفوظ نوادرات'}
                    </p>
                    <button className="flex items-center gap-2 text-deep-gold font-body font-semibold text-sm hover:gap-3 transition-all duration-300">
                      {language === 'en' ? 'Explore' : 'تلاش'}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-light-gray/40">
        <div className="bg-white border border-light-gray/60 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
          <p className={`text-sm font-body font-semibold text-deep-gold uppercase tracking-wider mb-3 ${language === 'ur' ? 'font-urdu' : ''}`}>
            {language === 'en' ? 'Collection' : 'مجموعہ'}
          </p>
          <p className="text-3xl font-display font-bold text-rich-brown">
            {stats.total}
          </p>
          <p className={`text-xs text-deep-navy/60 mt-2 ${language === 'ur' ? 'font-urdu' : 'font-body'}`}>
            {language === 'en' ? 'artifacts saved' : 'نوادرات محفوظ'}
          </p>
        </div>

        <div className="bg-white border border-light-gray/60 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
          <p className={`text-sm font-body font-semibold text-deep-gold uppercase tracking-wider mb-3 ${language === 'ur' ? 'font-urdu' : ''}`}>
            {language === 'en' ? 'Museums' : 'میوزیمز'}
          </p>
          <p className="text-3xl font-display font-bold text-rich-brown">{stats.museums}</p>
          <p className={`text-xs text-deep-navy/60 mt-2 ${language === 'ur' ? 'font-urdu' : 'font-body'}`}>
            {language === 'en' ? 'of 4 total' : '4 میں سے'}
          </p>
        </div>

        <div className="bg-white border border-light-gray/60 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
          <p className={`text-sm font-body font-semibold text-deep-gold uppercase tracking-wider mb-3 ${language === 'ur' ? 'font-urdu' : ''}`}>
            {language === 'en' ? 'Last Updated' : 'آخری اپڈیٹ'}
          </p>
          <p className="text-3xl font-display font-bold text-rich-brown">—</p>
          <p className={`text-xs text-deep-navy/60 mt-2 ${language === 'ur' ? 'font-urdu' : 'font-body'}`}>
            {language === 'en' ? 'today' : 'آج'}
          </p>
        </div>
      </div>
    </div>
  );
};