import styles from "./Header.module.scss";

interface BurgerIconProps {
  isOpen: boolean;
}

export const BurgerIcon = ({ isOpen }: BurgerIconProps) => (
  <div className={`${styles.burgerIcon} ${isOpen ? styles.burgerIconOpen : ""}`}>
    {[1, 2, 3].map((i) => (
      <span key={i} className={styles.burgerLine} />
    ))}
  </div>
);

