import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  CARDS,
  CARD_LIST,
  checkKey,
  type CardId,
  type TacticCard,
} from "@/data/cards";

export type IncidentStatus =
  | "active"
  | "monitoring"
  | "escalated"
  | "fim"
  | "handover"
  | "complete";

export type RiskLevel = "low" | "medium" | "high" | "critical";
export type CommandStructure = "routine" | "enhanced" | "formal" | "multi";

export type Decision = {
  id: string;
  time: string;
  decision: string;
  info: string;
  risk: string;
  action: string;
  rationale: string;
  review: string;
};

export type TimestampedNote = {
  id: string;
  time: string;
  operator: string;
  text: string;
};

export type HandoverRecord = {
  time: string;
  operator: string;
  situation: string;
  risk: string;
  people: string;
  resources: string;
  partners: string;
  decisions: string;
  unknown: string;
  outstanding: string;
  review: string;
};

export type LiveRisk = {
  location: string;
  driving: string;
  road: string;
  traffic: string;
  pedestrians: string;
  weather: string;
  elapsed: string;
  resources: string;
  currentRisk: RiskLevel;
};

export type GoldenAnswers = {
  know: string;
  dont: string;
  risk: string;
  doing: string;
  who: string;
  record: string;
  review: string;
};

export type CardState = {
  checks: Record<string, boolean>;
  status: IncidentStatus;
  risk: RiskLevel;
  fimInvolved: boolean;
  command: CommandStructure;
  supervisor: string;
  reviewTime: string;
  golden: GoldenAnswers;
  notes: string;
  timestampedNotes: TimestampedNote[];
  decisions: Decision[];
  handover: HandoverRecord | null;
  liveRisk: LiveRisk | null;
  incidentNo: string;
  lastSaved: string | null;
};

export type RecentEntry = { id: CardId; at: number };

type TacticsState = {
  operator: string;
  role: string;
  uid: string;
  cards: Record<CardId, CardState>;
  recent: RecentEntry[];
  hydrated: boolean;
  setHydrated: (v: boolean) => void;
  touch: (id: CardId) => void;
  toggleCheck: (id: CardId, key: string) => void;
  patchCard: (id: CardId, patch: Partial<CardState>) => void;
  setGolden: (id: CardId, key: keyof GoldenAnswers, value: string) => void;
  setLiveRisk: (id: CardId, patch: Partial<LiveRisk>) => void;
  addDecision: (id: CardId, d: Omit<Decision, "id">) => void;
  updateDecision: (id: CardId, decisionId: string, d: Omit<Decision, "id">) => void;
  deleteDecision: (id: CardId, decisionId: string) => void;
  saveNotes: (id: CardId, notes: string) => void;
  timestampNote: (id: CardId) => void;
  clearNotesDraft: (id: CardId) => void;
  completeHandover: (id: CardId, h: Omit<HandoverRecord, "time" | "operator">) => void;
  resetCard: (id: CardId) => void;
};

const emptyGolden = (): GoldenAnswers => ({
  know: "",
  dont: "",
  risk: "",
  doing: "",
  who: "",
  record: "",
  review: "",
});

export function defaultCardState(cardId: CardId): CardState {
  const card = CARDS[cardId];
  const checks: Record<string, boolean> = {};
  card.sections.forEach((sec) => {
    sec.items.forEach((_, i) => {
      checks[checkKey(sec.id, i)] = false;
    });
  });
  return {
    checks,
    status: "active",
    risk: "medium",
    fimInvolved: false,
    command: "routine",
    supervisor: "",
    reviewTime: "",
    golden: emptyGolden(),
    notes: "",
    timestampedNotes: [],
    decisions: [],
    handover: null,
    liveRisk:
      cardId === "fts"
        ? {
            location: "",
            driving: "",
            road: "",
            traffic: "",
            pedestrians: "",
            weather: "",
            elapsed: "00:00",
            resources: "",
            currentRisk: "medium",
          }
        : null,
    incidentNo: "SHC/2026/000123",
    lastSaved: null,
  };
}

function allCardStates(): Record<CardId, CardState> {
  return {
    fir: defaultCardState("fir"),
    mis: defaultCardState("mis"),
    dom: defaultCardState("dom"),
    fts: defaultCardState("fts"),
  };
}

function markSaved(card: CardState): CardState {
  return { ...card, lastSaved: new Date().toISOString() };
}

export const STATUS_META: Record<
  IncidentStatus,
  { label: string; tone: "ok" | "info" | "warn" | "danger" | "alt" }
> = {
  active: { label: "Active", tone: "ok" },
  monitoring: { label: "Monitoring", tone: "info" },
  escalated: { label: "Escalated", tone: "warn" },
  fim: { label: "FIM Involved", tone: "danger" },
  handover: { label: "Handover Required", tone: "alt" },
  complete: { label: "Complete", tone: "ok" },
};

export function getProgress(card: TacticCard, checks: Record<string, boolean>) {
  let total = 0;
  let done = 0;
  let secDone = 0;
  card.sections.forEach((sec) => {
    let all = true;
    sec.items.forEach((_, i) => {
      total += 1;
      const on = !!checks[checkKey(sec.id, i)];
      if (on) done += 1;
      else all = false;
    });
    if (all && sec.items.length) secDone += 1;
  });
  return {
    total,
    done,
    pct: total ? Math.round((done / total) * 100) : 0,
    secDone,
    secTotal: card.sections.length,
  };
}

