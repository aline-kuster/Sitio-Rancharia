import { PhotoGalleryButton } from "@/features/photo-gallery/PhotoGalleryButton";
import { navigation, siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#home" className="brand">
              <span>Sítio Vale Rancharia</span>
            </a>
            <p>Um refúgio de tranquilidade, natureza e experiências inesquecíveis.</p>
          </div>

          <div>
            <h3>Navegação</h3>
            <ul>
              <li><a href="#home">Início</a></li>
              {navigation.filter(({ href }) => href !== "#address").map(({ href, label }) => (
                <li key={href}>{href === "#photos" ? (
                  <PhotoGalleryButton className="cursor-pointer transition-colors hover:text-white">{label}</PhotoGalleryButton>
                ) : <a href={href}>{label}</a>}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Contato</h3>
            <ul className="contact-list">
              <li>
                <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round" aria-hidden="true">
                    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                    <path strokeWidth="4.5" transform="translate(7.3 6.8) scale(0.4)"
                      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round" aria-hidden="true">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  Instagram
                </a>
              </li>
              <li>
                <a href="#address">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round" aria-hidden="true">
                    <path
                      d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Como chegar
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Sítio Vale Rancharia</span>
          <span className="credit">
            Desenvolvido por{" "}
            <a
            className="inline-block no-underline transition-transform duration-200 hover:-translate-y-1" 
            href="https://wemado.com" target="_blank" rel="noopener noreferrer">wemado.com
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
