import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { Toys, StoreInformation } from '@/entities';
import { Image } from '@/components/ui/image';
import { MessageCircle, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppFloatingButton from '@/components/ui/WhatsAppFloatingButton';
import { generateWhatsAppUrl } from '@/lib/whatsapp-utils';

export default function ProductDetailsPage() {
  const { toyId } = useParams<{ toyId: string }>();
  const navigate = useNavigate();
  const [toy, setToy] = useState<Toys | null>(null);
  const [storeInfo, setStoreInfo] = useState<StoreInformation | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

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

  // Get all images - prioritize product gallery, then fall back to other images
  let images: string[] = [];
  
  if (toy) {
    // Check productGallery (MEDIA_GALLERY) first
    if (toy.productGallery && Array.isArray(toy.productGallery) && toy.productGallery.length > 0) {
      images = toy.productGallery.map((item: any) => item.src || item.url || item);
    }
    // Fall back to productImages1 (MEDIA_GALLERY)
    else if (toy.productImages1 && Array.isArray(toy.productImages1) && toy.productImages1.length > 0) {
      images = toy.productImages1.map((item: any) => item.src || item.url || item);
    }
    // Fall back to productImages (single image field)
    else if (toy.productImages && typeof toy.productImages === 'string') {
      images = [toy.productImages];
    }
    // Fall back to image (single image field)
    else if (toy.image && typeof toy.image === 'string') {
      images = [toy.image];
    }
  }

  const handleWhatsAppClick = () => {
    if (!toy) return;

    const message = `Hello! I am interested in this product:\\n--------------------------\\nName: ${toy.name}\\nPrice: Rs. ${toy.price || 'N/A'}\\nCategory: ${toy.category || 'General'}\\n--------------------------\\n\\nPlease provide more details.`;

    const whatsAppUrl = generateWhatsAppUrl(storeInfo?.whatsAppNumber, message);
    window.open(whatsAppUrl, '_blank');
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNextImage();
    }
    if (isRightSwipe) {
      handlePrevImage();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="font-paragraph text-foreground">Loading product details...</p>
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
            <p className="font-paragraph text-xl text-foreground mb-6">Product not found</p>
            <button
              onClick={() => navigate('/toys')}
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition-all"
            >
              <ArrowLeft size={18} />
              Back to Toys
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const mainImage = images[selectedImageIndex] || images[0] || 'https://static.wixstatic.com/media/b9ec8c_2c7c3392b6544f1093b680407e664a6a~mv2.png';

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <WhatsAppFloatingButton />

      {/* Breadcrumb */}
      <section className="bg-light-pink/30 py-4">
        <div className="max-w-[120rem] mx-auto px-6">
          <button
            onClick={() => navigate('/toys')}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-paragraph text-base transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Toys
          </button>
        </div>
      </section>

      {/* Product Details Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[120rem] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-4">
                {/* Main Image with Swipe and Navigation */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
                  {/* Image with swipe support */}
                  <div
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    className="w-full h-full"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedImageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full"
                      >
                        <Image
                          src={mainImage || 'https://static.wixstatic.com/media/b9ec8c_2c7c3392b6544f1093b680407e664a6a~mv2.png'}
                          alt={toy.name || 'Product'}
                          width={600}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Desktop Navigation Arrows */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={24} className="text-foreground" />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"
                        aria-label="Next image"
                      >
                        <ChevronRight size={24} className="text-foreground" />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  {images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-paragraph">
                      {selectedImageIndex + 1} / {images.length}
                    </div>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {images.length > 1 && (
                  <div className="grid grid-cols-4 gap-3">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImageIndex === index
                            ? 'border-primary shadow-md'
                            : 'border-gray-200 hover:border-primary/50'
                        }`}
                      >
                        <Image
                          src={image || 'https://static.wixstatic.com/media/b9ec8c_2c7c3392b6544f1093b680407e664a6a~mv2.png'}
                          alt={`Product view ${index + 1}`}
                          width={150}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Product Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col"
            >
              {/* Title */}
              <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
                {toy.name}
              </h1>

              {/* Category & Age Group */}
              <div className="flex flex-wrap gap-3 mb-6">
                {toy.category && (
                  <span className="px-4 py-2 bg-light-pink rounded-full text-primary font-paragraph text-sm font-medium">
                    {toy.category}
                  </span>
                )}
                {toy.ageGroup && (
                  <span className="px-4 py-2 bg-secondary/20 rounded-full text-foreground font-paragraph text-sm font-medium">
                    Age: {toy.ageGroup}
                  </span>
                )}
              </div>

              {/* Price */}
              {toy.price && (
                <div className="mb-6">
                  <p className="text-gray-500 font-paragraph text-sm mb-2">Price</p>
                  <p className="text-4xl font-bold text-primary">
                    Rs. {toy.price}
                  </p>
                </div>
              )}

              {/* Description */}
              {toy.shortDescription && (
                <div className="mb-4">
                  <p className="text-gray-500 font-paragraph text-sm mb-2">Description</p>
                  <p className="font-paragraph text-lg text-foreground leading-relaxed">
                    {toy.shortDescription}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-4 mt-auto">
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-whatsapp-green text-white font-paragraph text-lg px-8 py-4 rounded-xl hover:bg-whatsapp-green/90 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-3"
                >
                  <MessageCircle size={24} />
                  Order via WhatsApp
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="font-paragraph text-sm text-gray-600 mb-4">
                  Have questions? Chat with us on WhatsApp for more details about this product.
                </p>
                <div className="bg-light-pink/30 rounded-xl p-4">
                  <p className="font-paragraph text-sm text-foreground">
                    ✓ Quality Assured<br />
                    ✓ Safe & Non-Toxic<br />
                    ✓ Expert Recommendations Available
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      <section className="py-16 bg-gradient-to-br from-light-pink to-white">
        <div className="max-w-[120rem] mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-8">
            Need Help?
          </h2>
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <p className="font-paragraph text-lg text-foreground mb-6">
              Can't find what you're looking for? Our team is here to help you find the perfect toy.
            </p>
            <button
              onClick={handleWhatsAppClick}
              className="inline-flex items-center gap-2 bg-whatsapp-green text-white font-paragraph text-base px-8 py-4 rounded-xl hover:bg-whatsapp-green/90 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <MessageCircle size={20} />
              Chat with Us
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
