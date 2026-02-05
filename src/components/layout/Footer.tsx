import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { StoreInformation } from '@/entities';
import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react';
import { generateWhatsAppUrl } from '@/lib/whatsapp-utils';

function Footer() {
  const [storeInfo, setStoreInfo] = useState<StoreInformation | null>(null);

  useEffect(() => {
    const fetchStoreInfo = async () => {
      try {
        const { items } = await BaseCrudService.getAll<StoreInformation>('storeinformation');
        if (items && items.length > 0) {
          setStoreInfo(items[0]);
        }
      } catch {
        // Error fetching store info - use defaults
      }
    };
    fetchStoreInfo();
  }, []);

  const handleWhatsAppClick = () => {
    const message = 'Hi, I am interested in this toy. Please share more details.';
    const whatsAppUrl = generateWhatsAppUrl(storeInfo?.whatsAppNumber, message);
    window.open(whatsAppUrl, '_blank');
  };

  return (
    <footer className="bg-light-pink mt-0">
      <div className="max-w-[120rem] mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Store Info */}
          <div>
            <h3 className="font-heading text-xl text-primary mb-6">
              {storeInfo?.storeName || 'Sudha Novelties'}
            </h3>
            <p className="font-paragraph text-base text-foreground leading-relaxed">Bringing smiles to children for over 25+ years with quality toys and exceptional service.</p>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-heading text-xl text-primary mb-6">Contact Us</h3>
            <div className="space-y-4">
              {storeInfo?.address && (
                <div className="flex items-start gap-3">
                  <MapPin className="text-primary mt-1 flex-shrink-0" size={20} />
                  <p className="font-paragraph text-base text-foreground">
                    {storeInfo.address}
                  </p>
                </div>
              )}
              {storeInfo?.phoneNumber && (
                <div className="flex items-center gap-3">
                  <Phone className="text-primary flex-shrink-0" size={20} />
                  <a
                    href={`tel:${storeInfo.phoneNumber}`}
                    className="font-paragraph text-base text-foreground hover:text-primary transition-colors"
                  >
                    {storeInfo.phoneNumber}
                  </a>
                </div>
              )}
              {storeInfo?.whatsAppNumber && (
                <div className="flex items-center gap-3">
                  <MessageCircle className="text-whatsapp-green flex-shrink-0" size={20} />
                  <button
                    onClick={handleWhatsAppClick}
                    className="font-paragraph text-base text-foreground hover:text-whatsapp-green transition-colors"
                  >
                    {storeInfo.whatsAppNumber}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="font-heading text-xl text-primary mb-6">Working Hours</h3>
            {storeInfo?.workingHours && (
              <div className="flex items-start gap-3">
                <Clock className="text-primary mt-1 flex-shrink-0" size={20} />
                <p className="font-paragraph text-base text-foreground whitespace-pre-line">
                  {storeInfo.workingHours}
                </p>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-xl text-primary mb-6">Quick Links</h3>
            <div className="space-y-3">
              <a href="/" className="block font-paragraph text-base text-foreground hover:text-primary transition-colors">
                Home
              </a>
              <a href="/about" className="block font-paragraph text-base text-foreground hover:text-primary transition-colors">
                About Us
              </a>
              <a href="/toys" className="block font-paragraph text-base text-foreground hover:text-primary transition-colors">
                Toys
              </a>
              <a href="/visit" className="block font-paragraph text-base text-foreground hover:text-primary transition-colors">
                Visit Our Store
              </a>
              <a href="/contact" className="block font-paragraph text-base text-foreground hover:text-primary transition-colors">
                Contact Us
              </a>
            </div>
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-heading text-xl text-primary mb-6">Policies</h3>
            <div className="space-y-3">
              <a href="/replacement-policy" className="block font-paragraph text-base text-foreground hover:text-primary transition-colors">
                Replacement Policy
              </a>
              <a href="/warranty-policy" className="block font-paragraph text-base text-foreground hover:text-primary transition-colors">
                Warranty Policy
              </a>
              <a href="/shipping-policy" className="block font-paragraph text-base text-foreground hover:text-primary transition-colors">
                Shipping Policy
              </a>
              <a href="/terms-and-conditions" className="block font-paragraph text-base text-foreground hover:text-primary transition-colors">
                Terms & Conditions
              </a>
              <a href="/privacy-policy" className="block font-paragraph text-base text-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-primary/20">
          <p className="font-paragraph text-base text-center text-foreground">Thank you for trusting us with your child's happiness. We're here to help you find the perfect toy ! 💝</p>
          <p className="font-paragraph text-sm text-center text-foreground/70 mt-4">
            © {new Date().getFullYear()} {storeInfo?.storeName || 'Sudha Novelties'}. All rights reserved.
          </p>
          <p className="font-paragraph text-sm text-center text-foreground/70 mt-2">
            Powered by <a href="https://www.pixelog.in" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors font-medium font-bitter-black">Pixelog</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
export default Footer;
