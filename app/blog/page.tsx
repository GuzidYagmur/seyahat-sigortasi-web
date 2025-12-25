import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image";

export default function BlogPage() {
  const blogDir = path.join(process.cwd(), "content/blog");
  const files = fs.readdirSync(blogDir);

  const posts = files.map((file) => {
    const slug = file.replace(".mdx", "");
    const fileContent = fs.readFileSync(path.join(blogDir, file), "utf-8");
    const { data } = matter(fileContent);

    return {
      slug,
      ...data,
    };
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <h1 className="text-3xl font-bold mb-12 text-blue-950">Blog</h1>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: any) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="
              group
              rounded-2xl
              overflow-hidden
              border
              bg-white
              shadow-sm
              hover:shadow-xl
              transition-all
              duration-300
            "
          >
            {/* IMAGE */}
            <div className="relative h-52 w-full overflow-hidden">
              <Image
                src={post.image || "/images/default.png"}
                alt={post.title || "Blog kapak görseli"}
                fill
                className="object-cover"
              />
            </div>

            {/* CONTENT */}
            <div className="p-6">
              <p className="text-xs text-gray-500 mb-2">{post.date}</p>

              <h2 className="text-lg font-bold text-blue-950 mb-2 group-hover:underline">
                {post.title}
              </h2>

              <p className="text-sm text-gray-600 leading-relaxed">
                {post.description}
              </p>

              <span className="mt-4 inline-block text-sm font-semibold text-blue-900">
                Devamını Oku →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
