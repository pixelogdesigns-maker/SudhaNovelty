import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { StoreInformation } from '@/entities';
import { MapPin, Phone, Clock, MessageCircle, Navigation, ExternalLink } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppFloatingButton from '@/components/ui/WhatsAppFloatingButton';
import { generateWhatsAppUrl } from '@/lib/whatsapp-utils';
import { SEOHelmet } from '@/components/SEOHelmet';

export default function VisitStorePage() {
  const [storeInfo, setStoreInfo] = useState<StoreInformation | null>(null);

  useEffect(() => {
    const fetchStoreInfo = async () => {
      const { items } = await BaseCrudService.getAll<StoreInformation>('storeinformation');
      if (items && items.length > 0) {
        setStoreInfo(items[0]);
      }
    };
    fetchStoreInfo();
  }, []);

  const handleWhatsAppClick = () => {
    const whatsAppUrl = generateWhatsAppUrl(storeInfo?.whatsAppNumber);
    window.open(whatsAppUrl, '_blank');
  };

  // --- Sub-Component for Store Block ---
  const StoreBlock = ({ 
    title, 
    mapSrc, 
    addressUrl, 
    isReversed = false 
  }: { 
    title: string; 
    mapSrc: string; 
    addressUrl: string; 
    isReversed?: boolean; 
  }) => (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-4 md:gap-8 items-stretch mb-12 md:mb-20`}
    >
      {/* Map Embed Section */}
      <div className="w-full lg:w-1/2 min-h-[300px] md:min-h-[400px] lg:min-h-auto relative">
        <div className="absolute inset-0 bg-gray-200 rounded-lg md:rounded-[2rem] overflow-hidden shadow-lg border-2 md:border-4 border-white">
          <iframe 
            src={mapSrc}
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title={`${title} Map`}
            className="w-full h-full grayscale-[20%] hover:grayscale-0 transition-all duration-500"
          ></iframe>
        </div>
      </div>

      {/* Details Card Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center">
        <div className="bg-white p-4 md:p-8 lg:p-10 rounded-lg md:rounded-[2rem] shadow-xl border border-gray-100 h-full flex flex-col justify-center relative overflow-hidden group">
          {/* Decorative Background Blob */}
          <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-light-pink/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-light-pink/50 transition-colors duration-500" />

          <div className="relative z-10">
            <h3 className="font-heading text-2xl md:text-4xl text-primary mb-4 md:mb-6 border-b-2 border-light-pink pb-2 md:pb-4 inline-block">
              {title}
            </h3>

            <div className="space-y-4 md:space-y-6">
              {/* Location */}
              <div className="flex items-start gap-3 md:gap-4 group/item">
                <div className="w-8 md:w-10 h-8 md:h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                  <MapPin size={16} className="md:w-5 md:h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm md:text-lg">Address</h4>
                  <p className="text-gray-600 mb-1 md:mb-2 text-sm md:text-base">{storeInfo?.address || '123 Toy Street, Fun City, India'}</p>
                  <a 
                    href={addressUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs md:text-sm font-bold text-primary flex items-center gap-1 hover:underline"
                  >
                    Get Directions <ExternalLink size={12} className="md:w-4 md:h-4" />
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3 md:gap-4 group/item">
                <div className="w-8 md:w-10 h-8 md:h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                  <Phone size={16} className="md:w-5 md:h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm md:text-lg">Contact</h4>
                  <a href={`tel:${storeInfo?.phoneNumber}`} className="text-gray-600 hover:text-primary transition-colors text-sm md:text-base">
                    {storeInfo?.phoneNumber || '+91 90253 98147'}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3 md:gap-4 group/item">
                <div className="w-8 md:w-10 h-8 md:h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                  <Clock size={16} className="md:w-5 md:h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm md:text-lg">Working Hours</h4>
                  <p className="text-gray-600 text-sm md:text-base">{storeInfo?.workingHours || 'Mon - Sun: 10:00 AM - 9:00 PM'}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3 md:gap-4">
              <a 
                href={addressUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-white border-2 border-gray-200 text-gray-700 font-bold py-2 md:py-3 px-4 md:px-6 rounded-lg md:rounded-xl hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
              >
                <Navigation size={16} className="md:w-5 md:h-5" /> Navigate
              </a>
              <button 
                onClick={handleWhatsAppClick}
                className="flex-1 bg-whatsapp-green text-white font-bold py-2 md:py-3 px-4 md:px-6 rounded-lg md:rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2 text-sm md:text-base"
              >
                <MessageCircle size={16} className="md:w-5 md:h-5" /> WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHelmet 
        title="Visit Our Store - Sudha Novelties | Store Locations & Hours"
        description="Visit Sudha Novelties store to explore our full collection of premium toys. Find our location, hours, and directions. We're ready to help you find the perfect toy!"
        keywords="store location, visit store, toy store near me, store hours, directions"
        canonical="https://sudha-novelties.com/visit"
      />
      <Header />
      <WhatsAppFloatingButton />

      {/* Hero */}
      <section className="relative w-full bg-white py-8 md:py-16 border-b border-gray-100">
        <div className="max-w-[120rem] mx-auto px-4 md:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-heading text-2xl md:text-5xl text-primary mb-2 md:mb-4">Visit Sudha Novelties</h1>
            <p className="font-paragraph text-sm md:text-lg text-gray-500 max-w-2xl mx-auto">
              Drop by our stores to explore the full collection. We can't wait to see you!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Store Locations Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-[120rem] mx-auto px-4 md:px-6">
          
          {/* Main Store - Map Left / Info Right */}
          <StoreBlock 
            title="Main Store"
            // Updated with your specific Main Store Map Link
            mapSrc="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d492.8500497625455!2d78.148129!3d8.8048144!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b03ef98fd8c85a7%3A0x8e37c310bb684eec!2sSudha%20Novelties!5e0!3m2!1sen!2sin!4v1769959828885!5m2!1sen!2sin"
            addressUrl="https://www.google.com/maps/search/Sudha+Novelties"
            isReversed={false}
          />

          {/* Branch Store - Info Left / Map Right */}
          <StoreBlock 
            title="Branch Store"
            // Updated with your specific Branch Store Map Link
            mapSrc="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1971.4105504926988!2d78.1368176!3d8.8028719!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b03efdee738034b%3A0x94a6c5a233714cdc!2sSudha%20Novelties%20New%20Corporation%20branch!5e0!3m2!1sen!2sin!4v1769959842560!5m2!1sen!2sin"
            addressUrl="https://www.google.com/maps/search/Sudha+Novelties"
            isReversed={true}
          />

        </div>
      </section>

      {/* Simple CTA */}
      <section className="py-8 md:py-16 bg-primary text-white text-center">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h2 className="font-heading text-2xl md:text-3xl mb-2 md:mb-4">Need help finding us?</h2>
          <p className="mb-4 md:mb-8 opacity-90 text-sm md:text-base">Call us or message on WhatsApp for live location sharing.</p>
          <button 
            onClick={handleWhatsAppClick}
            className="bg-white text-primary font-bold py-2 md:py-3 px-6 md:px-8 rounded-full hover:bg-gray-100 transition-colors inline-flex items-center gap-2 text-sm md:text-base"
          >
            <MessageCircle size={16} className="md:w-5 md:h-5" /> Contact Support
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}