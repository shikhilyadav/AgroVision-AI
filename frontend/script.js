// ============================================================
// AGROVISION AI
// Frontend JavaScript
// ============================================================


// ============================================================
// CONFIGURATION
// ============================================================

const API_URL = "https://agrovision-ai-1-x94a.onrender.com/predict";


// ============================================================
// GET HTML ELEMENTS
// ============================================================

const fileInput =
    document.getElementById("fileInput");

const uploadArea =
    document.getElementById("uploadArea");

const previewContainer =
    document.getElementById("previewContainer");

const previewImage =
    document.getElementById("previewImage");

const removeImageBtn =
    document.getElementById("removeImageBtn");

const analyzeBtn =
    document.getElementById("analyzeBtn");

const loading =
    document.getElementById("loading");

const result =
    document.getElementById("result");

const errorBox =
    document.getElementById("error");

const languageSelect =
    document.getElementById("languageSelect");
const translations = {

    en: {
        tagline: "Smart Crop Disease Detection",
        badge: "🤖 AI-Powered Agriculture",
        detect: "🔍 Detect Crop Disease",
        detectSub: "Upload a leaf image to start AI analysis",
        upload: "Upload Leaf Image",
        uploadText: "Drag & drop your image here or choose a file",
        choose: "Choose Image",
        selected: "Selected Image",
        remove: "✕ Remove Image",
        analyze: "🔬 Analyze Leaf",
        analyzing: "AI is analyzing your leaf...",
        wait: "Please wait a moment",
        complete: "AI ANALYSIS COMPLETE",
        result: "🌱 Detection Result",
        crop: "CROP",
        disease: "DISEASE / CONDITION",
        confidence: "AI CONFIDENCE",
        about: "About the Condition",
        symptoms: "Symptoms",
        management: "Recommended Management",
        treatment: "Treatment Guidance",
        alternatives: "📊 Alternative Predictions",
        alternativesSub: "Other possibilities considered by the AI model",
        important: "⚠️ Important:",
        footer: "AI-powered crop disease detection and management support"
    },

    hi: {
        tagline: "स्मार्ट फसल रोग पहचान",
        badge: "🤖 कृत्रिम बुद्धिमत्ता आधारित कृषि",
        detect: "🔍 फसल की बीमारी पहचानें",
        detectSub: "AI विश्लेषण शुरू करने के लिए पत्ते की तस्वीर अपलोड करें",
        upload: "पत्ते की तस्वीर अपलोड करें",
        uploadText: "तस्वीर यहाँ खींचकर छोड़ें या फ़ाइल चुनें",
        choose: "तस्वीर चुनें",
        selected: "चुनी गई तस्वीर",
        remove: "✕ तस्वीर हटाएँ",
        analyze: "🔬 पत्ते की जाँच करें",
        analyzing: "AI आपके पत्ते की जाँच कर रहा है...",
        wait: "कृपया कुछ क्षण प्रतीक्षा करें",
        complete: "AI विश्लेषण पूरा हुआ",
        result: "🌱 पहचान का परिणाम",
        crop: "फसल",
        disease: "बीमारी / स्थिति",
        confidence: "AI का भरोसा स्तर",
        about: "बीमारी के बारे में",
        symptoms: "लक्षण",
        management: "अनुशंसित प्रबंधन",
        treatment: "उपचार संबंधी जानकारी",
        alternatives: "📊 अन्य संभावित परिणाम",
        alternativesSub: "AI मॉडल द्वारा विचार की गई अन्य संभावनाएँ",
        important: "⚠️ महत्वपूर्ण:",
        footer: "AI आधारित फसल रोग पहचान और प्रबंधन सहायता"
    }

};
window.changeLanguage = function (language) {

    const t = translations[language];

    if (!t) return;

    document.querySelector(".tagline").textContent =
        t.tagline;

    document.querySelector(".hero-badge").textContent =
        t.badge;

    document.querySelector(".section-heading h2").textContent =
        t.detect;

    document.querySelector(".section-heading p").textContent =
        t.detectSub;

    document.querySelector("#uploadArea h3").textContent =
        t.upload;

    document.querySelector("#uploadArea p").textContent =
        t.uploadText;

    document.querySelector(".choose-btn").textContent =
        t.choose;

    document.querySelector("#previewContainer h3").textContent =
        t.selected;

    document.querySelector("#removeImageBtn").textContent =
        t.remove;

    document.querySelector("#analyzeBtn").textContent =
        t.analyze;

    document.querySelector("#loading strong").textContent =
        t.analyzing;

    document.querySelector("#loading span").textContent =
        t.wait;

    document.querySelector(".result-badge").textContent =
        t.complete;

    document.querySelector(".result-header h2").textContent =
        t.result;

    document.querySelectorAll(".result-label")[0].textContent =
        t.crop;

    document.querySelectorAll(".result-label")[1].textContent =
        t.disease;

    document.querySelectorAll(".result-label")[2].textContent =
        t.confidence;

    document.querySelectorAll(".info-card h3")[0].textContent =
        t.about;

    document.querySelectorAll(".info-card h3")[1].textContent =
        t.symptoms;

    document.querySelectorAll(".info-card h3")[2].textContent =
        t.management;

    document.querySelectorAll(".info-card h3")[3].textContent =
        t.treatment;

    document.querySelector(".top-predictions h3").textContent =
        t.alternatives;

    document.querySelector(".top-predictions .sub-text").textContent =
        t.alternativesSub;

    document.querySelector(".disclaimer strong").textContent =
        t.important;

    document.querySelector(".footer p").textContent =
        t.footer;
}




