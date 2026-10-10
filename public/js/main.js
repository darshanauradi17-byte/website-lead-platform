// =====================================================
// WEBSTUDIO - CUSTOMER WEBSITE JAVASCRIPT
// =====================================================

"use strict";


// =====================================================
// MOBILE MENU
// =====================================================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

if (navLinks) {
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });
}


// =====================================================
// CUSTOMER REQUEST FORM
// =====================================================

const requestForm = document.getElementById("requestForm");
const formMessage = document.getElementById("formMessage");

if (requestForm) {
  requestForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton =
      requestForm.querySelector('button[type="submit"]');

    if (!submitButton) return;

    const originalText = submitButton.textContent;

    const formData = new FormData(requestForm);

    const data = Object.fromEntries(formData.entries());

    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    if (formMessage) {
      formMessage.textContent = "";
      formMessage.className = "form-message";
    }

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      let result = {};

      try {
        result = await response.json();
      } catch {
        result = {};
      }

      if (!response.ok) {
        throw new Error(
          result.error ||
          result.message ||
          "Unable to submit your request."
        );
      }

      const requestId =
        result.requestId ||
        result.id ||
        result.requestID;

      if (!requestId) {
        throw new Error(
          "Request was submitted, but no Request ID was returned."
        );
      }

      if (window.showToast) {
        window.showToast(
          "Request Submitted!",
          `Your request ID is ${requestId}`,
          "success"
        );
      }

      showSuccessScreen(
        data.businessName || "your business",
        requestId
      );

    } catch (error) {

      console.error(
        "Request submission failed:",
        error
      );

      if (window.showToast) {
        window.showToast(
          "Submission Error",
          error.message ||
          "Something went wrong.",
          "error"
        );
      }

      if (formMessage) {
        formMessage.textContent =
          error.message ||
          "Something went wrong.";

        formMessage.className =
          "form-message error";
      }

    } finally {

      submitButton.disabled = false;
      submitButton.textContent = originalText;

    }
  });
}


// =====================================================
// SUCCESS SCREEN
// =====================================================

function showSuccessScreen(businessName, requestId) {

  const formSection =
    document.querySelector(".request-section");

  const safeBusinessName =
    escapeHtml(businessName);

  const safeRequestId =
    escapeHtml(requestId);

  if (!formSection) {

    if (formMessage) {

      formMessage.textContent =
        `Request submitted successfully! Your Request ID is ${requestId}`;

      formMessage.className =
        "form-message success";
    }

    return;
  }

  formSection.innerHTML = `
    <div class="success-card">

      <div class="success-icon">
        ✓
      </div>

      <h2>
        Request Submitted Successfully!
      </h2>

      <p class="success-main">
        Thank you for choosing
        <strong>WebStudio</strong>.
      </p>

      <p class="success-business">
        Your request for
        <strong>${safeBusinessName}</strong>
        has been received.
      </p>

      <div class="request-id-box">

        <span class="request-id-label">
          YOUR REQUEST ID
        </span>

        <strong id="generatedRequestId">
          ${safeRequestId}
        </strong>

        <button
          type="button"
          class="copy-request-id gradient-button"
          id="copyRequestIdBtn"
        >
          Copy Request ID
        </button>

      </div>

      <p class="save-request-text">
        Save this Request ID. You can use it anytime
        to track your website request.
      </p>

      <div class="success-info">

        <div>
          <span>✓</span>
          Requirements received
        </div>

        <div>
          <span>✓</span>
          Our team will review your request
        </div>

        <div>
          <span>✓</span>
          We will contact you about the next steps
        </div>

      </div>

      <div class="success-actions">

        <a
          href="#track"
          class="success-track-btn"
        >
          Track My Request
        </a>

        <a
          href="/"
          class="success-home-btn"
        >
          Back to Home
        </a>

      </div>

    </div>
  `;

  const copyButton =
    document.getElementById(
      "copyRequestIdBtn"
    );

  if (copyButton) {
    copyButton.addEventListener(
      "click",
      copyRequestId
    );
  }
}


// =====================================================
// COPY REQUEST ID
// =====================================================

async function copyRequestId() {

  const element =
    document.getElementById(
      "generatedRequestId"
    );

  if (!element) return;

  const requestId =
    element.textContent.trim();

  try {

    await navigator.clipboard.writeText(
      requestId
    );

    const button =
      document.getElementById(
        "copyRequestIdBtn"
      );

    if (button) {

      button.textContent =
        "Copied ✓";

      setTimeout(() => {

        button.textContent =
          "Copy Request ID";

      }, 2000);
    }

  } catch (error) {

    window.prompt(
      "Copy your Request ID:",
      requestId
    );
  }
}


// =====================================================
// CUSTOMER TRACKING
// =====================================================

const trackForm =
  document.getElementById("trackForm");

const trackResult =
  document.getElementById("trackResult");

