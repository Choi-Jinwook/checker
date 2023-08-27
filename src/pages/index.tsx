import Link from "next/link";
import styles from "../styles/Index.module.css";

export default function Main() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>마이픽 MyPick</div>
      <div className={styles.explanation}>좋아하는 장소를 저장해보세요!</div>
      <Link href="/login">
        <button className={styles.button}>시작하기▶</button>
      </Link>
    </div>
  );
}
