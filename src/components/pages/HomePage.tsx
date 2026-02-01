// HPI 3.0-V (Aegle-Inspired Layout: Hero Slider + Shop By Age + Best Sellers)
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import { BaseCrudService } from '@/integrations';
import { ToyCategories, StoreInformation } from '@/entities';
import { Image } from '@/components/ui/image';
import { MessageCircle, Award, Shield, Heart, Store, Star, Sparkles, MapPin, Clock, ArrowRight, CheckCircle2, ShoppingBag, ChevronRight, ChevronLeft } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppFloatingButton from '@/components/ui/WhatsAppFloatingButton';

// --- Utility Components ---
const AnimatedReveal = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: delay * 0.001 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- SUB-COMPONENT: Hero Slider (Section 1) ---
const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      image: "https://static.wixstatic.com/media/b9ec8c_f039ee8f733d4693a89035885a18d299~mv2.png?originWidth=768&originHeight=960",
      title: "Play, Learn, Grow",
      subtitle: "Premium educational toys for curious minds.",
      cta: "Shop Collection",
      color: "bg-blue-50"
    },
    {
      id: 2,
      image: "https://static.wixstatic.com/media/b9ec8c_2ca344a9396c4f04a5d303aa5c79e93c~mv2.png?originWidth=768&originHeight=384",
      title: "New Arrivals",
      subtitle: "The latest fun has just landed in store.",
      cta: "Discover More",
      color: "bg-pink-50"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <section className="relative h-[600px] md:h-[700px] w-full overflow-hidden">
      <motion.div
        key={currentSlide}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className={`${slide.color} absolute inset-0`}
      >
        {/* Background Image Layer */}
        <div className="absolute inset-0">
          <Image 
            src={slide.image} 
            alt={slide.title} 
            className="w-full h-full object-cover opacity-80" 
            width={1920}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent" />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 h-full max-w-[120rem] mx-auto px-6 flex items-center">
          <div className="max-w-2xl pt-20">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold uppercase tracking-wider mb-6"
            >
              Welcome to Our World
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-heading text-6xl md:text-8xl text-foreground mb-6 leading-tight"
            >
              {slide.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="font-paragraph text-xl text-gray-600 mb-10 max-w-lg"
            >
              {slide.subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Link to="/toys" className="bg-primary text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2">
                {slide.cta} <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all duration-300 ${
              idx === currentSlide
                ? 'w-8 h-3 bg-primary rounded-full'
                : 'w-3 h-3 bg-gray-300 rounded-full hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

// --- SUB-COMPONENT: Shop By Age (Section 2) ---
const ShopByAge = () => {
  const ages = [
    { label: "0-12 Months", range: "0-1", image: "https://placehold.co/200x200/FFB6C1/white?text=Baby" },
    { label: "1-2 Years", range: "1-2", image: "https://placehold.co/200x200/ADD8E6/white?text=Toddler" },
    { label: "3-5 Years", range: "3-5", image: "https://placehold.co/200x200/90EE90/white?text=Preschool" },
    { label: "6-9 Years", range: "6-9", image: "https://placehold.co/200x200/FFD700/white?text=School" },
    { label: "10+ Years", range: "10-99", image: "https://placehold.co/200x200/D3D3D3/white?text=Teen" },
    { label: "Grown Ups", range: "18-99", image: "https://placehold.co/200x200/E6E6FA/white?text=Adult" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[120rem] mx-auto px-6">
        <div className="text-center mb-16">
           <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4">Shop By Age</h2>
           <p className="text-gray-500">Find the perfect gift for every stage of development</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {ages.map((age, idx) => (
            <Link key={idx} to={`/toys?age=${age.range}`} className="group flex flex-col items-center">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-transparent group-hover:border-primary transition-all duration-300 shadow-md group-hover:shadow-xl relative mb-4">
                <Image src={age.image} alt={age.label} width={200} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>
              <h3 className="font-heading text-xl text-gray-800 group-hover:text-primary transition-colors">{age.label}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- SUB-COMPONENT: Best Sellers (Section 3) ---
const BestSellers = () => {
  // MOCK DATA - Replace with actual data fetch if available
  const products = [
    { id: 1, name: "Wooden Stacking Rainbow", price: "₹1,299", image: "https://static.wixstatic.com/media/b9ec8c_2c7c3392b6544f1093b680407e664a6a~mv2.png?originWidth=576&originHeight=768" },
    { id: 2, name: "Educational Clock", price: "₹899", image: "https://static.wixstatic.com/media/b9ec8c_6119fa220f48469bbdeedcc80240d1df~mv2.png?originWidth=768&originHeight=960" },
    { id: 3, name: "Soft Plush Bunny", price: "₹1,499", image: "https://static.wixstatic.com/media/b9ec8c_f039ee8f733d4693a89035885a18d299~mv2.png?originWidth=768&originHeight=960" },
    { id: 4, name: "Magnetic Building Blocks", price: "₹2,499", image: "https://static.wixstatic.com/media/b9ec8c_ad478e8adee9487ca1f530a14053e8b2~mv2.png?originWidth=768&originHeight=960" },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-[120rem] mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
           <h2 className="font-heading text-4xl md:text-5xl text-foreground">Best Sellers</h2>
           <Link to="/toys" className="hidden md:flex items-center gap-2 font-bold text-primary hover:text-primary/80 transition-colors">
             View All <ArrowRight size={20} />
           </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-4">
                <Image src={product.image} alt={product.name} width={400} className="w-full h-full object-cover" />
                
                {/* Quick Action Overlay */}
                <div className="absolute inset-x-4 bottom-4 translate-y-[150%] group-hover:translate-y-0 transition-transform duration-300">
                  <button className="w-full bg-white text-foreground font-bold py-3 rounded-xl shadow-lg hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2">
                    <ShoppingBag size={18} /> Add to Cart
                  </button>
                </div>
              </div>
              
              <div className="px-2 pb-2">
                <h3 className="font-bold text-lg text-gray-800 mb-1 truncate">{product.name}</h3>
                <p className="text-primary font-bold text-xl">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <Link to="/toys" className="inline-flex items-center gap-2 font-bold text-primary">
             View All Products <ArrowRight size={20} />
           </Link>
        </div>
      </div>
    </section>
  );
};

// --- HELPER: Marquee Video (Section 4 - Existing) ---
interface VideoReel {
  id: string;
  videoUrl: string;
  thumbnailUrl?: string;
}

const MarqueeVideo = ({ video }: { video: VideoReel }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(e => console.log("Autoplay blocked", e));
    }
  }, []);

  return (
    <div className="relative h-[400px] md:h-[500px] aspect-[9/16] rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-gray-200">
      <video
        ref={videoRef}
        src={video.videoUrl} 
        poster={video.thumbnailUrl}
        loop
        muted
        playsInline
        webkit-playsinline="true"
        className="w-full h-full object-cover pointer-events-none" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </div>
  );
};

// --- MAIN COMPONENT ---

export default function HomePage() {
  const [storeInfo, setStoreInfo] = useState<StoreInformation | null>(null);

  // --- WIX VIDEO DATA ---
  const videoReels: VideoReel[] = [
    { id: 'v1', videoUrl: 'https://video.wixstatic.com/video/b9ec8c_450e40f9c7af4d8abffc2922377f3bdb/720p/mp4/file.mp4#t=0.001', thumbnailUrl: 'https://placehold.co/400x700/pink/white?text=Video1' },
    { id: 'v2', videoUrl: 'https://video.wixstatic.com/video/b9ec8c_17915084739d420ea920a6e400088999/720p/mp4/file.mp4#t=0.001', thumbnailUrl: 'https://placehold.co/400x700/blue/white?text=Video2' },
    { id: 'v3', videoUrl: 'https://video.wixstatic.com/video/b9ec8c_2ff14245efe44cfb9aa9c6ab341012e0/720p/mp4/file.mp4#t=0.001', thumbnailUrl: 'https://placehold.co/400x700/green/white?text=Video3' },
    { id: 'v4', videoUrl: 'https://video.wixstatic.com/video/b9ec8c_ad478e8adee9487ca1f530a14053e8b2/720p/mp4/file.mp4#t=0.001', thumbnailUrl: 'https://placehold.co/400x700/yellow/white?text=Video4' },
    { id: 'v5', videoUrl: 'https://video.wixstatic.com/video/b9ec8c_51ab037a44484917b9c05761fca6f25d/720p/mp4/file.mp4#t=0.001', thumbnailUrl: 'https://placehold.co/400x700/purple/white?text=Video5' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const { items: storeItems } = await BaseCrudService.getAll<StoreInformation>('storeinformation');
      if (storeItems && storeItems.length > 0) setStoreInfo(storeItems[0]);
    };
    fetchData();
  }, []);

  const features = [
    { icon: Award, title: 'Premium Quality', description: 'Certified safe and built to last generations.', color: 'bg-blue-100 text-blue-600' },
    { icon: Shield, title: 'Non-Toxic', description: '100% child-safe materials for worry-free play.', color: 'bg-green-100 text-green-600' },
    { icon: Heart, title: 'Curated Selection', description: 'Toys selected for developmental value.', color: 'bg-pink-100 text-pink-600' },
    { icon: Store, title: 'Visit Us', description: 'Experience the magic at our local store.', color: 'bg-yellow-100 text-yellow-600' },
  ];

  return (
    <div className="min-h-screen bg-white font-paragraph selection:bg-primary selection:text-white overflow-x-clip">
      <Header />
      <WhatsAppFloatingButton />

      {/* --- SECTION 1: HERO SLIDER --- */}
      <HeroSlider />

      {/* --- SECTION 2: SHOP BY AGE --- */}
      <ShopByAge />

      {/* --- SECTION 3: BEST SELLERS --- */}
      <BestSellers />

      {/* --- SECTION 4: INFINITE VIDEO REEL (Moved Down) --- */}
      <section id="videos" className="py-24 bg-gradient-to-b from-white to-light-pink/20 relative overflow-hidden">
        <div className="max-w-[120rem] mx-auto mb-16 px-6 text-center">
          <AnimatedReveal>
            <h2 className="font-heading text-4xl md:text-5xl text-primary mb-4">See It In Action</h2>
            <p className="font-paragraph text-lg text-foreground max-w-2xl mx-auto">
               A peek into the fun world waiting for you at our store.
            </p>
          </AnimatedReveal>
        </div>

        <div className="relative w-full px-4 md:px-0">
          <Swiper
            modules={[Autoplay, FreeMode]}
            loop={true}
            freeMode={true}
            spaceBetween={20}
            slidesPerView={'auto'}
            centeredSlides={true}
            speed={4000}
            autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}
            className="w-full"
            style={{ transitionTimingFunction: 'linear' }}
          >
            {videoReels.map((video) => (
              <SwiperSlide key={video.id} style={{ width: 'auto' }}>
                 <MarqueeVideo video={video} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* --- SECTION 5: FEATURES --- */}
      <section className="py-24 bg-white">
        <div className="max-w-[120rem] mx-auto px-6">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                  <AnimatedReveal key={index} delay={index * 100} direction="up">
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-pink-100 h-full text-center">
                      <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mb-6 mx-auto`}>
                        <feature.icon size={32} />
                      </div>
                      <h3 className="font-heading text-xl text-foreground mb-3">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </AnimatedReveal>
                ))}
           </div>
        </div>
      </section>

      {/* --- SECTION 6: LOCATION --- */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] pointer-events-none" />
         <div className="max-w-[120rem] mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               <div className="order-2 lg:order-1">
                  <AnimatedReveal>
                    <h2 className="font-heading text-4xl md:text-5xl mb-8">Visit Our Wonderland</h2>
                    <p className="text-gray-300 text-lg mb-12 max-w-md">
                      Touch, feel, and play before you buy. Our store is a safe haven for imagination.
                    </p>
                    <div className="space-y-8">
                       <div className="flex gap-6">
                          <MapPin className="text-primary shrink-0" size={32} />
                          <div>
                             <h4 className="font-bold text-xl mb-2">Location</h4>
                             <p className="text-gray-400">{storeInfo?.address || '123 Toy Street, Fun City, India'}</p>
                          </div>
                       </div>
                       <div className="flex gap-6">
                          <Clock className="text-primary shrink-0" size={32} />
                          <div>
                             <h4 className="font-bold text-xl mb-2">Opening Hours</h4>
                             <p className="text-gray-400">{storeInfo?.workingHours || 'Mon - Sun: 10:00 AM - 9:00 PM'}</p>
                          </div>
                       </div>
                    </div>
                    <div className="mt-12">
                       <Link to="/visit" className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-primary hover:text-white transition-all">
                          Get Directions
                       </Link>
                    </div>
                  </AnimatedReveal>
               </div>
               <div className="order-1 lg:order-2 h-[400px] lg:h-[600px] rounded-[3rem] overflow-hidden relative">
                  <Image src="https://static.wixstatic.com/media/b9ec8c_2ca344a9396c4f04a5d303aa5c79e93c~mv2.png" width={800} className="w-full h-full object-cover" alt="Store Interior" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
               </div>
            </div>
         </div>
      </section>

      <Footer />
    </div>
  );
}