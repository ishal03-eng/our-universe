// ======================== Typewriter Effect ========================
const name = "Welcome to Our Little Universe 💫";
let i = 0;
const speed = 75;
const typewriter = document.getElementById("typewriter");

function typeEffect() {
  if (i < name.length) {
    typewriter.textContent += name.charAt(i);
    i++;
    setTimeout(typeEffect, speed);
  }
}
window.onload = typeEffect;

// ======================== Scroll Behavior ========================
document.getElementById("enter-btn").addEventListener("click", () => {
  document.getElementById("quotes-section").scrollIntoView({ behavior: "smooth" });
});

// ======================== Gift Box Modal ========================
document.getElementById("gift-box").addEventListener("click", () => {
  Swal.fire({
    title: "💌 For You, My Love",
    html: `
      <p style="font-size: 1.1rem; text-align: left;">
        From the moment we met, everything changed. 🌸<br/><br/>
        You brought joy, love, and magic into my life. This is just a little note to say...<br/><br/>
        <strong>I love you more with each passing day.</strong> ❤️<br/><br/>
        Our little universe means the world to me.
      </p>
    `,
    imageWidth: 200,
    confirmButtonText: "Aww, I Love You Too 💖",
    confirmButtonColor: "#ff4f81"
  });
});

// ======================== Floating Love Messages ========================
const messages = [
  "You're my sunshine ☀️",
  "I love your smile 😊",
  "Forever yours 💞",
  "You complete me 💖",
  "My heart beats for you ❤️",
  "You're my home 🏡",
  "Our story is my favorite 📖",
  "With you, everything's better 🌈",
  "❤️", "😘", "🥰"
];

function spawnFloatingMessage() {
  const msg = document.createElement("div");
  msg.classList.add("floating-message");
  msg.textContent = messages[Math.floor(Math.random() * messages.length)];

  const x = Math.random() * 90 + 5; // % from left
  const fontSize = Math.random() * 0.5 + 1;

  msg.style.left = `${x}%`;
  msg.style.fontSize = `${fontSize}rem`;

  document.getElementById("floating-messages-container").appendChild(msg);
  setTimeout(() => msg.remove(), 6000);
}
setInterval(spawnFloatingMessage, 2000);

// ======================== Spotify Reveal ========================
document.getElementById("play-song-btn").addEventListener("click", function () {
  document.getElementById("spotify-embed").style.display = "block";
  this.style.display = "none";
});

