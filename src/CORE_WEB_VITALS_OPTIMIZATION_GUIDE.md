# Core Web Vitals Optimization Guide

## Overview
This document outlines all performance optimizations implemented to improve Google's Core Web Vitals (LCP, CLS, INP) while maintaining the existing design, branding, and functionality.

---

## 1. Largest Contentful Paint (LCP) Optimizations

### Goal: Reduce LCP from 9.1s to under 2.5s

#### 1.1 Hero Image Preloading
- **File**: `/src/lib/performance-optimizations.ts`
- **Function**: `preloadHeroImage()`
- **Implementation**: 
  - Preloads the primary hero image with `rel="preload"` and `fetchPriority="high"`
  - Called in Router.tsx Layout component on app initialization
  - Ensures hero image loads before other resources

#### 1.2 Resource Hints
- **File**: `/src/lib/performance-optimizations.ts`
- **Function**: `setupResourceHints()`
- **Implementation**:
  - DNS prefetch for external domains (static.wixstatic.com, video.wixstatic.com)
  - Preconnect to critical origins for faster connection establishment
  - Reduces connection latency for external resources

#### 1.3 Image Optimization
- **File**: `/src/components/ui/image.tsx`
- **Current**: Already uses Wix Image Kit for responsive image delivery
- **Enhancements**:
  - All images have fixed width/height to prevent layout shifts
  - Images use `loading="lazy"` for below-the-fold content
  - Hero image uses `priority={i === 1}` for first slide preloading

#### 1.4 Font Optimization
- **File**: `/src/styles/fonts.css`
- **Implementation**:
  - All fonts use `font-display: swap` to show fallback immediately
  - Prevents FOUT (Flash of Unstyled Text) and FOIT (Flash of Invisible Text)
  - Preloads only critical font weights (400, 500, 700)

#### 1.5 Third-Party Script Deferral
- **File**: `/src/lib/performance-optimizations.ts`
- **Function**: `deferThirdPartyScripts()`
- **Implementation**:
  - Meta Pixel (Facebook tracking) loads via `requestIdleCallback`
  - Defers non-critical scripts until after main content loads
  - Fallback to setTimeout for browsers without requestIdleCallback

---

## 2. Cumulative Layout Shift (CLS) Optimizations

### Goal: Reduce CLS from 1.0 to below 0.1

#### 2.1 Fixed Dimensions for All Elements
- **File**: `/src/styles/global.css`
- **Implementation**:
  - All images have explicit width/height attributes
  - Videos have fixed aspect ratios
  - Buttons maintain consistent padding/margin on hover
  - Prevents layout shift during interactions

#### 2.2 Container Stabilization
- **File**: `/src/styles/global.css`
- **CSS Rules**:
  ```css
  img, video, iframe {
    display: block;
    max-width: 100%;
    height: auto;
  }
  ```
- **Benefits**: Prevents unexpected size changes

#### 2.3 Animation Optimization
- **File**: `/src/styles/global.css`
- **Implementation**:
  - All animations use `transform` and `opacity` only (no layout recalculations)
  - Respects `prefers-reduced-motion` for accessibility
  - Uses `will-change: transform` for GPU acceleration
  - Removes `transition` from layout-affecting properties

#### 2.4 Button Hover States
- **File**: `/src/styles/global.css`
- **Implementation**:
  ```css
  button:hover, button:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
  ```
- **Benefits**: Prevents padding/margin changes on hover

#### 2.5 Hero Carousel Optimization
- **File**: `/src/components/pages/HomePage.tsx`
- **Implementation**:
  - Fixed aspect ratio: `1300/390` (desktop), `1250/1406` (mobile)
  - Reserved vertical space prevents layout shift
  - Uses `will-change: transform` and `backfaceVisibility: hidden`
  - Smooth transitions without affecting layout

