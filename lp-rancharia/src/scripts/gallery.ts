const SEGUNDOS_POR_PAGINA = 20;

export function initGallery() {
  const track = document.getElementById("gallery-track");
  const btnAnterior = document.getElementById("gallery-prev");
  const btnProximo = document.getElementById("gallery-next");
  if (!track) return;

  const paginas = Array.from(track.querySelectorAll<HTMLElement>(".gallery-page"));
  if (paginas.length === 0) return;

  paginas.forEach((pagina) => {
    const copia = pagina.cloneNode(true) as HTMLElement;
    copia.setAttribute("aria-hidden", "true");
    copia.setAttribute("inert", "");
    copia.dataset.clone = "";
    track.appendChild(copia);
  });
  const primeiraCopia = track.querySelector<HTMLElement>("[data-clone]")!;

  track.style.setProperty("--gallery-duration", `${paginas.length * SEGUNDOS_POR_PAGINA}s`);
  track.classList.add("is-looping");

  if (!btnAnterior || !btnProximo) return;

  let posicao = 0; // px que a faixa andou
  let manual = false;

  const larguraConjunto = () => primeiraCopia.offsetLeft;
  const passo = () => larguraConjunto() / paginas.length;

  function mover(px: number, animar = true) {
    if (!animar) track!.style.transition = "none";
    track!.style.transform = `translate3d(${-px}px, 0, 0)`;
    if (!animar) {
      void track!.offsetWidth; // aplica a posição na hora, sem animação
      track!.style.transition = "";
    }
  }

  function entrarNoModoManual() {
    if (manual) return;
    manual = true;
    // Congela exatamente onde o carrossel estava
    posicao = -new DOMMatrix(getComputedStyle(track!).transform).m41;
    track!.classList.remove("is-looping");
    track!.classList.add("is-manual");
    mover(posicao, false);
  }

  function irPara(direcao: 1 | -1) {
    entrarNoModoManual();
    const p = passo();
    const indiceAtual = posicao / p;
    // Vai para a próxima/anterior página inteira (se estiver no meio de uma, completa o caminho)
    let alvo = direcao > 0 ? Math.floor(indiceAtual + 1e-3) + 1 : Math.ceil(indiceAtual - 1e-3) - 1;

    if (alvo < 0) {
      // Antes da primeira: pula sem animar para a cópia e volta uma página
      posicao += larguraConjunto();
      mover(posicao, false);
      alvo += paginas.length;
    }
    posicao = alvo * p;
    mover(posicao);
  }

  // Depois de passar da última página, volta sem animar para a original equivalente
  track.addEventListener("transitionend", () => {
    const total = larguraConjunto();
    if (manual && posicao >= total - 1) {
      posicao -= total;
      mover(posicao, false);
    }
  });

  btnAnterior.addEventListener("click", () => irPara(-1));
  btnProximo.addEventListener("click", () => irPara(1));

  window.addEventListener("resize", () => {
    if (!manual) return;
    posicao = Math.round(posicao / passo()) * passo();
    mover(posicao, false);
  });
}
