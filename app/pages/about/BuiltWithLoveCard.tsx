import styles from "./page.module.scss";

export const BuiltWithLoveCard = () => {
  return (
    <div className={styles.card}>
      <h2 className={`${styles.cardTitle} ${styles.purple}`}>Built with Love</h2>
      <p className={styles.cardContent}>
        Created by parents, for parents. We understand the joy of watching children grow and achieve their goals. Our platform is designed to be simple, fun, and meaningful - capturing precious moments that you&apos;ll treasure forever.
      </p>
    </div>
  );
};

