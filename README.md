# AnchorzUp Technical Task — URL Shortener

Technical task submission for the **Software Developer** position at **AnchorzUp**.

I chose **React** and **Node.js** as the stack because they are the most natural fit for a lightweight web application like this — React's component model maps cleanly to a UI that needs reactive state (live link list, click counts, expiry timers), and Node/Express keeps the backend minimal and in the same language ecosystem, reducing context-switching overhead.

---

## Overview

A URL shortener with a management dashboard. Users paste a long URL, optionally set an expiry window, and the system generates a short ID, stores it, and produces a QR code. The dashboard lists all shortened links with click counts, expiry status, and deletion controls.

**Core features:**

- Shorten any `https://www.*` URL to a 5-character short ID
- QR code generation (Base64 data URL, rendered inline)
- Optional link expiration — client specifies a duration; the UI auto-deletes expired entries
- Click tracking — each link open increments a counter via a dedicated PUT endpoint
- Duplicate URL rejection (400 if the original URL already exists)
- Polling — frontend re-fetches the link list every 10 seconds

---

## Technical Implementation

### Backend — Node.js / Express

- **Runtime:** Node.js with ES modules (`"type": "module"`)
- **Framework:** Express — JSON body parsing, `helmet` for security headers, `cors`, `morgan` for HTTP logging (dev only)
- **Database:** MongoDB via Mongoose; URI injected via `.env`
- **ID generation:** `nanoid(5)` for short IDs
- **QR codes:** `qrcode` package generates a Base64 data URL stored directly on the document
- **Logging:** `debug` package, enabled with `DEBUG=app:log`
- **Auth:** None — open API by design for this scope

**API — `/api/v1/urls`**

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/` | Return all URL documents |
| `POST` | `/` | Create a shortened URL (validates `originalUrl`, generates `shortId` + QR) |
| `DELETE` | `/:shortId` | Delete by short ID |
| `PUT` | `/:shortId/click` | Increment click count |

**Mongoose model fields:** `originalUrl`, `shortUrl`, `shortId`, `qrCode`, `clickCount`, `expiration`

### Frontend — React / Vite

- **Build tool:** Vite 6 with `@vitejs/plugin-react`
- **UI library:** Chakra UI v3 (`createSystem` + `defaultConfig`)
- **State management:** React Context + `useReducer` — a single `GlobalContext` holds the URL list and dispatches `ADD_URL`, `DELETE_URL`, `GET_URLS` actions via `AppReducer`
- **HTTP:** axios (installed at root, consumed in `GlobalState.jsx`) against `http://localhost:5000`
- **Animations:** framer-motion

**Component structure:**

```
src/
├── context/
│   ├── GlobalState.jsx   # Context provider, axios calls, polling logic
│   └── AppReducer.jsx    # Pure reducer for URL list state
└── components/
    ├── MainGrid/          # Top-level layout shell
    ├── PanelGrid/         # Sidebar — expiry checking, auto-delete logic
    ├── InputUrl/          # URL input form + submission
    ├── LinkList/          # Renders the list of shortened links
    ├── DropDownMenu/      # Per-link actions (open, delete, show QR)
    └── AddUrlButton/      # Shared trigger button
```

**Expiry logic** lives client-side in `PanelGrid`: on an interval it compares stored expiration strings against the current time and calls the DELETE endpoint for any expired entries.

---

## Prerequisites

- Node.js v16+
- npm v8+
- MongoDB (local instance or Atlas URI)

---

## Setup

1. **Clone**
   ```bash
   git clone https://github.com/arben-grepi/AnchorzUpTechnicalTask.git && cd AnchorzUpTechnicalTask
   ```

2. **Install dependencies**
   ```bash
   npm i && cd react-client/ && npm i && cd ..
   ```

3. **Create `.env` in the project root**
   ```plaintext
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/AnchorzUp
   PORT=5000
   DEBUG=app:log
   ```
   `DEBUG` is optional — omit it to suppress verbose backend logs.

---

## Run

**Both servers concurrently (from root):**
```bash
npm start
```

**Or separately for cleaner logs:**

```bash
# Terminal 1 — backend
node index.js

# Terminal 2 — frontend
cd react-client && npm run dev
```

Backend runs on `http://localhost:5000`, Vite dev server on `http://localhost:5173`.
