const paragraph = document.getElementById("paragraph");
const inputBox = document.getElementById("inputBox");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const restartBtn = document.getElementById("restartBtn");

const texts = [
  "The quick brown fox jumps over the lazy dog.",
  "Practice makes perfect, keep on typing!",
  "JavaScript is a powerful web language.",
  "Typing fast with accuracy is a good skill.",
  "Frontend includes HTML, CSS and JavaScript."
];

let time = 60;
let timer;
let charIndex = 0;
let mistakes = 0;
let isTyping = false;

function loadText() {
  const randomText = texts[Math.floor(Math.random() * texts.length)];
  paragraph.innerHTML = "";
  randomText.split("").forEach(char => {
    const span = document.createElement("span");
    span.innerText = char;
    paragraph.appendChild(span);
  });
  paragraph.querySelector("span").classList.add("active");
}

function startTimer() {
  if (!isTyping) {
    timer = setInterval(() => {
      if (time > 0) {
        time--;
        timeEl.innerText = time;
      } else {
        clearInterval(timer);
        inputBox.disabled = true;
      }
    }, 1000);
    isTyping = true;
  }
}

function typingHandler() {
  const characters = paragraph.querySelectorAll("span");
  const typedChar = inputBox.value.charAt(charIndex);

  startTimer();

  if (charIndex < characters.length) {
    if (typedChar === characters[charIndex].innerText) {
      characters[charIndex].classList.add("correct");
    } else {
      characters[charIndex].classList.add("incorrect");
      mistakes++;
    }

    characters[charIndex].classList.remove("active");
    charIndex++;

    if (charIndex < characters.length) {
      characters[charIndex].classList.add("active");
    }
  }

  const correctChars = charIndex - mistakes;
  const wpm = Math.round((correctChars / 5) / ((60 - time) / 60));
  wpmEl.innerText = wpm > 0 ? wpm : 0;

  const accuracy = Math.round((correctChars / charIndex) * 100);
  accuracyEl.innerText = accuracy > 0 ? accuracy : 100;
}

restartBtn.addEventListener("click", () => {
  time = 60;
  charIndex = 0;
  mistakes = 0;
  isTyping = false;
  inputBox.disabled = false;
  inputBox.value = "";
  timeEl.innerText = time;
  wpmEl.innerText = "0";
  accuracyEl.innerText = "100";
  clearInterval(timer);
  loadText();
});

inputBox.addEventListener("input", typingHandler);

loadText();
