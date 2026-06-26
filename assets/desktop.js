const APPS = {
  about: {
    titleKey: "window.title.about",
    labelKey: "icon.about",
    templateId: "template-about",
    left: 120,
    top: 48,
    width: 920,
  },
  projects: {
    titleKey: "window.title.projects",
    labelKey: "icon.projects",
    templateId: "template-projects",
    left: 160,
    top: 72,
    width: 960,
  },
  resume: {
    titleKey: "window.title.resume",
    labelKey: "icon.resume",
    templateId: "template-resume",
    left: 200,
    top: 96,
    width: 900,
  },
  contact: {
    titleKey: "window.title.contact",
    labelKey: "icon.contact",
    templateId: "template-contact",
    left: 240,
    top: 120,
    width: 880,
  },
};

const APP_ORDER = ["about", "projects", "resume", "contact"];
const RESIZE_DIRS = ["n", "s", "e", "w", "ne", "nw", "se", "sw"];
const MIN_WINDOW_WIDTH = 420;
const MIN_WINDOW_HEIGHT = 320;
const DEFAULT_WINDOW_HEIGHT = 580;

const startButton = document.querySelector(".start-button");
const startMenu = document.querySelector(".start-menu");
const clockButton = document.querySelector(".taskbar-clock");
const taskbarApps = document.querySelector(".taskbar-apps");
const desktopTab = document.querySelector("[data-taskbar-desktop]");
const windowLayer = document.querySelector(".window-layer");
const desktop = document.querySelector(".desktop");
const systemOverlay = document.getElementById("system-overlay");
const pdfViewer = document.getElementById("pdf-viewer");
const pdfFrame = pdfViewer?.querySelector("[data-pdf-frame]");
const pdfTitle = pdfViewer?.querySelector("[data-pdf-title]");

const openWindows = new Map();
let zIndexCounter = 20;
let focusedAppId = null;
let dragState = null;
let resizeState = null;
let isApplyingHash = false;
let systemTimer = null;

function isMobileLayout() {
  return window.matchMedia("(max-width: 760px)").matches;
}

function showSystemStage(stageName) {
  if (!systemOverlay) return;

  if (systemTimer) {
    clearTimeout(systemTimer);
    systemTimer = null;
  }

  systemOverlay.hidden = false;
  systemOverlay.setAttribute("aria-hidden", "false");
  systemOverlay.dataset.activeStage = stageName;

  systemOverlay.querySelectorAll("[data-system-stage]").forEach((stage) => {
    stage.hidden = stage.dataset.systemStage !== stageName;
  });

  document.body.classList.add("is-system-overlay-open");
  window.i18n?.applyTranslations?.(systemOverlay);
}

function hideSystemOverlay() {
  if (!systemOverlay) return;

  if (systemTimer) {
    clearTimeout(systemTimer);
    systemTimer = null;
  }

  systemOverlay.hidden = true;
  systemOverlay.setAttribute("aria-hidden", "true");
  delete systemOverlay.dataset.activeStage;
  document.body.classList.remove("is-system-overlay-open");
}

function openPdfViewer(src, title) {
  if (!pdfViewer || !pdfFrame) return;
  if (pdfTitle) pdfTitle.textContent = title || "";
  pdfFrame.src = src;
  pdfViewer.hidden = false;
  pdfViewer.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-pdf-viewer-open");
}

function closePdfViewer() {
  if (!pdfViewer || !pdfFrame) return;
  pdfViewer.hidden = true;
  pdfViewer.setAttribute("aria-hidden", "true");
  pdfFrame.src = "about:blank";
  document.body.classList.remove("is-pdf-viewer-open");
}

function completeLogOffLogin() {
  hideSystemOverlay();
  [...openWindows.keys()].forEach((appId) => closeWindow(appId));
  focusDesktop();
}

function logOff() {
  setMenu(false);
  showSystemStage("logoff-loading");
  systemTimer = window.setTimeout(() => {
    showSystemStage("login");
    systemTimer = null;
  }, 1300);
}

