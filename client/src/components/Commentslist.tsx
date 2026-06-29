// src/components/CommentsList.tsx
import React, { useState, useEffect } from 'react';
import { api, type Comment, type CommentResponse } from '../services/api';
import { Star, Loader2, Trash2, Edit2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface CommentsListProps {
  artifactId: string;
  language: 'en' | 'ur';
}

export const CommentsList: React.FC<CommentsListProps> = ({
  artifactId,
  language,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<any>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  // Load comments
  useEffect(() => {
    loadComments();
  }, [artifactId, page, language]);

  const loadComments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getCommentsByArtifact(artifactId, page, 5);
      setComments(response.comments);
      setPagination(response.pagination);
    } catch (err) {
      console.error('Failed to load comments:', err);
      setError(
        language === 'en'
          ? 'Failed to load comments'
          : 'تبصرے لوڈ کرنے میں ناکام'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!window.confirm(
      language === 'en'
        ? 'Delete this comment?'
        : 'یہ تبصرہ حذف کریں؟'
    )) {
      return;
    }

    try {
      await api.deleteComment(commentId);
      setComments(comments.filter(c => c._id !== commentId));
      toast.success(
        language === 'en'
          ? 'Comment deleted'
          : 'تبصرہ حذف ہو گیا'
      );
    } catch (err) {
      toast.error(
        language === 'en'
          ? 'Failed to delete comment'
          : 'تبصرہ حذف کرنے میں ناکام'
      );
    }
  };

  const handleEdit = (comment: Comment) => {
    setEditingId(comment._id);
    setEditText(comment.text);
  };

  const handleSaveEdit = async (commentId: string) => {
    if (!editText.trim()) {
      toast.error(
        language === 'en'
          ? 'Comment cannot be empty'
          : 'تبصرہ خالی نہیں ہو سکتا'
      );
      return;
    }

    try {
      const updated = await api.updateComment(commentId, { text: editText.trim() });
      setComments(comments.map(c => c._id === commentId ? updated : c));
      setEditingId(null);
      setEditText('');
      toast.success(
        language === 'en'
          ? 'Comment updated'
          : 'تبصرہ اپڈیٹ ہو گیا'
      );
    } catch (err) {
      toast.error(
        language === 'en'
          ? 'Failed to update comment'
          : 'تبصرہ اپڈیٹ کرنے میں ناکام'
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-amber-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-deep-navy/60 text-sm">
        <p>{error}</p>
        <button
          onClick={loadComments}
          className="text-amber-600 hover:text-amber-700 underline mt-2 font-semibold"
        >
          {language === 'en' ? 'Try again' : 'دوبارہ کوشش'}
        </button>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-deep-navy/60 text-sm">
        {language === 'en'
          ? 'No comments yet. Be the first to comment!'
          : 'ابھی کوئی تبصرہ نہیں۔ پہلے تبصرہ کریں!'}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {comments.map((comment) => (
        <div
          key={comment._id}
          className="bg-white border border-light-gray/60 rounded-lg p-4 space-y-2"
        >
          {/* Header with Rating */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-grow">
              <div className="flex items-center gap-2">
                <span className="text-xs font-body font-semibold text-deep-navy/60">
                  {language === 'en' ? 'User' : 'صارف'}
                </span>
                {comment.rating && (
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-3 w-3 ${star <= comment.rating!
                            ? 'fill-amber-500 text-amber-500'
                            : 'text-deep-navy/20'
                          }`}
                      />
                    ))}
                  </div>
                )}
              </div>
              <p className="text-xs text-deep-navy/45 mt-1">
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Action Buttons - Only show if user is the author */}
            <div className="flex gap-1 flex-shrink-0">
              <button
                onClick={() => handleEdit(comment)}
                className="p-1 rounded hover:bg-light-gray/60 transition-colors"
                title={language === 'en' ? 'Edit' : 'ترمیم'}
              >
                <Edit2 className="h-3 w-3 text-deep-navy/50 hover:text-amber-600" />
              </button>
              <button
                onClick={() => handleDelete(comment._id)}
                className="p-1 rounded hover:bg-light-gray/60 transition-colors"
                title={language === 'en' ? 'Delete' : 'حذف'}
              >
                <Trash2 className="h-3 w-3 text-deep-navy/50 hover:text-red-600" />
              </button>
            </div>
          </div>

          {/* Content */}
          {editingId === comment._id ? (
            <div className="space-y-2">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full px-2 py-1 bg-light-gray/30 border border-light-gray/80 rounded text-deep-navy text-sm font-body focus:outline-none focus:border-amber-500 focus:bg-white resize-none"
                rows={2}
              />
              <div className="flex gap-2">
                <button
                  onClick={() => handleSaveEdit(comment._id)}
                  className="flex-1 px-2 py-1 bg-amber-600 text-white text-xs font-body font-semibold rounded hover:bg-amber-700 transition-colors"
                >
                  {language === 'en' ? 'Save' : 'محفوظ'}
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="flex-1 px-2 py-1 bg-light-gray/50 text-deep-navy text-xs font-body font-semibold rounded hover:bg-light-gray/70 transition-colors"
                >
                  {language === 'en' ? 'Cancel' : 'منسوخ'}
                </button>
              </div>
            </div>
          ) : (
            <p className={`text-sm font-body text-deep-navy/80 leading-relaxed ${language === 'ur' ? 'text-right' : ''}`}>
              {comment.text}
            </p>
          )}
        </div>
      ))}

      {/* Pagination */}
      {pagination && pagination.pages > 1 && (
        <div className="flex items-center justify-between pt-3 border-t border-light-gray/40">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-3 py-1 bg-light-gray/50 text-deep-navy text-xs font-body rounded hover:bg-light-gray/70 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {language === 'en' ? 'Previous' : 'پچھلا'}
          </button>
          <span className="text-xs text-deep-navy/50">
            {language === 'en'
              ? `Page ${page} of ${pagination.pages}`
              : `صفحہ ${page} میں سے ${pagination.pages}`}
          </span>
          <button
            onClick={() => setPage(Math.min(pagination.pages, page + 1))}
            disabled={page === pagination.pages}
            className="px-3 py-1 bg-light-gray/50 text-deep-navy text-xs font-body rounded hover:bg-light-gray/70 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {language === 'en' ? 'Next' : 'اگلا'}
          </button>
        </div>
      )}
    </div>
  );
};