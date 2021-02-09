const searchSongs = () => {
    const searchText = document.getElementById ("search-fild").value;
    const url = `https://api.lyrics.ovh/suggest/:${searchText}`;
    fetch (url)
    .then (res => res.json ())
    .then (data => displaySongs (data.data))
}

const displaySongs = song => {

    inputTimeOut ();

    const songContainer = document.getElementById ("song-container");
    songContainer.innerHTML = "";
    song.forEach(songs => {
        console.log (songs);
        const div = document.createElement ('div');
        div.className = "single-result row align-items-center my-3 p-3";

        div.innerHTML = `
        
        <div class="col-md-9">
            <h3 class="lyrics-name">${songs.title}</h3>
            <p class="author lead">Album by <span>${songs.artist.name}</span></p>
            <audio controls>
                <source src="${songs.preview}">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick = "lyricDetails('${songs.artist.name}', '${songs.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `
        songContainer.appendChild (div);
    });
}
// Input value timeOut function
setTimeout (inputTimeOut, 1000);
function inputTimeOut () {

    document.getElementById ("search-fild").value = "";
}

const lyricDetails = (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    fetch (url)
    .then (res => res.json ())
    .then (data => {
        const LericText = document.getElementById ("song-lyrics");
        LericText.innerText = (data.lyrics);

    })
}