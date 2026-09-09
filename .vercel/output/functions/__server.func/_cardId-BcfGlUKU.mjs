import { i as __toESM } from "./_runtime.mjs";
import { V as require_react, x as require_jsx_runtime, y as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { a as checkKey, c as useTacticsStore, i as STATUS_META, o as getProgress, r as GOLDEN_QUESTIONS, t as CARDS } from "./_ssr/tactics-store-7v1K1lJQ.mjs";
import { c as Printer, h as Clock, l as Plus, o as Save, p as Download, r as TriangleAlert, s as RotateCcw, v as ArrowRightLeft, y as ArrowLeft } from "./_libs/lucide-react.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { n as Route, r as isCardId } from "./_ssr/router-BAVHOKsl.mjs";
import { a as formatSaved, n as PageFrame, o as nowTime, r as cn, t as AppShell } from "./_ssr/shell-DnUat6BR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_cardId-BcfGlUKU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUSES = [
	"active",
	"monitoring",
	"escalated",
	"fim",
	"handover",
	"complete"
];
var RISKS = [
	"low",
	"medium",
	"high",
	"critical"
];
var COMMANDS = [
	{
		v: "routine",
		l: "Routine"
	},
	{
		v: "enhanced",
		l: "Enhanced"
	},
	{
		v: "formal",
		l: "Formal Command"
	},
	{
		v: "multi",
		l: "Multi-Agency"
	}
];
function StatusBadge({ status }) {
	const meta = STATUS_META[status];
	const tone = {
		ok: "bg-ok-bg text-success border-success/35",
		info: "bg-tint text-accent border-accent/35",
		warn: "bg-amber-bg text-amber border-amber/40",
		danger: "bg-danger-bg text-danger border-danger/35",
		alt: "bg-plum-bg text-plum border-plum/35"
	}[meta.tone];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[12.5px] font-semibold whitespace-nowrap", tone),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-current" }), meta.label]
	});
}
function ProgressBar({ pct }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-2 overflow-hidden rounded-sm bg-line/40",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-full rounded-sm bg-accent transition-[width] duration-300",
			style: { width: `${pct}%` }
		})
	});
}
function useReviewCountdown(reviewTime) {
	const [label, setLabel] = (0, import_react.useState)("Not set");
	const [due, setDue] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!reviewTime) {
			setLabel("Not set");
			setDue(false);
			return;
		}
		const tick = () => {
			const [h, m] = reviewTime.split(":").map(Number);
			const now = /* @__PURE__ */ new Date();
			const target = /* @__PURE__ */ new Date();
			target.setHours(h, m, 0, 0);
			if (target.getTime() <= now.getTime()) {
				setDue(true);
				setLabel("REVIEW DUE");
				return;
			}
			const diff = target.getTime() - now.getTime();
			const mins = Math.floor(diff / 6e4);
			const secs = Math.floor(diff % 6e4 / 1e3);
			setDue(false);
			setLabel(`${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")} remaining`);
		};
		tick();
		const id = setInterval(tick, 1e3);
		return () => clearInterval(id);
	}, [reviewTime]);
	return {
		label,
		due
	};
}
function emptyDecision() {
	return {
		time: nowTime(),
		decision: "",
		info: "",
		risk: "",
		action: "",
		rationale: "",
		review: ""
	};
}
function ActionCard({ cardId }) {
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
	const [decOpen, setDecOpen] = (0, import_react.useState)(false);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [decForm, setDecForm] = (0, import_react.useState)(emptyDecision);
	const [hoOpen, setHoOpen] = (0, import_react.useState)(false);
	const [resetOpen, setResetOpen] = (0, import_react.useState)(false);
	const [ho, setHo] = (0, import_react.useState)({
		situation: "",
		risk: "",
		people: "",
		resources: "",
		partners: "",
		decisions: "",
		unknown: "",
		outstanding: "",
		review: ""
	});
	(0, import_react.useEffect)(() => {
		touch(cardId);
	}, [cardId]);
	const prog = (0, import_react.useMemo)(() => getProgress(card, cs.checks), [card, cs.checks]);
	const review = useReviewCountdown(cs.reviewTime);
	function openAddDecision() {
		setEditingId(null);
		setDecForm(emptyDecision());
		setDecOpen(true);
	}
	function openEditDecision(d) {
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
			const completed = [];
			card.sections.forEach((sec) => {
				sec.items.forEach((item, i) => {
					if (cs.checks[checkKey(sec.id, i)]) completed.push({
						section: sec.title,
						item
					});
				});
			});
			const record = {
				exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
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
					percentage: prog.pct
				},
				completedItems: completed,
				notes: cs.notes,
				timestampedNotes: cs.timestampedNotes,
				decisionLog: cs.decisions,
				goldenQuestions: cs.golden,
				reviewTime: cs.reviewTime,
				handover: cs.handover,
				liveRisk: cs.liveRisk,
				lastSaved: cs.lastSaved
			};
			const blob = new Blob([JSON.stringify(record, null, 2)], { type: "application/json" });
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-3 no-print",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/tactics",
				className: "inline-flex items-center gap-1 text-[13px] font-medium text-accent no-underline hover:underline",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-3.5" }), " Tactics Directory"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-14 z-40 mb-4 rounded-sm border border-line bg-paper px-5 py-4 print:static print:border-0 print:px-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-[22px] font-bold tracking-tight",
					children: card.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-0.5 text-sm text-muted",
					children: ["Control Room Action Card · ", card.ref]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: cs.status })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2",
						children: ["Incident No:", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "max-w-40 rounded-sm border border-line bg-paper px-2 py-0.5 text-[13px] text-ink",
							value: cs.incidentNo,
							onChange: (e) => patchCard(cardId, { incidentNo: e.target.value }),
							"aria-label": "Incident number"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Operator: ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-ink",
							children: operator
						}),
						" — ",
						role
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Date:",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-ink",
							children: (/* @__PURE__ */ new Date()).toLocaleDateString("en-GB")
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5" }),
							" Last saved: ",
							formatSaved(cs.lastSaved)
						]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex gap-2.5 rounded-sm border border-warning/50 border-l-4 bg-warn-bg px-4 py-3 text-[13px] text-[#5c4a10]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 size-4 shrink-0 text-warning" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Control Room Prompt" }), " — This action card supports, but does not replace, current force policy, APP, supervisor direction or specialist procedures."] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "no-print mb-4 flex flex-wrap gap-1.5",
			role: "group",
			"aria-label": "Incident status",
			children: STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => patchCard(cardId, { status: s }),
				className: cn("rounded-sm border px-3 py-1.5 text-[12.5px] font-medium", cs.status === s ? "border-navy bg-navy text-paper" : "border-line bg-paper text-muted hover:border-muted hover:text-ink"),
				children: STATUS_META[s].label
			}, s))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 rounded-sm border border-line bg-paper px-4 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex justify-between text-[13px] font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Progress" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [prog.pct, "%"] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, { pct: prog.pct }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex gap-5 text-[12.5px] text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						prog.done,
						" / ",
						prog.total,
						" completed"
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Sections: ",
						prog.secDone,
						" / ",
						prog.secTotal
					] })]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid items-start gap-4 lg:grid-cols-[1fr_320px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: card.sections.map((sec) => {
				const done = sec.items.filter((_, i) => cs.checks[checkKey(sec.id, i)]).length;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [sec.liveRisk && cs.liveRisk ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "print-break mb-3 overflow-hidden rounded-sm border border-line bg-paper",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-dark-navy px-4 py-2.5 text-[13px] font-bold tracking-wide text-paper uppercase",
							children: "Live Risk Picture"
						}),
						[
							["LOCATION", "location"],
							["DRIVING BEHAVIOUR", "driving"],
							["ROAD ENVIRONMENT", "road"],
							["TRAFFIC", "traffic"],
							["PEDESTRIANS", "pedestrians"],
							["WEATHER", "weather"],
							["TIME ELAPSED", "elapsed"],
							["RESOURCES", "resources"]
						].map(([label, key]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-[140px_1fr] border-b border-line/50 last:border-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center bg-page px-3.5 py-2 text-[11.5px] font-semibold tracking-wide text-muted uppercase",
								children: label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "px-2.5 py-1.5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "w-full rounded-sm border border-transparent bg-transparent px-1.5 py-1 text-[13.5px] font-medium hover:border-line hover:bg-page focus:border-accent focus:bg-paper focus:outline-none",
									value: cs.liveRisk?.[key] ?? "",
									placeholder: "Enter…",
									onChange: (e) => setLiveRisk(cardId, { [key]: e.target.value })
								})
							})]
						}, key)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-line px-4 py-3.5 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[11px] font-semibold tracking-wide text-muted uppercase",
									children: "Current Risk"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: cn("mt-1 text-[22px] font-bold", cs.liveRisk.currentRisk === "low" && "text-success", cs.liveRisk.currentRisk === "medium" && "text-warning", cs.liveRisk.currentRisk === "high" && "text-amber", cs.liveRisk.currentRisk === "critical" && "text-danger"),
									children: cs.liveRisk.currentRisk.toUpperCase()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 flex justify-center gap-1",
									children: RISKS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: cn("rounded-sm border px-2 py-1 text-[11px] font-semibold", cs.liveRisk?.currentRisk === r ? "border-accent bg-accent text-paper" : "border-line bg-paper text-muted"),
										onClick: () => setLiveRisk(cardId, { currentRisk: r }),
										children: r.toUpperCase()
									}, r))
								})
							]
						})
					]
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "print-break mb-3 overflow-hidden rounded-sm border border-line bg-paper",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "flex items-center justify-between border-b border-line/60 bg-page px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "flex items-center gap-2 text-[13.5px] font-bold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold text-muted",
								children: sec.num
							}), sec.title]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-medium text-muted",
							children: [
								done,
								" / ",
								sec.items.length
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: sec.items.map((item, i) => {
						const key = checkKey(sec.id, i);
						const on = !!cs.checks[key];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							role: "checkbox",
							"aria-checked": on,
							tabIndex: 0,
							className: cn("flex cursor-pointer items-start gap-3 border-b border-line/40 px-4 py-2.5 last:border-0 hover:bg-page", on && "bg-ok-bg/50"),
							onClick: () => toggleCheck(cardId, key),
							onKeyDown: (e) => {
								if (e.key === "Enter" || e.key === " ") {
									e.preventDefault();
									toggleCheck(cardId, key);
								}
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-[3px] border-2", on ? "border-success bg-success text-paper" : "border-line bg-paper"),
								"aria-hidden": true,
								children: on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									viewBox: "0 0 24 24",
									className: "size-3.5",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "20 6 9 17 4 12" })
								}) : null
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("text-[13.5px] leading-snug", on && "text-muted line-through"),
								children: item
							})]
						}, key);
					}) })]
				})] }, sec.id);
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "no-print sticky top-44 max-h-[calc(100vh-12rem)] overflow-y-auto rounded-sm border border-line bg-paper p-4 max-lg:static max-lg:max-h-none",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mb-3.5 border-b border-line/60 pb-2 text-xs font-bold tracking-wide text-muted uppercase",
						children: "FIM / Supervisor Review"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Current Status",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: cs.status })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
						label: "Checklist Progress",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm font-semibold",
							children: [
								prog.done,
								" / ",
								prog.total
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, { pct: prog.pct })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Risk Level",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-1",
							children: RISKS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => patchCard(cardId, { risk: r }),
								className: cn("rounded-sm border px-2.5 py-1 text-[11.5px] font-semibold", cs.risk === r ? r === "low" ? "border-success bg-ok-bg text-success" : r === "medium" ? "border-warning bg-warn-bg text-[#9a7b1a]" : r === "high" ? "border-amber bg-amber-bg text-amber" : "border-danger bg-danger-bg text-danger" : "border-line bg-paper text-muted"),
								children: r.toUpperCase()
							}, r))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Supervisor",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "w-full rounded-sm border border-line px-2.5 py-1.5 text-[13px]",
							value: cs.supervisor,
							placeholder: "Name / callsign",
							onChange: (e) => patchCard(cardId, { supervisor: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "FIM Involved",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-1",
							children: ["yes", "no"].map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => patchCard(cardId, { fimInvolved: v === "yes" }),
								className: cn("rounded-sm border px-2.5 py-1 text-[11.5px] font-semibold", v === "yes" === cs.fimInvolved ? "border-navy bg-navy text-paper" : "border-line bg-paper text-muted"),
								children: v === "yes" ? "Yes" : "No"
							}, v))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Command Structure",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-1",
							children: COMMANDS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => patchCard(cardId, { command: c.v }),
								className: cn("rounded-sm border px-2.5 py-1 text-[11.5px] font-semibold", cs.command === c.v ? "border-navy bg-navy text-paper" : "border-line bg-paper text-muted"),
								children: c.l
							}, c.v))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
						label: "Next Review",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("rounded-sm border px-3 py-2.5 text-center", review.due ? "border-danger/40 bg-danger-bg" : "border-accent/30 bg-tint"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xl font-bold tabular-nums",
								children: cs.reviewTime || "—:—"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("mt-0.5 text-xs", review.due ? "font-semibold text-danger" : "text-muted"),
								children: review.label
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "time",
							className: "mt-2 w-full rounded-sm border border-line px-2.5 py-1.5 text-[13px]",
							value: cs.reviewTime,
							"aria-label": "Set review time",
							onChange: (e) => {
								patchCard(cardId, { reviewTime: e.target.value });
								toast.info("Review time set");
							}
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Control Room Golden Questions",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2.5",
							children: GOLDEN_QUESTIONS.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-1 block text-xs font-medium text-ink",
									children: q.label
								}), q.key === "review" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "w-full rounded-sm border border-line px-2.5 py-1.5 text-[13px]",
									value: cs.golden[q.key],
									placeholder: "Time / trigger",
									onChange: (e) => setGolden(cardId, q.key, e.target.value)
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									rows: 2,
									className: "w-full resize-y rounded-sm border border-line px-2.5 py-1.5 text-[13px]",
									value: cs.golden[q.key],
									onChange: (e) => setGolden(cardId, q.key, e.target.value)
								})]
							}, q.key))
						})
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "print-break mt-4 rounded-sm border border-line bg-paper px-4 py-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-3 text-[13px] font-bold tracking-wide text-muted uppercase",
					children: "Decision Log"
				}),
				cs.decisions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 text-[13px] text-muted",
					children: "No decisions recorded yet."
				}) : cs.decisions.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "mb-2.5 rounded-sm border border-line/70 bg-page px-3.5 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-semibold text-accent",
							children: d.time
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-0.5 text-sm font-semibold",
							children: d.decision
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1.5 space-y-0.5 text-[12.5px] text-muted",
							children: [
								d.info ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-ink",
										children: "Information:"
									}),
									" ",
									d.info
								] }) : null,
								d.risk ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-ink",
										children: "Risk:"
									}),
									" ",
									d.risk
								] }) : null,
								d.action ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-ink",
										children: "Action:"
									}),
									" ",
									d.action
								] }) : null,
								d.rationale ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-ink",
										children: "Rationale:"
									}),
									" ",
									d.rationale
								] }) : null,
								d.review ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-ink",
										children: "Review:"
									}),
									" ",
									d.review
								] }) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "no-print mt-2 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "rounded-sm border border-line px-2.5 py-1 text-xs text-muted hover:text-ink",
								onClick: () => openEditDecision(d),
								children: "Edit"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "rounded-sm border border-line px-2.5 py-1 text-xs text-muted hover:text-ink",
								onClick: () => {
									deleteDecision(cardId, d.id);
									toast.info("Decision deleted");
								},
								children: "Delete"
							})]
						})
					]
				}, d.id)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "no-print flex w-full items-center justify-center gap-1.5 rounded-sm border border-dashed border-line py-2.5 text-[13.5px] font-semibold text-accent hover:border-accent hover:bg-tint",
					onClick: openAddDecision,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Add Decision"]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "print-break mt-4 rounded-sm border border-line bg-paper px-4 py-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-3 text-[13px] font-bold tracking-wide text-muted uppercase",
					children: "Incident Notes"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: "no-print mb-2.5 min-h-24 w-full resize-y rounded-sm border border-line px-3 py-2.5 text-[13.5px]",
					placeholder: "Enter incident notes…",
					value: cs.notes,
					onChange: (e) => saveNotes(cardId, e.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "no-print mb-3 flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "rounded-sm bg-accent px-3 py-1.5 text-xs font-medium text-paper hover:bg-accent-hover",
							onClick: () => toast.success("Notes saved"),
							children: "Save Notes"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "rounded-sm border border-line px-3 py-1.5 text-xs font-medium",
							onClick: () => {
								timestampNote(cardId);
								toast.success("Note timestamped");
							},
							children: "Timestamp Note"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "rounded-sm border border-line px-3 py-1.5 text-xs font-medium",
							onClick: () => clearNotesDraft(cardId),
							children: "Clear"
						})
					]
				}),
				cs.timestampedNotes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-line/50 py-2 text-[13px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs font-semibold text-muted",
						children: [
							n.time,
							" — ",
							n.operator
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: n.text })]
				}, n.id))
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "print-break mt-4 rounded-sm border border-line bg-paper px-4 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mb-3 text-[13px] font-bold tracking-wide text-muted uppercase",
				children: "Handover"
			}), cs.handover ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-sm border border-success/35 bg-ok-bg px-3.5 py-3 text-[13.5px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
					className: "text-success",
					children: "Handover Completed"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 text-muted",
					children: [
						"Time: ",
						cs.handover.time,
						" · Operator: ",
						cs.handover.operator
					]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "no-print inline-flex items-center gap-1.5 rounded-sm bg-accent px-3.5 py-2 text-sm font-medium text-paper hover:bg-accent-hover",
				onClick: () => setHoOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRightLeft, { className: "size-4" }), " Start Handover"]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "print-break mt-4 rounded-sm border border-line bg-paper px-4 py-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-3 text-[13px] font-bold tracking-wide text-muted uppercase",
					children: "Card Completion"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex justify-between text-[13px] font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						prog.done,
						" / ",
						prog.total,
						" items"
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [prog.pct, "%"] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, { pct: prog.pct }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "no-print mt-3 flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "inline-flex items-center gap-1.5 rounded-sm bg-accent px-3.5 py-2 text-sm font-medium text-paper hover:bg-accent-hover",
							onClick: () => {
								touch(cardId);
								toast.success("Progress saved");
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-4" }), " Save Progress"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "inline-flex items-center gap-1.5 rounded-sm border border-line px-3.5 py-2 text-sm font-medium",
							onClick: () => window.print(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "size-4" }), " Print Action Card"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "inline-flex items-center gap-1.5 rounded-sm border border-line px-3.5 py-2 text-sm font-medium",
							onClick: exportRecord,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), " Export Record"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "inline-flex items-center gap-1.5 rounded-sm border border-danger px-3.5 py-2 text-sm font-medium text-danger hover:bg-danger-bg",
							onClick: () => setResetOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), " Reset Card"]
						})
					]
				})
			]
		}),
		decOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
			title: editingId ? "Edit Decision" : "Add Decision",
			onClose: () => setDecOpen(false),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
					label: "Time",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "time",
						className: "w-full rounded-sm border border-line px-2.5 py-2 text-[13.5px]",
						value: decForm.time,
						onChange: (e) => setDecForm({
							...decForm,
							time: e.target.value
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
					label: "Decision",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "w-full rounded-sm border border-line px-2.5 py-2 text-[13.5px]",
						value: decForm.decision,
						onChange: (e) => setDecForm({
							...decForm,
							decision: e.target.value
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
					label: "Information Available",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: "min-h-16 w-full rounded-sm border border-line px-2.5 py-2 text-[13.5px]",
						value: decForm.info,
						onChange: (e) => setDecForm({
							...decForm,
							info: e.target.value
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
					label: "Risk Considered",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "w-full rounded-sm border border-line px-2.5 py-2 text-[13.5px]",
						value: decForm.risk,
						onChange: (e) => setDecForm({
							...decForm,
							risk: e.target.value
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
					label: "Action Taken",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: "min-h-16 w-full rounded-sm border border-line px-2.5 py-2 text-[13.5px]",
						value: decForm.action,
						onChange: (e) => setDecForm({
							...decForm,
							action: e.target.value
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
					label: "Rationale",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: "min-h-16 w-full rounded-sm border border-line px-2.5 py-2 text-[13.5px]",
						value: decForm.rationale,
						onChange: (e) => setDecForm({
							...decForm,
							rationale: e.target.value
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
					label: "Review Time",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "time",
						className: "w-full rounded-sm border border-line px-2.5 py-2 text-[13.5px]",
						value: decForm.review,
						onChange: (e) => setDecForm({
							...decForm,
							review: e.target.value
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex justify-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "rounded-sm border border-line px-3.5 py-2 text-sm",
						onClick: () => setDecOpen(false),
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "rounded-sm bg-accent px-3.5 py-2 text-sm font-medium text-paper",
						onClick: saveDecision,
						children: "Save Decision"
					})]
				})
			]
		}) : null,
		hoOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
			title: "Handover",
			onClose: () => setHoOpen(false),
			children: [
				[
					["situation", "Situation"],
					["risk", "Current Risk"],
					["people", "People / Casualties"],
					["resources", "Resources"],
					["partners", "Partner Agencies"],
					["decisions", "Key Decisions"],
					["unknown", "Unknown Information"],
					["outstanding", "Outstanding Actions"]
				].map(([k, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
					label,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: "min-h-16 w-full rounded-sm border border-line px-2.5 py-2 text-[13.5px]",
						value: ho[k],
						onChange: (e) => setHo({
							...ho,
							[k]: e.target.value
						})
					})
				}, k)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
					label: "Next Review",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "time",
						className: "w-full rounded-sm border border-line px-2.5 py-2 text-[13.5px]",
						value: ho.review,
						onChange: (e) => setHo({
							...ho,
							review: e.target.value
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex justify-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "rounded-sm border border-line px-3.5 py-2 text-sm",
						onClick: () => setHoOpen(false),
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "rounded-sm bg-accent px-3.5 py-2 text-sm font-medium text-paper",
						onClick: () => {
							completeHandover(cardId, ho);
							setHoOpen(false);
							toast.success("Handover completed");
						},
						children: "Complete Handover"
					})]
				})
			]
		}) : null,
		resetOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
			title: "Reset Card",
			onClose: () => setResetOpen(false),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed",
				children: "Are you sure? This will clear all checklist progress, notes, decisions and review data for this card."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex justify-end gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "rounded-sm border border-line px-3.5 py-2 text-sm",
					onClick: () => setResetOpen(false),
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "rounded-sm border border-danger bg-danger px-3.5 py-2 text-sm font-medium text-paper",
					onClick: () => {
						resetCard(cardId);
						setResetOpen(false);
						toast.info("Card reset");
					},
					children: "Reset Card"
				})]
			})]
		}) : null
	] });
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-1.5 text-[11.5px] font-semibold tracking-wide text-muted uppercase",
			children: label
		}), children]
	});
}
function FormField({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "mb-3.5 block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1 block text-xs font-semibold tracking-wide text-muted uppercase",
			children: label
		}), children]
	});
}
function Modal({ title, onClose, children }) {
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [onClose]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-navy/45 p-5",
		onClick: (e) => {
			if (e.target === e.currentTarget) onClose();
		},
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "modal-title",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-sm bg-paper shadow-lg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-line/70 px-5 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "modal-title",
					className: "text-base font-bold",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "p-1 text-muted",
					onClick: onClose,
					"aria-label": "Close",
					children: "×"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-5 py-4",
				children
			})]
		})
	});
}
function CardPage() {
	const { cardId } = Route.useParams();
	if (!isCardId(cardId)) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageFrame, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, { cardId }) }) });
}
//#endregion
export { CardPage as component };
