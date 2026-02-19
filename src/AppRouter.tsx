import React from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./Layout/AppLayout";
import PrivateRoute from "./routes/PrivateRoute";
import LandingPage from "./page/LandingPage/LandingPage";
import LoginPage from "./page/LoginPage/LoginPage";
import RegisterPage from "./page/RegisterPage/RegisterPage";
import ProductDetailPage from "./page/ProductDetailPage/ProductDetailPage";
import CartPage from "./page/CartPage/CartPage";
import PaymentPage from "./page/PaymentPage/PaymentPage";
import OrderCompletePage from "./page/OrderCompletePage/OrderCompletePage";
import MyPage from "./page/MyPage/MyPage";
import AdminProductPage from "./page/AdminProductPage/AdminProductPage";
import AdminOrderPage from "./page/AdminOrderPage/AdminOrderPage";
import NotFoundPage from "./page/NotFoundPage/NotFoundPage";

const AppRouter: React.FC = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />

        <Route element={<PrivateRoute permissionLevel="customer" />}>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment/success" element={<OrderCompletePage />} />
          <Route path="/account/purchase" element={<MyPage />} />
        </Route>

        <Route element={<PrivateRoute permissionLevel="admin" />}>
          <Route path="/admin/product" element={<AdminProductPage />} />
          <Route path="/admin/order" element={<AdminOrderPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppLayout>
  );
};

export default AppRouter;
