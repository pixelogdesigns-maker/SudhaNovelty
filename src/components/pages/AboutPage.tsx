import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { Heart, Award, Shield, Users, Store, Sparkles } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppFloatingButton from '@/components/ui/WhatsAppFloatingButton';

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Happiness First',
      description: 'Every toy we offer is chosen with one goal: to bring genuine joy and smiles to children.',
    },
    {
      icon: Shield,
      title: 'Safety & Quality',
      description: 'All our toys meet strict safety standards and are tested for quality and durability.',
    },
    {
      icon: Award,
      title: '10+ Years of Trust',
      description: 'Over a decade of experience in understanding what children love and parents trust.',
    },
    {
      icon: Users,
      title: 'Family Focused',
      description: 'We treat every customer like family, providing personalized service and care.',
    },
    {
      icon: Store,
      title: 'Offline Presence',
      description: 'Visit our physical store to see, touch, and experience toys before you buy.',
    },
    {
      icon: Sparkles,
      title: 'Curated Selection',
      description: 'Handpicked toys that inspire creativity, learning, and endless fun.',
    },
  ];

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
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="font-heading text-5xl md:text-6xl text-primary mb-6">
              Our Story
            </h1>
            <p className="font-paragraph text-xl text-foreground leading-relaxed">
              For over 10 years, we've been dedicated to bringing smiles to children's faces with quality toys that inspire, educate, and entertain.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[120rem] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-heading text-4xl md:text-5xl text-primary mb-6">
                A Decade of Joy
              </h2>
              <div className="space-y-6 font-paragraph text-lg text-foreground leading-relaxed">
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

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://static.wixstatic.com/media/b9ec8c_7e69ebd5908a4e3682ef46f9ba410995~mv2.png?originWidth=576&originHeight=384"
                  alt="Our toy store filled with happy children and quality toys"
                  width={600}
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              What We Stand For
            </h2>
            <p className="font-paragraph text-lg text-foreground max-w-3xl mx-auto">
              Our values guide everything we do, from selecting toys to serving our customers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-light-pink rounded-full mb-6">
                  <value.icon className="text-primary" size={32} />
                </div>
                <h3 className="font-heading text-2xl text-primary mb-4">
                  {value.title}
                </h3>
                <p className="font-paragraph text-base text-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[120rem] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1 relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://static.wixstatic.com/media/b9ec8c_10be9b3693d9411e97fa1fd69f0ae3e0~mv2.png?originWidth=576&originHeight=384"
                  alt="Quality certified toys for children's safety"
                  width={600}
                  className="w-full h-auto"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <h2 className="font-heading text-4xl md:text-5xl text-primary mb-6">
                Our Commitment to Quality
              </h2>
              <div className="space-y-6 font-paragraph text-lg text-foreground leading-relaxed">
                <p>
                  Safety is our top priority. Every toy in our collection meets rigorous safety standards and undergoes thorough testing. We partner only with trusted manufacturers who share our commitment to quality.
                </p>
                <p>
                  From educational toys that stimulate young minds to plush companions that provide comfort, each product is carefully selected to ensure it brings value to your child's development and happiness.
                </p>
                <p>
                  We believe in transparency and honesty. If a toy doesn't meet our standards, it doesn't make it to our shelves. Your trust is something we've earned over 10 years, and we work hard every day to maintain it.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Both Online and Offline Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-white mb-6">
              Shop Your Way
            </h2>
            <p className="font-paragraph text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Whether you prefer the convenience of online browsing or the hands-on experience of visiting our store, we're here to serve you both ways.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <Store className="text-white mx-auto mb-4" size={48} />
                <h3 className="font-heading text-2xl text-white mb-4">
                  Visit Our Store
                </h3>
                <p className="font-paragraph text-base text-white/90">
                  Come see our toys in person, get expert advice, and let your child explore our collection.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <Sparkles className="text-white mx-auto mb-4" size={48} />
                <h3 className="font-heading text-2xl text-white mb-4">
                  Order Online
                </h3>
                <p className="font-paragraph text-base text-white/90">
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
