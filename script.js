//Grabbing all our DOM elements
const form = document.getElementById('form')
const search = document.getElementById('search')
const result = document.getElementById('result')
const more = document.getElementById('more')

const apiURL = 'https://api.lyrics.ovh';

//function that searches the songs/artist and interacts with the API and gets data
async function searchSongs(term){
    const response = await fetch(`${apiURL}/suggest/${term}`)
    const data = await response.json()
    console.log(data)
    //showData is a function for updating the UI/DOM
    showData(data)
}


// Show song and artist in DOM (basically update the UI)
function showData(data) {
    result.innerHTML = `
      <ul class="songs">
        ${data.data.map(song => 
        `<li>
        <span><strong>${song.artist.name}</strong> - ${song.title}</span>
        <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
        </li>`)
        .join('')}
      </ul>
    `;
  
    if (data.prev || data.next) {
      more.innerHTML = `
        ${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`: ''}
        ${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`: ''}
      `;
    }else{
        more.innerHTML = '';
    }
}


//function that uses pagination to get more songs(basically going from page to page)
async function getMoreSongs(url){
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await res.json();

    showData(data);
}
    

//Get Lyrics for song (function)
async function getLyrics(artist, songTitle){
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await res.json();
    
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

    result.innerHTML = `<h2><strong>${artist}<strong> - ${songTitle}</h2>
    <span>${lyrics}</span>`;
    
    more.innerHTML = '';
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


//Get lyrics button click
result.addEventListener('click', e => {
    const clickedEl = e.target; 

    if(clickedEl.tagName === 'BUTTON'){
        const artist = clickedEl.getAttribute('data-artist');
        const songTitle = clickedEl.getAttribute('data-songtitle');

        getLyrics(artist, songTitle)
    }
})


  