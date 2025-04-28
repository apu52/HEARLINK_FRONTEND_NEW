
import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-hearlink-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <img src="/placeholder.svg" alt="HearLink Logo" className="h-10 w-auto mr-3" />
              <h3 className="text-2xl font-bold">HearLink</h3>
            </div>
            <p className="text-gray-300 mb-6">
              Empowering educators and students through accessible learning solutions for the hearing impaired.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="bg-hearlink-800 p-2 rounded-full hover:bg-hearlink-700 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="https://twitter.com" className="bg-hearlink-800 p-2 rounded-full hover:bg-hearlink-700 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="https://instagram.com" className="bg-hearlink-800 p-2 rounded-full hover:bg-hearlink-700 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://linkedin.com" className="bg-hearlink-800 p-2 rounded-full hover:bg-hearlink-700 transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-hearlink-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/#about" className="text-gray-300 hover:text-hearlink-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/#features" className="text-gray-300 hover:text-hearlink-400 transition-colors">Features</Link>
              </li>
              <li>
                <Link to="/#pricing" className="text-gray-300 hover:text-hearlink-400 transition-colors">Pricing</Link>
              </li>
              <li>
                <Link to="/#contact" className="text-gray-300 hover:text-hearlink-400 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-hearlink-400 transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-hearlink-400 transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-300 hover:text-hearlink-400 transition-colors">Support</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-hearlink-400 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-hearlink-400 transition-colors">Terms of Service</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-hearlink-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">123 Education St, Learning City, 45678</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-hearlink-400 flex-shrink-0" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 h-5 w-5 text-hearlink-400 flex-shrink-0" />
                <span className="text-gray-300">contact@hearlink.edu</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-hearlink-800 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} HearLink. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-gray-400 hover:text-gray-300 text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-gray-300 text-sm">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-gray-400 hover:text-gray-300 text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
