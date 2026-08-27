import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutGrid } from "lucide-react";
import { CATEGORIES } from "../constants/categories";
import { useItems } from "../context/ItemsContext";

export default function Sidebar() {
  const { items } = useItems();

  const countFor = (id) => items.filter((i) => i.category === id).length;
  const openFor = (id) =>
    items.filter((i) => i.category === id && i.status !== "completed").length;

  const linkClasses = ({ isActive }) =>
    `group flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-ink-900 text-paper-100 dark:bg-paper-100 dark:text-ink-900"
        : "text-ink-900/75 hover:bg-ink-900/5 dark:text-paper-100/75 dark:hover:bg-paper-100/10"
    }`;

  return (
    <nav className="flex w-full flex-col gap-1 py-2 lg:w-56 lg:shrink-0 lg:py-6">
      <NavLink to="/" end className={linkClasses}>
        <span className="flex items-center gap-2">
          <LayoutGrid size={16} />
          Dashboard
        </span>
      </NavLink>

      <div className="mt-4 mb-1 px-3 font-mono text-[11px] uppercase tracking-widest text-ink-900/40 dark:text-paper-100/40">
        Desks
      </div>

      {CATEGORIES.map((cat) => {
        const Icon = cat.icon;
        const open = openFor(cat.id);
        return (
          <NavLink key={cat.id} to={`/desk/${cat.id}`} className={linkClasses}>
            <span className="flex items-center gap-2">
              <span
                className="flex h-6 w-6 items-center justify-center rounded-md"
                style={{ backgroundColor: `${cat.color}22`, color: cat.color }}
              >
                <Icon size={13} />
              </span>
              {cat.label}
            </span>
            <span className="font-mono text-xs text-ink-900/40 dark:text-paper-100/40">
              {open > 0 ? open : countFor(cat.id) > 0 ? "✓" : ""}
            </span>
          </NavLink>
        );
      })}
    </nav>
  );
}
