"use client";

import { useState } from "react";
import { SERVICES } from "@/lib/constants";

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  message: string;
}

const INITIAL_FORM: FormData = {
  name: "",
  email: "",
  company: "",
  phone: "",
  service: "",
  message: "",
};

export function LeadForm() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setForm(function (prev) {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setForm(INITIAL_FORM);
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="card-gradient-border p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
          <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-white">
          Thanks! We&apos;ll be in touch within 24 hours.
        </h3>
        <p className="mt-2 text-sm text-neutral-400">
          We&apos;ve received your message and will get back to you shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-brand-400 hover:text-brand-300"
        >
          Send another message
        </button>
      </div>
    );
  }

  const inputClasses =
    "mt-1.5 block w-full rounded-lg border border-white/10 bg-surface-200 px-3.5 py-2.5 text-sm text-white shadow-sm placeholder:text-neutral-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-neutral-300">
          Name <span className="text-red-400">*</span>
        </label>
        <input type="text" id="name" name="name" required value={form.name} onChange={handleChange} className={inputClasses} placeholder="Your name" />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-neutral-300">
          Email <span className="text-red-400">*</span>
        </label>
        <input type="email" id="email" name="email" required value={form.email} onChange={handleChange} className={inputClasses} placeholder="you@company.com" />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-neutral-300">
          Company <span className="text-red-400">*</span>
        </label>
        <input type="text" id="company" name="company" required value={form.company} onChange={handleChange} className={inputClasses} placeholder="Your company" />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-neutral-300">
          Phone <span className="text-neutral-600">(optional)</span>
        </label>
        <input type="tel" id="phone" name="phone" value={form.phone} onChange={handleChange} className={inputClasses} placeholder="+1 (555) 000-0000" />
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium text-neutral-300">
          Service Interest <span className="text-red-400">*</span>
        </label>
        <select id="service" name="service" required value={form.service} onChange={handleChange} className={inputClasses}>
          <option value="">Select a service</option>
          {SERVICES.map(function (service) {
            return (
              <option key={service.slug} value={service.slug}>
                {service.name}
              </option>
            );
          })}
          <option value="other">Other / Not sure</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-neutral-300">
          Message <span className="text-red-400">*</span>
        </label>
        <textarea id="message" name="message" required rows={4} value={form.message} onChange={handleChange} className={`${inputClasses} resize-none`} placeholder="Tell us about your project..." />
      </div>

      {status === "error" && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
