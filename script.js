alert("the changes are done");
// let currentSong = new Audio();


function convertSecondsToMinutesAndSeconds(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = (seconds % 60).toFixed(0);

    // Adding leading zeros if needed
    minutes = minutes < 10 ? '0' + minutes : minutes;
    remainingSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

    return minutes + ':' + remainingSeconds;
}

// let randNum = (songs) => {
//     return Math.floor(0 + Math.random() * ((songs.length - 1) - 0))
// }


// async function getSongs() {
//     let receive = await fetch("http://127.0.0.1:5500/songs/")
//     let response = await receive.text();

//     let div = document.createElement("content");
//     div.innerHTML = response;
//     let as = div.getElementsByTagName("a")
//     let songs = []

//     for (let index = 0; index < as.length; index++) {
//         const element = as[index];
//         if (element.href.endsWith(".mp3")) {
//             songs.push(element.href.split("/songs/")[1].split('.mp3')[0])
//         }

//     }
//     return songs
// }

// const playMusic = (track, pause = true) => {
    // currentSong is made a global variable so that if one of the song is already played then when clicking on another song another song starts playing instead of both of them playing at the same time

//     currentSong.src = "/songs/" + track + ".mp3"
//     if (pause) {
//         currentSong.play();
//         playSongBtn.firstElementChild.src = "svg/pauseSong.svg"
//     }
//     songInfo.innerHTML = decodeURI(track)
//     songTime.innerHTML = `00:00 / 00:00`

// }


async function main() {

    //Gets the list of all the songs
    // let songs = await getSongs();

    // Here false is passed as an argument becuase when we reload the page we only want the song's name to be shown and not the music to be played default so we passed false so that the music doesn't get played but the songName is displayed by default

    // playMusic(songs[randNum(songs)], false)


    // show all the songs in a playlist
    // let songAdd = document.querySelector('#songLibrary').getElementsByTagName("ul")[0];
    // for (const song of songs) {
    //     songAdd.innerHTML += `
    //     <li>
    //     <div class="songCard flex  align-center ">
    //         <img src="svg/music.svg" class="invert " alt="">
    //         <div class="info">
    //             <div class="musicName">${song.replaceAll("%20", " ")}</div>
    //             <div class="musicArtist"> Aayush</div>
    //         </div>
    //         <div class="playNow  flex  ">
    //             <span>Play Now</span>
    //             <img src="svg/playSong.svg" class="invert" alt="">
    //         </div>
    //     </div></li>
    //     `;
    // }

    // Attach an event listener to each songName in the library so that you can click at the song and play it.

    // Array.from(document.querySelector("#songLibrary").getElementsByTagName("li")).forEach(
    //     (element) => {
    //         element.addEventListener("click", () => {
    //             console.log(element.querySelector(".musicName").innerHTML);
    //             playMusic(element.querySelector(".musicName").innerHTML)
    //         })

    //     })

    // Listen for timeupdate event for seekbar

    // This timeupdate event is only triggred when the song starts playing
    // currentSong.addEventListener("timeupdate", () => {
    //     console.log(currentSong.currentTime, currentSong.duration)
    //     songTime.innerHTML = `${convertSecondsToMinutesAndSeconds(currentSong.currentTime)} / ${convertSecondsToMinutesAndSeconds(currentSong.duration)}`
    //     circle.style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%"
    // })




    // Attach event listener to previous, play and next

    // playSongBtn.addEventListener("click", () => {
    //     if (currentSong.paused) {
    //         currentSong.play();
    //         playSongBtn.firstElementChild.src = "svg/pauseSong.svg"
    //     }
    //     else {
    //         currentSong.pause();
    //         playSongBtn.firstElementChild.src = "svg/playSong.svg"
    //     }
    // })


    // Add event listener to the seekbar
    /*
    seekBar.addEventListener("click", (x) => {
        // getBoundingClientRect() gives us the dom Rectangle which can be used to place the circle of the seekbar whereever we click  the cursor on the seekbar
        // then we use that 
        let percent = (x.offsetX / x.target.getBoundingClientRect().width) * 100
        circle.style.left = percent + "%";

        //set the time to the actual time where we click on the seekbar
        // this does eg: we cliked at 90% of the seekbar so:  set the time to 90% of the total duration of the song at the end we divide by 100 so as to get the the value in seconds
        // eg: percent returns 90 and if songDuration=255 seconds then (90 * 255)/100 would return 90% percent of the total song duration
        currentSong.currentTime= (percent * currentSong.duration)/100;

    }) 
    */
    

    // Add event listener to the hamburger Icon

    hamburgerIcon.addEventListener("click",() => {
        document.querySelector(".leftSection").style.left= "0";
        companyInfo.style.display= "none";
        horizontalLine.style.display= "none";
        document.querySelector(".leftSection").style.zIndex= "9";
        document.querySelector(".rightSection").style.zIndex="1"
    })
    
    // Add event listener to the Close Icon
    
    closeIcon.addEventListener("click", ()=>{
        document.querySelector(".leftSection").style.left ="-110%"
        companyInfo.style.display= "flex";
        horizontalLine.style.display= "block";
    })

}

main()

