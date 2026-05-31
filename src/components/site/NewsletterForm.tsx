"use client";

export function NewsletterForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex w-full max-w-md items-center gap-2 border-b border-navy pb-2"
    >
      <input
        type="email"
        required
        placeholder="you@taxpayer.com"
        className="flex-1 bg-transparent py-2 text-base text-navy placeholder:text-muted-foreground focus:outline-none"
      />
      <button
        type="submit"
        className="rounded-full bg-navy px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-paper hover:bg-navy-soft"
      >
        Subscribe
      </button>
    </form>
  );
}
