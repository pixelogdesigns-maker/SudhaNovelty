import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { StoreInformation } from '@/entities';
import { generateWhatsAppUrl } from '@/lib/whatsapp-utils';

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
      className="fixed bottom-6 right-6 z-50 bg-whatsapp-green hover:bg-whatsapp-green/90 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a6.963 6.963 0 00-6.957 6.96c0 1.928.563 3.81 1.63 5.454l-1.73 6.322 6.477-1.698a6.97 6.97 0 005.33 2.341h.004c3.837 0 6.957-3.12 6.957-6.961 0-1.857-.72-3.603-2.028-4.911-1.308-1.308-3.054-2.028-4.911-2.028m5.904 13.229l-.004-2.071c0-1.27.49-2.464 1.373-3.347.883-.883 2.056-1.37 3.327-1.37h.004c2.592 0 4.704 2.112 4.704 4.704 0 1.27-.49 2.464-1.373 3.347-.883.883-2.056 1.37-3.327 1.37h-.004c-1.27 0-2.464-.49-3.347-1.373-.883-.883-1.37-2.056-1.37-3.327" />
      </svg>
    </button>
  );
}
