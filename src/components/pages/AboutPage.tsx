import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { Store, Sparkles } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppFloatingButton from '@/components/ui/WhatsAppFloatingButton';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <WhatsAppFloatingButton />

      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-light-pink to-white py-12 md:py-24">
        <div className="max-w-[120rem] mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="font-heading text-3xl md:text-7xl text-primary mb-4 md:mb-8">
              Our Story
            </h1>
            <p className="font-paragraph text-base md:text-2xl text-foreground leading-relaxed text-gray-600">
              For over 10 years, we've been dedicated to bringing smiles to children's faces with quality toys that inspire, educate, and entertain.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Journey Section (Updated Image & Content Only) */}
      <section className="py-12 md:py-24 bg-white relative overflow-hidden">
        {/* Decorative Blob */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-48 md:w-96 h-48 md:h-96 bg-light-pink/30 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-[120rem] mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-heading text-2xl md:text-6xl text-primary mb-4 md:mb-8 leading-tight">
                A Decade of <br/><span className="text-secondary">Pure Joy</span>
              </h2>
              <div className="space-y-3 md:space-y-6 font-paragraph text-sm md:text-lg text-gray-600 leading-relaxed">
                <p>
                  What started as a small toy shop with a big dream has grown into a trusted destination for parents seeking quality toys for their children. Our journey began with a simple belief: every child deserves toys that are safe, engaging, and built to last.
                </p>
                <p>
                  Over the past 10+ years, we've served thousands of families, helping them find the perfect toys for birthdays, holidays, and everyday fun. We've watched children grow up with our toys, and that's what makes our work so rewarding.
                </p>
                <p>
                  Today, we continue to uphold the same values that started it all: quality, safety, and genuine care for every customer. Whether you visit our offline store or browse online, you'll experience the same warmth and dedication that has made us a beloved part of the community.
                </p>
              </div>
            </motion.div>

            {/* Image Content - Updated with New Link */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="rounded-2xl md:rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100 transform hover:scale-[1.02] transition-transform duration-500">
                <Image
                  src="https://static.wixstatic.com/media/b9ec8c_b70ec8dab8f04ffea9bbdb554fe188de~mv2.png"
                  alt="Sudha Novelties Store"
                  width={800}
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Shop Your Way Section */}
      <section className="py-12 md:py-24 bg-primary text-white">
        <div className="max-w-[120rem] mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="font-heading text-2xl md:text-5xl mb-4 md:mb-6">
              Shop Your Way
            </h2>
            <p className="font-paragraph text-base md:text-xl text-white/90 mb-8 md:mb-16 max-w-3xl mx-auto leading-relaxed">
              Whether you prefer the convenience of online browsing or the hands-on experience of visiting our store, we're here to serve you.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Visit Store Card */}
              <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-[2.5rem] p-10 hover:bg-white/20 transition-all duration-300">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-primary group-hover:scale-110 transition-transform">
                  <Store size={40} />
                </div>
                <h3 className="font-heading text-3xl mb-4">Visit Our Store</h3>
                <p className="font-paragraph text-lg text-white/80">
                  Come see our toys in person, get expert advice, and let your child explore our collection.
                </p>
              </div>

              {/* Order Online Card */}
              <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-[2.5rem] p-10 hover:bg-white/20 transition-all duration-300">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-primary group-hover:scale-110 transition-transform">
                  <Sparkles size={40} />
                </div>
                <h3 className="font-heading text-3xl mb-4">Order Online</h3>
                <p className="font-paragraph text-lg text-white/80">
                  Browse our collection online and chat with us on WhatsApp for easy ordering and delivery.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}