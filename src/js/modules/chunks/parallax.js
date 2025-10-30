function parallax() {
  document.addEventListener("mousemove", function (e) {
    this.querySelectorAll(".parallax-mouse").forEach(item => {
      const animationDuration = 4000;

      const parallaxSpeed = item.getAttribute("data-parallax-speed");
      item.style.transform = `
        translateX(${e.clientX * parallaxSpeed / animationDuration}px) 
        translateY(${e.clientY * parallaxSpeed / animationDuration}px)
        `;

      const transformRotate = item.getAttribute("data-parallax-rotate")

      if (transformRotate) {
        item.style.transform = `
        rotate(${transformRotate}deg)
        translateX(${e.clientX * parallaxSpeed / animationDuration}px) 
        translateY(${e.clientY * parallaxSpeed / animationDuration}px)
        `;
      }
    });
  });
}
parallax()