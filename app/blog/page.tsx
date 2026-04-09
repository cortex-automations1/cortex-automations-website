import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Clock } from "lucide-react";
import { createMetadata } from "@/lib/metadata";
import { getAllPublishedPosts, type BlogPost } from "@/lib/blog";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/scroll-reveal";

export const metadata: Metadata = createMetadata({
  title: "Blog",
  description:
    "Insights on custom software development, AI automation, and building great web apps.",
  path: "/blog",
});

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function PostMeta({ post }: { post: BlogPost }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
      <span className="text-subtle font-medium">{post.author}</span>
      <span aria-hidden="true">·</span>
      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
      <span aria-hidden="true">·</span>
      <span className="inline-flex items-center gap-1.5">
        <Clock className="h-3.5 w-3.5" />
        {post.readingTime}
      </span>
    </div>
  );
}

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

function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-2xl border border-surface-200 bg-surface-50 p-8 md:p-12 transition-colors hover:border-brand-500/40"
    >
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center rounded-full bg-brand-500/10 border border-brand-500/30 px-3 py-1 text-xs font-semibold text-brand-400 uppercase tracking-wide">
          Featured
        </span>
        <TagPills tags={post.tags ?? []} />
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-heading tracking-tight mb-4 leading-tight group-hover:text-brand-400 transition-colors">
        {post.title}
      </h2>
      <p className="text-body text-lg leading-relaxed max-w-3xl mb-6">
        {post.description}
      </p>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <PostMeta post={post} />
        <span className="inline-flex items-center gap-2 text-brand-400 font-medium text-sm group-hover:gap-3 transition-all">
          Read post
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-surface-200 bg-surface-50 p-7 transition-colors hover:border-brand-500/40"
    >
      <div className="mb-4">
        <TagPills tags={post.tags ?? []} />
      </div>
      <h3 className="text-xl font-bold text-heading tracking-tight mb-3 leading-snug group-hover:text-brand-400 transition-colors">
        {post.title}
      </h3>
      <p className="text-body leading-relaxed mb-6 flex-1">
        {post.description}
      </p>
      <PostMeta post={post} />
    </Link>
  );
}

export default function BlogIndexPage() {
  const posts = getAllPublishedPosts();
  const featured = posts.find((p) => p.featured);
  const rest = featured ? posts.filter((p) => p.slug !== featured.slug) : posts;

  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden bg-surface-0 border-b border-surface-200">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <ScrollReveal>
            <h1 className="text-5xl md:text-7xl font-bold text-heading mb-6 tracking-tight max-w-4xl leading-tight">
              Notes from the <span className="brand-underline">build</span>
            </h1>
            <p className="text-body text-lg md:text-xl max-w-2xl leading-relaxed">
              Technical case studies, opinions on the tools we use, and honest
              advice from shipping real software for real clients.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* POSTS */}
      <section className="section-padding bg-surface-0">
        <div className="max-w-7xl mx-auto px-6">
          {posts.length === 0 ? (
            <ScrollReveal>
              <div className="rounded-2xl border border-surface-200 bg-surface-50 p-12 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-heading mb-3">
                  No posts yet
                </h2>
                <p className="text-body text-lg max-w-xl mx-auto">
                  We&apos;re working on some. Check back soon — or{" "}
                  <Link
                    href="/contact"
                    className="text-brand-400 hover:text-brand-300 underline underline-offset-4"
                  >
                    get in touch
                  </Link>{" "}
                  if there&apos;s a topic you want us to write about.
                </p>
              </div>
            </ScrollReveal>
          ) : (
            <>
              {featured && (
                <ScrollReveal>
                  <div className="mb-16">
                    <FeaturedCard post={featured} />
                  </div>
                </ScrollReveal>
              )}

              {rest.length > 0 && (
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map(function (post) {
                    return (
                      <StaggerItem key={post.slug}>
                        <PostCard post={post} />
                      </StaggerItem>
                    );
                  })}
                </StaggerContainer>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
