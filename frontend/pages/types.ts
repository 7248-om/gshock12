
export type WorkshopType = {
  id: number;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  time: string;
  price: number; // 0 = free
  image: string;
};

export type FaqItemType = {
  question: string;
  answer: string;
};

export enum Category {
  COFFEE = 'Coffee',
  SAVORY = 'Savory Bites',
  DESSERT = 'Desserts'
}

export enum CoffeeTag {
  STRONG = 'Strong',
  BOLD = 'Bold',
  BEST_SELLER = 'Best Seller',
  COLD = 'Cold'
}

export enum OrderStatus {
  PENDING = 'Pending',
  PREPARING = 'Preparing',
  READY = 'Ready for Pickup',
  COMPLETED = 'Completed'
}

export enum ArtStatus {
  AVAILABLE = 'Available',
  SOLD_OUT = 'Sold Out',
  LIMITED_EDITION = 'Limited Edition'
}

export enum WorkshopCategory {
  BREATHER = 'Breather',
  EXPERT = 'Expert',
  FOUNDATIONS = 'Foundations'
}

export enum LeadStatus {
  NEW = 'New',
  CONTACTED = 'Contacted',
  NEGOTIATION = 'In Negotiation',
  REJECTED = 'Rejected'
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  imageUrl: string;
  stockStatus: 'In Stock' | 'Out of Stock';
  roastLevel?: string;
  tastingNotes?: string;
  tags: CoffeeTag[];
}

export interface Artwork {
  id: string;
  title: string;
  artist: string;
  year: string;
  medium: string;
  dimensions: string;
  price: number;
  status: ArtStatus;
  primaryImageUrl: string;
  hoverImageUrl: string;
  themeColor: string;
  tastingNotes: string;
}

export interface Workshop {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  category: WorkshopCategory;
  price: number;
  capacity: number;
  attendees: string[]; // User IDs
}

export interface FranchiseLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  investment: string;
  message: string;
  status: LeadStatus;
  createdAt: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'Coffee' | 'Workshop' | 'General';
}

export interface User {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  orderHistory: string[]; // Order IDs
  workshopHistory: string[]; // Workshop IDs
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  items: OrderItem[];
  totalPrice: number;
  pickupTime: string;
  status: OrderStatus;
  createdAt: string;
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrdersToday: number;
  activeBookings: number;
  artInquiries: number;
  isStoreOpen: boolean;
}
