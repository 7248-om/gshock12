import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home after 3 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream to-cream-dark p-4">
      <div className="text-center max-w-md">
        {/* Success Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 animate-ping">
              <CheckCircle size={120} className="text-gold opacity-75" />
            </div>
            <CheckCircle size={120} className="text-gold relative" />
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-4xl font-black uppercase tracking-widest mb-4 text-[#3E2723]">
          Order Placed!
        </h1>

        <p className="text-lg text-gray-600 mb-2">
          Payment Successful
        </p>

        <p className="text-sm text-gray-500 mb-8">
          Thank you for your purchase. Your order has been confirmed.
        </p>

        {/* Countdown */}
        <div className="bg-white border-2 border-gold rounded-lg p-6 mb-6">
          <p className="text-sm text-gray-500 mb-2">Redirecting to home in</p>
          <div className="text-4xl font-black text-gold countdown">
            <span id="countdown">3</span>s
          </div>
        </div>

        {/* Manual Navigation Button */}
        <button
          onClick={() => navigate('/')}
          className="bg-[#3E2723] text-white py-4 px-8 text-sm font-black uppercase tracking-widest hover:bg-gold hover:text-[#3E2723] transition-all duration-300 rounded-lg w-full"
        >
          Back to Home
        </button>

        {/* Order Details Placeholder */}
        <div className="mt-8 pt-8 border-t border-gray-300">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">
            Your order details
          </p>
          <p className="text-sm text-gray-600">
            A confirmation email has been sent to your registered email address.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes countdown {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
        .countdown {
          animation: countdown 1s infinite;
        }
      `}</style>
    </div>
  );
};

export default PaymentSuccess;
