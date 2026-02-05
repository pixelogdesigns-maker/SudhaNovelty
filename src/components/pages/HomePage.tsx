// HPI 4.4-V (Mobile Optimized: Shop By Age Compact Layout)
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { SEOHelmet } from '@/components/SEOHelmet';
import { Image } from '@/components/ui/image';
import WhatsAppFloatingButton from '@/components/ui/WhatsAppFloatingButton';
import { StoreInformation, ToyCategories, Toys } from '@/entities';
import { BaseCrudService } from '@/integrations';
import {
  ChevronLeft, ChevronRight,
  Instagram,
  Sparkles
} from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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

const VIDEO_REELS: VideoReel[] = [
  { id: 'video-1', title: '', videoUrl: 'https://video.wixstatic.com/video/b9ec8c_450e40f9c7af4d8abffc2922377f3bdb/720p/mp4/file.mp4#t=0.001' },
  { id: 'video-2', title: '', videoUrl: 'https://video.wixstatic.com/video/b9ec8c_17915084739d420ea920a6e400088999/720p/mp4/file.mp4#t=0.001' },
  { id: 'video-3', title: '', videoUrl: 'https://video.wixstatic.com/video/b9ec8c_2ff14245efe44cfb9aa9c6ab341012e0/720p/mp4/file.mp4#t=0.001' },
  { id: 'video-4', title: '', videoUrl: 'https://video.wixstatic.com/video/b9ec8c_ad478e8adee9487ca1f530a14053e8b2/720p/mp4/file.mp4#t=0.001' },
  { id: 'video-5', title: '', videoUrl: 'https://video.wixstatic.com/video/b9ec8c_51ab037a44484917b9c05761fca6f25d/720p/mp4/file.mp4#t=0.001' },
];

const CATEGORY_COLORS = ["bg-purple-100", "bg-blue-100", "bg-orange-100", "bg-green-100", "bg-yellow-100", "bg-red-100", "bg-pink-100", "bg-indigo-100"];
// --- Updated Data Configuration ---

const HERO_SLIDES = [
  { id: 1, title: "Adventure Ride", image: "https://static.wixstatic.com/media/b9ec8c_5d24c2456de3486f861939b42aafb3e5~mv2.png" },
  { id: 2, title: "Fun and Thrills", image: "https://static.wixstatic.com/media/b9ec8c_5135147e7c924949868e6784a8ec2b0b~mv2.png" },
  { id: 3, title: "Ride into Fun", image: "https://static.wixstatic.com/media/b9ec8c_437473a0153547498fa1a693aef4ce42~mv2.png" },
  { id: 4, title: "Kids Toys", image: "https://static.wixstatic.com/media/b9ec8c_51a19e64d35b496b97f0804f5445f7ee~mv2.png" }
];

// NEW: Mobile specific images
const MOBILE_HERO_SLIDES = [
  { id: 1, image: "https://static.wixstatic.com/media/b9ec8c_9a7b30dd8f464616b3ecee1b90cc586c~mv2.png" },
  { id: 2, image: "https://static.wixstatic.com/media/b9ec8c_55eb79cc79b74508a0881287cb811e59~mv2.png" },
  { id: 3, image: "https://static.wixstatic.com/media/b9ec8c_8460879fc0c84f038e0fa1444a61b1cd~mv2.png" },
  { id: 4, image: "https://static.wixstatic.com/media/b9ec8c_589da27448cb46cfbc9a8632a26da300~mv2.png" },
  { id: 5, image: "https://static.wixstatic.com/media/b9ec8c_32347698fc164e3bbc315e012b3550a5~mv2.png" }
];

