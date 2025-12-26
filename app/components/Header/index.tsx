"use client";

import Link from "next/link";
import styles from "./Header.module.scss";
import { useHeaderHandlers } from "./useHeaderHandlers";
import { AuthButton } from "./AuthButton";
import { NavigationLink } from "./NavigationLink";
import { BurgerIcon } from "./BurgerIcon";

export default function Header() {
  const {
    isMenuOpen,
    user,
    isMobile,
    showMobileMenu,
    handleLogout,
    handleLoginClick,
    toggleMenu,
    closeMenu,
  } = useHeaderHandlers();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logoLink}>
          <span className={styles.starIcon}>⭐</span>
          <span className={styles.logoTextMain}>My growth</span>
        </Link>

        {}
        {!isMobile && (
          <div className={styles.desktopNav}>
            {user && (
              <NavigationLink href="/pages/achievements" variant="desktop">
                Achievements
              </NavigationLink>
            )}
            <AuthButton
              isLoggedIn={!!user}
              onLogin={handleLoginClick}
              onLogout={handleLogout}
              variant="desktop"
            />
          </div>
        )}

        {}
        {isMobile && (
          <>
            {user ? (
              <button
                onClick={toggleMenu}
                className={styles.mobileMenuButton}
                aria-label="Toggle menu"
              >
                <BurgerIcon isOpen={isMenuOpen} />
              </button>
            ) : (
              <AuthButton
                isLoggedIn={false}
                onLogin={handleLoginClick}
                onLogout={handleLogout}
                variant="mobile-inline"
              />
            )}
          </>
        )}
      </nav>

      {}
      {showMobileMenu && (
        <div
          className={`${styles.mobileMenu} ${isMenuOpen ? styles.visible : styles.hidden}`}
        >
          <div className={styles.mobileMenuContent}>
            <NavigationLink
              href="/pages/achievements"
              onClick={closeMenu}
              variant="mobile"
            >
              Achievements
            </NavigationLink>
            <AuthButton
              isLoggedIn={!!user}
              onLogin={handleLoginClick}
              onLogout={handleLogout}
              variant="mobile"
              showText={true}
            />
          </div>
        </div>
      )}
    </header>
  );
}

