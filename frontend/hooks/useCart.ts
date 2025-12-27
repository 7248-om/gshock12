
import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { CoffeeItem, CartItem, MenuCategory } from '../types';
import { useAuth } from '../context/AuthContext';

// Backend base URL: set VITE_BACKEND_API_URL in frontend .env; falls back to relative /api
const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL || '/api';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CoffeeItem) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  updateQuantity: (id: string, delta: number) => Promise<void>;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from backend when authenticated
  useEffect(() => {
    const fetchCart = async () => {
      if (!token) {
        setCartItems([]);
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const serverCart = response.data;
        const items: CartItem[] = (serverCart.items || []).map((item: any) => ({
          id: item.product._id,
          name: item.product.name,
          description: item.product.description,
          price: `$${item.product.price.toFixed(2)}`,
          imageUrl: item.product.imageUrl,
          // Backend doesn't currently store tags/category; default to Coffee for now
          tags: [],
          category: MenuCategory.COFFEE,
          quantity: item.quantity,
        }));

        setCartItems(items);
      } catch (error) {
        console.error('Failed to fetch cart:', error);
      }
    };

    fetchCart();
  }, [token]);

  const addToCart = useCallback(
    async (item: CoffeeItem) => {
      let newQuantity = 1;

      setCartItems((prev) => {
        const existing = prev.find((i) => i.id === item.id);
        if (existing) {
          newQuantity = existing.quantity + 1;
          return prev.map((i) =>
            i.id === item.id ? { ...i, quantity: newQuantity } : i
          );
        }
        newQuantity = 1;
        return [...prev, { ...item, quantity: newQuantity }];
      });

      setIsCartOpen(true);

      if (token) {
        try {
          await axios.post(
            `${API_BASE_URL}/cart`,
            {
              productId: item.id,
              quantity: newQuantity,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } catch (error) {
          console.error('Failed to sync cart (add):', error);
        }
      }
    },
    [token]
  );

  const removeFromCart = useCallback(
    async (id: string) => {
      setCartItems((prev) => prev.filter((i) => i.id !== id));

      if (token) {
        try {
          await axios.delete(`${API_BASE_URL}/cart/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (error) {
          console.error('Failed to sync cart (remove):', error);
        }
      }
    },
    [token]
  );

  const updateQuantity = useCallback(
    async (id: string, delta: number) => {
      let newQuantity = 1;

      setCartItems((prev) =>
        prev.map((i) => {
          if (i.id !== id) return i;
          newQuantity = Math.max(1, i.quantity + delta);
          return { ...i, quantity: newQuantity };
        })
      );

      if (token) {
        try {
          await axios.post(
            `${API_BASE_URL}/cart`,
            {
              productId: id,
              quantity: newQuantity,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } catch (error) {
          console.error('Failed to sync cart (update):', error);
        }
      }
    },
    [token]
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
    // Optional: add a backend endpoint to clear cart if needed
  }, []);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => {
    const priceNum = parseFloat(item.price.replace('$', ''));
    return acc + priceNum * item.quantity;
  }, 0);

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
  };

  return React.createElement(CartContext.Provider, { value }, children);
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
