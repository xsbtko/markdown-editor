# MdEditor

English | [中文](README-zh.md)

A concise, elegant, and minimal Markdown editor with a Typora-like live preview experience, built with [Tauri v2](https://v2.tauri.app/), [React](https://react.dev/), and [TypeScript](https://www.typescriptlang.org/).

## ✨ Features

- 📝 **Live Preview**: Split-pane design. Edit on the left, render instantly on the right.
- 🎨 **Syntax Highlighting**: Beautiful code blocks with `highlight.js` support.
- 📐 **LaTeX Formulas**: Comprehensive math formula rendering ($inline$ and `$$block$$`) powered by `KaTeX`.
- 🌙 **Dark Mode**: Automatically adapts to your system theme setting for eye comfort.
- ⌨️ **Keyboard Shortcuts & Toolbar**: Rich toolbar with quick insertion tools and native undo/redo stack preservation (e.g., `Ctrl+B`, `Ctrl+I`).
- 📂 **File Operations**: Seamlessly open, edit, and save `.md` and `.txt` files directly on your local system.
- 🌐 **I18n Multi-language Support**: Built-in support for English and Simplified Chinese (zh-CN) UI.
- 🚀 **Cross-Platform**: Lightweight and blazingly fast desktop application for macOS, Windows, and Linux.

## 🛠️ Tech Stack

- **Core**: [Rust](https://www.rust-lang.org/) & [Tauri v2](https://v2.tauri.app/)
- **Frontend**: [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Bundler**: [Vite](https://vitejs.dev/)
- **Markdown Parsing**: [marked](https://marked.js.org/)
- **Syntax Highlighting**: [highlight.js](https://highlightjs.org/)
- **Math Rendering**: [KaTeX](https://katex.org/)

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed to build this project:
- [Bun](https://bun.sh/) or Node.js (npm/yarn/pnpm)
- [Rust](https://www.rust-lang.org/tools/install) (latest stable)
- Basic Tauri CLI prerequisites (refer to the [Tauri Prerequisites guide](https://v2.tauri.app/start/prerequisites/))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/xsbtko/markdown-editor.git
   cd markdown-editor
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

### Development

To start the development server with Hot Module Replacement (HMR) and the Tauri app wrapper:

```bash
bun run tauri dev
```

### Building for Production

To build the optimized application bundle for your current OS:

```bash
bun run tauri build
```
Once complete, you can find the compiled installers/executables in the `src-tauri/target/release/bundle/` directory.

## 📄 License

This project is open-sourced under the [MIT License](LICENSE). 
Author: [xsbtko](https://github.com/xsbtko)
