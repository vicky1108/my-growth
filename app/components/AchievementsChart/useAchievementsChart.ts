import { useState, useMemo, useCallback } from "react";

export interface Achievement {
  id: string;
  title: string;
  date: string;
  createdAt: string;
}

export interface ScatterDataPoint {
  x: number;
  y: number;
  title: string;
  date: string;
  index: number;
}

export interface SelectedPoint {
  title: string;
  date: string;
  x: number;
  y: number;
}

export interface UseAchievementsChartProps {
  achievements: Achievement[];
  dateOfBirth?: string | null;
}

export interface UseAchievementsChartReturn {
  scatterData: ScatterDataPoint[];
  selectedPoint: SelectedPoint | null;
  setSelectedPoint: (point: SelectedPoint | null) => void;
  formatXAxis: (tickItem: number) => string;
  chartTitle: string;
  xAxisLabel: { value: string; position: string; offset: number };
  hasData: boolean;
}

export function useAchievementsChart({
  achievements,
  dateOfBirth,
}: UseAchievementsChartProps): UseAchievementsChartReturn {
  const [selectedPoint, setSelectedPoint] = useState<SelectedPoint | null>(
    null
  );

  const scatterData = useMemo(() => {
    if (!dateOfBirth) {
      return achievements.map((achievement, index) => {
        const date = new Date(achievement.date);
        return {
          x: date.getTime(), 
          y: 1, 
          title: achievement.title,
          date: achievement.date,
          index,
        };
      });
    }

    const birthDate = new Date(dateOfBirth);
    return achievements.map((achievement, index) => {
      const achievementDate = new Date(achievement.date);
      const daysSinceBirth = Math.floor(
        (achievementDate.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      return {
        x: daysSinceBirth,
        y: 1,
        title: achievement.title,
        date: achievement.date,
        index,
      };
    });
  }, [achievements, dateOfBirth]);

  const formatXAxis = useCallback(
    (tickItem: number) => {
      if (!dateOfBirth) {
        return new Date(tickItem).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        });
      }
      const years = Math.floor(tickItem / 365);
      const days = tickItem % 365;
      if (years > 0) {
        return `${years}y ${Math.floor(days / 30)}m`;
      }
      return `${days}d`;
    },
    [dateOfBirth]
  );

  const chartTitle = dateOfBirth
    ? "Achievements Timeline (From Birth to Now)"
    : "Achievements Over Time";

  const xAxisLabel = dateOfBirth
    ? { value: "Time from Birth", position: "insideBottom" as const, offset: -5 }
    : { value: "Date", position: "insideBottom" as const, offset: -5 };

  const hasData = scatterData.length > 0;

  return {
    scatterData,
    selectedPoint,
    setSelectedPoint,
    formatXAxis,
    chartTitle,
    xAxisLabel,
    hasData,
  };
}