#### 2.6 Lazy Loading for Below-the-Fold Content
- **File**: `/src/components/pages/HomePage.tsx`
- **Implementation**:
  - Videos use IntersectionObserver for lazy loading
  - Images use `loading="lazy"` attribute
  - Prevents initial page load from rendering off-screen content

---

## 3. Interaction to Next Paint (INP) Optimizations

### Goal: Maintain good INP performance

#### 3.1 Event Handler Optimization
- **File**: `/src/lib/performance-optimizations.ts`
- **Functions**: `debounce()`, `throttle()`
- **Implementation**:
  - Debounce for resize/scroll events (wait 150ms)
  - Throttle for high-frequency events (limit to 16ms)
  - Prevents excessive recalculations

#### 3.2 Scroll Performance
- **File**: `/src/styles/global.css`
- **Implementation**:
  ```css
  .overflow-hidden, .overflow-auto {
    transform: translateZ(0);
    backfaceVisibility: hidden;
  }
  ```
- **Benefits**: GPU acceleration for smooth scrolling

#### 3.3 DOM Complexity Reduction
- **File**: `/src/lib/performance-optimizations.ts`
- **Function**: `optimizeDOMStructure()`
- **Implementation**:
  - Removes empty divs and unnecessary wrappers
  - Reduces DOM tree depth
  - Improves event handling performance

#### 3.4 Carousel Navigation
- **File**: `/src/components/pages/HomePage.tsx`
- **Implementation**:
  - Navigation buttons use `transition-all` (not layout-affecting)
  - Carousel uses CSS transforms for smooth animations
  - No JavaScript-based layout calculations

---

## 4. Image Optimization Strategy

### 4.1 Responsive Images
- All images use Wix Image Kit for automatic format selection
- Serves WebP/AVIF to supported browsers
- Fallback to PNG/JPG for older browsers

### 4.2 Image Sizing
- Hero images: 1300x390 (desktop), 1250x1406 (mobile)
- Product images: 300x300 (cards), 400x400 (details)
- Category images: 200x200 (thumbnails)
- All images have explicit width/height

### 4.3 Lazy Loading Strategy
```typescript
// Above the fold - priority loading
<Image priority={i === 1} ... />

// Below the fold - lazy loading
<Image loading="lazy" ... />
```

---

## 5. Font Loading Optimization

### 5.1 Font Display Strategy
- **Strategy**: `font-display: swap`
- **Behavior**: Shows fallback font immediately, swaps when ready
- **Benefit**: Prevents FOUT/FOIT

### 5.2 Critical Font Weights
- Preload only: 400 (regular), 500 (medium), 700 (bold)
- Defer: 300, 800, 900 weights
- Reduces initial font payload

### 5.3 Font Families
- Heading: Poppins (1 family)
- Paragraph: Nunito Sans (1 family)
- Decorative: Limited use (only when necessary)

---

## 6. Third-Party Script Management

### 6.1 Meta Pixel (Facebook Tracking)
- **Loading**: Via `requestIdleCallback` (deferred)
- **Timing**: After main content loads
- **Impact**: No blocking of critical rendering path

### 6.2 Other Third-Party Scripts
- Analytics: Deferred loading
- Chat widgets: Deferred loading
- Social embeds: Lazy loaded on demand

---

## 7. CSS and JavaScript Optimization

### 7.1 CSS Optimization
- **File**: `/src/styles/global.css`
- **Techniques**:
  - Minimal CSS (only necessary rules)
  - No unused selectors
  - Efficient selectors (avoid deep nesting)
  - CSS containment for layout isolation

### 7.2 JavaScript Optimization
- **File**: `/src/lib/performance-optimizations.ts`
- **Techniques**:
  - Lazy loading of non-critical components
  - Code splitting via React Router
  - Debouncing/throttling of events
  - Efficient DOM queries

---

## 8. Responsive Layout Optimization

### 8.1 Mobile-First Design
- Mobile: 3-column grid (Shop by Age)
- Tablet: 3-column grid
- Desktop: 6-column grid
- Reduced padding/margins on mobile

