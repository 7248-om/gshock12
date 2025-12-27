import { CoffeeMenu } from "../components/menu/CoffeeMenu";
import { CoffeeFAQ } from "../components/menu/CoffeeFAQ";
import { CartDrawer } from "../components/cart/CartDrawer";
import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
  } = useCart();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate(user ? "/payment" : "/login");
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
