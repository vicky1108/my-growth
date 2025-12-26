import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import styles from "./AchievementsChart.module.scss";
import { CustomTooltip } from "./CustomTooltip";
import {
  ScatterDataPoint,
  SelectedPoint,
} from "./useAchievementsChart";

interface ChartContainerProps {
  scatterData: ScatterDataPoint[];
  selectedPoint: SelectedPoint | null;
  onPointSelect: (point: SelectedPoint) => void;
  formatXAxis: (tickItem: number) => string;
  xAxisLabel: { value: string; position: string; offset: number };
  dateOfBirth?: string | null;
}

export const ChartContainer = ({
  scatterData,
  selectedPoint,
  onPointSelect,
  formatXAxis,
  xAxisLabel,
  dateOfBirth,
}: ChartContainerProps) => {
  const handleMouseDown = (data: unknown) => {
    const eventData = data as { activePayload?: Array<{ payload: ScatterDataPoint }> };
    if (eventData?.activePayload?.[0]) {
      const point = eventData.activePayload[0].payload;
      onPointSelect({
        title: point.title,
        date: point.date,
        x: point.x,
        y: point.y,
      });
    }
  };

  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          onMouseDown={handleMouseDown}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
          <XAxis
            type="number"
            dataKey="x"
            stroke="#71717a"
            style={{ fontSize: "12px" }}
            tickFormatter={formatXAxis}
            label={xAxisLabel}
          />
          <YAxis
            type="number"
            dataKey="y"
            stroke="#71717a"
            style={{ fontSize: "12px" }}
            domain={[0.5, 1.5]}
            tick={false}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ strokeDasharray: "3 3" }}
          />
          <Scatter
            name="Achievements"
            data={scatterData}
            fill="#000"
            shape={(props: unknown) => {
              const shapeProps = props as { cx?: number; cy?: number; payload: ScatterDataPoint };
              const { cx, cy, payload } = shapeProps;
              const isSelected =
                selectedPoint &&
                selectedPoint.title === payload.title &&
                selectedPoint.date === payload.date;
              return (
                <circle
                  cx={cx}
                  cy={cy}
                  r={isSelected ? 8 : 6}
                  fill={isSelected ? "#3b82f6" : "#000"}
                  stroke={isSelected ? "#1e40af" : "#000"}
                  strokeWidth={isSelected ? 3 : 2}
                  style={{ cursor: "pointer" }}
                />
              );
            }}
          />
          {dateOfBirth && (
            <ReferenceLine
              x={0}
              stroke="#3b82f6"
              strokeDasharray="5 5"
              label={{ value: "Birth", position: "top" }}
            />
          )}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

