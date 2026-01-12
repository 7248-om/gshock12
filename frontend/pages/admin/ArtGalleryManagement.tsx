import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { Search, Plus, MoreVertical, X, Trash2, Loader2 } from 'lucide-react';
import { Artwork } from '../types';

const ArtGalleryManagement: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Artwork | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [primaryUrl, setPrimaryUrl] = useState<string | null>(null);
  const [hoverUrl, setHoverUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const { token } = useAuth();
  const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL || '/api';

  const fetchArtworks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/artworks`);
      setArtworks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

  useEffect(() => {
    if (editing) {
      setPrimaryUrl(editing.primaryImageUrl || null);
      setHoverUrl(editing.hoverImageUrl || null);
    } else {
      setPrimaryUrl(null);
      setHoverUrl(null);
    }
  }, [editing]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const fd = new FormData(e.currentTarget);
      const payload = {
        title: fd.get('title'),
        artistName: fd.get('artist'),
        description: fd.get('description'),
        year: fd.get('year'),
        medium: fd.get('medium'),
        dimensions: fd.get('dimensions'),
        price: parseFloat(fd.get('price') as string),
        status: fd.get('status'),
        primaryImageUrl: primaryUrl,
        hoverImageUrl: hoverUrl,
        themeColor: fd.get('themeColor'),
        tastingNotes: fd.get('tastingNotes'),
      };
      
      if (editing) {
        await axios.put(`${API_BASE_URL}/artworks/${editing._id || editing.id}`, payload, {
           headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${API_BASE_URL}/artworks`, payload, {
           headers: { Authorization: `Bearer ${token}` }
        });
      }
      
      await fetchArtworks();
      setIsModalOpen(false);
      setEditing(null);
    } catch (error: any) {
      setSubmitError(error.response?.data?.message || 'Failed to save artwork');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this artwork?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/artworks/${id}`, {
         headers: { Authorization: `Bearer ${token}` }
      });
      fetchArtworks();
    } catch (error) {
      alert('Failed to delete');
    }
  };

  const handleUpload = async (file: File, type: 'primary' | 'hover') => {
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await axios.post(`${API_BASE_URL}/media/upload`, fd, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (type === 'primary') setPrimaryUrl(res.data.url);
      else setHoverUrl(res.data.url);
    } catch (err) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-coffee-500">Loading gallery...</div>;

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-serif font-bold tracking-tight text-coffee-100">Micro Art Gallery</h2>
          <p className="text-coffee-500 mt-1">Manage exhibitions and commercial art pieces.</p>
        </div>
        <button onClick={() => { setEditing(null); setIsModalOpen(true); }} className="px-6 py-3 bg-coffee-100 text-coffee-950 rounded-full text-sm font-bold hover:bg-white transition-colors flex items-center gap-2">
          <Plus size={18} /> New Artwork
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artworks.map(art => (
          <div key={art._id || art.id} className="bg-coffee-900 border border-coffee-800 rounded-3xl overflow-hidden group hover:border-coffee-600 transition-all">
            <div className="aspect-[4/5] relative bg-coffee-950 overflow-hidden">
              <img src={art.primaryImageUrl} alt={art.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-4 right-4">
                 <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-coffee-950/80 border border-coffee-700 ${art.status === 'Sold Out' ? 'text-red-400' : 'text-coffee-300'}`}>
                   {art.status}
                 </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-serif font-bold text-xl text-coffee-100">{art.title}</h3>
                  <p className="text-sm text-coffee-600">{art.artistName}, {art.year}</p>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => { setEditing(art); setIsModalOpen(true); }} className="text-coffee-500 hover:text-coffee-100 p-2">
                    <MoreVertical size={18} />
                  </button>
                  <button onClick={() => handleDelete(art._id || art.id || '')} className="text-coffee-500 hover:text-red-500 p-2">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-coffee-800 flex justify-between items-end">
                <p className="text-lg font-serif font-bold text-coffee-100">₹{art.price?.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-coffee-950/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl h-full bg-coffee-900 border-l border-coffee-800 rounded-3xl overflow-y-auto shadow-2xl">
            <div className="p-8 border-b border-coffee-800 flex justify-between items-center">
              <h3 className="text-2xl font-serif font-bold text-coffee-100">{editing ? 'Refine Work' : 'Catalogue Work'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-coffee-500 hover:bg-coffee-800 rounded-full"><X /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {submitError && <div className="text-red-400 text-sm bg-red-900/20 p-3 rounded">{submitError}</div>}
              
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-[10px] uppercase font-bold text-coffee-500 block mb-1">Title</label>
                  <input name="title" defaultValue={editing?.title} required className="w-full bg-coffee-950 border border-coffee-800 rounded-xl px-4 py-3 text-sm text-coffee-100 focus:border-coffee-500 outline-none" />
                </div>
                <div className="col-span-2">
                   <label className="text-[10px] uppercase font-bold text-coffee-500 block mb-1">Description</label>
                   <textarea name="description" defaultValue={editing?.description} className="w-full bg-coffee-950 border border-coffee-800 rounded-xl px-4 py-3 text-sm text-coffee-100 focus:border-coffee-500 outline-none resize-none" />
                </div>
                 <div className="col-span-1">
                  <label className="text-[10px] uppercase font-bold text-coffee-500 block mb-1">Artist</label>
                  <input name="artist" defaultValue={editing?.artistName} required className="w-full bg-coffee-950 border border-coffee-800 rounded-xl px-4 py-3 text-sm text-coffee-100 focus:border-coffee-500 outline-none" />
                </div>
                <div className="col-span-1">
                  <label className="text-[10px] uppercase font-bold text-coffee-500 block mb-1">Price</label>
                  <input name="price" type="number" defaultValue={editing?.price} required className="w-full bg-coffee-950 border border-coffee-800 rounded-xl px-4 py-3 text-sm text-coffee-100 focus:border-coffee-500 outline-none" />
                </div>
                 <div className="col-span-1">
                  <label className="text-[10px] uppercase font-bold text-coffee-500 block mb-1">Year</label>
                  <input name="year" defaultValue={editing?.year} className="w-full bg-coffee-950 border border-coffee-800 rounded-xl px-4 py-3 text-sm text-coffee-100 focus:border-coffee-500 outline-none" />
                </div>
                <div className="col-span-1">
                  <label className="text-[10px] uppercase font-bold text-coffee-500 block mb-1">Dimensions</label>
                  <input name="dimensions" defaultValue={editing?.dimensions} className="w-full bg-coffee-950 border border-coffee-800 rounded-xl px-4 py-3 text-sm text-coffee-100 focus:border-coffee-500 outline-none" />
                </div>
                
                <div className="col-span-2">
                  <label className="text-[10px] uppercase font-bold text-coffee-500 block mb-1">Primary Image</label>
                  <input type="file" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0], 'primary')} className="text-coffee-500 text-xs mb-2" />
                  {uploading && <span className="text-xs text-orange-400">Uploading...</span>}
                  {primaryUrl && <img src={primaryUrl} className="h-20 rounded border border-coffee-700" />}
                </div>

                 <div className="col-span-2">
                  <label className="text-[10px] uppercase font-bold text-coffee-500 block mb-1">Status</label>
                  <select name="status" defaultValue={editing?.status || 'Available'} className="w-full bg-coffee-950 border border-coffee-800 rounded-xl px-4 py-3 text-sm text-coffee-100">
                    <option value="Available">Available</option>
                    <option value="Sold Out">Sold Out</option>
                    <option value="Coming Soon">Coming Soon</option>
                  </select>
                </div>
              </div>

              <button type="submit" disabled={isSubmitting || uploading} className="w-full py-4 bg-coffee-100 text-coffee-950 font-bold uppercase tracking-widest rounded-full hover:bg-white transition-colors disabled:opacity-50">
                {isSubmitting ? <Loader2 className="animate-spin mx-auto"/> : 'Save Artwork'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtGalleryManagement;