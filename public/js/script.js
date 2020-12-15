// to slide/close the burger menu
const slide = document.querySelector(".slide");
const close = document.querySelector(".close");
const burger = document.getElementById("burger");
console.log(burger);

function openSlideMenu() {
  document.getElementById("menu").style.width = "100px";
  document.getElementById("content").style.marginLeft = "100px";
}

function closeSlideMenu() {
  document.getElementById("menu").style.width = "0";
  document.getElementById("content").style.marginLeft = "0";
}

slide.addEventListener("click", openSlideMenu);
close.addEventListener("click", closeSlideMenu);

burger.addEventListener("click", () => {
  if (burger.style.display === "none") {
    burger.style.display = "block";
  } else {
    burger.style.display = "none";
  }
});
