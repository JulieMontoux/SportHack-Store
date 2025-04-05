import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import ModeBadge from "./components/ModeBadge";
import ScoreProgress from "./components/ScoreProgress";
import ToastAlert from "./components/ToastAlert";
import UserBadge from "./components/UserBagde";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import AdminProductsPage from "./pages/AdminProductsPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import CommentsPage from "./pages/CommentsPage";
import ProfilePage from "./pages/ProfilePage";
import ScorePage from "./pages/ScorePage";
import NotFound from "./pages/NotFound";
import { ModeProvider } from "./context/ModeContext";

function App() {
  return (
    <ModeProvider>
      <Router>
        <AppNavbar />
        <Routes>
          <Route path="/SportHack-Store/" element={<HomePage />} />
          <Route path="/SportHack-Store/login" element={<LoginForm />} />
          <Route path="/SportHack-Store/admin" element={<AdminPage />} />
          <Route
            path="/SportHack-Store/admin/products"
            element={<AdminProductsPage />}
          />
          <Route
            path="/SportHack-Store/admin/orders"
            element={<AdminOrdersPage />}
          />
          <Route
            path="/SportHack-Store/products"
            element={<ProductListPage />}
          />
          <Route
            path="/SportHack-Store/product/:id"
            element={<ProductDetailPage />}
          />
          <Route path="/SportHack-Store/product" element={<ProductPage />} />
          <Route path="/SportHack-Store/cart" element={<CartPage />} />
          <Route
            path="/SportHack-Store/orders"
            element={<OrderHistoryPage />}
          />
          <Route path="/SportHack-Store/comments" element={<CommentsPage />} />
          <Route path="/SportHack-Store/profile" element={<ProfilePage />} />
          <Route path="/SportHack-Store/scores" element={<ScorePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ModeProvider>
  );
}

export default App;
