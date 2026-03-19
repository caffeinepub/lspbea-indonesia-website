import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Globe, LogIn, LogOut, Menu, Settings, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  {
    label: "Beranda",
    to: "/",
    ocid: "nav.beranda.link",
    mobileOcid: "nav.mobile.beranda.link",
  },
  {
    label: "Tentang",
    to: "/tentang",
    ocid: "nav.tentang.link",
    mobileOcid: "nav.mobile.tentang.link",
  },
  {
    label: "Layanan",
    to: "/layanan",
    ocid: "nav.layanan.link",
    mobileOcid: "nav.mobile.layanan.link",
  },
  {
    label: "Tim",
    to: "/tim",
    ocid: "nav.tim.link",
    mobileOcid: "nav.mobile.tim.link",
  },
  {
    label: "Kontak",
    to: "/kontak",
    ocid: "nav.kontak.link",
    mobileOcid: "nav.mobile.kontak.link",
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const { currentUser, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: close menu on path changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPath]);

  const isActive = (to: string) => {
    if (to === "/") return currentPath === "/";
    return currentPath.startsWith(to);
  };

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-sm shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex flex-col gap-0.5 hover:opacity-90 transition-opacity"
          >
            <div className="flex items-center gap-3">
              <img
                src="/assets/generated/lspbea-building-logo-transparent.dim_200x200.png"
                alt="LSPBEA Indonesia – Building Logo"
                className="h-12 w-12 object-contain"
              />
              <span className="text-xl font-bold text-primary">
                LSPBEA Indonesia
              </span>
            </div>
            <div className="flex items-center gap-1.5 ml-[60px]">
              <Globe className="h-3 w-3 text-primary/70" />
              <span className="text-xs font-medium text-primary/80 tracking-wide">
                lspbea.id.ic0.app
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                data-ocid={item.ocid}
                className={`font-medium transition-colors relative pb-1 ${
                  isActive(item.to)
                    ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {currentUser ? (
              <div className="flex items-center gap-3">
                {isAdmin && (
                  <Link
                    to="/admin"
                    data-ocid="nav.admin.link"
                    className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                    Admin
                  </Link>
                )}
                <span className="text-sm text-muted-foreground">
                  {currentUser.firstName}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  data-ocid="nav.button"
                >
                  <LogOut className="mr-1.5 h-3.5 w-3.5" />
                  Keluar
                </Button>
              </div>
            ) : (
              <Link to="/login" data-ocid="nav.login.link">
                <Button size="sm" data-ocid="nav.primary_button">
                  <LogIn className="mr-1.5 h-3.5 w-3.5" />
                  Masuk
                </Button>
              </Link>
            )}
          </nav>

          {/* Mobile Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  data-ocid={item.mobileOcid}
                  className={`text-left font-medium py-2 transition-colors ${
                    isActive(item.to)
                      ? "text-primary font-semibold"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              {currentUser ? (
                <>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      data-ocid="nav.mobile.admin.link"
                      className="text-primary font-medium py-2"
                    >
                      Panel Admin
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={handleLogout}
                    data-ocid="nav.mobile.button"
                    className="text-left text-destructive font-medium py-2"
                  >
                    Keluar ({currentUser.firstName})
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  data-ocid="nav.mobile.login.link"
                  className="text-primary font-medium py-2"
                >
                  Masuk
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
