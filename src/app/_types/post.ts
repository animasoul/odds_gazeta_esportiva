export type Post = {
  ID: bigint;
  post_name: string;
  post_title: string;
  post_date: Date;
  post_modified: Date;
  post_content: string;
  post_author: bigint;
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
