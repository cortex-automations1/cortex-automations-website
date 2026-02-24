"use client";

import { useState } from "react";
import { User, Mail, Building, Phone, Layers, MessageSquare, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
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

export function LeadForm({ initialService = "" }: { initialService?: string }) {
  const [form, setForm] = useState<FormData>({ ...INITIAL_FORM, service: initialService });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(function (prev) { return { ...prev, [e.target.name]: e.target.value }; });
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
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center animate-fade-in">
        <div className="w-16 h-16 bg-brand-500/10 border border-brand-500/20 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-8 h-8 text-brand-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Transmission Received</h3>
        <p className="text-neutral-400 max-w-sm mb-8">
          Your project parameters have been routed to our engineering team. We will review your
          requirements and reach out within 24 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-sm font-medium text-brand-400 hover:text-brand-300 transition-colors"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  const inputClasses = "mt-2 block w-full rounded-lg border border-surface-200 bg-surface-100 px-4 py-3 text-sm text-white transition-all placeholder:text-neutral-600 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:opacity-50";
  const labelClasses = "flex items-center gap-2 text-sm font-medium text-neutral-300";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-8 animate-fade-in">

      {/* Name & Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className={labelClasses}>
            <User className="w-4 h-4 text-brand-500" /> Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            disabled={status === "loading"}
            value={form.name}
            onChange={handleChange}
            placeholder="John Doe"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>
            <Mail className="w-4 h-4 text-brand-500" /> Work Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            disabled={status === "loading"}
            value={form.email}
            onChange={handleChange}
            placeholder="john@company.com"
            className={inputClasses}
          />
        </div>
      </div>

      {/* Company & Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="company" className={labelClasses}>
            <Building className="w-4 h-4 text-brand-500" /> Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            required
            disabled={status === "loading"}
            value={form.company}
            onChange={handleChange}
            placeholder="Acme Corp"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClasses}>
            <Phone className="w-4 h-4 text-brand-500" /> Phone (Optional)
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            disabled={status === "loading"}
            value={form.phone}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            className={inputClasses}
          />
        </div>
      </div>

      {/* Service Dropdown */}
      <div>
        <label htmlFor="service" className={labelClasses}>
          <Layers className="w-4 h-4 text-brand-500" /> Architecture Required
        </label>
        <select
          id="service"
          name="service"
          required
          disabled={status === "loading"}
          value={form.service}
          onChange={handleChange}
          className={inputClasses}
        >
          <option value="" disabled className="text-neutral-500">
            Select a primary focus area...
          </option>
          {SERVICES.map(function (service) {
            return (
              <option key={service.slug} value={service.slug}>
                {service.name}
              </option>
            );
          })}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelClasses}>
          <MessageSquare className="w-4 h-4 text-brand-500" /> Project Scope &amp; Details
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          disabled={status === "loading"}
          value={form.message}
          onChange={handleChange}
          placeholder="Briefly describe your goals, current stack, and timeline..."
          className={`${inputClasses} resize-none`}
        />
      </div>

      {/* Error State */}
      {status === "error" && (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm animate-fade-in">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p>{errorMessage}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-bold transition-colors disabled:opacity-70 disabled:cursor-not-allowed group"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Transmitting...
          </>
        ) : (
          <>
            Initialize Protocol
            <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </>
        )}
      </button>
    </form>
  );
}
