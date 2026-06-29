import React from 'react';
import { Navbar } from './Navbar';
import { useLanguage } from '../context/LanguageContext';
import { UI_STRINGS } from '../context/translation';
import { NavLink, useLocation, Outlet } from 'react-router-dom';
import { Home, Compass, Heart, User } from 'lucide-react';

export const Layout: React.FC = () => {
  const { language } = useLanguage();
  const t = UI_STRINGS[language];
  const location = useLocation();
  const dir = language === 'ur' ? 'rtl' : 'ltr';

  const navItems = [
    { path: '/', icon: Home, label: language === 'en' ? 'Home' : 'گھر' },
    { path: '/', icon: Compass, label: language === 'en' ? 'Explore' : 'تلاش' },
    { path: '/favorites', icon: Heart, label: language === 'en' ? 'Saved' : 'محفوظ' },
    { path: '/profile', icon: User, label: language === 'en' ? 'Profile' : 'پروفائل' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-cream text-deep-navy font-body" dir={dir}>
      <Navbar />
      
      <main className="flex-grow w-full">
        <div className="max-w-[1440px] w-full mx-auto px-4 md:px-8 lg:px-16 py-8 md:py-12 pb-28 md:pb-12">
          {/* This renders the nested route content (Dashboard, Profile, etc) */}
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav 
        className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-white/95 backdrop-blur-xl border-t border-light-gray/40 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50 px-2"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-around h-full">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || 
                           (item.path === '/favorites' && location.pathname === '/favorites') ||
                           (item.path === '/profile' && location.pathname === '/profile');
            
            return (
              <NavLink 
                key={`${item.path}-${idx}`}
                to={item.path}
                className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-all duration-300 group focus-visible:outline-2 focus-visible:outline-deep-gold focus-visible:outline-offset-2 relative ${
                  isActive 
                    ? 'text-deep-gold' 
                    : 'text-deep-navy/60 hover:text-deep-gold'
                }`}
              >
                <div className={`relative transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100 group-hover:scale-110'}`}>
                  {isActive && (
                    <div className="absolute inset-0 bg-deep-gold/10 rounded-xl blur-lg" />
                  )}
                  <Icon className={`h-6 w-6 relative transition-all duration-300 ${isActive ? 'drop-shadow-lg' : ''}`} />
                </div>
                <span className={`text-xs font-body font-semibold mt-0.5 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Premium Footer */}
      <footer className="hidden md:block bg-gradient-to-r from-deep-navy/95 to-rich-brown/95 backdrop-blur-xl border-t border-deep-gold/10 text-cream mt-auto">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-deep-gold to-gold-accent rounded-lg flex items-center justify-center">
                  <Compass className="h-5 w-5 text-rich-brown" />
                </div>
                <div>
                  <h3 className={`font-display font-bold text-lg text-white ${language === 'ur' ? 'font-urdu' : ''}`}>
                    {t.title}
                  </h3>
                  <p className={`text-xs text-cream/60 uppercase tracking-widest ${language === 'ur' ? 'font-urdu' : ''}`}>
                    {t.subtitle}
                  </p>
                </div>
              </div>
              <p className={`text-sm text-cream/70 leading-relaxed ${language === 'ur' ? 'font-urdu' : ''}`}>
                {language === 'en' 
                  ? 'Preserving Pakistani heritage through immersive digital experiences.'
                  : 'موثر ڈیجیٹل تجربوں کے ذریعے پاکستانی ورثے کی حفاظت۔'}
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider">
                {language === 'en' ? 'Explore' : 'تلاش'}
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a href="/" className="text-cream/70 hover:text-deep-gold transition-colors text-sm font-body">
                    {language === 'en' ? 'Museums' : 'میوزیمز'}
                  </a>
                </li>
                <li>
                  <a href="/" className="text-cream/70 hover:text-deep-gold transition-colors text-sm font-body">
                    {language === 'en' ? 'Artifacts' : 'نوادرات'}
                  </a>
                </li>
                <li>
                  <a href="/" className="text-cream/70 hover:text-deep-gold transition-colors text-sm font-body">
                    {language === 'en' ? 'Collections' : 'مجموعے'}
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-4">
              <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider">
                {language === 'en' ? 'Resources' : 'وسائل'}
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a href="/" className="text-cream/70 hover:text-deep-gold transition-colors text-sm font-body">
                    {language === 'en' ? 'About' : 'کے بارے میں'}
                  </a>
                </li>
                <li>
                  <a href="/" className="text-cream/70 hover:text-deep-gold transition-colors text-sm font-body">
                    {language === 'en' ? 'Contact' : 'رابطہ'}
                  </a>
                </li>
                <li>
                  <a href="/" className="text-cream/70 hover:text-deep-gold transition-colors text-sm font-body">
                    {language === 'en' ? 'Support' : 'معاونت'}
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider">
                {language === 'en' ? 'Legal' : 'قانونی'}
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a href="/" className="text-cream/70 hover:text-deep-gold transition-colors text-sm font-body">
                    {language === 'en' ? 'Privacy' : 'نجی'}
                  </a>
                </li>
                <li>
                  <a href="/" className="text-cream/70 hover:text-deep-gold transition-colors text-sm font-body">
                    {language === 'en' ? 'Terms' : 'شرائط'}
                  </a>
                </li>
                <li>
                  <a href="/" className="text-cream/70 hover:text-deep-gold transition-colors text-sm font-body">
                    {language === 'en' ? 'Licenses' : 'لائسنسز'}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-deep-gold/0 via-deep-gold/20 to-deep-gold/0 mb-6" />

          {/* Copyright */}
          <div className={`flex flex-col md:flex-row items-center justify-between text-sm text-cream/50 ${language === 'ur' ? 'font-urdu' : 'font-body'}`}>
            <p>
              {language === 'en' 
                ? '© 2024 Pakistani Heritage Virtual Museum. All rights reserved.'
                : '© 2024 پاکستان ورچوئل میوزیم۔ تمام حقوق محفوظ ہیں۔'}
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="/" className="hover:text-deep-gold transition-colors">
                {language === 'en' ? 'Twitter' : 'ٹویٹر'}
              </a>
              <a href="/" className="hover:text-deep-gold transition-colors">
                {language === 'en' ? 'Instagram' : 'انسٹاگرام'}
              </a>
              <a href="/" className="hover:text-deep-gold transition-colors">
                {language === 'en' ? 'Facebook' : 'فیس بک'}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};