import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';

// Import pages
import HomePage from '@/components/pages/HomePage';
import AboutPage from '@/components/pages/AboutPage';
import ToysPage from '@/components/pages/ToysPage';
import ProductDetailsPage from '@/components/pages/ProductDetailsPage';
import VisitStorePage from '@/components/pages/VisitStorePage';
import ContactPage from '@/components/pages/ContactPage';
import AdminPage from '@/components/pages/AdminPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
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
        element: <ProductDetailsPage />,
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
