import React from "react";

export default function StatCard({ label, value, accent }) {
  return (
    <div className="rounded-xl border border-ink-900/10 bg-paper-50 p-4 shadow-card dark:border-paper-100/10 dark:bg-ink-800">
      <div className="font-mono text-[11px] uppercase tracking-widest text-ink-900/45 dark:text-paper-100/45">
        {label}
      </div>
      <div
        className="mt-1 font-display text-3xl font-semibold"
        style={accent ? { color: accent } : undefined}
      >
        {value}
      </div>
    </div>
  );
}
