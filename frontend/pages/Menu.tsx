import { CoffeeMenu } from "../components/menu/CoffeeMenu";
import { CoffeeFAQ } from "../components/menu/CoffeeFAQ";
import { CartDrawer } from "../components/cart/CartDrawer";
import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { initiateRazorpayPayment } from "../utils/razorpay";

const Menu = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

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

  const handleCheckout = () => {
    setIsCartOpen(false);

    if (!user) {
      // If not logged in, go to login page
      navigate("/login");
    } else {
      // Validate cart and total price
      if (cartItems.length === 0 || totalPrice <= 0) {
        alert('Your cart is empty. Please add items before checkout.');
        setIsCartOpen(true);
        return;
      }

      // If logged in, initiate Razorpay payment
      initiateRazorpayPayment(
        totalPrice,
        cartItems,
        user._id || user.id || '', // MongoDB uses _id
        user.email || '',
        user.name || 'Guest',
        (response) => {
          // Payment successful callback
          console.log('✅ Payment successful:', response);
          clearCart(); // Clear the cart after successful payment
          navigate('/payment-success'); // Redirect to success page
        },
        (error) => {
          // Payment error callback
          console.error('❌ Payment error:', error);
          let errorMsg = 'Payment failed. Please try again.';
          
          if (error.response?.status === 401) {
            errorMsg = 'Your session has expired. Please login again.';
          } else if (error.message?.includes('No authentication token')) {
            errorMsg = 'Authentication failed. Please login again.';
          } else if (error.response?.data?.message) {
            errorMsg = error.response.data.message;
          }
          
          alert(errorMsg);
        }
      );
    }
  };

  return (
    <>
      <CoffeeMenu onAddToCart={addToCart} />
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