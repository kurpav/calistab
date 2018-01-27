import { Howl, Howler } from 'howler';

import * as sprite from './sprite.json';
import { environment } from '../../environments/environment';

class SoundManager {
  static instance;
  private _sound: any;
  private _isReady: boolean;

  constructor() {
    if (!SoundManager.instance) {
      SoundManager.instance = this;
    }

    return SoundManager.instance;
  }

  init() {
    this._isReady = false;
    this._sound = new Howl({
      src: environment.soundsPath,
      sprite
    });
    this._sound.once('load', () => this._isReady = true);
  }

  play(sound: Sound) {
    this._sound.play(sound);
  }
}

const instance = new SoundManager();
// Object.freeze(instance);

export const soundManager = instance;

export enum Sound {
  THREE = 'three',
  TWO = 'two',
  ONE = 'one',
  BELL = 'bell',
  END_ROUND = 'end_round',
  END_TABATA = 'end_tabata',
  END = 'end'
}
