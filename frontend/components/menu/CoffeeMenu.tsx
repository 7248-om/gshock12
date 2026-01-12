import React, { useState, useMemo } from 'react';
import { COFFEE_MENU } from '../../constants';
import { MenuCategory, CoffeeItem } from '../../types';
import { CoffeeCard } from './CoffeeCard';

// Shape of data coming from the Backend (matches the parent fetch)
export interface BackendMenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stockStatus: string;
  tags?: string[];
}

interface CoffeeMenuProps {
  items: BackendMenuItem[]; // Receive dynamic items from parent
  onAddToCart: (item: CoffeeItem) => void;
}

export const CoffeeMenu: React.FC<CoffeeMenuProps> = ({ items, onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'All'>('All');
  
  // 1. Map Backend Data to Frontend 'CoffeeItem' Shape
  const menuItems: CoffeeItem[] = useMemo(() => {
    // If backend data exists, map it
    if (items && items.length > 0) {
      return items.map((p) => ({
        id: p._id,
        name: p.name,
        description: p.description,
        price: `₹${p.price}`, // Add currency symbol
        imageUrl: p.imageUrl,
        tags: p.tags || [],
        category: p.category as MenuCategory,
      }));
    }
    // Fallback to static constants if backend is empty/loading
    return COFFEE_MENU;
  }, [items]);

  const categories = Object.values(MenuCategory);

  // 2. Filter based on selection
  const filteredMenu = useMemo(() => {
    if (activeCategory === 'All') return menuItems;
    return menuItems.filter(item => item.category === activeCategory);
  }, [activeCategory, menuItems]);

  return (
    <div className="container mx-auto px-6 max-w-7xl">
      {/* Editorial Header */}
      <header className="pt-24 pb-16 text-center">
        <div className="mb-4">
          <h1 className="text-6xl md:text-[140px] font-black tracking-tighter leading-none mb-10 font-oswald uppercase select-none text-[#3E2723]">
            MENU
          </h1>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mt-4 px-2 text-left">
          <div className="max-w-md">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">THE RABUSTE COLLECTION</h4>
            <p className="text-sm text-[#3E2723] font-medium leading-relaxed">
              Curated specialty Robusta. Bold, high-crema profiles engineered for the urban decision-maker, accompanied by artisanal bites.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 md:gap-4 w-full md:w-auto">
            <button 
              onClick={() => setActiveCategory('All')}
              className={`text-[10px] font-black uppercase tracking-widest px-8 py-4 border transition-all flex-grow md:flex-none ${
                activeCategory === 'All' ? 'bg-[#3E2723] text-white border-[#3E2723]' : 'bg-white text-black border-gray-100 hover:border-[#3E2723] hover:text-[#3E2723]'
              }`}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] font-black uppercase tracking-widest px-8 py-4 border transition-all flex-grow md:flex-none ${
                  activeCategory === cat ? 'bg-[#3E2723] text-white border-[#3E2723]' : 'bg-white text-[#3E2723] border-gray-100 hover:border-[#3E2723] hover:text-[#3E2723]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <hr className="mt-12 border-gray-100" />
      </header>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20 py-20">
        {filteredMenu.map((item) => (
          <div key={item.id} className="reveal-up active">
            <CoffeeCard 
              item={item} 
              onPreOrder={() => onAddToCart(item)} 
            />
          </div>
        ))}
      </div>

      {filteredMenu.length === 0 && (
        <div className="py-24 text-center">
          <p className="text-gray-400 italic serif">No items currently available in this category.</p>
        </div>
      )}
    </div>
  );
};