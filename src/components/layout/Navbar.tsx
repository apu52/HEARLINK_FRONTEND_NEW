
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Features", href: "/#features" },
    { name: "Gallery", href: "/#gallery" },
    { name: "Pricing", href: "/#pricing" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-sm shadow-sm py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 lg:px-8">
        <Link to="/" className="flex items-center">
          <img 
            src="/placeholder.svg" 
            alt="HearLink Logo" 
            className="h-10 w-auto" 
          />
          <span className="ml-2 text-2xl font-bold text-hearlink-900">HearLink</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="px-4 py-2 text-hearlink-800 hover:text-hearlink-600 rounded-md transition-colors text-sm font-medium"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login">
            <Button variant="outline" className="border-hearlink-200">
              Log In
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-hearlink-600 hover:bg-hearlink-700">
              Sign Up
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-md text-hearlink-800"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="px-4 py-3 text-hearlink-800 hover:bg-hearlink-50 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 flex flex-col space-y-3">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-hearlink-200">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-hearlink-600 hover:bg-hearlink-700">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
