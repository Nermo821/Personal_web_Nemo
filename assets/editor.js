const editableArea = document.querySelector("[data-editable-page]");
const editToggle = document.querySelector("[data-editor-toggle]");
const resetButton = document.querySelector("[data-editor-reset]");
const statusText = document.querySelector("[data-editor-status]");
const portfolioWindow = document.querySelector(".portfolio-window");
const minimizeButton = document.querySelector("[data-window-minimize]");
const maximizeButton = document.querySelector("[data-window-maximize]");
const closeButton = document.querySelector("[data-window-close]");

const pageKey = editableArea?.getAttribute("data-editable-page");
const storageKey = pageKey ? `portfolio-page:${pageKey}` : "";

function setStatus(text) {
  if (!statusText) return;
  statusText.textContent = text;
}

function savePage() {
  if (!editableArea || !storageKey) return;
  window.localStorage.setItem(storageKey, editableArea.innerHTML);
  setStatus("已保存到当前浏览器");
}

function setEditing(isEditing) {
  if (!editableArea || !editToggle) return;
  editableArea.setAttribute("contenteditable", String(isEditing));
  editToggle.textContent = isEditing ? "保存" : "编辑";
  editToggle.setAttribute("aria-pressed", String(isEditing));
  if (!isEditing) savePage();
}

if (editableArea && storageKey) {
  const saved = window.localStorage.getItem(storageKey);
  if (saved) editableArea.innerHTML = saved;
}

editToggle?.addEventListener("click", () => {
  const isEditing = editableArea?.getAttribute("contenteditable") === "true";
  setEditing(!isEditing);
});

editableArea?.addEventListener("input", () => {
  setStatus("正在编辑，点击保存保留本地改动");
});

resetButton?.addEventListener("click", () => {
  if (!storageKey) return;
  window.localStorage.removeItem(storageKey);
  window.location.reload();
});

minimizeButton?.addEventListener("click", () => {
  portfolioWindow?.classList.toggle("is-minimized");
});

maximizeButton?.addEventListener("click", () => {
  portfolioWindow?.classList.toggle("is-maximized");
});

closeButton?.addEventListener("click", () => {
  window.location.href = "../index.html";
});
