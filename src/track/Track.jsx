export default function Track({track, removeFromPlayList}) {

    return (
       <>
       <li>
      Name: {track.name}, Artist: {track.artist}, Album: {track.album} <button onClick={() => removeFromPlayList(track.id, true)}>Remove</button>
    </li>
       </> 
    )
}