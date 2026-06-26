const STORAGE_KEY = "portfolio-lang";

const translations = {
  zh: {
    "page.title": "个人作品集桌面",
    "desktop.aria": "Windows XP 风格个人作品集桌面",
    "desktop.icons.aria": "桌面图标",
    "icon.about": "关于我",
    "icon.projects": "作品集",
    "icon.resume": "履历",
    "icon.contact": "联系",
    "note.aria": "桌面便签",
    "note.title": "欢迎.txt",
    "note.copy": "欢迎浏览我的个人作品集。",
    "taskbar.aria": "任务栏",
    "taskbar.start": "开始",
    "taskbar.desktop": "桌面",
    "taskbar.apps.aria": "已打开窗口",
    "taskbar.clock.aria": "显示当前时间",
    "taskbar.lang": "中/EN",
    "startMenu.userName": "Nemo",
    "startMenu.programs": "程序",
    "startMenu.links": "链接",
    "startMenu.allPrograms": "所有程序",
    "startMenu.link.github": "GitHub",
    "startMenu.link.behance": "Behance",
    "startMenu.link.linkedin": "LinkedIn",
    "startMenu.link.email": "邮箱",
    "startMenu.logoff": "注销",
    "startMenu.shutdown": "关闭计算机",
    "system.shutdown.loading": "正在关机…",
    "system.shutdown.safe": "现在可以安全地关闭计算机了",
    "system.shutdown.restart": "重新开机",
    "system.logoff.loading": "正在注销…",
    "system.login.hint": "点击登录",
    "window.title.about": "关于我 - Personal Website",
    "window.title.projects": "作品集 - Personal Website",
    "window.title.resume": "履历 - Personal Website",
    "window.title.contact": "联系 - Personal Website",
    "window.minimize": "最小化",
    "window.maximize": "最大化",
    "window.close": "关闭",
    "sidebar.home": "返回桌面",
    "sidebar.nav.aria": "页面导航",
    "about.title": "关于我",
    "about.intro":
      "在这里写你的个人简介：你的专业方向、创作兴趣、正在研究的主题，以及希望别人通过这个网站认识到的你。",
    "about.focus.title": "我关注的方向",
    "about.focus.1": "交互设计与网页体验",
    "about.focus.2": "视觉叙事与个人品牌表达",
    "about.focus.3": "可继续编辑、可成长的个人作品集系统",
    "about.tagline.title": "一句话介绍",
    "about.tagline":
      "我是一个用设计和技术组织想法的人，喜欢把作品集做成可以被探索的空间。",
    "projects.title": "作品集",
    "projects.intro": "把你的项目放在这里。每个项目可以写背景、你的角色、过程、结果和链接。",
    "projects.video.caption": "作品演示视频",
    "projects.pdf.view": "查看 PDF",
    "projects.1.title": "项目一",
    "projects.1.desc": "项目简介、使用工具、你的贡献，以及最终成果。",
    "projects.2.title": "项目二",
    "projects.2.desc": "适合放交互、视觉、研究、影像、写作或代码作品。",
    "projects.3.title": "项目三",
    "projects.3.desc": "这里也可以替换成图片、视频链接或更完整的案例研究。",
    "projects.4.title": "项目四",
    "projects.4.desc": "后续可以继续拆成独立项目详情页。",
    "resume.title": "履历",
    "resume.education.title": "教育经历",
    "resume.education.desc": "学校 / 专业 / 时间。这里可以写课程方向、研究主题或毕业项目。",
    "resume.work.title": "工作与实践",
    "resume.work.1": "经历一：你的职责、成果和使用的方法。",
    "resume.work.2": "经历二：参与的项目、协作对象和最终交付。",
    "resume.work.3": "经历三：奖项、展览、发表或其它重要节点。",
    "resume.skills.title": "技能",
    "resume.skills.desc":
      "设计工具、前端技术、研究方法、语言能力或其它与你作品相关的能力。",
    "contact.title": "联系",
    "contact.intro": "把你的邮箱、社交媒体、作品平台或其它联系方式放在这里。",
    "contact.email.title": "Email",
    "contact.email.value": "yourname@example.com",
    "contact.links.title": "Links",
    "contact.links.1": "Behance / Dribbble / GitHub / Instagram",
    "contact.links.2": "LinkedIn / 小红书 / 公众号 / 其它平台",
    "contact.collab.title": "合作方向",
    "contact.collab.desc": "可以写你欢迎怎样的合作、实习、委托或交流。",
  },
  en: {
    "page.title": "Portfolio Desktop",
    "desktop.aria": "Windows XP style personal portfolio desktop",
    "desktop.icons.aria": "Desktop icons",
    "icon.about": "About Me",
    "icon.projects": "Portfolio",
    "icon.resume": "Resume",
    "icon.contact": "Contact",
    "note.aria": "Desktop note",
    "note.title": "Welcome.txt",
    "note.copy": "Welcome to my portfolio.",
    "taskbar.aria": "Taskbar",
    "taskbar.start": "Start",
    "taskbar.desktop": "Desktop",
    "taskbar.apps.aria": "Open windows",
    "taskbar.clock.aria": "Show current time",
    "taskbar.lang": "中/EN",
    "startMenu.userName": "Nemo",
    "startMenu.programs": "Programs",
    "startMenu.links": "Links",
    "startMenu.allPrograms": "All Programs",
    "startMenu.link.github": "GitHub",
    "startMenu.link.behance": "Behance",
    "startMenu.link.linkedin": "LinkedIn",
    "startMenu.link.email": "Email",
    "startMenu.logoff": "Log Off",
    "startMenu.shutdown": "Turn Off Computer",
    "system.shutdown.loading": "Shutting down...",
    "system.shutdown.safe": "It is now safe to turn off your computer",
    "system.shutdown.restart": "Restart",
    "system.logoff.loading": "Logging off...",
    "system.login.hint": "Click to log in",
    "window.title.about": "About Me - Personal Website",
    "window.title.projects": "Portfolio - Personal Website",
    "window.title.resume": "Resume - Personal Website",
    "window.title.contact": "Contact - Personal Website",
    "window.minimize": "Minimize",
    "window.maximize": "Maximize",
    "window.close": "Close",
    "sidebar.home": "Back to Desktop",
    "sidebar.nav.aria": "Page navigation",
    "about.title": "About Me",
    "about.intro":
      "Write your personal introduction here: your focus, creative interests, current research topics, and how you want visitors to know you through this site.",
    "about.focus.title": "Areas I Focus On",
    "about.focus.1": "Interaction design and web experiences",
    "about.focus.2": "Visual storytelling and personal branding",
    "about.focus.3": "An editable, evolving portfolio system",
    "about.tagline.title": "One-Line Intro",
    "about.tagline":
      "I organize ideas through design and technology, and I like turning a portfolio into a space worth exploring.",
    "projects.title": "Portfolio",
    "projects.intro":
      "Place your projects here. For each one, describe the background, your role, process, outcome, and links.",
    "projects.video.caption": "Showreel",
    "projects.pdf.view": "View PDF",
    "projects.1.title": "Project One",
    "projects.1.desc": "Project summary, tools used, your contribution, and the final outcome.",
    "projects.2.title": "Project Two",
    "projects.2.desc":
      "A good fit for interaction, visual, research, film, writing, or code work.",
    "projects.3.title": "Project Three",
    "projects.3.desc": "You can also swap this for images, video links, or a fuller case study.",
    "projects.4.title": "Project Four",
    "projects.4.desc": "This can later be split into dedicated project detail pages.",
    "resume.title": "Resume",
    "resume.education.title": "Education",
    "resume.education.desc":
      "School / major / dates. Add coursework, research topics, or graduation projects here.",
    "resume.work.title": "Work & Practice",
    "resume.work.1": "Experience one: your responsibilities, outcomes, and methods.",
    "resume.work.2": "Experience two: projects, collaborators, and final deliverables.",
    "resume.work.3": "Experience three: awards, exhibitions, publications, or other milestones.",
    "resume.skills.title": "Skills",
    "resume.skills.desc":
      "Design tools, frontend skills, research methods, languages, or other abilities relevant to your work.",
    "contact.title": "Contact",
    "contact.intro": "Add your email, social media, portfolio platforms, or other ways to reach you.",
    "contact.email.title": "Email",
    "contact.email.value": "yourname@example.com",
    "contact.links.title": "Links",
    "contact.links.1": "Behance / Dribbble / GitHub / Instagram",
    "contact.links.2": "LinkedIn / Xiaohongshu / WeChat Official Account / other platforms",
    "contact.collab.title": "Collaboration",
    "contact.collab.desc":
      "Describe the kinds of collaboration, internships, commissions, or conversations you welcome.",
  },
};

