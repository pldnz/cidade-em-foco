import { useState } from "react";
import { guides, type Guide } from "@/data/guidesData";
import { Star, Phone, X } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function GuidesList() {
  const [ratingGuide, setRatingGuide] = useState<Guide | null>(null);
  const [hoverStar, setHoverStar] = useState(0);
  const [selectedStar, setSelectedStar] = useState(0);
  const [submitted, setSubmitted] = useState<string[]>([]);

  const handleSubmitRating = (guideId: string) => {
    setSubmitted((prev) => [...prev, guideId]);
    setRatingGuide(null);
    setSelectedStar(0);
    setHoverStar(0);
  };

  return (
    <div>
      <h2 className="font-display font-bold text-foreground mb-3">Guias Disponíveis</h2>
      <div className="space-y-3">
        {guides.map((guide) => (
          <div
            key={guide.id}
            className="bg-muted rounded-lg p-3 flex gap-3 items-start"
          >
            <Avatar className="h-12 w-12 flex-shrink-0">
              <AvatarImage src={guide.photo} alt={guide.name} />
              <AvatarFallback>{guide.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm text-foreground">{guide.name}</h3>
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                  <span className="text-xs font-semibold text-foreground">{guide.rating}</span>
                  <span className="text-[10px] text-muted-foreground">({guide.totalReviews})</span>
                </div>
              </div>

              <p className="text-[11px] text-muted-foreground mt-0.5">{guide.experience} de experiência</p>

              <div className="flex gap-1.5 mt-1.5 flex-wrap">
                {guide.specialties.map((s) => (
                  <Badge key={s} variant="secondary" className="text-[10px] px-2 py-0">
                    {s}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2 mt-2">
                <a
                  href={`tel:${guide.phone}`}
                  className="flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-md"
                >
                  <Phone className="h-3 w-3" />
                  Ligar
                </a>
                {submitted.includes(guide.id) ? (
                  <span className="text-xs text-primary font-medium flex items-center">✓ Avaliado</span>
                ) : (
                  <button
                    onClick={() => { setRatingGuide(guide); setSelectedStar(0); setHoverStar(0); }}
                    className="flex items-center gap-1.5 bg-accent/15 text-accent-foreground text-xs font-semibold px-3 py-1.5 rounded-md"
                  >
                    <Star className="h-3 w-3" />
                    Avaliar
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Rating modal */}
      {ratingGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm px-6">
          <div className="bg-card rounded-xl p-5 w-full max-w-sm shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-foreground">Avaliar {ratingGuide.name}</h3>
              <button onClick={() => setRatingGuide(null)}>
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setHoverStar(star)}
                  onMouseLeave={() => setHoverStar(0)}
                  onClick={() => setSelectedStar(star)}
                  className="p-1"
                >
                  <Star
                    className={`h-8 w-8 transition-colors ${
                      star <= (hoverStar || selectedStar)
                        ? "fill-accent text-accent"
                        : "text-border"
                    }`}
                  />
                </button>
              ))}
            </div>

            <p className="text-center text-sm text-muted-foreground mb-4">
              {selectedStar === 0 ? "Toque nas estrelas" : `${selectedStar} estrela${selectedStar > 1 ? "s" : ""}`}
            </p>

            <button
              disabled={selectedStar === 0}
              onClick={() => handleSubmitRating(ratingGuide.id)}
              className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-semibold text-sm disabled:opacity-40"
            >
              Enviar Avaliação
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
