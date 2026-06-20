import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { UI_STRINGS } from '../context/translation';
import { Compass, Globe, Heart, User, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const t = UI_STRINGS[language];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dir = language === 'ur' ? 'rtl' : 'ltr';

  return (
    <>
      <nav 
        className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-light-gray/40 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
        dir={dir}
      >
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
          <div className="flex items-center justify-between h-24">
            {/* Logo Section */}
            <NavLink 
              to="/" 
              className="group flex items-center gap-4 focus-visible:outline-2 focus-visible:outline-deep-gold focus-visible:outline-offset-2 rounded-xl px-2 py-1 transition-all duration-300"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-deep-gold/10 rounded-xl blur-lg group-hover:bg-deep-gold/20 transition-all duration-300" />
                <div className="relative bg-gradient-to-br from-deep-gold to-gold-accent rounded-xl p-2.5 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Compass className="h-6 w-6 text-rich-brown" />
                </div>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className={`text-xl md:text-2xl font-display font-bold bg-gradient-to-r from-deep-navy to-deep-navy/80 bg-clip-text text-transparent ${language === 'ur' ? 'font-urdu' : ''}`}>
                  {t.title}
                </span>
                <span className={`text-xs font-body font-semibold text-deep-gold uppercase tracking-wider ${language === 'ur' ? 'font-urdu' : ''}`}>
                  {t.subtitle}
                </span>
              </div>
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-12">
              <NavLink 
                to="/" 
                className={({ isActive }) => `relative text-sm font-body font-semibold transition-all duration-300 ${isActive ? 'text-deep-gold' : 'text-deep-navy hover:text-deep-gold'} ${language === 'ur' ? 'font-urdu text-base' : ''}`}
              >
                {language === 'en' ? 'Dashboard' : 'ڈیش بورڈ'}
                <span className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-deep-gold to-gold-accent rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 w-full" />
              </NavLink>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3 md:gap-6">
              {/* Desktop Icons */}
              <div className="hidden md:flex items-center gap-2">
                <NavLink
  to="/favorites"
  className={({ isActive }) =>
    `group relative inline-flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-300 focus-visible:outline-2 focus-visible:outline-deep-gold focus-visible:outline-offset-2 ${
      isActive
        ? 'bg-deep-gold/10 text-deep-gold'
        : 'text-deep-navy/70 hover:text-deep-gold hover:bg-cream/50'
    }`
  }
>
  {({ isActive }) => (
    <>
      <Heart
        className={`h-5 w-5 transition-all duration-300 ${
          isActive ? 'fill-current' : 'group-hover:fill-current'
        }`}
      />
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-deep-navy text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        {language === 'en' ? 'Favorites' : 'پسندیدہ'}
      </span>
    </>
  )}
</NavLink>
                
                <NavLink
                  to="/profile"
                  className={({ isActive }) => `group relative inline-flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-300 focus-visible:outline-2 focus-visible:outline-deep-gold focus-visible:outline-offset-2 ${isActive ? 'bg-deep-gold/10 text-deep-gold' : 'text-deep-navy/70 hover:text-deep-gold hover:bg-cream/50'}`}
                  aria-label="View Profile"
                >
                  <User className="h-5 w-5" />
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-deep-navy text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                    {language === 'en' ? 'Profile' : 'پروفائل'}
                  </span>
                </NavLink>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-8 bg-gradient-to-b from-light-gray/0 via-light-gray/50 to-light-gray/0" />

              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
                className="group relative inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-deep-gold/5 to-gold-accent/5 border border-deep-gold/20 rounded-lg text-sm font-body font-semibold text-deep-navy hover:border-deep-gold/60 hover:bg-gradient-to-r hover:from-deep-gold/15 hover:to-gold-accent/15 transition-all duration-300 min-h-[48px] focus-visible:outline-2 focus-visible:outline-deep-gold focus-visible:outline-offset-2 shadow-sm hover:shadow-md"
                aria-label="Toggle Language"
              >
                <Globe className="h-4 w-4 text-deep-gold group-hover:text-deep-gold transition-colors" />
                <span className={`${language === 'ur' ? 'font-body text-sm' : 'font-urdu text-sm'}`}>
                  {language === 'en' ? 'اردو' : 'EN'}
                </span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-cream transition-colors text-deep-navy focus-visible:outline-2 focus-visible:outline-deep-gold focus-visible:outline-offset-2"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden pb-6 border-t border-light-gray/40 pt-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
              <NavLink 
                to="/" 
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => `block px-4 py-3 rounded-lg font-body font-semibold transition-all duration-300 ${isActive ? 'bg-deep-gold/10 text-deep-gold' : 'text-deep-navy hover:bg-cream'}`}
              >
                {language === 'en' ? 'Dashboard' : 'ڈیش بورڈ'}
              </NavLink>
              <NavLink 
                to="/favorites" 
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => `block px-4 py-3 rounded-lg font-body font-semibold transition-all duration-300 ${isActive ? 'bg-deep-gold/10 text-deep-gold' : 'text-deep-navy hover:bg-cream'}`}
              >
                {language === 'en' ? 'Favorites' : 'پسندیدہ'}
              </NavLink>
              <NavLink 
                to="/profile" 
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => `block px-4 py-3 rounded-lg font-body font-semibold transition-all duration-300 ${isActive ? 'bg-deep-gold/10 text-deep-gold' : 'text-deep-navy hover:bg-cream'}`}
              >
                {language === 'en' ? 'Profile' : 'پروفائل'}
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};