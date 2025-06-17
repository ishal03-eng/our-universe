const timelineContainer = document.getElementById("timeline-container");

async function loadEvents() {
  try {
    const res = await fetch("data/events.json");
    const events = await res.json();

    events.forEach((event, index) => {
      const block = document.createElement("div");
      block.className = `timeline-block ${index % 2 === 0 ? "left" : "right"}`;

      const content = document.createElement("div");
      content.className = "timeline-content";
      content.innerHTML = `<strong>${event.date}</strong><br><span style="color: #ff69b4;">${event.title}</span>`;


      content.addEventListener("click", () => {
        Swal.fire({
          title: `<span style="color: #ff69b4;">${event.title}</span>`,
          html: `
            <p><strong>Date:</strong> ${event.date}</p>
            <p style="color: #ff7aa2; font-weight: 500;">${event.desc}</p>
          `,
          icon: "info",
          confirmButtonColor: "#ff4f81"
        });
      });

      block.appendChild(content);
      timelineContainer.appendChild(block);
    });
  } catch (err) {
    timelineContainer.innerHTML = "Failed to load timeline.";
    console.error("Timeline load error:", err);
  }
}

window.addEventListener("DOMContentLoaded", loadEvents);
