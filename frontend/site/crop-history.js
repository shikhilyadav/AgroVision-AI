/* =========================================================
   KISANVISION - CROP RECOMMENDATION HISTORY
   ========================================================= */

const CROP_HISTORY_API_URL = "/crop-recommendation-history";


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const cropHistoryDOM = {
  grid: document.getElementById("cropHistoryGrid"),
  loading: document.getElementById("cropHistoryLoading"),
  empty: document.getElementById("cropHistoryEmpty"),
  message: document.getElementById("cropHistoryMessage"),
  refresh: document.getElementById("cropHistoryRefreshBtn"),
  loginBtn: document.getElementById("cropHistoryLoginBtn"),
};


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initializeCropHistoryPage();
});


function initializeCropHistoryPage() {

  updateCropHistoryAuthUI();

  if (cropHistoryDOM.refresh) {
    cropHistoryDOM.refresh.addEventListener(
      "click",
      loadCropRecommendationHistory
    );
  }

  loadCropRecommendationHistory();
}


/* =========================================================
   AUTH UI
   ========================================================= */

function updateCropHistoryAuthUI() {

  const token =
    localStorage.getItem("kisanVisionToken");

  const user =
    getStoredUser();


  if (!cropHistoryDOM.loginBtn) {
    return;
  }


  if (token && user) {

    cropHistoryDOM.loginBtn.style.display = "none";

  } else {

    cropHistoryDOM.loginBtn.style.display = "";
  }
}


/* =========================================================
   GET STORED USER
   ========================================================= */

function getStoredUser() {

  try {

    const storedUser =
      localStorage.getItem("kisanVisionUser");

    if (!storedUser) {
      return null;
    }

    return JSON.parse(storedUser);

  } catch (error) {

    console.error(
      "Unable to read stored user:",
      error
    );

    return null;
  }
}


/* =========================================================
   LOAD CROP RECOMMENDATION HISTORY
   ========================================================= */

