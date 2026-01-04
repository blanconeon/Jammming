
export default async function getMusic(token, searchInput, setResult ) {
   const query = encodeURIComponent(searchInput);
  try {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Add other headers if needed
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const apiResponseData = await response.json();
    // Do something with data
    console.log(apiResponseData);
    const simplifiedTracks = apiResponseData.tracks.items.map(track => ({
     id: track.id,
     name: track.name,
     artist: track.artists[0].name,
     album: track.album.name,
     uri: track.uri
   }));
     console.log(simplifiedTracks);
     setResult(simplifiedTracks);

    //return apiResponseData;
  } catch (error) {
    // Handle error
    console.error(error);
  }
}

    /*async function codeToToken() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
            await fetch ("https://accounts.spotify.com/api/token", { method: 'POST',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
    },
     body: new URLSearchParams({
     client_id: 'aa0c6d616280473e980cd52bd6028a41',
      grant_type: 'authorization_code',
      code,
      redirect_uri: 'http://127.0.0.1:5173/',
      code_verifier: codeVerifier,
    }),
    })}} */