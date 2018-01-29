import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { SettingsComponent } from './settings.component';

import { reducers } from './reducers';
import { SettingsEffects } from './effects/settings';
import { SoundService } from '../../shared/sound.service';

import * as fromSettings from './reducers';

@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    StoreModule.forFeature('settings', reducers),
    EffectsModule.forFeature([SettingsEffects]),
  ],
  exports: [
    SettingsComponent,
  ],
})
export class SettingsModule {
  constructor(
    private _soundService: SoundService,
    private _store: Store<fromSettings.SettingsState>
  ) {
    this._store.select(fromSettings.getSoundsState)
      .take(1)
      .subscribe(v => this._soundService.toggleSounds(v));
  }
}
