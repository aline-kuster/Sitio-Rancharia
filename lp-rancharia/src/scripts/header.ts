/** Header fixo: fica sólido (fundo creme com desfoque) depois que a página rola um pouco. */
export function initHeader() {
  const header = document.getElementById("site-header");
  if (!header) return;

  const atualizar = () => header.classList.toggle("is-scrolled", window.scrollY > 24);

  atualizar();
  window.addEventListener("scroll", atualizar, { passive: true });
}
