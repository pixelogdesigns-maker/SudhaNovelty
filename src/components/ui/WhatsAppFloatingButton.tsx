import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { StoreInformation } from '@/entities';
import { generateWhatsAppUrl } from '@/lib/whatsapp-utils';
import { Image } from '@/components/ui/image';

export default function WhatsAppFloatingButton() {
  const [whatsAppNumber, setWhatsAppNumber] = useState<string>('');

  useEffect(() => {
    const fetchStoreInfo = async () => {
      const { items } = await BaseCrudService.getAll<StoreInformation>('storeinformation');
      if (items && items.length > 0 && items[0].whatsAppNumber) {
        setWhatsAppNumber(items[0].whatsAppNumber);
      }
    };
    fetchStoreInfo();
  }, []);

  const handleClick = () => {
    if (whatsAppNumber) {
      const whatsAppUrl = generateWhatsAppUrl(whatsAppNumber);
      window.open(whatsAppUrl, '_blank');
    }
  };

  if (!whatsAppNumber) return null;

  return (
    <button
      onClick={handleClick}
      // REMOVED: 'rounded-full' and 'shadow-lg' (The icon itself acts as the button)
      // ADDED: 'drop-shadow-lg' filter which respects the PNG's transparency/shape
      className="fixed bottom-6 right-6 z-50 transition-all duration-300 hover:scale-110 hover:drop-shadow-xl drop-shadow-lg"
      aria-label="Chat on WhatsApp"
    >
      <Image
        src="https://static.wixstatic.com/media/b9ec8c_93ef4dee7ad0443da2ecd729537b040e~mv2.png"
        alt="WhatsApp"
        width={60} // Slightly larger to compensate for lack of background padding
        height={60}
        // REMOVED: 'rounded-full' from here so the tail isn't clipped
        className="object-contain" 
      />
    </button>
  );
}