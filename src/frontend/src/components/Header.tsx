import { Button } from "@/components/ui/button";
import { Link, useRouterState } from "@tanstack/react-router";
import { Globe, Menu, X } from "lucide-react";
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  // biome-ignore lint/correctness/useExhaustiveDependencies: close menu on path changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPath]);

  const isActive = (to: string) => {
    if (to === "/") return currentPath === "/";
    return currentPath.startsWith(to);
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
          {/* Logo and Domain */}
          <Link
            to="/"
            className="flex flex-col gap-0.5 hover:opacity-90 transition-opacity"
          >
            <div className="flex items-center gap-3">
              <img
                src="/assets/generated/lspbea-building-logo-transparent.dim_200x200.png"
                alt="LSPBEA Indonesia – Building Logo"
                title="LSPBEA Indonesia – Building Logo"
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
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
          </nav>

          {/* Mobile Menu Button */}
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

        {/* Mobile Navigation */}
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
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