function shutDown() {
  setMenu(false);
  showSystemStage("shutdown-loading");
  systemTimer = window.setTimeout(() => {
    showSystemStage("shutdown-complete");
    systemTimer = null;
  }, 1700);
}

function setMenu(open) {
  startButton?.setAttribute("aria-expanded", String(open));
  startMenu?.setAttribute("aria-hidden", String(!open));
  startMenu?.classList.toggle("is-open", open);
}

function updateClock() {
  if (!clockButton) return;
  const now = new Date();
  const locale = window.i18n?.getLocale?.() ?? "zh-CN";
  clockButton.textContent = now.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function updateTaskbarState() {
  desktopTab?.classList.toggle("active", focusedAppId === null);

  openWindows.forEach((entry, appId) => {
    const isFocused = focusedAppId === appId;
    const isMinimized = entry.element.classList.contains("is-minimized");
    entry.taskTab.classList.toggle("active", isFocused && !isMinimized);
  });
}

function bringToFront(appId) {
  const entry = openWindows.get(appId);
  if (!entry) return;
  zIndexCounter += 1;
  entry.element.style.zIndex = String(zIndexCounter);
}

function getHashAppId() {
  const hash = window.location.hash.replace(/^#/, "");
  return APPS[hash] ? hash : null;
}

function updateLocationHash() {
  if (isApplyingHash) return;

  if (focusedAppId) {
    const entry = openWindows.get(focusedAppId);
    if (entry && !entry.element.classList.contains("is-minimized")) {
      const nextHash = `#${focusedAppId}`;
      if (window.location.hash !== nextHash) {
        history.replaceState(null, "", nextHash);
      }
      return;
    }
  }

  if (window.location.hash) {
    history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  }
}

function applyHashRoute() {
  const appId = getHashAppId();
  if (appId) {
    openApp(appId);
    return;
  }

  if (openWindows.size > 0) {
    focusDesktop();
  }
}

function setWindowFocus(appId) {
  openWindows.forEach((entry, id) => {
    entry.element.classList.toggle("is-inactive", id !== appId);
  });
  focusedAppId = appId;
  if (appId) bringToFront(appId);
  updateTaskbarState();
  updateLocationHash();
}

function focusDesktop() {
  openWindows.forEach((entry) => {
    entry.element.classList.add("is-minimized");
    entry.element.classList.remove("is-maximized");
  });
  focusedAppId = null;
  updateTaskbarState();
  updateLocationHash();
}

function restoreWindow(appId) {
  const entry = openWindows.get(appId);
  if (!entry) return;
  entry.element.classList.remove("is-minimized");
  setWindowFocus(appId);
}

function minimizeWindow(appId) {
  const entry = openWindows.get(appId);
  if (!entry) return;
  entry.element.classList.add("is-minimized");
  if (focusedAppId === appId) {
    focusedAppId = null;
  }
  updateTaskbarState();
  updateLocationHash();
}

function toggleTaskbarWindow(appId) {
  const entry = openWindows.get(appId);
  if (!entry) return;
  const isMinimized = entry.element.classList.contains("is-minimized");
  const isFocused = focusedAppId === appId;

  if (isFocused && !isMinimized) {
    minimizeWindow(appId);
    return;
  }

  restoreWindow(appId);
}

function toggleMaximize(appId) {
  const entry = openWindows.get(appId);
  if (!entry) return;
  const element = entry.element;

  if (element.classList.contains("is-maximized")) {
    element.classList.remove("is-maximized");
    element.style.right = "";
    element.style.bottom = "";
    if (entry.restoreBounds) {
      element.style.left = entry.restoreBounds.left;
      element.style.top = entry.restoreBounds.top;
      element.style.width = entry.restoreBounds.width;
      element.style.height = entry.restoreBounds.height;
    }
  } else {
    ensureExplicitBounds(element);
    entry.restoreBounds = {
      left: element.style.left,
      top: element.style.top,
      width: element.style.width,
      height: element.style.height,
    };
    element.classList.add("is-maximized");
  }

  setWindowFocus(appId);
}

function closeWindow(appId) {
  const entry = openWindows.get(appId);
  if (!entry) return;
  entry.element.remove();
  entry.taskTab.remove();
  openWindows.delete(appId);
  if (focusedAppId === appId) {
    focusedAppId = null;
  }
  updateTaskbarState();
  updateLocationHash();
}

function buildSidebar(activeAppId) {
  const aside = document.createElement("aside");
  aside.className = "page-sidebar";

  const homeButton = document.createElement("button");
  homeButton.type = "button";
  homeButton.className = "home-button";
  homeButton.dataset.action = "show-desktop";
  homeButton.dataset.i18n = "sidebar.home";
  aside.appendChild(homeButton);

  const nav = document.createElement("nav");
  nav.dataset.i18nAria = "sidebar.nav.aria";

  APP_ORDER.forEach((appId) => {
    const link = document.createElement("button");
    link.type = "button";
    link.dataset.openApp = appId;
    link.dataset.i18n = APPS[appId].labelKey;
    if (appId === activeAppId) {
      link.setAttribute("aria-current", "page");
    }
    nav.appendChild(link);
  });

  aside.appendChild(nav);
  return aside;
}

function createTaskTab(appId) {
  const tab = document.createElement("button");
  tab.type = "button";
  tab.className = "taskbar-tab";
  tab.dataset.appId = appId;
  tab.dataset.i18n = APPS[appId].labelKey;
  tab.addEventListener("click", () => toggleTaskbarWindow(appId));
  taskbarApps?.appendChild(tab);
  return tab;
}

function ensureExplicitBounds(element) {
  const desktopRect = desktop.getBoundingClientRect();
  const rect = element.getBoundingClientRect();

  element.style.left = `${rect.left - desktopRect.left}px`;
  element.style.top = `${rect.top - desktopRect.top}px`;
  element.style.width = `${rect.width}px`;
  element.style.height = `${rect.height}px`;
  element.style.right = "";
  element.style.bottom = "";
}

function enableResize(appId, element) {
  const handles = document.createElement("div");
  handles.className = "window-resize-handles";
  handles.setAttribute("aria-hidden", "true");

  RESIZE_DIRS.forEach((direction) => {
    const handle = document.createElement("span");
    handle.className = `resize-handle resize-${direction}`;
    handle.addEventListener("mousedown", (event) => {
      if (element.classList.contains("is-maximized") || isMobileLayout()) return;

      event.preventDefault();
      event.stopPropagation();
      setWindowFocus(appId);
      ensureExplicitBounds(element);

      const desktopRect = desktop.getBoundingClientRect();
      resizeState = {
        appId,
        direction,
        desktopRect,
        startX: event.clientX,
        startY: event.clientY,
        startLeft: parseFloat(element.style.left),
        startTop: parseFloat(element.style.top),
        startWidth: parseFloat(element.style.width),
        startHeight: parseFloat(element.style.height),
      };

      document.body.classList.add("is-window-resizing");
    });
    handles.appendChild(handle);
  });

  element.appendChild(handles);
}

function applyResize(event) {
  if (!resizeState) return;

  const entry = openWindows.get(resizeState.appId);
  if (!entry) return;

  const element = entry.element;
  const {
    direction,
    desktopRect,
    startX,
    startY,
    startLeft,
    startTop,
    startWidth,
    startHeight,
  } = resizeState;

  const deltaX = event.clientX - startX;
  const deltaY = event.clientY - startY;

  let left = startLeft;
  let top = startTop;
  let width = startWidth;
  let height = startHeight;

  if (direction.includes("e")) {
    width = startWidth + deltaX;
  }
  if (direction.includes("w")) {
    width = startWidth - deltaX;
    left = startLeft + deltaX;
  }
  if (direction.includes("s")) {
    height = startHeight + deltaY;
  }
  if (direction.includes("n")) {
    height = startHeight - deltaY;
    top = startTop + deltaY;
  }

  width = Math.max(MIN_WINDOW_WIDTH, width);
  height = Math.max(MIN_WINDOW_HEIGHT, height);

  if (direction.includes("w")) {
    left = startLeft + startWidth - width;
  }
  if (direction.includes("n")) {
    top = startTop + startHeight - height;
  }

  const maxWidth = desktopRect.width - left;
  const maxHeight = desktopRect.height - top;
  width = Math.min(width, maxWidth);
  height = Math.min(height, maxHeight);

  left = Math.max(0, Math.min(left, desktopRect.width - width));
  top = Math.max(0, Math.min(top, desktopRect.height - height));

  element.style.left = `${left}px`;
  element.style.top = `${top}px`;
  element.style.width = `${width}px`;
  element.style.height = `${height}px`;
}

function enableDrag(appId, titlebar, element) {
  titlebar.addEventListener("mousedown", (event) => {
    if (!(event.target instanceof Element)) return;
    if (event.target.closest(".window-controls")) return;
    if (element.classList.contains("is-maximized")) return;

    event.preventDefault();
    setWindowFocus(appId);

    const desktopRect = desktop.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    dragState = {
      appId,
      offsetX: event.clientX - elementRect.left,
      offsetY: event.clientY - elementRect.top,
      desktopRect,
    };

    document.body.classList.add("is-window-dragging");
  });
}

function applyDefaultBounds(element, config) {
  if (isMobileLayout()) {
    element.style.left = "6px";
    element.style.top = "6px";
    element.style.width = "auto";
    element.classList.add("is-maximized");
    return;
  }

  element.style.left = `${config.left}px`;
  element.style.top = `${config.top}px`;
  element.style.width = `${config.width}px`;
  element.style.height = `${config.height || DEFAULT_WINDOW_HEIGHT}px`;
}

function openApp(appId) {
  if (!APPS[appId]) return;

  const existing = openWindows.get(appId);
  if (existing) {
    restoreWindow(appId);
    return;
  }

  const config = APPS[appId];
  const template = document.getElementById(config.templateId);
  if (!template || !windowLayer) return;

  const windowElement = document.createElement("section");
  windowElement.className = "xp-window app-window";
  windowElement.dataset.appId = appId;

  const titlebar = document.createElement("div");
  titlebar.className = "window-titlebar";

  const title = document.createElement("span");
  title.dataset.i18n = config.titleKey;
  titlebar.appendChild(title);

  const controls = document.createElement("div");
  controls.className = "window-controls";

  const minimizeButton = document.createElement("button");
  minimizeButton.type = "button";
  minimizeButton.dataset.windowMinimize = "";
  minimizeButton.dataset.i18nAria = "window.minimize";

  const maximizeButton = document.createElement("button");
  maximizeButton.type = "button";
  maximizeButton.dataset.windowMaximize = "";
  maximizeButton.dataset.i18nAria = "window.maximize";

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.dataset.windowClose = "";
  closeButton.dataset.i18nAria = "window.close";

  controls.append(minimizeButton, maximizeButton, closeButton);
  titlebar.appendChild(controls);

  const body = document.createElement("div");
  body.className = "portfolio-body";

  const contentPanel = document.createElement("article");
  contentPanel.className = "content-panel";
  contentPanel.appendChild(template.content.cloneNode(true));

  body.append(buildSidebar(appId), contentPanel);
  windowElement.append(titlebar, body);
  windowLayer.appendChild(windowElement);

  applyDefaultBounds(windowElement, config);

  const taskTab = createTaskTab(appId);
  const entry = {
    element: windowElement,
    taskTab,
    restoreBounds: null,
  };
  openWindows.set(appId, entry);

  titlebar.addEventListener("mousedown", () => setWindowFocus(appId));
  windowElement.addEventListener("mousedown", () => setWindowFocus(appId));

  minimizeButton.addEventListener("click", (event) => {
    event.stopPropagation();
    minimizeWindow(appId);
  });

  maximizeButton.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleMaximize(appId);
  });

  closeButton.addEventListener("click", (event) => {
    event.stopPropagation();
    closeWindow(appId);
  });

  enableDrag(appId, titlebar, windowElement);
  enableResize(appId, windowElement);
  window.i18n?.applyTranslations?.();
  setWindowFocus(appId);
  setMenu(false);
}

