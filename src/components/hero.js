import { Component } from "./component.js";
import { ICONS } from "../data/icons.js";

/**
 * The home hero: copy + CTAs + stat row on the left, a stacked-card
 * carousel on the right showcasing four "faces" of the company —
 * overview, technology/business systems, construction, and PCB/
 * manufacturing. Cards sit layered (front card full size, others peeking
 * behind), auto-cycling on an interval via afterMount(); the floating
 * stat badges and division tags stay pinned on top of the stack rather
 * than belonging to any one card, since they're company-wide facts.
 */
export class HeroComponent extends Component {
  constructor(stats) {
    super({ stats });
  }

  findStat(labelMatch) {
    return this.props.stats.find((s) => s.label.toLowerCase().includes(labelMatch));
  }

  /** Shared blueprint grid background, reused across every slide for visual consistency. */
  static grid() {
    return `
      <g stroke="rgba(255,255,255,0.14)" stroke-width="1">
        ${Array.from({ length: 7 }).map((_, i) => `<line x1="${i * 48}" y1="0" x2="${i * 48}" y2="260"/>`).join("")}
        ${Array.from({ length: 6 }).map((_, i) => `<line x1="0" y1="${i * 48}" x2="320" y2="${i * 48}"/>`).join("")}
      </g>`;
  }

  /** Slide 1 — the original three-division overview. */
  static slideOverview() {
    return `
      <svg class="hero-node-diagram" viewBox="0 0 320 260" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        ${HeroComponent.grid()}
        <path d="M90 70 L 230 70 L 160 190 Z" stroke="rgba(255,255,255,0.55)" stroke-width="1.6" stroke-dasharray="4 5" fill="none"/>
        <circle cx="48" cy="118" r="3" fill="#E23B3B"/>
        <circle cx="272" cy="118" r="3" fill="#E23B3B"/>
        <circle cx="160" cy="22" r="3" fill="rgba(255,255,255,0.5)"/>
        <g>
          <circle cx="90" cy="70" r="34" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1"/>
          <circle cx="90" cy="70" r="30" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.5)" stroke-width="1.4"/>
          <text x="90" y="76" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="17" fill="#fff">C</text>
        </g>
        <g>
          <circle cx="230" cy="70" r="34" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1"/>
          <circle cx="230" cy="70" r="30" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.5)" stroke-width="1.4"/>
          <text x="230" y="76" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="17" fill="#fff">M</text>
        </g>
        <g>
          <circle cx="160" cy="190" r="36" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1"/>
          <circle cx="160" cy="190" r="30" fill="rgba(226,59,59,0.18)" stroke="rgba(255,255,255,0.9)" stroke-width="1.4"/>
          <text x="160" y="196" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="17" fill="#fff">P</text>
        </g>
      </svg>`;
  }

  /** Slide 2 — technology / business systems: a dashboard wireframe. */
  static slideTechnology() {
    return `
      <svg class="hero-node-diagram" viewBox="0 0 320 260" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        ${HeroComponent.grid()}
        <rect x="56" y="46" width="208" height="150" rx="10" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.4)" stroke-width="1.4"/>
        <circle cx="72" cy="60" r="3" fill="#E23B3B"/>
        <circle cx="83" cy="60" r="3" fill="rgba(255,255,255,0.5)"/>
        <circle cx="94" cy="60" r="3" fill="rgba(255,255,255,0.5)"/>
        <line x1="56" y1="72" x2="264" y2="72" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
        <rect x="70" y="86" width="80" height="46" rx="6" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.4)" stroke-width="1.2"/>
        <path d="M78 122 L 92 104 L 106 114 L 122 92 L 142 100" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="160" y="86" width="90" height="20" rx="5" fill="rgba(226,59,59,0.22)" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
        <rect x="160" y="112" width="90" height="20" rx="5" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
        <rect x="70" y="144" width="180" height="12" rx="6" fill="rgba(255,255,255,0.1)"/>
        <rect x="70" y="144" width="112" height="12" rx="6" fill="rgba(255,255,255,0.4)"/>
        <rect x="70" y="166" width="180" height="12" rx="6" fill="rgba(255,255,255,0.1)"/>
        <rect x="70" y="166" width="70" height="12" rx="6" fill="#E23B3B"/>
        <text x="70" y="220" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="13" fill="rgba(255,255,255,0.85)">&lt;/&gt; Business systems, built in-house</text>
      </svg>`;
  }

