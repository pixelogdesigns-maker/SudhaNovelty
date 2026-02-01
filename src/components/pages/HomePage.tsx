// HPI 3.0-V (Aegle-Inspired Layout Update)
import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react'; // Ask Wix AI to install this
import { BaseCrudService } from '@/integrations';
import { ToyCategories, StoreInformation } from '@/entities'; // Assuming 'Products' entity exists, otherwise we mock
import { Image } from '@/components/ui/image';
import { 
  MessageCircle, Star, ArrowRight, ShoppingBag, 
  ChevronLeft, ChevronRight, Heart, Sparkles 
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppFloatingButton from '@/components/ui/WhatsAppFloatingButton';

// --- Types ---
interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
  isBestSeller?: boolean;
}

// --- Mock Data (Replace with real Fetch later) ---
const HERO_SLIDES = [
  {
    id: 1,
    title: "Playtime Reimagined",
    subtitle: "Discover the magic of sustainable, educational toys.",
    image: "https://static.wixstatic.com/media/b9ec8c_6119fa220f48469bbdeedcc80240d1df~mv2.png?originWidth=768&originHeight=960",
    bg: "bg-[#FDF6F0]" // Cream
  },
  {
    id: 2,
    title: "Little Explorers",
    subtitle: "Gear up for adventure with our outdoor collection.",
    image: "https://static.wixstatic.com/media/b9ec8c_2c7c3392b6544f1093b680407e664a6a~mv2.png?originWidth=576&originHeight=768",
    bg: "bg-[#F0F9FF]" // Light Blue
  },
  {
    id: 3,
    title: "Cozy Companions",
    subtitle: "Soft plushies waiting for their forever home.",
    image: "https://static.wixstatic.com/media/b9ec8c_2ca344a9396c4f04a5d303aa5c79e93c~mv2.png?originWidth=768&originHeight=384",
    bg: "bg-[#FFF0F5]" // Pink
  }
];

const AGE_GROUPS = [
  { label: "0-12 Months", range: "0-1", color: "bg-pink-100 text-pink-600", icon: "👶" },
  { label: "1-3 Years", range: "1-3", color: "bg-blue-100 text-blue-600", icon: "🧸" },
  { label: "3-5 Years", range: "3-5", color: "bg-green-100 text-green-600", icon: "🎨" },
  { label: "5-8 Years", range: "5-8", color: "bg-yellow-100 text-yellow-600", icon: "🚀" },
  { label: "8-12 Years", range: "8-12", color: "bg-purple-100 text-purple-600", icon: "🧩" },
  { label: "12+ Years", range: "12+", color: "bg-orange-100 text-orange-600", icon: "🎮" },
];

const MOCK_BEST_SELLERS: Product[] = [
  { _id: '1', name: 'Wooden Stacking Ring', price: 25.00, image: 'https://static.wixstatic.com/media/b9ec8c_e6fdaf35f0924b37b24f0ccb83c15896~mv2.png?originWidth=768&originHeight=960', category: 'Toddler' },
  { _id: '2', name: 'Interactive Robot', price: 45.99, image: 'https://static.wixstatic.com/media/b9ec8c_2c7c3392b6544f1093b680407e664a6a~mv2.png?originWidth=576&originHeight=768', category: 'Tech' },
  { _id: '3', name: 'Plush Bunny', price: 18.50, image: 'https://static.wixstatic.com/media/b9ec8c_6119fa220f48469bbdeedcc80240d1df~mv2.png?originWidth=768&originHeight=960', category: 'Plush' },
  { _id: '4', name: 'Space Puzzle', price: 12.99, image: 'https://static.wixstatic.com/media/b9ec8c_2ca344a9396c4f04a5d303aa5c79e93c~mv2.png?originWidth=768&originHeight=384', category: 'Puzzle' },
];

// --- Sub-Components ---