startButton?.addEventListener("click", () => {
  setMenu(startMenu?.getAttribute("aria-hidden") === "true");
});

desktopTab?.addEventListener("click", () => {
  focusDesktop();
});

clockButton?.addEventListener("click", () => {
  const locale = window.i18n?.getLocale?.() ?? "zh-CN";
  clockButton.textContent = new Date().toLocaleString(locale);
});

document.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;

  if (startMenu && startButton) {
    if (!startMenu.contains(event.target) && !startButton.contains(event.target)) {
      setMenu(false);
    }
  }

  const pdfTrigger = event.target.closest("[data-pdf]");
  if (pdfTrigger instanceof HTMLElement && pdfTrigger.dataset.pdf) {
    event.preventDefault();
    const card = pdfTrigger.closest(".project-card");
    const title = card?.querySelector("h2")?.textContent?.trim() || "PDF";
    openPdfViewer(pdfTrigger.dataset.pdf, title);
    return;
  }

  if (event.target.closest("[data-pdf-close]") || event.target === pdfViewer) {
    event.preventDefault();
    closePdfViewer();
    return;
  }

  const openTrigger = event.target.closest("[data-open-app]");
  if (openTrigger instanceof HTMLElement && openTrigger.dataset.openApp) {
    event.preventDefault();
    openApp(openTrigger.dataset.openApp);
    return;
  }

  const placeholderLink = event.target.closest("[data-placeholder-link]");
  if (placeholderLink) {
    event.preventDefault();
    return;
  }

  const startAction = event.target.closest("[data-start-action]");
  if (startAction instanceof HTMLElement) {
    event.preventDefault();
    if (startAction.dataset.startAction === "logoff") {
      logOff();
    } else if (startAction.dataset.startAction === "shutdown") {
      shutDown();
    }
    return;
  }

  const systemAction = event.target.closest("[data-system-action]");
  if (systemAction instanceof HTMLElement) {
    event.preventDefault();
    if (systemAction.dataset.systemAction === "restart") {
      window.location.reload();
    } else if (systemAction.dataset.systemAction === "login") {
      completeLogOffLogin();
    }
    return;
  }

  const desktopTrigger = event.target.closest("[data-action='show-desktop']");
  if (desktopTrigger) {
    event.preventDefault();
    focusDesktop();
  }
});

