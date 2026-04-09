import { Skeleton } from "@/components/ui/skeleton";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy-loaded pages
const LandingPage = lazy(() => import("./pages/Landing"));
const QuizPage = lazy(() => import("./pages/Quiz"));
const StreamsPage = lazy(() => import("./pages/Streams"));
const StreamDetailPage = lazy(() => import("./pages/StreamDetail"));
const RoadmapPage = lazy(() => import("./pages/Roadmap"));
const SupportPage = lazy(() => import("./pages/Support"));
const PricingPage = lazy(() => import("./pages/Pricing"));
const AccountPage = lazy(() => import("./pages/Account"));

const PageLoader = () => (
  <div className="max-w-6xl mx-auto px-4 py-12 space-y-4">
    <Skeleton className="h-8 w-48" />
    <Skeleton className="h-4 w-72" />
    <Skeleton className="h-64 w-full" />
  </div>
);

// Root route with Layout
const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <LandingPage />
    </Suspense>
  ),
});

const quizRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/quiz",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <QuizPage />
    </Suspense>
  ),
});

const streamsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/streams",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <StreamsPage />
    </Suspense>
  ),
});

const streamDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/streams/$streamId",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ProtectedRoute>
        <StreamDetailPage />
      </ProtectedRoute>
    </Suspense>
  ),
});

const roadmapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/roadmap",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ProtectedRoute>
        <RoadmapPage />
      </ProtectedRoute>
    </Suspense>
  ),
});

const supportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/support",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <SupportPage />
    </Suspense>
  ),
});

const pricingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pricing",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <PricingPage />
    </Suspense>
  ),
});

const accountRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/account",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ProtectedRoute>
        <AccountPage />
      </ProtectedRoute>
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  quizRoute,
  streamsRoute,
  streamDetailRoute,
  roadmapRoute,
  supportRoute,
  pricingRoute,
  accountRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
