import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { touristSpots, commercePoints } from "@/data/mockData";
import { Navigation, Phone, Search, X } from "lucide-react";
import "leaflet/dist/leaflet.css";

// Fix default marker icon
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const greenIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const blueIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const goldIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png",
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const filters = [
  { id: "todos", label: "Todos" },
  { id: "natureza", label: "Natureza" },
  { id: "comércio", label: "Comércio" },
  { id: "restaurante", label: "Restaurantes" },
  { id: "hospedagem", label: "Hospedagem" },
];

export function MapaTab() {
  const [activeFilter, setActiveFilter] = useState("todos");
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const filteredSpots = activeFilter === "todos" || activeFilter === "natureza" ? touristSpots : [];
  const filteredCommerce = (() => {
    if (activeFilter === "todos") return commercePoints;
    if (activeFilter === "natureza") return [];
    if (activeFilter === "restaurante") return commercePoints.filter((c) => c.type.toLowerCase().includes("restaurante") || c.type.toLowerCase().includes("café") || c.type.toLowerCase().includes("vegano"));
    if (activeFilter === "hospedagem") return commercePoints.filter((c) => c.type.toLowerCase().includes("hospedagem") || c.type.toLowerCase().includes("pousada"));
    return commercePoints;
  })();

  const searchFiltered = search
    ? [...touristSpots.filter((s) => s.name.toLowerCase().includes(search.toLowerCase())),
       ...commercePoints.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.type.toLowerCase().includes(search.toLowerCase()))]
    : null;

  return (
    <div className="relative h-[calc(100vh-4rem)]">
      <MapContainer
        center={[-23.9814, -49.3453]}
        zoom={14}
        className="h-full w-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Tourist spots - green pins */}
        {(searchFiltered ? searchFiltered.filter((s): s is typeof touristSpots[0] => "difficulty" in s) : filteredSpots).map((spot) => (
          <Marker key={spot.id} position={[spot.lat, spot.lng]} icon={greenIcon}>
            <Popup>
              <div className="font-body min-w-[180px]">
                <strong className="font-display text-sm">{spot.name}</strong>
                <p className="text-xs text-muted-foreground mt-0.5 capitalize">{spot.type} · {spot.difficulty}</p>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${spot.lat},${spot.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-primary"
                >
                  <Navigation className="h-3 w-3" /> Como Chegar
                </a>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Commerce - blue/gold pins */}
        {(searchFiltered ? searchFiltered.filter((s): s is typeof commercePoints[0] => "sponsored" in s) : filteredCommerce).map((c) => (
          <Marker key={c.id} position={[c.lat, c.lng]} icon={c.sponsored ? goldIcon : blueIcon}>
            <Popup>
              <div className="font-body min-w-[180px]">
                <div className="flex items-center gap-1.5">
                  <strong className="font-display text-sm">{c.name}</strong>
                  {c.sponsored && <span className="bg-accent text-accent-foreground text-[9px] font-bold px-1.5 py-0.5 rounded-full">★</span>}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{c.type}</p>
                <div className="flex gap-2 mt-2">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${c.lat},${c.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary"
                  >
                    <Navigation className="h-3 w-3" /> Rota
                  </a>
                  {c.phone && (
                    <a href={`tel:${c.phone}`} className="inline-flex items-center gap-1 text-xs font-semibold text-secondary">
                      <Phone className="h-3 w-3" /> Ligar
                    </a>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

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
          <button
            onClick={() => { setShowSearch(false); setSearch(""); }}
            className="bg-card rounded-lg p-2.5 shadow-md"
          >
            <X className="h-4 w-4 text-foreground" />
          </button>
        </div>
      )}

      {!showSearch && (
        <button
          onClick={() => setShowSearch(true)}
          className="absolute top-3 right-3 z-[1000] bg-card rounded-lg p-2.5 shadow-md"
        >
          <Search className="h-5 w-5 text-foreground" />
        </button>
      )}

      {/* Filter pills - floating at bottom */}
      <div className="absolute bottom-4 left-0 right-0 z-[1000] flex justify-center">
        <div className="flex gap-2 px-4 overflow-x-auto no-scrollbar">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap shadow-md transition-colors ${
                activeFilter === f.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground"
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
