import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Howl, Howler } from 'howler';

import * as fromSettings from '../components/settings/reducers';

import * as sprite from './sprite.json';
import { environment } from '../../environments/environment';

@Injectable()
export class SoundService {
  static instance;
  private _sound: any;
  private _isReady: boolean;

  constructor(
    private _store: Store<fromSettings.SettingsState>
  ) {
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

  toggleSounds(value: boolean) {
    Howler.mute(!value);
  }
}

export enum Sound {
  THREE = 'three',
  TWO = 'two',
  ONE = 'one',
  BELL = 'bell',
  END_ROUND = 'end_round',
  END_TABATA = 'end_tabata',
  END = 'end'
}
