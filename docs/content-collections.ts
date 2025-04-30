import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { rehypePrettyCode } from "rehype-pretty-code";
import { createHighlighter } from "shiki";
import { rehypeComponent } from "./rehype-plugins/rehype-components";
const posts = defineCollection({
  name: "posts",
  directory: "content-collections/posts",
  include: "**/*.md",
  schema: (z) => ({
    title: z.string(),
    summary: z.string(),
  }),
});

const components = defineCollection({
  name: "components",
  directory: "content-collections/components",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    category: z.string(),
    slug: z.string(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      rehypePlugins: [
        rehypeComponent,
        [
          rehypePrettyCode,
          {
            theme: "github-dark",
            createHighlighter,
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            onVisitLine(node: any) {
              // Prevent lines from collapsing in `display: grid` mode, and allow empty
              // lines to be copy/pasted
              if (node.children.length === 0) {
                node.children = [{ type: "text", value: " " }];
              }
            },
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            onVisitHighlightedLine(node: any) {
              node.properties.className.push("line--highlighted");
            },
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            onVisitHighlightedWord(node: any) {
              node.properties.className = ["word--highlighted"];
            },
          },
        ],
      ],
    });
    return {
      ...document,
      mdx,
    };
  },
});

export default defineConfig({
  collections: [posts, components],
});
