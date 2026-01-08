import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { Toys, ToyCategories, StoreInformation } from '@/entities';
import { Image } from '@/components/ui/image';
import { MessageCircle, Filter, ShoppingCart } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppFloatingButton from '@/components/ui/WhatsAppFloatingButton';

export default function ToysPage() {
  const [searchParams] = useSearchParams();
  const [toys, setToys] = useState<Toys[]>([]);
  const [categories, setCategories] = useState<ToyCategories[]>([]);
  const [storeInfo, setStoreInfo] = useState<StoreInformation | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredToys, setFilteredToys] = useState<Toys[]>([]);

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

  const handleWhatsAppClick = (toy?: Toys) => {
    if (storeInfo?.whatsAppNumber) {
      const message = toy
        ? `Hi! I'm interested in ${toy.name}. Can you provide more details?`
        : 'Hi! I would like to inquire about your toys.';
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/919025398147?text=${encodedMessage}`, '_blank');
    }
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
      <section className="py-8 bg-white border-b border-light-pink">
        <div className="max-w-[120rem] mx-auto px-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-foreground">
              <Filter size={20} className="text-primary" />
              <span className="font-paragraph text-base font-semibold">Filter by Category:</span>
            </div>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-xl font-paragraph text-base transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-light-pink text-foreground hover:bg-primary/20'
              }`}
            >
              All Toys
            </button>
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => setSelectedCategory(category.categoryName || '')}
                className={`px-6 py-2 rounded-xl font-paragraph text-base transition-all duration-300 ${
                  selectedCategory === category.categoryName
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-light-pink text-foreground hover:bg-primary/20'
                }`}
              >
                {category.categoryName}
              </button>
            ))}
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
