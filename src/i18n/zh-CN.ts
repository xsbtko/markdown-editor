const zhCN = {
  // Titlebar
  untitled: "未命名",

  // Menu - File
  "menu.file": "文件",
  "menu.new": "新建 (Ctrl+N)",
  "menu.open": "打开... (Ctrl+O)",
  "menu.save": "保存 (Ctrl+S)",
  "menu.saveAs": "另存为... (Ctrl+Shift+S)",

  // Menu - Help
  "menu.help": "帮助",
  "menu.welcome": "欢迎使用",
  "menu.about": "关于",

  // Status
  "status.unsaved": "未保存",
  "status.saved": "已保存",
  "status.chars": "字符",
  "status.words": "词",
  "status.lines": "行",

  // Dialogs
  "confirm.unsavedChanges": "当前文件未保存，是否继续？",
  "error.openFile": "打开文件失败: ",
  "error.saveFile": "保存文件失败: ",
  "about.message": "MdEditor v0.1.0\n\n支持 Markdown + LaTeX 的编辑器",

  // Editor
  "editor.placeholder":
    "开始输入 Markdown... 支持 LaTeX 公式：$E=mc^2$ 或 $$\\int_{a}^{b} f(x)dx$$",

  // Toolbar tooltips
  "toolbar.h1": "一级标题",
  "toolbar.h2": "二级标题",
  "toolbar.h3": "三级标题",
  "toolbar.bold": "粗体 (Ctrl+B)",
  "toolbar.italic": "斜体 (Ctrl+I)",
  "toolbar.strikethrough": "删除线",
  "toolbar.unorderedList": "无序列表",
  "toolbar.orderedList": "有序列表",
  "toolbar.taskList": "任务列表",
  "toolbar.quote": "引用",
  "toolbar.codeBlock": "代码块",
  "toolbar.inlineMath": "行内公式",
  "toolbar.blockMath": "块级公式",
  "toolbar.link": "链接",
  "toolbar.image": "图片",
  "toolbar.hr": "分割线",
  "toolbar.table": "表格",

  // Welcome content
  "welcome.content": `# 欢迎使用 MdEditor

这是一个**简洁优雅**的 Markdown 编辑器，类似 Typora 的所见即所得体验。

## 功能特性

- 📝 **实时预览** - 左边编辑，右边即时渲染
- 🎨 **语法高亮** - 支持代码块高亮显示
- 📐 **LaTeX 公式** - 支持数学公式渲染
- 🌙 **暗黑模式** - 自动适配系统主题
- ⌨️ **快捷键支持** - Ctrl+B 粗体、Ctrl+I 斜体等
- 📂 **文件操作** - 打开、编辑、保存 Markdown 文件

## LaTeX 公式示例

### 行内公式

质能方程：$E = mc^2$

勾股定理：$a^2 + b^2 = c^2$

欧拉公式：$e^{i\\pi} + 1 = 0$

### 块级公式

二次方程求根公式：
$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

定积分：
$$\\int_{a}^{b} f(x) \\, dx = F(b) - F(a)$$

求和公式：
$$\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}$$

矩阵示例：
$$\\begin{pmatrix}
a & b & c \\\\
d & e & f \\\\
g & h & i
\\end{pmatrix}$$

### 希腊字母与符号

$\\alpha$, $\\beta$, $\\gamma$, $\\delta$, $\\theta$, $\\lambda$, $\\mu$, $\\pi$, $\\sigma$, $\\phi$

$\\infty$, $\\pm$, $\\times$, $\\div$, $\\cdot$, $\\leq$, $\\geq$, $\\neq$, $\\approx$, $\\rightarrow$

## 快速开始

### 文本样式

- **粗体文本** - 选中文字后按 Ctrl+B
- *斜体文本* - 选中文字后按 Ctrl+I
- ~~删除线~~ - 使用工具栏按钮
- \`行内代码\` - 使用反引号包裹

### 代码块

\`\`\`javascript
function hello() {
  console.log("Hello, MdEditor!");
}
\`\`\`

### 列表演示

**无序列表：**
- 项目一
- 项目二
  - 子项目 A
  - 子项目 B

**有序列表：**
1. 第一步
2. 第二步
3. 第三步

**任务列表：**
- [x] 已完成任务
- [ ] 待办任务

### 引用

> 这是一段引用文字
> 可以有多行

### 表格

| 功能 | 状态 | 描述 |
|------|------|------|
| 编辑 | ✅ | 支持实时编辑 |
| 预览 | ✅ | 即时渲染预览 |
| 公式 | ✅ | LaTeX 数学公式 |
| 导出 | ✅ | 保存为 .md 文件 |

---

**提示：** 使用工具栏或快捷键快速插入 Markdown 语法和 LaTeX 公式。

开始你的创作之旅吧！ ✨
`,
} as const;

export type TranslationKeys = keyof typeof zhCN;
export default zhCN;
