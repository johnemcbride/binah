# Binah AI Web SDK Sample App

This project is a demonstration tool for the [Binah AI](https://www.binah.ai/) plugin, showcasing how to integrate and use the Binah AI Web SDK in a modern React web application. The app measures vital signs (such as heart rate, breathing rate, blood pressure, and more) using a device camera, leveraging Binah's AI-powered algorithms compiled to WebAssembly.

---

## 📝 Quick Start: Cloning & Pre-setting the License Key

To get started quickly without entering the license key in the UI:

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd <your-repo-directory>
   ```
2. **Install dependencies and run the app as described below.**

---


## 🧑‍💻 Tech Stack & Key Features

- **Frontend:** React 18+, TypeScript, styled-components
- **Build Tool:** Vite (see `vite.config.ts`)
- **Routing:** react-router-dom v7+
- **Binah SDK:** Integrated via local tarball (`binah-web-sdk-v4.12.1-8.tgz`), loaded as a dependency
- **WebAssembly:** Binah SDK runs as a WASM binary for high-performance signal processing
- **UI/Branding:** NHS UK CSS, NHSUK React Components
- **State/UX:** React hooks, local storage for persisting vital signs
- **Other:** SASS for custom styles, SVG support, HTTPS local dev

---

## 📁 Project Structure

- `src/` — Main React source code (components, hooks, pages, styles)
- `public/` — Static assets, WASM binaries, NHS UK CSS/JS, Binah SDK artifacts
- `binah-web-sdk-v4.12.1-8.tgz` — Binah AI Web SDK package (local dependency)
- `vite.config.ts` — Vite configuration, including plugins for React, SVG, and copying SDK assets
- `index.html` — HTML entry point, loads the React app and required styles/scripts

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)
- HTTPS certificates: `localhost-key.pem` and `localhost.pem` in the project root (for local HTTPS)

### Install Dependencies

```bash
npm install
# or
yarn install
```

### Start Development Server

```bash
npm run dev
# or
yarn dev
```

- The app will open at [https://localhost:8000](https://localhost:8000) (or your configured port).
- Make sure to allow camera access in your browser.

### Build for Production

```bash
npm run build
# or
yarn build
```

- Output will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## 🔑 Setting the Binah SDK License Key

To use the Binah AI SDK, you must provide a valid license key. The app does **not** include a license key by default.

1. Start the app as described above.
2. Open the **Settings** panel (usually accessible via a settings button or sidebar).
3. Enter your Binah SDK license key in the **License Key** field.
4. The app will validate the license and enable measurement features if the key is valid.

> **Note:** The license key is stored locally in your browser and can be changed or reset at any time via the Settings panel. If no license key is set, the app will prompt you to enter one before you can use measurement features.

---

## 🛠️ Deployment

- The production build is static and can be served by any static file server.
- Ensure the `public/` directory and all WASM/model files are included in your deployment.
- HTTPS and cross-origin isolation are required for full SDK functionality (especially for WASM threading).

---

## 🌐 Hosting Suggestions

This app is a static site and can be hosted on any platform that supports static file hosting. Here are some popular options:

### Vercel
- [Vercel](https://vercel.com/) offers seamless deployment for Vite/React apps.
- **Note:** For full WASM and Binah SDK functionality, you must enable HTTPS and set custom headers for cross-origin isolation. Use a `vercel.json` config to set headers:
  ```json
  {
    "headers": [
      {
        "source": "/(.*)",
        "headers": [
          { "key": "Cross-Origin-Opener-Policy", "value": "same-origin" },
          { "key": "Cross-Origin-Embedder-Policy", "value": "require-corp" }
        ]
      }
    ]
  }
  ```

### Netlify
- [Netlify](https://www.netlify.com/) supports static site hosting with custom headers via a `_headers` file in the `public/` directory:
  ```
  /*
    Cross-Origin-Opener-Policy: same-origin
    Cross-Origin-Embedder-Policy: require-corp
  ```
- Place this file in `public/_headers` before building.

### GitHub Pages
- [GitHub Pages](https://pages.github.com/) can serve static sites, but does **not** support custom headers for cross-origin isolation. This may limit WASM threading and some SDK features.
- For full functionality, use a platform that allows custom headers.

### AWS S3 + CloudFront
- Host the `dist/` output in an S3 bucket and serve via CloudFront.
- Set custom headers in CloudFront behaviors for cross-origin isolation.
- Ensure HTTPS is enabled.

### Azure Static Web Apps
- [Azure Static Web Apps](https://azure.microsoft.com/en-us/products/app-service/static/) supports static hosting and custom headers via `staticwebapp.config.json`.
- Example:
  ```json
  {
    "globalHeaders": {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp"
    }
  }
  ```

---

**Important:**
- For the Binah Web SDK to work fully (especially with WASM and threading), your host must serve over HTTPS and set the required cross-origin headers.
- Always test your deployment in production mode to ensure all SDK features work as expected.

---

## ⚙️ Customization

- **Vital Signs Displayed:** Controlled in `src/hooks/useMonitor.ts` and `src/components/BinahMonitor.tsx`.
- **UI/Branding:** Modify styles in `src/style/` or replace NHS UK assets as needed.
- **SDK Version:** Update the `@binah/web-sdk` dependency and the local tarball as required.

---

## 📚 Notable Files

- `src/components/BinahMonitor.tsx` — Main integration point for the Binah SDK.
- `src/hooks/useMonitor.ts` — React hook encapsulating SDK session logic.
- `vite.config.ts` — Vite and asset pipeline configuration.
- `public/` — Contains WASM, models, and static assets required by the SDK.

---

## 🧩 Third-Party & External Assets

- **NHS UK Frontend:** Used for UI components and styling.
- **Binah AI SDK:** Proprietary, distributed as a local tarball and WASM binaries.

---

## ❓ Troubleshooting

- **Camera Access:** Ensure your browser allows camera access and is running on HTTPS.
- **WASM/SharedArrayBuffer:** Some features require cross-origin isolation; see Vite config and browser console for errors.
- **SDK License:** A valid Binah SDK license key is required for full functionality.

---

*This README was generated by inspecting the codebase and configuration. For further details, consult the code or contact the project maintainer.*
