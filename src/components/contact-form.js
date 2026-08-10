import { Component } from "./component.js";
import { ICONS } from "../data/icons.js";
import { OFFICES_DETAIL } from "../data/content.js";

/**
 * The full Contact page body: left info panel (phone/fax/address + social),
 * right side a message form, and a 3-column office detail strip underneath.
 * Connected to SQL Server Express database via /api/contact API.
 */
export class ContactFormComponent extends Component {
  constructor({
    offices = OFFICES_DETAIL,
    eyebrow = "Get in touch",
    title = "Let's talk about your project",
    body = "We welcome your inquiries, feedback, and suggestions. Send us a message using the form and our team will get back to you promptly.",
    showOfficesDetail = true,
  } = {}) {
    super({ offices, eyebrow, title, body, showOfficesDetail });
  }

  renderOfficeDetail(office) {
    return `
      <div class="office-detail">
        <h5>${office.name}</h5>
        ${office.phones.map((phone) => `<p><b>Tel:</b> ${phone}</p>`).join("")}
        <div class="map-ph">${office.mapLabel}</div>
      </div>`;
  }

  afterMount(container) {
    const form = container.querySelector("#contactForm");
    const statusBox = container.querySelector("#contactStatus");
    const submitBtn = container.querySelector("#contactSubmitBtn");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      statusBox.style.display = "none";
      statusBox.className = "form-status-msg";

      const firstName = container.querySelector("#contactFirstName").value.trim();
      const lastName = container.querySelector("#contactLastName").value.trim();
      const email = container.querySelector("#contactEmail").value.trim();
      const contactNumber = container.querySelector("#contactPhone").value.trim();
      const message = container.querySelector("#contactMessage").value.trim();

      if (!firstName || !lastName || !email || !message) {
        statusBox.textContent = "Please fill in all required fields (First name, Last name, Email, Message).";
        statusBox.style.display = "block";
        statusBox.style.background = "rgba(239, 68, 68, 0.12)";
        statusBox.style.color = "#b91c1c";
        statusBox.style.border = "1px solid rgba(239, 68, 68, 0.3)";
        return;
      }

      submitBtn.disabled = true;
      submitBtn.innerHTML = `Sending...`;

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ firstName, lastName, email, contactNumber, message }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          statusBox.textContent = data.message || "Thank you! Your message has been sent successfully.";
          statusBox.style.display = "block";
          statusBox.style.background = "rgba(34, 197, 94, 0.12)";
          statusBox.style.color = "#15803d";
          statusBox.style.border = "1px solid rgba(34, 197, 94, 0.3)";
          form.reset();
        } else {
          throw new Error(data.error || "Failed to send message.");
        }
      } catch (err) {
        statusBox.textContent = err.message || "An unexpected error occurred. Please try again.";
        statusBox.style.display = "block";
        statusBox.style.background = "rgba(239, 68, 68, 0.12)";
        statusBox.style.color = "#b91c1c";
        statusBox.style.border = "1px solid rgba(239, 68, 68, 0.3)";
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `Send message ${ICONS.arrowRight}`;
      }
    });
  }

  render() {
    const { eyebrow, title, body, showOfficesDetail } = this.props;
    return `
      <div class="split-form">
        <div class="form-panel">
          <span class="eyebrow"><span class="dot"></span>${eyebrow}</span>
          <h2>${title}</h2>
          <p>${body}</p>

          <div class="info-rows">
            <div class="info-row">
              <div class="ico">${ICONS.phone}</div>
              <div><h5>Call us</h5><p>+63-2-8552-5131 to 32<br/>+63-46-430-2890</p></div>
            </div>
            <div class="info-row">
              <div class="ico">${ICONS.fax}</div>
              <div><h5>Fax</h5><p>+63-2-8552-5165</p></div>
            </div>
            <div class="info-row">
              <div class="ico">${ICONS.pin}</div>
              <div><h5>Main office</h5><p>B2 L5 Annex A, Complex Ave., Peoples Technology Complex, Cabilang Baybay, Carmona, Cavite</p></div>
            </div>
          </div>

          <div class="footer-social">
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Twitter / X">x</a>
            <a href="#" aria-label="Instagram">ig</a>
            <a href="#" aria-label="Pinterest">p</a>
          </div>
        </div>

        <div class="form-card elevated">
          <h3>Send us a message</h3>
          <div id="contactStatus" class="form-status-msg" style="display:none; margin-bottom:16px; padding:12px 16px; border-radius:10px; font-size:13.5px; font-weight:500;"></div>
          <form id="contactForm">
            <div class="form-grid">
              <div class="field"><label>First name<span class="required">*</span></label><div class="input-wrap">${ICONS.user}<input type="text" id="contactFirstName" placeholder="Juan" required /></div></div>
              <div class="field"><label>Last name<span class="required">*</span></label><div class="input-wrap">${ICONS.user}<input type="text" id="contactLastName" placeholder="Dela Cruz" required /></div></div>
            </div>
            <div class="field" style="margin-bottom:16px;"><label>Email<span class="required">*</span></label><div class="input-wrap">${ICONS.mail}<input type="email" id="contactEmail" placeholder="name@company.com" required /></div></div>
            <div class="field" style="margin-bottom:16px;"><label>Contact number</label><div class="input-wrap">${ICONS.phone}<input type="text" id="contactPhone" placeholder="+63 9xx xxx xxxx" /></div></div>
            <div class="field" style="margin-bottom:26px;">
              <label>Message<span class="required">*</span></label>
              <div class="input-wrap textarea-wrap">${ICONS.message}<textarea id="contactMessage" rows="5" placeholder="Tell us about your project" required></textarea></div>
            </div>
            <button type="submit" id="contactSubmitBtn" class="btn-primary btn-block" style="cursor:pointer;">Send message ${ICONS.arrowRight}</button>
          </form>
        </div>
      </div>

      ${
        showOfficesDetail
          ? `<div class="offices-detail">
        ${this.props.offices.map((office) => this.renderOfficeDetail(office)).join("")}
      </div>`
          : ""
      }`;
  }
}