// ======================== Canvas-Based Features ========================
document.addEventListener("DOMContentLoaded", function () {
  // --- Starry Background ---
  const starCanvas = document.getElementById("star-canvas");
  if (starCanvas) {
    const ctx = starCanvas.getContext("2d");
    let stars = [], shootingStars = [];

    function resizeCanvas() {
      starCanvas.width = window.innerWidth;
      starCanvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    function createStars(count) {
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * starCanvas.width,
          y: Math.random() * starCanvas.height,
          radius: Math.random() * 1.5 + 0.5,
          speed: Math.random() * 0.3 + 0.05,
          opacity: Math.random(),
          twinkle: Math.random() * 0.05 + 0.01
        });
      }
    }

    function createShootingStar() {
      shootingStars.push({
        x: Math.random() * starCanvas.width,
        y: 0,
        length: Math.random() * 100 + 80,
        speed: Math.random() * 10 + 6,
        size: Math.random() * 1.4 + 0.8,
        opacity: 1
      });
    }

    function drawStars() {
      for (let star of stars) {
        star.opacity += (Math.random() - 0.5) * star.twinkle;
        star.opacity = Math.max(0.3, Math.min(1, star.opacity));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${star.opacity})`;
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = 8;
        ctx.fill();
        star.y += star.speed;
        if (star.y > starCanvas.height) {
          star.y = 0;
          star.x = Math.random() * starCanvas.width;
        }
      }
    }

    function drawShootingStars() {
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.length, s.y + s.length);
        ctx.strokeStyle = `rgba(255,255,255,${s.opacity})`;
        ctx.lineWidth = s.size;
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = 12;
        ctx.stroke();
        s.x += s.speed;
        s.y += s.speed;
        s.opacity -= 0.01;
        if (s.opacity <= 0) shootingStars.splice(i, 1);
      }
    }

    function animateStars() {
      ctx.clearRect(0, 0, starCanvas.width, starCanvas.height);
      drawStars();
      drawShootingStars();
      if (Math.random() < 0.008) createShootingStar();
      requestAnimationFrame(animateStars);
    }

    createStars(200);
    animateStars();
  }

  // --- Collect the Hearts Game ---
  const heartCanvas = document.getElementById("heartCanvas");
  if (heartCanvas) {
    const ctx = heartCanvas.getContext("2d");
    let player = { x: heartCanvas.width / 2, y: heartCanvas.height - 50, radius: 25 };
    let hearts = [], score = 0;

    function drawPlayer() {
      ctx.font = "30px Arial";
      ctx.textAlign = "center";
      ctx.fillText("👧", player.x, player.y);
    }

    function drawHeart(x, y) {
      ctx.font = "24px Arial";
      ctx.textAlign = "center";
      ctx.fillText("❤️", x, y);
    }

    function spawnHeart() {
      let x = Math.random() * (heartCanvas.width - 30) + 15;
      hearts.push({ x, y: -20 });
    }

    function updateHearts() {
      for (let i = 0; i < hearts.length; i++) {
        hearts[i].y += 2;
        let dx = player.x - hearts[i].x;
        let dy = player.y - hearts[i].y;
        if (Math.sqrt(dx * dx + dy * dy) < player.radius + 20) {
          score++;
          hearts.splice(i, 1);
          i--;
        } else if (hearts[i].y > heartCanvas.height) {
          hearts.splice(i, 1);
          i--;
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, heartCanvas.width, heartCanvas.height);
      drawPlayer();
      hearts.forEach(h => drawHeart(h.x, h.y));
      updateHearts();
      document.getElementById("heartScore").innerText = `Hearts Collected: ${score}`;
      requestAnimationFrame(draw);
    }

    setInterval(spawnHeart, 1000);
    draw();

    // Touch & Mouse Controls
    function movePlayer(e) {
      const rect = heartCanvas.getBoundingClientRect();
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      player.x = x - rect.left;
    }

    heartCanvas.addEventListener("mousemove", movePlayer);
    heartCanvas.addEventListener("touchmove", movePlayer);
  }

  // --- Love Map (Leaflet) ---
  const mapElement = document.getElementById("map");
  if (mapElement) {
    const map = L.map("map").setView([29.0, 76.5], 6);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    const kharar = [30.74, 76.64];
    const rohini = [28.75, 77.06];

    L.marker(kharar).addTo(map).bindPopup("📍 Kharar, Punjab").openPopup();
    L.marker(rohini).addTo(map).bindPopup("📍 Rohini, Delhi");

    L.polyline([kharar, rohini], {
      color: "#ff4f81",
      weight: 3,
      dashArray: "6"
    }).addTo(map);
  }
});

const moodQuotes = {
  happy: [
    "Happiness looks so good on you! 🌈",
    "You're someone's reason to smile today 😊",
    "Your joy lights up the universe 💫"
  ],
  sad: [
    "Even the stars have cloudy nights 🌧️",
    "It's okay to pause and just feel 💜",
    "You’re stronger than you know 🌱"
  ],
  love: [
    "You radiate love like the sun ☀️",
    "To love and be loved is to feel the sun from both sides ❤️",
    "Your heart is a galaxy full of stars 💖"
  ],
  sleepy: [
    "Rest is a form of self-love 😴",
    "Close your eyes. Breathe. Drift. Dream 🌙",
    "You’ve done enough today—let go and sleep 💤"
  ],
  angry: [
    "Breathe in peace, breathe out fire 🔥",
    "Let your storm pass—it always does 🌦️",
    "You're allowed to feel. Just don’t forget your calm 💆"
  ]
};

document.querySelectorAll(".mood-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const mood = btn.dataset.mood;
    const quotes = moodQuotes[mood];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    Swal.fire({
      title: `Mood: ${btn.textContent}`,
      text: randomQuote,
      confirmButtonText: "❤️",
      confirmButtonColor: "#ff4f81",
      backdrop: `rgba(255,192,203,0.2)`
    });
  });
});


function updateCountdown(id, targetDateStr) {
  const element = document.getElementById(id);
  const targetDate = new Date(targetDateStr).getTime();

  function update() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      element.textContent = "It's Today! 💖";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    element.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  update();
  setInterval(update, 1000);
}

// Start all countdowns
updateCountdown("anniversary-countdown", "2026-03-14T00:00:00");
updateCountdown("birthday1-countdown", "2025-08-03T00:00:00");
updateCountdown("birthday2-countdown", "2025-08-13T00:00:00");
updateCountdown("meetup-countdown", "2025-07-26T00:00:00");
