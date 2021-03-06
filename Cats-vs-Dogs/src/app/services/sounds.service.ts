import { Injectable } from '@angular/core';

enum Sounds {
  login = "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/Oddio_Overplay/Good_Old_Neon/This_Is_the_News/Good_Old_Neon_-_10_-_Video_Game_Soundtrack.mp3",
  battle = "https://freesound.org/data/previews/466/466998_285997-lq.mp3",
  profile = "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/Music_for_Video/Komiku/Captain_Glouglous_Incredible_Week_Soundtrack/Komiku_-_04_-_Skate.mp3",
  home = "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/Music_for_Video/Komiku/Captain_Glouglous_Incredible_Week_Soundtrack/Komiku_-_02_-_Home.mp3",
  flee = "https://freesound.org/people/pfranzen/sounds/383073/download/383073__pfranzen__running-away-on-solid-floor.ogg",
  eat = "https://freesound.org/people/xtrgamr/sounds/253615/download/253615__xtrgamr__good-potato-chip-crunch.wav",
  nani = "https://www.soundboard.com/handler/DownLoadTrack.ashx?cliptitle=Omae+Wa+Mou+Shindeiru&filename=24/246940-edc1578e-da08-45f3-992d-3fd6c38e586c.mp3",
  potion = "https://freesound.org/people/DrMinky/sounds/166188/download/166188__drminky__potion-drink-regen.wav",
  meow = "https://freesound.org/people/spacether/sounds/385892/download/385892__spacether__262312-steffcaffrey-cat-meow1.mp3",
  bork = "https://freesound.org/people/vikuserro/sounds/341018/download/341018__vikuserro__barking-2.wav"
};

@Injectable({
  providedIn: 'root'
})
export class SoundsService {
  music: HTMLAudioElement;
  quick: HTMLAudioElement;

  constructor(){ 
    this.music = new Audio();
    this.quick = new Audio();
  }

  list() {
    return Sounds;
  }

  mute() {
    this.music.volume=0;
    this.quick.volume=0;
  }
  unmute() {
    this.music.volume=1;
    this.quick.volume=1;
  }

  playLoop(sound:Sounds) {
    this.music.load();
    this.music.src = sound;
    this.music.play();
    this.music.loop = true;
  }

  playOnce(sound:Sounds) {
    this.quick.load();
    this.quick.src = sound;
    this.quick.loop = false;
    this.quick.play();
  }

  pause() {
    this.music.pause();
  }

  resume() {
    this.music.play();
  }
}
