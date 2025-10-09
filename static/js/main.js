/* ========================================
   XPASS - 主入口文件（优化版本）
   ======================================== */

import { initAnimations } from "./animations.js";
import { presaleUI } from "./presale.js";
import { startCountdown } from "./countdown.js";
import { setupFeaturedMarquee, setupFeaturedClicks } from "./featured.js";
import { setupObservers, setupGlobalErrorGuards } from "./system.js";
import {
  initTokenomicsChart,
  initMobileTokenomicsInteraction,
} from "./tokenomics.js";
import { initRoadmap } from "./roadmap.js";
import { initMonument } from "./monument.js";
import { initFAQ } from "./faq.js";
import { initNavigation } from "./navigation.js";

// 性能优化：使用 DOMContentLoaded 快速初始化关键功能
window.addEventListener("DOMContentLoaded", () => {
  // 立即初始化关键交互
  initNavigation(); // 优先初始化导航
  setupObservers();
  setupGlobalErrorGuards();
  presaleUI();
  startCountdown();
  initFAQ();

  // 延迟加载非关键功能
  if (window.requestIdleCallback) {
    requestIdleCallback(
      () => {
        initAnimations();
        setupFeaturedMarquee();
        setupFeaturedClicks();
      },
      { timeout: 1000 }
    );
  } else {
    setTimeout(() => {
      initAnimations();
      setupFeaturedMarquee();
      setupFeaturedClicks();
    }, 100);
  }
});

// 使用 load 事件初始化重型功能
window.addEventListener("load", () => {
  // 延迟初始化图表和动画密集型功能
  if (window.requestIdleCallback) {
    requestIdleCallback(
      () => {
        initTokenomicsChart();
        initMobileTokenomicsInteraction();
        initRoadmap();
        initMonument();
      },
      { timeout: 500 }
    );
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(() => {
      initTokenomicsChart();
      initMobileTokenomicsInteraction();
      initRoadmap();
      initMonument();
    }, 500);
  }
});
