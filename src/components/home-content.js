import { Component } from "./component.js";
import { HeroComponent } from "./hero.js";
import { DivisionsComponent } from "./divisions.js";
import { ProofGridComponent } from "./proof-grid.js";
import { LogosStripComponent } from "./logos-strip.js";
import { HistorySplitComponent } from "./history-split.js";
import { WelcomeMessageComponent } from "./welcome-message.js";
import { ValueGridComponent } from "./value-grid.js";
import { ContactFormComponent } from "./contact-form.js";
import { HERO_STATS, DIVISIONS, PROOF_ITEMS, CLIENT_LOGOS, VALUES } from "../data/content.js";

/**
 * Composes the full home page body out of the smaller section components
 * above. This is the one place that decides "the home page is: hero, then
 * divisions, then proof grid, ..." — each section itself stays reusable
 * and independently testable.
 */
export class HomeContentComponent extends Component {
  constructor() {
    super();
    // Kept as an instance so afterMount() below can wire up its interactivity
    // (the carousel's cycling logic) after render() has already been used
    // to compose the flat HTML string for the rest of the page.
    this.hero = new HeroComponent(HERO_STATS);

    // Same component that powers the standalone /contact/ page, reused here
    // (with the CTA banner's copy and no offices strip) so the "Have a
    // project in mind?" spot on the home page is a real, working form —
    // not just a link out to another page.
    this.contactForm = new ContactFormComponent({
      title: "Have a project in mind?",
      body: "Tell us what you're building or manufacturing — we'll get back to you with next steps.",
      showOfficesDetail: false,
    });
  }

  render() {
    return `
      <section class="hero">
        ${this.hero.render()}
      </section>

      ${new DivisionsComponent(DIVISIONS).render()}

      ${new ProofGridComponent(PROOF_ITEMS).render()}

      ${new LogosStripComponent(CLIENT_LOGOS).render()}

      ${new HistorySplitComponent().render()}

      ${new WelcomeMessageComponent().render()}

      ${new ValueGridComponent(VALUES).render()}

      <section class="contact-section" id="contact">
        ${this.contactForm.render()}
      </section>`;
  }

  afterMount(el) {
    const heroSection = el.querySelector(".hero");
    if (heroSection) this.hero.afterMount(heroSection);

    const contactSection = el.querySelector("#contact");
    if (contactSection) this.contactForm.afterMount(contactSection);
  }
}
