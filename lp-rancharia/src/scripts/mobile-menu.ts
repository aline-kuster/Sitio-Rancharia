/** Menu do celular: abre/fecha pelo botão, fecha ao clicar num link ou com a tecla Esc. */
export function initMobileMenu() {
  const header = document.getElementById("site-header");
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("main-nav");
  if (!header || !toggle || !nav) return;

  const estaAberto = () => toggle.getAttribute("aria-expanded") === "true";

  function definirMenu(aberto: boolean) {
    header!.classList.toggle("menu-open", aberto);
    toggle!.setAttribute("aria-expanded", String(aberto));
    toggle!.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  }

  toggle.addEventListener("click", () => definirMenu(!estaAberto()));

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => definirMenu(false));
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && estaAberto()) {
      definirMenu(false);
      toggle.focus();
    }
  });
}
