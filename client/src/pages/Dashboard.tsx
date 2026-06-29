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
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    const fetchMuseums = async () => {
      try {
        setLoading(true);
        setError(null);

        // api.getMuseums() now returns Promise<Museum[]> directly
        const museumList = await api.getMuseums();
        
        // Validate that we got an array
        if (Array.isArray(museumList)) {
          setMuseums(museumList);
        } else {
          console.error('Unexpected response format:', museumList);
          setError('Invalid data format received from server');
        }
      } catch (err: any) {
        console.error('Failed to fetch museums:', err);
        setError('Failed to load museums. Is the backend running?');
      } finally {
        setLoading(false);
      }
    };

    fetchMuseums();
  }, []);

  if (loading) return <div className="text-center py-20">Loading museums...</div>;
  if (error) return <div className="text-red-600 text-center py-20">{error}</div>;
  if (museums.length === 0) return <div className="text-center py-20">No museums found</div>;

  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="bg-gradient-to-br from-deep-navy to-rich-brown text-white rounded-3xl p-12 md:p-20 text-center">
        <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
          {language === 'en' ? "Discover Pakistan's Heritage" : 'پاکستان کی میراث دریافت کریں'}
        </h1>
      </div>

      {/* Museums Grid */}
      <div>
        <h2 className="text-3xl font-display font-bold mb-8">Our Museums</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {museums.map((museum) => (
            <div
              key={museum.code}
              onClick={() => navigate(`/museum/${museum.code}`)}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer transition-shadow"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={museum.heroImage || museum.thumbnail || 'https://picsum.photos/id/1015/800/600'}
                  alt={museum.name[language]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-display font-bold">{museum.name[language]}</h3>
                <p className="text-deep-navy/70 mt-2 line-clamp-2">{museum.description[language]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};