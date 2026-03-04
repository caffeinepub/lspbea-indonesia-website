import About from "../components/About";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function TentangPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <About />
      </main>
      <Footer />
    </div>
  );
}
