import { MDXRemote } from "next-mdx-remote/rsc";

interface MDXContentProps {
  content: string;
}

export async function MDXContent({ content }: MDXContentProps) {
  return (
    <div className="prose prose-invert prose-emerald max-w-none mb-4">
      <MDXRemote source={content} />
    </div>
  );
}
