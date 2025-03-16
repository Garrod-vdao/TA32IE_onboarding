import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Check UV', href: '/check-uv' },
    { name: 'Damages and Tips', href: '/damages-tips' },
    { name: 'Product', href: '/product' },
  ];

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Website Name */}
          <div className="mb-6 md:mb-0">
            <Link to="/" className="text-2xl font-bold text-yellow-400 hover:text-yellow-300">
              SunSmartAussie
            </Link>
            <p className="text-gray-400 mt-2">Helping you stay safe in the sun</p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-300 hover:text-yellow-400 transition duration-300"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;