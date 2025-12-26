"use client";

import styles from "./page.module.scss";
import { AboutTitle } from "./AboutTitle";
import { MissionCard } from "./MissionCard";
import { OfferCard } from "./OfferCard";
import { BuiltWithLoveCard } from "./BuiltWithLoveCard";

export default function About() {
  return (
    <div className={styles.about}>
      <div className={styles.container}>
        <AboutTitle />
        <div className={styles.cardsContainer}>
          <MissionCard />
          <OfferCard />
          <BuiltWithLoveCard />
        </div>
      </div>
    </div>
  );
}
