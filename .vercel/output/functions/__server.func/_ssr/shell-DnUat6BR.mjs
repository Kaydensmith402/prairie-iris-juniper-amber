import { i as __toESM } from "../_runtime.mjs";
import { V as require_react, f as useRouterState, x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as useTacticsStore } from "./tactics-store-7v1K1lJQ.mjs";
import { t as X, u as Menu } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-DnUat6BR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function nowTime() {
	return (/* @__PURE__ */ new Date()).toLocaleTimeString("en-GB", {
		hour: "2-digit",
		minute: "2-digit"
	});
}
function formatRelative(ts) {
	const diff = Date.now() - ts;
	if (diff < 6e4) return "Just now";
	if (diff < 36e5) return `${Math.floor(diff / 6e4)} minutes ago`;
	if (diff < 864e5) return `${Math.floor(diff / 36e5)} hours ago`;
	return "Yesterday";
}
function formatSaved(iso) {
	if (!iso) return "—";
	return new Date(iso).toLocaleTimeString("en-GB", {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit"
	});
}
var NAV = [
	{
		to: "/",
		label: "Home",
		match: "home"
	},
	{
		to: "/",
		label: "CLARA",
		match: "none"
	},
	{
		to: "/",
		label: "Reports",
		match: "none"
	},
	{
		to: "/",
		label: "SIREN",
		match: "none"
	},
	{
		to: "/",
		label: "NAS",
		match: "none"
	},
	{
		to: "/",
		label: "NMCC",
		match: "none"
	},
	{
		to: "/tactics",
		label: "Tools",
		match: "tools"
	}
];
function AppShell({ children }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const operator = useTacticsStore((s) => s.operator);
	const role = useTacticsStore((s) => s.role);
	const uid = useTacticsStore((s) => s.uid);
	const toolsActive = pathname.startsWith("/tactics");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "no-print sticky top-0 z-50 h-14 border-b border-white/10 bg-navy text-paper",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-full items-center gap-3 px-4 sm:px-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex shrink-0 items-center gap-3 text-paper no-underline",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/stonehaven-crest.png",
							alt: "",
							width: 36,
							height: 36,
							className: "size-9 object-contain mix-blend-screen"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex flex-col leading-tight",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[15px] font-bold tracking-wide",
								children: "PoliceNet"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] font-medium text-paper/65",
								children: "Stonehaven Constabulary"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "ml-auto p-2 text-paper md:hidden",
						"aria-label": open ? "Close menu" : "Open menu",
						onClick: () => setOpen((v) => !v),
						children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "ml-6 hidden flex-1 items-center gap-1 md:flex",
						"aria-label": "Main",
						children: NAV.map((item) => {
							const active = item.match === "tools" ? toolsActive : item.match === "home" ? pathname === "/" : false;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: item.to,
								className: cn("rounded-sm px-3 py-1.5 text-[13.5px] font-medium text-paper/80 no-underline transition-colors", active && "bg-white/10 text-paper", !active && "hover:bg-white/10 hover:text-paper"),
								children: item.label
							}, item.label);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto hidden items-center gap-3 md:flex",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right leading-tight",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-[11px] text-paper/55",
										children: [
											"[",
											uid,
											"]"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[13px] font-semibold",
										children: operator
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] text-paper/65",
										children: role
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex size-9 items-center justify-center rounded-full bg-white/15 text-[13px] font-semibold",
								"aria-hidden": true,
								children: "KS"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "rounded-sm border border-white/25 px-2.5 py-1 text-xs text-paper/85 hover:bg-white/10",
								onClick: () => toast.info("Workstation session is local to this device."),
								children: "Sign out"
							})
						]
					})
				]
			}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-white/10 bg-navy px-3 py-2 md:hidden",
				children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: item.to,
					onClick: () => setOpen(false),
					className: "block rounded-sm px-3 py-2.5 text-sm font-medium text-paper/90 no-underline hover:bg-white/10",
					children: item.label
				}, item.label))
			}) : null]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children })]
	});
}
function PageFrame({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-7xl px-4 py-6 sm:px-5 sm:py-7",
		children
	});
}
//#endregion
export { formatSaved as a, formatRelative as i, PageFrame as n, nowTime as o, cn as r, AppShell as t };
