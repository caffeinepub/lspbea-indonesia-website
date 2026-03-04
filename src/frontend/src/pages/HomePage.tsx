import About from "../components/About";
import Contact from "../components/Contact";
import FileUpload from "../components/FileUpload";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Team from "../components/Team";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Team />
        <Contact />
        <FileUpload />
      </main>
      <Footer />
    </div>
  );
}
