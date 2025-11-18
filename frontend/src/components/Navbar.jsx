import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Music, Sparkles, Smile, Search, LogIn } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/browse', label: 'Browse Performers' },
    { path: '/how-it-works', label: 'How It Works' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="bg-white border-b-2 border-gray-200 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-purple-600 to-orange-500 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
              <Music className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">GigGH</div>
              <div className="text-xs text-gray-500">Connecting talent with celebrations</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold transition-colors ${
                  isActive(link.path)
                    ? 'text-purple-600'
                    : 'text-gray-700 hover:text-purple-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Search size={20} />
            </button>
            <Link to="/login" className="text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors">
              Login
            </Link>
            <Link to="/signup" className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-lg font-semibold ${
                  isActive(link.path)
                    ? 'bg-purple-50 text-purple-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-200 space-y-2">
              <Link to="/login" className="block w-full px-4 py-2 text-left text-gray-700 font-semibold hover:bg-gray-50 rounded-lg">
                Login
              </Link>
              <Link to="/signup" className="block w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-lg font-semibold text-center">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
