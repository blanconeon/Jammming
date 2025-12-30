
export default async function accessToken(setToken) {
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
    setToken(json.access_token);
    } catch (err) {
        console.error(err);
    }
    }