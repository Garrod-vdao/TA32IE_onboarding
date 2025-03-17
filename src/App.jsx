import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import UVIndexPage from './pages/UVIndexPage';

function App() {
  // Add this useEffect hook at the beginning of your App component
  useEffect(() => {
    // Add CSP meta tag dynamically
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; connect-src 'self' https://api.openweathermap.org";
    document.head.appendChild(meta);
    
    // Prevent clickjacking
    const frameOptions = document.createElement('meta');
    frameOptions.httpEquiv = 'X-Frame-Options';
    frameOptions.content = 'DENY';
    document.head.appendChild(frameOptions);
    
    // XSS protection
    const xssProtection = document.createElement('meta');
    xssProtection.httpEquiv = 'X-XSS-Protection';
    xssProtection.content = '1; mode=block';
    document.head.appendChild(xssProtection);
    
    // Clean up function to remove meta tags when component unmounts
    return () => {
      document.head.removeChild(meta);
      document.head.removeChild(frameOptions);
      document.head.removeChild(xssProtection);
    };
  }, []);

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
