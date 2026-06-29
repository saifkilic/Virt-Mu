import apiClient from './apiClient';

// ======================
// TYPES & INTERFACES
// ======================

export interface Artifact {
  _id: string;
  name: { en: string; ur: string };
  slug: string;
  description: { en: string; ur: string };
  longDescription?: { en: string; ur: string };
  category: string;
  historicalPeriod: { en: string; ur: string };
  materials?: string[];
  material?: string | string[];
  modelUrl?: string;
  position?: { x: number; y: number; z: number };
  stats: { views: number; likes: number; commentCount: number };
  images?: Array<{
    url: string;
    caption?: { en?: string; ur?: string };
    order?: number;
  }>;
  dimensions?: {
    height?: number;
    width?: number;
    depth?: number;
    diameter?: number;
    unit?: string;
  };
  museumCode?: string;
}

export interface Room {
  _id: string;
  museumCode: 'lahore' | 'taxila' | 'national_karachi' | 'mohenjo_daro';
  name: { en: string; ur: string };
  description: { en: string; ur: string };
  sceneData: {
    modelUrl: string;
    lighting: { ambientColor: string; ambientIntensity: number };
  };
}

export interface Museum {
  code: string;
  name: { en: string; ur: string };
  description: { en: string; ur: string };
  stats: { views: number; totalArtifacts: number };
  thumbnail?: string;
  heroImage?: string;
  isUnescoSite: boolean;
  totalArtifacts: number;
  totalRooms: number;
}

export interface Comment {
  _id: string;
  userId: string;
  artifactId: string;
  museumCode: string;
  rating?: number;
  text: string;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface CommentResponse {
  comments: Comment[];
  pagination: Pagination;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  type: 'saves' | 'comments';
  threshold: number;
  earnedAt: Date;
}

export interface UserStats {
  artifactsViewed: number;
  totalTimeSpent: number;
  commentsCount: number;
  favoritesCount: number;
  museumsVisited: Array<{
    museumId: string;
    visitCount: number;
    totalTime: number;
    lastVisit: Date;
  }>;
}

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  displayName?: string;
  avatar?: string;
  bio?: string;
  role: 'user' | 'curator' | 'admin';
  language: 'en' | 'ur';
  stats: UserStats;
  achievements: Achievement[];
  favoritesCount: number;
  createdAt: Date;
  preferences: {
    notifications: boolean;
    newsletter: boolean;
  };
}

export interface FavoriteResponse {
  artifactId: string;
  isFavorited: boolean;
}

// ======================
// API IMPLEMENTATION
// ======================

