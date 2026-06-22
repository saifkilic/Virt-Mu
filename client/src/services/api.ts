import apiClient from './apiClient';

export interface Artifact {
  _id: string;
  name: { en: string; ur: string };
  slug: string;
  description: { en: string; ur: string };
  longDescription?: { en: string; ur: string };
  category: string;
  historicalPeriod: { en: string; ur: string };
  materials: string[];
  modelUrl?: string;
  position?: { x: number; y: number; z: number };
  stats: { views: number; likes: number; commentCount: number };
  images?: Array<{
    url: string;
    caption?: { en?: string; ur?: string };
    order?: number;
  }>;
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

export const api = {
  // Museum Endpoints
  getMuseums: async (): Promise<Museum[]> => {
    const { data } = await apiClient.get('/museums');
    return data;
  },
  getMuseumByCode: async (code: string): Promise<Museum> => {
    const { data } = await apiClient.get(`/museums/${code}`);
    return data;
  },

  // Room Endpoints
  getRoomsByMuseum: async (museumCode: string): Promise<Room[]> => {
    const { data } = await apiClient.get(`/museums/${museumCode}/rooms`);
    return data;
  },

  // Artifact Endpoints
  getArtifactsByRoom: async (roomId: string): Promise<Artifact[]> => {
    const { data } = await apiClient.get(`/rooms/${roomId}/artifacts`);
    return data;
  },
  getArtifactBySlug: async (museumCode: string, slug: string): Promise<Artifact> => {
    const { data } = await apiClient.get(`/museums/${museumCode}/artifacts/${slug}`);
    return data;
  },

  // Interactions
  addComment: async (artifactId: string, text: string, museumCode: string): Promise<any> => {
    const { data } = await apiClient.post(`/artifacts/${artifactId}/comments`, { text, museumCode });
    return data;
  },
  toggleFavorite: async (artifactId: string): Promise<{ favorites: string[] }> => {
    const { data } = await apiClient.post(`/artifacts/${artifactId}/favorite`);
    return data;
  },
 // Inside frontend services/api.ts
getArtifactsByMuseum: async (museumCode: string): Promise<Artifact[]> => {
  // Use query parameters to request artifacts belonging to a specific museum
  const { data } = await apiClient.get(`/artifacts?museumCode=${museumCode}`);
  return data;
},
};