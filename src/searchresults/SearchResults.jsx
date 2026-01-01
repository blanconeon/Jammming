export default function SearchResults(props) {


return (
    <>
    <div>
     <ul>
      {props.result.map(({ id, artist, name, album }) => (
  <li key={id}>
   Name: {name}, Artist: {artist}, Album: {album}
    <button onClick={() => props.handleCheck(id, true)}>+</button>
</li>
     ))
     }
     </ul>
    </div>
    </>
)
};

