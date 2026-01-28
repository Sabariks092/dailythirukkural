// LeetCode-style Calendar Heatmap Component
import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import type { DailyProgress } from "../../types";
import { getTodayIST, formatDate } from "../../utils/dateUtils";

interface CalendarHeatmapProps {
  progressList: DailyProgress[];
  signupDate: Date;
}

const CalendarHeatmapComponent: React.FC<CalendarHeatmapProps> = ({
  progressList,
  signupDate,
}) => {
  // Create a map of completed dates
  const completedDates = new Set(progressList.map((p) => p.date));

  // Generate values for heatmap
  const startDate = new Date(signupDate);
  startDate.setMonth(startDate.getMonth() - 1); // Start from 1 month before signup
  const endDate = new Date();

  const values: { date: string; count: number }[] = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    const dateStr = current.toISOString().split("T")[0];
    values.push({
      date: dateStr,
      count: completedDates.has(dateStr) ? 1 : 0,
    });
    current.setDate(current.getDate() + 1);
  }

  const getClassForValue = (value: any) => {
    if (!value || !value.date) return "color-empty";

    const signupDateStr = signupDate.toISOString().split("T")[0];

    // Before signup date - empty
    if (value.date < signupDateStr) return "color-empty";

    // Future dates - empty
    if (value.date > getTodayIST()) return "color-empty";

    // Completed
    if (value.count > 0) return "color-scale-4";

    // Missed (after signup, not completed)
    return "color-scale-1";
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <span>📅</span> Reading Streak
      </h3>

      <div className="overflow-x-auto">
        <div className="min-w-[700px]">
          <CalendarHeatmap
            startDate={startDate}
            endDate={endDate}
            values={values}
            classForValue={getClassForValue}
            showWeekdayLabels
            titleForValue={(value: any) => {
              if (!value || !value.date) return "";
              return `${formatDate(value.date)}: ${value.count > 0 ? "Completed ✓" : "Missed"}`;
            }}
          />
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-2 mt-4 text-sm text-gray-600">
        <span>Less</span>
        <div className="flex gap-1">
          <div
            className="w-3 h-3 rounded-sm bg-[#e5e7eb]"
            title="Not started"
          />
          <div className="w-3 h-3 rounded-sm bg-[#d1fae5]" title="Missed" />
          <div className="w-3 h-3 rounded-sm bg-[#047857]" title="Completed" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

export default CalendarHeatmapComponent;
