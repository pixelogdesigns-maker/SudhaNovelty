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

  const mainImage = images[selectedImageIndex] || images[0] || 'https://static.wixstatic.com/media/b9ec8c_2c7c3392b6544f1093b680407e664a6a~mv2.png';

  // --- HELPER: Convert Wix Image ID to Public URL for WhatsApp Meta Tags ---
  const getPublicImageUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    // Handle wix:image:// protocol
    if (url.startsWith('wix:image://')) {
      const match = url.match(/wix:image:\/\/v1\/([^/]+)\//);
      if (match && match[1]) {
        // Construct a standard Wix Static URL (resized to 600x600 for WhatsApp)
        return `https://static.wixstatic.com/media/${match[1]}/v1/fit/w_600,h_600,q_90/file.jpg`;
      }
    }
    return url;
  };

  const publicMetaImage = getPublicImageUrl(images[0]); // Primary image for preview

  // --- HANDLER: WhatsApp Click (Updated Format) ---
  const handleWhatsAppClick = () => {
    if (!toy) return;

    // We use window.location.href to send the *Link* to this page.
    // When the seller clicks this link, they will see the page + the meta tag preview.
    const currentUrl = window.location.href;

    const message = `Hello! I am interested in buying this product:
*${toy.name}*
Price: Rs. ${toy.price || 'N/A'}

Link: ${currentUrl}

Please provide availability details.`;

    const whatsAppUrl = generateWhatsAppUrl(storeInfo?.whatsAppNumber, message);
    window.open(whatsAppUrl, '_blank');
  };

  // --- Navigation & Touch Logic ---
  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
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
            <button onClick={() => navigate('/toys')} className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition-all">
              <ArrowLeft size={18} /> Back to Toys
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <WhatsAppFloatingButton />

      {/* Breadcrumb */}
      <section className="bg-light-pink/30 py-4">
        <div className="max-w-[120rem] mx-auto px-6">
          <button onClick={() => navigate('/toys')} className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-paragraph text-base transition-colors">
            <ArrowLeft size={18} /> Back to Toys
          </button>
        </div>
      </section>

      {/* Product Details Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[120rem] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images Gallery */}
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
                  <div onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} className="w-full h-full">
                    <AnimatePresence mode="wait">
                      <motion.div key={selectedImageIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="w-full h-full">
                        <Image src={mainImage} alt={toy.name || 'Product'} width={600} className="w-full h-full object-cover" />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {images.length > 1 && (
                    <>
                      <button onClick={handlePrevImage} className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"><ChevronLeft size={24} className="text-foreground" /></button>
                      <button onClick={handleNextImage} className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"><ChevronRight size={24} className="text-foreground" /></button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-paragraph">{selectedImageIndex + 1} / {images.length}</div>
                    </>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {images.length > 1 && (
                  <div className="grid grid-cols-4 gap-3">
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
              <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-4">{toy.name}</h1>

              <div className="flex flex-wrap gap-3 mb-6">
                {toy.category && <span className="px-4 py-2 bg-light-pink rounded-full text-primary font-paragraph text-sm font-medium">{toy.category}</span>}
                {toy.ageGroup && <span className="px-4 py-2 bg-secondary/20 rounded-full text-foreground font-paragraph text-sm font-medium">Age: {toy.ageGroup}</span>}
              </div>

              {toy.price && (
                <div className="mb-6">
                  <p className="text-gray-500 font-paragraph text-sm mb-2">Price</p>
                  <p className="text-4xl font-bold text-primary">Rs. {toy.price}</p>
                </div>
              )}

              {toy.shortDescription && (
                <div className="mb-4">
                  <p className="text-gray-500 font-paragraph text-sm mb-2">Description</p>
                  <p className="font-paragraph text-lg text-foreground leading-relaxed">{toy.shortDescription}</p>
                </div>
              )}

              <div className="space-y-4 mt-auto">
                <button onClick={handleWhatsAppClick} className="w-full bg-whatsapp-green text-white font-paragraph text-lg px-8 py-4 rounded-xl hover:bg-whatsapp-green/90 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-3">
                  <MessageCircle size={24} /> Order via WhatsApp
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="bg-light-pink/30 rounded-xl p-4">
                  <p className="font-paragraph text-sm text-foreground">
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
      <section className="py-16 bg-gradient-to-br from-light-pink to-white">
        <div className="max-w-[120rem] mx-auto px-6">
          <div className="bg-white rounded-2xl p-8 shadow-md text-center">
            <h2 className="font-heading text-3xl text-foreground mb-4">Can't find what you need?</h2>
            <p className="font-paragraph text-lg text-foreground mb-6">Our team is here to help you find the perfect toy.</p>
            <button onClick={handleWhatsAppClick} className="inline-flex items-center gap-2 bg-whatsapp-green text-white font-paragraph text-base px-8 py-4 rounded-xl hover:bg-whatsapp-green/90 transition-all shadow-md">
              <MessageCircle size={20} /> Chat with Us
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}