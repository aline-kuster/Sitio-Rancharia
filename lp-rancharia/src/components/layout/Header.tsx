import { PhotoGalleryButton } from "@/features/photo-gallery/PhotoGalleryButton";
import { useEffect, useRef, useState } from "react";
import { ReservationButton } from "@/components/ReservationButton";
import { navigation } from "@/config/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const updateScroll = () => setIsScrolled(window.scrollY > 24);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsMenuOpen(false);
      toggleRef.current?.focus();
    };
    const desktop = window.matchMedia("(min-width: 861px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setIsMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [isMenuOpen]);

  return (
    <header className={cn("site-header", { "is-scrolled": isScrolled, "menu-open": isMenuOpen })}>
      <div className="container header-inner">
        <a href="#home" className="brand" aria-label="Sítio Vale Rancharia, início" onClick={() => setIsMenuOpen(false)}>
          <span className="brand-text">Sítio Vale Rancharia</span>
        </a>
        <nav className="nav" id="main-nav" aria-label="Principal">
          {navigation.map(({ href, label }) => (
            href === "#photos" ? (
              <PhotoGalleryButton key={href} onClick={() => setIsMenuOpen(false)}>{label}</PhotoGalleryButton>
            ) : <a key={href} href={href} onClick={() => setIsMenuOpen(false)}>{label}</a>
          ))}
        </nav>
        <div className="header-actions">
          <div className="reservation-slot"><ReservationButton /></div>
          <button ref={toggleRef} className="nav-toggle" type="button" aria-controls="main-nav"
            aria-expanded={isMenuOpen} aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setIsMenuOpen((open) => !open)}>
            <span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
