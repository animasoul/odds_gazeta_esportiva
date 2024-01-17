import { api } from "~/trpc/server";
import styles from "../../index.module.css";
import Image from "next/image";
import type { Metadata } from "next";

type Post = {
  ID: bigint;
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

type Props = {
  params: { slug: string };
};
// Truncate text to a specified length
function truncateText(text: string, length: number): string {
  return text.length > length ? text.substring(0, length) + "..." : text;
}

async function fetchPostData<T>(
  slug: string,
  fn: (post: Post) => Promise<T>
): Promise<T> {
  const post: Post = await api.post.getPostBySlug.query({ slug });
  return await fn(post);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  return fetchPostData(slug, async (post: Post) => {
    let description = "";
    if (post?.post_content) {
      description = truncateText(post.post_content, 100);
    }

    return {
      title: post?.post_title,
      description: description,
    };
  });
}

const PostContent = ({ post }: { post: Post | null }) => {
  if (post === null) {
    return <p className={styles.showcaseText}>No post data found!</p>;
  }
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.showcaseContainer}>
          <h1 className={styles.title}>{post.post_title}</h1>
          <Image
            src={`/images/wp_dummy_content_generator_${post.ID}.jpg`}
            alt={post.post_title}
            width={400}
            height={400}
          />
          <p>
            Created {post.post_date.toLocaleDateString("pt-BR")}, Modified{" "}
            {post.post_modified.toLocaleDateString("pt-BR")}
          </p>
          {/* display the wp_terms.name if taxonomy == category */}

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

          <p className={styles.showcaseText}>
            <br />
            {post.post_content}
          </p>
          <h3>Raw Data</h3>
          <pre className={styles.preBox}>
            {JSON.stringify(
              post,
              (key, value) =>
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                typeof value === "bigint" ? value.toString() : value,
              4
            )}
          </pre>
        </div>
      </div>
    </main>
  );
};

export default function PostBySlug({
  params,
}: {
  readonly params: { slug: string };
}): Promise<JSX.Element> {
  const slug = params.slug;

  return fetchPostData(slug, async (post: Post) => {
    return post ? (
      <PostContent post={post} />
    ) : (
      <p className={styles.showcaseText}>Loading post...</p>
    );
  });
}
