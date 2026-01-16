import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, CheckCircle2, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import axios from 'axios'; // Ensure you have axios installed

type Step = 'REQUEST' | 'VERIFY' | 'RESET' | 'SUCCESS';

// --- CONFIGURATION ---
// Set this to FALSE when your backend API is ready.
// Set to TRUE to test the UI flow right now without backend.
const USE_MOCK_SIMULATION = false; 
const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL || '/api';

const ForgotPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('REQUEST');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form Data
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // UI Toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // --- HANDLERS ---

  // Step 1: Request OTP
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (USE_MOCK_SIMULATION) {
        await new Promise(r => setTimeout(r, 1500)); // Fake delay
        console.log(`[MOCK] OTP sent to ${email}: 123456`);
      } else {
        // Real Backend Call
        await axios.post(`${API_BASE_URL}/auth/forgot-password-otp`, { email });
      }
      setStep('VERIFY');
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send OTP. User may not exist.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (USE_MOCK_SIMULATION) {
        await new Promise(r => setTimeout(r, 1000));
        if (otp !== '123456') throw new Error("Invalid OTP (Use 123456 for testing)");
      } else {
        // Real Backend Call
        // Backend should return a temporary 'resetToken' to authorize the password change
        await axios.post(`${API_BASE_URL}/auth/verify-otp`, { email, otp });
      }
      setStep('RESET');
    } catch (err: any) {
      setError(err.message || err.response?.data?.message || "Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    setError('');
    setLoading(true);

    try {
      if (USE_MOCK_SIMULATION) {
        await new Promise(r => setTimeout(r, 1500));
      } else {
        // Real Backend Call
        await axios.post(`${API_BASE_URL}/auth/reset-password`, { 
          email, 
          otp, // Or use a token returned from previous step
          newPassword 
        });
      }
      setStep('SUCCESS');
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  // --- RENDERERS ---

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
            <p className="text-gray-500 mb-8 font-medium">Enter your email and we'll send a 6-digit OTP code.</p>
            
            {error && <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex gap-2"><AlertCircle className="w-5 h-5"/>{error}</div>}
            
            <form className="space-y-6" onSubmit={handleRequestOtp}>
              <div className="group">
                <div className="relative flex items-center bg-[#FFF5E1] rounded-2xl border border-transparent group-focus-within:border-[#EC9706] group-focus-within:bg-white transition-all duration-200">
                  <div className="pl-5 text-[#4E342E]/40"><Mail className="w-5 h-5" /></div>
                  <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className="w-full py-5 px-4 bg-transparent outline-none text-gray-800 placeholder:text-gray-400 font-medium"/>
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-[#EC9706] text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-[#B57B24] transition-all transform active:scale-[0.98] flex justify-center">
                {loading ? <Loader2 className="animate-spin" /> : "Send OTP"}
              </button>
            </form>
          </div>
        );

      case 'VERIFY':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button onClick={() => setStep('REQUEST')} className="flex items-center gap-2 text-gray-400 hover:text-[#4E342E] mb-6 font-medium text-sm"><ArrowLeft className="w-4 h-4" /> Change Email</button>
            <h2 className="text-[32px] font-display text-[#4E342E] font-bold mb-4 tracking-tight">Verify OTP</h2>
            <p className="text-gray-500 mb-8 font-medium">Enter the 6-digit code sent to <span className="text-gray-800 font-bold">{email}</span></p>
            
            {error && <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex gap-2"><AlertCircle className="w-5 h-5"/>{error}</div>}

            <form className="space-y-6" onSubmit={handleVerifyOtp}>
              <div className="group">
                <div className="relative flex items-center bg-[#FFF5E1] rounded-2xl border border-transparent group-focus-within:border-[#EC9706] group-focus-within:bg-white transition-all duration-200">
                  <div className="pl-5 text-[#4E342E]/40"><ShieldCheck className="w-5 h-5" /></div>
                  <input required type="text" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="000000" className="w-full py-5 px-4 bg-transparent outline-none text-gray-800 placeholder:text-gray-400 font-medium tracking-[0.5em] text-center uppercase text-xl"/>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <button type="submit" disabled={loading} className="w-full bg-[#EC9706] text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-[#B57B24] transition-all transform active:scale-[0.98] flex justify-center">
                  {loading ? <Loader2 className="animate-spin" /> : "Verify Code"}
                </button>
                <button type="button" onClick={handleRequestOtp} className="text-sm text-[#EC9706] font-bold hover:underline">Resend Code</button>
              </div>
            </form>
          </div>
        );

      case 'RESET':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-[32px] font-display text-[#4E342E] font-bold mb-4 tracking-tight">New Password</h2>
            <p className="text-gray-500 mb-8 font-medium">Create a strong password to secure your account.</p>
            
            {error && <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex gap-2"><AlertCircle className="w-5 h-5"/>{error}</div>}

            <form className="space-y-4" onSubmit={handleResetPassword}>
              <div className="group">
                <div className="relative flex items-center bg-[#FFF5E1] rounded-2xl border border-transparent group-focus-within:border-[#EC9706] group-focus-within:bg-white transition-all duration-200">
                  <div className="pl-5 text-[#4E342E]/40"><Lock className="w-5 h-5" /></div>
                  <input required type={showPassword ? 'text' : 'password'} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" className="w-full py-5 px-4 bg-transparent outline-none text-gray-800 placeholder:text-gray-400 font-medium"/>
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="pr-5 text-gray-400 hover:text-gray-600">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
                </div>
              </div>

              <div className="group">
                <div className="relative flex items-center bg-[#FFF5E1] rounded-2xl border border-transparent group-focus-within:border-[#EC9706] group-focus-within:bg-white transition-all duration-200">
                  <div className="pl-5 text-[#4E342E]/40"><Lock className="w-5 h-5" /></div>
                  <input required type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm New Password" className="w-full py-5 px-4 bg-transparent outline-none text-gray-800 placeholder:text-gray-400 font-medium"/>
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="pr-5 text-gray-400 hover:text-gray-600">{showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
                </div>
              </div>

              <div className="pt-4">
                <button type="submit" disabled={loading} className="w-full bg-[#EC9706] text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-[#B57B24] transition-all transform active:scale-[0.98] flex justify-center">
                  {loading ? <Loader2 className="animate-spin" /> : "Update Password"}
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
            <p className="text-gray-500 mb-10 font-medium">Your password has been updated successfully.</p>
            <Link to="/login" className="w-full bg-[#EC9706] text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-[#B57B24] transition-all transform active:scale-[0.98] block text-center">
              Back to Sign In
            </Link>
          </div>
        );
    }
  };

  return renderStep();
};

export default ForgotPasswordForm;