/* ========================================
   XPASS - 移动端导航菜单控制
   ======================================== */

export function initMobileNav() {
  const hamburger = document.querySelector(".nav__hamburger");
  const navLinks = document.querySelector(".nav__links");
  const body = document.body;

  if (!hamburger || !navLinks) return;

  // 创建遮罩层
  const overlay = document.createElement("div");
  overlay.className = "nav__overlay";
  document.body.appendChild(overlay);

  // 切换菜单状态
  function toggleMenu() {
    const isOpen = hamburger.getAttribute("aria-expanded") === "true";

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // 打开菜单
  function openMenu() {
    hamburger.setAttribute("aria-expanded", "true");
    navLinks.classList.add("is-open");
    overlay.classList.add("is-visible");
    body.classList.add("nav-open");

    // 添加焦点陷阱
    trapFocus(navLinks);
  }

  // 关闭菜单
  function closeMenu() {
    hamburger.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("is-open");
    overlay.classList.remove("is-visible");
    body.classList.remove("nav-open");
  }

  // 汉堡按钮点击事件
  hamburger.addEventListener("click", toggleMenu);

  // 遮罩点击关闭
  overlay.addEventListener("click", closeMenu);

  // 导航链接点击后关闭菜单并跳转
  const links = navLinks.querySelectorAll("a");
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");

      if (href && href.startsWith("#")) {
        e.preventDefault(); // 阻止默认跳转

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        // 先关闭菜单
        closeMenu();

        // 等待菜单关闭动画完成后再滚动
        setTimeout(() => {
          if (targetElement) {
            // 平滑滚动到目标位置
            targetElement.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });

            // 更新URL（不触发页面重载）
            history.pushState(null, "", href);
          }
        }, 400); // 等待菜单关闭动画（0.4s）
      } else {
        // 外部链接直接关闭菜单
        closeMenu();
      }
    });
  });

  // ESC键关闭菜单
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks.classList.contains("is-open")) {
      closeMenu();
      hamburger.focus();
    }
  });

  // 窗口大小改变时关闭菜单
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 768 && navLinks.classList.contains("is-open")) {
        closeMenu();
      }
    }, 250);
  });

  // 焦点陷阱（无障碍功能）
  function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    element.addEventListener("keydown", function (e) {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    });
  }
}

/* ========================================
   导航栏滚动效果增强
   ======================================== */

export function initNavScroll() {
  const nav = document.querySelector(".nav");
  if (!nav) return;

  let lastScroll = 0;
  let ticking = false;

  function updateNav() {
    const currentScroll = window.pageYOffset;

    // 滚动超过100px添加阴影
    if (currentScroll > 100) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }

    // 移动端不隐藏导航栏
    if (window.innerWidth <= 768) {
      nav.style.transform = "translateY(0)";
    } else {
      // 桌面端向下滚动时隐藏，向上滚动时显示
      if (currentScroll > lastScroll && currentScroll > 200) {
        nav.style.transform = "translateY(-100%)";
      } else {
        nav.style.transform = "translateY(0)";
      }
    }

    lastScroll = currentScroll;
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNav);
        ticking = true;
      }
    },
    { passive: true }
  );
}

/* ========================================
   活动链接高亮
   ======================================== */

export function initActiveLinks() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');

  if (sections.length === 0 || navLinks.length === 0) return;

  function updateActiveLink() {
    let currentSection = "";
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("is-active");
      const href = link.getAttribute("href");
      if (href === `#${currentSection}`) {
        link.classList.add("is-active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink, { passive: true });
  updateActiveLink(); // 初始化
}

/* ========================================
   导出初始化函数
   ======================================== */

export function initNavigation() {
  initMobileNav();
  initNavScroll();
  initActiveLinks();
}

export default initNavigation;
