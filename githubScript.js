console.log("1st Js full program is deployed and is running perfectly");


let currentSong = new Audio();
let songs;
let currentSongIndex;
let currentFolder;


/* Declaring originalVolume outside the event listener makes it a global variable, which means it retains its value between different invocations of the event listener. If you declare originalVolume inside the event listener, it would be a local variable, and its value would be reset every time the event listener is called.

In this specific case, you want to store the original volume across multiple clicks of the mute/unmute button. If you declare originalVolume inside the event listener, it would be recreated and set to undefined every time the event listener is executed. This would defeat the purpose of storing the original volume.

By declaring originalVolume outside the event listener, it becomes a variable with a scope that persists throughout the entire script, allowing it to retain its value between different invocations of the mute/unmute event listener. This way, you can consistently store and retrieve the original volume across various interactions with the mute/unmute button. */
let originalVolume;


function convertSecondsToMinutesAndSeconds(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = (seconds % 60).toFixed(0);

    // Adding leading zeros if needed
    minutes = minutes < 10 ? '0' + minutes : minutes;
    remainingSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

    return minutes + ':' + remainingSeconds;
}

let randNum = (songs) => {
    return Math.floor(0 + Math.random() * ((songs.length - 1) - 0))
}


async function getSongs(folderName) {
    let receive = await fetch(`https://github.com/IncogCyberpunk/spotify/blob/main/songs${folderName}`);
    // let receive = await fetch(`http://127.0.0.1:5500/songs/${folderName}`);

    // Here we assign the folderName which was taken as a parameter to currentFolder variable so that we can use the name of folder anywhere after this statement without having to take the name of the folder as an parameter everywhere we need the name of the folder
    currentFolder = folderName;
    let response = await receive.text();

    let div = document.createElement("content");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    songs = []

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/songs/${folderName}/`)[1].split('.mp3')[0])
        }

    }

    // show all the songs in a playlist
    let songAdd = songLibrary.getElementsByTagName("ul")[0];

    // this empties the existing name of songs in the ul when a folder is clicked for playing the songs in that folder 
    songAdd.innerHTML = ""
    for (const song of songs) {
        songAdd.innerHTML += `
        <li>
        <div class="songCard flex  align-center ">
            <img src="svg/music.svg" class="invert " alt="">
            <div class="info">
                <div class="musicName">${song.replaceAll("%20", " ")}</div>
                <div class="musicArtist"> Aayush</div>
            </div>
            <div class="playNow  flex  ">
                <span>Play Now</span>
                <img src="svg/playSong.svg" class="invert" alt="">
            </div>
        </div></li>
        `;
    }

    // Attach an event listener to each songName in the library so that you can click at the song and play it.

    Array.from(document.querySelector("#songLibrary").getElementsByTagName("li")).forEach(
        (element) => {
            element.addEventListener("click", () => {
                playMusic(element.querySelector(".musicName").innerHTML)
            })

        })

    // songs array is being returned so that the array can be accessible anywhere we want after the getSongs() function is once runned;    
    return songs;

}

const playMusic = (track, pause = true) => {
    // currentSong is made a global variable so that if one of the song is already played then when clicking on another song another song starts playing instead of both of them playing at the same time

    currentSong.src = `/songs/${currentFolder}/` + track + ".mp3"
    if (pause) {
        currentSong.play();
        playSongBtn.firstElementChild.src = "svg/pauseSong.svg"
    }
    songInfo.innerHTML = decodeURI(track)
    songTime.innerHTML = `00:00 / 00:00`

}

async function displayAlbums() {
    let receive = await fetch(`https://github.com/IncogCyberpunk/spotify/blob/main/songs`);
    // let receive = await fetch(`http://127.0.0.1:5500/songs/`);
    let response = await receive.text();
    let div = document.createElement("content");
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a")
    let anchorsArray = Array.from(anchors)
    for (let index = 0; index < anchorsArray.length; index++) {
        const element = anchorsArray[index];

        if (element.href.includes("/songs/") && !element.href.includes(".htaccess")) {
            let folderName = element.href.split("/songs/")[1];
            // Get the metadata of the folder
            let receive = await fetch(`https://github.com/IncogCyberpunk/spotify/blob/main/songs${folderName}/info.json`);
            // let receive = await fetch(`http://127.0.0.1:5500/songs/${folderName}/info.json`);
            let response = await receive.json();
            cards.innerHTML += `
            <div class="flex card" data-folder="${folderName}">
            <div class="playButton flex jus tify-center" id="playBtn">
                <img src="svg/playBtn.svg" alt="">
            </div>
            <img class="" src="songs/${folderName}/songCover.jpg" alt="Lofi Beats">
            <p>${response.title}</p>
            <p>${response.description}</p>
        </div>
            `
        }

    }
}