// Result elements

const cropResult =
    document.getElementById("cropResult");

const diseaseResult =
    document.getElementById("diseaseResult");

const confidenceResult =
    document.getElementById("confidenceResult");

const descriptionResult =
    document.getElementById("descriptionResult");

const symptomsResult =
    document.getElementById("symptomsResult");

const managementResult =
    document.getElementById("managementResult");

const treatmentResult =
    document.getElementById("treatmentResult");

const topPredictions =
    document.getElementById("topPredictions");

const confidenceMessage =
    document.getElementById("confidenceMessage");


// ============================================================
// VARIABLES
// ============================================================

let selectedFile = null;

let previewURL = null;


// ============================================================
// FILE SELECTION
// ============================================================

fileInput.addEventListener(
    "change",
    function () {

        const file = this.files[0];

        if (!file) {
            return;
        }

        handleFile(file);
    }
);


// ============================================================
// HANDLE FILE
// ============================================================

function handleFile(file) {

    // Validate file type

    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp"
    ];

    if (!allowedTypes.includes(file.type)) {

        showError(
            "Please select a JPG, PNG or WEBP image."
        );

        return;
    }


    // Store selected file

    selectedFile = file;


    // Create preview URL

    if (previewURL) {

        URL.revokeObjectURL(
            previewURL
        );
    }

    previewURL =
        URL.createObjectURL(file);


    previewImage.src =
        previewURL;


    // Show preview

    previewContainer.style.display =
        "block";


    // Enable analyze button

    analyzeBtn.disabled =
        false;


    // Hide old results

    result.style.display =
        "none";


    // Hide error

    errorBox.style.display =
        "none";


    // Scroll to preview

    previewContainer.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


// ============================================================
// REMOVE IMAGE
// ============================================================

removeImageBtn.addEventListener(
    "click",
    function () {

        selectedFile = null;

        fileInput.value = "";


        if (previewURL) {

            URL.revokeObjectURL(
                previewURL
            );

            previewURL = null;
        }


        previewImage.src = "";

        previewContainer.style.display =
            "none";

        analyzeBtn.disabled =
            true;

        result.style.display =
            "none";

        errorBox.style.display =
            "none";
    }
);


// ============================================================
// ANALYZE BUTTON
// ============================================================

analyzeBtn.addEventListener(
    "click",
    analyzeLeaf
);


// ============================================================
// ANALYZE LEAF
// ============================================================

async function analyzeLeaf() {

    if (!selectedFile) {

        showError(
            "Please select a leaf image first."
        );

        return;
    }


    // Clear previous error

    errorBox.style.display =
        "none";


    // Show loading

    loading.style.display =
        "flex";


    // Disable button

    analyzeBtn.disabled =
        true;


    // Hide previous result

    result.style.display =
        "none";


    try {

        // ==================================================
        // CREATE FORM DATA
        // ==================================================

        const formData =
            new FormData();

        formData.append(
            "file",
            selectedFile
        );


        // ==================================================
        // SEND REQUEST TO FASTAPI
        // ==================================================

        const response =
            await fetch(
                API_URL,
                {
                    method: "POST",
                    body: formData
                }
            );


        // ==================================================
        // READ RESPONSE
        // ==================================================

        const data =
            await response.json();


        // ==================================================
        // HANDLE API ERROR
        // ==================================================

        if (!response.ok) {

            throw new Error(
                data.detail ||
                "The AI analysis failed."
            );
        }


        // ==================================================
        // CHECK SUCCESS
        // ==================================================

        if (!data.success) {

            throw new Error(
                "The AI could not complete the analysis."
            );
        }


        // ==================================================
        // DISPLAY RESULT
        // ==================================================

        displayResult(data);


    }

    catch (error) {

        console.error(
            "Prediction error:",
            error
        );


        showError(
            error.message ||
            "Unable to connect to AgroVision AI."
        );

    }

    finally {

        // Hide loading

        loading.style.display =
            "none";


        // Enable button

        analyzeBtn.disabled =
            false;
    }
}


