// Register Locomotive + ScrollTrigger
function initLocomotiveScroll() {
  gsap.registerPlugin(ScrollTrigger);

  const scrollContainer = document.querySelector("#main");
  const locoScroll = new LocomotiveScroll({
    el: scrollContainer,
    smooth: true,
    tablet: { smooth: true },
    smartphone: { smooth: true }
  });

  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(scrollContainer, {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight
      };
    }
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
}

function initLoadingAnimation() {
  const tl = gsap.timeline();

  tl.from("#page1", { opacity: 0, duration: 0.2, delay: 0.2 })
    .from("#page1", {
      transform: "scaleX(0.7) scaleY(0.2) translateY(80%)",
      borderRadius: "150px",
      duration: 2,
      ease: "expo.out"
    })
    .from("nav", { opacity: 0, delay: -0.2 })
    .from("#page1 h1, #page1 p, #page1 div", {
      opacity: 0,
      duration: 0.5,
      stagger: 0.2
    });
}

function initNavAnimation() {
  const nav = document.querySelector("nav");

  nav.addEventListener("mouseenter", () => {
    gsap.timeline()
      .to("#nav-bottom", { height: "21vh", duration: 0.5 })
      .to(".nav-part2 h5", { display: "block", duration: 0.1 })
      .to(".nav-part2 h5 span", {
        y: 0,
        stagger: { amount: 0.5 }
      });
  });

  nav.addEventListener("mouseleave", () => {
    gsap.timeline()
      .to(".nav-part2 h5 span", {
        y: 25,
        stagger: { amount: 0.2 }
      })
      .to(".nav-part2 h5", { display: "none", duration: 0.1 })
      .to("#nav-bottom", { height: 0, duration: 0.2 });
  });
}

function initPage2HoverEffect() {
  const elems = document.querySelectorAll(".right-elem");

  elems.forEach(elem => {
    const tooltip = elem.querySelector(".tooltip"); // Prefer using class instead of childNodes[3]

    elem.addEventListener("mouseenter", () =>
      gsap.to(tooltip, { opacity: 1, scale: 1 })
    );

    elem.addEventListener("mouseleave", () =>
      gsap.to(tooltip, { opacity: 0, scale: 0 })
    );

    elem.addEventListener("mousemove", (e) => {
      const bounds = elem.getBoundingClientRect();
      gsap.to(tooltip, {
        x: e.clientX - bounds.left - 50,
        y: e.clientY - bounds.top - 120
      });
    });
  });
}

function initPage3VideoToggle() {
  const video = document.querySelector("#page3 video");
  const trigger = document.querySelector(".page3-center");

  if (!video || !trigger) return;

  trigger.addEventListener("click", () => {
    video.play();
    gsap.to(video, {
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
      borderRadius: 0
    });
  });

  video.addEventListener("click", () => {
    video.pause();
    gsap.to(video, {
      scaleX: 0.7,
      scaleY: 0,
      opacity: 0,
      borderRadius: "30px"
    });
  });
}

function initSectionVideoHover() {
  const sections = document.querySelectorAll(".sec-right");

  sections.forEach(section => {
    const video = section.querySelector("video");
    const image = section.querySelector("img");

    if (!video || !image) return;

    section.addEventListener("mouseenter", () => {
      image.style.opacity = 0;
      video.style.opacity = 1;
      video.play();
    });

    section.addEventListener("mouseleave", () => {
      video.style.opacity = 0;
      video.load(); // resets
      image.style.opacity = 1;
    });
  });
}

function initPage6ScrollText() {
  gsap.from("#btm6-part2 h4", {
    x: 0,
    duration: 1,
    scrollTrigger: {
      trigger: "#btm6-part2",
      scroller: "#main",
      start: "top 80%",
      end: "top 10%",
      scrub: true
    }
  });
}

// 🌟 Launch All Animations
window.addEventListener("DOMContentLoaded", () => {
  initLocomotiveScroll();
  initLoadingAnimation();
  initNavAnimation();
  initPage2HoverEffect();
  initPage3VideoToggle();
  initSectionVideoHover();
  initPage6ScrollText();
});
