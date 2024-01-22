import Link from "next/link";
import { api } from "~/trpc/server";
import styles from "../index.module.css";

interface Category {
  term_id: bigint;
  wp_terms: {
    name: string;
    slug: string;
  } | null;
  // include other properties as needed
}

export default async function DisplayCategories() {
  const allCategories: Category[] = await api.post.getCategories.query();

  return (
    <div className={styles.cardRow}>
      {allCategories ? (
        <>
          <p className={styles.showcaseText}>
            You have {allCategories.length} categories total.
          </p>
          {allCategories.length > 0 &&
            allCategories.map(
              (category: Category) =>
                category.wp_terms && (
                  <Link
                    key={category.term_id}
                    href={`/prognosticos/${category.wp_terms.slug}`}
                    className={styles.card}
                  >
                    <h3 className={styles.cardTitle}>
                      {category.wp_terms.name} →
                    </h3>
                  </Link>
                )
            )}
        </>
      ) : (
        <p className={styles.showcaseText}>Loading categories...</p>
      )}
    </div>
  );
}
