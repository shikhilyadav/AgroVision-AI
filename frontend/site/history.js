/* =========================================================
   KISAN VISION — COMBINED HISTORY
   Crop Recommendation + Disease Detection
   ========================================================= */

const CROP_HISTORY_API = API_BASE_URL + "/crop-recommendation-history";
const DISEASE_HISTORY_API = API_BASE_URL + "/disease-history";


/* =========================================================
   DOM
   ========================================================= */

const historyDOM = {
  cropGrid: document.getElementById("cropHistoryGrid"),
  diseaseGrid: document.getElementById("diseaseHistoryGrid"),

  loading: document.getElementById("historyLoading"),
  empty: document.getElementById("historyEmpty"),

  message: document.getElementById("historyMessage"),

  refresh: document.getElementById("historyRefreshBtn"),

  loginBtn: document.getElementById("historyLoginBtn"),
};


/* =========================================================
   START
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  updateLoginButton();

  if (historyDOM.refresh) {
    historyDOM.refresh.addEventListener(
      "click",
      loadAllHistory
    );
  }

  loadAllHistory();

});


/* =========================================================
   LOGIN BUTTON
   ========================================================= */

function updateLoginButton() {

  const token =
    localStorage.getItem("kisanVisionToken");

  if (!historyDOM.loginBtn) {
    return;
  }

  if (token) {
    historyDOM.loginBtn.style.display = "none";
  } else {
    historyDOM.loginBtn.style.display = "";
  }

}


/* =========================================================
   LOAD BOTH HISTORIES
   ========================================================= */

