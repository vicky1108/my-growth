import styles from "../../page.module.scss";
import { BenefitItem } from "./BenefitItem";

export const WhySection = () => {
  const benefits = [
    {
      icon: "✨",
      title: "Build Confidence",
      description: "Help children see their progress and feel proud",
    },
    {
      icon: "🎉",
      title: "Celebrate Success",
      description: "Create lasting memories of special moments",
    },
    {
      icon: "📈",
      title: "Track Progress",
      description: "Monitor growth in different areas of development",
    },
    {
      icon: "👨‍👩‍👧‍👦",
      title: "Family Bonding",
      description: "Share and celebrate together as a family",
    },
  ];

  return (
    <section className={styles.whySection}>
      <div className={styles.whyCard}>
        <h2 className={styles.whyTitle}>Why Track Achievements?</h2>
        <div className={styles.benefitsGrid}>
          {benefits.map((benefit, index) => (
            <BenefitItem
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

