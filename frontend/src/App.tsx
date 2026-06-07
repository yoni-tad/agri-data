import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import VendorHome from "./pages/vendor/HomeDashboard";
import NewBatch from "./pages/vendor/NewBatch";
import ReviewScreen from "./pages/vendor/ReviewScreen";
import BatchHistory from "./pages/vendor/BatchHistory";
import BatchDetails from "./pages/vendor/BatchDetails";
import AdminDashboard from "./pages/admin/AdminDashboard";
import MainLayout from "./layouts/MainLayout";
import About from "./pages/vendor/About";
import ExportPage from "./pages/admin/ExportPage";

// Protected Route wrapper
const ProtectedRoute = ({ children, role }: { children: React.ReactNode, role?: 'admin' | 'vendor' }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Vendor Routes */}
        <Route path="/" element={
          <ProtectedRoute role="vendor">
            <MainLayout isAdmin={false} />
          </ProtectedRoute>
        }>
          <Route index element={<VendorHome />} />
          <Route path="about" element={<About />} />
          <Route path="new-batch" element={<NewBatch />} />
          <Route path="review-batch" element={<ReviewScreen />} />
          <Route path="history" element={<BatchHistory />} />
          <Route path="batch/:id" element={<BatchDetails />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute role="admin">
            <MainLayout isAdmin={true} />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="export" element={<ExportPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
