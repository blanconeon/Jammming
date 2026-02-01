import atrack from '../cssModules/trackcss.module.css';
import { Minus } from "lucide-react";


export default function Track({track, removeFromPlayList}) {

    return (
       <>
       <li className={atrack.trackbox} >
      Name: {track.name}, Artist: {track.artist}, Album: {track.album} <button onClick={() => removeFromPlayList(track.id, true)}><Minus size={16} /></button>
    </li>
       </> 
    )
}