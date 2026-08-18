function duplicarSlidesCarrossel(id: string) {
  const track = document.getElementById(id);
  if (!track) return;

  const slidesOriginais = track.innerHTML;
  track.innerHTML = slidesOriginais + slidesOriginais;
}

duplicarSlidesCarrossel("carrossel-track-1");

const navToggle = document.getElementById("nav-toggle");
const mainNav = document.getElementById("main-nav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });
}

function iniciarSliderAcomodacoes() {
  const track = document.getElementById("acomodacoes-track");
  const btnAnterior = document.getElementById("seta-anterior");
  const btnProximo = document.getElementById("seta-proximo");

  if (!track || !btnAnterior || !btnProximo) return;

  const totalCards = track.children.length;
  let indiceAtual = 0;

  function atualizarPosicao() {
    track!.style.transform = `translateX(-${indiceAtual * 100}%)`;
  }

  btnProximo.addEventListener("click", () => {
    indiceAtual = (indiceAtual + 1) % totalCards;
    atualizarPosicao();
  });

  btnAnterior.addEventListener("click", () => {
    indiceAtual = (indiceAtual - 1 + totalCards) % totalCards;
    atualizarPosicao();
  });
}

iniciarSliderAcomodacoes();
