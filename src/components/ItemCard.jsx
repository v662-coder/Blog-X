import React, { useState } from "react";
import { Check, Pencil, Trash2 } from "lucide-react";
import { getCategory } from "../constants/categories";
import { useItems } from "../context/ItemsContext";

export default function ItemCard({ item, onEdit, showCategoryBadge = false, style }) {
  const { toggleStatus, deleteItem } = useItems();
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const cat = getCategory(item.category);
  const completed = item.status === "completed";
  const date = item.createdAt?.toDate ? item.createdAt.toDate() : null;

  const handleDeleteClick = () => {
    if (confirmingDelete) {
      deleteItem(item.id);
    } else {
      setConfirmingDelete(true);
      // auto-reset the confirm state so a stray later click doesn't delete
      setTimeout(() => setConfirmingDelete(false), 2500);
    }
  };

  return (
    <div
      style={style}
      className={`enter-item group flex items-start gap-3 rounded-xl border border-ink-900/10 bg-paper-50 p-4 shadow-card transition-all duration-300 hover:shadow-lg dark:border-paper-100/10 dark:bg-ink-800 ${
        completed ? "opacity-60" : ""
      }`}
    >
      {/* Complete toggle — a filled, animated checkmark circle */}
      <button
        onClick={() => toggleStatus(item)}
        aria-label={completed ? "Mark as pending" : "Mark as complete"}
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 active:scale-90 ${
          completed
            ? "border-transparent bg-emerald-500 text-white shadow-[0_0_0_4px_rgba(16,185,129,0.15)]"
            : "border-ink-900/25 text-transparent hover:scale-110 hover:border-wire hover:text-wire/40 dark:border-paper-100/25"
        }`}
      >
        <Check size={13} strokeWidth={3} className={completed ? "animate-pop-in" : ""} />
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className={`truncate font-semibold transition-all ${completed ? "line-through decoration-2 decoration-emerald-500" : ""}`}>
            {item.title}
          </h3>
          {showCategoryBadge && (
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
              style={{ backgroundColor: `${cat.color}1F`, color: cat.color }}
            >
              {cat.label}
            </span>
          )}
        </div>
        {item.description && (
          <p className="mt-1 text-sm text-ink-900/70 dark:text-paper-100/70">{item.description}</p>
        )}
        <div className="mt-2 flex items-center gap-2 font-mono text-[11px] text-ink-900/40 dark:text-paper-100/40">
          {date && <span>{date.toLocaleDateString(undefined, { month: "short", day: "numeric" })}</span>}
          <span>·</span>
          <span>{completed ? "Resolved" : "Open"}</span>
        </div>
      </div>

      {/* Action icons: always at least partly visible (not hidden until
          hover) so they're reachable on touch devices, and brighten with a
          quick scale/rotate on hover for the "attractive" feel requested. */}
      <div className="flex shrink-0 items-center gap-1 opacity-70 transition-opacity group-hover:opacity-100">
        <button
          onClick={() => onEdit(item)}
          aria-label="Edit item"
          title="Edit"
          className="rounded-md p-1.5 text-ink-900/50 transition-all duration-200 hover:-translate-y-0.5 hover:rotate-6 hover:bg-wire/15 hover:text-wire dark:text-paper-100/50"
        >
          <Pencil size={15} />
        </button>
        <button
          onClick={handleDeleteClick}
          aria-label={confirmingDelete ? "Confirm delete" : "Delete item"}
          title={confirmingDelete ? "Click again to confirm" : "Delete"}
          className={`rounded-md p-1.5 transition-all duration-200 ${
            confirmingDelete
              ? "scale-110 bg-red-500 text-white shadow-[0_0_0_4px_rgba(239,68,68,0.15)]"
              : "text-ink-900/50 hover:-translate-y-0.5 hover:scale-110 hover:bg-red-500/15 hover:text-red-500 dark:text-paper-100/50"
          }`}
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}