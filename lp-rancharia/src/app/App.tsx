import { PhotoGalleryProvider } from "@/features/photo-gallery/PhotoGalleryProvider";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { HomePage } from "@/pages/home/HomePage";

export function App() {
  return (
    <PhotoGalleryProvider>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <HomePage />
      <Footer />
    </PhotoGalleryProvider>
  );
}
