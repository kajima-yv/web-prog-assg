// setting up variabel and functions for API use.
const from = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");

const apiURL = "https://api.lyrics.ovh";

// fetching artist & title data from API
async function searchSongs(term) {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();

  showData(data);
}

// showing most relevant data based on searched keyword through lists
function showData(data) {
  result.innerHTML = `
  <ul class="songs">
    ${data.data
      .map(
        (song) => `<li>
    <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
    <span class="artist-title"><strong>${song.artist.name}</strong> - ${song.title}</span>
  </li>`
      )
      .join("")}
  </ul>
 `;
}

// fetching lyrics and showing it
async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();

  if (data.error) {
    result.innerHTML = data.error;
  } else {
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

    result.innerHTML = `
              <div>
              <h2><strong>${songTitle}</strong></h2>
              <h3>${artist}</h3>
              <span>${lyrics}</span>
              </div>
          `;
  }
}

// submiting keywords in search bar
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if (!searchTerm) {
    alert("Please type in a search term");
  } else {
    searchSongs(searchTerm);
  }
});

// Get lyrics button click
result.addEventListener("click", (e) => {
  const clickedEl = e.target;

  if (clickedEl.tagName === "BUTTON") {
    const artist = clickedEl.getAttribute("data-artist");
    const songTitle = clickedEl.getAttribute("data-songtitle");

    getLyrics(artist, songTitle);
  }
});


// styling for the search-box
// When the user scrolls the page, execute myFunction
/*window.onscroll = function() {myFunction()};*/

// Get the navbar
/*var searchbox = document.getElementById("form");*/

// Get the offset position of the navbar
/*var sticky = searchbox.offsetTop;*/

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
/*function myFunction() {
  if (window.pageYOffset >= sticky) {
    searchbox.classList.add("sticky")
  } else {
    searchbox.classList.remove("sticky");
  }
}*/