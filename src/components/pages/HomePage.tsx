// HPI 3.1-V (Aegle Layout + Restored Video Marquee)
import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { BaseCrudService } from '@/integrations';
import { ToyCategories, StoreInformation, Toys } from '@/entities';
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

interface VideoReel {
  id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl?: string;
  description?: string;
}

// --- Data Configuration ---

const HERO_SLIDES = [
  {
    id: 1,
    title: "Playtime Reimagined",
    image: "https://static.wixstatic.com/media/b9ec8c_6119fa220f48469bbdeedcc80240d1df~mv2.png?originWidth=768&originHeight=960",
  },
  {
    id: 2,
    title: "Little Explorers",
    image: "https://static.wixstatic.com/media/b9ec8c_2c7c3392b6544f1093b680407e664a6a~mv2.png?originWidth=576&originHeight=768",
  },
  {
    id: 3,
    title: "Cozy Companions",
    image: "https://static.wixstatic.com/media/b9ec8c_2ca344a9396c4f04a5d303aa5c79e93c~mv2.png?originWidth=768&originHeight=384",
  }
];

// Restored Original Video Links
const VIDEO_REELS: VideoReel[] = [
  {
    id: 'video-1',
    title: '',
    videoUrl: 'https://video.wixstatic.com/video/b9ec8c_450e40f9c7af4d8abffc2922377f3bdb/720p/mp4/file.mp4#t=0.001',
  },
  {
    id: 'video-2',
    title: '',
    videoUrl: 'https://video.wixstatic.com/video/b9ec8c_17915084739d420ea920a6e400088999/720p/mp4/file.mp4#t=0.001',
  },
  {
    id: 'video-3',
    title: '',
    videoUrl: 'https://video.wixstatic.com/video/b9ec8c_2ff14245efe44cfb9aa9c6ab341012e0/720p/mp4/file.mp4#t=0.001',
  },
  {
    id: 'video-4',
    title: '',
    videoUrl: 'https://video.wixstatic.com/video/b9ec8c_ad478e8adee9487ca1f530a14053e8b2/720p/mp4/file.mp4#t=0.001',
  },
  {
    id: 'video-5',
    title: '',
    videoUrl: 'https://video.wixstatic.com/video/b9ec8c_51ab037a44484917b9c05761fca6f25d/720p/mp4/file.mp4#t=0.001',
  },
];

const AGE_GROUPS = [
  { label: "0-12 Months", range: "0-1", color: "bg-pink-100 text-pink-600", icon: "👶" },
  { label: "1-3 Years", range: "1-3", color: "bg-blue-100 text-blue-600", icon: "🧸" },
  { label: "3-5 Years", range: "3-5", color: "bg-green-100 text-green-600", icon: "🎨" },
  { label: "5-8 Years", range: "5-8", color: "bg-yellow-100 text-yellow-600", icon: "🚀" },
  { label: "8-12 Years", range: "8-12", color: "bg-purple-100 text-purple-600", icon: "🧩" },
  { label: "12+ Years", range: "12+", color: "bg-orange-100 text-orange-600", icon: "🎮" },
];

const MOCK_BEST_SELLERS: Product[] = [];

// --- Sub-Components ---

