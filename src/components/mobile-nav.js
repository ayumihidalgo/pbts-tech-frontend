import { Component } from "./component.js";

/**
 * Mobile accordion menu. Renders into the .mobile-panel element that sits
 * below the header; the panel's open/closed state (sliding down) is toggled
 * by the hamburger button, wired in main.js. Each group's own expand/collapse
 * is handled here in afterMount().
 */
export class MobileNavComponent extends Component {
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
        <div class="m-group" data-mgroup="${item.label}">
          <div class="m-head${groupActive ? " is-active" : ""}">
            ${item.label}
            <svg class="chev" viewBox="0 0 10 6" width="9" height="6">
              <path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.4" fill="none"/>
            </svg>
          </div>
          <div class="m-sub">
            ${item.children
              .map(
                (child) => `
              <a href="${child.route}" class="${child.route === currentPath ? "is-active" : ""}">${child.label}</a>`
              )
              .join("")}
          </div>
        </div>`;
    }

    return `
      <div class="m-group">
        <a href="${item.route}" class="m-head${item.route === currentPath ? " is-active" : ""}">${item.label}</a>
      </div>`;
  }

  render() {
    return this.props.navItems.map((item) => this.renderItem(item)).join("");
  }

  afterMount(el) {
    el.querySelectorAll(".m-group[data-mgroup]").forEach((group) => {
      group.querySelector(".m-head").addEventListener("click", () => {
        group.classList.toggle("open");
      });
    });

    el.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        el.classList.remove("open");
      });
    });
  }
}
