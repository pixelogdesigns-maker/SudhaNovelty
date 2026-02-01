import { Link, useLocation } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Toys', path: '/toys' },
    { name: 'Our Videos', path: '/#videos' },
    { name: 'Visit Our Store', path: '/visit' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-[160rem] mx-auto px-6 py-2">
        {/* Increased height to h-20 (mobile) and h-24 (desktop) to fit the logo */}
        <div className="flex items-center justify-between h-20 md:h-24">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center h-full py-2">
            <Image
              src="https://static.wixstatic.com/media/b9ec8c_8a4424cbc7cf48ea8968507b4cdb3d88~mv2.png"
              // We increase the width/height container constraints to let object-contain do its work
              width={180} 
              height={90}
              className="h-full w-auto object-contain"
              originWidth={233}
              originHeight={196}
              alt="Sudha Novelties"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-paragraph text-base transition-colors ${
                  isActive(link.path)
                    ? 'text-primary font-semibold'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-2 pb-4 flex flex-col gap-4 border-t border-gray-100 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-paragraph text-base px-2 py-1 rounded-md transition-colors ${
                  isActive(link.path)
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-foreground hover:bg-gray-50 hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}