// 1. Hero Carousel (Image Only Version)
const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToPrev = () => {
    setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section className="relative w-full h-[500px] md:h-[700px] lg:h-[850px] overflow-hidden bg-gray-900">
      <AnimatePresence mode='wait'>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <Image 
            src={HERO_SLIDES[current].image} 
            alt={HERO_SLIDES[current].title}
            width={1920} 
            height={1080}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* Previous Button */}
      <button
        onClick={goToPrev}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full transition-all duration-300 text-white"
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Next Button */}
      <button
        onClick={goToNext}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full transition-all duration-300 text-white"
        aria-label="Next slide"
      >
        <ChevronRight size={28} />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
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
  // Map age ranges to the format used in ToysPage
  const getAgeGroupId = (range: string) => {
    const ageMap: { [key: string]: string } = {
      '0-1': '0-2',
      '1-3': '3-5',
      '3-5': '3-5',
      '5-8': '6-8',
      '8-12': '9-12',
      '12+': '13+'
    };
    return ageMap[range] || range;
  };

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
              to={`/toys?age=${getAgeGroupId(group.range)}`}
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
const BestSellers = ({ toys }: { toys: Toys[] }) => {
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

  // Get first 4 toys as best sellers
  const bestSellers = toys.slice(0, 4);

  if (bestSellers.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-[#FFF8F3] relative overflow-hidden">
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

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-6 pb-12">
            {bestSellers.map((product) => (
              <div className="pl-6 flex-[0_0_80%] md:flex-[0_0_40%] lg:flex-[0_0_25%] min-w-0" key={product._id}>
                <Link 
                  to={`/toys/${product._id}`}
                  className="group relative bg-white rounded-3xl p-4 transition-all duration-300 hover:shadow-xl border border-transparent hover:border-pink-100 block h-full"
                >
                  <div className="absolute top-6 left-6 z-10 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full">Hot</div>

                  <div className="relative aspect-square rounded-2xl bg-gray-50 overflow-hidden mb-4">
                    {(() => {
                      let imageUrl = '';
                      
                      // Priority 1: Media Gallery (productImages1)
                      if (product.productImages1 && Array.isArray(product.productImages1) && product.productImages1.length > 0) {
                        const firstImage = product.productImages1[0];
                        imageUrl = firstImage.src || firstImage.url || firstImage;
                      }
                      // Priority 2: Single image field (productImages)
                      else if (product.productImages && typeof product.productImages === 'string') {
                        imageUrl = product.productImages;
                      }
                      // Priority 3: Single image field (image)
                      else if (product.image && typeof product.image === 'string') {
                        imageUrl = product.image;
                      }
                      
                      return (
                        <Image
                          src={imageUrl}
                          alt={product.name || 'Product'}
                          width={400}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      );
                    })()}
                  </div>

                  <div className="px-2 pb-2">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">{product.category}</p>
                    <h3 className="font-heading text-xl text-foreground mb-2 truncate">{product.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primary">Rs. {product.price?.toFixed(2)}</span>
                      <div className="flex text-yellow-400 text-xs">
                        {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// 4. Helper for Video Marquee (Restored)
const MarqueeVideo = ({ video }: { video: VideoReel }) => {
  return (
    <div className="relative h-[350px] md:h-[500px] aspect-[9/16] rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-gray-200 flex-shrink-0 mx-3 md:mx-4 transform transition-transform hover:scale-[1.02]">
      <video
        src={video.videoUrl} 
        poster={video.thumbnailUrl}
        autoPlay
        loop
        muted
        playsInline 
        className="w-full h-full object-cover pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </div>
  );
};

// --- Main Page Integration ---

export default function HomePage() {
  const [storeInfo, setStoreInfo] = useState<StoreInformation | null>(null);
  const [toys, setToys] = useState<Toys[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { items: storeItems } = await BaseCrudService.getAll<StoreInformation>('storeinformation');
      if (storeItems && storeItems.length > 0) {
        setStoreInfo(storeItems[0]);
      }

      const { items: toyItems } = await BaseCrudService.getAll<Toys>('toys');
      if (toyItems) {
        setToys(toyItems);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white font-paragraph selection:bg-primary selection:text-white overflow-x-clip">
      <Header />
      <WhatsAppFloatingButton />
      
      {/* 1. Hero Carousel (Image Only) */}
      <HeroCarousel />
      
      {/* 2. Shop By Age */}
      <ShopByAge />

      {/* 3. Best Sellers */}
      <BestSellers toys={toys} />

      {/* 4. Restored Video Marquee Section */}
      <section className="py-24 bg-gradient-to-b from-white to-light-pink/20 relative overflow-hidden">
        <div className="max-w-[120rem] mx-auto mb-16 px-6 text-center">
            <h2 className="font-heading text-4xl md:text-5xl text-primary mb-4">
              See It In Action
            </h2>
            <p className="font-paragraph text-lg text-foreground max-w-2xl mx-auto">
               A peek into the fun world waiting for you at our store.
            </p>
        </div>

        <div className="relative w-full">
          <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
            {/* Using the original VIDEO_REELS data */}
            {[...VIDEO_REELS, ...VIDEO_REELS, ...VIDEO_REELS].map((video, index) => (
              <MarqueeVideo key={`${video.id}-${index}`} video={video} />
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
            animation: marquee 60s linear infinite;
          }
      `}</style>
    </div>
  );
}