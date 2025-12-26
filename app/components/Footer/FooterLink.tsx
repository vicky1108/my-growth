import Link from "next/link";
import styles from "./Footer.module.scss";

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

export const FooterLink = ({ href, children }: FooterLinkProps) => {
  return (
    <Link href={href} className={styles.link}>
      {children}
    </Link>
  );
};


