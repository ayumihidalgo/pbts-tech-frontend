/**
 * Base class for every shared UI piece (Nav, MobileNav, Footer, PageHeader).
 *
 * Each subclass only needs to implement render(), which returns an HTML
 * string. mount() takes care of injecting that string into the page and
 * calling afterMount() — the hook subclasses use to wire up event listeners
 * once their markup actually exists in the DOM.
 */
export class Component {
  constructor(props = {}) {
    this.props = props;
  }

  /**
   * Subclasses must override this and return an HTML string.
   */
  render() {
    throw new Error(`${this.constructor.name} must implement render()`);
  }

  /**
   * Renders this component into the given element and runs afterMount()
   * if the subclass defines one. This is the only method page code needs
   * to call — e.g. `new NavComponent(NAV, currentPath).mount(navMount)`.
   */
  mount(el) {
    if (!el) return this;
    el.innerHTML = this.render();
    if (typeof this.afterMount === "function") {
      this.afterMount(el);
    }
    return this;
  }
}