function getCurrentLang() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved === "en" ? "en" : "zh";
}

function getLocale() {
  return getCurrentLang() === "en" ? "en-US" : "zh-CN";
}

function t(key, lang = getCurrentLang()) {
  return translations[lang]?.[key] ?? translations.zh[key] ?? key;
}

function collectI18nElements(root) {
  const elements = [];
  const container = root instanceof Document ? root.documentElement : root;

  if (container instanceof Element) {
    if (container.hasAttribute("data-i18n") || container.hasAttribute("data-i18n-aria")) {
      elements.push(container);
    }
  }

  if (container instanceof Element || container instanceof Document) {
    container.querySelectorAll("[data-i18n], [data-i18n-aria]").forEach((element) => {
      if (!elements.includes(element)) {
        elements.push(element);
      }
    });
  }

  return elements;
}

function applyI18nElement(element, lang) {
  const textKey = element.getAttribute("data-i18n");
  if (textKey) {
    element.textContent = t(textKey, lang);
  }

  const ariaKey = element.getAttribute("data-i18n-aria");
  if (ariaKey) {
    element.setAttribute("aria-label", t(ariaKey, lang));
  }
}

function applyTranslations(root = document) {
  const lang = getCurrentLang();
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  document.title = t("page.title", lang);

  collectI18nElements(root).forEach((element) => {
    applyI18nElement(element, lang);
  });
}

function toggleLanguage() {
  const nextLang = getCurrentLang() === "zh" ? "en" : "zh";
  localStorage.setItem(STORAGE_KEY, nextLang);
  applyTranslations();
  window.dispatchEvent(new CustomEvent("languagechange", { detail: { lang: nextLang } }));
}

function initI18n() {
  applyTranslations();
  document.querySelector("[data-lang-toggle]")?.addEventListener("click", toggleLanguage);
}

window.i18n = {
  getCurrentLang,
  getLocale,
  t,
  applyTranslations,
  toggleLanguage,
  initI18n,
};
