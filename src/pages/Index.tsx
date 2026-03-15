import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { FeedTab } from "@/components/FeedTab";
import { PontosTab } from "@/components/PontosTab";
import { MapaTab } from "@/components/MapaTab";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"feed" | "pontos" | "mapa">("feed");

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto relative">
      {activeTab === "feed" && <FeedTab />}
      {activeTab === "pontos" && <PontosTab />}
      {activeTab === "mapa" && <MapaTab />}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
