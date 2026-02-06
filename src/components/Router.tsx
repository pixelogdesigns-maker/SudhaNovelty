import { MiniCartContextProvider } from '@/components/MiniCartContextProvider';
import { MemberProvider } from '@/integrations';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import { ScrollToTop } from '@/lib/scroll-to-top';
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';

// Import pages
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

// Layout component that includes ScrollToTop and Watermark
function Layout() {
  return (
    <>
      <ScrollToTop />
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
