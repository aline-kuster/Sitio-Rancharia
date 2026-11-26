import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { galleryPhotos } from "./photos";

export function PhotoGalleryModal({ initialSrc, onClose }: { initialSrc?: string; onClose: () => void }) {
  const [index, setIndex] = useState(() => Math.max(0, galleryPhotos.findIndex((photo) => photo.src === initialSrc)));
  const dialogRef = useRef<HTMLDialogElement>(null);
  const thumbnailRef = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<number | null>(null);
  const photo = galleryPhotos[index];
  const dotStart = Math.max(0, Math.min(index - 3, galleryPhotos.length - 7));
  const navigate = (direction: number) => setIndex((current) => (current + direction + galleryPhotos.length) % galleryPhotos.length);

  useEffect(() => {
    const dialog = dialogRef.current!;
    const trigger = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      trigger?.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    thumbnailRef.current?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "instant" });
  }, [index]);

  return createPortal(
    <dialog ref={dialogRef} aria-labelledby="photo-gallery-title" aria-describedby="photo-gallery-caption"
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-hidden border-0 bg-transparent px-3 pt-16 pb-4 text-white outline-none open:grid open:grid-rows-[minmax(0,1fr)_auto] open:gap-4 backdrop:bg-black sm:px-20 sm:pt-20 sm:pb-6 sm:open:gap-6"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") { event.preventDefault(); navigate(-1); }
        if (event.key === "ArrowRight") { event.preventDefault(); navigate(1); }
      }}>
      <h2 id="photo-gallery-title" className="sr-only">Fotos do Sítio Vale Rancharia</h2>
      <button type="button" autoFocus onClick={onClose} aria-label="Fechar fotos"
        className="absolute top-3 right-3 z-20 grid size-11 cursor-pointer place-items-center rounded-full border border-white/60 text-white/80 transition-colors hover:border-white hover:text-white focus-visible:outline-white sm:top-6 sm:right-6 sm:size-12">
        <svg className="size-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" aria-hidden="true">
          <path d="m5 5 14 14 M5 19 19 5" />
        </svg>
      </button>

      <div className="relative grid min-h-0 min-w-0 place-items-center [container-type:size]"
        onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
        style={{ touchAction: "pan-y" }}
        onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }}
        onTouchEnd={(event) => {
          if (touchStart.current === null) return;
          const distance = touchStart.current - event.changedTouches[0].clientX;
          touchStart.current = null;
          if (Math.abs(distance) > 45) navigate(distance > 0 ? 1 : -1);
        }} onTouchCancel={() => { touchStart.current = null; }}>
        <figure className="relative m-0 max-w-full">
          <picture>
            {photo.reducedMotionSrc && <source media="(prefers-reduced-motion: reduce)" srcSet={photo.reducedMotionSrc} />}
            <img key={photo.src} src={photo.src} srcSet={photo.srcSet} sizes="(max-width: 768px) 96vw, 1200px"
              alt={photo.alt} draggable={false} decoding="async"
              className="mx-auto block h-auto max-h-[100cqh] w-auto max-w-[100cqw] object-contain" />
          </picture>
          <figcaption id="photo-gallery-caption" aria-live="polite" aria-atomic="true"
            className="absolute inset-x-0 bottom-0 bg-black/45 px-4 py-3 text-center text-xs leading-relaxed text-white/90 sm:py-4 sm:text-sm">
            <span className="text-white/65">{index + 1} / {galleryPhotos.length}</span>
            <span className="mx-2 text-white/40" aria-hidden="true">·</span>
            {photo.caption || photo.alt}
          </figcaption>
        </figure>
      </div>

      {[-1, 1].map((direction) => (
        <button key={direction} type="button" onClick={() => navigate(direction)}
          aria-label={direction < 0 ? "Foto anterior" : "Próxima foto"}
          className={`absolute top-[44%] z-10 grid h-14 w-11 -translate-y-1/2 cursor-pointer place-items-center text-white/70 transition-colors hover:text-white focus-visible:outline-white sm:h-20 sm:w-16 ${direction < 0 ? "left-0 sm:left-2" : "right-0 sm:right-2"}`}>
          <svg className="h-9 w-6 drop-shadow-md sm:h-12 sm:w-8" viewBox="0 0 24 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d={direction < 0 ? "m19 4-14 16 14 16" : "m5 4 14 16-14 16"} />
          </svg>
        </button>
      ))}

      <div className="flex min-w-0 flex-col items-center gap-3 sm:gap-4">
        <div className="flex items-center justify-center" aria-label="Escolher foto pelos indicadores">
          {galleryPhotos.slice(dotStart, dotStart + 7).map((item, dotIndex) => {
            const photoIndex = dotStart + dotIndex;
            return (
              <button type="button" key={item.src} onClick={() => setIndex(photoIndex)}
                aria-label={`Ver foto ${photoIndex + 1}`} aria-current={index === photoIndex ? "true" : undefined}
                className="grid size-7 cursor-pointer place-items-center focus-visible:outline-white">
                <span className={`size-2 rounded-full transition-colors ${index === photoIndex ? "bg-white" : "bg-white/35 hover:bg-white/65"}`} />
              </button>
            );
          })}
        </div>
        <div className="flex max-w-full gap-2 overflow-x-auto px-1 pt-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:max-w-md [@media(max-height:600px)]:hidden"
          aria-label="Escolher foto pelas miniaturas">
          {galleryPhotos.map((item, itemIndex) => (
            <button key={item.src} ref={itemIndex === index ? thumbnailRef : undefined} type="button"
              aria-label={`Ver foto ${itemIndex + 1}: ${item.caption || item.alt}`} aria-current={itemIndex === index ? "true" : undefined}
              onClick={() => setIndex(itemIndex)}
              className={`h-14 w-20 shrink-0 cursor-pointer overflow-hidden outline-offset-2 transition-opacity focus-visible:outline-white sm:h-16 sm:w-24 ${itemIndex === index ? "opacity-100 ring-1 ring-white/70 ring-offset-2 ring-offset-transparent" : "opacity-45 hover:opacity-80"}`}>
              <picture>
                {item.reducedMotionSrc && <source media="(prefers-reduced-motion: reduce)" srcSet={item.reducedMotionSrc} />}
                <img src={item.src} alt="" loading="lazy" className="h-full w-full object-cover" />
              </picture>
            </button>
          ))}
        </div>
      </div>
    </dialog>, document.body,
  );
}
