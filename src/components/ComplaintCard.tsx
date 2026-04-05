import { Complaint, statusConfig, priorityConfig, typeConfig } from '@/data/complaints';
import Icon from '@/components/ui/icon';

interface ComplaintCardProps {
  complaint: Complaint;
  onClick: () => void;
  index: number;
}

export default function ComplaintCard({ complaint, onClick, index }: ComplaintCardProps) {
  const status = statusConfig[complaint.status];
  const priority = priorityConfig[complaint.priority];
  const type = typeConfig[complaint.type];

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return 'Только что';
    if (hours < 24) return `${hours}ч назад`;
    return d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
  };

  return (
    <div
      onClick={onClick}
      className="glass rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:shadow-lg group gradient-border animate-slide-up"
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'both' }}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs font-mono text-slate-400 shrink-0">{complaint.id}</span>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full shrink-0"
              style={{ color: status.color, background: status.bg }}
            >
              {status.label}
            </span>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full shrink-0"
              style={{ color: priority.color, background: priority.bg }}
            >
              {priority.label}
            </span>
          </div>

          <h3 className="font-semibold text-sm text-slate-800 leading-snug mb-1.5 group-hover:text-violet-700 transition-colors line-clamp-2">
            {complaint.title}
          </h3>

          <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-3">
            {complaint.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <Icon name={type.icon} fallback="AlertCircle" size={11} />
                <span>{type.label}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-300">
                <Icon name="Eye" size={11} />
                <span>{complaint.viewsCount}</span>
              </div>
              {complaint.commentsCount > 0 && (
                <div className="flex items-center gap-1 text-xs text-slate-300">
                  <Icon name="MessageSquare" size={11} />
                  <span>{complaint.commentsCount}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {complaint.moderator && (
                <span className="text-xs text-slate-400">{complaint.moderator}</span>
              )}
              <span className="text-xs text-slate-400">{formatDate(complaint.date)}</span>
            </div>
          </div>
        </div>

        {complaint.priority === 'critical' && (
          <div
            className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 animate-pulse-glow"
            style={{ background: '#dc2626', boxShadow: '0 0 6px rgba(220,38,38,0.6)' }}
          />
        )}
      </div>
    </div>
  );
}
