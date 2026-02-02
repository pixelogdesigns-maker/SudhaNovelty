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
    <header className="sticky top-0 z-50 bg-[#FDF6F0] shadow-md border-b-2 border-primary">
      <div className="max-w-[160rem] mx-auto px-6">
        {/* Container Height: h-16 (64px) mobile, h-20 (80px) tablet, h-24 (96px) desktop. */}
        <div className="flex items-center justify-between h-16 sm:h-20 md:h-24 transition-all duration-300">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center h-full">
            
            {/* --- MOBILE LOGO (Updated Link) --- */}
            {/* object-contain prevents the "cut off" issue by ensuring the whole image fits inside the height */}
            <Image
              src="https://static.wixstatic.com/media/b9ec8c_8a4424cbc7cf48ea8968507b4cdb3d88~mv2.png" 
              width={220} 
              height={100}
              className="h-[85%] w-auto md:hidden object-contain" 
              originWidth={533}
              originHeight={533} // Assuming square-ish for the new logo based on the upload
              alt="Sudha Novelties"
            />

            {/* --- DESKTOP LOGO (Original) --- */}
            <Image
              src="https://static.wixstatic.com/media/b9ec8c_2c707b58db4c403ea854846b7dc81a3a~mv2.png"
              width={220} 
              height={100}
              className="hidden md:block h-[80%] w-auto object-contain"
              originWidth={533}
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
                className={`font-paragraph text-base font-semibold transition-colors ${
                  isActive(link.path)
                    ? 'text-primary'
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
          <nav className="md:hidden pb-4 flex flex-col gap-4 border-t border-gray-100 pt-4">
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