  /** Slide 3 — PCB / manufacturing: circuit traces and pads. */
  static slidePcb() {
    return `
      <svg class="hero-node-diagram" viewBox="0 0 320 260" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        ${HeroComponent.grid()}
        <path d="M60 60 H140 V100 H220 V60 H260" stroke="rgba(255,255,255,0.55)" stroke-width="1.6" fill="none"/>
        <path d="M60 140 H100 V180 H180 V140 H260" stroke="rgba(255,255,255,0.35)" stroke-width="1.6" fill="none"/>
        <path d="M140 100 V140" stroke="rgba(255,255,255,0.35)" stroke-width="1.6"/>
        <path d="M180 60 V20" stroke="rgba(255,255,255,0.35)" stroke-width="1.6"/>
        <circle cx="60" cy="60" r="5" fill="#E23B3B"/>
        <circle cx="260" cy="60" r="5" fill="rgba(255,255,255,0.5)"/>
        <circle cx="60" cy="140" r="5" fill="rgba(255,255,255,0.5)"/>
        <circle cx="260" cy="140" r="5" fill="#E23B3B"/>
        <circle cx="140" cy="100" r="4" fill="rgba(255,255,255,0.5)"/>
        <circle cx="180" cy="140" r="4" fill="#E23B3B"/>
        <rect x="120" y="182" width="80" height="34" rx="6" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.5)" stroke-width="1.4"/>
        <text x="160" y="204" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="13" fill="#fff">IC</text>
        <text x="66" y="234" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="13" fill="rgba(255,255,255,0.85)">Board-level design and repair</text>
      </svg>`;
  }

  static SLIDES = [
    { render: HeroComponent.slideOverview, caption: "Construction &amp; Manufacturing, feeding one project record" },
    { render: HeroComponent.slideTechnology, caption: "Business systems and engineering software, built in-house" },
    { render: HeroComponent.slidePcb, caption: "Board-level engineering, from design to repair" },
  ];

  renderStack() {
    return `
      <div class="hero-stack">
        ${HeroComponent.SLIDES.map(
          (slide, i) => `
          <div class="hero-stack-card pos-${i}">
            ${slide.render()}
            <div class="hero-visual-caption">${slide.caption}</div>
          </div>`
        ).join("")}
      </div>
      <div class="hero-stack-dots">
        ${HeroComponent.SLIDES.map((_, i) => `<span class="dot${i === 0 ? " active" : ""}"></span>`).join("")}
      </div>`;
  }

  renderVisual() {
    const projectsStat = this.findStat("projects delivered");
    const safetyStat = this.findStat("time-accident");

    return `
      <div class="hero-visual">
        ${this.renderStack()}

        <div class="hero-tag hero-tag-construction"><span class="dot"></span>Construction</div>
        <div class="hero-tag hero-tag-manufacturing"><span class="dot"></span>Manufacturing</div>

        ${
          projectsStat
            ? `<div class="float-badge float-badge-top">
                <div class="float-badge-icon">${ICONS.briefcase}</div>
                <div><b>${projectsStat.value}</b><span>${projectsStat.label}</span></div>
              </div>`
            : ""
        }
        ${
          safetyStat
            ? `<div class="float-badge float-badge-bottom">
                <div class="float-badge-icon is-safety">${ICONS.shield}</div>
                <div><b>${safetyStat.value}</b><span>${safetyStat.label}</span></div>
              </div>`
            : ""
        }
      </div>`;
  }

  render() {
    return `
      <img class="hero-bg-photo" src="https://images.unsplash.com/photo-1581091212991-8891c7d4bd9b?w=1600&auto=format&fit=crop&q=80" alt="" aria-hidden="true" onerror="this.remove();" />
      <div class="hero-grid">
        <div class="hero-content">
          <span class="eyebrow"><span class="dot"></span>Construction &amp; manufacturing, under one roof</span>
          <h1>We don't chase wins.<br/><span class="grad">We repeat them.</span></h1>
          <p>From pre-engineered warehouses to board-level PCB engineering, PBTS Technology self-performs every project with clear direction and discipline.</p>
          <div class="hero-actions">
            <a href="/contact/" class="btn-primary">Request a quote</a>
            <a href="/projects/completed/" class="btn-ghost">See our completed work</a>
          </div>
          <div class="stat-row">
            ${this.props.stats
              .map((stat) => {
                const isSafety = stat.label.toLowerCase().includes("time-accident");
                return `<div class="stat"><b class="${isSafety ? "is-safety" : ""}">${stat.value}</b><span>${stat.label}</span></div>`;
              })
              .join("")}
          </div>
        </div>

        ${this.renderVisual()}
      </div>`;
  }

  afterMount(el) {
    const stack = el.querySelector(".hero-stack");
    const dotsWrap = el.querySelector(".hero-stack-dots");
    if (!stack) return;

    const cards = Array.from(stack.querySelectorAll(".hero-stack-card"));
    const dots = dotsWrap ? Array.from(dotsWrap.querySelectorAll(".dot")) : [];
    let order = cards.map((_, i) => i); // order[0] = index of the card currently on top

    const applyPositions = () => {
      order.forEach((cardIndex, pos) => {
        cards[cardIndex].className = `hero-stack-card pos-${pos}`;
      });
      dots.forEach((dot, i) => dot.classList.toggle("active", i === order[0]));
    };
    applyPositions();

    const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return; // leave the first card showing, no auto-cycle

    let timer = setInterval(() => {
      order.push(order.shift());
      applyPositions();
    }, 4200);

    stack.addEventListener("mouseenter", () => clearInterval(timer));
    stack.addEventListener("mouseleave", () => {
      timer = setInterval(() => {
        order.push(order.shift());
        applyPositions();
      }, 4200);
    });
  }
}
