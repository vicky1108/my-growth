import styles from "./AchievementsChart.module.scss";

interface ChartTitleProps {
  title: string;
}

export const ChartTitle = ({ title }: ChartTitleProps) => {
  return <h3 className={styles.title}>{title}</h3>;
};


