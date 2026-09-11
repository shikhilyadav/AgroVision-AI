// =====================================================
// AgroVision AI - Frontend JavaScript
// Disease Detection + Crop Recommendation
// =====================================================


// =====================================================
// BACKEND API
// =====================================================

const API_URL = "http://127.0.0.1:8000/predict";
const RECOMMEND_API_URL = "http://127.0.0.1:8000/recommend-crops";
const DISTRICT_API_URL = "http://127.0.0.1:8000/districts";


// =====================================================
// CONSTANTS
// =====================================================

const MAX_IMAGES = 3;


// =====================================================
// DOM ELEMENTS
// =====================================================

// Disease detection elements

const fileInput =
    document.getElementById("fileInput");

const uploadArea =
    document.getElementById("uploadArea");

const previewContainer =
    document.getElementById("previewContainer");

const previewImage =
    document.getElementById("previewImage");

const multiPreviewGrid =
    document.getElementById("multiPreviewGrid");

const addMoreBtn =
    document.getElementById("addMoreBtn");

const removeImageBtn =
    document.getElementById("removeImageBtn");

const analyzeBtn =
    document.getElementById("analyzeBtn");

const loading =
    document.getElementById("loading");

const errorBox =
    document.getElementById("error");

const result =
    document.getElementById("result");

const languageSelect =
    document.getElementById("languageSelect");


// Disease result elements

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


// Crop recommendation elements

const stateInput =
    document.getElementById("stateInput");

const districtInput =
    document.getElementById("districtInput");

const seasonInput =
    document.getElementById("seasonInput");

const soilInput =
    document.getElementById("soilInput");

const waterInput =
    document.getElementById("waterInput");

const temperatureInput =
    document.getElementById("temperatureInput");

const rainfallInput =
    document.getElementById("rainfallInput");

const recommendCropBtn =
    document.getElementById("recommendCropBtn");

const recommendLoading =
    document.getElementById("recommendLoading");

const recommendError =
    document.getElementById("recommendError");

const recommendResult =
    document.getElementById("recommendResult");

const bestCropName =
    document.getElementById("bestCropName");

const bestCropSuitability =
    document.getElementById("bestCropSuitability");

const bestCropScore =
    document.getElementById("bestCropScore");

const cropRecommendationsList =
    document.getElementById("cropRecommendationsList");

const cropDetails =
    document.getElementById("cropDetails");

const cropOverviewResult =
    document.getElementById("cropOverviewResult");

const cropDurationResult =
    document.getElementById("cropDurationResult");

const cropSowingResult =
    document.getElementById("cropSowingResult");

const cropManagementResult =
    document.getElementById("cropManagementResult");

const cropRecommendationMessage =
    document.getElementById("cropRecommendationMessage");


// =====================================================
// STATE
// =====================================================

// =====================================================
// STATE
// =====================================================

let selectedFiles = [];

let previewURLs = [];

let currentLanguage = "en";


// =====================================================
// STATE -> DISTRICT
// =====================================================

async function loadStates() {
    if (!stateInput) {
        return;
    }

    try {
        const response = await fetch(
            `${API_URL.replace("/predict", "")}/states`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.detail || "Could not load states."
            );
        }

        stateInput.innerHTML = `
            <option value="">Select State</option>
        `;

        data.states.forEach(function (state) {
            const option =
                document.createElement("option");

            option.value = state.Name;
            option.textContent = state.Name;

            stateInput.appendChild(option);
        });

    } catch (error) {
        console.error(
            "State loading error:",
            error
        );

        stateInput.innerHTML = `
            <option value="">
                Unable to load states
            </option>
        `;
    }
}

loadStates(); 

