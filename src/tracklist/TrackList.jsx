import Track from '../track/Track';
import tracklist from '../cssModules/tracklistcss.module.css';
export default function TrackList(props) {

return (
    <>
    <ul className={tracklist.traklist}>{props.playList.map((item) => (
  <Track track={item} key={item.id} removeFromPlayList={props.removeFromPlayList} />
    ))}

    </ul>
    </>
)


} 