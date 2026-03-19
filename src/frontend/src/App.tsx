import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthContext";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import AdminPage from "./pages/AdminPage";
import BerandaPage from "./pages/BerandaPage";
import KontakPage from "./pages/KontakPage";
import LayananPage from "./pages/LayananPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import TentangPage from "./pages/TentangPage";
import TimPage from "./pages/TimPage";

const rootRoute = createRootRoute({
  component: () => (
    <AuthProvider>
      <Outlet />
      <Toaster />
    </AuthProvider>
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

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterPage,
});

const resetPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reset-password",
  component: ResetPasswordPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const routeTree = rootRoute.addChildren([
  berandaRoute,
  tentangRoute,
  layananRoute,
  timRoute,
  kontakRoute,
  loginRoute,
  registerRoute,
  resetPasswordRoute,
  adminRoute,
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
