import { api } from "~/trpc/server";
import styles from "../index.module.css";
import Link from "next/link";

type Post = {
  ID: bigint;
  post_name: string;
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

export default async function PostsByCategory({
  params,
}: {
  readonly params: { category: string };
}) {
  const category = params.category;
  const allPosts: Post[] = await api.post.getPostsByCategory.query({
    category,
  });
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.showcaseContainer}>
          {allPosts ? (
            <div>
              <p className={styles.showcaseText}>
                Category: {` `}
                {category}: {Array.isArray(allPosts) ? allPosts.length : 0}{" "}
                posts total.
              </p>
              {Array.isArray(allPosts) && allPosts.length > 0 && (
                <p className={styles.showcaseText}>
                  {allPosts.map((post) => (
                    <span key={Number((post as { ID: bigint }).ID)}>
                      <br />
                      <Link
                        href={`/posts/${
                          (post as { post_name: string }).post_name
                        }`}
                      >
                        {
                          (post as { ID: bigint; post_title: string })
                            .post_title
                        }
                      </Link>
                    </span>
                  ))}
                </p>
              )}
            </div>
          ) : (
            <p className={styles.showcaseText}>Loading posts...</p>
          )}
        </div>
      </div>
    </main>
  );
}
