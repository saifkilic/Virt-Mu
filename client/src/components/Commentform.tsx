// src/components/CommentForm.tsx
import React, { useState } from 'react';
import { api } from '../services/api';
import { Star, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface CommentFormProps {
  artifactId: string;
  museumCode: string;
  onCommentAdded: () => void;
  language: 'en' | 'ur';
}

export const CommentForm: React.FC<CommentFormProps> = ({
  artifactId,
  museumCode,
  onCommentAdded,
  language,
}) => {
  const [text, setText] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim()) {
      toast.error(
        language === 'en'
          ? 'Please enter a comment'
          : 'براہ کرم ایک تبصرہ درج کریں'
      );
      return;
    }

    try {
      setLoading(true);
      await api.createComment({
        artifactId,
        museumCode,
        rating: rating > 0 ? rating : undefined,
        text: text.trim(),
      });

      toast.success(
        language === 'en'
          ? 'Comment posted successfully'
          : 'تبصرہ کامیابی سے شائع ہو گیا'
      );

      setText('');
      setRating(0);
      onCommentAdded();
    } catch (err) {
      console.error('Failed to post comment:', err);
      toast.error(
        language === 'en'
          ? 'Failed to post comment'
          : 'تبصرہ شائع کرنے میں ناکام'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-light-gray/40 rounded-lg p-4 space-y-4 border border-light-gray/60">
      {/* Rating Stars */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-body font-semibold text-deep-navy/70">
          {language === 'en' ? 'Rate:' : 'درجہ:'}
        </span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(rating === star ? 0 : star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="transition-all duration-200"
              aria-label={`Rate ${star} stars`}
            >
              <Star
                className={`h-5 w-5 transition-all duration-200 ${star <= (hoveredRating || rating)
                    ? 'fill-amber-500 text-amber-500'
                    : 'text-deep-navy/25'
                  }`}
              />
            </button>
          ))}
        </div>
        {rating > 0 && (
          <span className="text-xs font-body text-amber-600 ml-auto font-semibold">
            {rating}/5 {language === 'en' ? 'stars' : 'ستاروں'}
          </span>
        )}
      </div>

      {/* Comment Text */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={language === 'en' ? 'Share your thoughts...' : 'اپنے خیالات شیئر کریں...'}
        className="w-full px-3 py-2 bg-white border-2 border-light-gray/60 rounded text-deep-navy text-sm font-body placeholder-deep-navy/40 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors resize-none"
        rows={3}
        disabled={loading}
      />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || !text.trim()}
        className="w-full px-3 py-2 bg-amber-600 text-white font-body font-semibold rounded text-sm hover:bg-amber-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {language === 'en' ? 'Post Comment' : 'تبصرہ شائع کریں'}
      </button>
    </form>
  );
};