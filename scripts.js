document.addEventListener("DOMContentLoaded", () => {
const logo = document.getElementById("logo");
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll(".nav-link");
const projectCards = document.querySelectorAll(".project-card");

// Smooth scroll helper
function smoothScrollTo(selector) {
const target = document.querySelector(selector);
if (!target) return;
const headerOffset = 72;
const elementPosition = target.getBoundingClientRect().top + window.scrollY;
const offsetPosition = elementPosition - headerOffset;


window.scrollTo({
  top: offsetPosition,
  behavior: "smooth"
});
}

// Logo scroll to top
if (logo) {
logo.addEventListener("click", () => {
window.scrollTo({ top: 0, behavior: "smooth" });
});
}

// Hamburger toggle
if (hamburger && nav) {
hamburger.addEventListener("click", () => {
nav.classList.toggle("open");
hamburger.classList.toggle("open");
});
}

// Close nav on link click and smooth scroll
navLinks.forEach(link => {
link.addEventListener("click", (e) => {
e.preventDefault();
const href = link.getAttribute("href");
if (href && href.startsWith("#")) {
smoothScrollTo(href);
}
if (nav.classList.contains("open")) {
nav.classList.remove("open");
hamburger.classList.remove("open");
}
});
});

// Project card click handler
projectCards.forEach(card => {
card.addEventListener("click", () => {
const url = card.getAttribute("data-url");
if (url) {
window.open(url, "_blank", "noopener");
}
});
});

// Scroll reveal
const revealElements = document.querySelectorAll(
".project-card, .Experience-item, .footer-section, .hero-content, .hero-visual"
);

const observer = new IntersectionObserver(
entries => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add("visible");
observer.unobserve(entry.target);
}
});
},
{ threshold: 0.12 }
);

revealElements.forEach(el => {
el.classList.add("reveal");
observer.observe(el);
});
});