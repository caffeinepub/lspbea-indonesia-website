import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  ExternalLink,
  Gift,
  MapPin,
  Network,
  Rocket,
  Star,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

export default function EventsSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge
            variant="outline"
            className="mb-3 text-sm font-medium px-4 py-1"
          >
            Berita & Agenda
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Acara & Pengumuman
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Ikuti perkembangan terbaru dan bergabunglah dalam acara-acara
            inspiratif bersama BEA Indonesia.
          </p>
        </motion.div>

        <div className="space-y-10">
          {/* ─── Event 1: Seminar & Gathering Invitation ─── */}
          <motion.div
            data-ocid="events.seminar.card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <Card className="border-2 border-primary/40 shadow-lg overflow-hidden">
              {/* Decorative top bar */}
              <div className="h-2 bg-gradient-to-r from-primary via-accent to-primary" />

              <CardHeader className="pb-3 pt-6">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge className="bg-primary text-primary-foreground text-xs uppercase tracking-widest">
                    Undangan
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Digital Engineering
                  </Badge>
                </div>
                <CardTitle className="text-2xl md:text-3xl leading-tight">
                  ⏰ Undangan Seminar &amp; Gathering Spesial!
                </CardTitle>
                <p className="text-primary font-bold text-lg mt-1 tracking-wide uppercase">
                  EMPOWERING THE FUTURE OF DIGITAL ENGINEERING
                </p>
              </CardHeader>

              <CardContent className="space-y-5 pb-7">
                <p className="text-foreground leading-relaxed">
                  Building Engineers Association (BEA) Indonesia dengan bangga
                  mengundang Anda untuk bergabung dalam acara{" "}
                  <strong>Seminar &amp; Gathering</strong> yang sangat
                  inspiratif!
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Dunia teknik terus berevolusi, dan kini saatnya kita
                  memberdayakan diri dengan pengetahuan terbaru di bidang
                  Digital Engineering. Jangan lewatkan kesempatan emas ini
                  untuk:
                </p>

                {/* Highlights */}
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Star className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Menyimak Wawasan Mendalam:</strong> Dapatkan ilmu
                      dan perspektif baru dari{" "}
                      <em>Ir. Aripin Triyanto S.T., M.T.</em>, Kaprodi Teknik
                      Elektro Universitas Pamulang, mengenai masa depan teknik
                      digital.
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Rocket className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Launching Produk Inovatif:</strong> Saksikan
                      peluncuran BEA MAIN — BEA Application Building Operation.
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Users className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Merayakan Momen Spesial:</strong> Ikut serta dalam
                      perayaan <strong>17 Tahun BEA Anniversary</strong>.
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Network className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Membangun Jaringan:</strong> Berinteraksi dengan
                      600 Membership BEA dan mengenal produk dari 40 Vendor
                      dalam sesi Product Presentation dan Product Knowledge.
                    </span>
                  </li>
                </ul>

                {/* Door Prize */}
                <div className="flex items-center gap-2 bg-primary/10 rounded-lg px-4 py-3 text-sm font-semibold text-primary">
                  <Gift className="h-4 w-4 flex-shrink-0" />
                  Kesempatan Mendapatkan Door Prize!
                </div>

                <Separator />

                {/* Event Detail */}
                <div>
                  <p className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">
                    Detail Acara
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">Tanggal</p>
                        <p>Sabtu, 24 Januari 2026</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">Waktu</p>
                        <p>08.00 s/d 17.00 WIB</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">Lokasi</p>
                        <p>Hotel Harris Kelapa Gading</p>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground italic">
                  Segera daftarkan diri Anda! Pindai kode QR yang tertera pada
                  pamflet untuk mengakses Link Pendaftaran.
                </p>
                <p className="text-sm font-medium text-foreground">
                  Mari bersama-sama memberdayakan masa depan teknik digital!
                  Kami tunggu kehadiran Anda! 🙌
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* ─── Event 2: Hazardous Waste Management Gathering ─── */}
          <motion.div
            data-ocid="events.gathering.card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            <Card className="border border-border shadow-md overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-accent via-primary/70 to-accent" />

              <CardHeader className="pb-3 pt-6">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge
                    variant="secondary"
                    className="text-xs uppercase tracking-widest"
                  >
                    Gathering
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    7 Desember 2024
                  </Badge>
                </div>
                <CardTitle className="text-xl md:text-2xl leading-snug">
                  Acara Gathering BEA Indonesia
                </CardTitle>
                <p className="font-bold text-primary uppercase tracking-wide text-sm mt-1">
                  HAZARDOUS WASTE MANAGEMENT BEST PRACTICES AND COMPLIANCE
                </p>
              </CardHeader>

              <CardContent className="space-y-4 pb-7">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Dalam upaya meningkatkan kesadaran dan pemahaman mengenai
                  pengelolaan limbah bahan berbahaya dan beracun (B3), BEA
                  Indonesia dengan bangga mempersembahkan acara gathering
                  bertema{" "}
                  <em>
                    "Hazardous Waste Management Best Practices and Compliance"
                  </em>{" "}
                  pada hari Sabtu, 7 Desember 2024. Acara ini berlangsung di
                  Artotel Gedung Serbaguna, Senayan, Jakarta, dengan dihadiri
                  oleh para profesional, praktisi, dan pemangku kepentingan di
                  bidang teknik dan pengelolaan limbah.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  BEA Indonesia adalah sebuah perkumpulan ahli perawatan
                  bangunan gedung yang terdiri dari para profesional yang
                  berpengalaman, termasuk Direktur Teknik, Manajer Gedung,
                  Kepala Teknik, serta para ahli di bidang teknik dari berbagai
                  sektor properti seperti pusat perbelanjaan, gedung
                  perkantoran, apartemen, rumah sakit, universitas, dan berbagai
                  tipe properti lainnya.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Acara ini diadakan untuk membahas praktik terbaik dalam
                  pengelolaan limbah B3 dan kepatuhan terhadap regulasi yang
                  berlaku. Peserta akan mendapatkan wawasan mendalam dari
                  berbagai narasumber yang berpengalaman di bidang pengelolaan
                  limbah.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Pada kesempatan gathering kali ini, tidak hanya ada berbagai
                  produk yang ditampilkan serta adanya sharing materi terkait
                  produk-produk terupdate. Adapula Edukasi yang diberikan oleh
                  narasumber ahli dari{" "}
                  <strong>Dinas Lingkungan Hidup Provinsi DKI Jakarta</strong>.
                  Pada sesi edukasi ini dibahas mengenai limbah B3, termasuk
                  regulasi terbaru, teknik pengelolaan yang aman, dan dampak
                  lingkungan dari limbah tersebut.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Sebagai bagian dari acara, BEA Indonesia memberikan
                  penghargaan kepada beberapa <strong>wanita inspiratif</strong>{" "}
                  yang berprofesi di dunia teknik. Penghargaan ini bertujuan
                  untuk mengakui kontribusi mereka dalam industri dan mendorong
                  lebih banyak perempuan untuk berkarir di bidang teknik.
                </p>

                {/* Read more link */}
                <div className="pt-1">
                  <a
                    data-ocid="events.klik_disini.link"
                    href="https://www.bea-indonesia.org/newbea/seminar-gathering-innovative-environmental-management-in-modern-building-operations/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
                  >
                    Untuk mengetahui materi lebih lanjut, silakan KLIK DI SINI
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>

                <Separator />

                <div className="text-sm text-muted-foreground">
                  <p className="font-semibold text-foreground">BEA Indonesia</p>
                  <p className="italic">
                    Mewujudkan Lingkungan yang Lebih Baik Melalui Pengelolaan
                    Limbah yang Bertanggung Jawab.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* ─── Event 3: CTA Section ─── */}
          <motion.div
            data-ocid="events.cta.section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            <Card className="border-2 border-accent/40 shadow-lg overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
              <div className="h-2 bg-gradient-to-r from-primary to-accent" />

              <CardHeader className="pb-3 pt-6">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge className="bg-accent text-accent-foreground text-xs uppercase tracking-widest">
                    Inovasi
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    December 7th, 2024
                  </Badge>
                </div>
                <CardTitle className="text-xl md:text-2xl leading-snug">
                  Innovative Environmental Management In Modern Building
                  Operations
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-5 pb-7">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Pengelolaan Lingkungan yang Inovatif dalam Operasi Bangunan
                  Modern. Di dunia saat ini, di mana keberlanjutan merupakan hal
                  yang sangat penting, lingkungan binaan memainkan peran yang
                  sangat penting. Bangunan modern dapat menjadi kontributor
                  signifikan terhadap permasalahan lingkungan seperti konsumsi
                  energi, emisi gas rumah kaca, dan timbulan limbah. Untuk
                  mengurangi dampak-dampak ini, praktik pengelolaan lingkungan
                  yang inovatif sangatlah penting.
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="font-bold tracking-widest uppercase"
                    data-ocid="events.join_now.button"
                  >
                    <a
                      href="https://www.bea-indonesia.org/newbea/seminar-gathering-innovative-environmental-management-in-modern-building-operations/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      JOIN NOW
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 text-primary" />
                    December 7th, 2024
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
