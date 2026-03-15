import heroImg from "@/assets/hero-itarare.jpg";
import cachoeiraImg from "@/assets/cachoeira.jpg";
import miranteImg from "@/assets/mirante.jpg";
import trilhaImg from "@/assets/trilha.jpg";
import pracaImg from "@/assets/praca.jpg";
import eventoGastronomiaImg from "@/assets/evento-gastronomia.jpg";
import eventoCulturalImg from "@/assets/evento-cultural.jpg";

export interface TouristSpot {
  id: string;
  name: string;
  description: string;
  image: string;
  type: "trilha" | "mirante" | "cachoeira" | "praça" | "museu" | "centro-histórico";
  difficulty: "Fácil" | "Moderado" | "Difícil";
  duration: string;
  visitType: "Autoguiável" | "Guia recomendado" | "Guia obrigatório";
  tags: string[];
  lat: number;
  lng: number;
  season: string;
  guideContact?: string;
}

export interface FeedItem {
  id: string;
  title: string;
  description: string;
  fullContent: string;
  image: string;
  category: "evento" | "aviso" | "notícia";
  date: string;
  featured: boolean;
  location?: string;
  time?: string;
  contact?: string;
}

export interface Commerce {
  id: string;
  name: string;
  type: string;
  lat: number;
  lng: number;
  phone?: string;
  sponsored: boolean;
}

export const touristSpots: TouristSpot[] = [
  {
    id: "1",
    name: "Cachoeira do Saltão",
    description: "Uma das mais belas cachoeiras da região, com queda de 40 metros em meio à Mata Atlântica. Piscina natural perfeita para banho nos dias quentes.",
    image: cachoeiraImg,
    type: "cachoeira",
    difficulty: "Moderado",
    duration: "3-4 horas",
    visitType: "Guia recomendado",
    tags: ["Pet Friendly", "Ideal para verão", "Banho natural"],
    lat: -23.98,
    lng: -49.38,
    season: "Outubro a Março",
    guideContact: "(15) 99999-1234",
  },
  {
    id: "2",
    name: "Mirante da Serra",
    description: "Vista panorâmica de 360° da cidade e do vale. Pôr do sol espetacular. Acesso por trilha curta de 800m.",
    image: miranteImg,
    type: "mirante",
    difficulty: "Fácil",
    duration: "1-2 horas",
    visitType: "Autoguiável",
    tags: ["Mirante", "Vista da cidade", "Passeio rápido", "Ideal para famílias"],
    lat: -23.975,
    lng: -49.345,
    season: "Ano todo",
  },
  {
    id: "3",
    name: "Trilha do Rio Verde",
    description: "Trilha de 6km margeando o rio, com pontos de banho e vegetação nativa preservada. Ideal para caminhadas longas.",
    image: trilhaImg,
    type: "trilha",
    difficulty: "Difícil",
    duration: "5-6 horas",
    visitType: "Guia obrigatório",
    tags: ["Trilha difícil", "Passeio de dia inteiro", "Bom para experientes"],
    lat: -23.99,
    lng: -49.36,
    season: "Abril a Setembro",
    guideContact: "(15) 99999-5678",
  },
  {
    id: "4",
    name: "Praça Central de Itararé",
    description: "Centro histórico com igreja colonial do século XIX, coreto restaurado e feira de artesanato aos domingos.",
    image: pracaImg,
    type: "praça",
    difficulty: "Fácil",
    duration: "1 hora",
    visitType: "Autoguiável",
    tags: ["Ideal para famílias", "Acessível", "Centro histórico", "Passeio rápido"],
    lat: -23.9814,
    lng: -49.3453,
    season: "Ano todo",
  },
];

