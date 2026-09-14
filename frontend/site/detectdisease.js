/* =========================================================
   Kisan Vision — Detect Disease
   Vanilla JavaScript. No frameworks.

   Backend:
   POST /predict
   Authentication:
   Authorization: Bearer <JWT>
   ========================================================= */

/* =========================
   CONFIGURATION
   ========================= */

// Same-origin API: FastAPI serves this site and the endpoints together.
const API_URL = "/predict";

// Backend expects image files using "files".
const IMAGE_FIELD_NAME = "files";

// Constraints
const MAX_IMAGES = 3;
const MAX_FILE_SIZE_MB = 10;
const ACCEPTED_MIME = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];


/* =========================
   STATE
   ========================= */

const state = {
  files: [],
  isAnalyzing: false,
};


/* =========================
   DOM REFERENCES
   ========================= */

const $ = (id) => document.getElementById(id);

const dom = {
  dropzone: $("kvDropzone"),
  fileInput: $("kvFileInput"),
  browseBtn: $("kvBrowseBtn"),
  selectedWrap: $("kvSelectedWrap"),
  previews: $("kvPreviews"),
  count: $("kvCount"),
  addMore: $("kvAddMore"),
  removeAll: $("kvRemoveAll"),
  message: $("kvMessage"),
  analyzeBtn: $("kvAnalyzeBtn"),
  analyzeLabel: document.querySelector("#kvAnalyzeBtn .kv-btn-label"),
  result: $("kvResult"),
  crop: $("kvCrop"),
  disease: $("kvDisease"),
  confidence: $("kvConfidence"),
  confidenceFill: $("kvConfidenceFill"),
  aboutBody: $("kvAboutBody"),
  symptomsList: $("kvSymptomsList"),
  symptomsEmpty: $("kvSymptomsEmpty"),
  manageList: $("kvManageList"),
  manageEmpty: $("kvManageEmpty"),
  treatBody: $("kvTreatBody"),
  altList: $("kvAltList"),
  altEmpty: $("kvAltEmpty"),
  confidenceMsg: $("kvConfidenceMsg"),
  resetBtn: $("kvResetBtn"),
  menuToggle: $("kvMenuToggle"),
  nav: $("kvNav"),
  chatbotBtn: $("kvChatbotBtn"),
  year: $("kvYear"),
};


/* =========================
   INIT
   ========================= */

document.addEventListener("DOMContentLoaded", () => {
  bindEvents();

  if (dom.year) {
    dom.year.textContent = new Date().getFullYear();
  }
});


/* =========================
   EVENT BINDING
   ========================= */

function bindEvents() {
  // File input
  dom.browseBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dom.fileInput.click();
  });

  dom.dropzone.addEventListener("click", () => {
    dom.fileInput.click();
  });

  dom.dropzone.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      dom.fileInput.click();
    }
  });

  dom.fileInput.addEventListener("change", (e) => {
    selectImages(e.target.files);
  });


  // Drag & drop
  ["dragenter", "dragover"].forEach((evt) => {
    dom.dropzone.addEventListener(evt, (e) => {
      e.preventDefault();
      e.stopPropagation();

      dom.dropzone.classList.add("is-dragover");
    });
  });

  ["dragleave", "drop"].forEach((evt) => {
    dom.dropzone.addEventListener(evt, (e) => {
      e.preventDefault();
      e.stopPropagation();

      dom.dropzone.classList.remove("is-dragover");
    });
  });

  dom.dropzone.addEventListener("drop", (e) => {
    if (e.dataTransfer && e.dataTransfer.files) {
      selectImages(e.dataTransfer.files);
    }
  });


  // Actions
  dom.addMore.addEventListener("click", () => {
    dom.fileInput.click();
  });

  dom.removeAll.addEventListener("click", resetAnalysis);

  dom.analyzeBtn.addEventListener("click", analyzeLeaves);

  dom.resetBtn.addEventListener("click", resetAnalysis);


  // Mobile menu
  dom.menuToggle.addEventListener("click", () => {
    const open = dom.nav.classList.toggle("is-open");

    dom.menuToggle.setAttribute(
      "aria-expanded",
      open ? "true" : "false"
    );
  });

  // Shared chatbot is initialized by language.js.
}


/* =========================
   AUTHENTICATION
   ========================= */

/**
 * Get JWT token saved after login.
 */
