import React from "react";
import { Check, Pencil, Trash2 } from "lucide-react";
import { getCategory } from "../constants/categories";
import { useItems } from "../context/ItemsContext";

export default function ItemCard({ item, onEdit, showCategoryBadge = false }) {
  const { toggleStatus, deleteItem } = useItems();
  const cat = getCategory(item.category);
  const completed = item.status === "completed";
  const date = item.createdAt?.toDate ? item.createdAt.toDate() : null;

  return (
    <div
      className={`group flex items-start gap-3 rounded-xl border border-ink-900/10 bg-paper-50 p-4 shadow-card transition dark:border-paper-100/10 dark:bg-ink-800 ${
        completed ? "opacity-60" : ""
      }`}
    >
      <button
        onClick={() => toggleStatus(item)}
        aria-label={completed ? "Mark as pending" : "Mark as complete"}
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
          completed
            ? "border-transparent bg-emerald-500 text-white"
            : "border-ink-900/25 text-transparent hover:border-wire dark:border-paper-100/25"
        }`}
      >
        <Check size={12} strokeWidth={3} />
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className={`truncate font-semibold ${completed ? "line-through decoration-2" : ""}`}>
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

      <div className="flex shrink-0 items-center gap-1 opacity-0 transition group-hover:opacity-100">
        <button
          onClick={() => onEdit(item)}
          aria-label="Edit item"
          className="rounded-md p-1.5 text-ink-900/50 hover:bg-ink-900/5 hover:text-ink-900 dark:text-paper-100/50 dark:hover:bg-paper-100/10 dark:hover:text-paper-100"
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={() => deleteItem(item.id)}
          aria-label="Delete item"
          className="rounded-md p-1.5 text-ink-900/50 hover:bg-red-500/10 hover:text-red-500 dark:text-paper-100/50"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
