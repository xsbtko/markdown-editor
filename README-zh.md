# MdEditor

[English](README.md) | 中文

一款简洁、优雅且轻量级的 Markdown 编辑器，提供类似 Typora 的所见即所得实时预览体验。基于 [Tauri v2](https://v2.tauri.app/)、[React](https://react.dev/) 和 [TypeScript](https://www.typescriptlang.org/) 构建。

## ✨ 功能特性

- 📝 **实时预览**：双栏设计。左侧编辑，右侧即时渲染。
- 🎨 **语法高亮**：通过 `highlight.js` 支持漂亮的代码块高亮显示。
- 📐 **LaTeX 公式**：借助 `KaTeX` 提供强大的数学公式渲染能力（支持 $行内公式$ 和 `$$块级公式$$`）。
- 🌙 **暗黑模式**：自动适配系统的主题设置，保护眼睛。
- ⌨️ **快捷键与工具栏**：丰富的工具栏提供快速插入功能，同时原生保留了撤销/重做堆栈支持（例如 `Ctrl+B`、`Ctrl+I` 等快捷键）。
- 📂 **文件操作**：可直接在本地系统中无缝打开、编辑和保存 `.md` 与 `.txt` 文件。
- 🌐 **多语言支持 (i18n)**：内置英语和简体中文 (zh-CN) 界面支持。
- 🚀 **跨平台**：适用于 macOS、Windows 和 Linux 的轻量且运行极快的桌面应用程序。

## 🛠️ 技术栈

- **核心层**：[Rust](https://www.rust-lang.org/) & [Tauri v2](https://v2.tauri.app/)
- **前端层**：[React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **打包工具**：[Vite](https://vitejs.dev/)
- **Markdown 解析**：[marked](https://marked.js.org/)
- **代码高亮**：[highlight.js](https://highlightjs.org/)
- **数学公式渲染**：[KaTeX](https://katex.org/)

## 🚀 快速开始

### 运行环境前置要求

在构建此项目之前，请确保您已安装以下组件：
- [Bun](https://bun.sh/) 或 Node.js (npm/yarn/pnpm)
- [Rust](https://www.rust-lang.org/tools/install) (最新稳定版)
- 基础的 Tauri CLI 环境配置 (请参考 [Tauri 前置环境指南](https://v2.tauri.app/zh-cn/start/prerequisites/))

### 安装

1. 克隆此存储库：
   ```bash
   git clone https://github.com/xsbtko/markdown-editor.git
   cd markdown-editor
   ```

2. 安装依赖：
   ```bash
   bun install
   ```

### 本地开发

运行以下命令，即可启动带有热更新（HMR）配置的开发服务器及 Tauri 客户端套件：

```bash
bun run tauri dev
```

### 构建生产版本

如需为当前的操作系统构建并打包优化过后的应用程序：

```bash
bun run tauri build
```
构建完成后，您可以在 `src-tauri/target/release/bundle/` 目录中找到已编译的安装包/可执行文件。

## 📄 开源许可证

本项目基于 [MIT License](LICENSE) 协议开源。
作者：[xsbtko](https://github.com/xsbtko)
