import { Component } from "./component.js";

/**
 * Site footer. Content is fixed (not per-page), so this takes no props —
 * it renders the same brand/links/offices block on every page it's mounted
 * into.
 */
export class FooterComponent extends Component {
  render() {
    const year = new Date().getFullYear();

    return `
      <div class="footer-top">
        <div class="footer-brand">
          <a href="/" class="logo">
            <img src="/pbts-logo.png" alt="PBTS Technology logo" onerror="this.remove()" />
            <div class="name">PBTS <b>Technology</b><span class="sub">Construction &amp; Manufacturing</span></div>
          </a>
          <p>Construction and manufacturing under one roof — from structural steel to board-level engineering, self-performed from start to finish.</p>
          <div class="footer-social">
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Twitter / X">x</a>
            <a href="#" aria-label="Instagram">ig</a>
            <a href="#" aria-label="LinkedIn">in</a>
          </div>
        </div>

        <div class="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/clients/">Clients</a></li>
            <li><a href="/career/">Career</a></li>
            <li><a href="/contact/">Contact us</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Divisions</h4>
          <ul>
            <li><a href="/construction/warehouses/">Construction</a></li>
            <li><a href="/manufacturing/automations-engineering/">Manufacturing</a></li>
            <li><a href="/projects/completed/">Completed projects</a></li>
            <li><a href="/projects/ongoing/">On-going projects</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Corporate branch address</h4>
          <div class="footer-offices">
            <div class="office">
              <h5>Main office (Cavite)</h5>
              <p>B2 L5 Annex A, Complex Ave., Peoples Technology Complex, Cabilang Baybay, Carmona, Cavite</p>
              <a href="tel:+6328552513132">+63-2-8552-5131 to 32</a>
              <a href="tel:+63464302890">+63-46-430-2890</a>
            </div>
            <div class="office">
              <h5>Branch office (Bataan)</h5>
              <p>B2 L2 Parkway Drive, Hermosa Ecozone Industrial Park, Palihan, Hermosa, Bataan</p>
              <a href="tel:+639171797377">+63-917-179-7377</a>
            </div>
            <div class="office">
              <h5>Branch office (Cebu)</h5>
              <p>B3 Unit 11, AcaSys Homes, Basak-Cadogoy, Lapu-Lapu City Mactan, Cebu City</p>
              <a href="tel:+639050381443">+63-905-038-1443</a>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-inner">
          <span>&copy; ${year} PBTS Technology. All rights reserved.</span>
          <a href="/contact/" class="text-link">Get a quote &rarr;</a>
        </div>
      </div>`;
  }
}