export const feedItems: FeedItem[] = [
  {
    id: "f1",
    title: "Festival Gastronômico de Inverno",
    description: "De 20 a 22 de julho, a praça central recebe o Festival Gastronômico com pratos típicos da região, música ao vivo e artesanato local.",
    fullContent: "O Festival Gastronômico de Inverno de Itararé chega à sua 5ª edição! De 20 a 22 de julho, a Praça Central será transformada em um grande polo gastronômico ao ar livre.\n\nSerão mais de 20 barracas com pratos típicos da culinária regional, incluindo:\n• Leitão à pururuca\n• Pamonha e curau\n• Fondue de queijo artesanal\n• Caldos e sopas especiais de inverno\n• Doces coloniais\n\nAlém da gastronomia, o festival contará com shows de música regional ao vivo todas as noites, feira de artesanato local e espaço kids.\n\nEntrada gratuita. Estacionamento disponível na Rua XV de Novembro.",
    image: eventoGastronomiaImg,
    category: "evento",
    date: "20-22 Jul",
    featured: true,
    location: "Praça Central de Itararé",
    time: "18h às 23h",
    contact: "(15) 3532-1000",
  },
  {
    id: "f2",
    title: "Festa de São João",
    description: "Tradicional festa junina com quadrilha, comidas típicas e fogueira na praça do bairro Alto. Entrada gratuita.",
    fullContent: "A tradicional Festa de São João de Itararé acontece no dia 24 de junho na Praça do Bairro Alto.\n\nProgramação:\n• 17h - Abertura com banda de forró\n• 18h - Apresentação de quadrilhas das escolas municipais\n• 19h - Concurso de melhor vestido caipira\n• 20h - Acendimento da fogueira\n• 21h - Show principal com Trio Pajeú\n\nBarracas com comidas típicas: quentão, vinho quente, pipoca, canjica, pé-de-moleque, bolo de fubá e muito mais.\n\nBrincadeiras para crianças: pescaria, correio elegante e pau de sebo.\n\nEntrada gratuita para toda a família!",
    image: eventoCulturalImg,
    category: "evento",
    date: "24 Jun",
    featured: true,
    location: "Praça do Bairro Alto",
    time: "17h às 23h",
  },
  {
    id: "f3",
    title: "Trilha do Rio Verde fechada para manutenção",
    description: "A Trilha do Rio Verde estará fechada de 15 a 20 de março para manutenção da ponte e sinalização. Previsão de reabertura no dia 21.",
    fullContent: "A Secretaria de Turismo informa que a Trilha do Rio Verde estará interditada para visitação no período de 15 a 20 de março de 2026.\n\nMotivo: Obras de manutenção preventiva incluindo:\n• Reparo da ponte sobre o Rio Verde (km 2,5)\n• Substituição de placas de sinalização danificadas\n• Limpeza e desobstrução do percurso\n• Instalação de novas lixeiras ecológicas\n\nPrevisão de reabertura: 21 de março (sábado).\n\nDurante o período de interdição, recomendamos as seguintes alternativas:\n• Mirante da Serra (acesso livre)\n• Cachoeira do Saltão (com guia)\n• Praça Central e Centro Histórico\n\nPara mais informações, entre em contato com a Secretaria de Turismo.",
    image: trilhaImg,
    category: "aviso",
    date: "15-20 Mar",
    featured: false,
    contact: "(15) 3532-2000",
  },
  {
    id: "f4",
    title: "Novo mirante inaugurado na Serra",
    description: "A prefeitura inaugurou um novo deck de observação no Mirante da Serra, com capacidade para 30 pessoas e acessibilidade para cadeirantes.",
    fullContent: "A Prefeitura de Itararé inaugurou nesta segunda-feira (10) o novo deck de observação no Mirante da Serra, ampliando a infraestrutura turística do município.\n\nO novo espaço conta com:\n• Deck de madeira tratada com capacidade para 30 pessoas\n• Rampa de acessibilidade para cadeirantes\n• Guarda-corpo de segurança em aço inox\n• 2 binóculos panorâmicos gratuitos\n• Placas informativas sobre a paisagem e a fauna local\n• Bancos de descanso com sombra\n\nO investimento foi de R$ 180 mil, com recursos do Fundo Municipal de Turismo.\n\n\"Este é mais um passo para consolidar Itararé como destino de ecoturismo no sul de São Paulo\", afirmou o prefeito durante a inauguração.\n\nO Mirante da Serra está aberto todos os dias das 6h às 18h. O acesso é feito por trilha de 800 metros com dificuldade fácil.",
    image: miranteImg,
    category: "notícia",
    date: "10 Mar",
    featured: false,
    location: "Mirante da Serra",
  },
];

export const commercePoints: Commerce[] = [
  { id: "c1", name: "Restaurante Sabor da Serra", type: "Restaurante", lat: -23.982, lng: -49.344, phone: "(15) 3532-1234", sponsored: true },
  { id: "c2", name: "Pousada Recanto Verde", type: "Hospedagem", lat: -23.979, lng: -49.348, phone: "(15) 3532-5678", sponsored: false },
  { id: "c3", name: "Café Colonial da Praça", type: "Café", lat: -23.9812, lng: -49.3448, phone: "(15) 3532-9012", sponsored: true },
  { id: "c4", name: "Farmácia Central", type: "Farmácia", lat: -23.9808, lng: -49.3460, phone: "(15) 3532-3456", sponsored: false },
  { id: "c5", name: "Mercado Municipal", type: "Mercado", lat: -23.983, lng: -49.343, phone: "(15) 3532-7890", sponsored: false },
  { id: "c6", name: "Veggie Bistrô", type: "Restaurante Vegano", lat: -23.9815, lng: -49.3440, phone: "(15) 3532-1111", sponsored: true },
];
