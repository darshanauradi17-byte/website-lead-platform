/* =========================================================
   WEBSTUDIO OWNER DASHBOARD
   Connected to the Node.js backend
   ========================================================= */

const loginScreen = document.getElementById("loginScreen");
const dashScreen = document.getElementById("dashScreen");
const loginForm = document.getElementById("loginForm");
const loginStatus = document.getElementById("loginStatus");
const logoutBtn = document.getElementById("logoutBtn");

const tableBody = document.getElementById("tableBody");
const statCards = document.getElementById("statCards");
const searchBox = document.getElementById("searchBox");
const statusFilter = document.getElementById("statusFilter");
const emptyState = document.getElementById("emptyState");

let allSubmissions = [];
let loading = false;

/* =========================================================
   TOKEN
   ========================================================= */

const TOKEN_KEY = "apnaweb_token";

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function setToken(token) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

/* =========================================================
   SAFE HTML
   ========================================================= */

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value == null ? "" : String(value);
  return div.innerHTML;
}

/* =========================================================
   API REQUEST HELPER
   ========================================================= */

async function authFetch(url, options = {}) {
  const token = getToken();

  if (!token) {
    showLogin();
    throw new Error("Not authenticated");
  }

  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`
  };

  const response = await fetch(url, {
    ...options,
    headers
  });

  if (response.status === 401) {
    clearToken();
    showLogin();
    throw new Error("Session expired");
  }

  return response;
}

/* =========================================================
   LOGIN / DASHBOARD SCREENS
   ========================================================= */

function showLogin() {
  loginScreen.classList.remove("hidden");
  dashScreen.classList.add("hidden");

  if (loginForm) {
    const password = loginForm.querySelector('input[type="password"]');

    if (password) {
      password.value = "";
    }
  }
}

function showDashboard() {
  loginScreen.classList.add("hidden");
  dashScreen.classList.remove("hidden");

  loadSubmissions();
}

/* =========================================================
   LOGIN
   ========================================================= */

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (loginStatus) {
      loginStatus.textContent = "";
    }

    const button = loginForm.querySelector(
      "button[type='submit']"
    );

    if (button) {
      button.disabled = true;
      button.textContent = "Signing in...";
    }

    const formData = new FormData(loginForm);

    const data = {
      username: String(
        formData.get("username") || ""
      ).trim(),

      password: String(
        formData.get("password") || ""
      )
    };

    // Check both fields
    if (!data.username || !data.password) {
      if (loginStatus) {
        loginStatus.textContent =
          "Enter your username and password.";
      }

      if (button) {
        button.disabled = false;
        button.textContent = "Log in";
      }

      return;
    }

    try {
      const response = await fetch("/api/login", {
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
          "Invalid username or password."
        );
      }

      if (!result.token) {
        throw new Error(
          "Server did not return a login token."
        );
      }

      // Save authentication token
      setToken(result.token);

      if (loginStatus) {
        loginStatus.textContent = "";
      }

      // Open owner dashboard
      showDashboard();

    } catch (error) {
      console.error("Login error:", error);

      if (loginStatus) {
        loginStatus.textContent =
          error.message === "Failed to fetch"
            ? "Could not reach the server. Make sure the server is running on port 3000."
            : error.message;
      }

    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = "Log in";
      }
    }
  });
}

/* =========================================================
   LOGOUT
   ========================================================= */

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    logoutBtn.disabled = true;
    logoutBtn.textContent = "Logging out...";

    try {
      await authFetch("/api/logout", {
        method: "POST"
      });
    } catch (error) {
      console.warn("Logout request failed:", error);
    }

    clearToken();

    allSubmissions = [];

    showLogin();

    logoutBtn.disabled = false;
    logoutBtn.textContent = "Log out";
  });
}

/* =========================================================
   NORMALIZE SERVER DATA
   ========================================================= */

function normalizeSubmission(request, index = 0) {
  const item = request || {};

  return {
    id:
      item.id ||
      item._id ||
      item.requestId ||
      String(index + 1),

    requestId:
      item.requestId ||
      item.id ||
      `APW-${new Date().getFullYear()}-${String(index + 1).padStart(4, "0")}`,

    ownerName:
      item.ownerName ||
      item.fullName ||
      item.name ||
      item.customerName ||
      "Customer",

    businessName:
      item.businessName ||
      item.business ||
      item.companyName ||
      "Business",

    phone:
      item.phone ||
      item.phoneNumber ||
      item.whatsapp ||
      "Not provided",

    email:
      item.email ||
      item.emailAddress ||
      "Not provided",

    businessType:
      item.businessType ||
      item.websiteType ||
      item.type ||
      "Not specified",

    requirements:
      item.requirements ||
      item.needs ||
      item.message ||
      item.description ||
      item.whatDoYouNeed ||
      "No requirements provided",

    city:
      item.city ||
      item.location ||
      "Location not provided",

    budget:
      item.budget ||
      "Not specified",

    status:
      item.status ||
      "New",

    createdAt:
      item.createdAt ||
      item.submittedAt ||
      new Date().toISOString(),

    updatedAt:
      item.updatedAt ||
      item.createdAt ||
      item.submittedAt ||
      new Date().toISOString()
  };
}

/* =========================================================
   LOAD SUBMISSIONS FROM SERVER
   ========================================================= */

async function loadSubmissions() {
  if (loading) {
    return;
  }

  loading = true;

  try {
    tableBody.innerHTML = `
      <tr>
        <td colspan="8" class="dashboard-loading">
          Loading customer requests...
        </td>
      </tr>
    `;

    const response = await authFetch("/api/submissions");

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
        "Could not load requests."
      );
    }

    /*
      Support both possible backend responses:

      [
        {...},
        {...}
      ]

      OR

      {
        submissions: [...]
      }
    */

    const requests = Array.isArray(result)
      ? result
      : Array.isArray(result.submissions)
        ? result.submissions
        : Array.isArray(result.requests)
          ? result.requests
          : [];

    allSubmissions = requests.map(normalizeSubmission);

    allSubmissions.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();

      return dateB - dateA;
    });

    render();

  } catch (error) {
    console.error("Could not load submissions:", error);

    if (error.message !== "Session expired" &&
        error.message !== "Not authenticated") {

      tableBody.innerHTML = `
        <tr>
          <td colspan="8" class="dashboard-error">
            Could not load customer requests.
            <br>
            <button
              type="button"
              class="retry-btn gradient-button"
              onclick="loadSubmissions()"
            >
              Try again
            </button>
          </td>
        </tr>
      `;
    }

  } finally {
    loading = false;
  }
}

/* =========================================================
   STATUS HELPERS
   ========================================================= */

const STATUS_OPTIONS = [
  "New",
  "Contacted",
  "In Progress",
  "Delivered"
];

function normalizeStatus(status) {
  const value = String(status || "").trim();

  if (value === "Submitted") {
    return "New";
  }

  if (STATUS_OPTIONS.includes(value)) {
    return value;
  }

  return "New";
}

function statusClass(status) {
  const normalized = normalizeStatus(status);

  return (
    "status-" +
    normalized
      .toLowerCase()
      .replace(/\s+/g, "-")
  );
}

/* =========================================================
   DATE
   ========================================================= */

function formatDate(dateString) {
  if (!dateString) {
    return "—";
  }

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

/* =========================================================
   STATISTICS
   ========================================================= */

function renderStats() {
  const total = allSubmissions.length;

  const counts = {
    New: 0,
    Contacted: 0,
    "In Progress": 0,
    Delivered: 0
  };

  allSubmissions.forEach((submission) => {
    const status = normalizeStatus(submission.status);

    if (counts[status] !== undefined) {
      counts[status]++;
    }
  });

  statCards.innerHTML = `
    <div class="stat-card">
      <div class="stat-card__num" id="statNumTotal">
        0
      </div>
      <div class="stat-card__label">
        <span class="pulse-dot contacted"></span>Total requests
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-card__num" id="statNumNew">
        0
      </div>
      <div class="stat-card__label">
        <span class="pulse-dot new"></span>New
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-card__num" id="statNumProgress">
        0
      </div>
      <div class="stat-card__label">
        <span class="pulse-dot in-progress"></span>In progress
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-card__num" id="statNumDelivered">
        0
      </div>
      <div class="stat-card__label">
        <span class="pulse-dot completed"></span>Delivered
      </div>
    </div>
  `;

  if (window.animateCounter) {
    window.animateCounter(document.getElementById("statNumTotal"), 0, total, 1000);
    window.animateCounter(document.getElementById("statNumNew"), 0, counts.New, 1000);
    window.animateCounter(document.getElementById("statNumProgress"), 0, counts["In Progress"], 1000);
    window.animateCounter(document.getElementById("statNumDelivered"), 0, counts.Delivered, 1000);
  } else {
    const elTotal = document.getElementById("statNumTotal");
    const elNew = document.getElementById("statNumNew");
    const elProg = document.getElementById("statNumProgress");
    const elDeliv = document.getElementById("statNumDelivered");

    if (elTotal) elTotal.textContent = total;
    if (elNew) elNew.textContent = counts.New;
    if (elProg) elProg.textContent = counts["In Progress"];
    if (elDeliv) elDeliv.textContent = counts.Delivered;
  }
}

/* =========================================================
   RENDER TABLE
   ========================================================= */

function render() {
  renderStats();

  const query = searchBox
    ? searchBox.value.trim().toLowerCase()
    : "";

  const selectedStatus = statusFilter
    ? statusFilter.value
    : "all";

  const filtered = allSubmissions.filter((submission) => {
    const searchableText = [
      submission.requestId,
      submission.ownerName,
      submission.businessName,
      submission.phone,
      submission.email,
      submission.city,
      submission.businessType,
      submission.requirements,
      submission.budget
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      !query ||
      searchableText.includes(query);

    const normalizedStatus =
      normalizeStatus(submission.status);

    const matchesStatus =
      selectedStatus === "all" ||
      normalizeStatus(selectedStatus) === normalizedStatus;

    return matchesSearch && matchesStatus;
  });

  emptyState.classList.toggle(
    "hidden",
    filtered.length !== 0
  );

  if (filtered.length === 0) {
    tableBody.innerHTML = "";
    return;
  }

  tableBody.innerHTML = filtered
    .map((submission) => {
      const status = normalizeStatus(submission.status);

      const requestId = escapeHtml(
        submission.requestId
      );

      const ownerName = escapeHtml(
        submission.ownerName
      );

      const businessName = escapeHtml(
        submission.businessName
      );

      const phone = escapeHtml(
        submission.phone
      );

      const email = escapeHtml(
        submission.email
      );

      const city = escapeHtml(
        submission.city
      );

      const businessType = escapeHtml(
        submission.businessType
      );

      const requirements = escapeHtml(
        submission.requirements
      );

      const budget = escapeHtml(
        submission.budget
      );

      const safeId = escapeHtml(
        submission.id
      );

      return `
        <tr data-id="${safeId}">

          <!-- DATE / REQUEST ID -->
          <td>
            <div class="request-date">
              ${formatDate(submission.createdAt)}
            </div>

            <div class="request-id">
              ${requestId}
            </div>
          </td>

          <!-- CUSTOMER -->
          <td>
            <div class="customer-name">
              ${ownerName}
            </div>

            <div class="customer-label">
              Customer
            </div>
          </td>

          <!-- BUSINESS -->
          <td>
            <div class="business-name">
              ${businessName}
            </div>

            <div class="business-location">
              ${city}
            </div>
          </td>

          <!-- WEBSITE TYPE -->
          <td>
            <span class="business-type">
              ${businessType}
            </span>

            ${
              budget !== "Not specified"
                ? `
                  <div class="business-location">
                    Budget: ${budget}
                  </div>
                `
                : ""
            }
          </td>

          <!-- CONTACT -->
          <td>
            <div class="contact-phone">
              ${phone !== "Not provided" ? `<a href="tel:${phone}" class="contact-link">${phone}</a>` : phone}
            </div>

            <div class="contact-email">
              ${email !== "Not provided" ? `<a href="mailto:${email}" class="contact-link">${email}</a>` : email}
            </div>
          </td>

          <!-- REQUIREMENTS -->
          <td class="req-cell">
            <div
              class="requirements-text"
              title="Click to view complete details"
              data-action="view-req"
            >
              ${requirements}
            </div>
          </td>

          <!-- STATUS -->
          <td>
            <div class="status-wrapper">

              <span
                class="status-pill ${statusClass(status)}"
              >
                ${escapeHtml(status)}
              </span>

              <select
                class="status-select"
                data-id="${safeId}"
                aria-label="Change request status"
              >
                ${STATUS_OPTIONS.map((option) => `
                  <option
                    value="${escapeHtml(option)}"
                    ${
                      option === status
                        ? "selected"
                        : ""
                    }
                  >
                    ${escapeHtml(option)}
                  </option>
                `).join("")}
              </select>

            </div>
          </td>

          <!-- ACTION -->
<td>
  ${
    status === "New"
      ? `
        <button
          class="contact-btn gradient-button"
          data-id="${safeId}"
          type="button"
        >
          Contact
        </button>
      `
      : status === "Contacted"
        ? `
          <button
            class="contact-btn contacted gradient-button gradient-button-variant"
            type="button"
            disabled
          >
            ✓ Contacted
          </button>
        `
        : `
          <span class="action-complete">
            —
          </span>
        `
  }

  <button
    class="delete-btn gradient-button gradient-button-danger"
    data-id="${safeId}"
    type="button"
  >
    Delete
  </button>
</td>

        </tr>
      `;
    })
    .join("");
}

/* =========================================================
   CHANGE STATUS
   ========================================================= */

if (tableBody) {
  tableBody.addEventListener("change", async (event) => {
    const select = event.target.closest(
      ".status-select"
    );

    if (!select) {
      return;
    }

    const id = select.dataset.id;
    const newStatus = select.value;

    if (!id || !newStatus) {
      return;
    }

    const oldItem = allSubmissions.find(
      (item) => String(item.id) === String(id)
    );

    const oldStatus = oldItem
      ? oldItem.status
      : "New";

    select.disabled = true;

    try {
      const response = await authFetch(
        `/api/submissions/${encodeURIComponent(id)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            status: newStatus
          })
        }
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
          "Could not update the request status."
        );
      }

      const item = allSubmissions.find(
        (submission) =>
          String(submission.id) === String(id)
      );

      if (item) {
        item.status = newStatus;
        item.updatedAt =
          result.updatedAt ||
          new Date().toISOString();
      }

      if (window.showToast) {
        window.showToast("Status Updated", `Request status updated to ${newStatus}`, "success");
      }

      render();

    } catch (error) {
      console.error(
        "Status update failed:",
        error
      );

      if (window.showToast) {
        window.showToast("Update Failed", error.message || "Could not update status", "error");
      } else {
        alert(
          error.message ||
          "Could not update the request status."
        );
      }

      if (oldItem) {
        oldItem.status = oldStatus;
      }

      render();

    } finally {
      select.disabled = false;
    }
  });
}