// 1. Hero Carousel Component with Text
const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[600px] lg:h-[750px] overflow-hidden bg-gray-50">
      <AnimatePresence mode='wait'>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className={`absolute inset-0 w-full h-full ${HERO_SLIDES[current].bg} flex items-center justify-center`}
        >
          <div className="max-w-[120rem] w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full pt-20 lg:pt-0">
            {/* Text Content */}
            <div className="z-10 text-center lg:text-left order-2 lg:order-1">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="inline-block px-4 py-2 bg-white rounded-full text-xs font-bold tracking-widest uppercase text-primary mb-4 shadow-sm">
                  New Collection
                </div>
                <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-foreground mb-6 leading-[1.1]">
                  {HERO_SLIDES[current].title}
                </h1>
                <p className="font-paragraph text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
                  {HERO_SLIDES[current].subtitle}
                </p>
                <Link to="/toys" className="inline-flex items-center justify-center px-10 py-5 bg-foreground text-white rounded-2xl font-bold text-lg hover:bg-primary transition-colors duration-300 shadow-lg hover:shadow-primary/30">
                  Shop Now <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </motion.div>
            </div>

            {/* Image Content */}
            <div className="relative h-[300px] lg:h-[600px] w-full order-1 lg:order-2">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="w-full h-full relative"
              >
                <Image 
                  src={HERO_SLIDES[current].image} 
                  alt={HERO_SLIDES[current].title}
                  width={800}
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
                
                {/* Decorative Elements */}
                <div className="absolute top-10 right-10 animate-bounce delay-700">
                   <Star className="text-yellow-400 w-12 h-12 fill-current" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx === current ? 'bg-foreground w-10' : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

