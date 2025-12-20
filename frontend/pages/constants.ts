
import { WorkshopType, FaqItemType } from './types';

export const WORKSHOPS: WorkshopType[] = [
  { id: 1, title: "Latte Art Basics", description: "Learn milk frothing & latte art foundations with our head baristas.", date: "2025-12-21", time: "16:00 – 18:00", price: 799, category: 'Foundations', image: 'https://picsum.photos/id/425/800/600' },
  { id: 2, title: "Espresso Masterclass", description: "Precision extraction techniques for the perfect morning shot.", date: "2025-12-23", time: "17:00 – 19:00", price: 999, category: 'Expert', image: 'https://picsum.photos/id/63/800/600' },
  { id: 3, title: "Pour-Over Techniques", description: "Master the art of manual brewing with Hario V60 and Chemex.", date: "2025-12-26", time: "15:00 – 17:00", price: 899, category: 'Foundations', image: 'https://picsum.photos/id/1060/800/600' },
  { id: 4, title: "Cold Brew Workshop", description: "Slow extraction for deep, nuanced flavor profiles.", date: "2025-12-28", time: "14:00 – 16:00", price: 0, category: 'Breather', image: 'https://picsum.photos/id/312/800/600' },
  { id: 5, title: "Coffee Tasting", description: "A sensory journey through single-origin beans from Ethiopia to Brazil.", date: "2026-01-02", time: "17:00 – 19:00", price: 499, category: 'Breather', image: 'https://picsum.photos/id/766/800/600' },
  { id: 6, title: "Home Brewing Tips", description: "Transform your home kitchen into a professional-grade café.", date: "2026-01-05", time: "16:00 – 18:00", price: 0, category: 'Breather', image: 'https://picsum.photos/id/431/800/600' },
  { id: 7, title: "French Press Secrets", description: "The full-bodied guide to immersion brewing perfection.", date: "2026-01-08", time: "15:00 – 17:00", price: 699, category: 'Foundations', image: 'https://picsum.photos/id/225/800/600' },
  { id: 8, title: "Cupping Session", description: "Professional coffee evaluation techniques for serious enthusiasts.", date: "2026-01-10", time: "16:00 – 18:00", price: 0, category: 'Expert', image: 'https://picsum.photos/id/491/800/600' },
  { id: 9, title: "Latte Art Advanced", description: "Complex patterns: swans, rosettas, and stacked hearts.", date: "2026-01-12", time: "17:00 – 19:00", price: 1099, category: 'Expert', image: 'https://picsum.photos/id/425/800/601' },
  { id: 10, title: "Aeropress Techniques", description: "Versatility and pressure: the ultimate travel brewer guide.", date: "2026-01-15", time: "14:00 – 16:00", price: 599, category: 'Foundations', image: 'https://picsum.photos/id/1060/800/601' },
  { id: 11, title: "Coffee & Dessert Pairing", description: "Discover the chemistry between acidic coffees and sweet treats.", date: "2026-01-18", time: "15:00 – 17:00", price: 0, category: 'Breather', image: 'https://picsum.photos/id/312/800/601' },
  { id: 12, title: "Advanced Espresso", description: "Refractometers, yield ratios, and profiling for professionals.", date: "2026-01-21", time: "16:00 – 18:00", price: 1299, category: 'Expert', image: 'https://picsum.photos/id/63/800/601' },
  { id: 13, title: "Brewing Science", description: "Water chemistry and extraction theory in depth.", date: "2026-01-25", time: "17:00 – 19:00", price: 0, category: 'Expert', image: 'https://picsum.photos/id/766/800/601' },
  { id: 14, title: "Coffee Latte Workshop", description: "Classic latte proportions and temperature control.", date: "2026-01-28", time: "15:00 – 17:00", price: 799, category: 'Foundations', image: 'https://picsum.photos/id/431/800/601' },
  { id: 15, title: "Coffee Art for Kids", description: "Fun, non-caffeinated artistic sessions using coffee grounds.", date: "2026-02-01", time: "14:00 – 15:30", price: 0, category: 'Breather', image: 'https://picsum.photos/id/225/800/601' },
  { id: 16, title: "Coffee Roasting 101", description: "From green bean to brown: the science of roasting profiles.", date: "2026-02-05", time: "16:00 – 18:00", price: 899, category: 'Expert', image: 'https://picsum.photos/id/491/800/601' },
  { id: 17, title: "Barista Skills", description: "Workflow efficiency and station management in high-volume settings.", date: "2026-02-10", time: "17:00 – 19:00", price: 1199, category: 'Foundations', image: 'https://picsum.photos/id/425/800/602' },
  { id: 18, title: "Coffee & Chocolate Pairing", description: "Explore the shared terroir of specialty coffee and craft cacao.", date: "2026-02-14", time: "15:00 – 17:00", price: 0, category: 'Breather', image: 'https://picsum.photos/id/1060/800/602' },
  { id: 19, title: "Iced Coffee Creations", description: "Cold signatures: shaking, stirring, and blending techniques.", date: "2026-02-20", time: "14:00 – 16:00", price: 599, category: 'Foundations', image: 'https://picsum.photos/id/312/800/602' },
  { id: 20, title: "Coffee History & Culture", description: "Tracing the journey from Ethiopia's forests to modern cafes.", date: "2026-02-28", time: "16:00 – 18:00", price: 0, category: 'Breather', image: 'https://picsum.photos/id/766/800/602' },
];

export const FAQS: FaqItemType[] = [
  {
    question: "Are workshops free or paid?",
    answer: "Our curriculum includes both community-focused free sessions and intensive, fee-based technical masterclasses. Prices reflect materials and expert lead time.",
  },
  {
    question: "Do frequent customers get priority access?",
    answer: "Absolutely. Our 'Onyx Circle' members receive 48-hour early registration windows and exclusive discounts on advanced technical sessions.",
  },
  {
    question: "What should I bring?",
    answer: "For Foundations and Breather sessions, just your enthusiasm. For Expert sessions, we provide all specialized equipment including refractometers and scales.",
  },
];
