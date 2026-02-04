// HPI 4.4-V (Mobile Optimized: Shop By Age Compact Layout)
import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { StoreInformation, Toys, ToyCategories } from '@/entities';
import { Image } from '@/components/ui/image';
import { 
  Star, ShoppingBag, ChevronLeft, ChevronRight, 
  Heart, Sparkles, ArrowRight 
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppFloatingButton from '@/components/ui/WhatsAppFloatingButton';
import { SEOHelmet } from '@/components/SEOHelmet';

// --- Types ---
interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
  isBestSellingNow?: boolean | number;
}

interface VideoReel {
  id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl?: string;
  description?: string;
}

// --- Data Configuration ---

// UPDATED: New 1300x190 Resolution Images
const HERO_SLIDES = [
  { 
    id: 1, 
    title: "Adventure Ride", 
    image: "https://static.wixstatic.com/media/b9ec8c_5d24c2456de3486f861939b42aafb3e5~mv2.png" 
  },
  { 
    id: 2, 
    title: "Fun and Thrills", 
    image: "https://static.wixstatic.com/media/b9ec8c_5135147e7c924949868e6784a8ec2b0b~mv2.png" 
  },
  { 
    id: 3, 
    title: "Ride into Fun", 
    image: "https://static.wixstatic.com/media/b9ec8c_437473a0153547498fa1a693aef4ce42~mv2.png" 
  },
  { 
    id: 4, 
    title: "Kids Toys", 
    image: "https://static.wixstatic.com/media/b9ec8c_51a19e64d35b496b97f0804f5445f7ee~mv2.png" 
  }
];

const VIDEO_REELS: VideoReel[] = [
  { id: 'video-1', title: '', videoUrl: 'https://video.wixstatic.com/video/b9ec8c_450e40f9c7af4d8abffc2922377f3bdb/720p/mp4/file.mp4#t=0.001' },
  { id: 'video-2', title: '', videoUrl: 'https://video.wixstatic.com/video/b9ec8c_17915084739d420ea920a6e400088999/720p/mp4/file.mp4#t=0.001' },
  { id: 'video-3', title: '', videoUrl: 'https://video.wixstatic.com/video/b9ec8c_2ff14245efe44cfb9aa9c6ab341012e0/720p/mp4/file.mp4#t=0.001' },
  { id: 'video-4', title: '', videoUrl: 'https://video.wixstatic.com/video/b9ec8c_ad478e8adee9487ca1f530a14053e8b2/720p/mp4/file.mp4#t=0.001' },
  { id: 'video-5', title: '', videoUrl: 'https://video.wixstatic.com/video/b9ec8c_51ab037a44484917b9c05761fca6f25d/720p/mp4/file.mp4#t=0.001' },
];

const CATEGORY_COLORS = ["bg-purple-100", "bg-blue-100", "bg-orange-100", "bg-green-100", "bg-yellow-100", "bg-red-100", "bg-pink-100", "bg-indigo-100"];

// --- Sub-Components ---

// 1. Hero Carousel (Smooth Continuous Slide Animation with Infinite Loop)
const HeroCarousel = () => {
  const [index, setIndex] = useState(0);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const SLIDE_DURATION = 4500; // ms
  const TRANSITION_DURATION = 700; // ms

  // Create infinite loop: [last, ...all slides, first]
  const slides = [HERO_SLIDES[HERO_SLIDES.length - 1], ...HERO_SLIDES, HERO_SLIDES[0]];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Apply transition for normal slides
    track.style.transition = `transform ${TRANSITION_DURATION}ms ease-in-out`;
    track.style.transform = `translateX(-${index * 100}%)`;

    // When reaching the last cloned slide (which is the first slide), loop back
    if (index === slides.length - 1) {
      setTimeout(() => {
        track.style.transition = 'none';
        track.style.transform = `translateX(-${1 * 100}%)`; // Jump to first real slide
        setIndex(1);
      }, TRANSITION_DURATION);
    }
    // When going backwards past the first cloned slide, jump to last real slide
    else if (index === 0) {
      setTimeout(() => {
        track.style.transition = 'none';
        track.style.transform = `translateX(-${(slides.length - 2) * 100}%)`; // Jump to last real slide
        setIndex(slides.length - 2);
      }, TRANSITION_DURATION);
    }
  }, [index, slides.length]);

  const handlePrev = () => {
    setIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    setIndex((prev) => prev + 1);
  };

  return (
    <section className="relative w-full overflow-hidden bg-gray-100">
      {/* Aspect ratio wrapper */}
      <div className="w-full aspect-[384/200] md:aspect-[1300/390]">
        <div
          ref={trackRef}
          className="flex h-full w-full"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <Link
              key={i}
              to="/toys"
              className="min-w-full h-full block"
            >
              <Image
                src={slide.image}
                alt={slide.title}
                width={1300}
                height={390}
                priority={i === 0 || i === 1}
                className="w-full h-full object-cover"
              />
            </Link>
          ))}
        </div>

        {/* Navigation Arrows - Minimal UI Design */}
        <button
          onClick={handlePrev}
          className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-black bg-transparent text-black hover:bg-black/5 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} className="md:w-6 md:h-6 w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-black bg-transparent text-black hover:bg-black/5 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center"
          aria-label="Next slide"
        >
          <ChevronRight size={24} className="md:w-6 md:h-6 w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

