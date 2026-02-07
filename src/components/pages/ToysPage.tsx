import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { Toys, ToyCategories, StoreInformation } from '@/entities';
import { Image } from '@/components/ui/image';
import { MessageCircle, Filter, ChevronDown, Check, Loader2 } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppFloatingButton from '@/components/ui/WhatsAppFloatingButton';
import { generateWhatsAppUrl } from '@/lib/whatsapp-utils';
import { SEOHelmet } from '@/components/SEOHelmet';

export default function ToysPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [toys, setToys] = useState<Toys[]>([]);
  const [categories, setCategories] = useState<ToyCategories[]>([]);
  const [storeInfo, setStoreInfo] = useState<StoreInformation | null>(null);
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('all');
  
  const [filteredToys, setFilteredToys] = useState<Toys[]>([]);
  const [isAgeDropdownOpen, setIsAgeDropdownOpen] = useState(false);
  
  const [isLoading, setIsLoading] = useState(true);

  const ageGroups = [
    { id: '0-2', label: '0-2 Years', minAge: 0, maxAge: 2 },
    { id: '3-5', label: '3-5 Years', minAge: 3, maxAge: 5 },
    { id: '6-8', label: '6-8 Years', minAge: 6, maxAge: 8 },
    { id: '9-12', label: '9-12 Years', minAge: 9, maxAge: 12 },
    { id: '12+', label: '12+ Years', minAge: 12, maxAge: 100 },
  ];

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
      try {
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
      } catch {
        // Error loading toys - show empty state
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) setSelectedCategory(decodeURIComponent(categoryParam));

    const ageParam = searchParams.get('age');
    if (ageParam) setSelectedAgeGroup(ageParam);
  }, []);

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

  useEffect(() => {
    let filtered = toys;

    if (selectedCategory !== 'all') {
      const targetCategory = selectedCategory.trim().toLowerCase();
      filtered = filtered.filter(toy => {
        if (!toy.category) return false;
        return toy.category.trim().toLowerCase() === targetCategory;
      });
    }

    filtered = filtered.filter(matchesAgeGroup);

    setFilteredToys(filtered);
  }, [selectedCategory, selectedAgeGroup, toys]);

  const handleWhatsAppClick = (toy?: Toys) => {
    let message = '';
    if (toy) {
      const productPageUrl = new URL(`${window.location.origin}/toys/${toy._id}`);
      message = `Hello! I am interested in this product: ${toy.name}\n\n${productPageUrl.toString()}`;
    } else {
      message = "Hello! I would like to inquire about your toys.";
    }
    const whatsAppUrl = generateWhatsAppUrl(storeInfo?.whatsAppNumber, message);
    window.open(whatsAppUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHelmet 
        title="Shop Toys - Premium Toy Collection | Sudha Novelties"
        description="Browse our extensive collection of premium toys for all ages. Find the perfect toy for kids with quality products and fast delivery at Sudha Novelties."
        keywords="buy toys online, toy collection, kids toys, premium toys, toys for all ages"
        canonical="https://sudha-novelties.com/toys"
      />
      <Header />
      <WhatsAppFloatingButton />
      
      <section className="relative w-full bg-gradient-to-br from-light-pink to-white py-8 md:py-16">
        <div className="max-w-[120rem] mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="font-heading text-3xl md:text-6xl text-primary mb-2 md:mb-4">
              Our Toy Collection
            </h1>
            <p className="font-paragraph text-base md:text-xl text-foreground max-w-3xl mx-auto">
              Explore our carefully curated selection of quality toys for every age and interest
            </p>
          </motion.div>
        </div>
      </section>

      <section className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 py-3 md:py-4 shadow-sm transition-all">
        <div className="max-w-[120rem] mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-center justify-between">

            <div className="w-full md:w-auto overflow-hidden">
              <div className="flex items-center gap-2 md:gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide mask-fade-right">
                <span className="flex-shrink-0 text-gray-400 font-medium text-xs md:text-sm flex items-center gap-1 mr-1 md:mr-2">
                  <Filter size={14} className="md:w-4 md:h-4" /> Categories:
                </span>

                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    updateUrlParams('category', 'all');
                  }}
                  className={`whitespace-nowrap px-3 md:px-5 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold transition-all duration-300 flex-shrink-0 border ${selectedCategory === 'all'
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
                      className={`whitespace-nowrap px-3 md:px-5 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold transition-all duration-300 flex-shrink-0 border ${
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

            <div className="flex gap-2 md:gap-3 w-full md:w-auto">
              <div className="relative z-50 flex-1 md:flex-none">
                {isAgeDropdownOpen && <div className="fixed inset-0 z-40" onClick={() => setIsAgeDropdownOpen(false)} />}
                <button
                  onClick={() => setIsAgeDropdownOpen(!isAgeDropdownOpen)}
                  className={`w-full md:w-56 flex items-center justify-between bg-white border px-3 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl transition-all duration-300 relative z-50 text-sm md:text-base ${isAgeDropdownOpen ? 'border-primary ring-2 ring-primary/10 shadow-lg' : 'border-gray-200 hover:border-primary/50 hover:shadow-md'}`}
                >
                  <div className="flex flex-col items-start text-left">
                    <span className="text-[9px] md:text-[10px] uppercase tracking-wider text-gray-400 font-bold">Age Group</span>
                    <span className="font-bold text-gray-800 text-xs md:text-sm">
                      {selectedAgeGroup === 'all' ? 'Any Age' : ageGroups.find(g => g.id === selectedAgeGroup)?.label}
                    </span>
                  </div>
                  <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 md:w-5 md:h-5 ${isAgeDropdownOpen ? 'rotate-180 text-primary' : ''}`} />
                </button>

                {isAgeDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-full bg-white border border-gray-100 rounded-lg md:rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                    <div className="py-1">
                      <button onClick={() => { setSelectedAgeGroup('all'); updateUrlParams('age', 'all'); setIsAgeDropdownOpen(false); }} className="w-full px-3 md:px-4 py-2 md:py-3 text-left hover:bg-light-pink/30 flex items-center justify-between group transition-colors text-sm">
                        <span className={`font-medium ${selectedAgeGroup === 'all' ? 'text-primary font-bold' : 'text-gray-600'}`}>Any Age</span>
                        {selectedAgeGroup === 'all' && <Check size={14} className="text-primary md:w-4 md:h-4" />}
                      </button>
                      {ageGroups.map((ageGroup) => (
                        <button key={ageGroup.id} onClick={() => { setSelectedAgeGroup(ageGroup.id); updateUrlParams('age', ageGroup.id); setIsAgeDropdownOpen(false); }} className="w-full px-3 md:px-4 py-2 md:py-3 text-left hover:bg-light-pink/30 flex items-center justify-between group transition-colors text-sm">
                          <span className={`font-medium ${selectedAgeGroup === ageGroup.id ? 'text-primary font-bold' : 'text-gray-600'}`}>{ageGroup.label}</span>
                          {selectedAgeGroup === ageGroup.id && <Check size={14} className="text-primary md:w-4 md:h-4" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-8 md:py-16 bg-white min-h-[50vh]">
        <div className="max-w-[120rem] mx-auto px-4 md:px-6">
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <p className="text-gray-500 font-medium">Loading collection...</p>
            </div>
          ) : filteredToys.length === 0 ? (
            <div className="text-center py-12 md:py-20 bg-gray-50 rounded-2xl md:rounded-3xl">
              <p className="font-paragraph text-base md:text-xl text-gray-500 mb-2">No toys found matching your filters.</p>
              <button onClick={() => {
                setSelectedCategory('all'); 
                setSelectedAgeGroup('all'); 
                setSearchParams({});
              }} className="text-primary font-bold hover:underline text-sm md:text-base">Clear all filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
              {filteredToys.map((toy, index) => (
                <motion.div
                  key={toy._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-white rounded-lg md:rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
                >
                  <Link to={`/toys/${toy._id}`} className="aspect-square overflow-hidden bg-gray-50 relative group block">
                    {(() => {
                      let imageUrl = 'https://static.wixstatic.com/media/b9ec8c_2c7c3392b6544f1093b680407e664a6a~mv2.png';
                      
                      if (toy.productGallery && Array.isArray(toy.productGallery) && toy.productGallery.length > 0) {
                        const first = toy.productGallery[0];
                        imageUrl = first.src || first.url || first;
                      } else if (toy.productImages1 && Array.isArray(toy.productImages1) && toy.productImages1.length > 0) {
                        const first = toy.productImages1[0];
                        imageUrl = first.src || first.url || first;
                      } else if (toy.productImages && typeof toy.productImages === 'string') {
                        imageUrl = toy.productImages;
                      } else if (toy.image && typeof toy.image === 'string') {
                        imageUrl = toy.image;
                      }
                      
                      return (
                        <Image
                          src={imageUrl}
                          alt={toy.name || 'Toy product'}
                          width={400}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      );
                    })()}
                  </Link>

                  <div className="p-2 md:p-4 flex flex-col flex-grow">
                    <h3 className="font-heading text-sm md:text-lg font-bold text-foreground mb-1 line-clamp-1 leading-tight">
                      {toy.name}
                    </h3>
                    {toy.shortDescription && (
                      <p className="font-paragraph text-xs md:text-sm text-gray-500 mb-2 md:mb-3 line-clamp-2 leading-relaxed">
                        {toy.shortDescription}
                      </p>
                    )}
                    <div className="mt-auto mb-2 md:mb-4">
                      {toy.price && (
                        <div className="text-primary font-bold text-base md:text-xl mb-1">
                          Rs. {toy.price}
                        </div>
                      )}
                      {toy.ageGroup && (
                        <div className="text-gray-800 text-xs md:text-sm font-medium">
                          {toy.ageGroup}
                        </div>
                      )}
                    </div>
                    <div className="space-y-2 md:space-y-3">
                      <Link
                        to={`/toys/${toy._id}`}
                        className="w-full bg-primary text-white font-bold text-xs md:text-sm py-2 md:py-2.5 rounded-full hover:bg-primary/90 transition-all shadow-md opacity-90 hover:opacity-100 text-center block"
                      >
                        View Details
                      </Link>
                      <div className="text-center">
                        <button
                          onClick={() => handleWhatsAppClick(toy)}
                          className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-whatsapp-green transition-colors"
                        >
                          Need help? <span className="text-whatsapp-green font-semibold flex items-center gap-1"><MessageCircle size={12} className="md:w-4 md:h-4" /> Chat on WhatsApp</span>
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

      <section className="py-16 bg-gradient-to-br from-light-pink to-white">
        <div className="max-w-[120rem] mx-auto px-4 md:px-6">
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
