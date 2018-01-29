import 'rxjs/add/operator/do';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import * as fromSettings from '../reducers';
import * as settings from '../actions/settings';

import { SoundService } from '../../../shared/sound.service';

@Injectable()
export class SettingsEffects {
  @Effect({ dispatch: false })
  start$ = this.actions$.ofType(settings.SettingsActionTypes.UpdateSoundsSetting)
    .do((action: settings.UpdateSoundsSetting) => {
      this._soundService.toggleSounds(action.payload);
    });

  constructor(
    private actions$: Actions,
    private _soundService: SoundService
  ) { }
}
