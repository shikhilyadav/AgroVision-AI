// Select the local API during development and the hosted API after deployment.
const API_BASE_URL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://127.0.0.1:8000"
    : "https://agrovision-ai-3-5d1l.onrender.com";
