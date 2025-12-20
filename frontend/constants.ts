
import { CoffeeItem, CoffeeTag, MenuCategory } from './types';

export const COFFEE_MENU: (CoffeeItem & { notes: string; roastLevel: string })[] = [
  // COFFEE CATEGORY - Using all 6 provided images
  {
    id: 'robusta-americano',
    name: 'Robusta Iced Americano',
    description: 'Clean kick of pure Robusta. Bold, refreshing, and beautifully bitter.',
    notes: 'Pure Robusta | Earthy | Intense',
    roastLevel: 'Expressive Dark',
    price: '$18.50',
    tags: [CoffeeTag.STRONG, CoffeeTag.COLD],
    category: MenuCategory.COFFEE,
    imageUrl: 'input_file_0.png'
  },
  {
    id: 'robusta-cappuccino',
    name: 'Robusta Cappuccino',
    description: 'Rich warmth meets thick hazelnut robusta crema.',
    notes: 'Toasted Hazelnut | Thick Crema',
    roastLevel: 'Moderate',
    price: '$21.00',
    tags: [CoffeeTag.BOLD, CoffeeTag.BEST_SELLER],
    category: MenuCategory.COFFEE,
    imageUrl: 'input_file_1.png'
  },
  {
    id: 'robusta-flat-white',
    name: 'Robusta Flat White',
    description: 'Silky micro-foam paired with the heavy body of Robusta.',
    notes: 'Silky | Heavy Body | Bold',
    roastLevel: 'Medium-Dark',
    price: '$19.50',
    tags: [CoffeeTag.BOLD],
    category: MenuCategory.COFFEE,
    imageUrl: 'input_file_2.png'
  },
  {
    id: 'robusta-frappe',
    name: 'Robusta Frappe',
    description: 'The creamy chill of our signature robusta.',
    notes: 'Caramel | Malted Milk | Chilled',
    roastLevel: 'Flash Chilled',
    price: '$24.50',
    tags: [CoffeeTag.COLD, CoffeeTag.BEST_SELLER],
    category: MenuCategory.COFFEE,
    imageUrl: 'input_file_3.png'
  },
  {
    id: 'robusta-signature-cold',
    name: 'Signature Cold Brew',
    description: 'Steeped for 18 hours for maximum punch and zero acidity.',
    notes: 'Maximum Punch | Zero Acidity',
    roastLevel: 'Cold Steeped',
    price: '$22.00',
    tags: [CoffeeTag.STRONG, CoffeeTag.COLD],
    category: MenuCategory.COFFEE,
    imageUrl: 'input_file_4.png'
  },
  {
    id: 'robusta-midnight',
    name: 'Midnight Robusta',
    description: 'Our darkest roast. For the late-night thinkers.',
    notes: 'Dark Cocoa | Smoky | Persistent',
    roastLevel: 'Double Dark',
    price: '$20.00',
    tags: [CoffeeTag.STRONG],
    category: MenuCategory.COFFEE,
    imageUrl: 'input_file_5.png'
  },

  // SAVORY BITES CATEGORY
  {
    id: 'savory-1',
    name: 'Sourdough Smoked Bagel',
    description: 'Artisanal sourdough bagel with house-smoked salmon and caper cream.',
    notes: 'Savory | Smoked | Artisanal',
    roastLevel: 'Baked Fresh',
    price: '$14.00',
    tags: [CoffeeTag.BEST_SELLER],
    category: MenuCategory.SAVORY,
    imageUrl: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'savory-2',
    name: 'Wild Mushroom Quiche',
    description: 'Flaky pastry with a rich filling of forest mushrooms and thyme.',
    notes: 'Earthy | Buttery | Herbaceous',
    roastLevel: 'Warm',
    price: '$12.50',
    tags: [CoffeeTag.BOLD],
    category: MenuCategory.SAVORY,
    imageUrl: 'https://images.unsplash.com/photo-1614777986387-015c2a89b65d?q=80&w=800&auto=format&fit=crop'
  },

  // DESSERTS CATEGORY
  {
    id: 'dessert-1',
    name: 'Robusta Tiramisu',
    description: 'Ladyfingers soaked in robusta espresso, layered with mascarpone.',
    notes: 'Rich Coffee | Velvety | Cocoa',
    roastLevel: 'Chilled',
    price: '$11.50',
    tags: [CoffeeTag.BEST_SELLER],
    category: MenuCategory.DESSERT,
    imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'dessert-2',
    name: 'Sea Salt Cocoa Cookie',
    description: 'Extra dark cocoa chunks meet flaky Maldon sea salt.',
    notes: 'Salty | Dark Chocolate | Fudgy',
    roastLevel: 'Baked Daily',
    price: '$5.50',
    tags: [CoffeeTag.STRONG],
    category: MenuCategory.DESSERT,
    imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=800&auto=format&fit=crop'
  }
];

export const FAQ_ITEMS = [
  {
    question: "Do I need an account to browse the menu?",
    answer: "No. Browsing is fully open. You can explore our robusta coffee, savory bites, and artisanal desserts anytime."
  },
  {
    question: "Why is login required for pre-orders?",
    answer: "Pre-orders require an account to coordinate pickup timing and ensure your order is fresh and ready when you arrive."
  },
  {
    question: "Is payment handled here?",
    answer: "No. After confirming your cart, you will be redirected to a separate secure payment page."
  }
];
