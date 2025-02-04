/* eslint-disable @typescript-eslint/no-explicit-any */
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";

export const mdxOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    [
      rehypePrettyCode,
      {
        theme: "github-dark",
        keepBackground: true,
      },
    ],
  ],
};