export const api = {
  // Museum Endpoints
  getMuseums: async (): Promise<Museum[]> => {
    const { data } = await apiClient.get('/museums');
    console.log('🏛️ Museums Response:', data);
    
    if (Array.isArray(data?.data)) {
      console.log(`✅ Found ${data.data.length} museums in data.data`);
      return data.data;
    }
    if (Array.isArray(data)) {
      console.log(`✅ Found ${data.length} museums directly`);
      return data;
    }
    console.warn('⚠️ Unexpected museums response structure');
    return [];
  },

  getMuseumByCode: async (code: string): Promise<Museum> => {
    const { data } = await apiClient.get(`/museums/${code}`);
    console.log('🏛️ Museum by Code Response:', data);
    
    if (data?.data) {
      return data.data;
    }
    return data;
  },

  // Room Endpoints
  getRoomsByMuseum: async (museumCode: string): Promise<Room[]> => {
    const { data } = await apiClient.get(`/museums/${museumCode}/rooms`);
    console.log('🚪 Rooms Response:', data);
    
    if (Array.isArray(data?.data)) {
      return data.data;
    }
    if (Array.isArray(data)) {
      return data;
    }
    return [];
  },

  // Artifact Endpoints
  getArtifactsByRoom: async (roomId: string): Promise<Artifact[]> => {
    const { data } = await apiClient.get(`/rooms/${roomId}/artifacts`);
    
    if (Array.isArray(data?.data)) {
      return data.data;
    }
    if (Array.isArray(data)) {
      return data;
    }
    return [];
  },

  getArtifactBySlug: async (museumCode: string, slug: string): Promise<Artifact> => {
    const { data } = await apiClient.get(`/museums/${museumCode}/artifacts/${slug}`);
    
    if (data?.data) {
      return data.data;
    }
    return data;
  },

  getArtifactsByMuseum: async (museumCode: string): Promise<Artifact[]> => {
    const { data } = await apiClient.get(`/artifacts?museumCode=${museumCode}`);
    console.log('🎨 Artifacts API Response:', data);
    
    if (data?.data?.artifacts && Array.isArray(data.data.artifacts)) {
      console.log(`✅ Found ${data.data.artifacts.length} artifacts in data.data!`);
      return data.data.artifacts;
    }
    if (data?.artifacts && Array.isArray(data.artifacts)) {
      console.log(`✅ Found ${data.artifacts.length} artifacts in data!`);
      return data.artifacts;
    }
    if (Array.isArray(data)) {
      console.log(`✅ Data is array with ${data.length} artifacts`);
      return data;
    }
    
    console.error('❌ Could not find artifacts array', { 
      response: data,
      hasDataDotData: !!data?.data,
      hasArtifacts: !!data?.data?.artifacts,
    });
    return [];
  },

  // Favorites Endpoints
  toggleFavorite: async (artifactId: string): Promise<FavoriteResponse> => {
    const { data } = await apiClient.post(`/favorites/${artifactId}`);
    return data?.data || data;
  },

  getUserFavorites: async (): Promise<any> => {
    const { data } = await apiClient.get('/favorites');
    return data?.data || data;
  },

  getUserFavoritesWithDetails: async (): Promise<Artifact[]> => {
    try {
      const { data } = await apiClient.get('/favorites');
      console.log('❤️ Favorites with Details Response:', data);
      
      if (Array.isArray(data?.data)) {
        console.log(`✅ Found ${data.data.length} favorite artifacts with details`);
        return data.data;
      }
      if (Array.isArray(data)) {
        console.log(`✅ Found ${data.length} favorite artifacts`);
        return data;
      }
      
      console.warn('⚠️ Unexpected favorites response structure');
      return [];
    } catch (error) {
      console.error('Failed to load favorite artifacts:', error);
      return [];
    }
  },

  // Comments Endpoints
  createComment: async (commentData: {
    artifactId: string;
    museumCode: string;
    rating?: number;
    text: string;
  }): Promise<Comment> => {
    const { data } = await apiClient.post('/comments', commentData);
    return data?.data || data;
  },

  getCommentsByArtifact: async (
    artifactId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<CommentResponse> => {
    const { data } = await apiClient.get('/comments', {
      params: { artifactId, page, limit }
    });
    return data?.data || data;
  },

  getComment: async (commentId: string): Promise<Comment> => {
    const { data } = await apiClient.get(`/comments/${commentId}`);
    return data?.data || data;
  },

  updateComment: async (
    commentId: string,
    updates: Partial<{ rating?: number; text: string }>
  ): Promise<Comment> => {
    const { data } = await apiClient.put(`/comments/${commentId}`, updates);
    return data?.data || data;
  },

  deleteComment: async (commentId: string): Promise<void> => {
    await apiClient.delete(`/comments/${commentId}`);
  },

  // User Profile Endpoints
  getUserProfile: async (): Promise<UserProfile> => {
    const { data } = await apiClient.get('/user/profile');
    return data?.data || data;
  },

  getUserStats: async (): Promise<UserStats> => {
    const { data } = await apiClient.get('/user/stats');
    return data?.data || data;
  },

  updateUserProfile: async (updates: Partial<UserProfile>): Promise<UserProfile> => {
    const { data } = await apiClient.put('/user/profile', updates);
    return data?.data || data;
  },

  /**
   * NEW: Update profile (username and/or password)
   * Calls PUT /api/auth/profile endpoint
   */
  updateProfile: async (data: {
    username?: string;
    password?: string;
  }): Promise<UserProfile> => {
    const response = await apiClient.put('/auth/profile', data);
    return response.data?.data || response.data;
  },

  // Achievement Endpoints
  getUserAchievements: async (): Promise<Achievement[]> => {
    const { data } = await apiClient.get('/achievements');
    return data?.data || data;
  },

  getAchievementDefinitions: async (): Promise<Record<string, any>> => {
    const { data } = await apiClient.get('/achievements/definitions');
    return data?.data || data;
  },
};