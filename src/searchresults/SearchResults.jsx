export default function SearchResults(props) {


return (
    <>
    <div>
     <ul>
      {props.matchResult.map(({ id, artist, name, album }) => (
  <li key={id}>
   Name: {name}, Artist: {artist}, Album: {album}
    <input
        type="checkbox"
        onChange={(e) => props.handleCheck(id, e.target.checked)}
      /></li>
     ))
     }
     </ul>
    </div>
    </>
)
};

