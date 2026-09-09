import { x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as PageFrame, t as AppShell } from "./shell-DnUat6BR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DNWAnJMC.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageFrame, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-7 rounded-sm border border-line bg-paper px-6 py-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-[22px] font-bold",
				children: "Welcome to PoliceNet"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Stonehaven Constabulary operational systems. Select a module below to continue."
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-3 text-xs font-semibold tracking-wider text-muted uppercase",
			children: "Core Systems"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Module, {
					title: "CLARA",
					body: "Command, Logistics and Resource Allocation"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Module, {
					title: "SIREN",
					body: "Secure Incident Reporting & Event Notification"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Module, {
					title: "NAS",
					body: "Nominal & Address Search"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Module, {
					title: "NMCC",
					body: "National Mobile Control Console"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-3 text-xs font-semibold tracking-wider text-muted uppercase",
			children: "Tools"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/tactics",
					className: "block rounded-sm border border-line border-l-4 border-l-accent bg-paper px-5 py-4 text-left no-underline transition-shadow hover:shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-[15px] font-semibold text-ink",
						children: "Tactics Directory"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[13px] leading-snug text-muted",
						children: "Operational action cards for control room staff and Force Incident Managers."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Module, {
					title: "Reports",
					body: "Operational and performance reporting suite"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Module, {
					title: "Duty Management",
					body: "Shift patterns, abstractions and resource planning"
				})
			]
		})
	] }) });
}
function Module({ title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-sm border border-line border-l-4 border-l-accent bg-paper px-5 py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-[15px] font-semibold text-ink",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-[13px] leading-snug text-muted",
			children: body
		})]
	});
}
//#endregion
export { Home as component };
