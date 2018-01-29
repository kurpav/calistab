import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { State } from './reducers/settings';
import * as settings from './actions/settings';
import * as fromSettings from './reducers';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  settingsForm: FormGroup;

  private _soundsValueChanges: Subscription;
  private _settingsStateSubscription: Subscription;

  constructor(
    private _fb: FormBuilder,
    private _store: Store<fromSettings.SettingsState>
  ) { }

  ngOnInit() {
    this.settingsForm = this._fb.group({
      sounds: [false]
    });

    this._soundsValueChanges = this.settingsForm.get('sounds').valueChanges
      .subscribe(v => this._store.dispatch(new settings.UpdateSoundsSetting(v)));

    this._settingsStateSubscription = this._store.select(fromSettings.getSettingsEntitiesState)
      .take(1)
      .subscribe((state: State) => this.settingsForm.patchValue(state));
  }

  ngOnDestroy() {
    this._soundsValueChanges.unsubscribe();
    this._settingsStateSubscription.unsubscribe();
  }
}
