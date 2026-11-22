import React from "react";
import HeroSection from "./home/HeroSection";
import MissionSection from "./home/MissionSection";
import StatsSection from "./home/StatsSection";
import CtaBanner from "./home/CtaBanner";

export default function HomePage() {
  return (
    <div className="bg-white overflow-hidden">
      <HeroSection />
      <MissionSection />
      <StatsSection />
      <CtaBanner />
    </div>
  );
}