import { Newspaper, MapPin, Map } from "lucide-react";

interface BottomNavProps {
  activeTab: "feed" | "pontos" | "mapa";
  onTabChange: (tab: "feed" | "pontos" | "mapa") => void;
}

const tabs = [
  { id: "feed" as const, label: "Feed", icon: Newspaper },
  { id: "pontos" as const, label: "Pontos Turísticos", icon: MapPin },
  { id: "mapa" as const, label: "Mapa", icon: Map },
];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-[0_-2px_10px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className={`h-5 w-5 ${isActive ? "stroke-[2.5]" : ""}`} />
              <span className={`text-[11px] font-body ${isActive ? "font-semibold" : "font-medium"}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
