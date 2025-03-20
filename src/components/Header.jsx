import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo2 from '../assets/logo2.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Check UV', href: '/check-uv' },
    // { name: 'Damages and Tips', href: '/damages-tips' },
    // { name: 'Product', href: '/product' },
  ];

  // Function to check if a nav item is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16">
          {/* Logo - Left side */}
          <div className="flex-shrink-0 flex items-center mr-auto">
            <Link to="/" className="flex items-center">
              <img
                className="h-16 w-auto"
                src={logo2}
                alt="Logo"
              />
              <span className="ml-2 text-xl font-bold text-yellow-400 flex items-center self-center">SunSmartAussie</span>
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center mx-auto">
            <nav className="flex space-x-10">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md font-medium transition duration-300 ease-in-out border-b-2 
                    ${isActive(item.href)
                      ? 'text-yellow-600 bg-yellow-50 border-yellow-500'
                      : 'text-gray-800 hover:text-yellow-500 hover:bg-yellow-100 border-transparent hover:border-yellow-500'
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Mobile menu button - Right side */}
          <div className="flex md:hidden items-center ml-auto">
            <button
              onClick={toggleMenu}
              className="text-gray-800 hover:text-yellow-500 focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-yellow-50">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out border-l-4 
                  ${isActive(item.href)
                    ? 'text-yellow-700 bg-yellow-100 border-yellow-500'
                    : 'text-gray-800 hover:text-yellow-700 hover:bg-yellow-100 border-transparent hover:border-yellow-500'
                  }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;