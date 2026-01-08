import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { Toys, ToyCategories, StoreInformation } from '@/entities';
import { Image } from '@/components/ui/image';
import { MessageCircle, Filter, ShoppingCart, ChevronDown, Check } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppFloatingButton from '@/components/ui/WhatsAppFloatingButton';
import { generateWhatsAppUrl } from '@/lib/whatsapp-utils';

export default function ToysPage() {
  const [searchParams] = useSearchParams();
  const [toys, setToys] = useState<Toys[]>([]);
  const [categories, setCategories] = useState<ToyCategories[]>([]);
  const [storeInfo, setStoreInfo] = useState<StoreInformation | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('all');
  const [filteredToys, setFilteredToys] = useState<Toys[]>([]);
  const [isAgeDropdownOpen, setIsAgeDropdownOpen] = useState(false);

  // Define age groups for filtering
  const ageGroups = [
    { id: '0-2', label: '0-2 Years', minAge: 0, maxAge: 2 },
    { id: '3-5', label: '3-5 Years', minAge: 3, maxAge: 5 },
    { id: '6-8', label: '6-8 Years', minAge: 6, maxAge: 8 },
    { id: '9-12', label: '9-12 Years', minAge: 9, maxAge: 12 },
    { id: '13+', label: '13+ Years', minAge: 13, maxAge: 100 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const { items: toyItems } = await BaseCrudService.getAll<Toys>('toys');
      const { items: categoryItems } = await BaseCrudService.getAll<ToyCategories>('toycategories');
      const { items: storeItems } = await BaseCrudService.getAll<StoreInformation>('storeinformation');

      if (toyItems) {
        setToys(toyItems);
        setFilteredToys(toyItems);
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

      // Check for category parameter in URL
      const categoryParam = searchParams.get('category');
      if (categoryParam) {
        setSelectedCategory(categoryParam);
      }
    };
    fetchData();
  }, [searchParams]);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredToys(toys);
    } else {
      setFilteredToys(toys.filter(toy => toy.category === selectedCategory));
    }
  }, [selectedCategory, toys]);

  // Helper function to check if a toy matches the selected age group
  const matchesAgeGroup = (toy: Toys): boolean => {
    if (selectedAgeGroup === 'all') return true;

    const ageGroup = ageGroups.find(ag => ag.id === selectedAgeGroup);
    if (!ageGroup || !toy.ageGroup) return true;

    const ageText = toy.ageGroup.toLowerCase().trim();

    // Helper to convert "6 months" -> 0.5 and "2 years" -> 2
    const parseToYears = (str: string) => {
      const number = parseFloat(str);
      if (isNaN(number)) return null;

      if (str.includes('month')) {
        return number / 12; // Convert months to years
      }
      return number; // Default is years
    };

    // Handle "X-Y" format (e.g., "6 months - 2 years")
    if (ageText.includes('-')) {
      const parts = ageText.split('-');
      const minVal = parseToYears(parts[0]);
      const maxVal = parseToYears(parts[1]);

      if (minVal !== null && maxVal !== null) {
        // Check for range overlap
        return minVal <= ageGroup.maxAge && maxVal >= ageGroup.minAge;
      }
    }

    // Handle "X+" format (e.g., "3+")
    if (ageText.includes('+')) {
      const minVal = parseToYears(ageText.replace('+', ''));
      if (minVal !== null) {
        return minVal <= ageGroup.maxAge;
      }
    }

    // Handle single number format (e.g., "6 months")
    const val = parseToYears(ageText);
    if (val !== null) {
      return val >= ageGroup.minAge && val <= ageGroup.maxAge;
    }

    return true;
  };

  useEffect(() => {
    let filtered = toys;

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(toy => toy.category === selectedCategory);
    }

    // Apply age group filter
    filtered = filtered.filter(matchesAgeGroup);

    setFilteredToys(filtered);
  }, [selectedCategory, selectedAgeGroup, toys]);

 // --- 1. Smart Helper: Converts Wix link to a WhatsApp-friendly Thumbnail ---
  const getPublicImageUrl = (wixUrl: string | undefined) => {
    if (!wixUrl) return 'No Image Available';
    
    // If it's already a normal web link, use it
    if (wixUrl.startsWith('http') || wixUrl.startsWith('https')) return wixUrl;

    // If it's a Wix internal URL, convert it to a RESIZED version
    if (wixUrl.startsWith('wix:image://')) {
      const matches = wixUrl.match(/wix:image:\/\/v1\/([^/]+)\//);
      if (matches && matches[1]) {
        // 1. Get the ID (and encode any ~ symbols just in case)
        const cleanId = matches[1].replace('~', '%7E'); 
        
        // 2. Construct a Dynamic URL that forces a 500x500 resized version
        // This makes the file small enough for WhatsApp to preview instantly.
        return `https://static.wixstatic.com/media/${cleanId}/v1/fit/w_500,h_500,q_90/file.jpg`;
      }
    }
    return wixUrl;
  };

  // --- 2. The Handler (No changes needed here, just ensuring you have it) ---
  const handleWhatsAppClick = (toy?: Toys) => {
    let message = '';

    if (toy) {
      const publicImage = getPublicImageUrl(toy.image);

      message = `Hello! I am interested in this product:\n--------------------------\nName: ${toy.name}\nPrice: Rs. ${toy.price || 'N/A'}\nCategory: ${toy.category || 'General'}\n--------------------------\nImage: ${publicImage}\n\nPlease provide more details.`;
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

            {/* Left: Category Pills (Horizontal Scroll) */}
            <div className="w-full md:w-auto overflow-hidden">
              <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide mask-fade-right">
                <span className="flex-shrink-0 text-gray-400 font-medium text-sm flex items-center gap-1 mr-2">
                  <Filter size={16} /> Categories:
                </span>

                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 flex-shrink-0 border ${selectedCategory === 'all'
                      ? 'bg-primary border-primary text-white shadow-md'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-primary/50 hover:text-primary'
                    }`}
                >
                  All Toys
                </button>

                {categories.map((category) => (
                  <button
                    key={category._id}
                    onClick={() => setSelectedCategory(category.categoryName || '')}
                    className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 flex-shrink-0 border ${selectedCategory === category.categoryName
                        ? 'bg-primary border-primary text-white shadow-md'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-primary/50 hover:text-primary'
                      }`}
                  >
                    {category.categoryName}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Custom Age Dropdown */}
            <div className="w-full md:w-auto relative z-50">

              {/* Click-Outside Handler: Invisible layer that closes dropdown if clicked elsewhere */}
              {isAgeDropdownOpen && (
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsAgeDropdownOpen(false)}
                />
              )}

              {/* The Trigger Button */}
              <button
                onClick={() => setIsAgeDropdownOpen(!isAgeDropdownOpen)}
                className={`w-full md:w-56 flex items-center justify-between bg-white border px-4 py-2.5 rounded-xl transition-all duration-300 relative z-50 ${isAgeDropdownOpen
                    ? 'border-primary ring-2 ring-primary/10 shadow-lg'
                    : 'border-gray-200 hover:border-primary/50 hover:shadow-md'
                  }`}
              >
                <div className="flex flex-col items-start text-left">
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Age Group</span>
                  <span className="font-bold text-gray-800 text-sm">
                    {selectedAgeGroup === 'all'
                      ? 'Any Age'
                      : ageGroups.find(g => g.id === selectedAgeGroup)?.label}
                  </span>
                </div>
                <ChevronDown
                  size={18}
                  className={`text-gray-400 transition-transform duration-300 ${isAgeDropdownOpen ? 'rotate-180 text-primary' : ''}`}
                />
              </button>

              {/* The Dropdown Menu */}
              {isAgeDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-full bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setSelectedAgeGroup('all');
                        setIsAgeDropdownOpen(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-light-pink/30 flex items-center justify-between group transition-colors"
                    >
                      <span className={`text-sm font-medium ${selectedAgeGroup === 'all' ? 'text-primary font-bold' : 'text-gray-600'}`}>
                        Any Age
                      </span>
                      {selectedAgeGroup === 'all' && <Check size={16} className="text-primary" />}
                    </button>

                    {ageGroups.map((ageGroup) => (
                      <button
                        key={ageGroup.id}
                        onClick={() => {
                          setSelectedAgeGroup(ageGroup.id);
                          setIsAgeDropdownOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-light-pink/30 flex items-center justify-between group transition-colors"
                      >
                        <span className={`text-sm font-medium ${selectedAgeGroup === ageGroup.id ? 'text-primary font-bold' : 'text-gray-600'}`}>
                          {ageGroup.label}
                        </span>
                        {selectedAgeGroup === ageGroup.id && <Check size={16} className="text-primary" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
      {/* Products Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-[120rem] mx-auto px-6">
          {filteredToys.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-paragraph text-xl text-foreground">
                We're loading toys for you.....
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredToys.map((toy, index) => (
                <motion.div
                  key={toy._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
                >
                  {/* Product Image */}
                  <div className="aspect-square overflow-hidden bg-gray-50 relative group">
                    <Image
                      src={toy.image || 'https://www.amazon.in/Creations-Kids-Heavy-Jumbo-WN-1166/dp/B0C27R3DSY'}
                      alt={toy.name || 'Toy product'}
                      width={400}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Product Info - Compact Layout */}
                  <div className="p-4 flex flex-col flex-grow">

                    {/* Title */}
                    <h3 className="font-heading text-lg font-bold text-foreground mb-1 line-clamp-1 leading-tight">
                      {toy.name}
                    </h3>

                    {/* Description */}
                    {toy.shortDescription && (
                      <p className="font-paragraph text-sm text-gray-500 mb-3 line-clamp-2 leading-relaxed">
                        {toy.shortDescription}
                      </p>
                    )}

                    {/* Price & Age Row */}
                    <div className="mt-auto mb-4">
                      {toy.price && (
                        <div className="text-primary font-bold text-xl mb-1">
                          Rs. {toy.price}
                        </div>
                      )}

                      {toy.ageGroup && (
                        <div className="text-gray-800 text-sm font-medium">
                          {toy.ageGroup}
                        </div>
                      )}
                    </div>

                    {/* Action Area */}
                    <div className="space-y-3">
                      {/* Primary Buy Button */}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              disabled
                              className="w-full bg-primary text-white font-bold text-sm py-2.5 rounded-full hover:bg-primary/90 transition-all shadow-md opacity-90 hover:opacity-100"
                            >
                              Buy Now
                            </button>
                          </TooltipTrigger>
                          <TooltipContent className="bg-foreground text-white border-0">
                            <p>Coming soon! Use WhatsApp to order now.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      {/* Secondary Text Link for WhatsApp */}
                      <div className="text-center">
                        <button
                          onClick={() => handleWhatsAppClick(toy)}
                          className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-whatsapp-green transition-colors"
                        >
                          Need help?
                          <span className="text-whatsapp-green font-semibold flex items-center gap-1">
                            <MessageCircle size={14} />
                            Chat on WhatsApp
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-light-pink to-white">
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center bg-white rounded-3xl p-12 shadow-lg"
          >
            <h2 className="font-heading text-3xl md:text-4xl text-primary mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="font-paragraph text-lg text-foreground mb-8 max-w-2xl mx-auto">
              Chat with us on WhatsApp and we'll help you find the perfect toy for your child
            </p>
            <button
              onClick={() => handleWhatsAppClick()}
              className="inline-flex items-center justify-center gap-3 bg-whatsapp-green text-white font-paragraph text-lg px-10 py-5 rounded-xl hover:bg-whatsapp-green/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <MessageCircle size={24} />
              Chat with Us Now
            </button>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
