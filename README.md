# Batch Renamer Pro (批量文件重命名工具)

A modern, high-performance local batch file renaming tool built with Web technologies (HTML5 / CSS3 / Vanilla JS). It leverages the browser **File System Access API** to operate directly on local files with zero server uploads, 100% privacy, and instant execution.

---

## ✨ Features (功能特性)

### 📂 File Management (文件加载与管理)
- **Direct Directory Access**: Direct folder read & write via the File System Access API with recursive subdirectory scanning.
- **Universal Browser Fallback**: Compatible with non-Chromium browsers via `<input type="file" webkitdirectory>` with one-click export of batch rename scripts (`.bat` / `.sh`).
- **High-Performance Virtual Scrolling**: Smoothly renders 10,000+ files and preview entries using lightweight DOM recycling.
- **Natural Sorting**: Case-insensitive natural numeric sort (e.g., `item1`, `item2`, `item10`) by filename, file size, last modified date, or file extension.
- **Filtering & Selection**: Real-time keyword search, extension dropdown filter, Shift+Click multi-select range selection, and context menu quick actions.

### ⚙️ 9 Versatile Renaming Rules (9 种强大重命名规则)
1. 🔄 **Find & Replace (查找与替换)**:
   - Literal text replacement (safe literal `$` replacement) or Regular Expressions with capture groups (`$1`, `$2`).
   - Quick regex preset chips (Clean Brackets, Strip Media Quality Tags, Space to Underscore).
   - Target scope selector: Base Name, Extension only, or Full Name.
2. ➡️ **Add Prefix (添加前缀)**: Prepend text to filenames.
3. ⬅️ **Add Suffix (添加后缀)**: Append text to filenames before the extension.
4. 📌 **Insert Text (插入字符)**: Insert text at an exact character index from start or from end.
5. 🔢 **Numbering (数字序列)**:
   - Configurable start number, step, and zero-padding (e.g. `001`, `002`).
   - Suffix, prefix, or complete name replacement with custom prefix (e.g. `IMG_001.jpg`).
6. 🔤 **Case Conversion (大小写转换)**:
   - 7 modes: `lowercase`, `UPPERCASE`, `Title Case`, `camelCase`, `PascalCase`, `snake_case`, `kebab-case`.
   - Unicode-aware accents and Chinese/international characters preserved.
7. ✂️ **Remove Characters (删除字符)**:
   - Substring deletion by index & count from start or from end.
   - Quick toggle filters: Remove Spaces, Remove Digits, and Unicode-safe Special Characters removal.
8. 📎 **Extension Manager (扩展名规则)**:
   - Change custom extension, convert to lower/uppercase, or strip extensions completely.
9. 📅 **Date & Time (日期时间)**:
   - Formats: `YYYY-MM-DD`, `YYYYMMDD`, `YYYY_MM_DD`, `YYYY.MM.DD`, `YYYYMMDD_HHmmss`, `YYYY-MM-DD HHmm`, `DD-MM-YYYY`, `YYMMDD`.
   - Source from current system date/time or file's original last modified timestamp.

### 🔍 Real-Time Preview & Inline Editing (实时双向对比与微调)
- **Precision Visual Diff**: Dual-color character-level diff highlighting (`diff-added` and `diff-deleted`).
- **Subdirectory Collision Detection**: Accurately detects filename clashes and collisions across subdirectories in real time.
- **Double-Click Custom Edit**: Double-click any preview cell to manually customize individual file names while keeping rules applied to the rest.

### 💾 Presets & Configuration Backup (预设管理系统)
- Built-in presets for Common Scenarios: Photo Archiving, Code Normalization, Media Filename Sanitization.
- Save, load, and manage custom presets.
- **Export & Import Presets**: Backup all custom presets to a `.json` file and share across devices.

### 📤 Multi-Format Export (日志与脚本导出)
- 📊 **CSV with UTF-8 BOM**: Excel-ready operation log with Unicode characters cleanly rendered without mojibake.
- 📦 **JSON Manifest**: Detailed structured JSON report of all file renaming transformations.
- 💻 **Windows Batch Script (`.bat`)**: Standalone script with UTF-8 (code page 65001) for 1-click execution in command prompt.
- 🐧 **Linux / macOS Shell Script (`.sh`)**: Unix-compatible executable bash script for cross-platform workflows.

### 🛡️ Safety & Undo (安全保障)
- Two-step temporary renaming to guarantee safe handling of case-only renames (e.g. `photo.jpg` -> `PHOTO.JPG`) on Windows case-insensitive filesystems.
- One-click Undo stack (`Ctrl+Z`).
- Confirmation modal before any filesystem modifications.

---

## 🚀 Quick Start (快速开始)

1. Open `index.html` directly in Chrome, Edge, or any modern web browser (or serve locally via any HTTP server).
2. Click **📂 选择文件夹** (Select Folder) and grant folder permissions.
3. Click **＋ 添加规则** (Add Rule) to construct your renaming pipeline.
4. Preview the changes live in the comparison table.
5. Click **✅ 执行重命名** (Execute Rename) to apply, or export a script via the **📤 导出** dropdown.

---

## ⌨️ Keyboard Shortcuts (快捷键)

| Shortcut | Action | 说明 |
| :--- | :--- | :--- |
| `Ctrl + O` | Open Folder | 打开文件夹 |
| `Ctrl + Enter` | Execute Rename | 执行重命名 |
| `Ctrl + Z` | Undo Last Rename | 撤销上次重命名 |
| `Ctrl + A` | Select / Deselect All | 全选 / 取消全选 |
| `Ctrl + Shift + A` | Invert Selection | 反选 |
| `Ctrl + F` | Focus Search | 搜索文件 |
| `Ctrl + R` | Open Rules Menu | 打开添加规则菜单 |
| `Ctrl + E` | Open Export Menu | 导出日志与脚本 |
| `Ctrl + /` | Keyboard Shortcuts Help | 打开快捷键列表 |
| `Escape` | Close Open Modals | 关闭弹窗 |

---

## 📁 File Structure

- `index.html` - Semantic layout, modals, dropdowns, and fallback inputs
- `style.css` - Design system, glassmorphism theme, diff styling, and responsive layout
- `app.js` - Rule engine, File System API integration, virtual scrolling, and export engine
- `sw.js` - Service Worker for offline PWA caching
- `manifest.json` - PWA app configuration

