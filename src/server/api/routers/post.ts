/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { Prisma } from "@prisma/client";

type WpPosts = {
  findUnique: (options: any) => Promise<any>; // replace `any` with the actual types if you know them
  findFirst: (options: any) => Promise<any>;
  findMany: (options: any) => Promise<any>;
  // include any other methods you need
};
type Context = {
  db: {
    wp_posts: WpPosts;
    wp_term_taxonomy: WpPosts;
    wp_users: WpPosts;
    // include any other properties you need
  };
  // include any other properties you need
};

const defaultPostSelect = {
  ID: true,
  post_title: true,
  post_content: true,
  post_name: true,
  post_status: true,
  post_type: true,
  post_date: true,
  post_modified: true,
  post_author: true,
  post_excerpt: true,
  post_parent: true,
  post_mime_type: true,
  post_password: true,
  post_content_filtered: true,
} satisfies Prisma.wp_postsSelect;

const defaultTermTaxonomySelect = {
  term_taxonomy_id: true,
  term_id: true,
  taxonomy: true,
  description: true,
  parent: true,
  count: true,
} satisfies Prisma.wp_term_taxonomySelect;

const defaultTermSelect = {
  term_id: true,
  name: true,
  slug: true,
  term_group: true,
} satisfies Prisma.wp_termsSelect;

const defaultTermRelationshipsSelect = {
  object_id: true,
  term_taxonomy_id: true,
  term_order: true,
} satisfies Prisma.wp_term_relationshipsSelect;

const defaultPostMetaSelect = {
  meta_id: true,
  post_id: true,
  meta_key: true,
  meta_value: true,
} satisfies Prisma.wp_postmetaSelect;

export const postRouter = createTRPCRouter({
  getLatest: publicProcedure.query(({ ctx }: { ctx: Context }) => {
    return ctx.db.wp_posts.findFirst({
      select: defaultPostSelect,
      where: { post_status: "publish", post_type: "post" },
      orderBy: { post_modified: "desc" },
    });
  }),
  getAllPosts: publicProcedure.query(({ ctx }: { ctx: Context }) => {
    return ctx.db.wp_posts.findMany({
      select: {
        ...defaultPostSelect,
        wp_term_relationships: {
          select: {
            ...defaultTermRelationshipsSelect,
            wp_term_taxonomy: {
              select: {
                ...defaultTermTaxonomySelect,
                wp_terms: {
                  select: {
                    ...defaultTermSelect,
                  },
                },
              },
            },
          },
          where: { wp_term_taxonomy: { taxonomy: "category" } },
        },
      },
      where: {
        post_status: "publish",
        post_type: "post",
        // wp_term_relationships: {
        //   some: {
        //     wp_term_taxonomy: {
        //       taxonomy: "category",
        //     },
        //   },
        // },
      },
      orderBy: { post_modified: "desc" },
    });
  }),
  getPostBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ ctx, input }: { ctx: Context; input: { slug: string } }) => {
      return ctx.db.wp_posts.findUnique({
        select: {
          ...defaultPostSelect,
          wp_term_relationships: {
            select: {
              ...defaultTermRelationshipsSelect,
              wp_term_taxonomy: {
                select: {
                  ...defaultTermTaxonomySelect,
                  wp_terms: {
                    select: {
                      ...defaultTermSelect,
                    },
                  },
                },
              },
            },
            // where: { wp_term_taxonomy: { taxonomy: "category" } },
          },
        },
        where: { post_name: input.slug },
      });
    }),
  getCategoryBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ ctx, input }: { ctx: Context; input: { slug: string } }) => {
      return ctx.db.wp_term_taxonomy.findUnique({
        select: {
          ...defaultTermTaxonomySelect,
          wp_terms: {
            select: {
              ...defaultTermSelect,
            },
          },
        },
        where: { slug: input.slug },
      });
    }),
  getPostsByCategory: publicProcedure
    .input(z.object({ category: z.string() }))
    .query(({ ctx, input }: { ctx: Context; input: { category: string } }) => {
      return ctx.db.wp_posts.findMany({
        select: {
          ...defaultPostSelect,
          wp_term_relationships: {
            select: {
              ...defaultTermRelationshipsSelect,
              wp_term_taxonomy: {
                select: {
                  ...defaultTermTaxonomySelect,
                  wp_terms: {
                    select: {
                      ...defaultTermSelect,
                    },
                  },
                },
              },
            },
          },
        },
        where: {
          post_status: "publish",
          post_type: "post",
          wp_term_relationships: {
            some: {
              wp_term_taxonomy: {
                wp_terms: {
                  slug: input.category,
                },
              },
            },
          },
        },
        orderBy: { post_modified: "desc" },
      });
    }),
  getCategories: publicProcedure.query(({ ctx }: { ctx: Context }) => {
    return ctx.db.wp_term_taxonomy.findMany({
      select: {
        ...defaultTermTaxonomySelect,
        wp_terms: {
          select: {
            ...defaultTermSelect,
          },
        },
      },
      where: { taxonomy: "category" },
    });
  }),
  getAuthorById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }: { ctx: Context; input: { id: number } }) => {
      return ctx.db.wp_users.findUnique({
        select: {
          display_name: true,
        },
        where: { ID: input.id },
      });
    }),
});
