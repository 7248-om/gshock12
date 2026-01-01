import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User as FirebaseUser, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import axios from 'axios';

interface User {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  role?: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null; // backend user
  firebaseUser: FirebaseUser | null;
  token: string | null; // backend JWT
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  fetchBackendUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Backend base URL: set VITE_BACKEND_API_URL in frontend .env; falls back to relative /api
const API_BASE_URL = typeof import.meta !== 'undefined' && import.meta.env 
  ? (import.meta.env as Record<string, string>).VITE_BACKEND_API_URL || '/api'
  : '/api';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('authToken')); // backend JWT
  const [loading, setLoading] = useState(true);

  // Called after Firebase login to sync/create user in backend and get backend JWT
  const syncWithBackend = async (idToken: string) => {
    try {
      console.log('🔄 Syncing with backend. API_BASE_URL:', API_BASE_URL);
      console.log('📤 Sending idToken to:', `${API_BASE_URL}/auth/login`);
      
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        idToken,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('📥 Backend response:', response.data);

      const { user: backendUser, token: backendToken } = response.data;

      if (!backendUser || !backendToken) {
        throw new Error('Invalid response from backend: missing user or token');
      }

      console.log('✅ Backend sync successful. User:', backendUser);
      setUser(backendUser);
      setToken(backendToken);
      localStorage.setItem('authToken', backendToken);
    } catch (error) {
      console.error('❌ Failed to sync auth with backend:', error);
      
      // Log more details for debugging
      if (axios.isAxiosError(error)) {
        console.error('❌ Backend error response:', error.response?.data);
        console.error('❌ Backend error status:', error.response?.status);
        console.error('❌ Backend error message:', error.message);
        console.error('❌ Backend request URL:', error.config?.url);
        console.error('❌ Backend request headers:', error.config?.headers);
      }
      
      setUser(null);
      setToken(null);
      localStorage.removeItem('authToken');
      throw error;
    }
  };

  const fetchBackendUser = async () => {
    if (!token) return;

    try {
      const response = await axios.get(`${API_BASE_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch backend user:', error);
      setUser(null);
    }
  };

  useEffect(() => {
    console.log('🔐 Setting up auth state listener...');
    const unsubscribe = onAuthStateChanged(auth, async (userCredential) => {
      console.log('🔍 Auth state changed. User:', userCredential?.email || 'None');
      setFirebaseUser(userCredential);

      if (userCredential) {
        try {
          const idToken = await userCredential.getIdToken();
          console.log('✅ Firebase user authenticated. Email:', userCredential.email);
          console.log('🔑 ID Token length:', idToken.length);
          await syncWithBackend(idToken);
        } catch (error) {
          console.error('❌ Failed to sync with backend after Firebase auth:', error);
          setUser(null);
          setToken(null);
          localStorage.removeItem('authToken');
        }
      } else {
        console.log('⏹️ User logged out');
        setUser(null);
        setToken(null);
        localStorage.removeItem('authToken');
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      console.log('🔵 Starting Google Sign-In...');
      console.log('📱 Auth instance:', auth);
      console.log('🔑 Google provider configured');
      
      const result = await signInWithPopup(auth, googleProvider);
      if (!result.user) {
        throw new Error('No user returned from Google sign-in');
      }
      console.log('✅ Google Sign-In successful:', result.user.email);
      console.log('👤 Firebase UID:', result.user.uid);
      // onAuthStateChanged will handle backend sync
    } catch (error: any) {
      console.error('❌ Firebase Google login failed:', error);
      console.error('Error code:', error?.code);
      console.error('Error message:', error?.message);
      
      setUser(null);
      setToken(null);
      localStorage.removeItem('authToken');
      setFirebaseUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      setToken(null);
      localStorage.removeItem('authToken');
    } catch (error) {
      console.error('Firebase logout failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, firebaseUser, token, loading, loginWithGoogle, logout, fetchBackendUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
