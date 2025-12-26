import styles from "./page.module.scss";

export default function Loading() {
  return (
    <div className={styles.login}>
      <div className={styles.card}>
        <div style={{ textAlign: "center", padding: "3rem" }}>
          <div className={styles.loadingIcon} style={{ fontSize: "2rem", marginBottom: "1rem" }}>
            ⏳
          </div>
          <p>Loading...</p>
        </div>
      </div>
    </div>
  );
}

