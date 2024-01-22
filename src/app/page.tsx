import styles from "~/app/index.module.css";
import DisplayPosts from "~/app/_components/DisplayPosts";
import Link from "next/link";

export default async function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Gezeta <span className={styles.pinkSpan}>Esportiva</span> Demo
        </h1>
        <Link href="/prognosticos">
          <h2>See all Prognosticos →</h2>
        </Link>
        <DisplayPosts />
      </div>
    </main>
  );
}
