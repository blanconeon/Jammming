import { useState, useEffect } from "react";
import SearchBar from './searchbar/SearchBar';
import SearchResults from './searchresults/SearchResults';
import PlayList from './playlist/PlayList';
import accessToken from './spotifyApis/spotifyToken';
import getMusic from './spotifyApis/spotifyApi'; 
import { preparePKCEAndRedirect } from './spotifyApis/spotifyToken';



export default function App() {

const [searchInput, setSearchInput] = useState(''); 
const [result, setResult] = useState([]);
const [playListName, setPlayListName] = useState('');
const [playList, setPlayList] = useState([]);
const [token, setToken] = useState('');
const [tokenTimeOut, setTokenTimeOut] = useState(null);

useEffect(() => {
  accessToken(setToken, setTokenTimeOut);
}, []);

useEffect(() => {
  if (!token || !tokenTimeOut) return;
  const timeout = setTimeout(() => {
    setToken('');
  }, tokenTimeOut - Date.now());
  return () => clearTimeout(timeout);
}, [token, tokenTimeOut]);



function updateRootState(e) {
  setSearchInput(e.target.value);
}

function handleCheck(id, checked) {
  // logic to add track by id on matchresults from playList
  if (checked) {
  const trackToPlayList = result.find(t => t.id === id);
  if (!playList.some(t => t.id === id)) {
      setPlayList([...playList, trackToPlayList]);
    } } }

function removeFromPlayList(id, clicked) {
    if (clicked){
    const removeClicked =  playList.filter(item => item.id !== id );
   setPlayList(removeClicked);
    } }

function updatePlayListName(value){
   setPlayListName(value); 
}    

function getUris(event) {
    event.preventDefault();
    const uris = playList.map( track => track.uri);
    alert('List Saved!');
    console.log(uris);
    setPlayList([]);
}

const clientId = 'aa0c6d616280473e980cd52bd6028a41';
const redirectUri = 'http://127.0.0.1:5173/';
const scopes = 'playlist-modify-public playlist-modify-private';

/*function getSpotifyAuthUrl() {
  const authEndpoint = 'https://accounts.spotify.com/authorize';
  const params = [
    `client_id=${clientId}`,
    `response_type=code`,
    `redirect_uri=${encodeURIComponent(redirectUri)}`,
    `scope=${encodeURIComponent(scopes)}`
  ];
  return `${authEndpoint}?${params.join('&')}`;
}*/


    return (
            <>
            <SearchBar setFunction={updateRootState} searchInput={searchInput} setResult={setResult} getMusic={getMusic} token={token} userInput={searchInput}/>
            <SearchResults result={result} handleCheck={handleCheck}/>
            <PlayList playListName={playListName} playList={playList} updatePlayListName={updatePlayListName} removeFromPlayList={removeFromPlayList} getUris={getUris} preparePKCEAndRedirect={preparePKCEAndRedirect}/>

            </>
    )
}

/*in handleCheck, you should search through your track list (such as your search results) to find the track object with the matching id. You can use .find() to get the whole track object. .map would only get individual matches*/

/* spotify:track:11Z6PtzVUZ3PxUeyqDyHjE 
http://127.0.0.1:5173/ Redirect URIs

second useEffect explanation: 
-This effect runs every time token or tokenTimeOut changes.
-If either is missing, it does nothing.
-If both exist, it sets a timer to clear the token when it expires.
-The cleanup function (return () => clearTimeout(timeout);) cancels the previous timer if the effect runs again or the component unmounts.
-The timer keeps running unless the effect is triggered again or the component unmounts. The cleanup only cancels the -timer in those cases, not immediately.
-This setup ensures the token is cleared exactly when it expires, and no extra timers are left running.

with the cleanup function, when a variable changes:

The cleanup function cancels the first timer before starting the new one.
Only the latest timer runs.


The **redirect back to your app** is handled by Spotify after the user logs in and approves access. This is controlled by the `redirect_uri` parameter you include in the authorization URL.

When the user finishes on Spotify, Spotify automatically sends them back to the URL you set as `redirect_uri` (for example, `http://localhost:3000/callback`). This is how your app gets the authorization code and continues the process. 

So, your code does not bring the user back—Spotify does, using the `redirect_uri` you provided.The part that brings the user back to your app is the `redirect_uri` parameter you set in the authorization URL. After the user logs in and approves, Spotify automatically sends them back to your app at the `redirect_uri` you provided, along with an authorization code in the URL. Your app then continues the process from there.*/