export type ComplaintStatus = 'new' | 'in_review' | 'resolved' | 'rejected';
export type ComplaintType = 'spam' | 'abuse' | 'fraud' | 'illegal' | 'misinformation' | 'other';
export type ComplaintPriority = 'critical' | 'high' | 'medium' | 'low';

export interface ViolationRecord {
  id: string;
  date: string;
  type: ComplaintType;
  action: 'warning' | 'mute' | 'ban_temp' | 'ban_perm' | 'content_removed' | 'none';
  description: string;
  moderator: string;
}

export interface Complaint {
  id: string;
  title: string;
  description: string;
  type: ComplaintType;
  status: ComplaintStatus;
  priority: ComplaintPriority;
  date: string;
  reporter: { name: string; avatar: string; email: string };
  target: { name: string; type: 'user' | 'post' | 'comment' | 'ad' };
  moderator?: string;
  tags: string[];
  evidence: string[];
  commentsCount: number;
  viewsCount: number;
  violationHistory?: ViolationRecord[];
}

export const complaints: Complaint[] = [
  {
    id: 'CMP-001',
    title: 'Массовая рассылка спама в личные сообщения',
    description: 'Пользователь систематически рассылает рекламные сообщения с фишинговыми ссылками всем новым участникам платформы. За последние 24 часа зафиксировано более 200 случаев. Ссылки ведут на мошеннические сайты, имитирующие страницы банков.',
    type: 'spam',
    status: 'new',
    priority: 'critical',
    date: '2026-04-05T09:23:00',
    reporter: { name: 'Алексей Морозов', avatar: 'АМ', email: 'a.morozov@mail.ru' },
    target: { name: '@spam_lord_777', type: 'user' },
    tags: ['фишинг', 'массовая рассылка', 'финансовое мошенничество'],
    evidence: ['screenshot_1.png', 'screenshot_2.png', 'chat_log.txt'],
    commentsCount: 3,
    viewsCount: 47,
    violationHistory: [
      { id: 'V-091', date: '2026-03-18T14:20:00', type: 'spam', action: 'warning', description: 'Рассылка рекламных сообщений в комментариях', moderator: 'Анна С.' },
      { id: 'V-072', date: '2026-02-05T09:10:00', type: 'spam', action: 'mute', description: 'Повторная спам-рассылка после предупреждения', moderator: 'Дмитрий К.' },
      { id: 'V-051', date: '2025-12-11T17:45:00', type: 'fraud', action: 'ban_temp', description: 'Фишинговые ссылки в личных сообщениях, временный бан на 7 дней', moderator: 'Анна С.' },
    ],
  },
  {
    id: 'CMP-002',
    title: 'Публикация контента с насилием',
    description: 'В разделе "Новости" опубликован пост с видеозаписью насилия без предупреждения о контенте для взрослых. Материал нарушает правила сообщества и законодательство РФ.',
    type: 'abuse',
    status: 'in_review',
    priority: 'high',
    date: '2026-04-05T08:15:00',
    reporter: { name: 'Мария Петрова', avatar: 'МП', email: 'm.petrova@yandex.ru' },
    target: { name: 'Пост #48291', type: 'post' },
    moderator: 'Дмитрий К.',
    tags: ['насилие', '18+', 'нарушение правил'],
    evidence: ['post_link.txt'],
    commentsCount: 8,
    viewsCount: 124,
  },
  {
    id: 'CMP-003',
    title: 'Продажа поддельных товаров в маркетплейсе',
    description: 'Продавец размещает объявления о продаже брендовых товаров по подозрительно низким ценам. Несколько покупателей подтвердили получение подделок вместо оригинальной продукции.',
    type: 'fraud',
    status: 'in_review',
    priority: 'high',
    date: '2026-04-04T22:41:00',
    reporter: { name: 'Сергей Волков', avatar: 'СВ', email: 's.volkov@gmail.com' },
    target: { name: 'Магазин "BrandShop"', type: 'user' },
    moderator: 'Анна С.',
    tags: ['подделка', 'мошенничество', 'маркетплейс'],
    evidence: ['receipt_1.jpg', 'receipt_2.jpg', 'comparison.jpg'],
    commentsCount: 12,
    viewsCount: 89,
    violationHistory: [
      { id: 'V-103', date: '2026-01-22T11:00:00', type: 'fraud', action: 'warning', description: 'Жалоба на несоответствие описания товара, предупреждение', moderator: 'Анна С.' },
    ],
  },
  {
    id: 'CMP-004',
    title: 'Распространение дезинформации о вакцинах',
    description: 'Пользователь публикует серию постов с ложной информацией о побочных эффектах вакцин, ссылаясь на несуществующие исследования. Посты активно распространяются.',
    type: 'misinformation',
    status: 'new',
    priority: 'medium',
    date: '2026-04-04T18:30:00',
    reporter: { name: 'Ольга Иванова', avatar: 'ОИ', email: 'o.ivanova@gmail.com' },
    target: { name: '@antivax_doctor', type: 'user' },
    tags: ['дезинформация', 'здоровье', 'вакцины'],
    evidence: ['posts_archive.zip'],
    commentsCount: 5,
    viewsCount: 203,
  },
  {
    id: 'CMP-005',
    title: 'Оскорбления в комментариях к статье',
    description: 'Пользователь оставляет оскорбительные комментарии с использованием нецензурной лексики и угрозами в адрес автора статьи и других пользователей.',
    type: 'abuse',
    status: 'resolved',
    priority: 'medium',
    date: '2026-04-04T14:12:00',
    reporter: { name: 'Иван Смирнов', avatar: 'ИС', email: 'i.smirnov@mail.ru' },
    target: { name: 'Комментарий #9912', type: 'comment' },
    moderator: 'Дмитрий К.',
    tags: ['оскорбления', 'угрозы', 'нецензурная лексика'],
    evidence: ['comment_screenshot.png'],
    commentsCount: 2,
    viewsCount: 31,
    violationHistory: [
      { id: 'V-088', date: '2026-03-01T09:30:00', type: 'abuse', action: 'warning', description: 'Оскорбительные высказывания в чате поддержки', moderator: 'Дмитрий К.' },
      { id: 'V-061', date: '2026-01-14T16:00:00', type: 'abuse', action: 'mute', description: 'Угрозы в адрес другого пользователя, мут на 24 часа', moderator: 'Анна С.' },
    ],
  },
  {
    id: 'CMP-006',
    title: 'Реклама запрещённых веществ',
    description: 'Объявление о продаже запрещённых психотропных веществ под видом "легальных энергетиков". Используется закодированный язык.',
    type: 'illegal',
    status: 'rejected',
    priority: 'low',
    date: '2026-04-03T11:05:00',
    reporter: { name: 'Пётр Козлов', avatar: 'ПК', email: 'p.kozlov@yandex.ru' },
    target: { name: 'Объявление #332', type: 'ad' },
    moderator: 'Анна С.',
    tags: ['запрещённые вещества', 'реклама'],
    evidence: ['ad_screenshot.png'],
    commentsCount: 1,
    viewsCount: 18,
  },
  {
    id: 'CMP-007',
    title: 'Кража интеллектуальной собственности',
    description: 'Пользователь публикует фотографии профессиональных фотографов без указания авторства и разрешения на использование.',
    type: 'other',
    status: 'new',
    priority: 'low',
    date: '2026-04-03T09:45:00',
    reporter: { name: 'Наталья Белова', avatar: 'НБ', email: 'n.belova@gmail.com' },
    target: { name: 'Альбом "Природа"', type: 'post' },
    tags: ['авторские права', 'кража контента'],
    evidence: ['original_source.txt', 'stolen_content.txt'],
    commentsCount: 0,
    viewsCount: 9,
  },
];

