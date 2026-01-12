// HPI 2.1-V (Cropped/Masked Instagram Embeds)
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
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

// --- HELPER: Handles the Official Instagram Script & CROP ---
const InstagramEmbed = ({ rawHtml }: { rawHtml: string }) => {
  useEffect(() => {
    // This function tells the Instagram script to scan the page and convert blockquotes to iframes
    const processEmbeds = () => {
      // @ts-ignore
      if (window.instgrm) {
        // @ts-ignore
        window.instgrm.Embeds.process();
      }
    };

    // Check if script is already present
    if (!document.getElementById('react-instagram-embed-script')) {
      const script = document.createElement('script');
      script.id = 'react-instagram-embed-script';
      script.src = "//www.instagram.com/embed.js";
      script.async = true;
      script.onload = () => processEmbeds();
      document.body.appendChild(script);
    } else {
      processEmbeds();
    }
  }, [rawHtml]);

  return (
    <div 
      className="instagram-embed-wrapper bg-white rounded-xl overflow-hidden shadow-md mx-auto flex items-start justify-center bg-gray-50"
      // UPDATED: Changed minHeight to a fixed smaller height to crop the bottom.
      style={{ height: '400px', width: '326px', overflow: 'hidden' }} 
      dangerouslySetInnerHTML={{ __html: rawHtml }} 
    />
  );
};

// --- Main Component ---

export default function HomePage() {
  const [categories, setCategories] = useState<ToyCategories[]>([]);
  const [storeInfo, setStoreInfo] = useState<StoreInformation | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // --- 1. YOUR INSTAGRAM DATA ---
  // The code you provided for the RC Car video.
  const rcCarVideoHTML = `
    <blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/reel/DS4zVo3ky9v/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);">
    <div style="padding:16px;"> <a href="https://www.instagram.com/reel/DS4zVo3ky9v/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/reel/DS4zVo3ky9v/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by Sudha Novelties (@sudha_novelties_)</a></p></div></blockquote>
  `;

  // We are using the RC Car video for all slots as a placeholder.
  // To add new videos, just copy the embed code from Instagram and add it to a list like this.
  const videoEmbeds = [
    rcCarVideoHTML, // Video 1
    rcCarVideoHTML, // Video 2 (duplicate)
    rcCarVideoHTML, // Video 3 (duplicate)
    rcCarVideoHTML, // Video 4 (duplicate)
    rcCarVideoHTML, // Video 5 (duplicate)
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
                      src={category.categoryImage || 'https://static.wixstatic.com/media/b9ec8c_2c7c3392b6544f10