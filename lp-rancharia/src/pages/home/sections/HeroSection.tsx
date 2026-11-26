import heroMorning from "@/assets/images/hero-manha-natural.webp";
import heroMorningMobile from "@/assets/images/hero-manha-natural-720.webp";
import { PhotoGalleryButton, PhotosIcon } from "@/features/photo-gallery/PhotoGalleryButton";

export function HeroSection() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <img className="hero-img" src={heroMorning}
        srcSet={`${heroMorningMobile} 720w, ${heroMorning} 1254w`} sizes="100vw" width="1254" height="1254"
        alt="Luz da manhã sobre o jardim, o caminho e o açude do Sítio Vale Rancharia"
        fetchPriority="high" decoding="async" />
      <div className="hero-atmosphere" aria-hidden="true">
        <div className="hero-light" />
        <div className="hero-mist" />
        <div className="hero-dust"><span /><span /><span /><span /><span /><span /></div>
      </div>
      <div className="container hero-content">
        <h1 id="hero-title">Sítio Vale <em>Rancharia</em></h1>
        <p className="lead">Natureza, descanso e diversão em um espaço só para o seu grupo.</p>
        <div className="hero-actions">
          <PhotoGalleryButton className="btn btn-ghost">
            <PhotosIcon /> Ver fotos
          </PhotoGalleryButton>
        </div>
      </div>
      <a className="hero-discover" href="#about">
        Conheça o sítio
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 4v16 m-5-5 5 5 5-5" />
        </svg>
      </a>
    </section>
  );
}
