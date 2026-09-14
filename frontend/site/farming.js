(() => {
  "use strict";

  const guideContent = {
    crop: {
      wheat: { title: "Wheat guide", description: "A simple rhythm for a strong rabi wheat crop.", tips: ["Prepare a fine, well-drained seedbed before sowing.", "Give the first irrigation at crown-root initiation, then adjust to soil moisture.", "Scout for rust and aphids early instead of waiting for visible spread."] },
      rice: { title: "Rice guide", description: "Keep your paddy balanced from transplanting to grain fill.", tips: ["Use healthy seedlings and keep spacing open enough for airflow.", "Maintain shallow water where possible and drain before top dressing.", "Inspect low-lying patches regularly for leaf damage and disease signs."] },
      tomato: { title: "Tomato guide", description: "Support productive vines with steady care and early observation.", tips: ["Choose a sunny, well-drained bed and add mature compost.", "Water at the base in the morning to keep leaves dry.", "Check the underside of leaves twice a week for early pest activity."] },
      potato: { title: "Potato guide", description: "Healthy tubers start with loose soil and careful hilling.", tips: ["Plant certified, disease-free seed tubers at even spacing.", "Hill soil around plants as stems grow to protect developing tubers.", "Avoid waterlogging and harvest when skins have set firmly."] },
      maize: { title: "Maize guide", description: "Help every maize plant make the most of sunlight and nutrition.", tips: ["Sow into warm, moist soil with consistent row spacing.", "Keep young plants weed-free during the first few weeks.", "Apply nitrogen in split doses instead of all at once."] },
      cotton: { title: "Cotton guide", description: "Build a resilient cotton crop through patient scouting.", tips: ["Use a well-drained field and maintain a clean seedbed.", "Scout square formation and flowering stages for sucking pests.", "Keep nutrition balanced and avoid excess nitrogen late in the season."] }
    },
    practice: {
      soil: { title: "Soil health", description: "Your soil is the foundation of every harvest.", tips: ["Test soil before choosing fertilizer quantities.", "Return crop residue or compost to build organic matter.", "Rotate crops where possible to support soil life and structure."] },
      water: { title: "Irrigation", description: "Efficient watering protects both crops and your resources.", tips: ["Check soil moisture before irrigating instead of watering by habit.", "Water the root zone slowly so it can soak in.", "Irrigate early in the day to reduce evaporation and leaf wetness."] },
      fertilizer: { title: "Fertilizer management", description: "Feed the crop according to its stage, not guesswork.", tips: ["Use a soil test and crop stage to guide nutrient choices.", "Split applications reduce loss and keep nutrients available.", "Keep fertilizer away from direct contact with seed or stems."] },
      pests: { title: "Pest management", description: "Regular scouting gives you more choices and fewer surprises.", tips: ["Walk the field in a simple zig-zag pattern once or twice a week.", "Look under leaves and along new growth for the first signs.", "Prefer the least harmful effective control and follow its label."] }
    },
    season: {
      kharif: { title: "Kharif season tips", description: "Plan around monsoon rains and protect the field from standing water.", tips: ["Sow with dependable rainfall rather than the first shower.", "Keep drainage channels clear before heavy rain arrives.", "Watch for fungal disease after humid, cloudy days."] },
      rabi: { title: "Rabi season tips", description: "Cooler months reward precise sowing and steady irrigation.", tips: ["Prepare the field early so seeds go in at the right window.", "Irrigate at critical growth stages, especially after a dry spell.", "Protect young plants from weeds before the canopy closes."] },
      zaid: { title: "Zaid season tips", description: "Short-season crops need focused water and heat management.", tips: ["Use mulch to hold moisture around the root zone.", "Prefer morning irrigation and shade tender seedlings during heat waves.", "Harvest produce regularly to keep plants productive."] },
      "year-round": { title: "Year-round crop care", description: "Good records turn each season into a better starting point.", tips: ["Record sowing dates, rainfall, irrigation and visible problems.", "Clean tools and remove badly affected plant material promptly.", "Review what worked after harvest and carry one improvement forward."] }
    }
  };

  const menuToggle = document.querySelector(".menu-toggle");
  const navPanel = document.querySelector(".nav-panel");
  const languageChoice = document.querySelector("#language-choice");
  const dialog = document.querySelector("#details-dialog");
  const dialogTitle = document.querySelector("#dialog-title");
  const dialogKicker = document.querySelector("#dialog-kicker");
  const dialogDescription = document.querySelector("#dialog-description");
  const dialogTips = document.querySelector("#dialog-tips");
  const dialogClose = document.querySelector(".dialog-close");
  const dialogDone = document.querySelector(".dialog-done");

  const closeMenu = () => {
    if (!menuToggle || !navPanel) return;
    menuToggle.setAttribute("aria-expanded", "false");
    navPanel.classList.remove("is-open");
  };

  menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    navPanel?.classList.toggle("is-open", !isOpen);
  });

  document.querySelectorAll(".primary-nav a").forEach((link) => link.addEventListener("click", closeMenu));

  languageChoice?.addEventListener("change", () => {
    languageChoice.setAttribute("aria-label", `Language selected: ${languageChoice.value}`);
  });

  const closeDialog = () => {
    if (!dialog) return;
    if (typeof dialog.close === "function") dialog.close();
    dialog.removeAttribute("open");
  };

  const openGuide = (type, key) => {
    const content = guideContent[type]?.[key];
    if (!content || !dialog || !dialogTitle || !dialogKicker || !dialogDescription || !dialogTips) return;
    const tr = (value) => window.kvTranslateText ? window.kvTranslateText(value) : value;
    const kicker = type === "crop" ? "Crop guide" : type === "season" ? "Seasonal guide" : "Essential practice";
    dialogKicker.textContent = tr(kicker);
    dialogTitle.textContent = tr(content.title);
    dialogDescription.textContent = tr(content.description);
    dialogTips.innerHTML = content.tips.map((tip) => `<li>${tr(tip)}</li>`).join("");
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "true");
  };

  document.querySelectorAll(".js-open-guide").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      openGuide(button.dataset.type, button.dataset.key);
    });
  });

  document.querySelectorAll(".crop-card").forEach((card) => {
    card.addEventListener("keydown", (event) => {
      if ((event.key === "Enter" || event.key === " ") && event.target === card) {
        event.preventDefault();
        openGuide("crop", card.dataset.crop);
      }
    });
  });

  dialogClose?.addEventListener("click", closeDialog);
  dialogDone?.addEventListener("click", closeDialog);
  dialog?.addEventListener("click", (event) => {
    if (event.target === dialog) closeDialog();
  });

  const checklistItems = [...document.querySelectorAll("[data-checklist-item]")];
  const progressCount = document.querySelector("#progress-count");
  const progressBar = document.querySelector("#progress-bar");
  const updateProgress = () => {
    const complete = checklistItems.filter((item) => item.checked).length;
    if (progressCount) {
      const completeLabel = window.kvTranslateText ? window.kvTranslateText("complete") : "complete";
      progressCount.textContent = `${complete} / ${checklistItems.length} ${completeLabel}`;
    }
    if (progressBar) progressBar.style.width = `${(complete / checklistItems.length) * 100}%`;
  };
  checklistItems.forEach((item) => item.addEventListener("change", updateProgress));
  document.addEventListener("kv:languagechange", updateProgress);
  document.querySelector("#reset-checklist")?.addEventListener("click", () => {
    checklistItems.forEach((item) => { item.checked = false; });
    updateProgress();
  });

  const observer = "IntersectionObserver" in window ? new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 }) : null;
  document.querySelectorAll(".crop-card, .practice-card, .season-card, .checklist-panel").forEach((element) => {
    element.classList.add("reveal-ready");
    observer?.observe(element);
  });
})();