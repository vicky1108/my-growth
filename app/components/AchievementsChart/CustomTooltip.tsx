import styles from "./AchievementsChart.module.scss";

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      title: string;
      date: string;
    };
  }>;
}

export const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className={styles.tooltip}>
        <p className={styles.tooltipTitle}>{data.title}</p>
        <p className={styles.tooltipDate}>
          {new Date(data.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    );
  }
  return null;
};


