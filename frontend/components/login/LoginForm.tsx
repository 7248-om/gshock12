
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-[40px] font-display text-[#4E342E] font-bold mb-10 tracking-tight">Welcome Back</h2>
      
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="group">
          <div className="relative flex items-center bg-[#FFF5E1] rounded-2xl border border-transparent group-focus-within:border-[#EC9706] group-focus-within:bg-white transition-all duration-200">
            <div className="pl-5 text-[#4E342E]/40">
              <Mail className="w-5 h-5" />
            </div>
            <input 
              type="email" 
              placeholder="Email Address"
              className="w-full py-5 px-4 bg-transparent outline-none text-gray-800 placeholder:text-gray-400 font-medium"
            />
          </div>
        </div>

        <div className="group">
          <div className="relative flex items-center bg-[#FFF5E1] rounded-2xl border border-transparent group-focus-within:border-[#EC9706] group-focus-within:bg-white transition-all duration-200">
            <div className="pl-5 text-[#4E342E]/40">
              <Lock className="w-5 h-5" />
            </div>
            <input 
              type={showPassword ? 'text' : 'password'} 
              placeholder="Password"
              className="w-full py-5 px-4 bg-transparent outline-none text-gray-800 placeholder:text-gray-400 font-medium"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="pr-5 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <div className="mt-3">
            <Link to="forgot-password" size="sm" className="text-sm text-[#EC9706] font-semibold hover:underline">Forgot your password?</Link>
          </div>
        </div>

        <div className="pt-8 flex flex-col items-center">
           <p className="text-sm text-gray-600 mb-6 font-medium">
            New to the cafe? <Link to="signup" className="text-[#EC9706] font-bold hover:underline">Join Us</Link>
          </p>
          <button 
            type="submit"
            className="w-full bg-[#EC9706] text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-[#B57B24] transition-all transform active:scale-[0.98]"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
