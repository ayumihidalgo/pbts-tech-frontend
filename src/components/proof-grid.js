import { Component } from "./component.js";

/**
 * "Recent projects, real results" section: a section heading row plus a
 * 3-card photo gallery. Falls back to a text badge if a photo 404s.
 */
export class ProofGridComponent extends Component {
  constructor(items) {
    super({ items });
  }

  render() {
    return `
      <div class="section-head-row">
        <div class="section-head">
          <span class="eyebrow"><span class="dot"></span>Proof of work</span>
          <h2>Recent projects, real results</h2>
          <p>A sample of what we've delivered across construction and manufacturing clients.</p>
        </div>
        <a href="/projects/completed/" class="text-link">View all completed projects &rarr;</a>
      </div>
      <div class="proof-grid">
        ${this.props.items
          .map(
            (item) => `
          <div class="proof-card">
            <div class="proof-thumb">
              <img src="${item.photo}" alt="${item.alt}" onerror="var p=this.parentElement;this.remove();var s=p.querySelector('span');if(s)s.style.display='flex';" />
              <span>Project photo</span>
            </div>
            <div class="proof-body">
              <div class="cat">${item.category}</div>
              <h3>${item.title}</h3>
              <p>${item.desc}</p>
            </div>
          </div>`
          )
          .join("")}
      </div>`;
  }
}
