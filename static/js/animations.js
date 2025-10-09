/* ========================================
   MuskID - 高级动画与交互系统
   ======================================== */

// 初始化所有动画
export function initAnimations() {
  initScrollAnimations();
  initNavbarScroll();
  initSmoothScroll();
}

/* ========================================
   滚动动画 - Intersection Observer
   ======================================== */

function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -50px 0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 直接添加类，无延迟
        entry.target.classList.add("fi-in");

        // 一次性动画，观察后停止
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // 观察所有需要动画的元素
  const animatedElements = document.querySelectorAll(".fi-observe");
  animatedElements.forEach((el) => observer.observe(el));
}

/* ========================================
   导航栏滚动效果
   ======================================== */

function initNavbarScroll() {
  const nav = document.querySelector(".nav");
  if (!nav) return;

  let lastScroll = 0;
  let ticking = false;

  function updateNavbar() {
    const currentScroll = window.pageYOffset;

    // 滚动超过100px后添加背景
    if (currentScroll > 100) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }

    // 向下滚动时隐藏，向上滚动时显示
    if (currentScroll > lastScroll && currentScroll > 200) {
      nav.style.transform = "translateY(-100%)";
    } else {
      nav.style.transform = "translateY(0)";
    }

    lastScroll = currentScroll;
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    },
    { passive: true }
  );
}

/* ========================================
   平滑滚动
   ======================================== */

function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");

      // 跳过空锚点
      if (href === "#" || href === "#!") return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      // 计算目标位置（考虑导航栏高度）
      const navHeight = document.querySelector(".nav")?.offsetHeight || 0;
      const targetPosition = target.offsetTop - navHeight - 20;

      // 平滑滚动
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      // 更新URL（可选）
      if (history.pushState) {
        history.pushState(null, null, href);
      }
    });
  });
}

/* ========================================
   数字滚动动画
   ======================================== */

export function animateNumber(element, start, end, duration = 2000) {
  const range = end - start;
  const increment = range / (duration / 16); // 60fps
  let current = start;

  const timer = setInterval(() => {
    current += increment;

    if (
      (increment > 0 && current >= end) ||
      (increment < 0 && current <= end)
    ) {
      current = end;
      clearInterval(timer);
    }

    // 格式化数字（添加千位分隔符）
    element.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

/* ========================================
   文字打字机效果
   ======================================== */

export function typewriterEffect(element, text, speed = 50) {
  let index = 0;
  element.textContent = "";

  function type() {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(type, speed);
    }
  }

  type();
}

/* ========================================
   震动效果
   ======================================== */

export function shakeElement(element, duration = 500) {
  element.style.animation = `shake ${duration}ms ease-in-out`;

  setTimeout(() => {
    element.style.animation = "";
  }, duration);
}

// 添加震动关键帧
const shakeStyle = document.createElement("style");
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }
`;
document.head.appendChild(shakeStyle);

/* ========================================
   脉冲效果
   ======================================== */

export function pulseElement(element, duration = 1000) {
  element.style.animation = `pulse ${duration}ms ease-in-out`;

  setTimeout(() => {
    element.style.animation = "";
  }, duration);
}

// 添加脉冲关键帧
const pulseStyle = document.createElement("style");
pulseStyle.textContent = `
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
`;
document.head.appendChild(pulseStyle);

/* ========================================
   性能监控
   ======================================== */

function checkPerformance() {
  // 检测低性能设备
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
    document.documentElement.classList.add("low-performance");
  }

  // 检测慢速连接
  if ("connection" in navigator) {
    const connection = navigator.connection;
    if (
      connection.effectiveType === "slow-2g" ||
      connection.effectiveType === "2g"
    ) {
      document.documentElement.classList.add("slow-connection");
    }
  }
}

checkPerformance();

/* ========================================
   导出初始化函数
   ======================================== */

export default {
  initAnimations,
  animateNumber,
  typewriterEffect,
  shakeElement,
  pulseElement,
};
