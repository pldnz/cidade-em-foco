import { useState, useEffect, useRef } from "react";
import { touristSpots, commercePoints } from "@/data/mockData";
import { Navigation, Phone, Search, X } from "lucide-react";

const filters = [
  { id: "todos", label: "Todos" },
  { id: "natureza", label: "Natureza" },
  { id: "comércio", label: "Comércio" },
  { id: "restaurante", label: "Restaurantes" },
  { id: "hospedagem", label: "Hospedagem" },
];

interface SelectedMarker {
  name: string;
  type: string;
  subtitle: string;
  lat: number;
  lng: number;
  phone?: string;
  sponsored?: boolean;
}

export function MapaTab() {
  const [activeFilter, setActiveFilter] = useState("todos");
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [selected, setSelected] = useState<SelectedMarker | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  // Load Leaflet dynamically via CDN to avoid React 18 compatibility issues
  useEffect(() => {
    // Add Leaflet CSS
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    // Add Leaflet JS
    const loadLeaflet = () => {
      return new Promise<void>((resolve) => {
        if ((window as any).L) {
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        script.onload = () => resolve();
        document.head.appendChild(script);
      });
    };

    loadLeaflet().then(() => {
      const L = (window as any).L;
      if (!mapRef.current || mapInstanceRef.current) return;

      const map = L.map(mapRef.current, {
        zoomControl: false,
      }).setView([-23.9814, -49.3453], 14);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;

      // Force resize after mount
      setTimeout(() => map.invalidateSize(), 200);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update markers when filter/search changes
  useEffect(() => {
    const L = (window as any).L;
    const map = mapInstanceRef.current;
    if (!L || !map) return;

    // Clear existing markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const createIcon = (color: string) =>
      L.divIcon({
        className: "custom-marker",
        html: `<div style="width:28px;height:28px;border-radius:50%;background:${color};border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

    const greenIcon = createIcon("#059669");
    const blueIcon = createIcon("#1E40AF");
    const goldIcon = createIcon("#F59E0B");

    // Filter spots
    const showNature = activeFilter === "todos" || activeFilter === "natureza";
    const filteredCommerce = (() => {
      if (activeFilter === "natureza") return [];
      if (activeFilter === "restaurante")
        return commercePoints.filter(
          (c) => c.type.toLowerCase().includes("restaurante") || c.type.toLowerCase().includes("café") || c.type.toLowerCase().includes("vegano")
        );
      if (activeFilter === "hospedagem")
        return commercePoints.filter((c) => c.type.toLowerCase().includes("hospedagem") || c.type.toLowerCase().includes("pousada"));
      return commercePoints;
    })();

    // Apply search
    const searchLower = search.toLowerCase();
    const spots = showNature
      ? touristSpots.filter((s) => !search || s.name.toLowerCase().includes(searchLower))
      : [];
    const commerce = filteredCommerce.filter(
      (c) => !search || c.name.toLowerCase().includes(searchLower) || c.type.toLowerCase().includes(searchLower)
    );

    // Add nature markers
    spots.forEach((spot) => {
      const marker = L.marker([spot.lat, spot.lng], { icon: greenIcon }).addTo(map);
      marker.on("click", () => {
        setSelected({
          name: spot.name,
          type: "natureza",
          subtitle: `${spot.type} · ${spot.difficulty}`,
          lat: spot.lat,
          lng: spot.lng,
        });
      });
      markersRef.current.push(marker);
    });

    // Add commerce markers
    commerce.forEach((c) => {
      const marker = L.marker([c.lat, c.lng], { icon: c.sponsored ? goldIcon : blueIcon }).addTo(map);
      marker.on("click", () => {
        setSelected({
          name: c.name,
          type: "comércio",
          subtitle: c.type,
          lat: c.lat,
          lng: c.lng,
          phone: c.phone,
          sponsored: c.sponsored,
        });
      });
      markersRef.current.push(marker);
    });
  }, [activeFilter, search]);

  const openDirections = (lat: number, lng: number) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, "_blank");
  };

  return (
    <div className="relative h-[calc(100vh-4rem)]">
      {/* Map container */}
      <div ref={mapRef} className="h-full w-full" style={{ zIndex: 0 }} />

      {/* Search bar */}
      {showSearch && (
        <div className="absolute top-3 left-3 right-3 z-[1000] flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              autoFocus
              placeholder="Buscar no mapa..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-card rounded-lg text-sm shadow-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <button onClick={() => { setShowSearch(false); setSearch(""); }} className="bg-card rounded-lg p-2.5 shadow-md">
            <X className="h-4 w-4 text-foreground" />
          </button>
        </div>
      )}

      {!showSearch && (
        <button onClick={() => setShowSearch(true)} className="absolute top-3 right-3 z-[1000] bg-card rounded-lg p-2.5 shadow-md">
          <Search className="h-5 w-5 text-foreground" />
        </button>
      )}

      {/* Selected marker popup */}
      {selected && (
        <div className="absolute bottom-20 left-3 right-3 z-[1000] bg-card rounded-xl shadow-lg border border-border p-4 animate-slide-up">
          <button onClick={() => setSelected(null)} className="absolute top-2 right-2">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-3 h-3 rounded-full ${selected.type === "natureza" ? "bg-primary" : "bg-secondary"}`} />
            <span className="text-xs text-muted-foreground">{selected.subtitle}</span>
            {selected.sponsored && (
              <span className="bg-accent text-accent-foreground text-[9px] font-bold px-1.5 py-0.5 rounded-full">★ Patrocinado</span>
            )}
          </div>
          <h3 className="font-display font-bold text-foreground">{selected.name}</h3>
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => openDirections(selected.lat, selected.lng)}
              className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-lg font-semibold text-sm"
            >
              <Navigation className="h-4 w-4" /> Como Chegar
            </button>
            {selected.phone && (
              <a
                href={`tel:${selected.phone}`}
                className="flex-1 flex items-center justify-center gap-2 bg-secondary text-secondary-foreground py-2.5 rounded-lg font-semibold text-sm"
              >
                <Phone className="h-4 w-4" /> Ligar
              </a>
            )}
          </div>
        </div>
      )}

      {/* Filter pills */}
      <div className="absolute bottom-4 left-0 right-0 z-[1000] flex justify-center">
        <div className="flex gap-2 px-4 overflow-x-auto no-scrollbar">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap shadow-md transition-colors ${
                activeFilter === f.id ? "bg-primary text-primary-foreground" : "bg-card text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