### 8.2 Aspect Ratio Preservation
- Hero carousel: Fixed aspect ratio
- Product images: 1:1 aspect ratio
- Videos: 9:16 aspect ratio
- Prevents layout shift during image load

### 8.3 Flexible Layouts
- Use CSS Grid/Flexbox (no fixed widths)
- Responsive font sizes
- Adaptive spacing

---

## 9. Performance Monitoring

### 9.1 Core Web Vitals Monitoring
- **File**: `/src/lib/performance-optimizations.ts`
- **Function**: `monitorCoreWebVitals()`
- **Metrics**:
  - LCP (Largest Contentful Paint)
  - CLS (Cumulative Layout Shift)
  - FID (First Input Delay)

### 9.2 Console Logging
- Metrics logged to console for debugging
- Can be sent to analytics service

---

## 10. Implementation Checklist

### ✅ Completed Optimizations
- [x] Hero image preloading
- [x] Resource hints (DNS prefetch, preconnect)
- [x] Font optimization (font-display: swap)
- [x] Third-party script deferral
- [x] Fixed dimensions for all elements
- [x] Animation optimization (transform/opacity only)
- [x] Lazy loading for images and videos
- [x] DOM complexity reduction
- [x] Scroll performance optimization
- [x] Responsive layout optimization
- [x] CSS containment for layout isolation
- [x] Debounce/throttle for events

### 📋 Recommended Next Steps
1. **Image Compression**: Use tools like TinyPNG/ImageOptim
2. **CDN Optimization**: Ensure all assets served from CDN
3. **Browser Caching**: Set proper cache headers
4. **Minification**: Minify CSS/JS in production
5. **Gzip Compression**: Enable gzip on server
6. **HTTP/2 Push**: Push critical resources
7. **Service Worker**: Implement for offline support
8. **Lighthouse Audit**: Run regular audits

---

## 11. Testing and Validation

### 11.1 Tools
- Google PageSpeed Insights
- Google Lighthouse
- WebPageTest
- Chrome DevTools Performance tab

### 11.2 Metrics to Track
- LCP: Target < 2.5s
- CLS: Target < 0.1
- FID: Target < 100ms
- TTFB: Target < 600ms
- FCP: Target < 1.8s

### 11.3 Testing Scenarios
- Desktop (Chrome, Firefox, Safari)
- Mobile (iOS Safari, Chrome Android)
- Slow 4G network
- Fast 3G network
- Offline (Service Worker)

---

## 12. Maintenance

### 12.1 Regular Audits
- Run Lighthouse audit monthly
- Monitor Core Web Vitals in Google Search Console
- Track performance metrics in analytics

### 12.2 Updates
- Keep dependencies updated
- Monitor browser compatibility
- Update optimization techniques as needed

### 12.3 Documentation
- Keep this guide updated
- Document any custom optimizations
- Share performance best practices with team

---

## 13. Performance Budget

### Recommended Targets
- **LCP**: < 2.5s (good), < 4s (needs improvement)
- **CLS**: < 0.1 (good), < 0.25 (needs improvement)
- **FID**: < 100ms (good), < 300ms (needs improvement)
- **Total Bundle Size**: < 200KB (gzipped)
- **Initial Load Time**: < 3s (on 4G)

---

## 14. References

### Official Documentation
- [Google Core Web Vitals](https://web.dev/vitals/)
- [Web Vitals Guide](https://web.dev/web-vitals/)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)

### Performance Best Practices
- [Web Performance Working Group](https://www.w3.org/webperf/)
- [MDN Performance Guide](https://developer.mozilla.org/en-US/docs/Web/Performance)
- [Wix Performance Optimization](https://www.wix.com/en/performance)

---

## 15. Support

For questions or issues related to performance optimization:
1. Check this guide first
2. Review the implementation files
3. Run Lighthouse audit
4. Check browser console for errors
5. Contact development team

---

**Last Updated**: 2026-07-11
**Version**: 1.0
**Status**: ✅ Complete
