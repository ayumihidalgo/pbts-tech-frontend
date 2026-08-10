import { Component } from "./component.js";
import { CtaBannerComponent } from "./cta-banner.js";

/**
 * The placeholder content block used on every Construction/Manufacturing/
 * Projects subpage until real per-division content (photos, specs, case
 * studies) is written: three feature cards (Scope of work / Process /
 * Quality & safety) plus the shared CTA banner.
 *
 * Swap this out page-by-page as real content becomes available — it's
 * meant as a placeholder, not a permanent home for every division's copy.
 */
export class SubpageContentComponent extends Component {
  constructor(label) {
    super({ label });
  }

  render() {
    const { label } = this.props;
    return `
      <div class="mock-grid">
        <div class="mock-feature">
          <div class="micon">&#9673;</div>
          <h4>Scope of work</h4>
          <p>Placeholder summary of what PBTS delivers under ${label} — swap in the real service breakdown.</p>
        </div>
        <div class="mock-feature">
          <div class="micon">&#9672;</div>
          <h4>Process</h4>
          <p>Placeholder outline of the typical project process, from initial site assessment to handover.</p>
        </div>
        <div class="mock-feature">
          <div class="micon">&#10003;</div>
          <h4>Quality &amp; safety</h4>
          <p>Placeholder note on the standards, certifications, and safety record relevant to this division.</p>
        </div>
      </div>

      ${new CtaBannerComponent().render()}`;
  }
}
