import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { createMetadata } from "@/lib/metadata";
import {
  getAllPublishedPosts,
  getPublishedPostBySlug,
  getRelatedPosts,
  type BlogPost,
} from "@/lib/blog";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SITE_URL } from "@/lib/constants";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPublishedPosts().map(function (post) {
    return { slug: post.slug };
  });
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPublishedPostBySlug(slug);
  if (!post) {
    return createMetadata({
      title: "Post Not Found",
      description: "This post doesn't exist.",
      path: `/blog/${slug}`,
    });
  }
  return createMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    ogImage: post.image,
  });
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function underlineLastWord(title: string) {
  const words = title.trim().split(" ");
  if (words.length === 1) {
    return <span className="brand-underline">{words[0]}</span>;
  }
  const head = words.slice(0, -1).join(" ");
  const last = words[words.length - 1];
  return (
    <>
      {head} <span className="brand-underline">{last}</span>
    </>
  );
}

import type { ComponentPropsWithoutRef } from "react";

const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="text-3xl font-bold text-heading mt-12 mb-4 tracking-tight"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="text-2xl font-bold text-heading mt-8 mb-3" {...props} />
  ),
  h4: (props: ComponentPropsWithoutRef<"h4">) => (
    <h4 className="text-xl font-semibold text-heading mt-6 mb-2" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="text-body leading-relaxed my-5 text-lg" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="text-body my-5 ml-6 list-disc space-y-2" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="text-body my-5 ml-6 list-decimal space-y-2" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="text-body leading-relaxed text-lg" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a
      className="text-brand-400 hover:text-brand-300 underline underline-offset-4"
      {...props}
    />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="border-l-4 border-brand-500 pl-6 my-6 italic text-subtle"
      {...props}
    />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      className="px-1.5 py-0.5 rounded bg-surface-100 border border-surface-200 text-sm text-subtle"
      {...props}
    />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="my-6 p-5 rounded-xl bg-surface-100 border border-surface-200 overflow-x-auto text-sm"
      {...props}
    />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="text-heading font-semibold" {...props} />
  ),
  hr: (props: ComponentPropsWithoutRef<"hr">) => (
    <hr className="my-10 border-surface-200" {...props} />
  ),
};

function TagPills({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map(function (tag) {
        return (
          <span
            key={tag}
            className="inline-flex items-center rounded-full border border-surface-200 bg-surface-100 px-3 py-1 text-xs font-medium text-subtle"
          >
            {tag}
          </span>
        );
      })}
    </div>
  );
}

function RelatedCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-surface-200 bg-surface-50 p-6 transition-colors hover:border-brand-500/40"
    >
      <div className="mb-3">
        <TagPills tags={post.tags ?? []} />
      </div>
      <h3 className="text-lg font-bold text-heading tracking-tight mb-2 leading-snug group-hover:text-brand-400 transition-colors">
        {post.title}
      </h3>
      <p className="text-body text-sm leading-relaxed line-clamp-3">
        {post.description}
      </p>
    </Link>
  );
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPublishedPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Cortex Automations",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo-icon.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    keywords: (post.tags ?? []).join(", "),
    image: post.image ? [post.image] : [`${SITE_URL}/og`],
  };

  // JSON-LD is generated from trusted server-side frontmatter and safely
  // serialized via JSON.stringify — this is the standard Next.js pattern.
  const jsonLdHtml = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: jsonLdHtml }}
      />

      {/* HERO */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden bg-surface-0 border-b border-surface-200">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <ScrollReveal>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-brand-400 transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all posts
            </Link>

            <div className="mb-6">
              <TagPills tags={post.tags ?? []} />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-heading mb-6 tracking-tight leading-tight">
              {underlineLastWord(post.title)}
            </h1>

            <p className="text-body text-lg md:text-xl leading-relaxed mb-8 max-w-3xl">
              {post.description}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
              <span className="text-subtle font-medium">{post.author}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {post.readingTime}
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 md:py-20 bg-surface-0">
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal>
            <article className="blog-content">
              <MDXRemote
                source={post.content}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    rehypePlugins: [
                      [
                        rehypePrettyCode,
                        { theme: "github-dark", keepBackground: false },
                      ],
                    ],
                  },
                }}
              />
            </article>
          </ScrollReveal>
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="section-padding bg-surface-50 border-t border-surface-200">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
                <h2 className="text-3xl md:text-4xl font-bold text-heading tracking-tight">
                  Keep reading
                </h2>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 text-sm font-medium"
                >
                  All posts
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map(function (rp) {
                  return <RelatedCard key={rp.slug} post={rp} />;
                })}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}
    </>
  );
}