const HeroCarousel = () => {
  const [index, setIndex] = useState(1); // Start at index 1 due to infinite loop cloning
  const [isMobile, setIsMobile] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const SLIDE_DURATION = 4500;
  const TRANSITION_DURATION = 700;

  // 1. Detect Screen Size for Responsive Images
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 2. Setup Slides based on device
  const activeSlides = isMobile ? MOBILE_HERO_SLIDES : HERO_SLIDES;

  // Create infinite loop array: [last, ...all slides, first]
  const displaySlides = [
    activeSlides[activeSlides.length - 1],
    ...activeSlides,
    activeSlides[0]
  ];

  // 3. Auto-slide Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, [activeSlides.length]);

  // 4. Handle Animation and Infinite Loop Jump
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Apply smooth transition
    track.style.transition = `transform ${TRANSITION_DURATION}ms ease-in-out`;
    track.style.transform = `translateX(-${index * 100}%)`;

    // Loop back when reaching the cloned ends
    if (index === displaySlides.length - 1) {
      setTimeout(() => {
        track.style.transition = 'none';
        track.style.transform = `translateX(-100%)`;
        setIndex(1);
      }, TRANSITION_DURATION);
    } else if (index === 0) {
      setTimeout(() => {
        track.style.transition = 'none';
        track.style.transform = `translateX(-${(displaySlides.length - 2) * 100}%)`;
        setIndex(displaySlides.length - 2);
      }, TRANSITION_DURATION);
    }
  }, [index, displaySlides.length]);

  const handlePrev = () => setIndex((prev) => prev - 1);
  const handleNext = () => setIndex((prev) => prev + 1);

  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* Container aspect ratio optimization:
          Mobile uses your exact 1250/1406 ratio to prevent any cropping.
          Desktop maintains the 1300/390 resolution.
      */}
      <div
        className="w-full relative"
        style={{
          aspectRatio: isMobile ? "1250 / 1406" : "1300 / 390",
          minHeight: isMobile ? "auto" : "250px"
        }}
      >
        <div
          ref={trackRef}
          className="flex h-full w-full"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {displaySlides.map((slide, i) => (
            <Link
              key={`${slide.id}-${i}`}
              to="/toys"
              className="min-w-full h-full block"
            >
              <Image
                src={slide.image}
                alt="Sudha Novelties Hero"
                width={isMobile ? 1250 : 1300}
                height={isMobile ? 1406 : 390}
                priority={i === 1}
                // object-cover ensures it fills the calculated container perfectly
                className="w-full h-full object-cover object-center"
              />
            </Link>
          ))}
        </div>

        {/* Navigation Arrows - Styled for high visibility against busy backgrounds */}
        <button
          onClick={(e) => { e.preventDefault(); handlePrev(); }}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/30 backdrop-blur-md border border-white/50 text-black shadow-lg flex items-center justify-center hover:bg-white/50 transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={(e) => { e.preventDefault(); handleNext(); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/30 backdrop-blur-md border border-white/50 text-black shadow-lg flex items-center justify-center hover:bg-white/50 transition-all"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Optional: Slide Indicators (Dots) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {activeSlides.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                (index === i + 1) ? 'w-6 bg-primary' : 'w-2 bg-white/50'
              }`}
            />
          ))}
        </div>
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
    <section className="relative pt-12 md:pt-28 pb-16 md:pb-32 bg-[#DCD1F2] overflow-hidden font-sans">
      {/* Top Brush Stroke */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-10">
        <svg
          viewBox="0 0 1200 50"
          preserveAspectRatio="none"
          className="relative block w-full h-[20px] md:h-[50px]"
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
      <div className="relative z-10 max-w-[120rem] mx-auto px-3 sm:px-4 md:px-6">
        <div className="text-center mb-8 sm:mb-10 md:mb-16">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl text-[#3D2C5E] font-bold tracking-wide mb-2 drop-shadow-sm">Shop By Age</h2>
          <p className="text-[#5A4685] font-medium tracking-wide text-xs sm:text-sm md:text-base px-2">
             Curated collections for every little milestone.
          </p>
        </div>

        {/* MOBILE OPTIMIZATION:
            3 columns on mobile, 3 on tablet, 6 on desktop
            Reduced gaps for mobile to save space
        */}
        <div className="grid grid-cols-3 gap-x-2 sm:gap-x-3 md:gap-x-6 gap-y-6 sm:gap-y-8 md:gap-y-12">
          {AGE_GROUPS.map((group, index) => (
            <Link
              key={index}
              to={`/toys?age=${getAgeGroupId(group.range)}`}
              className="group flex flex-col items-center cursor-pointer"
            >
              {/* SIZING OPTIMIZATION:
                  Mobile: w-16 h-16 (64px)
                  Tablet: w-24 h-24
                  Desktop: w-44 h-44
              */}
              <div className={`
                relative w-16 h-16 sm:w-24 sm:h-24 md:w-44 md:h-44 rounded-full
                ${group.color}
                flex flex-col items-center justify-center
                shadow-lg border-[2px] sm:border-[3px] md:border-[4px] border-white
                transition-all duration-300 ease-out
                group-hover:scale-110 group-hover:shadow-xl
              `}>
                <span className="text-2xl sm:text-4xl md:text-7xl filter drop-shadow-sm transform transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                  {group.icon}
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/40 via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="text-center mt-2 sm:mt-3 md:mt-6">
                <h3 className="font-heading text-sm sm:text-lg md:text-3xl text-[#3D2C5E] font-bold leading-none mb-0.5">
                  {group.range}
                </h3>
                {/* Reduced text size for mobile so labels don't wrap awkwardly */}
                <p className="text-[#5A4685] text-[8px] sm:text-[10px] md:text-sm font-bold tracking-widest uppercase">
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
          className="relative block w-full h-[20px] md:h-[50px]"
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



// 6. Shop By Category
const ShopByCategory = ({ categories }: { categories: ToyCategories[] }) => {
  const PREV_SECTION_BG = "#FFFFFF";
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
        <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-12 md:mb-16 flex justify-between items-center">
          <span>Shop By Category</span>
          <Link to="/toys" className="font-bold text-gray-500 hover:text-primary underline decoration-2 underline-offset-4 transition-colors text-lg md:text-xl">All Products</Link>
        </h2>
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
      videoRef.current.play().catch(() => {
        // Autoplay prevented - silent fail is acceptable
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
      } catch {
        // Error fetching data - silently fail with defaults
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
        <div className="max-w-[120rem] mx-auto mb-12 px-4 md:px-6 text-center">
            <h2 className="font-heading text-4xl md:text-5xl text-primary mb-4">See It In Action</h2>
            <p className="font-paragraph text-lg text-foreground max-w-2xl mx-auto mb-8">A peek into the fun world waiting for you at our store.</p>
            <a
              href="https://www.instagram.com/sudha_novelties_?igsh=MWI4Zzlvdjk1cjc3YQ%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-all duration-300 hover:shadow-lg"
            >
              <Instagram size={20} />
              Follow Us on Instagram
            </a>
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
