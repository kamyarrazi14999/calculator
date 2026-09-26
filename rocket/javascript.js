// item selector
const rocket = document.getElementById("rocket");
const scene = document.querySelector(".scene");
let launched = false;
function createSmoke() {
  if (launched) return;
  const smoke = document.createElement("span");
  smoke.className = "smoke";
  const rocketBounds = rocket.getBoundingClientRect();
  const sceneBounds = scene.getBoundingClientRect();
  smoke.style.left =
    rocketBounds.left - sceneBounds.left + rocketBounds.width / 2 - 6 + "px";
  smoke.style.top = rocketBounds.bottom - sceneBounds.top + 24 + "px";
  smoke.style.setProperty("--x", Math.random() * 80 - 40 + "px");
  scene.appendChild(smoke);
  setTimeout(() => {
    smoke.remove();
  }, 1200);
}
setInterval(createSmoke, 120);

rocket.addEventListener("click", () => {
  if (launched) return;
  launched = true;
  scene.classList.add("launch");
});

rocket.addEventListener("animationend", (event) => {
  if (event.target !== rocket || event.animationName !== "vertical-flight")
    return;
  launched = false;
  scene.classList.remove("launch");
});
