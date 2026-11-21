const correctCode = "184316";
const otp = document.getElementById("otp");
const msg = document.getElementById("msg");
const card = document.getElementById("card");
const title = document.getElementById("ttl");
const icon = document.getElementById("ico");
const resend = document.getElementById("cd");

otp.innerHTML = Array.from({ length: 6 }, (_, index) => {
  return `
    <input
      type="text"
      inputmode="numeric"
      maxlength="1"
      placeholder=""
      autocomplete="${index === 0 ? "one-time-code" : "off"}"
      aria-label="Digit ${index + 1}"
    >
  `;
}).join("");

const boxes = [...otp.querySelectorAll("input")];
let countdownTimer;

resend.setAttribute("role", "button");
resend.setAttribute("tabindex", "0");
resend.setAttribute("aria-disabled", "true");

const setMessage = (text = "", className = "") => {
  msg.textContent = text;
  msg.className = `msg ${className}`.trim();
};

const getEnteredCode = () => boxes.map((box) => box.value).join("");

const focusAt = (index) => {
  if (boxes[index]) {
    boxes[index].focus();
  }
};

const startCountdown = (duration = 27) => {
  clearInterval(countdownTimer);
  let remaining = duration;

  const updateCountdown = () => {
    if (remaining <= 0) {
      resend.textContent = "Resend code";
      resend.setAttribute("aria-disabled", "false");
      clearInterval(countdownTimer);
      return;
    }

    resend.textContent = `Resend in 0:${String(remaining).padStart(2, "0")}`;
    resend.setAttribute("aria-disabled", "true");
    remaining -= 1;
  };

  updateCountdown();
  countdownTimer = setInterval(updateCountdown, 1000);
};

const resendCode = () => {
  if (resend.getAttribute("aria-disabled") === "true") return;

  boxes.forEach((box) => {
    box.value = "";
    box.disabled = false;
    box.classList.remove("good");
  });
  otp.classList.remove("err");
  card.classList.remove("ok");
  title.textContent = "Verify your email";
  setMessage("Demo mode: use code 184316.");
  startCountdown();
  focusAt(0);
};

const setSuccessIcon = () => {
  icon.innerHTML = `
    <svg
      width="38"
      height="38"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      stroke-width="3.2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  `;
};

const validateCode = () => {
  const enteredCode = getEnteredCode();

  if (enteredCode.length !== 6) return;

  if (enteredCode === correctCode) {
    clearInterval(countdownTimer);
    otp.classList.remove("err");
    setMessage("Code verified!", "good");
    card.classList.add("ok");
    title.textContent = "You are Verified";
    resend.textContent = "Verified";
    resend.setAttribute("aria-disabled", "true");
    setSuccessIcon();
    boxes.forEach((box) => {
      box.classList.add("good");
      box.disabled = true;
    });
    return;
  }

  otp.classList.add("err");
  setMessage("Wrong code, try again", "bad");

  boxes.forEach((box) => {
    box.value = "";
    box.classList.remove("good");
  });

  setTimeout(() => {
    otp.classList.remove("err");
    setMessage("");
    focusAt(0);
  }, 1200);
};

boxes.forEach((box, index) => {
  box.addEventListener("input", () => {
    const digits = box.value.replace(/\D/g, "");
    otp.classList.remove("err");
    setMessage("");

    if (digits.length > 1) {
      const pastedDigits = digits.slice(0, boxes.length - index);
      pastedDigits.split("").forEach((digit, offset) => {
        boxes[index + offset].value = digit;
      });
      focusAt(Math.min(index + pastedDigits.length, boxes.length - 1));
    } else {
      box.value = digits;
      if (box.value && index < boxes.length - 1) {
        focusAt(index + 1);
      }
    }

    if (getEnteredCode().length === 6) {
      validateCode();
    }
  });

  box.addEventListener("keydown", (event) => {
    if (event.key === "Backspace" && !box.value && index > 0) {
      boxes[index - 1].value = "";
      focusAt(index - 1);
      event.preventDefault();
    }

    if (event.key === "ArrowLeft" && index > 0) {
      focusAt(index - 1);
    }

    if (event.key === "ArrowRight" && index < boxes.length - 1) {
      focusAt(index + 1);
    }

    if (event.key === "Enter" && getEnteredCode().length === boxes.length) {
      validateCode();
    }
  });

  box.addEventListener("focus", () => box.select());

  box.addEventListener("paste", (event) => {
    event.preventDefault();

    const pastedCode = (event.clipboardData.getData("text") || "")
      .replace(/\D/g, "")
      .slice(0, 6);

    otp.classList.remove("err");
    setMessage("");

    boxes.forEach((item, itemIndex) => {
      item.value = pastedCode[itemIndex] ?? "";
      item.classList.remove("drop");

      if (pastedCode[itemIndex]) {
        requestAnimationFrame(() => item.classList.add("drop"));
      }
    });

    if (pastedCode.length > 0) {
      focusAt(Math.min(pastedCode.length, boxes.length - 1));
    }

    if (pastedCode.length === 6) {
      setTimeout(validateCode, 200);
    }
  });
});

resend.addEventListener("click", resendCode);
resend.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    resendCode();
  }
});

startCountdown();
