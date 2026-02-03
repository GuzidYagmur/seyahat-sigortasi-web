import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image";

type Frontmatter = {
  title?: string;
  description?: string;
  date?: string;
  image?: string;
};

type PostCard = {
  slug: string;
  title: string;
  description: string;
  date: string;
  image: string;
  readTime: number;
};

function formatDateTR(dateStr?: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);
}

function estimateReadingTime(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export default function BlogPage() {
  const blogDir = path.join(process.cwd(), "content/blog");

  const files = fs
    .readdirSync(blogDir)
    .filter((file) => file.endsWith(".mdx"));

  const posts: PostCard[] = files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const filePath = path.join(blogDir, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      const fm = data as Frontmatter;

      return {
        slug,
        title: fm.title ?? slug,
        description: (fm.description ?? "").trim(),
        date: fm.date ?? "",
        image: fm.image ?? "/images/default.png",
        readTime: estimateReadingTime(content),
      };
    })
    .sort((a, b) => Date.parse(b.date || "") - Date.parse(a.date || ""));

  return (
    <div className="min-h-screen bg-[#0b1220]">
      
      <header className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-[#0b1220]" />
          <div className="absolute -top-24 right-[-80px] h-72 w-72 rounded-full bg-blue-500/25 blur-3xl" />
          <div className="absolute -bottom-24 left-[-80px] h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:py-16">
          <nav className="text-sm text-white/75">
            <Link href="/" className="hover:text-white">
              Ana Sayfa
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/90">Blog</span>
          </nav>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:p-10">
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Sigorta Rehberi
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
              Gürcistan seyahat sağlık sigortası hakkında zorunluluklar, ipuçları ve
              güncel rehber içerikleri.
            </p>

            
          </div>
        </div>
      </header>

      
      <main className="mx-auto max-w-6xl px-4 pb-16">
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.6)] backdrop-blur hover:bg-white/10"
            >
              
              <div className="relative h-48 w-full">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 text-xs text-white/90">
                  {post.date && (
                    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 backdrop-blur">
                      {formatDateTR(post.date)}
                    </span>
                  )}
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 backdrop-blur">
                    {post.readTime} dk
                  </span>
                </div>
              </div>

              
              <div className="p-5">
                <h2 className="text-base font-extrabold leading-snug text-white group-hover:underline line-clamp-2">
                  {post.title}
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-white/70 line-clamp-3">
                  {post.description || "Bu yazıda seyahat sağlık sigortası hakkında faydalı bilgiler bulacaksın."}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-white/90">
                    Devamını oku →
                  </span>
                 
                </div>
              </div>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 text-white/80 backdrop-blur">
            Henüz yazı yok. <code className="text-white/90">content/blog</code> içine{" "}
            <code className="text-white/90">.mdx</code> dosyası ekleyin.
          </div>
        )}
      </main>
    </div>
  );
}