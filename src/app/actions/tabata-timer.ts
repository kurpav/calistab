import { Action } from '@ngrx/store';

export enum TabataTimerActionTypes {
  UpdateTotalTime = '[Tabata Timer] Update total time'
}

export class UpdateTotalTime implements Action {
  readonly type = TabataTimerActionTypes.UpdateTotalTime;
  constructor(public payload: number) {}
}

export type TabataTimerActions = UpdateTotalTime;