// 2. Text Marquee (Mobile Optimized)
const TextMarquee = () => {
  const marqueeItems = [
    "BATTERY JEEP", "BATTERY BIKE", "RIDEONS", "RC CARS",
    "SLIDERS", "CYCLES", "KIDS TOYS", "DECORATIVES"
  ];

  return (
    // Reduced padding from py-3 to py-2 on mobile
    <div className="w-full bg-[#EC4899] py-2 md:py-3 overflow-hidden">
      <div className="flex w-max animate-marquee-fast hover:[animation-play-state:paused]">
        {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
          // Reduced margin from mx-4 to mx-2 on mobile
          (<div key={index} className="flex items-center mx-2 md:mx-4">
            {/* Reduced text size from text-sm to text-xs on mobile */}
            <span className="text-white font-bold text-xs md:text-base tracking-widest uppercase">
              {item}
            </span>
            {/* Reduced separator spacing */}
            <span className="text-white/60 mx-2 md:mx-4">•</span>
          </div>)
        ))}
      </div>
      <style>{`
        .animate-marquee-fast {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

// 3. Shop By Age (Mobile Optimized: 3 Columns)
const ShopByAge = () => {
  const getAgeGroupId = (range: string) => {
    const ageMap: { [key: string]: string } = { 
      '0-1': '0-2', '1-3': '3-5', '3-5': '3-5', 
      '5-8': '6-8', '8-12': '9-12', '12+': '13+' 
    };
    return ageMap[range] || range;
  };

  const AGE_GROUPS = [
    { label: "MONTHS", range: "0-1", color: "bg-[#A7F3D0]", icon: "👶" },
    { label: "YEARS", range: "1-3", color: "bg-[#BFDBFE]", icon: "🧸" },
    { label: "YEARS", range: "3-5", color: "bg-[#FECACA]", icon: "🎨" },
    { label: "YEARS", range: "5-8", color: "bg-[#FDE68A]", icon: "🚀" },
    { label: "YEARS", range: "8-12", color: "bg-[#DDD6FE]", icon: "🧩" },
    { label: "YEARS", range: "12+", color: "bg-[#FDBA74]", icon: "🎮" },
  ];

  const NEXT_SECTION_BG = "#FFF8F3"; 
  const PREV_SECTION_BG = "#FFFFFF"; 

  return (
    // Reduced top/bottom padding on mobile to save space
    <section className="relative pt-16 md:pt-28 pb-20 md:pb-32 bg-[#DCD1F2] overflow-hidden font-sans">
      {/* Top Brush Stroke */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-10">
        <svg 
          viewBox="0 0 1200 50" 
          preserveAspectRatio="none" 
          className="relative block w-full h-[30px] md:h-[50px]"
          style={{ transform: 'scaleY(-1)' }}
        >
          <path 
            d="M0,0 C150,15 250,5 400,12 C550,20 650,5 800,10 C950,15 1050,0 1200,5 V50 H0 V0 Z" 
            fill={PREV_SECTION_BG} 
          ></path>
           <path 
             d="M0,50 L0,0 Q150,15 300,5 T600,10 T900,5 T1200,15 V50 Z"
             fill={PREV_SECTION_BG}
          />
        </svg>
      </div>
      <div className="relative z-10 max-w-[120rem] mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="font-heading text-3xl md:text-5xl text-[#3D2C5E] font-bold tracking-wide mb-2 drop-shadow-sm">Shop By Age</h2>
          <p className="text-[#5A4685] font-medium tracking-wide text-sm md:text-base">
             Curated collections for every little milestone.
          </p>
        </div>

        {/* MOBILE OPTIMIZATION: 
            Changed grid-cols-2 to grid-cols-3 for mobile.
            This puts 3 items per row, reducing the total rows from 3 to 2.
        */}
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-x-3 md:gap-x-6 gap-y-8 md:gap-y-12">
          {AGE_GROUPS.map((group, index) => (
            <Link 
              key={index} 
              to={`/toys?age=${getAgeGroupId(group.range)}`} 
              className="group flex flex-col items-center cursor-pointer"
            >
              {/* SIZING OPTIMIZATION: 
                  Reduced mobile size to w-20 h-20 (80px) to fit 3 in a row.
                  Desktop stays spacious at w-44 h-44.
              */}
              <div className={`
                relative w-20 h-20 sm:w-28 sm:h-28 md:w-44 md:h-44 rounded-full 
                ${group.color} 
                flex flex-col items-center justify-center 
                shadow-lg border-[3px] md:border-[4px] border-white
                transition-all duration-300 ease-out
                group-hover:scale-110 group-hover:shadow-xl
              `}>
                <span className="text-3xl sm:text-4xl md:text-7xl filter drop-shadow-sm transform transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                  {group.icon}
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/40 via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="text-center mt-3 md:mt-6">
                <h3 className="font-heading text-lg md:text-3xl text-[#3D2C5E] font-bold leading-none mb-1">
                  {group.range}
                </h3>
                {/* Reduced text size for mobile so labels don't wrap awkwardly */}
                <p className="text-[#5A4685] text-[10px] md:text-sm font-bold tracking-widest uppercase">
                  {group.label}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* Bottom Brush Stroke */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-10">
        <svg 
          viewBox="0 0 1200 50" 
          preserveAspectRatio="none" 
          className="relative block w-full h-[30px] md:h-[50px]"
        >
          <path 
            d="M0,50 L0,0 Q150,15 300,5 T600,10 T900,5 T1200,15 V50 Z" 
            fill={NEXT_SECTION_BG} 
          ></path>
        </svg>
      </div>
    </section>
  );
};

// 4. Best Sellers
const BestSellers = ({ toys }: { toys: Toys[] }) => {
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    
    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = node;
      setScrollPosition(scrollLeft);
      setCanScrollPrev(scrollLeft > 0);
      setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 10);
    };
    
    node.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => node.removeEventListener('scroll', handleScroll);
  }, []);

  const bestSellers = toys
    .filter((toy: any) => toy.isBestSellingNow) 
    .slice(0, 4); 

  if (toys.length === 0) {
    return (
      <section className="py-24 bg-[#FFF8F3] overflow-hidden min-h-[600px]">
         <div className="max-w-[120rem] mx-auto px-6">
            <div className="h-10 w-64 bg-gray-200 rounded-lg animate-pulse mb-12"></div>
            <div className="flex gap-6 overflow-hidden">
               {[1,2,3,4].map(i => (
                 <div key={i} className="flex-shrink-0 w-72 h-96 bg-white rounded-3xl animate-pulse"></div>
               ))}
            </div>
         </div>
      </section>
    );
  }

  if (bestSellers.length === 0) {
    return null; 
  }

  return (
    <section className="py-24 pb-0 bg-[#FFF8F3] relative overflow-hidden min-h-[600px] mt-0 pt-0">
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
            <button onClick={() => {
              if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
              }
            }} disabled={!canScrollPrev} className={`p-4 rounded-full border border-gray-200 bg-white transition-all ${!canScrollPrev ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary hover:text-white'}`}><ChevronLeft size={24} /></button>
            <button onClick={() => {
              if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
              }
            }} disabled={!canScrollNext} className={`p-4 rounded-full border border-gray-200 bg-white transition-all ${!canScrollNext ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary hover:text-white'}`}><ChevronRight size={24} /></button>
          </div>
        </div>

        <div className="overflow-x-auto scrollbar-hide" ref={scrollContainerRef}>
          <div className="flex gap-6 pb-12 w-max">
            {bestSellers.map((product) => (
              <div className="flex-shrink-0 w-80" key={product._id}>
                <Link to={`/toys/${product._id}`} className="group relative bg-white rounded-3xl p-4 transition-all duration-300 hover:shadow-xl border border-transparent hover:border-pink-100 block h-full">
                  <div className="absolute top-6 left-6 z-10 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full">Hot</div>
                  <div className="relative aspect-square rounded-2xl bg-gray-50 overflow-hidden mb-4">
                      {(() => {
                      let imageUrl = 'https://static.wixstatic.com/media/b9ec8c_d42971f3a67c446198b683dfb6302897~mv2.png?originWidth=384&originHeight=384';
                      if (product.productGallery?.[0]) imageUrl = product.productGallery[0].src || product.productGallery[0].url || product.productGallery[0];
                      else if (product.productImages1?.[0]) imageUrl = product.productImages1[0].src || product.productImages1[0].url || product.productImages1[0];
                      else if (typeof product.productImages === 'string') imageUrl = product.productImages;
                      else if (typeof product.image === 'string') imageUrl = product.image;
                      return (
                        <Image src={imageUrl} alt={product.name || 'Product'} width={400} height={400} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      );
                    })()}
                  </div>
                  <div className="px-2 pb-2">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">{product.category}</p>
                    <h3 className="font-heading text-xl text-foreground mb-2 truncate">{product.name}</h3>
                    <span className="text-lg font-bold text-primary">Rs. {product.price?.toFixed(2)}</span>
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

// 5. Shop By Category
const ShopByCategory = ({ categories }: { categories: ToyCategories[] }) => {
  const PREV_SECTION_BG = "#FFF8F3";
  const NEXT_SECTION_BG = "#FFFFFF";
  const CATEGORY_BG = "#E0F7FF";

  if (categories.length === 0) {
    return (
      <section className="relative pt-16 md:pt-28 pb-20 md:pb-32 bg-[#E0F7FF] overflow-hidden min-h-[500px]">
        {/* Top Brush Stroke */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-10">
          <svg 
            viewBox="0 0 1200 50" 
            preserveAspectRatio="none" 
            className="relative block w-full h-[30px] md:h-[50px]"
            style={{ transform: 'scaleY(-1)' }}
          >
            <path 
              d="M0,0 C150,15 250,5 400,12 C550,20 650,5 800,10 C950,15 1050,0 1200,5 V50 H0 V0 Z" 
              fill={PREV_SECTION_BG} 
            ></path>
             <path 
              d="M0,50 L0,0 Q150,15 300,5 T600,10 T900,5 T1200,15 V50 Z"
              fill={PREV_SECTION_BG}
           />
          </svg>
        </div>

        <div className="relative z-10 max-w-[120rem] mx-auto px-6">
           <div className="h-10 w-64 bg-gray-200 rounded-lg animate-pulse mb-16"></div>
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-12">
              {[1,2,3,4,5,6].map(i => (
                 <div key={i} className="flex flex-col items-center gap-5">
                    <div className="w-40 h-40 rounded-full bg-gray-200 animate-pulse"></div>
                    <div className="w-24 h-6 bg-gray-200 rounded animate-pulse"></div>
                 </div>
              ))}
           </div>
        </div>

        {/* Bottom Brush Stroke */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-10">
          <svg 
            viewBox="0 0 1200 50" 
            preserveAspectRatio="none" 
            className="relative block w-full h-[30px] md:h-[50px]"
          >
            <path 
              d="M0,50 L0,0 Q150,15 300,5 T600,10 T900,5 T1200,15 V50 Z" 
              fill={NEXT_SECTION_BG} 
            ></path>
          </svg>
        </div>
      </section>
    );
  }

  return (
    <section className="relative pt-8 md:pt-12 pb-20 md:pb-32 bg-[#E0F7FF] overflow-hidden min-h-[500px]">
      {/* Top Brush Stroke */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-10">
        <svg 
          viewBox="0 0 1200 50" 
          preserveAspectRatio="none" 
          className="relative block w-full h-[30px] md:h-[50px]"
          style={{ transform: 'scaleY(-1)' }}
        >
          <path 
            d="M0,0 C150,15 250,5 400,12 C550,20 650,5 800,10 C950,15 1050,0 1200,5 V50 H0 V0 Z" 
            fill={PREV_SECTION_BG} 
          ></path>
           <path 
            d="M0,50 L0,0 Q150,15 300,5 T600,10 T900,5 T1200,15 V50 Z"
            fill={PREV_SECTION_BG}
         />
        </svg>
      </div>

      <div className="relative z-10 max-w-[120rem] mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <h2 className="font-heading text-4xl md:text-5xl text-foreground">Shop By Category</h2>
          <Link to="/toys" className="font-bold text-gray-500 hover:text-primary underline decoration-2 underline-offset-4 transition-colors">All Products</Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-12">
          {categories.map((cat, index) => (
            <Link key={cat._id} to={`/toys?category=${encodeURIComponent(cat.categoryName || '')}`} className="group flex flex-col items-center gap-5">
              <div className={`
                relative w-40 h-40 md:w-48 md:h-48 rounded-full ${CATEGORY_COLORS[index % CATEGORY_COLORS.length]} 
                flex items-center justify-center shadow-sm transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl
                border-[3px] md:border-[4px] border-white
              `}>
                {cat.categoryImage ? (
                  <div className="w-32 h-32 md:w-40 md:h-40 relative z-10">
                    <Image src={cat.categoryImage} alt={cat.categoryName || 'Category'} width={200} className="w-full h-full object-contain drop-shadow-md transform transition-transform duration-500 group-hover:rotate-3 group-hover:scale-110" />
                  </div>
                ) : (
                  <div className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center text-4xl font-bold text-gray-300">{cat.categoryName?.charAt(0) || '?'}</div>
                )}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/40 to-transparent pointer-events-none" />
              </div>
              <h3 className="font-heading font-bold text-center text-lg md:text-xl text-foreground group-hover:text-primary transition-colors max-w-[180px] leading-tight">
                {cat.categoryName}
              </h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Brush Stroke */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-10">
        <svg 
          viewBox="0 0 1200 50" 
          preserveAspectRatio="none" 
          className="relative block w-full h-[30px] md:h-[50px]"
        >
          <path 
            d="M0,50 L0,0 Q150,15 300,5 T600,10 T900,5 T1200,15 V50 Z" 
            fill={NEXT_SECTION_BG} 
          ></path>
        </svg>
      </div>
    </section>
  );
};

// 6. Video Marquee Component
const MarqueeVideo = ({ video }: { video: VideoReel }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(error => {
        console.log("Autoplay prevented:", error);
      });
    }
  }, []);

  return (
    <div className="relative h-[350px] md:h-[500px] aspect-[9/16] rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-gray-200 flex-shrink-0 mx-3 md:mx-4 transform transition-transform hover:scale-[1.02]">
      <video
        ref={videoRef}
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
  const [categories, setCategories] = useState<ToyCategories[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { items: storeItems } = await BaseCrudService.getAll<StoreInformation>('storeinformation');
        if (storeItems && storeItems.length > 0) setStoreInfo(storeItems[0]);
        
        const { items: toyItems } = await BaseCrudService.getAll<Toys>('toys');
        if (toyItems) setToys(toyItems);

        const { items: categoryItems } = await BaseCrudService.getAll<ToyCategories>('toycategories');
        if (categoryItems) {
          setCategories(categoryItems.filter(cat => cat.isActive).sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
        }
      } catch (error) {
        console.error('Error fetching homepage data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white font-paragraph selection:bg-primary selection:text-white overflow-x-clip">
      <SEOHelmet 
        title="Sudha Novelties - Premium Toys & Novelties Store | Best Toys for All Ages"
        description="Discover premium toys and novelties at Sudha Novelties. Shop quality toys for kids of all ages with fast delivery. Visit our store or shop online today!"
        keywords="toys store, premium toys, toys for kids, novelties, best sellers, toy shop"
        canonical="https://sudha-novelties.com"
        ogImage="https://static.wixstatic.com/media/b9ec8c_2c707b58db4c403ea854846b7dc81a3a~mv2.png"
      />
      <Header />
      <WhatsAppFloatingButton />
      
      {/* 1. Hero Carousel */}
      <HeroCarousel />
      
      {/* 2. Text Marquee */}
      <TextMarquee />
      
      {/* 3. Shop By Age */}
      <ShopByAge />

      {/* 4. Best Sellers */}
      <BestSellers toys={toys} />

      {/* 5. Shop By Category */}
      <ShopByCategory categories={categories} />

      {/* 6. Video Marquee Section */}
      <section id="videos" className="py-24 bg-gradient-to-b from-white to-light-pink/20 relative overflow-hidden">
        <div className="max-w-[120rem] mx-auto mb-16 px-4 md:px-6 text-center">
            <h2 className="font-heading text-4xl md:text-5xl text-primary mb-4">See It In Action</h2>
            <p className="font-paragraph text-lg text-foreground max-w-2xl mx-auto">A peek into the fun world waiting for you at our store.</p>
        </div>

        <div className="relative w-full">
          <div className="hidden md:block absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="hidden md:block absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
            {[...VIDEO_REELS, ...VIDEO_REELS, ...VIDEO_REELS].map((video, index) => (
              <MarqueeVideo key={`${video.id}-${index}`} video={video} />
            ))}
          </div>
        </div>
      </section>

      {/* Keep Location Section */}
      <section className="py-24 bg-light-pink/20">
        <div className="max-w-[120rem] mx-auto px-4 md:px-6 text-center">
             <h2 className="font-heading text-4xl mb-6">Visit Our Store</h2>
             <p className="text-xl text-gray-600 mb-8">{storeInfo?.address || '123 Toy Street'}</p>
             <Link to="/visit" className="inline-block px-8 py-4 bg-foreground text-white rounded-xl font-bold">Get Directions</Link>
        </div>
      </section>

      <Footer />

      <style>{`
          @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .animate-marquee { animation: marquee 60s linear infinite; }
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}