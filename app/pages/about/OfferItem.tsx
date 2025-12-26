import styles from "./page.module.scss";

interface OfferItemProps {
  emoji: string;
  title: string;
  description: string;
}

export const OfferItem = ({ emoji, title, description }: OfferItemProps) => {
  return (
    <li className={styles.offerItem}>
      <span className={styles.emoji}>{emoji}</span>
      <div className={styles.text}>
        <div className={styles.itemTitle}>{title}</div>
        <div className={styles.itemDescription}>{description}</div>
      </div>
    </li>
  );
};

