import React from "react";
import { Search, X } from "lucide-react";
import { useItems } from "../context/ItemsContext";

export default function SearchBar() {
  const { search, setSearch } = useItems();

  return (
    <div className="relative">
      <Search
        size={15}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-900/40 dark:text-paper-100/40"
      />
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search every desk…"
        className="w-full rounded-full border border-ink-900/10 bg-paper-100 py-1.5 pl-8 pr-8 text-sm outline-none transition placeholder:text-ink-900/40 focus:border-wire dark:border-paper-100/10 dark:bg-ink-800 dark:placeholder:text-paper-100/40"
      />
      {search && (
        <button
          onClick={() => setSearch("")}
          aria-label="Clear search"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-900/40 hover:text-ink-900 dark:text-paper-100/40 dark:hover:text-paper-100"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
