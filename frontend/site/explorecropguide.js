(function () {
  "use strict";

  /* =========================================================
     KISAN VISION - CROP RECOMMENDATION
     ========================================================= */

  const translations = {
    en: {
      pageTitle: "Crop Recommendation | Kisan Vision",
      navHome: "Home",
      navHow: "How It Works",
      navDisease: "Detect Disease",
      navGuide: "Farming Guide",
      navBlog: "Blog",
      navContact: "Contact",
      login: "Log in",

      eyebrow: "SMART CROP RECOMMENDATION",
      heading: "Recommend the Best Crop",
      intro:
        "Enter your field conditions to get suitable crop recommendations.",

      fieldDetails: "FIELD DETAILS",
      formTitle: "Tell us about your field",
      requiredNote: "* Required fields",

      stateLabel: "State *",
      districtLabel: "District *",
      seasonLabel: "Season *",
      soilLabel: "Soil type *",
      waterLabel: "Water availability *",
      temperatureLabel: "Temperature (°C) *",
      rainfallLabel: "Rainfall *",

      selectState: "Select state",
      selectDistrict: "Select district",
      selectSeason: "Select season",
      selectSoil: "Select soil type",
      selectWater: "Select availability",
      selectRainfall: "Select rainfall level",

      formHelp:
        "Use recent local conditions for a more useful match.",

      recommendButton: "Recommend Crops",

      complete: "AI RECOMMENDATION COMPLETE",
      resultsKicker: "YOUR FIELD MATCH",
      recommendedCrops: "Recommended Crops",
      resultsSubheading:
        "Crops ranked according to your field conditions.",

      editInputs: "Edit inputs",
      bestMatch: "BEST MATCH",
      suitability: "SUITABILITY",
      score: "SCORE",

      bestMatchMeta: "Your strongest field fit",
      suitabilityMeta: "Based on available conditions",
      scoreMeta: "Recommendation confidence",

      topRecommendations: "Top Crop Recommendations",
      topRecommendationsSub:
        "Crops ranked according to your field conditions",

      cropOverview: "Crop Overview",
      cropName: "Crop name",
      waterRequirement: "Water requirement",
      rainfallRequirement: "Rainfall requirement",

      cropDuration: "CROP DURATION",
      days: "days",

      sowingInformation: "Sowing Information",
      window: "Window",
      seed: "Seed",
      spacing: "Spacing",

      managementGuidance: "Management Guidance",
      soil: "Soil",
      irrigation: "Irrigation",
      nutrition: "Nutrition",
      weedManagement: "Weed management",
      pestManagement: "Pest management",
      diseaseManagement: "Disease management",

      disclaimer:
        "These are preliminary crop suitability matches. Final farm decisions should also consider verified local agricultural advisories, soil-test results, seed or variety availability, irrigation conditions and current weather.",

      footerText: "Growing a smarter, healthier future.",
      privacy: "Privacy",
      terms: "Terms",

      missing:
        "Please complete all required fields before continuing.",

      loading: "Analyzing field conditions...",

      error:
        "We couldn't generate a recommendation right now. Please try again."
    },

    hi: {
      pageTitle: "फसल सिफारिश | किसान विज़न",
      navHome: "होम",
      navHow: "यह कैसे काम करता है",
      navDisease: "रोग पहचानें",
      navGuide: "खेती गाइड",
      navBlog: "ब्लॉग",
      navContact: "संपर्क",
      login: "लॉगिन",

      eyebrow: "स्मार्ट फसल सिफारिश",
      heading: "सबसे अच्छी फसल चुनें",
      intro:
        "उपयुक्त फसल सिफारिश पाने के लिए अपने खेत की जानकारी भरें।",

      fieldDetails: "खेत की जानकारी",
      formTitle: "अपने खेत के बारे में बताएं",
      requiredNote: "* आवश्यक फ़ील्ड",

      stateLabel: "राज्य *",
      districtLabel: "ज़िला *",
      seasonLabel: "मौसम *",
      soilLabel: "मिट्टी का प्रकार *",
      waterLabel: "पानी की उपलब्धता *",
      temperatureLabel: "तापमान (°C) *",
      rainfallLabel: "वर्षा *",

      selectState: "राज्य चुनें",
      selectDistrict: "ज़िला चुनें",
      selectSeason: "मौसम चुनें",
      selectSoil: "मिट्टी का प्रकार चुनें",
      selectWater: "उपलब्धता चुनें",
      selectRainfall: "वर्षा स्तर चुनें",

      formHelp:
        "बेहतर परिणाम के लिए हाल की स्थानीय परिस्थितियों का उपयोग करें।",

      recommendButton: "फसल की सिफारिश करें",

      complete: "AI सिफारिश पूरी हुई",
      resultsKicker: "आपके खेत का मिलान",
      recommendedCrops: "अनुशंसित फसलें",
      resultsSubheading:
        "आपके खेत की स्थितियों के अनुसार फसलें।",

      editInputs: "जानकारी बदलें",
      bestMatch: "सबसे अच्छा मिलान",
      suitability: "उपयुक्तता",
      score: "स्कोर",

      bestMatchMeta: "आपके खेत के लिए सबसे अच्छा विकल्प",
      suitabilityMeta: "उपलब्ध परिस्थितियों के आधार पर",
      scoreMeta: "सिफारिश का भरोसा",

      topRecommendations: "मुख्य फसल सिफारिशें",
      topRecommendationsSub:
        "आपके खेत की परिस्थितियों के अनुसार फसलें",

      cropOverview: "फसल का विवरण",
      cropName: "फसल का नाम",
      waterRequirement: "पानी की आवश्यकता",
      rainfallRequirement: "वर्षा की आवश्यकता",

      cropDuration: "फसल अवधि",
      days: "दिन",

      sowingInformation: "बुवाई की जानकारी",
      window: "समय",
      seed: "बीज",
      spacing: "दूरी",

      managementGuidance: "प्रबंधन मार्गदर्शन",
      soil: "मिट्टी",
      irrigation: "सिंचाई",
      nutrition: "पोषण",
      weedManagement: "खरपतवार प्रबंधन",
      pestManagement: "कीट प्रबंधन",
      diseaseManagement: "रोग प्रबंधन",

      disclaimer:
        "ये प्रारंभिक फसल उपयुक्तता मिलान हैं। अंतिम निर्णय में स्थानीय कृषि सलाह, मिट्टी परीक्षण, बीज उपलब्धता, सिंचाई और मौसम को भी ध्यान में रखें।",

      footerText: "बेहतर और स्वस्थ भविष्य की ओर।",
      privacy: "गोपनीयता",
      terms: "शर्तें",

      missing:
        "कृपया आगे बढ़ने से पहले सभी आवश्यक फ़ील्ड भरें।",

      loading:
        "खेत की स्थितियों का विश्लेषण हो रहा है...",

      error:
        "अभी सिफारिश नहीं बन सकी। कृपया फिर कोशिश करें।"
    },

    mr: {
      pageTitle: "पीक शिफारस | किसान व्हिजन",
      navHome: "होम",
      navHow: "हे कसे काम करते",
      navDisease: "रोग ओळखा",
      navGuide: "शेती मार्गदर्शक",
      navBlog: "ब्लॉग",
      navContact: "संपर्क",
      login: "लॉगिन",

      eyebrow: "स्मार्ट पीक शिफारस",
      heading: "सर्वोत्तम पीक सुचवा",
      intro:
        "योग्य पीकांची शिफारस मिळवण्यासाठी आपल्या शेताची माहिती भरा.",

      fieldDetails: "शेताची माहिती",
      formTitle: "आपल्या शेताबद्दल सांगा",
      requiredNote: "* आवश्यक माहिती",

      stateLabel: "राज्य *",
      districtLabel: "जिल्हा *",
      seasonLabel: "हंगाम *",
      soilLabel: "मातीचा प्रकार *",
      waterLabel: "पाण्याची उपलब्धता *",
      temperatureLabel: "तापमान (°C) *",
      rainfallLabel: "पाऊस *",

      selectState: "राज्य निवडा",
      selectDistrict: "जिल्हा निवडा",
      selectSeason: "हंगाम निवडा",
      selectSoil: "मातीचा प्रकार निवडा",
      selectWater: "उपलब्धता निवडा",
      selectRainfall: "पावसाची पातळी निवडा",

      recommendButton: "पीकांची शिफारस करा",

      complete: "AI शिफारस पूर्ण",
      resultsKicker: "आपल्या शेताचा मेळ",
      recommendedCrops: "शिफारस केलेली पिके",
      resultsSubheading:
        "आपल्या शेताच्या परिस्थितीनुसार पिके.",

      editInputs: "माहिती बदला",
      bestMatch: "सर्वोत्तम पर्याय",
      suitability: "योग्यता",
      score: "स्कोअर",

      bestMatchMeta: "आपल्या शेतासाठी सर्वोत्तम पर्याय",
      suitabilityMeta: "उपलब्ध परिस्थितीवर आधारित",
      scoreMeta: "शिफारसीचा विश्वास",

      topRecommendations: "मुख्य पीक शिफारसी",
      topRecommendationsSub:
        "आपल्या शेताच्या परिस्थितीनुसार पिके",

      cropOverview: "पीक माहिती",
      cropName: "पीकाचे नाव",
      waterRequirement: "पाण्याची गरज",
      rainfallRequirement: "पावसाची गरज",

      cropDuration: "पीक कालावधी",
      days: "दिवस",

      sowingInformation: "पेरणीची माहिती",
      window: "कालावधी",
      seed: "बियाणे",
      spacing: "अंतर",

      managementGuidance: "व्यवस्थापन मार्गदर्शन",
      soil: "माती",
      irrigation: "सिंचन",
      nutrition: "पोषण",
      weedManagement: "तण व्यवस्थापन",
      pestManagement: "कीड व्यवस्थापन",
      diseaseManagement: "रोग व्यवस्थापन",

      disclaimer:
        "ही प्राथमिक पीक योग्यता शिफारस आहे. अंतिम निर्णय घेताना स्थानिक कृषी सल्ला, माती चाचणी, बियाण्याची उपलब्धता, सिंचन आणि हवामान विचारात घ्या.",

      footerText: "अधिक स्मार्ट आणि निरोगी भविष्याकडे.",
      privacy: "गोपनीयता",
      terms: "अटी",

      missing:
        "कृपया पुढे जाण्यापूर्वी सर्व आवश्यक माहिती भरा.",

      loading:
        "शेताच्या परिस्थितीचे विश्लेषण सुरू आहे...",

      error:
        "आत्ता शिफारस तयार करता आली नाही. कृपया पुन्हा प्रयत्न करा."
    },

    pa: {
      pageTitle: "ਫਸਲ ਸਿਫਾਰਸ਼ | ਕਿਸਾਨ ਵਿਜ਼ਨ",
      navHome: "ਹੋਮ",
      navHow: "ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ",
      navDisease: "ਰੋਗ ਪਛਾਣੋ",
      navGuide: "ਖੇਤੀ ਗਾਈਡ",
      navBlog: "ਬਲੌਗ",
      navContact: "ਸੰਪਰਕ",
      login: "ਲੌਗਇਨ",

      eyebrow: "ਸਮਾਰਟ ਫਸਲ ਸਿਫਾਰਸ਼",
      heading: "ਸਭ ਤੋਂ ਵਧੀਆ ਫਸਲ ਦੀ ਸਿਫਾਰਸ਼",
      intro:
        "ਢੁਕਵੀਂ ਫਸਲ ਦੀ ਸਿਫਾਰਸ਼ ਲਈ ਆਪਣੇ ਖੇਤ ਦੀ ਜਾਣਕਾਰੀ ਭਰੋ।",

      fieldDetails: "ਖੇਤ ਦੀ ਜਾਣਕਾਰੀ",
      formTitle: "ਆਪਣੇ ਖੇਤ ਬਾਰੇ ਦੱਸੋ",
      requiredNote: "* ਲੋੜੀਂਦੇ ਖੇਤਰ",

      stateLabel: "ਰਾਜ *",
      districtLabel: "ਜ਼ਿਲ੍ਹਾ *",
      seasonLabel: "ਮੌਸਮ *",
      soilLabel: "ਮਿੱਟੀ ਦੀ ਕਿਸਮ *",
      waterLabel: "ਪਾਣੀ ਦੀ ਉਪਲਬਧਤਾ *",
      temperatureLabel: "ਤਾਪਮਾਨ (°C) *",
      rainfallLabel: "ਵਰਖਾ *",

      selectState: "ਰਾਜ ਚੁਣੋ",
      selectDistrict: "ਜ਼ਿਲ੍ਹਾ ਚੁਣੋ",
      selectSeason: "ਮੌਸਮ ਚੁਣੋ",
      selectSoil: "ਮਿੱਟੀ ਦੀ ਕਿਸਮ ਚੁਣੋ",
      selectWater: "ਉਪਲਬਧਤਾ ਚੁਣੋ",
      selectRainfall: "ਵਰਖਾ ਪੱਧਰ ਚੁਣੋ",

      recommendButton: "ਫਸਲ ਦੀ ਸਿਫਾਰਸ਼ ਕਰੋ",

      complete: "AI ਸਿਫਾਰਸ਼ ਪੂਰੀ ਹੋਈ",
      resultsKicker: "ਤੁਹਾਡੇ ਖੇਤ ਦਾ ਮਿਲਾਪ",
      recommendedCrops: "ਸਿਫਾਰਸ਼ ਕੀਤੀਆਂ ਫਸਲਾਂ",
      resultsSubheading:
        "ਤੁਹਾਡੇ ਖੇਤ ਦੀਆਂ ਸਥਿਤੀਆਂ ਅਨੁਸਾਰ ਫਸਲਾਂ।",

      editInputs: "ਜਾਣਕਾਰੀ ਬਦਲੋ",
      bestMatch: "ਸਭ ਤੋਂ ਵਧੀਆ ਚੋਣ",
      suitability: "ਉਚਿਤਤਾ",
      score: "ਸਕੋਰ",

      bestMatchMeta: "ਤੁਹਾਡੇ ਖੇਤ ਲਈ ਸਭ ਤੋਂ ਵਧੀਆ ਚੋਣ",
      suitabilityMeta: "ਉਪਲਬਧ ਸਥਿਤੀਆਂ ਦੇ ਆਧਾਰ 'ਤੇ",
      scoreMeta: "ਸਿਫਾਰਸ਼ ਦਾ ਭਰੋਸਾ",

      topRecommendations: "ਮੁੱਖ ਫਸਲ ਸਿਫਾਰਸ਼ਾਂ",
      topRecommendationsSub:
        "ਤੁਹਾਡੇ ਖੇਤ ਦੀਆਂ ਸਥਿਤੀਆਂ ਅਨੁਸਾਰ ਫਸਲਾਂ",

      cropOverview: "ਫਸਲ ਦੀ ਜਾਣਕਾਰੀ",
      cropName: "ਫਸਲ ਦਾ ਨਾਮ",
      waterRequirement: "ਪਾਣੀ ਦੀ ਲੋੜ",
      rainfallRequirement: "ਵਰਖਾ ਦੀ ਲੋੜ",

      cropDuration: "ਫਸਲ ਦੀ ਮਿਆਦ",
      days: "ਦਿਨ",

      sowingInformation: "ਬਿਜਾਈ ਦੀ ਜਾਣਕਾਰੀ",
      window: "ਸਮਾਂ",
      seed: "ਬੀਜ",
      spacing: "ਦੂਰੀ",

      managementGuidance: "ਪ੍ਰਬੰਧਨ ਮਾਰਗਦਰਸ਼ਨ",
      soil: "ਮਿੱਟੀ",
      irrigation: "ਸਿੰਚਾਈ",
      nutrition: "ਪੋਸ਼ਣ",
      weedManagement: "ਨਦੀਨ ਪ੍ਰਬੰਧਨ",
      pestManagement: "ਕੀਟ ਪ੍ਰਬੰਧਨ",
      diseaseManagement: "ਰੋਗ ਪ੍ਰਬੰਧਨ",

      disclaimer:
        "ਇਹ ਮੁੱਢਲੀ ਫਸਲ ਉਚਿਤਤਾ ਸਿਫਾਰਸ਼ ਹੈ। ਅੰਤਿਮ ਫੈਸਲੇ ਵਿੱਚ ਸਥਾਨਕ ਖੇਤੀ ਸਲਾਹ, ਮਿੱਟੀ ਜਾਂਚ, ਬੀਜ ਉਪਲਬਧਤਾ, ਸਿੰਚਾਈ ਅਤੇ ਮੌਸਮ ਨੂੰ ਵੀ ਧਿਆਨ ਵਿੱਚ ਰੱਖੋ।",

      footerText: "ਹੋਰ ਸਮਾਰਟ ਅਤੇ ਸਿਹਤਮੰਦ ਭਵਿੱਖ ਵੱਲ।",
      privacy: "ਪਰਾਈਵੇਸੀ",
      terms: "ਸ਼ਰਤਾਂ",

      missing:
        "ਕਿਰਪਾ ਕਰਕੇ ਅੱਗੇ ਵਧਣ ਤੋਂ ਪਹਿਲਾਂ ਸਾਰੇ ਲੋੜੀਂਦੇ ਖੇਤਰ ਭਰੋ।",

      loading:
        "ਖੇਤ ਦੀਆਂ ਸਥਿਤੀਆਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਹੋ ਰਿਹਾ ਹੈ...",

      error:
        "ਹੁਣ ਸਿਫਾਰਸ਼ ਨਹੀਂ ਬਣ ਸਕੀ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।"
    },

    gu: {
      pageTitle: "પાક ભલામણ | કિસાન વિઝન",
      navHome: "હોમ",
      navHow: "આ કેવી રીતે કામ કરે છે",
      navDisease: "રોગ ઓળખો",
      navGuide: "ખેતી માર્ગદર્શિકા",
      navBlog: "બ્લોગ",
      navContact: "સંપર્ક",
      login: "લૉગિન",

      eyebrow: "સ્માર્ટ પાક ભલામણ",
      heading: "શ્રેષ્ઠ પાકની ભલામણ",
      intro:
        "યોગ્ય પાકની ભલામણ મેળવવા માટે તમારા ખેતરની માહિતી ભરો.",

      fieldDetails: "ખેતરની માહિતી",
      formTitle: "તમારા ખેતર વિશે જણાવો",
      requiredNote: "* જરૂરી માહિતી",

      stateLabel: "રાજ્ય *",
      districtLabel: "જિલ્લો *",
      seasonLabel: "મોસમ *",
      soilLabel: "માટીનો પ્રકાર *",
      waterLabel: "પાણીની ઉપલબ્ધતા *",
      temperatureLabel: "તાપમાન (°C) *",
      rainfallLabel: "વરસાદ *",

      selectState: "રાજ્ય પસંદ કરો",
      selectDistrict: "જિલ્લો પસંદ કરો",
      selectSeason: "મોસમ પસંદ કરો",
      selectSoil: "માટીનો પ્રકાર પસંદ કરો",
      selectWater: "ઉપલબ્ધતા પસંદ કરો",
      selectRainfall: "વરસાદનું સ્તર પસંદ કરો",

      recommendButton: "પાકની ભલામણ કરો",

      complete: "AI ભલામણ પૂર્ણ",
      resultsKicker: "તમારા ખેતરનું મેચિંગ",
      recommendedCrops: "ભલામણ કરેલા પાક",
      resultsSubheading:
        "તમારા ખેતરની પરિસ્થિતિ અનુસાર પાક.",

      editInputs: "માહિતી બદલો",
      bestMatch: "શ્રેષ્ઠ પસંદગી",
      suitability: "યોગ્યતા",
      score: "સ્કોર",

      bestMatchMeta: "તમારા ખેતર માટે શ્રેષ્ઠ પસંદગી",
      suitabilityMeta: "ઉપલબ્ધ પરિસ્થિતિના આધારે",
      scoreMeta: "ભલામણનો વિશ્વાસ",

      topRecommendations: "મુખ્ય પાક ભલામણો",
      topRecommendationsSub:
        "તમારા ખેતરની પરિસ્થિતિ અનુસાર પાક",

      cropOverview: "પાકની માહિતી",
      cropName: "પાકનું નામ",
      waterRequirement: "પાણીની જરૂરિયાત",
      rainfallRequirement: "વરસાદની જરૂરિયાત",

      cropDuration: "પાકનો સમયગાળો",
      days: "દિવસ",

      sowingInformation: "વાવણીની માહિતી",
      window: "સમય",
      seed: "બીજ",
      spacing: "અંતર",

      managementGuidance: "વ્યવસ્થાપન માર્ગદર્શન",
      soil: "માટી",
      irrigation: "સિંચાઈ",
      nutrition: "પોષણ",
      weedManagement: "નીંદણ વ્યવસ્થાપન",
      pestManagement: "જીવાત વ્યવસ્થાપન",
      diseaseManagement: "રોગ વ્યવસ્થાપન",

      disclaimer:
        "આ પ્રાથમિક પાક યોગ્યતા ભલામણ છે. અંતિમ નિર્ણયમાં સ્થાનિક કૃષિ સલાહ, માટી પરીક્ષણ, બીજ ઉપલબ્ધતા, સિંચાઈ અને હવામાનને પણ ધ્યાનમાં લો.",

      footerText: "વધુ સ્માર્ટ અને સ્વસ્થ ભવિષ્ય તરફ.",
      privacy: "ગોપનીયતા",
      terms: "શરતો",

      missing:
        "કૃપા કરીને આગળ વધતા પહેલા બધી જરૂરી માહિતી ભરો.",

      loading:
        "ખેતરની સ્થિતિનું વિશ્લેષણ થઈ રહ્યું છે...",

      error:
        "હમણાં ભલામણ બનાવી શકાઈ નથી. કૃપા કરીને ફરી પ્રયાસ કરો."
    }
  };


  /* =========================================================
     LANGUAGE SYSTEM
     ========================================================= */

  const lang = window.KisanLanguage || {
    get: function () {
      return "en";
    },

    set: function () {}
  };

  let current = lang.get();

  if (!translations[current]) {
    current = "en";
  }


  /* =========================================================
     ALL INDIA STATES + UNION TERRITORIES
     28 STATES + 8 UTs
     ========================================================= */

  const indiaStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",

    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry"
  ];


  /* =========================================================
     SEASONS
     ========================================================= */

  const seasons = [
    "Kharif",
    "Rabi",
    "Zaid",
    "Winter",
    "Summer",
    "Monsoon"
  ];


  /* =========================================================
     RAINFALL
     ========================================================= */

  const rainfallLevels = [
    "Low",
    "Medium",
    "High"
  ];


  /* =========================================================
     SOIL
     ========================================================= */

  const soilTypes = [
    "Alluvial",
    "Black soil",
    "Red soil",
    "Loamy",
    "Sandy"
  ];


  /* =========================================================
     WATER
     ========================================================= */

  const waterOptions = [
    "Rainfed",
    "Limited irrigation",
    "Good irrigation"
  ];


  /* =========================================================
     DOM ELEMENTS
     ========================================================= */

  const form =
    document.getElementById("recommendationForm");

  const results =
    document.getElementById("resultsSection");

  const validation =
    document.getElementById("validationMessage");

  const stateMessage =
    document.getElementById("stateMessage");

  const button =
    document.getElementById("recommendButton");


  /* =========================================================
     TRANSLATION
     ========================================================= */

  function getText(key) {
    return (
      (translations[current] &&
        translations[current][key]) ||
      translations.en[key] ||
      key
    );
  }


  function applyLanguage() {
    const dictionary = Object.assign(
      {},
      translations.en,
      translations[current] || {}
    );

    document.documentElement.lang = current;

    document
      .querySelectorAll("[data-i18n]")
      .forEach(function (element) {
        const key = element.dataset.i18n;

        if (dictionary[key]) {
          element.textContent = dictionary[key];
        }
      });

    const languageSelect =
      document.getElementById("languageSelect");

    if (languageSelect) {
      languageSelect.value = current;
    }

    updatePlaceholderText();
  }


  /* =========================================================
     GENERIC SELECT OPTION LOADER
     ========================================================= */

  function addOptions(
    select,
    items,
    placeholderText
  ) {
    if (!select) return;

    select.innerHTML = "";

    const first =
      document.createElement("option");

    first.value = "";
    first.textContent = placeholderText;

    select.appendChild(first);

    items.forEach(function (item) {
      const option =
        document.createElement("option");

      option.value = item;
      option.textContent = item;

      select.appendChild(option);
    });
  }


  /* =========================================================
     STATE DROPDOWN
     ========================================================= */

  const stateSelect =
    document.getElementById("state");

  const districtSelect =
    document.getElementById("district");

  const seasonSelect =
    document.getElementById("season");

  const soilSelect =
    document.getElementById("soilType");

  const waterSelect =
    document.getElementById("waterAvailability");

  let rainfallSelect =
    document.getElementById("rainfall");


  function loadStates() {
    if (!stateSelect) return;

    addOptions(
      stateSelect,
      indiaStates,
      getText("selectState")
    );
  }


  /* =========================================================
     DISTRICT DATA
     
     Source:
     KTBsomen dataset generated from official
     Government of India IGOD district directory.

     The dataset structure is:
     [
       {
         state: "...",
         districts: ["...", "..."]
       }
     ]
     ========================================================= */

  const districtDataUrl =
    "https://raw.githubusercontent.com/KTBsomen/Indian-state-district-json/main/india-states-districts-latest.json";


  let districtData = {};


  /* =========================================================
     STATE NAME NORMALIZATION
     ========================================================= */

  const stateAliases = {
    "Delhi":
      [
        "Delhi",
        "National Capital Territory of Delhi",
        "NCT of Delhi"
      ],

    "Andaman and Nicobar Islands":
      [
        "Andaman and Nicobar Islands",
        "Andaman and Nicobar"
      ],

    "Dadra and Nagar Haveli and Daman and Diu":
      [
        "Dadra and Nagar Haveli and Daman and Diu",
        "Dadra and Nagar Haveli",
        "Daman and Diu"
      ],

    "Jammu and Kashmir":
      [
        "Jammu and Kashmir",
        "Jammu & Kashmir"
      ]
  };


  function normalizeStateName(state) {
    if (!state) return "";

    return String(state)
      .trim()
      .replace(/\s+/g, " ")
      .toLowerCase();
  }


  function normalizeDistrictName(district) {
    if (!district) return "";

    return String(district)
      .trim()
      .replace(/\s+/g, " ");
  }


  /* =========================================================
     NORMALIZE DISTRICT DATA
     ========================================================= */

  function normalizeDistrictData(data) {
    const normalized = {};

    if (!data) {
      return normalized;
    }


    /* -------------------------------------------------------
       FORMAT 1

       [
         {
           state: "Punjab",
           districts: [...]
         }
       ]
       ------------------------------------------------------- */

    if (Array.isArray(data)) {
      data.forEach(function (item) {
        if (!item) return;

        const state =
          item.state ||
          item.State ||
          item.state_name ||
          item.StateName ||
          item.name;

        const districts =
          item.districts ||
          item.Districts ||
          item.district ||
          item.District;

        if (!state || !Array.isArray(districts)) {
          return;
        }

        const cleanState =
          String(state).trim();

        if (!normalized[cleanState]) {
          normalized[cleanState] = [];
        }

        districts.forEach(function (district) {
          let name = "";

          if (typeof district === "string") {
            name = district;
          } else if (district) {
            name =
              district.district ||
              district.District ||
              district.name ||
              district.Name ||
              district.district_name ||
              district.DistrictName ||
              "";
          }

          name = normalizeDistrictName(name);

          if (
            name &&
            !normalized[cleanState].includes(name)
          ) {
            normalized[cleanState].push(name);
          }
        });
      });
    }


    /* -------------------------------------------------------
       FORMAT 2

       {
         districts: [
           {
             state: "...",
             district: "..."
           }
         ]
       }
       ------------------------------------------------------- */

    else if (
      typeof data === "object" &&
      Array.isArray(data.districts)
    ) {
      data.districts.forEach(function (item) {
        if (!item) return;

        const state =
          item.state ||
          item.State ||
          item.state_name ||
          item.StateName;

        const district =
          item.district ||
          item.District ||
          item.district_name ||
          item.DistrictName ||
          item.name;

        if (!state || !district) {
          return;
        }

        const cleanState =
          String(state).trim();

        const cleanDistrict =
          normalizeDistrictName(district);

        if (!normalized[cleanState]) {
          normalized[cleanState] = [];
        }

        if (
          cleanDistrict &&
          !normalized[cleanState].includes(
            cleanDistrict
          )
        ) {
          normalized[cleanState].push(
            cleanDistrict
          );
        }
      });
    }


    /* -------------------------------------------------------
       FORMAT 3

       {
         "Punjab": ["Amritsar", "Barnala"]
       }
       ------------------------------------------------------- */

    else if (
      typeof data === "object"
    ) {
      Object.keys(data).forEach(
        function (state) {
          const value = data[state];

          if (!Array.isArray(value)) {
            return;
          }

          normalized[state] = value
            .map(function (item) {
              if (typeof item === "string") {
                return normalizeDistrictName(item);
              }

              if (!item) {
                return "";
              }

              return normalizeDistrictName(
                item.district ||
                item.District ||
                item.name ||
                item.Name ||
                ""
              );
            })
            .filter(Boolean);
        }
      );
    }


    /* -------------------------------------------------------
       REMOVE DUPLICATES + SORT
       ------------------------------------------------------- */

    Object.keys(normalized).forEach(
      function (state) {
        normalized[state] =
          Array.from(
            new Set(normalized[state])
          ).sort(function (a, b) {
            return a.localeCompare(
              b,
              undefined,
              {
                sensitivity: "base"
              }
            );
          });
      }
    );


    return normalized;
  }


  /* =========================================================
     FIND DISTRICTS FOR SELECTED STATE
     ========================================================= */

  function findDistrictsForState(
    selectedState
  ) {
    if (!selectedState) {
      return [];
    }

    const selected =
      normalizeStateName(
        selectedState
      );


    /* Exact match */
    const exactKey =
      Object.keys(districtData)
        .find(function (key) {
          return (
            normalizeStateName(key) ===
            selected
          );
        });

    if (exactKey) {
      return districtData[exactKey] || [];
    }


    /* Alias match */
    const aliases =
      stateAliases[selectedState] || [];

    for (
      let i = 0;
      i < aliases.length;
      i++
    ) {
      const alias =
        normalizeStateName(
          aliases[i]
        );

      const aliasKey =
        Object.keys(districtData)
          .find(function (key) {
            return (
              normalizeStateName(key) ===
              alias
            );
          });

      if (aliasKey) {
        return (
          districtData[aliasKey] || []
        );
      }
    }


    return [];
  }


  /* =========================================================
     UPDATE DISTRICT DROPDOWN
     ========================================================= */

  function updateDistrictOptions() {
    if (
      !stateSelect ||
      !districtSelect
    ) {
      return;
    }

    const selectedState =
      stateSelect.value;


    /* No state selected */
    if (!selectedState) {
      districtSelect.disabled = true;

      addOptions(
        districtSelect,
        [],
        getText("selectDistrict")
      );

      return;
    }


    const districts =
      findDistrictsForState(
        selectedState
      );


    /* State selected but districts unavailable */
    if (!districts.length) {
      districtSelect.disabled = true;

      addOptions(
        districtSelect,
        [],
        "District data unavailable"
      );

      console.warn(
        "No district data found for:",
        selectedState
      );

      return;
    }


    /* Districts available */
    districtSelect.disabled = false;

    addOptions(
      districtSelect,
      districts,
      getText("selectDistrict")
    );
  }


  /* =========================================================
     LOAD DISTRICT DATA
     ========================================================= */

  async function loadDistrictData() {
    if (!districtSelect) {
      return;
    }

    try {
      districtSelect.disabled = true;

      addOptions(
        districtSelect,
        [],
        "Loading districts..."
      );


      const response =
        await fetch(
          districtDataUrl,
          {
            method: "GET",
            cache: "no-store"
          }
        );


      if (!response.ok) {
        throw new Error(
          "District dataset request failed: " +
          response.status
        );
      }


      const data =
        await response.json();


      districtData =
        normalizeDistrictData(data);


      console.log(
        "Kisan Vision district data loaded.",
        districtData
      );


      updateDistrictOptions();


    } catch (error) {
      console.error(
        "District data could not be loaded:",
        error
      );


      districtSelect.disabled = true;


      addOptions(
        districtSelect,
        [],
        "Districts could not be loaded"
      );
    }
  }


  /* =========================================================
     SEASON
     ========================================================= */

  function loadSeasons() {
    if (!seasonSelect) return;

    addOptions(
      seasonSelect,
      seasons,
      getText("selectSeason")
    );
  }


  /* =========================================================
     SOIL
     ========================================================= */

  function loadSoilTypes() {
    if (!soilSelect) return;

    addOptions(
      soilSelect,
      soilTypes,
      getText("selectSoil")
    );
  }


  /* =========================================================
     WATER
     ========================================================= */

  function loadWaterOptions() {
    if (!waterSelect) return;

    addOptions(
      waterSelect,
      waterOptions,
      getText("selectWater")
    );
  }


  /* =========================================================
     RAINFALL
     
     Original HTML had numeric input.
     Convert it into the same native select style.
     ========================================================= */

  function loadRainfallOptions() {
    const existing =
      document.getElementById("rainfall");

    if (!existing) {
      return;
    }


    /* Already a select */
    if (
      existing.tagName.toLowerCase() ===
      "select"
    ) {
      rainfallSelect = existing;

      addOptions(
        rainfallSelect,
        rainfallLevels,
        getText("selectRainfall")
      );

      return;
    }


    const field =
      existing.closest(".field");

    if (!field) {
      return;
    }


    const newSelect =
      document.createElement("select");


    newSelect.id = "rainfall";
    newSelect.name = "rainfall";
    newSelect.required = true;

    newSelect.dataset.testid =
      "rainfall-field";


    addOptions(
      newSelect,
      rainfallLevels,
      getText("selectRainfall")
    );


    const wrapper =
      existing.closest(
        ".input-suffix"
      );


    if (wrapper) {
      wrapper.replaceWith(
        newSelect
      );
    } else {
      existing.replaceWith(
        newSelect
      );
    }


    rainfallSelect =
      newSelect;
  }


  /* =========================================================
     PLACEHOLDER / LANGUAGE TEXT
     ========================================================= */

  function updatePlaceholderText() {
    const state =
      document.getElementById("state");

    const district =
      document.getElementById("district");

    const season =
      document.getElementById("season");

    const soil =
      document.getElementById("soilType");

    const water =
      document.getElementById(
        "waterAvailability"
      );

    const rainfall =
      document.getElementById(
        "rainfall"
      );


    if (state && state.options[0]) {
      state.options[0].textContent =
        getText("selectState");
    }


    if (
      district &&
      district.options[0]
    ) {
      district.options[0].textContent =
        getText("selectDistrict");
    }


    if (
      season &&
      season.options[0]
    ) {
      season.options[0].textContent =
        getText("selectSeason");
    }


    if (
      soil &&
      soil.options[0]
    ) {
      soil.options[0].textContent =
        getText("selectSoil");
    }


    if (
      water &&
      water.options[0]
    ) {
      water.options[0].textContent =
        getText("selectWater");
    }


    if (
      rainfall &&
      rainfall.options[0]
    ) {
      rainfall.options[0].textContent =
        getText("selectRainfall");
    }
  }


  /* =========================================================
     LOADING STATE
     ========================================================= */

  function showLoading() {
    if (results) {
      results.hidden = true;
    }

    if (stateMessage) {
      stateMessage.hidden = false;

      stateMessage.textContent =
        getText("loading");

      stateMessage.className =
        "page-container state-message loading-state";
    }

    if (button) {
      button.disabled = true;
      button.classList.add(
        "is-loading"
      );
    }
  }


  /* =========================================================
     ERROR
     ========================================================= */

  function showError(message) {
    if (!stateMessage) {
      return;
    }

    stateMessage.hidden = false;

    stateMessage.textContent =
      message || getText("error");

    stateMessage.className =
      "page-container state-message";


    if (button) {
      button.disabled = false;

      button.classList.remove(
        "is-loading"
      );
    }
  }


  /* =========================================================
     RESET RESULTS
     ========================================================= */

  function resetResults() {
    if (results) {
      results.hidden = true;
    }

    if (stateMessage) {
      stateMessage.hidden = true;
      stateMessage.textContent = "";
    }
  }


  /* =========================================================
     SHOW RESULTS
     ========================================================= */

  function showResults(data) {
    resetResults();

    if (results) {
      results.hidden = false;
    }


    let safe =
      data || {};
      const recommendations =
  Array.isArray(safe.recommendations)
    ? safe.recommendations
    : [];

const best =
  safe.best_match ||
  recommendations[0] ||
  {};

const normalizedData = {
  bestMatch:
    best.crop ||
    best.name ||
    best.crop_name ||
    "—",

  suitability:
    best.suitability ||
    "—",

  score:
    best.score !== undefined &&
    best.score !== null
      ? `${Number(best.score).toFixed(2)}%`
      : "—",

  cropOverview: {
    name:
      best.crop ||
      best.name ||
      best.crop_name ||
      "—",

    waterRequirement:
      best.water_need ||
      "—",

    rainfallRequirement:
      best.rainfall_need ||
      "—"
  },

  cropDuration:
    best.crop_duration_days ||
    "—",

  sowingInformation:
    best.sowing ||
    {},

  managementGuidance:
    best.management ||
    {},

  topRecommendations:
    recommendations.map(function (item) {
      return {
        name:
          item.crop ||
          item.name ||
          item.crop_name ||
          "—",

        suitability:
          item.suitability ||
          "—",

        score:
          item.score !== undefined &&
          item.score !== null
            ? `${Number(item.score).toFixed(2)}%`
            : "—"
      };
    })
};

    safe = normalizedData;

    
    const bestMatch =
      document.getElementById(
        "bestMatch"
      );

    const suitability =
      document.getElementById(
        "suitability"
      );

    const score =
      document.getElementById(
        "score"
      );


    if (bestMatch) {
      bestMatch.textContent =
        safe.bestMatch || "—";
    }


    if (suitability) {
      suitability.textContent =
        safe.suitability || "—";
    }


    if (score) {
      score.textContent =
        safe.score || "—";
    }


    const overviewCrop =
      document.getElementById(
        "overviewCrop"
      );

    const overviewWater =
      document.getElementById(
        "overviewWater"
      );

    const overviewRainfall =
      document.getElementById(
        "overviewRainfall"
      );


    if (overviewCrop) {
      overviewCrop.textContent =
        safe.cropOverview &&
        safe.cropOverview.name ||
        "—";
    }


    if (overviewWater) {
      overviewWater.textContent =
        safe.cropOverview &&
        safe.cropOverview.waterRequirement ||
        "—";
    }


    if (overviewRainfall) {
      overviewRainfall.textContent =
        safe.cropOverview &&
        safe.cropOverview.rainfallRequirement ||
        "—";
    }


    const duration =
      document.getElementById(
        "duration"
      );

    if (duration) {
      duration.textContent =
        safe.cropDuration || "—";
    }


    const sowing =
      safe.sowingInformation || {};


    const sowingWindow =
      document.getElementById(
        "sowingWindow"
      );

    const sowingSeed =
      document.getElementById(
        "sowingSeed"
      );

    const sowingSpacing =
      document.getElementById(
        "sowingSpacing"
      );


    if (sowingWindow) {
      sowingWindow.textContent =
        sowing.window || "—";
    }


    if (sowingSeed) {
      sowingSeed.textContent =
        sowing.seed || "—";
    }


    if (sowingSpacing) {
      sowingSpacing.textContent =
        sowing.spacing || "—";
    }


    const guidance =
      safe.managementGuidance || {};


    [
      "soil",
      "irrigation",
      "nutrition",
      "weed",
      "pest",
      "disease"
    ].forEach(function (key) {
      const id =
        "guidance" +
        key.charAt(0).toUpperCase() +
        key.slice(1);

      const element =
        document.getElementById(id);

      if (element) {
        element.textContent =
          guidance[key] || "—";
      }
    });


    const rows =
      document.getElementById(
        "recommendationRows"
      );


    if (rows) {
      rows.textContent = "";


      (
        safe.topRecommendations ||
        []
      ).forEach(function (
        item,
        index
      ) {
        const row =
          document.createElement(
            "div"
          );


        row.className =
          "recommendation-row";


        row.dataset.testid =
          "recommendation-row-" +
          (index + 1);


        row.innerHTML =
          '<span class="rank">0' +
          (index + 1) +
          "</span>" +
          '<div><strong class="crop-name"></strong>' +
          '<span class="crop-fit"></span></div>' +
          '<strong class="row-score"></strong>';


        row.querySelector(
          ".crop-name"
        ).textContent =
          item.name || "—";


        row.querySelector(
          ".crop-fit"
        ).textContent =
          item.suitability || "—";


        row.querySelector(
          ".row-score"
        ).textContent =
          item.score || "—";


        rows.appendChild(row);
      });
    }


    if (button) {
      button.disabled = false;

      button.classList.remove(
        "is-loading"
      );
    }


    if (results) {
      results.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }


    /* =========================================================
     BACKEND CROP RECOMMENDATION
     ========================================================= */

  const RECOMMEND_API_URL =
    "/recommend-crops";

  async function fetchCropRecommendations(
    formData
  ) {
    const token =
      localStorage.getItem("kisanVisionToken");

    if (!token) {
      throw new Error("AUTH_REQUIRED");
    }

    const requestData = {
      state:
        formData.state || "",

      district:
        formData.district || "",

      season:
        formData.season || "",

      soil_type:
        formData.soilType || "",

      water_availability:
        formData.waterAvailability || "",

      temperature:
        formData.temperature === ""
          ? null
          : Number(formData.temperature),

      rainfall:
        formData.rainfall || ""
    };

    console.log(
      "Crop recommendation request:",
      requestData
    );

    const response =
      await fetch(
        RECOMMEND_API_URL,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            "Authorization":
              "Bearer " + token
          },

          body:
            JSON.stringify(
              requestData
            )
        }
      );

    let data = {};

    try {
      data = await response.json();
    } catch (error) {
      console.error(
        "Invalid JSON response:",
        error
      );
    }

    console.log(
      "Crop recommendation response:",
      response.status,
      data
    );

    if (response.status === 401) {
      throw new Error("AUTH_EXPIRED");
    }

    if (!response.ok) {
      throw new Error(
        data.detail ||
        data.message ||
        "Crop recommendation request failed."
      );
    }

    return (
      data.data ||
      data.result ||
      data.recommendation ||
      data
    );
  }

  /* =========================================================
     FORM DATA
     ========================================================= */

  function collectFormData() {
    if (!form) {
      return {};
    }

    return Object.fromEntries(
      new FormData(form).entries()
    );
  }


  /* =========================================================
     FORM SUBMIT
     ========================================================= */

  if (form) {
    form.addEventListener(
      "submit",
      async function (event) {
        event.preventDefault();


        if (validation) {
          validation.hidden = true;
        }


        resetResults();


        if (!form.checkValidity()) {
          if (validation) {
            validation.textContent =
              getText("missing");

            validation.hidden = false;
          }


          const invalid =
            form.querySelector(
              ":invalid"
            );


          if (invalid) {
            invalid.focus();
          }


          return;
        }


        const formData =
          collectFormData();


        console.log(
          "Crop recommendation form data:",
          formData
        );


        showLoading();


        try {
          const response =
            await fetchCropRecommendations(
              formData
            );


          if (response) {
            showResults(response);
          } else {
            setTimeout(
              function () {
                showError(
                  getText("error")
                );
              },
              500
            );
          }

} catch (error) {
  console.error(
    "Crop recommendation error:",
    error
  );

  if (
    error &&
    (
      error.message === "AUTH_REQUIRED" ||
      error.message === "AUTH_EXPIRED"
    )
  ) {
    showError(
      "Please log in again to get crop recommendations."
    );
  } else {
    showError(
      error &&
      error.message
        ? error.message
        : getText("error")
    );
  }
}
        
      }
    );
  }


  /* =========================================================
     EDIT INPUTS
     ========================================================= */

  const editInputsButton =
    document.getElementById(
      "editInputsButton"
    );


  if (editInputsButton && form) {
    editInputsButton.addEventListener(
      "click",
      function () {
        form.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }
    );
  }


  /* =========================================================
     LANGUAGE SELECT
     ========================================================= */

  const languageSelect =
    document.getElementById(
      "languageSelect"
    );


  if (languageSelect) {
    languageSelect.addEventListener(
      "change",
      function (event) {
        current =
          event.target.value;


        if (!translations[current]) {
          current = "en";
        }


        lang.set(current);

        applyLanguage();
      }
    );
  }


  /* =========================================================
     MOBILE MENU
     ========================================================= */

  const menuToggle =
    document.querySelector(
      ".menu-toggle"
    );


  if (menuToggle) {
    menuToggle.addEventListener(
      "click",
      function (event) {
        const nav =
          document.querySelector(
            ".main-nav"
          );


        if (!nav) {
          return;
        }


        const open =
          nav.classList.toggle(
            "open"
          );


        event.currentTarget.setAttribute(
          "aria-expanded",
          String(open)
        );
      }
    );
  }


  /* =========================================================
     INITIALIZE ALL FORM DROPDOWNS
     ========================================================= */

  loadStates();

  loadSeasons();

  loadSoilTypes();

  loadWaterOptions();

  loadRainfallOptions();


  /* =========================================================
     STATE → DISTRICT
     ========================================================= */

  if (stateSelect) {
    stateSelect.addEventListener(
      "change",
      function () {
        updateDistrictOptions();
      }
    );
  }


  /* =========================================================
     INITIAL DISTRICT STATE
     ========================================================= */

  if (districtSelect) {
    districtSelect.disabled = true;

    addOptions(
      districtSelect,
      [],
      getText("selectDistrict")
    );
  }


  /* =========================================================
     LANGUAGE
     ========================================================= */

  applyLanguage();


  /* =========================================================
     LOAD CURRENT DISTRICT DATA
     ========================================================= */

  loadDistrictData();


})();