async function main() {

    //Gets the list of all the songs
    await getSongs("chillSongs");

    // Here false is passed as an argument becuase when we reload the page we only want the song's name to be shown and not the music to be played default so we passed false so that the music doesn't get played but the songName is displayed by default
    playMusic(songs[randNum(songs)], false)

    // display all the albums on the page dynamically
    await displayAlbums()

    // Add event listener to the hamburger Icon

    hamburgerIcon.addEventListener("click", () => {
        document.querySelector(".leftSection").style.left = "0";
        companyInfo.style.display = "none";
        horizontalLine.style.display = "none";
        document.querySelector(".leftSection").style.zIndex = "9";
        document.querySelector(".rightSection").style.zIndex = "1"
    })

    // Add event listener to the Close Icon

    closeIcon.addEventListener("click", () => {
        document.querySelector(".leftSection").style.left = "-110%"
        companyInfo.style.display = "flex";
        horizontalLine.style.display = "block";
    })


    // Load the songs of the library whenever it is clicked manually by the user on the card

    Array.from(cards.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async (clickedItem) => {
            // target gives the element/item in dom which is targeted/clicked by the mouse but currentTarget gives the element on which an event is being listened when we click a certain item in the dom
            songs = await getSongs(`${clickedItem.currentTarget.dataset.folder.split("/")[0]}`)
            playMusic(songs[0])
        }
        )
    })

    // Attach event listener to  play button

    playSongBtn.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            playSongBtn.firstElementChild.src = "svg/pauseSong.svg"
        }
        else {
            currentSong.pause();
            playSongBtn.firstElementChild.src = "svg/playSong.svg"
        }
    })


    // Attach event listener to the previous button
    prevSongBtn.addEventListener("click", () => {
        currentSongIndex = songs.indexOf(currentSong.src.split(`/songs/${currentFolder}/`)[1].split(".mp3")[0]);
        if ((currentSongIndex - 1) >= 0) {
            playMusic(songs[currentSongIndex - 1])
        }
        else {
            alert(`Phew !! This is the 1st song in the library 😊`)
        }
    })


    // Attach event listener to the next button
    nextSongBtn.addEventListener("click", () => {
        currentSongIndex = songs.indexOf(currentSong.src.split(`/songs/${currentFolder}/`)[1].split(".mp3")[0]);
        if ((currentSongIndex + 1) < songs.length) {
            playMusic(songs[currentSongIndex + 1]);

        }
        else {
            alert("Sorry !!That's the last song 🙂")
        }
    })

    // Listen for timeupdate event for seekbar

    // This timeupdate event is only triggred when the song starts playing
    currentSong.addEventListener("timeupdate", () => {
        songTime.innerHTML = `${convertSecondsToMinutesAndSeconds(currentSong.currentTime)} / ${convertSecondsToMinutesAndSeconds(currentSong.duration)}`
        circle.style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%"
    })


    // Attach an event listener to the volume Icon for muting and unmuting
    volumeIcon.addEventListener('click', () => {

        // here using directly the volumeIcon.src gives the src as http://127.0.0.1:5500/svg/volume.svg ; so we have to first get the exact src and then use that to check the following statements
        let volumeSrc = volumeIcon.src.split(".com/")[1];
        if (volumeSrc == "svg/volume.svg") {
            originalVolume = currentSong.volume;
            volumeIcon.src = "svg/volumeMute.svg"
            currentSong.volume = 0;
            volumeRange.value = 0;
        }
        else {
            volumeIcon.src = "svg/volume.svg"
            currentSong.volume = originalVolume;
            volumeRange.value = ((originalVolume) * 100).toFixed(0)
        }
    })


    // Attach an evvent listener to the volumeRange Bar to change the volume

    volumeRange.addEventListener("change", (e) => {

        // In Js the audio files' volume ranges from 0 to 1 , so here we see where we targeted on the volumeRange so that it returns a value of the target and divide it by 100 to get an number ranging from 0 to 1
        currentSong.volume = (e.target.value) / 100;
    })

    // Add event listener to the seekbar
    seekBar.addEventListener("click", (x) => {
        // getBoundingClientRect() gives us the dom Rectangle which can be used to place the circle of the seekbar whereever we click  the cursor on the seekbar
        // then we use that 
        let percent = (x.offsetX / x.target.getBoundingClientRect().width) * 100
        circle.style.left = percent + "%";

        //set the time to the actual time where we click on the seekbar
        // this does eg: we cliked at 90% of the seekbar so:  set the time to 90% of the total duration of the song at the end we divide by 100 so as to get the the value in seconds
        // eg: percent returns 90 and if songDuration=255 seconds then (90 * 255)/100 would return 90% percent of the total song duration
        currentSong.currentTime = (percent * currentSong.duration) / 100;

    })



}

main()

