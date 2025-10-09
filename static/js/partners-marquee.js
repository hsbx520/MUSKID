/**
 * ========================================
 * Partners Section - 移动端跑马灯效果
 * ========================================
 */

class PartnersMarquee {
  constructor() {
    this.partnersGrid = document.querySelector(".partners__grid");
    this.isMobile = window.innerWidth <= 768;
    this.init();
  }

  init() {
    if (!this.partnersGrid) return;

    // 移动端：复制元素实现无缝跑马灯
    if (this.isMobile) {
      this.setupMarquee();
    }

    // 监听窗口大小变化
    window.addEventListener("resize", this.handleResize.bind(this));

    // 可选：触摸暂停功能
    this.addTouchPauseFeature();
  }

  /**
   * 设置跑马灯 - 复制元素实现无缝循环
   */
  setupMarquee() {
    // 获取所有合作伙伴 Logo
    const logos = Array.from(
      this.partnersGrid.querySelectorAll(".partners__logo")
    );

    if (logos.length === 0) return;

    // 复制一份所有 Logo 用于无缝循环
    logos.forEach((logo) => {
      const clone = logo.cloneNode(true);
      this.partnersGrid.appendChild(clone);
    });
  }

  /**
   * 清除跑马灯（桌面端恢复网格布局）
   */
  clearMarquee() {
    // 移除复制的元素，只保留原始元素
    const logos = Array.from(
      this.partnersGrid.querySelectorAll(".partners__logo")
    );
    const originalCount = Math.floor(logos.length / 2);

    // 移除后半部分（复制的元素）
    logos.slice(originalCount).forEach((logo) => logo.remove());
  }

  /**
   * 处理窗口大小变化
   */
  handleResize() {
    const nowMobile = window.innerWidth <= 768;

    // 从桌面切换到移动端
    if (!this.isMobile && nowMobile) {
      this.setupMarquee();
      this.isMobile = true;
    }
    // 从移动端切换到桌面端
    else if (this.isMobile && !nowMobile) {
      this.clearMarquee();
      this.isMobile = false;
    }
  }

  /**
   * 添加触摸暂停功能（可选）
   * 用户触摸时暂停跑马灯，释放后继续
   */
  addTouchPauseFeature() {
    if (!this.partnersGrid) return;

    // 触摸开始 - 暂停
    this.partnersGrid.addEventListener("touchstart", () => {
      if (this.isMobile) {
        this.partnersGrid.classList.add("paused");
      }
    });

    // 触摸结束 - 继续
    this.partnersGrid.addEventListener("touchend", () => {
      if (this.isMobile) {
        this.partnersGrid.classList.remove("paused");
      }
    });

    // 鼠标悬停 - 暂停（桌面端也可用）
    this.partnersGrid.addEventListener("mouseenter", () => {
      if (this.isMobile) {
        this.partnersGrid.classList.add("paused");
      }
    });

    this.partnersGrid.addEventListener("mouseleave", () => {
      if (this.isMobile) {
        this.partnersGrid.classList.remove("paused");
      }
    });
  }
}

// 初始化
document.addEventListener("DOMContentLoaded", () => {
  new PartnersMarquee();
});

// 如果页面已经加载完成，立即初始化
if (
  document.readyState === "complete" ||
  document.readyState === "interactive"
) {
  new PartnersMarquee();
}
