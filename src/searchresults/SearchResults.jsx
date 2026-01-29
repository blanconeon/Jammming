import resultst from '../cssModules/resultstyles.module.css';

export default function SearchResults(props) {


return (
    <>
    <div className={resultst.searchresults}>
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

