import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageFrame } from "@/components/layout/shell";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <AppShell>
      <PageFrame>
        <div className="mb-7 rounded-sm border border-line bg-paper px-6 py-5">
          <h1 className="text-[22px] font-bold">Welcome to PoliceNet</h1>
          <p className="mt-1 text-sm text-muted">
            Stonehaven Constabulary operational systems. Select a module below
            to continue.
          </p>
        </div>

        <p className="mb-3 text-xs font-semibold tracking-wider text-muted uppercase">
          Core Systems
        </p>
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Module title="CLARA" body="Command, Logistics and Resource Allocation" />
          <Module title="SIREN" body="Secure Incident Reporting & Event Notification" />
          <Module title="NAS" body="Nominal & Address Search" />
          <Module title="NMCC" body="National Mobile Control Console" />
        </div>

        <p className="mb-3 text-xs font-semibold tracking-wider text-muted uppercase">
          Tools
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            to="/tactics"
            className="block rounded-sm border border-line border-l-4 border-l-accent bg-paper px-5 py-4 text-left no-underline transition-shadow hover:shadow-sm"
          >
            <h2 className="text-[15px] font-semibold text-ink">Tactics Directory</h2>
            <p className="mt-1 text-[13px] leading-snug text-muted">
              Operational action cards for control room staff and Force Incident
              Managers.
            </p>
          </Link>
          <Module title="Reports" body="Operational and performance reporting suite" />
          <Module
            title="Duty Management"
            body="Shift patterns, abstractions and resource planning"
          />
        </div>
      </PageFrame>
    </AppShell>
  );
}

function Module({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-sm border border-line border-l-4 border-l-accent bg-paper px-5 py-4">
      <h2 className="text-[15px] font-semibold text-ink">{title}</h2>
      <p className="mt-1 text-[13px] leading-snug text-muted">{body}</p>
    </div>
  );
}
