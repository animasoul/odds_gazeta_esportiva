import { api } from "~/trpc/server";
import styles from "../index.module.css";
import Link from "next/link";
import type { Post } from "../_types/post";

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
                        href={`/${category}/${
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
