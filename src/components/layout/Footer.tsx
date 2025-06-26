import React from 'react';
import { Link } from 'react-router-dom';
import { Mountain, Twitter, Facebook, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/40 border-t">
      <div className="container py-12 text-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4 col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <Mountain className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">Incredible India</span>
            </Link>
            <p className="text-muted-foreground">
              Your one-stop platform for planning unforgettable journeys across India.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
              <Link to="/packages" className="text-muted-foreground hover:text-primary transition-colors">Packages</Link>
              <Link to="/trip-cost-estimator" className="text-muted-foreground hover:text-primary transition-colors">Cost Estimator</Link>
              <Link to="/booking" className="text-muted-foreground hover:text-primary transition-colors">My Bookings</Link>
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/#about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link>
              <Link to="/#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
              <Link to="/#faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link>
              <Link to="/#privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
            </nav>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Follow Us</h3>
            <div className="flex items-center gap-4">
              <Link to="/#twitter" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link to="/#facebook" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link to="/#instagram" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-muted-foreground">
            &copy; {currentYear} Incredible India Travel Planner. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <Link to="/#terms" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;