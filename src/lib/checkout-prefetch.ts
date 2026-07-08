/**
 * Checkout Prefetch Utility
 * Preloads checkout page resources to reduce navigation delay
 */

export function prefetchCheckoutPage() {
  // Only run in browser
  if (typeof window === 'undefined') return;

  // Prefetch the checkout route
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.as = 'document';
  link.href = '/checkout';
  document.head.appendChild(link);
}

/**
 * Preconnect to external checkout services
 * Reduces DNS lookup and connection time for payment processing
 */
export function preconnectCheckoutServices() {
  if (typeof window === 'undefined') return;

  const domains = [
    { href: 'https://checkout.wix.com', rel: 'preconnect' },
    { href: 'https://api.wix.com', rel: 'preconnect' },
    { href: 'https://checkout.razorpay.com', rel: 'dns-prefetch' },
  ];

  domains.forEach(({ href, rel }) => {
    const link = document.createElement('link');
    link.rel = rel;
    link.href = href;
    if (rel === 'preconnect') {
      link.crossOrigin = 'anonymous';
    }
    document.head.appendChild(link);
  });
}

/**
 * Initialize checkout performance optimizations
 * Call this once on app initialization
 */
export function initCheckoutOptimizations() {
  if (typeof window === 'undefined') return;

  // Prefetch checkout page
  prefetchCheckoutPage();

  // Preconnect to checkout services after a short delay
  // to avoid blocking initial page load
  setTimeout(() => {
    preconnectCheckoutServices();
  }, 1000);
}