export const statusConfig: Record<ComplaintStatus, { label: string; color: string; bg: string; glow: string }> = {
  new: { label: 'Новая', color: '#0891b2', bg: 'rgba(8,145,178,0.1)', glow: 'rgba(8,145,178,0.2)' },
  in_review: { label: 'На проверке', color: '#db2777', bg: 'rgba(219,39,119,0.1)', glow: 'rgba(219,39,119,0.2)' },
  resolved: { label: 'Решена', color: '#16a34a', bg: 'rgba(22,163,74,0.1)', glow: 'rgba(22,163,74,0.2)' },
  rejected: { label: 'Отклонена', color: '#64748b', bg: 'rgba(100,116,139,0.1)', glow: 'rgba(100,116,139,0.2)' },
};

export const priorityConfig: Record<ComplaintPriority, { label: string; color: string; bg: string }> = {
  critical: { label: 'Критический', color: '#dc2626', bg: 'rgba(220,38,38,0.08)' },
  high: { label: 'Высокий', color: '#ea580c', bg: 'rgba(234,88,12,0.08)' },
  medium: { label: 'Средний', color: '#d97706', bg: 'rgba(217,119,6,0.08)' },
  low: { label: 'Низкий', color: '#64748b', bg: 'rgba(100,116,139,0.08)' },
};

export const actionConfig: Record<ViolationRecord['action'], { label: string; icon: string; color: string; bg: string }> = {
  warning:         { label: 'Предупреждение',    icon: 'AlertTriangle', color: '#d97706', bg: 'rgba(217,119,6,0.1)' },
  mute:            { label: 'Мут',               icon: 'MicOff',        color: '#7c3aed', bg: 'rgba(124,58,237,0.1)' },
  ban_temp:        { label: 'Временный бан',     icon: 'Clock',         color: '#ea580c', bg: 'rgba(234,88,12,0.1)' },
  ban_perm:        { label: 'Перманентный бан',  icon: 'Ban',           color: '#dc2626', bg: 'rgba(220,38,38,0.1)' },
  content_removed: { label: 'Контент удалён',    icon: 'Trash2',        color: '#64748b', bg: 'rgba(100,116,139,0.1)' },
  none:            { label: 'Без мер',           icon: 'Minus',         color: '#94a3b8', bg: 'rgba(148,163,184,0.08)' },
};

export const typeConfig: Record<ComplaintType, { label: string; icon: string }> = {
  spam: { label: 'Спам', icon: 'Mail' },
  abuse: { label: 'Оскорбления', icon: 'AlertTriangle' },
  fraud: { label: 'Мошенничество', icon: 'ShieldAlert' },
  illegal: { label: 'Нелегальный контент', icon: 'Ban' },
  misinformation: { label: 'Дезинформация', icon: 'MessageSquareWarning' },
  other: { label: 'Другое', icon: 'MoreHorizontal' },
};