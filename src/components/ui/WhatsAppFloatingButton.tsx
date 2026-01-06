import { MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { StoreInformation } from '@/entities';

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
      window.open(`https://wa.me/${whatsAppNumber}`, '_blank');
    }
  };

  if (!whatsAppNumber) return null;

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-whatsapp-green hover:bg-whatsapp-green/90 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
    </button>
  );
}
