const startButton = document.querySelector(".start-button");
const startMenu = document.querySelector(".start-menu");
const clockButton = document.querySelector(".taskbar-clock");
const noteButton = document.querySelector(".desktop-note");
const noteCopy = document.querySelector(".note-copy");
const introWindow = document.querySelector(".intro-window");
const minimizeButton = document.querySelector("[data-window-minimize]");
const maximizeButton = document.querySelector("[data-window-maximize]");
const closeButton = document.querySelector("[data-window-close]");
const restoreButton = document.querySelector("[data-window-restore]");

function setMenu(open) {
  startButton?.setAttribute("aria-expanded", String(open));
  startMenu?.setAttribute("aria-hidden", String(!open));
  startMenu?.classList.toggle("is-open", open);
}

function updateClock() {
  if (!clockButton) return;
  const now = new Date();
  clockButton.textContent = now.toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

startButton?.addEventListener("click", () => {
  setMenu(startMenu?.getAttribute("aria-hidden") === "true");
});

document.addEventListener("click", (event) => {
  if (!startMenu || !startButton) return;
  const target = event.target;
  if (!(target instanceof Node)) return;
  if (!startMenu.contains(target) && !startButton.contains(target)) {
    setMenu(false);
  }
});

noteButton?.addEventListener("click", () => {
  const isOpen = noteButton.classList.toggle("is-open");
  noteButton.setAttribute("aria-expanded", String(isOpen));
  if (noteCopy) {
    noteCopy.textContent = isOpen
      ? "这里会像桌面一样工作：图标可以点击，开始菜单可以打开，内容页可以进入编辑模式并保存浏览器本地改动。"
      : "点击桌面图标进入页面";
  }
});

clockButton?.addEventListener("click", () => {
  clockButton.textContent = new Date().toLocaleString("zh-CN");
});

minimizeButton?.addEventListener("click", () => {
  introWindow?.classList.add("is-minimized");
});

maximizeButton?.addEventListener("click", () => {
  introWindow?.classList.toggle("is-maximized");
});

closeButton?.addEventListener("click", () => {
  introWindow?.classList.add("is-minimized");
});

restoreButton?.addEventListener("click", () => {
  introWindow?.classList.remove("is-minimized");
});

updateClock();
window.setInterval(updateClock, 30000);
