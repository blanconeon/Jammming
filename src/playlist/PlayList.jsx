import TrackList from '../tracklist/TrackList';
export default function PlayList (props) {

function handleLogin(event) {
     event.preventDefault();
     props.preparePKCEAndRedirect(); // This will handle everything, including redirect
}
 

 return (
<div>
 <form onSubmit={handleLogin}>
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

/*AQDWLykmBAEFkbYFgzWtr2oT6iK6P5Gto-x5mdYx_TBY3NUOzKsG6PZvENkbZC2sfw74zFUGxNQaPK9yS0csLvNYZJ_icYPdAES9d4fABvWUP4WFhBb7peH2rtWA9OdCEpwKPAk5G6QE9zwICY0CI2OY_xqe-H143FpCX3Ium8w9nc-Ot3t9ZNn7zhLn4IaY2oew_soLMtqK-JxgTQTIZ7WYY2Ux9c68KUjA
*/