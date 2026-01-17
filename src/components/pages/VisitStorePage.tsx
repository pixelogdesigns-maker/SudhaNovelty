import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { StoreInformation } from '@/entities';
import { MapPin, Phone, Clock, MessageCircle, Navigation } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppFloatingButton from '@/components/ui/WhatsAppFloatingButton';
import { generateWhatsAppUrl } from '@/lib/whatsapp-utils';

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

  const handleMainStoreDirections = () => {
    window.open('https://maps.app.goo.gl/t4mHdnPEn57Vu1HZA?g_st=ic', '_blank');
  };

  const handleBranchStoreDirections = () => {
    window.open('https://maps.app.goo.gl/7CUkrrQkLh9pvtF18?g_st=ic', '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <WhatsAppFloatingButton />

      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-light-pink to-white py-20">
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="font-heading text-5xl md:text-6xl text-primary mb-6">
              Visit Our Store
            </h1>
            <p className="font-paragraph text-xl text-foreground max-w-3xl mx-auto">
              Come experience the joy of toy shopping in person. See, touch, and explore our collection with your child.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Multiple Stores Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-primary mb-4">
              Our Store Locations
            </h2>
            <p className="font-paragraph text-lg text-foreground max-w-2xl mx-auto">
              Visit us at any of our convenient locations to explore our complete toy collection
            </p>
          </motion.div>

          {/* Store 1 - Main Store */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="bg-light-pink/20 rounded-3xl p-10 max-w-4xl mx-auto">
              <h3 className="font-heading text-3xl md:text-4xl text-primary mb-6">
                MAIN STORE
              </h3>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-light-pink rounded-full flex items-center justify-center">
                    <MapPin className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg text-primary mb-2">Location</h4>
                    <a
                      href="https://maps.app.goo.gl/t4mHdnPEn57Vu1HZA?g_st=ic"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-paragraph text-base transition-colors underline"
                    >
                      <Navigation size={18} />
                      View on Google Maps
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-light-pink rounded-full flex items-center justify-center">
                    <Phone className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg text-primary mb-2">Phone</h4>
                    <a
                      href={`tel:${storeInfo?.phoneNumber || '919025398147'}`}
                      className="font-paragraph text-base text-foreground hover:text-primary transition-colors"
                    >
                      {storeInfo?.phoneNumber || '+91 9025398147'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-light-pink rounded-full flex items-center justify-center">
                    <Clock className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg text-primary mb-2">Hours</h4>
                    <p className="font-paragraph text-base text-foreground">
                      {storeInfo?.workingHours || 'Mon - Sun: 10:00 AM - 9:00 PM'}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-whatsapp-green text-white font-paragraph text-base px-6 py-3 rounded-xl hover:bg-whatsapp-green/90 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} />
                Chat on WhatsApp
              </button>
            </div>
          </motion.div>

          {/* Store 2 - Branch Store */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-light-pink/20 rounded-3xl p-10 max-w-4xl mx-auto">
              <h3 className="font-heading text-3xl md:text-4xl text-primary mb-6">
                BRANCH STORE
              </h3>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-light-pink rounded-full flex items-center justify-center">
                    <MapPin className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg text-primary mb-2">Location</h4>
                    <a
                      href="https://maps.app.goo.gl/7CUkrrQkLh9pvtF18?g_st=ic"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-paragraph text-base transition-colors underline"
                    >
                      <Navigation size={18} />
                      View on Google Maps
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-light-pink rounded-full flex items-center justify-center">
                    <Phone className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg text-primary mb-2">Phone</h4>
                    <a
                      href={`tel:${storeInfo?.phoneNumber || '919025398147'}`}
                      className="font-paragraph text-base text-foreground hover:text-primary transition-colors"
                    >
                      {storeInfo?.phoneNumber || '+91 9025398147'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-light-pink rounded-full flex items-center justify-center">
                    <Clock className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg text-primary mb-2">Hours</h4>
                    <p className="font-paragraph text-base text-foreground">
                      {storeInfo?.workingHours || 'Mon - Sun: 10:00 AM - 9:00 PM'}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-whatsapp-green text-white font-paragraph text-base px-6 py-3 rounded-xl hover:bg-whatsapp-green/90 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} />
                Chat on WhatsApp
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Visit Section */}
      <section className="py-20 bg-gradient-to-br from-light-pink to-white">
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-primary mb-4">
              Why Visit Our Stores?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-md"
            >
              <h3 className="font-heading text-xl text-primary mb-3">
                Hands-On Experience
              </h3>
              <p className="font-paragraph text-base text-foreground leading-relaxed">
                Let your child see, touch, and play with toys before making a decision.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-md"
            >
              <h3 className="font-heading text-xl text-primary mb-3">
                Expert Guidance
              </h3>
              <p className="font-paragraph text-base text-foreground leading-relaxed">
                Our knowledgeable staff helps you find the perfect toy for any age.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-md"
            >
              <h3 className="font-heading text-xl text-primary mb-3">
                Immediate Availability
              </h3>
              <p className="font-paragraph text-base text-foreground leading-relaxed">
                Take your purchase home immediately. No waiting for delivery.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-md"
            >
              <h3 className="font-heading text-xl text-primary mb-3">
                Family-Friendly
              </h3>
              <p className="font-paragraph text-base text-foreground leading-relaxed">
                Our stores are designed to be welcoming for both parents and children.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-white mb-6">
              Plan Your Visit Today
            </h2>
            <p className="font-paragraph text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Have questions before you visit? Chat with us on WhatsApp for store hours, directions, or product availability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleMainStoreDirections}
                className="inline-flex items-center justify-center gap-3 bg-white text-primary font-paragraph text-lg px-10 py-5 rounded-xl hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <Navigation size={24} />
                Main Store Directions
              </button>
              <button
                onClick={handleBranchStoreDirections}
                className="inline-flex items-center justify-center gap-3 bg-white text-primary font-paragraph text-lg px-10 py-5 rounded-xl hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <Navigation size={24} />
                Branch Store Directions
              </button>
              <button
                onClick={handleWhatsAppClick}
                className="inline-flex items-center justify-center gap-3 bg-whatsapp-green text-white font-paragraph text-lg px-10 py-5 rounded-xl hover:bg-whatsapp-green/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <MessageCircle size={24} />
                Chat on WhatsApp
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
