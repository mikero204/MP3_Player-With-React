import { IPlayer } from './interface/IPlayer';
import { IMusic } from './interface/IMusic';
import playType from './enum/playType';
import playStatus from './enum/playStatus';

class AudioPlayer implements IPlayer {
  audioPlayer: any;

  musics: IMusic[];

  currentPlayMusic: IMusic;

  sound: number = 0;

  playType: playType;

  playStatus: playStatus;

  constructor(musics: IMusic[]) {
    this.audioPlayer = new Audio();
    this.musics = musics;
    this.currentPlayMusic = { ...musics[0], };
    this.playType = playType.loop;
    this.playStatus = playStatus.play;
  }

  private getMusicIndexWithId(musicId: string): number {
    const result: number = this.musics.findIndex((music: IMusic) => music.id === musicId);
    return result;
  }

  private updateSound = (sound: number): void => {
    this.sound = sound;
    this.audioPlayer.volume = this.sound / 100;
  }

  initPlayer = (): void => {
    this.updateSound(20);
    this.audioPlayer.src = `./music/${this.currentPlayMusic.name}.mp3`;
    this.audioPlayer.play();
  }

  playMusic = (): void => {
    this.playStatus = playStatus.play;
    this.audioPlayer.play();
  }

  stopMusic = (): void => {
    this.playStatus = playStatus.stop;
    this.audioPlayer.pause();
  }

  nextMusic = (): void => {
    const currentPlayerMusicIndex = this.getMusicIndexWithId(this.currentPlayMusic.id);
    const nextMusicIndex = currentPlayerMusicIndex === this.musics.length - 1 ? 0 : currentPlayerMusicIndex + 1;
    this.currentPlayMusic = this.musics[nextMusicIndex];
    this.initPlayer();
  }

  previousMusic = (): void => {
    const currentPlayerMusicIndex = this.getMusicIndexWithId(this.currentPlayMusic.id);
    const previousMusicIndex = currentPlayerMusicIndex === 0 ? this.musics.length - 1 : currentPlayerMusicIndex - 1;
    this.currentPlayMusic = this.musics[previousMusicIndex];
    this.initPlayer();
  }

  choiceMusic = (musicId: string): void => {
    this.currentPlayMusic = this.musics[this.getMusicIndexWithId(musicId)];
    this.initPlayer();
  }

  switchPlayType = (): void => {
    switch (this.playType) {
      case playType.loop:
        this.playType = playType.repeat;
        break;
      case playType.repeat:
        this.playType = playType.random;
        break;
      case playType.random:
        this.playType = playType.loop;
        break;
      default:
        throw new Error('No have playType');
    }
  }

  addSound = (): void => {
    const newSound = this.sound + 1;
    this.updateSound(newSound > 100 ? 100 : newSound);
  }

  subSound = (): void => {
    const newSound = this.sound - 1;
    this.updateSound(newSound < 0 ? 0 : newSound);
  }
}

export default AudioPlayer;