export default function Team() {
  return (
    <section id="tim" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <img 
              src="/assets/generated/team-engineers.dim_800x600.jpg" 
              alt="Tim Engineers" 
              className="rounded-lg shadow-2xl w-full"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Tim <span className="text-primary">Profesional Kami</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Tim LSPBEA Indonesia terdiri dari para profesional berpengalaman di bidang teknik bangunan, konstruksi, dan engineering yang telah tersertifikasi dan memiliki kompetensi tinggi.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-xl">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Asesor Bersertifikat</h3>
                  <p className="text-muted-foreground">Tim asesor yang telah memiliki lisensi dan sertifikasi dari BNSP</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-xl">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Tenaga Ahli Berpengalaman</h3>
                  <p className="text-muted-foreground">Didukung oleh tenaga ahli dengan pengalaman puluhan tahun di industri</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-xl">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Komitmen Profesional</h3>
                  <p className="text-muted-foreground">Berkomitmen memberikan layanan terbaik dengan integritas tinggi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