if (trackForm) {

  trackForm.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();

      const input =
        document.getElementById(
          "requestId"
        );

      if (!input || !trackResult) {
        return;
      }

      const requestId =
        normalizeRequestId(
          input.value
        );

      if (!requestId) {

        showTrackError(
          "Please enter your Request ID."
        );

        return;
      }

      input.value = requestId;

      trackResult.innerHTML = `
        <div class="track-loading">
          Checking your request...
        </div>
      `;

      try {

        const response =
          await fetch(
            `/api/track/${encodeURIComponent(requestId)}`
          );

        let result = {};

        try {
          result = await response.json();
        } catch {
          result = {};
        }

        if (!response.ok) {

          throw new Error(
            result.error ||
            result.message ||
            "Request not found."
          );
        }

        showTrackResult(result);

      } catch (error) {

        console.error(
          "Tracking failed:",
          error
        );

        showTrackError(
          error.message ||
          "Unable to find this request."
        );
      }
    }
  );
}


// =====================================================
// SHOW TRACKING RESULT
// =====================================================

function showTrackResult(result) {

  if (!trackResult) return;

  const requestId =
    result.requestId ||
    result.id ||
    "";

  const businessName =
    result.businessName ||
    "Business";

  const city =
    result.city ||
    "Not provided";

  const date =
    result.createdAt
      ? new Date(
          result.createdAt
        ).toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
            year: "numeric"
          }
        )
      : "Not available";

  const status =
    normalizeStatus(
      result.status
    );

  const level =
    getStatusLevel(status);

  trackResult.innerHTML = `

    <div class="tracking-card">

      <div class="tracking-header">

        <div>

          <span class="tracking-label">
            REQUEST #
          </span>

          <strong>
            ${escapeHtml(requestId)}
          </strong>

          <div class="tracking-business">
            ${escapeHtml(businessName)}
          </div>

          <div class="tracking-date">
            ${escapeHtml(city)} ·
            ${escapeHtml(date)}
          </div>

        </div>

      </div>


      <div class="tracking-progress">

        ${progressStep(
          1,
          "New",
          level,
          1
        )}

        ${progressLine(
          level >= 2
        )}

        ${progressStep(
          2,
          "Contacted",
          level,
          2
        )}

        ${progressLine(
          level >= 3
        )}

        ${progressStep(
          3,
          "In Progress",
          level,
          3
        )}

        ${progressLine(
          level >= 4
        )}

        ${progressStep(
          4,
          "Delivered",
          level,
          4
        )}

      </div>


      <div class="tracking-update">

        <strong>
          Current update:
        </strong>

        ${
          level === 1
            ? "Your request has been received."

            : level === 2
            ? "We have reviewed your request and contacted you regarding the project."

            : level === 3
            ? "Your website project is now in progress."

            : "Your website project has been delivered."
        }

      </div>

    </div>

  `;
}


// =====================================================
// STATUS LEVEL
// =====================================================

function getStatusLevel(status) {

  const normalized =
    normalizeStatus(status);

  switch (normalized) {

    case "New":
      return 1;

    case "Contacted":
      return 2;

    case "In Progress":
      return 3;

    case "Delivered":
      return 4;

    default:
      return 1;
  }
}


// =====================================================
// NORMALIZE STATUS
// =====================================================

function normalizeStatus(status) {

  const value =
    String(status || "")
      .trim()
      .toLowerCase();

  if (value === "contacted") {
    return "Contacted";
  }

  if (
    value === "in progress" ||
    value === "in-progress" ||
    value === "in_progress"
  ) {
    return "In Progress";
  }

  if (value === "delivered") {
    return "Delivered";
  }

  return "New";
}


// =====================================================
// NORMALIZE REQUEST ID
// =====================================================

function normalizeRequestId(value) {

  return String(value || "")
    .trim()
    .toUpperCase()
    .replace(/[.,;:!?]+$/, "");
}


// =====================================================
// PROGRESS STEP
// =====================================================

function progressStep(
  number,
  label,
  level,
  stepNumber
) {

  // IMPORTANT:
  // Current step is also considered completed.
  const completed =
    level >= stepNumber;

  const current =
    level === stepNumber;

  const classes = [
    "progress-step",
    completed
      ? "completed"
      : "",
    current
      ? "current"
      : ""
  ]
    .filter(Boolean)
    .join(" ");

  const symbol =
    completed
      ? "✓"
      : String(number);

  const description =
    current
      ? "Current"
      : completed
      ? "Completed"
      : "Pending";

  return `

    <div class="${classes}">

      <span class="progress-circle">
        ${symbol}
      </span>

      <small>
        ${escapeHtml(label)}
      </small>

      <em>
        ${description}
      </em>

    </div>

  `;
}


// =====================================================
// PROGRESS LINE
// =====================================================

function progressLine(completed) {

  return `

    <div
      class="progress-line
        ${completed ? "completed" : ""}"
    ></div>

  `;
}


// =====================================================
// TRACKING ERROR
// =====================================================

function showTrackError(message) {

  if (!trackResult) return;

  trackResult.innerHTML = `

    <div class="track-error">
      ${escapeHtml(message)}
    </div>

  `;
}


// =====================================================
// HTML SAFETY
// =====================================================

function escapeHtml(value) {

  return String(value ?? "")
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );
}