// 1. Hero Carousel Component with image only
// 1. Hero Carousel Component (Image Only Update)
const HeroCarouselImageonly = () => {
  const [current, setCurrent] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000); // Change slides every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    // Adjusted heights for a more cinematic feel
    <section className="relative w-full h-[500px] md:h-[700px] lg:h-[850px] overflow-hidden bg-gray-900">
      <AnimatePresence mode='wait'>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }} // Start slightly zoomed in
          animate={{ opacity: 1, scale: 1 }} // Fade in and scale down slowly to normal
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }} // Slower, smoother transition for big images
          className="absolute inset-0 w-full h-full"
        >
          <Image 
            src={HERO_SLIDES[current].image} 
            alt={HERO_SLIDES[current].title}
            // Use a large width value to ensure high-res loading
            width={1920} 
            height={1080}
            // IMPORTANT: 'object-cover' makes the image fill the container without distorting, cropping if necessary.
            className="w-full h-full object-cover"
          />
          
          {/* Optional subtle overlay gradient so navigation dots are always visible at the bottom */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* Dots Navigation - Updated to White for better contrast on images */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            // Changed colors to white/transparent white for visibility against photos
            className={`h-3 rounded-full transition-all duration-500 shadow-sm backdrop-blur-md ${
              idx === current ? 'bg-white w-10' : 'bg-white/40 w-3 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

// 2. Shop By Age Component
const ShopByAge = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[120rem] mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4">Shop by Age</h2>
          <p className="text-gray-500 text-lg">Curated collections for every milestone.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {AGE_GROUPS.map((group, index) => (
            <Link 
              key={index} 
              to={`/toys?age=${group.range}`}
              className="group flex flex-col items-center"
            >
              <div className={`w-full aspect-square rounded-[2rem] ${group.color} flex flex-col items-center justify-center mb-4 transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-lg`}>
                <span className="text-4xl mb-2 filter drop-shadow-sm">{group.icon}</span>
                <span className="font-heading text-xl font-bold">{group.range}</span>
                <span className="text-xs font-bold uppercase opacity-60">Years</span>
              </div>
              <h3 className="font-bold text-gray-700 group-hover:text-primary transition-colors">
                {group.label}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// 3. Best Sellers Component (Carousel)
const BestSellers = () => {
  // Embla Carousel Setup
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="py-24 bg-[#FFF8F3] relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="max-w-[120rem] mx-auto px-6 relative z-10">
        <div className="flex justify-between items-end mb-12">
          <div>
            <div className="flex items-center gap-2 text-secondary font-bold mb-2">
              <Sparkles size={18} />
              <span className="uppercase tracking-wider text-sm">Customer Favorites</span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl text-foreground">Best Sellers</h2>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className={`p-4 rounded-full border border-gray-200 bg-white transition-all ${!canScrollPrev ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary hover:text-white hover:border-primary'}`}
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={scrollNext}
              disabled={!canScrollNext}
              className={`p-4 rounded-full border border-gray-200 bg-white transition-all ${!canScrollNext ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary hover:text-white hover:border-primary'}`}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Product Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-6 pb-12">
            {MOCK_BEST_SELLERS.map((product) => (
              <div className="pl-6 flex-[0_0_80%] md:flex-[0_0_40%] lg:flex-[0_0_25%] min-w-0" key={product._id}>
                <div className="group relative bg-white rounded-3xl p-4 transition-all duration-300 hover:shadow-xl border border-transparent hover:border-pink-100">
                  {/* Badge */}
                  <div className="absolute top-6 left-6 z-10 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full">
                    Hot
                  </div>
                  
                  {/* Wishlist Button */}
                  <button className="absolute top-6 right-6 z-10 p-2 bg-white rounded-full shadow-sm text-gray-400 hover:text-red-500 transition-colors">
                    <Heart size={18} />
                  </button>

                  <div className="relative aspect-square rounded-2xl bg-gray-50 overflow-hidden mb-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={400}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Add to Cart Overlay */}
                    <div className="absolute inset-x-4 bottom-4 translate-y-[150%] group-hover:translate-y-0 transition-transform duration-300">
                      <button className="w-full bg-white/90 backdrop-blur text-foreground font-bold py-3 rounded-xl shadow-lg hover:bg-foreground hover:text-white flex items-center justify-center gap-2">
                        <ShoppingBag size={18} />
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  <div className="px-2 pb-2">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">{product.category}</p>
                    <h3 className="font-heading text-xl text-foreground mb-2 truncate">{product.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
                      <div className="flex text-yellow-400 text-xs">
                        {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Main Page Integration ---

export default function HomePage() {
  const [storeInfo, setStoreInfo] = useState<StoreInformation | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // Keep fetching store info for the Footer/Location section
      const { items: storeItems } = await BaseCrudService.getAll<StoreInformation>('storeinformation');
      if (storeItems && storeItems.length > 0) {
        setStoreInfo(storeItems[0]);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white font-paragraph selection:bg-primary selection:text-white overflow-x-clip">
      <Header />
      <WhatsAppFloatingButton />
      
      {/* 1. Hero Carousel */}
      <HeroCarousel />
      <HeroCarouselImageonly />
      
      {/* 2. Shop By Age */}
      <ShopByAge />

      {/* 3. Best Sellers */}
      <BestSellers />

      {/* Keep the original Marquee Video Section (It's a nice vibe addition) */}
       <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-[120rem] mx-auto mb-10 px-6 text-center">
            <h2 className="font-heading text-3xl md:text-4xl text-primary">
              See the Fun in Action
            </h2>
        </div>
        <div className="relative w-full">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
            {/* Using mock video data here or bring back your original videoReels array */}
            {[1,2,3,4,5,1,2,3,4,5].map((_, i) => (
              <div key={i} className="relative h-[300px] aspect-[9/16] rounded-2xl overflow-hidden shadow-md bg-gray-200 mx-3">
                 <div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-500">Video {i}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Keep Location Section */}
      <section className="py-24 bg-light-pink/20">
        <div className="max-w-[120rem] mx-auto px-6 text-center">
             <h2 className="font-heading text-4xl mb-6">Visit Our Store</h2>
             <p className="text-xl text-gray-600 mb-8">{storeInfo?.address || '123 Toy Street'}</p>
             <Link to="/visit" className="inline-block px-8 py-4 bg-foreground text-white rounded-xl font-bold">Get Directions</Link>
        </div>
      </section>

      <Footer />

      {/* CSS for infinite scroll */}
      <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 40s linear infinite;
          }
      `}</style>
    </div>
  );
}