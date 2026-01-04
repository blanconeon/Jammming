
export default async function accessToken(setToken, setTokenTimeOut) {
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'grant_type=client_credentials&client_id=aa0c6d616280473e980cd52bd6028a41&client_secret=a7e5af7ab1764b5ebd2fc31e91b5d98a'

    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const json = await response.json();
    console.log(json);
    const expirationTime = Date.now() + json.expires_in * 1000; //collects expiry time, 3600 secs is returnes, times 1000 to match setTimeOut's format.  
    setTokenTimeOut(expirationTime);
    setToken(json.access_token);
    } catch (err) {
        console.error(err);
    }
    }
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
  const clientId = 'aa0c6d616280473e980cd52bd6028a41'; // Replace with your actual client ID
  const redirectUri = 'http://127.0.0.1:5173/'; // Replace with your redirect URI
  const scopes = 'playlist-modify-public playlist-modify-private'; // Replace with your needed scopes

  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}&code_challenge=${codeChallenge}&code_challenge_method=S256`;

  // Redirect the user to Spotify login
  window.location = authUrl;
}

// Call preparePKCEAndRedirect() when the user clicks "Log in with Spotify"


