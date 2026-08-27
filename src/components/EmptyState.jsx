import React from "react";
import { Plus } from "lucide-react";

export default function EmptyState({ label, onAdd }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-900/15 py-16 text-center dark:border-paper-100/15">
      <p className="font-display text-lg text-ink-900/60 dark:text-paper-100/60">
        This desk is quiet.
      </p>
      <p className="mt-1 max-w-xs text-sm text-ink-900/45 dark:text-paper-100/45">
        Nothing filed under {label} yet. Add the first item to start the log.
      </p>
      <button
        onClick={onAdd}
        className="mt-4 flex items-center gap-1.5 rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-paper-100 transition hover:bg-ink-700 dark:bg-wire dark:text-ink-950 dark:hover:bg-wire/90"
      >
        <Plus size={14} /> Add item
      </button>
    </div>
  );
}
