import { mockTracks } from "./mockTracks";
  

export default function SearchBar(props) {

  function handleSubmit(event) {
    event.preventDefault(); 
    props.getMusic(props.token, props.userInput, props.setResult);
  }


    return (
     <form className="AddThoughtForm"onSubmit={handleSubmit} >
      <input
        type="text"
        aria-label="Search"
        placeholder="What's on your mind?"
        value={props.searchInput}
        onChange={props.setFunction}
      />
      <input type="submit" value="Search" />
    </form>
)
}

/* DECLARE onsubmit function. 
is EVENT.PREVENTDEFAULT necessary for this form? 

Here is a step-by-step explanation:

1. `mockTracks.filter(track => ...)`  
   This goes through each object (`track`) in the `mockTracks` array.

2. `Object.values(track)`  
   This gets an array of all the values in the current `track` object. For example, for the first track, it gives `['1', 'Shape of You', 'Ed Sheeran', 'Divide']`.

3. `.some(val => ...)`  
   This checks if **at least one** value in the array matches the condition inside.

4. `val.toLowerCase().includes(props.searchInput.toLowerCase())`  
   This makes both the value and the search input lowercase (so the search is not case-sensitive), and checks if the value contains the search input.

If any value in the object matches the search input, that object is kept in the filtered array. If not, it is left out.

using .includes() allows partial matches, so even a few letters will find results anywhere in the string, not just exact phrases or words. This makes your search flexible and user-friendly.


 function handleSubmit(event) {
    event.preventDefault(); 
    const matches = mockTracks.filter(track =>
    Object.values(track).some(val =>
    val.toLowerCase().includes(props.searchInput.toLowerCase())
    ));
    props.setResult(matches);
  }*/