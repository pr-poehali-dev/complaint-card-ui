export type ComplaintStatus = 'new' | 'in_review' | 'resolved' | 'rejected';
export type ComplaintType = 'spam' | 'abuse' | 'fraud' | 'illegal' | 'misinformation' | 'other';
export type ComplaintPriority = 'critical' | 'high' | 'medium' | 'low';

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
  new: { label: 'Новая', color: '#22d3ee', bg: 'rgba(34,211,238,0.12)', glow: 'rgba(34,211,238,0.3)' },
  in_review: { label: 'На проверке', color: '#f472b6', bg: 'rgba(244,114,182,0.12)', glow: 'rgba(244,114,182,0.3)' },
  resolved: { label: 'Решена', color: '#4ade80', bg: 'rgba(74,222,128,0.12)', glow: 'rgba(74,222,128,0.3)' },
  rejected: { label: 'Отклонена', color: '#94a3b8', bg: 'rgba(148,163,184,0.12)', glow: 'rgba(148,163,184,0.3)' },
};

export const priorityConfig: Record<ComplaintPriority, { label: string; color: string; bg: string }> = {
  critical: { label: 'Критический', color: '#ef4444', bg: 'rgba(239,68,68,0.12)' },
  high: { label: 'Высокий', color: '#fb923c', bg: 'rgba(251,146,60,0.12)' },
  medium: { label: 'Средний', color: '#fbbf24', bg: 'rgba(251,191,36,0.12)' },
  low: { label: 'Низкий', color: '#94a3b8', bg: 'rgba(148,163,184,0.12)' },
};

export const typeConfig: Record<ComplaintType, { label: string; icon: string }> = {
  spam: { label: 'Спам', icon: 'Mail' },
  abuse: { label: 'Оскорбления', icon: 'AlertTriangle' },
  fraud: { label: 'Мошенничество', icon: 'ShieldAlert' },
  illegal: { label: 'Нелегальный контент', icon: 'Ban' },
  misinformation: { label: 'Дезинформация', icon: 'MessageSquareWarning' },
  other: { label: 'Другое', icon: 'MoreHorizontal' },
};
