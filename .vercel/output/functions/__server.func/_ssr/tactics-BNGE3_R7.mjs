import { i as __toESM } from "../_runtime.mjs";
import { V as require_react, x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as useTacticsStore, n as CARD_LIST, o as getProgress, s as unfinishedCards, t as CARDS } from "./tactics-store-7v1K1lJQ.mjs";
import { _ as ArrowRight, a as Search, d as Layers, f as House, g as Car, i as SquareCheckBig, m as Crosshair, n as UserSearch, y as ArrowLeft } from "../_libs/lucide-react.mjs";
import { i as formatRelative, n as PageFrame, r as cn, t as AppShell } from "./shell-DnUat6BR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tactics-BNGE3_R7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTERS = [
	{
		key: "all",
		label: "All"
	},
	{
		key: "control-room",
		label: "Control Room"
	},
	{
		key: "fim",
		label: "FIM"
	},
	{
		key: "high-risk",
		label: "High Risk"
	},
	{
		key: "supervisory",
		label: "Supervisory"
	}
];
var ICONS = {
	crosshair: Crosshair,
	"user-search": UserSearch,
	home: House,
	car: Car
};
var ACCENT = {
	red: {
		bar: "bg-danger",
		icon: "bg-danger-bg text-danger"
	},
	blue: {
		bar: "bg-accent",
		icon: "bg-tint text-accent"
	},
	orange: {
		bar: "bg-amber",
		icon: "bg-amber-bg text-amber"
	},
	purple: {
		bar: "bg-plum",
		icon: "bg-plum-bg text-plum"
	}
};
function TacticsDirectory() {
	const [q, setQ] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const cardsState = useTacticsStore((s) => s.cards);
	const recent = useTacticsStore((s) => s.recent);
	const hydrated = useTacticsStore((s) => s.hydrated);
	const store = useTacticsStore();
	const results = (0, import_react.useMemo)(() => {
		const query = q.trim().toLowerCase();
		let list = CARD_LIST;
		if (filter !== "all") list = list.filter((c) => c.filters.includes(filter));
		if (query) list = list.filter((c) => {
			if (c.title.toLowerCase().includes(query) || c.ref.toLowerCase().includes(query) || c.subtitle.toLowerCase().includes(query)) return true;
			return c.sections.some((s) => s.title.toLowerCase().includes(query) || s.items.some((i) => i.toLowerCase().includes(query)));
		});
		return list;
	}, [q, filter]);
	const searchHits = (0, import_react.useMemo)(() => {
		const query = q.trim().toLowerCase();
		if (query.length < 2) return [];
		const hits = [];
		CARD_LIST.forEach((card) => {
			if (card.title.toLowerCase().includes(query) || card.ref.toLowerCase().includes(query)) hits.push({
				cardId: card.id,
				cardTitle: card.title,
				path: "Card",
				text: card.title
			});
			card.sections.forEach((sec) => {
				if (sec.title.toLowerCase().includes(query)) hits.push({
					cardId: card.id,
					cardTitle: card.title,
					path: sec.title,
					text: sec.title
				});
				sec.items.forEach((item) => {
					if (item.toLowerCase().includes(query)) hits.push({
						cardId: card.id,
						cardTitle: card.title,
						path: sec.title,
						text: item
					});
				});
			});
		});
		return hits.slice(0, 12);
	}, [q]);
	const unfinished = hydrated ? unfinishedCards(store) : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageFrame, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "mb-2 inline-flex items-center gap-1 text-[13px] text-accent no-underline hover:underline",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-3.5" }), " Home"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-[26px] font-bold tracking-tight",
					children: "Tactics Directory"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-[15px] font-medium text-muted",
					children: "Control Room Action Cards"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-5 rounded-sm border border-accent/25 bg-tint px-4 py-3.5 text-[13.5px] leading-relaxed text-[#1a3a5c]",
			children: "Operational checklists and control-room prompts for managing priority incidents. These cards support, but do not replace, force policy, APP, supervisor direction or specialist procedures."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mb-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "search",
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Search tactics...",
					"aria-label": "Search tactics",
					className: "w-full rounded-sm border border-line bg-paper py-2.5 pr-3 pl-10 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
				}),
				q.trim().length >= 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute z-20 mt-1 max-h-80 w-full overflow-y-auto rounded-sm border border-line bg-paper shadow-md",
					children: searchHits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-3.5 py-2.5 text-[13.5px] text-muted",
						children: "No results"
					}) : searchHits.map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/tactics/$cardId",
						params: { cardId: h.cardId },
						className: "block border-b border-line/40 px-3.5 py-2.5 text-[13.5px] text-ink no-underline last:border-0 hover:bg-tint",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs font-semibold text-accent",
								children: h.cardTitle
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted",
								children: h.path
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: h.text })
						]
					}, `${h.cardId}-${i}`))
				}) : null
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-6 flex flex-wrap gap-1.5",
			role: "group",
			"aria-label": "Filter tactics",
			children: FILTERS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setFilter(f.key),
				className: cn("rounded-sm border px-3.5 py-1.5 text-[13px] font-medium", filter === f.key ? "border-accent bg-accent text-paper" : "border-line bg-paper text-muted hover:text-ink"),
				children: f.label
			}, f.key))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 grid grid-cols-1 gap-4 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-sm border border-line bg-paper px-4 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 text-xs font-semibold tracking-wide text-muted uppercase",
					children: "Continue Previous Card"
				}), unfinished.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[13px] text-muted",
					children: "No unfinished cards."
				}) : unfinished.slice(0, 3).map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-line/50 py-2 last:border-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[13.5px] font-semibold",
						children: u.card.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-muted",
						children: [
							u.prog.done,
							" / ",
							u.prog.total,
							" completed"
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/tactics/$cardId",
						params: { cardId: u.card.id },
						className: "rounded-sm border border-accent px-2.5 py-1 text-xs font-semibold text-accent no-underline hover:bg-tint",
						children: "Continue →"
					})]
				}, u.card.id))]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-sm border border-line bg-paper px-4 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 text-xs font-semibold tracking-wide text-muted uppercase",
					children: "Recently Used"
				}), !hydrated || recent.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[13px] text-muted",
					children: "Recently used tactics will appear here."
				}) : recent.slice(0, 5).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/tactics/$cardId",
					params: { cardId: r.id },
					className: "flex items-center justify-between border-b border-line/50 py-2 text-[13.5px] text-ink no-underline last:border-0 hover:text-accent",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: CARDS[r.id].title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted",
						children: formatRelative(r.at)
					})]
				}, r.id))]
			})]
		}),
		results.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "py-12 text-center text-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-semibold",
				children: "No tactics found"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 text-[13.5px]",
				children: "Try another search term."
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 gap-4 md:grid-cols-2",
			children: results.map((c) => {
				const Icon = ICONS[c.icon];
				const acc = ACCENT[c.accent];
				const prog = getProgress(c, cardsState[c.id].checks);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/tactics/$cardId",
					params: { cardId: c.id },
					className: "relative overflow-hidden rounded-sm border border-line bg-paper p-5 text-ink no-underline transition-shadow hover:shadow-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute top-0 left-0 h-full w-1", acc.bar) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("flex size-9 shrink-0 items-center justify-center rounded-sm", acc.icon),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-[18px]" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-base font-bold leading-snug",
								children: c.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[13px] text-muted",
								children: c.subtitle
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap gap-4 text-[12.5px] text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-3.5" }),
									" ",
									c.sections.length,
									" sections"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquareCheckBig, { className: "size-3.5" }),
									" ",
									prog.total,
									" checks"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 text-xs font-semibold tracking-wide text-muted",
							children: c.ref
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-4 inline-flex items-center gap-1.5 rounded-sm bg-accent px-4 py-2 text-[13.5px] font-semibold text-paper",
							children: ["Open Action Card ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
						})
					]
				}, c.id);
			})
		})
	] }) });
}
//#endregion
export { TacticsDirectory as component };
