import { createFileRoute, redirect } from "@tanstack/react-router";
import { AppShell, PageFrame } from "@/components/layout/shell";
import { ActionCard } from "@/components/tactics/action-card";
import { CARDS, type CardId } from "@/data/cards";

function isCardId(id: string): id is CardId {
  return id in CARDS;
}

export const Route = createFileRoute("/tactics/$cardId")({
  beforeLoad: ({ params }) => {
    if (!isCardId(params.cardId)) {
      throw redirect({ to: "/tactics" });
    }
  },
  component: CardPage,
});

function CardPage() {
  const { cardId } = Route.useParams();
  if (!isCardId(cardId)) return null;
  return (
    <AppShell>
      <PageFrame>
        <ActionCard cardId={cardId} />
      </PageFrame>
    </AppShell>
  );
}
