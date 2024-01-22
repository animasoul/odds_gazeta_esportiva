import { api } from "~/trpc/server";
import styles from "~/app/index.module.css";
import Image from "next/image";
import type { Metadata } from "next";
import type { Post } from "~/app/_types/post";
import Link from "next/link";
import GetBitcoinData from "~/app/_components/GetBitcoinData";

type Props = {
  params: { post: string };
};
// Truncate text to a specified length
function truncateText(text: string, length: number): string {
  return text.length > length ? text.substring(0, length) + "..." : text;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const slug = params.post;
  const post: Post = await api.post.getPostBySlug.query({ slug });

  let description = "";
  if (post?.post_content) {
    description = truncateText(post.post_content, 100);
  }

  return {
    title: post?.post_title,
    description: description,
  };
}

interface Author {
  display_name: string;
  // include other properties as needed
}

export default async function PostBySlug({
  params,
}: {
  readonly params: { post: string };
}) {
  const slug = params.post;
  const post: Post = await api.post.getPostBySlug.query({ slug });
  const author: Author = await api.post.getAuthorById.query({
    id: Number(post?.post_author),
  });

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.showcaseContainer}>
          {post !== null ? (
            <>
              <h1 className={styles.title}>
                {(post as { post_title: string }).post_title}
              </h1>

              <Image
                src={`/images/wp_dummy_content_generator_${post.ID}.jpg`}
                alt={`${post.post_title}`}
                width={400}
                height={400}
              />
              <p>
                Created {post.post_date.toLocaleDateString("pt-BR")}, Modified{" "}
                {post.post_modified.toLocaleDateString("pt-BR")}
              </p>
              <p className={styles.showcaseText}>
                Author: {author.display_name ?? "Unknown"}
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
                      Category:{` `}
                      <Link
                        href={`/prognosticos/${relationship.wp_term_taxonomy.wp_terms.slug}`}
                      >
                        {relationship.wp_term_taxonomy.wp_terms.name}
                      </Link>
                    </p>
                  ) : null
                )}
              </>

              {/* <p className={styles.showcaseText}>
                <br />
                {(post as { post_content: string }).post_content}
              </p> */}
              <div
                dangerouslySetInnerHTML={{
                  __html: (post as { post_content: string }).post_content,
                }}
                className={styles.showcaseText}
              />

              <div className={styles.showcaseText}>
                Bitcoin price:
                <GetBitcoinData />
              </div>

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
