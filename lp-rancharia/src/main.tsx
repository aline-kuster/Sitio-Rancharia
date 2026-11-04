import { createRoot } from "react-dom/client";

import { ReservationButton } from "@/components/ReservationButton";
import { initGallery } from "@/scripts/gallery";
import { initHeader } from "@/scripts/header";
import { initMobileMenu } from "@/scripts/mobile-menu";
import { initReveal } from "@/scripts/reveal";
import "@/styles/global.css";

document.documentElement.classList.add("js");

initHeader();
initMobileMenu();
initGallery();
initReveal();

const reservationButtonRoot = document.getElementById("reservation-button-root");
if (reservationButtonRoot) {
  createRoot(reservationButtonRoot).render(<ReservationButton />);
}
