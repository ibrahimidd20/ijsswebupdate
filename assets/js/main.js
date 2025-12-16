const serviceBoxes = document.querySelectorAll(".service-box");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

serviceBoxes.forEach(box => observer.observe(box));
