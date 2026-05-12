import { z } from "zod";

/**
 * Blog draft filename — must match the YYYY-MM-DD-<kebab-slug>.mdx convention.
 * Rejects anything containing path separators or traversal sequences.
 */
export const draftFilenameSchema = z
  .string()
  .min(20)
  .max(150)
  .regex(/^\d{4}-\d{2}-\d{2}-[a-z0-9]+(?:-[a-z0-9]+)*\.mdx$/);

/**
 * MDX content body. Caps at 500 KB to bound Lambda payload and GitHub blob
 * size; tighten if individual posts ever exceed this.
 */
export const draftContentSchema = z.string().min(1).max(500_000);

export const publishOrUpdateBodySchema = z.object({
  filename: draftFilenameSchema,
  content: draftContentSchema,
});

export const deleteBodySchema = z.object({
  filename: draftFilenameSchema,
});
