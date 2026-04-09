import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/admin-auth";

export const metadata = {
  title: "Admin Login — Cortex Automations",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAuthenticated()) {
    redirect("/admin/blog");
  }

  const { error } = await searchParams;

  return (
    <div className="w-full max-w-sm mx-auto">
      <h1 className="text-3xl font-bold text-heading mb-2 tracking-tight">
        Admin Login
      </h1>
      <p className="text-body text-sm mb-8">
        Enter the admin password to continue.
      </p>

      <form action="/api/admin/login" method="POST" className="space-y-4">
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-subtle mb-2"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoFocus
            required
            className="w-full rounded-lg border border-surface-200 bg-surface-100 px-4 py-3 text-heading placeholder:text-muted focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>

        {error && (
          <p className="text-sm text-red-400">
            {error === "invalid" ? "Incorrect password." : "Login failed."}
          </p>
        )}

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-medium transition-colors"
        >
          Log in
        </button>
      </form>
    </div>
  );
}
