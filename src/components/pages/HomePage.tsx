// HPI 4.4-V (Mobile Optimized: Shop By Age Compact Layout)
import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
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

const HERO_SLIDES = [
  { 
    id: 1, 
    title: "Slide 1", 
    image: "https://static.wixstatic.com/media/b9ec8c_fae7f2f50f794619a49b1c10557cfa37~mv2.png" 
  },
  { 
    id: 2, 
    title: "Slide 2", 
    image: "https://static.wixstatic.com/media/b9ec8c_28663c2318ca48de8dddcce6a16ba99d~mv2.png" 
  },
  { 
    id: 3, 
    title: "Slide 3", 
    image: "https://static.wixstatic.com/media/b9ec8c_20c2736ab8974c9da10dbe4d215f0d2e~mv2.png" 
  },
  { 
    id: 4, 
    title: "Slide 4", 
    image: "https://static.wixstatic.com/media/b9ec8c_d9c6ccebc2e2438887fec2ed43d0d5e2~mv2.png" 
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

// 1. Hero Carousel (16:9 Aspect Ratio Maintained)
const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => { setCurrent((prev) => (prev + 1) % HERO_SLIDES.length); }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToPrev = () => setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  const goToNext = () => setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);

  return (
    <section className="relative w-full aspect-[16/9] overflow-hidden bg-gray-100 group">
      <AnimatePresence mode='wait'>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full"
        >
          <Link to="/toys" className="block w-full h-full">
            <Image 
              src={HERO_SLIDES[current].image} 
              alt={HERO_SLIDES[current].title}
              width={1920} 
              height={1080}
              className="w-full h-full object-cover" 
            />
          </Link>
        </motion.div>
      </AnimatePresence>

      <button 
        onClick={goToPrev}