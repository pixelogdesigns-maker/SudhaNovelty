import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { Toys, ToyCategories, StoreInformation } from '@/entities';
import { Image } from '@/components/ui/image';
import { MessageCircle, Filter, ChevronDown, Check, Palette } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppFloatingButton from '@/components/ui/WhatsAppFloatingButton';
import { generateWhatsAppUrl } from '@/lib/whatsapp-utils';

export default function ToysPage() {
  // CHANGED: Added setSearchParams to update URL
  const [searchParams, setSearchParams] = useSearchParams();
  const [toys, setToys] = useState<Toys[]>([]);
  const [categories, setCategories] = useState<ToyCategories[]>([]);
  const [storeInfo, setStoreInfo] = useState<StoreInformation | null>(null);
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  
  const [filteredToys, setFilteredToys] = useState<Toys[]>([]);
  const [isAgeDropdownOpen, setIsAgeDropdownOpen] = useState(false);
  const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);
  const [availableColors, setAvailableColors] = useState<string[]>([]);

  // Define age groups for filtering
  const ageGroups = [
    { id: '0-2', label: '0-2 Years', minAge: 0, maxAge: 2 },
    { id: '3-5', label: '3-5 Years', minAge: 3, maxAge: 5 },
    { id: '6-8', label: '6-8 Years', minAge: 6, maxAge: 8 },
    { id: '9-12', label: '9-12 Years', minAge: 9, maxAge: 12 },
    { id: '13+', label: '13+ Years', minAge: 13, maxAge: 100 },
  ];

  // --- Helper to update URL params ---
  const updateUrlParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === 'all') {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { items: toyItems } = await BaseCrudService.getAll<Toys>('toys');
      const { items: categoryItems } = await BaseCrudService.getAll<ToyCategories>('toycategories');
      const { items: storeItems } = await BaseCrudService.getAll<StoreInformation>('storeinformation');

      if (toyItems) {
        setToys(toyItems);
        setFilteredToys(toyItems);
        
        // Extract unique colors from toys
        const colors = new Set<string>();
        toyItems.forEach(toy => {
          if (toy.color) {
            toy.color.split(',').forEach(c => {
              const trimmed = c.trim();
              if (trimmed) colors.add(trimmed);
            });
          }
        });
        setAvailableColors(Array.from(colors).sort());
      }

      if (categoryItems) {
        const activeCategories = categoryItems
          .filter(cat => cat.isActive)
          .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
        setCategories(activeCategories);
      }

      if (storeItems && storeItems.length > 0) {
        setStoreInfo(storeItems[0]);
      }

      // Sync State with URL Params
      const categoryParam = searchParams.get('category');
      if (categoryParam) setSelectedCategory(decodeURIComponent(categoryParam));

      const ageParam = searchParams.get('age');
      if (ageParam) setSelectedAgeGroup(ageParam);

      // CHANGED: Handle Color Param from URL
      const colorParam = searchParams.get('color');
      if (colorParam) setSelectedColor(decodeURIComponent(colorParam));
    };
    fetchData();
  }, [searchParams]); // Re-run when URL changes

  // --- Helper: Age Group Logic ---
  const matchesAgeGroup = (toy: Toys): boolean => {
    if (selectedAgeGroup === 'all') return true;

    const ageGroup = ageGroups.find(ag => ag.id === selectedAgeGroup);
    if (!ageGroup || !toy.ageGroup) return true;

    const ageText = toy.ageGroup.toLowerCase().trim();

    const parseToYears = (str: string) => {
      const number = parseFloat(str);
      if (isNaN(number)) return null;
      if (str.includes('month')) return number / 12;
      return number;
    };

    if (ageText.includes('-')) {
      const parts = ageText.split('-');
      const minVal = parseToYears(parts[0]);
      const maxVal = parseToYears(parts[1]);
      if (minVal !== null && maxVal !== null) {
        return minVal <= ageGroup.maxAge && maxVal >= ageGroup.minAge;
      }
    }

    if (ageText.includes('+')) {
      const minVal = parseToYears(ageText.replace('+', ''));
      if (minVal !== null) return minVal <= ageGroup.maxAge;
    }

    const val = parseToYears(ageText);
    if (val !== null) return val >= ageGroup.minAge && val <= ageGroup.maxAge;

    return true;
  };

  // --- FILTERING LOGIC ---
  useEffect(() => {
    let filtered = toys;

    // 1. Apply Category Filter
    if (selectedCategory !== 'all') {
      const targetCategory = selectedCategory.trim().toLowerCase();
      filtered = filtered.filter(toy => {
        if (!toy.category) return false;
        return toy.category.trim().toLowerCase() === targetCategory;
      });
    }

    // 2. Apply Age Group Filter
    filtered = filtered.filter(matchesAgeGroup);

    // 3. Apply Color Filter
    if (selectedColor !== 'all') {
      filtered = filtered.filter(toy => {
        if (!toy.color) return false;
        return toy.color.split(',').some(c => c.trim().toLowerCase() === selectedColor.toLowerCase());
      });
    }

    setFilteredToys(filtered);
  }, [selectedCategory, selectedAgeGroup, selectedColor, toys]);

  // --- WhatsApp Handler (Updated) ---
  const handleWhatsAppClick = (toy?: Toys) => {
    let message = '';
    if (toy) {
      // CHANGED: Construct URL object to safely append query params
      const productPageUrl = new URL(`${window.location.origin}/toys/${toy._id}`);
      
      // If a specific color is selected, append it to the link sent to the seller
      if (selectedColor !== 'all') {
        productPageUrl.searchParams.set('color', selectedColor);
      }

      message = `Hello! I am interested in this product: ${toy.name}\n\n${productPageUrl.toString()}`;
    } else {
      message = "Hello! I would like to inquire about your toys.";
    }
    const whatsAppUrl = generateWhatsAppUrl(storeInfo?.whatsAppNumber, message);
    window.open(whatsAppUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <WhatsAppFloatingButton />
      
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-light-pink to-white py-16">
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="font-heading text-5xl md:text-6xl text-primary mb-4">
              Our Toy Collection
            </h1>
            <p className="font-paragraph text-xl text-foreground max-w-3xl mx-auto">
              Explore our carefully curated selection of quality toys for every age and interest
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 py-4 shadow-sm transition-all">
        <div className="max-w-[120rem] mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">

            {/* Left: Category Pills */}
            <div className="w-full md:w-auto overflow-hidden">
              <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide mask-fade-right">
                <span className="flex-shrink-0 text-gray-400 font-medium text-sm flex items-center gap-1 mr-2">
                  <Filter size={16} /> Categories:
                </span>

                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    updateUrlParams('category', 'all');
                  }}
                  className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 flex-shrink-0 border ${selectedCategory === 'all'
                      ? 'bg-primary border-primary text-white shadow-md'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-primary/50 hover:text-primary'
                    }`}
                >
                  All Toys
                </button>

                {categories.map((category) => {
                  const isActive = selectedCategory.toLowerCase().trim() === (category.categoryName || '').toLowerCase().trim();
                  return (
                    <button
                      key={category._id}
                      onClick={() => {
                        setSelectedCategory(category.categoryName || '');
                        updateUrlParams('category', category.categoryName || '');
                      }}
                      className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 flex-shrink-0 border ${
                        isActive
                          ? 'bg-primary border-primary text-white shadow-md'
                          : 'bg-white border-gray-200 text-gray-600 hover:border-primary/50 hover:text-primary'
                      }`}
                    >
                      {category.categoryName}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Custom Filter Dropdowns */}
            <div className="flex gap-3 w-full md:w-auto">
              
              {/* Age Filter */}
              <div className="relative z-50 flex-1 md:flex-none">
                {isAgeDropdownOpen && <div className="fixed inset-0 z-40" onClick={() => setIsAgeDropdownOpen(false)} />}
                <button
                  onClick={() => setIsAgeDropdownOpen(!isAgeDropdownOpen)}
                  className={`w-full md:w-56 flex items-center justify-between bg-white border px-4 py-2.5 rounded-xl transition-all duration-300 relative z-50 ${isAgeDropdownOpen ? 'border-primary ring-2 ring-primary/10 shadow-lg' : 'border-gray-200 hover:border-primary/50 hover:shadow-md'}`}
                >
                  <div className="flex flex-col items-start text-left">
                    <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Age Group</span>
                    <span className="font-bold text-gray-800 text-sm">
                      {selectedAgeGroup === 'all' ? 'Any Age' : ageGroups.find(g => g.id === selectedAgeGroup)?.label}
                    </span>
                  </div>
                  <ChevronDown size={18} className={`text-gray-400 transition-transform duration-300 ${isAgeDropdownOpen ? 'rotate-180 text-primary' : ''}`} />
                </button>

                {isAgeDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-full bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                    <div className="py-1">
                      <button onClick={() => { setSelectedAgeGroup('all'); updateUrlParams('age', 'all'); setIsAgeDropdownOpen(false); }} className="w-full px-4 py-3 text-left hover:bg-light-pink/30 flex items-center justify-between group transition-colors">
                        <span className={`text-sm font-medium ${selectedAgeGroup === 'all' ? 'text-primary font-bold' : 'text-gray-600'}`}>Any Age</span>
                        {selectedAgeGroup === 'all' && <Check size={16} className="text-primary" />}
                      </button>
                      {ageGroups.map((ageGroup) => (
                        <button key={ageGroup.id} onClick={() => { setSelectedAgeGroup(ageGroup.id); updateUrlParams('age', ageGroup.id); setIsAgeDropdownOpen