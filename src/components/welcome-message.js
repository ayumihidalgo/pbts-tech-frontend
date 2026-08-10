import { Component } from "./component.js";

/**
 * The full welcome letter from PBTS leadership. Fixed content (not
 * data-driven) since it's a one-off, signed message rather than a
 * repeatable list.
 */
export class WelcomeMessageComponent extends Component {
  render() {
    return `
      <div class="welcome-card">
        <h2>Welcome Message</h2>
        <div class="welcome-text">
          <div class="welcome-avatar">RS</div>
          <h3>Dear Esteemed Investors and Future Business Financing Partners,</h3>
          <p>It is with great pleasure and anticipation that I extend a warm welcome to each and every one of you on behalf of Pro Board Technology Services Corporation.</p>
          <p>Once again, welcome to the PBTS Family. We're thrilled to have you on board, and we look forward to achieving remarkable milestones together.</p>
          <p>As we embark on this exciting journey together, I want to express my heartfelt gratitude for considering us as potential partners in your investment endeavors. Your trust and confidence in our vision mean the world to us, and we are committed to exceeding your expectations in every aspect of our collaboration.</p>
          <p>At PBTS, we don't just see ourselves as a collection of companies; we see ourselves as catalysts for positive change, architects of dreams, and stewards of progress. With your support, we aim to continue our trajectory of growth, innovation, and excellence across all sectors in which we operate.</p>
          <p>Whether you're joining us as an investor, a financer, or a strategic partner, rest assured that your contributions will be met with diligence, integrity, and unwavering dedication. Together, we will navigate challenges, seize opportunities, and build a future that is both prosperous and sustainable.</p>
          <p>I invite you to immerse yourself in the PBTS experience, to explore the possibilities, and to witness firsthand the transformative impact of our collective efforts. Together, let us forge ahead, inspired by a shared vision of success and propelled by a spirit of collaboration and mutual respect.</p>
          <p>As I promote management based on the conviction that we have no future without the completion of our business portfolio transformations, we will achieve profit diversification and a business structure that enables sustainable growth via bold shifting and reinforcement of management resources.</p>
          <p>To God Be the Glory.</p>
          <div class="welcome-sig">
            <b>Ranillo L. Salenga</b>
            <span>PBTS Group of Companies</span>
          </div>
        </div>
      </div>`;
  }
}
