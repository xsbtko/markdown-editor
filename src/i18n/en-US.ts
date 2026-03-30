import type { TranslationKeys } from "./zh-CN";

const enUS: Record<TranslationKeys, string> = {
  // Titlebar
  untitled: "Untitled",

  // Menu - File
  "menu.file": "File",
  "menu.new": "New (Ctrl+N)",
  "menu.open": "Open... (Ctrl+O)",
  "menu.save": "Save (Ctrl+S)",
  "menu.saveAs": "Save As... (Ctrl+Shift+S)",

  // Menu - Help
  "menu.help": "Help",
  "menu.welcome": "Welcome",
  "menu.about": "About",

  // Status
  "status.unsaved": "Unsaved",
  "status.saved": "Saved",
  "status.chars": "chars",
  "status.words": "words",
  "status.lines": "lines",

  // Dialogs
  "confirm.unsavedChanges":
    "You have unsaved changes. Do you want to continue?",
  "error.openFile": "Failed to open file: ",
  "error.saveFile": "Failed to save file: ",
  "about.message":
    "MdEditor v0.1.0\n\nA Markdown + LaTeX editor",

  // Editor
  "editor.placeholder":
    "Start typing Markdown... LaTeX supported: $E=mc^2$ or $$\\int_{a}^{b} f(x)dx$$",

  // Toolbar tooltips
  "toolbar.h1": "Heading 1",
  "toolbar.h2": "Heading 2",
  "toolbar.h3": "Heading 3",
  "toolbar.bold": "Bold (Ctrl+B)",
  "toolbar.italic": "Italic (Ctrl+I)",
  "toolbar.strikethrough": "Strikethrough",
  "toolbar.unorderedList": "Unordered List",
  "toolbar.orderedList": "Ordered List",
  "toolbar.taskList": "Task List",
  "toolbar.quote": "Quote",
  "toolbar.codeBlock": "Code Block",
  "toolbar.inlineMath": "Inline Math",
  "toolbar.blockMath": "Block Math",
  "toolbar.link": "Link",
  "toolbar.image": "Image",
  "toolbar.hr": "Horizontal Rule",
  "toolbar.table": "Table",

  // Welcome content
  "welcome.content": `# Welcome to MdEditor

An **elegant and minimal** Markdown editor with a Typora-like live preview experience.

## Features

- 📝 **Live Preview** - Edit on the left, render instantly on the right
- 🎨 **Syntax Highlighting** - Code blocks with highlighting support
- 📐 **LaTeX Formulas** - Math formula rendering support
- 🌙 **Dark Mode** - Auto-adapts to system theme
- ⌨️ **Keyboard Shortcuts** - Ctrl+B bold, Ctrl+I italic, and more
- 📂 **File Operations** - Open, edit, and save Markdown files

## LaTeX Formula Examples

### Inline Formulas

Mass-energy equivalence: $E = mc^2$

Pythagorean theorem: $a^2 + b^2 = c^2$

Euler's formula: $e^{i\\pi} + 1 = 0$

### Block Formulas

Quadratic formula:
$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

Definite integral:
$$\\int_{a}^{b} f(x) \\, dx = F(b) - F(a)$$

Summation formula:
$$\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}$$

Matrix example:
$$\\begin{pmatrix}
a & b & c \\\\
d & e & f \\\\
g & h & i
\\end{pmatrix}$$

### Greek Letters & Symbols

$\\alpha$, $\\beta$, $\\gamma$, $\\delta$, $\\theta$, $\\lambda$, $\\mu$, $\\pi$, $\\sigma$, $\\phi$

$\\infty$, $\\pm$, $\\times$, $\\div$, $\\cdot$, $\\leq$, $\\geq$, $\\neq$, $\\approx$, $\\rightarrow$

## Quick Start

### Text Styling

- **Bold text** - Select text and press Ctrl+B
- *Italic text* - Select text and press Ctrl+I
- ~~Strikethrough~~ - Use the toolbar button
- \`Inline code\` - Wrap with backticks

### Code Block

\`\`\`javascript
function hello() {
  console.log("Hello, MdEditor!");
}
\`\`\`

### List Demo

**Unordered list:**
- Item one
- Item two
  - Sub-item A
  - Sub-item B

**Ordered list:**
1. Step one
2. Step two
3. Step three

**Task list:**
- [x] Completed task
- [ ] Todo task

### Blockquote

> This is a blockquote.
> It can span multiple lines.

### Table

| Feature | Status | Description |
|---------|--------|-------------|
| Edit | ✅ | Real-time editing |
| Preview | ✅ | Instant rendering |
| Formulas | ✅ | LaTeX math formulas |
| Export | ✅ | Save as .md file |

---

**Tip:** Use the toolbar or keyboard shortcuts to quickly insert Markdown syntax and LaTeX formulas.

Start your creative journey! ✨
`,
};

export default enUS;
