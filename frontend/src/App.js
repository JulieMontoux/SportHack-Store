import React from 'react';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <LoginForm />
      </div>
    </>
  );
}

export default App;
