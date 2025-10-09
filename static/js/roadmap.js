/* ========================================
   Roadmap - 火箭发射轨迹交互系统
   ======================================== */

export function initRoadmap() {
  const nodes = document.querySelectorAll(".roadmap__node");
  const line = document.querySelector(".roadmap__line");
  const isMobile = window.innerWidth <= 900;
  const isTouchDevice = "ontouchstart" in window;

  // Set up intersection observer for animation
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animate line first
          if (entry.target === line) {
            entry.target.classList.add("fi-in");
          }

          // Then animate nodes with delay
          if (entry.target.classList.contains("roadmap__node")) {
            const index = Array.from(nodes).indexOf(entry.target);
            setTimeout(() => {
              entry.target.classList.add("fi-in");
            }, index * 100);
          }
        }
      });
    },
    { threshold: 0.3 }
  );

  // Observe line and nodes
  if (line) observer.observe(line);
  nodes.forEach((node) => observer.observe(node));

  // 移动端点击交互
  if (isMobile && isTouchDevice) {
    initMobileRoadmapInteraction(nodes);
  }
  // 桌面端悬停效果
  else {
    initDesktopRoadmapHover(nodes);
  }
}

/* ========================================
   移动端点击交互
   ======================================== */

function initMobileRoadmapInteraction(nodes) {
  nodes.forEach((node, index) => {
    // 点击节点展开/收起详情
    node.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const isActive = node.classList.contains("is-active");

      // 移除所有节点的激活状态
      nodes.forEach((n) => {
        n.classList.remove("is-active");
        // 强制重绘
        n.offsetHeight;
      });

      // 如果点击的不是当前激活的节点，激活它
      if (!isActive) {
        // 使用requestAnimationFrame确保DOM更新
        requestAnimationFrame(() => {
          node.classList.add("is-active");

          // 强制重绘以触发CSS过渡
          node.offsetHeight;

          // 触觉反馈
          if ("vibrate" in navigator) {
            navigator.vibrate(15);
          }

          // 平滑滚动到该节点
          setTimeout(() => {
            node.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }, 150);
        });
      }
      // 如果点击的是当前激活的节点，收起它
      else {
        // 轻微震动反馈
        if ("vibrate" in navigator) {
          navigator.vibrate(8);
        }
      }
    });

    // 触摸反馈
    node.addEventListener(
      "touchstart",
      () => {
        node.style.transition = "all 0.15s ease";
      },
      { passive: true }
    );

    node.addEventListener(
      "touchend",
      () => {
        setTimeout(() => {
          node.style.transition = "";
        }, 150);
      },
      { passive: true }
    );
  });

  // 点击外部区域收起所有节点
  document.addEventListener("click", (e) => {
    const roadmapSection = document.querySelector(".roadmap");
    if (!roadmapSection) return;

    // 检查点击是否在roadmap区域外
    if (!roadmapSection.contains(e.target)) {
      nodes.forEach((node) => {
        node.classList.remove("is-active");
      });
    }
  });
}

/* ========================================
   桌面端悬停效果
   ======================================== */

function initDesktopRoadmapHover(nodes) {
  nodes.forEach((node) => {
    const dot = node.querySelector(".roadmap__node-dot");

    if (dot) {
      node.addEventListener("mouseenter", () => {
        dot.style.boxShadow =
          "0 0 35px rgba(212,175,55,.9), 0 0 60px rgba(212,175,55,.5), inset 0 2px 12px rgba(255,255,255,.5)";
      });

      node.addEventListener("mouseleave", () => {
        dot.style.boxShadow = "";
      });
    }
  });
}

/* ========================================
   窗口大小改变时重新初始化
   ======================================== */

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const nodes = document.querySelectorAll(".roadmap__node");
    const newIsMobile = window.innerWidth <= 900;

    // 移除所有激活状态
    nodes.forEach((node) => {
      node.classList.remove("is-active");
    });
  }, 250);
});

export default initRoadmap;
