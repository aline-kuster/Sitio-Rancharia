import { useEffect, type RefObject } from "react";

export function useReveal(scope: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = scope.current;
    if (!container || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

    container.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    container.classList.add("reveal-enabled");
    return () => {
      observer.disconnect();
      container.classList.remove("reveal-enabled");
    };
  }, [scope]);
}
