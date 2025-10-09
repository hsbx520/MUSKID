export function setupObservers(){
  const io = new IntersectionObserver((es)=>es.forEach(e=>e.isIntersecting&&e.target.classList.add("fi-in")),{threshold:0.15});
  document.querySelectorAll(".fi-observe").forEach(el=>io.observe(el));
}

export function setupGlobalErrorGuards(){
  window.addEventListener("error", (e) => {
    if (String(e.message || "").toLowerCase().includes("disconnected port")) e.preventDefault();
    if (String(e.message || "").toLowerCase().includes("blocked a frame with origin")
      || String(e.message || "").toLowerCase().includes("failed to read a named property 'origin'")
      || String(e.message || "").toLowerCase().includes("securityerror")) {
      e.preventDefault();
    }
  }, true);
  window.addEventListener("unhandledrejection", (e) => {
    const msg = (e.reason?.message || String(e.reason || "")).toLowerCase();
    if (msg.includes("disconnected port")) e.preventDefault();
    if (msg.includes("blocked a frame with origin")
      || msg.includes("failed to read a named property 'origin'")
      || msg.includes("securityerror")) {
      e.preventDefault();
    }
  }, true);
}