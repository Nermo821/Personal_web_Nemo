# Personal Website

这是一个 Windows XP 桌面风格的个人作品集静态网站。

## 文件结构

- `index.html`：桌面入口。桌面图标都在这里修改，`href` 决定点击后跳转到哪个页面。
- `pages/about.html`：关于我页面，来自原来的“本电脑”概念。
- `pages/projects.html`：作品集页面。
- `pages/resume.html`：履历页面。
- `pages/contact.html`：联系页面。
- `assets/styles.css`：所有视觉样式。
- `assets/desktop.js`：桌面、开始菜单、便签、任务栏和窗口按钮交互。
- `assets/editor.js`：内容页编辑、保存和恢复默认。

## 后续变更方式

要新增桌面图标，可以在 `index.html` 的 `.desktop-grid` 里复制一个 `.desktop-icon` 链接，并把 `href` 改成新的页面路径。

要新增页面，可以复制 `pages/about.html`，改标题和 `data-editable-page` 的值。这个值要保持唯一，这样浏览器本地保存的内容不会互相覆盖。

内容页点击“编辑”后可直接修改正文，再点击“保存”。保存内容会写入当前浏览器的 `localStorage`；如果要把内容永久写进网站源码，请直接修改对应的 HTML 文件。
