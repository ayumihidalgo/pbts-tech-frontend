import { Component } from "./component.js";

/**
 * The blue gradient "Have a project in mind?" banner. Same component is
 * reused at the bottom of the home page and every division/project subpage.
 */
export class CtaBannerComponent extends Component {
  constructor({
    title = "Have a project in mind?",
    body = "Tell us what you're building or manufacturing — we'll get back to you with next steps.",
    buttonLabel = "Get a quote",
    buttonHref = "/contact/",
  } = {}) {
    super({ title, body, buttonLabel, buttonHref });
  }

  render() {
    const { title, body, buttonLabel, buttonHref } = this.props;
    return `
      <div class="cta-banner">
        <div class="cta-banner-copy">
          <h2>${title}</h2>
          <p>${body}</p>
        </div>
        <a href="${buttonHref}" class="btn-white">${buttonLabel}</a>
      </div>`;
  }
}
