export default class Alert {
  constructor(jsonUrl) {
    this.jsonUrl = jsonUrl; // URL to the alerts.json file
  }

  async fetchAlerts() {
    try {
      const response = await fetch(this.jsonUrl);
      if (!response.ok) throw new Error("Failed to fetch alerts");
      const alerts = await response.json();
      return alerts;
    } catch (error) {
      Error("Error fetching alerts:", error);
      return [];
    }
  }

  async renderAlerts() {
    const alerts = await this.fetchAlerts();

    if (alerts.length === 0) return; // No alerts to display

    // Create the <section> element
    const alertSection = document.createElement("section");
    alertSection.classList.add("alert-list");

    // Loop through alerts and create <p> for each
    alerts.forEach((alert) => {
      const alertParagraph = document.createElement("p");
      alertParagraph.textContent = alert.message;
      alertParagraph.style.backgroundColor = alert.background;
      alertParagraph.style.color = alert.color;
      alertSection.appendChild(alertParagraph);
    });

    // Prepend the <section> to the <main> element
    const mainElement = document.querySelector("main");
    if (mainElement) {
      mainElement.prepend(alertSection);
    }
  }
}
