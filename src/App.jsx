import { useState } from "react";
import SearchBar from './searchbar/SearchBar';
import SearchResults from './searchresults/SearchResults';
import PlayList from './playlist/PlayList'; 


export default function App() {

const [searchInput, setSearchInput] = useState(''); 
const [result, setResult] = useState([]);
const [playListName, setPlayListName] = useState('The List');
const [playList, setPlayList] = useState([]);

function updateRootState(e) {
  setSearchInput(e.target.value);
}

function handleCheck(id, checked) {
  // logic to add or remove track by id to playList
  if (checked) {
  const trackToPlayList = result.find(t => t.id === id);
  if (!playList.some(t => t.id === id)) {
      setPlayList([...playList, trackToPlayList]);
    }

}

}



    return (
            <>
            <SearchBar setFunction={updateRootState} searchInput={searchInput} setResult={setResult}  />
            <SearchResults matchResult={result}/>
            <PlayList playListName={playListName} playList={playList} setPlayList={setPlayList} />

            </>
    )
}

/*in handleCheck, you should search through your track list (such as your search results) to find the track object with the matching id. You can use .find() to get the whole track object. .map would only get individual matches*/