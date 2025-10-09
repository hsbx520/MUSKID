/* ========================================
   XPASS - Featured 区域（移动端跑马灯）
   ======================================== */

let toastTimer;

// Toast 通知
const toast = (message) => {
  const el = document.getElementById("toast");
  if (!el) return;

  clearTimeout(toastTimer);
  el.textContent = message;
  el.classList.add("show");

  toastTimer = setTimeout(() => {
    el.classList.remove("show");
  }, 1600);
};

// Featured 点击事件
export function setupFeaturedClicks() {
  const wrap = document.querySelector(".featured__logos");
  if (!wrap || wrap.dataset.clickInit) return;

  const handler = (e) => {
    const link = e.target.closest("a.featured__logo");
    if (link) {
      e.preventDefault();
      e.stopPropagation();
      toast("Coming soon");
    }
  };

  wrap.addEventListener("click", handler, { passive: false });
  wrap.dataset.clickInit = "1";
}

// Featured 跑马灯效果（移动端）
export function setupFeaturedMarquee() {
  const container = document.querySelector(".featured__logos");

  // 检查容器是否存在和是否已初始化
  if (!container || container.dataset.marqueeInit) return;

  // 只在移动端启用跑马灯
  const isMobile = window.innerWidth <= 768;
  if (!isMobile) {
    setupFeaturedClicks();
    return;
  }

  // 获取所有 logo 项
  const items = Array.from(container.children);
  if (items.length === 0) return;

  // 创建跑马灯轨道
  const track = document.createElement("div");
  track.className = "featured__track";

  // 添加原始项目
  items.forEach((item) => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
  });

  // 克隆一份以实现无缝循环
  items.forEach((item) => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
  });

  // 清空容器并添加轨道
  container.innerHTML = "";
  container.classList.add("marquee");
  container.appendChild(track);

  // 确保所有克隆的项目都显示
  track.querySelectorAll(".fi-observe").forEach((el) => {
    el.classList.add("fi-in");
  });

  // 标记为已初始化
  container.dataset.marqueeInit = "1";

  // 设置点击事件
  setupFeaturedClicks();
}

// 窗口大小改变时重新初始化
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const container = document.querySelector(".featured__logos");
    if (!container) return;

    const isMobile = window.innerWidth <= 768;
    const isMarquee = container.classList.contains("marquee");

    // 移动端需要跑马灯但当前不是，或桌面端不需要跑马灯但当前是
    if ((isMobile && !isMarquee) || (!isMobile && isMarquee)) {
      // 重新加载页面以重置布局（简单方案）
      delete container.dataset.marqueeInit;
      location.reload();
    }
  }, 500);
});
