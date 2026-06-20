import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { UI_STRINGS } from '../context/translation';
import { User, Clock, Trophy, Zap, Settings, LogOut, Mail, MapPin, Globe, Bookmark, Eye, Award } from 'lucide-react';

export const Profile: React.FC = () => {
  const { language } = useLanguage();
  const t = UI_STRINGS[language];
  const [activeTab, setActiveTab] = useState('overview');
  const dir = language === 'ur' ? 'rtl' : 'ltr';

  const achievements = [
    { id: 1, icon: Eye, label: language === 'en' ? 'Explorer' : 'تلاش کار', description: language === 'en' ? 'Viewed 10 artifacts' : '10 نوادرات دیکھے', completed: true },
    { id: 2, icon: Bookmark, label: language === 'en' ? 'Collector' : 'جمع کار', description: language === 'en' ? 'Saved 5 artifacts' : '5 نوادرات محفوظ کیے', completed: true },
    { id: 3, icon: Award, label: language === 'en' ? 'Scholar' : 'عالم', description: language === 'en' ? 'Explored all museums' : 'تمام میوزیمز تلاش کیے', completed: false },
  ];

  const activityLog = [
    { date: '2 days ago', action: language === 'en' ? 'Viewed Mughal Mirror' : 'مغل آئینہ دیکھا', museum: 'Lahore' },
    { date: '4 days ago', action: language === 'en' ? 'Saved Buddhist Statue' : 'بدھ مت کا مجسمہ محفوظ کیا', museum: 'Taxila' },
    { date: '1 week ago', action: language === 'en' ? 'Completed museum tour' : 'میوزیم کا دورہ مکمل کیا', museum: 'National Museum' },
  ];

  return (
    <div className="space-y-8" dir={dir}>
      {/* Profile Header */}
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-deep-navy via-pk-green to-deep-navy/80 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,0.1)]">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-deep-gold/10 rounded-full blur-3xl -z-0" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold-accent/10 rounded-full blur-3xl -z-0" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-deep-gold to-gold-accent rounded-2xl flex items-center justify-center shadow-2xl ring-4 ring-white/20">
                <User className="h-12 w-12 text-rich-brown" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-pk-green rounded-full border-4 border-white flex items-center justify-center">
                <Zap className="h-4 w-4 text-white" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-grow space-y-3 text-white">
              <div>
                <h1 className={`text-3xl md:text-4xl font-display font-bold ${language === 'ur' ? 'font-urdu' : ''}`}>
                  {language === 'en' ? 'Visitor Profile' : 'وزیٹر پروفائل'}
                </h1>
                <p className={`text-cream/80 text-sm mt-1 ${language === 'ur' ? 'font-urdu' : 'font-body'}`}>
                  {language === 'en' ? 'heritage_explorer_2024' : 'میراث_تلاش_کار_2024'}
                </p>
              </div>
              <div className="flex flex-wrap gap-4 text-sm font-body">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-deep-gold" />
                  <span>{language === 'en' ? 'Member since 2024' : '2024 سے رکن'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-deep-gold" />
                  <span>{language === 'en' ? '2 of 3 badges' : '3 میں سے 2 شارژ'}</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button className={`px-6 py-3 bg-deep-gold text-rich-brown font-body font-bold rounded-xl hover:bg-gold-accent transition-all duration-300 shadow-lg hover:shadow-xl focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 whitespace-nowrap ${language === 'ur' ? 'font-urdu' : ''}`}>
              {language === 'en' ? 'Edit Profile' : 'پروفائل میں ترمیم'}
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '24', label: language === 'en' ? 'Total Views' : 'کل نظارے', icon: Eye },
            { value: '12', label: language === 'en' ? 'Saved' : 'محفوظ', icon: Bookmark },
            { value: '3h 42m', label: language === 'en' ? 'Time Spent' : 'وقت صرف', icon: Clock },
            { value: '3', label: language === 'en' ? 'Museums' : 'میوزیمز', icon: Globe },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white border border-light-gray/60 rounded-xl p-4 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-deep-gold/10 rounded-lg">
                    <Icon className="h-5 w-5 text-deep-gold" />
                  </div>
                </div>
                <p className={`text-2xl font-display font-bold text-rich-brown ${language === 'ur' ? 'font-urdu' : ''}`}>
                  {stat.value}
                </p>
                <p className={`text-xs text-deep-navy/60 mt-1 ${language === 'ur' ? 'font-urdu' : 'font-body'}`}>
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-light-gray/40">
        <div className="flex gap-0 overflow-x-auto">
          {[
            { id: 'overview', label: language === 'en' ? 'Overview' : 'جائزہ' },
            { id: 'achievements', label: language === 'en' ? 'Achievements' : 'حصول' },
            { id: 'activity', label: language === 'en' ? 'Activity' : 'سرگرمی' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 font-body font-semibold text-sm whitespace-nowrap border-b-2 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-deep-gold focus-visible:outline-offset-4 ${
                activeTab === tab.id
                  ? 'border-deep-gold text-deep-gold'
                  : 'border-transparent text-deep-navy/60 hover:text-deep-navy'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="animate-in fade-in duration-300">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Personal Information */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white border border-light-gray/60 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                <h3 className={`text-lg font-display font-bold text-rich-brown mb-6 flex items-center gap-3 ${language === 'ur' ? 'font-urdu' : ''}`}>
                  <div className="w-1 h-6 bg-deep-gold rounded-full" />
                  {language === 'en' ? 'Personal Information' : 'ذاتی معلومات'}
                </h3>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-xs font-body font-semibold text-deep-navy/70 uppercase tracking-wider mb-2 ${language === 'ur' ? 'font-urdu' : ''}`}>
                        {language === 'en' ? 'Full Name' : 'مکمل نام'}
                      </label>
                      <input
                        type="text"
                        value={language === 'en' ? 'Heritage Explorer' : 'میراث تلاش کار'}
                        readOnly
                        className="w-full px-4 py-3 bg-cream border border-light-gray/60 rounded-lg text-deep-navy font-body text-sm"
                      />
                    </div>
                    <div>
                      <label className={`block text-xs font-body font-semibold text-deep-navy/70 uppercase tracking-wider mb-2 ${language === 'ur' ? 'font-urdu' : ''}`}>
                        {language === 'en' ? 'Email' : 'ای میل'}
                      </label>
                      <div className="flex items-center gap-2">
                        <Mail className="h-5 w-5 text-deep-gold" />
                        <input
                          type="email"
                          value="explorer@heritage.museum"
                          readOnly
                          className="flex-grow px-4 py-3 bg-cream border border-light-gray/60 rounded-lg text-deep-navy font-body text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-xs font-body font-semibold text-deep-navy/70 uppercase tracking-wider mb-2 ${language === 'ur' ? 'font-urdu' : ''}`}>
                        {language === 'en' ? 'Location' : 'مقام'}
                      </label>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-deep-gold" />
                        <input
                          type="text"
                          value={language === 'en' ? 'Rawalpindi, Pakistan' : 'راولپنڈی، پاکستان'}
                          readOnly
                          className="flex-grow px-4 py-3 bg-cream border border-light-gray/60 rounded-lg text-deep-navy font-body text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className={`block text-xs font-body font-semibold text-deep-navy/70 uppercase tracking-wider mb-2 ${language === 'ur' ? 'font-urdu' : ''}`}>
                        {language === 'en' ? 'Member Since' : 'رکن ہونے کے بعد سے'}
                      </label>
                      <input
                        type="text"
                        value="January 15, 2024"
                        readOnly
                        className="w-full px-4 py-3 bg-cream border border-light-gray/60 rounded-lg text-deep-navy font-body text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Preferences */}
              <div className="bg-white border border-light-gray/60 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                <h3 className={`text-lg font-display font-bold text-rich-brown mb-6 flex items-center gap-3 ${language === 'ur' ? 'font-urdu' : ''}`}>
                  <Settings className="h-5 w-5 text-deep-gold" />
                  {language === 'en' ? 'Preferences' : 'ترجیحات'}
                </h3>

                <div className="space-y-4">
                  {[
                    { label: language === 'en' ? 'Email Notifications' : 'ای میل اطلاعات', enabled: true },
                    { label: language === 'en' ? 'Museum Updates' : 'میوزیم کی تازہ کاری', enabled: true },
                    { label: language === 'en' ? 'New Artifact Alerts' : 'نئی نوادرات کی انتباہات', enabled: false },
                  ].map((pref, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-cream/40 rounded-lg hover:bg-cream/60 transition-colors duration-300">
                      <span className={`font-body text-sm text-deep-navy ${language === 'ur' ? 'font-urdu' : ''}`}>
                        {pref.label}
                      </span>
                      <div className={`w-12 h-6 rounded-full transition-all duration-300 ${pref.enabled ? 'bg-pk-green' : 'bg-light-gray'}`}>
                        <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${pref.enabled ? 'translate-x-6' : 'translate-x-0.5 translate-y-0.5'}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <button className="w-full px-6 py-4 bg-gradient-to-r from-deep-gold to-gold-accent text-rich-brown font-body font-bold rounded-xl hover:shadow-lg transition-all duration-300 focus-visible:outline-2 focus-visible:outline-deep-gold focus-visible:outline-offset-2 flex items-center justify-center gap-2 min-h-[48px]">
                <Settings className="h-5 w-5" />
                {language === 'en' ? 'Account Settings' : 'اکاؤنٹ کی ترتیبات'}
              </button>
              <button className="w-full px-6 py-4 bg-white border border-light-gray/60 text-deep-navy font-body font-bold rounded-xl hover:border-deep-gold/40 hover:bg-cream/40 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-deep-gold focus-visible:outline-offset-2 flex items-center justify-center gap-2 min-h-[48px]">
                <Globe className="h-5 w-5" />
                {language === 'en' ? 'Help & Support' : 'مدد اور معاونت'}
              </button>
              <button className="w-full px-6 py-4 bg-white border border-museum-red/30 text-museum-red font-body font-bold rounded-xl hover:border-museum-red/60 hover:bg-museum-red/5 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-museum-red focus-visible:outline-offset-2 flex items-center justify-center gap-2 min-h-[48px]">
                <LogOut className="h-5 w-5" />
                {language === 'en' ? 'Sign Out' : 'سائن آؤٹ'}
              </button>
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement, idx) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={achievement.id}
                  className={`group rounded-2xl p-6 border transition-all duration-300 cursor-pointer hover:shadow-lg ${
                    achievement.completed
                      ? 'bg-gradient-to-br from-deep-gold/10 to-gold-accent/10 border-deep-gold/40 hover:border-deep-gold/60'
                      : 'bg-cream/50 border-light-gray/40 opacity-60'
                  }`}
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
                    achievement.completed
                      ? 'bg-deep-gold/20 text-deep-gold group-hover:scale-110 group-hover:bg-deep-gold/30'
                      : 'bg-light-gray text-deep-navy/40'
                  }`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <h4 className={`font-display font-bold text-lg mb-1 ${achievement.completed ? 'text-rich-brown' : 'text-deep-navy/50'} ${language === 'ur' ? 'font-urdu' : ''}`}>
                    {achievement.label}
                  </h4>
                  <p className={`text-sm font-body ${achievement.completed ? 'text-deep-navy/70' : 'text-deep-navy/40'} ${language === 'ur' ? 'font-urdu' : ''}`}>
                    {achievement.description}
                  </p>
                  {achievement.completed && (
                    <div className="mt-4 inline-block px-3 py-1 bg-pk-green/20 text-pk-green text-xs font-body font-semibold rounded-lg">
                      {language === 'en' ? 'Unlocked' : 'اتم ہوا'}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="space-y-3">
            {activityLog.map((activity, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 bg-white border border-light-gray/60 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <div className="w-2 h-2 bg-deep-gold rounded-full" />
                <div className="flex-grow">
                  <p className={`font-body font-semibold text-deep-navy ${language === 'ur' ? 'font-urdu' : ''}`}>
                    {activity.action}
                  </p>
                  <p className={`text-xs text-deep-navy/60 mt-1 ${language === 'ur' ? 'font-urdu' : 'font-body'}`}>
                    {activity.museum}
                  </p>
                </div>
                <span className={`text-xs font-body text-deep-navy/40 whitespace-nowrap ${language === 'ur' ? 'font-urdu' : ''}`}>
                  {activity.date}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};