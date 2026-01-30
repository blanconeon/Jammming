import resultst from '../cssModules/resultstyles.module.css';
import { Plus } from "lucide-react";

export default function SearchResults(props) {


return (
    <>
    <div className={resultst.searchresults}>
     <ul>
      {props.result.map(({ id, artist, name, album }) => (
  <li key={id} className={resultst.list}>
   <span className={resultst.text}>
    <span className={resultst.label}>Song:&nbsp;</span> 
    {name}, <span className={resultst.label}>Artist:&nbsp;</span> {artist}, <span className={resultst.label}>Album:&nbsp;</span> {album}
  </span>

  <button onClick={() => props.handleCheck(id, true)}>
    <Plus size={16} />
  </button>
</li>
     ))
     }
     </ul>
    </div>
    </>
)
};

/*
&nbsp; = non-breaking space
A space where the browser is not allowed to break the line.
the browser sees this as one unbreakable gap between Song: and the first word of {name}
 */