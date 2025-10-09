/* ========================================
   Tokenomics - 图表和交互系统
   ======================================== */

export function initTokenomicsChart() {
  const canvas = document.getElementById("tokenomicsChart");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;

  // 检测是否为移动端
  const isMobile = window.innerWidth <= 768;
  const isTouchDevice = "ontouchstart" in window;

  // Set canvas size
  const size = 400;
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  ctx.scale(dpr, dpr);
  canvas.style.width = size + "px";
  canvas.style.height = size + "px";

  const centerX = size / 2;
  const centerY = size / 2;
  const outerRadius = 150;
  const innerRadius = 80;

  // 金色主题数据
  const data = [
    {
      label: "Presale",
      value: 40,
      color: "#ffd700",
      glowColor: "rgba(255,215,0,0.8)",
      id: "presale",
    },
    {
      label: "Liquidity",
      value: 20,
      color: "#d4af37",
      glowColor: "rgba(212,175,55,0.8)",
      id: "liquidity",
    },
    {
      label: "Community",
      value: 15,
      color: "#f4d03f",
      glowColor: "rgba(244,208,63,0.8)",
      id: "community",
    },
    {
      label: "Team",
      value: 10,
      color: "#c5a035",
      glowColor: "rgba(197,160,53,0.8)",
      id: "team",
    },
    {
      label: "Marketing",
      value: 10,
      color: "#b8994d",
      glowColor: "rgba(184,153,77,0.8)",
      id: "marketing",
    },
    {
      label: "Reserve",
      value: 5,
      color: "#9b8033",
      glowColor: "rgba(155,128,51,0.8)",
      id: "reserve",
    },
  ];

  let hoveredSegment = -1;
  let startAngle = -Math.PI / 2;

  function getSegmentFromMouse(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left - centerX;
    const y = event.clientY - rect.top - centerY;
    const distance = Math.sqrt(x * x + y * y);

    if (distance < innerRadius || distance > outerRadius) return -1;

    let angle = Math.atan2(y, x) + Math.PI / 2;
    if (angle < 0) angle += 2 * Math.PI;

    let currentAngle = 0;
    for (let i = 0; i < data.length; i++) {
      const sliceAngle = (data[i].value / 100) * 2 * Math.PI;
      if (angle >= currentAngle && angle <= currentAngle + sliceAngle) {
        return i;
      }
      currentAngle += sliceAngle;
    }
    return -1;
  }

  function drawChart() {
    ctx.clearRect(0, 0, size, size);
    let currentStartAngle = startAngle;

    data.forEach((item, index) => {
      const sliceAngle = (item.value / 100) * 2 * Math.PI;
      const isHovered = hoveredSegment === index;
      const radius = isHovered ? outerRadius + 10 : outerRadius;

      // Draw main slice
      ctx.beginPath();
      ctx.arc(
        centerX,
        centerY,
        radius,
        currentStartAngle,
        currentStartAngle + sliceAngle
      );
      ctx.arc(
        centerX,
        centerY,
        innerRadius,
        currentStartAngle + sliceAngle,
        currentStartAngle,
        true
      );
      ctx.closePath();

      ctx.fillStyle = item.color;
      ctx.shadowBlur = isHovered ? 35 : 22;
      ctx.shadowColor = isHovered ? item.glowColor : "rgba(212,175,55,0.4)";
      ctx.fill();

      // Draw percentage label
      const labelAngle = currentStartAngle + sliceAngle / 2;
      const labelRadius = (radius + innerRadius) / 2;
      const labelX = centerX + Math.cos(labelAngle) * labelRadius;
      const labelY = centerY + Math.sin(labelAngle) * labelRadius;

      ctx.shadowBlur = 0;
      ctx.fillStyle = isHovered ? "#000000" : "rgba(0,0,0,0.9)";
      ctx.font = isHovered
        ? "bold 18px Orbitron, sans-serif"
        : "bold 16px Orbitron, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`${item.value}%`, labelX, labelY);

      currentStartAngle += sliceAngle;
    });

    // Draw center circle
    ctx.shadowBlur = 28;
    ctx.shadowColor = "rgba(212,175,55,0.5)";
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius - 10, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(0,0,0,0.85)";
    ctx.fill();

    // Draw center text
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#d4af37";
    ctx.font = "bold 15px Orbitron, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("MUSKID", centerX, centerY - 8);
    ctx.font = "13px Inter, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.fillText("1B Total", centerX, centerY + 12);
  }

  // Mouse interaction (桌面端)
  if (!isTouchDevice) {
    canvas.addEventListener("mousemove", (event) => {
      const newHovered = getSegmentFromMouse(event);
      if (newHovered !== hoveredSegment) {
        hoveredSegment = newHovered;
        drawChart();
        updateDescriptionHighlight();
      }
    });

    canvas.addEventListener("mouseleave", () => {
      if (hoveredSegment !== -1) {
        hoveredSegment = -1;
        drawChart();
        updateDescriptionHighlight();
      }
    });
  }

  // Description item interaction
  function setupDescriptionInteraction() {
    const items = document.querySelectorAll(".tokenomics__item");

    items.forEach((item, index) => {
      // 桌面端悬停
      if (!isTouchDevice) {
        item.addEventListener("mouseenter", () => {
          hoveredSegment = index;
          drawChart();
          updateDescriptionHighlight();
        });

        item.addEventListener("mouseleave", () => {
          hoveredSegment = -1;
          drawChart();
          updateDescriptionHighlight();
        });
      }
      // 移动端点击
      else {
        item.addEventListener("click", (e) => {
          e.preventDefault();

          // 移除其他卡片的激活状态
          items.forEach((otherItem) => {
            if (otherItem !== item) {
              otherItem.classList.remove("is-active");
            }
          });

          // 切换当前卡片激活状态
          const isActive = item.classList.contains("is-active");

          if (isActive) {
            item.classList.remove("is-active");
            hoveredSegment = -1;
          } else {
            item.classList.add("is-active");
            hoveredSegment = index;
          }

          drawChart();

          // 添加触觉反馈（如果支持）
          if ("vibrate" in navigator) {
            navigator.vibrate(10);
          }
        });
      }
    });
  }

  function updateDescriptionHighlight() {
    const items = document.querySelectorAll(".tokenomics__item");
    items.forEach((item, index) => {
      if (!isTouchDevice) {
        if (hoveredSegment === index) {
          item.classList.add("tokenomics__item--highlighted");
        } else {
          item.classList.remove("tokenomics__item--highlighted");
        }
      }
    });
  }

  // Animate chart on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          drawChart();
          setupDescriptionInteraction();
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(canvas);

  // 窗口大小改变时重绘
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      drawChart();
    }, 250);
  });
}

/* ========================================
   移动端交互增强
   ======================================== */

export function initMobileTokenomicsInteraction() {
  const isTouchDevice = "ontouchstart" in window;
  if (!isTouchDevice) return;

  const items = document.querySelectorAll(".tokenomics__item");

  items.forEach((item, index) => {
    // 添加触摸反馈动画
    item.addEventListener("touchstart", () => {
      item.style.transition = "all 0.15s ease";
    });

    item.addEventListener("touchend", () => {
      item.style.transition = "";
    });
  });
}
