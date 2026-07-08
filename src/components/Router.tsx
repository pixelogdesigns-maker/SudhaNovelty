import { MiniCartContextProvider } from '@/components/MiniCartContextProvider';
import { MemberProvider } from '@/integrations';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import { ScrollToTop } from '@/lib/scroll-to-top';
import { initCheckoutOptimizations } from '@/lib/checkout-prefetch';
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';

// Import pages - critical pages loaded immediately
import AboutPage from '@/components/pages/AboutPage';
import AdminPage from '@/components/pages/AdminPage';
import ContactPage from '@/components/pages/ContactPage';
import HomePage from '@/components/pages/HomePage';
import PrivacyPolicyPage from '@/components/pages/PrivacyPolicyPage';
import ProductDetailsPage from '@/components/pages/ProductDetailsPage';
import ReplacementPolicyPage from '@/components/pages/ReplacementPolicyPage';
import ShippingPolicyPage from '@/components/pages/ShippingPolicyPage';
import TermsAndConditionsPage from '@/components/pages/TermsAndConditionsPage';
import ToysPage from '@/components/pages/ToysPage';
import VisitStorePage from '@/components/pages/VisitStorePage';
import WarrantyPolicyPage from '@/components/pages/WarrantyPolicyPage';
import { HeaderWithCart } from '@/components/layout/Header';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

// Lazy load checkout page for faster initial page load
const CheckoutPage = lazy(() => import('@/components/pages/CheckoutPage'));

// Layout component that includes ScrollToTop and HeaderWithCart
function Layout() {
  // Initialize checkout optimizations on app load
  useEffect(() => {
    initCheckoutOptimizations();
  }, []);

  return (
    <>
      <ScrollToTop />
      <HeaderWithCart />
      <Outlet />
      {/* <Watermark /> */}
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "about",
        element: <AboutPage />,
        routeMetadata: {
          pageIdentifier: 'about',
        },
      },
      {
        path: "toys",
        element: <ToysPage />,
        routeMetadata: {
          pageIdentifier: 'toys',
        },
      },
      {
        path: "toys/:toyId",
        element: (
          <MiniCartContextProvider>
            <ProductDetailsPage />
          </MiniCartContextProvider>
        ),
        routeMetadata: {
          pageIdentifier: 'product-details',
        },
      },
      {
        path: "visit",
        element: <VisitStorePage />,
        routeMetadata: {
          pageIdentifier: 'visit',
        },
      },
      {
        path: "contact",
        element: <ContactPage />,
        routeMetadata: {
          pageIdentifier: 'contact',
        },
      },
      {
        path: "admin",
        element: <AdminPage />,
        routeMetadata: {
          pageIdentifier: 'admin',
        },
      },
      {
        path: "replacement-policy",
        element: <ReplacementPolicyPage />,
        routeMetadata: {
          pageIdentifier: 'replacement-policy',
        },
      },
      {
        path: "warranty-policy",
        element: <WarrantyPolicyPage />,
        routeMetadata: {
          pageIdentifier: 'warranty-policy',
        },
      },
      {
        path: "shipping-policy",
        element: <ShippingPolicyPage />,
        routeMetadata: {
          pageIdentifier: 'shipping-policy',
        },
      },
      {
        path: "terms-and-conditions",
        element: <TermsAndConditionsPage />,
        routeMetadata: {
          pageIdentifier: 'terms-and-conditions',
        },
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicyPage />,
        routeMetadata: {
          pageIdentifier: 'privacy-policy',
        },
      },
      {
        path: "checkout",
        element: (
          <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-b from-light-pink/20 to-white py-12 px-4 flex items-center justify-center">
              <div className="text-center">
                <LoadingSpinner size="lg" />
                <p className="font-paragraph text-foreground text-lg mt-4">
                  Loading checkout...
                </p>
              </div>
            </div>
          }>
            <CheckoutPage />
          </Suspense>
        ),
        routeMetadata: {
          pageIdentifier: 'checkout',
        },
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