function getAuthToken() {
  return localStorage.getItem("kisanVisionToken");
}


/**
 * Check whether user is logged in.
 */
function isUserLoggedIn() {
  const token = getAuthToken();

  return !!token;
}


/**
 * Redirect user to login page.
 */
function redirectToLogin(message = "Please login first to use disease detection.") {
  showMessage(message, "warn");

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1000);
}


/* =========================
   IMAGE SELECTION & VALIDATION
   ========================= */

function selectImages(fileList) {
  clearMessage();

  const incoming = Array.from(fileList || []);

  if (incoming.length === 0) {
    return;
  }

  const valid = [];

  for (const file of incoming) {
    const err = validateFile(file);

    if (err) {
      showMessage(err, "error");
      break;
    }

    valid.push(file);
  }


  // Enforce MAX_IMAGES total
  const remainingSlots = MAX_IMAGES - state.files.length;

  if (valid.length > remainingSlots) {
    if (state.files.length >= MAX_IMAGES) {
      showMessage(
        window.tf(
          "detect.errMax",
          { n: MAX_IMAGES },
          `Please upload no more than ${MAX_IMAGES} images.`
        ),
        "error"
      );
    } else {
      showMessage(
        window.tf(
          "detect.errRemaining",
          { n: remainingSlots },
          `You can add up to ${remainingSlots} more image(s). Maximum ${MAX_IMAGES} allowed.`
        ),
        "error"
      );
    }
  }


  const accepted = valid.slice(0, remainingSlots);

  state.files = state.files.concat(accepted);

  previewImages();

  // Allow selecting the same file again
  dom.fileInput.value = "";
}


function validateFile(file) {
  if (!file) {
    return window.t(
      "detect.errInvalid",
      "Invalid file."
    );
  }

  if (!ACCEPTED_MIME.includes(file.type)) {
    return window.t(
      "detect.errUnsupported",
      "Unsupported file type. Please upload JPG, PNG, or WEBP images only."
    );
  }

  const sizeMb = file.size / (1024 * 1024);

  if (sizeMb > MAX_FILE_SIZE_MB) {
    return `Each image must be smaller than ${MAX_FILE_SIZE_MB} MB.`;
  }

  return null;
}


function validateImages() {
  if (state.files.length === 0) {
    showMessage(
      "Please select at least one crop image.",
      "error"
    );

    return false;
  }

  if (state.files.length > MAX_IMAGES) {
    showMessage(
      window.tf(
        "detect.errMax",
        { n: MAX_IMAGES },
        `Please upload no more than ${MAX_IMAGES} images.`
      ),
      "error"
    );

    return false;
  }

  return true;
}


/* =========================
   PREVIEW RENDERING
   ========================= */

function previewImages() {
  dom.previews.innerHTML = "";

  if (state.files.length === 0) {
    dom.selectedWrap.hidden = true;
    dom.analyzeBtn.disabled = true;

    return;
  }

  dom.selectedWrap.hidden = false;

  dom.count.textContent =
    `${state.files.length}/${MAX_IMAGES}`;

  dom.analyzeBtn.disabled = false;


  state.files.forEach((file, index) => {
    const card = document.createElement("div");

    card.className = "kv-preview";
    card.setAttribute("role", "listitem");


    const img = document.createElement("img");

    img.alt =
      `Selected leaf image ${index + 1}`;

    img.src =
      URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(img.src);
    };


    const removeBtn =
      document.createElement("button");

    removeBtn.type = "button";

    removeBtn.className =
      "kv-preview-remove";

    removeBtn.setAttribute(
      "aria-label",
      `Remove image ${index + 1}`
    );

    removeBtn.textContent = "×";


    removeBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      state.files.splice(index, 1);

      previewImages();
    });


    const name =
      document.createElement("div");

    name.className =
      "kv-preview-name";

    name.textContent =
      file.name;


    card.appendChild(img);
    card.appendChild(removeBtn);
    card.appendChild(name);

    dom.previews.appendChild(card);
  });
}


/* =========================
   ANALYZE / API CALL
   ========================= */

