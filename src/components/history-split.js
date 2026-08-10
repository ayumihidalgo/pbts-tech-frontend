import { Component } from "./component.js";

/**
 * The "Built from a backyard repair shop..." history section: copy on the
 * left, photo on the right.
 */
export class HistorySplitComponent extends Component {
  render() {
    return `
      <div class="split">
        <div class="split-copy">
          <span class="eyebrow"><span class="dot"></span>Our History</span>
          <h2 style="font-size:clamp(24px,3vw,32px);font-weight:700;margin:14px 0 16px;letter-spacing:-0.01em;">Built from a backyard repair shop, grown into a full-service group</h2>
          <p>Pro Board Technology Services (PBTS) Corporation started operation in March 2006 repairing industrial electronic printed circuit boards. Over the years, we have grown from a humble backyard industry to developing several businesses as requested by our business partners and customers. PBTS is able to design, fabricate, and build our very own customized equipment complete with electro-mechanical parts and automation software.</p>
          <p>In early 2014, PBTS ventured into general construction, offering pre-engineered metal building materials for our industrial clients. PBTS has the ability to self-perform a construction project with the financial strength that ensures our ability to finish from groundbreaking to occupancy and through the inspection period — and we have never failed to complete an accepted project. PBTS Construction (PBCon) undertakes projects across residential, non-residential, industrial, and utility infrastructure with strict adherence to a "Safety First" culture, which has resulted in a zero time-accident record.</p>
          <a href="/clients/" class="btn-primary" style="display:inline-flex;">Learn more about us</a>
        </div>
        <div class="split-img">
          <img src="https://images.unsplash.com/photo-1666219462105-2909c2d72d01?w=1200&auto=format&fit=crop&q=80" alt="Industrial facility exterior" onerror="var p=this.parentElement;this.remove();var s=p.querySelector('span');if(s)s.style.display='flex';" />
          <span>Facility photo</span>
        </div>
      </div>`;
  }
}
