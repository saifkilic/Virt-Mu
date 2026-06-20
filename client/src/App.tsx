import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Layout } from './components/Layout';
import { UI_STRINGS } from './context/translation';
import { MuseumView } from './pages/MuseumView';
import { Favorites } from './pages/Favorites';
import { Profile } from './pages/Profile';
import { ArrowRight, Sparkles } from 'lucide-react';

const MuseumDashboard: React.FC = () => {
  const { language } = useLanguage();
  const t = UI_STRINGS[language];
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const dir = language === 'ur' ? 'rtl' : 'ltr';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const museumsData = [
    {
      id: 'lahore',
      accentClass: 'bg-[#FF7F00]',
      accentBorder: 'border-[#FF7F00]/40 hover:border-[#FF7F00]/60',
      badgeBg: 'bg-[#FF7F00]',
      badgeText: 'text-white',
      badgeLabel: 'MUGHAL SPLENDOR',
      rooms: 12,
      artifacts: 100,
      description: language === 'en' 
        ? 'Explore the grandeur of Mughal architecture and art, showcasing centuries of imperial craftsmanship.'
        : 'مغل تعمیر اور فن کی شان و شوکت کی تلاش کریں، صدیوں کے شاہی کاریگری کو ظاہر کرتے ہوئے۔',
      img: 'https://images.unsplash.com/photo-1627588365992-4f3640b8f0cc?auto=format&fit=crop&w=600&q=80',
      color: '#FF7F00',
      gradient: 'from-[#FF7F00]/20 to-[#FF7F00]/5'
    },
    {
      id: 'taxila',
      accentClass: 'bg-[#1E3A8A]',
      accentBorder: 'border-[#1E3A8A]/40 hover:border-[#1E3A8A]/60',
      badgeBg: 'bg-[#1E3A8A]',
      badgeText: 'text-white',
      badgeLabel: 'UNESCO SITE',
      rooms: 15,
      artifacts: 100,
      description: language === 'en'
        ? 'UNESCO World Heritage Site displaying Buddhist sculptures and artifacts from ancient Gandhara civilization.'
        : 'یونیسکو کے عالمی ورثہ کی جگہ جو بدھ مت کے مجسموں اور قدیم گندھارا تہذیب کی نوادرات دکھاتی ہے۔',
      img: 'https://images.unsplash.com/photo-1608958416715-bc44047a063f?auto=format&fit=crop&w=600&q=80',
      color: '#1E3A8A',
      gradient: 'from-[#1E3A8A]/20 to-[#1E3A8A]/5'
    },
    {
      id: 'national',
      accentClass: 'bg-[#D4AF37]',
      accentBorder: 'border-[#D4AF37]/40 hover:border-[#D4AF37]/60',
      badgeBg: 'bg-[#D4AF37]',
      badgeText: 'text-rich-brown',
      badgeLabel: 'GLOBAL COLLECTION',
      rooms: 8,
      artifacts: 100,
      description: language === 'en'
        ? 'A comprehensive collection spanning Egyptian, Greek, and Asian civilizations with priceless antiquities.'
        : 'مصری، یونانی اور ایشیائی تہذیبوں کے دوران ایک جامع مجموعہ قیمتی قدیم اشیاء کے ساتھ۔',
      img: 'https://images.unsplash.com/photo-1599733589046-10c005739ef9?auto=format&fit=crop&w=600&q=80',
      color: '#D4AF37',
      gradient: 'from-[#D4AF37]/20 to-[#D4AF37]/5'
    },
    {
      id: 'mohenjo',
      accentClass: 'bg-[#8B7355]',
      accentBorder: 'border-[#8B7355]/40 hover:border-[#8B7355]/60',
      badgeBg: 'bg-[#8B7355]',
      badgeText: 'text-white',
      badgeLabel: '3300 BCE',
      rooms: 15,
      artifacts: 100,
      description: language === 'en'
        ? 'Ancient Indus Valley Civilization artifacts including seals, pottery, and urban planning evidence from 3300 BCE.'
        : 'قدیم سندھ وادی تہذیب کی نوادرات جن میں مہریں، برتن اور 3300 قبل از مسیح سے شہری منصوبہ بندی کے ثبوت شامل ہیں۔',
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
      color: '#8B7355',
      gradient: 'from-[#8B7355]/20 to-[#8B7355]/5'
    }
  ];

  return (
    <div className="space-y-16 md:space-y-20" dir={dir}>
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl md:rounded-[2rem] shadow-2xl">
        {/* Background with animated elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-deep-navy via-[#1B3A3A]/90 to-pk-green/80">
          <div className="absolute top-0 right-0 w-96 h-96 bg-deep-gold/20 rounded-full blur-3xl -z-0" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold-accent/10 rounded-full blur-3xl -z-0" />
          <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-pk-green/10 rounded-full blur-3xl -z-0" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-8 md:p-16 lg:p-20 space-y-6 min-h-[500px] flex flex-col justify-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-deep-gold/20 border border-deep-gold/40 rounded-full w-fit">
            <Sparkles className="h-4 w-4 text-deep-gold animate-pulse" />
            <span className={`text-xs font-body font-semibold text-deep-gold uppercase tracking-widest ${language === 'ur' ? 'font-urdu' : ''}`}>
              {language === 'en' ? 'Explore Heritage' : 'میراث کی تلاش کریں'}
            </span>
          </div>

          {/* Title */}
          <div className="space-y-4 max-w-3xl">
            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight ${language === 'ur' ? 'font-urdu' : ''}`}>
              {language === 'en' 
                ? 'Pakistani Heritage Virtual Museum'
                : 'پاکستان ورچوئل میوزیم'}
            </h1>
            <p className={`text-lg md:text-xl text-cream/90 max-w-2xl leading-relaxed ${language === 'ur' ? 'font-urdu' : 'font-body'}`}>
              {language === 'en'
                ? 'Explore ancient civilizations from Indus Valley to Mughal masterpieces through immersive 3D experiences and high-fidelity digital preservation.'
                : 'موثر 3D تجربوں اور اعلیٰ معیار کی ڈیجیٹل تحفظ کے ذریعے وادئ سندھ سے لے کر مغل شاہکاروں تک قدیم تہذیبوں کی تلاش کریں۔'}
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <button
              onClick={() => navigate(`/museum/${museumsData[0].id}`)}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-deep-gold to-gold-accent text-rich-brown font-body font-bold text-lg rounded-xl hover:shadow-2xl transition-all duration-300 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 min-h-[56px]"
            >
              {language === 'en' ? 'Start Exploring' : 'تلاش شروع کریں'}
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Section Title */}
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-gradient-to-b from-deep-gold to-gold-accent rounded-full" />
            <h2 className={`text-4xl md:text-5xl font-display font-bold text-rich-brown ${language === 'ur' ? 'font-urdu' : ''}`}>
              {language === 'en' ? 'Discover Museums' : 'میوزیمز کی تلاش کریں'}
            </h2>
          </div>
          <p className={`text-lg text-deep-navy/70 max-w-2xl ${language === 'ur' ? 'font-urdu' : 'font-body'}`}>
            {language === 'en'
              ? 'Step into four remarkable repositories of Pakistani heritage'
              : 'پاکستانی ورثے کے چار شاندار ذخیروں میں داخل ہوں'}
          </p>
        </div>
      </div>

      {/* Museums Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
        {museumsData.map((museum, index) => (
          <div
            key={museum.id}
            className={`group relative rounded-2xl overflow-hidden bg-white border transition-all duration-500 cursor-pointer ${museum.accentBorder}`}
            style={{
              animation: isScrolled ? 'none' : 'slideUp 0.6s ease-out forwards',
              animationDelay: `${index * 100}ms`,
            }}
            onMouseEnter={() => setHoveredCard(museum.id)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => navigate(`/museum/${museum.id}`)}
          >
            {/* Animated background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${museum.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-0`} />

            {/* Image Container */}
            <div className="relative h-56 overflow-hidden bg-gradient-to-br from-light-gray to-light-gray/50">
              <img
                src={museum.img}
                alt={language === 'en' ? `${museum.badgeLabel} Museum` : `${museum.badgeLabel} میوزیم`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Badge */}
              <div className={`absolute top-4 ${language === 'ur' ? 'left-4' : 'right-4'} px-4 py-2 ${museum.badgeBg} ${museum.badgeText} text-xs font-display font-bold rounded-lg shadow-lg backdrop-blur-sm bg-opacity-95 transition-all duration-300 group-hover:scale-110`}>
                {museum.badgeLabel}
              </div>

              {/* Hover Info */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="text-center space-y-3">
                  <div className={`text-5xl font-display font-bold text-white drop-shadow-lg`}>
                    {museum.rooms}
                  </div>
                  <p className="text-white/90 text-sm font-body">
                    {language === 'en' ? 'Rooms' : 'کمرے'}
                  </p>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="relative p-6 space-y-4 min-h-[220px] flex flex-col justify-between">
              {/* Title & Description */}
              <div className="space-y-3">
                <h3 className={`text-xl font-display font-bold text-rich-brown group-hover:text-${museum.id === 'national' ? 'deep-gold' : 'current'} transition-colors duration-300 line-clamp-1 ${language === 'ur' ? 'font-urdu' : ''}`}>
                  {language === 'en' ? museum.badgeLabel.split(' ')[0] === 'MUGHAL' ? 'Lahore Museum' : museum.badgeLabel.split(' ')[0] === 'UNESCO' ? 'Taxila Museum' : museum.badgeLabel.split(' ')[0] === 'GLOBAL' ? 'National Museum' : 'Mohenjo-daro' : museum.badgeLabel}
                </h3>
                <p className={`text-sm text-deep-navy/70 line-clamp-2 group-hover:line-clamp-none transition-all duration-300 ${language === 'ur' ? 'font-urdu' : 'font-body'}`}>
                  {museum.description}
                </p>
              </div>

              {/* Stats and Button */}
              <div className="space-y-4">
                {/* Stats Row */}
                <div className="flex items-center justify-between pt-4 border-t border-light-gray/40">
                  <div className="flex gap-6 text-xs text-deep-navy/60 font-body">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-deep-gold" />
                      <span>{museum.rooms} {language === 'en' ? 'rooms' : 'کمرے'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-deep-gold" />
                      <span>{museum.artifacts}+ {language === 'en' ? 'items' : 'اشیاء'}</span>
                    </div>
                  </div>
                </div>

                {/* Explore Button */}
                <button
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 ${museum.accentClass} text-white font-body font-bold text-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group/btn min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2`}
                  style={{ outlineColor: museum.color }}
                >
                  {language === 'en' ? 'Explore' : 'تلاش کریں'}
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-0.5 transition-transform duration-300" />
                </button>
              </div>
            </div>

            {/* Corner accent */}
            <div className={`absolute top-0 ${language === 'ur' ? 'left-0' : 'right-0'} w-24 h-24 bg-gradient-to-bl from-${museum.id === 'lahore' ? '[#FF7F00]' : museum.id === 'taxila' ? '[#1E3A8A]' : museum.id === 'national' ? '[#D4AF37]' : '[#8B7355]'}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-3xl -z-0` as any} />
          </div>
        ))}
      </div>

      {/* Additional Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
        {[
          {
            number: '4',
            label: language === 'en' ? 'Museums' : 'میوزیمز',
            description: language === 'en' ? 'Across Pakistan' : 'پاکستان میں'
          },
          {
            number: '400+',
            label: language === 'en' ? 'Artifacts' : 'نوادرات',
            description: language === 'en' ? 'In total' : 'کل میں'
          },
          {
            number: '3D',
            label: language === 'en' ? 'Immersive' : 'منیعکس',
            description: language === 'en' ? 'Digital Experiences' : 'ڈیجیٹل تجربے'
          }
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-br from-cream to-soft-white border border-light-gray/60 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300"
          >
            <p className="text-5xl font-display font-bold text-deep-gold mb-2">
              {stat.number}
            </p>
            <p className={`text-lg font-display font-bold text-rich-brown mb-1 ${language === 'ur' ? 'font-urdu' : ''}`}>
              {stat.label}
            </p>
            <p className={`text-sm text-deep-navy/60 ${language === 'ur' ? 'font-urdu' : 'font-body'}`}>
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      {/* CSS for animation */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<MuseumDashboard />} />
            <Route path="/museum/:id" element={<MuseumView />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;