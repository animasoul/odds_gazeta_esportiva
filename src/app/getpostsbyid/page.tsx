import { api } from "~/trpc/server";
import styles from "../index.module.css";

export default async function Post({
  params,
}: {
  readonly params: { id: string };
}) {
  const id = Number(params.id);
  const post = await api.post.getOnePost.query({ id });

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.showcaseContainer}>
          <p>
            PostId:
            {id}
          </p>
          {post ? (
            <p className={styles.showcaseText}>
              {(post as { post_title: string }).post_title}
            </p>
          ) : (
            <p className={styles.showcaseText}>Loading post...</p>
          )}
        </div>
      </div>
    </main>
  );
}
