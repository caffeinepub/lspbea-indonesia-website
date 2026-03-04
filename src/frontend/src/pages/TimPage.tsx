import Footer from "../components/Footer";
import Header from "../components/Header";
import Team from "../components/Team";

export default function TimPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <Team />
      </main>
      <Footer />
    </div>
  );
}
