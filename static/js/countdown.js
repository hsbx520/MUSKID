export function startCountdown() {
  // 目标时间戳：1758412800（秒），即 2025-09-21 00:00:00 UTC
  const targetUtcMs = 1760234400 * 1000;
  const set = (id, v) => {
    const el = document.getElementById(id);
    if (el) el.textContent = String(v).padStart(2, "0");
  };
  (function tick() {
    const diff = Math.max(0, targetUtcMs - Date.now());
    set("cdDays", Math.floor(diff / 86400000));
    set("cdHours", Math.floor((diff % 86400000) / 3600000));
    set("cdMinutes", Math.floor((diff % 3600000) / 60000));
    set("cdSeconds", Math.floor((diff % 60000) / 1000));
    if (diff > 0) setTimeout(tick, 1000);
  })();
}
