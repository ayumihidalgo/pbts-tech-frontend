import { Component } from "./component.js";

/**
 * The "DIVISION 01/02/03" card grid on the home page linking into
 * Construction, Manufacturing, and Projects.
 */
export class DivisionsComponent extends Component {
  constructor(divisions) {
    super({ divisions });
  }

  render() {
    return `
      <div class="divisions">
        ${this.props.divisions
          .map(
            (d) => `
          <a href="${d.route}" class="division">
            <div class="icon tone-${d.tone}"><span class="rdot"></span></div>
            <div class="num">${d.num}</div>
            <h3>${d.title}</h3>
            <p>${d.desc}</p>
            <div class="go">${d.linkLabel} &rarr;</div>
          </a>`
          )
          .join("")}
      </div>`;
  }
}
