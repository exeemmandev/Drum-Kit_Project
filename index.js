const sounds = {
  w: "sounds/tom-1.mp3",
  a: "sounds/tom-2.mp3",
  s: "sounds/tom-3.mp3",
  d: "sounds/tom-4.mp3",
  j: "sounds/snare.mp3",
  k: "sounds/crash.mp3",
  l: "sounds/kick-bass.mp3"
};

const labels = {
  w: "Tom 1", a: "Tom 2", s: "Tom 3", d: "Tom 4",
  j: "Snare", k: "Crash", l: "Kick"
};

const buttons = document.querySelectorAll(".drum");
const statusText = document.getElementById("statusText");
const activeAudios = new Map();

function playDrum(key) {
  const normalizedKey = key.toLowerCase();
  const soundPath = sounds[normalizedKey];
  if (!soundPath) return;

  const button = document.querySelector(`[data-key="${normalizedKey}"]`);
  if (!button) return;

  // Create a fresh audio instance so quick repeated taps can play correctly.
  const audio = new Audio(soundPath);
  audio.currentTime = 0;
  activeAudios.set(normalizedKey, audio);
  audio.play().catch(() => {
    statusText.textContent = "Could not play sound. Check the sound files.";
  });

  button.classList.add("pressed");
  window.setTimeout(() => button.classList.remove("pressed"), 130);
  statusText.textContent = `${labels[normalizedKey]} played`;
}

buttons.forEach((button) => {
  button.addEventListener("click", () => playDrum(button.dataset.key));
});

document.addEventListener("keydown", (event) => {
  if (event.repeat || event.ctrlKey || event.altKey || event.metaKey) return;
  const target = event.target;
  if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
  playDrum(event.key);
});
