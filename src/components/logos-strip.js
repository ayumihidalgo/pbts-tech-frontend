import { Component } from "./component.js";

export class LogosStripComponent extends Component {
  constructor(logos) {
    super({ logos });
  }

  renderLogoItem(item) {
    if (typeof item === "string") {
      return `
        <div class="logo-item" title="${item}">
          <span class="logo-text">${item}</span>
        </div>`;
    }

    const { name, logo } = item;
    if (logo) {
      return `
        <div class="logo-item" title="${name}">
          <img src="${logo}" alt="${name}" loading="lazy" class="logo-img" />
        </div>`;
    }

    return `
      <div class="logo-item" title="${name}">
        <span class="logo-text">${name}</span>
      </div>`;
  }

  render() {
    const logos = this.props.logos || [];
    const listHtml = logos.map((item) => this.renderLogoItem(item)).join("");

    return `
      <section class="logos-strip" aria-label="Trusted Clients">
        <div class="logos-container">
          <div class="label">Trusted by teams across construction and industrial manufacturing</div>
          <div class="logos-marquee">
            <div class="logos-track">
              <div class="logos-group">${listHtml}</div>
              <div class="logos-group" aria-hidden="true">${listHtml}</div>
            </div>
          </div>
        </div>
      </section>`;
  }
}

