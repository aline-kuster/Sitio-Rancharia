import { accommodations } from "@/data/accommodations";
import galeriaPonteSobreAgua from "@/assets/images/galeria-ponte-sobre-agua.webp";
import galeriaPontePalmeiras from "@/assets/images/galeria-ponte-palmeiras.webp";
import galeriaBalanco from "@/assets/images/galeria-balanco.webp";
import galeriaBalancoParado from "@/assets/images/galeria-balanco-parado.webp";
import galeriaPierBarcos from "@/assets/images/galeria-pier-barcos.webp";
import galeriaAcudePalmeiras from "@/assets/images/galeria-acude-palmeiras.webp";
import galeriaCasaMadeira from "@/assets/images/galeria-casa-madeira.webp";
import galeriaChale from "@/assets/images/galeria-chale.webp";
import galeriaQuiosques from "@/assets/images/galeria-quiosques.webp";
import galeriaDeckAcude from "@/assets/images/galeria-deck-acude.webp";
import galeriaQuiosqueAcude from "@/assets/images/galeria-quiosque-acude.webp";
import galeriaDeckTirolesa from "@/assets/images/galeria-deck-tirolesa.webp";
import galeriaPiscina from "@/assets/images/galeria-piscina.webp";
import galeriaAcudeBalancos from "@/assets/images/galeria-acude-balancos.webp";
import galeriaGalpao from "@/assets/images/galeria-galpao.webp";
import galeriaBoiasAcude from "@/assets/images/galeria-boias-acude.webp";
import galeriaReflexoAmanhecer from "@/assets/images/galeria-reflexo-amanhecer.webp";
import galeriaMesasRusticas from "@/assets/images/galeria-mesas-rusticas.webp";
import galeriaDeckMirante from "@/assets/images/galeria-deck-mirante.webp";
import galeriaPesca from "@/assets/images/galeria-pesca.webp";
import galeriaManha from "@/assets/images/galeria-manha.webp";
import galeriaPonteSobreAgua800 from "@/assets/images/galeria-ponte-sobre-agua-800.webp";

export interface GalleryPhoto {
  src: string;
  alt: string;
  caption: string;
  srcSet?: string;
  sizes?: string;
  reducedMotionSrc?: string;
}

const sitePhotos = [
  {
    src: galeriaPonteSobreAgua,
    alt: "Ponte de madeira sobre o açude, com palmeiras, casas e mata ao fundo",
    caption: "Ponte sobre a água",
    srcSet: `${galeriaPonteSobreAgua800} 800w, ${galeriaPonteSobreAgua} 1000w`,
    sizes: "(max-width: 700px) 100vw, 50vw"
  },
  {
    src: galeriaPontePalmeiras,
    alt: "Ponte de madeira sobre o açude entre palmeiras",
    caption: "Ponte entre palmeiras",
  },
  {
    src: galeriaBalanco,
    alt: "Balanço de corda sobre o açude",
    caption: "Balanço de corda",
    reducedMotionSrc: galeriaBalancoParado
  },
  {
    src: galeriaPierBarcos,
    alt: "Barcos atracados no píer",
    caption: "Píer e barcos",
  },
  {
    src: galeriaAcudePalmeiras,
    alt: "Açude com palmeiras, barcos e ponte de madeira sob céu azul",
    caption: "Vista do alojamento secundário",
  },
  {
    src: galeriaCasaMadeira,
    alt: "Casa de madeira e tijolo com varanda",
    caption: "Alojamento principal",
  },
  {
    src: galeriaChale,
    alt: "Chalé entre palmeiras e árvores",
    caption: "Alojamento secundário",
  },
  {
    src: galeriaQuiosques,
    alt: "Área dos quiosques com montanhas ao fundo",
    caption: "",
  },
  {
    src: galeriaDeckAcude,
    alt: "Deck de madeira",
    caption: "Deck perto da piscina",
  },
  {
    src: galeriaQuiosqueAcude,
    alt: "Quiosque elevado e píer à beira do açude",
    caption: "Quiosque à beira da represa",
  },
  {
    src: galeriaDeckTirolesa,
    alt: "Deck de madeira à beira do açude com o vale ao fundo",
    caption: "Caminho para a represa",
  },
  {
    src: galeriaPiscina,
    alt: "Piscina com deck de madeira",
    caption: "Piscina",
  },
  {
    src: galeriaAcudeBalancos,
    alt: "Açude com balanços de corda, morros e céu azul",
    caption: "Tirolesa",
  },
  {
    src: galeriaGalpao,
    alt: "Galpão coberto com mesas e bancos rústicos de madeira",
    caption: "Galpão",
  },
  {
    src: galeriaBoiasAcude,
    alt: "Grupo de amigas boiando em câmaras de pneu no açude",
    caption: "Boia na represa",
  },
  {
    src: galeriaReflexoAmanhecer,
    alt: "Árvores refletidas no açude ao amanhecer, com névoa sobre a água",
    caption: "Amanhecer",
  },
  {
    src: galeriaMesasRusticas,
    alt: "Quiosques cobertos com mesas rústicas de madeira",
    caption: "Mesas rústicas",
  },
  {
    src: galeriaDeckMirante,
    alt: "Deck de madeira à beira do açude com montanhas ao fundo",
    caption: "Mirante",
  },
  {
    src: galeriaPesca,
    alt: "Pescador sorrindo segurando um tambaqui grande à beira do açude",
    caption: "Pesca",
  },
  {
    src: galeriaManha,
    alt: "Manhã ensolarada com jardim, caminho e açude ao fundo",
    caption: "Manhã no sítio",
  }
] satisfies GalleryPhoto[];

export const galleryPhotos: GalleryPhoto[] = [
  ...accommodations.filter((space) => space.src).map((space) => ({
    src: space.src!, alt: space.alt, caption: space.title,
  })),
  ...sitePhotos,
];
