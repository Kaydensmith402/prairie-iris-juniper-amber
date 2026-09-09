import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRightLeft,
  Clock,
  Plus,
  Printer,
  RotateCcw,
  Save,
  Download,
} from "lucide-react";
import { toast } from "sonner";
import { CARDS, GOLDEN_QUESTIONS, checkKey, type CardId } from "@/data/cards";
import {
  STATUS_META,
  getProgress,
  useTacticsStore,
  type CommandStructure,
  type Decision,
  type IncidentStatus,
  type RiskLevel,
} from "@/lib/tactics-store";
import { cn, formatSaved, nowTime } from "@/lib/utils";

const STATUSES: IncidentStatus[] = [
  "active",
  "monitoring",
  "escalated",
  "fim",
  "handover",
  "complete",
];

const RISKS: RiskLevel[] = ["low", "medium", "high", "critical"];
const COMMANDS: { v: CommandStructure; l: string }[] = [
  { v: "routine", l: "Routine" },
  { v: "enhanced", l: "Enhanced" },
  { v: "formal", l: "Formal Command" },
  { v: "multi", l: "Multi-Agency" },
];

function StatusBadge({ status }: { status: IncidentStatus }) {
  const meta = STATUS_META[status];
  const tone = {
    ok: "bg-ok-bg text-success border-success/35",
    info: "bg-tint text-accent border-accent/35",
    warn: "bg-amber-bg text-amber border-amber/40",
    danger: "bg-danger-bg text-danger border-danger/35",
    alt: "bg-plum-bg text-plum border-plum/35",
  }[meta.tone];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[12.5px] font-semibold whitespace-nowrap",
        tone,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {meta.label}
    </span>
  );
}

