import { updateCartCount } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});

import Alert from "./alert.js";

document.addEventListener("DOMContentLoaded", () => {
  const alert = new Alert("json/alerts.json"); // Path to the JSON file
  alert.renderAlerts();
});
