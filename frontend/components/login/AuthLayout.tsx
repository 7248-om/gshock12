
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { RabusteLogo } from './constants';
import { ChevronDown, Coffee } from 'lucide-react';

const AuthLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Left Side: Form */}
      <div className="flex-1 flex flex-col p-6 lg:p-12 relative overflow-y-auto">
        <header className="flex justify-between items-center mb-8 lg:mb-12">
          <RabusteLogo />
        </header>

        <main className="flex-1 flex flex-col max-w-md mx-auto w-full pt-4 lg:pt-10">
          <Outlet />
        </main>

        <footer className="mt-auto pt-12 text-xs text-gray-400 border-t border-gray-100 flex flex-col gap-2">
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <a href="#" className="hover:text-[#4E342E]">Brewing Policy</a>
            <span className="text-gray-200">•</span>
            <a href="#" className="hover:text-[#4E342E]">Cookie Policy</a>
            <span className="text-gray-200">•</span>
            <a href="#" className="hover:text-[#4E342E]">Service Terms</a>
            <span className="text-gray-200">•</span>
            <a href="#" className="hover:text-[#4E342E]">Contact Roastmaster</a>
          </div>
          <p>© 2025 Rabuste Cafe</p>
        </footer>
      </div>

      {/* Right Side: Media Content */}
      <div className="hidden lg:flex lg:w-1/2 p-6 h-screen sticky top-0">
        <div className="relative w-full h-full rounded-[40px] overflow-hidden bg-[#4E342E] shadow-2xl">
          {/* Background Video (Coffee/Atmospheric Warmth) */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-coffee-beans-falling-on-a-table-3298-large.mp4" type="video/mp4" />
          </video>
          
          {/* Overlay Content */}
          <div className="relative z-10 h-full flex flex-col p-12 text-white">
            <div className="mt-auto mb-16">
              <h1 className="text-5xl font-display mb-4 leading-tight">
                Authentic Roasts,<br/>Endless Moments
              </h1>
              <p className="text-lg text-white/80 font-light max-w-sm">
                Join our coffee community and experience the finest selection of artisan beans from around the globe.
              </p>
            </div>

            <div className="mt-auto">
              <p className="text-sm text-white/60 mb-6 font-medium uppercase tracking-widest">Sourced With Care From</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10">
                  <span className="text-sm font-medium">Ethiopian Highlands</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10">
                  <span className="text-sm font-medium">Colombian Valley</span>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Gradient Overlay using Theme Colors */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#4E342E]/80 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
