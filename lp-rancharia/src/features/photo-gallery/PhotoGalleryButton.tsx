import type { ReactNode } from "react";
import { usePhotoGallery } from "./PhotoGalleryProvider";

export function PhotosIcon() {
  return (
    <svg className="size-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="6" y="3" width="15" height="15" rx="3" />
      <path d="M3 8v11a2 2 0 0 0 2 2h11 M7 14l4-4 3 3 2-2 4 4" />
      <circle cx="16.5" cy="7.5" r="1" />
    </svg>
  );
}

export function PhotoGalleryButton({ children, className, onClick }: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const openGallery = usePhotoGallery();
  return (
    <button type="button" className={className} aria-haspopup="dialog" onClick={() => {
      onClick?.();
      openGallery();
    }}>{children}</button>
  );
}
