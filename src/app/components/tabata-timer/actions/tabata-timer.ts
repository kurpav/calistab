import { Action } from '@ngrx/store';
import { TabataParams } from '../models/tabata';

export enum TabataTimerActionTypes {
  UpdateTabataParams = '[Tabata Timer] Update tabata params'
}

export class UpdateTabataParams implements Action {
  readonly type = TabataTimerActionTypes.UpdateTabataParams;

  constructor(public payload: TabataParams) {}
}

export type TabataTimerActions = UpdateTabataParams;
