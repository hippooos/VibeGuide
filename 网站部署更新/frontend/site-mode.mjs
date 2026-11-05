import { localIso } from './date-utils.mjs';

export function isShowcaseMode() {
  return globalThis.document?.querySelector('meta[name="ai-calendar-mode"]')?.content === 'showcase';
}

export function showcaseEvents(start, end, now = new Date()) {
  const monday = new Date(now);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(monday.getDate() - (monday.getDay() + 6) % 7);
  const examples = [
    [0, 19, 30, 30, '示例 · 阅读计划'],
    [2, 15, 0, 60, '示例 · 项目沟通'],
    [4, 19, 0, 30, '示例 · 晚间散步'],
  ];
  return examples.map(([day, hour, minute, duration, title], index) => {
    const begins = new Date(monday);
    begins.setDate(begins.getDate() + day);
    begins.setHours(hour, minute, 0, 0);
    return {
      id: `showcase-${index}`, source: 'ai', title,
      start_at: localIso(begins),
      end_at: localIso(new Date(begins.getTime() + duration * 60000)),
    };
  }).filter(event => new Date(event.start_at) < new Date(end) && new Date(event.end_at) > new Date(start));
}

export function showShowcaseNotice() {
  if (!isShowcaseMode()) return;
  const status = document.querySelector('.assistant-status');
  if (status) status.textContent = '● 界面展示';
  const main = document.querySelector('.main');
  if (main && !document.querySelector('.showcase-notice')) {
    const notice = document.createElement('p');
    notice.className = 'showcase-notice';
    notice.textContent = '示例日程 · 可浏览日历与输入界面。此网站不调用大模型；真实 AI 规划需连接后端服务。';
    main.prepend(notice);
  }
  document.querySelectorAll('#home-compose, [data-action="open"]').forEach(button => {
    button.textContent = '查看输入界面 ↗';
  });
}
