"use client";

import styles from "./Footer.module.scss";
import { useFooterHandlers } from "./useFooterHandlers";
import { FooterLink } from "./FooterLink";
import { Copyright } from "./Copyright";

export default function Footer() {
  const { currentYear, user } = useFooterHandlers();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.links}>
            <FooterLink href="/pages/about">About</FooterLink>
            {user && (
              <FooterLink href="/pages/achievements">Achievements</FooterLink>
            )}
          </div>
          <Copyright year={currentYear} />
        </div>
      </div>
    </footer>
  );
}

