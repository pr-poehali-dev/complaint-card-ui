import { Complaint, statusConfig, priorityConfig, typeConfig } from '@/data/complaints';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

interface ComplaintDetailProps {
  complaint: Complaint;
  onBack: () => void;
}

const actions = [
  { label: 'Одобрить жалобу', icon: 'CheckCircle', color: '#16a34a', bg: 'rgba(22,163,74,0.08)', hoverBg: 'rgba(22,163,74,0.15)', border: 'rgba(22,163,74,0.25)' },
  { label: 'Отклонить', icon: 'XCircle', color: '#64748b', bg: 'rgba(100,116,139,0.06)', hoverBg: 'rgba(100,116,139,0.12)', border: 'rgba(100,116,139,0.2)' },
  { label: 'Заблокировать', icon: 'Ban', color: '#dc2626', bg: 'rgba(220,38,38,0.08)', hoverBg: 'rgba(220,38,38,0.15)', border: 'rgba(220,38,38,0.25)' },
  { label: 'Предупреждение', icon: 'AlertTriangle', color: '#d97706', bg: 'rgba(217,119,6,0.08)', hoverBg: 'rgba(217,119,6,0.15)', border: 'rgba(217,119,6,0.25)' },
];

export default function ComplaintDetail({ complaint, onBack }: ComplaintDetailProps) {
  const status = statusConfig[complaint.status];
  const priority = priorityConfig[complaint.priority];
  const type = typeConfig[complaint.type];
  const [comment, setComment] = useState('');
  const [hoveredAction, setHoveredAction] = useState<number | null>(null);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('ru-RU', {
      day: '2-digit', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="flex items-center gap-3 px-4 py-3 glass border-b border-slate-100 sticky top-0 z-10">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center transition-all hover:bg-slate-200 active:scale-95"
        >
          <Icon name="ChevronLeft" size={20} className="text-slate-500" />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-mono text-slate-400">{complaint.id}</p>
          <p className="text-sm font-semibold text-slate-800 truncate">{complaint.title}</p>
        </div>
        <div
          className="text-xs font-semibold px-3 py-1 rounded-full"
          style={{ color: status.color, background: status.bg, boxShadow: `0 2px 8px ${status.glow}` }}
        >
          {status.label}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <div className="glass-strong rounded-2xl p-4 gradient-border">
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)', color: 'white' }}
            >
              <Icon name={type.icon} fallback="AlertCircle" size={16} />
            </div>
            <div>
              <p className="text-xs text-slate-400">Тип нарушения</p>
              <p className="text-sm font-semibold text-slate-800">{type.label}</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: priority.color, boxShadow: `0 0 5px ${priority.color}` }}
              />
              <span className="text-xs font-semibold" style={{ color: priority.color }}>
                {priority.label}
              </span>
            </div>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">{complaint.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="glass rounded-xl p-3">
            <p className="text-xs text-slate-400 mb-1">Заявитель</p>
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0"
                style={{ background: 'linear-gradient(135deg, #db2777, #7c3aed)' }}
              >
                {complaint.reporter.avatar}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-700 truncate">{complaint.reporter.name}</p>
                <p className="text-xs text-slate-400 truncate">{complaint.reporter.email}</p>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-3">
            <p className="text-xs text-slate-400 mb-1">Объект жалобы</p>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-slate-100">
                <Icon
                  name={complaint.target.type === 'user' ? 'User' : complaint.target.type === 'post' ? 'FileText' : complaint.target.type === 'comment' ? 'MessageSquare' : 'Megaphone'}
                  fallback="AlertCircle"
                  size={14}
                  className="text-slate-400"
                />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-700 truncate">{complaint.target.name}</p>
                <p className="text-xs text-slate-400">{complaint.target.type}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-3">
          <p className="text-xs text-slate-400 mb-2">Детали</p>
          <div className="space-y-2">
            {[
              { icon: 'Calendar', label: 'Дата подачи', value: formatDate(complaint.date) },
              { icon: 'Eye', label: 'Просмотров', value: String(complaint.viewsCount) },
              { icon: 'MessageSquare', label: 'Комментариев', value: String(complaint.commentsCount) },
              ...(complaint.moderator ? [{ icon: 'Shield', label: 'Модератор', value: complaint.moderator }] : []),
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex justify-between items-center">
                <span className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Icon name={icon} fallback="Circle" size={11} />
                  {label}
                </span>
                <span className="text-xs text-slate-600 font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {complaint.tags.length > 0 && (
          <div className="glass rounded-xl p-3">
            <p className="text-xs text-slate-400 mb-2">Теги</p>
            <div className="flex flex-wrap gap-1.5">
              {complaint.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background: 'rgba(124,58,237,0.08)', color: '#7c3aed' }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {complaint.evidence.length > 0 && (
          <div className="glass rounded-xl p-3">
            <p className="text-xs text-slate-400 mb-2">Доказательства ({complaint.evidence.length})</p>
            <div className="space-y-1.5">
              {complaint.evidence.map((file) => (
                <div
                  key={file}
                  className="flex items-center gap-2 p-2 rounded-lg transition-colors hover:bg-slate-50 cursor-pointer"
                >
                  <Icon name="Paperclip" size={13} className="text-slate-300 shrink-0" />
                  <span className="text-xs text-slate-500 flex-1 truncate">{file}</span>
                  <Icon name="Download" size={13} className="text-slate-300" />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="glass rounded-xl p-3">
          <p className="text-xs text-slate-400 mb-2">Комментарий модератора</p>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Введите комментарий..."
            rows={3}
            className="w-full bg-transparent text-sm text-slate-600 placeholder-slate-300 resize-none outline-none leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-2 gap-2 pb-2">
          {actions.map((action, i) => (
            <button
              key={action.label}
              onMouseEnter={() => setHoveredAction(i)}
              onMouseLeave={() => setHoveredAction(null)}
              className="flex items-center gap-2 p-3 rounded-xl transition-all duration-200 active:scale-95"
              style={{
                background: hoveredAction === i ? action.hoverBg : action.bg,
                border: `1px solid ${action.border}`,
              }}
            >
              <Icon name={action.icon} fallback="Circle" size={16} style={{ color: action.color }} />
              <span className="text-xs font-semibold" style={{ color: action.color }}>
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
