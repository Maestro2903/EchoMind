# EchoMind
# EchoMind 🚀

A fast, privacy-first desktop AI assistant with a beautiful UI, built with Electron + Next.js. Runs locally or with your own API keys.

## ✨ Features
- 🧠 Local or cloud AI execution
- 🎧 Live listening and summaries
- 🔐 Privacy-first by default
- 🖥️ Cross-platform packaging (macOS, Linux, Windows)
- 🔌 Pluggable providers (OpenAI, Gemini, Anthropic, etc.)

## 🛠️ Prerequisites
- Node.js 18+ (20+ recommended), npm
- macOS (for building mac apps), Linux (for Linux x64), Windows (for Windows installers)
- For native modules (better-sqlite3, keytar):
  - macOS: Xcode Command Line Tools
  - Linux: build-essential, python3, libx11-dev, libxkbfile-dev
  - Windows: Build Tools for Visual Studio + Python

Note: Avoid spaces in your project path when building native modules.

## 📦 Project Structure
# EchoMind 🚀

A fast, privacy-first desktop AI assistant with a beautiful UI, built with Electron + Next.js. Runs locally or with your own API keys.

## ✨ Features
- 🧠 Local or cloud AI execution
- 🎧 Live listening and summaries
- 🔐 Privacy-first by default
- 🖥️ Cross-platform packaging (macOS, Linux, Windows)
- 🔌 Pluggable providers (OpenAI, Gemini, Anthropic, etc.)

## 🛠️ Prerequisites
- Node.js 18+ (20+ recommended), npm
- macOS (for building mac apps), Linux (for Linux x64), Windows (for Windows installers)
- For native modules (better-sqlite3, keytar):
  - macOS: Xcode Command Line Tools
  - Linux: build-essential, python3, libx11-dev, libxkbfile-dev
  - Windows: Build Tools for Visual Studio + Python

Note: Avoid spaces in your project path when building native modules.

## 📦 Project Structure


## 🚴‍♂️ Quick Start (Dev)
- Terminal 1 (Web):
  ```bash
  cd echomind_web
  npm install
  npm run dev
  ```
- Terminal 2 (Electron):
  ```bash
  cd ..
  npm install
  npm start
  ```

Or use the one-time helper:
```bash
npm run setup
```

## 🔧 Environment (optional)
Create a `.env` in the repo root if needed:
```bash
# Example (most values are auto-managed)
NODE_ENV=development
```

## 🖼️ App Icon
- macOS packaging uses: `src/ui/assets/logo.icns`
- Windows packaging uses: `src/ui/assets/logo.ico`
- Linux packaging uses: `src/ui/assets/icon.png`

During dev on macOS, the Dock icon is set at runtime. Packaging will always use the files above.

## 🧪 Build the Web + Renderer
```bash
npm run build:all
```

## 📦 Package Apps (outputs to hazylabs/)
- macOS (Universal DMG + ZIP):
  ```bash
  npx electron-builder --mac -c.directories.output="hazylabs/mac" --publish never
  ```
- Linux (AppImage + tar.gz):
  ```bash
  npx electron-builder --linux -c.directories.output="hazylabs/linux" --publish never
  ```
- Windows (NSIS):
  ```bash
  # Run this on Windows for native deps (recommended):
  npx electron-builder --win -c.directories.output="hazylabs/win" --publish never
  ```
  Note: Building Windows artifacts from macOS/Linux can fail due to node-gyp cross-compile limits. Prefer building on Windows.

## 🐙 GitHub (first push)
```bash
git init
git add -A
git commit -m "chore: initial import"
git branch -M main
git remote add origin https://github.com/Maestro2903/EchoMind.git
git push -u origin main
```

## 🧹 .gitignore (already included)


## 🧩 Troubleshooting
- ❌ node-gyp / better-sqlite3 build errors:
  - Ensure no spaces in your project path
  - Install platform build tools (see Prerequisites)
  - Build Windows artifacts on Windows
- ❌ Dock icon doesn’t change in dev:
  - Packaging uses the correct icons; dev can use .png fallback

## 🤝 Contributing
- Fork, create a feature branch, and open a PR
- Keep UI minimal and fast; avoid regressions
- Use conventional commits (e.g., feat:, fix:, chore:)

## 🔒 License
GPL-3.0

## 🙏 Acknowledgments
Thanks to the Electron, Next.js, and open-source communities.
