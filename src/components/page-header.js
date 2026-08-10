import { Component } from "./component.js";

/**
 * The banner block at the top of every subpage: eyebrow label, breadcrumb,
 * H1 title, and a short intro line. Optional `photo` prop swaps the plain
 * gradient background for a photo with a dark overlay (leave it unset for
 * now — every page is on the gradient until real photography is ready).
 *
 * Usage:
 *   new PageHeaderComponent({
 *     eyebrow: "Construction",
 *     breadcrumb: ["Construction", "Warehouses"],
 *     title: "Warehouses",
 *     intro: "Pre-engineered metal building solutions for industrial and logistics clients.",
 *     photo: "/images/warehouses-hero.jpg" // optional
 *   }).mount(el)
 */
export class PageHeaderComponent extends Component {
  constructor({ eyebrow, breadcrumb = [], title, intro, photo = null }) {
    super({ eyebrow, breadcrumb, title, intro, photo });
  }

  renderCrumb() {
    const { breadcrumb } = this.props;
    if (!breadcrumb.length) return "";
    if (breadcrumb.length === 1) {
      return `<div class="crumb"><b>${breadcrumb[0]}</b></div>`;
    }
    const [section, ...rest] = breadcrumb;
    return `<div class="crumb"><b>${section}</b> &nbsp;/&nbsp; ${rest.join(" / ")}</div>`;
  }

  render() {
    const { eyebrow, title, intro, photo } = this.props;

    return `
      ${photo ? `<img class="hero-photo" src="${photo}" alt="${title}" onerror="this.remove();" />` : ""}
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <span class="eyebrow"><span class="dot"></span>${eyebrow}</span>
        ${this.renderCrumb()}
        <h1>${title}</h1>
        <p>${intro}</p>
      </div>`;
  }
}
