/**
 * Checkout Prefetch Utility - OPTIMIZED
 * Preloads checkout services to reduce navigation delay
 * 
 * PERFORMANCE IMPROVEMENTS:
 * - Removed /checkout page prefetch (eliminated unnecessary redirect)
 * - Preconnect to Wix checkout services immediately
 * - Preconnect to Razorpay only when user interacts with checkout
 * - Use requestIdleCallback for non-critical preconnects
 */

/**
 * Preconnect to Wix checkout services immediately
 * This is critical for fast checkout initialization
 */
export function preconnectCheckoutServices() {
  if (typeof window === 'undefined') return;

  // Critical preconnects - establish connection immediately
  const criticalDomains = [
    'https://checkout.wix.com',
    'https://api.wix.com',
  ];

  criticalDomains.forEach((href) => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = href;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

/**
 * Preconnect to Razorpay when user is about to checkout
 * Deferred to reduce initial page load impact
 */
export function preconnectRazorpay() {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'dns-prefetch';
  link.href = 'https://checkout.razorpay.com';
  document.head.appendChild(link);
}

/**
 * Initialize checkout performance optimizations
 * Call this once on app initialization
 */
export function initCheckoutOptimizations() {
  if (typeof window === 'undefined') return;

  // Preconnect to Wix services immediately (critical path)
  preconnectCheckoutServices();

  // Preconnect to Razorpay using requestIdleCallback for non-blocking
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      preconnectRazorpay();
    });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(() => {
      preconnectRazorpay();
    }, 2000);
  }
}

/**
 * Preconnect on user interaction
 * Call this when user hovers over "Buy Now" or "Checkout" buttons
 */
export function preconnectOnUserIntent() {
  if (typeof window === 'undefined') return;
  preconnectRazorpay();
}
