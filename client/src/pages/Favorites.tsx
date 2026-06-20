import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { UI_STRINGS } from '../context/translation';
import { Heart, Filter, Grid3x3, List, ArrowRight } from 'lucide-react';

interface FavoriteArtifact {
  id: string;
  name: { en: string; ur: string };
  museum: string;
  period: { en: string; ur: string };
  image: string;
  accent: string;
}

export const Favorites: React.FC = () => {
  const { language } = useLanguage();
  const t = UI_STRINGS[language];
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const dir = language === 'ur' ? 'rtl' : 'ltr';

  const mockFavorites: FavoriteArtifact[] = [
    {
      id: '1',
      name: { en: 'Mughal Mirror', ur: 'مغل آئینہ' },
      museum: 'Lahore Museum',
      period: { en: '16th Century', ur: '16 ویں صدی' },
      image: 'https://images.unsplash.com/photo-1578975494235-a0f2b5e6f6fa?auto=format&fit=crop&w=500&q=80',
      accent: 'bg-[#FF7F00]',
    },
    {
      id: '2',
      name: { en: 'Buddhist Statue', ur: 'بدھ مت کا مجسمہ' },
      museum: 'Taxila Museum',
      period: { en: '2nd Century', ur: '2 ویں صدی' },
      image: 'https://images.unsplash.com/photo-1578926078328-123456789012?auto=format&fit=crop&w=500&q=80',
      accent: 'bg-[#D4AF37]',
    },
    {
      id: '3',
      name: { en: 'Indus Seal', ur: 'سندھ کی مہر' },
      museum: 'Mohenjo-daro',
      period: { en: '2300 BCE', ur: '2300 قبل از مسیح' },
      image: 'https://images.unsplash.com/photo-1578975494235-a0f2b5e6f6fa?auto=format&fit=crop&w=500&q=80',
      accent: 'bg-[#8B7355]',
    },
  ];

  const filters = [
    { id: 'all', label: language === 'en' ? 'All Museums' : 'تمام میوزیمز' },
    { id: 'lahore', label: 'Lahore' },
    { id: 'taxila', label: 'Taxila' },
    { id: 'mohenjo', label: language === 'en' ? 'Mohenjo-daro' : 'موہنجوڈاڑو' },
  ];

  const filteredItems = selectedFilter === 'all' 
    ? mockFavorites 
    : mockFavorites.filter(item => item.museum.toLowerCase().includes(selectedFilter));

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
                  ? `You have ${mockFavorites.length} artifacts in your collection`
                  : `آپ کے مجموعہ میں ${mockFavorites.length} نوادرات ہیں`}
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
                  {mockFavorites.length}
                </p>
                <p className={`text-sm text-deep-navy/70 ${language === 'ur' ? 'font-urdu' : 'font-body'}`}>
                  {language === 'en' ? 'Total Items' : 'کل اشیاء'}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-4xl font-display font-bold text-deep-gold">3</p>
                <p className={`text-sm text-deep-navy/70 ${language === 'ur' ? 'font-urdu' : 'font-body'}`}>
                  {language === 'en' ? 'Museums' : 'میوزیمز'}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-4xl font-display font-bold text-pk-green">
                  {Math.floor(Math.random() * 100)}%
                </p>
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
          <button
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-body font-semibold text-sm transition-all duration-300 focus-visible:outline-2 focus-visible:outline-deep-gold focus-visible:outline-offset-2 min-h-[44px]`}
          >
            <Filter className="h-4 w-4" />
            <span>{language === 'en' ? 'Filter' : 'فلٹر'}</span>
          </button>
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2.5 rounded-lg font-body font-semibold text-sm transition-all duration-300 min-h-[44px] focus-visible:outline-2 focus-visible:outline-deep-gold focus-visible:outline-offset-2 ${
                selectedFilter === filter.id
                  ? 'bg-deep-gold text-rich-brown shadow-lg'
                  : 'bg-cream border border-light-gray/60 text-deep-navy hover:border-deep-gold/40 hover:bg-cream/60'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* View Mode Toggle */}
        <div className="flex gap-2 bg-cream rounded-lg p-1 border border-light-gray/60">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2.5 rounded-md transition-all duration-300 ${
              viewMode === 'grid'
                ? 'bg-white text-deep-gold shadow-sm'
                : 'text-deep-navy/60 hover:text-deep-navy'
            }`}
            aria-label="Grid view"
          >
            <Grid3x3 className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2.5 rounded-md transition-all duration-300 ${
              viewMode === 'list'
                ? 'bg-white text-deep-gold shadow-sm'
                : 'text-deep-navy/60 hover:text-deep-navy'
            }`}
            aria-label="List view"
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      {filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="relative">
            <div className="absolute inset-0 bg-deep-gold/10 rounded-full blur-2xl" />
            <div className="relative bg-cream rounded-full p-8">
              <Heart className="h-12 w-12 text-deep-gold/40" />
            </div>
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
          {filteredItems.map((artifact, index) => (
            <div
              key={artifact.id}
              className="group overflow-hidden rounded-2xl border border-light-gray/60 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-all duration-300 hover:border-deep-gold/40 cursor-pointer"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-light-gray to-light-gray/50">
                <img
                  src={artifact.image}
                  alt={artifact.name[language]}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                
                {/* Badge */}
                <div className={`absolute top-4 right-4 ${artifact.accent} text-white px-3 py-1.5 rounded-lg text-xs font-body font-semibold shadow-lg`}>
                  <Heart className="h-3 w-3 fill-current inline mr-1" />
                  {language === 'en' ? 'Saved' : 'محفوظ'}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <p className={`text-xs font-body font-semibold text-deep-gold uppercase tracking-wider ${language === 'ur' ? 'font-urdu' : ''}`}>
                    {artifact.museum}
                  </p>
                  <h3 className={`text-lg font-display font-bold text-rich-brown group-hover:text-deep-gold transition-colors ${language === 'ur' ? 'font-urdu' : ''}`}>
                    {artifact.name[language]}
                  </h3>
                  <p className={`text-sm text-deep-navy/70 ${language === 'ur' ? 'font-urdu' : 'font-body'}`}>
                    {artifact.period[language]}
                  </p>
                </div>

                {/* Action Button */}
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-deep-gold/10 to-gold-accent/10 border border-deep-gold/30 rounded-lg text-deep-gold font-body font-semibold text-sm hover:from-deep-gold/20 hover:to-gold-accent/20 hover:border-deep-gold/60 transition-all duration-300 group/btn">
                  {language === 'en' ? 'View Details' : 'تفصیلات دیکھیں'}
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3 animate-in fade-in duration-500">
          {filteredItems.map((artifact, index) => (
            <div
              key={artifact.id}
              className="group flex flex-col md:flex-row gap-6 p-6 bg-white border border-light-gray/60 rounded-2xl hover:border-deep-gold/40 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Image */}
              <div className="relative w-full md:w-40 h-40 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-light-gray to-light-gray/50">
                <img
                  src={artifact.image}
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
                        {artifact.museum}
                      </p>
                      <h3 className={`text-xl font-display font-bold text-rich-brown group-hover:text-deep-gold transition-colors ${language === 'ur' ? 'font-urdu' : ''}`}>
                        {artifact.name[language]}
                      </h3>
                      <p className={`text-sm text-deep-navy/70 ${language === 'ur' ? 'font-urdu' : 'font-body'}`}>
                        {artifact.period[language]}
                      </p>
                    </div>
                    <div className={`${artifact.accent} text-white px-4 py-2 rounded-lg flex-shrink-0`}>
                      <Heart className="h-5 w-5 fill-current" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-light-gray/40">
                  <p className={`text-xs text-deep-navy/50 ${language === 'ur' ? 'font-urdu' : 'font-body'}`}>
                    {language === 'en' ? 'Last viewed 2 days ago' : '2 دن پہلے آخری بار دیکھا گیا'}
                  </p>
                  <button className="flex items-center gap-2 text-deep-gold font-body font-semibold text-sm hover:gap-3 transition-all duration-300">
                    {language === 'en' ? 'Explore' : 'تلاش'}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-light-gray/40">
        <div className="bg-white border border-light-gray/60 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
          <p className={`text-sm font-body font-semibold text-deep-gold uppercase tracking-wider mb-3 ${language === 'ur' ? 'font-urdu' : ''}`}>
            {language === 'en' ? 'Collection' : 'مجموعہ'}
          </p>
          <p className="text-3xl font-display font-bold text-rich-brown">
            {mockFavorites.length}
          </p>
          <p className={`text-xs text-deep-navy/60 mt-2 ${language === 'ur' ? 'font-urdu' : 'font-body'}`}>
            {language === 'en' ? 'artifacts saved' : 'نوادرات محفوظ'}
          </p>
        </div>

        <div className="bg-white border border-light-gray/60 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
          <p className={`text-sm font-body font-semibold text-deep-gold uppercase tracking-wider mb-3 ${language === 'ur' ? 'font-urdu' : ''}`}>
            {language === 'en' ? 'Time Spent' : 'وقت صرف کیا گیا'}
          </p>
          <p className="text-3xl font-display font-bold text-rich-brown">4h 32m</p>
          <p className={`text-xs text-deep-navy/60 mt-2 ${language === 'ur' ? 'font-urdu' : 'font-body'}`}>
            {language === 'en' ? 'exploring' : 'تلاش کرتے ہوئے'}
          </p>
        </div>

        <div className="bg-white border border-light-gray/60 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
          <p className={`text-sm font-body font-semibold text-deep-gold uppercase tracking-wider mb-3 ${language === 'ur' ? 'font-urdu' : ''}`}>
            {language === 'en' ? 'Museums Visited' : 'دیکھے گئے میوزیمز'}
          </p>
          <p className="text-3xl font-display font-bold text-rich-brown">3</p>
          <p className={`text-xs text-deep-navy/60 mt-2 ${language === 'ur' ? 'font-urdu' : 'font-body'}`}>
            {language === 'en' ? 'of 4 total' : '4 میں سے'}
          </p>
        </div>
      </div>
    </div>
  );
};