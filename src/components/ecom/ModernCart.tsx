import { X, Trash2, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { useState } from 'react';
import { useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';

export default function ModernCart() {
  const { items, totalPrice, isOpen, isCheckingOut, actions } = useCart();
  const { currency } = useCurrency();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Use INR as the currency for India
  const displayCurrency = currency || 'INR';

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      await actions.checkout();
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={actions.closeCart}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-heading text-2xl text-foreground">Shopping Cart</h2>
              <button
                onClick={actions.closeCart}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close cart"
              >
                <X size={24} className="text-foreground" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="text-6xl mb-4">🛒</div>
                  <p className="font-paragraph text-gray-500 text-lg">Your cart is empty</p>
                  <p className="font-paragraph text-gray-400 text-sm mt-2">Add items to get started</p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={`${item.collectionId}-${item.itemId}`}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    {/* Product Image */}
                    {item.image && (
                      <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-white">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading text-sm font-bold text-foreground truncate">
                        {item.name}
                      </h3>
                      <p className="font-paragraph text-sm text-primary font-bold mt-1">
                        {formatPrice(item.price, displayCurrency)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          onClick={() => actions.updateQuantity(item, Math.max(1, item.quantity - 1))}
                          className="p-1 hover:bg-white rounded transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} className="text-foreground" />
                        </button>
                        <span className="font-paragraph text-sm font-bold w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => actions.updateQuantity(item, item.quantity + 1)}
                          className="p-1 hover:bg-white rounded transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} className="text-foreground" />
                        </button>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => actions.removeFromCart(item)}
                      className="p-2 text-gray-400 hover:text-destructive hover:bg-white rounded transition-colors flex-shrink-0"
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 p-6 space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between items-center">
                  <span className="font-paragraph text-gray-600">Subtotal</span>
                  <span className="font-heading font-bold text-foreground">
                    {formatPrice(totalPrice, displayCurrency)}
                  </span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut || isProcessing}
                  className="w-full bg-primary text-white font-heading font-bold py-3 rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isCheckingOut || isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Proceed to Checkout'
                  )}
                </button>

                {/* Continue Shopping */}
                <button
                  onClick={actions.closeCart}
                  className="w-full border-2 border-primary text-primary font-heading font-bold py-3 rounded-lg hover:bg-primary/5 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
