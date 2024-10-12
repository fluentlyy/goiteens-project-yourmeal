let img = document.querySelector(".content__img");

window.addEventListener("mousemove", function (event) {
  let rect = img.getBoundingClientRect();
  let imgWidth = rect.width;
  let imhHeigth = rect.height;
  let x = event.offsetX - (rect.left + imgWidth / 2);
  let y = event.offsetY - (rect.top + imhHeigth / 2);

  img.style.transform = `translate(${x / 50}px, ${y / -40}px)`;
});
document.addEventListener("scroll", function () {
  let elements = document.querySelectorAll(".scroll");

  let screenHeight = window.innerHeight;

  elements.forEach((element) => {
    let elementPos = element.getBoundingClientRect().top;
    if (elementPos < screenHeight) {
      element.classList.add("visible");
    }
  });
});
