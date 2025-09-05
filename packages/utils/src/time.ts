/**
 * 格式化时间 "YYYY/MM/DD HH:mm:ss"
 */
export function formatTime(time: Date): string {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, // 使用 24 小时制
  }).format(time);
}