$(document).ready( () => {
  let currentMusic = 0;

  let music = document.querySelector('#audio');

  let seekBar = document.querySelector('.seek');

  let songName = document.querySelector('.music-name');

  let artistName = document.querySelector('.singer');

  let disc = document.querySelector('.disc');

  let currentTime = document.querySelector('.current-time');

  let musicDuration = document.querySelector('.song-duration');

  let playBtn = document.querySelector('.play-btn');

  let fwdBtn = document.querySelector('.foward-btn');

  let bkwdBtn = document.querySelector('.backward-btn');

  let repeatBtn = document.querySelector('.rpt');

  let playList = document.querySelector('.list');

  let like = document.querySelector('.like');


  playBtn.addEventListener('click', () => {
    if(playBtn.className.includes('pause')){
      music.play();
    }
    else{
      music.pause();
    }
    playBtn.classList.toggle('pause');
  })

  // to set up music

  let setMusic = (i) => {
    seekBar.value = 0;
    let song = songz[i];
    currentMusic = i;
    music.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    disc.style.backgroundImage = `url('${song.cover}')`;
    
    currentTime.innerHTML = '00:00';
    setInterval(() => {
        seekBar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);
    },500);

  }

  setMusic(0);

  //format time

  let formatTime = (time) => {
    let min = Math.floor(time/60);

    if(min < 10){
      min = `0${min}`;
    }

    let sec = Math.floor(time % 60);
    if(sec < 10){
      sec = `0${sec}`;
    }
    return `${min} : ${sec}`;
  }

  //working on seek time

  setInterval(() => {
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);
    if(Math.floor(music.currentTime) === Math.floor(seekBar.max)){
      fwdBtn.click();
    };
  }, 500)

  seekBar.addEventListener('change',() =>{
    music.currentTime = seekBar.value;
  });

  //foward and backward 

  let playMusic = () => {
    music.play();
    playBtn.classList.remove('pause');
  };

  fwdBtn.addEventListener('click', () => {
    if(currentMusic >= songz.length){
      currentMusic = 0;
    }
    else{
      currentMusic ++;
    }
    setMusic(currentMusic);
    playMusic();
  });

  bkwdBtn.addEventListener('click', () => {
    if(currentMusic <= 0){
      currentMusic = songz.length;
    }
    else{
      currentMusic --;
    }
    setMusic(currentMusic);
    playMusic();
  });

});