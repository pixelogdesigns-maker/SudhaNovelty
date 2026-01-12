import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { StoreInformation } from '@/entities';
import { Image } from '@/components/ui/image';
import { MapPin, Phone, Clock, MessageCircle, Mail, Navigation } from 'lucide-react';
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

  const handleGetDirections = () => {
    // Using the reliable Google Maps short link instead of the API endpoint
    window.open('https://maps.app.goo.gl/T2LkaYruKfHbXm6d8', '_blank');
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

          {/* Store 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Store 1 Image */}
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://static.wixstatic.com/media/b9ec8c_ad2d1c23443f41ada8bfc2f770f2a64c~mv2.png?originWidth=1152&originHeight=640"
                  alt="Sudha Novelties - Main Store"
                  width={600}
                  className="w-full h-auto"
                />
              </div>

              {/* Store 1 Info */}
              <div className="bg-light-pink/20 rounded-3xl p-10">
                <h3 className="font-heading text-3xl md:text-4xl text-primary mb-6">
                  Main Store
                </h3>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-light-pink rounded-full flex items-center justify-center">
                      <MapPin className="text-primary" size={24} />
                    </div>
                    <div>
                      <h4 className="font-heading text-lg text-primary mb-2">Address</h4>
                      <p className="font-paragraph text-base text-foreground leading-relaxed">
                        {storeInfo?.address || 'Sudha Novelties, Main Location'}
                      </p>
                      <a
                        href="https://maps.app.goo.gl/T2LkaYruKfHbXm6d8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-2 text-primary hover:text-primary/80 font-paragraph text-base transition-colors"
                      >
                        <Navigation size={18} />
                        Get Directions
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
            </div>
          </motion.div>

          {/* Store 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Store 2 Info (Order reversed on desktop) */}
              <div className="bg-light-pink/20 rounded-3xl p-10 order-2 lg:order-1">
                <h3 className="font-heading text-3xl md:text-4xl text-primary mb-6">
                  Downtown Store
                </h3>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-light-pink rounded-full flex items-center justify-center">
                      <MapPin className="text-primary" size={24} />
                    </div>
                    <div>
                      <h4 className="font-heading text-lg text-primary mb-2">Address</h4>
                      <p className="font-paragraph text-base text-foreground leading-relaxed">
                        123 Toy Street, Downtown District, City Center
                      </p>
                      <a
                        href="https://maps.app.goo.gl/example"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-2 text-primary hover:text-primary/80 font-paragraph text-base transition-colors"
                      >
                        <Navigation size={18} />
                        Get Directions
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
                        href="tel:919876543210"
                        className="font-paragraph text-base text-foreground hover:text-primary transition-colors"
                      >
                        +91 9876543210
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
                        Mon - Sun: 11:00 AM - 8:00 PM
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

              {/* Store 2 Image */}
              <div className="rounded-3xl overflow-hidden shadow-2xl order-1 lg:order-2">
                <Image
                  src="https://static.wixstatic.com/media/b9ec8c_2ca344a9396c4f04a5d303aa5c79e93c~mv2.png?originWidth=768&originHeight=384"
                  alt="Sudha Novelties - Downtown Store"
                  width={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Store Image Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl overflow-hidden shadow-2xl"
          >
            <Image
              src="https://static.wixstatic.com/media/b9ec8c_ad2d1c23443f41ada8bfc2f770f2a64c~mv2.png?originWidth=1152&originHeight=640"
              alt="Our toy store exterior and interior"
              width={1200}
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Store Information Section */}
      <section className="py-16 bg-gradient-to-br from-light-pink to-white">
        <div className="max-w-[120rem] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-3xl p-10 shadow-lg"
            >
              <h2 className="font-heading text-3xl md:text-4xl text-primary mb-8">
                Store Information
              </h2>

              <div className="space-y-6">
                {storeInfo?.address && (
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-light-pink rounded-full flex items-center justify-center">
                      <MapPin className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg text-primary mb-2">Address</h3>
                      <p className="font-paragraph text-base text-foreground leading-relaxed">
                        {storeInfo.address}
                      </p>
                      <button
                        onClick={handleGetDirections}
                        className="mt-3 inline-flex items-center gap-2 text-primary hover:text-primary/80 font-paragraph text-base transition-colors"
                      >
                        <Navigation size={18} />
                        Get Directions
                      </button>
                    </div>
                  </div>
                )}

                {storeInfo?.phoneNumber && (
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-light-pink rounded-full flex items-center justify-center">
                      <Phone className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg text-primary mb-2">Phone</h3>
                      <a
                        href={`tel:919025398147`}
                        className="font-paragraph text-base text-foreground hover:text-primary transition-colors"
                      >
                        {storeInfo.phoneNumber}
                      </a>
                    </div>
                  </div>
                )}

                {storeInfo?.whatsAppNumber && (
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-whatsapp-green/10 rounded-full flex items-center justify-center">
                      <MessageCircle className="text-whatsapp-green" size={24} />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg text-primary mb-2">WhatsApp</h3>
                      <button
                        onClick={handleWhatsAppClick}
                        className="font-paragraph text-base text-foreground hover:text-whatsapp-green transition-colors"
                      >
                        {storeInfo.whatsAppNumber}
                      </button>
                    </div>
                  </div>
                )}

                {storeInfo?.emailAddress && (
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-light-pink rounded-full flex items-center justify-center">
                      <Mail className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg text-primary mb-2">Email</h3>
                      <a
                        href={`mailto:${storeInfo.emailAddress}`}
                        className="font-paragraph text-base text-foreground hover:text-primary transition-colors"
                      >
                        {storeInfo.emailAddress}
                      </a>
                    </div>
                  </div>
                )}

                {storeInfo?.workingHours && (
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-light-pink rounded-full flex items-center justify-center">
                      <Clock className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg text-primary mb-2">Working Hours</h3>
                      <p className="font-paragraph text-base text-foreground whitespace-pre-line leading-relaxed">
                        {storeInfo.workingHours}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Why Visit Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-heading text-3xl md:text-4xl text-primary mb-8">
                Why Visit Our Store?
              </h2>

              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h3 className="font-heading text-xl text-primary mb-3">
                    Hands-On Experience
                  </h3>
                  <p className="font-paragraph text-base text-foreground leading-relaxed">
                    Let your child see, touch, and play with toys before making a decision. There's nothing like experiencing a toy in person.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h3 className="font-heading text-xl text-primary mb-3">
                    Expert Guidance
                  </h3>
                  <p className="font-paragraph text-base text-foreground leading-relaxed">
                    Our knowledgeable staff can help you find the perfect toy based on your child's age, interests, and developmental needs.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h3 className="font-heading text-xl text-primary mb-3">
                    Immediate Availability
                  </h3>
                  <p className="font-paragraph text-base text-foreground leading-relaxed">
                    Take your purchase home immediately. No waiting for delivery when you shop in-store.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h3 className="font-heading text-xl text-primary mb-3">
                    Family-Friendly Environment
                  </h3>
                  <p className="font-paragraph text-base text-foreground leading-relaxed">
                    Our store is designed to be welcoming for both parents and children, making shopping a fun family activity.
                  </p>
                </div>
              </div>
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
              <a href="https://maps.app.goo.gl/T2LkaYruKfHbXm6d8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-white text-primary font-paragraph text-lg px-10 py-5 rounded-xl hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <Navigation size={24} />
                Get Directions
              </a>
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
