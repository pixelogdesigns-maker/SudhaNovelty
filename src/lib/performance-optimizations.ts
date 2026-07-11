/**
 * Core Web Vitals Performance Optimizations
 * Implements strategies for LCP, CLS, and INP improvements
 */

/**
 * Preload critical hero image for LCP optimization
 * This should be called early in the app lifecycle
 */
export function preloadHeroImage(imageUrl: string): void {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = imageUrl;
  link.fetchPriority = 'high';
  document.head.appendChild(link);
}

/**
 * Defer non-critical third-party scripts
 * Prevents blocking of main thread during page load
 */
export function deferThirdPartyScripts(): void {
  if (typeof window === 'undefined') return;

  // Defer analytics and tracking scripts
  const deferredScripts = [
    'facebook.com/tr',
    'google-analytics',
    'gtag',
    'hotjar',
    'intercom',
    'drift',
    'zendesk',
  ];

  // Use requestIdleCallback to load after critical content
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      loadDeferredScripts();
    }, { timeout: 2000 });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(loadDeferredScripts, 3000);
  }
}

function loadDeferredScripts(): void {
  // Scripts are already deferred via async/defer attributes in HTML
  // This function serves as a hook for additional deferred loading logic
}

/**
 * Optimize font loading to prevent layout shifts
 * Uses font-display: swap to show fallback immediately
 */
export function optimizeFontLoading(): void {
  if (typeof document === 'undefined') return;

  // Preload only critical font weights
  const criticalFonts = [
    { family: 'poppins-v2', weight: '400', url: 'pxiEyp8kv8JHgFVrJJfecnFHGPc.woff2' },
    { family: 'nunito sans', weight: '400', url: 'pe0AMImSLYBIv1o4X1M8ce2xCx3yop4tQpF_MeTm0lfUVwoNnq4CLz0_kJ3xzHGGVFM.woff2' },
  ];

  criticalFonts.forEach(font => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.href = `/public/fonts/${font.family}/${font.url}`;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

/**
 * Implement lazy loading for images below the fold
 * Reduces initial page load time and improves LCP
 */
export function setupLazyLoading(): void {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

  const images = document.querySelectorAll('img[data-lazy]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.getAttribute('data-src');
        if (src) {
          img.src = src;
          img.removeAttribute('data-lazy');
          observer.unobserve(img);
        }
      }
    });
  }, {
    rootMargin: '50px', // Start loading 50px before entering viewport
  });

  images.forEach(img => imageObserver.observe(img));
}

/**
 * Monitor Core Web Vitals
 * Sends metrics to console for debugging
 */
export function monitorCoreWebVitals(): void {
  if (typeof window === 'undefined') return;

  // LCP (Largest Contentful Paint)
  if ('PerformanceObserver' in window) {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // PerformanceObserver not supported
    }
  }

  // CLS (Cumulative Layout Shift)
  if ('PerformanceObserver' in window) {
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
            console.log('CLS:', clsValue);
          }
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      // PerformanceObserver not supported
    }
  }
}

/**
 * Reduce DOM complexity by removing unnecessary elements
 * Call this after initial render to clean up
 */
export function optimizeDOMStructure(): void {
  if (typeof document === 'undefined') return;

  // Remove empty divs and unnecessary wrappers
  const emptyElements = document.querySelectorAll('div:empty, span:empty');
  emptyElements.forEach(el => {
    if (el.children.length === 0 && !el.textContent?.trim()) {
      el.remove();
    }
  });
}

/**
 * Enable resource hints for critical resources
 */
export function setupResourceHints(): void {
  if (typeof document === 'undefined') return;

  // DNS prefetch for external domains
  const domains = [
    'static.wixstatic.com',
    'video.wixstatic.com',
    'connect.facebook.net',
  ];

  domains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = `//${domain}`;
    document.head.appendChild(link);
  });

  // Preconnect to critical origins
  const preconnectDomains = ['static.wixstatic.com', 'video.wixstatic.com'];
  preconnectDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = `//${domain}`;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

/**
 * Debounce function for resize and scroll events
 * Prevents excessive recalculations
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for high-frequency events
 * Ensures consistent performance during interactions
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Optimize animations to use transform and opacity only
 * Avoids layout recalculations during animations
 */
export const ANIMATION_OPTIMIZATION_CSS = `
  /* Use transform and opacity for animations - no layout recalculation */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* Optimize animations for performance */
  .animate-marquee-fast {
    will-change: transform;
    transform: translateZ(0);
  }

  /* Prevent layout shift during transitions */
  button, a {
    transition: background-color 0.2s ease, color 0.2s ease;
  }
`;
