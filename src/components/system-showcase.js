import { Component } from "./component.js";

/**
 * Renders the Business System & Support page's showcase: a 2-column grid
 * (many rows are fine — the grid just wraps) of cards, each with a
 * browser-style mockup area standing in for a real screenshot, the
 * system's name and description, and a "Learn more" link out to its
 * brochure PDF.
 *
 * The mockup is a generic wireframe, not a real screenshot — there isn't
 * one yet. Swap renderMockup() for an <img src="..."> once real
 * screenshots exist; the brochure links point at /brochures/*.pdf paths
 * that need actual files dropped into public/brochures/.
 */
export class SystemShowcaseComponent extends Component {
  constructor(systems) {
    super({ systems });
  }

  renderMockup() {
    return `
      <div class="system-shot">
        <div class="browser-bar"><span></span><span></span><span></span></div>
        <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="16" y="16" width="90" height="188" rx="8" fill="var(--bg-alt)" stroke="var(--line)" stroke-width="1"/>
          <rect x="28" y="30" width="66" height="8" rx="4" fill="var(--blue-dim)"/>
          <rect x="28" y="48" width="66" height="6" rx="3" fill="var(--line)"/>
          <rect x="28" y="60" width="66" height="6" rx="3" fill="var(--line)"/>
          <rect x="28" y="72" width="66" height="6" rx="3" fill="var(--line)"/>
          <rect x="118" y="16" width="266" height="60" rx="8" fill="var(--blue-dim)" stroke="var(--line)" stroke-width="1"/>
          <path d="M132 60 L152 38 L170 50 L192 26 L214 42" stroke="var(--blue-1)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          <rect x="118" y="88" width="126" height="116" rx="8" fill="var(--bg-alt)" stroke="var(--line)" stroke-width="1"/>
          <rect x="258" y="88" width="126" height="54" rx="8" fill="var(--bg-alt)" stroke="var(--line)" stroke-width="1"/>
          <rect x="258" y="150" width="126" height="54" rx="8" fill="var(--red-dim)" stroke="var(--line)" stroke-width="1"/>
          <circle cx="181" cy="146" r="30" fill="none" stroke="var(--blue-1)" stroke-width="8" stroke-dasharray="120 189" stroke-linecap="round"/>
        </svg>
      </div>`;
  }

  renderCard(system) {
    return `
      <div class="system-card">
        ${this.renderMockup()}
        <div class="system-body">
          <h3>${system.name}</h3>
          <p>${system.description}</p>
          <a href="${system.brochure}" class="text-link" target="_blank" rel="noopener">Learn more &rarr;</a>
        </div>
      </div>`;
  }

  render() {
    return `
      <div class="systems-grid">
        ${this.props.systems.map((system) => this.renderCard(system)).join("")}
      </div>`;
  }
}
