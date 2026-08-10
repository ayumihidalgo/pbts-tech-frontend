import { Component } from "./component.js";
import { ICONS } from "../data/icons.js";

/**
 * "Mission, vision, and quality policy" 3-card grid. Each card's icon key
 * (from content.js) looks up the matching SVG in ICONS.
 */
export class ValueGridComponent extends Component {
  constructor(values) {
    super({ values });
  }

  renderCard(value) {
    const list = value.list
      ? `<ul>${value.list.map((item) => `<li>${item}</li>`).join("")}</ul>`
      : "";
    return `
      <div class="value-card">
        <div class="vicon">${ICONS[value.icon]}</div>
        <h3>${value.title}</h3>
        <p>${value.body}</p>
        ${list}
      </div>`;
  }

  render() {
    return `
      <div class="section-head">
        <span class="eyebrow"><span class="dot"></span>What guides us</span>
        <h2>Mission, vision, and quality policy</h2>
      </div>
      <div class="value-grid">
        ${this.props.values.map((v) => this.renderCard(v)).join("")}
      </div>`;
  }
}
