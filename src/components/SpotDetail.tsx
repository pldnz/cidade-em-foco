import { type TouristSpot } from "@/data/mockData";
import { ArrowLeft, Clock, Mountain, Navigation } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GuidesList } from "@/components/GuidesList";

interface SpotDetailProps {
  spot: TouristSpot;
  onBack: () => void;
}

const difficultyColor: Record<string, string> = {
  "Fácil": "bg-primary/15 text-primary",
  "Moderado": "bg-accent/20 text-accent-foreground",
  "Difícil": "bg-destructive/15 text-destructive",
};

export function SpotDetail({ spot, onBack }: SpotDetailProps) {
  const openDirections = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${spot.lat},${spot.lng}`,
      "_blank"
    );
  };

  return (
    <div className="pb-safe-nav bg-background min-h-screen">
      {/* Hero image */}
      <div className="relative">
        <img src={spot.image} alt={spot.name} className="w-full h-56 object-cover" />
        <button
          onClick={onBack}
          className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm rounded-full p-2 shadow-md"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Title & type */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge className={difficultyColor[spot.difficulty]}>{spot.difficulty}</Badge>
            <span className="text-xs text-muted-foreground capitalize">{spot.type}</span>
          </div>
          <h1 className="text-2xl font-display font-bold text-foreground">{spot.name}</h1>
        </div>

        {/* Quick action buttons - "10 second rule" */}
        <button
          onClick={openDirections}
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg font-semibold text-sm"
        >
          <Navigation className="h-4 w-4" />
          Como Chegar
        </button>

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted rounded-lg p-3">
            <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
              <Clock className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">Duração</span>
            </div>
            <span className="text-sm font-semibold text-foreground">{spot.duration}</span>
          </div>
          <div className="bg-muted rounded-lg p-3">
            <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
              <Mountain className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">Tipo de visita</span>
            </div>
            <span className="text-sm font-semibold text-foreground">{spot.visitType}</span>
          </div>
        </div>

        {/* Description */}
        <div>
          <h2 className="font-display font-bold text-foreground mb-1.5">Sobre</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{spot.description}</p>
        </div>

        {/* Season */}
        <div>
          <h2 className="font-display font-bold text-foreground mb-1.5">Melhor Época</h2>
          <p className="text-sm text-muted-foreground">{spot.season}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {spot.tags.map((tag) => (
            <span
              key={tag}
              className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
