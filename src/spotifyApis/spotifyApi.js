
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



export async function getUserProfile(accessToken) {

  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  });

  const data = await response.json();
  console.log(data);

  // Safely extract image (users may not have one) 
  
  const imageUrl = data.images && data.images.length > 0 ? data.images[1].url : null;
  //“If data.images exists and contains at least one image, use the first image’s URL; otherwise, return null to safely handle users who don’t have a profile picture.” SPOTIFY RETURNS TWO IMAGES IN THE ARRAY SELECT WHAT SIZE BEST SUIT YOU. 
  return {
    id: data.id,
    name: data.display_name,
    image: imageUrl
  }; 
}
   

export async function savePlayListToSpotify(userId, accessToken, playListName ) {
   const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
    method: 'POST',
    headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
    },
       body: JSON.stringify({
        name: playListName,
        public: false
       })

   }
   );
   
   const data = await response.json();
   console.log(data);
  return data; // contains the new playlist (including playlist.id)

}
export async function addTracksToPlaylist(playlistId, accessToken, uris){
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
       body: JSON.stringify({
        uris: uris
       })
    }
  );
  return response.json(); 
}