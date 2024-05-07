function addTracksToDatalist(data, dataList) {
  if (Array.isArray(data)) {
      // Ifall data är en array så kommer den vara ett helt album av låtar
      data.forEach(track => {
          const option = document.createElement("option");
          option.value = track;
          dataList.appendChild(option);
      });
  } else {
      // Ifall det är ett object så ittereras den (genom album)
      for (let album in data) {
          if (data.hasOwnProperty(album)) {
              data[album].forEach(track => {
                  const option = document.createElement("option");
                  option.value = track;
                  dataList.appendChild(option);
              });
          }
      }
  }
}


function getNewSong() { 
  async function getRandomFile() {
    try {
      const response = await fetch('http://localhost:3000/getRandomFile'); // Skickar en "request" från Node servern
      const filePath = await response.text(); // Får filen (väntar på att response får en fil från fetch)
      console.log("Random file path:", filePath);
      return filePath;
    } catch (error) {
      console.error("Error fetching random file:", error);
    }
  }

  getRandomFile().then((path) => {
    songPath = path;
    audio = new Audio(songPath);
    audio.volume = 0.15;
    correctSongName = songPath.split('\\').pop().split('.').shift(); // Gör om file pathen till en string med endast sång namnet (music/Blåjeans.mp3 -> Blåjeans)
  });
  
  maxDuration = 7; // För låten att spelas upp (under första "lyssningen")
}

function playMusic() {
  audio.play();
  audio.addEventListener("timeupdate", function() {
    if (audio.currentTime > maxDuration) { //ifall musiken överskrider maxduration så kommer den pausas och resetas till 0s så att man kan lyssna på den igen
      audio.pause();
      audio.currentTime = 0;
    };
  });
}

function resetScale() {
  play.style.transform = "scale(1)";
}

function animateButton() { // Gör så att playbutton  blir mindre när man har tryckt på den (så att man vet att man har tryckt på den)
  play.style.transform = "scale(0.9)";

  setTimeout(resetScale, 100);
}

function displayLeaderboard() {
  childElements.forEach(function(child) {
    if (child.nodeType === 1) {
        child.style.display = 'none';
    }
  });

  leaderboard.style.display = "flex";
  pointsSection.style.display = "flex";
  pointsSection.style.justifyContent = "flex-start";
  answer.style.display = "none";
  nextButton.style.display = "none";
  webbInfo.style.display = "block";
  songNumberValue.style.display = "none";
  textAlbum.style.display = "none";
  hiddenSquare.style.display = "none";
  mainHeader.textContent = "Din Poängsumma!";
}

function nextSong() { //Konfiguerar vad som ska slutas visas / visas och resetas när man trycker på "next song" knappen.
  getNewSong();
  songList.innerHTML = "";
  addTracksToDatalist(albums, songList);
  previousGuesses = [];
  guessCount = 0;
  albumImage.style.display = "none";
  coverQuestionmark.style.display = "block";
  
  for (const item of displayNoneList) {
    item.style.display = "none";
  }

  for (const guess of guessList) {
    guess.style.background = "#F6F6F6";
    guess.value = "";
    guess.readOnly = true;
  }
  guess1.readOnly = false;
  
  songNumberValue.textContent = "Låt: " + songNumber + "/5";
  pointScore.textContent = "Poäng: " + playerScore;
}

function submitToLeaderboard() { 
  if (playerName.value !== '' || playerName.value !== undefined) {
    if (points1 < playerScore) {
      place5.querySelector(".points").textContent = place4.querySelector(".points").textContent;
      place5.querySelector(".name").textContent = place4.querySelector(".name").textContent;
      place4.querySelector(".points").textContent = place3.querySelector(".points").textContent;
      place4.querySelector(".name").textContent = place3.querySelector(".name").textContent;
      place3.querySelector(".points").textContent = place2.querySelector(".points").textContent;
      place3.querySelector(".name").textContent = place2.querySelector(".name").textContent;
      place2.querySelector(".points").textContent = place1.querySelector(".points").textContent;
      place2.querySelector(".name").textContent = place1.querySelector(".name").textContent;

      place1.querySelector(".points").textContent = String(playerScore);
      place1.querySelector(".name").textContent = playerName.value;

      console.log("Updated place 1");
    } 
    else if (points2 < playerScore) {

      place5.querySelector(".points").textContent = place4.querySelector(".points").textContent;
      place5.querySelector(".name").textContent = place4.querySelector(".name").textContent;
      place4.querySelector(".points").textContent = place3.querySelector(".points").textContent;
      place4.querySelector(".name").textContent = place3.querySelector(".name").textContent;
      place3.querySelector(".name").textContent = place2.querySelector(".name").textContent;
      place3.querySelector(".points").textContent = place2.querySelector(".points").textContent;

      place2.querySelector(".points").textContent = String(playerScore);
      place2.querySelector(".name").textContent = playerName.value;

      console.log("Updated place 2");
    }
    else if (points3 < playerScore) {

      place5.querySelector(".points").textContent = place4.querySelector(".points").textContent;
      place5.querySelector(".name").textContent = place4.querySelector(".name").textContent;
      place4.querySelector(".points").textContent = place3.querySelector(".points").textContent;
      place4.querySelector(".name").textContent = place3.querySelector(".name").textContent;

      place3.querySelector(".points").textContent = String(playerScore);
      place3.querySelector(".name").textContent = playerName.value;

      console.log("Updated place 3");
    }
    else if (points4 < playerScore) {
      
      place5.querySelector(".points").textContent = place4.querySelector(".points").textContent;
      place5.querySelector(".name").textContent = place4.querySelector(".name").textContent;

      place4.querySelector(".points").textContent = String(playerScore);
      place4.querySelector(".name").textContent = playerName.value;

      console.log("Updated place 4");
    }
    else if (points5 < playerScore) {
      place5.querySelector(".points").textContent = String(playerScore);
      place5.querySelector(".name").textContent = playerName.value;
      console.log("Updated place 5");
    }
  }
};

function replay() {
  playerScore = 0;
  songNumber = 1;

  childElements.forEach(function(child) {
    // Gör så att allting som tidigare blivit "display:none;" blir synligt igen samt "display:none;:ar" allting leaderboard relaterat.
    if (child.nodeType === 1) {
        child.style.display = 'flex';
    }
  });

  leaderboard.style.display = "none";
  pointsSection.style.display = "flex";
  pointsSection.style.justifyContent = "center";
  answer.style.display = "block";
  nextButton.style.display = "block";
  webbInfo.style.display = "block";
  songNumberValue.style.display = "block";
  textAlbum.style.display = "flex";
  hiddenSquare.style.display = "flex";
  mainHeader.textContent = "Gissa Låten!";

  nextSong();
}

function getAlbumCover() { // Hämtar rätt albumbild samt gör om datalistan så att den endast har låtarna tillhörandes det albumet!
  for (const [albumName, songs] of Object.entries(albums)) {
    if (songs.map(song => song.toLowerCase()).includes(correctSongName.toLowerCase())) {
        albumImage.src = `Album/${albumName}.jpg`;
        let dataListAlbum = albums[albumName]
        songList.innerHTML = "";
        addTracksToDatalist(dataListAlbum, songList)
        break;
    };
  };
};