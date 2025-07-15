"use client";
import { memo } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

type EnergyPoint = {
  hour: string;
  energy: number;
};

export default memo(function EnergyChart({
  energyData,
  currentHour,
}: {
  energyData: number[];
  currentHour: number;
}) {
  const formattedData: EnergyPoint[] = energyData.map((energy, hour) => ({
    hour:
      hour === 0
        ? "12a"
        : hour < 12
        ? `${hour}a`
        : hour === 12
        ? "12p"
        : `${hour - 12}p`,
    energy,
  }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={formattedData}>
          <XAxis dataKey="hour" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="energy"
            stroke="#10b981"
            strokeWidth={2}
            dot={false}
          />
          <ReferenceLine
            x={
              currentHour === 0
                ? "12a"
                : currentHour < 12
                ? `${currentHour}a`
                : currentHour === 12
                ? "12p"
                : `${currentHour - 12}p`
            }
            stroke="#3b82f6"
            label="Now"
            strokeDasharray="3 3"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
});
