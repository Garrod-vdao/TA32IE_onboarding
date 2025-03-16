import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import UVIndexPage from './pages/UVIndexPage';

function App() {
  return (
    <Router>
<div className="App flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/check-uv" element={<UVIndexPage />} />
            <Route path="/damages-tips" element={<Navigate to="#" />} /> 
            <Route path="/product" element={<Navigate to="#" />} /> 
            <Route path="*" element={<Navigate to="/" />} /> 
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;