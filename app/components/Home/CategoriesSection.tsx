import styles from "../../page.module.scss";
import { CategoryCard } from "./CategoryCard";

export const CategoriesSection = () => {
  const categories = [
    {
      icon: "🎓",
      title: "Academic Success",
      description: "Track learning achievements and school milestones",
      variant: "academic" as const,
    },
    {
      icon: "🏆",
      title: "Sports & Activities",
      description: "Celebrate sports victories and activity participation",
      variant: "sports" as const,
    },
    {
      icon: "🎨",
      title: "Creative Arts",
      description: "Showcase artistic talents and creative projects",
      variant: "creative" as const,
    },
  ];

  return (
    <section className={styles.categoriesSection}>
      <div className={styles.categoriesGrid}>
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            icon={category.icon}
            title={category.title}
            description={category.description}
            variant={category.variant}
          />
        ))}
      </div>
    </section>
  );
};

