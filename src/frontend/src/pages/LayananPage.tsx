import CertificationForm from "../components/CertificationForm";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function LayananPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <CertificationForm />
      </main>
      <Footer />
    </div>
  );
}
