import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  Building2,
  FileCheck,
  GraduationCap,
  Users2,
  Wrench,
} from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: FileCheck,
      title: "Sertifikasi Kompetensi",
      description:
        "Program sertifikasi kompetensi untuk berbagai skema di bidang teknik bangunan dan konstruksi sesuai SKKNI",
    },
    {
      icon: GraduationCap,
      title: "Pelatihan & Workshop",
      description:
        "Pelatihan teknis dan workshop untuk meningkatkan kompetensi profesional di industri konstruksi",
    },
    {
      icon: BookOpen,
      title: "Asesmen Kompetensi",
      description:
        "Layanan asesmen kompetensi yang objektif dan profesional oleh asesor bersertifikat",
    },
    {
      icon: Users2,
      title: "Konsultasi Profesional",
      description:
        "Konsultasi dan pendampingan untuk pengembangan sistem manajemen kompetensi perusahaan",
    },
    {
      icon: Building2,
      title: "Sertifikasi Perusahaan",
      description:
        "Program sertifikasi untuk perusahaan konstruksi dan engineering sesuai standar industri",
    },
    {
      icon: Wrench,
      title: "Pengembangan Skema",
      description:
        "Pengembangan skema sertifikasi baru sesuai kebutuhan industri dan perkembangan teknologi",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Layanan <span className="text-primary">Kami</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Kami menyediakan berbagai layanan sertifikasi dan pengembangan
            kompetensi profesional yang komprehensif
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card
              key={service.title}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="mb-4 inline-flex p-4 rounded-lg bg-primary/10">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
