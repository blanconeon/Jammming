# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://127.0.0.1:5173/
npm run build    # Production build
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Architecture

Jammming89 is a React + Vite app that lets users search Spotify, build a playlist, and save it to their account.

### Auth Flow (PKCE)

Auth lives in [src/spotifyApis/spotifyToken.js](src/spotifyApis/spotifyToken.js):

1. `preparePKCEAndRedirect()` — generates a code verifier, hashes it to a code challenge, stores the verifier in `localStorage`, then redirects to Spotify's `/authorize` endpoint.
2. Spotify redirects back to `http://127.0.0.1:5173/` with `?code=...` in the URL.
3. `getToken(code, setAccessToken)` — exchanges the code + stored verifier for an access token via `POST /api/token`, then calls `setAccessToken` to store it in React state. The URL is immediately cleaned with `window.history.replaceState` to prevent the code from being reused on re-renders (which causes a 400 error).

### Spotify API Layer

All Spotify calls are in [src/spotifyApis/spotifyApi.js](src/spotifyApis/spotifyApi.js):

- `getMusic(token, query, setResult)` — searches tracks, maps results to `{ id, name, artist, album, uri }`, calls `setResult`.
- `getUserProfile(accessToken)` — fetches `/v1/me`, returns `{ id, name, image }`. Spotify returns two image sizes; index `[1]` is used.
- `savePlayListToSpotify(userId, accessToken, playListName)` — creates a private playlist, returns the full playlist object (including `playlist.id` needed for the next step).
- `addTracksToPlaylist(playlistId, accessToken, uris)` — adds track URIs to the created playlist.

Saving a playlist is a two-step async sequence in [src/playlist/PlayList.jsx](src/playlist/PlayList.jsx): create first, then add tracks using the returned `playlist.id`.

### State & Data Flow

All state lives in [src/App.jsx](src/App.jsx) and is passed down via props:

| State | Purpose |
|---|---|
| `accessToken` | Drives `isLoggedIn`; gates the entire app UI |
| `result` | Search results array from Spotify |
| `playList` | Tracks the user has added to their playlist |
| `playListName` | Controlled input for the playlist name |
| `userId` / `userName` / `userImage` | Loaded after token is set |

Track objects flowing through the app have shape: `{ id, name, artist, album, uri }`.

### Component Tree

```
App
├── SearchBar         — controlled form, calls getMusic on submit
├── SearchResults     — renders result[], + button adds track to playList via handleCheck
└── PlayList
    ├── input         — playlist name
    ├── TrackList
    │   └── Track[]   — − button removes track via removeFromPlayList
    └── submit        — disabled until name + tracks exist; triggers two-step Spotify save
```

### Styling

All styles use CSS Modules located in [src/cssModules/](src/cssModules/). Each component imports its own module file.

### Credentials

The Spotify `clientId` (`aa0c6d616280473e980cd52bd6028a41`) and `redirectUri` (`http://127.0.0.1:5173/`) are hardcoded in `spotifyToken.js`. The redirect URI must match exactly what is registered in the Spotify Developer Dashboard.
