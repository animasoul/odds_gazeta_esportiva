import { api } from "~/trpc/server";
import styles from "~/app/index.module.css";
import Link from "next/link";
import type { Post } from "~/app/_types/post";

interface CategoryData {
  description: string;
  wp_terms: {
    name: string;
    // include other properties as needed
  };
}
interface CategoryParams {
  category_slug: string;
}

export async function generateStaticParams() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }
  const categoryParams: CategoryParams[] = await fetch(`${apiUrl}/params`).then(
    (res) => res.json()
  );
  // console.log("categoryParams: ", categoryParams);
  return categoryParams.map((categoryParam) => ({
    category: categoryParam.category_slug,
  }));
}

export default async function PostsByCategory({
  params,
}: {
  readonly params: { category: string };
}) {
  const category = params.category;
  const allPosts: Post[] = await api.post.getPostsByCategory.query({
    category,
  });
  const categoryData: CategoryData = await api.post.getCategoryBySlug.query({
    slug: category,
  });

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.showcaseContainer}>
          {allPosts ? (
            <div>
              <p className={styles.showcaseText}>
                Category: {` `}
                {categoryData.wp_terms.name} :{" "}
                {Array.isArray(allPosts) ? allPosts.length : 0} posts total.
              </p>
              {categoryData.description && (
                <p className={styles.showcaseText}>
                  {categoryData.description}
                </p>
              )}
              {Array.isArray(allPosts) && allPosts.length > 0 && (
                <p className={styles.showcaseText}>
                  {allPosts.map((post) => (
                    <span key={Number((post as { ID: bigint }).ID)}>
                      <br />
                      <Link
                        href={`/prognosticos/${category}/${
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
