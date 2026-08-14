document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Scroll-spy: highlight active nav link ---------- */
  const sections = document.querySelectorAll("main section[id]");
  const navItems = document.querySelectorAll(".nav-link[data-nav]");

  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navItems.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
  );
  sections.forEach((section) => spyObserver.observe(section));

  /* ---------- Reveal-on-scroll ---------- */
  const revealTargets = document.querySelectorAll(".reveal");
  if (prefersReducedMotion) {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealTargets.forEach((el) => revealObserver.observe(el));
  }

  /* ---------- Terminal typing effect ---------- */
  const typedEl = document.getElementById("typedLine");
  const commands = [
    "whoami",
    "cat skills.json",
    "git commit -m \"ship it\"",
    "./food4fork --deploy",
  ];

  if (typedEl) {
    if (prefersReducedMotion) {
      typedEl.textContent = commands[0];
    } else {
      let cmdIndex = 0;
      let charIndex = 0;
      let deleting = false;

      const tick = () => {
        const current = commands[cmdIndex];

        if (!deleting) {
          charIndex++;
          typedEl.textContent = current.slice(0, charIndex);
          if (charIndex === current.length) {
            deleting = false;
            setTimeout(() => {
              deleting = true;
              tick();
            }, 1400);
            return;
          }
        } else {
          charIndex--;
          typedEl.textContent = current.slice(0, charIndex);
          if (charIndex === 0) {
            deleting = false;
            cmdIndex = (cmdIndex + 1) % commands.length;
          }
        }
        setTimeout(tick, deleting ? 35 : 70);
      };
      tick();
    }
  }

  /* ---------- Contact form (frontend-only) ---------- */
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if (form && status) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        status.textContent = "Please fill in all fields with a valid email.";
        status.style.color = "#e5645f";
        return;
      }

      // No backend/email service is connected yet.
      // See README.md for how to wire this up to Formspree, EmailJS, or a custom API route.
      status.textContent = "Thanks! This form isn't connected to an email service yet — see README for setup.";
      status.style.color = "var(--accent-teal)";
      form.reset();
    });
  }
});
