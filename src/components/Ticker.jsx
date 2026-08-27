import React from "react";
import { getCategory } from "../constants/categories";

// The signature element: a wire-service ticker reporting the desk's own
// recent activity back at the user, the way a newsroom ticker reports the
// wider world. Duplicated content + -50% translateX keyframe = seamless loop.
export default function Ticker({ items }) {
  const recent = items.slice(0, 10);

  if (recent.length === 0) {
    return (
      <div className="border-y border-ink-200/10 bg-ink-950 text-paper-100 dark:bg-black">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2 text-xs font-mono tracking-wide text-paper-100/60">
          <span className="rounded bg-wire px-1.5 py-0.5 font-semibold text-ink-950">LIVE</span>
          <span>Nothing on the wire yet — add your first item to a desk below.</span>
        </div>
      </div>
    );
  }

  const renderEntries = (keyPrefix) =>
    recent.map((item, i) => {
      const cat = getCategory(item.category);
      return (
        <span key={`${keyPrefix}-${item.id}-${i}`} className="mx-6 inline-flex items-center gap-2 whitespace-nowrap">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: cat.color }}
            aria-hidden="true"
          />
          <span className="font-semibold uppercase tracking-wide" style={{ color: cat.color }}>
            {cat.label}
          </span>
          <span className="text-paper-100/90">{item.title}</span>
          <span className="text-paper-100/40">
            {item.status === "completed" ? "· resolved" : "· open"}
          </span>
        </span>
      );
    });

  return (
    <div className="overflow-hidden border-y border-ink-200/10 bg-ink-950 text-paper-100 dark:bg-black">
      <div className="mx-auto flex max-w-6xl items-center">
        <span className="z-10 flex shrink-0 items-center gap-1.5 bg-ink-950 py-2 pr-4 text-xs font-mono font-semibold tracking-wide text-wire dark:bg-black">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-wire" />
          ON THE DESK
        </span>
        <div className="flex overflow-hidden py-2 text-xs font-mono">
          <div className="flex animate-ticker">
            {renderEntries("a")}
            {renderEntries("b")}
          </div>
        </div>
      </div>
    </div>
  );
}
