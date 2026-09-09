import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Car,
  CheckSquare,
  Crosshair,
  Home,
  Layers,
  Search,
  UserSearch,
} from "lucide-react";
import { AppShell, PageFrame } from "@/components/layout/shell";
import {
  CARD_LIST,
  CARDS,
  type CardId,
  type FilterKey,
  type TacticCard,
} from "@/data/cards";
import {
  getProgress,
  unfinishedCards,
  useTacticsStore,
} from "@/lib/tactics-store";
import { cn, formatRelative } from "@/lib/utils";

export const Route = createFileRoute("/tactics/")({ component: TacticsDirectory });

const FILTERS: { key: "all" | FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "control-room", label: "Control Room" },
  { key: "fim", label: "FIM" },
  { key: "high-risk", label: "High Risk" },
  { key: "supervisory", label: "Supervisory" },
];

const ICONS = {
  crosshair: Crosshair,
  "user-search": UserSearch,
  home: Home,
  car: Car,
};

const ACCENT = {
  red: {
    bar: "bg-danger",
    icon: "bg-danger-bg text-danger",
  },
  blue: {
    bar: "bg-accent",
    icon: "bg-tint text-accent",
  },
  orange: {
    bar: "bg-amber",
    icon: "bg-amber-bg text-amber",
  },
  purple: {
    bar: "bg-plum",
    icon: "bg-plum-bg text-plum",
  },
};

