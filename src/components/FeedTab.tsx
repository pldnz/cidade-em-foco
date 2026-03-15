import { useState } from "react";
import { feedItems, type FeedItem } from "@/data/mockData";
import { FeedDetail } from "@/components/FeedDetail";
import { Calendar, AlertTriangle, Newspaper, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const categories = [
  { id: "todos", label: "Todos" },
  { id: "evento", label: "Eventos" },
  { id: "aviso", label: "Avisos" },
  { id: "notícia", label: "Notícias" },
];

const categoryIcons: Record<string, React.ElementType> = {
  evento: Calendar,
  aviso: AlertTriangle,
  notícia: Newspaper,
};

export function FeedTab() {
  const [filter, setFilter] = useState("todos");
  const [selectedItem, setSelectedItem] = useState<FeedItem | null>(null);

  if (selectedItem) {
    return <FeedDetail item={selectedItem} onBack={() => setSelectedItem(null)} />;
  }

  const filtered = filter === "todos" ? feedItems : feedItems.filter((i) => i.category === filter);

  return (
    <div className="pb-safe-nav">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border px-4 pt-4 pb-3">
        <h1 className="text-xl font-display font-bold text-foreground">Itararé</h1>
        <p className="text-sm text-muted-foreground font-body">O que está acontecendo na cidade</p>

        {/* Filter pills */}
        <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                filter === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Feed cards */}
      <div className="px-4 py-4 space-y-4">
        {filtered.map((item) => (
          <FeedCard key={item.id} item={item} onSelect={() => setSelectedItem(item)} />
        ))}
      </div>
    </div>
  );
}

function FeedCard({ item, onSelect }: { item: FeedItem; onSelect: () => void }) {
  const Icon = categoryIcons[item.category] || Newspaper;

  return (
    <button onClick={onSelect} className="w-full text-left bg-card rounded-lg overflow-hidden shadow-sm border border-border animate-slide-up">
      <div className="relative">
        <img src={item.image} alt={item.title} className="w-full h-44 object-cover" loading="lazy" />
        {item.featured && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-accent text-accent-foreground px-2.5 py-1 rounded-full text-xs font-semibold">
            <Star className="h-3 w-3" />
            Destaque
          </div>
        )}
        <Badge
          className={`absolute top-3 right-3 text-xs ${
            item.category === "aviso"
              ? "bg-destructive text-destructive-foreground"
              : item.category === "evento"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground"
          }`}
        >
          <Icon className="h-3 w-3 mr-1" />
          {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
        </Badge>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold text-primary">{item.date}</span>
          {item.location && (
            <span className="text-xs text-muted-foreground">· {item.location}</span>
          )}
        </div>
        <h3 className="font-display font-bold text-foreground text-base leading-tight">{item.title}</h3>
        <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2">{item.description}</p>
        <span className="inline-block mt-2 text-xs font-semibold text-primary">Ler mais →</span>
      </div>
    </button>
  );
}
