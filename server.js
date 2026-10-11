const express = require("express");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const { execSync } = require("child_process");
require("dotenv").config();

const app = express();

// STRICTLY ENFORCE PORT 3000 PERMANENTLY
const PORT = 3000;

const PUBLIC_DIR = path.join(__dirname, "public");
const DATA_DIR = path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "submissions.json");


// =====================================================
// BASIC SETUP
// =====================================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// =====================================================
// CREATE DATA FOLDER / FILE
// =====================================================

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, "[]", "utf8");
}


// =====================================================
// STATIC FILES
// =====================================================

app.use(express.static(PUBLIC_DIR));


// =====================================================
// HELPER FUNCTIONS
// =====================================================

function readSubmissions() {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf8");

    if (!data.trim()) {
      return [];
    }

    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading submissions:", error);
    return [];
  }
}


function saveSubmissions(submissions) {
  fs.writeFileSync(
    DATA_FILE,
    JSON.stringify(submissions, null, 2),
    "utf8"
  );
}


function generateRequestId(submissions) {
  let highestId = 999;

  submissions.forEach((submission) => {
    const id = Number(submission.requestId);

    if (!Number.isNaN(id) && id > highestId) {
      highestId = id;
    }
  });

  return highestId + 1;
}


// =====================================================
// PAGE ROUTES
// =====================================================

// Customer website
app.get("/", (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, "index.html"));
});


// Portfolio
app.get("/portfolio", (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, "portfolio.html"));
});

app.get("/portfolio.html", (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, "portfolio.html"));
});


// Owner dashboard
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, "dashboard.html"));
});

app.get("/dashboard.html", (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, "dashboard.html"));
});


// =====================================================
// SUBMIT WEBSITE REQUEST
// =====================================================

app.post("/api/submit", (req, res) => {

  try {

    const submissions = readSubmissions();

    const {
      ownerName,
      businessName,
      city,
      businessType,
      phone,
      email,
      requirements,
      name,
      message
    } = req.body;


    const finalOwnerName =
      ownerName ||
      name ||
      "";


    const finalRequirements =
      requirements ||
      message ||
      "";


    if (!finalOwnerName || !businessName) {

      return res.status(400).json({
        success: false,
        message: "Owner name and business name are required."
      });

    }


    const requestId =
      generateRequestId(submissions);


    const newSubmission = {

      requestId: String(requestId),

      ownerName: finalOwnerName,

      businessName,

      city: city || "",

      businessType: businessType || "Other",

      phone: phone || "",

      email: email || "",

      requirements: finalRequirements,

      status: "New",

      createdAt: new Date().toISOString()

    };


    submissions.push(newSubmission);

    saveSubmissions(submissions);


    res.status(201).json({

      success: true,

      message: "Website request submitted successfully.",

      requestId: String(requestId),

      submission: newSubmission

    });


  } catch (error) {

    console.error("Submit error:", error);

    res.status(500).json({

      success: false,

      message: "Something went wrong while submitting the request."

    });

  }

});


// =====================================================
// OWNER LOGIN
// =====================================================

// =====================================================
// OWNER LOGIN
// =====================================================

const OWNER_USERNAME = "owner";
const OWNER_PASSWORD = "appu2006";

const activeTokens = new Set();

app.post("/api/login", (req, res) => {
  try {
    const username = String(req.body.username || "").trim();
    const password = String(req.body.password || "");

    console.log("Login attempt:", username);

    if (
      username === OWNER_USERNAME &&
      password === OWNER_PASSWORD
    ) {
      const token = crypto.randomBytes(32).toString("hex");

      activeTokens.add(token);

      return res.status(200).json({
        success: true,
        token: token,
        message: "Login successful."
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid username or password."
    });

  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Login server error."
    });
  }
});

// =====================================================
// AUTHENTICATION MIDDLEWARE
// =====================================================

function authenticate(req, res, next) {

  const authHeader =
    req.headers.authorization || "";


  const token =
    authHeader.startsWith("Bearer ")
      ? authHeader.substring(7)
      : "";


  if (!token || !activeTokens.has(token)) {

    return res.status(401).json({

      success: false,

      message: "Unauthorized."

    });

  }


  next();

}


// =====================================================
// GET SUBMISSIONS
// =====================================================

app.get(
  "/api/submissions",
  authenticate,
  (req, res) => {

    const submissions =
      readSubmissions();


    res.json({

      success: true,

      submissions

    });

  }
);


// =====================================================
// UPDATE REQUEST STATUS
// =====================================================

