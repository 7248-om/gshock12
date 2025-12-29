import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Coffee, 
  ClipboardList, 
  LogOut,
  Palette,
  Users,
  Megaphone,
  Briefcase,
  GraduationCap
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  isStoreOpen: boolean;
  onToggleStore: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, isStoreOpen, onToggleStore }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-neutral-800 flex flex-col shrink-0">
        <div className="p-8">
          <p className="text-[10px] tracking-[0.2em] text-neutral-500 mt-1 uppercase">Admin Portal v1.0</p>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          {/* UPDATED: Added /admin prefix to all paths */}
          <NavLink to="/admin" end className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive ? 'bg-white text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-900'}`}>
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>
          <NavLink to="/admin/menu" className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive ? 'bg-white text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-900'}`}>
            <Coffee size={18} /> Rabuste Menu
          </NavLink>
          <NavLink to="/admin/orders" className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive ? 'bg-white text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-900'}`}>
            <ClipboardList size={18} /> Orders
          </NavLink>
          <NavLink to="/admin/gallery" className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive ? 'bg-white text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-900'}`}>
            <Palette size={18} /> Art Gallery
          </NavLink>
          <NavLink to="/admin/workshops" className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive ? 'bg-white text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-900'}`}>
            <GraduationCap size={18} /> Workshops
          </NavLink>
          <NavLink to="/admin/franchise" className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive ? 'bg-white text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-900'}`}>
            <Briefcase size={18} /> Franchise
          </NavLink>
          <NavLink to="/admin/marketing" className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive ? 'bg-white text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-900'}`}>
            <Megaphone size={18} /> Marketing
          </NavLink>
          <NavLink to="/admin/users" className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive ? 'bg-white text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-900'}`}>
            <Users size={18} /> Users
          </NavLink>
        </nav>

        <div className="p-4 border-t border-neutral-800 space-y-4">
          <div className="flex items-center justify-between px-4 py-3 bg-neutral-900/50 rounded-xl border border-neutral-800">
            <div>
              <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Status</p>
              <p className={`text-xs font-semibold ${isStoreOpen ? 'text-green-400' : 'text-red-400'}`}>
                {isStoreOpen ? 'Café Open' : 'Café Closed'}
              </p>
            </div>
            <button 
              onClick={onToggleStore}
              className={`w-10 h-6 flex items-center rounded-full transition-colors duration-200 focus:outline-none ${isStoreOpen ? 'bg-white' : 'bg-neutral-700'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-black shadow-md transform transition-transform duration-200 ${isStoreOpen ? 'translate-x-5' : 'translate-x-1'}`} />
            </button>
          </div>
          
          <button className="flex items-center gap-3 px-4 py-3 text-neutral-400 hover:text-red-400 transition-colors w-full">
            <LogOut size={20} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative bg-[#0a0a0a]">
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;