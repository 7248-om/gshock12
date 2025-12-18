
export enum CoffeeTag {
  STRONG = 'Strong',
  BOLD = 'Bold',
  BEST_SELLER = 'Best Seller',
  COLD = 'Cold'
}

export enum MenuCategory {
  COFFEE = 'Coffee',
  SAVORY = 'Savory Bites',
  DESSERT = 'Desserts'
}

export interface CoffeeItem {
  id: string;
  name: string;
  description: string;
  price: string;
  tags: CoffeeTag[];
  category: MenuCategory;
  imageUrl: string; // Simplified to a single image string
}

export interface CartItem extends CoffeeItem {
  quantity: number;
}

export type Page = 'menu' | 'login' | 'payment';
