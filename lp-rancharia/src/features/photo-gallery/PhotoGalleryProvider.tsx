import { createContext, useContext, useState, type ReactNode } from "react";
import { PhotoGalleryModal } from "./PhotoGalleryModal";

const GalleryContext = createContext<((src?: string) => void) | null>(null);

export function usePhotoGallery() {
  const open = useContext(GalleryContext);
  if (!open) throw new Error("A galeria precisa de PhotoGalleryProvider.");
  return open;
}

export function PhotoGalleryProvider({ children }: { children: ReactNode }) {
  const [selection, setSelection] = useState<{ src?: string } | null>(null);
  return (
    <GalleryContext.Provider value={(src) => setSelection({ src })}>
      {children}
      {selection && <PhotoGalleryModal initialSrc={selection.src} onClose={() => setSelection(null)} />}
    </GalleryContext.Provider>
  );
}
