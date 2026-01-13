// HPI 2.4-V (Spinner Loading State)
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { ToyCategories, StoreInformation } from '@/entities';
import { Image } from '@/components/ui/image';
import { MessageCircle, Award, Shield, Heart, Store, Star, Sparkles, MapPin, Clock, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppFloatingButton from '@/components/ui/WhatsAppFloatingButton';

// --- Utility Components ---

type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
};

const AnimatedReveal: React.FC<AnimatedElementProps> = ({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up' 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(element);
      }
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up': return 'translateY(40px)';
        case 'down': return 'translateY(-40px)';
        case 'left': return 'translateX(40px)';
        case 'right': return 'translateX(-40px)';
        default: return 'none';
      }
    }
    return 'translate(0)';
  };

  return (
    <div 
      ref={ref} 
      className={`${className} transition-all duration-1000 ease-out will-change-transform`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

// --- HELPER: Wix Video Reel Component ---
interface VideoReel {
  id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl?: string;
  description?: string;
}

interface VideoContextType {
  playingVideoId: string | null;
  setPlayingVideoId: (id: string | null) => void;
}

const VideoContext = React.createContext<VideoContextType | undefined>(undefined);

const useVideoContext = () => {
  const context = React.useContext(VideoContext);
  if (!context) {
    throw new Error('useVideoContext must be used within VideoProvider');
  }
  return context;
};

const WixVideoReel = ({ video }: { video: VideoReel }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { playingVideoId, setPlayingVideoId } = useVideoContext();

  useEffect(() => {
    // Simulate video loading
    const timer = setTimeout(() => setIsLoaded(true), 800);
    return () => clearTimeout(timer);
  }, [video.id]);

  const handlePlay = () => {
    // Pause all other videos
    setPlayingVideoId(video.id);
  };

  const handlePause = () => {
    // Only clear if this video is the one playing
    if (playingVideoId === video.id) {
      setPlayingVideoId(null);
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    // If another video is playing, pause this one
    if (playingVideoId && playingVideoId !== video.id && !videoElement.paused) {
      videoElement.pause();
    }
  }, [playingVideoId, video.id]);

  return (
    <div className="relative mx-auto rounded-xl overflow-hidden shadow-md bg-black border border-gray-200" style={{ height: '500px', width: '280px' }}>
      
      {/* LOADING SPINNER OVERLAY */}
      <div 
        className={`absolute inset-0 bg-black/50 flex flex-col items-center justify-center transition-opacity duration-700 z-20 ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <Loader2 className="w-10 h-10 text-white animate-spin mb-3" />
        <p className="text-gray-300 font-bold text-xs tracking-widest uppercase">Loading Video...</p>
      </div>

      {/* Video Container */}
      <div className={`w-full h-full transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <video
          ref={videoRef}
          src={video.videoUrl}
          poster={video.thumbnailUrl}
          controls
          className="w-full h-full object-cover"
          controlsList="nodownload"
          onPlay={handlePlay}
          onPause={handlePause}
        />
      </div>

      {/* Video Title Overlay - Only show if title exists */}
      {video.title && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-10">
          <p className="text-white font-bold text-sm line-clamp-2">
            {video.title}
          </p>
        </div>
      )}
    </div>
  );
};

// --- Video Provider Component ---
const VideoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  return (
    <VideoContext.Provider value={{ playingVideoId, setPlayingVideoId }}>
      {children}
    </VideoContext.Provider>
  );
};

// --- Main Component ---

export default function HomePage() {
  const [categories, setCategories] = useState<ToyCategories[]>([]);
  const [storeInfo, setStoreInfo] = useState<StoreInformation | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // --- 1. WIX VIDEO REELS DATA ---
  const videoReels: VideoReel[] = [
    {
      id: 'video-1',
      title: '',
      videoUrl: 'https://video.wixstatic.com/video/b9ec8c_450e40f9c7af4d8abffc2922377f3bdb/720p/mp4/file.mp4',
      thumbnailUrl: '',
      description: ''
    },
    {
      id: 'video-2',
      title: '',
      videoUrl: 'https://video.wixstatic.com/video/b9ec8c_17915084739d420ea920a6e400088999/720p/mp4/file.mp4',
      thumbnailUrl: '',
      description: ''
    },
    {
      id: 'video-3',
      title: '',
      videoUrl: 'https://video.wixstatic.com/video/b9ec8c_2ff14245efe44cfb9aa9c6ab341012e0/720p/mp4/file.mp4',
      thumbnailUrl: '',
      description: ''
    },
    {
      id: 'video-4',
      title: '',
      videoUrl: 'https://video.wixstatic.com/video/b9ec8c_ad478e8adee9487ca1f530a14053e8b2/720p/mp4/file.mp4',
      thumbnailUrl: '',
      description: ''
    },
    {
      id: 'video-5',
      title: '',
      videoUrl: 'https://video.wixstatic.com/video/b9ec8c_51ab037a44484917b9c05761fca6f25d/720p/mp4/file.mp4',
      thumbnailUrl: '',
      description: ''
    },
    {
      id: 'video-6',
      title: '',
      videoUrl: 'https://video.wixstatic.com/video/b9ec8c_450e40f9c7af4d8abffc2922377f3bdb/720p/mp4/file.mp4',
      thumbnailUrl: '',
      description: ''
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const { items: categoryItems } = await BaseCrudService.getAll<ToyCategories>('toycategories');
      const { items: storeItems } = await BaseCrudService.getAll<StoreInformation>('storeinformation');
      
      if (categoryItems) {
        const activeCategories = categoryItems
          .filter(cat => cat.isActive)
          .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
        setCategories(activeCategories);
      }
      if (storeItems && storeItems.length > 0) {
        setStoreInfo(storeItems[0]);
      }
    };
    fetchData();
  }, []);

  const features = [
    { icon: Award, title: '10+ Years of Joy', description: 'A decade of trusted service bringing smiles to families.', color: 'bg-blue-100 text-blue-600' },
    { icon: Shield, title: 'Safety First', description: 'Every toy is certified safe and non-toxic for your little ones.', color: 'bg-green-100 text-green-600' },
    { icon: Heart, title: 'Curated with Love', description: 'Hand-picked selection focusing on development and fun.', color: 'bg-pink-100 text-pink-600' },
    { icon: Store, title: 'Visit Our Store', description: 'Experience the magic in person at our physical location.', color: 'bg-yellow-100 text-yellow-600' },
  ];

  return (
    <div className="min-h-screen bg-white font-paragraph selection:bg-primary selection:text-white overflow-x-clip">
      <Header />
      <WhatsAppFloatingButton />
      
      {/* --- Hero Section --- */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-light-pink/50 to-white pt-20 lg:pt-0">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-secondary/20 rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '10s' }} />
        </div>

        <div className="max-w-[120rem] w-full mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            <div className="lg:col-span-6 flex flex-col gap-8 text-center lg:text-left">
              <AnimatedReveal direction="right">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-pink-100 w-fit mx-auto lg:mx-0">
                  <Sparkles size={16} className="text-secondary" />
                  <span className="text-sm font-bold text-primary tracking-wide uppercase">Where Imagination Grows</span>
                </div>
              </AnimatedReveal>

              <AnimatedReveal delay={200}>
                <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-foreground leading-[1.1] tracking-tight">
                  Bringing <span className="text-primary relative inline-block">
                    Smiles
                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-secondary opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                    </svg>
                  </span> <br />
                  One Toy at a Time
                </h1>
              </AnimatedReveal>

              <AnimatedReveal delay={400}>
                <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Discover a curated world of joy, learning, and wonder. With over 10 years of experience, we help you find the perfect companion for your child's journey.
                </p>
              </AnimatedReveal>

              <AnimatedReveal delay={600}> 
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"> 
                  <a href="https://wa.me/+919025398147" className="group relative overflow-hidden bg-whatsapp-green text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-3">
                    <span className="relative z-10 flex items-center gap-2">
                      <MessageCircle className="w-6 h-6" />
                      Chat to Order
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </a>
                  
                  <Link
                    to="/toys"
                    className="px-8 py-4 rounded-2xl font-bold text-lg text-foreground bg-white border-2 border-gray-100 hover:border-primary hover:text-primary transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    Browse Collection
                  </Link>
                </div>
              </AnimatedReveal>

              <AnimatedReveal delay={800}>
                <div className="flex items-center justify-center lg:justify-start gap-6 pt-4 text-sm font-medium text-gray-500">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-primary" />
                    <span>Safe & Non-Toxic</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-primary" />
                    <span>10+ Years Trust</span>
                  </div>
                </div>
              </AnimatedReveal>
            </div>

            <div className="lg:col-span-6 relative">
              <AnimatedReveal direction="left" delay={300} className="relative z-10">
                <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] w-full max-w-2xl mx-auto">
                  <div className="absolute inset-0 rounded-[3rem] overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-700">
                    <Image
                      src="https://static.wixstatic.com/media/b9ec8c_f039ee8f733d4693a89035885a18d299~mv2.png?originWidth=768&originHeight=960"
                      alt="Happy child playing with educational toys"
                      width={800}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  
                  {/* Floating Bubbles */}
                  <motion.div 
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-8 -right-8 bg-white p-4 rounded-2xl shadow-xl max-w-[180px] hidden md:block"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex -space-x-2">
                        {[1,2,3].map(i => (
                          <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white overflow-hidden">
                             <Image src={'https://static.wixstatic.com/media/b9ec8c_e6fdaf35f0924b37b24f0ccb83c15896~mv2.png?originWidth=768&originHeight=960'} alt="User" width={32} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs font-bold text-gray-800">"Best toy store ever!"</p>
                    <div className="flex text-yellow-400 mt-1">
                      {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                    </div>
                  </motion.div>

                  <motion.div 
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -bottom-12 -left-4 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 hidden md:flex"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      <Store size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">Visit Our Store</p>
                      <p className="text-xs text-gray-500">Open 7 Days a Week</p>
                    </div>
                  </motion.div>
                </div>
              </AnimatedReveal>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full bg-primary py-4 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center mx-8 text-white font-heading text-xl md:text-2xl font-bold uppercase tracking-wider opacity-90">
              <span className="mx-4">•</span> Educational Toys
              <span className="mx-4">•</span> Action Figures
              <span className="mx-4">•</span> Board Games
              <span className="mx-4">•</span> Plushies
            </div>
          ))}
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
        `}</style>
      </div>

      <section className="py-24 lg:py-32 bg-white relative">
        <div className="max-w-[120rem] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <AnimatedReveal>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground text-center uppercase m-0.5">
                Explore Our <br />
                <span className="text-primary font-heading">Magical World</span>
              </h2>
            </AnimatedReveal>
            <AnimatedReveal delay={200}>
              <p className="text-lg text-gray-600 max-w-md mb-4 md:mb-0">
                From brain-teasing puzzles to cuddly friends, find the perfect playmate for every age and interest.
              </p>
            </AnimatedReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {categories.map((category, index) => (
              <AnimatedReveal 
                key={category._id} 
                delay={index * 100} 
                className={`${index % 3 === 1 ? 'lg:mt-16' : ''}`}
              >
                <Link to={`/toys?category=${encodeURIComponent(category.categoryName || '')}`} className="group block relative">
                  <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-gray-100 shadow-lg transition-transform duration-500 group-hover:-translate-y-2">
                    <Image
                      src={category.categoryImage || 'https://static.wixstatic.com/media/b9ec8c_2c7c3392b6544f1093b680407e664a6a~mv2.png?originWidth=576&originHeight=768'}
                      alt={category.categoryName || 'Category'}
                      width={600}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                    
                    <div className="absolute bottom-0 left-0 w-full p-8">
                      <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="font-heading text-2xl text-foreground mb-2 group-hover:text-primary transition-colors">
                          {category.categoryName}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                          {category.description}
                        </p>
                        <div className="flex items-center text-primary font-bold text-sm uppercase tracking-wider">
                          Explore <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-light-pink/30 py-24 lg:py-32 overflow-hidden">
        <div className="max-w-[120rem] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4 relative">
              <div className="lg:sticky lg:top-32">
                <AnimatedReveal>
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary shadow-md mb-8">
                    <Heart size={32} fill="currentColor" />
                  </div>
                  <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-6">
                    Why Parents <br />
                    <span className="text-primary">Love Us</span>
                  </h2>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    We don't just sell toys; we curate experiences that help your children grow, learn, and create memories that last a lifetime.
                  </p>
                  <a href="https://wa.me/+919025398147"
                    className="inline-flex items-center gap-2 font-bold text-primary hover:text-primary/80 transition-colors text-lg group"
                  >
                    Ask us anything
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </AnimatedReveal>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <AnimatedReveal key={index} delay={index * 100} direction="up">
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-pink-100 h-full">
                      <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                        <feature.icon size={28} />
                      </div>
                      <h3 className="font-heading text-xl text-foreground mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </AnimatedReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[120rem] mx-auto px-6">
          <div className="bg-foreground rounded-[3rem] overflow-hidden text-white relative">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 lg:p-24 flex flex-col justify-center relative z-10">
                <AnimatedReveal>
                  <h2 className="font-heading text-4xl md:text-5xl mb-6">
                    Come Play With Us!
                  </h2>
                  <p className="text-gray-300 text-lg mb-12 max-w-md">
                    Visit our physical store to see, touch, and try our toys before you buy. Our friendly staff is ready to help you find the perfect gift.
                  </p>
                  
                  <div className="space-y-6 mb-12">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                        <MapPin className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">Location</h4>
                        <p className="text-gray-400">{storeInfo?.address || '123 Toy Street, Fun City'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                        <Clock className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">Working Hours</h4>
                        <p className="text-gray-400">{storeInfo?.workingHours || 'Mon - Sun: 10:00 AM - 9:00 PM'}</p>
                      </div>
                    </div>
                  </div>

                  <Link 
                    to="/visit-store"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-foreground font-bold rounded-xl hover:bg-primary hover:text-white transition-all duration-300 w-fit"
                  >
                    Get Directions
                  </Link>
                </AnimatedReveal>
              </div>

              <div className="relative h-[400px] lg:h-auto">
                <Image
                  src="https://static.wixstatic.com/media/b9ec8c_2ca344a9396c4f04a5d303aa5c79e93c~mv2.png?originWidth=768&originHeight=384"
                  alt="Inside our toy store"
                  width={800}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-foreground via-transparent to-transparent lg:bg-gradient-to-l" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Our Videos Section (WIX VIDEO REELS) --- */}
      <section id="videos" className="py-20 bg-gradient-to-b from-white to-light-pink/20 relative overflow-hidden">
        
        <div className="max-w-[120rem] mx-auto px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-primary mb-4">
              Watch Our Videos
            </h2>
            <p className="font-paragraph text-lg text-foreground max-w-2xl mx-auto">
              Explore our toy collection through engaging video content. See products in action and hear from happy customers!
            </p>
          </motion.div>

          {/* Marquee Animation Styles - Responsive speeds */}
          <style>{`
            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .video-marquee-container {
              width: fit-content;
              animation: scroll 40s linear infinite;
              will-change: transform;
            }
            .video-marquee-container:hover {
              animation-play-state: paused;
            }
            /* Mobile: Faster animation (20s instead of 40s) */
            @media (max-width: 768px) {
              .video-marquee-container {
                animation: scroll 20s linear infinite;
              }
            }
          `}</style>

          {/* Videos Marquee */}
          <VideoProvider>
            <div className="relative w-full overflow-hidden">
              <div className="flex gap-8 video-marquee-container"
                   onMouseEnter={() => setIsPaused(true)}
                   onMouseLeave={() => setIsPaused(false)}
              >
                {/* Loop 2 times for infinite scroll effect */}
                {[...Array(2)].map((_, loopIndex) => (
                  <div key={loopIndex} className="flex gap-8 shrink-0">
                    {videoReels.map((video) => (
                      <div key={`${loopIndex}-${video.id}`} className="shrink-0">
                        <WixVideoReel video={video} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </VideoProvider>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mt-16"
          >
            <p className="font-paragraph text-base text-gray-600 mb-6">
              Have a video you'd like to share? We'd love to feature customer testimonials and toy reviews!
            </p>
            <a href="https://wa.me/+919025398147"
              className="inline-flex items-center gap-3 bg-whatsapp-green text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <MessageCircle size={24} />
              Share Your Video
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 