/* =========================================================
   CUSTOMER REQUIREMENTS INSPECTION MODAL
   ========================================================= */

const modalBackdrop = document.getElementById("modalBackdrop");
const modalCloseBtn = document.getElementById("modalCloseBtn");

function openRequestModal(submission) {
  if (!modalBackdrop || !submission) return;

  const modalTitle = document.getElementById("modalTitle");
  const modalCust = document.getElementById("modalCustomerName");
  const modalBiz = document.getElementById("modalBusinessName");
  const modalPhone = document.getElementById("modalPhone");
  const modalEmail = document.getElementById("modalEmail");
  const modalLoc = document.getElementById("modalLocation");
  const modalBud = document.getElementById("modalBudget");
  const modalReq = document.getElementById("modalRequirements");

  if (modalTitle) modalTitle.textContent = `Request ${submission.requestId || ""}`;
  if (modalCust) modalCust.textContent = submission.ownerName || "—";
  if (modalBiz) modalBiz.textContent = submission.businessName || "—";
  if (modalPhone) modalPhone.textContent = submission.phone || "—";
  if (modalEmail) modalEmail.textContent = submission.email || "—";
  if (modalLoc) modalLoc.textContent = submission.city || "—";
  if (modalBud) modalBud.textContent = submission.budget || "—";
  if (modalReq) modalReq.textContent = submission.requirements || "No requirements provided.";

  modalBackdrop.classList.add("active");
}

