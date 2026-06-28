

 // Authorization Code with PKCE   


 // 1. Generate a random code verifier
const generateRandomString = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

// 2. Hash the code verifier using SHA-256 (async)
const sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest('SHA-256', data);
};

// 3. Base64-url encode the hash
const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};

// 4. Prepare PKCE values and build the authorization URL
 export async function preparePKCEAndRedirect() {
  // Generate code verifier
  const codeVerifier = generateRandomString(70);

  // --- CODE CHALLENGE CREATION ---
  // Hash the code verifier
  const hashed = await sha256(codeVerifier);
  // Encode the hash to get the code challenge
  const codeChallenge = base64encode(hashed);
  // --- END CODE CHALLENGE CREATION ---

  // Store codeVerifier for later use (needed for token exchange)
  localStorage.setItem('code_verifier', codeVerifier);

  // Build the authorization URL, including the code challenge
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID; // client id is imported from .env to be kept safe
  
  const redirectUri = 'http://127.0.0.1:5173/'; // Replace with your redirect URI
  const scopes = 'user-read-private playlist-modify-public playlist-modify-private'; // Replace with your needed scopes

  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}&code_challenge=${codeChallenge}&code_challenge_method=S256`;

  // Redirect the user to Spotify login
  window.location = authUrl;
}// Call preparePKCEAndRedirect() when the user clicks "Log in with Spotify"


 export async function getToken(code, setAccessToken) {

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID; // client id is imported from .env to be kept safe

  const redirectUri = 'http://127.0.0.1:5173/'; // Replace with your redirect URI

  // 1. Get the code verifier we saved earlier
  var codeVerifier = localStorage.getItem('code_verifier');
  console.log('code_verifier:', codeVerifier);

  // 2. Spotify token endpoint
  var url = 'https://accounts.spotify.com/api/token';

  // 3. Build the request body// below a more basic way
  var body = new URLSearchParams();
  body.append('client_id', clientId);
  body.append('grant_type', 'authorization_code');
  body.append('code', code);
  body.append('redirect_uri', redirectUri);
  body.append('code_verifier', codeVerifier);

  // 4. Send request to Spotify
  var response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body
  });

  // 5. Convert response to JSON
  var data = await response.json();

  // 6. Save access token for later API calls
  localStorage.setItem('access_token', data.access_token);
  setAccessToken(data.access_token);
}






