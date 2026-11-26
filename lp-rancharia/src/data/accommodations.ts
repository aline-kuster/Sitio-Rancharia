import estruturaAlojamento from "@/assets/images/estrutura-alojamento.webp";
import estruturaAlojamentoSecundario from "@/assets/images/estrutura-alojamento-secundario.webp";
import estruturaGalpao from "@/assets/images/estrutura-galpao.webp";
import estruturaPiscina from "@/assets/images/estrutura-piscina.webp";
import estruturaVaranda from "@/assets/images/estrutura-varanda.webp";

export interface Accommodation {
  title: string;
  category: "lodging" | "leisure";
  description: string;
  capacity?: number;
  src?: string;
  alt: string;
}

export const accommodations: Accommodation[] = [
  {
    title: "Alojamento Principal",
    category: "lodging",
    capacity: 40,
    description: "Quartos suíte e com beliches para famílias e grupos.",
    src: estruturaAlojamento,
    alt: "Prédio do alojamento principal, em tijolo e madeira"
  },
  {
    title: "Alojamento Secundário",
    category: "lodging",
    capacity: 50,
    description: "Mais quartos para acomodar grupos maiores.",
    src: estruturaAlojamentoSecundario,
    alt: "Alojamento secundário, casa verde de dois andares entre palmeiras e árvores"
  },
  {
    title: "Área de Convivência",
    category: "leisure",
    description: "Galpão com mesas rústicas para reunir todo mundo.",
    src: estruturaGalpao,
    alt: "Galpão coberto com mesas e bancos rústicos de madeira"
  },
  {
    title: "Área da Piscina",
    category: "leisure",
    description: "Piscina e piscina infantil com vista para o lago.",
    src: estruturaPiscina,
    alt: "Piscina com piscina infantil ao lado"
  },
  {
    title: "Área de Churrasco",
    category: "leisure",
    description: "Espaço para reunir todo mundo ao redor da brasa.",
    alt: "Foto da área de churrasco em breve"
  },
  {
    title: "Área das Crianças",
    category: "leisure",
    description: "Espaço para a criançada brincar à vontade.",
    alt: "Foto da área das crianças em breve"
  },
  {
    title: "Varanda",
    category: "leisure",
    description: "Vista para a piscina, o açude e as montanhas.",
    src: estruturaVaranda,
    alt: "Vista da varanda para a piscina e o açude"
  },
  {
    title: "Casa da Árvore",
    category: "leisure",
    description: "Diversão no alto, entre as árvores.",
    alt: "Foto da casa da árvore em breve"
  }
];
