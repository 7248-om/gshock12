// File: src/services/artistService.ts
import axios from 'axios';

// Ensure this matches your backend URL
const API_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:5000/api'; 

export interface ArtistProfile {
  _id: string;
  user?: string;
  displayName: string;
  bio: string;
  location?: string;
  artStyles: string[];
  tags?: string[];
  instagramUrl?: string;
  websiteUrl?: string;
  profileImageUrl?: string;
  isFeatured: boolean;
  isActive: boolean;
}

export const artistService = {
  // Get all artists
  getAll: async () => {
    const response = await axios.get(`${API_URL}/artists`);
    return response.data;
  },

  // Get single artist by ID OR Name
  getById: async (idOrName: string) => {
    // The backend will handle distinguishing between ID and Name
    const response = await axios.get(`${API_URL}/artists/${encodeURIComponent(idOrName)}`);
    return response.data;
  },

  // Create new artist
  create: async (data: any, token: string) => {
    const response = await axios.post(`${API_URL}/artists`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  // Update artist
  update: async (id: string, data: any, token: string) => {
    const response = await axios.put(`${API_URL}/artists/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};