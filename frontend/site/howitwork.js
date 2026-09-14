/* =========================================================
   Kisan Vision — How It Works
   Vanilla JavaScript. No frameworks.

   Handles:
   - Mobile nav toggle
   - Chatbot placeholder click
   - Progressive video loading:
       If the referenced video file exists, the card upgrades from
       "Video Coming Soon" placeholder into a real <video> player.
       If it doesn't exist yet, the placeholder remains.

   HOW TO ADD YOUR VIDEOS LATER:
   Just drop the files at:
     videos/detect-disease.mp4
     videos/upload-analyze.mp4
     videos/farming-guide.mp4
     videos/ai-results.mp4
   No code changes needed. The page will detect them automatically.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  bindMobileNav();
  bindChatbotPlaceholder();
  hydrateVideos();
});

/* ---------- Mobile Nav ---------- */
function bindMobileNav() {
  const toggle = document.getElementById("kvMenuToggle");
  const nav = document.getElementById("kvNav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

/* ---------- Chatbot placeholder ----------
   Wire your real chatbot here later. Currently a no-op.
------------------------------------------- */
function bindChatbotPlaceholder() {
  const btn = document.getElementById("kvChatbotBtn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    // Placeholder — connect chatbot later.
    btn.animate(
      [
        { transform: "translateY(-3px) scale(1.04)" },
        { transform: "translateY(0) scale(1)" }
      ],
      { duration: 220, easing: "ease-out" }
    );
  });
}

/* ---------- Tutorial Videos ---------- */
function hydrateVideos() {
  const cards = document.querySelectorAll(".kv-video-card[data-video]");
  cards.forEach((card) => {
    const src = card.getAttribute("data-video");
    if (!src) return;
    checkFileExists(src).then((exists) => {
      if (exists) {
        replaceWithVideo(card, src);
      }
      // If not present, keep the "Video Coming Soon" placeholder as-is.
    });
  });
}

function checkFileExists(url) {
  // HEAD request. Falls back to false (placeholder stays).
  return fetch(url, { method: "HEAD", cache: "no-store" })
    .then((res) => res.ok)
    .catch(() => false);
}

function replaceWithVideo(card, src) {
  const frame = card.querySelector(".kv-video-frame");
  if (!frame) return;

  const video = document.createElement("video");
  video.setAttribute("controls", "");
  video.setAttribute("preload", "metadata");
  video.setAttribute("playsinline", "");
  video.className = "kv-video-el";

  const source = document.createElement("source");
  source.src = src;
  source.type = "video/mp4";
  video.appendChild(source);

  // Graceful failure — if the video actually fails to play, restore placeholder.
  video.addEventListener("error", () => {
    frame.innerHTML = "";
    frame.appendChild(buildPlaceholder());
  });

  // Swap placeholder → video
  frame.innerHTML = "";
  frame.appendChild(video);
}

function buildPlaceholder() {
  const wrap = document.createElement("div");
  wrap.className = "kv-video-placeholder";
  wrap.innerHTML = `
    <div class="kv-video-play" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
    </div>
    <span class="kv-video-soon">Video Coming Soon</span>
  `;
  return wrap;
}