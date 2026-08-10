import { Component } from "./component.js";

/**
 * A fixed, full-viewport decorative layer sitting behind all page content:
 * four large drifting color blobs (blue/red, matching the brand palette)
 * for ambient wash, plus a soft gradient glow that trails the cursor.
 *
 * The cursor glow uses a requestAnimationFrame lerp loop rather than a CSS
 * transition — each frame it eases a fraction of the way toward the actual
 * mouse position, so it visibly lags and catches up like a fluid blob
 * rather than snapping straight to the pointer. (An earlier version used a
 * canvas particle swarm here — removed per feedback that it looked bad;
 * this single soft blob replaces it.)
 *
 * Mounted once per page from main.js and appended directly to <body>.
 * Purely decorative (pointer-events: none throughout) and sits behind
 * every real element via a negative z-index, so it's only visible in
 * empty background space.
 */
export class AmbientBackgroundComponent extends Component {
  render() {
    return `
      <div class="ambient-blob ambient-blob-1"></div>
      <div class="ambient-blob ambient-blob-2"></div>
      <div class="ambient-blob ambient-blob-3"></div>
      <div class="ambient-blob ambient-blob-4"></div>
      <div class="ambient-cursor-glow" id="ambientCursorGlow"></div>`;
  }

  afterMount(el) {
    const glow = el.querySelector("#ambientCursorGlow");
    if (!glow) return;

    const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return; // it's a motion effect by nature — skip it entirely

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;
    let hasMoved = false;
    let hideTimer;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      hasMoved = true;
      glow.classList.add("active");
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => glow.classList.remove("active"), 3000);
    });
    document.addEventListener("mouseleave", () => glow.classList.remove("active"));

    const loop = () => {
      // ease a fraction of the remaining distance each frame — the lag
      // between glowX/Y and mouseX/Y is what makes it read as a fluid,
      // slightly viscous blob rather than something rigidly glued to the cursor
      glowX += (mouseX - glowX) * 0.07;
      glowY += (mouseY - glowY) * 0.07;
      if (hasMoved) {
        glow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;
      }
      requestAnimationFrame(loop);
    };
    loop();
  }
}
