import Link from "next/link";
import styles from "./Header.module.scss";

interface NavigationLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "desktop" | "mobile";
}

export const NavigationLink = ({
  href,
  children,
  onClick,
  variant = "desktop",
}: NavigationLinkProps) => {
  const linkClass =
    variant === "mobile" ? styles.mobileNavLink : styles.navLink;

  return (
    <Link href={href} onClick={onClick} className={linkClass}>
      {children}
    </Link>
  );
};

