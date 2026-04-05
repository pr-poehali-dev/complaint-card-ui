import { useState, useMemo } from 'react';
import { complaints, ComplaintStatus, ComplaintType, ComplaintPriority, statusConfig, priorityConfig, typeConfig } from '@/data/complaints';
import ComplaintCard from '@/components/ComplaintCard';
import ComplaintDetail from '@/components/ComplaintDetail';
import Icon from '@/components/ui/icon';

type FilterStatus = ComplaintStatus | 'all';
type FilterType = ComplaintType | 'all';
type FilterPriority = ComplaintPriority | 'all';

const statusCounts = (data: typeof complaints) => {
  const counts: Record<string, number> = { all: data.length };
  data.forEach(c => { counts[c.status] = (counts[c.status] || 0) + 1; });
  return counts;
};

export default function Index() {
  const [activeComplaintId, setActiveComplaintId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [filterPriority, setFilterPriority] = useState<FilterPriority>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'priority'>('date');
  const [showFilters, setShowFilters] = useState(false);

  const activeComplaint = complaints.find(c => c.id === activeComplaintId);

  const filtered = useMemo(() => {
    let result = [...complaints];
    if (filterStatus !== 'all') result = result.filter(c => c.status === filterStatus);
    if (filterType !== 'all') result = result.filter(c => c.type === filterType);
    if (filterPriority !== 'all') result = result.filter(c => c.priority === filterPriority);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q) ||
        c.target.name.toLowerCase().includes(q)
      );
    }
    const priorityOrder: Record<ComplaintPriority, number> = { critical: 0, high: 1, medium: 2, low: 3 };
    if (sortBy === 'priority') {
      result.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else {
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    return result;
  }, [filterStatus, filterType, filterPriority, searchQuery, sortBy]);

  const counts = statusCounts(complaints);
  const criticalCount = complaints.filter(c => c.priority === 'critical' && c.status === 'new').length;
  const hasActiveFilters = filterType !== 'all' || filterPriority !== 'all' || searchQuery;

  if (activeComplaint) {
    return (
      <div className="min-h-screen max-w-md mx-auto">
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 20% 0%, rgba(168,85,247,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 100%, rgba(34,211,238,0.06) 0%, transparent 60%)',
          }}
        />
        <ComplaintDetail complaint={activeComplaint} onBack={() => setActiveComplaintId(null)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-md mx-auto relative">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 70% 0%, rgba(168,85,247,0.1) 0%, transparent 50%), radial-gradient(ellipse at 30% 100%, rgba(34,211,238,0.07) 0%, transparent 50%)',
        }}
      />

      <div className="sticky top-0 z-20 glass border-b border-white/[0.06] px-4 pt-12 pb-3">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Модерация
              </h1>
              {criticalCount > 0 && (
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full animate-pulse-glow"
                  style={{ background: 'rgba(239,68,68,0.2)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)' }}
                >
                  {criticalCount} критичных
                </span>
              )}
            </div>
            <p className="text-xs text-white/30 mt-0.5">Журнал жалоб</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSortBy(s => s === 'date' ? 'priority' : 'date')}
              className="w-9 h-9 glass rounded-xl flex items-center justify-center transition-all hover:bg-white/10"
            >
              <Icon name={sortBy === 'date' ? 'Clock' : 'ArrowUpDown'} size={16} className="text-white/50" />
            </button>
            <button
              onClick={() => setShowFilters(f => !f)}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:bg-white/10 relative"
              style={{
                background: showFilters ? 'rgba(168,85,247,0.2)' : 'rgba(255,255,255,0.05)',
                border: showFilters ? '1px solid rgba(168,85,247,0.4)' : '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <Icon name="SlidersHorizontal" size={16} style={{ color: showFilters ? '#a855f7' : 'rgba(255,255,255,0.5)' }} />
              {hasActiveFilters && (
                <span
                  className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full"
                  style={{ background: '#a855f7', boxShadow: '0 0 6px #a855f7' }}
                />
              )}
            </button>
          </div>
        </div>

        <div className="relative mb-3">
          <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Поиск по жалобам..."
            className="w-full bg-white/[0.05] border border-white/[0.07] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white/80 placeholder-white/20 outline-none focus:border-purple-500/40 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <Icon name="X" size={14} className="text-white/30" />
            </button>
          )}
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
          {(['all', 'new', 'in_review', 'resolved', 'rejected'] as FilterStatus[]).map((s) => {
            const isAll = s === 'all';
            const cfg = isAll ? null : statusConfig[s];
            const active = filterStatus === s;
            return (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200"
                style={{
                  background: active ? (cfg ? cfg.bg : 'rgba(255,255,255,0.1)') : 'rgba(255,255,255,0.04)',
                  color: active ? (cfg ? cfg.color : 'white') : 'rgba(255,255,255,0.35)',
                  border: active ? `1px solid ${cfg ? cfg.color + '40' : 'rgba(255,255,255,0.2)'}` : '1px solid transparent',
                  boxShadow: active && cfg ? `0 0 10px ${cfg.glow}` : 'none',
                }}
              >
                {isAll ? 'Все' : cfg!.label}
                <span
                  className="text-xs px-1 py-0 rounded-md ml-0.5"
                  style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}
                >
                  {counts[s] || 0}
                </span>
              </button>
            );
          })}
        </div>

        {showFilters && (
          <div className="mt-3 space-y-2 animate-fade-in">
            <div>
              <p className="text-xs text-white/30 mb-1.5">Тип нарушения</p>
              <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
                {(['all', 'spam', 'abuse', 'fraud', 'illegal', 'misinformation', 'other'] as FilterType[]).map((t) => {
                  const cfg = t !== 'all' ? typeConfig[t] : null;
                  const active = filterType === t;
                  return (
                    <button
                      key={t}
                      onClick={() => setFilterType(t)}
                      className="shrink-0 px-3 py-1 rounded-lg text-xs font-medium transition-all"
                      style={{
                        background: active ? 'rgba(168,85,247,0.2)' : 'rgba(255,255,255,0.04)',
                        color: active ? '#a855f7' : 'rgba(255,255,255,0.35)',
                        border: active ? '1px solid rgba(168,85,247,0.35)' : '1px solid transparent',
                      }}
                    >
                      {t === 'all' ? 'Все типы' : cfg!.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <p className="text-xs text-white/30 mb-1.5">Приоритет</p>
              <div className="flex gap-1.5">
                {(['all', 'critical', 'high', 'medium', 'low'] as FilterPriority[]).map((p) => {
                  const cfg = p !== 'all' ? priorityConfig[p] : null;
                  const active = filterPriority === p;
                  return (
                    <button
                      key={p}
                      onClick={() => setFilterPriority(p)}
                      className="shrink-0 px-3 py-1 rounded-lg text-xs font-medium transition-all"
                      style={{
                        background: active ? (cfg ? cfg.bg : 'rgba(255,255,255,0.1)') : 'rgba(255,255,255,0.04)',
                        color: active ? (cfg ? cfg.color : 'white') : 'rgba(255,255,255,0.35)',
                        border: active ? `1px solid ${cfg ? cfg.color + '35' : 'rgba(255,255,255,0.2)'}` : '1px solid transparent',
                      }}
                    >
                      {p === 'all' ? 'Все' : cfg!.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-white/30">
            {filtered.length === complaints.length
              ? `${filtered.length} жалоб`
              : `${filtered.length} из ${complaints.length}`}
          </p>
          <p className="text-xs text-white/20">
            {sortBy === 'date' ? 'По дате' : 'По приоритету'}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.15)' }}
            >
              <Icon name="SearchX" size={28} className="text-white/20" />
            </div>
            <p className="text-sm font-semibold text-white/30">Ничего не найдено</p>
            <p className="text-xs text-white/15 mt-1">Попробуйте изменить фильтры</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {filtered.map((complaint, i) => (
              <ComplaintCard
                key={complaint.id}
                complaint={complaint}
                index={i}
                onClick={() => setActiveComplaintId(complaint.id)}
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
