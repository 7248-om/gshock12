import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../hooks/useCart';
import { color } from 'three/tsl';

// --- THEME CONSTANTS (Strict "Espresso & Cream" Palette) ---
const THEME = {
  espresso: '#3E2723',  // Dark Brown (Menu Background, Primary Text on Light)
  bronze: '#966328',    // Medium Brown (Headings, Accents)
  gold: '#D99A46',      // Gold/Orange (Hover States, Highlights)
  cream: '#FFFCF2',     // Light Cream (Text on Dark, Page Background)
  white: '#FFFFFF'
};

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { totalItems, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeAndNavigate = (path: string) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  const handleLogout = async () => {
    await logout();
    closeAndNavigate('/');
  };

  const navItems = [
    {
      name: 'Coffee',
      links: [
        { label: 'Menu', path: '/menu' },
        { label: 'Savory Bites & Desserts', path: '/menu' },
      ],
    },
    {
      name: 'Why Robusta',
      links: [
        { label: 'What is Robusta?', path: '/' },
        { label: 'Flavor & Strength', path: '/' },
      ],
    },
    {
      name: 'Art',
      links: [
        { label: 'Gallery', path: '/art' },
        { label: 'Featured Artists', path: '/art' },
      ],
    },
    {
      name: 'Workshops',
      links: [
        { label: 'Coffee Workshops', path: '/workshop' },
        { label: 'Community Events', path: '/workshop' },
      ],
    },
    {
      name: 'Franchise',
      links: [
        { label: 'The Opportunity', path: '/' },
        { label: 'Partner With Us', path: '/franchise' },
      ],
    },
    {
      name: 'About',
      links: [
        { label: 'Our Story', path: '/ourstory' },
        { label: 'Café Concept', path: '/about' },
      ],
    },
  ];

  // Helper styles for dynamic coloring
  const headerTextColor = isMenuOpen || isScrolled ? THEME.cream : THEME.cream; 
  // Note: If your hero section is light, you might need to toggle this. 
  // For now, assuming dark hero or dark overlay, keeping text cream is safe.
  
  const headerBgStyle = isScrolled 
    ? { backgroundColor: `${THEME.espresso}F2`, backdropFilter: 'blur(10px)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' } // F2 = 95% opacity
    : { backgroundColor: 'transparent', color: headerTextColor };

  return (
    <>
      {/* HEADER BAR */}
      <header
        className="fixed top-0 left-0 w-full z-50 transition-all duration-500 py-4"
        style={headerBgStyle}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          
          {/* LOGO */}
          <button
            onClick={() => closeAndNavigate('/')}
            className="text-2xl md:text-3xl font-oswald font-bold uppercase tracking-[0.2em] transition-colors duration-300 hover:opacity-80"
            style={{ color: isMenuOpen ? THEME.gold : headerTextColor }}
          >
            Rabuste
          </button>

          {/* RIGHT CONTROLS */}
          <div className="flex items-center gap-4 md:gap-8">
            {/* Desktop Links */}
            <button
              onClick={() => closeAndNavigate('/menu')}
              className="hidden md:block uppercase text-xs font-bold tracking-widest transition-colors font-oswald hover:text-opacity-80"
              style={{ color: headerTextColor }}
            >
              Visit Café
            </button>

            {user?.role === 'admin' && (
              <button
                onClick={() => closeAndNavigate('/admin')}
                className="hidden md:block uppercase text-xs font-bold tracking-widest transition-colors font-oswald hover:text-opacity-80"
                style={{ color: headerTextColor }}
              >
                Admin
              </button>
            )}

            {user ? (
              <button
                onClick={handleLogout}
                className="hidden md:block uppercase text-xs font-bold tracking-widest transition-colors font-oswald hover:text-opacity-80"
                style={{ color: headerTextColor }}
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => closeAndNavigate('/login')}
                className="hidden md:block uppercase text-xs font-bold tracking-widest transition-colors font-oswald hover:text-opacity-80"
                style={{ color: headerTextColor }}
              >
                Login
              </button>
            )}

            {/* Cart Icon */}
            <button
              onClick={() => {
                closeAndNavigate('/menu');
                setIsCartOpen(true);
              }}
              className="flex items-center gap-2 uppercase text-xs font-bold tracking-widest transition-colors font-oswald hover:text-opacity-80"
              style={{ color: headerTextColor }}
            >
              <div className="relative">
                <ShoppingBag size={22} />
                {totalItems > 0 && (
                   <span className="absolute -top-2 -right-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2"
                         style={{ backgroundColor: THEME.gold, color: THEME.espresso, ringColor: THEME.espresso }}>
                     {totalItems}
                   </span>
                )}
              </div>
              <span className="hidden lg:inline">Cart</span>
            </button>

            {/* HAMBURGER TOGGLE */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative w-10 h-10 flex flex-col justify-center items-center group transition-all"
              aria-label="Toggle Menu"
            >
              <div className="flex flex-col gap-1.5 w-full items-end">
                  <span className={`block h-[2px] transition-all duration-300 ${isMenuOpen ? 'w-full rotate-45 translate-y-[8px]' : 'w-full'}`}
                        style={{ backgroundColor: isMenuOpen ? THEME.gold : headerTextColor }}></span>
                  
                  <span className={`block h-[2px] transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'w-2/3'}`}
                        style={{ backgroundColor: headerTextColor }}></span>
                  
                  <span className={`block h-[2px] transition-all duration-300 ${isMenuOpen ? 'w-full -rotate-45 -translate-y-[8px]' : 'w-full'}`}
                        style={{ backgroundColor: isMenuOpen ? THEME.gold : headerTextColor }}></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* FULLSCREEN OVERLAY MENU */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        } overflow-y-auto pt-24`}
        style={{ backgroundColor: THEME.espresso, color: THEME.cream }}
      >
        <div className="container mx-auto px-6 md:px-12 py-12 min-h-screen flex flex-col">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            
            {/* NAV SECTIONS */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12">
              {navItems.map((item, idx) => (
                <div key={item.name} 
                     className={`group transform transition-all duration-700 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                     style={{ transitionDelay: `${idx * 75}ms` }}
                >
                  <h3 className="text-3xl md:text-5xl font-oswald font-bold mb-6 transition-all cursor-default uppercase opacity-40 group-hover:opacity-100"
                      style={{ color: THEME.cream }}> {/* Base color cream, hover effect handled by opacity */}
                    {item.name}
                  </h3>

                  <div className="border-l-2 pl-6 space-y-3 transition-colors"
                       style={{ borderColor: `${THEME.gold}40`, ':hover': { borderColor: THEME.gold } } as React.CSSProperties}>
                    <ul className="flex flex-col gap-3">
                      {item.links.map((link) => (
                        <li key={link.label}>
                          <button
                            onClick={() => closeAndNavigate(link.path)}
                            className="text-lg md:text-xl font-sans transition-colors text-left font-light hover:translate-x-1 duration-300"
                            style={{ color: THEME.cream }}
                            onMouseEnter={(e) => e.currentTarget.style.color = THEME.gold}
                            onMouseLeave={(e) => e.currentTarget.style.color = THEME.cream}
                          >
                            {link.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* SIDE INFO */}
            <div className={`lg:col-span-4 flex flex-col gap-12 transition-all duration-1000 delay-300 ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
                 style={{ color: `${THEME.cream}99` }}> {/* 60% Opacity Cream */}
              
              <div>
                <h4 className="font-oswald uppercase tracking-[0.2em] text-sm mb-6 border-b pb-2"
                    style={{ color: THEME.gold, borderColor: `${THEME.gold}33` }}>
                  The Experience
                </h4>
                <div className="space-y-4 font-sans text-lg">
                  <button onClick={() => closeAndNavigate('/menu')} className="block hover:text-white transition-colors text-left group">
                    <span className="inline-block transition-transform group-hover:translate-x-2">Visit the Café</span>
                  </button>
                  {user?.role === 'admin' && (
                    <button onClick={() => closeAndNavigate('/admin')} className="block hover:text-white transition-colors text-left group">
                      <span className="inline-block transition-transform group-hover:translate-x-2">Admin Dashboard</span>
                    </button>
                  )}
                  <button onClick={() => closeAndNavigate('/workshop')} className="block hover:text-white transition-colors text-left group">
                    <span className="inline-block transition-transform group-hover:translate-x-2">Upcoming Workshops</span>
                  </button>
                </div>
              </div>

              <div>
                <h4 className="font-oswald uppercase tracking-[0.2em] text-sm mb-6 border-b pb-2"
                    style={{ color: THEME.gold, borderColor: `${THEME.gold}33` }}>
                  Connect
                </h4>
                <div className="space-y-4 font-sans text-lg">
                  <a href="mailto:hello@rabuste.coffee" className="block hover:text-white transition-colors group">
                     <span className="inline-block transition-transform group-hover:translate-x-2">hello@rabuste.coffee</span>
                  </a>
                  <button onClick={() => closeAndNavigate('/franchise')} className="block hover:text-white transition-colors text-left group">
                    <span className="inline-block transition-transform group-hover:translate-x-2">Franchise Enquiries</span>
                  </button>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                 <div className="flex gap-4">
                    {['IG', 'TW', 'FB'].map((social) => (
                      <div key={social} 
                           className="w-12 h-12 rounded-full border flex items-center justify-center transition-all cursor-pointer hover:-translate-y-1"
                           style={{ borderColor: `${THEME.cream}33`, color: THEME.cream }}
                           onMouseEnter={(e) => {
                             e.currentTarget.style.borderColor = THEME.gold;
                             e.currentTarget.style.backgroundColor = THEME.gold;
                             e.currentTarget.style.color = THEME.espresso;
                           }}
                           onMouseLeave={(e) => {
                             e.currentTarget.style.borderColor = `${THEME.cream}33`;
                             e.currentTarget.style.backgroundColor = 'transparent';
                             e.currentTarget.style.color = THEME.cream;
                           }}
                      >
                          <span className="text-xs font-bold">{social}</span>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-24">
            <p className="text-5xl md:text-9xl font-oswald uppercase leading-none tracking-tighter select-none opacity-10"
               style={{ color: THEME.gold }}>
              Bold Coffee.<br />Bold Culture.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;