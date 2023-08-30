/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
$(document).ready(function () {
  buildNavigationMenu();
});

function buildNavigationMenu() {
  const container = document.getElementById("navbar__list");
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const title = section.getAttribute("data-nav");
    const id = section.getAttribute("id");

    const menuItem = document.createElement("li");
    const link = document.createElement("a");

    link.textContent = title;
    link.setAttribute("href", `#${id}`);

    menuItem.appendChild(link);
    container.appendChild(menuItem);
  });
}

// Add class 'active' to section when near top of viewport
function makeActive() {
  const sections = document.querySelectorAll("section");
  const threshold = 150;

  sections.forEach((section) => {
    const box = section.getBoundingClientRect();

    if (box.top <= threshold && box.bottom >= threshold) {
      section.classList.add("active");
    } else {
      section.classList.remove("active");
    }
  });
}

// Scroll to anchor ID using scrollTO event
document.addEventListener("scroll", function () {
  makeActive();
});
