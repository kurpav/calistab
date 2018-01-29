import { SettingsActions, SettingsActionTypes } from '../actions/settings';

export interface State {
  sounds: boolean;
}

const initialState: State = {
  sounds: true
};

export function reducer(
  state: State = initialState,
  action: SettingsActions
): State {
  switch (action.type) {
    case SettingsActionTypes.UpdateSoundsSetting:
      return { ...state, sounds: action.payload };

    default:
      return state;
  }
}
