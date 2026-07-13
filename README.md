# Batch Renamer Pro

A powerful local batch file renaming tool built with Web technologies (HTML/CSS/JS). It uses the modern browser File System Access API to operate directly on local files securely without any server-side uploads.

## Features

- **📂 Local File Access**: Use the browser's File System Access API to select folders and process files completely locally.
- **⚙️ 8 Multi-rules Support (Stackable & Reorderable)**:
  - 🔄 **Find & Replace**: Standard text or Regular Expression replacement (with case-sensitive option).
  - ➡️ **Add Prefix**: Insert text at the start of filenames.
  - ⬅️ **Add Suffix**: Append text at the end of filenames.
  - 🔢 **Numbering**: Add incremental sequences (start, step, digits, separator, and position).
  - 🔤 **Case Conversion**: Lowercase, Uppercase, Title Case, Camel Case, and Snake Case.
  - ✂️ **Remove Characters**: Remove substring by position/length, or strip spaces and special characters.
  - 📎 **Change Extension**: Modify file extensions easily.
  - 📅 **Insert Date**: Current date or file last modified date (with custom formats and positions).
- **👀 Real-time Preview**:
  - Live side-by-side comparison of original vs. new filenames.
  - Character-level difference highlighting.
  - Smart collision & duplicate detection (highlights warning in red).
- **🔒 Safety Mechanisms**:
  - Double confirmation dialog before executing write operations.
  - Complete history undo (Ctrl+Z or undo button).
  - Clean Toast notifications for success/error events.
- **🎨 Premium UI**: Modern deep-dark glassmorphic interface with vibrant gradients, fluid micro-interactions, responsive grid layout, and drag-and-drop rule ordering.

## Usage

Simply open [index.html](index.html) in any modern Chromium browser (Chrome or Edge).
1. Click **📂 选择文件夹** (Select Folder) and grant directory write access.
2. Click **＋ 添加规则** (Add Rule) and configure the renaming options.
3. Check the live preview below.
4. Press **✅ 执行重命名** (Execute Rename) to apply the changes.

## File Structure

- `index.html` - App structure
- `style.css` - CSS Design system & glassmorphism theme
- `app.js` - Main rules engine & File System integration
