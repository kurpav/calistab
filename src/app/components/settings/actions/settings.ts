import { Action } from '@ngrx/store';

export enum SettingsActionTypes {
  UpdateSoundsSetting = '[Settings] Update sounds setting'
}

export class UpdateSoundsSetting implements Action {
  readonly type = SettingsActionTypes.UpdateSoundsSetting;

  constructor(public payload: boolean) {}
}

export type SettingsActions =
  UpdateSoundsSetting;
