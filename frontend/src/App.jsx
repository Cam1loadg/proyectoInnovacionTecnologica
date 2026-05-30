import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/seller/Login';
import Onboarding from './pages/seller/Onboarding';
import Returns from './pages/seller/Returns';
import ReturnDetail from './pages/seller/ReturnDetail';
import Alerts from './pages/seller/Alerts';
import Catalog from './pages/seller/Catalog';
import ProductDetail from './pages/seller/ProductDetail';

function PrivateRoute({ children }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/seller/login" replace />;
  return children;
}

function StoreRoute({ children }) {
  const { token, hasStore } = useAuth();
  if (!token) return <Navigate to="/seller/login" replace />;
  if (!hasStore) return <Navigate to="/seller/onboarding" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/seller/login" replace />} />
          <Route path="/seller/login" element={<Login />} />
          <Route path="/seller/onboarding" element={
            <PrivateRoute><Onboarding /></PrivateRoute>
          } />
          <Route path="/seller/returns" element={
            <StoreRoute><Returns /></StoreRoute>
          } />
          <Route path="/seller/returns/:id" element={
            <StoreRoute><ReturnDetail /></StoreRoute>
          } />
          <Route path="/seller/alerts" element={
            <StoreRoute><Alerts /></StoreRoute>
          } />
          <Route path="/seller/catalog" element={
            <StoreRoute><Catalog /></StoreRoute>
          } />
          <Route path="/seller/catalog/:id" element={
            <StoreRoute><ProductDetail /></StoreRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
