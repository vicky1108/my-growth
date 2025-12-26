import styles from "./page.module.scss";

export default function Loading() {
  return (
    <div className={styles.about}>
      <div className={styles.container}>
        <div style={{ textAlign: "center", padding: "4rem" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⏳</div>
          <p>Loading...</p>
        </div>
      </div>
    </div>
  );
}

