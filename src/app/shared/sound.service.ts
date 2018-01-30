import { Injectable, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Howl, Howler } from '../shared/libs.provider';

import * as fromSettings from '../components/settings/reducers';

import { sprite } from './sprite';
import { environment } from '../../environments/environment';

@Injectable()
export class SoundService {
  private _sound: Howl;
  private _isReady: boolean;

  constructor(
    private _store: Store<fromSettings.SettingsState>,
    @Inject(Howl) private _howl: HowlStatic,
    @Inject(Howler) private _howler: HowlerGlobal,
  ) {
    this._isReady = false;
    this._sound = new this._howl({
      src: environment.soundsPath,
      sprite,
    });
    this._sound.once('load', () => this._isReady = true);
  }

  play(sound: Sound) {
    this._sound.play(sound);
  }

  toggleSounds(value: boolean) {
    this._howler.mute(!value);
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
