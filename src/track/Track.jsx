import atrack from '../cssModules/trackcss.module.css';


export default function Track({track, removeFromPlayList}) {

    return (
       <>
       <li className={atrack.trackbox} >
      Name: {track.name}, Artist: {track.artist}, Album: {track.album} <button onClick={() => removeFromPlayList(track.id, true)}>Remove</button>
    </li>
       </> 
    )
}