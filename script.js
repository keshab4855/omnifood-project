// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

// make mobile nav work
const btnNavEl = document.querySelector(".btn-mobile-nav");

const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

// smooth scrolling animation
const allLinks = document.querySelectorAll("a:link");

// all links are multiple elements so we need to use (for each) for them individually
allLinks.forEach(function (link) {
  // e is events
  link.addEventListener("click", function (e) {
    //   inorder to prevent default of anchor moving to the clicked page
    e.preventDefault();
    // read href atribute out of the link that was clicked
    const href = link.getAttribute("href");

    // scroll back to top
    // if href is equal to # then the window should scroll to
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      //   we dont use scrollto because we dont know which pixel value we scroll to

      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // close mobile navigation
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});

// STICKY NAVIGATION
const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }
    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // in the viewport
    root: null,
    // it means it will have an event as soon as 0%of sectionhero part is in viewport
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);
