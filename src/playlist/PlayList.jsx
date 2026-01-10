import TrackList from '../tracklist/TrackList';
export default function PlayList (props) {

function handleSavePlayList(event) {
     event.preventDefault();
     console.log('saving playlist!');
     props.savePlayListToSpotify(props.userId, props.accessToken, props.playListName)
    
}
 

 return (
<div>
 <form onSubmit={handleSavePlayList}>
   <input type='text' 
          aria-label="Play List Name"
          placeholder="Play List Name"
          value={props.playListName}
          onChange={(e) => props.updatePlayListName(e.target.value)} /> 
<TrackList playList={props.playList} removeFromPlayList={props.removeFromPlayList}/>



<input type="submit" value="Save Playlist to Spotify" />
</form>
</div>
 )
 
}

/*onSavePlaylist={() =>
  savePlayListToSpotify(userId, accessToken, playListName)
}
above can be passed down from app instead of  props.savePlayListToSpotify(props.userId, props.accessToken, props.playListName)






async function handleSavePlaylist() {
  const playlist = await savePlayListToSpotify(
    userId,
    accessToken,
    playListName
  );

  const uris = playList.map(track => track.uri);

  await addTracksToPlaylist(
    playlist.id,
    accessToken,
    uris
  );

  setPlayList([]);
}

*/