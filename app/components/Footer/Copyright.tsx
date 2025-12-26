import styles from "./Footer.module.scss";

interface CopyrightProps {
  year: number;
  companyName?: string;
}

export const Copyright = ({
  year,
  companyName = "Kids Achievements",
}: CopyrightProps) => {
  return (
    <div className={styles.copyright}>
      <p>&copy; {year} {companyName}. All rights reserved.</p>
    </div>
  );
};


