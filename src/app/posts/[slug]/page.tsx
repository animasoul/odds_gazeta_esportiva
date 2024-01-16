import { api } from "~/trpc/server";
import styles from "../../index.module.css";

type Post = {
  post_title: string;
  post_date: Date;
  post_modified: Date;
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
  // include any other properties you need
} | null;

export default async function PostBySlug({
  params,
}: {
  readonly params: { slug: string };
}) {
  const slug = params.slug;
  const post: Post = await api.post.getPostBySlug.query({ slug });

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.showcaseContainer}>
          {post !== null ? (
            <>
              <h1 className={styles.title}>
                {(post as { post_title: string }).post_title}
              </h1>
              <p>
                Created {post.post_date.toLocaleDateString("pt-BR")}, Modified{" "}
                {post.post_modified.toLocaleDateString("pt-BR")}
              </p>
              {/* display the wp_terms.name if taxonomy == category */}
              <>
                {post.wp_term_relationships.map((relationship) =>
                  relationship.wp_term_taxonomy?.taxonomy === "category" &&
                  relationship.wp_term_taxonomy.wp_terms ? (
                    <p
                      key={relationship.wp_term_taxonomy.term_taxonomy_id}
                      className={styles.showcaseText}
                    >
                      Category: {relationship.wp_term_taxonomy.wp_terms.name}
                    </p>
                  ) : null
                )}
              </>

              <p className={styles.showcaseText}>
                <br />
                {(post as { post_content: string }).post_content}
              </p>
              <h3>Raw Data</h3>
              <pre className={styles.preBox}>
                {JSON.stringify(
                  post,
                  (key, value) =>
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unnecessary-type-assertion, @typescript-eslint/no-redundant-type-constituents
                    typeof value === "bigint" ? value.toString() : value,
                  4
                )}
              </pre>
            </>
          ) : (
            <p className={styles.showcaseText}>Loading post...</p>
          )}
        </div>
      </div>
    </main>
  );
}
