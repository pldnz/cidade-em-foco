import { useState } from "react";
import { touristSpots, type TouristSpot } from "@/data/mockData";
import { SpotDetail } from "@/components/SpotDetail";
import { Search, Clock, Mountain } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const allTags = Array.from(new Set(touristSpots.flatMap((s) => s.tags)));

const difficultyColor: Record<string, string> = {
  "Fácil": "bg-primary/15 text-primary",
  "Moderado": "bg-accent/20 text-accent-foreground",
  "Difícil": "bg-destructive/15 text-destructive",
};

export function PontosTab() {
  const [selectedSpot, setSelectedSpot] = useState<TouristSpot | null>(null);
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  if (selectedSpot) {
    return <SpotDetail spot={selectedSpot} onBack={() => setSelectedSpot(null)} />;
  }

  const filtered = touristSpots.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.type.toLowerCase().includes(search.toLowerCase());
    const matchTag = !activeTag || s.tags.includes(activeTag);
    return matchSearch && matchTag;
  });

  return (
    <div className="pb-safe-nav">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border px-4 pt-4 pb-3">
        <h1 className="text-xl font-display font-bold text-foreground">Pontos Turísticos</h1>
        <p className="text-sm text-muted-foreground">Descubra os atrativos de Itararé</p>

        {/* Search */}
        <div className="relative mt-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar pontos turísticos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-muted rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {/* Tag filters */}
        <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              !activeTag
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            Todos
          </button>
          {allTags.slice(0, 6).map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTag === tag
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Spot cards */}
      <div className="px-4 py-4 space-y-3">
        {filtered.map((spot) => (
          <button
            key={spot.id}
            onClick={() => setSelectedSpot(spot)}
            className="w-full bg-card rounded-lg overflow-hidden shadow-sm border border-border flex animate-slide-up text-left"
          >
            <img src={spot.image} alt={spot.name} className="w-28 h-28 object-cover flex-shrink-0" loading="lazy" />
            <div className="p-3 flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge className={`text-[10px] ${difficultyColor[spot.difficulty]}`}>{spot.difficulty}</Badge>
                <span className="text-[10px] text-muted-foreground capitalize">{spot.type}</span>
              </div>
              <h3 className="font-display font-bold text-foreground text-sm leading-tight truncate">{spot.name}</h3>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Clock className="h-3 w-3" /> {spot.duration}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Mountain className="h-3 w-3" /> {spot.visitType}
                </span>
              </div>
              <div className="flex gap-1.5 mt-2">
                {spot.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="bg-primary/10 text-primary text-[10px] font-medium px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-8 text-sm">Nenhum ponto encontrado.</p>
        )}
      </div>
    </div>
  );
}
