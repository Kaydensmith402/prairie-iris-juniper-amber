// src/routes/tactics/index.tsx
import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, useMemo } from 'react';
import { tacticCards, FilterKey, type TacticCard } from '@/data/cards';
import { Icon } from '@/components/icons'; // adjust import

export const Route = createFileRoute('/tactics/')({
  component: TacticsPage,
});

const ALL_FILTERS: FilterKey[] = [
  'emergency',
  'crime',
  'vulnerability',
  'roads',
  'multi_agency',
  'public_safety',
  'control_room',
];

const priorityColors: Record<string, string> = {
  critical: 'bg-red-600 text-white',
  high: 'bg-orange-500 text-white',
  medium: 'bg-yellow-500 text-black',
  low: 'bg-gray-400 text-black',
};

const priorityLabel: Record<string, string> = {
  critical: 'CRITICAL',
  high: 'HIGH',
  medium: 'MEDIUM',
  low: 'LOW',
};

function TacticsPage() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterKey | 'all'>('all');

  const filteredCards = useMemo(() => {
    let cards = tacticCards;

    // Filter by category
    if (activeFilter !== 'all') {
      cards = cards.filter((card) => card.filters.includes(activeFilter));
    }

    // Search by title, subtitle, or any section item
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      cards = cards.filter((card) => {
        const matchTitle = card.title.toLowerCase().includes(q);
        const matchSub = card.subtitle.toLowerCase().includes(q);
        const matchSections = card.sections.some((sec) =>
          sec.items.some((item) => item.toLowerCase().includes(q))
        );
        return matchTitle || matchSub || matchSections;
      });
    }

    return cards;
  }, [search, activeFilter]);

  const totalSteps = (card: TacticCard) =>
    card.sections.reduce((sum, sec) => sum + sec.items.length, 0);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-primary">Tactics &amp; Action Cards</h1>
        <div className="text-sm text-secondary">{filteredCards.length} cards</div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search action cards..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border border-border rounded-lg bg-bg-secondary text-primary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
            activeFilter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-primary hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          All
        </button>
        {ALL_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition capitalize ${
              activeFilter === f
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-primary hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {f.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredCards.map((card) => (
          <Link
            key={card.id}
            to={`/tactics/${card.id}`}
            className="block bg-panel border border-border rounded-lg p-5 hover:shadow-lg transition hover:border-blue-500 dark:hover:border-blue-400"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Icon name={card.icon} className="w-5 h-5 text-secondary" />
                <h3 className="font-semibold text-primary">{card.title}</h3>
              </div>
              <span
                className={`text-xs px-2 py-0.5 rounded font-bold ${priorityColors[card.priority]}`}
              >
                {priorityLabel[card.priority]}
              </span>
            </div>
            <p className="text-sm text-secondary mt-1">{card.subtitle}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {card.filters.slice(0, 2).map((f) => (
                <span
                  key={f}
                  className="text-xs bg-gray-200 dark:bg-gray-700 text-secondary px-2 py-0.5 rounded-full"
                >
                  {f.replace('_', ' ')}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between mt-3 text-xs text-secondary border-t border-border pt-3">
              <span>{totalSteps(card)} checks</span>
              <span>Reviewed: {card.lastReviewed}</span>
            </div>
          </Link>
        ))}
      </div>

      {filteredCards.length === 0 && (
        <div className="text-center py-12 text-secondary">
          No action cards match your search or filter.
        </div>
      )}
    </div>
  );
}