async function loadDistricts() {

    if (!stateInput || !districtInput) {
        return;
    }

    const state = stateInput.value.trim();

    districtInput.innerHTML = `
        <option value="">Select District</option>
    `;

    districtInput.disabled = true;

    if (!state) {
        return;
    }

    districtInput.innerHTML = `
        <option value="">Loading districts...</option>
    `;

    try {

        const encodedState =
            encodeURIComponent(state);

        const response = await fetch(
            `${DISTRICT_API_URL}/${encodedState}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.detail || "Could not load districts."
            );
        }

        districtInput.innerHTML = `
            <option value="">Select District</option>
        `;

        data.districts.forEach(function (district) {

            const option =
                document.createElement("option");

            option.value = district;
            option.textContent = district;

            districtInput.appendChild(option);
        });

        districtInput.disabled = false;

    } catch (error) {

        console.error(
            "District loading error:",
            error
        );

        districtInput.innerHTML = `
            <option value="">Unable to load districts</option>
        `;

        districtInput.disabled = true;
    }
}
// =====================================================
// STATE CHANGE EVENT
// =====================================================

if (stateInput) {

    stateInput.addEventListener(
        "change",
        loadDistricts
    );

}


// =====================================================
// TRANSLATIONS
// =====================================================


// =====================================================
// TRANSLATIONS
// =====================================================

const translations = {

    en: {

        tagline:
            "Smart Crop Disease Detection & Recommendation",

        badge:
            "🤖 AI-Powered Agriculture",

        detect:
            "🔍 Detect Crop Disease",

        detectSub:
            "Upload 1 to 3 clear images of the same leaf for better AI analysis",

        upload:
            "Upload Leaf Images",

        uploadText:
            "Drag & drop your image here or choose a file",

        choose:
            "Choose Images",

        chooseDescription:
            "JPG, PNG or WEBP • Maximum 3 images",

        selected:
            "Selected Images",

        addMore:
            "+ Add More Images",

        remove:
            "✕ Remove Images",

        analyze:
            "🔬 Analyze Leaves",

        analyzing:
            "AI is analyzing your leaves...",

        wait:
            "Please wait a moment",

        complete:
            "AI ANALYSIS COMPLETE",

        result:
            "🌱 Detection Result",

        crop:
            "CROP",

        disease:
            "DISEASE / CONDITION",

        confidence:
            "AI CONFIDENCE",

        about:
            "About the Condition",

        symptoms:
            "Symptoms",

        management:
            "Recommended Management",

        treatment:
            "Treatment Guidance",

        alternatives:
            "📊 Alternative Predictions",

        alternativesSub:
            "Other possibilities considered by the AI model",

        important:
            "⚠️ Important:",

        footer:
            "AI-powered crop disease detection and management support",

        error:
            "Something went wrong. Please try again.",

        invalidFile:
            "Please select JPG, PNG or WEBP images only.",

        noImage:
            "Please select at least one image.",

        maxImages:
            "You can upload a maximum of 3 images.",

        lowConfidence:
            "The model is not confident enough. Please upload a clearer leaf image.",

        highConfidence:
            "The AI model is highly confident in this prediction.",

        mediumConfidence:
            "The AI model has moderate confidence. Please verify the result.",

        lowConfidenceResult:
            "The AI model has low confidence. Please upload a clearer image and verify the result.",

        imageNumber:
            "Image",

        recommendTitle:
            "🌾 Recommend the Best Crop",

        recommendSub:
            "Enter your field conditions to get suitable crop recommendations.",

        recommendButton:
            "🌾 Recommend Crops",

        recommending:
            "AI is finding suitable crops...",

        recommendWait:
            "Please wait a moment",

        recommendComplete:
            "AI RECOMMENDATION COMPLETE",

        recommendedCrops:
            "🌾 Recommended Crops",

        bestMatch:
            "BEST MATCH",

        suitability:
            "SUITABILITY",

        score:
            "SCORE",

        topCrops:
            "📊 Top Crop Recommendations",

        topCropsSub:
            "Crops ranked according to your field conditions",

        cropOverview:
            "Crop Overview",

        cropDuration:
            "Crop Duration",

        cropSowing:
            "Sowing Information",

        cropManagement:
            "Management Guidance",

        recommendationError:
            "Unable to get crop recommendations. Please try again.",

        requiredFields:
            "Please fill State, District, Season, Soil Type and Water Availability.",

        excellent:
            "Excellent",

        good:
            "Good",

        moderate:
            "Moderate",

        low:
            "Low",

        notAvailable:
            "Not available",

        recommendationNote:
            "These recommendations are based on the field conditions provided. They are not a guarantee of yield.",

        district:
            "District",

        state:
            "State",

        season:
            "Season",

        soil:
            "Soil Type",

        water:
            "Water Availability",

        temperature:
            "Temperature",

        rainfall:
            "Rainfall"

    },


    hi: {

        tagline:
            "स्मार्ट फसल रोग पहचान और फसल सुझाव",

        badge:
            "🤖 AI आधारित कृषि",

        detect:
            "🔍 फसल रोग की पहचान करें",

        detectSub:
            "बेहतर AI जांच के लिए एक ही पत्ती की 1 से 3 साफ तस्वीरें अपलोड करें",

        upload:
            "पत्तियों की तस्वीरें अपलोड करें",

        uploadText:
            "तस्वीर यहां खींचकर छोड़ें या फाइल चुनें",

        choose:
            "तस्वीरें चुनें",

        chooseDescription:
            "JPG, PNG या WEBP • अधिकतम 3 तस्वीरें",

        selected:
            "चुनी गई तस्वीरें",

        addMore:
            "+ और तस्वीरें जोड़ें",

        remove:
            "✕ तस्वीरें हटाएं",

        analyze:
            "🔬 पत्तियों की जांच करें",

        analyzing:
            "AI आपकी पत्तियों की जांच कर रहा है...",

        wait:
            "कृपया कुछ क्षण प्रतीक्षा करें",

        complete:
            "AI जांच पूरी हुई",

        result:
            "🌱 जांच का परिणाम",

        crop:
            "फसल",

        disease:
            "बीमारी / स्थिति",

        confidence:
            "AI का विश्वास स्तर",

        about:
            "स्थिति के बारे में",

        symptoms:
            "लक्षण",

        management:
            "अनुशंसित प्रबंधन",

        treatment:
            "उपचार संबंधी जानकारी",

        alternatives:
            "📊 अन्य संभावित परिणाम",

        alternativesSub:
            "AI मॉडल द्वारा विचार किए गए अन्य संभावित परिणाम",

        important:
            "⚠️ महत्वपूर्ण:",

        footer:
            "AI आधारित फसल रोग पहचान और प्रबंधन सहायता",

        error:
            "कुछ समस्या हुई। कृपया दोबारा कोशिश करें।",

        invalidFile:
            "कृपया केवल JPG, PNG या WEBP तस्वीरें चुनें।",

        noImage:
            "कृपया कम से कम एक तस्वीर चुनें।",

        maxImages:
            "आप अधिकतम 3 तस्वीरें अपलोड कर सकते हैं।",

        lowConfidence:
            "मॉडल पर्याप्त भरोसेमंद नहीं है। कृपया पत्ती की और साफ तस्वीर अपलोड करें।",

        highConfidence:
            "AI मॉडल इस परिणाम के प्रति काफी आश्वस्त है।",

        mediumConfidence:
            "AI मॉडल का विश्वास स्तर मध्यम है। कृपया परिणाम की पुष्टि करें।",

        lowConfidenceResult:
            "AI मॉडल का विश्वास स्तर कम है। कृपया और साफ तस्वीर अपलोड करें और परिणाम की पुष्टि करें।",

        imageNumber:
            "तस्वीर",

        recommendTitle:
            "🌾 सबसे उपयुक्त फसल का सुझाव",

        recommendSub:
            "अपने खेत की परिस्थितियां भरें और उपयुक्त फसल के सुझाव प्राप्त करें।",

        recommendButton:
            "🌾 फसल सुझाएं",

        recommending:
            "AI उपयुक्त फसलों की तलाश कर रहा है...",

        recommendWait:
            "कृपया कुछ क्षण प्रतीक्षा करें",

        recommendComplete:
            "AI फसल सुझाव पूरा हुआ",

        recommendedCrops:
            "🌾 सुझाई गई फसलें",

        bestMatch:
            "सबसे अच्छा विकल्प",

        suitability:
            "उपयुक्तता",

        score:
            "स्कोर",

        topCrops:
            "📊 शीर्ष फसल सुझाव",

        topCropsSub:
            "आपके खेत की परिस्थितियों के अनुसार फसलों की रैंकिंग",

        cropOverview:
            "फसल की जानकारी",

        cropDuration:
            "फसल की अवधि",

        cropSowing:
            "बुवाई की जानकारी",

        cropManagement:
            "प्रबंधन संबंधी जानकारी",

        recommendationError:
            "फसल सुझाव प्राप्त नहीं हो सके। कृपया दोबारा प्रयास करें।",

        requiredFields:
            "कृपया राज्य, जिला, मौसम, मिट्टी और पानी की उपलब्धता भरें।",

        excellent:
            "बहुत उपयुक्त",

        good:
            "अच्छी उपयुक्तता",

        moderate:
            "मध्यम उपयुक्तता",

        low:
            "कम उपयुक्तता",

        notAvailable:
            "जानकारी उपलब्ध नहीं है",

        recommendationNote:
            "यह सुझाव आपके द्वारा दी गई खेत की परिस्थितियों पर आधारित है। यह उत्पादन की गारंटी नहीं है।",

        district:
            "जिला",

        state:
            "राज्य",

        season:
            "मौसम",

        soil:
            "मिट्टी",

        water:
            "पानी की उपलब्धता",

        temperature:
            "तापमान",

        rainfall:
            "वर्षा"

    }

};


// =====================================================
// FILE INPUT
// =====================================================

if (fileInput) {

    fileInput.addEventListener("change", function () {

        const files =
            Array.from(fileInput.files);

        if (files.length === 0) {
            return;
        }

        addFiles(files);

    });

}


// =====================================================
// UPLOAD AREA
// =====================================================

if (uploadArea) {

    uploadArea.addEventListener("dragover", function (event) {

        event.preventDefault();

        uploadArea.classList.add("drag-over");

    });


    uploadArea.addEventListener("dragleave", function () {

        uploadArea.classList.remove("drag-over");

    });


    uploadArea.addEventListener("drop", function (event) {

        event.preventDefault();

        uploadArea.classList.remove("drag-over");

        const files =
            Array.from(event.dataTransfer.files);

        if (files.length === 0) {
            return;
        }

        addFiles(files);

    });

}


// =====================================================
// ADD MORE BUTTON
// =====================================================

if (addMoreBtn) {

    addMoreBtn.addEventListener("click", function (event) {

        event.preventDefault();
        event.stopPropagation();

        if (selectedFiles.length >= MAX_IMAGES) {

            showError(
                translations[currentLanguage].maxImages
            );

            return;
        }

        fileInput.click();

    });

}


// =====================================================
// REMOVE ALL IMAGES
// =====================================================

if (removeImageBtn) {

    removeImageBtn.addEventListener("click", function () {

        clearSelectedFiles();

    });

}


// =====================================================
// ADD FILES
// =====================================================

function addFiles(files) {

    hideError();

    // Validate files

    for (const file of files) {

        if (!isValidImage(file)) {

            showError(
                translations[currentLanguage].invalidFile
            );

            return;
        }

    }


    // Available slots

    const remainingSlots =
        MAX_IMAGES - selectedFiles.length;


    if (remainingSlots <= 0) {

        showError(
            translations[currentLanguage].maxImages
        );

        return;
    }


    // Only add available files

    const filesToAdd =
        files.slice(0, remainingSlots);


    selectedFiles = [
        ...selectedFiles,
        ...filesToAdd
    ];


    // Create previews

    createPreviews();


    // Update buttons

    updateButtons();


    // Hide previous result

    if (result) {
        result.style.display = "none";
    }


    hideError();


    // Reset input

    fileInput.value = "";


    // More files than available

    if (files.length > remainingSlots) {

        showError(
            translations[currentLanguage].maxImages
        );

    }

}


// =====================================================
// VALIDATE IMAGE
// =====================================================

function isValidImage(file) {

    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp"
    ];

    return allowedTypes.includes(file.type);

}


// =====================================================
// CREATE PREVIEWS
// =====================================================

function createPreviews() {

    // Revoke old URLs

    previewURLs.forEach(function (url) {

        URL.revokeObjectURL(url);

    });

    previewURLs = [];


    // Clear grid

    if (multiPreviewGrid) {
        multiPreviewGrid.innerHTML = "";
    }


    // No images

    if (selectedFiles.length === 0) {

        previewContainer.style.display = "none";

        previewImage.style.display = "none";

        multiPreviewGrid.style.display = "none";

        return;
    }


    // Show preview container

    previewContainer.style.display = "block";


    // =================================================
    // ONE IMAGE
    // =================================================

    if (selectedFiles.length === 1) {

        const url =
            URL.createObjectURL(
                selectedFiles[0]
            );

        previewURLs.push(url);

        previewImage.src = url;

        previewImage.alt =
            `${translations[currentLanguage].imageNumber} 1`;

        previewImage.style.display = "block";

        multiPreviewGrid.style.display = "none";

        return;
    }


    // =================================================
    // MULTIPLE IMAGES
    // =================================================

    previewImage.style.display = "none";

    multiPreviewGrid.style.display = "grid";


    selectedFiles.forEach(function (file, index) {

        const url =
            URL.createObjectURL(file);

        previewURLs.push(url);


        const wrapper =
            document.createElement("div");

        wrapper.style.position = "relative";
        wrapper.style.width = "180px";
        wrapper.style.height = "180px";
        wrapper.style.margin = "5px";
        wrapper.style.overflow = "hidden";
        wrapper.style.borderRadius = "10px";


        const img =
            document.createElement("img");

        img.src = url;

        img.alt =
            `${translations[currentLanguage].imageNumber} ${index + 1}`;

        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "cover";


        const number =
            document.createElement("span");

        number.textContent =
            `${translations[currentLanguage].imageNumber} ${index + 1}`;

        number.style.position = "absolute";
        number.style.bottom = "5px";
        number.style.left = "5px";
        number.style.background =
            "rgba(0,0,0,0.65)";
        number.style.color = "white";
        number.style.padding = "4px 8px";
        number.style.borderRadius = "5px";
        number.style.fontSize = "12px";


        wrapper.appendChild(img);

        wrapper.appendChild(number);

        multiPreviewGrid.appendChild(wrapper);

    });

}


// =====================================================
// UPDATE BUTTONS
// =====================================================

function updateButtons() {

    if (!analyzeBtn) {
        return;
    }


    // Analyze button

    analyzeBtn.disabled =
        selectedFiles.length === 0;


    // Add more button

    if (selectedFiles.length >= MAX_IMAGES) {

        addMoreBtn.disabled = true;

        addMoreBtn.textContent =
            currentLanguage === "hi"
                ? "✓ 3 तस्वीरें चुनी गईं"
                : "✓ 3 Images Selected";

    } else {

        addMoreBtn.disabled = false;

        addMoreBtn.textContent =
            translations[currentLanguage].addMore;

    }

}


// =====================================================
// CLEAR FILES
// =====================================================

function clearSelectedFiles() {

    selectedFiles = [];


    // Revoke preview URLs

    previewURLs.forEach(function (url) {

        URL.revokeObjectURL(url);

    });

    previewURLs = [];


    // Reset preview

    previewImage.src = "";

    previewImage.style.display = "none";


    multiPreviewGrid.innerHTML = "";

    multiPreviewGrid.style.display = "none";


    previewContainer.style.display = "none";


    // Reset buttons

    analyzeBtn.disabled = true;

    addMoreBtn.disabled = false;

    addMoreBtn.textContent =
        translations[currentLanguage].addMore;


    // Reset input

    fileInput.value = "";


    // Hide messages/result

    hideError();

    result.style.display = "none";

}


// =====================================================
// DISEASE ANALYZE BUTTON
// =====================================================

if (analyzeBtn) {

    analyzeBtn.addEventListener("click", async function () {

        if (selectedFiles.length === 0) {

            showError(
                translations[currentLanguage].noImage
            );

            return;
        }


        // Hide previous result/error

        hideError();

        result.style.display = "none";


        // Disable button

        analyzeBtn.disabled = true;


        // Show loading

        loading.style.display = "flex";


        // FormData

        const formData =
            new FormData();


        // Backend expects "files"

        selectedFiles.forEach(function (file) {

            formData.append(
                "files",
                file
            );

        });


        try {

            const response =
                await fetch(
                    API_URL,
                    {
                        method: "POST",
                        body: formData
                    }
                );


            // Parse JSON

            let data = null;

            try {

                data =
                    await response.json();

            } catch (jsonError) {

                throw new Error(
                    "Server returned an invalid response."
                );

            }


            // Backend error

            if (!response.ok) {

                let message =
                    translations[currentLanguage].error;


                if (data && data.detail) {

                    if (Array.isArray(data.detail)) {

                        message =
                            data.detail
                                .map(function (item) {
                                    return item.msg || "";
                                })
                                .join(", ");

                    } else {

                        message =
                            data.detail;

                    }

                }


                throw new Error(message);

            }


            // Backend success check

            if (
                data.success === false
            ) {

                throw new Error(
                    data.message ||
                    translations[currentLanguage].error
                );

            }


            // Display result

            displayResult(data);

        }


        catch (error) {

            console.error(
                "Prediction error:",
                error
            );


            showError(
                error.message ||
                translations[currentLanguage].error
            );

        }


        finally {

            loading.style.display = "none";

            analyzeBtn.disabled =
                selectedFiles.length === 0;

            updateButtons();

        }

    });

}


// =====================================================
// DISPLAY DISEASE RESULT
// =====================================================

function displayResult(data) {

    result.style.display = "block";


    const prediction =
        data.prediction;


    // =================================================
    // LOW CONFIDENCE / NO PREDICTION
    // =================================================

    if (
        prediction === null ||
        prediction === undefined ||
        prediction === ""
    ) {

        cropResult.textContent =
            "-";

        diseaseResult.textContent =
            translations[currentLanguage].lowConfidence;

        confidenceResult.textContent =
            "-";


        descriptionResult.textContent =
            data.message ||
            translations[currentLanguage].lowConfidence;


        symptomsResult.innerHTML = "";

        managementResult.innerHTML = "";

        treatmentResult.textContent =
            "-";


        renderTopPredictions(
            data.top_predictions
        );


        confidenceMessage.innerHTML = `
            <div class="warning">
                ${escapeHtml(
                    data.message ||
                    translations[currentLanguage].lowConfidenceResult
                )}
            </div>
        `;


        result.scrollIntoView({
            behavior: "smooth"
        });

        return;
    }


    // =================================================
    // CROP
    // =================================================

    if (prediction.crop) {

        cropResult.textContent =
            formatCropName(
                prediction.crop
            );

    } else {

        const parsed =
            parsePredictionName(
                prediction
            );

        cropResult.textContent =
            parsed.crop || "-";

    }


    // =================================================
    // DISEASE
    // =================================================

    if (prediction.disease) {

        diseaseResult.textContent =
            formatText(
                prediction.disease
            );

    } else if (prediction.class_name) {

        const parsed =
            parsePredictionName(
                prediction
            );

        diseaseResult.textContent =
            parsed.disease;

    } else if (prediction.prediction) {

        diseaseResult.textContent =
            formatText(
                prediction.prediction
            );

    } else {

        diseaseResult.textContent =
            "-";

    }


    // =================================================
    // CONFIDENCE
    // =================================================

    if (
        prediction.confidence !== undefined &&
        prediction.confidence !== null
    ) {

        confidenceResult.textContent =
            `${Number(
                prediction.confidence
            ).toFixed(2)}%`;

    } else if (
        data.confidence !== undefined &&
        data.confidence !== null
    ) {

        confidenceResult.textContent =
            `${Number(
                data.confidence
            ).toFixed(2)}%`;

    } else {

        confidenceResult.textContent =
            "-";

    }


    // =================================================
    // DISEASE INFORMATION
    // =================================================

    displayDiseaseInformation(
        data.disease_information
    );


    // =================================================
    // TOP PREDICTIONS
    // =================================================

    renderTopPredictions(
        data.top_predictions
    );


    // =================================================
    // CONFIDENCE MESSAGE
    // =================================================

    renderConfidenceMessage(
        prediction
    );


    // Scroll to result

    result.scrollIntoView({
        behavior: "smooth"
    });

}


// =====================================================
// DISPLAY DISEASE INFORMATION
// =====================================================

function displayDiseaseInformation(info) {

    if (!info) {

        descriptionResult.textContent =
            "-";

        symptomsResult.innerHTML =
            "";

        managementResult.innerHTML =
            "";

        treatmentResult.textContent =
            "-";

        return;
    }


    // Description

    if (info.description) {

        descriptionResult.textContent =
            info.description;

    } else {

        descriptionResult.textContent =
            "-";

    }


    // Symptoms

    renderList(
        symptomsResult,
        info.symptoms
    );


    // Management

    renderList(
        managementResult,
        info.management ||
        info.prevention
    );


    // Treatment

    if (info.treatment) {

        treatmentResult.textContent =
            info.treatment;

    } else {

        treatmentResult.textContent =
            "-";

    }

}


// =====================================================
// RENDER LIST
// =====================================================

function renderList(element, items) {

    if (!element) {
        return;
    }


    element.innerHTML = "";


    if (!items) {
        return;
    }


    // Array

    if (Array.isArray(items)) {

        items.forEach(function (item) {

            const li =
                document.createElement("li");

            li.textContent =
                item;

            element.appendChild(li);

        });

        return;
    }


    // String

    if (typeof items === "string") {

        const li =
            document.createElement("li");

        li.textContent =
            items;

        element.appendChild(li);

    }

}


// =====================================================
// TOP DISEASE PREDICTIONS
// =====================================================

function renderTopPredictions(predictions) {

    topPredictions.innerHTML = "";


    if (
        !predictions ||
        !Array.isArray(predictions) ||
        predictions.length === 0
    ) {

        return;
    }


    predictions.forEach(
        function (item, index) {

            const row =
                document.createElement("div");


            row.className =
                "prediction-item";


            let name = "";


            if (item.crop && item.disease) {

                name =
                    `${item.crop} - ${item.disease}`;

            } else {

                name =
                    item.class_name ||
                    item.prediction ||
                    item.disease ||
                    item.name ||
                    "Unknown";

            }


            const score =
                item.confidence ??
                item.probability ??
                item.score ??
                0;


            row.innerHTML = `
                <div>
                    <strong>
                        ${index + 1}.
                        ${escapeHtml(
                            formatText(name)
                        )}
                    </strong>
                </div>

                <strong>
                    ${Number(score).toFixed(2)}%
                </strong>
            `;


            topPredictions.appendChild(row);

        }
    );

}


// =====================================================
// DISEASE CONFIDENCE MESSAGE
// =====================================================

function renderConfidenceMessage(prediction) {

    if (!confidenceMessage) {
        return;
    }


    let confidenceValue = null;


    if (
        prediction &&
        prediction.confidence !== undefined
    ) {

        confidenceValue =
            Number(
                prediction.confidence
            );

    }


    if (
        confidenceValue === null ||
        Number.isNaN(confidenceValue)
    ) {

        confidenceMessage.innerHTML = "";

        return;
    }


    const t =
        translations[currentLanguage];


    if (confidenceValue >= 70) {

        confidenceMessage.innerHTML = `
            <div class="success-message">
                ${escapeHtml(
                    t.highConfidence
                )}
            </div>
        `;

    } else if (confidenceValue >= 50) {

        confidenceMessage.innerHTML = `
            <div class="warning">
                ${escapeHtml(
                    t.mediumConfidence
                )}
            </div>
        `;

    } else {

        confidenceMessage.innerHTML = `
            <div class="warning">
                ${escapeHtml(
                    t.lowConfidenceResult
                )}
            </div>
        `;

    }

}


// =====================================================
// PARSE DISEASE PREDICTION NAME
// =====================================================

function parsePredictionName(prediction) {

    let name = "";


    if (typeof prediction === "string") {

        name = prediction;

    } else if (
        prediction &&
        prediction.class_name
    ) {

        name =
            prediction.class_name;

    } else if (
        prediction &&
        prediction.prediction
    ) {

        name =
            prediction.prediction;

    }


    const parts =
        name.split("___");


    if (parts.length >= 2) {

        return {

            crop:
                formatCropName(
                    parts[0]
                ),

            disease:
                formatText(
                    parts.slice(1).join("___")
                )

        };

    }


    return {

        crop: "",

        disease:
            formatText(name)

    };

}


// =====================================================
// FORMAT CROP NAME
// =====================================================

function formatCropName(name) {

    if (!name) {
        return "";
    }


    return String(name)

        .replace(/_/g, " ")

        .replace(/\(including sour\)/gi,
            "(including sour)")

        .replace(/,\s*/g, ", ")

        .replace(/\s+/g, " ")

        .trim();

}


// =====================================================
// FORMAT TEXT
// =====================================================

function formatText(name) {

    if (!name) {
        return "";
    }


    return String(name)

        .replace(/___/g, " - ")

        .replace(/_/g, " ")

        .replace(/\(including sour\)/gi,
            "(including sour)")

        .replace(
            /Two-spotted spider mite/gi,
            "Two-spotted spider mite"
        )

        .replace(
            /Two-spotted-spider-mite/gi,
            "Two-spotted spider mite"
        )

        .replace(/\s+/g, " ")

        .trim();

}


// =====================================================
// DISEASE ERROR
// =====================================================

function showError(message) {

    if (!errorBox) {
        console.error(message);
        return;
    }


    errorBox.textContent =
        message;


    errorBox.style.display =
        "block";

}


function hideError() {

    if (!errorBox) {
        return;
    }


    errorBox.textContent =
        "";


    errorBox.style.display =
        "none";

}


// =====================================================
// CROP RECOMMENDATION
// =====================================================

if (recommendCropBtn) {

    recommendCropBtn.addEventListener(
        "click",
        async function () {

            await recommendCrops();

        }
    );

}


// =====================================================
// RECOMMEND CROPS FUNCTION
// =====================================================

async function recommendCrops() {

    // Clear previous error

    hideRecommendationError();


    // =================================================
    // GET INPUTS
    // =================================================

    const state =
        stateInput
            ? stateInput.value.trim()
            : "";

    const district =
        districtInput
            ? districtInput.value.trim()
            : "";

    const season =
        seasonInput
            ? seasonInput.value.trim()
            : "";

    const soilType =
        soilInput
            ? soilInput.value.trim()
            : "";

    const waterAvailability =
        waterInput
            ? waterInput.value.trim()
            : "";

    const temperatureValue =
        temperatureInput
            ? temperatureInput.value.trim()
            : "";

    const rainfall =
        rainfallInput
            ? rainfallInput.value.trim()
            : "";


    // =================================================
    // REQUIRED VALIDATION
    // =================================================

    if (
        !state ||
        !district ||
        !season ||
        !soilType ||
        !waterAvailability
    ) {

        showRecommendationError(
            translations[currentLanguage].requiredFields
        );

        return;
    }


    // =================================================
    // BUILD REQUEST BODY
    // =================================================

    const requestData = {

        state: state,

        district: district,

        season: season,

        soil_type: soilType,

        water_availability:
            waterAvailability

    };


    // Temperature is optional

    if (temperatureValue !== "") {

        const temperature =
            Number(temperatureValue);

        if (!Number.isNaN(temperature)) {

            requestData.temperature =
                temperature;

        }

    }


    // Rainfall is optional

    if (rainfall !== "") {

        requestData.rainfall =
            rainfall;

    }


    // =================================================
    // UI LOADING
    // =================================================

    recommendCropBtn.disabled = true;

    recommendLoading.style.display =
        "flex";

    recommendResult.style.display =
        "none";


    try {

        // =================================================
        // API REQUEST
        // =================================================

        const response =
            await fetch(
                RECOMMEND_API_URL,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            requestData
                        )
                }
            );


        // =================================================
        // PARSE RESPONSE
        // =================================================

        let data = null;

        try {

            data =
                await response.json();

        } catch (jsonError) {

            throw new Error(
                "Server returned an invalid response."
            );

        }


        // =================================================
        // HTTP ERROR
        // =================================================

        if (!response.ok) {

            let message =
                translations[currentLanguage]
                    .recommendationError;


            if (data && data.detail) {

                if (Array.isArray(data.detail)) {

                    message =
                        data.detail
                            .map(function (item) {
                                return item.msg || "";
                            })
                            .join(", ");

                } else {

                    message =
                        data.detail;

                }

            }


            throw new Error(message);

        }


        // =================================================
        // SUCCESS CHECK
        // =================================================

        if (
            data.success === false
        ) {

            throw new Error(
                data.message ||
                translations[currentLanguage]
                    .recommendationError
            );

        }


        // =================================================
        // DISPLAY
        // =================================================

        displayCropRecommendations(data);

    }


    catch (error) {

        console.error(
            "Crop recommendation error:",
            error
        );


        showRecommendationError(
            error.message ||
            translations[currentLanguage]
                .recommendationError
        );

    }


    finally {

        recommendLoading.style.display =
            "none";

        recommendCropBtn.disabled =
            false;

    }

}


// =====================================================
// DISPLAY CROP RECOMMENDATIONS
// =====================================================

function displayCropRecommendations(data) {

    recommendResult.style.display =
        "block";


    // =================================================
    // GET RECOMMENDATIONS
    // =================================================

    const recommendations =
        Array.isArray(data.recommendations)
            ? data.recommendations
            : [];


    // =================================================
    // NO RESULTS
    // =================================================

    if (recommendations.length === 0) {

        bestCropName.textContent =
            "-";

        bestCropSuitability.textContent =
            "-";

        bestCropScore.textContent =
            "-";

        cropRecommendationsList.innerHTML =
            `
            <div class="warning">
                ${escapeHtml(
                    data.message ||
                    translations[currentLanguage]
                        .recommendationError
                )}
            </div>
            `;

        cropDetails.style.display =
            "none";

        cropRecommendationMessage.textContent =
            "";

        recommendResult.scrollIntoView({
            behavior: "smooth"
        });

        return;
    }


    // =================================================
    // BEST MATCH
    // =================================================

    let bestCrop =
        data.best_match ||
        recommendations[0];


    // Sometimes backend may return
    // best_match as an object containing crop data

    if (!bestCrop) {
        bestCrop = recommendations[0];
    }


    const bestName =
        getCropName(bestCrop);


    const bestScore =
        getCropScore(bestCrop);


    const bestSuitability =
        getSuitability(
            bestCrop,
            bestScore
        );


    bestCropName.textContent =
        bestName || "-";


    bestCropSuitability.textContent =
        bestSuitability;


    bestCropScore.textContent =
        `${bestScore.toFixed(2)}%`;


    // =================================================
    // RENDER TOP CROPS
    // =================================================

    renderCropRecommendations(
        recommendations
    );


    // =================================================
    // DETAILS
    // =================================================

    displayCropDetails(
        bestCrop
    );


    // =================================================
    // MESSAGE
    // =================================================

    let message =
        data.message ||
        translations[currentLanguage]
            .recommendationNote;


    cropRecommendationMessage.textContent =
        message;


    // =================================================
    // SCROLL
    // =================================================

    recommendResult.scrollIntoView({
        behavior: "smooth"
    });

}


// =====================================================
// RENDER CROP RECOMMENDATION LIST
// =====================================================

function renderCropRecommendations(
    recommendations
) {

    cropRecommendationsList.innerHTML =
        "";


    recommendations.forEach(
        function (crop, index) {

            const row =
                document.createElement("div");


            row.className =
                "prediction-item";


            const name =
                getCropName(crop);


            const score =
                getCropScore(crop);


            const suitability =
                getSuitability(
                    crop,
                    score
                );


            const location =
                crop.location || {};


            let locationText = "";


            if (location.district_match) {

                locationText =
                    currentLanguage === "hi"
                        ? "📍 जिला मिलान"
                        : "📍 District match";

            } else if (location.state_match) {

                locationText =
                    currentLanguage === "hi"
                        ? "📍 राज्य मिलान"
                        : "📍 State match";

            }


            row.innerHTML = `

                <div>

                    <strong>
                        ${index + 1}.
                        ${escapeHtml(name)}
                    </strong>

                    <div
                        style="
                            font-size:0.85rem;
                            margin-top:5px;
                            opacity:0.75;
                        "
                    >
                        ${escapeHtml(suitability)}

                        ${
                            locationText
                                ? " • " +
                                  escapeHtml(
                                      locationText
                                  )
                                : ""
                        }

                    </div>

                </div>


                <strong>
                    ${score.toFixed(2)}%
                </strong>

            `;


            // Click to show details

            row.style.cursor =
                "pointer";


            row.addEventListener(
                "click",
                function () {

                    displayCropDetails(
                        crop
                    );

                }
            );


            cropRecommendationsList.appendChild(
                row
            );

        }
    );

}


// =====================================================
// GET CROP NAME
// =====================================================

function getCropName(crop) {

    if (!crop) {
        return "";
    }


    return (
        crop.crop ||
        crop.name ||
        crop.crop_name ||
        crop.hindi_name ||
        "Unknown Crop"
    );

}


// =====================================================
// GET CROP SCORE
// =====================================================

function getCropScore(crop) {

    if (!crop) {
        return 0;
    }


    const possibleScores = [

        crop.score,

        crop.final_score,

        crop.suitability_score

    ];


    for (
        const value of possibleScores
    ) {

        if (
            value !== undefined &&
            value !== null &&
            !Number.isNaN(
                Number(value)
            )
        ) {

            return Number(value);

        }

    }


    return 0;

}


// =====================================================
// GET SUITABILITY
// =====================================================

function getSuitability(
    crop,
    score
) {

    if (
        crop &&
        crop.suitability
    ) {

        return formatSuitability(
            crop.suitability
        );

    }


    if (score >= 85) {

        return translations[currentLanguage]
            .excellent;

    }


    if (score >= 70) {

        return translations[currentLanguage]
            .good;

    }


    if (score >= 50) {

        return translations[currentLanguage]
            .moderate;

    }


    return translations[currentLanguage]
        .low;

}


// =====================================================
// FORMAT SUITABILITY
// =====================================================

function formatSuitability(value) {

    if (!value) {
        return "-";
    }


    const text =
        String(value)
            .replace(/_/g, " ")
            .trim();


    const lower =
        text.toLowerCase();


    if (
        lower === "excellent"
    ) {

        return translations[currentLanguage]
            .excellent;

    }


    if (
        lower === "good"
    ) {

        return translations[currentLanguage]
            .good;

    }


    if (
        lower === "moderate"
    ) {

        return translations[currentLanguage]
            .moderate;

    }


    if (
        lower === "low"
    ) {

        return translations[currentLanguage]
            .low;

    }


    return text;

}


// =====================================================
// DISPLAY CROP DETAILS
// =====================================================

function displayCropDetails(crop) {

    if (!crop) {
        return;
    }


    cropDetails.style.display =
        "grid";


    // =================================================
    // OVERVIEW
    // =================================================

    let overview = "";


    if (crop.name) {

        overview +=
            crop.name;

    }


    if (
        crop.hindi_name &&
        crop.hindi_name !== crop.name
    ) {

        overview +=
            ` (${crop.hindi_name})`;

    }


    if (crop.water_need) {

        overview +=
            ` • Water: ${crop.water_need}`;

    }


    if (crop.rainfall_need) {

        overview +=
            ` • Rainfall: ${crop.rainfall_need}`;

    }


    if (!overview) {

        overview =
            translations[currentLanguage]
                .notAvailable;

    }


    cropOverviewResult.textContent =
        overview;


    // =================================================
    // DURATION
    // =================================================

    cropDurationResult.textContent =
        formatDuration(
            crop.crop_duration_days
        );


    // =================================================
    // SOWING
    // =================================================

    cropSowingResult.textContent =
        formatSowing(
            crop.sowing
        );


    // =================================================
    // MANAGEMENT
    // =================================================

    cropManagementResult.textContent =
        formatManagement(
            crop.management
        );

}


// =====================================================
// FORMAT CROP DURATION
// =====================================================

function formatDuration(duration) {

    if (!duration) {

        return translations[currentLanguage]
            .notAvailable;

    }


    if (
        typeof duration === "object"
    ) {

        const min =
            duration.min;

        const max =
            duration.max;


        if (
            min !== undefined &&
            max !== undefined
        ) {

            return `${min} - ${max} days`;

        }


        if (
            min !== undefined
        ) {

            return `${min} days`;

        }


        if (
            max !== undefined
        ) {

            return `${max} days`;

        }

    }


    return String(duration);

}


// =====================================================
// FORMAT SOWING
// =====================================================

function formatSowing(sowing) {

    if (!sowing) {

        return translations[currentLanguage]
            .notAvailable;

    }


    if (
        typeof sowing === "string"
    ) {

        return sowing;

    }


    const parts = [];


    if (sowing.general_window) {

        parts.push(
            `Window: ${sowing.general_window}`
        );

    }


    if (sowing.seed_rate_note) {

        parts.push(
            `Seed: ${sowing.seed_rate_note}`
        );

    }


    if (sowing.spacing_note) {

        parts.push(
            `Spacing: ${sowing.spacing_note}`
        );

    }


    if (parts.length === 0) {

        return translations[currentLanguage]
            .notAvailable;

    }


    return parts.join(" • ");

}


// =====================================================
// FORMAT MANAGEMENT
// =====================================================

function formatManagement(management) {

    if (!management) {

        return translations[currentLanguage]
            .notAvailable;

    }


    if (
        typeof management === "string"
    ) {

        return management;

    }


    const parts = [];


    const fields = [

        ["soil", "Soil"],

        ["irrigation", "Irrigation"],

        ["nutrition", "Nutrition"],

        ["weed", "Weed management"],

        ["pest", "Pest management"],

        ["disease", "Disease management"]

    ];


    fields.forEach(
        function (field) {

            const key =
                field[0];

            const label =
                field[1];

            if (
                management[key]
            ) {

                let value =
                    management[key];


                if (
                    Array.isArray(value)
                ) {

                    value =
                        value.join(", ");

                }


                parts.push(
                    `${label}: ${value}`
                );

            }

        }
    );


    if (parts.length === 0) {

        return translations[currentLanguage]
            .notAvailable;

    }


    return parts.join(" • ");

}


// =====================================================
// RECOMMENDATION ERROR
// =====================================================

function showRecommendationError(
    message
) {

    if (!recommendError) {

        console.error(message);

        return;
    }


    recommendError.textContent =
        message;


    recommendError.style.display =
        "block";

}


function hideRecommendationError() {

    if (!recommendError) {
        return;
    }


    recommendError.textContent =
        "";


    recommendError.style.display =
        "none";

}


// =====================================================
// LANGUAGE CHANGE
// =====================================================

if (languageSelect) {

    languageSelect.addEventListener(
        "change",
        function () {

            currentLanguage =
                languageSelect.value;

            updateLanguage();

        }
    );

}


// =====================================================
// UPDATE LANGUAGE
// =====================================================

function updateLanguage() {

    const t =
        translations[currentLanguage];


    // =================================================
    // HEADER
    // =================================================

    setText(
        ".tagline",
        t.tagline
    );


    setText(
        ".hero-badge",
        t.badge
    );


    // =================================================
    // DISEASE SECTION
    // =================================================

    setText(
        ".section-heading h2",
        t.detect
    );


    // There are now two sections with
    // section-heading. Therefore update
    // disease section explicitly.

    const sectionHeadings =
        document.querySelectorAll(
            ".section-heading"
        );


    if (
        sectionHeadings.length >= 2
    ) {

        const diseaseHeading =
            sectionHeadings[1];

        const diseaseH2 =
            diseaseHeading.querySelector("h2");

        const diseaseP =
            diseaseHeading.querySelector("p");


        if (diseaseH2) {

            diseaseH2.textContent =
                t.detect;

        }


        if (diseaseP) {

            diseaseP.textContent =
                t.detectSub;

        }

    }


    // =================================================
    // RECOMMENDATION SECTION
    // =================================================

    if (
        sectionHeadings.length >= 1
    ) {

        const recommendationHeading =
            sectionHeadings[0];

        const recommendationH2 =
            recommendationHeading.querySelector("h2");

        const recommendationP =
            recommendationHeading.querySelector("p");


        if (recommendationH2) {

            recommendationH2.textContent =
                t.recommendTitle;

        }


        if (recommendationP) {

            recommendationP.textContent =
                t.recommendSub;

        }

    }


    if (recommendCropBtn) {

        recommendCropBtn.textContent =
            t.recommendButton;

    }


    // =================================================
    // DISEASE UPLOAD
    // =================================================

    setText(
        "#uploadArea h3",
        t.upload
    );


    setText(
        "#uploadArea p",
        t.uploadText
    );


    setText(
        "#uploadArea .choose-btn",
        t.choose
    );


    setText(
        "#uploadArea small",
        t.chooseDescription
    );


    // =================================================
    // PREVIEW
    // =================================================

    setText(
        "#previewContainer h3",
        t.selected
    );


    if (
        selectedFiles.length >= MAX_IMAGES
    ) {

        addMoreBtn.textContent =
            currentLanguage === "hi"
                ? "✓ 3 तस्वीरें चुनी गईं"
                : "✓ 3 Images Selected";

    } else {

        addMoreBtn.textContent =
            t.addMore;

    }


    removeImageBtn.textContent =
        t.remove;


    // =================================================
    // ANALYZE
    // =================================================

    analyzeBtn.textContent =
        t.analyze;


    // =================================================
    // LOADING
    // =================================================

    const loadingStrong =
        loading.querySelector("strong");

    if (loadingStrong) {

        loadingStrong.textContent =
            t.analyzing;

    }


    const loadingSpan =
        loading.querySelector("span");

    if (loadingSpan) {

        loadingSpan.textContent =
            t.wait;

    }


    // =================================================
    // DISEASE RESULT HEADER
    // =================================================

    setText(
        "#result .result-badge",
        t.complete
    );


    setText(
        "#result .result-header h2",
        t.result
    );


    // =================================================
    // DISEASE RESULT LABELS
    // =================================================

    const resultLabels =
        document.querySelectorAll(
            "#result .result-label"
        );


    if (resultLabels.length >= 3) {

        resultLabels[0].textContent =
            t.crop;

        resultLabels[1].textContent =
            t.disease;

        resultLabels[2].textContent =
            t.confidence;

    }


    // =================================================
    // DISEASE INFO CARDS
    // =================================================

    const infoTitles =
        document.querySelectorAll(
            "#result .info-card h3"
        );


    if (infoTitles.length >= 4) {

        infoTitles[0].textContent =
            t.about;

        infoTitles[1].textContent =
            t.symptoms;

        infoTitles[2].textContent =
            t.management;

        infoTitles[3].textContent =
            t.treatment;

    }


    // =================================================
    // ALTERNATIVE DISEASE PREDICTIONS
    // =================================================

    setText(
        "#result .top-predictions h3",
        t.alternatives
    );


    setText(
        "#result .top-predictions .sub-text",
        t.alternativesSub
    );


    // =================================================
    // DISCLAIMER
    // =================================================

    setText(
        ".disclaimer strong",
        t.important
    );


    // =================================================
    // FOOTER
    // =================================================

    setText(
        ".footer p",
        t.footer
    );


    // =================================================
    // RECREATE PREVIEWS
    // =================================================

    if (selectedFiles.length > 1) {

        createPreviews();

    }


    updateButtons();

}


// =====================================================
// SET TEXT HELPER
// =====================================================

function setText(
    selector,
    text
) {

    const element =
        document.querySelector(
            selector
        );


    if (element) {

        element.textContent =
            text;

    }

}


// =====================================================
// ESCAPE HTML
// =====================================================

function escapeHtml(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)

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


// =====================================================
// INITIAL SETUP
// =====================================================

updateLanguage();

updateButtons();


// =====================================================
// CONSOLE
// =====================================================

console.log(
    "AgroVision AI frontend loaded successfully."
);

console.log(
    `Maximum disease images allowed: ${MAX_IMAGES}`
);

console.log(
    `Disease API: ${API_URL}`
);

console.log(
    `Crop Recommendation API: ${RECOMMEND_API_URL}`
);