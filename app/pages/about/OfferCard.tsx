import styles from "./page.module.scss";
import { OfferItem } from "./OfferItem";

export const OfferCard = () => {
  const offers = [
    {
      emoji: "🎯",
      title: "Achievement Tracking:",
      description: "Record academic, sports, artistic, and personal achievements",
    },
    {
      emoji: "📸",
      title: "Memory Keeping:",
      description: "Store photos and details of special moments",
    },
    {
      emoji: "🏅",
      title: "Milestone Badges:",
      description: "Earn fun digital badges for various accomplishments",
    },
    {
      emoji: "📈",
      title: "Progress Reports:",
      description: "See your child's growth over time",
    },
  ];

  return (
    <div className={styles.card}>
      <h2 className={`${styles.cardTitle} ${styles.blue}`}>What We Offer</h2>
      <ul className={styles.offerList}>
        {offers.map((offer, index) => (
          <OfferItem
            key={index}
            emoji={offer.emoji}
            title={offer.title}
            description={offer.description}
          />
        ))}
      </ul>
    </div>
  );
};

