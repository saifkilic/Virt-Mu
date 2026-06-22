
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import type { Museum } from '../services/api';

export const Dashboard: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [museums, setMuseums] = useState<Museum[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMuseums = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.getMuseums();
        
        // Defend against varying backend payload structures safely without TS compiler warnings
        const museumArray = Array.isArray(data) 
          ? data 
          : ((data as any)?.data ? (data as any).data : []);
        
        setMuseums(museumArray);
      } catch (err: any) {
        console.error('Failed to fetch museums:', err);
        setError('Failed to load museums. Is the backend running?');
      } finally {
        setLoading(false);
      }
    };

    fetchMuseums();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-[60vh]">Loading museums...</div>;
  }

  if (error) {
    return <div className="text-red-600 p-8 text-center">{error}</div>;
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-deep-navy to-rich-brown text-white rounded-3xl p-12 md:p-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          {language === 'en' ? "Discover Pakistan's Heritage" : 'پاکستان کی میراث دریافت کریں'}
        </h1>
      </div>

      {/* Museums Grid */}
      <div>
        <h2 className="text-3xl font-bold mb-8">Our Museums</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {museums.map((museum) => (
            <div
              key={museum.code}   // ← Safe key
              onClick={() => navigate(`/museum/${museum.code}`)}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer"
            >
              <div className="relative h-64">
                <img
                  src={museum.heroImage || museum.thumbnail || 'https://picsum.photos/id/1015/800/600'}
                  alt={museum.name[language]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold">{museum.name[language]}</h3>
                <p className="text-gray-600 mt-2">{museum.description[language]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};