async function analyzeLeaves() {
  if (state.isAnalyzing) {
    return;
  }

  if (!validateImages()) {
    return;
  }


  /* ---------------------------------
     AUTH CHECK
     --------------------------------- */

  const token = getAuthToken();

  if (!token) {
    redirectToLogin(
      "Please login first to use disease detection."
    );

    return;
  }


  clearMessage();

  setLoading(true);


  try {
    /* ---------------------------------
       CREATE FORM DATA
       --------------------------------- */

    const formData = new FormData();

    state.files.forEach((file) => {
      formData.append(
        IMAGE_FIELD_NAME,
        file,
        file.name
      );
    });


    /* ---------------------------------
       SEND REQUEST WITH JWT
       --------------------------------- */

    const response = await fetch(
      API_URL,
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${token}`,
        },

        body: formData,
      }
    );


    /* ---------------------------------
       HANDLE HTTP ERRORS
       --------------------------------- */

    if (!response.ok) {
      throw new Error(
        `API_ERROR_${response.status}`
      );
    }


    /* ---------------------------------
       READ JSON RESPONSE
       --------------------------------- */

    let data;

    try {
      data = await response.json();
    } catch (err) {
      throw new Error("INVALID_RESPONSE");
    }


    /* ---------------------------------
       HANDLE PREDICTION
       --------------------------------- */

    handlePredictionResponse(data);

  } catch (err) {
    console.error(
      "Disease prediction error:",
      err
    );

    handleAnalyzeError(err);

  } finally {
    setLoading(false);
  }
}


/* =========================
   API ERROR HANDLING
   ========================= */

function handleAnalyzeError(err) {
  const code =
    (err && err.message) || "";


  /* ---------------------------------
     AUTH REQUIRED
     --------------------------------- */

  if (code === "AUTH_REQUIRED") {
    redirectToLogin(
      "Please login first to use disease detection."
    );

    return;
  }


  /* ---------------------------------
     UNAUTHORIZED / TOKEN EXPIRED
     --------------------------------- */

  if (code === "API_ERROR_401") {
    localStorage.removeItem(
      "kisanVisionToken"
    );

    localStorage.removeItem(
      "kisanVisionUser"
    );

    showMessage(
      "Your session has expired. Please login again.",
      "warn"
    );

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1000);

    return;
  }


  /* ---------------------------------
     FORBIDDEN
     --------------------------------- */

  if (code === "API_ERROR_403") {
    showMessage(
      "You are not authorized to use disease detection.",
      "warn"
    );

    return;
  }


  /* ---------------------------------
     BACKEND NOT CONFIGURED
     --------------------------------- */

  if (code === "BACKEND_NOT_CONFIGURED") {
    showMessage(
      "The AI service is not yet configured. Please connect your backend API URL in detectdisease.js.",
      "warn"
    );

    return;
  }


  /* ---------------------------------
     INVALID RESPONSE
     --------------------------------- */

  if (code === "INVALID_RESPONSE") {
    showMessage(
      "The AI service returned an unexpected response. Please try again.",
      "error"
    );

    return;
  }


  /* ---------------------------------
     OTHER API ERRORS
     --------------------------------- */

  if (code.startsWith("API_ERROR_")) {
    showMessage(
      "Something went wrong while analyzing your images. Please try again.",
      "error"
    );

    return;
  }


  /* ---------------------------------
     NETWORK / UNKNOWN ERROR
     --------------------------------- */

  showMessage(
    "Unable to connect to the AI service. Please try again later.",
    "error"
  );
}


/* =========================
   RESPONSE HANDLING
   ========================= */

function handlePredictionResponse(data) {
  const normalized =
    normalizePredictionResponse(data);

  if (
    !normalized ||
    !normalized.disease
  ) {
    showMessage(
      "The AI could not determine a prediction from these images. Please try clearer photos.",
      "error"
    );

    return;
  }

  renderResults(normalized);
}


/**
 * Normalize backend response to the shape used by UI.
 *
 * Backend response examples supported:
 *
 * {
 *   prediction: {
 *      crop,
 *      disease,
 *      confidence
 *   },
 *   disease_information: {...},
 *   top_predictions: [...]
 * }
 */
function normalizePredictionResponse(data) {
  if (
    !data ||
    typeof data !== "object"
  ) {
    return null;
  }


  // Main prediction
  const rawTop =
    data.prediction ||
    data.result ||
    data.top ||
    data;


  // Disease information
  const diseaseInfo =
    data.disease_information || {};


  // Alternative predictions
  const rawAlts =
    data.top_predictions ||
    data.alternatives ||
    data.alternative_predictions ||
    data.alternatives_list ||
    [];


  // Confidence
  const confidence =
    toPercent(
      rawTop.confidence ??
      rawTop.score ??
      rawTop.probability ??
      data.confidence
    );


  // Symptoms
  const symptoms =
    ensureArray(
      rawTop.symptoms ??
      diseaseInfo.symptoms ??
      data.symptoms
    );


  // Management
  const management =
    ensureArray(
      rawTop.management ??
      rawTop.recommended_management ??
      diseaseInfo.management ??
      data.management
    );


  // Alternatives
  const alternatives =
    Array.isArray(rawAlts)
      ? rawAlts
          .map((a) => ({
            crop: safeText(
              a.crop ??
              a.plant ??
              ""
            ),

            disease: safeText(
              a.disease ??
              a.condition ??
              a.label ??
              ""
            ),

            confidence: toPercent(
              a.confidence ??
              a.score ??
              a.probability
            ),
          }))
          .filter(
            (a) => a.disease
          )
      : [];


  return {
    crop: safeText(
      rawTop.crop ??
      rawTop.plant ??
      data.crop ??
      ""
    ),

    disease: safeText(
      rawTop.disease ??
      rawTop.condition ??
      rawTop.label ??
      data.disease ??
      ""
    ),

    confidence,

    about: safeText(
      rawTop.about ??
      rawTop.description ??
      diseaseInfo.description ??
      data.about ??
      ""
    ),

    symptoms,

    management,

    treatment: safeText(
      rawTop.treatment ??
      rawTop.treatment_guidance ??
      diseaseInfo.treatment_note ??
      data.treatment ??
      ""
    ),

    alternatives,
  };
}


/* =========================
   RESPONSE HELPERS
   ========================= */

function ensureArray(v) {
  if (!v) {
    return [];
  }

  if (Array.isArray(v)) {
    return v
      .map(safeText)
      .filter(Boolean);
  }

  if (typeof v === "string") {
    return v
      .split(/\r?\n|•|;|·/)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  return [];
}


function toPercent(v) {
  if (
    v === null ||
    v === undefined ||
    v === ""
  ) {
    return null;
  }

  const n = Number(v);

  if (Number.isNaN(n)) {
    return null;
  }

  // Accept both:
  // 0..1
  // and
  // 0..100

  const pct =
    n <= 1
      ? n * 100
      : n;

  return Math.max(
    0,
    Math.min(100, pct)
  );
}


function safeText(v) {
  if (
    v === null ||
    v === undefined
  ) {
    return "";
  }

  return String(v).trim();
}


/* =========================
   RENDER RESULTS
   ========================= */

function renderResults(r) {

  // Main cards
  dom.crop.textContent =
    r.crop || "—";

  dom.disease.textContent =
    r.disease || "—";


  // Confidence
  if (
    typeof r.confidence === "number"
  ) {
    dom.confidence.textContent =
      `${r.confidence.toFixed(2)}%`;

    dom.confidenceFill.style.width =
      `${r.confidence}%`;

  } else {
    dom.confidence.textContent =
      "N/A";

    dom.confidenceFill.style.width =
      "0%";
  }


  // About
  dom.aboutBody.textContent =
    r.about ||
    window.t(
      "detect.aboutEmpty",
      "No description available for this condition."
    );


  // Symptoms
  renderList(
    dom.symptomsList,
    dom.symptomsEmpty,
    r.symptoms
  );


  // Management
  renderList(
    dom.manageList,
    dom.manageEmpty,
    r.management
  );


  // Treatment
  dom.treatBody.textContent =
    r.treatment ||
    window.t(
      "detect.treatEmpty",
      "No specific treatment guidance provided. Consult a local agricultural expert."
    );


  // Alternatives
  dom.altList.innerHTML = "";

  if (
    r.alternatives &&
    r.alternatives.length > 0
  ) {
    dom.altEmpty.hidden = true;

    r.alternatives.forEach((a) => {

      const li =
        document.createElement("li");


      const label =
        document.createElement("span");

      label.className =
        "kv-alt-crop";

      label.textContent =
        `${a.crop ? a.crop + " — " : ""}${a.disease}`;


      const bar =
        document.createElement("span");

      bar.className =
        "kv-alt-bar";


      const fill =
        document.createElement("span");

      fill.className =
        "kv-alt-bar-fill";

      fill.style.display =
        "block";

      fill.style.width =
        `${a.confidence ?? 0}%`;


      bar.appendChild(fill);


      const conf =
        document.createElement("span");

      conf.className =
        "kv-alt-conf";

      conf.textContent =
        typeof a.confidence === "number"
          ? `${a.confidence.toFixed(2)}%`
          : "—";


      li.appendChild(label);
      li.appendChild(bar);
      li.appendChild(conf);

      dom.altList.appendChild(li);
    });

  } else {
    dom.altEmpty.hidden = false;
  }


  // Confidence message
  renderConfidenceMessage(
    r.confidence
  );


  // Show result
  dom.result.hidden = false;

  dom.result.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}


/* =========================
   LIST RENDERING
   ========================= */

function renderList(
  listEl,
  emptyEl,
  items
) {
  listEl.innerHTML = "";

  if (
    !items ||
    items.length === 0
  ) {
    emptyEl.hidden = false;
    listEl.hidden = true;

    return;
  }


  emptyEl.hidden = true;
  listEl.hidden = false;


  items.forEach((text) => {
    const li =
      document.createElement("li");

    li.textContent = text;

    listEl.appendChild(li);
  });
}


/* =========================
   CONFIDENCE MESSAGE
   ========================= */

function renderConfidenceMessage(pct) {
  dom.confidenceMsg.classList.remove(
    "kv-conf-high",
    "kv-conf-med",
    "kv-conf-low"
  );


  if (
    typeof pct !== "number"
  ) {
    dom.confidenceMsg.textContent =
      window.t(
        "detect.confNa",
        "Confidence score is not available for this prediction."
      );

    dom.confidenceMsg.classList.add(
      "kv-conf-med"
    );

    return;
  }


  if (pct >= 75) {

    dom.confidenceMsg.textContent =
      window.t(
        "detect.confHigh",
        "The AI model is highly confident in this prediction."
      );

    dom.confidenceMsg.classList.add(
      "kv-conf-high"
    );

  } else if (pct >= 50) {

    dom.confidenceMsg.textContent =
      window.t(
        "detect.confMed",
        "The AI model has moderate confidence in this prediction."
      );

    dom.confidenceMsg.classList.add(
      "kv-conf-med"
    );

  } else {

    dom.confidenceMsg.textContent =
      window.t(
        "detect.confLow",
        "The AI model has low confidence. Consider uploading clearer images."
      );

    dom.confidenceMsg.classList.add(
      "kv-conf-low"
    );
  }
}


/* =========================
   UI HELPERS
   ========================= */

function setLoading(isLoading) {
  state.isAnalyzing =
    isLoading;

  dom.analyzeBtn.disabled =
    isLoading ||
    state.files.length === 0;

  dom.analyzeBtn.classList.toggle(
    "is-loading",
    isLoading
  );


  dom.analyzeLabel.textContent =
    isLoading
      ? window.t(
          "detect.analyzeLoading",
          "Analyzing your crop..."
        )
      : window.t(
          "detect.analyzeBtn",
          "Analyze Leaves"
        );


  dom.addMore.disabled =
    isLoading;

  dom.removeAll.disabled =
    isLoading;
}


function showMessage(
  text,
  kind = "error"
) {
  dom.message.hidden = false;

  dom.message.textContent =
    text;

  dom.message.classList.remove(
    "kv-msg-error",
    "kv-msg-warn"
  );

  dom.message.classList.add(
    kind === "warn"
      ? "kv-msg-warn"
      : "kv-msg-error"
  );
}


function clearMessage() {
  dom.message.hidden = true;

  dom.message.textContent = "";

  dom.message.classList.remove(
    "kv-msg-error",
    "kv-msg-warn"
  );
}


/* =========================
   RESET
   ========================= */

function resetAnalysis() {
  state.files = [];

  state.isAnalyzing = false;

  dom.fileInput.value = "";

  dom.previews.innerHTML = "";

  dom.selectedWrap.hidden = true;

  dom.analyzeBtn.disabled = true;

  dom.analyzeBtn.classList.remove(
    "is-loading"
  );

  dom.analyzeLabel.textContent =
    window.t(
      "detect.analyzeBtn",
      "Analyze Leaves"
    );

  clearMessage();

  dom.result.hidden = true;

  // Reset dynamic result content
  dom.confidenceFill.style.width =
    "0%";
}