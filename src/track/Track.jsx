import atrack from '../cssModules/trackcss.module.css';
import { Minus } from "lucide-react";


export default function Track({track, removeFromPlayList}) {

    return (
       <>
       <li className={atrack.trackbox} >
      
       <div className={atrack.text}>
          <strong className={atrack.song}>{track.name}</strong>
          <div className={atrack.meta}>
            {track.artist} | {track.album}
          </div>
        </div>
      
       <button onClick={() => removeFromPlayList(track.id, true)}><Minus size={16} /></button>
    </li>
       </> 
    )
}

//Name: {track.name}, Artist: {track.artist}, Album: {track.album}