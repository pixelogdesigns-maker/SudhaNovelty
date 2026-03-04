import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BaseCrudService, useCart, buyNow, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { Toys } from '@/entities';
import { Image } from '@/components/ui/image';
import { ArrowLeft, ChevronLeft, ChevronRight, ShoppingCart, Zap, Plus, Minus } from 'lucide-react';
import Footer from '@/components/layout/Footer';
import { SEOHelmet } from '@/components/SEOHelmet';

export default function ProductDetailsPage() {
  const { toyId } = useParams<{ toyId: string }>();
  const navigate = useNavigate();
  const { addingItemId, actions: cartActions } = useCart();
  const { currency } = useCurrency();
  
  // Use INR as the currency for India
  const displayCurrency = currency || 'INR';
  
  const [toy, setToy] = useState<Toys | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  useEffect(() => {
    const fetchData = async () => {
      if (!toyId) return;
      try {
        const toyData = await BaseCrudService.getById<Toys>('toys', toyId);
        setToy(toyData);
      } catch {
        // Error fetching product
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [toyId]);

  // Get all images
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

  const mainImage = images[selectedImageIndex] || images[0] || 'https://static.wixstatic.com/media/b9ec8c_2c7c3392b6544f1093b680407e664a6a~mv2.png';

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

  const handleAddToCart = async () => {
    if (!toy) return;
    await cartActions.addToCart({
      collectionId: 'toys',
      itemId: toy._id,
      quantity
    });
    setQuantity(1);
  };

  const handleBuyNow = async () => {
    if (!toy) return;
    setIsBuyingNow(true);
    try {
      await buyNow([{
        collectionId: 'toys',
        itemId: toy._id,
        quantity
      }]);
    } finally {
      setIsBuyingNow(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
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
                  <p className="text-3xl md:text-4xl font-bold text-primary">{formatPrice(toy.price, displayCurrency)}</p>
                </div>
              )}

              {toy.shortDescription && (
                <div className="mb-6 md:mb-8">
                  <p className="text-gray-500 font-paragraph text-xs md:text-sm mb-1 md:mb-2">Description</p>
                  <p className="font-paragraph text-base md:text-lg text-foreground leading-relaxed">{toy.shortDescription}</p>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-6 md:mb-8">
                <p className="text-gray-500 font-paragraph text-xs md:text-sm mb-3">Quantity</p>
                <div className="flex items-center gap-3 bg-gray-50 w-fit rounded-lg p-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-white rounded transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={18} className="text-foreground" />
                  </button>
                  <span className="font-heading font-bold text-lg w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-white rounded transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus size={18} className="text-foreground" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 md:space-y-4 mt-auto">
                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={addingItemId === toy._id}
                  className="w-full bg-primary text-white font-heading font-bold text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 md:gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {addingItemId === toy._id ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={20} className="md:w-6 md:h-6" />
                      Add to Cart
                    </>
                  )}
                </button>

                {/* Buy Now Button */}
                <button
                  onClick={handleBuyNow}
                  disabled={isBuyingNow}
                  className="w-full bg-secondary text-foreground font-heading font-bold text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl hover:bg-secondary/90 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 md:gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isBuyingNow ? (
                    <>
                      <div className="w-5 h-5 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Zap size={20} className="md:w-6 md:h-6" />
                      Buy Now
                    </>
                  )}
                </button>
              </div>

              <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-200">
                <div className="bg-light-pink/30 rounded-lg md:rounded-xl p-3 md:p-4">
                  <p className="font-paragraph text-xs md:text-sm text-foreground">
                    ✓ Quality Assured<br />
                    ✓ Safe & Non-Toxic<br />
                    ✓ Fast Delivery<br />
                    ✓ Secure Checkout
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      <section className="py-8 md:py-16 bg-gradient-to-br from-light-pink to-white">
        <div className="max-w-[120rem] mx-auto px-4 md:px-6">
          <div className="bg-white rounded-lg md:rounded-2xl p-6 md:p-8 shadow-md text-center">
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-3 md:mb-4">Explore More Toys</h2>
            <p className="font-paragraph text-base md:text-lg text-foreground mb-4 md:mb-6">Browse our complete collection of premium toys for all ages.</p>
            <button onClick={() => navigate('/toys')} className="inline-flex items-center gap-2 bg-primary text-white font-paragraph text-sm md:text-base px-6 md:px-8 py-2 md:py-4 rounded-lg md:rounded-xl hover:bg-primary/90 transition-all shadow-md">
              View All Toys
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
