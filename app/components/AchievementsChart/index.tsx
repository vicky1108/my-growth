"use client";

import styles from "./AchievementsChart.module.scss";
import { useAchievementsChart, Achievement } from "./useAchievementsChart";
import { ChartTitle } from "./ChartTitle";
import { EmptyState } from "./EmptyState";
import { SelectedPoint } from "./SelectedPoint";
import { ChartContainer } from "./ChartContainer";

interface AchievementsChartProps {
  achievements: Achievement[];
  dateOfBirth?: string | null;
}

export default function AchievementsChart({
  achievements,
  dateOfBirth,
}: AchievementsChartProps) {
  const {
    scatterData,
    selectedPoint,
    setSelectedPoint,
    formatXAxis,
    chartTitle,
    xAxisLabel,
    hasData,
  } = useAchievementsChart({ achievements, dateOfBirth });

  if (!hasData) {
    return <EmptyState />;
  }

  return (
    <div className={styles.chart}>
      <ChartTitle title={chartTitle} />

      {selectedPoint && (
        <SelectedPoint
          point={selectedPoint}
          onClose={() => setSelectedPoint(null)}
        />
      )}

      <ChartContainer
        scatterData={scatterData}
        selectedPoint={selectedPoint}
        onPointSelect={setSelectedPoint}
        formatXAxis={formatXAxis}
        xAxisLabel={xAxisLabel}
        dateOfBirth={dateOfBirth}
      />
    </div>
  );
}
