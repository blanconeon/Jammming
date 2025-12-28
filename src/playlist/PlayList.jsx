import TrackList from '../tracklist/TrackList';
export default function PlayList (props) {

 return (
<div>
 <form onSubmit={props.getUris}>
   <input type='text' 
          aria-label="Play List Name"
          placeholder="Play List Name"
          value={props.playListName}
          onChange={(e) => props.updatePlayListName(e.target.value)} /> 
<TrackList playList={props.playList} removeFromPlayList={props.removeFromPlayList}/>



<input type="submit" value="Save Playlist" />
</form>
</div>
 )
 
}