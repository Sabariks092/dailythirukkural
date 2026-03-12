import React, { useState, useMemo, useEffect, useRef } from "react";
import type { DailyProgress } from "../../types";
import { getTodayIST, formatDate } from "../../utils/dateUtils";
import type { JSX } from "react";

/**
 * CUSTOM GITHUB-STYLE HEATMAP BY MONTH
 * - Centered on current month
 * - 4 months previous, 4 months next
 * - Ash theme for empty slots
 */

interface HeatmapProps {
  progressList: DailyProgress[];
  signupDate: Date | string;
  onDateClick?: (date: string, count: number) => void;
}

const CalendarHeatmapComponent: React.FC<HeatmapProps> = ({
  progressList,
  signupDate,
  onDateClick,
}) => {
  const [hoveredDate, setHoveredDate] = useState<any>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const heatmapData = useMemo(() => {
    const map: Record<string, number> = {};
    progressList.forEach((d) => {
      map[d.date] = 1;
    });
    return map;
  }, [progressList]);

  const signupDateObj = useMemo(() => new Date(signupDate), [signupDate]);
  const today = useMemo(() => new Date(), []);

  // Calculate the range: 4 months back, 4 months forward
  const rangeStart = useMemo(() => {
    const start = new Date(today.getFullYear(), today.getMonth() - 4, 1);
    return start;
  }, [today]);

  const rangeEnd = useMemo(() => {
    const end = new Date(today.getFullYear(), today.getMonth() + 4, 1);
    // Move to end of that month
    return new Date(end.getFullYear(), end.getMonth() + 1, 0);
  }, [today]);

  // Generate months range
  const months = useMemo(() => {
    const list = [];
    const current = new Date(rangeStart);
    const end = new Date(rangeEnd);

    while (current <= end) {
      const year = current.getFullYear();
      const month = current.getMonth();

      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const monthDays = [];
      for (let day = 1; day <= daysInMonth; day++) {
        monthDays.push(new Date(year, month, day));
      }

      const isCurrentMonth =
        today.getMonth() === month && today.getFullYear() === year;

      list.push({
        name: current.toLocaleString("default", { month: "short" }),
        year,
        days: monthDays,
        isCurrentMonth,
      });

      current.setMonth(current.getMonth() + 1);
    }
    return list;
  }, [rangeStart, rangeEnd, today]);

  // Auto-scroll to center (the current month)
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      // Wait for layout
      setTimeout(() => {
        const currentMonthEl = container.querySelector(
          '[data-current-month="true"]',
        );
        if (currentMonthEl) {
          const containerCenter = container.clientWidth / 2;
          const monthRect = (
            currentMonthEl as HTMLElement
          ).getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          const offset =
            monthRect.left -
            containerRect.left +
            monthRect.width / 2 -
            containerCenter;
          container.scrollLeft = offset;
        } else {
          // Fallback to simple scroll to middle
          container.scrollLeft =
            (container.scrollWidth - container.clientWidth) / 2;
        }
      }, 100);
    }
  }, [months]);

  // Intensity Mapping
  const getIntensityClass = (dateStr: string) => {
    const count = heatmapData[dateStr] || 0;
    const signupDateStr = signupDateObj.toISOString().split("T")[0];
    const todayStr = getTodayIST();

    // Default ASH color for everything else (before signup or after today)
    const emptyAsh = "bg-[#EEF1F5]"; // Slight light ASH (Cool light gray)

    // Before signup date - empty
    if (dateStr < signupDateStr) return emptyAsh;

    // Future dates - empty
    if (dateStr > todayStr) return emptyAsh;

    // Completed
    if (count > 0) return "bg-[#92400e]"; // color-scale-4 (Ochre)

    // Missed (after signup, before/on today, not completed)
    return "bg-[#fde68a]"; // color-scale-1 (Gold/Yellow)
  };

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="w-full bg-white border border-gray-100 rounded-2xl p-6 shadow-sm font-sans relative heatmap-industrial">
      <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
        <span>📅</span> Reading Streak
      </h3>

      <div className="flex">
        {/* Y-Axis Labels (Sun-Sat) */}
        <div className="flex flex-col justify-between pt-[22px] pb-[4px] h-[155px] pr-3 border-r border-gray-100">
          {dayLabels.map((label, index) => (
            <span
              key={label}
              className={`text-[11px] text-gray-400 font-medium h-[12px] flex items-center ${index % 2 === 0 ? "opacity-100" : "opacity-0"}`}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Scalable Scrollable Heatmap */}
        <div
          ref={containerRef}
          className="heatmap-container flex-1 overflow-x-auto overflow-y-hidden no-scrollbar flex items-start pl-4 scroll-smooth"
        >
          {months.map((month, mIdx) => (
            <div
              key={`${month.name}-${mIdx}`}
              className="flex flex-col mr-6 last:mr-0 group"
              data-current-month={month.isCurrentMonth}
            >
              {/* Month Label */}
              <span
                className={`text-[12px] font-bold mb-3 uppercase tracking-wider ${month.isCurrentMonth ? "text-primary-600" : "text-gray-500"}`}
              >
                {month.name}
              </span>

              {/* Month Grid (Columns are weeks) */}
              <div
                className={`flex gap-[6px] transition-all duration-300 ${month.isCurrentMonth ? "scale-105" : "opacity-80"}`}
              >
                {/* Group days into week columns */}
                {(() => {
                  const dayOffset = month.days[0].getDay();
                  const columns: JSX.Element[] = [];
                  let currentWeek: JSX.Element[] = [];

                  // Pad start of first week
                  for (let i = 0; i < dayOffset; i++) {
                    currentWeek.push(
                      <div key={`pad-${i}`} className="w-[14px] h-[14px]" />,
                    );
                  }

                  month.days.forEach((date, dIdx) => {
                    const dateStr = date.toISOString().split("T")[0];
                    const count = heatmapData[dateStr] || 0;
                    const isToday = dateStr === getTodayIST();

                    currentWeek.push(
                      <div
                        key={dateStr}
                        className={`w-[14px] h-[14px] rounded-[2px] cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-primary-200 ${getIntensityClass(dateStr)} ${isToday ? "ring-2 ring-primary-500" : ""}`}
                        onMouseOver={(e) => {
                          const rect = (
                            e.target as HTMLElement
                          ).getBoundingClientRect();
                          setHoveredDate({ date: dateStr, count });
                          setTooltipPos({
                            x: rect.left + rect.width / 2,
                            y: rect.top - 10,
                          });
                        }}
                        onMouseLeave={() => setHoveredDate(null)}
                        onClick={() => onDateClick?.(dateStr, count)}
                      />,
                    );

                    // End of week (Sat) or end of month
                    if (date.getDay() === 6 || dIdx === month.days.length - 1) {
                      // Pad end of last week if needed
                      if (dIdx === month.days.length - 1) {
                        for (let i = date.getDay(); i < 6; i++) {
                          currentWeek.push(
                            <div
                              key={`pad-end-${i}`}
                              className="w-[14px] h-[14px]"
                            />,
                          );
                        }
                      }

                      columns.push(
                        <div
                          key={`col-${columns.length}`}
                          className="flex flex-col gap-[6px]"
                        >
                          {currentWeek}
                        </div>,
                      );
                      currentWeek = [];
                    }
                  });
                  return columns;
                })()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer / Legend */}
      <div className="mt-8 pt-4 border-t border-gray-50 flex items-center justify-end text-[11px] text-gray-500">
        <div className="flex items-center gap-3">
          <span>Less</span>
          <div className="flex gap-[4px]">
            <div
              className="w-3 h-3 bg-[#EEF1F5] rounded-sm"
              title="Empty/Future/Prior"
            />
            <div className="w-3 h-3 bg-[#fde68a] rounded-sm" title="Missed" />
            <div
              className="w-3 h-3 bg-[#92400e] rounded-sm"
              title="Completed"
            />
          </div>
          <span>More</span>
        </div>
      </div>

      {/* Improved Tooltip */}
      {hoveredDate && (
        <div
          className="fixed z-[100] transform -translate-x-1/2 -translate-y-full px-3 py-2 bg-gray-900 text-white text-[11px] rounded shadow-lg pointer-events-none flex flex-col items-center"
          style={{ left: tooltipPos.x, top: tooltipPos.y }}
        >
          <div className="font-bold whitespace-nowrap">
            {formatDate(hoveredDate.date)}:{" "}
            {hoveredDate.count > 0 ? "Completed ✓" : "Missed"}
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-gray-900"></div>
        </div>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default CalendarHeatmapComponent;
