import React, { useEffect, useState } from 'react';
import { CoffeeMenu } from "../components/menu/CoffeeMenu";
import { CoffeeFAQ } from "../components/menu/CoffeeFAQ";
import { CartDrawer } from "../components/cart/CartDrawer";
import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { initiateRazorpayPayment } from "../utils/razorpay";
import axios from 'axios';

// Define the interface for Menu Items
export interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stockStatus: string;
  tags?: string[];
}

const Menu = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // State for dynamic data
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
    clearCart,
  } = useCart();

  const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL || '/api';

  // Fetch Menu Items on Load
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/menu`);
        setMenuItems(response.data);
      } catch (err) {
        console.error("Failed to load menu:", err);
        setError("Could not load the menu. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const handleCheckout = () => {
    setIsCartOpen(false);

    if (!user) {
      navigate("/login");
    } else {
      if (cartItems.length === 0 || totalPrice <= 0) {
        alert('Your cart is empty. Please add items before checkout.');
        setIsCartOpen(true);
        return;
      }

      initiateRazorpayPayment(
        totalPrice,
        cartItems,
        user._id || (user as any).id || '',
        user.email || '',
        user.name || 'Guest',
        (response) => {
          console.log('✅ Payment successful:', response);
          clearCart();
          navigate('/payment-success');
        },
        (error) => {
          console.error('❌ Payment error:', error);
          alert(error.response?.data?.message || 'Payment failed. Please try again.');
        }
      );
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-[#3E2723]">Brewing the menu...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;

  return (
    <>
      {/* Pass fetched items to the component */}
      <CoffeeMenu items={menuItems} onAddToCart={addToCart} />
      <CoffeeFAQ />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
        totalPrice={totalPrice}
      />
    </>
  );
};

export default Menu;