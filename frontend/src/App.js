import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
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
      <Router basename="/SportHack-Store">
        <AppNavbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route
            path="/admin/products"
            element={<AdminProductsPage />}
          />
          <Route
            path="/admin/orders"
            element={<AdminOrdersPage />}
          />
          <Route
            path="/products"
            element={<ProductListPage />}
          />
          <Route
            path="/product/:id"
            element={<ProductDetailPage />}
          />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/orders"
            element={<OrderHistoryPage />}
          />
          <Route path="/comments" element={<CommentsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/scores" element={<ScorePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ModeProvider>
  );
}

export default App;
