const stage = document.getElementById("stage");

const btn = document.getElementById("switchBtn");

const reflection = document.getElementById("reflectionEl");

const labelDay = document.getElementById("labelDay");

const labelNight = document.getElementById("labelNight");

let isNight = false;

/* =================================
       RANDOM STARS
    ================================= */

function randomDots(container, count) {
  let html = "";

  for (let i = 0; i < count; i++) {
    const x = Math.random() * 100;

    const y = Math.random() * 100;

    const delay = (Math.random() * 3).toFixed(2);

    const size = (Math.random() * 1.5 + 1).toFixed(2);

    const duration = (Math.random() * 2 + 2).toFixed(2);

    html += `
          <span
            style="
              left:${x}%;
              top:${y}%;
              animation-delay:${delay}s;
              --star-size:${size}px;
              --twinkle-duration:${duration}s;
            "
          ></span>
        `;
  }

  container.innerHTML = html;
}

/* PAGE STARS */
randomDots(document.getElementById("pageStars"), 49);

/* TOGGLE STARS */
randomDots(document.getElementById("trackStars"), 14);

/* REFLECTION STARS */
randomDots(document.getElementById("reflectionStars"), 14);

/* =================================
       DAY / NIGHT STATE
    ================================= */

function setState(night) {
  isNight = night;

  /* BODY */
  document.body.classList.toggle("night", night);

  /* STAGE */
  stage.classList.toggle("night", night);

  /* MAIN BUTTON */
  btn.classList.toggle("night", night);

  btn.classList.toggle("on", night);

  /* REFLECTION */
  reflection.classList.toggle("night", night);

  reflection.classList.toggle("on", night);

  /* ACCESSIBILITY */
  btn.setAttribute("aria-pressed", night ? "true" : "false");

  /* LABEL */
  labelDay.classList.toggle("visible", !night);

  labelNight.classList.toggle("visible", night);
}

/* =================================
       CLICK
    ================================= */

btn.addEventListener("click", () => {
  setState(!isNight);
});

/* =================================
       KEYBOARD
    ================================= */

btn.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();

    setState(!isNight);
  }
});