export const useTacticsStore = create<TacticsState>()(
  persist(
    (set, get) => ({
      operator: "K. Smith",
      role: "CRO",
      uid: "1364",
      cards: allCardStates(),
      recent: [],
      hydrated: false,
      setHydrated: (v) => set({ hydrated: v }),
      touch: (id) => {
        const recent = [
          { id, at: Date.now() },
          ...get().recent.filter((r) => r.id !== id),
        ].slice(0, 8);
        const cards = { ...get().cards };
        cards[id] = markSaved(cards[id]);
        set({ recent, cards });
      },
      toggleCheck: (id, key) => {
        const cur = get().cards[id];
        const cards = {
          ...get().cards,
          [id]: markSaved({
            ...cur,
            checks: { ...cur.checks, [key]: !cur.checks[key] },
          }),
        };
        const recent = [
          { id, at: Date.now() },
          ...get().recent.filter((r) => r.id !== id),
        ].slice(0, 8);
        set({ cards, recent });
      },
      patchCard: (id, patch) => {
        const cur = get().cards[id];
        set({
          cards: { ...get().cards, [id]: markSaved({ ...cur, ...patch }) },
        });
      },
      setGolden: (id, key, value) => {
        const cur = get().cards[id];
        set({
          cards: {
            ...get().cards,
            [id]: markSaved({
              ...cur,
              golden: { ...cur.golden, [key]: value },
            }),
          },
        });
      },
      setLiveRisk: (id, patch) => {
        const cur = get().cards[id];
        if (!cur.liveRisk) return;
        set({
          cards: {
            ...get().cards,
            [id]: markSaved({
              ...cur,
              liveRisk: { ...cur.liveRisk, ...patch },
            }),
          },
        });
      },
      addDecision: (id, d) => {
        const cur = get().cards[id];
        const next = [...cur.decisions, { ...d, id: crypto.randomUUID() }].sort(
          (a, b) => a.time.localeCompare(b.time),
        );
        set({
          cards: { ...get().cards, [id]: markSaved({ ...cur, decisions: next }) },
        });
      },
      updateDecision: (id, decisionId, d) => {
        const cur = get().cards[id];
        const next = cur.decisions
          .map((x) => (x.id === decisionId ? { ...d, id: decisionId } : x))
          .sort((a, b) => a.time.localeCompare(b.time));
        set({
          cards: { ...get().cards, [id]: markSaved({ ...cur, decisions: next }) },
        });
      },
      deleteDecision: (id, decisionId) => {
        const cur = get().cards[id];
        set({
          cards: {
            ...get().cards,
            [id]: markSaved({
              ...cur,
              decisions: cur.decisions.filter((x) => x.id !== decisionId),
            }),
          },
        });
      },
      saveNotes: (id, notes) => {
        const cur = get().cards[id];
        set({
          cards: { ...get().cards, [id]: markSaved({ ...cur, notes }) },
        });
      },
      timestampNote: (id) => {
        const cur = get().cards[id];
        const text = cur.notes.trim();
        if (!text) return;
        const note: TimestampedNote = {
          id: crypto.randomUUID(),
          time: new Date().toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          operator: get().operator,
          text,
        };
        set({
          cards: {
            ...get().cards,
            [id]: markSaved({
              ...cur,
              notes: "",
              timestampedNotes: [note, ...cur.timestampedNotes],
            }),
          },
        });
      },
      clearNotesDraft: (id) => {
        const cur = get().cards[id];
        set({
          cards: { ...get().cards, [id]: markSaved({ ...cur, notes: "" }) },
        });
      },
      completeHandover: (id, h) => {
        const cur = get().cards[id];
        const record: HandoverRecord = {
          ...h,
          time: new Date().toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          operator: get().operator,
        };
        set({
          cards: {
            ...get().cards,
            [id]: markSaved({
              ...cur,
              handover: record,
              status: "handover",
            }),
          },
        });
      },
      resetCard: (id) => {
        set({
          cards: { ...get().cards, [id]: defaultCardState(id) },
        });
      },
    }),
    {
      name: "policenet_tactics_v1",
      storage: createJSONStorage(() => {
        if (typeof window === "undefined") {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }
        return localStorage;
      }),
      skipHydration: true,
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<TacticsState>;
        const cards = allCardStates();
        (Object.keys(cards) as CardId[]).forEach((id) => {
          const incoming = p.cards?.[id];
          if (!incoming) return;
          cards[id] = {
            ...cards[id],
            ...incoming,
            checks: { ...cards[id].checks, ...incoming.checks },
            golden: { ...cards[id].golden, ...incoming.golden },
            liveRisk: incoming.liveRisk ?? cards[id].liveRisk,
          };
        });
        return {
          ...current,
          ...p,
          cards,
          recent: p.recent ?? current.recent,
          hydrated: false,
        };
      },
      partialize: (s) => ({
        operator: s.operator,
        role: s.role,
        uid: s.uid,
        cards: s.cards,
        recent: s.recent,
      }),
    },
  ),
);

export function unfinishedCards(state: TacticsState) {
  return CARD_LIST.map((c) => ({
    card: c,
    prog: getProgress(c, state.cards[c.id].checks),
  })).filter((x) => x.prog.done > 0 && x.prog.done < x.prog.total);
}
