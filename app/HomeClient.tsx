"use client";

import styles from "./page.module.scss";
import { WelcomeSection } from "./components/Home/WelcomeSection";
import { CategoriesSection } from "./components/Home/CategoriesSection";
import { WhySection } from "./components/Home/WhySection";

export default function HomeClient() {
  return (
    <div className={styles.home}>
      <WelcomeSection />
      <CategoriesSection />
      <WhySection />
    </div>
  );
}
