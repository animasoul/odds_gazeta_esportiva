import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";
import styles from "../index.module.css";
import type { Post } from "~/app/_types/post";

export default async function DisplayPosts() {
  const allPosts: Post[] = await api.post.getAllPosts.query();

  // Truncate text to a specified length
  function truncateText(text: string, length: number): string {
    // Remove HTML tags
    const strippedText = text.replace(/<[^>]+>/g, "");

    // Truncate text
    return strippedText.length > length
      ? strippedText.substring(0, length) + "..."
      : strippedText;
  }

  return (
    <div>
      <div className={styles.cardRow}>
        {allPosts ? (
          <>
            <p className={styles.showcaseText}>
              You have {allPosts.length} posts total.
            </p>
            {/* <pre className={styles.preBox}>
                {JSON.stringify(
                  allPosts,
                  (key, value) =>
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unnecessary-type-assertion, @typescript-eslint/no-redundant-type-constituents
                    typeof value === "bigint" ? value.toString() : value,
                  4
                )}
              </pre> */}
            {allPosts.length > 0 &&
              allPosts.map((post: Post) =>
                post !== null ? (
                  <Link
                    key={post.ID}
                    href={`/prognosticos/${
                      post.wp_term_relationships.find(
                        (relationship) =>
                          relationship.wp_term_taxonomy?.taxonomy ===
                            "category" &&
                          relationship.wp_term_taxonomy?.wp_terms
                      )?.wp_term_taxonomy?.wp_terms?.slug ?? "uncategorized"
                    }/${post.post_name}`}
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
                        relationship.wp_term_taxonomy?.taxonomy ===
                          "category" &&
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
                      {/* <div
                        dangerouslySetInnerHTML={{
                          __html: truncateText(
                            (post as { post_content: string }).post_content,
                            100
                          ),
                        }}
                        className={styles.showcaseText}
                      /> */}
                      {truncateText(post.post_content, 100)}
                    </div>
                  </Link>
                ) : null
              )}
          </>
        ) : (
          <p className={styles.showcaseText}>Loading posts...</p>
        )}
      </div>
      <CreatePost />
    </div>
  );
}
