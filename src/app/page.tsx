import styles from "./index.module.css";
import DisplayCategories from "~/app/_components/DisplayCategories";
import DisplayPosts from "~/app/_components/DisplayPosts";

export default async function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Gezeta <span className={styles.pinkSpan}>Esportiva</span> Demo
        </h1>
        <DisplayCategories />
        <DisplayPosts />
      </div>
    </main>
  );
}
