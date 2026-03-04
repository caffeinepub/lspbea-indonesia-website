import Contact from "../components/Contact";
import FileUpload from "../components/FileUpload";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function KontakPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <Contact />
        <FileUpload />
      </main>
      <Footer />
    </div>
  );
}
