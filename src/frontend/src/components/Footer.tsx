import { Link } from "@tanstack/react-router";
import { Globe } from "lucide-react";
import { SiFacebook, SiInstagram, SiLinkedin, SiX } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <img
                src="/assets/generated/lspbea-building-logo-transparent.dim_200x200.png"
                alt="LSPBEA Indonesia – Building Logo"
                title="LSPBEA Indonesia – Building Logo"
                className="h-10 w-10 object-contain"
              />
              <span className="text-lg font-bold">LSPBEA Indonesia</span>
            </div>
            <div className="flex items-center gap-1.5 mb-4 ml-12">
              <Globe className="h-3.5 w-3.5 text-primary/70" />
              <span className="text-xs font-medium text-primary/80 tracking-wide">
                lspbea.id.ic0.app
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Lembaga Sertifikasi Profesi terkemuka di bidang teknik bangunan
              dan konstruksi.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  data-ocid="footer.beranda.link"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  to="/tentang"
                  data-ocid="footer.tentang.link"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  to="/layanan"
                  data-ocid="footer.layanan.link"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Layanan
                </Link>
              </li>
              <li>
                <Link
                  to="/tim"
                  data-ocid="footer.tim.link"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Tim Kami
                </Link>
              </li>
              <li>
                <Link
                  to="/kontak"
                  data-ocid="footer.kontak.link"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Layanan</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Sertifikasi Kompetensi</li>
              <li>Pelatihan & Workshop</li>
              <li>Asesmen Kompetensi</li>
              <li>Konsultasi Profesional</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Kontak</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Jakarta, Indonesia</li>
              <li>
                <a
                  href="tel:+62811100923"
                  className="hover:text-primary transition-colors"
                >
                  +62811100923
                </a>
              </li>
              <li>
                <a
                  href="mailto:sekretariat@bea-indonesia.org"
                  className="hover:text-primary transition-colors"
                >
                  sekretariat@bea-indonesia.org
                </a>
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <button
                type="button"
                className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                aria-label="Facebook"
              >
                <SiFacebook className="h-4 w-4 text-primary" />
              </button>
              <button
                type="button"
                className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                aria-label="Instagram"
              >
                <SiInstagram className="h-4 w-4 text-primary" />
              </button>
              <button
                type="button"
                className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                aria-label="LinkedIn"
              >
                <SiLinkedin className="h-4 w-4 text-primary" />
              </button>
              <button
                type="button"
                className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                aria-label="X (Twitter)"
              >
                <SiX className="h-4 w-4 text-primary" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} LSPBEA Indonesia. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
