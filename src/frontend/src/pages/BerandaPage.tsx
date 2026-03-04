import EventsSection from "../components/EventsSection";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";

export default function BerandaPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <EventsSection />
      </main>
      <Footer />
    </div>
  );
}
