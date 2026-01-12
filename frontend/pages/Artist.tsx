import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Link as LinkIcon, Instagram } from 'lucide-react';
import ArtCard from '../components/art/ArtCard';
import axios from 'axios';

// Define Interface based on your Artist Model
interface ArtistProfile {
  _id: string;
  displayName: string;
  bio: string;
  location?: string;
  profileImageUrl?: string;
  instagramUrl?: string;
  websiteUrl?: string;
  artStyles: string[];
}

const Artist: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // 'id' can be _id or displayName based on your controller
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState<ArtistProfile | null>(null);
  const [artistWorks, setArtistWorks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL || '/api';

  // Helper to safely get image URL
  const getImageUrl = (url?: string) => {
    if (!url) return 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000'; // Fallback
    if (url.startsWith('http')) return url;
    return url;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError('');
        
        // 1. Fetch Artist Profile (Using your artist.controller logic which handles ID or Name)
        const profileRes = await axios.get(`${API_BASE_URL}/artists/${id}`);
        const artistData = profileRes.data;
        setProfile(artistData);

        // 2. Fetch All Artworks and filter for this artist
        // (Optimization: In the future, create an endpoint /api/artworks?artist=ID)
        const artworksRes = await axios.get(`${API_BASE_URL}/artworks`);
        
        const relevantWorks = artworksRes.data.filter((art: any) => {
             // Handle both populated object and direct string/ID
             const artArtistName = typeof art.artist === 'object' ? art.artist.displayName : art.artistName || art.artist;
             const artArtistId = typeof art.artist === 'object' ? art.artist._id : art.artist;

             // Match by ID if possible, otherwise by Name (case insensitive)
             return (
               (artistData._id && artArtistId === artistData._id) ||
               (artArtistName && artArtistName.toLowerCase() === artistData.displayName.toLowerCase())
             );
        });

        // Map _id to id for components
        setArtistWorks(relevantWorks.map((w: any) => ({ ...w, id: w._id })));

      } catch (error) {
        console.error("Failed to fetch artist data", error);
        setError('Artist not found');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen bg-cream flex items-center justify-center text-[#3E2723]">Loading Profile...</div>;
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center text-[#3E2723] gap-4">
        <p className="text-xl font-serif">Artist not found.</p>
        <button onClick={() => navigate('/art')} className="text-sm underline uppercase tracking-widest">Return to Gallery</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream font-sans text-[#3E2723] overflow-x-hidden selection:bg-[#3E2723] selection:text-cream">
      
      {/* Navigation Header */}
      <nav className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference text-cream pointer-events-none">
         <button 
           onClick={() => navigate(-1)} 
           className="pointer-events-auto flex items-center gap-3 uppercase text-[10px] font-black tracking-[0.2em] hover:opacity-70 transition-opacity"
         >
           <ArrowLeft size={14} /> Back
         </button>
      </nav>

      {/* --- SECTION 1: HERO PROFILE --- */}
      <header className="relative pt-32 pb-20 px-6 md:px-12 max-w-[1700px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          
          {/* Left: Portrait */}
          <div className="lg:col-span-5 relative group">
             <div className="aspect-[3/4] overflow-hidden rounded-sm relative bg-[#3E2723]/5">
                <img 
                  src={getImageUrl(profile.profileImageUrl)} 
                  alt={profile.displayName}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 group-hover:scale-105"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-[#3E2723]/10" />
             </div>
             
             {/* Signature Block */}
             <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#3E2723] p-4 flex items-center justify-center text-center hidden md:flex shadow-2xl">
                <span className="text-cream font-serif italic text-2xl leading-none">
                   {profile.displayName.split(' ')[0]}<br/>
                   <span className="text-white/50 text-xs not-italic font-sans font-bold tracking-widest uppercase mt-1 block">Artist</span>
                </span>
             </div>
          </div>

          {/* Right: Info & Bio */}
          <div className="lg:col-span-7 flex flex-col justify-center h-full pt-8">
            <div className="flex items-center gap-4 mb-6 text-[#3E2723]/60">
               {profile.location && (
                 <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]">
                   <MapPin size={12} /> {profile.location}
                 </span>
               )}
               {profile.location && <span className="w-px h-3 bg-[#3E2723]/20" />}
               <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                 {artistWorks.length} Available Works
               </span>
            </div>

            <h1 className="text-7xl md:text-8xl font-serif font-black italic tracking-tighter leading-[0.9] mb-10 text-[#3E2723]">
              {profile.displayName}
            </h1>

            <p className="max-w-2xl text-[#3E2723] text-base leading-7 mb-12 whitespace-pre-wrap font-medium">
              {profile.bio || "No biography available."}
            </p>

            {/* Stats Row */}
            <div className="flex gap-4 items-center border-t border-[#3E2723]/10 pt-8">
               {profile.instagramUrl && (
                  <a href={profile.instagramUrl} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-[#3E2723]/20 flex items-center justify-center hover:bg-[#3E2723] hover:text-cream transition-colors">
                    <Instagram size={20} />
                  </a>
               )}
               {profile.websiteUrl && (
                  <a href={profile.websiteUrl} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-[#3E2723]/20 flex items-center justify-center hover:bg-[#3E2723] hover:text-cream transition-colors">
                    <LinkIcon size={20} />
                  </a>
               )}
               
               {/* Styles Tags */}
               <div className="flex gap-2 ml-4 flex-wrap">
                  {profile.artStyles?.map((style, i) => (
                    <span key={i} className="px-3 py-1 bg-[#3E2723]/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#3E2723]/70">
                      {style}
                    </span>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- SECTION 2: THE WORKS --- */}
      <section className="bg-white py-24 px-6 md:px-12 border-t border-[#3E2723]/10">
        <div className="max-w-[1700px] mx-auto">
          <div className="flex justify-between items-baseline mb-16">
             <h2 className="text-4xl md:text-5xl font-serif italic font-black text-[#3E2723]">
               Selected Works
             </h2>
             <span className="hidden md:block text-[10px] font-black uppercase tracking-[0.2em] text-[#3E2723]/50">
               {profile.displayName} — Collection
             </span>
          </div>
          
          {artistWorks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-16 gap-x-10">
              {artistWorks.map((art) => (
                <ArtCard key={art.id} artwork={art} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center border border-dashed border-[#3E2723]/20 rounded-lg">
               <p className="text-[12px] font-bold uppercase tracking-widest text-[#3E2723]/60">
                 No works currently listed.
               </p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

export default Artist;