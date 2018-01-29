import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromSettings from './settings';
import * as fromRoot from '../../../reducers';

export interface SettingsState {
  settings: fromSettings.State;
}

export interface State extends fromRoot.State {
  settings: SettingsState;
}

export const reducers = {
  settings: fromSettings.reducer,
};

export const getSettingsState = createFeatureSelector<SettingsState>('settings');
export const getSettingsEntitiesState = createSelector(getSettingsState, state => state.settings);

export const getSoundsState = createSelector(getSettingsEntitiesState, state => state.sounds);
