import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const [mode, setMode] = useState(
    localStorage.getItem("mode") || "vulnerable"
  );
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  // Met à jour le mode et panier selon la route
  useEffect(() => {
    setMode(localStorage.getItem("mode") || "vulnerable");
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cartData.length);
  }, [location]);

  // Met à jour l'utilisateur indépendamment
  useEffect(() => {
    const userData = localStorage.getItem("user");
    setUser(userData ? JSON.parse(userData) : null);
  }, [location, localStorage.getItem("user")]);

  const toggleMode = () => {
    const newMode = mode === "vulnerable" ? "securise" : "vulnerable";
    localStorage.setItem("mode", newMode);
    setMode(newMode);
    window.location.reload(); // recharge pour backend
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null); // ← très important
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-2 shadow-sm">
      <Link to="/" className="navbar-brand fs-4 fw-bold text-warning">
        🏀 SportH@ck Store
      </Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item mx-2">
            <Link to="/products" className="nav-link">
              Produits
            </Link>
          </li>
          <li className="nav-item mx-2">
            <Link to="/comments" className="nav-link">
              Commentaires
            </Link>
          </li>
          <li className="nav-item mx-2">
            <Link to="/scores" className="nav-link">
              Scores
            </Link>
          </li>
          {user?.role === "admin" && (
            <li className="nav-item mx-2">
              <Link to="/admin" className="nav-link text-danger">
                Admin
              </Link>
            </li>
          )}
        </ul>

        <div className="d-flex align-items-center gap-3">
          <button
            className={`btn btn-sm fw-bold ${
              mode === "vulnerable" ? "btn-danger" : "btn-success"
            }`}
            onClick={toggleMode}
          >
            Mode : {mode.toUpperCase()}
          </button>

          <Link to="/cart" className="btn btn-outline-light position-relative">
            <FaShoppingCart />
            {cartCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <>
              <Link to="/profile" className="btn btn-outline-light">
                <FaUser className="me-1" /> {user.email}
              </Link>
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                <FaSignOutAlt />
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-outline-light">
              Connexion
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
