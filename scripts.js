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

  // Close nav on link click and smooth scroll for in-page anchors only
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");

      // Same-page anchors like "#projects"
      if (href && href.startsWith("#")) {
        e.preventDefault();
        smoothScrollTo(href);

        if (nav.classList.contains("open")) {
          nav.classList.remove("open");
          hamburger.classList.remove("open");
        }
      }
      // For links like "projects.html" or "index.html#hero"
      // do not preventDefault; let the browser navigate normally.
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

// Logo: go to home on subpages, scroll to top on home
if (logo) {
  logo.addEventListener("click", () => {
    const isOnProjectsPage = window.location.pathname.endsWith("projects.html");

    if (isOnProjectsPage) {
      // Navigate back to the main page hero
      window.location.href = "index.html#hero";
    } else {
      // On the main page: smooth scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
}
