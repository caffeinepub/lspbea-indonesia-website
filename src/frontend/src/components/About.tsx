import { Card, CardContent } from "@/components/ui/card";
import { Award, Shield, Target, Users } from "lucide-react";

export default function About() {
  const features = [
    {
      icon: Award,
      title: "Terakreditasi",
      description:
        "Lembaga sertifikasi yang telah terakreditasi dan diakui secara nasional",
    },
    {
      icon: Users,
      title: "Tim Profesional",
      description:
        "Didukung oleh tim asesor dan tenaga ahli yang berpengalaman",
    },
    {
      icon: Target,
      title: "Standar Tinggi",
      description:
        "Menerapkan standar kompetensi internasional dalam setiap proses sertifikasi",
    },
    {
      icon: Shield,
      title: "Terpercaya",
      description:
        "Dipercaya oleh ribuan profesional dan perusahaan di seluruh Indonesia",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Tentang <span className="text-primary">LSPBEA Indonesia</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              LSPBEA Indonesia adalah Lembaga Sertifikasi Profesi yang berfokus
              pada pengembangan dan sertifikasi kompetensi profesional di bidang
              teknik bangunan, konstruksi, dan engineering.
            </p>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Kami berkomitmen untuk meningkatkan kualitas sumber daya manusia
              Indonesia melalui program sertifikasi yang komprehensif dan sesuai
              dengan standar industri global.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Dengan pengalaman bertahun-tahun, kami telah membantu ribuan
              profesional mendapatkan sertifikasi kompetensi yang diakui secara
              nasional dan internasional.
            </p>
          </div>
          <div className="relative">
            <img
              src="/assets/generated/office-building.dim_600x400.jpg"
              alt="Office Building"
              className="rounded-lg shadow-2xl w-full"
            />
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-primary/10 rounded-lg -z-10" />
            <div className="absolute -top-6 -right-6 w-48 h-48 bg-accent/10 rounded-lg -z-10" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="border-2 hover:border-primary transition-colors"
            >
              <CardContent className="pt-6">
                <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
