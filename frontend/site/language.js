/* =========================================================
   Kisan Vision — Central Language System
   Vanilla JavaScript. No frameworks. No external API.

   Supported languages: en, hi, mr, pa, gu
   Storage key: kisanVisionLanguage

   HOW IT WORKS (short):
   • Every user-visible string in the HTML uses data-i18n="key.path"
   • Placeholders: data-i18n-placeholder="key"
   • ARIA:         data-i18n-aria-label="key"
   • Titles:       data-i18n-title="key"
   • JS code uses window.t("key") for dynamic messages
   • Selector: any element with class "kv-lang-wrap" containing
       .kv-lang-btn      (the pill)
       .kv-lang-current  (span showing current language name)
       .kv-lang-menu     (ul of buttons with data-lang="en|hi|mr|pa|gu")
     will be auto-wired.
   ========================================================= */

(function () {
  const STORAGE_KEY = "kisanVisionLanguage";
  const DEFAULT_LANG = "en";
  const LANG_NAMES = {
    en: "English",
    hi: "हिन्दी",
    mr: "मराठी",
    pa: "ਪੰਜਾਬੀ",
    gu: "ગુજરાતી",
  };

  // ============================================================
  // TRANSLATIONS
  // ============================================================
  const translations = {
    en: {
      common: {
        home: "Home",
        howItWorks: "How It Works",
        detectDisease: "Detect Disease",
        farmingGuide: "Farming Guide",
        blog: "Blog",
        contact: "Contact",
        login: "Login",
        language: "Language",
        chatbotTitle: "Chatbot (coming soon)",
        chatbotSoon: "Chatbot will be available soon.",
      },
      footer: {
        explore: "Explore",
        support: "Support",
        tagline: "Smarter farming, naturally.",
        copyright: "© 2026 Kisan Vision. All rights reserved.",
      },
      howitworks: {
        heroEyebrow: "FROM FIELD TO INTELLIGENCE",
        heroTitleLead: "Turning Crop Care into",
        heroTitleAccent: "Smarter Farming",
        heroLead: "Kisan Vision combines real farming knowledge with the power of AI to help you understand your crops better and make informed decisions.",
        heroCta: "Explore Our Approach",
        processEyebrow: "HOW KISAN VISION WORKS",
        processTitle: "From Field to Better Farming — In 5 Steps",
        processSub: "A connected journey from your crops to actionable insights.",
        step1Title: "FIELD",
        step1Body: "Real crops, real challenges from your farm.",
        step2Title: "DATA",
        step2Body: "Crop images and relevant information.",
        step3Title: "AI ANALYSIS",
        step3Body: "Our AI analyses patterns and detects key signs.",
        step4Title: "INSIGHT",
        step4Body: "Get clear and easy-to-understand information.",
        step5Title: "BETTER FARMING",
        step5Body: "Take the right steps for a healthier and higher yield.",
        supKnowTitle: "Knowledge That Works",
        supKnowBody: "Based on real farming needs and expert insights.",
        supSimpleTitle: "Simple and Clear",
        supSimpleBody: "Complex information in easy language.",
        supFarmersTitle: "Built for Farmers",
        supFarmersBody: "Designed to support farmers at every step.",
        supHealthTitle: "A Healthier Tomorrow",
        supHealthBody: "Helping you grow better, for a brighter future.",
        videosEyebrow: "TUTORIALS",
        videosTitle: "Learn Kisan Vision in Minutes",
        videosSub: "Simple video guides to help you use Kisan Vision tools with confidence.",
        video1: "How to Detect Crop Disease",
        video2: "How to Upload and Analyze Leaf Images",
        video3: "How to Use the Farming Guide",
        video4: "Understanding Your AI Results",
        videoSoon: "Video Coming Soon",
      },
      detect: {
        heroEyebrow: "AI-Powered Crop Health",
        heroTitle: "Detect Crop Disease",
        heroSubtitle: "Upload 1 to 3 clear images of the same leaf for better AI analysis",
        dropTitle: "Drop leaf images here or click to browse",
        dropHint: "JPG, PNG, or WEBP · Up to 3 images · 10 MB each",
        dropBrowse: "Choose Images",
        dropAria: "Upload leaf images. Click or drag and drop.",
        selectedTitle: "Selected Images",
        addMore: "+ Add More Images",
        removeAll: "Remove Images",
        analyzeBtn: "Analyze Leaves",
        analyzeLoading: "Analyzing your crop...",
        resultBadge: "AI ANALYSIS COMPLETE",
        resultTitle: "Detection Result",
        labelCrop: "CROP",
        labelDisease: "DISEASE / CONDITION",
        labelConfidence: "AI CONFIDENCE",
        aboutTitle: "About the Condition",
        aboutEmpty: "No description available for this condition.",
        symptomsTitle: "Symptoms",
        symptomsEmpty: "No specific symptom data available for this prediction.",
        manageTitle: "Recommended Management",
        manageEmpty: "No management recommendations available.",
        treatTitle: "Treatment Guidance",
        treatEmpty: "No specific treatment guidance provided. Consult a local agricultural expert.",
        altTitle: "Alternative Predictions",
        altSub: "Other possibilities considered by the AI model",
        altEmpty: "No alternative predictions returned.",
        confHigh: "The AI model is highly confident in this prediction.",
        confMed: "The AI model has moderate confidence in this prediction.",
        confLow: "The AI model has low confidence. Consider uploading clearer images.",
        confNa: "Confidence score is not available for this prediction.",
        disclaimerStrong: "Important:",
        disclaimerBody: "Kisan Vision AI provides a screening and decision-support result. Always verify the diagnosis with a qualified agricultural expert and follow current local agricultural guidance and product labels before applying any treatment.",
        resetBtn: "Analyze Another Crop",
        errAtLeastOne: "Please select at least one crop image.",
        errMax: "Please upload no more than 3 images.",
        errRemaining: "You can add up to {n} more image(s). Maximum 3 allowed.",
        errUnsupported: "Unsupported file type. Please upload JPG, PNG, or WEBP images only.",
        errTooLarge: "Each image must be smaller than 10 MB.",
        errInvalid: "Invalid file.",
        errNotConfigured: "The AI service is not yet configured. Please connect your backend API URL in detectdisease.js.",
        errInvalidResp: "The AI service returned an unexpected response. Please try again.",
        errServer: "Something went wrong while analyzing your images. Please try again.",
        errNetwork: "Unable to connect to the AI service. Please try again later.",
        errEmpty: "The AI could not determine a prediction from these images. Please try clearer photos.",
      },
    },

    hi: {
      common: {
        home: "होम",
        howItWorks: "यह कैसे काम करता है",
        detectDisease: "रोग पहचानें",
        farmingGuide: "खेती गाइड",
        blog: "ब्लॉग",
        contact: "संपर्क",
        login: "लॉगिन",
        language: "भाषा",
        chatbotTitle: "चैटबॉट (जल्द ही)",
        chatbotSoon: "चैटबॉट जल्द ही उपलब्ध होगा।",
      },
      footer: {
        explore: "एक्सप्लोर करें",
        support: "सहायता",
        tagline: "बेहतर खेती, प्राकृतिक तरीके से।",
        copyright: "© 2026 Kisan Vision. सर्वाधिकार सुरक्षित।",
      },
      howitworks: {
        heroEyebrow: "खेत से बुद्धिमत्ता तक",
        heroTitleLead: "फसल की देखभाल को बनाइए",
        heroTitleAccent: "स्मार्ट खेती",
        heroLead: "Kisan Vision असली खेती की जानकारी और AI की ताकत को मिलाकर आपकी फसल को बेहतर समझने और सही निर्णय लेने में मदद करता है।",
        heroCta: "हमारा तरीका देखें",
        processEyebrow: "Kisan Vision कैसे काम करता है",
        processTitle: "खेत से बेहतर खेती तक — 5 चरणों में",
        processSub: "आपकी फसल से उपयोगी जानकारी तक की एक जुड़ी हुई यात्रा।",
        step1Title: "खेत",
        step1Body: "असली फसलें, आपके खेत की असली चुनौतियाँ।",
        step2Title: "डेटा",
        step2Body: "फसल की तस्वीरें और ज़रूरी जानकारी।",
        step3Title: "AI विश्लेषण",
        step3Body: "हमारा AI पैटर्न पहचानकर मुख्य लक्षण खोजता है।",
        step4Title: "जानकारी",
        step4Body: "स्पष्ट और आसानी से समझ आने वाली जानकारी पाएँ।",
        step5Title: "बेहतर खेती",
        step5Body: "स्वस्थ फसल और अधिक पैदावार के लिए सही कदम उठाएँ।",
        supKnowTitle: "काम आने वाला ज्ञान",
        supKnowBody: "असली खेती की ज़रूरतों और विशेषज्ञों की समझ पर आधारित।",
        supSimpleTitle: "आसान और स्पष्ट",
        supSimpleBody: "जटिल जानकारी सरल भाषा में।",
        supFarmersTitle: "किसानों के लिए बना",
        supFarmersBody: "हर कदम पर किसानों की मदद के लिए बनाया गया।",
        supHealthTitle: "एक स्वस्थ कल",
        supHealthBody: "बेहतर उत्पादन के साथ उज्ज्वल भविष्य की ओर।",
        videosEyebrow: "ट्यूटोरियल",
        videosTitle: "कुछ ही मिनटों में Kisan Vision सीखें",
        videosSub: "आसान वीडियो गाइड जो Kisan Vision के उपकरणों का उपयोग करने में आपकी मदद करेंगे।",
        video1: "फसल रोग कैसे पहचानें",
        video2: "पत्ती की तस्वीरें कैसे अपलोड और विश्लेषण करें",
        video3: "खेती गाइड का उपयोग कैसे करें",
        video4: "अपने AI परिणाम को समझें",
        videoSoon: "वीडियो जल्द आ रहा है",
      },
      detect: {
        heroEyebrow: "AI आधारित फसल स्वास्थ्य",
        heroTitle: "फसल रोग पहचानें",
        heroSubtitle: "बेहतर AI विश्लेषण के लिए एक ही पत्ती की 1 से 3 साफ़ तस्वीरें अपलोड करें",
        dropTitle: "पत्ती की तस्वीरें यहाँ छोड़ें या क्लिक करके चुनें",
        dropHint: "JPG, PNG या WEBP · अधिकतम 3 तस्वीरें · प्रत्येक 10 MB तक",
        dropBrowse: "तस्वीरें चुनें",
        dropAria: "पत्ती की तस्वीरें अपलोड करें। क्लिक करें या खींचकर छोड़ें।",
        selectedTitle: "चुनी गई तस्वीरें",
        addMore: "+ और तस्वीरें जोड़ें",
        removeAll: "तस्वीरें हटाएँ",
        analyzeBtn: "पत्तियों का विश्लेषण करें",
        analyzeLoading: "आपकी फसल का विश्लेषण हो रहा है...",
        resultBadge: "AI विश्लेषण पूरा हुआ",
        resultTitle: "पहचान परिणाम",
        labelCrop: "फसल",
        labelDisease: "रोग / स्थिति",
        labelConfidence: "AI विश्वास स्तर",
        aboutTitle: "स्थिति के बारे में",
        aboutEmpty: "इस स्थिति के लिए कोई विवरण उपलब्ध नहीं है।",
        symptomsTitle: "लक्षण",
        symptomsEmpty: "इस भविष्यवाणी के लिए कोई विशिष्ट लक्षण उपलब्ध नहीं हैं।",
        manageTitle: "अनुशंसित प्रबंधन",
        manageEmpty: "कोई प्रबंधन सुझाव उपलब्ध नहीं है।",
        treatTitle: "उपचार सलाह",
        treatEmpty: "कोई विशिष्ट उपचार सलाह उपलब्ध नहीं है। कृपया स्थानीय कृषि विशेषज्ञ से संपर्क करें।",
        altTitle: "वैकल्पिक भविष्यवाणियाँ",
        altSub: "AI मॉडल द्वारा विचार की गई अन्य संभावनाएँ",
        altEmpty: "कोई वैकल्पिक भविष्यवाणी नहीं मिली।",
        confHigh: "AI मॉडल इस भविष्यवाणी को लेकर अत्यधिक विश्वास रखता है।",
        confMed: "AI मॉडल इस भविष्यवाणी को लेकर मध्यम विश्वास रखता है।",
        confLow: "AI मॉडल का विश्वास कम है। कृपया साफ़ तस्वीरें अपलोड करें।",
        confNa: "इस भविष्यवाणी के लिए विश्वास स्कोर उपलब्ध नहीं है।",
        disclaimerStrong: "ज़रूरी सूचना:",
        disclaimerBody: "Kisan Vision AI केवल एक स्क्रीनिंग और निर्णय-सहायता परिणाम देता है। कोई भी उपचार करने से पहले किसी योग्य कृषि विशेषज्ञ से पुष्टि करें और स्थानीय कृषि सलाह व उत्पाद निर्देशों का पालन करें।",
        resetBtn: "दूसरी फसल का विश्लेषण करें",
        errAtLeastOne: "कृपया कम से कम एक फसल की तस्वीर चुनें।",
        errMax: "कृपया 3 से अधिक तस्वीरें अपलोड न करें।",
        errRemaining: "आप {n} और तस्वीर(ें) जोड़ सकते हैं। अधिकतम 3 अनुमत।",
        errUnsupported: "असमर्थित फ़ाइल प्रकार। कृपया केवल JPG, PNG या WEBP तस्वीरें अपलोड करें।",
        errTooLarge: "प्रत्येक तस्वीर 10 MB से छोटी होनी चाहिए।",
        errInvalid: "अमान्य फ़ाइल।",
        errNotConfigured: "AI सेवा अभी कॉन्फ़िगर नहीं है। कृपया detectdisease.js में बैकएंड API URL जोड़ें।",
        errInvalidResp: "AI सेवा से अप्रत्याशित उत्तर मिला। कृपया पुनः प्रयास करें।",
        errServer: "तस्वीरों का विश्लेषण करते समय कुछ गड़बड़ हुई। कृपया पुनः प्रयास करें।",
        errNetwork: "AI सेवा से कनेक्ट नहीं हो पा रहे। कृपया बाद में पुनः प्रयास करें।",
        errEmpty: "AI इन तस्वीरों से भविष्यवाणी नहीं कर सका। कृपया स्पष्ट तस्वीरें आज़माएँ।",
      },
    },

    mr: {
      common: {
        home: "मुख्यपृष्ठ",
        howItWorks: "हे कसे कार्य करते",
        detectDisease: "रोग ओळखा",
        farmingGuide: "शेती मार्गदर्शक",
        blog: "ब्लॉग",
        contact: "संपर्क",
        login: "लॉगिन",
        language: "भाषा",
        chatbotTitle: "चॅटबॉट (लवकरच)",
        chatbotSoon: "चॅटबॉट लवकरच उपलब्ध होईल.",
      },
      footer: {
        explore: "एक्सप्लोर करा",
        support: "सहाय्य",
        tagline: "नैसर्गिक पद्धतीने, स्मार्ट शेती.",
        copyright: "© 2026 Kisan Vision. सर्व हक्क राखीव.",
      },
      howitworks: {
        heroEyebrow: "शेतापासून बुद्धिमत्तेपर्यंत",
        heroTitleLead: "पिकांची काळजी बनवा",
        heroTitleAccent: "स्मार्ट शेती",
        heroLead: "Kisan Vision खरी शेती माहिती आणि AI ची ताकद एकत्र करून तुमच्या पिकांना अधिक चांगले समजण्यास आणि योग्य निर्णय घेण्यास मदत करते.",
        heroCta: "आमचा दृष्टिकोन पहा",
        processEyebrow: "Kisan Vision कसे कार्य करते",
        processTitle: "शेतापासून चांगल्या शेतीपर्यंत — ५ पायऱ्यांत",
        processSub: "तुमच्या पिकांपासून उपयुक्त माहितीपर्यंतचा एक जोडलेला प्रवास.",
        step1Title: "शेत",
        step1Body: "खरी पिके, तुमच्या शेतातील खरी आव्हाने.",
        step2Title: "डेटा",
        step2Body: "पिकांच्या प्रतिमा आणि संबंधित माहिती.",
        step3Title: "AI विश्लेषण",
        step3Body: "आमचे AI पॅटर्न ओळखून महत्त्वाची चिन्हे शोधते.",
        step4Title: "अंतर्दृष्टी",
        step4Body: "स्पष्ट आणि सहज समजणारी माहिती मिळवा.",
        step5Title: "उत्तम शेती",
        step5Body: "निरोगी पीक व अधिक उत्पादनासाठी योग्य पावले उचला.",
        supKnowTitle: "उपयोगी ज्ञान",
        supKnowBody: "खऱ्या शेतीच्या गरजा आणि तज्ज्ञांच्या अनुभवावर आधारित.",
        supSimpleTitle: "सोपे आणि स्पष्ट",
        supSimpleBody: "क्लिष्ट माहिती सोप्या भाषेत.",
        supFarmersTitle: "शेतकऱ्यांसाठी बनवले",
        supFarmersBody: "प्रत्येक टप्प्यावर शेतकऱ्यांना मदत करण्यासाठी.",
        supHealthTitle: "उज्ज्वल उद्या",
        supHealthBody: "चांगल्या उत्पादनासह उज्ज्वल भविष्याकडे.",
        videosEyebrow: "ट्युटोरियल",
        videosTitle: "काही मिनिटांत Kisan Vision शिका",
        videosSub: "Kisan Vision साधने वापरण्यास मदत करणारे सोपे व्हिडिओ मार्गदर्शक.",
        video1: "पिक रोग कसा ओळखावा",
        video2: "पानांच्या प्रतिमा कशा अपलोड व विश्लेषण कराव्यात",
        video3: "शेती मार्गदर्शक कसे वापरावे",
        video4: "तुमचे AI परिणाम समजून घ्या",
        videoSoon: "व्हिडिओ लवकरच येत आहे",
      },
      detect: {
        heroEyebrow: "AI-आधारित पिक आरोग्य",
        heroTitle: "पिक रोग ओळखा",
        heroSubtitle: "उत्तम AI विश्लेषणासाठी एकाच पानाच्या १ ते ३ स्पष्ट प्रतिमा अपलोड करा",
        dropTitle: "पानांच्या प्रतिमा येथे टाका किंवा निवडण्यासाठी क्लिक करा",
        dropHint: "JPG, PNG किंवा WEBP · जास्तीत जास्त ३ प्रतिमा · प्रत्येकी १० MB",
        dropBrowse: "प्रतिमा निवडा",
        dropAria: "पानांच्या प्रतिमा अपलोड करा. क्लिक करा किंवा ड्रॅग व ड्रॉप करा.",
        selectedTitle: "निवडलेल्या प्रतिमा",
        addMore: "+ अधिक प्रतिमा जोडा",
        removeAll: "प्रतिमा काढा",
        analyzeBtn: "पानांचे विश्लेषण करा",
        analyzeLoading: "तुमच्या पिकाचे विश्लेषण होत आहे...",
        resultBadge: "AI विश्लेषण पूर्ण झाले",
        resultTitle: "ओळख निकाल",
        labelCrop: "पीक",
        labelDisease: "रोग / स्थिती",
        labelConfidence: "AI विश्वास पातळी",
        aboutTitle: "स्थितीबद्दल",
        aboutEmpty: "या स्थितीसाठी वर्णन उपलब्ध नाही.",
        symptomsTitle: "लक्षणे",
        symptomsEmpty: "या अंदाजासाठी विशिष्ट लक्षणे उपलब्ध नाहीत.",
        manageTitle: "शिफारस केलेले व्यवस्थापन",
        manageEmpty: "व्यवस्थापन शिफारसी उपलब्ध नाहीत.",
        treatTitle: "उपचार मार्गदर्शन",
        treatEmpty: "विशिष्ट उपचार मार्गदर्शन उपलब्ध नाही. स्थानिक कृषी तज्ज्ञांशी संपर्क करा.",
        altTitle: "पर्यायी अंदाज",
        altSub: "AI मॉडेलने विचारात घेतलेल्या इतर शक्यता",
        altEmpty: "पर्यायी अंदाज उपलब्ध नाहीत.",
        confHigh: "AI मॉडेलला या अंदाजावर उच्च विश्वास आहे.",
        confMed: "AI मॉडेलला या अंदाजावर मध्यम विश्वास आहे.",
        confLow: "AI मॉडेलचा विश्वास कमी आहे. कृपया स्पष्ट प्रतिमा अपलोड करा.",
        confNa: "या अंदाजासाठी विश्वास गुण उपलब्ध नाही.",
        disclaimerStrong: "महत्त्वाचे:",
        disclaimerBody: "Kisan Vision AI केवळ स्क्रीनिंग व निर्णय-सहाय्य निकाल देते. कोणताही उपचार करण्यापूर्वी पात्र कृषी तज्ज्ञाकडून निदान तपासा आणि स्थानिक कृषी मार्गदर्शन व उत्पाद लेबल पाळा.",
        resetBtn: "आणखी एका पिकाचे विश्लेषण करा",
        errAtLeastOne: "कृपया किमान एक पिक प्रतिमा निवडा.",
        errMax: "कृपया ३ पेक्षा जास्त प्रतिमा अपलोड करू नका.",
        errRemaining: "तुम्ही आणखी {n} प्रतिमा जोडू शकता. जास्तीत जास्त ३ अनुमत.",
        errUnsupported: "असमर्थित फाइल प्रकार. कृपया फक्त JPG, PNG किंवा WEBP प्रतिमा अपलोड करा.",
        errTooLarge: "प्रत्येक प्रतिमा १० MB पेक्षा लहान असावी.",
        errInvalid: "अवैध फाइल.",
        errNotConfigured: "AI सेवा अजून कॉन्फिगर केलेली नाही. कृपया detectdisease.js मध्ये बॅकएंड API URL जोडा.",
        errInvalidResp: "AI सेवेकडून अनपेक्षित प्रतिसाद आला. कृपया पुन्हा प्रयत्न करा.",
        errServer: "प्रतिमांचे विश्लेषण करताना काहीतरी चूक झाली. कृपया पुन्हा प्रयत्न करा.",
        errNetwork: "AI सेवेशी संपर्क साधता येत नाही. कृपया नंतर पुन्हा प्रयत्न करा.",
        errEmpty: "AI या प्रतिमांवरून अंदाज करू शकले नाही. कृपया स्पष्ट प्रतिमा वापरून पहा.",
      },
    },

    pa: {
      common: {
        home: "ਹੋਮ",
        howItWorks: "ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ",
        detectDisease: "ਬਿਮਾਰੀ ਪਛਾਣੋ",
        farmingGuide: "ਖੇਤੀ ਗਾਈਡ",
        blog: "ਬਲੌਗ",
        contact: "ਸੰਪਰਕ",
        login: "ਲੌਗਇਨ",
        language: "ਭਾਸ਼ਾ",
        chatbotTitle: "ਚੈਟਬੋਟ (ਜਲਦੀ)",
        chatbotSoon: "ਚੈਟਬੋਟ ਜਲਦੀ ਉਪਲਬਧ ਹੋਵੇਗਾ।",
      },
      footer: {
        explore: "ਖੋਜੋ",
        support: "ਸਹਾਇਤਾ",
        tagline: "ਕੁਦਰਤੀ ਢੰਗ ਨਾਲ, ਸਮਝਦਾਰ ਖੇਤੀ।",
        copyright: "© 2026 Kisan Vision. ਸਾਰੇ ਹੱਕ ਰਾਖਵੇਂ।",
      },
      howitworks: {
        heroEyebrow: "ਖੇਤ ਤੋਂ ਬੁੱਧੀਮਤਾ ਤੱਕ",
        heroTitleLead: "ਫਸਲ ਦੀ ਦੇਖਭਾਲ ਨੂੰ ਬਣਾਓ",
        heroTitleAccent: "ਸਮਾਰਟ ਖੇਤੀ",
        heroLead: "Kisan Vision ਅਸਲ ਖੇਤੀ ਦੀ ਜਾਣਕਾਰੀ ਅਤੇ AI ਦੀ ਤਾਕਤ ਨੂੰ ਮਿਲਾ ਕੇ ਤੁਹਾਡੀ ਫਸਲ ਨੂੰ ਬਿਹਤਰ ਸਮਝਣ ਅਤੇ ਸਹੀ ਫੈਸਲੇ ਲੈਣ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ।",
        heroCta: "ਸਾਡਾ ਤਰੀਕਾ ਵੇਖੋ",
        processEyebrow: "Kisan Vision ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ",
        processTitle: "ਖੇਤ ਤੋਂ ਬਿਹਤਰ ਖੇਤੀ ਤੱਕ — 5 ਪੜਾਵਾਂ ਵਿੱਚ",
        processSub: "ਤੁਹਾਡੀ ਫਸਲ ਤੋਂ ਲਾਭਦਾਇਕ ਜਾਣਕਾਰੀ ਤੱਕ ਦਾ ਇੱਕ ਜੁੜਿਆ ਸਫ਼ਰ।",
        step1Title: "ਖੇਤ",
        step1Body: "ਅਸਲ ਫਸਲਾਂ, ਤੁਹਾਡੇ ਖੇਤ ਦੀਆਂ ਅਸਲ ਚੁਣੌਤੀਆਂ।",
        step2Title: "ਡਾਟਾ",
        step2Body: "ਫਸਲ ਦੀਆਂ ਤਸਵੀਰਾਂ ਅਤੇ ਸਬੰਧਿਤ ਜਾਣਕਾਰੀ।",
        step3Title: "AI ਵਿਸ਼ਲੇਸ਼ਣ",
        step3Body: "ਸਾਡਾ AI ਪੈਟਰਨਾਂ ਦੀ ਪਛਾਣ ਕਰ ਕੇ ਮੁੱਖ ਲੱਛਣ ਲੱਭਦਾ ਹੈ।",
        step4Title: "ਸਮਝ",
        step4Body: "ਸਪੱਸ਼ਟ ਅਤੇ ਆਸਾਨੀ ਨਾਲ ਸਮਝ ਆਉਣ ਵਾਲੀ ਜਾਣਕਾਰੀ ਪਾਓ।",
        step5Title: "ਬਿਹਤਰ ਖੇਤੀ",
        step5Body: "ਸਿਹਤਮੰਦ ਫਸਲ ਅਤੇ ਵੱਧ ਉਪਜ ਲਈ ਸਹੀ ਕਦਮ ਚੁੱਕੋ।",
        supKnowTitle: "ਕੰਮ ਆਉਣ ਵਾਲਾ ਗਿਆਨ",
        supKnowBody: "ਅਸਲ ਖੇਤੀ ਲੋੜਾਂ ਅਤੇ ਮਾਹਿਰਾਂ ਦੀ ਸਮਝ 'ਤੇ ਆਧਾਰਿਤ।",
        supSimpleTitle: "ਸਧਾਰਨ ਅਤੇ ਸਪੱਸ਼ਟ",
        supSimpleBody: "ਗੁੰਝਲਦਾਰ ਜਾਣਕਾਰੀ ਸੌਖੀ ਭਾਸ਼ਾ ਵਿੱਚ।",
        supFarmersTitle: "ਕਿਸਾਨਾਂ ਲਈ ਬਣਾਇਆ",
        supFarmersBody: "ਹਰ ਕਦਮ 'ਤੇ ਕਿਸਾਨਾਂ ਦੀ ਮਦਦ ਲਈ।",
        supHealthTitle: "ਇੱਕ ਸਿਹਤਮੰਦ ਭਵਿੱਖ",
        supHealthBody: "ਬਿਹਤਰ ਉਪਜ ਨਾਲ ਉੱਜਲੇ ਭਵਿੱਖ ਵੱਲ।",
        videosEyebrow: "ਟਿਊਟੋਰੀਅਲ",
        videosTitle: "ਕੁਝ ਮਿੰਟਾਂ ਵਿੱਚ Kisan Vision ਸਿੱਖੋ",
        videosSub: "Kisan Vision ਦੇ ਸੰਦ ਵਰਤਣ ਵਿੱਚ ਮਦਦ ਕਰਨ ਵਾਲੇ ਸੌਖੇ ਵੀਡੀਓ ਗਾਈਡ।",
        video1: "ਫਸਲ ਦੀ ਬਿਮਾਰੀ ਕਿਵੇਂ ਪਛਾਣੀਏ",
        video2: "ਪੱਤਿਆਂ ਦੀਆਂ ਤਸਵੀਰਾਂ ਕਿਵੇਂ ਅਪਲੋਡ ਅਤੇ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੀਏ",
        video3: "ਖੇਤੀ ਗਾਈਡ ਕਿਵੇਂ ਵਰਤੀਏ",
        video4: "ਆਪਣੇ AI ਨਤੀਜੇ ਸਮਝੋ",
        videoSoon: "ਵੀਡੀਓ ਜਲਦੀ ਆ ਰਿਹਾ ਹੈ",
      },
      detect: {
        heroEyebrow: "AI-ਆਧਾਰਿਤ ਫਸਲ ਸਿਹਤ",
        heroTitle: "ਫਸਲ ਦੀ ਬਿਮਾਰੀ ਪਛਾਣੋ",
        heroSubtitle: "ਬਿਹਤਰ AI ਵਿਸ਼ਲੇਸ਼ਣ ਲਈ ਇੱਕੋ ਪੱਤੇ ਦੀਆਂ 1 ਤੋਂ 3 ਸਾਫ਼ ਤਸਵੀਰਾਂ ਅਪਲੋਡ ਕਰੋ",
        dropTitle: "ਪੱਤੇ ਦੀਆਂ ਤਸਵੀਰਾਂ ਇੱਥੇ ਛੱਡੋ ਜਾਂ ਬ੍ਰਾਊਜ਼ ਕਰਨ ਲਈ ਕਲਿੱਕ ਕਰੋ",
        dropHint: "JPG, PNG ਜਾਂ WEBP · ਵੱਧ ਤੋਂ ਵੱਧ 3 ਤਸਵੀਰਾਂ · ਹਰੇਕ 10 MB",
        dropBrowse: "ਤਸਵੀਰਾਂ ਚੁਣੋ",
        dropAria: "ਪੱਤੇ ਦੀਆਂ ਤਸਵੀਰਾਂ ਅਪਲੋਡ ਕਰੋ। ਕਲਿੱਕ ਕਰੋ ਜਾਂ ਖਿੱਚ ਕੇ ਛੱਡੋ।",
        selectedTitle: "ਚੁਣੀਆਂ ਤਸਵੀਰਾਂ",
        addMore: "+ ਹੋਰ ਤਸਵੀਰਾਂ ਜੋੜੋ",
        removeAll: "ਤਸਵੀਰਾਂ ਹਟਾਓ",
        analyzeBtn: "ਪੱਤਿਆਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ",
        analyzeLoading: "ਤੁਹਾਡੀ ਫਸਲ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਹੋ ਰਿਹਾ ਹੈ...",
        resultBadge: "AI ਵਿਸ਼ਲੇਸ਼ਣ ਪੂਰਾ",
        resultTitle: "ਪਛਾਣ ਦਾ ਨਤੀਜਾ",
        labelCrop: "ਫਸਲ",
        labelDisease: "ਬਿਮਾਰੀ / ਸਥਿਤੀ",
        labelConfidence: "AI ਭਰੋਸਾ",
        aboutTitle: "ਸਥਿਤੀ ਬਾਰੇ",
        aboutEmpty: "ਇਸ ਸਥਿਤੀ ਲਈ ਕੋਈ ਵੇਰਵਾ ਉਪਲਬਧ ਨਹੀਂ।",
        symptomsTitle: "ਲੱਛਣ",
        symptomsEmpty: "ਇਸ ਭਵਿੱਖਬਾਣੀ ਲਈ ਕੋਈ ਖਾਸ ਲੱਛਣ ਉਪਲਬਧ ਨਹੀਂ।",
        manageTitle: "ਸਿਫ਼ਾਰਿਸ਼ੀ ਪ੍ਰਬੰਧਨ",
        manageEmpty: "ਕੋਈ ਪ੍ਰਬੰਧਨ ਸਿਫ਼ਾਰਿਸ਼ ਉਪਲਬਧ ਨਹੀਂ।",
        treatTitle: "ਇਲਾਜ ਦੀ ਸਲਾਹ",
        treatEmpty: "ਕੋਈ ਖਾਸ ਇਲਾਜ ਸਲਾਹ ਨਹੀਂ। ਸਥਾਨਕ ਖੇਤੀ ਮਾਹਿਰ ਨਾਲ ਸੰਪਰਕ ਕਰੋ।",
        altTitle: "ਵਿਕਲਪਕ ਭਵਿੱਖਬਾਣੀਆਂ",
        altSub: "AI ਮਾਡਲ ਦੁਆਰਾ ਵਿਚਾਰੀਆਂ ਹੋਰ ਸੰਭਾਵਨਾਵਾਂ",
        altEmpty: "ਕੋਈ ਵਿਕਲਪਕ ਭਵਿੱਖਬਾਣੀਆਂ ਨਹੀਂ ਮਿਲੀਆਂ।",
        confHigh: "AI ਮਾਡਲ ਨੂੰ ਇਸ ਭਵਿੱਖਬਾਣੀ 'ਤੇ ਬਹੁਤ ਭਰੋਸਾ ਹੈ।",
        confMed: "AI ਮਾਡਲ ਨੂੰ ਇਸ ਭਵਿੱਖਬਾਣੀ 'ਤੇ ਦਰਮਿਆਨਾ ਭਰੋਸਾ ਹੈ।",
        confLow: "AI ਮਾਡਲ ਦਾ ਭਰੋਸਾ ਘੱਟ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਸਾਫ਼ ਤਸਵੀਰਾਂ ਅਪਲੋਡ ਕਰੋ।",
        confNa: "ਇਸ ਭਵਿੱਖਬਾਣੀ ਲਈ ਭਰੋਸਾ ਸਕੋਰ ਉਪਲਬਧ ਨਹੀਂ।",
        disclaimerStrong: "ਜ਼ਰੂਰੀ:",
        disclaimerBody: "Kisan Vision AI ਸਿਰਫ਼ ਇੱਕ ਸਕ੍ਰੀਨਿੰਗ ਅਤੇ ਫੈਸਲੇ-ਸਹਾਇਕ ਨਤੀਜਾ ਦਿੰਦਾ ਹੈ। ਕੋਈ ਇਲਾਜ ਲਾਗੂ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਯੋਗ ਖੇਤੀ ਮਾਹਿਰ ਤੋਂ ਪੁਸ਼ਟੀ ਕਰੋ ਅਤੇ ਸਥਾਨਕ ਖੇਤੀ ਦਿਸ਼ਾ-ਨਿਰਦੇਸ਼ ਅਤੇ ਉਤਪਾਦ ਲੇਬਲ ਦੀ ਪਾਲਣਾ ਕਰੋ।",
        resetBtn: "ਹੋਰ ਫਸਲ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ",
        errAtLeastOne: "ਕਿਰਪਾ ਕਰਕੇ ਘੱਟੋ-ਘੱਟ ਇੱਕ ਫਸਲ ਦੀ ਤਸਵੀਰ ਚੁਣੋ।",
        errMax: "ਕਿਰਪਾ ਕਰਕੇ 3 ਤੋਂ ਵੱਧ ਤਸਵੀਰਾਂ ਅਪਲੋਡ ਨਾ ਕਰੋ।",
        errRemaining: "ਤੁਸੀਂ ਹੋਰ {n} ਤਸਵੀਰਾਂ ਜੋੜ ਸਕਦੇ ਹੋ। ਵੱਧ ਤੋਂ ਵੱਧ 3 ਦੀ ਇਜਾਜ਼ਤ।",
        errUnsupported: "ਅਸਮਰਥਿਤ ਫਾਈਲ ਕਿਸਮ। ਕਿਰਪਾ ਕਰਕੇ ਸਿਰਫ਼ JPG, PNG ਜਾਂ WEBP ਤਸਵੀਰਾਂ ਅਪਲੋਡ ਕਰੋ।",
        errTooLarge: "ਹਰੇਕ ਤਸਵੀਰ 10 MB ਤੋਂ ਛੋਟੀ ਹੋਣੀ ਚਾਹੀਦੀ ਹੈ।",
        errInvalid: "ਗਲਤ ਫਾਈਲ।",
        errNotConfigured: "AI ਸੇਵਾ ਅਜੇ ਕੌਂਫਿਗਰ ਨਹੀਂ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ detectdisease.js ਵਿੱਚ ਬੈਕਐਂਡ API URL ਸ਼ਾਮਲ ਕਰੋ।",
        errInvalidResp: "AI ਸੇਵਾ ਤੋਂ ਅਣਪਛਾਤਾ ਜਵਾਬ ਮਿਲਿਆ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
        errServer: "ਤਸਵੀਰਾਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰਦਿਆਂ ਕੋਈ ਗਲਤੀ ਹੋਈ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
        errNetwork: "AI ਸੇਵਾ ਨਾਲ ਸੰਪਰਕ ਨਹੀਂ ਹੋ ਰਿਹਾ। ਕਿਰਪਾ ਕਰਕੇ ਬਾਅਦ ਵਿੱਚ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
        errEmpty: "AI ਇਨ੍ਹਾਂ ਤਸਵੀਰਾਂ ਤੋਂ ਭਵਿੱਖਬਾਣੀ ਨਹੀਂ ਕਰ ਸਕਿਆ। ਕਿਰਪਾ ਕਰਕੇ ਸਾਫ਼ ਤਸਵੀਰਾਂ ਵਰਤੋ।",
      },
    },

    gu: {
      common: {
        home: "હોમ",
        howItWorks: "આ કેવી રીતે કામ કરે છે",
        detectDisease: "રોગ ઓળખો",
        farmingGuide: "ખેતી માર્ગદર્શિકા",
        blog: "બ્લોગ",
        contact: "સંપર્ક",
        login: "લૉગિન",
        language: "ભાષા",
        chatbotTitle: "ચેટબોટ (ટૂંક સમયમાં)",
        chatbotSoon: "ચેટબોટ ટૂંક સમયમાં ઉપલબ્ધ થશે.",
      },
      footer: {
        explore: "શોધો",
        support: "સહાય",
        tagline: "કુદરતી રીતે, સ્માર્ટ ખેતી.",
        copyright: "© 2026 Kisan Vision. તમામ હકો સુરક્ષિત.",
      },
      howitworks: {
        heroEyebrow: "ખેતરથી બુદ્ધિ સુધી",
        heroTitleLead: "પાકની સંભાળને બનાવો",
        heroTitleAccent: "સ્માર્ટ ખેતી",
        heroLead: "Kisan Vision ખરી ખેતીની જાણકારી અને AI ની શક્તિ ને જોડીને તમારા પાકને વધુ સારી રીતે સમજવામાં અને યોગ્ય નિર્ણય લેવામાં મદદ કરે છે.",
        heroCta: "અમારો અભિગમ જુઓ",
        processEyebrow: "Kisan Vision કેવી રીતે કામ કરે છે",
        processTitle: "ખેતરથી બહેતર ખેતી સુધી — 5 પગલાંમાં",
        processSub: "તમારા પાકથી ઉપયોગી જાણકારી સુધીની જોડાયેલી યાત્રા.",
        step1Title: "ખેતર",
        step1Body: "ખરા પાક, તમારા ખેતરની ખરી પડકારો.",
        step2Title: "ડેટા",
        step2Body: "પાકની તસવીરો અને સંબંધિત જાણકારી.",
        step3Title: "AI વિશ્લેષણ",
        step3Body: "અમારું AI પેટર્ન ઓળખીને મુખ્ય લક્ષણો શોધે છે.",
        step4Title: "સમજ",
        step4Body: "સ્પષ્ટ અને સરળતાથી સમજી શકાય તેવી માહિતી મેળવો.",
        step5Title: "બહેતર ખેતી",
        step5Body: "તંદુરસ્ત પાક અને વધુ ઉત્પાદન માટે યોગ્ય પગલાં લો.",
        supKnowTitle: "ઉપયોગી જ્ઞાન",
        supKnowBody: "ખરી ખેતીની જરૂરિયાતો અને નિષ્ણાતોની સમજ પર આધારિત.",
        supSimpleTitle: "સરળ અને સ્પષ્ટ",
        supSimpleBody: "જટિલ માહિતી સરળ ભાષામાં.",
        supFarmersTitle: "ખેડૂતો માટે બનાવેલ",
        supFarmersBody: "દરેક પગલે ખેડૂતોને મદદ કરવા માટે.",
        supHealthTitle: "તંદુરસ્ત આવતીકાલ",
        supHealthBody: "વધુ સારા ઉત્પાદન સાથે ઉજ્જવળ ભવિષ્ય તરફ.",
        videosEyebrow: "ટ્યુટોરિયલ",
        videosTitle: "કેટલીક મિનિટોમાં Kisan Vision શીખો",
        videosSub: "Kisan Vision ના સાધનો વાપરવામાં મદદ કરતી સરળ વિડિઓ માર્ગદર્શિકાઓ.",
        video1: "પાકનો રોગ કેવી રીતે ઓળખવો",
        video2: "પાંદડાંની તસવીરો કેવી રીતે અપલોડ અને વિશ્લેષણ કરવી",
        video3: "ખેતી માર્ગદર્શિકા કેવી રીતે વાપરવી",
        video4: "તમારા AI પરિણામ સમજો",
        videoSoon: "વિડિઓ ટૂંક સમયમાં આવી રહ્યો છે",
      },
      detect: {
        heroEyebrow: "AI-આધારિત પાક આરોગ્ય",
        heroTitle: "પાકનો રોગ ઓળખો",
        heroSubtitle: "વધુ સારી AI વિશ્લેષણ માટે એક જ પાંદડાની 1 થી 3 સ્પષ્ટ તસવીરો અપલોડ કરો",
        dropTitle: "પાંદડાંની તસવીરો અહીં મૂકો અથવા બ્રાઉઝ કરવા ક્લિક કરો",
        dropHint: "JPG, PNG અથવા WEBP · વધુમાં વધુ 3 તસવીરો · દરેક 10 MB",
        dropBrowse: "તસવીરો પસંદ કરો",
        dropAria: "પાંદડાંની તસવીરો અપલોડ કરો. ક્લિક કરો અથવા ખેંચી ને મૂકો.",
        selectedTitle: "પસંદ કરેલી તસવીરો",
        addMore: "+ વધુ તસવીરો ઉમેરો",
        removeAll: "તસવીરો દૂર કરો",
        analyzeBtn: "પાંદડાંનું વિશ્લેષણ કરો",
        analyzeLoading: "તમારા પાકનું વિશ્લેષણ થઈ રહ્યું છે...",
        resultBadge: "AI વિશ્લેષણ પૂરું થયું",
        resultTitle: "ઓળખ પરિણામ",
        labelCrop: "પાક",
        labelDisease: "રોગ / સ્થિતિ",
        labelConfidence: "AI વિશ્વાસ",
        aboutTitle: "સ્થિતિ વિશે",
        aboutEmpty: "આ સ્થિતિ માટે કોઈ વર્ણન ઉપલબ્ધ નથી.",
        symptomsTitle: "લક્ષણો",
        symptomsEmpty: "આ આગાહી માટે કોઈ ચોક્કસ લક્ષણો ઉપલબ્ધ નથી.",
        manageTitle: "ભલામણ કરેલ વ્યવસ્થાપન",
        manageEmpty: "કોઈ વ્યવસ્થાપન ભલામણ ઉપલબ્ધ નથી.",
        treatTitle: "સારવાર માર્ગદર્શન",
        treatEmpty: "કોઈ ચોક્કસ સારવાર માર્ગદર્શન ઉપલબ્ધ નથી. સ્થાનિક કૃષિ નિષ્ણાતનો સંપર્ક કરો.",
        altTitle: "વૈકલ્પિક આગાહીઓ",
        altSub: "AI મોડેલ દ્વારા વિચારેલી અન્ય શક્યતાઓ",
        altEmpty: "કોઈ વૈકલ્પિક આગાહીઓ મળી નહીં.",
        confHigh: "AI મોડેલ આ આગાહી પર ખૂબ ભરોસો ધરાવે છે.",
        confMed: "AI મોડેલ આ આગાહી પર મધ્યમ ભરોસો ધરાવે છે.",
        confLow: "AI મોડેલનો ભરોસો ઓછો છે. કૃપા કરી સ્પષ્ટ તસવીરો અપલોડ કરો.",
        confNa: "આ આગાહી માટે વિશ્વાસ ગુણ ઉપલબ્ધ નથી.",
        disclaimerStrong: "મહત્વપૂર્ણ:",
        disclaimerBody: "Kisan Vision AI માત્ર સ્ક્રીનિંગ અને નિર્ણય-સહાય પરિણામ આપે છે. કોઈપણ સારવાર લાગુ કરતાં પહેલાં લાયક કૃષિ નિષ્ણાત પાસેથી નિદાનની ખાતરી કરો અને સ્થાનિક કૃષિ માર્ગદર્શન અને ઉત્પાદન લેબલનું પાલન કરો.",
        resetBtn: "બીજા પાકનું વિશ્લેષણ કરો",
        errAtLeastOne: "કૃપા કરી ઓછામાં ઓછી એક પાકની તસવીર પસંદ કરો.",
        errMax: "કૃપા કરી 3 થી વધુ તસવીરો અપલોડ ન કરો.",
        errRemaining: "તમે વધુ {n} તસવીરો ઉમેરી શકો છો. વધુમાં વધુ 3 ની મંજૂરી.",
        errUnsupported: "અસમર્થિત ફાઇલ પ્રકાર. કૃપા કરી માત્ર JPG, PNG અથવા WEBP તસવીરો અપલોડ કરો.",
        errTooLarge: "દરેક તસવીર 10 MB થી નાની હોવી જોઈએ.",
        errInvalid: "અમાન્ય ફાઇલ.",
        errNotConfigured: "AI સેવા હજી ગોઠવાઈ નથી. કૃપા કરી detectdisease.js માં બેકએન્ડ API URL ઉમેરો.",
        errInvalidResp: "AI સેવા તરફથી અનપેક્ષિત જવાબ મળ્યો. કૃપા કરી ફરી પ્રયાસ કરો.",
        errServer: "તસવીરોનું વિશ્લેષણ કરતી વખતે કંઈક ખોટું થયું. કૃપા કરી ફરી પ્રયાસ કરો.",
        errNetwork: "AI સેવા સાથે જોડાઈ શકાતું નથી. કૃપા કરી પછી પ્રયાસ કરો.",
        errEmpty: "AI આ તસવીરો પરથી આગાહી કરી શક્યું નહીં. કૃપા કરી સ્પષ્ટ તસવીરો અજમાવો.",
      },
    },
  };

  // ============================================================
  // STATIC TEXT TRANSLATIONS (shared across all pages)
  // ============================================================
  const textTranslations = {
  "en": {
    "Home": "Home",
    "How It Works": "How It Works",
    "Detect Disease": "Detect Disease",
    "Farming Guide": "Farming Guide",
    "Blog": "Blog",
    "Contact": "Contact",
    "English": "English",
    "Login": "Login",
    "Language": "Language",
    "Smart farming knowledge": "Smart farming knowledge",
    "Smarter farming, naturally.": "Smarter farming, naturally.",
    "AI-powered crop care": "AI-powered crop care",
    "Protect your crops with": "Protect your crops with",
    "AI-powered detection.": "AI-powered detection.",
    "Spot crop diseases early. Upload a photo of your plant and get clear, practical guidance to help your farm thrive.": "Spot crop diseases early. Upload a photo of your plant and get clear, practical guidance to help your farm thrive.",
    "Detect Crop Disease": "Detect Crop Disease",
    "Learn how it works": "Learn how it works",
    "Trusted by 12,000+ farmers": "Trusted by 12,000+ farmers",
    "making smarter crop decisions": "making smarter crop decisions",
    "Healthy crop insight": "Healthy crop insight",
    "Early action. Better harvest.": "Early action. Better harvest.",
    "Simple for every farmer": "Simple for every farmer",
    "Private & secure": "Private & secure",
    "Built for real fields": "Built for real fields",
    "START WITH A PHOTO": "START WITH A PHOTO",
    "A second pair of eyes for every leaf.": "A second pair of eyes for every leaf.",
    "Upload a clear crop image and get an easy-to-understand health check in moments.": "Upload a clear crop image and get an easy-to-understand health check in moments.",
    "Drop a crop photo here": "Drop a crop photo here",
    "or choose an image from your phone": "or choose an image from your phone",
    "⌁ Choose crop photo": "⌁ Choose crop photo",
    "✓ Your photo stays private and secure": "✓ Your photo stays private and secure",
    "MORE THAN A DIAGNOSIS": "MORE THAN A DIAGNOSIS",
    "Good advice should feel as natural as a walk through your field.": "Good advice should feel as natural as a walk through your field.",
    "From the first spot on a leaf to your next harvest, Kisan Vision turns complex crop science into steps you can act on.": "From the first spot on a leaf to your next harvest, Kisan Vision turns complex crop science into steps you can act on.",
    "Clear answers": "Clear answers",
    "No confusing science-speak.": "No confusing science-speak.",
    "Practical next steps": "Practical next steps",
    "Guidance made for your farm.": "Guidance made for your farm.",
    "Check a crop now →": "Check a crop now →",
    "GROW WITH CONFIDENCE": "GROW WITH CONFIDENCE",
    "Healthier fields start with one small step.": "Healthier fields start with one small step.",
    "Make every season a little more informed with Kisan Vision.": "Make every season a little more informed with Kisan Vision.",
    "Try crop detection →": "Try crop detection →",
    "FROM FIELD TO INTELLIGENCE": "FROM FIELD TO INTELLIGENCE",
    "Turning Crop Care into": "Turning Crop Care into",
    "Smarter Farming": "Smarter Farming",
    "Kisan Vision combines real farming knowledge with the power of AI to help you understand your crops better and make informed decisions.": "Kisan Vision combines real farming knowledge with the power of AI to help you understand your crops better and make informed decisions.",
    "Explore Our Approach": "Explore Our Approach",
    "HOW KISAN VISION WORKS": "HOW KISAN VISION WORKS",
    "From Field to Better Farming — In 5 Steps": "From Field to Better Farming — In 5 Steps",
    "A connected journey from your crops to actionable insights.": "A connected journey from your crops to actionable insights.",
    "FIELD": "FIELD",
    "DATA": "DATA",
    "AI ANALYSIS": "AI ANALYSIS",
    "INSIGHT": "INSIGHT",
    "BETTER FARMING": "BETTER FARMING",
    "Real crops, real challenges from your farm.": "Real crops, real challenges from your farm.",
    "Crop images and relevant information.": "Crop images and relevant information.",
    "Our AI analyses patterns and detects key signs.": "Our AI analyses patterns and detects key signs.",
    "Get clear and easy-to-understand information.": "Get clear and easy-to-understand information.",
    "Take the right steps for a healthier and higher yield.": "Take the right steps for a healthier and higher yield.",
    "Knowledge": "Knowledge",
    "That Works": "That Works",
    "Based on real farming needs and expert insights.": "Based on real farming needs and expert insights.",
    "Simple": "Simple",
    "and Clear": "and Clear",
    "Complex information in easy language.": "Complex information in easy language.",
    "Built for": "Built for",
    "Farmers": "Farmers",
    "Designed to support farmers at every step.": "Designed to support farmers at every step.",
    "A Healthier": "A Healthier",
    "Tomorrow": "Tomorrow",
    "Helping you grow better, for a brighter future.": "Helping you grow better, for a brighter future.",
    "TUTORIALS": "TUTORIALS",
    "Learn Kisan Vision in Minutes": "Learn Kisan Vision in Minutes",
    "Simple video guides to help you use Kisan Vision tools with confidence.": "Simple video guides to help you use Kisan Vision tools with confidence.",
    "How to Detect Crop Disease": "How to Detect Crop Disease",
    "How to Upload and Analyze Leaf Images": "How to Upload and Analyze Leaf Images",
    "How to Use the Farming Guide": "How to Use the Farming Guide",
    "Understanding Your AI Results": "Understanding Your AI Results",
    "Video Coming Soon": "Video Coming Soon",
    "AI-Powered Crop Health": "AI-Powered Crop Health",
    "Upload 1 to 3 clear images of the same leaf for better AI analysis": "Upload 1 to 3 clear images of the same leaf for better AI analysis",
    "Drop leaf images here or click to browse": "Drop leaf images here or click to browse",
    "JPG, PNG, or WEBP · Up to 3 images · 10 MB each": "JPG, PNG, or WEBP · Up to 3 images · 10 MB each",
    "Choose Images": "Choose Images",
    "Selected Images": "Selected Images",
    "+ Add More Images": "+ Add More Images",
    "Remove Images": "Remove Images",
    "Analyze Leaves": "Analyze Leaves",
    "Analyzing your crop...": "Analyzing your crop...",
    "AI ANALYSIS COMPLETE": "AI ANALYSIS COMPLETE",
    "Detection Result": "Detection Result",
    "CROP": "CROP",
    "DISEASE / CONDITION": "DISEASE / CONDITION",
    "AI CONFIDENCE": "AI CONFIDENCE",
    "About the Condition": "About the Condition",
    "Symptoms": "Symptoms",
    "Recommended Management": "Recommended Management",
    "Treatment Guidance": "Treatment Guidance",
    "Alternative Predictions": "Alternative Predictions",
    "Other possibilities considered by the AI model": "Other possibilities considered by the AI model",
    "Analyze Another Crop": "Analyze Another Crop",
    "Find the Right Guide": "Find the Right Guide",
    "for Your Crop": "for Your Crop",
    "Choose a crop to discover practical information about cultivation, watering, nutrients, common problems and crop care.": "Choose a crop to discover practical information about cultivation, watering, nutrients, common problems and crop care.",
    "Wheat": "Wheat",
    "Rice": "Rice",
    "Tomato": "Tomato",
    "Potato": "Potato",
    "Maize": "Maize",
    "Cotton": "Cotton",
    "Rabi": "Rabi",
    "Kharif": "Kharif",
    "Zaid": "Zaid",
    "View Guide": "View Guide",
    "The strong-crop basics": "The strong-crop basics",
    "Essential Farming Practices": "Essential Farming Practices",
    "Small, consistent choices can make a big difference to your soil, plants and harvest.": "Small, consistent choices can make a big difference to your soil, plants and harvest.",
    "Soil Health": "Soil Health",
    "Irrigation": "Irrigation",
    "Fertilizer Management": "Fertilizer Management",
    "Pest Management": "Pest Management",
    "Learn more": "Learn more",
    "Plan with the calendar": "Plan with the calendar",
    "Farming Tips for Every Season": "Farming Tips for Every Season",
    "Match your fieldwork to the season and give every crop the right start, support and finish.": "Match your fieldwork to the season and give every crop the right start, support and finish.",
    "Explore Tips": "Explore Tips",
    "Your field companion": "Your field companion",
    "Simple Steps for Healthier Crops": "Simple Steps for Healthier Crops",
    "Season readiness": "Season readiness",
    "Reset checklist": "Reset checklist",
    "Not Sure What's Wrong With Your Crop?": "Not Sure What's Wrong With Your Crop?",
    "Upload a photo of your crop and let Kisan Vision help identify possible crop diseases.": "Upload a photo of your crop and let Kisan Vision help identify possible crop diseases.",
    "KISAN VISION BLOG": "KISAN VISION BLOG",
    "Learn. Grow.": "Learn. Grow.",
    "Harvest Better.": "Harvest Better.",
    "Practical farming tips, crop-care knowledge and AI-powered insights to help you protect your crops and make smarter farming decisions.": "Practical farming tips, crop-care knowledge and AI-powered insights to help you protect your crops and make smarter farming decisions.",
    "All": "All",
    "Crop Disease": "Crop Disease",
    "Smart Farming": "Smart Farming",
    "Crop Care": "Crop Care",
    "AI & Technology": "AI & Technology",
    "Seasonal Tips": "Seasonal Tips",
    "Search farming articles...": "Search farming articles...",
    "Early Signs of Crop Disease You Should Never Ignore": "Early Signs of Crop Disease You Should Never Ignore",
    "Read Article": "Read Article",
    "Latest Articles": "Latest Articles",
    "Simple and useful knowledge for better farming.": "Simple and useful knowledge for better farming.",
    "Read More": "Read More",
    "NEED HELP WITH YOUR CROP?": "NEED HELP WITH YOUR CROP?",
    "Don't just read about it. Check your crop.": "Don't just read about it. Check your crop.",
    "Upload a photo and let Kisan Vision help identify possible crop diseases.": "Upload a photo and let Kisan Vision help identify possible crop diseases.",
    "Let's Grow": "Let's Grow",
    "Together": "Together",
    "Have a question, suggestion, or just want to say hello? We're here to help you on your farming journey.": "Have a question, suggestion, or just want to say hello? We're here to help you on your farming journey.",
    "Quick Response": "Quick Response",
    "Farmer First": "Farmer First",
    "Always Here": "Always Here",
    "Your feedback": "Your feedback",
    "helps us grow": "helps us grow",
    "and serve better.": "and serve better.",
    "CALL US": "CALL US",
    "EMAIL US": "EMAIL US",
    "We reply within 24 hours": "We reply within 24 hours",
    "VISIT US": "VISIT US",
    "LIVE CHAT": "LIVE CHAT",
    "Chat with our support team": "Chat with our support team",
    "Start Chat →": "Start Chat →",
    "Send Us a Message": "Send Us a Message",
    "Fill out the form and we'll get back to you soon.": "Fill out the form and we'll get back to you soon.",
    "Your Name *": "Your Name *",
    "Your Email *": "Your Email *",
    "Phone Number": "Phone Number",
    "Subject *": "Subject *",
    "Select a subject": "Select a subject",
    "General Inquiry": "General Inquiry",
    "AI Disease Detection": "AI Disease Detection",
    "Farming Guidance": "Farming Guidance",
    "Technical Support": "Technical Support",
    "Partnership": "Partnership",
    "Other": "Other",
    "Message *": "Message *",
    "Send Message →": "Send Message →",
    "Our Location": "Our Location",
    "Frequently Asked Questions": "Frequently Asked Questions",
    "Quick answers to common questions.": "Quick answers to common questions.",
    "Our Farming Experts": "Our Farming Experts",
    "Talk to people who know the soil.": "Talk to people who know the soil.",
    "Experienced Farmer": "Experienced Farmer",
    "Contact →": "Contact →",
    "Need personalized advice?": "Need personalized advice?",
    "Connect with our experts and get guidance for your crops.": "Connect with our experts and get guidance for your crops.",
    "Still have questions?": "Still have questions?",
    "Our team is always ready to help you.": "Our team is always ready to help you.",
    "Talk to Our Team →": "Talk to Our Team →",
    "FOR A HEALTHIER TOMORROW": "FOR A HEALTHIER TOMORROW",
    "Empowering": "Empowering",
    "Farmers with": "Farmers with",
    "Smart Solutions": "Smart Solutions",
    "Join Kisan Vision to access AI-powered crop insights, expert advice and modern farming resources — all in one place.": "Join Kisan Vision to access AI-powered crop insights, expert advice and modern farming resources — all in one place.",
    "Detect crop diseases": "Detect crop diseases",
    "Upload a photo and get instant AI insights": "Upload a photo and get instant AI insights",
    "Learn modern farming": "Learn modern farming",
    "Step-by-step guides for better yield": "Step-by-step guides for better yield",
    "Connect with experts": "Connect with experts",
    "Get support from farming professionals": "Get support from farming professionals",
    "Stronger Farmers’": "Stronger Farmers’",
    "Greener Future": "Greener Future",
    "Welcome Back": "Welcome Back",
    "Login to your Kisan Vision account and continue your journey towards smarter farming.": "Login to your Kisan Vision account and continue your journey towards smarter farming.",
    "E-mail Address": "E-mail Address",
    "Password": "Password",
    "Forgot Password?": "Forgot Password?",
    "Don’t have an account?": "Don’t have an account?",
    "Sign Up": "Sign Up",
    "Using technology to support farmers, protect crops and build a healthier, greener tomorrow.": "Using technology to support farmers, protect crops and build a healthier, greener tomorrow.",
    "Quick Links": "Quick Links",
    "Support": "Support",
    "Help Center": "Help Center",
    "FAQs": "FAQs",
    "Privacy Policy": "Privacy Policy",
    "Terms of Service": "Terms of Service",
    "Newsletter": "Newsletter",
    "Get the latest farming tips and updates.": "Get the latest farming tips and updates."
  },
  "hi": {
    "Home": "होम",
    "How It Works": "यह कैसे काम करता है",
    "Detect Disease": "रोग पहचानें",
    "Farming Guide": "खेती गाइड",
    "Blog": "ब्लॉग",
    "Contact": "संपर्क",
    "English": "हिन्दी",
    "Login": "लॉगिन",
    "Language": "भाषा",
    "Smart farming knowledge": "स्मार्ट खेती का ज्ञान",
    "Smarter farming, naturally.": "बेहतर खेती, प्राकृतिक तरीके से।",
    "AI-powered crop care": "AI आधारित फसल देखभाल",
    "Protect your crops with": "अपनी फसलों की सुरक्षा करें",
    "AI-powered detection.": "AI आधारित पहचान के साथ।",
    "Spot crop diseases early. Upload a photo of your plant and get clear, practical guidance to help your farm thrive.": "फसल रोगों को जल्दी पहचानें। अपने पौधे की तस्वीर अपलोड करें और खेती के लिए स्पष्ट व उपयोगी सलाह पाएं।",
    "Detect Crop Disease": "फसल रोग पहचानें",
    "Learn how it works": "यह कैसे काम करता है जानें",
    "Trusted by 12,000+ farmers": "12,000+ किसानों का भरोसा",
    "making smarter crop decisions": "बेहतर फसल निर्णय लेने में मदद",
    "Healthy crop insight": "स्वस्थ फसल की जानकारी",
    "Early action. Better harvest.": "समय पर कदम। बेहतर पैदावार।",
    "Simple for every farmer": "हर किसान के लिए आसान",
    "Private & secure": "निजी और सुरक्षित",
    "Built for real fields": "असली खेतों के लिए बनाया गया",
    "START WITH A PHOTO": "एक तस्वीर से शुरू करें",
    "A second pair of eyes for every leaf.": "हर पत्ती के लिए एक दूसरी नज़र।",
    "Upload a clear crop image and get an easy-to-understand health check in moments.": "फसल की साफ तस्वीर अपलोड करें और कुछ ही क्षणों में आसान स्वास्थ्य जांच पाएं।",
    "Drop a crop photo here": "फसल की तस्वीर यहाँ छोड़ें",
    "or choose an image from your phone": "या अपने फोन से तस्वीर चुनें",
    "⌁ Choose crop photo": "⌁ फसल की तस्वीर चुनें",
    "✓ Your photo stays private and secure": "✓ आपकी तस्वीर निजी और सुरक्षित रहती है",
    "MORE THAN A DIAGNOSIS": "सिर्फ पहचान से आगे",
    "Good advice should feel as natural as a walk through your field.": "अच्छी सलाह आपके खेत में चलने जितनी सहज होनी चाहिए।",
    "From the first spot on a leaf to your next harvest, Kisan Vision turns complex crop science into steps you can act on.": "पत्ती पर पहली समस्या से अगली फसल तक, Kisan Vision जटिल कृषि विज्ञान को ऐसे कदमों में बदलता है जिन पर आप अमल कर सकते हैं।",
    "Clear answers": "स्पष्ट जवाब",
    "No confusing science-speak.": "कोई उलझाने वाली वैज्ञानिक भाषा नहीं।",
    "Practical next steps": "व्यावहारिक अगले कदम",
    "Guidance made for your farm.": "आपके खेत के लिए बनाई गई सलाह।",
    "Check a crop now →": "अभी फसल जांचें →",
    "GROW WITH CONFIDENCE": "आत्मविश्वास के साथ खेती करें",
    "Healthier fields start with one small step.": "स्वस्थ खेत एक छोटे कदम से शुरू होते हैं।",
    "Make every season a little more informed with Kisan Vision.": "Kisan Vision के साथ हर मौसम को थोड़ा अधिक जानकारीपूर्ण बनाएं।",
    "Try crop detection →": "फसल पहचान आज़माएं →",
    "FROM FIELD TO INTELLIGENCE": "खेत से बुद्धिमत्ता तक",
    "Turning Crop Care into": "फसल की देखभाल को बनाइए",
    "Smarter Farming": "स्मार्ट खेती",
    "Kisan Vision combines real farming knowledge with the power of AI to help you understand your crops better and make informed decisions.": "Kisan Vision वास्तविक खेती के ज्ञान को AI की शक्ति के साथ जोड़कर आपकी फसल को बेहतर समझने और सही निर्णय लेने में मदद करता है।",
    "Explore Our Approach": "हमारा तरीका देखें",
    "HOW KISAN VISION WORKS": "Kisan Vision कैसे काम करता है",
    "From Field to Better Farming — In 5 Steps": "खेत से बेहतर खेती तक — 5 चरणों में",
    "A connected journey from your crops to actionable insights.": "आपकी फसल से उपयोगी जानकारी तक की एक जुड़ी हुई यात्रा।",
    "FIELD": "खेत",
    "DATA": "डेटा",
    "AI ANALYSIS": "AI विश्लेषण",
    "INSIGHT": "जानकारी",
    "BETTER FARMING": "बेहतर खेती",
    "Real crops, real challenges from your farm.": "असली फसलें, आपके खेत की असली चुनौतियाँ।",
    "Crop images and relevant information.": "फसल की तस्वीरें और जरूरी जानकारी।",
    "Our AI analyses patterns and detects key signs.": "हमारा AI पैटर्न का विश्लेषण करके मुख्य संकेत पहचानता है।",
    "Get clear and easy-to-understand information.": "स्पष्ट और आसानी से समझ आने वाली जानकारी पाएं।",
    "Take the right steps for a healthier and higher yield.": "स्वस्थ फसल और अधिक पैदावार के लिए सही कदम उठाएं।",
    "Knowledge": "ज्ञान",
    "That Works": "जो काम आए",
    "Based on real farming needs and expert insights.": "असली खेती की जरूरतों और विशेषज्ञों की समझ पर आधारित।",
    "Simple": "आसान",
    "and Clear": "और स्पष्ट",
    "Complex information in easy language.": "जटिल जानकारी सरल भाषा में।",
    "Built for": "के लिए बनाया गया",
    "Farmers": "किसानों",
    "Designed to support farmers at every step.": "हर कदम पर किसानों की मदद के लिए बनाया गया।",
    "A Healthier": "एक स्वस्थ",
    "Tomorrow": "कल",
    "Helping you grow better, for a brighter future.": "बेहतर उगाने और उज्ज्वल भविष्य के लिए आपकी मदद करना।",
    "TUTORIALS": "ट्यूटोरियल",
    "Learn Kisan Vision in Minutes": "कुछ ही मिनटों में Kisan Vision सीखें",
    "Simple video guides to help you use Kisan Vision tools with confidence.": "Kisan Vision के टूल्स को आत्मविश्वास से इस्तेमाल करने में मदद करने वाले आसान वीडियो गाइड।",
    "How to Detect Crop Disease": "फसल रोग कैसे पहचानें",
    "How to Upload and Analyze Leaf Images": "पत्ती की तस्वीरें कैसे अपलोड और विश्लेषण करें",
    "How to Use the Farming Guide": "खेती गाइड का उपयोग कैसे करें",
    "Understanding Your AI Results": "अपने AI परिणाम को समझें",
    "Video Coming Soon": "वीडियो जल्द आ रहा है",
    "AI-Powered Crop Health": "AI आधारित फसल स्वास्थ्य",
    "Upload 1 to 3 clear images of the same leaf for better AI analysis": "बेहतर AI विश्लेषण के लिए एक ही पत्ती की 1 से 3 साफ तस्वीरें अपलोड करें",
    "Drop leaf images here or click to browse": "पत्ती की तस्वीरें यहाँ छोड़ें या चुनने के लिए क्लिक करें",
    "JPG, PNG, or WEBP · Up to 3 images · 10 MB each": "JPG, PNG या WEBP · अधिकतम 3 तस्वीरें · प्रत्येक 10 MB तक",
    "Choose Images": "तस्वीरें चुनें",
    "Selected Images": "चुनी गई तस्वीरें",
    "+ Add More Images": "+ और तस्वीरें जोड़ें",
    "Remove Images": "तस्वीरें हटाएँ",
    "Analyze Leaves": "पत्तियों का विश्लेषण करें",
    "Analyzing your crop...": "आपकी फसल का विश्लेषण हो रहा है...",
    "AI ANALYSIS COMPLETE": "AI विश्लेषण पूरा हुआ",
    "Detection Result": "पहचान परिणाम",
    "CROP": "फसल",
    "DISEASE / CONDITION": "रोग / स्थिति",
    "AI CONFIDENCE": "AI विश्वास स्तर",
    "About the Condition": "स्थिति के बारे में",
    "Symptoms": "लक्षण",
    "Recommended Management": "अनुशंसित प्रबंधन",
    "Treatment Guidance": "उपचार सलाह",
    "Alternative Predictions": "वैकल्पिक भविष्यवाणियाँ",
    "Other possibilities considered by the AI model": "AI मॉडल द्वारा विचार की गई अन्य संभावनाएँ",
    "Analyze Another Crop": "दूसरी फसल का विश्लेषण करें",
    "Find the Right Guide": "सही गाइड खोजें",
    "for Your Crop": "अपनी फसल के लिए",
    "Choose a crop to discover practical information about cultivation, watering, nutrients, common problems and crop care.": "खेती, पानी, पोषक तत्वों, सामान्य समस्याओं और फसल देखभाल की उपयोगी जानकारी पाने के लिए फसल चुनें।",
    "Wheat": "गेहूं",
    "Rice": "चावल",
    "Tomato": "टमाटर",
    "Potato": "आलू",
    "Maize": "मक्का",
    "Cotton": "कपास",
    "Rabi": "रबी",
    "Kharif": "खरीफ",
    "Zaid": "जायद",
    "View Guide": "गाइड देखें",
    "The strong-crop basics": "मजबूत फसल की बुनियाद",
    "Essential Farming Practices": "जरूरी खेती के तरीके",
    "Small, consistent choices can make a big difference to your soil, plants and harvest.": "छोटे और लगातार सही फैसले मिट्टी, पौधों और पैदावार में बड़ा फर्क ला सकते हैं।",
    "Soil Health": "मिट्टी का स्वास्थ्य",
    "Irrigation": "सिंचाई",
    "Fertilizer Management": "उर्वरक प्रबंधन",
    "Pest Management": "कीट प्रबंधन",
    "Learn more": "और जानें",
    "Plan with the calendar": "कैलेंडर के साथ योजना बनाएं",
    "Farming Tips for Every Season": "हर मौसम के लिए खेती के सुझाव",
    "Match your fieldwork to the season and give every crop the right start, support and finish.": "अपने खेत के काम को मौसम के अनुसार रखें और हर फसल को सही शुरुआत, देखभाल और समापन दें।",
    "Explore Tips": "सुझाव देखें",
    "Your field companion": "आपके खेत का साथी",
    "Simple Steps for Healthier Crops": "स्वस्थ फसलों के लिए आसान कदम",
    "Season readiness": "मौसम की तैयारी",
    "Reset checklist": "चेकलिस्ट रीसेट करें",
    "Not Sure What's Wrong With Your Crop?": "पता नहीं आपकी फसल में क्या समस्या है?",
    "Upload a photo of your crop and let Kisan Vision help identify possible crop diseases.": "अपनी फसल की तस्वीर अपलोड करें और Kisan Vision को संभावित रोग पहचानने दें।",
    "KISAN VISION BLOG": "KISAN VISION ब्लॉग",
    "Learn. Grow.": "सीखें। बढ़ें।",
    "Harvest Better.": "बेहतर पैदावार पाएं।",
    "Practical farming tips, crop-care knowledge and AI-powered insights to help you protect your crops and make smarter farming decisions.": "अपनी फसलों की सुरक्षा और बेहतर निर्णयों के लिए व्यावहारिक खेती सुझाव, फसल देखभाल ज्ञान और AI आधारित जानकारी पाएं।",
    "All": "सभी",
    "Crop Disease": "फसल रोग",
    "Smart Farming": "स्मार्ट खेती",
    "Crop Care": "फसल देखभाल",
    "AI & Technology": "AI और तकनीक",
    "Seasonal Tips": "मौसमी सुझाव",
    "Search farming articles...": "खेती के लेख खोजें...",
    "Early Signs of Crop Disease You Should Never Ignore": "फसल रोग के शुरुआती संकेत जिन्हें कभी नज़रअंदाज़ न करें",
    "Read Article": "लेख पढ़ें",
    "Latest Articles": "नवीनतम लेख",
    "Simple and useful knowledge for better farming.": "बेहतर खेती के लिए सरल और उपयोगी ज्ञान।",
    "Read More": "और पढ़ें",
    "NEED HELP WITH YOUR CROP?": "अपनी फसल के लिए मदद चाहिए?",
    "Don't just read about it. Check your crop.": "सिर्फ पढ़ें नहीं। अपनी फसल जांचें।",
    "Upload a photo and let Kisan Vision help identify possible crop diseases.": "तस्वीर अपलोड करें और Kisan Vision को संभावित फसल रोग पहचानने दें।",
    "Let's Grow": "आइए बढ़ें",
    "Together": "साथ मिलकर",
    "Have a question, suggestion, or just want to say hello? We're here to help you on your farming journey.": "कोई सवाल, सुझाव या बस नमस्ते कहना चाहते हैं? हम आपकी खेती की यात्रा में मदद के लिए यहाँ हैं।",
    "Quick Response": "त्वरित जवाब",
    "Farmer First": "किसान पहले",
    "Always Here": "हमेशा साथ",
    "Your feedback": "आपकी प्रतिक्रिया",
    "helps us grow": "हमें बेहतर बनने में मदद करती है",
    "and serve better.": "और बेहतर सेवा देने में मदद करती है।",
    "CALL US": "हमें कॉल करें",
    "EMAIL US": "ईमेल करें",
    "We reply within 24 hours": "हम 24 घंटे में जवाब देते हैं",
    "VISIT US": "हमसे मिलें",
    "LIVE CHAT": "लाइव चैट",
    "Chat with our support team": "हमारी सहायता टीम से चैट करें",
    "Start Chat →": "चैट शुरू करें →",
    "Send Us a Message": "हमें संदेश भेजें",
    "Fill out the form and we'll get back to you soon.": "फॉर्म भरें और हम जल्द आपसे संपर्क करेंगे।",
    "Your Name *": "आपका नाम *",
    "Your Email *": "आपका ईमेल *",
    "Phone Number": "फोन नंबर",
    "Subject *": "विषय *",
    "Select a subject": "विषय चुनें",
    "General Inquiry": "सामान्य पूछताछ",
    "AI Disease Detection": "AI रोग पहचान",
    "Farming Guidance": "खेती मार्गदर्शन",
    "Technical Support": "तकनीकी सहायता",
    "Partnership": "साझेदारी",
    "Other": "अन्य",
    "Message *": "संदेश *",
    "Send Message →": "संदेश भेजें →",
    "Our Location": "हमारा स्थान",
    "Frequently Asked Questions": "अक्सर पूछे जाने वाले सवाल",
    "Quick answers to common questions.": "सामान्य सवालों के त्वरित जवाब।",
    "Our Farming Experts": "हमारे कृषि विशेषज्ञ",
    "Talk to people who know the soil.": "उन लोगों से बात करें जो मिट्टी को जानते हैं।",
    "Experienced Farmer": "अनुभवी किसान",
    "Contact →": "संपर्क →",
    "Need personalized advice?": "व्यक्तिगत सलाह चाहिए?",
    "Connect with our experts and get guidance for your crops.": "हमारे विशेषज्ञों से जुड़ें और अपनी फसलों के लिए सलाह पाएं।",
    "Still have questions?": "अभी भी सवाल हैं?",
    "Our team is always ready to help you.": "हमारी टीम आपकी मदद के लिए हमेशा तैयार है।",
    "Talk to Our Team →": "हमारी टीम से बात करें →",
    "FOR A HEALTHIER TOMORROW": "एक स्वस्थ कल के लिए",
    "Empowering": "सशक्त बनाना",
    "Farmers with": "किसानों को",
    "Smart Solutions": "स्मार्ट समाधान",
    "Join Kisan Vision to access AI-powered crop insights, expert advice and modern farming resources — all in one place.": "Kisan Vision से जुड़ें और AI आधारित फसल जानकारी, विशेषज्ञ सलाह और आधुनिक खेती के संसाधन एक ही जगह पाएं।",
    "Detect crop diseases": "फसल रोग पहचानें",
    "Upload a photo and get instant AI insights": "तस्वीर अपलोड करें और तुरंत AI जानकारी पाएं",
    "Learn modern farming": "आधुनिक खेती सीखें",
    "Step-by-step guides for better yield": "बेहतर पैदावार के लिए चरण-दर-चरण गाइड",
    "Connect with experts": "विशेषज्ञों से जुड़ें",
    "Get support from farming professionals": "कृषि विशेषज्ञों से सहायता पाएं",
    "Stronger Farmers’": "मजबूत किसान",
    "Greener Future": "हरित भविष्य",
    "Welcome Back": "वापसी पर स्वागत है",
    "Login to your Kisan Vision account and continue your journey towards smarter farming.": "अपने Kisan Vision खाते में लॉगिन करें और स्मार्ट खेती की यात्रा जारी रखें।",
    "E-mail Address": "ईमेल पता",
    "Password": "पासवर्ड",
    "Forgot Password?": "पासवर्ड भूल गए?",
    "Don’t have an account?": "खाता नहीं है?",
    "Sign Up": "साइन अप करें",
    "Using technology to support farmers, protect crops and build a healthier, greener tomorrow.": "किसानों की मदद, फसलों की सुरक्षा और स्वस्थ, हरित भविष्य के लिए तकनीक का उपयोग।",
    "Quick Links": "त्वरित लिंक",
    "Support": "सहायता",
    "Help Center": "सहायता केंद्र",
    "FAQs": "अक्सर पूछे जाने वाले सवाल",
    "Privacy Policy": "गोपनीयता नीति",
    "Terms of Service": "सेवा की शर्तें",
    "Newsletter": "न्यूज़लेटर",
    "Get the latest farming tips and updates.": "नवीनतम खेती सुझाव और अपडेट पाएं।"
  },
  "mr": {
    "Home": "मुख्यपृष्ठ",
    "How It Works": "हे कसे कार्य करते",
    "Detect Disease": "रोग ओळखा",
    "Farming Guide": "शेती मार्गदर्शक",
    "Blog": "ब्लॉग",
    "Contact": "संपर्क",
    "English": "मराठी",
    "Login": "लॉगिन",
    "Language": "भाषा",
    "Smart farming knowledge": "स्मार्ट शेतीचे ज्ञान",
    "Smarter farming, naturally.": "नैसर्गिक पद्धतीने, स्मार्ट शेती.",
    "AI-powered crop care": "AI-आधारित पीक काळजी",
    "Protect your crops with": "तुमच्या पिकांचे संरक्षण करा",
    "AI-powered detection.": "AI-आधारित ओळखीसह.",
    "Spot crop diseases early. Upload a photo of your plant and get clear, practical guidance to help your farm thrive.": "पिकांचे रोग लवकर ओळखा. तुमच्या पिकाची प्रतिमा अपलोड करा आणि शेतीसाठी स्पष्ट, उपयुक्त मार्गदर्शन मिळवा.",
    "Detect Crop Disease": "पिकांचा रोग ओळखा",
    "Learn how it works": "हे कसे कार्य करते ते जाणून घ्या",
    "Trusted by 12,000+ farmers": "12,000+ शेतकऱ्यांचा विश्वास",
    "making smarter crop decisions": "अधिक चांगले पीक निर्णय घेण्यास मदत",
    "Healthy crop insight": "निरोगी पिकाची माहिती",
    "Early action. Better harvest.": "वेळीच कृती. चांगले उत्पादन.",
    "Simple for every farmer": "प्रत्येक शेतकऱ्यासाठी सोपे",
    "Private & secure": "खाजगी आणि सुरक्षित",
    "Built for real fields": "खऱ्या शेतांसाठी तयार केलेले",
    "START WITH A PHOTO": "एका प्रतिमेपासून सुरुवात करा",
    "A second pair of eyes for every leaf.": "प्रत्येक पानासाठी दुसरी नजर.",
    "Upload a clear crop image and get an easy-to-understand health check in moments.": "पिकाची स्पष्ट प्रतिमा अपलोड करा आणि काही क्षणांत सहज समजणारी आरोग्य तपासणी मिळवा.",
    "Drop a crop photo here": "पिकाची प्रतिमा येथे टाका",
    "or choose an image from your phone": "किंवा फोनमधून प्रतिमा निवडा",
    "⌁ Choose crop photo": "⌁ पिकाची प्रतिमा निवडा",
    "✓ Your photo stays private and secure": "✓ तुमची प्रतिमा खाजगी आणि सुरक्षित राहते",
    "MORE THAN A DIAGNOSIS": "फक्त निदानापेक्षा अधिक",
    "Good advice should feel as natural as a walk through your field.": "चांगला सल्ला तुमच्या शेतातून चालण्याइतका सहज वाटला पाहिजे.",
    "From the first spot on a leaf to your next harvest, Kisan Vision turns complex crop science into steps you can act on.": "पानावरील पहिल्या डागापासून पुढील कापणीपर्यंत, Kisan Vision क्लिष्ट पीकशास्त्राला कृती करता येतील अशा पायऱ्यांत बदलते.",
    "Clear answers": "स्पष्ट उत्तरे",
    "No confusing science-speak.": "गोंधळात टाकणारी शास्त्रीय भाषा नाही.",
    "Practical next steps": "व्यावहारिक पुढील पावले",
    "Guidance made for your farm.": "तुमच्या शेतासाठी तयार केलेले मार्गदर्शन.",
    "Check a crop now →": "आता पीक तपासा →",
    "GROW WITH CONFIDENCE": "आत्मविश्वासाने शेती करा",
    "Healthier fields start with one small step.": "निरोगी शेते एका छोट्या पावलाने सुरू होतात.",
    "Make every season a little more informed with Kisan Vision.": "Kisan Vision सोबत प्रत्येक हंगाम अधिक माहितीपूर्ण बनवा.",
    "Try crop detection →": "पीक ओळख वापरून पहा →",
    "FROM FIELD TO INTELLIGENCE": "शेतापासून बुद्धिमत्तेपर्यंत",
    "Turning Crop Care into": "पिकांची काळजी बनवा",
    "Smarter Farming": "स्मार्ट शेती",
    "Kisan Vision combines real farming knowledge with the power of AI to help you understand your crops better and make informed decisions.": "Kisan Vision खरी शेतीची माहिती आणि AI ची ताकद एकत्र करून तुमची पिके अधिक चांगल्या प्रकारे समजून घेण्यास आणि योग्य निर्णय घेण्यास मदत करते.",
    "Explore Our Approach": "आमचा दृष्टिकोन पहा",
    "HOW KISAN VISION WORKS": "Kisan Vision कसे कार्य करते",
    "From Field to Better Farming — In 5 Steps": "शेतापासून चांगल्या शेतीपर्यंत — ५ पायऱ्यांत",
    "A connected journey from your crops to actionable insights.": "तुमच्या पिकांपासून उपयुक्त माहितीपर्यंतचा एक जोडलेला प्रवास.",
    "FIELD": "शेत",
    "DATA": "डेटा",
    "AI ANALYSIS": "AI विश्लेषण",
    "INSIGHT": "अंतर्दृष्टी",
    "BETTER FARMING": "उत्तम शेती",
    "Real crops, real challenges from your farm.": "खरी पिके, तुमच्या शेतातील खरी आव्हाने.",
    "Crop images and relevant information.": "पिकांच्या प्रतिमा आणि संबंधित माहिती.",
    "Our AI analyses patterns and detects key signs.": "आमचे AI पॅटर्नचे विश्लेषण करून महत्त्वाची चिन्हे ओळखते.",
    "Get clear and easy-to-understand information.": "स्पष्ट आणि सहज समजणारी माहिती मिळवा.",
    "Take the right steps for a healthier and higher yield.": "निरोगी पीक आणि अधिक उत्पादनासाठी योग्य पावले उचला.",
    "Knowledge": "ज्ञान",
    "That Works": "जे उपयोगी ठरते",
    "Based on real farming needs and expert insights.": "खऱ्या शेतीच्या गरजा आणि तज्ज्ञांच्या अनुभवावर आधारित.",
    "Simple": "सोपे",
    "and Clear": "आणि स्पष्ट",
    "Complex information in easy language.": "क्लिष्ट माहिती सोप्या भाषेत.",
    "Built for": "यांच्यासाठी तयार केले",
    "Farmers": "शेतकऱ्यांसाठी",
    "Designed to support farmers at every step.": "प्रत्येक टप्प्यावर शेतकऱ्यांना मदत करण्यासाठी तयार केले.",
    "A Healthier": "एक निरोगी",
    "Tomorrow": "उद्या",
    "Helping you grow better, for a brighter future.": "चांगले उत्पादन घेण्यासाठी आणि उज्ज्वल भविष्यासाठी मदत करणे.",
    "TUTORIALS": "ट्युटोरियल",
    "Learn Kisan Vision in Minutes": "काही मिनिटांत Kisan Vision शिका",
    "Simple video guides to help you use Kisan Vision tools with confidence.": "Kisan Vision साधने आत्मविश्वासाने वापरण्यास मदत करणारे सोपे व्हिडिओ मार्गदर्शक.",
    "How to Detect Crop Disease": "पिकांचा रोग कसा ओळखावा",
    "How to Upload and Analyze Leaf Images": "पानांच्या प्रतिमा कशा अपलोड व विश्लेषण कराव्यात",
    "How to Use the Farming Guide": "शेती मार्गदर्शक कसा वापरावा",
    "Understanding Your AI Results": "तुमचे AI परिणाम समजून घ्या",
    "Video Coming Soon": "व्हिडिओ लवकरच येत आहे",
    "AI-Powered Crop Health": "AI-आधारित पीक आरोग्य",
    "Upload 1 to 3 clear images of the same leaf for better AI analysis": "चांगल्या AI विश्लेषणासाठी एकाच पानाच्या 1 ते 3 स्पष्ट प्रतिमा अपलोड करा",
    "Drop leaf images here or click to browse": "पानांच्या प्रतिमा येथे टाका किंवा निवडण्यासाठी क्लिक करा",
    "JPG, PNG, or WEBP · Up to 3 images · 10 MB each": "JPG, PNG किंवा WEBP · जास्तीत जास्त 3 प्रतिमा · प्रत्येकी 10 MB",
    "Choose Images": "प्रतिमा निवडा",
    "Selected Images": "निवडलेल्या प्रतिमा",
    "+ Add More Images": "+ अधिक प्रतिमा जोडा",
    "Remove Images": "प्रतिमा काढा",
    "Analyze Leaves": "पानांचे विश्लेषण करा",
    "Analyzing your crop...": "तुमच्या पिकाचे विश्लेषण होत आहे...",
    "AI ANALYSIS COMPLETE": "AI विश्लेषण पूर्ण झाले",
    "Detection Result": "ओळख निकाल",
    "CROP": "पीक",
    "DISEASE / CONDITION": "रोग / स्थिती",
    "AI CONFIDENCE": "AI विश्वास पातळी",
    "About the Condition": "स्थितीबद्दल",
    "Symptoms": "लक्षणे",
    "Recommended Management": "शिफारस केलेले व्यवस्थापन",
    "Treatment Guidance": "उपचार मार्गदर्शन",
    "Alternative Predictions": "पर्यायी अंदाज",
    "Other possibilities considered by the AI model": "AI मॉडेलने विचारात घेतलेल्या इतर शक्यता",
    "Analyze Another Crop": "आणखी एका पिकाचे विश्लेषण करा",
    "Find the Right Guide": "योग्य मार्गदर्शक शोधा",
    "for Your Crop": "तुमच्या पिकासाठी",
    "Choose a crop to discover practical information about cultivation, watering, nutrients, common problems and crop care.": "लागवड, पाणी, पोषकद्रव्ये, सामान्य समस्या आणि पीक काळजी याबद्दल उपयुक्त माहिती मिळवण्यासाठी पीक निवडा.",
    "Wheat": "गहू",
    "Rice": "तांदूळ",
    "Tomato": "टोमॅटो",
    "Potato": "बटाटा",
    "Maize": "मका",
    "Cotton": "कापूस",
    "Rabi": "रब्बी",
    "Kharif": "खरीप",
    "Zaid": "उन्हाळी",
    "View Guide": "मार्गदर्शक पहा",
    "The strong-crop basics": "मजबूत पिकाची मूलतत्त्वे",
    "Essential Farming Practices": "आवश्यक शेती पद्धती",
    "Small, consistent choices can make a big difference to your soil, plants and harvest.": "लहान आणि सातत्यपूर्ण निवडी माती, पिके आणि उत्पादनात मोठा फरक घडवू शकतात.",
    "Soil Health": "मातीचे आरोग्य",
    "Irrigation": "सिंचन",
    "Fertilizer Management": "खत व्यवस्थापन",
    "Pest Management": "कीड व्यवस्थापन",
    "Learn more": "अधिक जाणून घ्या",
    "Plan with the calendar": "कॅलेंडरनुसार नियोजन करा",
    "Farming Tips for Every Season": "प्रत्येक हंगामासाठी शेती टिप्स",
    "Match your fieldwork to the season and give every crop the right start, support and finish.": "शेतातील काम हंगामानुसार करा आणि प्रत्येक पिकाला योग्य सुरुवात, आधार व पूर्णता द्या.",
    "Explore Tips": "टिप्स पहा",
    "Your field companion": "तुमच्या शेताचा साथी",
    "Simple Steps for Healthier Crops": "निरोगी पिकांसाठी सोप्या पायऱ्या",
    "Season readiness": "हंगामाची तयारी",
    "Reset checklist": "चेकलिस्ट रीसेट करा",
    "Not Sure What's Wrong With Your Crop?": "तुमच्या पिकाला काय झाले आहे हे समजत नाही?",
    "Upload a photo of your crop and let Kisan Vision help identify possible crop diseases.": "तुमच्या पिकाची प्रतिमा अपलोड करा आणि Kisan Vision ला संभाव्य रोग ओळखण्यात मदत करू द्या.",
    "KISAN VISION BLOG": "KISAN VISION ब्लॉग",
    "Learn. Grow.": "शिका. वाढवा.",
    "Harvest Better.": "चांगले उत्पादन घ्या.",
    "Practical farming tips, crop-care knowledge and AI-powered insights to help you protect your crops and make smarter farming decisions.": "पिकांचे संरक्षण आणि चांगले निर्णय घेण्यासाठी व्यावहारिक शेती टिप्स, पीक काळजीचे ज्ञान आणि AI-आधारित अंतर्दृष्टी मिळवा.",
    "All": "सर्व",
    "Crop Disease": "पीक रोग",
    "Smart Farming": "स्मार्ट शेती",
    "Crop Care": "पीक काळजी",
    "AI & Technology": "AI आणि तंत्रज्ञान",
    "Seasonal Tips": "हंगामी टिप्स",
    "Search farming articles...": "शेतीचे लेख शोधा...",
    "Early Signs of Crop Disease You Should Never Ignore": "पीक रोगाची सुरुवातीची लक्षणे कधीही दुर्लक्षित करू नका",
    "Read Article": "लेख वाचा",
    "Latest Articles": "नवीनतम लेख",
    "Simple and useful knowledge for better farming.": "चांगल्या शेतीसाठी सोपे आणि उपयुक्त ज्ञान.",
    "Read More": "अधिक वाचा",
    "NEED HELP WITH YOUR CROP?": "तुमच्या पिकासाठी मदत हवी आहे?",
    "Don't just read about it. Check your crop.": "फक्त वाचू नका. तुमचे पीक तपासा.",
    "Upload a photo and let Kisan Vision help identify possible crop diseases.": "प्रतिमा अपलोड करा आणि Kisan Vision ला संभाव्य पीक रोग ओळखण्यात मदत करू द्या.",
    "Let's Grow": "चला वाढूया",
    "Together": "एकत्र",
    "Have a question, suggestion, or just want to say hello? We're here to help you on your farming journey.": "प्रश्न, सूचना किंवा फक्त नमस्कार करायचा आहे? तुमच्या शेतीच्या प्रवासात मदत करण्यासाठी आम्ही येथे आहोत.",
    "Quick Response": "जलद प्रतिसाद",
    "Farmer First": "शेतकरी प्रथम",
    "Always Here": "नेहमी सोबत",
    "Your feedback": "तुमचा अभिप्राय",
    "helps us grow": "आम्हाला सुधारण्यास मदत करते",
    "and serve better.": "आणि चांगली सेवा देण्यास मदत करते.",
    "CALL US": "आम्हाला कॉल करा",
    "EMAIL US": "ईमेल करा",
    "We reply within 24 hours": "आम्ही 24 तासांत उत्तर देतो",
    "VISIT US": "आम्हाला भेट द्या",
    "LIVE CHAT": "लाईव्ह चॅट",
    "Chat with our support team": "आमच्या सहाय्यक टीमशी चॅट करा",
    "Start Chat →": "चॅट सुरू करा →",
    "Send Us a Message": "आम्हाला संदेश पाठवा",
    "Fill out the form and we'll get back to you soon.": "फॉर्म भरा आणि आम्ही लवकरच तुमच्याशी संपर्क करू.",
    "Your Name *": "तुमचे नाव *",
    "Your Email *": "तुमचा ईमेल *",
    "Phone Number": "फोन नंबर",
    "Subject *": "विषय *",
    "Select a subject": "विषय निवडा",
    "General Inquiry": "सामान्य चौकशी",
    "AI Disease Detection": "AI रोग ओळख",
    "Farming Guidance": "शेती मार्गदर्शन",
    "Technical Support": "तांत्रिक सहाय्य",
    "Partnership": "भागीदारी",
    "Other": "इतर",
    "Message *": "संदेश *",
    "Send Message →": "संदेश पाठवा →",
    "Our Location": "आमचे ठिकाण",
    "Frequently Asked Questions": "वारंवार विचारले जाणारे प्रश्न",
    "Quick answers to common questions.": "सामान्य प्रश्नांची झटपट उत्तरे.",
    "Our Farming Experts": "आमचे कृषी तज्ज्ञ",
    "Talk to people who know the soil.": "मातीची जाण असलेल्या लोकांशी बोला.",
    "Experienced Farmer": "अनुभवी शेतकरी",
    "Contact →": "संपर्क →",
    "Need personalized advice?": "वैयक्तिक सल्ला हवा आहे?",
    "Connect with our experts and get guidance for your crops.": "आमच्या तज्ज्ञांशी संपर्क साधा आणि तुमच्या पिकांसाठी मार्गदर्शन मिळवा.",
    "Still have questions?": "अजून प्रश्न आहेत?",
    "Our team is always ready to help you.": "आमची टीम तुमची मदत करण्यासाठी नेहमी तयार आहे.",
    "Talk to Our Team →": "आमच्या टीमशी बोला →",
    "FOR A HEALTHIER TOMORROW": "निरोगी उद्यासाठी",
    "Empowering": "सक्षम करणे",
    "Farmers with": "शेतकऱ्यांना",
    "Smart Solutions": "स्मार्ट उपाय",
    "Join Kisan Vision to access AI-powered crop insights, expert advice and modern farming resources — all in one place.": "Kisan Vision मध्ये सहभागी व्हा आणि AI-आधारित पीक माहिती, तज्ज्ञ सल्ला व आधुनिक शेती संसाधने एकाच ठिकाणी मिळवा.",
    "Detect crop diseases": "पीक रोग ओळखा",
    "Upload a photo and get instant AI insights": "प्रतिमा अपलोड करा आणि त्वरित AI माहिती मिळवा",
    "Learn modern farming": "आधुनिक शेती शिका",
    "Step-by-step guides for better yield": "चांगल्या उत्पादनासाठी टप्प्याटप्प्याने मार्गदर्शक",
    "Connect with experts": "तज्ज्ञांशी संपर्क साधा",
    "Get support from farming professionals": "शेती तज्ज्ञांकडून मदत मिळवा",
    "Stronger Farmers’": "सक्षम शेतकरी",
    "Greener Future": "हिरवेगार भविष्य",
    "Welcome Back": "पुन्हा स्वागत आहे",
    "Login to your Kisan Vision account and continue your journey towards smarter farming.": "तुमच्या Kisan Vision खात्यात लॉगिन करा आणि स्मार्ट शेतीचा प्रवास सुरू ठेवा.",
    "E-mail Address": "ई-मेल पत्ता",
    "Password": "पासवर्ड",
    "Forgot Password?": "पासवर्ड विसरलात?",
    "Don’t have an account?": "खाते नाही?",
    "Sign Up": "साइन अप करा",
    "Using technology to support farmers, protect crops and build a healthier, greener tomorrow.": "शेतकऱ्यांना मदत, पिकांचे संरक्षण आणि निरोगी, हिरवेगार भविष्य घडवण्यासाठी तंत्रज्ञानाचा वापर.",
    "Quick Links": "जलद दुवे",
    "Support": "सहाय्य",
    "Help Center": "मदत केंद्र",
    "FAQs": "वारंवार विचारले जाणारे प्रश्न",
    "Privacy Policy": "गोपनीयता धोरण",
    "Terms of Service": "सेवा अटी",
    "Newsletter": "वृत्तपत्र",
    "Get the latest farming tips and updates.": "नवीनतम शेती टिप्स आणि अपडेट मिळवा."
  },
  "pa": {
    "Home": "ਹੋਮ",
    "How It Works": "ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ",
    "Detect Disease": "ਬਿਮਾਰੀ ਪਛਾਣੋ",
    "Farming Guide": "ਖੇਤੀ ਗਾਈਡ",
    "Blog": "ਬਲੌਗ",
    "Contact": "ਸੰਪਰਕ",
    "English": "ਪੰਜਾਬੀ",
    "Login": "ਲੌਗਇਨ",
    "Language": "ਭਾਸ਼ਾ",
    "Smart farming knowledge": "ਸਮਾਰਟ ਖੇਤੀ ਦਾ ਗਿਆਨ",
    "Smarter farming, naturally.": "ਕੁਦਰਤੀ ਢੰਗ ਨਾਲ, ਸਮਝਦਾਰ ਖੇਤੀ।",
    "AI-powered crop care": "AI-ਆਧਾਰਿਤ ਫਸਲ ਦੇਖਭਾਲ",
    "Protect your crops with": "ਆਪਣੀਆਂ ਫਸਲਾਂ ਦੀ ਰੱਖਿਆ ਕਰੋ",
    "AI-powered detection.": "AI-ਆਧਾਰਿਤ ਪਛਾਣ ਨਾਲ।",
    "Spot crop diseases early. Upload a photo of your plant and get clear, practical guidance to help your farm thrive.": "ਫਸਲਾਂ ਦੀਆਂ ਬਿਮਾਰੀਆਂ ਜਲਦੀ ਪਛਾਣੋ। ਆਪਣੇ ਪੌਦੇ ਦੀ ਤਸਵੀਰ ਅਪਲੋਡ ਕਰੋ ਅਤੇ ਖੇਤ ਲਈ ਸਪੱਸ਼ਟ ਤੇ ਵਰਤੋਂਯੋਗ ਸਲਾਹ ਲਵੋ।",
    "Detect Crop Disease": "ਫਸਲ ਦੀ ਬਿਮਾਰੀ ਪਛਾਣੋ",
    "Learn how it works": "ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ ਜਾਣੋ",
    "Trusted by 12,000+ farmers": "12,000+ ਕਿਸਾਨਾਂ ਦਾ ਭਰੋਸਾ",
    "making smarter crop decisions": "ਵਧੀਆ ਫਸਲੀ ਫੈਸਲੇ ਲੈਣ ਵਿੱਚ ਮਦਦ",
    "Healthy crop insight": "ਸਿਹਤਮੰਦ ਫਸਲ ਦੀ ਜਾਣਕਾਰੀ",
    "Early action. Better harvest.": "ਸਮੇਂ ਸਿਰ ਕਦਮ। ਵਧੀਆ ਪੈਦਾਵਾਰ।",
    "Simple for every farmer": "ਹਰ ਕਿਸਾਨ ਲਈ ਸੌਖਾ",
    "Private & secure": "ਨਿੱਜੀ ਅਤੇ ਸੁਰੱਖਿਅਤ",
    "Built for real fields": "ਅਸਲ ਖੇਤਾਂ ਲਈ ਬਣਾਇਆ ਗਿਆ",
    "START WITH A PHOTO": "ਇੱਕ ਤਸਵੀਰ ਨਾਲ ਸ਼ੁਰੂ ਕਰੋ",
    "A second pair of eyes for every leaf.": "ਹਰ ਪੱਤੇ ਲਈ ਇੱਕ ਦੂਜੀ ਨਜ਼ਰ।",
    "Upload a clear crop image and get an easy-to-understand health check in moments.": "ਫਸਲ ਦੀ ਸਾਫ਼ ਤਸਵੀਰ ਅਪਲੋਡ ਕਰੋ ਅਤੇ ਕੁਝ ਪਲਾਂ ਵਿੱਚ ਆਸਾਨ ਸਿਹਤ ਜਾਂਚ ਲਵੋ।",
    "Drop a crop photo here": "ਫਸਲ ਦੀ ਤਸਵੀਰ ਇੱਥੇ ਛੱਡੋ",
    "or choose an image from your phone": "ਜਾਂ ਆਪਣੇ ਫੋਨ ਤੋਂ ਤਸਵੀਰ ਚੁਣੋ",
    "⌁ Choose crop photo": "⌁ ਫਸਲ ਦੀ ਤਸਵੀਰ ਚੁਣੋ",
    "✓ Your photo stays private and secure": "✓ ਤੁਹਾਡੀ ਤਸਵੀਰ ਨਿੱਜੀ ਅਤੇ ਸੁਰੱਖਿਅਤ ਰਹਿੰਦੀ ਹੈ",
    "MORE THAN A DIAGNOSIS": "ਸਿਰਫ਼ ਪਛਾਣ ਤੋਂ ਅੱਗੇ",
    "Good advice should feel as natural as a walk through your field.": "ਚੰਗੀ ਸਲਾਹ ਤੁਹਾਡੇ ਖੇਤ ਵਿੱਚ ਤੁਰਨ ਜਿੰਨੀ ਸੌਖੀ ਹੋਣੀ ਚਾਹੀਦੀ ਹੈ।",
    "From the first spot on a leaf to your next harvest, Kisan Vision turns complex crop science into steps you can act on.": "ਪੱਤੇ ਦੇ ਪਹਿਲੇ ਦਾਗ ਤੋਂ ਅਗਲੀ ਪੈਦਾਵਾਰ ਤੱਕ, Kisan Vision ਗੁੰਝਲਦਾਰ ਫਸਲ ਵਿਗਿਆਨ ਨੂੰ ਅਮਲਯੋਗ ਕਦਮਾਂ ਵਿੱਚ ਬਦਲਦਾ ਹੈ।",
    "Clear answers": "ਸਪੱਸ਼ਟ ਜਵਾਬ",
    "No confusing science-speak.": "ਉਲਝਾਉਣ ਵਾਲੀ ਵਿਗਿਆਨਕ ਭਾਸ਼ਾ ਨਹੀਂ।",
    "Practical next steps": "ਵਿਹਾਰਕ ਅਗਲੇ ਕਦਮ",
    "Guidance made for your farm.": "ਤੁਹਾਡੇ ਖੇਤ ਲਈ ਬਣਾਈ ਸਲਾਹ।",
    "Check a crop now →": "ਹੁਣ ਫਸਲ ਜਾਂਚੋ →",
    "GROW WITH CONFIDENCE": "ਭਰੋਸੇ ਨਾਲ ਖੇਤੀ ਕਰੋ",
    "Healthier fields start with one small step.": "ਸਿਹਤਮੰਦ ਖੇਤ ਇੱਕ ਛੋਟੇ ਕਦਮ ਨਾਲ ਸ਼ੁਰੂ ਹੁੰਦੇ ਹਨ।",
    "Make every season a little more informed with Kisan Vision.": "Kisan Vision ਨਾਲ ਹਰ ਮੌਸਮ ਨੂੰ ਹੋਰ ਜਾਣਕਾਰੀਪੂਰਨ ਬਣਾਓ।",
    "Try crop detection →": "ਫਸਲ ਪਛਾਣ ਅਜ਼ਮਾਓ →",
    "FROM FIELD TO INTELLIGENCE": "ਖੇਤ ਤੋਂ ਬੁੱਧੀਮਤਾ ਤੱਕ",
    "Turning Crop Care into": "ਫਸਲ ਦੀ ਦੇਖਭਾਲ ਨੂੰ ਬਣਾਓ",
    "Smarter Farming": "ਸਮਾਰਟ ਖੇਤੀ",
    "Kisan Vision combines real farming knowledge with the power of AI to help you understand your crops better and make informed decisions.": "Kisan Vision ਅਸਲ ਖੇਤੀ ਦੀ ਜਾਣਕਾਰੀ ਅਤੇ AI ਦੀ ਤਾਕਤ ਨੂੰ ਮਿਲਾ ਕੇ ਤੁਹਾਡੀਆਂ ਫਸਲਾਂ ਨੂੰ ਬਿਹਤਰ ਸਮਝਣ ਅਤੇ ਸਹੀ ਫੈਸਲੇ ਲੈਣ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ।",
    "Explore Our Approach": "ਸਾਡਾ ਤਰੀਕਾ ਵੇਖੋ",
    "HOW KISAN VISION WORKS": "Kisan Vision ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ",
    "From Field to Better Farming — In 5 Steps": "ਖੇਤ ਤੋਂ ਬਿਹਤਰ ਖੇਤੀ ਤੱਕ — 5 ਪੜਾਵਾਂ ਵਿੱਚ",
    "A connected journey from your crops to actionable insights.": "ਤੁਹਾਡੀ ਫਸਲ ਤੋਂ ਲਾਭਦਾਇਕ ਜਾਣਕਾਰੀ ਤੱਕ ਦਾ ਇੱਕ ਜੁੜਿਆ ਸਫ਼ਰ।",
    "FIELD": "ਖੇਤ",
    "DATA": "ਡਾਟਾ",
    "AI ANALYSIS": "AI ਵਿਸ਼ਲੇਸ਼ਣ",
    "INSIGHT": "ਸਮਝ",
    "BETTER FARMING": "ਬਿਹਤਰ ਖੇਤੀ",
    "Real crops, real challenges from your farm.": "ਅਸਲ ਫਸਲਾਂ, ਤੁਹਾਡੇ ਖੇਤ ਦੀਆਂ ਅਸਲ ਚੁਣੌਤੀਆਂ।",
    "Crop images and relevant information.": "ਫਸਲ ਦੀਆਂ ਤਸਵੀਰਾਂ ਅਤੇ ਸੰਬੰਧਿਤ ਜਾਣਕਾਰੀ।",
    "Our AI analyses patterns and detects key signs.": "ਸਾਡਾ AI ਪੈਟਰਨਾਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰਕੇ ਮੁੱਖ ਨਿਸ਼ਾਨੀਆਂ ਪਛਾਣਦਾ ਹੈ।",
    "Get clear and easy-to-understand information.": "ਸਪੱਸ਼ਟ ਅਤੇ ਆਸਾਨੀ ਨਾਲ ਸਮਝ ਆਉਣ ਵਾਲੀ ਜਾਣਕਾਰੀ ਲਵੋ।",
    "Take the right steps for a healthier and higher yield.": "ਸਿਹਤਮੰਦ ਫਸਲ ਅਤੇ ਵੱਧ ਪੈਦਾਵਾਰ ਲਈ ਸਹੀ ਕਦਮ ਚੁੱਕੋ।",
    "Knowledge": "ਗਿਆਨ",
    "That Works": "ਜੋ ਕੰਮ ਆਵੇ",
    "Based on real farming needs and expert insights.": "ਅਸਲ ਖੇਤੀ ਦੀਆਂ ਲੋੜਾਂ ਅਤੇ ਮਾਹਿਰਾਂ ਦੀ ਸਮਝ 'ਤੇ ਆਧਾਰਿਤ।",
    "Simple": "ਸਧਾਰਨ",
    "and Clear": "ਅਤੇ ਸਪੱਸ਼ਟ",
    "Complex information in easy language.": "ਗੁੰਝਲਦਾਰ ਜਾਣਕਾਰੀ ਸੌਖੀ ਭਾਸ਼ਾ ਵਿੱਚ।",
    "Built for": "ਲਈ ਬਣਾਇਆ ਗਿਆ",
    "Farmers": "ਕਿਸਾਨਾਂ",
    "Designed to support farmers at every step.": "ਹਰ ਕਦਮ 'ਤੇ ਕਿਸਾਨਾਂ ਦੀ ਮਦਦ ਲਈ ਬਣਾਇਆ ਗਿਆ।",
    "A Healthier": "ਇੱਕ ਸਿਹਤਮੰਦ",
    "Tomorrow": "ਭਵਿੱਖ",
    "Helping you grow better, for a brighter future.": "ਬਿਹਤਰ ਉਗਾਉਣ ਅਤੇ ਚਮਕਦਾਰ ਭਵਿੱਖ ਲਈ ਤੁਹਾਡੀ ਮਦਦ ਕਰਨਾ।",
    "TUTORIALS": "ਟਿਊਟੋਰੀਅਲ",
    "Learn Kisan Vision in Minutes": "ਕੁਝ ਮਿੰਟਾਂ ਵਿੱਚ Kisan Vision ਸਿੱਖੋ",
    "Simple video guides to help you use Kisan Vision tools with confidence.": "Kisan Vision ਦੇ ਸੰਦ ਭਰੋਸੇ ਨਾਲ ਵਰਤਣ ਵਿੱਚ ਮਦਦ ਕਰਨ ਵਾਲੇ ਸੌਖੇ ਵੀਡੀਓ ਗਾਈਡ।",
    "How to Detect Crop Disease": "ਫਸਲ ਦੀ ਬਿਮਾਰੀ ਕਿਵੇਂ ਪਛਾਣੀਏ",
    "How to Upload and Analyze Leaf Images": "ਪੱਤਿਆਂ ਦੀਆਂ ਤਸਵੀਰਾਂ ਕਿਵੇਂ ਅਪਲੋਡ ਅਤੇ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੀਏ",
    "How to Use the Farming Guide": "ਖੇਤੀ ਗਾਈਡ ਕਿਵੇਂ ਵਰਤੀਏ",
    "Understanding Your AI Results": "ਆਪਣੇ AI ਨਤੀਜੇ ਸਮਝੋ",
    "Video Coming Soon": "ਵੀਡੀਓ ਜਲਦੀ ਆ ਰਿਹਾ ਹੈ",
    "AI-Powered Crop Health": "AI-ਆਧਾਰਿਤ ਫਸਲ ਸਿਹਤ",
    "Upload 1 to 3 clear images of the same leaf for better AI analysis": "ਬਿਹਤਰ AI ਵਿਸ਼ਲੇਸ਼ਣ ਲਈ ਇੱਕੋ ਪੱਤੇ ਦੀਆਂ 1 ਤੋਂ 3 ਸਾਫ਼ ਤਸਵੀਰਾਂ ਅਪਲੋਡ ਕਰੋ",
    "Drop leaf images here or click to browse": "ਪੱਤੇ ਦੀਆਂ ਤਸਵੀਰਾਂ ਇੱਥੇ ਛੱਡੋ ਜਾਂ ਬ੍ਰਾਊਜ਼ ਕਰਨ ਲਈ ਕਲਿੱਕ ਕਰੋ",
    "JPG, PNG, or WEBP · Up to 3 images · 10 MB each": "JPG, PNG ਜਾਂ WEBP · ਵੱਧ ਤੋਂ ਵੱਧ 3 ਤਸਵੀਰਾਂ · ਹਰੇਕ 10 MB",
    "Choose Images": "ਤਸਵੀਰਾਂ ਚੁਣੋ",
    "Selected Images": "ਚੁਣੀਆਂ ਤਸਵੀਰਾਂ",
    "+ Add More Images": "+ ਹੋਰ ਤਸਵੀਰਾਂ ਜੋੜੋ",
    "Remove Images": "ਤਸਵੀਰਾਂ ਹਟਾਓ",
    "Analyze Leaves": "ਪੱਤਿਆਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ",
    "Analyzing your crop...": "ਤੁਹਾਡੀ ਫਸਲ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਹੋ ਰਿਹਾ ਹੈ...",
    "AI ANALYSIS COMPLETE": "AI ਵਿਸ਼ਲੇਸ਼ਣ ਪੂਰਾ",
    "Detection Result": "ਪਛਾਣ ਦਾ ਨਤੀਜਾ",
    "CROP": "ਫਸਲ",
    "DISEASE / CONDITION": "ਬਿਮਾਰੀ / ਸਥਿਤੀ",
    "AI CONFIDENCE": "AI ਭਰੋਸਾ",
    "About the Condition": "ਸਥਿਤੀ ਬਾਰੇ",
    "Symptoms": "ਲੱਛਣ",
    "Recommended Management": "ਸਿਫ਼ਾਰਿਸ਼ੀ ਪ੍ਰਬੰਧਨ",
    "Treatment Guidance": "ਇਲਾਜ ਦੀ ਸਲਾਹ",
    "Alternative Predictions": "ਵਿਕਲਪਕ ਭਵਿੱਖਬਾਣੀਆਂ",
    "Other possibilities considered by the AI model": "AI ਮਾਡਲ ਦੁਆਰਾ ਵਿਚਾਰੀਆਂ ਹੋਰ ਸੰਭਾਵਨਾਵਾਂ",
    "Analyze Another Crop": "ਹੋਰ ਫਸਲ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ",
    "Find the Right Guide": "ਸਹੀ ਗਾਈਡ ਲੱਭੋ",
    "for Your Crop": "ਤੁਹਾਡੀ ਫਸਲ ਲਈ",
    "Choose a crop to discover practical information about cultivation, watering, nutrients, common problems and crop care.": "ਕਾਸ਼ਤ, ਪਾਣੀ, ਪੋਸ਼ਕ ਤੱਤਾਂ, ਆਮ ਸਮੱਸਿਆਵਾਂ ਅਤੇ ਫਸਲ ਦੀ ਦੇਖਭਾਲ ਬਾਰੇ ਵਰਤੋਂਯੋਗ ਜਾਣਕਾਰੀ ਲਈ ਫਸਲ ਚੁਣੋ।",
    "Wheat": "ਕਣਕ",
    "Rice": "ਚੌਲ",
    "Tomato": "ਟਮਾਟਰ",
    "Potato": "ਆਲੂ",
    "Maize": "ਮੱਕੀ",
    "Cotton": "ਕਪਾਹ",
    "Rabi": "ਰਬੀ",
    "Kharif": "ਖਰੀਫ",
    "Zaid": "ਜ਼ਾਇਦ",
    "View Guide": "ਗਾਈਡ ਵੇਖੋ",
    "The strong-crop basics": "ਮਜ਼ਬੂਤ ਫਸਲ ਦੀ ਬੁਨਿਆਦ",
    "Essential Farming Practices": "ਜ਼ਰੂਰੀ ਖੇਤੀ ਅਭਿਆਸ",
    "Small, consistent choices can make a big difference to your soil, plants and harvest.": "ਛੋਟੇ ਅਤੇ ਲਗਾਤਾਰ ਸਹੀ ਫੈਸਲੇ ਮਿੱਟੀ, ਪੌਦਿਆਂ ਅਤੇ ਪੈਦਾਵਾਰ ਵਿੱਚ ਵੱਡਾ ਫਰਕ ਪਾ ਸਕਦੇ ਹਨ।",
    "Soil Health": "ਮਿੱਟੀ ਦੀ ਸਿਹਤ",
    "Irrigation": "ਸਿੰਚਾਈ",
    "Fertilizer Management": "ਖਾਦ ਪ੍ਰਬੰਧਨ",
    "Pest Management": "ਕੀਟ ਪ੍ਰਬੰਧਨ",
    "Learn more": "ਹੋਰ ਜਾਣੋ",
    "Plan with the calendar": "ਕੈਲੰਡਰ ਨਾਲ ਯੋਜਨਾ ਬਣਾਓ",
    "Farming Tips for Every Season": "ਹਰ ਮੌਸਮ ਲਈ ਖੇਤੀ ਸੁਝਾਅ",
    "Match your fieldwork to the season and give every crop the right start, support and finish.": "ਆਪਣੇ ਖੇਤੀ ਕੰਮ ਨੂੰ ਮੌਸਮ ਨਾਲ ਮਿਲਾਓ ਅਤੇ ਹਰ ਫਸਲ ਨੂੰ ਸਹੀ ਸ਼ੁਰੂਆਤ, ਸੰਭਾਲ ਅਤੇ ਅੰਤ ਦਿਓ।",
    "Explore Tips": "ਸੁਝਾਅ ਵੇਖੋ",
    "Your field companion": "ਤੁਹਾਡੇ ਖੇਤ ਦਾ ਸਾਥੀ",
    "Simple Steps for Healthier Crops": "ਸਿਹਤਮੰਦ ਫਸਲਾਂ ਲਈ ਸੌਖੇ ਕਦਮ",
    "Season readiness": "ਮੌਸਮ ਦੀ ਤਿਆਰੀ",
    "Reset checklist": "ਚੈਕਲਿਸਟ ਰੀਸੈਟ ਕਰੋ",
    "Not Sure What's Wrong With Your Crop?": "ਪਤਾ ਨਹੀਂ ਤੁਹਾਡੀ ਫਸਲ ਵਿੱਚ ਕੀ ਗਲਤ ਹੈ?",
    "Upload a photo of your crop and let Kisan Vision help identify possible crop diseases.": "ਆਪਣੀ ਫਸਲ ਦੀ ਤਸਵੀਰ ਅਪਲੋਡ ਕਰੋ ਅਤੇ Kisan Vision ਨੂੰ ਸੰਭਾਵਿਤ ਬਿਮਾਰੀਆਂ ਪਛਾਣਨ ਦਿਓ।",
    "KISAN VISION BLOG": "KISAN VISION ਬਲੌਗ",
    "Learn. Grow.": "ਸਿੱਖੋ। ਵਧੋ।",
    "Harvest Better.": "ਵਧੀਆ ਪੈਦਾਵਾਰ ਲਵੋ।",
    "Practical farming tips, crop-care knowledge and AI-powered insights to help you protect your crops and make smarter farming decisions.": "ਆਪਣੀਆਂ ਫਸਲਾਂ ਦੀ ਰੱਖਿਆ ਅਤੇ ਵਧੀਆ ਫੈਸਲਿਆਂ ਲਈ ਵਿਹਾਰਕ ਖੇਤੀ ਸੁਝਾਅ, ਫਸਲ ਦੇਖਭਾਲ ਦਾ ਗਿਆਨ ਅਤੇ AI-ਆਧਾਰਿਤ ਜਾਣਕਾਰੀ ਲਵੋ।",
    "All": "ਸਾਰੇ",
    "Crop Disease": "ਫਸਲ ਦੀ ਬਿਮਾਰੀ",
    "Smart Farming": "ਸਮਾਰਟ ਖੇਤੀ",
    "Crop Care": "ਫਸਲ ਦੀ ਦੇਖਭਾਲ",
    "AI & Technology": "AI ਅਤੇ ਤਕਨਾਲੋਜੀ",
    "Seasonal Tips": "ਮੌਸਮੀ ਸੁਝਾਅ",
    "Search farming articles...": "ਖੇਤੀ ਲੇਖ ਖੋਜੋ...",
    "Early Signs of Crop Disease You Should Never Ignore": "ਫਸਲ ਦੀ ਬਿਮਾਰੀ ਦੇ ਸ਼ੁਰੂਆਤੀ ਨਿਸ਼ਾਨ ਜਿਨ੍ਹਾਂ ਨੂੰ ਕਦੇ ਨਜ਼ਰਅੰਦਾਜ਼ ਨਾ ਕਰੋ",
    "Read Article": "ਲੇਖ ਪੜ੍ਹੋ",
    "Latest Articles": "ਤਾਜ਼ਾ ਲੇਖ",
    "Simple and useful knowledge for better farming.": "ਬਿਹਤਰ ਖੇਤੀ ਲਈ ਸੌਖਾ ਅਤੇ ਲਾਭਦਾਇਕ ਗਿਆਨ।",
    "Read More": "ਹੋਰ ਪੜ੍ਹੋ",
    "NEED HELP WITH YOUR CROP?": "ਆਪਣੀ ਫਸਲ ਲਈ ਮਦਦ ਚਾਹੀਦੀ ਹੈ?",
    "Don't just read about it. Check your crop.": "ਸਿਰਫ਼ ਪੜ੍ਹੋ ਨਹੀਂ। ਆਪਣੀ ਫਸਲ ਜਾਂਚੋ।",
    "Upload a photo and let Kisan Vision help identify possible crop diseases.": "ਤਸਵੀਰ ਅਪਲੋਡ ਕਰੋ ਅਤੇ Kisan Vision ਨੂੰ ਸੰਭਾਵਿਤ ਫਸਲ ਬਿਮਾਰੀਆਂ ਪਛਾਣਨ ਦਿਓ।",
    "Let's Grow": "ਆਓ ਵਧੀਏ",
    "Together": "ਮਿਲ ਕੇ",
    "Have a question, suggestion, or just want to say hello? We're here to help you on your farming journey.": "ਕੋਈ ਸਵਾਲ, ਸੁਝਾਅ ਜਾਂ ਸਿਰਫ਼ ਸਤ ਸ੍ਰੀ ਅਕਾਲ ਕਹਿਣਾ ਚਾਹੁੰਦੇ ਹੋ? ਅਸੀਂ ਤੁਹਾਡੀ ਖੇਤੀ ਯਾਤਰਾ ਵਿੱਚ ਮਦਦ ਲਈ ਇੱਥੇ ਹਾਂ।",
    "Quick Response": "ਤੁਰੰਤ ਜਵਾਬ",
    "Farmer First": "ਕਿਸਾਨ ਪਹਿਲਾਂ",
    "Always Here": "ਹਮੇਸ਼ਾ ਨਾਲ",
    "Your feedback": "ਤੁਹਾਡੀ ਰਾਏ",
    "helps us grow": "ਸਾਨੂੰ ਬਿਹਤਰ ਬਣਨ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ",
    "and serve better.": "ਅਤੇ ਵਧੀਆ ਸੇਵਾ ਦੇਣ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ।",
    "CALL US": "ਸਾਨੂੰ ਕਾਲ ਕਰੋ",
    "EMAIL US": "ਸਾਨੂੰ ਈਮੇਲ ਕਰੋ",
    "We reply within 24 hours": "ਅਸੀਂ 24 ਘੰਟਿਆਂ ਵਿੱਚ ਜਵਾਬ ਦਿੰਦੇ ਹਾਂ",
    "VISIT US": "ਸਾਨੂੰ ਮਿਲੋ",
    "LIVE CHAT": "ਲਾਈਵ ਚੈਟ",
    "Chat with our support team": "ਸਾਡੀ ਸਹਾਇਤਾ ਟੀਮ ਨਾਲ ਚੈਟ ਕਰੋ",
    "Start Chat →": "ਚੈਟ ਸ਼ੁਰੂ ਕਰੋ →",
    "Send Us a Message": "ਸਾਨੂੰ ਸੁਨੇਹਾ ਭੇਜੋ",
    "Fill out the form and we'll get back to you soon.": "ਫਾਰਮ ਭਰੋ ਅਤੇ ਅਸੀਂ ਜਲਦੀ ਤੁਹਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰਾਂਗੇ।",
    "Your Name *": "ਤੁਹਾਡਾ ਨਾਮ *",
    "Your Email *": "ਤੁਹਾਡੀ ਈਮੇਲ *",
    "Phone Number": "ਫੋਨ ਨੰਬਰ",
    "Subject *": "ਵਿਸ਼ਾ *",
    "Select a subject": "ਵਿਸ਼ਾ ਚੁਣੋ",
    "General Inquiry": "ਆਮ ਪੁੱਛਗਿੱਛ",
    "AI Disease Detection": "AI ਬਿਮਾਰੀ ਪਛਾਣ",
    "Farming Guidance": "ਖੇਤੀ ਮਾਰਗਦਰਸ਼ਨ",
    "Technical Support": "ਤਕਨੀਕੀ ਸਹਾਇਤਾ",
    "Partnership": "ਭਾਈਵਾਲੀ",
    "Other": "ਹੋਰ",
    "Message *": "ਸੁਨੇਹਾ *",
    "Send Message →": "ਸੁਨੇਹਾ ਭੇਜੋ →",
    "Our Location": "ਸਾਡਾ ਸਥਾਨ",
    "Frequently Asked Questions": "ਅਕਸਰ ਪੁੱਛੇ ਜਾਣ ਵਾਲੇ ਸਵਾਲ",
    "Quick answers to common questions.": "ਆਮ ਸਵਾਲਾਂ ਦੇ ਤੁਰੰਤ ਜਵਾਬ।",
    "Our Farming Experts": "ਸਾਡੇ ਖੇਤੀ ਮਾਹਿਰ",
    "Talk to people who know the soil.": "ਉਨ੍ਹਾਂ ਲੋਕਾਂ ਨਾਲ ਗੱਲ ਕਰੋ ਜੋ ਮਿੱਟੀ ਨੂੰ ਜਾਣਦੇ ਹਨ।",
    "Experienced Farmer": "ਤਜਰਬੇਕਾਰ ਕਿਸਾਨ",
    "Contact →": "ਸੰਪਰਕ →",
    "Need personalized advice?": "ਨਿੱਜੀ ਸਲਾਹ ਚਾਹੀਦੀ ਹੈ?",
    "Connect with our experts and get guidance for your crops.": "ਸਾਡੇ ਮਾਹਿਰਾਂ ਨਾਲ ਜੁੜੋ ਅਤੇ ਆਪਣੀਆਂ ਫਸਲਾਂ ਲਈ ਸਲਾਹ ਲਵੋ।",
    "Still have questions?": "ਅਜੇ ਵੀ ਸਵਾਲ ਹਨ?",
    "Our team is always ready to help you.": "ਸਾਡੀ ਟੀਮ ਤੁਹਾਡੀ ਮਦਦ ਲਈ ਹਮੇਸ਼ਾ ਤਿਆਰ ਹੈ।",
    "Talk to Our Team →": "ਸਾਡੀ ਟੀਮ ਨਾਲ ਗੱਲ ਕਰੋ →",
    "FOR A HEALTHIER TOMORROW": "ਸਿਹਤਮੰਦ ਭਵਿੱਖ ਲਈ",
    "Empowering": "ਸਸ਼ਕਤ ਬਣਾਉਣਾ",
    "Farmers with": "ਕਿਸਾਨਾਂ ਨੂੰ",
    "Smart Solutions": "ਸਮਾਰਟ ਹੱਲ",
    "Join Kisan Vision to access AI-powered crop insights, expert advice and modern farming resources — all in one place.": "Kisan Vision ਨਾਲ ਜੁੜੋ ਅਤੇ AI-ਆਧਾਰਿਤ ਫਸਲ ਜਾਣਕਾਰੀ, ਮਾਹਿਰ ਸਲਾਹ ਅਤੇ ਆਧੁਨਿਕ ਖੇਤੀ ਸਰੋਤ ਇੱਕੋ ਥਾਂ ਲਵੋ।",
    "Detect crop diseases": "ਫਸਲ ਦੀਆਂ ਬਿਮਾਰੀਆਂ ਪਛਾਣੋ",
    "Upload a photo and get instant AI insights": "ਤਸਵੀਰ ਅਪਲੋਡ ਕਰੋ ਅਤੇ ਤੁਰੰਤ AI ਜਾਣਕਾਰੀ ਲਵੋ",
    "Learn modern farming": "ਆਧੁਨਿਕ ਖੇਤੀ ਸਿੱਖੋ",
    "Step-by-step guides for better yield": "ਵਧੀਆ ਪੈਦਾਵਾਰ ਲਈ ਕਦਮ-ਦਰ-ਕਦਮ ਗਾਈਡ",
    "Connect with experts": "ਮਾਹਿਰਾਂ ਨਾਲ ਜੁੜੋ",
    "Get support from farming professionals": "ਖੇਤੀ ਮਾਹਿਰਾਂ ਤੋਂ ਸਹਾਇਤਾ ਲਵੋ",
    "Stronger Farmers’": "ਮਜ਼ਬੂਤ ਕਿਸਾਨ",
    "Greener Future": "ਹਰਾ ਭਵਿੱਖ",
    "Welcome Back": "ਵਾਪਸ ਜੀ ਆਇਆਂ ਨੂੰ",
    "Login to your Kisan Vision account and continue your journey towards smarter farming.": "ਆਪਣੇ Kisan Vision ਖਾਤੇ ਵਿੱਚ ਲੌਗਇਨ ਕਰੋ ਅਤੇ ਸਮਾਰਟ ਖੇਤੀ ਦੀ ਯਾਤਰਾ ਜਾਰੀ ਰੱਖੋ।",
    "E-mail Address": "ਈ-ਮੇਲ ਪਤਾ",
    "Password": "ਪਾਸਵਰਡ",
    "Forgot Password?": "ਪਾਸਵਰਡ ਭੁੱਲ ਗਏ?",
    "Don’t have an account?": "ਖਾਤਾ ਨਹੀਂ ਹੈ?",
    "Sign Up": "ਸਾਈਨ ਅਪ ਕਰੋ",
    "Using technology to support farmers, protect crops and build a healthier, greener tomorrow.": "ਕਿਸਾਨਾਂ ਦੀ ਮਦਦ, ਫਸਲਾਂ ਦੀ ਰੱਖਿਆ ਅਤੇ ਸਿਹਤਮੰਦ, ਹਰਿਆਲੇ ਭਵਿੱਖ ਲਈ ਤਕਨਾਲੋਜੀ ਦੀ ਵਰਤੋਂ।",
    "Quick Links": "ਤੁਰੰਤ ਲਿੰਕ",
    "Support": "ਸਹਾਇਤਾ",
    "Help Center": "ਮਦਦ ਕੇਂਦਰ",
    "FAQs": "ਅਕਸਰ ਪੁੱਛੇ ਜਾਣ ਵਾਲੇ ਸਵਾਲ",
    "Privacy Policy": "ਪਰਦੇਦਾਰੀ ਨੀਤੀ",
    "Terms of Service": "ਸੇਵਾ ਦੀਆਂ ਸ਼ਰਤਾਂ",
    "Newsletter": "ਨਿਊਜ਼ਲੈਟਰ",
    "Get the latest farming tips and updates.": "ਤਾਜ਼ਾ ਖੇਤੀ ਸੁਝਾਅ ਅਤੇ ਅੱਪਡੇਟ ਲਵੋ।"
  },
  "gu": {
    "Home": "હોમ",
    "How It Works": "આ કેવી રીતે કામ કરે છે",
    "Detect Disease": "રોગ ઓળખો",
    "Farming Guide": "ખેતી માર્ગદર્શિકા",
    "Blog": "બ્લોગ",
    "Contact": "સંપર્ક",
    "English": "ગુજરાતી",
    "Login": "લૉગિન",
    "Language": "ભાષા",
    "Smart farming knowledge": "સ્માર્ટ ખેતીનું જ્ઞાન",
    "Smarter farming, naturally.": "કુદરતી રીતે, સ્માર્ટ ખેતી.",
    "AI-powered crop care": "AI આધારિત પાક સંભાળ",
    "Protect your crops with": "તમારા પાકનું રક્ષણ કરો",
    "AI-powered detection.": "AI આધારિત ઓળખ સાથે.",
    "Spot crop diseases early. Upload a photo of your plant and get clear, practical guidance to help your farm thrive.": "પાકના રોગોને વહેલા ઓળખો. તમારા છોડનો ફોટો અપલોડ કરો અને ખેતી માટે સ્પષ્ટ તથા ઉપયોગી માર્ગદર્શન મેળવો.",
    "Detect Crop Disease": "પાકનો રોગ ઓળખો",
    "Learn how it works": "આ કેવી રીતે કામ કરે છે તે જાણો",
    "Trusted by 12,000+ farmers": "12,000+ ખેડૂતોનો વિશ્વાસ",
    "making smarter crop decisions": "વધુ સારા પાકના નિર્ણયો લેવામાં મદદ",
    "Healthy crop insight": "સ્વસ્થ પાકની જાણકારી",
    "Early action. Better harvest.": "સમયસર પગલું. વધુ સારું ઉત્પાદન.",
    "Simple for every farmer": "દરેક ખેડૂત માટે સરળ",
    "Private & secure": "ખાનગી અને સુરક્ષિત",
    "Built for real fields": "અસલ ખેતરો માટે બનાવેલ",
    "START WITH A PHOTO": "એક ફોટાથી શરૂઆત કરો",
    "A second pair of eyes for every leaf.": "દરેક પાન માટે બીજી નજર.",
    "Upload a clear crop image and get an easy-to-understand health check in moments.": "પાકની સ્પષ્ટ તસવીર અપલોડ કરો અને થોડા જ સમયમાં સરળ આરોગ્ય તપાસ મેળવો.",
    "Drop a crop photo here": "પાકનો ફોટો અહીં મૂકો",
    "or choose an image from your phone": "અથવા તમારા ફોનમાંથી તસવીર પસંદ કરો",
    "⌁ Choose crop photo": "⌁ પાકનો ફોટો પસંદ કરો",
    "✓ Your photo stays private and secure": "✓ તમારો ફોટો ખાનગી અને સુરક્ષિત રહે છે",
    "MORE THAN A DIAGNOSIS": "માત્ર નિદાનથી આગળ",
    "Good advice should feel as natural as a walk through your field.": "સારી સલાહ તમારા ખેતરમાં ફરવા જેટલી સરળ લાગવી જોઈએ.",
    "From the first spot on a leaf to your next harvest, Kisan Vision turns complex crop science into steps you can act on.": "પાન પરના પહેલા ડાઘથી આગામી પાક સુધી, Kisan Vision જટિલ કૃષિ વિજ્ઞાનને અમલમાં મૂકી શકાય એવા પગલાંમાં ફેરવે છે.",
    "Clear answers": "સ્પષ્ટ જવાબો",
    "No confusing science-speak.": "ગૂંચવણભરી વૈજ્ઞાનિક ભાષા નહીં.",
    "Practical next steps": "વ્યવહારુ આગળના પગલાં",
    "Guidance made for your farm.": "તમારા ખેતર માટે બનાવેલ માર્ગદર્શન.",
    "Check a crop now →": "હમણાં પાક તપાસો →",
    "GROW WITH CONFIDENCE": "આત્મવિશ્વાસ સાથે ખેતી કરો",
    "Healthier fields start with one small step.": "સ્વસ્થ ખેતરો એક નાના પગલાથી શરૂ થાય છે.",
    "Make every season a little more informed with Kisan Vision.": "Kisan Vision સાથે દરેક સીઝનને વધુ માહિતીસભર બનાવો.",
    "Try crop detection →": "પાક ઓળખ અજમાવો →",
    "FROM FIELD TO INTELLIGENCE": "ખેતરથી બુદ્ધિ સુધી",
    "Turning Crop Care into": "પાકની સંભાળને બનાવો",
    "Smarter Farming": "સ્માર્ટ ખેતી",
    "Kisan Vision combines real farming knowledge with the power of AI to help you understand your crops better and make informed decisions.": "Kisan Vision સાચી ખેતીની જાણકારી અને AI ની શક્તિને જોડીને તમારા પાકને વધુ સારી રીતે સમજવામાં અને યોગ્ય નિર્ણયો લેવામાં મદદ કરે છે.",
    "Explore Our Approach": "અમારો અભિગમ જુઓ",
    "HOW KISAN VISION WORKS": "Kisan Vision કેવી રીતે કામ કરે છે",
    "From Field to Better Farming — In 5 Steps": "ખેતરથી બહેતર ખેતી સુધી — 5 પગલાંમાં",
    "A connected journey from your crops to actionable insights.": "તમારા પાકથી ઉપયોગી જાણકારી સુધીની જોડાયેલી યાત્રા.",
    "FIELD": "ખેતર",
    "DATA": "ડેટા",
    "AI ANALYSIS": "AI વિશ્લેષણ",
    "INSIGHT": "સમજ",
    "BETTER FARMING": "બહેતર ખેતી",
    "Real crops, real challenges from your farm.": "ખરા પાક, તમારા ખેતરની ખરી પડકારો.",
    "Crop images and relevant information.": "પાકની તસવીરો અને સંબંધિત જાણકારી.",
    "Our AI analyses patterns and detects key signs.": "અમારું AI પેટર્નનું વિશ્લેષણ કરીને મુખ્ય સંકેતો ઓળખે છે.",
    "Get clear and easy-to-understand information.": "સ્પષ્ટ અને સરળતાથી સમજી શકાય તેવી માહિતી મેળવો.",
    "Take the right steps for a healthier and higher yield.": "ਤંદુરસ્ત પાક અને વધુ ઉત્પાદન માટે યોગ્ય પગલાં લો.",
    "Knowledge": "જ્ઞાન",
    "That Works": "જે કામ આવે",
    "Based on real farming needs and expert insights.": "ખરી ખેતીની જરૂરિયાતો અને નિષ્ણાતોની સમજ પર આધારિત.",
    "Simple": "સરળ",
    "and Clear": "અને સ્પષ્ટ",
    "Complex information in easy language.": "જટિલ માહિતી સરળ ભાષામાં.",
    "Built for": "માટે બનાવેલ",
    "Farmers": "ખેડૂતો",
    "Designed to support farmers at every step.": "દરેક પગલે ખેડૂતોને મદદ કરવા માટે બનાવેલ.",
    "A Healthier": "એક તંદુરસ્ત",
    "Tomorrow": "આવતીકાલ",
    "Helping you grow better, for a brighter future.": "વધુ સારું ઉગાડવામાં અને ઉજ્જવળ ભવિષ્ય માટે મદદ કરવી.",
    "TUTORIALS": "ટ્યુટોરિયલ",
    "Learn Kisan Vision in Minutes": "કેટલીક મિનિટોમાં Kisan Vision શીખો",
    "Simple video guides to help you use Kisan Vision tools with confidence.": "Kisan Vision ના સાધનો વિશ્વાસ સાથે વાપરવામાં મદદ કરતી સરળ વિડિઓ માર્ગદર્શિકાઓ.",
    "How to Detect Crop Disease": "પાકનો રોગ કેવી રીતે ઓળખવો",
    "How to Upload and Analyze Leaf Images": "પાંદડાંની તસવીરો કેવી રીતે અપલોડ અને વિશ્લેષણ કરવી",
    "How to Use the Farming Guide": "ખેતી માર્ગદર્શિકા કેવી રીતે વાપરવી",
    "Understanding Your AI Results": "તમારા AI પરિણામ સમજો",
    "Video Coming Soon": "વિડિઓ ટૂંક સમયમાં આવી રહ્યો છે",
    "AI-Powered Crop Health": "AI આધારિત પાક આરોગ્ય",
    "Upload 1 to 3 clear images of the same leaf for better AI analysis": "વધુ સારી AI વિશ્લેષણ માટે એક જ પાંદડાની 1 થી 3 સ્પષ્ટ તસવીરો અપલોડ કરો",
    "Drop leaf images here or click to browse": "પાંદડાંની તસવીરો અહીં મૂકો અથવા બ્રાઉઝ કરવા ક્લિક કરો",
    "JPG, PNG, or WEBP · Up to 3 images · 10 MB each": "JPG, PNG અથવા WEBP · વધુમાં વધુ 3 તસવીરો · દરેક 10 MB",
    "Choose Images": "તસવીરો પસંદ કરો",
    "Selected Images": "પસંદ કરેલી તસવીરો",
    "+ Add More Images": "+ વધુ તસવીરો ઉમેરો",
    "Remove Images": "તસવીરો દૂર કરો",
    "Analyze Leaves": "પાંદડાંનું વિશ્લેષણ કરો",
    "Analyzing your crop...": "તમારા પાકનું વિશ્લેષણ થઈ રહ્યું છે...",
    "AI ANALYSIS COMPLETE": "AI વિશ્લેષણ પૂરું થયું",
    "Detection Result": "ઓળખ પરિણામ",
    "CROP": "પાક",
    "DISEASE / CONDITION": "રોગ / સ્થિતિ",
    "AI CONFIDENCE": "AI વિશ્વાસ",
    "About the Condition": "સ્થિતિ વિશે",
    "Symptoms": "લક્ષણો",
    "Recommended Management": "ભલામણ કરેલ વ્યવસ્થાપન",
    "Treatment Guidance": "સારવાર માર્ગદર્શન",
    "Alternative Predictions": "વૈકલ્પિક આગાહીઓ",
    "Other possibilities considered by the AI model": "AI મોડેલ દ્વારા વિચારેલી અન્ય શક્યતાઓ",
    "Analyze Another Crop": "બીજા પાકનું વિશ્લેષણ કરો",
    "Find the Right Guide": "યોગ્ય માર્ગદર્શિકા શોધો",
    "for Your Crop": "તમારા પાક માટે",
    "Choose a crop to discover practical information about cultivation, watering, nutrients, common problems and crop care.": "ખેતી, પાણી, પોષક તત્વો, સામાન્ય સમસ્યાઓ અને પાક સંભાળ વિશે ઉપયોગી માહિતી માટે પાક પસંદ કરો.",
    "Wheat": "ઘઉં",
    "Rice": "ચોખા",
    "Tomato": "ટામેટા",
    "Potato": "બટાકા",
    "Maize": "મકાઈ",
    "Cotton": "કપાસ",
    "Rabi": "રબી",
    "Kharif": "ખરીફ",
    "Zaid": "ઝાયદ",
    "View Guide": "માર્ગદર્શિકા જુઓ",
    "The strong-crop basics": "મજબૂત પાકની મૂળભૂત બાબતો",
    "Essential Farming Practices": "આવશ્યક ખેતી પદ્ધતિઓ",
    "Small, consistent choices can make a big difference to your soil, plants and harvest.": "નાના અને સતત સારા નિર્ણયો જમીન, છોડ અને પાકમાં મોટો ફરક પાડી શકે છે.",
    "Soil Health": "જમીનનું આરોગ્ય",
    "Irrigation": "સિંચાઈ",
    "Fertilizer Management": "ખાતર વ્યવસ્થાપન",
    "Pest Management": "જીવાત વ્યવસ્થાપન",
    "Learn more": "વધુ જાણો",
    "Plan with the calendar": "કૅલેન્ડર સાથે આયોજન કરો",
    "Farming Tips for Every Season": "દરેક સીઝન માટે ખેતી ટીપ્સ",
    "Match your fieldwork to the season and give every crop the right start, support and finish.": "તમારું ખેતરકામ સીઝન પ્રમાણે ગોઠવો અને દરેક પાકને યોગ્ય શરૂઆત, સંભાળ અને પૂર્ણતા આપો.",
    "Explore Tips": "ટીપ્સ જુઓ",
    "Your field companion": "તમારા ખેતરનો સાથી",
    "Simple Steps for Healthier Crops": "સ્વસ્થ પાક માટે સરળ પગલાં",
    "Season readiness": "સીઝનની તૈયારી",
    "Reset checklist": "ચેકલિસ્ટ રીસેટ કરો",
    "Not Sure What's Wrong With Your Crop?": "તમારા પાકમાં શું સમસ્યા છે તે ખબર નથી?",
    "Upload a photo of your crop and let Kisan Vision help identify possible crop diseases.": "તમારા પાકનો ફોટો અપલોડ કરો અને Kisan Vision ને સંભવિત પાક રોગ ઓળખવામાં મદદ કરવા દો.",
    "KISAN VISION BLOG": "KISAN VISION બ્લોગ",
    "Learn. Grow.": "શીખો. વિકાસ કરો.",
    "Harvest Better.": "વધુ સારું ઉત્પાદન મેળવો.",
    "Practical farming tips, crop-care knowledge and AI-powered insights to help you protect your crops and make smarter farming decisions.": "તમારા પાકની સુરક્ષા અને સારા નિર્ણયો માટે વ્યવહારુ ખેતી ટીપ્સ, પાક સંભાળનું જ્ઞાન અને AI આધારિત જાણકારી મેળવો.",
    "All": "બધા",
    "Crop Disease": "પાકનો રોગ",
    "Smart Farming": "સ્માર્ટ ખેતી",
    "Crop Care": "પાક સંભાળ",
    "AI & Technology": "AI અને ટેકનોલોજી",
    "Seasonal Tips": "મોસમી ટીપ્સ",
    "Search farming articles...": "ખેતીના લેખો શોધો...",
    "Early Signs of Crop Disease You Should Never Ignore": "પાકના રોગના શરૂઆતના સંકેતોને ક્યારેય અવગણશો નહીં",
    "Read Article": "લેખ વાંચો",
    "Latest Articles": "તાજેતરના લેખો",
    "Simple and useful knowledge for better farming.": "બહેતર ખેતી માટે સરળ અને ઉપયોગી જ્ઞાન.",
    "Read More": "વધુ વાંચો",
    "NEED HELP WITH YOUR CROP?": "તમારા પાક માટે મદદ જોઈએ?",
    "Don't just read about it. Check your crop.": "માત્ર વાંચશો નહીં. તમારો પાક તપાસો.",
    "Upload a photo and let Kisan Vision help identify possible crop diseases.": "ફોટો અપલોડ કરો અને Kisan Vision ને સંભવિત પાક રોગ ઓળખવામાં મદદ કરવા દો.",
    "Let's Grow": "ચાલો આગળ વધીએ",
    "Together": "સાથે મળીને",
    "Have a question, suggestion, or just want to say hello? We're here to help you on your farming journey.": "કોઈ પ્રશ્ન, સૂચન અથવા માત્ર હેલો કહેવું છે? તમારી ખેતીની મુસાફરીમાં મદદ કરવા અમે અહીં છીએ.",
    "Quick Response": "ઝડપી પ્રતિસાદ",
    "Farmer First": "ખેડૂત પ્રથમ",
    "Always Here": "હંમેશા અહીં",
    "Your feedback": "તમારો પ્રતિસાદ",
    "helps us grow": "અમને વધુ સારું બનવામાં મદદ કરે છે",
    "and serve better.": "અને વધુ સારી સેવા આપવા મદદ કરે છે.",
    "CALL US": "અમને કૉલ કરો",
    "EMAIL US": "ઈમેલ કરો",
    "We reply within 24 hours": "અમે 24 કલાકમાં જવાબ આપીએ છીએ",
    "VISIT US": "અમને મળો",
    "LIVE CHAT": "લાઇવ ચેટ",
    "Chat with our support team": "અમારી સપોર્ટ ટીમ સાથે ચેટ કરો",
    "Start Chat →": "ચેટ શરૂ કરો →",
    "Send Us a Message": "અમને સંદેશ મોકલો",
    "Fill out the form and we'll get back to you soon.": "ફોર્મ भरो અને અમે જલ્દી તમને સંપર્ક કરીશું.",
    "Your Name *": "તમારું નામ *",
    "Your Email *": "તમારો ઈમેલ *",
    "Phone Number": "ફોન નંબર",
    "Subject *": "વિષય *",
    "Select a subject": "વિષય પસંદ કરો",
    "General Inquiry": "સામાન્ય પૂછપરછ",
    "AI Disease Detection": "AI રોગ ઓળખ",
    "Farming Guidance": "ખેતી માર્ગદર્શન",
    "Technical Support": "ટેકનિકલ સપોર્ટ",
    "Partnership": "ભાગીદારી",
    "Other": "અન્ય",
    "Message *": "સંદેશ *",
    "Send Message →": "સંદેશ મોકલો →",
    "Our Location": "અમારું સ્થાન",
    "Frequently Asked Questions": "વારંવાર પૂછાતા પ્રશ્નો",
    "Quick answers to common questions.": "સામાન્ય પ્રશ્નોના ઝડપી જવાબો.",
    "Our Farming Experts": "અમારા કૃષિ નિષ્ણાતો",
    "Talk to people who know the soil.": "જેઓ જમીનને જાણે છે તેમની સાથે વાત કરો.",
    "Experienced Farmer": "અનુભવી ખેડૂત",
    "Contact →": "સંપર્ક →",
    "Need personalized advice?": "વ્યક્તિગત સલાહ જોઈએ?",
    "Connect with our experts and get guidance for your crops.": "અમારા નિષ્ણાતો સાથે જોડાઓ અને તમારા પાક માટે માર્ગદર્શન મેળવો.",
    "Still have questions?": "હજી પ્રશ્નો છે?",
    "Our team is always ready to help you.": "અમારી ટીમ તમારી મદદ માટે હંમેશા તૈયાર છે.",
    "Talk to Our Team →": "અમારી ટીમ સાથે વાત કરો →",
    "FOR A HEALTHIER TOMORROW": "તંદુરસ્ત આવતીકાલ માટે",
    "Empowering": "સશક્ત બનાવવું",
    "Farmers with": "ખેડૂતોને",
    "Smart Solutions": "સ્માર્ટ ઉકેલો",
    "Join Kisan Vision to access AI-powered crop insights, expert advice and modern farming resources — all in one place.": "Kisan Vision સાથે જોડાઓ અને AI આધારિત પાકની જાણકારી, નિષ્ણાત સલાહ અને આધુનિક ખેતીના સાધનો એક જ જગ્યાએ મેળવો.",
    "Detect crop diseases": "પાકના રોગ ઓળખો",
    "Upload a photo and get instant AI insights": "ફોટો અપલોડ કરો અને તરત AI જાણકારી મેળવો",
    "Learn modern farming": "આધુનિક ખેતી શીખો",
    "Step-by-step guides for better yield": "વધુ સારા ઉત્પાદન માટે પગલું-દર-પગલું માર્ગદર્શિકા",
    "Connect with experts": "નિષ્ણાતો સાથે જોડાઓ",
    "Get support from farming professionals": "ખેતી નિષ્ણાતો પાસેથી મદદ મેળવો",
    "Stronger Farmers’": "મજબૂત ખેડૂત",
    "Greener Future": "હરિયાળું ભવિષ્ય",
    "Welcome Back": "ફરી સ્વાગત છે",
    "Login to your Kisan Vision account and continue your journey towards smarter farming.": "તમારા Kisan Vision એકાઉન્ટમાં લૉગિન કરો અને સ્માર્ટ ખેતીની સફર ચાલુ રાખો.",
    "E-mail Address": "ઈ-મેલ સરનામું",
    "Password": "પાસવર્ડ",
    "Forgot Password?": "પાસવર્ડ ભૂલી ગયા?",
    "Don’t have an account?": "એકાઉન્ટ નથી?",
    "Sign Up": "સાઇન અપ કરો",
    "Using technology to support farmers, protect crops and build a healthier, greener tomorrow.": "ખેડૂતોને સહાય, પાકનું રક્ષણ અને તંદુરસ્ત, હરિયાળું ભવિષ્ય બનાવવા ટેકનોલોજીનો ઉપયોગ.",
    "Quick Links": "ઝડપી લિંક્સ",
    "Support": "સહાય",
    "Help Center": "મદદ કેન્દ્ર",
    "FAQs": "વારંવાર પૂછાતા પ્રશ્નો",
    "Privacy Policy": "ગોપનીયતા નીતિ",
    "Terms of Service": "સેવાની શરતો",
    "Newsletter": "ન્યૂઝલેટર",
    "Get the latest farming tips and updates.": "તાજી ખેતી ટીપ્સ અને અપડેટ મેળવો."
  }
};


  Object.assign(textTranslations.en, {
  "Build strong roots and healthy grain with timely care.": "Build strong roots and healthy grain with timely care.",
  "Keep water, spacing and nutrition in balance for a thriving paddy.": "Keep water, spacing and nutrition in balance for a thriving paddy.",
  "Support productive vines with sun, steady moisture and early checks.": "Support productive vines with sun, steady moisture and early checks.",
  "Prepare loose soil and protect growing tubers from stress.": "Prepare loose soil and protect growing tubers from stress.",
  "Give young plants room, sunlight and consistent nutrition.": "Give young plants room, sunlight and consistent nutrition.",
  "Plan healthy flowering with careful scouting and balanced feeding.": "Plan healthy flowering with careful scouting and balanced feeding.",
  "Oct – Apr": "Oct – Apr",
  "Jun – Nov": "Jun – Nov",
  "Nov – Feb": "Nov – Feb",
  "Oct – Jan": "Oct – Jan",
  "Jun – Oct": "Jun – Oct",
  "May – Dec": "May – Dec",
  "View Guide": "View Guide",
  "Learn how to maintain healthy and productive soil.": "Learn how to maintain healthy and productive soil.",
  "Understand efficient watering practices for healthier crops.": "Understand efficient watering practices for healthier crops.",
  "Learn how to use nutrients effectively for better crop growth.": "Learn how to use nutrients effectively for better crop growth.",
  "Identify common pests and learn preventive crop-care practices.": "Identify common pests and learn preventive crop-care practices.",
  "Kharif Season": "Kharif Season",
  "Rabi Season": "Rabi Season",
  "Zaid Season": "Zaid Season",
  "Year-Round Crop Care": "Year-Round Crop Care",
  "Make the most of monsoon moisture with timely sowing and drainage.": "Make the most of monsoon moisture with timely sowing and drainage.",
  "Use the cool, clear months to build steady growth and strong grain.": "Use the cool, clear months to build steady growth and strong grain.",
  "Protect short-season crops with careful irrigation and shade planning.": "Protect short-season crops with careful irrigation and shade planning.",
  "Keep scouting, recording and improving your field habits all year.": "Keep scouting, recording and improving your field habits all year.",
  "Explore Tips": "Explore Tips",
  "0 / 8 complete": "0 / 8 complete",
  "Prepare healthy soil": "Prepare healthy soil",
  "Choose quality seeds": "Choose quality seeds",
  "Water crops properly": "Water crops properly",
  "Monitor plants regularly": "Monitor plants regularly",
  "Watch for early signs of disease": "Watch for early signs of disease",
  "Manage pests carefully": "Manage pests carefully",
  "Apply nutrients at the right time": "Apply nutrients at the right time",
  "Harvest at the right stage": "Harvest at the right stage",
  "Guide details": "Guide details",
  "Save this tip for your next field visit.": "Save this tip for your next field visit.",
  "Got it": "Got it",
  "Crop guide": "Crop guide",
  "Seasonal guide": "Seasonal guide",
  "Essential practice": "Essential practice",
  "5 Early Signs of Crop Disease You Should Never Ignore": "5 Early Signs of Crop Disease You Should Never Ignore",
  "Smart Irrigation: Give Your Crops the Right Amount of Water": "Smart Irrigation: Give Your Crops the Right Amount of Water",
  "How AI is Changing Modern Farming": "How AI is Changing Modern Farming",
  "How to Keep Your Soil Healthy": "How to Keep Your Soil Healthy",
  "Common Crop Pests and How to Prevent Them": "Common Crop Pests and How to Prevent Them",
  "Seasonal Farming Tips for Better Yield": "Seasonal Farming Tips for Better Yield",
  "FARMING KNOWLEDGE": "FARMING KNOWLEDGE",
  "CROP DISEASE": "CROP DISEASE",
  "SMART FARMING": "SMART FARMING",
  "CROP CARE": "CROP CARE",
  "AI & TECHNOLOGY": "AI & TECHNOLOGY",
  "SEASONAL TIPS": "SEASONAL TIPS"
});
  Object.assign(textTranslations.hi, {
  "Build strong roots and healthy grain with timely care.": "समय पर देखभाल से मजबूत जड़ें और स्वस्थ दाने तैयार करें।",
  "Keep water, spacing and nutrition in balance for a thriving paddy.": "अच्छी धान की फसल के लिए पानी, दूरी और पोषण का संतुलन रखें।",
  "Support productive vines with sun, steady moisture and early checks.": "धूप, नियमित नमी और शुरुआती जांच से पौधों की अच्छी बढ़वार बनाए रखें।",
  "Prepare loose soil and protect growing tubers from stress.": "ढीली मिट्टी तैयार करें और बढ़ते कंदों को तनाव से बचाएं।",
  "Give young plants room, sunlight and consistent nutrition.": "छोटे पौधों को पर्याप्त जगह, धूप और नियमित पोषण दें।",
  "Plan healthy flowering with careful scouting and balanced feeding.": "नियमित निगरानी और संतुलित पोषण से स्वस्थ फूल आने की योजना बनाएं।",
  "Oct – Apr": "अक्टूबर – अप्रैल",
  "Jun – Nov": "जून – नवंबर",
  "Nov – Feb": "नवंबर – फरवरी",
  "Oct – Jan": "अक्टूबर – जनवरी",
  "Jun – Oct": "जून – अक्टूबर",
  "May – Dec": "मई – दिसंबर",
  "View Guide": "गाइड देखें",
  "Learn how to maintain healthy and productive soil.": "स्वस्थ और उपजाऊ मिट्टी बनाए रखना सीखें।",
  "Understand efficient watering practices for healthier crops.": "स्वस्थ फसलों के लिए कुशल सिंचाई के तरीके समझें।",
  "Learn how to use nutrients effectively for better crop growth.": "बेहतर फसल वृद्धि के लिए पोषक तत्वों का प्रभावी उपयोग सीखें।",
  "Identify common pests and learn preventive crop-care practices.": "सामान्य कीटों की पहचान करें और बचाव के तरीके सीखें।",
  "Kharif Season": "खरीफ मौसम",
  "Rabi Season": "रबी मौसम",
  "Zaid Season": "जायद मौसम",
  "Year-Round Crop Care": "साल भर फसल देखभाल",
  "Make the most of monsoon moisture with timely sowing and drainage.": "समय पर बुवाई और जल निकासी से मानसून की नमी का पूरा लाभ लें।",
  "Use the cool, clear months to build steady growth and strong grain.": "ठंडे और साफ महीनों में स्थिर वृद्धि और मजबूत दाने विकसित करें।",
  "Protect short-season crops with careful irrigation and shade planning.": "सावधानी से सिंचाई और छाया की योजना बनाकर कम अवधि वाली फसलों की रक्षा करें।",
  "Keep scouting, recording and improving your field habits all year.": "पूरे साल निगरानी, रिकॉर्डिंग और खेत की आदतों में सुधार करते रहें।",
  "Explore Tips": "सुझाव देखें",
  "0 / 8 complete": "0 / 8 पूरे",
  "Prepare healthy soil": "स्वस्थ मिट्टी तैयार करें",
  "Choose quality seeds": "अच्छे बीज चुनें",
  "Water crops properly": "फसलों को सही पानी दें",
  "Monitor plants regularly": "पौधों की नियमित निगरानी करें",
  "Watch for early signs of disease": "रोग के शुरुआती संकेत देखें",
  "Manage pests carefully": "कीटों का सावधानी से प्रबंधन करें",
  "Apply nutrients at the right time": "सही समय पर पोषक तत्व दें",
  "Harvest at the right stage": "सही अवस्था पर कटाई करें",
  "Guide details": "गाइड विवरण",
  "Save this tip for your next field visit.": "अगली खेत यात्रा के लिए इस सुझाव को याद रखें।",
  "Got it": "समझ गया",
  "Crop guide": "फसल गाइड",
  "Seasonal guide": "मौसमी गाइड",
  "Essential practice": "जरूरी अभ्यास",
  "5 Early Signs of Crop Disease You Should Never Ignore": "फसल रोग के 5 शुरुआती संकेत जिन्हें कभी नज़रअंदाज़ न करें",
  "Smart Irrigation: Give Your Crops the Right Amount of Water": "स्मार्ट सिंचाई: फसलों को सही मात्रा में पानी दें",
  "How AI is Changing Modern Farming": "AI आधुनिक खेती को कैसे बदल रहा है",
  "How to Keep Your Soil Healthy": "अपनी मिट्टी को स्वस्थ कैसे रखें",
  "Common Crop Pests and How to Prevent Them": "सामान्य फसल कीट और उनसे बचाव",
  "Seasonal Farming Tips for Better Yield": "बेहतर पैदावार के लिए मौसमी खेती सुझाव",
  "FARMING KNOWLEDGE": "खेती का ज्ञान",
  "CROP DISEASE": "फसल रोग",
  "SMART FARMING": "स्मार्ट खेती",
  "CROP CARE": "फसल देखभाल",
  "AI & TECHNOLOGY": "AI और तकनीक",
  "SEASONAL TIPS": "मौसमी सुझाव"
});
  Object.assign(textTranslations.mr, {
  "Build strong roots and healthy grain with timely care.": "वेळीच काळजी घेऊन मजबूत मुळे आणि निरोगी दाणे तयार करा.",
  "Keep water, spacing and nutrition in balance for a thriving paddy.": "चांगल्या भात पिकासाठी पाणी, अंतर आणि पोषण यांचा समतोल ठेवा.",
  "Support productive vines with sun, steady moisture and early checks.": "सूर्यप्रकाश, सातत्यपूर्ण ओलावा आणि लवकर तपासणीने चांगली वाढ राखा.",
  "Prepare loose soil and protect growing tubers from stress.": "सैल माती तयार करा आणि वाढणाऱ्या कंदांना ताणापासून वाचवा.",
  "Give young plants room, sunlight and consistent nutrition.": "लहान रोपांना पुरेशी जागा, सूर्यप्रकाश आणि सातत्यपूर्ण पोषण द्या.",
  "Plan healthy flowering with careful scouting and balanced feeding.": "काळजीपूर्वक पाहणी आणि संतुलित पोषणाने निरोगी फुलोऱ्याचे नियोजन करा.",
  "Oct – Apr": "ऑक्टोबर – एप्रिल",
  "Jun – Nov": "जून – नोव्हेंबर",
  "Nov – Feb": "नोव्हेंबर – फेब्रुवारी",
  "Oct – Jan": "ऑक्टोबर – जानेवारी",
  "Jun – Oct": "जून – ऑक्टोबर",
  "May – Dec": "मे – डिसेंबर",
  "View Guide": "मार्गदर्शक पहा",
  "Learn how to maintain healthy and productive soil.": "निरोगी आणि उत्पादक माती कशी राखावी ते शिका.",
  "Understand efficient watering practices for healthier crops.": "निरोगी पिकांसाठी कार्यक्षम सिंचन पद्धती समजून घ्या.",
  "Learn how to use nutrients effectively for better crop growth.": "चांगल्या पीक वाढीसाठी पोषकद्रव्यांचा प्रभावी वापर कसा करावा ते शिका.",
  "Identify common pests and learn preventive crop-care practices.": "सामान्य किडी ओळखा आणि प्रतिबंधात्मक पीक काळजी पद्धती शिका.",
  "Kharif Season": "खरीप हंगाम",
  "Rabi Season": "रब्बी हंगाम",
  "Zaid Season": "उन्हाळी हंगाम",
  "Year-Round Crop Care": "वर्षभर पीक काळजी",
  "Make the most of monsoon moisture with timely sowing and drainage.": "वेळीच पेरणी आणि निचरा करून मान्सूनच्या ओलाव्याचा योग्य वापर करा.",
  "Use the cool, clear months to build steady growth and strong grain.": "थंड आणि स्वच्छ महिन्यांत स्थिर वाढ व मजबूत दाणे तयार करा.",
  "Protect short-season crops with careful irrigation and shade planning.": "काळजीपूर्वक सिंचन आणि सावलीचे नियोजन करून कमी कालावधीच्या पिकांचे संरक्षण करा.",
  "Keep scouting, recording and improving your field habits all year.": "संपूर्ण वर्ष पाहणी, नोंद ठेवणे आणि शेतातील सवयी सुधारत रहा.",
  "Explore Tips": "टिप्स पहा",
  "0 / 8 complete": "0 / 8 पूर्ण",
  "Prepare healthy soil": "निरोगी माती तयार करा",
  "Choose quality seeds": "चांगली बियाणे निवडा",
  "Water crops properly": "पिकांना योग्य पाणी द्या",
  "Monitor plants regularly": "पिकांची नियमित पाहणी करा",
  "Watch for early signs of disease": "रोगाची सुरुवातीची लक्षणे पाहा",
  "Manage pests carefully": "किडींचे काळजीपूर्वक व्यवस्थापन करा",
  "Apply nutrients at the right time": "योग्य वेळी पोषकद्रव्ये द्या",
  "Harvest at the right stage": "योग्य अवस्थेत कापणी करा",
  "Guide details": "मार्गदर्शक तपशील",
  "Save this tip for your next field visit.": "पुढील शेतभेटीसाठी ही टिप लक्षात ठेवा.",
  "Got it": "समजले",
  "Crop guide": "पीक मार्गदर्शक",
  "Seasonal guide": "हंगामी मार्गदर्शक",
  "Essential practice": "आवश्यक पद्धत",
  "5 Early Signs of Crop Disease You Should Never Ignore": "पिक रोगाची 5 सुरुवातीची लक्षणे कधीही दुर्लक्षित करू नका",
  "Smart Irrigation: Give Your Crops the Right Amount of Water": "स्मार्ट सिंचन: पिकांना योग्य प्रमाणात पाणी द्या",
  "How AI is Changing Modern Farming": "AI आधुनिक शेती कशी बदलत आहे",
  "How to Keep Your Soil Healthy": "तुमची माती निरोगी कशी ठेवावी",
  "Common Crop Pests and How to Prevent Them": "सामान्य पीक किडी आणि त्यांचा प्रतिबंध",
  "Seasonal Farming Tips for Better Yield": "चांगल्या उत्पादनासाठी हंगामी शेती टिप्स",
  "FARMING KNOWLEDGE": "शेतीचे ज्ञान",
  "CROP DISEASE": "पीक रोग",
  "SMART FARMING": "स्मार्ट शेती",
  "CROP CARE": "पीक काळजी",
  "AI & TECHNOLOGY": "AI आणि तंत्रज्ञान",
  "SEASONAL TIPS": "हंगामी टिप्स"
});
  Object.assign(textTranslations.pa, {
  "Build strong roots and healthy grain with timely care.": "ਸਮੇਂ ਸਿਰ ਦੇਖਭਾਲ ਨਾਲ ਮਜ਼ਬੂਤ ਜੜ੍ਹਾਂ ਅਤੇ ਸਿਹਤਮੰਦ ਦਾਣੇ ਬਣਾਓ।",
  "Keep water, spacing and nutrition in balance for a thriving paddy.": "ਚੰਗੀ ਝੋਨੇ ਦੀ ਫਸਲ ਲਈ ਪਾਣੀ, ਫਾਸਲਾ ਅਤੇ ਪੋਸ਼ਣ ਦਾ ਸੰਤੁਲਨ ਰੱਖੋ।",
  "Support productive vines with sun, steady moisture and early checks.": "ਧੁੱਪ, ਲਗਾਤਾਰ ਨਮੀ ਅਤੇ ਸ਼ੁਰੂਆਤੀ ਜਾਂਚ ਨਾਲ ਚੰਗੀ ਵਾਧ ਨੂੰ ਸਹਾਰਾ ਦਿਓ।",
  "Prepare loose soil and protect growing tubers from stress.": "ਢਿੱਲੀ ਮਿੱਟੀ ਤਿਆਰ ਕਰੋ ਅਤੇ ਵਧ ਰਹੇ ਕੰਦਾਂ ਨੂੰ ਤਣਾਅ ਤੋਂ ਬਚਾਓ।",
  "Give young plants room, sunlight and consistent nutrition.": "ਛੋਟੇ ਪੌਦਿਆਂ ਨੂੰ ਜਗ੍ਹਾ, ਧੁੱਪ ਅਤੇ ਲਗਾਤਾਰ ਪੋਸ਼ਣ ਦਿਓ।",
  "Plan healthy flowering with careful scouting and balanced feeding.": "ਧਿਆਨ ਨਾਲ ਨਿਗਰਾਨੀ ਅਤੇ ਸੰਤੁਲਿਤ ਖੁਰਾਕ ਨਾਲ ਸਿਹਤਮੰਦ ਫੁੱਲ ਆਉਣ ਦੀ ਯੋਜਨਾ ਬਣਾਓ।",
  "Oct – Apr": "ਅਕਤੂਬਰ – ਅਪ੍ਰੈਲ",
  "Jun – Nov": "ਜੂਨ – ਨਵੰਬਰ",
  "Nov – Feb": "ਨਵੰਬਰ – ਫਰਵਰੀ",
  "Oct – Jan": "ਅਕਤੂਬਰ – ਜਨਵਰੀ",
  "Jun – Oct": "ਜੂਨ – ਅਕਤੂਬਰ",
  "May – Dec": "ਮਈ – ਦਸੰਬਰ",
  "View Guide": "ਗਾਈਡ ਵੇਖੋ",
  "Learn how to maintain healthy and productive soil.": "ਸਿਹਤਮੰਦ ਅਤੇ ਉਪਜਾਊ ਮਿੱਟੀ ਬਣਾਈ ਰੱਖਣਾ ਸਿੱਖੋ।",
  "Understand efficient watering practices for healthier crops.": "ਸਿਹਤਮੰਦ ਫਸਲਾਂ ਲਈ ਕੁਸ਼ਲ ਸਿੰਚਾਈ ਦੇ ਤਰੀਕੇ ਸਮਝੋ।",
  "Learn how to use nutrients effectively for better crop growth.": "ਵਧੀਆ ਫਸਲ ਵਾਧੇ ਲਈ ਪੋਸ਼ਕ ਤੱਤਾਂ ਦੀ ਪ੍ਰਭਾਵਸ਼ਾਲੀ ਵਰਤੋਂ ਸਿੱਖੋ।",
  "Identify common pests and learn preventive crop-care practices.": "ਆਮ ਕੀਟਾਂ ਦੀ ਪਛਾਣ ਕਰੋ ਅਤੇ ਰੋਕਥਾਮੀ ਫਸਲ ਦੇਖਭਾਲ ਸਿੱਖੋ।",
  "Kharif Season": "ਖਰੀਫ ਮੌਸਮ",
  "Rabi Season": "ਰਬੀ ਮੌਸਮ",
  "Zaid Season": "ਜ਼ਾਇਦ ਮੌਸਮ",
  "Year-Round Crop Care": "ਸਾਲ ਭਰ ਫਸਲ ਦੀ ਦੇਖਭਾਲ",
  "Make the most of monsoon moisture with timely sowing and drainage.": "ਸਮੇਂ ਸਿਰ ਬਿਜਾਈ ਅਤੇ ਨਿਕਾਸੀ ਨਾਲ ਮਾਨਸੂਨ ਦੀ ਨਮੀ ਦਾ ਪੂਰਾ ਲਾਭ ਲਵੋ।",
  "Use the cool, clear months to build steady growth and strong grain.": "ਠੰਢੇ ਮਹੀਨਿਆਂ ਵਿੱਚ ਸਥਿਰ ਵਾਧ ਅਤੇ ਮਜ਼ਬੂਤ ਦਾਣੇ ਬਣਾਓ।",
  "Protect short-season crops with careful irrigation and shade planning.": "ਸਾਵਧਾਨ ਸਿੰਚਾਈ ਅਤੇ ਛਾਂ ਦੀ ਯੋਜਨਾ ਨਾਲ ਛੋਟੇ ਮੌਸਮ ਵਾਲੀਆਂ ਫਸਲਾਂ ਦੀ ਰੱਖਿਆ ਕਰੋ।",
  "Keep scouting, recording and improving your field habits all year.": "ਸਾਰਾ ਸਾਲ ਨਿਗਰਾਨੀ, ਰਿਕਾਰਡਿੰਗ ਅਤੇ ਖੇਤੀ ਦੀਆਂ ਆਦਤਾਂ ਵਿੱਚ ਸੁਧਾਰ ਕਰਦੇ ਰਹੋ।",
  "Explore Tips": "ਸੁਝਾਅ ਵੇਖੋ",
  "0 / 8 complete": "0 / 8 ਪੂਰੇ",
  "Prepare healthy soil": "ਸਿਹਤਮੰਦ ਮਿੱਟੀ ਤਿਆਰ ਕਰੋ",
  "Choose quality seeds": "ਚੰਗੇ ਬੀਜ ਚੁਣੋ",
  "Water crops properly": "ਫਸਲਾਂ ਨੂੰ ਸਹੀ ਪਾਣੀ ਦਿਓ",
  "Monitor plants regularly": "ਪੌਦਿਆਂ ਦੀ ਨਿਯਮਿਤ ਨਿਗਰਾਨੀ ਕਰੋ",
  "Watch for early signs of disease": "ਬਿਮਾਰੀ ਦੇ ਸ਼ੁਰੂਆਤੀ ਨਿਸ਼ਾਨ ਵੇਖੋ",
  "Manage pests carefully": "ਕੀਟਾਂ ਦਾ ਸਾਵਧਾਨੀ ਨਾਲ ਪ੍ਰਬੰਧ ਕਰੋ",
  "Apply nutrients at the right time": "ਸਹੀ ਸਮੇਂ ਪੋਸ਼ਕ ਤੱਤ ਦਿਓ",
  "Harvest at the right stage": "ਸਹੀ ਪੜਾਅ 'ਤੇ ਕਟਾਈ ਕਰੋ",
  "Guide details": "ਗਾਈਡ ਵੇਰਵੇ",
  "Save this tip for your next field visit.": "ਅਗਲੀ ਖੇਤ ਯਾਤਰਾ ਲਈ ਇਸ ਸੁਝਾਅ ਨੂੰ ਯਾਦ ਰੱਖੋ।",
  "Got it": "ਸਮਝ ਗਿਆ",
  "Crop guide": "ਫਸਲ ਗਾਈਡ",
  "Seasonal guide": "ਮੌਸਮੀ ਗਾਈਡ",
  "Essential practice": "ਜ਼ਰੂਰੀ ਅਭਿਆਸ",
  "5 Early Signs of Crop Disease You Should Never Ignore": "ਫਸਲ ਦੀ ਬਿਮਾਰੀ ਦੇ 5 ਸ਼ੁਰੂਆਤੀ ਨਿਸ਼ਾਨ ਜਿਨ੍ਹਾਂ ਨੂੰ ਕਦੇ ਨਜ਼ਰਅੰਦਾਜ਼ ਨਾ ਕਰੋ",
  "Smart Irrigation: Give Your Crops the Right Amount of Water": "ਸਮਾਰਟ ਸਿੰਚਾਈ: ਫਸਲਾਂ ਨੂੰ ਸਹੀ ਮਾਤਰਾ ਵਿੱਚ ਪਾਣੀ ਦਿਓ",
  "How AI is Changing Modern Farming": "AI ਆਧੁਨਿਕ ਖੇਤੀ ਨੂੰ ਕਿਵੇਂ ਬਦਲ ਰਿਹਾ ਹੈ",
  "How to Keep Your Soil Healthy": "ਆਪਣੀ ਮਿੱਟੀ ਨੂੰ ਸਿਹਤਮੰਦ ਕਿਵੇਂ ਰੱਖਣਾ ਹੈ",
  "Common Crop Pests and How to Prevent Them": "ਆਮ ਫਸਲੀ ਕੀਟ ਅਤੇ ਉਨ੍ਹਾਂ ਤੋਂ ਬਚਾਅ",
  "Seasonal Farming Tips for Better Yield": "ਵਧੀਆ ਪੈਦਾਵਾਰ ਲਈ ਮੌਸਮੀ ਖੇਤੀ ਸੁਝਾਅ",
  "FARMING KNOWLEDGE": "ਖੇਤੀ ਦਾ ਗਿਆਨ",
  "CROP DISEASE": "ਫਸਲ ਦੀ ਬਿਮਾਰੀ",
  "SMART FARMING": "ਸਮਾਰਟ ਖੇਤੀ",
  "CROP CARE": "ਫਸਲ ਦੀ ਦੇਖਭਾਲ",
  "AI & TECHNOLOGY": "AI ਅਤੇ ਤਕਨਾਲੋਜੀ",
  "SEASONAL TIPS": "ਮੌਸਮੀ ਸੁਝਾਅ"
});
  Object.assign(textTranslations.gu, {
  "Build strong roots and healthy grain with timely care.": "સમયસર સંભાળથી મજબૂત મૂળ અને તંદુરસ્ત દાણા વિકસાવો.",
  "Keep water, spacing and nutrition in balance for a thriving paddy.": "સારા ડાંગર પાક માટે પાણી, અંતર અને પોષણનું સંતુલન રાખો.",
  "Support productive vines with sun, steady moisture and early checks.": "સૂર્યપ્રકાશ, સતત ભેજ અને વહેલી તપાસથી સારી વૃદ્ધિ જાળવો.",
  "Prepare loose soil and protect growing tubers from stress.": "ઢીલી જમીન તૈયાર કરો અને વિકસતા કંદોને તાણથી બચાવો.",
  "Give young plants room, sunlight and consistent nutrition.": "નાના છોડને જગ્યા, સૂર્યપ્રકાશ અને સતત પોષણ આપો.",
  "Plan healthy flowering with careful scouting and balanced feeding.": "સાવચેતીપૂર્વક નિરીક્ષણ અને સંતુલિત પોષણથી સ્વસ્થ ફૂલધારણનું આયોજન કરો.",
  "Oct – Apr": "ઓક્ટોબર – એપ્રિલ",
  "Jun – Nov": "જૂન – નવેમ્બર",
  "Nov – Feb": "નવેમ્બર – ફેબ્રુઆરી",
  "Oct – Jan": "ઓક્ટોબર – જાન્યુઆરી",
  "Jun – Oct": "જૂન – ઓક્ટોબર",
  "May – Dec": "મે – ડિસેમ્બર",
  "View Guide": "માર્ગદર્શિકા જુઓ",
  "Learn how to maintain healthy and productive soil.": "સ્વસ્થ અને ઉત્પાદક જમીન જાળવવાનું શીખો.",
  "Understand efficient watering practices for healthier crops.": "સ્વસ્થ પાક માટે કાર્યક્ષમ સિંચાઈ પદ્ધતિઓ સમજો.",
  "Learn how to use nutrients effectively for better crop growth.": "વધુ સારી પાક વૃદ્ધિ માટે પોષક તત્વોનો અસરકારક ઉપયોગ શીખો.",
  "Identify common pests and learn preventive crop-care practices.": "સામાન્ય જીવાતો ઓળખો અને નિવારક પાક સંભાળની રીતો શીખો.",
  "Kharif Season": "ખરીફ સીઝન",
  "Rabi Season": "રબી સીઝન",
  "Zaid Season": "ઝાયદ સીઝન",
  "Year-Round Crop Care": "આખું વર્ષ પાક સંભાળ",
  "Make the most of monsoon moisture with timely sowing and drainage.": "સમયસર વાવણી અને ડ્રેનેજથી ચોમાસાની ભેજનો સારો ઉપયોગ કરો.",
  "Use the cool, clear months to build steady growth and strong grain.": "ઠંડા મહિનાઓનો ઉપયોગ સ્થિર વૃદ્ધિ અને મજબૂત દાણા માટે કરો.",
  "Protect short-season crops with careful irrigation and shade planning.": "સાવચેતીપૂર્વક સિંચાઈ અને છાંયાની યોજના વડે ટૂંકા ગાળાના પાકનું રક્ષણ કરો.",
  "Keep scouting, recording and improving your field habits all year.": "આખું વર્ષ નિરીક્ષણ, નોંધ અને ખેતરની આદતોમાં સુધારો કરતા રહો.",
  "Explore Tips": "ટીપ્સ જુઓ",
  "0 / 8 complete": "0 / 8 પૂર્ણ",
  "Prepare healthy soil": "સ્વસ્થ જમીન તૈયાર કરો",
  "Choose quality seeds": "ગુણવત્તાવાળા બીજ પસંદ કરો",
  "Water crops properly": "પાકને યોગ્ય પાણી આપો",
  "Monitor plants regularly": "છોડનું નિયમિત નિરીક્ષણ કરો",
  "Watch for early signs of disease": "રોગના શરૂઆતના સંકેતો જુઓ",
  "Manage pests carefully": "જીવાતોનું સાવચેતીપૂર્વક સંચાલન કરો",
  "Apply nutrients at the right time": "યોગ્ય સમયે પોષક તત્વો આપો",
  "Harvest at the right stage": "યોગ્ય તબક્કે કાપણી કરો",
  "Guide details": "માર્ગદર્શિકા વિગતો",
  "Save this tip for your next field visit.": "આગામી ખેતર મુલાકાત માટે આ ટીપ યાદ રાખો.",
  "Got it": "સમજાયું",
  "Crop guide": "પાક માર્ગદર્શિકા",
  "Seasonal guide": "મોસમી માર્ગદર્શિકા",
  "Essential practice": "આવશ્યક પદ્ધતિ",
  "5 Early Signs of Crop Disease You Should Never Ignore": "પાકના રોગના 5 શરૂઆતના સંકેતોને ક્યારેય અવગણશો નહીં",
  "Smart Irrigation: Give Your Crops the Right Amount of Water": "સ્માર્ટ સિંચાઈ: તમારા પાકને યોગ્ય માત્રામાં પાણી આપો",
  "How AI is Changing Modern Farming": "AI આધુનિક ખેતીને કેવી રીતે બદલી રહ્યું છે",
  "How to Keep Your Soil Healthy": "તમારી જમીનને સ્વસ્થ કેવી રીતે રાખવી",
  "Common Crop Pests and How to Prevent Them": "સામાન્ય પાક જીવાતો અને તેમની રોકથામ",
  "Seasonal Farming Tips for Better Yield": "વધુ સારા ઉત્પાદન માટે મોસમી ખેતી ટીપ્સ",
  "FARMING KNOWLEDGE": "ખેતીનું જ્ઞાન",
  "CROP DISEASE": "પાકનો રોગ",
  "SMART FARMING": "સ્માર્ટ ખેતી",
  "CROP CARE": "પાક સંભાળ",
  "AI & TECHNOLOGY": "AI અને ટેકનોલોજી",
  "SEASONAL TIPS": "મોસમી ટીપ્સ"
});

  
  // Supplemental translations for remaining primary-page UI text.
  Object.assign(textTranslations.en, {"Your browser does not support the video tag.": "Your browser does not support the video tag.", "© 2026 Kisan Vision": "© 2026 Kisan Vision", "Turning Crop Care into": "Turning Crop Care into", "Explore Our Approach": "Explore Our Approach", "Knowledge": "Knowledge", "That Works": "That Works", "Simple": "Simple", "and Clear": "and Clear", "Built for": "Built for", "Farmers": "Farmers", "A Healthier": "A Healthier", "Tomorrow": "Tomorrow", "Explore": "Explore", "Selected Images": "Selected Images", "No specific symptom data available for this prediction.": "No specific symptom data available for this prediction.", "No management recommendations available.": "No management recommendations available.", "No alternative predictions returned.": "No alternative predictions returned.", "Important:": "Important:", "Kisan Vision AI provides a screening and decision-support result. Always verify the diagnosis with a qualified agricultural expert and follow current local agricultural guidance and product labels before applying any treatment.": "Kisan Vision AI provides a screening and decision-support result. Always verify the diagnosis with a qualified agricultural expert and follow current local agricultural guidance and product labels before applying any treatment.", "Empowering farmers with AI-driven crop insights.": "Empowering farmers with AI-driven crop insights.", "Kisan Vision. All rights reserved.": "Kisan Vision. All rights reserved.", "Skip to content": "Skip to content", "Open navigation menu": "Open navigation menu", "Choose language": "Choose language", "Grow Better With the Right": "Grow Better With the Right", "Farming Guidance.": "Farming Guidance.", "Simple, practical and easy-to-follow farming guidance to help you care for your crops, improve soil health and make better decisions throughout the season.": "Simple, practical and easy-to-follow farming guidance to help you care for your crops, improve soil health and make better decisions throughout the season.", "Explore Crop Guides": "Explore Crop Guides", "Guidance made for every growing season": "Guidance made for every growing season", "essential crop": "essential crop", "guides": "guides", "Practical tips": "Practical tips", "for healthier crops": "for healthier crops", "Start with your crop": "Start with your crop", "Build strong roots and healthy grain with timely care.": "Build strong roots and healthy grain with timely care.", "View Guide": "View Guide", "Keep water, spacing and nutrition in balance for a thriving paddy.": "Keep water, spacing and nutrition in balance for a thriving paddy.", "Support productive vines with sun, steady moisture and early checks.": "Support productive vines with sun, steady moisture and early checks.", "Prepare loose soil and protect growing tubers from stress.": "Prepare loose soil and protect growing tubers from stress.", "Give young plants room, sunlight and consistent nutrition.": "Give young plants room, sunlight and consistent nutrition.", "Plan healthy flowering with careful scouting and balanced feeding.": "Plan healthy flowering with careful scouting and balanced feeding.", "Learn how to maintain healthy and productive soil.": "Learn how to maintain healthy and productive soil.", "Learn more": "Learn more", "Understand efficient watering practices for healthier crops.": "Understand efficient watering practices for healthier crops.", "Learn how to use nutrients effectively for better crop growth.": "Learn how to use nutrients effectively for better crop growth.", "Identify common pests and learn preventive crop-care practices.": "Identify common pests and learn preventive crop-care practices.", "Kharif Season": "Kharif Season", "Make the most of monsoon moisture with timely sowing and drainage.": "Make the most of monsoon moisture with timely sowing and drainage.", "Explore Tips": "Explore Tips", "Rabi Season": "Rabi Season", "Use the cool, clear months to build steady growth and strong grain.": "Use the cool, clear months to build steady growth and strong grain.", "Zaid Season": "Zaid Season", "Protect short-season crops with careful irrigation and shade planning.": "Protect short-season crops with careful irrigation and shade planning.", "Year-Round Crop Care": "Year-Round Crop Care", "Keep scouting, recording and improving your field habits all year.": "Keep scouting, recording and improving your field habits all year.", "Use this quick checklist as you move from preparation to harvest. Every checked step is progress.": "Use this quick checklist as you move from preparation to harvest. Every checked step is progress.", "A smarter second opinion": "A smarter second opinion", "Not Sure What's Wrong": "Not Sure What's Wrong", "With Your Crop?": "With Your Crop?", "Rooted in better farming": "Rooted in better farming", "Practical guidance": "Practical guidance", "Guide details": "Guide details", "Save this tip for your next field visit.": "Save this tip for your next field visit.", "Got it": "Got it", "Learn. Grow.": "Learn. Grow.", "CROP DISEASE": "CROP DISEASE", "Crop diseases can spread quickly and affect your entire harvest. Learn how to recognize early warning signs and take action before the problem becomes serious.": "Crop diseases can spread quickly and affect your entire harvest. Learn how to recognize early warning signs and take action before the problem becomes serious.", "🌱 Kisan Vision": "🌱 Kisan Vision", "Read Article": "Read Article", "FARMING KNOWLEDGE": "FARMING KNOWLEDGE", "Learn how yellowing leaves, unusual spots and wilting can indicate a possible crop disease.": "Learn how yellowing leaves, unusual spots and wilting can indicate a possible crop disease.", "Read More →": "Read More →", "SMART FARMING": "SMART FARMING", "Discover simple irrigation practices that can help maintain healthy crops and reduce water waste.": "Discover simple irrigation practices that can help maintain healthy crops and reduce water waste.", "AI & Technology": "AI & Technology", "How AI is Changing Modern Farming": "How AI is Changing Modern Farming", "Discover how Artificial Intelligence can help farmers identify crop problems and make better decisions.": "Discover how Artificial Intelligence can help farmers identify crop problems and make better decisions.", "CROP CARE": "CROP CARE", "How to Keep Your Soil Healthy": "How to Keep Your Soil Healthy", "Healthy soil is the foundation of a healthy crop. Learn simple soil-care practices for better plant growth.": "Healthy soil is the foundation of a healthy crop. Learn simple soil-care practices for better plant growth.", "Common Crop Pests and How to Prevent Them": "Common Crop Pests and How to Prevent Them", "Learn how to identify common pests and take preventive steps to protect your crops.": "Learn how to identify common pests and take preventive steps to protect your crops.", "SEASONAL TIPS": "SEASONAL TIPS", "Seasonal Farming Tips for Better Yield": "Seasonal Farming Tips for Better Yield", "Explore practical tips for preparing your field, managing water and protecting crops throughout the season.": "Explore practical tips for preparing your field, managing water and protecting crops throughout the season.", "Detect Crop Disease →": "Detect Crop Disease →", "GET IN TOUCH": "GET IN TOUCH", "Let's Grow": "Let's Grow", "Quick Response": "Quick Response", "Farmer First": "Farmer First", "Always Here": "Always Here", "Your feedback": "Your feedback", "helps us grow": "helps us grow", "and serve better.": "and serve better.", "Your information is safe with us. We never share your details.": "Your information is safe with us. We never share your details.", "Find us on the map.": "Find us on the map.", "How can I report a problem with the AI detection?": "How can I report a problem with the AI detection?", "You can describe the issue using the contact form and our team will review it.": "You can describe the issue using the contact form and our team will review it.", "Do you provide support for regional languages?": "Do you provide support for regional languages?", "Yes, Kisan Vision is designed with farmer-friendly and accessible communication in mind.": "Yes, Kisan Vision is designed with farmer-friendly and accessible communication in mind.", "Can I collaborate or partner with Kisan Vision?": "Can I collaborate or partner with Kisan Vision?", "Yes. Choose Partnership from the subject dropdown and send us your details.": "Yes. Choose Partnership from the subject dropdown and send us your details.", "Our team is always ready to help you.": "Our team is always ready to help you.", "Because your growth matters to us.": "Because your growth matters to us.", "Smart Farming Brighter Tomorrow": "Smart Farming Brighter Tomorrow", "Empowering farmers with AI-driven insights": "Empowering farmers with AI-driven insights", "for a healthier and more productive future.": "for a healthier and more productive future.", "Feedback": "Feedback", "Follow Us": "Follow Us", "\"Good Farming\nBuilds Better Tomorrows.\"": "\"Good Farming\nBuilds Better Tomorrows.\"", "Made with ♡ for Farmers": "Made with ♡ for Farmers", "Smarter Farming • Brighter Tomorrow": "Smarter Farming • Brighter Tomorrow", "FOR A HEALTHIER TOMORROW": "FOR A HEALTHIER TOMORROW", "Empowering": "Empowering", "Farmers with": "Farmers with", "Smart Solutions": "Smart Solutions", "Stronger Farmers’": "Stronger Farmers’", "Greener Future": "Greener Future", "Don’t have an account?": "Don’t have an account?"});
  Object.assign(textTranslations.hi, {"Your browser does not support the video tag.": "आपका ब्राउज़र वीडियो टैग को सपोर्ट नहीं करता है।", "© 2026 Kisan Vision": "© 2026 Kisan Vision", "Turning Crop Care into": "फसल की देखभाल को बनाइए", "Explore Our Approach": "हमारा तरीका देखें", "Knowledge": "ज्ञान", "That Works": "जो काम आए", "Simple": "आसान", "and Clear": "और स्पष्ट", "Built for": "किसानों के लिए", "Farmers": "किसान", "A Healthier": "एक स्वस्थ", "Tomorrow": "कल", "Explore": "एक्सप्लोर करें", "Selected Images": "चुनी गई तस्वीरें", "No specific symptom data available for this prediction.": "इस भविष्यवाणी के लिए कोई विशिष्ट लक्षण उपलब्ध नहीं हैं।", "No management recommendations available.": "कोई प्रबंधन सुझाव उपलब्ध नहीं है।", "No alternative predictions returned.": "कोई वैकल्पिक भविष्यवाणी नहीं मिली।", "Important:": "महत्वपूर्ण:", "Kisan Vision AI provides a screening and decision-support result. Always verify the diagnosis with a qualified agricultural expert and follow current local agricultural guidance and product labels before applying any treatment.": "Kisan Vision AI केवल स्क्रीनिंग और निर्णय-सहायता परिणाम देता है। किसी भी उपचार को लागू करने से पहले योग्य कृषि विशेषज्ञ से निदान की पुष्टि करें और स्थानीय कृषि सलाह तथा उत्पाद निर्देशों का पालन करें।", "Empowering farmers with AI-driven crop insights.": "AI आधारित फसल जानकारी से किसानों को सशक्त बनाना।", "Kisan Vision. All rights reserved.": "Kisan Vision. सर्वाधिकार सुरक्षित।", "Skip to content": "सामग्री पर जाएँ", "Open navigation menu": "नेविगेशन मेनू खोलें", "Choose language": "भाषा चुनें", "Grow Better With the Right": "सही तरीके से बेहतर उगाएँ", "Farming Guidance.": "खेती की सही मार्गदर्शिका।", "Simple, practical and easy-to-follow farming guidance to help you care for your crops, improve soil health and make better decisions throughout the season.": "सरल और व्यावहारिक खेती की जानकारी, जो फसल की देखभाल, मिट्टी के स्वास्थ्य में सुधार और पूरे मौसम में बेहतर निर्णय लेने में आपकी मदद करे।", "Explore Crop Guides": "फसल गाइड देखें", "Guidance made for every growing season": "हर खेती के मौसम के लिए मार्गदर्शन", "essential crop": "ज़रूरी फसल", "guides": "गाइड", "Practical tips": "व्यावहारिक सुझाव", "for healthier crops": "स्वस्थ फसलों के लिए", "Start with your crop": "अपनी फसल से शुरुआत करें", "Build strong roots and healthy grain with timely care.": "समय पर देखभाल से मजबूत जड़ें और स्वस्थ दाने तैयार करें।", "View Guide": "गाइड देखें", "Keep water, spacing and nutrition in balance for a thriving paddy.": "अच्छी धान की फसल के लिए पानी, दूरी और पोषण का संतुलन बनाए रखें।", "Support productive vines with sun, steady moisture and early checks.": "धूप, नियमित नमी और शुरुआती जाँच से बेलों की अच्छी बढ़त बनाए रखें।", "Prepare loose soil and protect growing tubers from stress.": "भुरभुरी मिट्टी तैयार करें और बढ़ती कंदों को तनाव से बचाएँ।", "Give young plants room, sunlight and consistent nutrition.": "पौधों को पर्याप्त जगह, धूप और नियमित पोषण दें।", "Plan healthy flowering with careful scouting and balanced feeding.": "नियमित निगरानी और संतुलित पोषण से स्वस्थ फूल आने की योजना बनाएं।", "Learn how to maintain healthy and productive soil.": "स्वस्थ और उपजाऊ मिट्टी बनाए रखना सीखें।", "Learn more": "और जानें", "Understand efficient watering practices for healthier crops.": "स्वस्थ फसलों के लिए प्रभावी सिंचाई के तरीके समझें।", "Learn how to use nutrients effectively for better crop growth.": "बेहतर फसल वृद्धि के लिए पोषक तत्वों का प्रभावी उपयोग करना सीखें।", "Identify common pests and learn preventive crop-care practices.": "आम कीटों की पहचान करें और फसल बचाव के तरीके सीखें।", "Kharif Season": "खरीफ मौसम", "Make the most of monsoon moisture with timely sowing and drainage.": "समय पर बुवाई और उचित जल निकासी से मानसून की नमी का पूरा लाभ लें।", "Explore Tips": "सुझाव देखें", "Rabi Season": "रबी मौसम", "Use the cool, clear months to build steady growth and strong grain.": "ठंडे और साफ महीनों का उपयोग स्थिर वृद्धि और मजबूत दानों के लिए करें।", "Zaid Season": "जायद मौसम", "Protect short-season crops with careful irrigation and shade planning.": "सावधानीपूर्वक सिंचाई और छाया की योजना से कम अवधि वाली फसलों की रक्षा करें।", "Year-Round Crop Care": "सालभर फसल की देखभाल", "Keep scouting, recording and improving your field habits all year.": "पूरे साल निगरानी करें, रिकॉर्ड रखें और खेत की आदतों में सुधार करते रहें।", "Use this quick checklist as you move from preparation to harvest. Every checked step is progress.": "तैयारी से कटाई तक इस छोटी चेकलिस्ट का उपयोग करें। हर पूरा किया गया कदम प्रगति है।", "A smarter second opinion": "एक बेहतर दूसरी राय", "Not Sure What's Wrong": "समझ नहीं आ रहा क्या समस्या है?", "With Your Crop?": "आपकी फसल में?", "Rooted in better farming": "बेहतर खेती की नींव", "Practical guidance": "व्यावहारिक मार्गदर्शन", "Guide details": "गाइड विवरण", "Save this tip for your next field visit.": "अगली खेत यात्रा के लिए इस सुझाव को याद रखें।", "Got it": "समझ गया", "Learn. Grow.": "सीखें। उगाएँ।", "CROP DISEASE": "फसल रोग", "Crop diseases can spread quickly and affect your entire harvest. Learn how to recognize early warning signs and take action before the problem becomes serious.": "फसल रोग तेजी से फैल सकते हैं और पूरी पैदावार को प्रभावित कर सकते हैं। शुरुआती चेतावनी संकेतों को पहचानना सीखें और समस्या गंभीर होने से पहले कदम उठाएँ।", "🌱 Kisan Vision": "🌱 Kisan Vision", "Read Article": "लेख पढ़ें", "FARMING KNOWLEDGE": "कृषि ज्ञान", "Learn how yellowing leaves, unusual spots and wilting can indicate a possible crop disease.": "जानें कि पीली पत्तियाँ, असामान्य धब्बे और मुरझाना संभावित फसल रोग का संकेत कैसे हो सकते हैं।", "Read More →": "और पढ़ें →", "SMART FARMING": "स्मार्ट खेती", "Discover simple irrigation practices that can help maintain healthy crops and reduce water waste.": "सरल सिंचाई के तरीके जानें जो स्वस्थ फसलों को बनाए रखने और पानी की बर्बादी कम करने में मदद कर सकते हैं।", "AI & Technology": "AI और तकनीक", "How AI is Changing Modern Farming": "AI आधुनिक खेती को कैसे बदल रहा है", "Discover how Artificial Intelligence can help farmers identify crop problems and make better decisions.": "जानें कि आर्टिफिशियल इंटेलिजेंस किसानों को फसल की समस्याएँ पहचानने और बेहतर निर्णय लेने में कैसे मदद कर सकता है।", "CROP CARE": "फसल देखभाल", "How to Keep Your Soil Healthy": "अपनी मिट्टी को स्वस्थ कैसे रखें", "Healthy soil is the foundation of a healthy crop. Learn simple soil-care practices for better plant growth.": "स्वस्थ मिट्टी स्वस्थ फसल की नींव है। बेहतर पौधों की वृद्धि के लिए मिट्टी की देखभाल के सरल तरीके सीखें।", "Common Crop Pests and How to Prevent Them": "आम फसल कीट और उनसे बचाव के तरीके", "Learn how to identify common pests and take preventive steps to protect your crops.": "आम कीटों की पहचान करना और फसलों की सुरक्षा के लिए बचाव के कदम उठाना सीखें।", "SEASONAL TIPS": "मौसमी सुझाव", "Seasonal Farming Tips for Better Yield": "बेहतर पैदावार के लिए मौसमी खेती सुझाव", "Explore practical tips for preparing your field, managing water and protecting crops throughout the season.": "खेत तैयार करने, पानी प्रबंधन और पूरे मौसम में फसल की सुरक्षा के व्यावहारिक सुझाव जानें।", "Detect Crop Disease →": "फसल रोग पहचानें →", "GET IN TOUCH": "संपर्क करें", "Let's Grow": "आइए आगे बढ़ें", "Quick Response": "त्वरित जवाब", "Farmer First": "किसान पहले", "Always Here": "हमेशा आपके साथ", "Your feedback": "आपकी प्रतिक्रिया", "helps us grow": "हमें बेहतर बनने में मदद करती है", "and serve better.": "और बेहतर सेवा देने में मदद करती है।", "Your information is safe with us. We never share your details.": "आपकी जानकारी हमारे पास सुरक्षित है। हम आपकी जानकारी कभी साझा नहीं करते।", "Find us on the map.": "मानचित्र पर हमें खोजें।", "How can I report a problem with the AI detection?": "AI पहचान में समस्या की रिपोर्ट कैसे करें?", "You can describe the issue using the contact form and our team will review it.": "आप संपर्क फ़ॉर्म के माध्यम से समस्या बताएं, हमारी टीम इसकी समीक्षा करेगी।", "Do you provide support for regional languages?": "क्या आप क्षेत्रीय भाषाओं में सहायता देते हैं?", "Yes, Kisan Vision is designed with farmer-friendly and accessible communication in mind.": "हाँ, Kisan Vision को किसान-अनुकूल और आसान संचार को ध्यान में रखकर बनाया गया है।", "Can I collaborate or partner with Kisan Vision?": "क्या मैं Kisan Vision के साथ सहयोग या साझेदारी कर सकता हूँ?", "Yes. Choose Partnership from the subject dropdown and send us your details.": "हाँ। विषय ड्रॉपडाउन में Partnership चुनें और अपनी जानकारी भेजें।", "Our team is always ready to help you.": "हमारी टीम हमेशा आपकी मदद के लिए तैयार है।", "Because your growth matters to us.": "क्योंकि आपकी प्रगति हमारे लिए मायने रखती है।", "Smart Farming Brighter Tomorrow": "स्मार्ट खेती, उज्ज्वल कल", "Empowering farmers with AI-driven insights": "AI आधारित जानकारी से किसानों को सशक्त बनाना", "for a healthier and more productive future.": "एक स्वस्थ और अधिक उत्पादक भविष्य के लिए।", "Feedback": "प्रतिक्रिया", "Follow Us": "हमें फॉलो करें", "\"Good Farming\nBuilds Better Tomorrows.\"": "\"अच्छी खेती बेहतर कल बनाती है।\"", "Made with ♡ for Farmers": "किसानों के लिए ♡ से बनाया गया", "Smarter Farming • Brighter Tomorrow": "स्मार्ट खेती • उज्ज्वल कल", "FOR A HEALTHIER TOMORROW": "एक स्वस्थ कल के लिए", "Empowering": "सशक्त बनाना", "Farmers with": "किसानों को", "Smart Solutions": "स्मार्ट समाधान", "Stronger Farmers’": "मजबूत किसान,", "Greener Future": "हरित भविष्य", "Don’t have an account?": "क्या आपका खाता नहीं है?"});
  Object.assign(textTranslations.mr, {"Your browser does not support the video tag.": "तुमचा ब्राउझर व्हिडिओ टॅगला सपोर्ट करत नाही.", "© 2026 Kisan Vision": "© 2026 Kisan Vision", "Turning Crop Care into": "पिकांची काळजी बनवा", "Explore Our Approach": "आमचा दृष्टिकोन पहा", "Knowledge": "ज्ञान", "That Works": "उपयोगी", "Simple": "सोपे", "and Clear": "आणि स्पष्ट", "Built for": "शेतकऱ्यांसाठी", "Farmers": "शेतकरी", "A Healthier": "निरोगी", "Tomorrow": "उद्या", "Explore": "एक्सप्लोर करा", "Selected Images": "निवडलेल्या प्रतिमा", "No specific symptom data available for this prediction.": "या अंदाजासाठी विशिष्ट लक्षणे उपलब्ध नाहीत.", "No management recommendations available.": "व्यवस्थापन शिफारसी उपलब्ध नाहीत.", "No alternative predictions returned.": "पर्यायी अंदाज उपलब्ध नाहीत.", "Important:": "महत्त्वाचे:", "Kisan Vision AI provides a screening and decision-support result. Always verify the diagnosis with a qualified agricultural expert and follow current local agricultural guidance and product labels before applying any treatment.": "Kisan Vision AI केवळ स्क्रीनिंग आणि निर्णय-सहाय्य निकाल देते. कोणताही उपचार करण्यापूर्वी पात्र कृषी तज्ज्ञाकडून निदानाची खात्री करा आणि स्थानिक कृषी मार्गदर्शन व उत्पादनाच्या सूचनांचे पालन करा.", "Empowering farmers with AI-driven crop insights.": "AI-आधारित पिकांच्या माहितीद्वारे शेतकऱ्यांना सक्षम करणे.", "Kisan Vision. All rights reserved.": "Kisan Vision. सर्व हक्क राखीव.", "Skip to content": "सामग्रीकडे जा", "Open navigation menu": "नेव्हिगेशन मेनू उघडा", "Choose language": "भाषा निवडा", "Grow Better With the Right": "योग्य पद्धतीने उत्तम पिके घ्या", "Farming Guidance.": "शेती मार्गदर्शन.", "Simple, practical and easy-to-follow farming guidance to help you care for your crops, improve soil health and make better decisions throughout the season.": "सोपे, व्यावहारिक आणि अनुसरण्यास सुलभ शेती मार्गदर्शन, जे पिकांची काळजी, मातीचे आरोग्य सुधारणा आणि संपूर्ण हंगामात चांगले निर्णय घेण्यास मदत करते.", "Explore Crop Guides": "पिक मार्गदर्शक पहा", "Guidance made for every growing season": "प्रत्येक हंगामासाठी मार्गदर्शन", "essential crop": "महत्त्वाची पिके", "guides": "मार्गदर्शक", "Practical tips": "व्यावहारिक टिप्स", "for healthier crops": "निरोगी पिकांसाठी", "Start with your crop": "तुमच्या पिकापासून सुरुवात करा", "Build strong roots and healthy grain with timely care.": "वेळेवर काळजी घेऊन मजबूत मुळे आणि निरोगी धान्य तयार करा.", "View Guide": "मार्गदर्शक पहा", "Keep water, spacing and nutrition in balance for a thriving paddy.": "भरघोस भात पिकासाठी पाणी, अंतर आणि पोषण यांचा समतोल ठेवा.", "Support productive vines with sun, steady moisture and early checks.": "सूर्यप्रकाश, नियमित ओलावा आणि सुरुवातीच्या तपासणीने उत्पादनक्षम वेलींना आधार द्या.", "Prepare loose soil and protect growing tubers from stress.": "सैल माती तयार करा आणि वाढणाऱ्या कंदांना ताणापासून वाचवा.", "Give young plants room, sunlight and consistent nutrition.": "लहान रोपांना पुरेशी जागा, सूर्यप्रकाश आणि नियमित पोषण द्या.", "Plan healthy flowering with careful scouting and balanced feeding.": "काळजीपूर्वक पाहणी आणि संतुलित पोषणाने निरोगी फुलोऱ्याचे नियोजन करा.", "Learn how to maintain healthy and productive soil.": "निरोगी आणि उत्पादनक्षम माती कशी राखावी ते शिका.", "Learn more": "अधिक जाणून घ्या", "Understand efficient watering practices for healthier crops.": "निरोगी पिकांसाठी कार्यक्षम पाणी व्यवस्थापन पद्धती समजून घ्या.", "Learn how to use nutrients effectively for better crop growth.": "चांगल्या पिकवाढीसाठी पोषकद्रव्यांचा प्रभावी वापर कसा करावा ते शिका.", "Identify common pests and learn preventive crop-care practices.": "सामान्य किडी ओळखा आणि प्रतिबंधात्मक पिक काळजी पद्धती शिका.", "Kharif Season": "खरीप हंगाम", "Make the most of monsoon moisture with timely sowing and drainage.": "वेळेवर पेरणी आणि निचरा करून पावसाळ्यातील ओलाव्याचा पुरेपूर फायदा घ्या.", "Explore Tips": "टिप्स पहा", "Rabi Season": "रब्बी हंगाम", "Use the cool, clear months to build steady growth and strong grain.": "थंड्या आणि स्वच्छ महिन्यांचा उपयोग स्थिर वाढ आणि मजबूत धान्यासाठी करा.", "Zaid Season": "उन्हाळी हंगाम", "Protect short-season crops with careful irrigation and shade planning.": "काळजीपूर्वक सिंचन आणि सावलीच्या नियोजनाने अल्पकालीन पिकांचे संरक्षण करा.", "Year-Round Crop Care": "वर्षभर पिकांची काळजी", "Keep scouting, recording and improving your field habits all year.": "संपूर्ण वर्ष पाहणी, नोंद ठेवणे आणि शेतातील पद्धती सुधारत राहा.", "Use this quick checklist as you move from preparation to harvest. Every checked step is progress.": "तयारीपासून कापणीपर्यंत ही झटपट तपासणी यादी वापरा. प्रत्येक पूर्ण केलेली पायरी म्हणजे प्रगती.", "A smarter second opinion": "एक हुशार दुसरे मत", "Not Sure What's Wrong": "काय समस्या आहे हे समजत नाही?", "With Your Crop?": "तुमच्या पिकात?", "Rooted in better farming": "उत्तम शेतीची मुळे", "Practical guidance": "व्यावहारिक मार्गदर्शन", "Guide details": "मार्गदर्शक तपशील", "Save this tip for your next field visit.": "पुढील शेतभेटीसाठी ही टिप जतन करा.", "Got it": "समजले", "Learn. Grow.": "शिका. वाढवा.", "CROP DISEASE": "पिक रोग", "Crop diseases can spread quickly and affect your entire harvest. Learn how to recognize early warning signs and take action before the problem becomes serious.": "पिकांचे रोग झपाट्याने पसरून संपूर्ण उत्पादनावर परिणाम करू शकतात. सुरुवातीची चिन्हे ओळखायला शिका आणि समस्या गंभीर होण्यापूर्वी उपाय करा.", "🌱 Kisan Vision": "🌱 Kisan Vision", "Read Article": "लेख वाचा", "FARMING KNOWLEDGE": "शेतीचे ज्ञान", "Learn how yellowing leaves, unusual spots and wilting can indicate a possible crop disease.": "पिवळी पाने, असामान्य डाग आणि कोमेजणे हे संभाव्य पिक रोगाचे संकेत कसे असू शकतात ते जाणून घ्या.", "Read More →": "अधिक वाचा →", "SMART FARMING": "स्मार्ट शेती", "Discover simple irrigation practices that can help maintain healthy crops and reduce water waste.": "निरोगी पिके राखण्यासाठी आणि पाण्याची नासाडी कमी करण्यासाठी मदत करणाऱ्या सोप्या सिंचन पद्धती जाणून घ्या.", "AI & Technology": "AI आणि तंत्रज्ञान", "How AI is Changing Modern Farming": "AI आधुनिक शेती कशी बदलत आहे", "Discover how Artificial Intelligence can help farmers identify crop problems and make better decisions.": "कृत्रिम बुद्धिमत्ता शेतकऱ्यांना पिकांच्या समस्या ओळखण्यास आणि चांगले निर्णय घेण्यास कशी मदत करू शकते ते जाणून घ्या.", "CROP CARE": "पिकांची काळजी", "How to Keep Your Soil Healthy": "तुमची माती निरोगी कशी ठेवावी", "Healthy soil is the foundation of a healthy crop. Learn simple soil-care practices for better plant growth.": "निरोगी माती ही निरोगी पिकाची पायाभूत आहे. चांगल्या वाढीसाठी मातीची काळजी घेण्याच्या सोप्या पद्धती शिका.", "Common Crop Pests and How to Prevent Them": "सामान्य पिक किडी आणि त्यांना कसे रोखावे", "Learn how to identify common pests and take preventive steps to protect your crops.": "सामान्य किडी ओळखणे आणि पिकांचे संरक्षण करण्यासाठी प्रतिबंधात्मक पावले उचलणे शिका.", "SEASONAL TIPS": "हंगामी टिप्स", "Seasonal Farming Tips for Better Yield": "चांगल्या उत्पादनासाठी हंगामी शेती टिप्स", "Explore practical tips for preparing your field, managing water and protecting crops throughout the season.": "शेताची तयारी, पाणी व्यवस्थापन आणि संपूर्ण हंगामात पिकांचे संरक्षण करण्यासाठी व्यावहारिक टिप्स जाणून घ्या.", "Detect Crop Disease →": "पिक रोग ओळखा →", "GET IN TOUCH": "संपर्क साधा", "Let's Grow": "चला वाढूया", "Quick Response": "जलद प्रतिसाद", "Farmer First": "शेतकरी प्रथम", "Always Here": "नेहमी तुमच्यासोबत", "Your feedback": "तुमचा अभिप्राय", "helps us grow": "आम्हाला वाढण्यास मदत करते", "and serve better.": "आणि चांगली सेवा देण्यास मदत करते.", "Your information is safe with us. We never share your details.": "तुमची माहिती आमच्याकडे सुरक्षित आहे. आम्ही तुमची माहिती कधीही शेअर करत नाही.", "Find us on the map.": "नकाशावर आम्हाला शोधा.", "How can I report a problem with the AI detection?": "AI ओळखीत आलेली समस्या कशी कळवावी?", "You can describe the issue using the contact form and our team will review it.": "संपर्क फॉर्मद्वारे समस्या सांगा; आमची टीम तिचा आढावा घेईल.", "Do you provide support for regional languages?": "तुम्ही प्रादेशिक भाषांना समर्थन देता का?", "Yes, Kisan Vision is designed with farmer-friendly and accessible communication in mind.": "होय, Kisan Vision हे शेतकरी-अनुकूल आणि सुलभ संवाद लक्षात घेऊन तयार केले आहे.", "Can I collaborate or partner with Kisan Vision?": "मी Kisan Vision सोबत सहकार्य किंवा भागीदारी करू शकतो का?", "Yes. Choose Partnership from the subject dropdown and send us your details.": "होय. विषय ड्रॉपडाउनमधून Partnership निवडा आणि तुमची माहिती पाठवा.", "Our team is always ready to help you.": "आमची टीम नेहमी तुमच्या मदतीसाठी तयार आहे.", "Because your growth matters to us.": "कारण तुमची प्रगती आमच्यासाठी महत्त्वाची आहे.", "Smart Farming Brighter Tomorrow": "स्मार्ट शेती, उज्ज्वल उद्या", "Empowering farmers with AI-driven insights": "AI-आधारित माहितीद्वारे शेतकऱ्यांना सक्षम करणे", "for a healthier and more productive future.": "निरोगी आणि अधिक उत्पादनक्षम भविष्यासाठी.", "Feedback": "अभिप्राय", "Follow Us": "आम्हाला फॉलो करा", "\"Good Farming\nBuilds Better Tomorrows.\"": "\"उत्तम शेती उज्ज्वल उद्या घडवते.\"", "Made with ♡ for Farmers": "शेतकऱ्यांसाठी ♡ ने बनवलेले", "Smarter Farming • Brighter Tomorrow": "स्मार्ट शेती • उज्ज्वल उद्या", "FOR A HEALTHIER TOMORROW": "निरोगी उद्यासाठी", "Empowering": "सक्षम बनवत", "Farmers with": "शेतकऱ्यांना", "Smart Solutions": "स्मार्ट उपाय", "Stronger Farmers’": "सक्षम शेतकरी,", "Greener Future": "हरित भविष्य", "Don’t have an account?": "तुमचे खाते नाही का?"});
  Object.assign(textTranslations.pa, {"Your browser does not support the video tag.": "ਤੁਹਾਡਾ ਬ੍ਰਾਊਜ਼ਰ ਵੀਡੀਓ ਟੈਗ ਨੂੰ ਸਪੋਰਟ ਨਹੀਂ ਕਰਦਾ।", "© 2026 Kisan Vision": "© 2026 Kisan Vision", "Turning Crop Care into": "ਫਸਲ ਦੀ ਦੇਖਭਾਲ ਨੂੰ ਬਣਾਓ", "Explore Our Approach": "ਸਾਡਾ ਤਰੀਕਾ ਵੇਖੋ", "Knowledge": "ਗਿਆਨ", "That Works": "ਜੋ ਕੰਮ ਆਵੇ", "Simple": "ਸੌਖਾ", "and Clear": "ਅਤੇ ਸਪੱਸ਼ਟ", "Built for": "ਕਿਸਾਨਾਂ ਲਈ", "Farmers": "ਕਿਸਾਨ", "A Healthier": "ਇੱਕ ਸਿਹਤਮੰਦ", "Tomorrow": "ਭਵਿੱਖ", "Explore": "ਖੋਜੋ", "Selected Images": "ਚੁਣੀਆਂ ਤਸਵੀਰਾਂ", "No specific symptom data available for this prediction.": "ਇਸ ਭਵਿੱਖਬਾਣੀ ਲਈ ਕੋਈ ਖਾਸ ਲੱਛਣ ਉਪਲਬਧ ਨਹੀਂ।", "No management recommendations available.": "ਕੋਈ ਪ੍ਰਬੰਧਨ ਸਿਫ਼ਾਰਿਸ਼ ਉਪਲਬਧ ਨਹੀਂ।", "No alternative predictions returned.": "ਕੋਈ ਵਿਕਲਪਕ ਭਵਿੱਖਬਾਣੀ ਨਹੀਂ ਮਿਲੀ।", "Important:": "ਜ਼ਰੂਰੀ:", "Kisan Vision AI provides a screening and decision-support result. Always verify the diagnosis with a qualified agricultural expert and follow current local agricultural guidance and product labels before applying any treatment.": "Kisan Vision AI ਸਿਰਫ਼ ਸਕ੍ਰੀਨਿੰਗ ਅਤੇ ਫੈਸਲਾ-ਸਹਾਇਕ ਨਤੀਜਾ ਦਿੰਦਾ ਹੈ। ਕੋਈ ਵੀ ਇਲਾਜ ਲਾਗੂ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਯੋਗ ਖੇਤੀ ਮਾਹਿਰ ਤੋਂ ਪੁਸ਼ਟੀ ਕਰੋ ਅਤੇ ਸਥਾਨਕ ਖੇਤੀ ਦਿਸ਼ਾ-ਨਿਰਦੇਸ਼ਾਂ ਤੇ ਉਤਪਾਦ ਲੇਬਲ ਦੀ ਪਾਲਣਾ ਕਰੋ।", "Empowering farmers with AI-driven crop insights.": "AI-ਅਧਾਰਿਤ ਫਸਲ ਜਾਣਕਾਰੀ ਨਾਲ ਕਿਸਾਨਾਂ ਨੂੰ ਸਸ਼ਕਤ ਬਣਾਉਣਾ।", "Kisan Vision. All rights reserved.": "Kisan Vision. ਸਾਰੇ ਹੱਕ ਰਾਖਵੇਂ।", "Skip to content": "ਸਮੱਗਰੀ ਵੱਲ ਜਾਓ", "Open navigation menu": "ਨੇਵੀਗੇਸ਼ਨ ਮੀਨੂ ਖੋਲ੍ਹੋ", "Choose language": "ਭਾਸ਼ਾ ਚੁਣੋ", "Grow Better With the Right": "ਸਹੀ ਤਰੀਕੇ ਨਾਲ ਬਿਹਤਰ ਉਗਾਓ", "Farming Guidance.": "ਖੇਤੀ ਮਾਰਗਦਰਸ਼ਨ।", "Simple, practical and easy-to-follow farming guidance to help you care for your crops, improve soil health and make better decisions throughout the season.": "ਸੌਖੀ, ਵਿਹਾਰਕ ਅਤੇ ਅਸਾਨੀ ਨਾਲ ਅਪਣਾਈ ਜਾ ਸਕਣ ਵਾਲੀ ਖੇਤੀ ਜਾਣਕਾਰੀ, ਜੋ ਫਸਲਾਂ ਦੀ ਦੇਖਭਾਲ, ਮਿੱਟੀ ਦੀ ਸਿਹਤ ਸੁਧਾਰਨ ਅਤੇ ਪੂਰੇ ਮੌਸਮ ਦੌਰਾਨ ਬਿਹਤਰ ਫੈਸਲੇ ਲੈਣ ਵਿੱਚ ਮਦਦ ਕਰੇ।", "Explore Crop Guides": "ਫਸਲ ਗਾਈਡ ਵੇਖੋ", "Guidance made for every growing season": "ਹਰ ਵਧਣ ਵਾਲੇ ਮੌਸਮ ਲਈ ਮਾਰਗਦਰਸ਼ਨ", "essential crop": "ਜ਼ਰੂਰੀ ਫਸਲ", "guides": "ਗਾਈਡ", "Practical tips": "ਵਿਹਾਰਕ ਸੁਝਾਅ", "for healthier crops": "ਸਿਹਤਮੰਦ ਫਸਲਾਂ ਲਈ", "Start with your crop": "ਆਪਣੀ ਫਸਲ ਤੋਂ ਸ਼ੁਰੂ ਕਰੋ", "Build strong roots and healthy grain with timely care.": "ਸਮੇਂ ਸਿਰ ਦੇਖਭਾਲ ਨਾਲ ਮਜ਼ਬੂਤ ਜੜ੍ਹਾਂ ਅਤੇ ਸਿਹਤਮੰਦ ਦਾਣੇ ਬਣਾਓ।", "View Guide": "ਗਾਈਡ ਵੇਖੋ", "Keep water, spacing and nutrition in balance for a thriving paddy.": "ਚੰਗੀ ਝੋਨੇ ਦੀ ਫਸਲ ਲਈ ਪਾਣੀ, ਦੂਰੀ ਅਤੇ ਪੋਸ਼ਣ ਦਾ ਸੰਤੁਲਨ ਬਣਾਈ ਰੱਖੋ।", "Support productive vines with sun, steady moisture and early checks.": "ਧੁੱਪ, ਨਿਰੰਤਰ ਨਮੀ ਅਤੇ ਸ਼ੁਰੂਆਤੀ ਜਾਂਚ ਨਾਲ ਉਤਪਾਦਕ ਬੇਲਾਂ ਨੂੰ ਸਹਾਰਾ ਦਿਓ।", "Prepare loose soil and protect growing tubers from stress.": "ਢਿੱਲੀ ਮਿੱਟੀ ਤਿਆਰ ਕਰੋ ਅਤੇ ਵਧ ਰਹੀਆਂ ਗੰਢਾਂ ਨੂੰ ਤਣਾਅ ਤੋਂ ਬਚਾਓ।", "Give young plants room, sunlight and consistent nutrition.": "ਨੌਜਵਾਨ ਪੌਦਿਆਂ ਨੂੰ ਜਗ੍ਹਾ, ਧੁੱਪ ਅਤੇ ਲਗਾਤਾਰ ਪੋਸ਼ਣ ਦਿਓ।", "Plan healthy flowering with careful scouting and balanced feeding.": "ਧਿਆਨ ਨਾਲ ਨਿਗਰਾਨੀ ਅਤੇ ਸੰਤੁਲਿਤ ਖੁਰਾਕ ਨਾਲ ਸਿਹਤਮੰਦ ਫੁੱਲਾਂ ਦੀ ਯੋਜਨਾ ਬਣਾਓ।", "Learn how to maintain healthy and productive soil.": "ਸਿਹਤਮੰਦ ਅਤੇ ਉਤਪਾਦਕ ਮਿੱਟੀ ਕਿਵੇਂ ਬਣਾਈ ਰੱਖਣੀ ਹੈ ਸਿੱਖੋ।", "Learn more": "ਹੋਰ ਜਾਣੋ", "Understand efficient watering practices for healthier crops.": "ਸਿਹਤਮੰਦ ਫਸਲਾਂ ਲਈ ਪ੍ਰਭਾਵਸ਼ਾਲੀ ਸਿੰਚਾਈ ਤਰੀਕੇ ਸਮਝੋ।", "Learn how to use nutrients effectively for better crop growth.": "ਬਿਹਤਰ ਫਸਲ ਵਾਧੇ ਲਈ ਪੋਸ਼ਕ ਤੱਤਾਂ ਦੀ ਪ੍ਰਭਾਵਸ਼ਾਲੀ ਵਰਤੋਂ ਕਰਨੀ ਸਿੱਖੋ।", "Identify common pests and learn preventive crop-care practices.": "ਆਮ ਕੀੜਿਆਂ ਦੀ ਪਛਾਣ ਕਰੋ ਅਤੇ ਰੋਕਥਾਮ ਵਾਲੀ ਫਸਲ ਸੰਭਾਲ ਸਿੱਖੋ।", "Kharif Season": "ਖਰੀਫ਼ ਮੌਸਮ", "Make the most of monsoon moisture with timely sowing and drainage.": "ਸਮੇਂ ਸਿਰ ਬਿਜਾਈ ਅਤੇ ਨਿਕਾਸੀ ਨਾਲ ਮਾਨਸੂਨੀ ਨਮੀ ਦਾ ਪੂਰਾ ਲਾਭ ਲਓ।", "Explore Tips": "ਸੁਝਾਅ ਵੇਖੋ", "Rabi Season": "ਰਬੀ ਮੌਸਮ", "Use the cool, clear months to build steady growth and strong grain.": "ਠੰਢੇ ਅਤੇ ਸਾਫ਼ ਮਹੀਨਿਆਂ ਦਾ ਲਾਭ ਲੈ ਕੇ ਸਥਿਰ ਵਾਧਾ ਅਤੇ ਮਜ਼ਬੂਤ ਦਾਣੇ ਬਣਾਓ।", "Zaid Season": "ਜ਼ਾਇਦ ਮੌਸਮ", "Protect short-season crops with careful irrigation and shade planning.": "ਸਾਵਧਾਨ ਸਿੰਚਾਈ ਅਤੇ ਛਾਂ ਦੀ ਯੋਜਨਾ ਨਾਲ ਛੋਟੇ ਮੌਸਮ ਵਾਲੀਆਂ ਫਸਲਾਂ ਦੀ ਰੱਖਿਆ ਕਰੋ।", "Year-Round Crop Care": "ਸਾਲ ਭਰ ਫਸਲ ਦੀ ਸੰਭਾਲ", "Keep scouting, recording and improving your field habits all year.": "ਸਾਰਾ ਸਾਲ ਨਿਗਰਾਨੀ, ਰਿਕਾਰਡ ਅਤੇ ਖੇਤ ਦੀਆਂ ਆਦਤਾਂ ਵਿੱਚ ਸੁਧਾਰ ਕਰਦੇ ਰਹੋ।", "Use this quick checklist as you move from preparation to harvest. Every checked step is progress.": "ਤਿਆਰੀ ਤੋਂ ਕਟਾਈ ਤੱਕ ਇਹ ਛੋਟੀ ਚੈਕਲਿਸਟ ਵਰਤੋ। ਹਰ ਪੂਰਾ ਕੀਤਾ ਕਦਮ ਤਰੱਕੀ ਹੈ।", "A smarter second opinion": "ਇੱਕ ਹੋਰ ਸਮਝਦਾਰ ਰਾਏ", "Not Sure What's Wrong": "ਸਮਝ ਨਹੀਂ ਆ ਰਿਹਾ ਕੀ ਗਲਤ ਹੈ?", "With Your Crop?": "ਤੁਹਾਡੀ ਫਸਲ ਵਿੱਚ?", "Rooted in better farming": "ਬਿਹਤਰ ਖੇਤੀ ਦੀ ਨੀਂਹ", "Practical guidance": "ਵਿਹਾਰਕ ਮਾਰਗਦਰਸ਼ਨ", "Guide details": "ਗਾਈਡ ਵੇਰਵੇ", "Save this tip for your next field visit.": "ਅਗਲੀ ਖੇਤ ਯਾਤਰਾ ਲਈ ਇਹ ਸੁਝਾਅ ਸੰਭਾਲੋ।", "Got it": "ਸਮਝ ਆ ਗਿਆ", "Learn. Grow.": "ਸਿੱਖੋ। ਉਗਾਓ।", "CROP DISEASE": "ਫਸਲ ਦੀ ਬਿਮਾਰੀ", "Crop diseases can spread quickly and affect your entire harvest. Learn how to recognize early warning signs and take action before the problem becomes serious.": "ਫਸਲਾਂ ਦੀਆਂ ਬਿਮਾਰੀਆਂ ਤੇਜ਼ੀ ਨਾਲ ਫੈਲ ਸਕਦੀਆਂ ਹਨ ਅਤੇ ਪੂਰੀ ਪੈਦਾਵਾਰ ਨੂੰ ਪ੍ਰਭਾਵਿਤ ਕਰ ਸਕਦੀਆਂ ਹਨ। ਸ਼ੁਰੂਆਤੀ ਸੰਕੇਤ ਪਛਾਣੋ ਅਤੇ ਸਮੱਸਿਆ ਗੰਭੀਰ ਹੋਣ ਤੋਂ ਪਹਿਲਾਂ ਕਾਰਵਾਈ ਕਰੋ।", "🌱 Kisan Vision": "🌱 Kisan Vision", "Read Article": "ਲੇਖ ਪੜ੍ਹੋ", "FARMING KNOWLEDGE": "ਖੇਤੀ ਗਿਆਨ", "Learn how yellowing leaves, unusual spots and wilting can indicate a possible crop disease.": "ਜਾਣੋ ਕਿ ਪੀਲੇ ਪੱਤੇ, ਅਜੀਬ ਧੱਬੇ ਅਤੇ ਮੁਰਝਾਉਣਾ ਫਸਲ ਦੀ ਸੰਭਾਵਿਤ ਬਿਮਾਰੀ ਦਾ ਸੰਕੇਤ ਕਿਵੇਂ ਹੋ ਸਕਦੇ ਹਨ।", "Read More →": "ਹੋਰ ਪੜ੍ਹੋ →", "SMART FARMING": "ਸਮਾਰਟ ਖੇਤੀ", "Discover simple irrigation practices that can help maintain healthy crops and reduce water waste.": "ਸੌਖੀਆਂ ਸਿੰਚਾਈ ਪੱਧਤੀਆਂ ਜਾਣੋ ਜੋ ਸਿਹਤਮੰਦ ਫਸਲਾਂ ਨੂੰ ਬਣਾਈ ਰੱਖਣ ਅਤੇ ਪਾਣੀ ਦੀ ਬਰਬਾਦੀ ਘਟਾਉਣ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦੀਆਂ ਹਨ।", "AI & Technology": "AI ਅਤੇ ਤਕਨਾਲੋਜੀ", "How AI is Changing Modern Farming": "AI ਆਧੁਨਿਕ ਖੇਤੀ ਨੂੰ ਕਿਵੇਂ ਬਦਲ ਰਿਹਾ ਹੈ", "Discover how Artificial Intelligence can help farmers identify crop problems and make better decisions.": "ਜਾਣੋ ਕਿ ਆਰਟੀਫਿਸ਼ਲ ਇੰਟੈਲੀਜੈਂਸ ਕਿਸਾਨਾਂ ਨੂੰ ਫਸਲ ਦੀਆਂ ਸਮੱਸਿਆਵਾਂ ਪਛਾਣਨ ਅਤੇ ਬਿਹਤਰ ਫੈਸਲੇ ਲੈਣ ਵਿੱਚ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦੀ ਹੈ।", "CROP CARE": "ਫਸਲ ਸੰਭਾਲ", "How to Keep Your Soil Healthy": "ਆਪਣੀ ਮਿੱਟੀ ਨੂੰ ਸਿਹਤਮੰਦ ਕਿਵੇਂ ਰੱਖਣਾ ਹੈ", "Healthy soil is the foundation of a healthy crop. Learn simple soil-care practices for better plant growth.": "ਸਿਹਤਮੰਦ ਮਿੱਟੀ ਸਿਹਤਮੰਦ ਫਸਲ ਦੀ ਨੀਂਹ ਹੈ। ਬਿਹਤਰ ਪੌਧੇ ਦੀ ਵਾਧ ਲਈ ਮਿੱਟੀ ਸੰਭਾਲ ਦੇ ਸੌਖੇ ਤਰੀਕੇ ਸਿੱਖੋ।", "Common Crop Pests and How to Prevent Them": "ਆਮ ਫਸਲ ਕੀੜੇ ਅਤੇ ਉਨ੍ਹਾਂ ਤੋਂ ਬਚਾਅ ਦੇ ਤਰੀਕੇ", "Learn how to identify common pests and take preventive steps to protect your crops.": "ਆਮ ਕੀੜਿਆਂ ਦੀ ਪਛਾਣ ਕਰਨਾ ਅਤੇ ਫਸਲਾਂ ਦੀ ਰੱਖਿਆ ਲਈ ਰੋਕਥਾਮ ਵਾਲੇ ਕਦਮ ਚੁੱਕਣਾ ਸਿੱਖੋ।", "SEASONAL TIPS": "ਮੌਸਮੀ ਸੁਝਾਅ", "Seasonal Farming Tips for Better Yield": "ਵਧੀਆ ਪੈਦਾਵਾਰ ਲਈ ਮੌਸਮੀ ਖੇਤੀ ਸੁਝਾਅ", "Explore practical tips for preparing your field, managing water and protecting crops throughout the season.": "ਖੇਤ ਦੀ ਤਿਆਰੀ, ਪਾਣੀ ਪ੍ਰਬੰਧਨ ਅਤੇ ਪੂਰੇ ਮੌਸਮ ਦੌਰਾਨ ਫਸਲਾਂ ਦੀ ਰੱਖਿਆ ਲਈ ਵਿਹਾਰਕ ਸੁਝਾਅ ਜਾਣੋ।", "Detect Crop Disease →": "ਫਸਲ ਦੀ ਬਿਮਾਰੀ ਪਛਾਣੋ →", "GET IN TOUCH": "ਸੰਪਰਕ ਕਰੋ", "Let's Grow": "ਆਓ ਅੱਗੇ ਵਧੀਏ", "Quick Response": "ਤੁਰੰਤ ਜਵਾਬ", "Farmer First": "ਕਿਸਾਨ ਪਹਿਲਾਂ", "Always Here": "ਹਮੇਸ਼ਾ ਤੁਹਾਡੇ ਨਾਲ", "Your feedback": "ਤੁਹਾਡੀ ਪ੍ਰਤੀਕਿਰਿਆ", "helps us grow": "ਸਾਨੂੰ ਬਿਹਤਰ ਬਣਨ ਵਿੱਚ ਮਦਦ ਕਰਦੀ ਹੈ", "and serve better.": "ਅਤੇ ਬਿਹਤਰ ਸੇਵਾ ਦੇਣ ਵਿੱਚ ਮਦਦ ਕਰਦੀ ਹੈ।", "Your information is safe with us. We never share your details.": "ਤੁਹਾਡੀ ਜਾਣਕਾਰੀ ਸਾਡੇ ਕੋਲ ਸੁਰੱਖਿਅਤ ਹੈ। ਅਸੀਂ ਤੁਹਾਡੀ ਜਾਣਕਾਰੀ ਕਦੇ ਸਾਂਝੀ ਨਹੀਂ ਕਰਦੇ।", "Find us on the map.": "ਨਕਸ਼ੇ ਤੇ ਸਾਨੂੰ ਲੱਭੋ।", "How can I report a problem with the AI detection?": "AI ਪਛਾਣ ਨਾਲ ਸਮੱਸਿਆ ਦੀ ਰਿਪੋਰਟ ਕਿਵੇਂ ਕਰੀਏ?", "You can describe the issue using the contact form and our team will review it.": "ਤੁਸੀਂ ਸੰਪਰਕ ਫਾਰਮ ਰਾਹੀਂ ਸਮੱਸਿਆ ਦੱਸ ਸਕਦੇ ਹੋ ਅਤੇ ਸਾਡੀ ਟੀਮ ਇਸਦੀ ਸਮੀਖਿਆ ਕਰੇਗੀ।", "Do you provide support for regional languages?": "ਕੀ ਤੁਸੀਂ ਖੇਤਰੀ ਭਾਸ਼ਾਵਾਂ ਲਈ ਸਹਾਇਤਾ ਦਿੰਦੇ ਹੋ?", "Yes, Kisan Vision is designed with farmer-friendly and accessible communication in mind.": "ਹਾਂ, Kisan Vision ਨੂੰ ਕਿਸਾਨ-ਮਿੱਤਰ ਅਤੇ ਆਸਾਨ ਸੰਚਾਰ ਨੂੰ ਧਿਆਨ ਵਿੱਚ ਰੱਖ ਕੇ ਬਣਾਇਆ ਗਿਆ ਹੈ।", "Can I collaborate or partner with Kisan Vision?": "ਕੀ ਮੈਂ Kisan Vision ਨਾਲ ਸਹਿਯੋਗ ਜਾਂ ਭਾਈਵਾਲੀ ਕਰ ਸਕਦਾ ਹਾਂ?", "Yes. Choose Partnership from the subject dropdown and send us your details.": "ਹਾਂ। ਵਿਸ਼ਾ ਡ੍ਰੌਪਡਾਊਨ ਵਿੱਚ Partnership ਚੁਣੋ ਅਤੇ ਆਪਣੀ ਜਾਣਕਾਰੀ ਭੇਜੋ।", "Our team is always ready to help you.": "ਸਾਡੀ ਟੀਮ ਹਮੇਸ਼ਾ ਤੁਹਾਡੀ ਮਦਦ ਲਈ ਤਿਆਰ ਹੈ।", "Because your growth matters to us.": "ਕਿਉਂਕਿ ਤੁਹਾਡੀ ਤਰੱਕੀ ਸਾਡੇ ਲਈ ਮਹੱਤਵਪੂਰਨ ਹੈ।", "Smart Farming Brighter Tomorrow": "ਸਮਾਰਟ ਖੇਤੀ, ਰੌਸ਼ਨ ਭਵਿੱਖ", "Empowering farmers with AI-driven insights": "AI-ਅਧਾਰਿਤ ਜਾਣਕਾਰੀ ਨਾਲ ਕਿਸਾਨਾਂ ਨੂੰ ਸਸ਼ਕਤ ਬਣਾਉਣਾ", "for a healthier and more productive future.": "ਸਿਹਤਮੰਦ ਅਤੇ ਵਧੇਰੇ ਉਤਪਾਦਕ ਭਵਿੱਖ ਲਈ।", "Feedback": "ਪ੍ਰਤੀਕਿਰਿਆ", "Follow Us": "ਸਾਨੂੰ ਫਾਲੋ ਕਰੋ", "\"Good Farming\nBuilds Better Tomorrows.\"": "\"ਚੰਗੀ ਖੇਤੀ ਬਿਹਤਰ ਭਵਿੱਖ ਬਣਾਉਂਦੀ ਹੈ।\"", "Made with ♡ for Farmers": "ਕਿਸਾਨਾਂ ਲਈ ♡ ਨਾਲ ਬਣਾਇਆ", "Smarter Farming • Brighter Tomorrow": "ਸਮਾਰਟ ਖੇਤੀ • ਰੌਸ਼ਨ ਭਵਿੱਖ", "FOR A HEALTHIER TOMORROW": "ਇੱਕ ਸਿਹਤਮੰਦ ਭਵਿੱਖ ਲਈ", "Empowering": "ਸਸ਼ਕਤ ਬਣਾਉਣਾ", "Farmers with": "ਕਿਸਾਨਾਂ ਨੂੰ", "Smart Solutions": "ਸਮਾਰਟ ਹੱਲ", "Stronger Farmers’": "ਮਜ਼ਬੂਤ ਕਿਸਾਨ,", "Greener Future": "ਹਰਿਆਲਾ ਭਵਿੱਖ", "Don’t have an account?": "ਕੀ ਤੁਹਾਡਾ ਖਾਤਾ ਨਹੀਂ ਹੈ?"});
  Object.assign(textTranslations.gu, {"Your browser does not support the video tag.": "તમારું બ્રાઉઝર વિડિઓ ટૅગને સપોર્ટ કરતું નથી.", "© 2026 Kisan Vision": "© 2026 Kisan Vision", "Turning Crop Care into": "પાકની સંભાળને બનાવો", "Explore Our Approach": "અમારો અભિગમ જુઓ", "Knowledge": "જ્ઞાન", "That Works": "જે કામ આવે", "Simple": "સરળ", "and Clear": "અને સ્પષ્ટ", "Built for": "ખેડૂતો માટે", "Farmers": "ખેડૂતો", "A Healthier": "તંદુરસ્ત", "Tomorrow": "આવતીકાલ", "Explore": "શોધો", "Selected Images": "પસંદ કરેલી તસવીરો", "No specific symptom data available for this prediction.": "આ આગાહી માટે કોઈ ચોક્કસ લક્ષણો ઉપલબ્ધ નથી.", "No management recommendations available.": "કોઈ વ્યવસ્થાપન ભલામણ ઉપલબ્ધ નથી.", "No alternative predictions returned.": "કોઈ વૈકલ્પિક આગાહીઓ મળી નથી.", "Important:": "મહત્વપૂર્ણ:", "Kisan Vision AI provides a screening and decision-support result. Always verify the diagnosis with a qualified agricultural expert and follow current local agricultural guidance and product labels before applying any treatment.": "Kisan Vision AI માત્ર સ્ક્રીનિંગ અને નિર્ણય-સહાય પરિણામ આપે છે. કોઈપણ સારવાર લાગુ કરતાં પહેલાં લાયક કૃષિ નિષ્ણાત પાસેથી નિદાનની ખાતરી કરો અને સ્થાનિક કૃષિ માર્ગદર્શન તથા ઉત્પાદન લેબલનું પાલન કરો.", "Empowering farmers with AI-driven crop insights.": "AI આધારિત પાકની માહિતીથી ખેડૂતોને સશક્ત બનાવવું.", "Kisan Vision. All rights reserved.": "Kisan Vision. તમામ હકો સુરક્ષિત.", "Skip to content": "સામગ્રી પર જાઓ", "Open navigation menu": "નેવિગેશન મેનૂ ખોલો", "Choose language": "ભાષા પસંદ કરો", "Grow Better With the Right": "યોગ્ય રીતે વધુ સારું ઉગાડો", "Farming Guidance.": "ખેતી માર્ગદર્શન.", "Simple, practical and easy-to-follow farming guidance to help you care for your crops, improve soil health and make better decisions throughout the season.": "સરળ, વ્યવહારુ અને અનુસરવામાં સરળ ખેતી માર્ગદર્શન, જે તમને પાકની સંભાળ, જમીનની તંદુરસ્તી સુધારવા અને સમગ્ર સીઝનમાં વધુ સારા નિર્ણયો લેવામાં મદદ કરે.", "Explore Crop Guides": "પાક માર્ગદર્શિકાઓ જુઓ", "Guidance made for every growing season": "દરેક ઉગાડણી સીઝન માટે માર્ગદર્શન", "essential crop": "મહત્વપૂર્ણ પાક", "guides": "માર્ગદર્શિકાઓ", "Practical tips": "વ્યવહારુ ટીપ્સ", "for healthier crops": "તંદુરસ્ત પાક માટે", "Start with your crop": "તમારા પાકથી શરૂઆત કરો", "Build strong roots and healthy grain with timely care.": "સમયસર સંભાળથી મજબૂત મૂળ અને તંદુરસ્ત દાણા વિકસાવો.", "View Guide": "માર્ગદર્શિકા જુઓ", "Keep water, spacing and nutrition in balance for a thriving paddy.": "સારા ડાંગર માટે પાણી, અંતર અને પોષણનું સંતુલન જાળવો.", "Support productive vines with sun, steady moisture and early checks.": "સૂર્યપ્રકાશ, સતત ભેજ અને વહેલી તપાસથી ઉત્પાદક વેલોને સહારો આપો.", "Prepare loose soil and protect growing tubers from stress.": "ઢીલી જમીન તૈયાર કરો અને વધતા કંદોને તાણથી બચાવો.", "Give young plants room, sunlight and consistent nutrition.": "નાના છોડને જગ્યા, સૂર્યપ્રકાશ અને સતત પોષણ આપો.", "Plan healthy flowering with careful scouting and balanced feeding.": "સાવચેતીપૂર્વક નિરીક્ષણ અને સંતુલિત પોષણથી સ્વસ્થ ફૂલ આવવાની યોજના બનાવો.", "Learn how to maintain healthy and productive soil.": "તંદુરસ્ત અને ઉત્પાદક જમીન જાળવવી શીખો.", "Learn more": "વધુ જાણો", "Understand efficient watering practices for healthier crops.": "તંદુરસ્ત પાક માટે કાર્યક્ષમ પાણી આપવાની પદ્ધતિઓ સમજો.", "Learn how to use nutrients effectively for better crop growth.": "વધુ સારી પાક વૃદ્ધિ માટે પોષક તત્વોનો અસરકારક ઉપયોગ શીખો.", "Identify common pests and learn preventive crop-care practices.": "સામાન્ય જીવાતોને ઓળખો અને પાક બચાવવાની પદ્ધતિઓ શીખો.", "Kharif Season": "ખરીફ સીઝન", "Make the most of monsoon moisture with timely sowing and drainage.": "સમયસર વાવણી અને યોગ્ય નિકાસથી ચોમાસાની ભેજનો મહત્તમ લાભ લો.", "Explore Tips": "ટીપ્સ જુઓ", "Rabi Season": "રબી સીઝન", "Use the cool, clear months to build steady growth and strong grain.": "ઠંડા અને સ્વચ્છ મહિનાઓનો ઉપયોગ સ્થિર વૃદ્ધિ અને મજબૂત દાણા માટે કરો.", "Zaid Season": "ઝાયદ સીઝન", "Protect short-season crops with careful irrigation and shade planning.": "સાવચેત સિંચાઈ અને છાયાની યોજના સાથે ટૂંકી સીઝનના પાકનું રક્ષણ કરો.", "Year-Round Crop Care": "આખું વર્ષ પાકની સંભાળ", "Keep scouting, recording and improving your field habits all year.": "આખું વર્ષ નિરીક્ષણ, નોંધણી અને ખેતરની પદ્ધતિઓમાં સુધારો કરતા રહો.", "Use this quick checklist as you move from preparation to harvest. Every checked step is progress.": "તૈયારીથી લણણી સુધી આ ઝડપી ચેકલિસ્ટનો ઉપયોગ કરો. દરેક પૂર્ણ કરેલું પગલું પ્રગતિ છે.", "A smarter second opinion": "એક વધુ સમજદાર બીજી સલાહ", "Not Sure What's Wrong": "શું સમસ્યા છે ਸਮਝાતું નથી?", "With Your Crop?": "તમારા પાકમાં?", "Rooted in better farming": "વધુ સારી ખેતીમાં મૂળ ધરાવતું", "Practical guidance": "વ્યવહારુ માર્ગદર્શન", "Guide details": "માર્ગદર્શિકા વિગતો", "Save this tip for your next field visit.": "આગલી ખેત મુલાકાત માટે આ ટીપ સાચવી રાખો.", "Got it": "સમજાયું", "Learn. Grow.": "શીખો. ઉગાડો.", "CROP DISEASE": "પાકનો રોગ", "Crop diseases can spread quickly and affect your entire harvest. Learn how to recognize early warning signs and take action before the problem becomes serious.": "પાકના રોગો ઝડપથી ફેલાઈ શકે છે અને આખી ઉપજને અસર કરી શકે છે. શરૂઆતના સંકેતો ઓળખો અને સમસ્યા ગંભીર બને તે પહેલાં પગલાં લો.", "🌱 Kisan Vision": "🌱 Kisan Vision", "Read Article": "લેખ વાંચો", "FARMING KNOWLEDGE": "ખેતી જ્ઞાન", "Learn how yellowing leaves, unusual spots and wilting can indicate a possible crop disease.": "જાણો કે પીળાં પાંદડાં, અસામાન્ય ડાઘ અને કરમાવું સંભવિત પાક રોગના સંકેત કેવી રીતે હોઈ શકે.", "Read More →": "વધુ વાંચો →", "SMART FARMING": "સ્માર્ટ ખેતી", "Discover simple irrigation practices that can help maintain healthy crops and reduce water waste.": "સરળ સિંચાઈ પદ્ધતિઓ જાણો જે તંદુરસ્ત પાક જાળવવામાં અને પાણીની બરબાદી ઘટાડવામાં મદદ કરે.", "AI & Technology": "AI અને ટેકનોલોજી", "How AI is Changing Modern Farming": "AI આધુનિક ખેતીને કેવી રીતે બદલી રહ્યું છે", "Discover how Artificial Intelligence can help farmers identify crop problems and make better decisions.": "જાણો કે આર્ટિફિશિયલ ઇન્ટેલિજન્સ ખેડૂતોને પાકની સમસ્યાઓ ઓળખવામાં અને વધુ સારા નિર્ણયો લેવામાં કેવી રીતે મદદ કરી શકે.", "CROP CARE": "પાકની સંભાળ", "How to Keep Your Soil Healthy": "તમારી જમીનને તંદુરસ્ત કેવી રીતે રાખવી", "Healthy soil is the foundation of a healthy crop. Learn simple soil-care practices for better plant growth.": "તંદુરસ્ત જમીન તંદુરસ્ત પાકનો આધાર છે. છોડની સારી વૃદ્ધિ માટે જમીનની સંભાળની સરળ પદ્ધતિઓ શીખો.", "Common Crop Pests and How to Prevent Them": "સામાન્ય પાકની જીવાતો અને તેને કેવી રીતે રોકવી", "Learn how to identify common pests and take preventive steps to protect your crops.": "સામાન્ય જીવાતોને ઓળખવા અને પાકને બચાવવા માટે પ્રતિબંધક પગલાં શીખો.", "SEASONAL TIPS": "મોસમી ટીપ્સ", "Seasonal Farming Tips for Better Yield": "વધુ સારી ઉપજ માટે મોસમી ખેતી ટીપ્સ", "Explore practical tips for preparing your field, managing water and protecting crops throughout the season.": "ખેતરની તૈયારી, પાણી વ્યવસ્થાપન અને સમગ્ર સીઝનમાં પાકના રક્ષણ માટે વ્યવહારુ ટીપ્સ જાણો.", "Detect Crop Disease →": "પાકનો રોગ ઓળખો →", "GET IN TOUCH": "સંપર્ક કરો", "Let's Grow": "ચાલો આગળ વધીએ", "Quick Response": "ઝડપી પ્રતિસાદ", "Farmer First": "ખેડૂત પ્રથમ", "Always Here": "હંમેશા તમારી સાથે", "Your feedback": "તમારો પ્રતિસાદ", "helps us grow": "અમને આગળ વધવામાં મદદ કરે છે", "and serve better.": "અને વધુ સારી સેવા આપવામાં ਮਦਦ કરે છે.", "Your information is safe with us. We never share your details.": "તમારી માહિતી અમારી પાસે સુરક્ષિત છે. અમે તમારી વિગતો ક્યારેય શેર કરતા નથી.", "Find us on the map.": "નકશા પર અમને શોધો.", "How can I report a problem with the AI detection?": "AI ઓળખમાં સમસ્યાની જાણ કેવી રીતે કરવી?", "You can describe the issue using the contact form and our team will review it.": "તમે સંપર્ક ફોર્મ દ્વારા સમસ્યા જણાવી શકો છો અને અમારી ટીમ તેની સમીક્ષા કરશે.", "Do you provide support for regional languages?": "શું તમે પ્રાદેશિક ભાષાઓ માટે સહાય આપો છો?", "Yes, Kisan Vision is designed with farmer-friendly and accessible communication in mind.": "હા, Kisan Vision ખેડૂત-મૈત્રીપૂર્ણ અને સરળ સંચારને ધ્યાનમાં રાખીને બનાવવામાં આવ્યું છે.", "Can I collaborate or partner with Kisan Vision?": "શું હું Kisan Vision સાથે સહયોગ અથવા ભાગીદારી કરી શકું?", "Yes. Choose Partnership from the subject dropdown and send us your details.": "હા. વિષય ડ્રોપડાઉનમાં Partnership પસંદ કરો અને તમારી વિગતો મોકલો.", "Our team is always ready to help you.": "અમારી ટીમ હંમેશા તમારી મદદ માટે તૈયાર છે.", "Because your growth matters to us.": "કારણ કે તમારી પ્રગતિ અમારા માટે મહત્વપૂર્ણ છે.", "Smart Farming Brighter Tomorrow": "સ્માર્ટ ખેતી, ઉજ્જવળ આવતીકાલ", "Empowering farmers with AI-driven insights": "AI આધારિત માહિતીથી ખેડૂતોને સશક્ત બનાવવું", "for a healthier and more productive future.": "વધુ તંદુરસ્ત અને ઉત્પાદક ભવિષ્ય માટે.", "Feedback": "પ્રતિસાદ", "Follow Us": "અમને ફોલો કરો", "\"Good Farming\nBuilds Better Tomorrows.\"": "\"સારી ખેતી વધુ સારું આવતીકાલ બનાવે છે.\"", "Made with ♡ for Farmers": "ખેડૂતો માટે ♡ સાથે બનાવેલું", "Smarter Farming • Brighter Tomorrow": "સ્માર્ટ ખેતી • ઉજ્જવળ આવતીકાલ", "FOR A HEALTHIER TOMORROW": "તંદુરસ્ત આવતીકાલ માટે", "Empowering": "સશક્ત બનાવવું", "Farmers with": "ખેડૂતોને", "Smart Solutions": "સ્માર્ટ ઉકેલો", "Stronger Farmers’": "મજબૂત ખેડૂતો,", "Greener Future": "હરિયાળું ભવિષ્ય", "Don’t have an account?": "તમારું એકાઉન્ટ નથી?"});

  Object.assign(textTranslations.en, {"Menu": "Menu", "Login →": "Login →", "Essential Farming": "Essential Farming", "Practices": "Practices", "Farming Tips for": "Farming Tips for", "Every Season": "Every Season", "Simple Steps for": "Simple Steps for", "Healthier Crops": "Healthier Crops", "0 / 8 complete": "0 / 8 complete", "AI & TECHNOLOGY": "AI & TECHNOLOGY", "Good Farming": "Good Farming", "Builds Better Tomorrows.": "Builds Better Tomorrows.", "© 2026 Kisan Vision. All rights reserved.": "© 2026 Kisan Vision. All rights reserved."});

  Object.assign(textTranslations.hi, {"Menu": "मेनू", "Login →": "लॉगिन →", "Essential Farming": "ज़रूरी खेती", "Practices": "पद्धतियाँ", "Farming Tips for": "खेती के सुझाव", "Every Season": "हर मौसम के लिए", "Simple Steps for": "सरल कदम", "Healthier Crops": "स्वस्थ फसलें", "0 / 8 complete": "0 / 8 पूरे", "AI & TECHNOLOGY": "AI और तकनीक", "Good Farming": "अच्छी खेती", "Builds Better Tomorrows.": "बेहतर कल बनाती है।", "© 2026 Kisan Vision. All rights reserved.": "© 2026 Kisan Vision. सर्वाधिकार सुरक्षित।"});

  Object.assign(textTranslations.mr, {"Menu": "मेनू", "Login →": "लॉगिन →", "Essential Farming": "महत्त्वाच्या शेती पद्धती", "Practices": "पद्धती", "Farming Tips for": "शेतीच्या टिप्स", "Every Season": "प्रत्येक हंगामासाठी", "Simple Steps for": "सोप्या पायऱ्या", "Healthier Crops": "निरोगी पिके", "0 / 8 complete": "0 / 8 पूर्ण", "AI & TECHNOLOGY": "AI आणि तंत्रज्ञान", "Good Farming": "उत्तम शेती", "Builds Better Tomorrows.": "उज्ज्वल उद्या घडवते.", "© 2026 Kisan Vision. All rights reserved.": "© 2026 Kisan Vision. सर्व हक्क राखीव."});

  Object.assign(textTranslations.pa, {"Menu": "ਮੀਨੂ", "Login →": "ਲੌਗਇਨ →", "Essential Farming": "ਜ਼ਰੂਰੀ ਖੇਤੀ", "Practices": "ਤਰੀਕੇ", "Farming Tips for": "ਖੇਤੀ ਸੁਝਾਅ", "Every Season": "ਹਰ ਮੌਸਮ ਲਈ", "Simple Steps for": "ਸੌਖੇ ਕਦਮ", "Healthier Crops": "ਸਿਹਤਮੰਦ ਫਸਲਾਂ", "0 / 8 complete": "0 / 8 ਪੂਰੇ", "AI & TECHNOLOGY": "AI ਅਤੇ ਤਕਨਾਲੋਜੀ", "Good Farming": "ਚੰਗੀ ਖੇਤੀ", "Builds Better Tomorrows.": "ਬਿਹਤਰ ਭਵਿੱਖ ਬਣਾਉਂਦੀ ਹੈ।", "© 2026 Kisan Vision. All rights reserved.": "© 2026 Kisan Vision. ਸਾਰੇ ਹੱਕ ਰਾਖਵੇਂ।"});

  Object.assign(textTranslations.gu, {"Menu": "મેનૂ", "Login →": "લૉગિન →", "Essential Farming": "મહત્વપૂર્ણ ખેતી", "Practices": "પદ્ધતિઓ", "Farming Tips for": "ખેતી ટીપ્સ", "Every Season": "દરેક સીઝન માટે", "Simple Steps for": "સરળ પગલાં", "Healthier Crops": "તંદુરસ્ત પાક", "0 / 8 complete": "0 / 8 પૂર્ણ", "AI & TECHNOLOGY": "AI અને ટેકનોલોજી", "Good Farming": "સારી ખેતી", "Builds Better Tomorrows.": "વધુ સારું આવતીકાલ બનાવે છે.", "© 2026 Kisan Vision. All rights reserved.": "© 2026 Kisan Vision. તમામ હકો સુરક્ષિત."});

  Object.assign(textTranslations.en, {"🌿 GET IN TOUCH": "🌿 GET IN TOUCH", "⚡ Quick Response": "⚡ Quick Response", "🌱 Farmer First": "🌱 Farmer First", "♥ Always Here": "♥ Always Here", "🔒 Your information is safe with us. We never share your details.": "🔒 Your information is safe with us. We never share your details."});

  Object.assign(textTranslations.hi, {"🌿 GET IN TOUCH": "🌿 संपर्क करें", "⚡ Quick Response": "⚡ त्वरित जवाब", "🌱 Farmer First": "🌱 किसान पहले", "♥ Always Here": "♥ हमेशा आपके साथ", "🔒 Your information is safe with us. We never share your details.": "🔒 आपकी जानकारी हमारे पास सुरक्षित है। हम आपकी जानकारी कभी साझा नहीं करते।"});

  Object.assign(textTranslations.mr, {"🌿 GET IN TOUCH": "🌿 संपर्क साधा", "⚡ Quick Response": "⚡ जलद प्रतिसाद", "🌱 Farmer First": "🌱 शेतकरी प्रथम", "♥ Always Here": "♥ नेहमी तुमच्यासोबत", "🔒 Your information is safe with us. We never share your details.": "🔒 तुमची माहिती आमच्याकडे सुरक्षित आहे. आम्ही तुमची माहिती कधीही शेअर करत नाही."});

  Object.assign(textTranslations.pa, {"🌿 GET IN TOUCH": "🌿 ਸੰਪਰਕ ਕਰੋ", "⚡ Quick Response": "⚡ ਤੁਰੰਤ ਜਵਾਬ", "🌱 Farmer First": "🌱 ਕਿਸਾਨ ਪਹਿਲਾਂ", "♥ Always Here": "♥ ਹਮੇਸ਼ਾ ਤੁਹਾਡੇ ਨਾਲ", "🔒 Your information is safe with us. We never share your details.": "🔒 ਤੁਹਾਡੀ ਜਾਣਕਾਰੀ ਸਾਡੇ ਕੋਲ ਸੁਰੱਖਿਅਤ ਹੈ। ਅਸੀਂ ਤੁਹਾਡੀ ਜਾਣਕਾਰੀ ਕਦੇ ਸਾਂਝੀ ਨਹੀਂ ਕਰਦੇ।"});

  Object.assign(textTranslations.gu, {"🌿 GET IN TOUCH": "🌿 સંપર્ક કરો", "⚡ Quick Response": "⚡ ઝડપી પ્રતિસાદ", "🌱 Farmer First": "🌱 ખેડૂત પ્રથમ", "♥ Always Here": "♥ હંમેશા તમારી સાથે", "🔒 Your information is safe with us. We never share your details.": "🔒 તમારી માહિતી અમારી પાસે સુરક્ષિત છે. અમે તમારી વિગતો ક્યારેય શેર કરતા નથી."});

  Object.assign(textTranslations.en, {"complete": "complete"});

  Object.assign(textTranslations.hi, {"complete": "पूरे"});

  Object.assign(textTranslations.mr, {"complete": "पूर्ण"});

  Object.assign(textTranslations.pa, {"complete": "ਪੂਰੇ"});

  Object.assign(textTranslations.gu, {"complete": "પૂર્ણ"});

// ============================================================
  // CORE HELPERS
  // ============================================================

  function getSavedLang() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && translations[saved]) return saved;
    } catch (e) { /* localStorage may be unavailable */ }
    return DEFAULT_LANG;
  }

  let currentLang = getSavedLang();

  /** Deep get by "a.b.c" path. Falls back to English then original. */
  function t(key, fallback) {
    if (!key) return fallback || "";
    const rawKey = String(key);
    if (rawKey.startsWith("text:")) {
      const source = rawKey.slice(5);
      const translated = textTranslations[currentLang]?.[source];
      if (translated != null) return translated;
      return source || fallback || "";
    }
    const path = rawKey.split(".");
    const langs = [currentLang, DEFAULT_LANG];
    for (const lang of langs) {
      let node = translations[lang];
      let ok = true;
      for (const p of path) {
        if (node && typeof node === "object" && p in node) {
          node = node[p];
        } else {
          ok = false;
          break;
        }
      }
      if (ok && typeof node === "string") return node;
    }
    return fallback != null ? fallback : "";
  }

  /** Interpolate {name} placeholders. */
  function tf(key, vars, fallback) {
    let s = t(key, fallback);
    if (!s || !vars) return s;
    return s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
  }

  function applyTranslations(root) {
    const scope = root || document;

    // textContent
    scope.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const val = t(key, el.getAttribute("data-i18n-default") || el.textContent);
      if (val) el.textContent = val;
    });

    // placeholder
    scope.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const val = t(el.getAttribute("data-i18n-placeholder"));
      if (val) el.setAttribute("placeholder", val);
    });

    // aria-label
    scope.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
      const val = t(el.getAttribute("data-i18n-aria-label"));
      if (val) el.setAttribute("aria-label", val);
    });

    // title
    scope.querySelectorAll("[data-i18n-title]").forEach((el) => {
      const val = t(el.getAttribute("data-i18n-title"));
      if (val) el.setAttribute("title", val);
    });

    document.querySelectorAll("#language, #language-choice").forEach((el) => { el.value = currentLang; });
    document.querySelectorAll(".kv-lang, .lang-select").forEach((el) => {
      const iconText = el.querySelector("i");
      if (iconText) {
        // Preserve icons and update only the text node.
      }
      Array.from(el.childNodes).forEach((n) => { if (n.nodeType === 3 && n.textContent.trim()) n.textContent = ` ${LANG_NAMES[currentLang] || "English"} `; });
    });

    // Update every visible language selector current-label
    document.querySelectorAll(".kv-lang-current").forEach((el) => {
      el.textContent = LANG_NAMES[currentLang] || "English";
    });

    // Highlight active option in every menu
    document.querySelectorAll(".kv-lang-menu [data-lang]").forEach((btn) => {
      btn.classList.toggle("is-active", btn.getAttribute("data-lang") === currentLang);
      btn.setAttribute("aria-selected", btn.getAttribute("data-lang") === currentLang ? "true" : "false");
    });
  }

  function setLanguage(lang) {
    if (!translations[lang]) lang = DEFAULT_LANG;
    currentLang = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
    document.documentElement.lang = lang;
    document.documentElement.dir = "ltr";
    applyTranslations();
    applyTextTranslations();
    applyBlogAutoTranslations();
    // Notify page scripts
    document.dispatchEvent(new CustomEvent("kv:languagechange", { detail: { lang } }));
  }


  // Translate text nodes marked by the integration script.
  function applyTextTranslations() {
    document.querySelectorAll("[data-i18n-text]:not(option)").forEach((el) => {
      const source = el.getAttribute("data-i18n-text") || "";
      const val = textTranslations[currentLang]?.[source] ?? source;
      if (el.dataset.i18nMode === "html") el.innerHTML = val;
      else el.textContent = val;
    });
    document.querySelectorAll("[data-i18n-placeholder-text]").forEach((el) => {
      const source = el.getAttribute("data-i18n-placeholder-text") || "";
      el.setAttribute("placeholder", textTranslations[currentLang]?.[source] ?? source);
    });
  }

  // ============================================================
  // DROPDOWN WIRING (auto for every .kv-lang-wrap on the page)
  // ============================================================
  function wireDropdowns() {
    // Existing native selectors used by older Kisan Vision pages.
    document.querySelectorAll("#language, #language-choice").forEach((select) => {
      const current = currentLang;
      const options = [
        ["en", "English"], ["hi", "हिन्दी"], ["mr", "मराठी"], ["pa", "ਪੰਜਾਬੀ"], ["gu", "ગુજરાતી"]
      ];
      select.innerHTML = options.map(([v,n]) => `<option value="${v}">${n}</option>`).join("");
      select.value = current;
      select.addEventListener("change", () => setLanguage(select.value));
    });

    // Existing pill-style language buttons on How It Works / Detect / Contact / Login.
    document.querySelectorAll(".kv-lang, .lang-select").forEach((btn) => {
      if (btn.dataset.kvLangWired === "1") return;
      btn.dataset.kvLangWired = "1";
      btn.setAttribute("aria-haspopup", "listbox");
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        let menu = btn.parentElement.querySelector(":scope > .kv-lang-menu");
        if (!menu) {
          menu = document.createElement("div");
          menu.className = "kv-lang-menu";
          menu.innerHTML = [["en","English"],["hi","हिन्दी"],["mr","मराठी"],["pa","ਪੰਜਾਬੀ"],["gu","ગુજરાતી"]].map(([v,n]) => `<button type="button" data-lang="${v}">${n}</button>`).join("");
          btn.parentElement.style.position = btn.parentElement.style.position || "relative";
          btn.parentElement.appendChild(menu);
          menu.querySelectorAll("[data-lang]").forEach((opt) => opt.addEventListener("click", (ev) => {
            ev.stopPropagation(); setLanguage(opt.dataset.lang); menu.classList.remove("is-open");
          }));
        }
        menu.classList.toggle("is-open");
      });
    });
    document.querySelectorAll(".kv-lang-wrap").forEach((wrap) => {
      const btn = wrap.querySelector(".kv-lang-btn");
      const menu = wrap.querySelector(".kv-lang-menu");
      if (!btn || !menu) return;

      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const open = wrap.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });

      menu.querySelectorAll("[data-lang]").forEach((opt) => {
        opt.addEventListener("click", (e) => {
          e.stopPropagation();
          const lang = opt.getAttribute("data-lang");
          setLanguage(lang);
          wrap.classList.remove("is-open");
          btn.setAttribute("aria-expanded", "false");
        });
      });
    });

    // Global click closes all open menus
    document.addEventListener("click", () => {
      document.querySelectorAll(".kv-lang-wrap.is-open").forEach((w) => {
        w.classList.remove("is-open");
        const b = w.querySelector(".kv-lang-btn");
        if (b) b.setAttribute("aria-expanded", "false");
      });
    });

    // Escape closes
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".kv-lang-wrap.is-open").forEach((w) => {
          w.classList.remove("is-open");
          const b = w.querySelector(".kv-lang-btn");
          if (b) b.setAttribute("aria-expanded", "false");
        });
      }
    });
  }

  // ============================================================
  // MINIMAL DROPDOWN STYLES (injected, does not touch existing CSS)
  // ============================================================
  function injectStyles() {
    if (document.getElementById("kv-lang-inline-styles")) return;
    const css = `
      .kv-lang-wrap { position: relative; display: inline-block; }
      .kv-lang-menu {
        position: absolute; top: calc(100% + 8px); right: 0;
        min-width: 160px; background: #fff;
        border: 1px solid #dcebd7; border-radius: 14px;
        box-shadow: 0 12px 30px rgba(11,68,38,0.14);
        list-style: none; margin: 0; padding: 6px;
        display: none; z-index: 300;
      }
      .kv-lang-wrap.is-open .kv-lang-menu, .kv-lang-menu.is-open { display: block; }
      .kv-lang-menu li { list-style: none; }
      .kv-lang-menu button[data-lang] {
        display:block; width:100%; padding:9px 12px; margin:2px 0; background:transparent; border:0; border-radius:10px; cursor:pointer; text-align:left; font:inherit; color:#183226; font-weight:600;
      }
      .kv-lang-menu button[data-lang]:hover { background:#eff8e9; color:#0b4426; }
      .kv-lang-menu button[data-lang].is-active { background:#0b4426; color:#fff; }
      .kv-lang-menu [data-lang] {
        display: block; width: 100%;
        padding: 9px 12px; margin: 2px 0;
        background: transparent; border: 0;
        border-radius: 10px; cursor: pointer;
        text-align: left; font: inherit;
        color: #183226; font-weight: 600;
        transition: background-color 180ms ease, color 180ms ease;
      }
      .kv-lang-menu [data-lang]:hover { background: #eff8e9; color: #0b4426; }
      .kv-lang-menu [data-lang].is-active {
        background: #0b4426; color: #fff;
      }
      @media (max-width: 780px) {
        .kv-lang-menu { right: auto; left: 0; }
      }
    `;
    const style = document.createElement("style");
    style.id = "kv-lang-inline-styles";
    style.textContent = css;
    document.head.appendChild(style);
  }

  // ============================================================
  // CHATBOT
  // ============================================================
  function wireChatbot() {
    if (document.getElementById("kv-chat-panel")) return;

    const panel = document.createElement("section");
    panel.id = "kv-chat-panel";
    panel.className = "kv-chat-panel";
    panel.hidden = true;
    panel.setAttribute("aria-label", "Kisan Vision agriculture assistant");
    panel.innerHTML = `
      <div class="kv-chat-header">
        <div><strong>KisanVision Assistant</strong><span>Ask a farming question</span></div>
        <button type="button" class="kv-chat-close" aria-label="Close chatbot">×</button>
      </div>
      <div class="kv-chat-messages" role="log" aria-live="polite">
        <p class="kv-chat-message kv-chat-bot">Hello! I can help with crop care, disease symptoms, and farming questions.</p>
      </div>
      <form class="kv-chat-form">
        <input type="text" maxlength="1000" autocomplete="off" placeholder="Type your question…" aria-label="Chat message" required>
        <button type="submit">Send</button>
      </form>`;
    document.body.appendChild(panel);

    const messages = panel.querySelector(".kv-chat-messages");
    const form = panel.querySelector(".kv-chat-form");
    const input = form.querySelector("input");
    const close = panel.querySelector(".kv-chat-close");

    function addMessage(text, type) {
      const item = document.createElement("p");
      item.className = "kv-chat-message " + type;
      item.textContent = text;
      messages.appendChild(item);
      messages.scrollTop = messages.scrollHeight;
      return item;
    }

    function openChat() { panel.hidden = false; input.focus(); }
    function closeChat() { panel.hidden = true; }

    // Capture clicks so older page-specific placeholder listeners cannot run.
    document.addEventListener("click", function (event) {
      const trigger = event.target.closest("#kvChatbotBtn, .chatbot-button");
      if (!trigger) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      openChat();
    }, true);

    close.addEventListener("click", closeChat);
    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      const message = input.value.trim();
      if (!message) return;

      addMessage(message, "kv-chat-user");
      input.value = "";
      input.disabled = true;
      const pending = addMessage("Thinking…", "kv-chat-bot kv-chat-pending");
      try {
        const response = await fetch(API_BASE_URL + "/chat", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({message})
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.detail || "Unable to get a response.");
        pending.textContent = data.reply || "I could not generate a response. Please try again.";
        pending.classList.remove("kv-chat-pending");
      } catch (error) {
        pending.textContent = error.message || "Unable to connect to the assistant.";
        pending.classList.remove("kv-chat-pending");
      } finally {
        input.disabled = false;
        input.focus();
      }
    });
  }

  function injectChatbotStyles() {
    if (document.getElementById("kv-chatbot-inline-styles")) return;
    const style = document.createElement("style");
    style.id = "kv-chatbot-inline-styles";
    style.textContent = `
      .kv-chat-panel { position:fixed; right:24px; bottom:88px; z-index:1000; width:min(380px,calc(100vw - 32px)); background:#fff; border:1px solid #cfe4d5; border-radius:18px; overflow:hidden; box-shadow:0 18px 48px rgba(8,61,31,.24); font-family:Arial,sans-serif; }
      .kv-chat-header { display:flex; align-items:center; justify-content:space-between; gap:12px; padding:15px 17px; background:#14532d; color:#fff; }
      .kv-chat-header strong,.kv-chat-header span { display:block; }.kv-chat-header span { margin-top:3px; font-size:12px; opacity:.82; }
      .kv-chat-close { border:0; background:transparent; color:#fff; font-size:27px; line-height:1; cursor:pointer; }
      .kv-chat-messages { height:280px; overflow:auto; padding:15px; background:#f4f9f5; }
      .kv-chat-message { max-width:85%; width:max-content; margin:0 0 10px; padding:10px 12px; border-radius:12px; font-size:14px; line-height:1.45; white-space:pre-wrap; }
      .kv-chat-bot { background:#fff; color:#183226; border:1px solid #d9eadc; }.kv-chat-user { margin-left:auto; background:#166534; color:#fff; }.kv-chat-pending { color:#567062; font-style:italic; }
      .kv-chat-form { display:flex; gap:8px; padding:12px; border-top:1px solid #d9eadc; background:#fff; }.kv-chat-form input { min-width:0; flex:1; border:1px solid #b8d5c0; border-radius:10px; padding:10px; font:inherit; }.kv-chat-form button { border:0; border-radius:10px; background:#166534; color:#fff; padding:0 14px; font-weight:700; cursor:pointer; }
      @media (max-width:600px) { .kv-chat-panel { right:16px; bottom:78px; }.kv-chat-messages { height:240px; } }
    `;
    document.head.appendChild(style);
  }

  // ============================================================
  // BLOG ARTICLE FALLBACK TRANSLATION
  // ============================================================
  // The common dictionary contains the shared UI text. Blog articles also
  // contain long, page-specific paragraphs. Translate those missing entries
  // on demand and cache them locally so every blog page can use the same
  // language system without maintaining a separate JS file per article.
  const BLOG_AUTO_TRANSLATE_CACHE = "kvBlogAutoTranslations";
  const BLOG_AUTO_TRANSLATE_LANGS = new Set(["hi", "mr", "pa", "gu"]);

  function blogAutoCache(lang) {
    try {
      return JSON.parse(localStorage.getItem(`${BLOG_AUTO_TRANSLATE_CACHE}_${lang}`) || "{}");
    } catch (e) { return {}; }
  }

  function saveBlogAutoCache(lang, cache) {
    try { localStorage.setItem(`${BLOG_AUTO_TRANSLATE_CACHE}_${lang}`, JSON.stringify(cache)); } catch (e) {}
  }

  async function translateBlogTextOnline(source, lang) {
    const endpoint = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=" +
      encodeURIComponent(lang) + "&dt=t&q=" + encodeURIComponent(source);
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error("Translation request failed");
    const data = await response.json();
    if (!Array.isArray(data) || !Array.isArray(data[0])) throw new Error("Invalid translation response");
    return data[0].map(part => part[0] || "").join("");
  }

  const BLOG_ORIGINAL_TEXT = new WeakMap();

  function blogTranslationScope() {
    return document.querySelectorAll(
      ".kv-article, .blog-hero, .blog-tools, .categories, .featured-article, .featured-content, .articles-section, .articles-grid, footer"
    );
  }

  function collectBlogTranslationTargets() {
    const targets = [];
    const seen = new Set();
    const scopes = blogTranslationScope();

    scopes.forEach((scope) => {
      const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          if (["SCRIPT", "STYLE", "NOSCRIPT", "OPTION"].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
          if (parent.closest("[data-i18n-text]")) return NodeFilter.FILTER_REJECT;
          if (parent.closest(".kv-lang-menu")) return NodeFilter.FILTER_REJECT;
          const value = (node.textContent || "").replace(/\s+/g, " ").trim();
          if (!value || value.length < 2) return NodeFilter.FILTER_REJECT;
          if (/^[\d\s•·→←✓→|—–.,:;!?(){}\[\]<>+\-]+$/.test(value)) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      });

      let node;
      while ((node = walker.nextNode())) {
        if (seen.has(node)) continue;
        seen.add(node);
        if (!BLOG_ORIGINAL_TEXT.has(node)) {
          BLOG_ORIGINAL_TEXT.set(node, node.textContent || "");
        }
        targets.push({
          node,
          source: (BLOG_ORIGINAL_TEXT.get(node) || "").replace(/\s+/g, " ").trim()
        });
      }
    });

    return targets;
  }

  async function applyBlogAutoTranslations() {
    if (!document.querySelector(".kv-article, .blog-hero")) return;
    if (!BLOG_AUTO_TRANSLATE_LANGS.has(currentLang)) return;

    const cache = blogAutoCache(currentLang);
    const targets = [];

    // First handle explicitly marked long-form elements.
    document.querySelectorAll("[data-i18n-text]:not(option)").forEach((el) => {
      const source = (el.getAttribute("data-i18n-text") || "").replace(/\s+/g, " ").trim();
      if (!source || textTranslations[currentLang]?.[source] != null) return;
      if (cache[source]) {
        el.textContent = cache[source];
      } else {
        targets.push({ el, source });
      }
    });

    // Then catch visible Blog text that was not marked with data-i18n-text.
    collectBlogTranslationTargets().forEach(({ node, source }) => {
      if (!source || cache[source]) {
        if (cache[source]) node.textContent = cache[source];
        return;
      }
      targets.push({ node, source });
    });

    // Keep requests controlled for long articles.
    let index = 0;
    const worker = async () => {
      while (index < targets.length) {
        const item = targets[index++];
        try {
          const translated = await translateBlogTextOnline(item.source, currentLang);
          if (translated) {
            cache[item.source] = translated;
            if (item.node) item.node.textContent = translated;
            if (item.el) item.el.textContent = translated;
          }
        } catch (e) {
          // Keep the original English text if online translation is unavailable.
        }
      }
    };

    await Promise.all([worker(), worker(), worker(), worker(), worker(), worker()]);
    saveBlogAutoCache(currentLang, cache);
  }

    // ============================================================
  // LOGIN STATE / USER MENU
  // ============================================================

  function setupUserMenu() {
    const userData = localStorage.getItem("kisanVisionUser");

    // Find the existing navbar Login button
    let loginLink =
      document.querySelector('a[href="login.html"]') ||
      document.querySelector('a[href="./login.html"]') ||
      document.querySelector('a[href="/login.html"]');

    // If no login link is found, try finding it by text
    if (!loginLink) {
      const links = document.querySelectorAll("a");

      links.forEach((link) => {
        if (loginLink) return;

        const text = (link.textContent || "").trim().toLowerCase();

        if (
          text === "login" ||
          text === "लॉगिन" ||
          text === "log in"
        ) {
          loginLink = link;
        }
      });
    }

    if (!loginLink) {
      console.warn("KisanVision: Login navbar button not found.");
      return;
    }

    // ----------------------------------------------------------
    // USER IS NOT LOGGED IN
    // ----------------------------------------------------------

    if (!userData) {
      loginLink.style.display = "";
      return;
    }

    let user;

    try {
      user = JSON.parse(userData);
    } catch (error) {
      console.error("Invalid KisanVision user data:", error);
      localStorage.removeItem("kisanVisionUser");
      return;
    }

    if (!user || !user.name) {
      return;
    }

    // ----------------------------------------------------------
    // USER IS LOGGED IN
    // ----------------------------------------------------------

    // Hide old Login button
    loginLink.style.display = "none";

    // Prevent duplicate menu
    if (document.getElementById("kvUserMenu")) {
      return;
    }

    const wrapper = document.createElement("div");

    wrapper.id = "kvUserMenu";
    wrapper.className = "kv-user-menu";

    wrapper.innerHTML = `
      <button
        type="button"
        class="kv-user-button"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span class="kv-user-icon">
          <i class="fa-solid fa-user"></i>
        </span>

        <span class="kv-user-name">
          ${escapeUserName(user.name)}
        </span>

        <i class="fa-solid fa-chevron-down kv-user-arrow"></i>
      </button>

      <div class="kv-user-dropdown">

        <div class="kv-user-header">
          <div class="kv-user-avatar">
            <i class="fa-solid fa-user"></i>
          </div>

          <div class="kv-user-info">
            <strong>${escapeUserName(user.name)}</strong>
            <span>${escapeUserName(user.email || "")}</span>
          </div>
        </div>

        <div class="kv-user-divider"></div>

        <a href="#" class="kv-user-item" data-action="profile">
          <i class="fa-regular fa-user"></i>
          <span>Profile</span>
        </a>

        <a href="#" class="kv-user-item" data-action="history">
          <i class="fa-solid fa-clock-rotate-left"></i>
          <span>History</span>
        </a>

        <div class="kv-user-divider"></div>

        <button
          type="button"
          class="kv-user-item kv-logout"
          data-action="logout"
        >
          <i class="fa-solid fa-right-from-bracket"></i>
          <span>Logout</span>
        </button>

      </div>
    `;

    // Put user menu where Login button was
    loginLink.parentElement.insertBefore(wrapper, loginLink);

    // ----------------------------------------------------------
    // USER DROPDOWN
    // ----------------------------------------------------------

    const button = wrapper.querySelector(".kv-user-button");
    const dropdown = wrapper.querySelector(".kv-user-dropdown");

    button.addEventListener("click", function (event) {
      event.stopPropagation();

      const isOpen = wrapper.classList.toggle("is-open");

      button.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );
    });

    // Close when clicking outside
    document.addEventListener("click", function () {
      wrapper.classList.remove("is-open");

      button.setAttribute(
        "aria-expanded",
        "false"
      );
    });

    dropdown.addEventListener("click", function (event) {
      event.stopPropagation();
    });

    // ----------------------------------------------------------
    // PROFILE
    // ----------------------------------------------------------

    const profileButton =
      wrapper.querySelector('[data-action="profile"]');

    profileButton.addEventListener("click", function (event) {
      event.preventDefault();

      alert(
        "Logged in as: " +
        user.name +
        "\\nEmail: " +
        (user.email || "Not available") +
        "\\nMobile: " +
        (user.mobile || "Not available")
      );
    });

    // ----------------------------------------------------------
    // HISTORY
    // ----------------------------------------------------------

    const historyButton =
      wrapper.querySelector('[data-action="history"]');

    historyButton.addEventListener("click", function (event) {
  event.preventDefault();

  window.location.href = "crop-history.html";
});

    // ----------------------------------------------------------
    // LOGOUT
    // ----------------------------------------------------------

    const logoutButton =
      wrapper.querySelector('[data-action="logout"]');

    logoutButton.addEventListener("click", function () {

      const confirmLogout = confirm(
        "Are you sure you want to logout?"
      );

      if (!confirmLogout) {
        return;
      }

      localStorage.removeItem("kisanVisionUser");

      window.location.href = "windows.html";
    });
  }


  // ============================================================
  // ESCAPE USER DATA
  // ============================================================

  function escapeUserName(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }


  // ============================================================
  // USER MENU STYLES
  // ============================================================

  function injectUserMenuStyles() {

    if (document.getElementById("kvUserMenuStyles")) {
      return;
    }

    const style = document.createElement("style");

    style.id = "kvUserMenuStyles";

    style.textContent = `
      .kv-user-menu {
        position: relative;
        display: inline-block;
        margin-left: 8px;
      }

      .kv-user-button {
        display: flex;
        align-items: center;
        gap: 9px;
        border: none;
        cursor: pointer;
        padding: 11px 18px;
        border-radius: 999px;
        background: #147a43;
        color: #ffffff;
        font-family: inherit;
        font-size: 15px;
        font-weight: 700;
        transition: all 0.2s ease;
      }

      .kv-user-button:hover {
        transform: translateY(-1px);
        opacity: 0.94;
      }

      .kv-user-icon {
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: rgba(255,255,255,0.18);
      }

      .kv-user-name {
        max-width: 130px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .kv-user-arrow {
        font-size: 11px;
        transition: transform 0.2s ease;
      }

      .kv-user-menu.is-open .kv-user-arrow {
        transform: rotate(180deg);
      }

      .kv-user-dropdown {
        position: absolute;
        top: calc(100% + 10px);
        right: 0;
        width: 250px;
        padding: 10px;
        background: #ffffff;
        border: 1px solid rgba(20, 122, 67, 0.12);
        border-radius: 16px;
        box-shadow: 0 15px 40px rgba(0,0,0,0.12);
        opacity: 0;
        visibility: hidden;
        transform: translateY(-6px);
        transition: all 0.2s ease;
        z-index: 9999;
      }

      .kv-user-menu.is-open .kv-user-dropdown {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }

      .kv-user-header {
        display: flex;
        align-items: center;
        gap: 11px;
        padding: 9px;
      }

      .kv-user-avatar {
        width: 42px;
        height: 42px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: #e9f6ee;
        color: #147a43;
      }

      .kv-user-info {
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 3px;
      }

      .kv-user-info strong {
        color: #173b29;
        font-size: 14px;
      }

      .kv-user-info span {
        color: #6b7d73;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .kv-user-divider {
        height: 1px;
        margin: 7px 0;
        background: #edf1ee;
      }

      .kv-user-item {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 11px;
        padding: 11px 12px;
        border: none;
        border-radius: 10px;
        background: transparent;
        color: #294737;
        text-decoration: none;
        font-family: inherit;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        text-align: left;
        box-sizing: border-box;
      }

      .kv-user-item:hover {
        background: #f0f8f3;
        color: #147a43;
      }

      .kv-user-item i {
        width: 18px;
        text-align: center;
      }

      .kv-logout {
        color: #b33a3a;
      }

      .kv-logout:hover {
        background: #fff2f2;
        color: #b33a3a;
      }

      @media (max-width: 700px) {

        .kv-user-name {
          max-width: 85px;
        }

        .kv-user-dropdown {
          right: 0;
          width: 230px;
        }

      }
    `;

    document.head.appendChild(style);
  }
  // ============================================================
  // INIT
  // ============================================================
  function init() {
    injectStyles();
    injectChatbotStyles();
    injectUserMenuStyles();
    wireChatbot();
    document.documentElement.lang = currentLang;
    document.documentElement.dir = "ltr";
    wireDropdowns();
    setupUserMenu();
    applyTranslations();
    applyTextTranslations();
    applyBlogAutoTranslations();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // ============================================================
  // PUBLIC API
  // ============================================================
  window.t = t;
  window.tf = tf;
  window.setLanguage = setLanguage;
  window.applyTranslations = applyTranslations;
  window.getLanguage = () => currentLang;
  window.kvTranslateText = (source) => textTranslations[currentLang]?.[source] ?? source;
  window.KV_LANG_NAMES = LANG_NAMES;
})();
