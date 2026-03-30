# 构建指南

## 使用 GitHub Actions 自动构建（推荐）

本项目已配置 GitHub Actions 工作流，可自动构建 Windows、macOS 和 Linux 版本。

### 方法一：自动发布 Release

1. 推送标签到 GitHub：
```bash
git tag v0.1.0
git push origin v0.1.0
```

2. GitHub Actions 会自动构建所有平台版本并创建 Release

### 方法二：手动触发构建

1. 打开 GitHub 仓库页面
2. 点击 **Actions** 标签
3. 选择 **Build** 工作流
4. 点击 **Run workflow**
5. 等待构建完成后，在 Artifacts 中下载对应平台的安装包

---

## 本地构建

### macOS / Linux

```bash
# 安装依赖
bun install

# 开发模式
bun run tauri dev

# 构建发布版本
bun run tauri build
```

### Windows（在 Windows 机器上）

**前置要求：**
- 安装 [Node.js](https://nodejs.org/)
- 安装 [Rust](https://rustup.rs/)
- 安装 Bun: `npm install -g bun`
- 安装 Visual Studio Build Tools（包含 C++ 构建工具）

**构建步骤：**

```powershell
# 克隆仓库
git clone <your-repo-url>
cd MdEditor

# 安装依赖
bun install

# 构建 Windows 版本
bun run tauri build
```

构建产物位置：
- MSI 安装包：`src-tauri/target/release/bundle/msi/`
- NSIS 安装包：`src-tauri/target/release/bundle/nsis/`
- 可执行文件：`src-tauri/target/release/mdeditor.exe`

---

## 交叉编译（高级）

在 macOS/Linux 上交叉编译 Windows 版本需要额外配置：

### 1. 安装交叉编译工具链

```bash
# macOS
brew install mingw-w64

# 添加 Windows 目标
rustup target add x86_64-pc-windows-gnu
```

### 2. 配置 Cargo

创建/编辑 `src-tauri/.cargo/config.toml`：

```toml
[target.x86_64-pc-windows-gnu]
linker = "x86_64-w64-mingw32-gcc"
```

### 3. 修改 Tauri 配置

编辑 `src-tauri/tauri.conf.json`，将 `bundle.windows.wix` 改为 `null`（MSI 不支持交叉编译）：

```json
{
  "bundle": {
    "windows": {
      "wix": null,
      "nsis": {}
    }
  }
}
```

### 4. 构建

```bash
bun run tauri build --target x86_64-pc-windows-gnu
```

**注意：** 交叉编译可能遇到依赖问题，建议使用 GitHub Actions。

---

## 输出文件说明

### Windows
- `.msi` - Windows Installer 安装包
- `.exe` - NSIS 安装程序（推荐，体积更小）

### macOS
- `.dmg` - 磁盘镜像安装包
- `.app` - 应用程序包

### Linux
- `.AppImage` - 便携版本（推荐）
- `.deb` - Debian/Ubuntu 安装包
