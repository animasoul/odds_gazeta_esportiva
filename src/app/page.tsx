import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";
import styles from "./index.module.css";

interface Post {
  ID: bigint;
  post_name: string;
  post_title: string;
  post_content: string;
  // include other properties as needed
}

export default async function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Gezeta <span className={styles.pinkSpan}>Esportiva</span> Demo
        </h1>

        <CrudShowcase />
      </div>
    </main>
  );
}

async function CrudShowcase() {
  const latestPost: Post | null = await api.post.getLatest.query();
  const allPosts: Post[] = await api.post.getAllPosts.query();

  // Truncate text to a specified length
  function truncateText(text: string, length: number): string {
    return text.length > length ? text.substring(0, length) + "..." : text;
  }

  return (
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
                <h3 className={styles.cardTitle}>{post.post_title} →</h3>
                <div className={styles.cardText}>
                  {truncateText(post.post_content, 100)}
                </div>
              </Link>
            ))}
        </>
      ) : (
        <p className={styles.showcaseText}>Loading posts...</p>
      )}
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
