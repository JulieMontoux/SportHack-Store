import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [vulnerable, setVulnerable] = useState(false);

  useEffect(() => {
    const storedMode = localStorage.getItem('mode');
    if (storedMode === 'vulnerable') setVulnerable(true);
  }, []);

  const toggleMode = () => {
    const newMode = vulnerable ? 'secure' : 'vulnerable';
    setVulnerable(!vulnerable);
    localStorage.setItem('mode', newMode);
    window.location.reload(); // optionnel pour simuler un rechargement
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <span className="navbar-brand">🏋️ SportH@ck Store</span>
      <div className="ms-auto d-flex align-items-center">
        <span className="text-white me-2">Mode : {vulnerable ? 'Vulnérable' : 'Sécurisé'}</span>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="vulnSwitch"
            checked={vulnerable}
            onChange={toggleMode}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
