import styles from "../../page.module.scss";

interface BenefitItemProps {
  icon: string;
  title: string;
  description: string;
}

export const BenefitItem = ({ icon, title, description }: BenefitItemProps) => {
  return (
    <div className={styles.benefitItem}>
      <span className={styles.benefitIcon}>{icon}</span>
      <h3 className={styles.benefitTitle}>{title}</h3>
      <p className={styles.benefitDescription}>{description}</p>
    </div>
  );
};

