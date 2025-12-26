import Track from '../track/Track';

export default function TrackList(props) {

return (
    <>
    <ul>{props.playList.map((item) => (
  <Track track={item} key={item.id} />
    ))}
   
    </ul>
    </>
)


} 