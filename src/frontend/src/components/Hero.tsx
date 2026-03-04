import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative pt-20 min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/hero-buildings.dim_1200x400.jpg"
          alt="Buildings"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Profesional dalam{" "}
            <span className="text-primary">Sertifikasi Teknik Bangunan</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            LSPBEA Indonesia adalah lembaga sertifikasi profesi terkemuka yang
            berkomitmen untuk meningkatkan standar kompetensi profesional di
            bidang teknik bangunan dan konstruksi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="text-base"
              data-ocid="hero.layanan.button"
              onClick={() => navigate({ to: "/layanan" })}
            >
              Layanan Kami
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base"
              data-ocid="hero.kontak.button"
              onClick={() => navigate({ to: "/kontak" })}
            >
              Hubungi Kami
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
