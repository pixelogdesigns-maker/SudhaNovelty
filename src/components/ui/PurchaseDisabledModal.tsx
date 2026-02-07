import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle } from 'lucide-react';

interface PurchaseDisabledModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWhatsAppClick: () => void;
}

export default function PurchaseDisabledModal({
  isOpen,
  onClose,
  onWhatsAppClick,
}: PurchaseDisabledModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-lg md:rounded-2xl shadow-xl max-w-md w-full overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-primary/80 px-6 md:px-8 py-6 md:py-8 relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X size={20} className="text-white" />
                </button>
                <h2 className="font-heading text-xl md:text-2xl text-white pr-8">
                  Online Purchase Unavailable
                </h2>
              </div>

              {/* Content */}
              <div className="px-6 md:px-8 py-6 md:py-8">
                <p className="font-paragraph text-base md:text-lg text-foreground mb-6 leading-relaxed">
                  Online purchase is currently not available. Please place your order via WhatsApp.
                </p>

                <p className="font-paragraph text-sm md:text-base text-gray-600 mb-8">
                  Our team will be happy to assist you with your order and answer any questions you may have.
                </p>

                {/* Buttons */}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={onWhatsAppClick}
                    className="w-full bg-whatsapp-green text-white font-paragraph text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl hover:bg-whatsapp-green/90 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 md:gap-3"
                  >
                    <MessageCircle size={20} className="md:w-6 md:h-6" />
                    Order via WhatsApp
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full bg-gray-100 text-foreground font-paragraph text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl hover:bg-gray-200 transition-all duration-300"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
