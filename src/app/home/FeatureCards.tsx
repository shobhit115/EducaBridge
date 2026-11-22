import React from "react";
import { BookOpen, PlayCircle, TrendingUp, Trophy } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Expert-Led Learning",
    subtitle: "Learn from industry & academic mentors",
  },
  {
    icon: PlayCircle,
    title: "Interactive Content",
    subtitle: "Engage & practice with hands-on lessons",
  },
  {
    icon: TrendingUp,
    title: "Track Your Progress",
    subtitle: "Stay on top with clear milestones",
  },
  {
    icon: Trophy,
    title: "Achieve Your Goals",
    subtitle: "Build skills for a brighter future",
  },
];

export default function FeatureCards() {
  return (
    <div className="mt-10 sm:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
      {features.map((feature) => {
        const Icon = feature.icon;
        return (
          <div
            key={feature.title}
            className="group p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-blue-100/90 shadow-xs hover:shadow-xl hover:shadow-blue-900/5 hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center justify-center space-y-3"
          >
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#EBF2FF] to-[#DCE8FF] text-[#2458CC] flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:bg-[#2458CC] group-hover:from-[#2458CC] group-hover:to-[#1b45a6] group-hover:text-white transition-all duration-300">
              <Icon className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-[#09265D] group-hover:text-[#2458CC] transition-colors">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {feature.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}