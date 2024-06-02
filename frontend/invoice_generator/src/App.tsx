import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import AddProductPage from './pages/AddProduct'
import Generate from './pages/Generate';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/add-product" element={<AddProductPage/>} />
        <Route path="/generate" element={<Generate/>} />
      </Routes>
    </Router>
  );
};

export default App;
