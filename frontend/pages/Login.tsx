import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthLayout from '../components/login/AuthLayout';
import LoginForm from '../components/login/LoginForm';
import SignupForm from '../components/login/SignupForm';
import ForgotPasswordForm from '../components/login/ForgotPasswordForm';

const Login: React.FC = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        {/* The index route renders the main login form at /login */}
        <Route index element={<LoginForm />} /> 
        <Route path="signup" element={<SignupForm />} />
        <Route path="forgot-password" element={<ForgotPasswordForm />} />
      </Route>
    </Routes>
  );
};

export default Login;