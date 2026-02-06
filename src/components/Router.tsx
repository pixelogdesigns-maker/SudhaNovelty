import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import { MiniCartContextProvider } from '@/components/MiniCartContextProvider';
import Watermark from '@/components/Watermark';

// Import pages
import HomePage from '@/components/pages/HomePage';
import AboutPage from '@/components/pages/AboutPage';
import ToysPage from '@/components/pages/ToysPage';
import ProductDetailsPage from '@/components/pages/ProductDetailsPage';
import VisitStorePage from '@/components/pages/VisitStorePage';
import ContactPage from '@/components/pages/ContactPage';
import AdminPage from '@/components/pages/AdminPage';
import ReplacementPolicyPage from '@/components/pages/ReplacementPolicyPage';
import WarrantyPolicyPage from '@/components/pages/WarrantyPolicyPage';
import ShippingPolicyPage from '@/components/pages/ShippingPolicyPage';
import TermsAndConditionsPage from '@/components/pages/TermsAndConditionsPage';
import PrivacyPolicyPage from '@/components/pages/PrivacyPolicyPage';

// Layout component that includes ScrollToTop and Watermark
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
      <Watermark />
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
