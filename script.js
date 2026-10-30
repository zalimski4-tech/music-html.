const SEARCH_URL = 'https://itunes.apple.com/search?media=music&entity=song&limit=20&term=';
const START_TERM = 'pop';

const main = document.getElementById('main');
const search = document.getElementById('search');
const form = document.getElementById('form');

getSongs(SEARCH_URL + START_TERM);

async function getSongs(url) {
  const res = await fetch(url);      // Vraag de data op bij de server
  const data = await res.json();     // Converteer het antwoord naar JSON
  
  // HIER ZAT DE FOUT: roep showSongs aan met de resultaten!
  showSongs(data.results);           
}

function showSongs(songs) {
  main.innerHTML = '';               // Maak de pagina eerst leeg

  songs.forEach(song => {
    const { trackName, artistName, artworkUrl100, previewUrl } = song;
    const bigCover = artworkUrl100.replace('100x100', '300x300');

    const songEl = document.createElement('div');
    songEl.classList.add('song');
    songEl.innerHTML = `
      <img src="${bigCover}" alt="${trackName}">
      <div class="song-info">
        <h3>${trackName}</h3>
        <p>${artistName}</p>
      </div>
      <audio controls src="${previewUrl}"></audio>`;
    main.appendChild(songEl);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();                  // Voorkom dat de pagina herlaadt
  const searchTerm = search.value.trim();

  if (searchTerm !== '') {
    getSongs(SEARCH_URL + encodeURIComponent(searchTerm));
    search.value = '';
  } else {
    window.location.reload();          // Lege zoekopdracht: terug naar start
  }
});

document.addEventListener('play', (e) => {
  document.querySelectorAll('audio').forEach(a => {
    if (a !== e.target) a.pause();
  });
}, true);