async function loadAllHistory() {

  const token =
    localStorage.getItem("kisanVisionToken");


  /* -------------------------------------------------------
     LOGIN REQUIRED
     ------------------------------------------------------- */

  if (!token) {

    window.location.href = "login.html";

    return;
  }


  /* -------------------------------------------------------
     LOADING
     ------------------------------------------------------- */

  showLoading();

  clearMessage();


  if (historyDOM.cropGrid) {
    historyDOM.cropGrid.innerHTML = "";
  }

  if (historyDOM.diseaseGrid) {
    historyDOM.diseaseGrid.innerHTML = "";
  }


  if (historyDOM.refresh) {

    historyDOM.refresh.disabled = true;

    historyDOM.refresh.textContent =
      "Loading...";

  }


  try {

    /* -----------------------------------------------------
       FETCH BOTH APIs
       ----------------------------------------------------- */

    const [cropResponse, diseaseResponse] =
      await Promise.all([

        fetch(
          CROP_HISTORY_API,
          {
            method: "GET",
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        ),

        fetch(
          DISEASE_HISTORY_API,
          {
            method: "GET",
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        )

      ]);


    /* -----------------------------------------------------
       SESSION EXPIRED
       ----------------------------------------------------- */

    if (
      cropResponse.status === 401 ||
      diseaseResponse.status === 401
    ) {

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


    /* -----------------------------------------------------
       READ JSON
       ----------------------------------------------------- */

    const cropData =
      await cropResponse.json();

    const diseaseData =
      await diseaseResponse.json();


    /* -----------------------------------------------------
       CHECK RESPONSES
       ----------------------------------------------------- */

    if (!cropResponse.ok) {

      throw new Error(
        cropData?.detail ||
        cropData?.message ||
        "Unable to load crop recommendation history."
      );

    }


    if (!diseaseResponse.ok) {

      throw new Error(
        diseaseData?.detail ||
        diseaseData?.message ||
        "Unable to load disease detection history."
      );

    }


    /* -----------------------------------------------------
       EXTRACT HISTORY
       ----------------------------------------------------- */

    const cropHistory =
      Array.isArray(cropData?.history)
        ? cropData.history
        : [];


    const diseaseHistory =
      Array.isArray(diseaseData?.history)
        ? diseaseData.history
        : [];


    /* -----------------------------------------------------
       RENDER CROP HISTORY
       ----------------------------------------------------- */

    renderCropHistory(
      cropHistory
    );


    /* -----------------------------------------------------
       RENDER DISEASE HISTORY
       ----------------------------------------------------- */

    renderDiseaseHistory(
      diseaseHistory
    );


    /* -----------------------------------------------------
       EMPTY CHECK
       ----------------------------------------------------- */

    if (
      cropHistory.length === 0 &&
      diseaseHistory.length === 0
    ) {

      if (historyDOM.empty) {
        historyDOM.empty.hidden = false;
      }

    }


  } catch (error) {

    console.error(
      "History loading error:",
      error
    );


    showMessage(
      error.message ||
      "Unable to load your history. Please try again."
    );


  } finally {

    hideLoading();


    if (historyDOM.refresh) {

      historyDOM.refresh.disabled = false;

      historyDOM.refresh.textContent =
        "↻ Refresh";

    }

  }

}


/* =========================================================
   RENDER CROP HISTORY
   ========================================================= */

function renderCropHistory(history) {

  if (!historyDOM.cropGrid) {
    return;
  }


  if (history.length === 0) {

    historyDOM.cropGrid.innerHTML = `
      <div class="history-section-empty">
        No crop recommendations yet.
      </div>
    `;

    return;
  }


  historyDOM.cropGrid.innerHTML =
    history
      .map(createCropCard)
      .join("");

}


/* =========================================================
   CROP CARD
   ========================================================= */

function createCropCard(record) {

  const inputs =
    record?.inputs || {};

  const result =
    record?.recommendation_result || {};

  const best =
    result?.best_match || {};


  const crop =
    best?.crop ||
    best?.name ||
    "Unknown Crop";


  const score =
    normalizeScore(
      best?.score
    );


  const date =
    formatDate(
      record?.created_at
    );


  const recommendations =
    Array.isArray(
      result?.recommendations
    )
      ? result.recommendations
      : [];


  return `
    <article class="history-card">

      <div class="history-card-header">

        <div class="history-card-title-wrap">

          <div class="history-card-icon">
            ${getCropIcon(crop)}
          </div>

          <div>

            <p class="history-card-label">
              BEST RECOMMENDATION
            </p>

            <h4 class="history-card-title">
              ${escapeHTML(
                formatName(crop)
              )}
            </h4>

          </div>

        </div>

        <p class="history-card-date">
          ${escapeHTML(date)}
        </p>

      </div>


      <div class="history-card-body">

        <!-- SCORE -->

        <div class="history-disease-result">

          <div class="history-disease-result-top">

            <p class="history-disease-name">
              Suitability Score
            </p>

            <span class="history-confidence">
              ${score.toFixed(2)}%
            </span>

          </div>

          <div class="history-confidence-bar">

            <div
              class="history-confidence-fill"
              style="width: ${score}%"
            ></div>

          </div>

        </div>


        <!-- INPUTS -->

        <div class="history-info-grid">

          ${infoItem(
            "State",
            inputs.state
          )}

          ${infoItem(
            "District",
            inputs.district
          )}

          ${infoItem(
            "Season",
            inputs.season
          )}

          ${infoItem(
            "Soil Type",
            inputs.soil_type
          )}

          ${infoItem(
            "Water",
            inputs.water_availability
          )}

          ${infoItem(
            "Temperature",
            inputs.temperature !== undefined &&
            inputs.temperature !== null &&
            inputs.temperature !== ""
              ? `${inputs.temperature} °C`
              : null
          )}

          ${infoItem(
            "Rainfall",
            inputs.rainfall
          )}

        </div>


        <!-- TOP RECOMMENDATIONS -->

        ${
          recommendations.length > 0
            ? `
              <div class="history-top-predictions">

                <p class="history-top-predictions-title">
                  Top Recommended Crops
                </p>

                ${recommendations
                  .slice(0, 5)
                  .map(item => {

                    const name =
                      item?.crop ||
                      item?.name ||
                      "Unknown";

                    const itemScore =
                      normalizeScore(
                        item?.score
                      );

                    return `
                      <div class="history-prediction-row">

                        <span>
                          ${escapeHTML(
                            formatName(name)
                          )}
                        </span>

                        <span class="history-prediction-score">
                          ${itemScore.toFixed(2)}%
                        </span>

                      </div>
                    `;

                  })
                  .join("")}

              </div>
            `
            : ""
        }


        <div class="history-card-footer">

          <span class="history-file-count">
            Crop recommendation
          </span>

          <span class="history-result-tag">
            Saved Result
          </span>

        </div>

      </div>

    </article>
  `;

}


/* =========================================================
   RENDER DISEASE HISTORY
   ========================================================= */

function renderDiseaseHistory(history) {

  if (!historyDOM.diseaseGrid) {
    return;
  }


  if (history.length === 0) {

    historyDOM.diseaseGrid.innerHTML = `
      <div class="history-section-empty">
        No disease detection results yet.
      </div>
    `;

    return;
  }


  historyDOM.diseaseGrid.innerHTML =
    history
      .map(createDiseaseCard)
      .join("");

}


/* =========================================================
   DISEASE CARD
   ========================================================= */

function createDiseaseCard(record) {

  const crop =
    record?.crop || "Unknown Crop";

  const disease =
    record?.disease || "Unknown Condition";

  const confidence =
    normalizeScore(record?.confidence);

  const date =
    formatDate(record?.created_at);

  const filenames =
    Array.isArray(record?.filenames)
      ? record.filenames
      : [];

  const imagesAnalyzed =
    record?.images_analyzed ??
    filenames.length ??
    0;

  const topPredictions =
    Array.isArray(record?.top_predictions)
      ? record.top_predictions
      : [];


  return `
    <article class="history-card">

      <div class="history-card-header">

        <div class="history-card-title-wrap">

          <div class="history-card-icon">
            🌿
          </div>

          <div>

            <p class="history-card-label">
              DISEASE DETECTION
            </p>

            <h4 class="history-card-title">
              ${escapeHTML(formatName(crop))}
            </h4>

          </div>

        </div>

        <p class="history-card-date">
          ${escapeHTML(date)}
        </p>

      </div>


      <div class="history-card-body">

        <div class="history-disease-result">

          <div class="history-disease-result-top">

            <p class="history-disease-name">
              ${escapeHTML(formatName(disease))}
            </p>

            <span class="history-confidence">
              ${confidence.toFixed(2)}%
            </span>

          </div>


          <div class="history-confidence-bar">

            <div
              class="history-confidence-fill"
              style="width: ${confidence}%"
            ></div>

          </div>

        </div>


        <div class="history-info-grid">

          ${infoItem(
            "Crop",
            crop
          )}

          ${infoItem(
            "Confidence Level",
            record?.confidence_level
              ? formatName(record.confidence_level)
              : "Not provided"
          )}

          ${infoItem(
            "Images Analyzed",
            imagesAnalyzed
          )}

        </div>


        ${
          topPredictions.length > 0
            ? `
              <div class="history-top-predictions">

                <p class="history-top-predictions-title">
                  Top Predictions
                </p>

                ${topPredictions
                  .slice(0, 3)
                  .map(item => {

                    const predictionCrop =
                      item?.crop || "";

                    const predictionDisease =
                      item?.disease ||
                      "Unknown";

                    const predictionConfidence =
                      normalizeScore(
                        item?.confidence
                      );

                    return `
                      <div class="history-prediction-row">

                        <span>
                          ${escapeHTML(
                            formatName(
                              predictionCrop
                            )
                          )}
                          — 
                          ${escapeHTML(
                            formatName(
                              predictionDisease
                            )
                          )}
                        </span>

                        <span class="history-prediction-score">
                          ${predictionConfidence.toFixed(2)}%
                        </span>

                      </div>
                    `;

                  })
                  .join("")}

              </div>
            `
            : ""
        }


        <div class="history-card-footer">

          <span class="history-file-count">
            ${
              imagesAnalyzed > 0
                ? `${imagesAnalyzed} image(s) analyzed`
                : "Image analyzed"
            }
          </span>

          <span class="history-result-tag">
            AI Result
          </span>

        </div>

      </div>

    </article>
  `;
}

/* =========================================================
   INFO ITEM
   ========================================================= */

function infoItem(label, value) {

  const displayValue =
    value !== undefined &&
    value !== null &&
    value !== ""
      ? formatName(value)
      : "Not provided";


  return `
    <div class="history-info-item">

      <span class="history-info-label">
        ${escapeHTML(label)}
      </span>

      <span class="history-info-value">
        ${escapeHTML(displayValue)}
      </span>

    </div>
  `;

}


/* =========================================================
   CROP ICON
   ========================================================= */

function getCropIcon(crop) {

  const value =
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
    maize: "🌽",
    cotton: "🌿",
    cucumber: "🥒",
    grape: "🍇",
    lemon: "🍋",
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
    wheat: "🌾"
  };


  for (const key in icons) {

    if (value.includes(key)) {
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
    .replace(/\b\w/g, letter =>
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
    score *= 100;
  }


  return Math.max(
    0,
    Math.min(100, score)
  );

}


/* =========================================================
   DATE
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
      hour12: true
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


/* =========================================================
   LOADING
   ========================================================= */

function showLoading() {

  if (historyDOM.loading) {
    historyDOM.loading.hidden = false;
  }

  if (historyDOM.empty) {
    historyDOM.empty.hidden = true;
  }

}


function hideLoading() {

  if (historyDOM.loading) {
    historyDOM.loading.hidden = true;
  }

}


/* =========================================================
   MESSAGE
   ========================================================= */

function showMessage(message) {

  if (!historyDOM.message) {
    return;
  }

  historyDOM.message.textContent =
    message;

  historyDOM.message.hidden =
    false;

}


function clearMessage() {

  if (!historyDOM.message) {
    return;
  }

  historyDOM.message.textContent =
    "";

  historyDOM.message.hidden =
    true;

}
