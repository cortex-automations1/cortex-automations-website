"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Loader2, CheckCircle2 } from "lucide-react";

type Status = "idle" | "generating" | "success" | "error";

interface GenerateResponse {
  success?: boolean;
  post?: { title: string; slug: string };
  error?: string;
}

export function GenerateButton() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [postTitle, setPostTitle] = useState<string | null>(null);

  async function handleClick() {
    setStatus("generating");
    setMessage(null);
    setPostTitle(null);

    try {
      const res = await fetch("/api/admin/blog/generate-new", {
        method: "POST",
      });

      const data = (await res.json()) as GenerateResponse;

      if (!res.ok || !data.success) {
        throw new Error(data.error ?? `Generation failed (${res.status})`);
      }

      setStatus("success");
      setPostTitle(data.post?.title ?? "New draft");
      router.refresh();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Generation failed");
    }
  }

  return (
    <div className="flex flex-col items-end gap-3">
      <button
        type="button"
        onClick={handleClick}
        disabled={status === "generating"}
        className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {status === "generating" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Generating (30-60s)...
          </>
        ) : status === "success" ? (
          <>
            <CheckCircle2 className="w-4 h-4" />
            Generated
          </>
        ) : (
          <>
            <Plus className="w-4 h-4" />
            Generate New Blog
          </>
        )}
      </button>

      {status === "generating" && (
        <p className="text-muted text-xs max-w-xs text-right">
          Claude is drafting the post and committing it to the repo. Don&apos;t close this tab.
        </p>
      )}

      {status === "success" && (
        <div className="text-right max-w-xs">
          {postTitle && (
            <p className="text-subtle text-xs font-medium mb-1 line-clamp-2">
              &ldquo;{postTitle}&rdquo;
            </p>
          )}
          <p className="text-brand-400 text-xs">
            Draft committed. It will appear below once Vercel redeploys (~1-2 min). Refresh then.
          </p>
        </div>
      )}

      {status === "error" && message && (
        <p className="text-red-400 text-xs max-w-xs text-right">
          {message}
        </p>
      )}
    </div>
  );
}
