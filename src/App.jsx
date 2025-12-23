import { useState } from "react";
import SearchBar from './searchbar/SearchBar';
import SearchResults from './searchresults/SearchResults';

export default function App() {

const [searchInput, setSearchInput] = useState(''); 
const [result, setResult] = useState([]);    
function updateRootState(e) {
  setSearchInput(e.target.value);
}


    return (
            <>
            <SearchBar setFunction={updateRootState} searchInput={searchInput} setResult={setResult} />
            <SearchResults matchResult={result}/>


            </>
    )
}

