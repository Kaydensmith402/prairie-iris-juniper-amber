import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTacticsStore } from "@/lib/tactics-store";
import { toast } from "sonner";

const NAV = [
  { to: "/", label: "Home", match: "home" as const },
  { to: "/", label: "CLARA", match: "none" as const },
  { to: "/", label: "Reports", match: "none" as const },
  { to: "/", label: "SIREN", match: "none" as const },
  { to: "/", label: "NAS", match: "none" as const },
  { to: "/", label: "NMCC", match: "none" as const },
  { to: "/tactics", label: "Tools", match: "tools" as const },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const operator = useTacticsStore((s) => s.operator);
  const role = useTacticsStore((s) => s.role);
  const uid = useTacticsStore((s) => s.uid);

  const toolsActive = pathname.startsWith("/tactics");

  return (
    <div className="min-h-screen bg-page">
      <header className="no-print sticky top-0 z-50 h-14 border-b border-white/10 bg-navy text-paper">
        <div className="flex h-full items-center gap-3 px-4 sm:px-5">
          <Link to="/" className="flex shrink-0 items-center gap-3 text-paper no-underline">
            <img
              src="/stonehaven-crest.png"
              alt=""
              width={36}
              height={36}
              className="size-9 object-contain mix-blend-screen"
            />
            <span className="flex flex-col leading-tight">
              <span className="text-[15px] font-bold tracking-wide">PoliceNet</span>
              <span className="text-[11px] font-medium text-paper/65">
                Stonehaven Constabulary
              </span>
            </span>
          </Link>

          <button
            type="button"
            className="ml-auto p-2 text-paper md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>

          <nav className="ml-6 hidden flex-1 items-center gap-1 md:flex" aria-label="Main">
            {NAV.map((item) => {
              const active =
                item.match === "tools"
                  ? toolsActive
                  : item.match === "home"
                    ? pathname === "/"
                    : false;
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className={cn(
                    "rounded-sm px-3 py-1.5 text-[13.5px] font-medium text-paper/80 no-underline transition-colors",
                    active && "bg-white/10 text-paper",
                    !active && "hover:bg-white/10 hover:text-paper",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto hidden items-center gap-3 md:flex">
            <div className="text-right leading-tight">
              <div className="text-[11px] text-paper/55">[{uid}]</div>
              <div className="text-[13px] font-semibold">{operator}</div>
              <div className="text-[11px] text-paper/65">{role}</div>
            </div>
            <div
              className="flex size-9 items-center justify-center rounded-full bg-white/15 text-[13px] font-semibold"
              aria-hidden
            >
              KS
            </div>
            <button
              type="button"
              className="rounded-sm border border-white/25 px-2.5 py-1 text-xs text-paper/85 hover:bg-white/10"
              onClick={() =>
                toast.info("Workstation session is local to this device.")
              }
            >
              Sign out
            </button>
          </div>
        </div>
        {open ? (
          <div className="border-t border-white/10 bg-navy px-3 py-2 md:hidden">
            {NAV.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setOpen(false)}
                className="block rounded-sm px-3 py-2.5 text-sm font-medium text-paper/90 no-underline hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
          </div>
        ) : null}
      </header>
      <div>{children}</div>
    </div>
  );
}

export function PageFrame({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-7xl px-4 py-6 sm:px-5 sm:py-7">{children}</div>;
}
