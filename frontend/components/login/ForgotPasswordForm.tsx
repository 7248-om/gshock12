
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, CheckCircle2, ArrowLeft } from 'lucide-react';

type Step = 'REQUEST' | 'VERIFY' | 'RESET' | 'SUCCESS';

const ForgotPasswordForm: React.FC = () => {
  const [step, setStep] = useState<Step>('REQUEST');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'REQUEST') setStep('VERIFY');
    else if (step === 'VERIFY') setStep('RESET');
    else if (step === 'RESET') setStep('SUCCESS');
  };

  const renderStep = () => {
    switch (step) {
      case 'REQUEST':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <Link to="/login" className="flex items-center gap-2 text-gray-400 hover:text-[#4E342E] mb-6 font-medium text-sm">
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
            </Link>
            <h2 className="text-[32px] font-display text-[#4E342E] font-bold mb-4 tracking-tight">Recover Account</h2>
            <p className="text-gray-500 mb-8 font-medium">Enter your email and we'll send a fresh OTP to your inbox.</p>
            
            <form className="space-y-6" onSubmit={handleNext}>
              <div className="group">
                <div className="relative flex items-center bg-[#FFF5E1] rounded-2xl border border-transparent group-focus-within:border-[#EC9706] group-focus-within:bg-white transition-all duration-200">
                  <div className="pl-5 text-[#4E342E]/40">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input 
                    required
                    type="email" 
                    placeholder="Email Address"
                    className="w-full py-5 px-4 bg-transparent outline-none text-gray-800 placeholder:text-gray-400 font-medium"
                  />
                </div>
              </div>
              <button 
                type="submit"
                className="w-full bg-[#EC9706] text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-[#B57B24] transition-all transform active:scale-[0.98]"
              >
                Send OTP
              </button>
            </form>
          </div>
        );

      case 'VERIFY':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-[32px] font-display text-[#4E342E] font-bold mb-4 tracking-tight">Verify Roast</h2>
            <p className="text-gray-500 mb-8 font-medium">Check your inbox for a 6-digit code. Don't let it get cold!</p>
            
            <form className="space-y-6" onSubmit={handleNext}>
              <div className="group">
                <div className="relative flex items-center bg-[#FFF5E1] rounded-2xl border border-transparent group-focus-within:border-[#EC9706] group-focus-within:bg-white transition-all duration-200">
                  <div className="pl-5 text-[#4E342E]/40">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <input 
                    required
                    type="text" 
                    maxLength={6}
                    placeholder="000000"
                    className="w-full py-5 px-4 bg-transparent outline-none text-gray-800 placeholder:text-gray-400 font-medium tracking-[0.5em] text-center uppercase"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <button 
                  type="submit"
                  className="w-full bg-[#EC9706] text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-[#B57B24] transition-all transform active:scale-[0.98]"
                >
                  Verify Now
                </button>
                <button 
                  type="button"
                  onClick={() => setStep('REQUEST')}
                  className="text-sm text-[#EC9706] font-bold hover:underline"
                >
                  Request a New Code
                </button>
              </div>
            </form>
          </div>
        );

      case 'RESET':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-[32px] font-display text-[#4E342E] font-bold mb-4 tracking-tight">New Password</h2>
            <p className="text-gray-500 mb-8 font-medium">Create a strong password to protect your account.</p>
            
            <form className="space-y-4" onSubmit={handleNext}>
              <div className="group">
                <div className="relative flex items-center bg-[#FFF5E1] rounded-2xl border border-transparent group-focus-within:border-[#EC9706] group-focus-within:bg-white transition-all duration-200">
                  <div className="pl-5 text-[#4E342E]/40">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input 
                    required
                    type={showPassword ? 'text' : 'password'} 
                    placeholder="New Password"
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
              </div>

              <div className="group">
                <div className="relative flex items-center bg-[#FFF5E1] rounded-2xl border border-transparent group-focus-within:border-[#EC9706] group-focus-within:bg-white transition-all duration-200">
                  <div className="pl-5 text-[#4E342E]/40">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input 
                    required
                    type={showConfirmPassword ? 'text' : 'password'} 
                    placeholder="Confirm New Password"
                    className="w-full py-5 px-4 bg-transparent outline-none text-gray-800 placeholder:text-gray-400 font-medium"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="pr-5 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full bg-[#EC9706] text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-[#B57B24] transition-all transform active:scale-[0.98]"
                >
                  Save Password
                </button>
              </div>
            </form>
          </div>
        );

      case 'SUCCESS':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center flex flex-col items-center py-8">
            <div className="w-20 h-20 bg-[#FFF5E1] rounded-full flex items-center justify-center mb-8">
              <CheckCircle2 className="w-12 h-12 text-[#EC9706]" />
            </div>
            <h2 className="text-[32px] font-display text-[#4E342E] font-bold mb-4 tracking-tight">Success!</h2>
            <p className="text-gray-500 mb-10 font-medium">Your password has been updated. You're all set to get back to the coffee.</p>
            
            <Link 
              to="/login"
              className="w-full bg-[#EC9706] text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-[#B57B24] transition-all transform active:scale-[0.98] block text-center"
            >
              Back to Sign In
            </Link>
          </div>
        );
    }
  };

  return renderStep();
};

export default ForgotPasswordForm;
