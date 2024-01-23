import { api } from "~/trpc/server";
interface Post {
  post_name: string;
  wp_term_relationships: {
    wp_term_taxonomy: {
      wp_terms: {
        slug: string;
      };
    };
  }[];
}

export async function GET() {
  const posts: Post[] = await api.post.getParams.query();

  const params = posts.map((post) => ({
    post_slug: post.post_name,
    category_slug:
      post.wp_term_relationships[0]?.wp_term_taxonomy.wp_terms.slug ?? "",
  }));

  return Response.json(params);
}
