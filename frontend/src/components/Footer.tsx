import { SiFacebook, SiInstagram, SiLinkedin, SiX } from 'react-icons/si';
import { Globe } from 'lucide-react';

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
              Lembaga Sertifikasi Profesi terkemuka di bidang teknik bangunan dan konstruksi.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('beranda')}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Beranda
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('tentang')}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Tentang Kami
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('layanan')}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Layanan
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('tim')}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Tim Kami
                </button>
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
                <a href="tel:+6211100923" className="hover:text-primary transition-colors">
                  +6211100923
                </a>
              </li>
              <li>
                <a href="mailto:info@lspbea.id" className="hover:text-primary transition-colors">
                  info@lspbea.id
                </a>
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                aria-label="Facebook"
              >
                <SiFacebook className="h-4 w-4 text-primary" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                aria-label="Instagram"
              >
                <SiInstagram className="h-4 w-4 text-primary" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                aria-label="LinkedIn"
              >
                <SiLinkedin className="h-4 w-4 text-primary" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                aria-label="X (Twitter)"
              >
                <SiX className="h-4 w-4 text-primary" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2025 LSPBEA Indonesia. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
