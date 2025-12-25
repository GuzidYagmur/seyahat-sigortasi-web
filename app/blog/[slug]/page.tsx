import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";

export default function BlogDetail({ params }: { params: { slug: string } }) {
  const filePath = path.join(
    process.cwd(),
    "content/blog",
    `${params.slug}.mdx`
  );

  const file = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(file);

  return (
    <article className="prose mx-auto max-w-3xl py-16">
      <h1>{data.title}</h1>
      <MDXRemote source={content} />
    </article>
  );
}
