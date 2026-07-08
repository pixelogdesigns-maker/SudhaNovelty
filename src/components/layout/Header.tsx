import { Image } from '@/components/ui/image';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ModernCart from '@/components/ecom/ModernCart';
import { useCart } from '@/integrations';

function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount, actions } = useCart();

  // Initialize Meta Pixel - optimized to not block rendering
  useEffect(() => {
    // Use requestIdleCallback for non-blocking Meta Pixel loading
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        // Load Meta Pixel script
        const script = document.createElement('script');
        script.innerHTML = `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?\n          n.callMethod.apply(n,arguments):n.queue.push(arguments)};\n          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';\n          n.queue=[];t=b.createElement(e);t.async=!0;\n          t.src=v;s=b.getElementsByTagName(e)[0];\n          s.parentNode.insertBefore(t,s)}(window, document,'script',\n          'https://connect.facebook.net/en_US/fbevents.js');\n          fbq('init', '5242827002609560');\n          fbq('track', 'PageView');\n        `;
        document.head.appendChild(script);

        // Add noscript image
        const noscript = document.createElement('noscript');
        const img = document.createElement('img');
        img.height = 1;
        img.width = 1;
        img.style.display = 'none';
        img.src = 'https://www.facebook.com/tr?id=5242827002609560&ev=PageView&noscript=1';
        noscript.appendChild(img);
        document.head.appendChild(noscript);
      });
    } else {
      // Fallback for browsers without requestIdleCallback
      const timer = setTimeout(() => {
        const script = document.createElement('script');
        script.innerHTML = `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?\n          n.callMethod.apply(n,arguments):n.queue.push(arguments)};\n          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';\n          n.queue=[];t=b.createElement(e);t.async=!0;\n          t.src=v;s=b.getElementsByTagName(e)[0];\n          s.parentNode.insertBefore(t,s)}(window, document,'script',\n          'https://connect.facebook.net/en_US/fbevents.js');\n          fbq('init', '5242827002609560');\n          fbq('track', 'PageView');\n        `;
        document.head.appendChild(script);

        const noscript = document.createElement('noscript');
        const img = document.createElement('img');
        img.height = 1;
        img.width = 1;
        img.style.display = 'none';
        img.src = 'https://www.facebook.com/tr?id=5242827002609560&ev=PageView&noscript=1';
        noscript.appendChild(img);
        document.head.appendChild(noscript);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Toys', path: '/toys' },
    { name: 'Our Videos', path: '/#videos' },
    { name: 'Visit Our Store', path: '/visit' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Memoize cart toggle to prevent unnecessary re-renders
  const handleCartToggle = useCallback(() => {
    actions.toggleCart();
  }, [actions]);

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
              className="md:hidden object-contain"
              originWidth={533}
              originHeight={533}
              alt="Sudha Novelties"
            />

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

          {/* Right Section: Cart Icon + Mobile Menu Button */}
          <div className="flex items-center gap-4">
            {/* Cart Icon */}
            <button
              onClick={handleCartToggle}
              className="relative p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={24} />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
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

export function HeaderWithCart() {
  return (
    <>
      <Header />
      <ModernCart />
    </>
  );
}

export { Header };
export default HeaderWithCart;
