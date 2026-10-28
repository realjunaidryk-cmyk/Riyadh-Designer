"use client";

import Link from "next/link";
import { Fragment, useEffect, useState, type ReactNode } from "react";
import { CloseIcon } from "./Icons";

type Item = { slug: string; category: string; groups: string[]; card: ReactNode };
type Labels = {
  filterLabel: string;
  empty: string;
  emptyCta: string;
  count: string[];
  all: string;
};

// Filters the project grid by group (All, Residential, …) or by a single room category from ?category=.
export function ProjectsBrowser({
  items,
  groups,
  categories,
  labels,
  contactHref,
}: {
  items: Item[];
  groups: { id: string; label: string }[];
  categories: Record<string, string>;
  labels: Labels;
  contactHref: string;
}) {
  const [group, setGroup] = useState("all");
  const [category, setCategory] = useState<string | null>(null);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const c = q.get("category");
    const g = q.get("group");
    if (c && categories[c]) setCategory(c);
    else if (g && groups.some((x) => x.id === g)) setGroup(g);
  }, [categories, groups]);

  const choose = (id: string) => {
    setGroup(id);
    setCategory(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("category");
    if (id === "all") url.searchParams.delete("group");
    else url.searchParams.set("group", id);
    window.history.replaceState(null, "", url);
  };

  const shown = items.filter((it) =>
    category ? it.category === category : group === "all" || it.groups.includes(group),
  );
  const n = shown.length;

  return (
    <div>
      <div className="filters" role="group" aria-label={labels.filterLabel}>
        {groups.map((g) => (
          <button
            key={g.id}
            type="button"
            className="filter"
            aria-pressed={!category && group === g.id}
            onClick={() => choose(g.id)}
          >
            {g.label}
          </button>
        ))}
        {category && (
          <button type="button" className="filter filter-clear" aria-pressed="true" onClick={() => choose("all")}>
            {categories[category]}
            <CloseIcon />
          </button>
        )}
      </div>
      <p className="filter-status" aria-live="polite">
        {category ? `${categories[category]} · ` : ""}
        {labels.count[Math.min(n, labels.count.length - 1)].replace("{n}", String(n))}
      </p>
      {n > 0 ? (
        <div className="proj-grid">{shown.map((it) => <Fragment key={it.slug}>{it.card}</Fragment>)}</div>
      ) : (
        <div className="empty">
          <p className="serif h3">{labels.empty}</p>
          <Link className="btn btn-primary" href={contactHref}>
            {labels.emptyCta}
          </Link>
        </div>
      )}
    </div>
  );
}