async function loadCropRecommendationHistory() {

  const token =
    localStorage.getItem("kisanVisionToken");


  /* ---------------------------------------------------------
     LOGIN CHECK
     --------------------------------------------------------- */

  if (!token) {

    window.location.href = "login.html";

    return;
  }


  /* ---------------------------------------------------------
     SHOW LOADING
     --------------------------------------------------------- */

  if (cropHistoryDOM.loading) {
    cropHistoryDOM.loading.hidden = false;
  }

  if (cropHistoryDOM.empty) {
    cropHistoryDOM.empty.hidden = true;
  }

  if (cropHistoryDOM.message) {
    cropHistoryDOM.message.hidden = true;
    cropHistoryDOM.message.textContent = "";
  }

  if (cropHistoryDOM.grid) {
    cropHistoryDOM.grid.innerHTML = "";
  }


  /* ---------------------------------------------------------
     DISABLE REFRESH
     --------------------------------------------------------- */

  if (cropHistoryDOM.refresh) {

    cropHistoryDOM.refresh.disabled = true;

    cropHistoryDOM.refresh.textContent =
      "Loading...";
  }


  try {

    /* -------------------------------------------------------
       API REQUEST
       ------------------------------------------------------- */

    const response = await fetch(
      CROP_HISTORY_API_URL,
      {
        method: "GET",

        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );


    /* -------------------------------------------------------
       SESSION EXPIRED
       ------------------------------------------------------- */

    if (response.status === 401) {

      localStorage.removeItem(
        "kisanVisionToken"
      );

      localStorage.removeItem(
        "kisanVisionUser"
      );

      window.location.href =
        "login.html";

      return;
    }


    /* -------------------------------------------------------
       READ RESPONSE
       ------------------------------------------------------- */

    let data;

    try {

      data = await response.json();

    } catch (error) {

      throw new Error(
        "Invalid response received from server."
      );
    }


    /* -------------------------------------------------------
       API ERROR
       ------------------------------------------------------- */

    if (!response.ok) {

      throw new Error(
        data?.detail ||
        data?.message ||
        "Unable to load crop recommendation history."
      );
    }


    if (!data || data.success !== true) {

      throw new Error(
        data?.message ||
        "Unable to load crop recommendation history."
      );
    }


    /* -------------------------------------------------------
       HISTORY
       ------------------------------------------------------- */

    const history =
      Array.isArray(data.history)
        ? data.history
        : [];


    /* -------------------------------------------------------
       EMPTY HISTORY
       ------------------------------------------------------- */

    if (history.length === 0) {

      if (cropHistoryDOM.empty) {
        cropHistoryDOM.empty.hidden = false;
      }

      if (cropHistoryDOM.grid) {
        cropHistoryDOM.grid.innerHTML = "";
      }

      return;
    }


    /* -------------------------------------------------------
       RENDER HISTORY
       ------------------------------------------------------- */

    if (cropHistoryDOM.grid) {

      cropHistoryDOM.grid.innerHTML =
        history
          .map(createCropHistoryCard)
          .join("");
    }


  } catch (error) {

    console.error(
      "Crop recommendation history error:",
      error
    );


    if (cropHistoryDOM.message) {

      cropHistoryDOM.message.textContent =
        error.message ||
        "Unable to load crop recommendation history.";

      cropHistoryDOM.message.hidden = false;
    }


  } finally {

    /* -------------------------------------------------------
       HIDE LOADING
       ------------------------------------------------------- */

    if (cropHistoryDOM.loading) {
      cropHistoryDOM.loading.hidden = true;
    }


    /* -------------------------------------------------------
       ENABLE REFRESH
       ------------------------------------------------------- */

    if (cropHistoryDOM.refresh) {

      cropHistoryDOM.refresh.disabled = false;

      cropHistoryDOM.refresh.textContent =
        "↻ Refresh";
    }
  }
}


/* =========================================================
   CREATE HISTORY CARD
   ========================================================= */

function createCropHistoryCard(record) {

  const inputs =
    record?.inputs || {};

  const result =
    record?.recommendation_result || {};

  const bestMatch =
    result?.best_match || {};

  const recommendations =
    Array.isArray(result?.recommendations)
      ? result.recommendations
      : [];


  const crop =
    bestMatch?.crop ||
    bestMatch?.name ||
    "No crop available";


  const score =
    normalizeScore(
      bestMatch?.score
    );


  const date =
    formatDate(
      record?.created_at
    );


  const icon =
    getCropIcon(crop);


  return `
    <article class="crop-history-card">

      <!-- =================================================
           CARD HEADER
           ================================================= -->

      <div class="crop-history-card__header">

        <div class="crop-history-card__best">

          <div class="crop-history-card__icon">
            ${icon}
          </div>

          <div>

            <p class="crop-history-card__eyebrow">
              BEST RECOMMENDATION
            </p>

            <h3 class="crop-history-card__crop">
              ${escapeHTML(
                formatName(crop)
              )}
            </h3>

          </div>

        </div>


        <p class="crop-history-card__date">
          ${escapeHTML(date)}
        </p>

      </div>


      <!-- =================================================
           SCORE
           ================================================= -->

      <div class="crop-history-score">

        <div class="crop-history-score__top">

          <span class="crop-history-score__label">
            Suitability Score
          </span>

          <strong class="crop-history-score__value">
            ${score.toFixed(2)}%
          </strong>

        </div>


        <div class="crop-history-score__bar">

          <div
            class="crop-history-score__fill"
            style="width: ${score}%"
          ></div>

        </div>

      </div>


      <!-- =================================================
           FARM INPUTS
           ================================================= -->

      <div class="crop-history-inputs">

        <p class="crop-history-inputs__title">
          Farm Conditions
        </p>


        <div class="crop-history-input-grid">


          ${createInputItem(
            "State",
            inputs.state
          )}


          ${createInputItem(
            "District",
            inputs.district
          )}


          ${createInputItem(
            "Season",
            inputs.season
          )}


          ${createInputItem(
            "Soil Type",
            inputs.soil_type
          )}


          ${createInputItem(
            "Water",
            inputs.water_availability
          )}


          ${createInputItem(
            "Temperature",
            inputs.temperature !== undefined &&
            inputs.temperature !== null &&
            inputs.temperature !== ""
              ? `${inputs.temperature} °C`
              : null
          )}


          ${createInputItem(
            "Rainfall",
            inputs.rainfall
          )}

        </div>

      </div>


      <!-- =================================================
           RECOMMENDATIONS
           ================================================= -->

      ${
        recommendations.length > 0
          ? createRecommendationsSection(
              recommendations
            )
          : ""
      }


      <!-- =================================================
           EVIDENCE / MESSAGE
           ================================================= -->

      ${createEvidenceSection(result)}

    </article>
  `;
}


/* =========================================================
   INPUT ITEM
   ========================================================= */

function createInputItem(label, value) {

  return `
    <div class="crop-history-input">

      <span class="crop-history-input__label">
        ${escapeHTML(label)}
      </span>

      <span class="crop-history-input__value">
        ${escapeHTML(
          value !== undefined &&
          value !== null &&
          value !== ""
            ? formatName(value)
            : "Not provided"
        )}
      </span>

    </div>
  `;
}


/* =========================================================
   RECOMMENDATIONS SECTION
   ========================================================= */

function createRecommendationsSection(
  recommendations
) {

  return `
    <div class="crop-history-recommendations">

      <p class="crop-history-recommendations__title">
        Top Recommended Crops
      </p>

      <div class="crop-history-recommendations-list">

        ${recommendations
          .slice(0, 5)
          .map((item) => {

            const name =
              item?.crop ||
              item?.name ||
              "Unknown Crop";

            const score =
              normalizeScore(
                item?.score
              );


            return `
              <div
                class="crop-history-recommendation"
              >

                <span
                  class="crop-history-recommendation__name"
                >
                  ${escapeHTML(
                    formatName(name)
                  )}
                </span>

                <span
                  class="crop-history-recommendation__score"
                >
                  ${score.toFixed(2)}%
                </span>

              </div>
            `;

          })
          .join("")}

      </div>

    </div>
  `;
}


/* =========================================================
   EVIDENCE SECTION
   ========================================================= */

function createEvidenceSection(result) {

  const message =
    result?.message ||
    result?.evidence_summary?.description ||
    result?.evidence_summary?.message ||
    "";


  if (!message) {
    return "";
  }


  return `
    <div class="crop-history-evidence">

      <p class="crop-history-evidence__title">
        Recommendation Note
      </p>

      <p class="crop-history-evidence__text">
        ${escapeHTML(message)}
      </p>

    </div>
  `;
}


/* =========================================================
   CROP ICON
   ========================================================= */

function getCropIcon(crop) {

  const normalized =
    String(crop)
      .toLowerCase()
      .replace(/[\s_-]+/g, "");


  const icons = {

    apple: "🍎",

    banana: "🍌",

    barley: "🌾",

    cabbage: "🥬",

    cauliflower: "🥦",

    chickpea: "🫘",

    corn: "🌽",

    cotton: "🌿",

    cucumber: "🥒",

    grape: "🍇",

    lemon: "🍋",

    maize: "🌽",

    mango: "🥭",

    millet: "🌾",

    onion: "🧅",

    orange: "🍊",

    pea: "🫛",

    potato: "🥔",

    rice: "🌾",

    soybean: "🫘",

    soyabean: "🫘",

    sugarcane: "🎋",

    tomato: "🍅",

    wheat: "🌾",

  };


  for (const key in icons) {

    if (normalized.includes(key)) {
      return icons[key];
    }
  }


  return "🌱";
}


/* =========================================================
   FORMAT NAME
   ========================================================= */

function formatName(value) {

  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return "Not provided";
  }


  return String(value)
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}


/* =========================================================
   NORMALIZE SCORE
   ========================================================= */

function normalizeScore(value) {

  let score =
    Number(value);


  if (!Number.isFinite(score)) {
    return 0;
  }


  if (score >= 0 && score <= 1) {
    score = score * 100;
  }


  return Math.max(
    0,
    Math.min(100, score)
  );
}


/* =========================================================
   FORMAT DATE
   ========================================================= */

function formatDate(value) {

  if (!value) {
    return "Date unavailable";
  }


  const date =
    new Date(value);


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "Date unavailable";
  }


  return date.toLocaleString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }
  );
}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(value) {

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}