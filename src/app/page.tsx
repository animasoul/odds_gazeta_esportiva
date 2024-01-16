import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";
import styles from "./index.module.css";

interface Post {
  ID: bigint;
  post_name: string;
  post_title: string;
  post_content: string;
  wp_term_relationships: {
    wp_term_taxonomy: {
      wp_terms: {
        name: string;
        slug: string;
      } | null;
      description: string;
      term_taxonomy_id: bigint;
      term_id: bigint;
      taxonomy: string;
    } | null;
    term_taxonomy_id: bigint;
  }[];
  // include other properties as needed
}
interface Category {
  term_id: bigint;
  wp_terms: {
    name: string;
    slug: string;
  } | null;
  // include other properties as needed
}

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

async function DisplayCategories() {
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
                    href={`/${category.wp_terms.slug}`}
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

async function DisplayPosts() {
  const latestPost: Post | null = await api.post.getLatest.query();
  const allPosts: Post[] = await api.post.getAllPosts.query();

  // Truncate text to a specified length
  function truncateText(text: string, length: number): string {
    return text.length > length ? text.substring(0, length) + "..." : text;
  }

  return (
    <div>
      <div className={styles.cardRow}>
        {allPosts ? (
          <>
            <p className={styles.showcaseText}>
              You have {allPosts.length} posts total.
            </p>
            {allPosts.length > 0 &&
              allPosts.map((post: Post) => (
                <Link
                  key={post.ID}
                  href={`/posts/${post.post_name}`}
                  className={styles.card}
                >
                  {/* <pre className={styles.preBox}>
                  {JSON.stringify(
                    post,
                    (key, value) =>
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unnecessary-type-assertion, @typescript-eslint/no-redundant-type-constituents
                      typeof value === "bigint" ? value.toString() : value,
                    4
                  )}
                </pre> */}
                  <h3 className={styles.cardTitle}>{post.post_title} →</h3>
                  <div className={styles.cardText}>
                    {/* display the wp_terms.name if taxonomy == category */}

                    {post.wp_term_relationships.map((relationship) =>
                      relationship.wp_term_taxonomy?.taxonomy === "category" &&
                      relationship.wp_term_taxonomy.wp_terms ? (
                        <p
                          key={relationship.wp_term_taxonomy.term_taxonomy_id}
                          className={styles.showcaseText}
                        >
                          Category:{" "}
                          {relationship.wp_term_taxonomy.wp_terms.name}
                        </p>
                      ) : null
                    )}

                    {truncateText(post.post_content, 100)}
                  </div>
                </Link>
              ))}
          </>
        ) : (
          <p className={styles.showcaseText}>Loading posts...</p>
        )}
      </div>
      {latestPost !== null ? (
        <p className={styles.showcaseText}>
          Your most recent post:{" "}
          <Link href={`/posts/${latestPost.post_name}`}>
            {latestPost.post_title}
          </Link>
        </p>
      ) : (
        <p className={styles.showcaseText}>You have no posts yet.</p>
      )}
      <CreatePost />
    </div>
  );
}
