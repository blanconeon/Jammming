# Jammming89

A React + Vite web app that lets you search Spotify, build a custom playlist, and save it directly to your Spotify account — all in the browser.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Spotify Developer Setup](#spotify-developer-setup)
- [PKCE OAuth Flow — Deep Dive](#pkce-oauth-flow--deep-dive)
- [Project Structure](#project-structure)
- [How to Use](#how-to-use)

---

## Features

- Log in securely with your Spotify account (no backend required)
- Search for any track using the Spotify API
- Add tracks to a custom playlist
- Name your playlist and save it directly to your Spotify library

---

## Tech Stack

- **React 18** — UI and state management
- **Vite** — dev server and bundler
- **Spotify Web API** — search and playlist endpoints
- **PKCE OAuth 2.0** — secure, backend-free authentication
- **CSS Modules** — scoped component styles
- **Lucide React** — icons

---

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app runs at `http://127.0.0.1:5173/`. This exact URL must be registered as a Redirect URI in your Spotify app (see below).

```bash
npm run build    # Production build
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

---

## Spotify Developer Setup

1. Go to [developer.spotify.com/dashboard](https://developer.spotify.com/dashboard) and create an app.
2. In your app settings, add `http://127.0.0.1:5173/` as a **Redirect URI**.
3. Copy your **Client ID** and paste it into `src/spotifyApis/spotifyToken.js` where `clientId` is defined.
4. Ensure the following scopes are requested (already configured in the code):
   - `user-read-private`
   - `playlist-modify-public`
   - `playlist-modify-private`

---

## PKCE OAuth Flow — Deep Dive

Jammming89 uses the **Authorization Code with PKCE** (Proof Key for Code Exchange) flow. This allows the app to authenticate users with Spotify without ever exposing a client secret — making it safe to run entirely in the browser.

### Why PKCE?

Traditional OAuth requires a **client secret** to exchange an authorization code for an access token. In a browser app, that secret would be visible to anyone — which defeats its purpose. PKCE replaces the secret with a cryptographic challenge generated fresh for each login, eliminating the need for a backend server.

---

### Step-by-Step Breakdown

#### Step 1 — Generate a Code Verifier

```
User clicks "Sign in with Spotify"
        ↓
preparePKCEAndRedirect() is called
        ↓
A random 70-character string is generated (the code verifier)
```

The **code verifier** is a high-entropy random string. It is the secret that only the browser knows.

```js
const codeVerifier = generateRandomString(70);
localStorage.setItem('code_verifier', codeVerifier);
```

It is stored in `localStorage` because the page will redirect away — React state would be lost.

---

#### Step 2 — Create a Code Challenge

The code verifier is never sent to Spotify directly. Instead, it is hashed using **SHA-256** and then **Base64-URL encoded** to produce a **code challenge**.

```
code verifier  →  SHA-256 hash  →  Base64-URL encode  →  code challenge
```

```js
const hashed = await sha256(codeVerifier);        // SHA-256 via Web Crypto API
const codeChallenge = base64encode(hashed);       // URL-safe Base64, no padding
```

The code challenge is safe to send publicly — it cannot be reversed to reveal the verifier.

---

#### Step 3 — Redirect to Spotify Authorization

The app builds a Spotify authorization URL and redirects the browser to it:

```
https://accounts.spotify.com/authorize
  ?client_id=<your_client_id>
  &response_type=code
  &redirect_uri=http://127.0.0.1:5173/
  &scope=user-read-private playlist-modify-public playlist-modify-private
  &code_challenge=<code_challenge>
  &code_challenge_method=S256
```

Spotify stores the code challenge. The user logs in and approves the requested scopes.

---

#### Step 4 — Spotify Redirects Back with an Authorization Code

After the user approves, Spotify redirects back to your app:

```
http://127.0.0.1:5173/?code=AQD...xyz
```

The `?code=...` in the URL is the **authorization code** — a short-lived, one-time-use token. It is not the access token yet.

In `App.jsx`, a `useEffect` detects this code on mount:

```js
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');

useEffect(() => {
  async function settingAccessToken() {
    if (code) {
      await getToken(code, setAccessToken);
      window.history.replaceState({}, document.title, '/'); // clean the URL
    }
  }
  settingAccessToken();
}, [code]);
```

The URL is immediately cleaned with `window.history.replaceState` to remove `?code=...`. Without this, React re-renders would try to reuse the code on every render, causing a **400 Bad Request** error from Spotify (authorization codes are single-use).

---

#### Step 5 — Exchange the Code for an Access Token

`getToken()` sends a `POST` request to Spotify's token endpoint, including the **original code verifier** retrieved from `localStorage`:

```js
POST https://accounts.spotify.com/api/token
Content-Type: application/x-www-form-urlencoded

client_id=<your_client_id>
grant_type=authorization_code
code=<authorization_code>
redirect_uri=http://127.0.0.1:5173/
code_verifier=<the_original_verifier>
```

Spotify hashes the verifier it receives and compares it to the code challenge it stored in Step 3. **If they match, the exchange succeeds.** This proves the entity requesting the token is the same one that started the flow — without any shared secret.

```js
const data = await response.json();
setAccessToken(data.access_token);
```

The access token is stored in React state and used for all subsequent Spotify API calls.

---

### PKCE Flow Summary

```
Browser                                    Spotify
  |                                           |
  |-- Generate code_verifier (random) ------->|
  |-- Hash it → code_challenge               |
  |                                           |
  |-- GET /authorize?code_challenge=... ----->|
  |                              (user logs in, approves)
  |<-- Redirect with ?code=... --------------|
  |                                           |
  |-- Clean URL (replaceState) ------------->|
  |                                           |
  |-- POST /api/token                        |
  |    code=...                              |
  |    code_verifier=...  ----------------->|
  |              (Spotify verifies: hash(verifier) == challenge)
  |<-- access_token -----------------------  |
  |                                           |
  |-- API calls with Bearer token ---------->|
```

---

## Project Structure

```
src/
├── App.jsx                     # Root component; all state lives here
├── spotifyApis/
│   ├── spotifyToken.js         # PKCE auth: preparePKCEAndRedirect, getToken
│   └── spotifyApi.js           # Spotify API: search, user profile, save playlist
├── searchbar/
│   └── SearchBar.jsx           # Search input form
├── searchresults/
│   └── SearchResults.jsx       # Renders search results with + button
├── playlist/
│   └── PlayList.jsx            # Playlist name input, save button, TrackList
├── tracklist/
│   └── TrackList.jsx           # Maps playlist to Track components
├── track/
│   └── Track.jsx               # Single track row with − remove button
└── cssModules/                 # CSS Module files (one per component)
```

---

## How to Use

1. Click **Sign in with Spotify** and log in with your account.
2. Type a song title in the search bar and press Enter or click the search icon.
3. Click **+** next to any track to add it to your playlist.
4. Click **−** on a playlist track to remove it.
5. Give your playlist a name in the input field.
6. Click **Save Playlist to Spotify** — the playlist will appear in your Spotify library.
