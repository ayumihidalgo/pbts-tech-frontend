import { Component } from "./component.js";
import { ICONS } from "../data/icons.js";

/**
 * Desktop navigation bar: logo, primary links with dropdowns, and the
 * "Get a quote" CTA + hamburger button (the hamburger itself only does
 * anything on mobile widths — its click handler is wired centrally in
 * main.js, since it needs to talk to the separate MobileNav mount point).
 */
export class NavComponent extends Component {
  constructor(navItems, currentPath) {
    super({ navItems, currentPath });
  }

  isGroupActive(item) {
    return !!item.children?.some((child) => child.route === this.props.currentPath);
  }

  renderItem(item) {
    const { currentPath } = this.props;

    if (item.children) {
      const groupActive = this.isGroupActive(item);
      return `
        <div class="navitem" data-group="${item.label}">
          <div class="navlink${groupActive ? " is-active" : ""}">
            ${item.label}
            <svg class="chev" viewBox="0 0 10 6" width="9" height="6">
              <path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.4" fill="none"/>
            </svg>
          </div>
          <div class="dropdown">
            <div class="dropdown-inner">
              ${item.children
                .map(
                  (child) => `
                <a href="${child.route}" class="${child.route === currentPath ? "is-active" : ""}">
                  ${child.label}<span class="arrow">&rarr;</span>
                </a>`
                )
                .join("")}
            </div>
          </div>
        </div>`;
    }

    return `
      <div class="navitem">
        <a href="${item.route}" class="navlink${item.route === currentPath ? " is-active" : ""}">${item.label}</a>
      </div>`;
  }

  render() {
    const { navItems } = this.props;
    return `
      <a href="/" class="logo">
        <img src="/pbts-logo.png" alt="PBTS Technology logo" onerror="this.remove()" />
        <div class="name">PBTS <b>Technology</b><span class="sub">Construction &amp; Manufacturing</span></div>
      </a>

      <nav class="primary" id="primaryNav">
        ${navItems.map((item) => this.renderItem(item)).join("")}
      </nav>

      <div style="display:flex;align-items:center;gap:14px;">
        <button class="theme-toggle" id="themeToggle" type="button" aria-label="Toggle dark mode">
          <span class="theme-icon theme-icon-sun">${ICONS.sun}</span>
          <span class="theme-icon theme-icon-moon">${ICONS.moon}</span>
        </button>
        <a href="/#contact" class="cta">Get a quote</a>
        <div class="hamburger" id="hamburger"><span></span></div>
      </div>`;
  }

  afterMount(el) {
    const groups = el.querySelectorAll(".navitem[data-group]");

    groups.forEach((group) => {
      group.addEventListener("mouseenter", () => group.classList.add("open"));
      group.addEventListener("mouseleave", () => group.classList.remove("open"));
      group.querySelector(".navlink").addEventListener("click", (e) => {
        e.stopPropagation();
        groups.forEach((other) => {
          if (other !== group) other.classList.remove("open");
        });
        group.classList.toggle("open");
      });
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".navitem[data-group]")) {
        groups.forEach((group) => group.classList.remove("open"));
      }
    });
  }
}