function closeRequestModal() {
  if (modalBackdrop) {
    modalBackdrop.classList.remove("active");
  }
}

if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", closeRequestModal);
}

if (modalBackdrop) {
  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) {
      closeRequestModal();
    }
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeRequestModal();
  }
});

/* =========================================================
   CONTACT CUSTOMER
   ========================================================= */

if (tableBody) {
  tableBody.addEventListener("click", async (event) => {
    const reqTarget = event.target.closest(".requirements-text");
    if (reqTarget) {
      const tr = reqTarget.closest("tr");
      const id = tr ? tr.dataset.id : null;
      if (id) {
        const item = allSubmissions.find((s) => String(s.id) === String(id));
        if (item) {
          openRequestModal(item);
          return;
        }
      }
    }

    const button = event.target.closest(".contact-btn");

    if (!button || button.disabled || button.classList.contains("contacted")) {
      return;
    }

    const id = button.dataset.id;

    if (!id) {
      return;
    }

    const item = allSubmissions.find(
      (submission) =>
        String(submission.id) === String(id)
    );

    if (!item) {
      return;
    }

    button.disabled = true;
    button.textContent = "Contacting...";

    try {
      const response = await authFetch(
        `/api/submissions/${encodeURIComponent(id)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            status: "Contacted"
          })
        }
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
          "Could not mark the customer as contacted."
        );
      }

      /* Update the local dashboard immediately */
      item.status = "Contacted";

      item.updatedAt =
        result.updatedAt ||
        new Date().toISOString();

      if (window.showToast) {
        window.showToast(
          "Customer Contacted",
          "The request has been moved to Contacted.",
          "success"
        );
      }

      /* Re-render dashboard */
      render();

    } catch (error) {
      console.error(
        "Contact update failed:",
        error
      );

      if (window.showToast) {
        window.showToast(
          "Contact Failed",
          error.message ||
          "Could not update the request.",
          "error"
        );
      } else {
        alert(
          error.message ||
          "Could not update the request."
        );
      }

      button.disabled = false;
      button.textContent = "Contact";
    }
  });
}

/* =========================================================
   DELETE REQUEST
   ========================================================= */

if (tableBody) {
  tableBody.addEventListener("click", async (event) => {
    const button = event.target.closest(
      ".delete-btn"
    );

    if (!button) {
      return;
    }

    const id = button.dataset.id;

    if (!id) {
      return;
    }

    const item = allSubmissions.find(
      (submission) =>
        String(submission.id) === String(id)
    );

    const requestId =
      item?.requestId || id;

    const confirmed = confirm(
      `Delete request ${requestId}?\n\nThis action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    button.disabled = true;
    button.textContent = "Deleting...";

    try {
      const response = await authFetch(
        `/api/submissions/${encodeURIComponent(id)}`,
        {
          method: "DELETE"
        }
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
          "Could not delete the request."
        );
      }

      allSubmissions =
        allSubmissions.filter(
          (submission) =>
            String(submission.id) !== String(id)
        );

      render();

    } catch (error) {
      console.error(
        "Delete failed:",
        error
      );

      alert(
        error.message ||
        "Could not delete the request."
      );

      button.disabled = false;
      button.textContent = "Delete";
    }
  });
}

/* =========================================================
   SEARCH
   ========================================================= */

if (searchBox) {
  searchBox.addEventListener(
    "input",
    render
  );
}

/* =========================================================
   FILTER
   ========================================================= */

if (statusFilter) {
  statusFilter.addEventListener(
    "change",
    render
  );
}

/* =========================================================
   AUTO REFRESH
   ========================================================= */

/*
   Refresh every 30 seconds while dashboard
   is open so new customer requests appear.
*/

let refreshTimer = null;

function startAutoRefresh() {
  if (refreshTimer) {
    clearInterval(refreshTimer);
  }

  refreshTimer = setInterval(() => {
    if (
      !dashScreen.classList.contains("hidden")
    ) {
      loadSubmissions();
    }
  }, 30000);
}

/* =========================================================
   START
   ========================================================= */

if (getToken()) {
  showDashboard();
} else {
  showLogin();
}

startAutoRefresh();