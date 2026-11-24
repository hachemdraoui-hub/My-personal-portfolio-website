
/* =====================================
   HACHEM DRAOUI - PORTFOLIO
   Interactive JavaScript
===================================== */


/* DARK AND LIGHT THEME */

const themeToggle = document.getElementById("theme-toggle");

function updateTheme(isLight) {
    document.body.classList.toggle("light-theme", isLight);

    if (themeToggle) {
        themeToggle.textContent = isLight ? "🌙" : "☀️";

        themeToggle.setAttribute(
            "aria-label",
            isLight ? "Byt till mörkt tema" : "Byt till ljust tema"
        );

        themeToggle.setAttribute(
            "aria-pressed",
            String(isLight)
        );
    }
}

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const isLight =
            !document.body.classList.contains("light-theme");

        updateTheme(isLight);
    });
}


/* MOBILE NAVIGATION */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

function closeMenu() {
    if (!menuToggle || !navLinks) return;

    navLinks.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Öppna meny");
}

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Stäng meny" : "Öppna meny"
        );
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeMenu();
            menuToggle.focus();
        }
    });

    document.addEventListener("click", event => {
        const clickedInsideMenu =
            navLinks.contains(event.target) ||
            menuToggle.contains(event.target);

        if (!clickedInsideMenu) {
            closeMenu();
        }
    });

}


/* PROJECT FILTER */

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const filterStatus = document.getElementById("filter-status");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filter = button.dataset.filter;
        let visibleCount = 0;

        // Update active button

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
            btn.setAttribute("aria-pressed", "false");
        });

        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");

        // Show or hide projects

        projectCards.forEach(card => {

            const category = card.dataset.category;

            const shouldShow =
                filter === "all" || category === filter;

            card.hidden = !shouldShow;

            if (shouldShow) {
                visibleCount++;
            }

        });

        // Announce result to screen readers

        if (filterStatus) {
            filterStatus.textContent =
                `${visibleCount} projekt visas.`;
        }

    });

});


/* AUTOMATIC FOOTER YEAR */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* SCROLL REVEAL ANIMATIONS */

const revealElements = document.querySelectorAll(
    ".section-heading, .about-text, .about-highlight, " +
    ".skill-card, .project-card, .contact-card, .github-callout"
);

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !reducedMotion) {

    const observer = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
        observer.observe(element);
    });

} else {

    // Show everything when animations are unsupported
    // or the visitor prefers reduced motion.

    revealElements.forEach(element => {
        element.classList.add("visible");
    });

}


/* CONSOLE MESSAGE */

console.log(
    "Hachem Draoui portfolio loaded successfully!"
);
