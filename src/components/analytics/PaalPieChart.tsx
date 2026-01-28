// Paal Progress Pie Chart Component
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface PaalPieChartProps {
  paalProgress: {
    aram: number;
    porul: number;
    inbam: number;
  };
}

const PaalPieChart: React.FC<PaalPieChartProps> = ({ paalProgress }) => {
  const data = [
    {
      name: "அறத்துப்பால் (Virtue)",
      completed: paalProgress.aram,
      total: 380,
      color: "#10b981",
    },
    {
      name: "பொருட்பால் (Wealth)",
      completed: paalProgress.porul,
      total: 700,
      color: "#3b82f6",
    },
    {
      name: "காமத்துப்பால் (Love)",
      completed: paalProgress.inbam,
      total: 250,
      color: "#f472b6",
    },
  ];

  const chartData = data.map((d) => ({
    name: d.name,
    value: d.completed,
    remaining: d.total - d.completed,
    total: d.total,
    color: d.color,
  }));

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <span>📊</span> Progress by Paal
      </h3>

      <div className="h-64 min-h-[256px]">
        <ResponsiveContainer width="100%" height={256}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white shadow-lg rounded-lg p-3 border">
                      <p className="font-medium text-gray-800">{data.name}</p>
                      <p className="text-sm text-gray-600">
                        {data.value} / {data.total} completed
                      </p>
                      <p className="text-sm text-gray-500">
                        {((data.value / data.total) * 100).toFixed(1)}%
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Custom Legend */}
      <div className="space-y-2 mt-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-600">{item.name}</span>
            </div>
            <span className="text-sm font-medium text-gray-800">
              {item.completed} / {item.total}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaalPieChart;
