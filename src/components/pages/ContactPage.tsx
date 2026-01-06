import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { ContactInquiries, StoreInformation } from '@/entities';
import { MessageCircle, Send, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppFloatingButton from '@/components/ui/WhatsAppFloatingButton';

export default function ContactPage() {
  const [storeInfo, setStoreInfo] = useState<StoreInformation | null>(null);
  const [formData, setFormData] = useState({
    visitorName: '',
    visitorEmail: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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
    if (storeInfo?.whatsAppNumber) {
      window.open(`https://wa.me/${storeInfo.whatsAppNumber}`, '_blank');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const inquiry: ContactInquiries = {
      _id: crypto.randomUUID(),
      visitorName: formData.visitorName,
      visitorEmail: formData.visitorEmail,
      subject: formData.subject,
      message: formData.message,
      submissionDate: new Date(),
    };

    await BaseCrudService.create('contactinquiries', inquiry);

    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({
      visitorName: '',
      visitorEmail: '',
      subject: '',
      message: '',
    });

    setTimeout(() => {
      setSubmitSuccess(false);
    }, 5000);
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
              Get in Touch
            </h1>
            <p className="font-paragraph text-xl text-foreground max-w-3xl mx-auto">
              Have questions about our toys? Need help finding the perfect gift? We're here to help!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl text-primary mb-4">
              Choose Your Preferred Contact Method
            </h2>
            <p className="font-paragraph text-lg text-foreground">
              We offer multiple ways to reach us. Pick the one that works best for you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {storeInfo?.whatsAppNumber && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-whatsapp-green/10 to-whatsapp-green/5 rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-whatsapp-green rounded-full mb-6">
                  <MessageCircle className="text-white" size={32} />
                </div>
                <h3 className="font-heading text-2xl text-primary mb-3">
                  WhatsApp Chat
                </h3>
                <p className="font-paragraph text-base text-foreground mb-6">
                  Get instant responses to your questions
                </p>
                <button
                  onClick={handleWhatsAppClick}
                  className="inline-flex items-center justify-center gap-2 bg-whatsapp-green text-white font-paragraph text-base px-6 py-3 rounded-xl hover:bg-whatsapp-green/90 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <MessageCircle size={18} />
                  Start Chat
                </button>
              </motion.div>
            )}

            {storeInfo?.phoneNumber && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-light-pink rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-6">
                  <Phone className="text-white" size={32} />
                </div>
                <h3 className="font-heading text-2xl text-primary mb-3">
                  Phone Call
                </h3>
                <p className="font-paragraph text-base text-foreground mb-6">
                  Speak directly with our team
                </p>
                <a
                  href={`tel:${storeInfo.phoneNumber}`}
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph text-base px-6 py-3 rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <Phone size={18} />
                  Call Now
                </a>
              </motion.div>
            )}

            {storeInfo?.emailAddress && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-light-pink rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-6">
                  <Mail className="text-white" size={32} />
                </div>
                <h3 className="font-heading text-2xl text-primary mb-3">
                  Email Us
                </h3>
                <p className="font-paragraph text-base text-foreground mb-6">
                  Send us a detailed message
                </p>
                <a
                  href={`mailto:${storeInfo.emailAddress}`}
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph text-base px-6 py-3 rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <Mail size={18} />
                  Send Email
                </a>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gradient-to-br from-light-pink to-white">
        <div className="max-w-[120rem] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-3xl p-10 shadow-lg"
            >
              <h2 className="font-heading text-3xl md:text-4xl text-primary mb-6">
                Send Us a Message
              </h2>
              <p className="font-paragraph text-base text-foreground mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              {submitSuccess && (
                <div className="mb-6 p-4 bg-whatsapp-green/10 border border-whatsapp-green rounded-xl">
                  <p className="font-paragraph text-base text-whatsapp-green">
                    Thank you for your message! We'll get back to you soon.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="visitorName" className="block font-paragraph text-base text-foreground mb-2">
                    Your Name *
                  </label>
                  <Input
                    id="visitorName"
                    name="visitorName"
                    type="text"
                    value={formData.visitorName}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-xl border-light-pink focus:border-primary"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="visitorEmail" className="block font-paragraph text-base text-foreground mb-2">
                    Your Email *
                  </label>
                  <Input
                    id="visitorEmail"
                    name="visitorEmail"
                    type="email"
                    value={formData.visitorEmail}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-xl border-light-pink focus:border-primary"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block font-paragraph text-base text-foreground mb-2">
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-xl border-light-pink focus:border-primary"
                    placeholder="What is this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block font-paragraph text-base text-foreground mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full rounded-xl border-light-pink focus:border-primary"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground font-paragraph text-base px-8 py-6 rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send size={18} className="mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Store Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-heading text-3xl md:text-4xl text-primary mb-8">
                Visit Us
              </h2>

              <div className="space-y-6 mb-8">
                {storeInfo?.address && (
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-light-pink rounded-full flex items-center justify-center">
                      <MapPin className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg text-primary mb-2">Our Location</h3>
                      <p className="font-paragraph text-base text-foreground leading-relaxed">
                        {storeInfo.address}
                      </p>
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
                        href={`tel:${storeInfo.phoneNumber}`}
                        className="font-paragraph text-base text-foreground hover:text-primary transition-colors"
                      >
                        {storeInfo.phoneNumber}
                      </a>
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
              </div>

              <div className="bg-primary rounded-2xl p-8 text-white">
                <h3 className="font-heading text-2xl mb-4">
                  Prefer WhatsApp?
                </h3>
                <p className="font-paragraph text-base text-white/90 mb-6">
                  Get instant responses and personalized toy recommendations through WhatsApp.
                </p>
                <button
                  onClick={handleWhatsAppClick}
                  className="inline-flex items-center justify-center gap-2 bg-whatsapp-green text-white font-paragraph text-base px-6 py-3 rounded-xl hover:bg-whatsapp-green/90 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <MessageCircle size={18} />
                  Chat on WhatsApp
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
