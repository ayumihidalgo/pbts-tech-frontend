import { Component } from "./component.js";

/**
 * Renders each industry group from content.js's CLIENTS array as a
 * heading + grid of client logo containers (.client-chip).
 */
export class ClientsListComponent extends Component {
  constructor(clients) {
    super({ clients });
  }

  renderClient({ name, logo }) {
    if (logo) {
      return `
        <div class="client-chip" title="${name}">
          <img src="${logo}" alt="${name}" loading="lazy" />
        </div>`;
    }
    return `<div class="client-chip">${name}</div>`;
  }

  renderSection(section) {
    return `
      <div class="client-section">
        <h2>${section.group}</h2>
        <div class="client-grid">
          ${section.clients.map((c) => this.renderClient(c)).join("")}
        </div>
      </div>`;
  }

  render() {
    return this.props.clients.map((section) => this.renderSection(section)).join("");
  }
}
