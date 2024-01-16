import { api } from "~/trpc/server";
import styles from "../index.module.css";
import Link from "next/link";

export default async function Posts() {
  const allPosts = await api.post.getAllPosts.query();
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.showcaseContainer}>
          {allPosts ? (
            <div>
              You have {Array.isArray(allPosts) ? allPosts.length : 0} posts
              total.
              {Array.isArray(allPosts) && allPosts.length > 0 && (
                <p className={styles.showcaseText}>
                  {allPosts.map((post) => (
                    <span key={Number((post as { ID: number }).ID)}>
                      <br />
                      <Link
                        href={`/posts/${
                          (post as { post_name: string }).post_name
                        }`}
                      >
                        {
                          (post as { ID: number; post_title: string })
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
