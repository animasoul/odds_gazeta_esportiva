import styles from "~/app/index.module.css";
import DisplayCategories from "~/app/_components/DisplayCategories";
import DisplayPosts from "~/app/_components/DisplayPosts";

export default async function Prognosticos() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Prognosticos</h1>
        <DisplayCategories />
        <DisplayPosts />
      </div>
    </main>
  );
}
