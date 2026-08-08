(() => {
  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const slides = [...carousel.querySelectorAll("[data-carousel-slide]")];
    const previous = carousel.querySelector("[data-carousel-previous]");
    const next = carousel.querySelector("[data-carousel-next]");
    const counter = carousel.querySelector("[data-carousel-counter]");
    if (slides.length < 2 || !previous || !next || !counter) return;

    let activeIndex = 0;
    let timer;

    const show = (index) => {
      activeIndex = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === activeIndex;
        slide.hidden = !isActive;
        slide.setAttribute("aria-hidden", String(!isActive));
      });
      counter.textContent = `${activeIndex + 1} / ${slides.length}`;
    };

    const stop = () => window.clearInterval(timer);
    const start = () => {
      stop();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      timer = window.setInterval(() => show(activeIndex + 1), 7000);
    };

    carousel.classList.add("is-enhanced");
    previous.addEventListener("click", () => { show(activeIndex - 1); start(); });
    next.addEventListener("click", () => { show(activeIndex + 1); start(); });
    carousel.addEventListener("mouseenter", stop);
    carousel.addEventListener("mouseleave", start);
    carousel.addEventListener("focusin", stop);
    carousel.addEventListener("focusout", start);

    show(0);
    start();
  });
})();
