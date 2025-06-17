let quotes = [];
let currentQuoteIndex = 0;
const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const quoteBox = document.getElementById("quote-box");

function fadeOutIn(callback) {
  quoteBox.style.opacity = 0;
  setTimeout(() => {
    callback();
    quoteBox.style.opacity = 1;
  }, 1000);
}

function showNextQuote() {
  fadeOutIn(() => {
    const quote = quotes[currentQuoteIndex];
    quoteText.textContent = `"${quote.text}"`;
    quoteAuthor.textContent = `— ${quote.author}`;
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
  });
}

async function loadQuotes() {
  try {
    const res = await fetch("data/quotes.json");
    quotes = await res.json();
    showNextQuote();
    setInterval(showNextQuote, 5000);
  } catch (err) {
    quoteText.textContent = "Failed to load quotes.";
    console.error("Quote loading error:", err);
  }
}

window.addEventListener("DOMContentLoaded", loadQuotes);
