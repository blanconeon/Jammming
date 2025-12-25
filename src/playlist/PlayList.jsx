import TrackList from '../tracklist/TrackList';
export default function PlayList (props) {

 return (
<div>
 <h3>{props.playListName}</h3>
<TrackList playList={props.playList}/>



<button>Save Play List</button>
</div>
 )
 
}