function ProgressBar({ pct }: { pct: number }) {
  return (
    <div className="h-2 overflow-hidden rounded-sm bg-line/40">
      <div
        className="h-full rounded-sm bg-accent transition-[width] duration-300"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function useReviewCountdown(reviewTime: string) {
  const [label, setLabel] = useState("Not set");
  const [due, setDue] = useState(false);
  useEffect(() => {
    if (!reviewTime) {
      setLabel("Not set");
      setDue(false);
      return;
    }
    const tick = () => {
      const [h, m] = reviewTime.split(":").map(Number);
      const now = new Date();
      const target = new Date();
      target.setHours(h, m, 0, 0);
      if (target.getTime() <= now.getTime()) {
        setDue(true);
        setLabel("REVIEW DUE");
        return;
      }
      const diff = target.getTime() - now.getTime();
      const mins = Math.floor(diff / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      setDue(false);
      setLabel(
        `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")} remaining`,
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [reviewTime]);
  return { label, due };
}

function emptyDecision(): Omit<Decision, "id"> {
  return {
    time: nowTime(),
    decision: "",
    info: "",
    risk: "",
    action: "",
    rationale: "",
    review: "",
  };
}

export function ActionCard({ cardId }: { cardId: CardId }) {
  const card = CARDS[cardId];
  const cs = useTacticsStore((s) => s.cards[cardId]);
  const operator = useTacticsStore((s) => s.operator);
  const role = useTacticsStore((s) => s.role);
  const toggleCheck = useTacticsStore((s) => s.toggleCheck);
  const patchCard = useTacticsStore((s) => s.patchCard);
  const setGolden = useTacticsStore((s) => s.setGolden);
  const setLiveRisk = useTacticsStore((s) => s.setLiveRisk);
  const addDecision = useTacticsStore((s) => s.addDecision);
  const updateDecision = useTacticsStore((s) => s.updateDecision);
  const deleteDecision = useTacticsStore((s) => s.deleteDecision);
  const saveNotes = useTacticsStore((s) => s.saveNotes);
  const timestampNote = useTacticsStore((s) => s.timestampNote);
  const clearNotesDraft = useTacticsStore((s) => s.clearNotesDraft);
  const completeHandover = useTacticsStore((s) => s.completeHandover);
  const resetCard = useTacticsStore((s) => s.resetCard);
  const touch = useTacticsStore((s) => s.touch);

  const [decOpen, setDecOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [decForm, setDecForm] = useState(emptyDecision);
  const [hoOpen, setHoOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [ho, setHo] = useState({
    situation: "",
    risk: "",
    people: "",
    resources: "",
    partners: "",
    decisions: "",
    unknown: "",
    outstanding: "",
    review: "",
  });

  useEffect(() => {
    touch(cardId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardId]);

  const prog = useMemo(
    () => getProgress(card, cs.checks),
    [card, cs.checks],
  );
  const review = useReviewCountdown(cs.reviewTime);

  function openAddDecision() {
    setEditingId(null);
    setDecForm(emptyDecision());
    setDecOpen(true);
  }
  function openEditDecision(d: Decision) {
    setEditingId(d.id);
    const { id: _id, ...rest } = d;
    setDecForm(rest);
    setDecOpen(true);
  }
  function saveDecision() {
    if (!decForm.decision.trim()) {
      toast.warning("Decision is required");
      return;
    }
    if (editingId) updateDecision(cardId, editingId, decForm);
    else addDecision(cardId, decForm);
    setDecOpen(false);
    toast.success(editingId ? "Decision updated" : "Decision added");
  }

  function exportRecord() {
    try {
      const completed: { section: string; item: string }[] = [];
      card.sections.forEach((sec) => {
        sec.items.forEach((item, i) => {
          if (cs.checks[checkKey(sec.id, i)])
            completed.push({ section: sec.title, item });
        });
      });
      const record = {
        exportedAt: new Date().toISOString(),
        cardReference: card.ref,
        title: card.title,
        incidentNumber: cs.incidentNo,
        operator,
        role,
        status: cs.status,
        riskLevel: cs.risk,
        fimInvolved: cs.fimInvolved,
        commandStructure: cs.command,
        supervisor: cs.supervisor,
        progress: {
          completed: prog.done,
          total: prog.total,
          percentage: prog.pct,
        },
        completedItems: completed,
        notes: cs.notes,
        timestampedNotes: cs.timestampedNotes,
        decisionLog: cs.decisions,
        goldenQuestions: cs.golden,
        reviewTime: cs.reviewTime,
        handover: cs.handover,
        liveRisk: cs.liveRisk,
        lastSaved: cs.lastSaved,
      };
      const blob = new Blob([JSON.stringify(record, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${card.ref}_${cs.incidentNo.replaceAll("/", "-")}_${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Record exported");
    } catch {
      toast.error("Export failed");
    }
  }

  return (
    <div>
      <div className="mb-3 no-print">
        <Link
          to="/tactics"
          className="inline-flex items-center gap-1 text-[13px] font-medium text-accent no-underline hover:underline"
        >
          <ArrowLeft className="size-3.5" /> Tactics Directory
        </Link>
      </div>

      <div className="sticky top-14 z-40 mb-4 rounded-sm border border-line bg-paper px-5 py-4 print:static print:border-0 print:px-0">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-[22px] font-bold tracking-tight">{card.title}</h1>
            <p className="mt-0.5 text-sm text-muted">
              Control Room Action Card · {card.ref}
            </p>
          </div>
          <StatusBadge status={cs.status} />
        </div>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-muted">
          <label className="flex items-center gap-2">
            Incident No:
            <input
              className="max-w-40 rounded-sm border border-line bg-paper px-2 py-0.5 text-[13px] text-ink"
              value={cs.incidentNo}
              onChange={(e) => patchCard(cardId, { incidentNo: e.target.value })}
              aria-label="Incident number"
            />
          </label>
          <span>
            Operator: <strong className="text-ink">{operator}</strong> — {role}
          </span>
          <span>
            Date:{" "}
            <strong className="text-ink">
              {new Date().toLocaleDateString("en-GB")}
            </strong>
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" /> Last saved: {formatSaved(cs.lastSaved)}
          </span>
        </div>
      </div>

      <div className="mb-4 flex gap-2.5 rounded-sm border border-warning/50 border-l-4 bg-warn-bg px-4 py-3 text-[13px] text-[#5c4a10]">
        <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warning" />
        <p>
          <strong>Control Room Prompt</strong> — This action card supports, but
          does not replace, current force policy, APP, supervisor direction or
          specialist procedures.
        </p>
      </div>

      <div className="no-print mb-4 flex flex-wrap gap-1.5" role="group" aria-label="Incident status">
        {STATUSES.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => patchCard(cardId, { status: s })}
            className={cn(
              "rounded-sm border px-3 py-1.5 text-[12.5px] font-medium",
              cs.status === s
                ? "border-navy bg-navy text-paper"
                : "border-line bg-paper text-muted hover:border-muted hover:text-ink",
            )}
          >
            {STATUS_META[s].label}
          </button>
        ))}
      </div>

      <div className="mb-4 rounded-sm border border-line bg-paper px-4 py-3">
        <div className="mb-2 flex justify-between text-[13px] font-semibold">
          <span>Progress</span>
          <span>{prog.pct}%</span>
        </div>
        <ProgressBar pct={prog.pct} />
        <div className="mt-2 flex gap-5 text-[12.5px] text-muted">
          <span>
            {prog.done} / {prog.total} completed
          </span>
          <span>
            Sections: {prog.secDone} / {prog.secTotal}
          </span>
        </div>
      </div>

      <div className="grid items-start gap-4 lg:grid-cols-[1fr_320px]">
        <div>
          {card.sections.map((sec) => {
            const done = sec.items.filter(
              (_, i) => cs.checks[checkKey(sec.id, i)],
            ).length;
            return (
              <div key={sec.id}>
                {sec.liveRisk && cs.liveRisk ? (
                  <div className="print-break mb-3 overflow-hidden rounded-sm border border-line bg-paper">
                    <div className="bg-dark-navy px-4 py-2.5 text-[13px] font-bold tracking-wide text-paper uppercase">
                      Live Risk Picture
                    </div>
                    {(
                      [
                        ["LOCATION", "location"],
                        ["DRIVING BEHAVIOUR", "driving"],
                        ["ROAD ENVIRONMENT", "road"],
                        ["TRAFFIC", "traffic"],
                        ["PEDESTRIANS", "pedestrians"],
                        ["WEATHER", "weather"],
                        ["TIME ELAPSED", "elapsed"],
                        ["RESOURCES", "resources"],
                      ] as const
                    ).map(([label, key]) => (
                      <div
                        key={key}
                        className="grid grid-cols-[140px_1fr] border-b border-line/50 last:border-0"
                      >
                        <div className="flex items-center bg-page px-3.5 py-2 text-[11.5px] font-semibold tracking-wide text-muted uppercase">
                          {label}
                        </div>
                        <div className="px-2.5 py-1.5">
                          <input
                            className="w-full rounded-sm border border-transparent bg-transparent px-1.5 py-1 text-[13.5px] font-medium hover:border-line hover:bg-page focus:border-accent focus:bg-paper focus:outline-none"
                            value={cs.liveRisk?.[key] ?? ""}
                            placeholder="Enter…"
                            onChange={(e) =>
                              setLiveRisk(cardId, { [key]: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    ))}
                    <div className="border-t border-line px-4 py-3.5 text-center">
                      <div className="text-[11px] font-semibold tracking-wide text-muted uppercase">
                        Current Risk
                      </div>
                      <div
                        className={cn(
                          "mt-1 text-[22px] font-bold",
                          cs.liveRisk.currentRisk === "low" && "text-success",
                          cs.liveRisk.currentRisk === "medium" && "text-warning",
                          cs.liveRisk.currentRisk === "high" && "text-amber",
                          cs.liveRisk.currentRisk === "critical" && "text-danger",
                        )}
                      >
                        {cs.liveRisk.currentRisk.toUpperCase()}
                      </div>
                      <div className="mt-2 flex justify-center gap-1">
                        {RISKS.map((r) => (
                          <button
                            key={r}
                            type="button"
                            className={cn(
                              "rounded-sm border px-2 py-1 text-[11px] font-semibold",
                              cs.liveRisk?.currentRisk === r
                                ? "border-accent bg-accent text-paper"
                                : "border-line bg-paper text-muted",
                            )}
                            onClick={() => setLiveRisk(cardId, { currentRisk: r })}
                          >
                            {r.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}

                <section className="print-break mb-3 overflow-hidden rounded-sm border border-line bg-paper">
                  <header className="flex items-center justify-between border-b border-line/60 bg-page px-4 py-3">
                    <h2 className="flex items-center gap-2 text-[13.5px] font-bold">
                      <span className="text-xs font-semibold text-muted">
                        {sec.num}
                      </span>
                      {sec.title}
                    </h2>
                    <span className="text-xs font-medium text-muted">
                      {done} / {sec.items.length}
                    </span>
                  </header>
                  <div>
                    {sec.items.map((item, i) => {
                      const key = checkKey(sec.id, i);
                      const on = !!cs.checks[key];
                      return (
                        <div
                          key={key}
                          role="checkbox"
                          aria-checked={on}
                          tabIndex={0}
                          className={cn(
                            "flex cursor-pointer items-start gap-3 border-b border-line/40 px-4 py-2.5 last:border-0 hover:bg-page",
                            on && "bg-ok-bg/50",
                          )}
                          onClick={() => toggleCheck(cardId, key)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              toggleCheck(cardId, key);
                            }
                          }}
                        >
                          <span
                            className={cn(
                              "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-[3px] border-2",
                              on
                                ? "border-success bg-success text-paper"
                                : "border-line bg-paper",
                            )}
                            aria-hidden
                          >
                            {on ? (
                              <svg
                                viewBox="0 0 24 24"
                                className="size-3.5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            ) : null}
                          </span>
                          <span
                            className={cn(
                              "text-[13.5px] leading-snug",
                              on && "text-muted line-through",
                            )}
                          >
                            {item}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>
            );
          })}
        </div>

        <aside className="no-print sticky top-44 max-h-[calc(100vh-12rem)] overflow-y-auto rounded-sm border border-line bg-paper p-4 max-lg:static max-lg:max-h-none">
          <h3 className="mb-3.5 border-b border-line/60 pb-2 text-xs font-bold tracking-wide text-muted uppercase">
            FIM / Supervisor Review
          </h3>

          <Field label="Current Status">
            <StatusBadge status={cs.status} />
          </Field>
          <Field label="Checklist Progress">
            <div className="text-sm font-semibold">
              {prog.done} / {prog.total}
            </div>
            <div className="mt-1.5">
              <ProgressBar pct={prog.pct} />
            </div>
          </Field>
          <Field label="Risk Level">
            <div className="flex flex-wrap gap-1">
              {RISKS.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => patchCard(cardId, { risk: r })}
                  className={cn(
                    "rounded-sm border px-2.5 py-1 text-[11.5px] font-semibold",
                    cs.risk === r
                      ? r === "low"
                        ? "border-success bg-ok-bg text-success"
                        : r === "medium"
                          ? "border-warning bg-warn-bg text-[#9a7b1a]"
                          : r === "high"
                            ? "border-amber bg-amber-bg text-amber"
                            : "border-danger bg-danger-bg text-danger"
                      : "border-line bg-paper text-muted",
                  )}
                >
                  {r.toUpperCase()}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Supervisor">
            <input
              className="w-full rounded-sm border border-line px-2.5 py-1.5 text-[13px]"
              value={cs.supervisor}
              placeholder="Name / callsign"
              onChange={(e) => patchCard(cardId, { supervisor: e.target.value })}
            />
          </Field>
          <Field label="FIM Involved">
            <div className="flex gap-1">
              {(["yes", "no"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() =>
                    patchCard(cardId, { fimInvolved: v === "yes" })
                  }
                  className={cn(
                    "rounded-sm border px-2.5 py-1 text-[11.5px] font-semibold",
                    (v === "yes") === cs.fimInvolved
                      ? "border-navy bg-navy text-paper"
                      : "border-line bg-paper text-muted",
                  )}
                >
                  {v === "yes" ? "Yes" : "No"}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Command Structure">
            <div className="flex flex-wrap gap-1">
              {COMMANDS.map((c) => (
                <button
                  key={c.v}
                  type="button"
                  onClick={() => patchCard(cardId, { command: c.v })}
                  className={cn(
                    "rounded-sm border px-2.5 py-1 text-[11.5px] font-semibold",
                    cs.command === c.v
                      ? "border-navy bg-navy text-paper"
                      : "border-line bg-paper text-muted",
                  )}
                >
                  {c.l}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Next Review">
            <div
              className={cn(
                "rounded-sm border px-3 py-2.5 text-center",
                review.due
                  ? "border-danger/40 bg-danger-bg"
                  : "border-accent/30 bg-tint",
              )}
            >
              <div className="text-xl font-bold tabular-nums">
                {cs.reviewTime || "—:—"}
              </div>
              <div
                className={cn(
                  "mt-0.5 text-xs",
                  review.due ? "font-semibold text-danger" : "text-muted",
                )}
              >
                {review.label}
              </div>
            </div>
            <input
              type="time"
              className="mt-2 w-full rounded-sm border border-line px-2.5 py-1.5 text-[13px]"
              value={cs.reviewTime}
              aria-label="Set review time"
              onChange={(e) => {
                patchCard(cardId, { reviewTime: e.target.value });
                toast.info("Review time set");
              }}
            />
          </Field>
          <Field label="Control Room Golden Questions">
            <div className="space-y-2.5">
              {GOLDEN_QUESTIONS.map((q) => (
                <label key={q.key} className="block">
                  <span className="mb-1 block text-xs font-medium text-ink">
                    {q.label}
                  </span>
                  {q.key === "review" ? (
                    <input
                      className="w-full rounded-sm border border-line px-2.5 py-1.5 text-[13px]"
                      value={cs.golden[q.key]}
                      placeholder="Time / trigger"
                      onChange={(e) => setGolden(cardId, q.key, e.target.value)}
                    />
                  ) : (
                    <textarea
                      rows={2}
                      className="w-full resize-y rounded-sm border border-line px-2.5 py-1.5 text-[13px]"
                      value={cs.golden[q.key]}
                      onChange={(e) => setGolden(cardId, q.key, e.target.value)}
                    />
                  )}
                </label>
              ))}
            </div>
          </Field>
        </aside>
      </div>

      <section className="print-break mt-4 rounded-sm border border-line bg-paper px-4 py-4">
        <h3 className="mb-3 text-[13px] font-bold tracking-wide text-muted uppercase">
          Decision Log
        </h3>
        {cs.decisions.length === 0 ? (
          <p className="mb-3 text-[13px] text-muted">No decisions recorded yet.</p>
        ) : (
          cs.decisions.map((d) => (
            <article
              key={d.id}
              className="mb-2.5 rounded-sm border border-line/70 bg-page px-3.5 py-3"
            >
              <div className="text-xs font-semibold text-accent">{d.time}</div>
              <div className="mt-0.5 text-sm font-semibold">{d.decision}</div>
              <div className="mt-1.5 space-y-0.5 text-[12.5px] text-muted">
                {d.info ? (
                  <div>
                    <strong className="text-ink">Information:</strong> {d.info}
                  </div>
                ) : null}
                {d.risk ? (
                  <div>
                    <strong className="text-ink">Risk:</strong> {d.risk}
                  </div>
                ) : null}
                {d.action ? (
                  <div>
                    <strong className="text-ink">Action:</strong> {d.action}
                  </div>
                ) : null}
                {d.rationale ? (
                  <div>
                    <strong className="text-ink">Rationale:</strong> {d.rationale}
                  </div>
                ) : null}
                {d.review ? (
                  <div>
                    <strong className="text-ink">Review:</strong> {d.review}
                  </div>
                ) : null}
              </div>
              <div className="no-print mt-2 flex gap-2">
                <button
                  type="button"
                  className="rounded-sm border border-line px-2.5 py-1 text-xs text-muted hover:text-ink"
                  onClick={() => openEditDecision(d)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="rounded-sm border border-line px-2.5 py-1 text-xs text-muted hover:text-ink"
                  onClick={() => {
                    deleteDecision(cardId, d.id);
                    toast.info("Decision deleted");
                  }}
                >
                  Delete
                </button>
              </div>
            </article>
          ))
        )}
        <button
          type="button"
          className="no-print flex w-full items-center justify-center gap-1.5 rounded-sm border border-dashed border-line py-2.5 text-[13.5px] font-semibold text-accent hover:border-accent hover:bg-tint"
          onClick={openAddDecision}
        >
          <Plus className="size-4" /> Add Decision
        </button>
      </section>

      <section className="print-break mt-4 rounded-sm border border-line bg-paper px-4 py-4">
        <h3 className="mb-3 text-[13px] font-bold tracking-wide text-muted uppercase">
          Incident Notes
        </h3>
        <textarea
          className="no-print mb-2.5 min-h-24 w-full resize-y rounded-sm border border-line px-3 py-2.5 text-[13.5px]"
          placeholder="Enter incident notes…"
          value={cs.notes}
          onChange={(e) => saveNotes(cardId, e.target.value)}
        />
        <div className="no-print mb-3 flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-sm bg-accent px-3 py-1.5 text-xs font-medium text-paper hover:bg-accent-hover"
            onClick={() => toast.success("Notes saved")}
          >
            Save Notes
          </button>
          <button
            type="button"
            className="rounded-sm border border-line px-3 py-1.5 text-xs font-medium"
            onClick={() => {
              timestampNote(cardId);
              toast.success("Note timestamped");
            }}
          >
            Timestamp Note
          </button>
          <button
            type="button"
            className="rounded-sm border border-line px-3 py-1.5 text-xs font-medium"
            onClick={() => clearNotesDraft(cardId)}
          >
            Clear
          </button>
        </div>
        {cs.timestampedNotes.map((n) => (
          <div key={n.id} className="border-t border-line/50 py-2 text-[13px]">
            <div className="text-xs font-semibold text-muted">
              {n.time} — {n.operator}
            </div>
            <div>{n.text}</div>
          </div>
        ))}
      </section>

      <section className="print-break mt-4 rounded-sm border border-line bg-paper px-4 py-4">
        <h3 className="mb-3 text-[13px] font-bold tracking-wide text-muted uppercase">
          Handover
        </h3>
        {cs.handover ? (
          <div className="rounded-sm border border-success/35 bg-ok-bg px-3.5 py-3 text-[13.5px]">
            <strong className="text-success">Handover Completed</strong>
            <div className="mt-1 text-muted">
              Time: {cs.handover.time} · Operator: {cs.handover.operator}
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="no-print inline-flex items-center gap-1.5 rounded-sm bg-accent px-3.5 py-2 text-sm font-medium text-paper hover:bg-accent-hover"
            onClick={() => setHoOpen(true)}
          >
            <ArrowRightLeft className="size-4" /> Start Handover
          </button>
        )}
      </section>

      <section className="print-break mt-4 rounded-sm border border-line bg-paper px-4 py-4">
        <h3 className="mb-3 text-[13px] font-bold tracking-wide text-muted uppercase">
          Card Completion
        </h3>
        <div className="mb-2 flex justify-between text-[13px] font-semibold">
          <span>
            {prog.done} / {prog.total} items
          </span>
          <span>{prog.pct}%</span>
        </div>
        <ProgressBar pct={prog.pct} />
        <div className="no-print mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-sm bg-accent px-3.5 py-2 text-sm font-medium text-paper hover:bg-accent-hover"
            onClick={() => {
              touch(cardId);
              toast.success("Progress saved");
            }}
          >
            <Save className="size-4" /> Save Progress
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-sm border border-line px-3.5 py-2 text-sm font-medium"
            onClick={() => window.print()}
          >
            <Printer className="size-4" /> Print Action Card
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-sm border border-line px-3.5 py-2 text-sm font-medium"
            onClick={exportRecord}
          >
            <Download className="size-4" /> Export Record
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-sm border border-danger px-3.5 py-2 text-sm font-medium text-danger hover:bg-danger-bg"
            onClick={() => setResetOpen(true)}
          >
            <RotateCcw className="size-4" /> Reset Card
          </button>
        </div>
      </section>

      {decOpen ? (
        <Modal
          title={editingId ? "Edit Decision" : "Add Decision"}
          onClose={() => setDecOpen(false)}
        >
          <FormField label="Time">
            <input
              type="time"
              className="w-full rounded-sm border border-line px-2.5 py-2 text-[13.5px]"
              value={decForm.time}
              onChange={(e) => setDecForm({ ...decForm, time: e.target.value })}
            />
          </FormField>
          <FormField label="Decision">
            <input
              className="w-full rounded-sm border border-line px-2.5 py-2 text-[13.5px]"
              value={decForm.decision}
              onChange={(e) =>
                setDecForm({ ...decForm, decision: e.target.value })
              }
            />
          </FormField>
          <FormField label="Information Available">
            <textarea
              className="min-h-16 w-full rounded-sm border border-line px-2.5 py-2 text-[13.5px]"
              value={decForm.info}
              onChange={(e) => setDecForm({ ...decForm, info: e.target.value })}
            />
          </FormField>
          <FormField label="Risk Considered">
            <input
              className="w-full rounded-sm border border-line px-2.5 py-2 text-[13.5px]"
              value={decForm.risk}
              onChange={(e) => setDecForm({ ...decForm, risk: e.target.value })}
            />
          </FormField>
          <FormField label="Action Taken">
            <textarea
              className="min-h-16 w-full rounded-sm border border-line px-2.5 py-2 text-[13.5px]"
              value={decForm.action}
              onChange={(e) =>
                setDecForm({ ...decForm, action: e.target.value })
              }
            />
          </FormField>
          <FormField label="Rationale">
            <textarea
              className="min-h-16 w-full rounded-sm border border-line px-2.5 py-2 text-[13.5px]"
              value={decForm.rationale}
              onChange={(e) =>
                setDecForm({ ...decForm, rationale: e.target.value })
              }
            />
          </FormField>
          <FormField label="Review Time">
            <input
              type="time"
              className="w-full rounded-sm border border-line px-2.5 py-2 text-[13.5px]"
              value={decForm.review}
              onChange={(e) =>
                setDecForm({ ...decForm, review: e.target.value })
              }
            />
          </FormField>
          <div className="mt-2 flex justify-end gap-2">
            <button
              type="button"
              className="rounded-sm border border-line px-3.5 py-2 text-sm"
              onClick={() => setDecOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="rounded-sm bg-accent px-3.5 py-2 text-sm font-medium text-paper"
              onClick={saveDecision}
            >
              Save Decision
            </button>
          </div>
        </Modal>
      ) : null}

      {hoOpen ? (
        <Modal title="Handover" onClose={() => setHoOpen(false)}>
          {(
            [
              ["situation", "Situation"],
              ["risk", "Current Risk"],
              ["people", "People / Casualties"],
              ["resources", "Resources"],
              ["partners", "Partner Agencies"],
              ["decisions", "Key Decisions"],
              ["unknown", "Unknown Information"],
              ["outstanding", "Outstanding Actions"],
            ] as const
          ).map(([k, label]) => (
            <FormField key={k} label={label}>
              <textarea
                className="min-h-16 w-full rounded-sm border border-line px-2.5 py-2 text-[13.5px]"
                value={ho[k]}
                onChange={(e) => setHo({ ...ho, [k]: e.target.value })}
              />
            </FormField>
          ))}
          <FormField label="Next Review">
            <input
              type="time"
              className="w-full rounded-sm border border-line px-2.5 py-2 text-[13.5px]"
              value={ho.review}
              onChange={(e) => setHo({ ...ho, review: e.target.value })}
            />
          </FormField>
          <div className="mt-2 flex justify-end gap-2">
            <button
              type="button"
              className="rounded-sm border border-line px-3.5 py-2 text-sm"
              onClick={() => setHoOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="rounded-sm bg-accent px-3.5 py-2 text-sm font-medium text-paper"
              onClick={() => {
                completeHandover(cardId, ho);
                setHoOpen(false);
                toast.success("Handover completed");
              }}
            >
              Complete Handover
            </button>
          </div>
        </Modal>
      ) : null}

      {resetOpen ? (
        <Modal title="Reset Card" onClose={() => setResetOpen(false)}>
          <p className="text-sm leading-relaxed">
            Are you sure? This will clear all checklist progress, notes,
            decisions and review data for this card.
          </p>
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              className="rounded-sm border border-line px-3.5 py-2 text-sm"
              onClick={() => setResetOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="rounded-sm border border-danger bg-danger px-3.5 py-2 text-sm font-medium text-paper"
              onClick={() => {
                resetCard(cardId);
                setResetOpen(false);
                toast.info("Card reset");
              }}
            >
              Reset Card
            </button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <div className="mb-1.5 text-[11.5px] font-semibold tracking-wide text-muted uppercase">
        {label}
      </div>
      {children}
    </div>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="mb-3.5 block">
      <span className="mb-1 block text-xs font-semibold tracking-wide text-muted uppercase">
        {label}
      </span>
      {children}
    </label>
  );
}

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/45 p-5"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-sm bg-paper shadow-lg">
        <div className="flex items-center justify-between border-b border-line/70 px-5 py-4">
          <h2 id="modal-title" className="text-base font-bold">
            {title}
          </h2>
          <button
            type="button"
            className="p-1 text-muted"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
      </div>
    </div>
  );
}
