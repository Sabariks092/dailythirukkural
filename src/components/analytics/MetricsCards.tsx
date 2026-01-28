// Metrics Cards Component for Dashboard
import React from "react";
import type { AnalyticsData } from "../../types";

interface MetricsCardsProps {
  analytics: AnalyticsData;
}

const MetricsCards: React.FC<MetricsCardsProps> = ({ analytics }) => {
  const metrics = [
    {
      label: "Total Completed",
      value: analytics.totalCompleted,
      suffix: "/ 1330",
      icon: "📖",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      label: "Current Streak",
      value: analytics.currentStreak,
      suffix: "days",
      icon: "🔥",
      color: "from-orange-500 to-red-500",
    },
    {
      label: "Completion",
      value: analytics.completionPercentage.toFixed(1),
      suffix: "%",
      icon: "📊",
      color: "from-blue-500 to-indigo-600",
    },
    {
      label: "Missed Days",
      value: analytics.missedDays,
      suffix: "to catch up",
      icon: analytics.missedDays > 0 ? "⚠️" : "✨",
      color:
        analytics.missedDays > 0
          ? "from-amber-500 to-orange-500"
          : "from-green-500 to-emerald-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <div
          key={metric.label}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl">{metric.icon}</span>
            <div
              className={`w-10 h-10 rounded-full bg-gradient-to-br ${metric.color} opacity-20`}
            />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-gray-800">
              {metric.value}
            </span>
            <span className="text-gray-500 text-sm">{metric.suffix}</span>
          </div>
          <p className="text-gray-600 text-sm mt-1">{metric.label}</p>
        </div>
      ))}
    </div>
  );
};

export default MetricsCards;
