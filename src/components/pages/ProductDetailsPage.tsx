import { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { Toys, StoreInformation } from '@/entities';
import { Image } from '@/components/ui/image';
import { MessageCircle, ArrowLeft, ChevronLeft, ChevronRight, Check, ShoppingCart } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppFloatingButton from '@/components/ui/WhatsAppFloatingButton';
import { generateWhatsAppUrl } from '@/lib/whatsapp-utils';
import { SEOHelmet } from '@/components/SEOHelmet';
import { useNavigation } from '@/components/NavigationContext';
import RazorpayCheckout from '@/components/ecom/RazorpayCheckout';

export default function ProductDetailsPage() {
  const { toyId } = useParams<{ toyId: string }>();
  const [searchParams, setSearchParams] = useSearchParams(); // Added setSearchParams to update URL
  const navigate = useNavigate();
  const Navigation = useNavigation();
  
  const [toy, setToy] = useState<Toys | null>(null);
  const [storeInfo, setStoreInfo] = useState<StoreInformation | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Swipe gestures state
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // 1. GET COLOR FROM URL (Default to first available if none)
  const requestedColor = searchParams.get('color');

  useEffect(() => {
    const fetchData = async () => {
      if (!toyId) return;

      try {
        const toyData = await BaseCrudService.getById<Toys>('toys', toyId);
        setToy(toyData);

        const { items: storeItems } = await BaseCrudService.getAll<StoreInformation>('storeinformation');
        if (storeItems && storeItems.length > 0) {
          setStoreInfo(storeItems[0]);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toyId]);

  // --- HELPER: Get all images ---
  let images: string[] = [];
  if (toy) {
    if (toy.productGallery && Array.isArray(toy.productGallery) && toy.productGallery.length > 0) {
      images = toy.productGallery.map((item: any) => item.src || item.url || item);
    } else if (toy.productImages1 && Array.isArray(toy.productImages1) && toy.productImages1.length > 0) {
      images = toy.productImages1.map((item: any) => item.src || item.url || item);
    } else if (toy.productImages && typeof toy.productImages === 'string') {
      images = [toy.productImages];
    } else if (toy.image && typeof toy.image === 'string') {
      images = [toy.image];
    }
  }

  // --- HELPER: Determine Available Colors ---
  // We check if the toy has a list of colors. If not, we try to split the single string or default.
  const getAvailableColors = () => {
    if (!toy) return [];
    // Priority 1: If your DB has a specific array for colors (e.g. toy.colors)
    if (Array.isArray((toy as any).colors)) return (toy as any).colors;
    
    // Priority 2: If 'color' is a comma-separated string (e.g. "Red, Blue, Green")
    if (typeof toy.color === 'string' && toy.color.includes(',')) {
      return toy.color.split(',').map(c => c.trim());
    }

    // Priority 3: Single color
    if (toy.color) return [toy.color];

    return []; // No color options available
  };

  const availableColors = getAvailableColors();

  // --- SMART IMAGE SELECTION ---
  // If a color is in the URL, try to find an image that matches that color name
  useEffect(() => {
    if (toy && images.length > 0 && requestedColor) {
      const colorLower = requestedColor.toLowerCase().trim();
      // Look for the color string inside the image URL/Filename
      const matchingIndex = images.findIndex(img => img.toLowerCase().includes(colorLower));
      
      if (matchingIndex !== -1) {
        setSelectedImageIndex(matchingIndex);
      }
    }
  }, [toy, requestedColor, images]); 

  const mainImage = images[selectedImageIndex] || images[0] || 'https://static.wixstatic.com/media/b9ec8c_2c7c3392b6544f1093b680407e664a6a~mv2.png';

  // --- HANDLER: Update Color in URL ---
  const handleColorSelect = (color: string) => {
    // This updates the URL (e.g., ?color=Red) without reloading the page
    setSearchParams(prev => {
      prev.set('color', color);
      return prev;
    });
  };

  // --- HANDLER: Razorpay Payment ---
  const handleRazorpaySuccess = (response: any) => {
    console.log('Payment successful:', response);
    alert('Payment successful! Order ID: ' + response.razorpay_order_id);
    // You can redirect to a success page or update order status here
  };

  const handleRazorpayError = (error: any) => {
    console.error('Payment error:', error);
    alert('Payment failed. Please try again.');
  };

  // --- HANDLER: WhatsApp Click ---
  const handleWhatsAppClick = () => {
    if (!toy) return;

    const currentUrl = window.location.href;
    const displayColor = requestedColor || (availableColors.length > 0 ? availableColors[0] : 'Standard');

    const message = `Hello! I am interested in buying this product:
*${toy.name}*
Price: Rs. ${toy.price || 'N/A'}
Selected Color: ${displayColor}

Link: ${currentUrl}

Please provide availability details.`;

    const whatsAppUrl = generateWhatsAppUrl(storeInfo?.whatsAppNumber, message);
    window.open(whatsAppUrl, '_blank');
  };

  // --- Navigation & Touch Logic ---
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  const handlePrevImage = () => {
    setSlideDirection('right');
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSlideDirection('left');
    setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) handleNextImage();
    if (distance < -50) handlePrevImage();
    setTouchStart(0);
    setTouchEnd(0);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="font-paragraph text-foreground text-sm md:text-base">Loading product details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!toy) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="font-paragraph text-lg md:text-xl text-foreground mb-6">Product not found</p>
            <button onClick={() => navigate('/toys')} className="inline-flex items-center gap-2 bg-primary text-white px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl hover:bg-primary/90 transition-all text-sm md:text-base">
              <ArrowLeft size={16} className="md:w-5 md:h-5" /> Back to Toys
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <SEOHelmet 
        title={`${toy?.name || 'Product'} - Buy Premium Toys | Sudha Novelties`}
        description={toy?.shortDescription || `Discover ${toy?.name} at Sudha Novelties. Premium quality toy with fast delivery. Shop now!`}
        keywords={`${toy?.name}, ${toy?.category}, toys, buy toys online`}
        canonical={`https://sudha-novelties.com/toys/${toyId}`}
        ogImage={images[0] || toy?.image}
      />
      <Header />
      <WhatsAppFloatingButton />

      {/* Breadcrumb */}
      <section className="bg-light-pink/30 py-3 md:py-4">
        <div className="max-w-[120rem] mx-auto px-4 md:px-6">
          <button onClick={() => navigate('/toys')} className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-paragraph text-sm md:text-base transition-colors">
            <ArrowLeft size={16} className="md:w-5 md:h-5" /> Back to Toys
          </button>
        </div>
      </section>

      {/* Product Details Section */}
      <section className="py-8 md:py-16 bg-white">
        <div className="max-w-[120rem] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
            {/* Product Images Gallery */}
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div className="space-y-3 md:space-y-4">
                {/* Main Image */}
                <div className="relative aspect-square rounded-lg md:rounded-2xl overflow-hidden bg-white shadow-lg">
                  <div onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} className="w-full h-full">
                    <AnimatePresence mode="sync">
                      <motion.div 
                        key={selectedImageIndex} 
                        initial={{ opacity: 0, x: slideDirection === 'left' ? 100 : -100 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        exit={{ opacity: 0, x: slideDirection === 'left' ? -100 : 100 }} 
                        transition={{ duration: 0.4, ease: 'easeInOut' }} 
                        className="w-full h-full absolute inset-0"
                      >
                        <Image src={mainImage} alt={toy.name || 'Product'} width={600} className="w-full h-full object-cover" />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {images.length > 1 && (
                    <>
                      <button onClick={handlePrevImage} className="hidden lg:flex absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 md:w-12 h-10 md:h-12 items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"><ChevronLeft size={20} className="text-foreground md:w-6 md:h-6" /></button>
                      <button onClick={handleNextImage} className="hidden lg:flex absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 md:w-12 h-10 md:h-12 items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"><ChevronRight size={20} className="text-foreground md:w-6 md:h-6" /></button>
                      <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-paragraph">{selectedImageIndex + 1} / {images.length}</div>
                    </>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2 md:gap-3">
                    {images.map((image, index) => (
                      <button key={index} onClick={() => setSelectedImageIndex(index)} className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedImageIndex === index ? 'border-primary shadow-md' : 'border-gray-200 hover:border-primary/50'}`}>
                        <Image src={image} alt={`view ${index}`} width={150} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Product Information */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="flex flex-col">
              <h1 className="font-heading text-2xl md:text-5xl text-foreground mb-3 md:mb-4">{toy.name}</h1>

              <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6">
                {toy.category && <span className="px-3 md:px-4 py-1 md:py-2 bg-light-pink rounded-full text-primary font-paragraph text-xs md:text-sm font-medium">{toy.category}</span>}
                {toy.ageGroup && <span className="px-3 md:px-4 py-1 md:py-2 bg-secondary/20 rounded-full text-foreground font-paragraph text-xs md:text-sm font-medium">Age: {toy.ageGroup}</span>}
              </div>

              {toy.price && (
                <div className="mb-4 md:mb-6">
                  <p className="text-gray-500 font-paragraph text-xs md:text-sm mb-1 md:mb-2">Price</p>
                  <p className="text-3xl md:text-4xl font-bold text-primary">Rs. {toy.price}</p>
                </div>
              )}

              {/* --- RESTORED COLOR OPTIONS SELECTOR --- */}
              {availableColors.length > 0 && (
                <div className="mb-6 md:mb-8">
                  <p className="text-gray-500 font-paragraph text-xs md:text-sm mb-2 md:mb-3">Available Colors</p>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {availableColors.map((color) => {
                       const isSelected = requestedColor === color || (!requestedColor && availableColors[0] === color);
                       
                       // Simple function to guess a CSS color background from the name (fallback to gray)
                       const getBgColor = (c: string) => {
                          const lower = c.toLowerCase();
                          if (['red', 'blue', 'green', 'yellow', 'purple', 'pink', 'orange', 'black', 'white', 'gray'].includes(lower)) return lower;
                          return 'gray'; // Fallback for complex names like "Midnight Blue"
                       };

                       return (
                        <button
                          key={color}
                          onClick={() => handleColorSelect(color)}
                          className={`
                            relative px-3 md:px-6 py-1 md:py-2 rounded-full border-2 transition-all duration-300 flex items-center gap-2 text-xs md:text-base
                            ${isSelected 
                              ? 'border-primary bg-primary/5 text-primary font-bold shadow-sm' 
                              : 'border-gray-200 hover:border-primary/50 text-gray-600'
                            }
                          `}
                        >
                          {/* Optional: Small color dot */}
                          <span 
                            className="w-2 md:w-3 h-2 md:h-3 rounded-full border border-black/10" 
                            style={{ backgroundColor: getBgColor(color) }}
                          />
                          {color}
                          {isSelected && <Check size={12} className="md:w-4 md:h-4" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {toy.shortDescription && (
                <div className="mb-3 md:mb-4">
                  <p className="text-gray-500 font-paragraph text-xs md:text-sm mb-1 md:mb-2">Description</p>
                  <p className="font-paragraph text-base md:text-lg text-foreground leading-relaxed">{toy.shortDescription}</p>
                </div>
              )}

              <div className="space-y-3 md:space-y-4 mt-auto pt-4 md:pt-6">
                {/* Add to Cart and Buy Now Buttons */}
                <div className="flex gap-3">
                  <Navigation
                    route={`/cart?add=${toyId}`}
                    className="flex-1 bg-primary text-white font-paragraph text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 md:gap-3"
                  >
                    <ShoppingCart size={18} className="md:w-6 md:h-6" /> Add to Cart
                  </Navigation>
                  <Navigation
                    route={`/cart?buy=${toyId}`}
                    className="flex-1 bg-secondary text-foreground font-paragraph text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl hover:bg-secondary/90 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 md:gap-3"
                  >
                    Buy Now
                  </Navigation>
                </div>

                {/* Order via WhatsApp - Secondary Button */}
                <button onClick={handleWhatsAppClick} className="w-full bg-whatsapp-green text-white font-paragraph text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl hover:bg-whatsapp-green/90 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 md:gap-3">
                  <MessageCircle size={18} className="md:w-6 md:h-6" /> Order via WhatsApp
                </button>
              </div>

              <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-200">
                <div className="bg-light-pink/30 rounded-lg md:rounded-xl p-3 md:p-4">
                  <p className="font-paragraph text-xs md:text-sm text-foreground">
                    ✓ Quality Assured<br />
                    ✓ Safe & Non-Toxic<br />
                    ✓ In-Store Pickup Available
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related/Help Section */}
      <section className="py-8 md:py-16 bg-gradient-to-br from-light-pink to-white">
        <div className="max-w-[120rem] mx-auto px-4 md:px-6">
          <div className="bg-white rounded-lg md:rounded-2xl p-6 md:p-8 shadow-md text-center">
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-3 md:mb-4">Can't find what you need?</h2>
            <p className="font-paragraph text-base md:text-lg text-foreground mb-4 md:mb-6">Our team is here to help you find the perfect toy.</p>
            <button onClick={handleWhatsAppClick} className="inline-flex items-center gap-2 bg-whatsapp-green text-white font-paragraph text-sm md:text-base px-6 md:px-8 py-2 md:py-4 rounded-lg md:rounded-xl hover:bg-whatsapp-green/90 transition-all shadow-md">
              <MessageCircle size={16} className="md:w-5 md:h-5" /> Chat with Us
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}