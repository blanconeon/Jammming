import TrackList from '../tracklist/TrackList';
import listcss from '../cssModules/playlistcss.module.css';
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
 
//  Derived boolean: can we save?
  const canSave = props.playListName && props.playList.length > 0;
 return (
<div>
 <form onSubmit={handleSavePlayList} className={listcss.playlistcontainer}>
   <input className={listcss.inputbox} type='text' 
          aria-label="New Play List Name"
          placeholder="New Play List Name"
          value={props.playListName}
          onChange={(e) => props.updatePlayListName(e.target.value)}
           /> 
<div className={listcss.tracklist}> 
<TrackList  playList={props.playList} 
removeFromPlayList={props.removeFromPlayList}
/>
</div>


<input
 type="submit"
 value="Save Playlist to Spotify" 
 disabled={!canSave}
 title={!props.playListName ? "Enter a playlist name" : "Add at least one track"}
 className={listcss.savelist}
 />
</form>
</div>
 )
 
}

/*
 on input   disabled={!canSave} → button is unclickable if conditions aren’t met

title=... → shows a tooltip on hover explaining why // 

onSavePlaylist={() =>
  savePlayListToSpotify(userId, accessToken, playListName)
}
above can be passed down from app instead of  props.savePlayListToSpotify(props.userId, props.accessToken, props.playListName)







*/