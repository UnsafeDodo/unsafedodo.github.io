# Season Pass Builder

A fully static, client-side tool for creating and managing Minecraft Season Pass configurations with JSON export to ZIP files.

## Features

- 🎮 Minecraft-inspired dark theme with pixel font
- 📝 7-step wizard for complete configuration
- ✅ Real-time validation and live preview
- 💾 Export separate JSON files organized in ZIP
- 🖥️ Responsive design optimized for desktop
- 🚀 Fully static - works on GitHub Pages

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### Build for Production

```bash
npm run build
```

The static files will be in the `dist/` folder, ready to deploy.

## Deployment to GitHub Pages

# Deploying as a Subpage to Existing GitHub Pages

## Option 1: Manual Deployment (Recommended for subpages)

1. **Update the base path** in `vite.config.ts`:
   ```ts
   base: "/your-subdirectory-name/",
   ```

2. **Build the project locally**:
   ```bash
   npm install
   npm run build
   ```

3. **Copy the dist folder** to your existing GitHub Pages repository:
   - If your main site is at `username.github.io`, copy the `dist` folder contents to a subdirectory like `username.github.io/season-pass-builder/`
   - The app will be accessible at `https://username.github.io/season-pass-builder/`




   

## Option 2: Separate Repository with GitHub Actions

1. **Update the base path** in `vite.config.ts` to match your repository name:
   ```ts
   base: "/season-pass-builder/",
   ```

2. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/season-pass-builder.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: GitHub Actions
   - The workflow will automatically deploy

4. **Access your app**:
   - Main site: `https://username.github.io`
   - Season Pass Builder: `https://username.github.io/season-pass-builder/`

## File Structure Example

If your main GitHub Pages repo structure is:
```
username.github.io/
├── index.html (your main site)
├── about.html
├── season-pass-builder/    ← Copy dist contents here
│   ├── index.html
│   ├── assets/
│   └── ...
└── other-pages/
```

Then visitors can access:
- Main site: `https://username.github.io/`
- Season Pass Builder: `https://username.github.io/season-pass-builder/`

MIT
