import "./index.scss";
import { gsap, TimelineMax } from "gsap";
import scrollMonitor from "scrollmonitor";

import Swiper, { Navigation } from "swiper";
import { Timeline } from "gsap/gsap-core";

Swiper.use([Navigation]);

const marquee = new Swiper(".swiper-container", {
  spaceBetween: 50,
  centeredSlides: true,
  loop: true,
  slidesPerView: window.innerWidth < 800 ? 1 : 3,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const form = document.querySelector(".contact-us__form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  form.reset();
});

// sidebar
const hamburger = document.querySelector(".hamburger");
const sideBar = document.querySelector(".side-bar");
const mobileNav = document.querySelector(".mobile-nav");
const getInTouch = document.querySelector(".get-in-touch");

const hamburgerLines = document.querySelectorAll(".hamburger__line");

const sideBarTl = new Timeline({ paused: true, reversed: true });

sideBarTl
  .to(".side-bar", 0.2, { x: 0 })
  .to(".mobile-nav", 0.2, { opacity: 1 }, "<")
  .to(".get-in-touch", 0.2, { opacity: 1 }, "<");

hamburger.addEventListener("click", () => {
  if (Array.from(sideBar.classList).indexOf("opened") === -1) {
    sideBar.classList.toggle("opened");
    hamburger.classList.toggle("is-opened-navi");
    sideBarTl.play();
  } else {
    sideBar.classList.toggle("opened");
    hamburger.classList.toggle("is-opened-navi");
    sideBarTl.reverse();
  }
});

const mobileNavItems = document.querySelectorAll(".nav-item");

mobileNavItems.forEach((item) => {
  item.addEventListener("click", () => {
    sideBar.classList.toggle("opened");
    hamburger.classList.toggle("is-opened-navi");
    sideBarTl.reverse();
  });
});

const iframe = document.querySelectorAll("iframe")[0];
const video1 = document.querySelectorAll(".videos__item")[0];
const video2 = document.querySelectorAll(".videos__item")[1];
const video3 = document.querySelectorAll(".videos__item")[2];
const url1 = "https://www.youtube.com/embed/W4SGLaF_JSQ";
const url2 = "https://www.youtube.com/embed/Ejq4QE9Dt9I";
const url3 = "https://www.youtube.com/embed/keUsyfBR4FQ";

video1.addEventListener("click", () => {
  document
    .querySelectorAll(".videos__item.active")[0]
    .classList.remove("active");
  video1.classList.add("active");
  iframe.src = url1;
});

video2.addEventListener("click", () => {
  document
    .querySelectorAll(".videos__item.active")[0]
    .classList.remove("active");
  video2.classList.add("active");
  iframe.src = url2;
});

video3.addEventListener("click", () => {
  document
    .querySelectorAll(".videos__item.active")[0]
    .classList.remove("active");
  video3.classList.add("active");
  iframe.src = url3;
});

// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker
//       .register("/sw.js")
//       .then((registration) => {
//         console.log("SW registered: ", registration);
//       })
//       .catch((registrationError) => {
//         console.log("SW registration failed: ", registrationError);
//       });
//   });
// }

const map = (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c;

const lerp = (a, b, n) => (1 - n) * a + n * b;

const calcWinsize = () => {
  return { width: window.innerWidth, height: window.innerHeight };
};

const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const getMousePos = (e) => {
  let posx = 0;
  let posy = 0;
  if (!e) e = window.event;
  if (e.pageX || e.pageY) {
    posx = e.pageX;
    posy = e.pageY;
  } else if (e.clientX || e.clientY) {
    posx = e.clientX + body.scrollLeft + document.documentElement.scrollLeft;
    posy = e.clientY + body.scrollTop + document.documentElement.scrollTop;
  }
  return { x: posx, y: posy };
};

let winsize = calcWinsize();
window.addEventListener("resize", () => (winsize = calcWinsize()));

let mousepos = { x: winsize.width / 2, y: winsize.height / 2 };
window.addEventListener("mousemove", (ev) => (mousepos = getMousePos(ev)));

let translationVals = {
  tx: 0,
  ty: 0,
};

const xStart = getRandomNumber(10, 12);
const yStart = getRandomNumber(10, 12);

let headerMain = document.querySelector(".header-main");

function move(element) {
  let translationVals = { tx: 0, ty: 0 };
  const xstart = getRandomNumber(10, 12);
  const ystart = getRandomNumber(10, 12);

  const render = () => {
    translationVals.tx = lerp(
      translationVals.tx,
      map(mousepos.x, 0, winsize.width, -xstart, xstart),
      0.07
    );
    translationVals.ty = lerp(
      translationVals.ty,
      map(mousepos.y, 0, winsize.height, -ystart, ystart),
      0.07
    );

    gsap.set(element, {
      x: translationVals.tx,
      y: translationVals.ty,
    });
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
}

move(headerMain);

// if( !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ) {
// move(headerMain);
// }

// Scroll Monitor
const servicesSvg = document.querySelector(".services__underline");
const elServices = document.querySelector(".services__title");
let servicesSvgWatcher = scrollMonitor.create(elServices);
servicesSvgWatcher.enterViewport(() => {
  servicesSvg.style.display = "block";
});

const ourWorkSvg = document.querySelector(".our-work__underline");
const elOurWork = document.querySelector(".our-work__title");
const ourWorkSvgWatcher = scrollMonitor.create(elOurWork);
ourWorkSvgWatcher.enterViewport(() => {
  ourWorkSvg.style.display = "block";
});

const ourClientsSvg = document.querySelector(".our-clients__underline");
const elOurClients = document.querySelector(".our-clients__title");
const ourClientsSvgWatcher = scrollMonitor.create(elOurClients);
ourClientsSvgWatcher.enterViewport(() => {
  ourClientsSvg.style.display = "block";
});

const ourCoursesSvg = document.querySelector(".our-courses__underline");
const elOurCourses = document.querySelector(".our-courses__title");
const ourCoursesSvgWatcher = scrollMonitor.create(elOurCourses);
ourCoursesSvgWatcher.enterViewport(() => {
  ourCoursesSvg.style.display = "block";
});

/////////////////////////////////////////////////////////
// services timeline

const servicesTl = new TimelineMax({ paused: true });

servicesTl.from(".services__item", 0.4, {
  y: "2rem",
  opacity: 0,
  stagger: 0.3,
  ease: "ease",
});

const servicesListWatcher = scrollMonitor.create(
  document.querySelector(".services__list"),
  -400
);

servicesListWatcher.enterViewport(() => {
  console.log("services revealed");
  servicesTl.play();
});
