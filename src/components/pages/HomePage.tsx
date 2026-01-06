// HPI 1.6-V
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { ToyCategories, StoreInformation } from '@/entities';
import { Image } from '@/components/ui/image';
import { MessageCircle, Award, Shield, Heart, Store, Star, Sparkles, MapPin, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
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

const ParallaxImage: React.FC<{ src: string; alt: string; className?: string; speed?: number }> = ({ 
  src, 
  alt, 
  className = "", 
  speed = 0.5 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="w-full h-[120%] -mt-[10%]">
        <Image
          src={src}
          alt={alt}
          width={1200}
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
};

// --- Main Component ---

export default function HomePage() {
  // --- 1. Data Fidelity Protocol ---
  // Canonical Data Sources
  const [categories, setCategories] = useState<ToyCategories[]>([]);
  const [storeInfo, setStoreInfo] = useState<StoreInformation | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // Preserve original fetching logic
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

  const handleWhatsAppClick = () => {
    if (storeInfo?.whatsAppNumber) {
      window.open(`https://wa.me/${storeInfo.whatsAppNumber}`, '_blank');
    }
  };

  // --- 2. Static Content & Features ---
  const features = [
    {
      icon: Award,
      title: '10+ Years of Joy',
      description: 'A decade of trusted service bringing smiles to families.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Every toy is certified safe and non-toxic for your little ones.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Heart,
      title: 'Curated with Love',
      description: 'Hand-picked selection focusing on development and fun.',
      color: 'bg-pink-100 text-pink-600'
    },
    {
      icon: Store,
      title: 'Visit Our Store',
      description: 'Experience the magic in person at our physical location.',
      color: 'bg-yellow-100 text-yellow-600'
    },
  ];

  return (
    <div className="min-h-screen bg-white font-paragraph selection:bg-primary selection:text-white overflow-x-clip">
      <Header />
      <WhatsAppFloatingButton />
      {/* --- Hero Section --- */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-light-pink/50 to-white pt-20 lg:pt-0">
        {/* Decorative Background Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-secondary/20 rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '10s' }} />
        </div>

        <div className="max-w-[120rem] w-full mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero Content */}
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

              <AnimatedReveal delay={600}> <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"> <button onClick={handleWhatsAppClick} className="group relative overflow-hidden bg-whatsapp-green text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-3"

                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <MessageCircle className="w-6 h-6" />
                      Chat to Order
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </button>
                  
                  <Link
                    to="/toys"
                    className="px-8 py-4 rounded-2xl font-bold text-lg text-foreground bg-white border-2 border-gray-100 hover:border-primary hover:text-primary transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    Browse Collection
                  </Link>
                </div>
              </AnimatedReveal>

              {/* Trust Badges Mini */}
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

            {/* Hero Visual */}
            <div className="lg:col-span-6 relative">
              <AnimatedReveal direction="left" delay={300} className="relative z-10">
                <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] w-full max-w-2xl mx-auto">
                  {/* Main Hero Image with Custom Shape */}
                  <div className="absolute inset-0 rounded-[3rem] overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-700">
                    <Image
                      src="https://static.wixstatic.com/media/b9ec8c_f039ee8f733d4693a89035885a18d299~mv2.png?originWidth=768&originHeight=960"
                      alt="Happy child playing with educational toys"
                      width={800}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Floating Elements */}
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
      {/* --- Marquee Section --- */}
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
      {/* --- Categories Section (Staggered Grid) --- */}
      <section className="py-24 lg:py-32 bg-white relative">
        <div className="max-w-[120rem] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <AnimatedReveal>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground [text-shadow:none] text-center uppercase indent-0 [writing-mode:horizontal-tb] m-0.5 my-0.5 mx-[25px]">
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
                className={`${index % 3 === 1 ? 'lg:mt-16' : ''}`} // Stagger effect
              >
                <Link to="/toys" className="group block relative">
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
      {/* --- Sticky Trust Section --- */}
      <section className="relative bg-light-pink/30 py-24 lg:py-32 overflow-hidden">
        <div className="max-w-[120rem] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Sticky Header */}
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
                  <button 
                    onClick={handleWhatsAppClick}
                    className="inline-flex items-center gap-2 font-bold text-primary hover:text-primary/80 transition-colors text-lg group"
                  >
                    Ask us anything
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </AnimatedReveal>
              </div>
            </div>

            {/* Scrolling Cards */}
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
      {/* --- Visit Us / Offline Store Section --- */}
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
      {/* --- Final CTA Section --- */}
      <section className="py-24 bg-gradient-to-b from-white to-light-pink/30 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedReveal direction="up">
            <div className="w-20 h-20 bg-whatsapp-green/10 text-whatsapp-green rounded-full flex items-center justify-center mx-auto mb-8">
              <MessageCircle size={40} />
            </div>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              Ready to Order?
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Found something you like? Have questions about age suitability? Chat with us directly on WhatsApp for instant support and ordering.
            </p>
            <button
              onClick={handleWhatsAppClick}
              className="inline-flex items-center gap-3 bg-whatsapp-green text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <MessageCircle size={28} />
              Start Chat on WhatsApp
            </button>
            <p className="mt-6 text-sm text-gray-500">
              We typically reply within minutes during working hours!
            </p>
          </AnimatedReveal>
        </div>
      </section>
      <Footer />
    </div>
  );
}