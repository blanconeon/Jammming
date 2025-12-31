
export default async function getMusic(token, searchInput ) {
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
    console.log(apiResponseData)
    //return apiResponseData;
  } catch (error) {
    // Handle error
    console.error(error);
  }
}
