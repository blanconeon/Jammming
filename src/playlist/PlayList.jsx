import TrackList from '../tracklist/TrackList';
export default function PlayList (props) {

async function handleSavePlayList(event) {
    event.preventDefault();
    const playlist = await props.savePlayListToSpotify(
    props.userId,
    props.accessToken,
    props.playListName
  );

  const uris = props.playList.map(track => track.uri);

  await props.addTracksToPlaylist(
    playlist.id,
    props.accessToken,
    uris
  );
    
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
    props.userId,
    props.accessToken,
    props.playListName
  );

  const uris = props.playList.map(track => track.uri);

  await addTracksToPlaylist(
    playlist.id,
    props.accessToken,
    uris
  );
}

  event.preventDefault();
*/