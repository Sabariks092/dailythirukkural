// Notes Timeline Component
import React from "react";
import type { DailyProgress } from "../../types";
import { formatDate } from "../../utils/dateUtils";
import { NotebookPenIcon } from "lucide-react";

interface NotesTimelineProps {
  progressList: DailyProgress[];
}

const NotesTimeline: React.FC<NotesTimelineProps> = ({ progressList }) => {
  // Show last 5 entries
  const recentProgress = progressList.slice(0, 5);

  if (recentProgress.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span>📝</span> Recent Reflections
        </h3>
        <p className="text-gray-500 text-center py-8">
          Your reflections will appear here after you complete your first
          reading.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <span><NotebookPenIcon/></span> Recent Reflections
      </h3>

      <div className="space-y-4">
        {recentProgress.slice(0, 5).map((progress) => (
          <div
            key={progress.date}
            className="relative pl-6 pb-4 border-l-2 border-emerald-200 last:pb-0 last:border-l-transparent"
          >
            {/* Timeline dot */}
            <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-emerald-500" />

            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-medium">
                    Kural {progress.kuralNumber}
                  </span>
                  <span className="text-gray-500 text-xs">
                    {progress.adhigaram}
                  </span>
                </div>
                <span className="text-gray-400 text-xs">
                  {formatDate(progress.date)}
                </span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                "{progress.note}"
              </p>
            </div>
          </div>
        ))}
      </div>

      {progressList.length > 5 && (
        <p className="text-center text-gray-500 text-sm mt-4">
          Showing latest 5 of {progressList.length} reflections
        </p>
      )}
    </div>
  );
};

export default NotesTimeline;
