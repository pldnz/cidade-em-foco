import { type FeedItem } from "@/data/mockData";
import { ArrowLeft, Calendar, AlertTriangle, Newspaper, MapPin, Clock, Phone, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FeedDetailProps {
  item: FeedItem;
  onBack: () => void;
}

const categoryConfig: Record<string, { icon: React.ElementType; label: string; className: string }> = {
  evento: { icon: Calendar, label: "Evento", className: "bg-primary text-primary-foreground" },
  aviso: { icon: AlertTriangle, label: "Aviso", className: "bg-destructive text-destructive-foreground" },
  notícia: { icon: Newspaper, label: "Notícia", className: "bg-secondary text-secondary-foreground" },
};

export function FeedDetail({ item, onBack }: FeedDetailProps) {
  const config = categoryConfig[item.category] || categoryConfig["notícia"];
  const Icon = config.icon;

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: item.title, text: item.description });
    }
  };

  return (
    <div className="pb-safe-nav bg-background min-h-screen">
      {/* Hero image */}
      <div className="relative">
        <img src={item.image} alt={item.title} className="w-full h-60 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <button
          onClick={onBack}
          className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm rounded-full p-2 shadow-md"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <button
          onClick={handleShare}
          className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-full p-2 shadow-md"
        >
          <Share2 className="h-5 w-5 text-foreground" />
        </button>
        {/* Category badge on image */}
        <div className="absolute bottom-4 left-4">
          <Badge className={`${config.className} text-xs`}>
            <Icon className="h-3 w-3 mr-1" />
            {config.label}
          </Badge>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Date */}
        <span className="text-sm font-semibold text-primary">{item.date}</span>

        {/* Title */}
        <h1 className="text-2xl font-display font-bold text-foreground leading-tight">{item.title}</h1>

        {/* Quick info cards */}
        <div className="flex flex-wrap gap-3">
          {item.location && (
            <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="text-sm text-foreground">{item.location}</span>
            </div>
          )}
          {item.time && (
            <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2">
              <Clock className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="text-sm text-foreground">{item.time}</span>
            </div>
          )}
          {item.contact && (
            <a
              href={`tel:${item.contact}`}
              className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2"
            >
              <Phone className="h-4 w-4 text-secondary flex-shrink-0" />
              <span className="text-sm text-foreground">{item.contact}</span>
            </a>
          )}
        </div>

        {/* Separator */}
        <div className="border-t border-border" />

        {/* Full content */}
        <div className="space-y-3">
          {item.fullContent.split("\n").map((paragraph, i) => {
            if (!paragraph.trim()) return null;
            // Bullet points
            if (paragraph.startsWith("•")) {
              return (
                <div key={i} className="flex items-start gap-2 pl-2">
                  <span className="text-primary mt-0.5 text-sm">•</span>
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    {paragraph.replace("• ", "")}
                  </span>
                </div>
              );
            }
            // Bold-like headers (lines ending with :)
            if (paragraph.endsWith(":")) {
              return (
                <h3 key={i} className="font-display font-bold text-foreground text-sm pt-2">
                  {paragraph}
                </h3>
              );
            }
            // Quote-like (starts with ")
            if (paragraph.startsWith('"')) {
              return (
                <blockquote key={i} className="border-l-2 border-primary pl-3 italic text-sm text-muted-foreground">
                  {paragraph}
                </blockquote>
              );
            }
            return (
              <p key={i} className="text-sm text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Action buttons for events */}
        {item.category === "evento" && item.location && (
          <div className="pt-2">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.location + " Itararé SP")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg font-semibold text-sm"
            >
              <MapPin className="h-4 w-4" />
              Ver no Mapa
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