document.addEventListener("mousemove", (event) => {
  if (resizeState) {
    applyResize(event);
    return;
  }

  if (!dragState) return;

  const entry = openWindows.get(dragState.appId);
  if (!entry) return;

  const element = entry.element;
  const maxLeft = dragState.desktopRect.width - element.offsetWidth;
  const maxTop = dragState.desktopRect.height - element.offsetHeight;

  const nextLeft = event.clientX - dragState.desktopRect.left - dragState.offsetX;
  const nextTop = event.clientY - dragState.desktopRect.top - dragState.offsetY;

  element.style.left = `${Math.max(0, Math.min(nextLeft, maxLeft))}px`;
  element.style.top = `${Math.max(0, Math.min(nextTop, maxTop))}px`;
});

document.addEventListener("mouseup", () => {
  if (resizeState) {
    resizeState = null;
    document.body.classList.remove("is-window-resizing");
  }

  if (dragState) {
    dragState = null;
    document.body.classList.remove("is-window-dragging");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && pdfViewer && !pdfViewer.hidden) {
    closePdfViewer();
  }
});

window.addEventListener("hashchange", () => {
  isApplyingHash = true;
  applyHashRoute();
  isApplyingHash = false;
});

window.addEventListener("languagechange", () => {
  updateClock();
  if (systemOverlay && !systemOverlay.hidden) {
    window.i18n?.applyTranslations?.(systemOverlay);
  }
});

window.i18n?.initI18n?.();
updateClock();
window.setInterval(updateClock, 30000);

if (getHashAppId()) {
  isApplyingHash = true;
  applyHashRoute();
  isApplyingHash = false;
}
