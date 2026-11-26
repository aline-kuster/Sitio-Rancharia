import { useRef, useState } from "react";
import { accommodations } from "@/data/accommodations";
import { PhotoGalleryButton, PhotosIcon } from "@/features/photo-gallery/PhotoGalleryButton";
import { usePhotoGallery } from "@/features/photo-gallery/PhotoGalleryProvider";

const slides = accommodations.filter((space) => space.src);

export function getSlideOffset(index: number, active: number, count: number) {
  return ((index - active + count + Math.floor(count / 2)) % count) - Math.floor(count / 2);
}

export function AccommodationsSection() {
  const [active, setActive] = useState(0);
  const touchStart = useRef<number | null>(null);
  const lastSwipe = useRef(0);
  const openGallery = usePhotoGallery();
  const navigate = (direction: number) => setActive((current) => (current + direction + slides.length) % slides.length);

  return (
    <section className="section overflow-hidden" id="acomodacoes" aria-labelledby="structure-title">
      <div className="container">
        <div className="reveal max-w-2xl text-left">
          <p className="eyebrow">Nossa estrutura</p>
          <h2 id="structure-title">Conheça cada <em>cantinho</em></h2>
          <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Do descanso nos alojamentos ao mergulho na piscina: encontre o seu lugar favorito no sítio.
          </p>
        </div>
      </div>

      <div className="reveal relative mx-auto mt-4 max-w-[90rem]" role="region" aria-roledescription="carrossel"
        aria-label="Espaços e acomodações do sítio"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") { event.preventDefault(); navigate(-1); }
          if (event.key === "ArrowRight") { event.preventDefault(); navigate(1); }
        }}>
        <div className="relative h-[clamp(23rem,108vw,43rem)] overflow-hidden [perspective:1200px] sm:h-[clamp(22rem,44vw,35rem)]"
          style={{ touchAction: "pan-y" }}
          onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }}
          onTouchEnd={(event) => {
            if (touchStart.current === null) return;
            const distance = touchStart.current - event.changedTouches[0].clientX;
            touchStart.current = null;
            if (Math.abs(distance) > 45) {
              lastSwipe.current = Date.now();
              navigate(distance > 0 ? 1 : -1);
            }
          }} onTouchCancel={() => { touchStart.current = null; }}>
          {slides.map((space, index) => {
            const offset = getSlideOffset(index, active, slides.length);
            const distance = Math.abs(offset);
            const isActive = offset === 0;
            return (
              <button type="button" key={space.title} tabIndex={isActive ? 0 : -1}
                aria-label={isActive ? `Ampliar foto: ${space.title}` : `Mostrar ${space.title}`}
                aria-haspopup={isActive ? "dialog" : undefined}
                className="absolute top-1/2 left-1/2 aspect-[4/5] w-[76%] max-w-[640px] cursor-pointer overflow-hidden rounded-2xl border border-white/20 bg-[#162019] text-left shadow-xl outline-offset-4 motion-safe:transition-[transform,filter,opacity] motion-safe:duration-500 motion-safe:ease-out sm:aspect-[16/11] sm:w-[62%] sm:rounded-3xl"
                style={{
                  zIndex: slides.length - distance,
                  transform: `translate(-50%, -50%) translateX(${offset * 48}%) scale(${1 - distance * 0.16}) rotateY(${-offset * 9}deg)`,
                  filter: `brightness(${isActive ? 1 : 0.62 - distance * 0.06})`,
                }}
                onClick={() => {
                  if (Date.now() - lastSwipe.current < 400) return;
                  if (isActive) openGallery(space.src);
                  else setActive(index);
                }}>
                <img src={space.src} alt={space.alt} loading="lazy" decoding="async" draggable={false}
                  className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-8">
                  <p className="mb-2 text-[0.65rem] font-medium tracking-[0.18em] text-white/75 uppercase sm:text-xs">
                    {space.category === "lodging" ? "Para descansar" : "Para aproveitar"}
                  </p>
                  <h3 className="font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">{space.title}</h3>
                  {isActive && <p className="mt-2 max-w-md text-sm leading-relaxed text-white/85 sm:text-base">{space.description}</p>}
                  {space.category === "lodging" && space.capacity !== undefined && (
                    <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-xs font-medium text-white sm:text-sm">
                      <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="9" cy="7" r="3" />
                        <path d="M3 21v-2a6 6 0 0 1 12 0v2 M16 4a3 3 0 0 1 0 6 M21 21v-2a6 6 0 0 0-4-5.65" />
                      </svg>
                      Até {space.capacity} {space.capacity === 1 ? "pessoa" : "pessoas"}
                    </p>
                  )}
                </div>
                {isActive && <span className="absolute top-4 right-4 grid size-10 place-items-center rounded-full border border-white/25 bg-black/25 text-white backdrop-blur-sm"><PhotosIcon /></span>}
              </button>
            );
          })}
        </div>

        <div className="container relative flex items-center justify-center gap-5 pt-2 sm:gap-8">
          <button type="button" onClick={() => navigate(-1)} aria-label="Espaço anterior"
            className="grid size-11 cursor-pointer place-items-center rounded-full border border-border text-2xl text-foreground transition-colors hover:bg-primary hover:text-white">
            <span aria-hidden="true">‹</span>
          </button>
          <div className="flex items-center gap-1" aria-label="Escolher espaço">
            {slides.map((space, index) => (
              <button key={space.title} type="button" onClick={() => setActive(index)}
                aria-label={`Mostrar ${space.title}`} aria-current={active === index ? "true" : undefined}
                className="grid h-11 w-7 cursor-pointer place-items-center">
                <span className={`h-2 rounded-full motion-safe:transition-all ${active === index ? "w-6 bg-primary" : "w-2 bg-foreground/20"}`} />
              </button>
            ))}
          </div>
          <button type="button" onClick={() => navigate(1)} aria-label="Próximo espaço"
            className="grid size-11 cursor-pointer place-items-center rounded-full border border-border text-2xl text-foreground transition-colors hover:bg-primary hover:text-white">
            <span aria-hidden="true">›</span>
          </button>
        </div>
        <p className="sr-only" aria-live="polite">{slides[active].title}, espaço {active + 1} de {slides.length}</p>
      </div>

      <div className="container">
        <div className="reveal mt-8 flex flex-col items-center gap-7 text-center sm:mt-10">
          <PhotoGalleryButton className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-3 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-white">
            <PhotosIcon /> Ver mais fotos
          </PhotoGalleryButton>
        </div>
      </div>
    </section>
  );
}
