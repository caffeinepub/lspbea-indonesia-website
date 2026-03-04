import Footer from "../components/Footer";
import Header from "../components/Header";
import Services from "../components/Services";

export default function LayananPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <Services />
      </main>
      <Footer />
    </div>
  );
}
