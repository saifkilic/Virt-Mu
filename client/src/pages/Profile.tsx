import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { UI_STRINGS } from '../context/translation';
import { useAuth } from '../context/AuthContext';
import { 
  LogOut,
  Edit2,
  Check,
  Eye,
  EyeOff
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import toast from 'react-hot-toast';

interface EditFormData {
  username: string;
  newPassword: string;
  confirmPassword: string;
}

export const Profile: React.FC = () => {
  const { language } = useLanguage();
  const { user, logout, refreshUserData } = useAuth();
  const navigate = useNavigate();
  const t = UI_STRINGS[language];
  
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const [editSuccess, setEditSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState<EditFormData>({
    username: user?.username || '',
    newPassword: '',
    confirmPassword: '',
  });

  const dir = language === 'ur' ? 'rtl' : 'ltr';

  // Format member since date
  const formatMemberDate = (date?: string | Date) => {
    if (!date) return 'N/A';
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toLocaleDateString(language === 'en' ? 'en-US' : 'ur-PK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Handle logout
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
      setIsLoggingOut(false);
    }
  };

  // Handle profile update
  const handleSaveProfile = async () => {
    setEditError(null);
    setEditSuccess(false);

    // Validate inputs
    if (!formData.username.trim()) {
      setEditError(language === 'en' ? 'Username cannot be empty' : 'صارف نام خالی نہیں ہو سکتا');
      return;
    }

    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setEditError(language === 'en' ? 'Passwords do not match' : 'پاس ورڈ مماثل نہیں ہیں');
      return;
    }

    if (formData.newPassword && formData.newPassword.length < 6) {
      setEditError(language === 'en' ? 'Password must be at least 6 characters' : 'پاس ورڈ کم از کم 6 حروف ہونا چاہیے');
      return;
    }

    setIsSaving(true);

    try {
      // Call API to update profile
      const updateData: any = {
        username: formData.username,
      };

      if (formData.newPassword) {
        updateData.password = formData.newPassword;
      }

      const response = await api.updateProfile(updateData);

      if (response) {
        setEditSuccess(true);
        setIsEditingProfile(false);
        setFormData({
          username: formData.username,
          newPassword: '',
          confirmPassword: '',
        });
        await refreshUserData();
        toast.success(
          language === 'en' 
            ? 'Profile updated successfully' 
            : 'پروفائل کامیابی سے اپڈیٹ ہو گیا'
        );

        // Auto-hide success message
        setTimeout(() => setEditSuccess(false), 3000);
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to save profile';
      setEditError(msg);
      toast.error(msg);
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className={`text-lg ${language === 'ur' ? 'font-urdu' : 'font-body'}`}>
            {language === 'en' ? 'Loading profile...' : 'پروفائل لوڈ ہو رہا ہے...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8" dir={dir}>
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-deep-navy via-rich-brown to-deep-navy rounded-3xl p-8 md:p-12 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <h1 className={`text-4xl md:text-5xl font-display font-bold text-white ${language === 'ur' ? 'font-urdu' : ''}`}>
              {user.username}
            </h1>
            <p className={`text-cream/80 ${language === 'ur' ? 'font-urdu' : 'font-body'}`}>
              {language === 'en' ? `Member since ${formatMemberDate(user.createdAt)}` : `${formatMemberDate(user.createdAt)} سے رکن`}
            </p>
          </div>
          <button
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white font-body font-semibold transition-all duration-300 flex items-center gap-2 w-fit"
          >
            <Edit2 className="h-5 w-5" />
            {isEditingProfile 
              ? (language === 'en' ? 'Cancel' : 'منسوخ کریں')
              : (language === 'en' ? 'Edit Profile' : 'پروفائل میں ترمیم کریں')
            }
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        {isEditingProfile ? (
          // Edit Mode
          <div className="bg-white border border-light-gray/60 rounded-2xl p-8 shadow-sm">
            <h2 className={`text-2xl font-display font-bold text-rich-brown mb-6 flex items-center gap-3 ${language === 'ur' ? 'font-urdu' : ''}`}>
              <div className="w-1 h-8 bg-deep-gold rounded-full" />
              {language === 'en' ? 'Edit Profile' : 'پروفائل میں ترمیم'}
            </h2>

            {/* Error Message */}
            {editError && (
              <div className="mb-6 p-4 bg-museum-red/10 border border-museum-red/30 rounded-lg">
                <p className={`text-museum-red text-sm font-body ${language === 'ur' ? 'font-urdu' : ''}`}>
                  {editError}
                </p>
              </div>
            )}

            {/* Success Message */}
            {editSuccess && (
              <div className="mb-6 p-4 bg-pk-green/10 border border-pk-green/30 rounded-lg flex items-center gap-2">
                <Check className="h-5 w-5 text-pk-green" />
                <p className={`text-pk-green text-sm font-body ${language === 'ur' ? 'font-urdu' : ''}`}>
                  {language === 'en' ? 'Profile updated successfully!' : 'پروفائل کامیابی سے اپڈیٹ ہو گیا!'}
                </p>
              </div>
            )}

            <div className="space-y-6">
              {/* Email (Read-only) */}
              <div>
                <label className={`block text-xs font-body font-semibold text-deep-navy/70 uppercase tracking-wider mb-2 ${language === 'ur' ? 'font-urdu' : ''}`}>
                  {language === 'en' ? 'Email Address' : 'ای میل ایڈریس'}
                </label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full px-4 py-3 bg-cream border border-light-gray/60 rounded-lg text-deep-navy font-body text-sm cursor-not-allowed"
                />
                <p className={`text-xs text-deep-navy/50 mt-1 ${language === 'ur' ? 'font-urdu' : 'font-body'}`}>
                  {language === 'en' ? 'Email cannot be changed' : 'ای میل تبدیل نہیں کی جا سکتی'}
                </p>
              </div>

              {/* Username */}
              <div>
                <label className={`block text-xs font-body font-semibold text-deep-navy/70 uppercase tracking-wider mb-2 ${language === 'ur' ? 'font-urdu' : ''}`}>
                  {language === 'en' ? 'Username' : 'صارف نام'}
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-light-gray/60 rounded-lg text-deep-navy font-body text-sm focus:outline-none focus:border-deep-gold focus:ring-2 focus:ring-deep-gold/20"
                  placeholder={language === 'en' ? 'Enter new username' : 'نیا صارف نام درج کریں'}
                />
              </div>

              {/* New Password */}
              <div>
                <label className={`block text-xs font-body font-semibold text-deep-navy/70 uppercase tracking-wider mb-2 ${language === 'ur' ? 'font-urdu' : ''}`}>
                  {language === 'en' ? 'New Password (Optional)' : 'نیا پاس ورڈ (اختیاری)'}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    className="w-full px-4 py-3 pr-12 bg-white border border-light-gray/60 rounded-lg text-deep-navy font-body text-sm focus:outline-none focus:border-deep-gold focus:ring-2 focus:ring-deep-gold/20"
                    placeholder={language === 'en' ? 'Enter new password' : 'نیا پاس ورڈ درج کریں'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-deep-navy/50 hover:text-deep-navy"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              {formData.newPassword && (
                <div>
                  <label className={`block text-xs font-body font-semibold text-deep-navy/70 uppercase tracking-wider mb-2 ${language === 'ur' ? 'font-urdu' : ''}`}>
                    {language === 'en' ? 'Confirm Password' : 'پاس ورڈ کی تصدیق کریں'}
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full px-4 py-3 pr-12 bg-white border border-light-gray/60 rounded-lg text-deep-navy font-body text-sm focus:outline-none focus:border-deep-gold focus:ring-2 focus:ring-deep-gold/20"
                      placeholder={language === 'en' ? 'Confirm password' : 'پاس ورڈ کی تصدیق کریں'}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-deep-navy/50 hover:text-deep-navy"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <button
                onClick={handleSaveProfile}
                disabled={isSaving}
                className="w-full px-6 py-4 bg-gradient-to-r from-deep-gold to-gold-accent text-rich-brown font-body font-bold rounded-xl hover:shadow-lg transition-all duration-300 focus-visible:outline-2 focus-visible:outline-deep-gold focus-visible:outline-offset-2 flex items-center justify-center gap-2 min-h-[56px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-rich-brown/30 border-t-rich-brown rounded-full animate-spin" />
                    {language === 'en' ? 'Saving...' : 'محفوظ ہو رہا ہے...'}
                  </>
                ) : (
                  <>
                    <Check className="h-5 w-5" />
                    {language === 'en' ? 'Save Changes' : 'تبدیلیاں محفوظ کریں'}
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          // View Mode
          <div className="space-y-6">
            {/* Personal Information */}
            <div className="bg-white border border-light-gray/60 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
              <h3 className={`text-lg font-display font-bold text-rich-brown mb-6 flex items-center gap-3 ${language === 'ur' ? 'font-urdu' : ''}`}>
                <div className="w-1 h-6 bg-deep-gold rounded-full" />
                {language === 'en' ? 'Personal Information' : 'ذاتی معلومات'}
              </h3>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-xs font-body font-semibold text-deep-navy/70 uppercase tracking-wider mb-2 ${language === 'ur' ? 'font-urdu' : ''}`}>
                      {language === 'en' ? 'Email Address' : 'ای میل ایڈریس'}
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      readOnly
                      className="w-full px-4 py-3 bg-cream border border-light-gray/60 rounded-lg text-deep-navy font-body text-sm"
                    />
                  </div>
                  <div>
                    <label className={`block text-xs font-body font-semibold text-deep-navy/70 uppercase tracking-wider mb-2 ${language === 'ur' ? 'font-urdu' : ''}`}>
                      {language === 'en' ? 'Username' : 'صارف نام'}
                    </label>
                    <input
                      type="text"
                      value={user.username}
                      readOnly
                      className="w-full px-4 py-3 bg-cream border border-light-gray/60 rounded-lg text-deep-navy font-body text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-xs font-body font-semibold text-deep-navy/70 uppercase tracking-wider mb-2 ${language === 'ur' ? 'font-urdu' : ''}`}>
                      {language === 'en' ? 'Role' : 'کردار'}
                    </label>
                    <input
                      type="text"
                      value={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      readOnly
                      className="w-full px-4 py-3 bg-cream border border-light-gray/60 rounded-lg text-deep-navy font-body text-sm"
                    />
                  </div>
                  <div>
                    <label className={`block text-xs font-body font-semibold text-deep-navy/70 uppercase tracking-wider mb-2 ${language === 'ur' ? 'font-urdu' : ''}`}>
                      {language === 'en' ? 'Member Since' : 'رکن ہونے کے بعد سے'}
                    </label>
                    <input
                      type="text"
                      value={formatMemberDate(user.createdAt)}
                      readOnly
                      className="w-full px-4 py-3 bg-cream border border-light-gray/60 rounded-lg text-deep-navy font-body text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Logout */}
            <div className="space-y-4">
              <button 
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full px-6 py-4 bg-white border border-museum-red/30 text-museum-red font-body font-bold rounded-xl hover:border-museum-red/60 hover:bg-museum-red/5 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-museum-red focus-visible:outline-offset-2 flex items-center justify-center gap-2 min-h-[48px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LogOut className="h-5 w-5" />
                {isLoggingOut 
                  ? (language === 'en' ? 'Signing out...' : 'سائن آؤٹ ہو رہے ہیں...')
                  : (language === 'en' ? 'Sign Out' : 'سائن آؤٹ')
                }
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};