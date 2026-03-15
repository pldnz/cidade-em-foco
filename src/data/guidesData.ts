export interface Guide {
  id: string;
  name: string;
  photo: string;
  phone: string;
  rating: number;
  totalReviews: number;
  specialties: string[];
  experience: string;
}

export const guides: Guide[] = [
  {
    id: "g1",
    name: "Carlos Silva",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    phone: "(15) 99999-1234",
    rating: 4.8,
    totalReviews: 47,
    specialties: ["Trilhas", "Cachoeiras"],
    experience: "8 anos",
  },
  {
    id: "g2",
    name: "Ana Souza",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    phone: "(15) 99999-5678",
    rating: 4.9,
    totalReviews: 62,
    specialties: ["Mirantes", "Fotografia"],
    experience: "5 anos",
  },
  {
    id: "g3",
    name: "Roberto Lima",
    photo: "https://randomuser.me/api/portraits/men/65.jpg",
    phone: "(15) 99999-9012",
    rating: 4.5,
    totalReviews: 31,
    specialties: ["Trilhas", "Observação de aves"],
    experience: "12 anos",
  },
  {
    id: "g4",
    name: "Fernanda Costa",
    photo: "https://randomuser.me/api/portraits/women/28.jpg",
    phone: "(15) 99999-3456",
    rating: 4.7,
    totalReviews: 38,
    specialties: ["Cachoeiras", "Rapel"],
    experience: "6 anos",
  },
];
