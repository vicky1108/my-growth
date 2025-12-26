import styles from "../../page.module.scss";

interface CategoryCardProps {
  icon: string;
  title: string;
  description: string;
  variant: "academic" | "sports" | "creative";
}

export const CategoryCard = ({
  icon,
  title,
  description,
  variant,
}: CategoryCardProps) => {
  return (
    <div className={`${styles.categoryCard} ${styles[variant]}`}>
      <span className={styles.categoryIcon}>{icon}</span>
      <h2 className={styles.categoryTitle}>{title}</h2>
      <p className={styles.categoryDescription}>{description}</p>
    </div>
  );
};

