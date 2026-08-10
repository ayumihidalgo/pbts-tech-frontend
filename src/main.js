import "./style.css";
import { NAV } from "./data/nav-config.js";
import { NavComponent } from "./components/nav.js";
import { MobileNavComponent } from "./components/mobile-nav.js";
import { FooterComponent } from "./components/footer.js";
import { PageHeaderComponent } from "./components/page-header.js";
import { AmbientBackgroundComponent } from "./components/ambient-background.js";
import { HomeContentComponent } from "./components/home-content.js";
import { ContactFormComponent } from "./components/contact-form.js";
import { CareerFormComponent } from "./components/career-form.js";
import { ClientsListComponent } from "./components/clients-list.js";
import { SubpageContentComponent } from "./components/subpage-content.js";
import { SystemShowcaseComponent } from "./components/system-showcase.js";
import { CLIENTS, SYSTEMS } from "./data/content.js";

// Maps a `content.type` string (set per page in each page's inline script)
// to the component class responsible for that page's main content.
const CONTENT_COMPONENTS = {
  home: () => new HomeContentComponent(),
  contact: () => new ContactFormComponent(),
  career: () => new CareerFormComponent(),
  clients: () => new ClientsListComponent(CLIENTS),
  subpage: (config) => new SubpageContentComponent(config.label),
  systems: () => new SystemShowcaseComponent(SYSTEMS),
};

/**
 * Mounts the nav, mobile nav, and footer that appear on every page, and
 * wires the hamburger button (which lives inside the Nav's markup) to the
 * mobile panel (a separate mount point) since the two components don't
 * know about each other directly.
 */
function mountShared(currentPath) {
  const navMount = document.getElementById("nav-mount");
  const mobileNavMount = document.getElementById("mobile-nav-mount");
  const footerMount = document.getElementById("footer-mount");

  new NavComponent(NAV, currentPath).mount(navMount);
  new MobileNavComponent(NAV, currentPath).mount(mobileNavMount);
  new FooterComponent().mount(footerMount);

  const ambientMount = document.createElement("div");
  ambientMount.className = "ambient-bg";
  document.body.prepend(ambientMount);
  new AmbientBackgroundComponent().mount(ambientMount);

  const hamburger = document.getElementById("hamburger");
  if (hamburger && mobileNavMount) {
    hamburger.addEventListener("click", () => {
      mobileNavMount.classList.toggle("open");
    });
  }

  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem("pbts-theme", next);
      } catch (e) {
        /* localStorage unavailable (private browsing, etc.) — theme just won't persist */
      }
    });
  }
}

/**
 * Called once from a small inline <script type="module"> on every page.
 * Pass `header` with the page's eyebrow/breadcrumb/title/intro to mount a
 * PageHeaderComponent into #page-header-mount — omit it (e.g. on a page
 * with a custom hero) to skip that step.
 *
 * Example (construction/warehouses/index.html):
 *   import { initPage } from '/src/main.js';
 *   initPage({
 *     header: {
 *       eyebrow: 'Construction',
 *       breadcrumb: ['Construction', 'Warehouses'],
 *       title: 'Warehouses',
 *       intro: 'Pre-engineered metal building solutions for industrial and logistics clients.'
 *     },
 *     content: { type: 'subpage', label: 'Warehouses' }
 *   });
 *
 * `content.type` is one of: 'home' | 'contact' | 'career' | 'clients' | 'subpage'.
 * Pages with a fully custom body (none currently) can omit `content` entirely.
 */
export function initPage(config = {}) {
  const currentPath = window.location.pathname;
  mountShared(currentPath);

  if (config.header) {
    const headerMount = document.getElementById("page-header-mount");
    new PageHeaderComponent(config.header).mount(headerMount);
  }

  if (config.content) {
    const contentMount = document.getElementById("page-content-mount");
    const buildContent = CONTENT_COMPONENTS[config.content.type];
    if (buildContent && contentMount) {
      buildContent(config.content).mount(contentMount);
    }
  }
}
