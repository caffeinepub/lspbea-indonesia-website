import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import BerandaPage from "./pages/BerandaPage";
import KontakPage from "./pages/KontakPage";
import LayananPage from "./pages/LayananPage";
import TentangPage from "./pages/TentangPage";
import TimPage from "./pages/TimPage";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster />
    </>
  ),
});

const berandaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: BerandaPage,
});

const tentangRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tentang",
  component: TentangPage,
});

const layananRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/layanan",
  component: LayananPage,
});

const timRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tim",
  component: TimPage,
});

const kontakRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/kontak",
  component: KontakPage,
});

const routeTree = rootRoute.addChildren([
  berandaRoute,
  tentangRoute,
  layananRoute,
  timRoute,
  kontakRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
