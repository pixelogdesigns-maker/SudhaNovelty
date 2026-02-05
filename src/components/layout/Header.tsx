import { Image } from '@/components/ui/image';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

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
      <div className="max-w-[120rem] mx-auto px-4 md:px-6">
        {/* Container Height: Fixed to prevent logo resizing */}
        <div className="flex items-center justify-between h-16 md:h-20 transition-all duration-300">

          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2">

            {/* --- MOBILE LOGO --- */}
            {/* Fixed size prevents resizing when navigating between pages */}
            <Image
              src="https://static.wixstatic.com/media/b9ec8c_8a4424cbc7cf48ea8968507b4cdb3d88~mv2.png"
              width={60}
              height={60}
              className="md:hidden object-contain border-black border border-none"
              originWidth={533}
              originHeight={533}
              alt="Sudha Novelties"
            />

            {/* --- MOBILE BRAND TEXT --- */}
            {/* --- DESKTOP LOGO --- */}
            <Image
              src="https://static.wixstatic.com/media/b9ec8c_2c707b58db4c403ea854846b7dc81a3a~mv2.png"
              width={140}
              height={60}
              className="hidden md:block object-contain"
              originWidth={533}
              originHeight={196}
              alt="Sudha Novelties"
            />
          <div className="md:hidden flex flex-col justify-center">
              <span className="font-bold text-primary tracking-wider font-poppins-semibold text-3xl">
              </span>
              <span className="font-bold text-primary tracking-wider font-poppins-semibold text-xl">
                SUDHA NOVELTIES
              </span>
            </div>

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
          <nav className="md:hidden pb-4 flex flex-col gap-4 border-t border-gray-100 pt-4 px-2">
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
