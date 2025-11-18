import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Music } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-br from-purple-600 to-orange-500 w-12 h-12 rounded-xl flex items-center justify-center">
                <Music className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold">GigGH</div>
                <div className="text-xs text-gray-400">Connecting talent with celebrations</div>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Easing entertainment booking by connecting talented Ghanaian performers directly with people hosting birthdays, weddings, anniversaries, and corporate events.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/browse" className="text-gray-400 hover:text-white transition-colors">
                  Browse Performers
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-400 hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* For Performers */}
          <div>
            <h3 className="text-lg font-bold mb-4">For Performers</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/signup" className="text-gray-400 hover:text-white transition-colors">
                  Join as Performer
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Performer Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Pricing Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 GigGH. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
