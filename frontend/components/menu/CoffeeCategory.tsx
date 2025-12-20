
import React from 'react';
import { CoffeeItem, MenuCategory } from '../../types';
import { CoffeeCard } from './CoffeeCard';

// Updated interface to include 'notes' and 'roastLevel' properties and fixed onPreOrder signature
interface CoffeeCategoryProps {
  category: MenuCategory;
  items: (CoffeeItem & { notes: string; roastLevel: string })[];
  onPreOrder: (item: CoffeeItem) => void;
}

export const CoffeeCategory: React.FC<CoffeeCategoryProps> = ({ category, items, onPreOrder }) => {
  return (
    <div className="mb-16 scroll-mt-24" id={category.replace(/\s+/g, '-').toLowerCase()}>
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-2xl font-bold uppercase tracking-tighter whitespace-nowrap">{category}</h2>
        <div className="h-[1px] bg-gray-200 w-full"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map(item => (
          <CoffeeCard key={item.id} item={item} onPreOrder={onPreOrder} />
        ))}
      </div>
    </div>
  );
};
