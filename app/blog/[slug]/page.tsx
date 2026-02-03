import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

type Frontmatter = {
  title?: string;
  description?: string;
  date?: string;
  image?: string;
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

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ slug?: string }>;
}) {
  const { slug: rawSlug } = await params;
  if (!rawSlug) notFound();

  const slug = decodeURIComponent(rawSlug);
  if (slug.includes("/") || slug.includes("\\") || slug.includes("..")) notFound();

  const blogDir = path.join(process.cwd(), "content/blog");
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".mdx"));
  const matched = files.find((f) => f.replace(/\.mdx$/, "") === slug);
  if (!matched) notFound();

  const filePath = path.join(blogDir, matched);
  const file = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(file);

  const fm = data as Frontmatter;
  const title = fm.title ?? "Blog";
  const description = (fm.description ?? "").trim();
  const cover = fm.image ?? "/images/default.png";
  const dateLabel = formatDateTR(fm.date);
  const readTime = estimateReadingTime(content);

  const related = files
    .map((f) => {
      const s = f.replace(/\.mdx$/, "");
      const c = fs.readFileSync(path.join(blogDir, f), "utf-8");
      const { data } = matter(c);
      const d = data as Frontmatter;
      return {
        slug: s,
        title: d.title ?? s,
        date: d.date ?? "",
        image: d.image ?? "/images/default.png",
      };
    })
    .filter((p) => p.slug !== slug)
    .sort((a, b) => Date.parse(b.date || "") - Date.parse(a.date || ""))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#0b1220]">
      {/* HERO */}
      <section className="relative">
        <div className="relative h-[340px] w-full sm:h-[420px]">
          <Image
            src={cover}
            alt={title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-[#0b1220]" />
          {/* Glow blobs */}
          <div className="absolute -top-24 right-[-80px] h-72 w-72 rounded-full bg-blue-500/25 blur-3xl" />
          <div className="absolute -bottom-24 left-[-80px] h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
        </div>

        {/* Top nav line */}
        <div className="absolute left-0 right-0 top-0">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 pt-6">
            

            <Link
              href="/blog"
              className="hidden rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur hover:bg-white/10 sm:inline-flex"
            >
              ← Diğer Bloglar
            </Link>
          </div>
        </div>

        {/* Hero content */}
        <div className="absolute inset-x-0 bottom-[-64px]">
          <div className="mx-auto max-w-6xl px-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:p-8">
              <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
                {title}
              </h1>

              {description && (
                <p className="mt-3 max-w-3xl text-base leading-relaxed text-white/80 sm:text-lg">
                  {description}
                </p>
              )}

              <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-white/85">
                {dateLabel && (
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    🗓️ {dateLabel}
                  </span>
                )}
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  ⏱️ {readTime} dk okuma
                </span>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
                >
                  Teklif Al
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/90 hover:bg-white/10"
                >
                  Tüm yazılar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BODY */}
      <main className="relative mx-auto max-w-6xl px-4 pb-16 pt-28">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-[-140px] top-10 h-[420px] w-[420px] rounded-full bg-blue-500/25 blur-3xl" />
          <div className="absolute right-[-160px] top-64 h-[460px] w-[460px] rounded-full bg-indigo-500/20 blur-3xl" />
         <div className="absolute left-1/3 bottom-[-180px] h-[520px] w-[520px] rounded-full bg-cyan-500/10 blur-3xl" />
        </div>
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] ">
          {/* CONTENT CARD */}
            <article className="rounded-3xl border border-white/12 bg-white/10 p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.85)] backdrop-blur-2xl sm:p-10 text-white">            
            <div className="prose prose-invert max-w-none prose-headings:scroll-mt-24 prose-a:text-sky-300 prose-a:no-underline hover:prose-a:underline prose-h2:mt-10 prose-h3:mt-8 prose-img:rounded-2xl">              <MDXRemote source={content} />
            </div>

            <div className="mt-12 border-t pt-6">
              <Link
                href="/blog"
                className="inline-flex items-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
              >
                ← Blog’a geri dön
              </Link>
            </div>
          </article>

          {/* RIGHT PANEL (desktop) */}
          <aside className="hidden lg:block space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-[0_20px_60px_-40px_rgba(0,0,0,0.6)] backdrop-blur">
              <h3 className="text-sm font-bold text-white/95">Hızlı işlem</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Seyahat sağlık sigortası teklifini birkaç adımda al.
              </p>
              <div className="mt-4 grid gap-3">
                <Link
                  href="/"
                  className="rounded-2xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-blue-500"
                >
                  Teklif Al
                </Link>
                <Link
                  href="/blog"
                  className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-white/90 hover:bg-white/10"
                >
                  Blog’a Dön
                </Link>
              </div>
            </div>

            {related.length > 0 && (
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-[0_20px_60px_-40px_rgba(0,0,0,0.6)] backdrop-blur">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white/95">Diğer yazılar</h3>
                  <Link href="/blog" className="text-sm font-semibold text-white/75 hover:text-white">
                    Tümü
                  </Link>
                </div>

                <div className="mt-4 space-y-4">
                  {related.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 hover:bg-white/10"
                    >
                      <div className="relative h-14 w-16 overflow-hidden rounded-xl border border-white/10">
                        <Image src={p.image} alt={p.title} fill className="object-cover" sizes="64px" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white group-hover:underline">
                          {p.title}
                        </p>
                        <p className="mt-0.5 text-xs text-white/60">{formatDateTR(p.date)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>

        
        {related.length > 0 && (
          <section className="mt-10 lg:hidden">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-extrabold text-white">Diğer yazılar</h3>
              <Link href="/blog" className="text-sm font-semibold text-white/75 hover:text-white">
                Tümünü gör
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.6)] backdrop-blur hover:bg-white/10"
                >
                  <div className="relative h-40 w-full">
                    <Image src={p.image} alt={p.title} fill className="object-cover" sizes="100vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-white/65">{formatDateTR(p.date)}</p>
                    <p className="mt-1 line-clamp-2 text-sm font-bold text-white group-hover:underline">
                      {p.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}