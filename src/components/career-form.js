import { Component } from "./component.js";
import { ICONS } from "../data/icons.js";

/**
 * The Career page body: info panel on why-work-here, application form on
 * the right. Connected to SQL Server Express database via /api/career API.
 */
export class CareerFormComponent extends Component {
  afterMount(container) {
    const form = container.querySelector("#careerForm");
    const statusBox = container.querySelector("#careerStatus");
    const submitBtn = container.querySelector("#careerSubmitBtn");
    const fileInput = container.querySelector("#careerResumeInput");
    const fileLabel = container.querySelector("#careerFileLabel");
    const fileBtn = container.querySelector("#careerFileBtn");

    if (!form) return;

    if (fileBtn && fileInput) {
      fileBtn.addEventListener("click", () => fileInput.click());
    }

    if (fileInput && fileLabel) {
      fileInput.addEventListener("change", () => {
        if (fileInput.files && fileInput.files[0]) {
          fileLabel.textContent = fileInput.files[0].name;
        } else {
          fileLabel.textContent = "No file chosen";
        }
      });
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      statusBox.style.display = "none";
      statusBox.className = "form-status-msg";

      const firstName = container.querySelector("#careerFirstName").value.trim();
      const lastName = container.querySelector("#careerLastName").value.trim();
      const phone = container.querySelector("#careerPhone").value.trim();
      const jobPosition = container.querySelector("#careerJobPosition").value.trim();
      const email = container.querySelector("#careerEmail").value.trim();
      const genderRadio = container.querySelector('input[name="gender"]:checked');
      const gender = genderRadio ? genderRadio.value : "";

      if (!firstName || !lastName || !phone || !jobPosition) {
        statusBox.textContent = "Please fill in all required fields (First name, Last name, Phone, Job position).";
        statusBox.style.display = "block";
        statusBox.style.background = "rgba(239, 68, 68, 0.12)";
        statusBox.style.color = "#b91c1c";
        statusBox.style.border = "1px solid rgba(239, 68, 68, 0.3)";
        return;
      }

      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("phone", phone);
      formData.append("jobPosition", jobPosition);
      if (email) formData.append("email", email);
      if (gender) formData.append("gender", gender);
      if (fileInput && fileInput.files[0]) {
        formData.append("resume", fileInput.files[0]);
      }

      submitBtn.disabled = true;
      submitBtn.innerHTML = `Submitting...`;

      try {
        const response = await fetch("/api/career", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (response.ok && data.success) {
          statusBox.textContent = data.message || "Application submitted successfully! Our HR team will review your application.";
          statusBox.style.display = "block";
          statusBox.style.background = "rgba(34, 197, 94, 0.12)";
          statusBox.style.color = "#15803d";
          statusBox.style.border = "1px solid rgba(34, 197, 94, 0.3)";
          form.reset();
          if (fileLabel) fileLabel.textContent = "No file chosen";
        } else {
          throw new Error(data.error || "Failed to submit application.");
        }
      } catch (err) {
        statusBox.textContent = err.message || "An unexpected error occurred. Please try again.";
        statusBox.style.display = "block";
        statusBox.style.background = "rgba(239, 68, 68, 0.12)";
        statusBox.style.color = "#b91c1c";
        statusBox.style.border = "1px solid rgba(239, 68, 68, 0.3)";
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `Submit application ${ICONS.arrowRight}`;
      }
    });
  }

  render() {
    return `
      <div class="split-form">
        <div class="form-panel">
          <span class="eyebrow"><span class="dot"></span>Careers at PBTS</span>
          <h2>Build your career with us</h2>
          <p>We're a team that self-performs construction and manufacturing work end to end — join us if you want real ownership over what you build.</p>

          <div class="info-rows">
            <div class="info-row">
              <div class="ico">${ICONS.briefcase}</div>
              <div><h5>${new Date().getFullYear() - 2006} years in operation</h5><p>Steady growth since 2006, from board repair to full self-performed construction.</p></div>
            </div>
            <div class="info-row">
              <div class="ico">${ICONS.shield}</div>
              <div><h5>Zero time-accident record</h5><p>A safety-first culture across every site and production line.</p></div>
            </div>
            <div class="info-row">
              <div class="ico">${ICONS.pin}</div>
              <div><h5>Three locations</h5><p>Cavite, Bataan, and Cebu — apply to whichever office is nearest you.</p></div>
            </div>
          </div>
        </div>

        <div class="form-card elevated">
          <h3>Apply now</h3>
          <div id="careerStatus" class="form-status-msg" style="display:none; margin-bottom:16px; padding:12px 16px; border-radius:10px; font-size:13.5px; font-weight:500;"></div>
          <form id="careerForm">
            <div class="form-grid">
              <div class="field"><label>First name<span class="required">*</span></label><div class="input-wrap">${ICONS.user}<input type="text" id="careerFirstName" required /></div></div>
              <div class="field"><label>Last name<span class="required">*</span></label><div class="input-wrap">${ICONS.user}<input type="text" id="careerLastName" required /></div></div>
            </div>

            <div class="field" style="margin:18px 0 10px;"><label>Gender</label></div>
            <div class="radio-row" style="margin-bottom:20px;">
              <label class="radio-option"><input type="radio" name="gender" value="Male" /> Male</label>
              <label class="radio-option"><input type="radio" name="gender" value="Female" /> Female</label>
            </div>

            <div class="form-grid">
              <div class="field"><label>Email</label><div class="input-wrap">${ICONS.mail}<input type="email" id="careerEmail" /></div></div>
              <div class="field"><label>Phone<span class="required">*</span></label><div class="input-wrap">${ICONS.phone}<input type="text" id="careerPhone" required /></div></div>
            </div>

            <div class="field" style="margin:16px 0;">
              <label>Job position<span class="required">*</span></label>
              <div class="input-wrap">${ICONS.briefcase}<input type="text" id="careerJobPosition" placeholder="e.g. Site Electrician" required /></div>
            </div>

            <div class="field" style="margin-bottom:26px;">
              <label>Attach resume</label>
              <input type="file" id="careerResumeInput" name="resume" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" style="display:none;" />
              <div class="file-field" id="careerFileBtn" style="cursor:pointer;">
                <span class="browse">Choose File</span>
                <span id="careerFileLabel">No file chosen</span>
              </div>
            </div>

            <button type="submit" id="careerSubmitBtn" class="btn-primary btn-block" style="cursor:pointer;">Submit application ${ICONS.arrowRight}</button>
          </form>
        </div>
      </div>`;
  }
}