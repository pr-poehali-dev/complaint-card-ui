import { Complaint, statusConfig, priorityConfig, typeConfig } from '@/data/complaints';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

interface ComplaintDetailProps {
  complaint: Complaint;
  onBack: () => void;
}

const actions = [
  { label: 'Одобрить жалобу', icon: 'CheckCircle', color: '#4ade80', bg: 'rgba(74,222,128,0.12)', hoverBg: 'rgba(74,222,128,0.22)' },
  { label: 'Отклонить', icon: 'XCircle', color: '#94a3b8', bg: 'rgba(148,163,184,0.08)', hoverBg: 'rgba(148,163,184,0.15)' },
  { label: 'Заблокировать', icon: 'Ban', color: '#ef4444', bg: 'rgba(239,68,68,0.12)', hoverBg: 'rgba(239,68,68,0.22)' },
  { label: 'Предупреждение', icon: 'AlertTriangle', color: '#fbbf24', bg: 'rgba(251,191,36,0.12)', hoverBg: 'rgba(251,191,36,0.22)' },
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
      <div
        className="flex items-center gap-3 px-4 py-3 glass border-b border-white/[0.06] sticky top-0 z-10"
      >
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-xl glass flex items-center justify-center transition-all hover:bg-white/10 active:scale-95"
        >
          <Icon name="ChevronLeft" size={20} className="text-white/70" />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-mono text-white/30">{complaint.id}</p>
          <p className="text-sm font-semibold text-white/90 truncate">{complaint.title}</p>
        </div>
        <div
          className="text-xs font-semibold px-3 py-1 rounded-full"
          style={{ color: status.color, background: status.bg, boxShadow: `0 0 12px ${status.glow}` }}
        >
          {status.label}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <div className="glass-strong rounded-2xl p-4 gradient-border">
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold"
              style={{ background: 'linear-gradient(135deg, #a855f7, #22d3ee)', color: 'white' }}
            >
              <Icon name={type.icon} fallback="AlertCircle" size={16} />
            </div>
            <div>
              <p className="text-xs text-white/40">Тип нарушения</p>
              <p className="text-sm font-semibold text-white/90">{type.label}</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: priority.color, boxShadow: `0 0 6px ${priority.color}` }}
              />
              <span className="text-xs font-semibold" style={{ color: priority.color }}>
                {priority.label}
              </span>
            </div>
          </div>

          <p className="text-sm text-white/70 leading-relaxed">
            {complaint.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="glass rounded-xl p-3">
            <p className="text-xs text-white/30 mb-1">Заявитель</p>
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                style={{ background: 'linear-gradient(135deg, #f472b6, #a855f7)' }}
              >
                {complaint.reporter.avatar}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white/80 truncate">{complaint.reporter.name}</p>
                <p className="text-xs text-white/30 truncate">{complaint.reporter.email}</p>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-3">
            <p className="text-xs text-white/30 mb-1">Объект жалобы</p>
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              >
                <Icon
                  name={complaint.target.type === 'user' ? 'User' : complaint.target.type === 'post' ? 'FileText' : complaint.target.type === 'comment' ? 'MessageSquare' : 'Megaphone'}
                  fallback="AlertCircle"
                  size={14}
                  className="text-white/50"
                />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white/80 truncate">{complaint.target.name}</p>
                <p className="text-xs text-white/30">{complaint.target.type}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-3">
          <p className="text-xs text-white/30 mb-2">Детали</p>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-white/40 flex items-center gap-1.5">
                <Icon name="Calendar" size={11} />
                Дата подачи
              </span>
              <span className="text-xs text-white/70">{formatDate(complaint.date)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-white/40 flex items-center gap-1.5">
                <Icon name="Eye" size={11} />
                Просмотров
              </span>
              <span className="text-xs text-white/70">{complaint.viewsCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-white/40 flex items-center gap-1.5">
                <Icon name="MessageSquare" size={11} />
                Комментариев
              </span>
              <span className="text-xs text-white/70">{complaint.commentsCount}</span>
            </div>
            {complaint.moderator && (
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/40 flex items-center gap-1.5">
                  <Icon name="Shield" size={11} />
                  Модератор
                </span>
                <span className="text-xs text-white/70">{complaint.moderator}</span>
              </div>
            )}
          </div>
        </div>

        {complaint.tags.length > 0 && (
          <div className="glass rounded-xl p-3">
            <p className="text-xs text-white/30 mb-2">Теги</p>
            <div className="flex flex-wrap gap-1.5">
              {complaint.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(168,85,247,0.12)', color: '#a855f7' }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {complaint.evidence.length > 0 && (
          <div className="glass rounded-xl p-3">
            <p className="text-xs text-white/30 mb-2">Доказательства ({complaint.evidence.length})</p>
            <div className="space-y-1.5">
              {complaint.evidence.map((file) => (
                <div
                  key={file}
                  className="flex items-center gap-2 p-2 rounded-lg transition-colors hover:bg-white/5 cursor-pointer"
                >
                  <Icon name="Paperclip" size={13} className="text-white/30 shrink-0" />
                  <span className="text-xs text-white/60 flex-1 truncate">{file}</span>
                  <Icon name="Download" size={13} className="text-white/20" />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="glass rounded-xl p-3">
          <p className="text-xs text-white/30 mb-2">Комментарий модератора</p>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Введите комментарий..."
            rows={3}
            className="w-full bg-transparent text-sm text-white/70 placeholder-white/20 resize-none outline-none leading-relaxed"
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
                border: `1px solid ${action.color}25`,
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