function TacticsDirectory() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | FilterKey>("all");
  const cardsState = useTacticsStore((s) => s.cards);
  const recent = useTacticsStore((s) => s.recent);
  const hydrated = useTacticsStore((s) => s.hydrated);
  const store = useTacticsStore();

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    let list: TacticCard[] = CARD_LIST;
    if (filter !== "all") list = list.filter((c) => c.filters.includes(filter));
    if (query) {
      list = list.filter((c) => {
        if (
          c.title.toLowerCase().includes(query) ||
          c.ref.toLowerCase().includes(query) ||
          c.subtitle.toLowerCase().includes(query)
        )
          return true;
        return c.sections.some(
          (s) =>
            s.title.toLowerCase().includes(query) ||
            s.items.some((i) => i.toLowerCase().includes(query)),
        );
      });
    }
    return list;
  }, [q, filter]);

  const searchHits = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (query.length < 2) return [];
    const hits: { cardId: CardId; cardTitle: string; path: string; text: string }[] =
      [];
    CARD_LIST.forEach((card) => {
      if (
        card.title.toLowerCase().includes(query) ||
        card.ref.toLowerCase().includes(query)
      ) {
        hits.push({
          cardId: card.id,
          cardTitle: card.title,
          path: "Card",
          text: card.title,
        });
      }
      card.sections.forEach((sec) => {
        if (sec.title.toLowerCase().includes(query)) {
          hits.push({
            cardId: card.id,
            cardTitle: card.title,
            path: sec.title,
            text: sec.title,
          });
        }
        sec.items.forEach((item) => {
          if (item.toLowerCase().includes(query)) {
            hits.push({
              cardId: card.id,
              cardTitle: card.title,
              path: sec.title,
              text: item,
            });
          }
        });
      });
    });
    return hits.slice(0, 12);
  }, [q]);

  const unfinished = hydrated ? unfinishedCards(store) : [];

  return (
    <AppShell>
      <PageFrame>
        <div className="mb-5">
          <Link
            to="/"
            className="mb-2 inline-flex items-center gap-1 text-[13px] text-accent no-underline hover:underline"
          >
            <ArrowLeft className="size-3.5" /> Home
          </Link>
          <h1 className="text-[26px] font-bold tracking-tight">Tactics Directory</h1>
          <p className="mt-0.5 text-[15px] font-medium text-muted">
            Control Room Action Cards
          </p>
        </div>

        <div className="mb-5 rounded-sm border border-accent/25 bg-tint px-4 py-3.5 text-[13.5px] leading-relaxed text-[#1a3a5c]">
          Operational checklists and control-room prompts for managing priority
          incidents. These cards support, but do not replace, force policy, APP,
          supervisor direction or specialist procedures.
        </div>

        <div className="relative mb-4">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search tactics..."
            aria-label="Search tactics"
            className="w-full rounded-sm border border-line bg-paper py-2.5 pr-3 pl-10 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
          {q.trim().length >= 2 ? (
            <div className="absolute z-20 mt-1 max-h-80 w-full overflow-y-auto rounded-sm border border-line bg-paper shadow-md">
              {searchHits.length === 0 ? (
                <div className="px-3.5 py-2.5 text-[13.5px] text-muted">No results</div>
              ) : (
                searchHits.map((h, i) => (
                  <Link
                    key={`${h.cardId}-${i}`}
                    to="/tactics/$cardId"
                    params={{ cardId: h.cardId }}
                    className="block border-b border-line/40 px-3.5 py-2.5 text-[13.5px] text-ink no-underline last:border-0 hover:bg-tint"
                  >
                    <div className="text-xs font-semibold text-accent">{h.cardTitle}</div>
                    <div className="text-xs text-muted">{h.path}</div>
                    <div>{h.text}</div>
                  </Link>
                ))
              )}
            </div>
          ) : null}
        </div>

        <div className="mb-6 flex flex-wrap gap-1.5" role="group" aria-label="Filter tactics">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={cn(
                "rounded-sm border px-3.5 py-1.5 text-[13px] font-medium",
                filter === f.key
                  ? "border-accent bg-accent text-paper"
                  : "border-line bg-paper text-muted hover:text-ink",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-sm border border-line bg-paper px-4 py-4">
            <h2 className="mb-3 text-xs font-semibold tracking-wide text-muted uppercase">
              Continue Previous Card
            </h2>
            {unfinished.length === 0 ? (
              <p className="text-[13px] text-muted">No unfinished cards.</p>
            ) : (
              unfinished.slice(0, 3).map((u) => (
                <div
                  key={u.card.id}
                  className="flex items-center justify-between border-b border-line/50 py-2 last:border-0"
                >
                  <div>
                    <div className="text-[13.5px] font-semibold">{u.card.title}</div>
                    <div className="text-xs text-muted">
                      {u.prog.done} / {u.prog.total} completed
                    </div>
                  </div>
                  <Link
                    to="/tactics/$cardId"
                    params={{ cardId: u.card.id }}
                    className="rounded-sm border border-accent px-2.5 py-1 text-xs font-semibold text-accent no-underline hover:bg-tint"
                  >
                    Continue →
                  </Link>
                </div>
              ))
            )}
          </div>
          <div className="rounded-sm border border-line bg-paper px-4 py-4">
            <h2 className="mb-3 text-xs font-semibold tracking-wide text-muted uppercase">
              Recently Used
            </h2>
            {!hydrated || recent.length === 0 ? (
              <p className="text-[13px] text-muted">
                Recently used tactics will appear here.
              </p>
            ) : (
              recent.slice(0, 5).map((r) => (
                <Link
                  key={r.id}
                  to="/tactics/$cardId"
                  params={{ cardId: r.id }}
                  className="flex items-center justify-between border-b border-line/50 py-2 text-[13.5px] text-ink no-underline last:border-0 hover:text-accent"
                >
                  <span className="font-medium">{CARDS[r.id].title}</span>
                  <span className="text-xs text-muted">{formatRelative(r.at)}</span>
                </Link>
              ))
            )}
          </div>
        </div>

        {results.length === 0 ? (
          <div className="py-12 text-center text-muted">
            <div className="font-semibold">No tactics found</div>
            <div className="mt-1 text-[13.5px]">Try another search term.</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {results.map((c) => {
              const Icon = ICONS[c.icon];
              const acc = ACCENT[c.accent];
              const prog = getProgress(c, cardsState[c.id].checks);
              return (
                <Link
                  key={c.id}
                  to="/tactics/$cardId"
                  params={{ cardId: c.id }}
                  className="relative overflow-hidden rounded-sm border border-line bg-paper p-5 text-ink no-underline transition-shadow hover:shadow-md"
                >
                  <span className={cn("absolute top-0 left-0 h-full w-1", acc.bar)} />
                  <div className="flex items-start gap-3">
                    <span
                      className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded-sm",
                        acc.icon,
                      )}
                    >
                      <Icon className="size-[18px]" />
                    </span>
                    <div>
                      <h3 className="text-base font-bold leading-snug">{c.title}</h3>
                      <p className="text-[13px] text-muted">{c.subtitle}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-4 text-[12.5px] text-muted">
                    <span className="inline-flex items-center gap-1">
                      <Layers className="size-3.5" /> {c.sections.length} sections
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <CheckSquare className="size-3.5" /> {prog.total} checks
                    </span>
                  </div>
                  <div className="mt-3 text-xs font-semibold tracking-wide text-muted">
                    {c.ref}
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1.5 rounded-sm bg-accent px-4 py-2 text-[13.5px] font-semibold text-paper">
                    Open Action Card <ArrowRight className="size-3.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </PageFrame>
    </AppShell>
  );
}