app.patch(
  "/api/submissions/:requestId",
  authenticate,
  (req, res) => {

    const {
      requestId
    } = req.params;


    const {
      status
    } = req.body;


    const allowedStatuses = [
      "New",
      "Contacted",
      "In Progress",
      "Delivered"
    ];


    if (!allowedStatuses.includes(status)) {

      return res.status(400).json({

        success: false,

        message: "Invalid status."

      });

    }


    const submissions =
      readSubmissions();


    const submission =
      submissions.find(
        item =>
          String(item.requestId) === String(requestId) ||
          String(item.id) === String(requestId)
      );


    if (!submission) {

      return res.status(404).json({

        success: false,

        message: "Request not found."

      });

    }


    submission.status = status;

    submission.updatedAt =
      new Date().toISOString();


    saveSubmissions(submissions);


    res.json({

      success: true,

      message: "Request status updated.",

      submission

    });

  }
);


// =====================================================
// DELETE REQUEST
// =====================================================

app.delete(
  "/api/submissions/:requestId",
  authenticate,
  (req, res) => {

    const {
      requestId
    } = req.params;

    const submissions =
      readSubmissions();

    const initialLength = submissions.length;

    const filtered = submissions.filter(
      item =>
        String(item.requestId) !== String(requestId) &&
        String(item.id) !== String(requestId)
    );

    if (filtered.length === initialLength) {
      return res.status(404).json({
        success: false,
        message: "Request not found."
      });
    }

    saveSubmissions(filtered);

    res.json({
      success: true,
      message: "Request deleted successfully."
    });

  }
);


// =====================================================
// LOGOUT
// =====================================================

app.post(
  "/api/logout",
  authenticate,
  (req, res) => {

    const authHeader =
      req.headers.authorization || "";


    const token =
      authHeader.startsWith("Bearer ")
        ? authHeader.substring(7)
        : "";


    activeTokens.delete(token);


    res.json({

      success: true,

      message: "Logged out successfully."

    });

  }
);


// =====================================================
// PUBLIC REQUEST TRACKING (customer-facing)
// Returns only the safe fields needed for the timeline.
// =====================================================

app.get("/api/track/:requestId", (req, res) => {

  const submissions = readSubmissions();

  const submission = submissions.find(
    item =>
      String(item.requestId) === String(req.params.requestId) ||
      String(item.id) === String(req.params.requestId)
  );

  if (!submission) {
    return res.status(404).json({
      success: false,
      message: "Request not found."
    });
  }

  res.json({
    success: true,
    requestId: String(submission.requestId || submission.id || ""),
    businessName: submission.businessName || "",
    city: submission.city || "",
    status: submission.status || "New",
    createdAt: submission.createdAt || "",
    updatedAt: submission.updatedAt || ""
  });

});


// =====================================================
// 404
// =====================================================

app.use((req, res) => {

  res.status(404).send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>404 — Page Not Found</title>
      <style>
        body {
          margin: 0;
          min-height: 100vh;
          display: grid;
          place-items: center;
          background: #080808;
          color: white;
          font-family: Arial, sans-serif;
        }

        div {
          text-align: center;
        }

        a {
          color: #ff5926;
          text-decoration: none;
        }
      </style>
    </head>

    <body>

      <div>

        <h1>404</h1>

        <p>Page not found.</p>

        <a href="/">
          Back to ApnaWeb
        </a>

      </div>

    </body>
    </html>
  `);

});


// =====================================================
// AUTOMATIC PORT 3000 ENFORCEMENT & CONFLICT RESOLUTION
// =====================================================

function freePort(targetPort) {
  try {
    if (process.platform === "win32") {
      const psCmd = `powershell -NoProfile -Command "Get-NetTCPConnection -LocalPort ${targetPort} -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }"`;
      execSync(psCmd, { stdio: "ignore" });
    } else {
      execSync(`lsof -ti:${targetPort} | xargs kill -9 2>/dev/null || true`, { stdio: "ignore" });
    }
  } catch (e) {
    // Port wasn't locked or already freed
  }
}

function startServer(canRetry = true) {
  const server = app.listen(PORT, () => {
    console.log("");
    console.log("====================================");
    console.log("      ApnaWeb Server Running");
    console.log("====================================");
    console.log("");
    console.log(`Customer Website: http://localhost:${PORT}/`);
    console.log(`Portfolio:        http://localhost:${PORT}/portfolio.html`);
    console.log(`Owner Dashboard:  http://localhost:${PORT}/dashboard.html`);
    console.log("");
    console.log("====================================");
    console.log("");
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE" && canRetry) {
      console.warn(`\n[Notice] Port ${PORT} was occupied by an earlier process.`);
      console.warn(`[Action] Automatically freeing port ${PORT} to lock http://localhost:3000 permanently...\n`);
      freePort(PORT);
      setTimeout(() => {
        startServer(false);
      }, 800);
    } else {
      console.error(`\n[Server Error on Port ${PORT}]:`, err.message);
    }
  });
}

startServer();