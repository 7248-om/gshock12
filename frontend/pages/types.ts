
export type WorkshopType = {
  id: number;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  time: string;
  price: number; // 0 = free
  image: string;
  category: 'Breather' | 'Expert' | 'Foundations';
};

export type FaqItemType = {
  question: string;
  answer: string;
};
