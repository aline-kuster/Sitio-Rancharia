import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";

export function ReservationButton() {
  return (
    <Button
      asChild
      className="h-11 rounded-full px-5 text-sm font-semibold shadow-[0_10px_30px_-12px_rgba(154,75,38,0.8)] hover:bg-[#803d1d]"
    >
      <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">
        Fale no WhatsApp
      </a>
    </Button>
  );
}
