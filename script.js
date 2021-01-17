//Grabbing all our DOM elements
const form = document.getElementById('form')
const search = document.getElementById('search')
const result = document.getElementById('result')
const more = document.getElementById('more')

const apiURL = 'https://api.lyrics.ovh';

//function that searches the songs/artist and interacts with the API
async function searchSongs(term){
    const response = await fetch(`${apiURL}/suggest/${term}`)
    const data = await response.json()
    
    //showData is a function for updating the UI/DOM
    showData(data)
}

//Show song and artist in DOM (function)
function showData(data){
    
}



//Event Listeners
form.addEventListener('submit', e => {
    e.preventDefault();

    const searchTerm = search.value.trim()

    //We are passing our search term into a function called searchSongs(creating a condition)
    if (!searchTerm){
        alert('Please type in a search term')
    } else{
        searchSongs(searchTerm); 
    }

});