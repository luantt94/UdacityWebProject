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
    link.setAttribute("class", "nav-item");

    menuItem.appendChild(link);
    container.appendChild(menuItem);
  });
}

// Add class 'active' to section when near top of viewport
function makeActive() {
  // Get all the navigation items
  const navItems = document.querySelectorAll(".nav-item");

  // Get all the section
  const sections = document.querySelectorAll("section");
  const threshold = 150;

  sections.forEach((section, index) => {
    const box = section.getBoundingClientRect();

    if (box.top <= threshold && box.bottom >= threshold) {
      section.classList.add("active");
      navItems[index].classList.add("active");
    } else {
      section.classList.remove("active");
      navItems[index].classList.remove("active");
    }
  });
}

// Scroll to anchor ID using scrollTO event
document.addEventListener("scroll", function () {
  makeActive();
});

// Get all the collapsible headings
const collapsibleHeadings = document.querySelectorAll(".collapsible");

// Add click event listener to each heading
collapsibleHeadings.forEach((heading) => {
  heading.addEventListener("click", function () {
    // Toggle the display of the content
    const content = this.nextElementSibling;
    content.style.display = content.style.display === "none" ? "block" : "none";
  });
});

//Add a scroll to top button on the page that’s only visible when the user scrolls below the fold of the page.
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", function () {
  if (window.pageYOffset > window.innerHeight) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
});

scrollToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