// ============================================================
// DISPLAY RESULT
// ============================================================

function displayResult(data) {

    const prediction =
        data.prediction;


    const information =
        data.disease_information;


    // ========================================================
    // MAIN PREDICTION
    // ========================================================

    cropResult.textContent =
        prediction.crop;


    diseaseResult.textContent =
        prediction.disease;


    confidenceResult.textContent =
        prediction.confidence + "%";


    // ========================================================
    // DESCRIPTION
    // ========================================================

    descriptionResult.textContent =
        information.description ||
        "No description is currently available.";
    

    // ========================================================
    // SYMPTOMS
    // ========================================================

    renderList(
        symptomsResult,
        information.symptoms,
        "No symptom information available."
    );


    // ========================================================
    // MANAGEMENT
    // ========================================================

    renderList(
        managementResult,
        information.management,
        "No management information available."
    );


    // ========================================================
    // TREATMENT
    // ========================================================

    treatmentResult.textContent =
        information.treatment_note ||
        "Please consult a qualified agricultural expert for current treatment guidance.";


    // ========================================================
    // TOP 3 PREDICTIONS
    // ========================================================

    renderTopPredictions(
        data.top_predictions
    );


    // ========================================================
    // CONFIDENCE MESSAGE
    // ========================================================

    renderConfidenceMessage(
        prediction.confidence_level,
        prediction.confidence
    );


    // ========================================================
    // SHOW RESULT
    // ========================================================

    result.style.display =
        "block";


    // ========================================================
    // SCROLL TO RESULT
    // ========================================================

    setTimeout(
        function () {

            result.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        },
        100
    );
}


// ============================================================
// RENDER LIST
// ============================================================

function renderList(
    element,
    items,
    emptyMessage
) {

    // Clear old content

    element.innerHTML = "";


    // Check if list exists

    if (
        !Array.isArray(items) ||
        items.length === 0
    ) {

        const li =
            document.createElement("li");

        li.textContent =
            emptyMessage;

        element.appendChild(li);

        return;
    }


    // Add items

    items.forEach(
        function (item) {

            const li =
                document.createElement("li");

            li.textContent =
                item;

            element.appendChild(li);
        }
    );
}


// ============================================================
// RENDER TOP PREDICTIONS
// ============================================================

function renderTopPredictions(
    predictions
) {

    topPredictions.innerHTML =
        "";


    if (
        !Array.isArray(predictions) ||
        predictions.length === 0
    ) {

        topPredictions.textContent =
            "No alternative predictions available.";

        return;
    }


    predictions.forEach(
        function (item, index) {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "prediction-item";


            const label =
                document.createElement(
                    "span"
                );


            label.textContent =
                `${index + 1}. ${item.crop} - ${item.disease}`;


            const confidence =
                document.createElement(
                    "strong"
                );


            confidence.textContent =
                `${item.confidence}%`;


            div.appendChild(
                label
            );


            div.appendChild(
                confidence
            );


            topPredictions.appendChild(
                div
            );
        }
    );
}


// ============================================================
// CONFIDENCE MESSAGE
// ============================================================
function renderConfidenceMessage(
    level,
    confidence
) {

    confidenceMessage.className = "";

    if (level === "high") {

        confidenceMessage.className =
            "success-message";

        confidenceMessage.innerHTML =
            `
            <strong>🟢 High Confidence</strong><br>
            The AI is reasonably confident in this prediction
            (${confidence}%).
            `;

    }

    else if (level === "medium") {

        confidenceMessage.className =
            "warning";

        confidenceMessage.innerHTML =
            `
            <strong>🟡 Moderate Confidence</strong><br>
            The AI has moderate confidence in this prediction
            (${confidence}%).
            <br><br>
            For a more reliable result, upload a clear,
            well-lit image showing the complete leaf.
            `;

    }

    else {

        confidenceMessage.className =
            "warning";

        confidenceMessage.innerHTML =
            `
            <strong>🔴 Low Confidence</strong><br>
            The AI has low confidence in this prediction
            (${confidence}%).
            <br><br>
            Please upload a clear, well-lit image showing
            the complete leaf for a more reliable result.
            `;
    }
}
document.addEventListener("DOMContentLoaded", function () {

    const languageSelect =
        document.getElementById("languageSelect");

    if (!languageSelect) {
        console.error("Language selector not found!");
        return;
    }

    languageSelect.addEventListener(
        "change",
        function () {
            changeLanguage(this.value);
        }
    );

    changeLanguage(languageSelect.value);

    console.log("Language system loaded successfully");
});
console.log("SCRIPT JS LOADED");
