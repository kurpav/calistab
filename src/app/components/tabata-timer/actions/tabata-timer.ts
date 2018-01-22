import { Action } from '@ngrx/store';
import { TabataParams } from '../models/tabata';

export enum TabataTimerActionTypes {
  UpdateTabataParams = '[Tabata Timer] Update tabata params',
  StartTabata = '[Tabata Timer] Start tabata',
  PauseTabata = '[Tabata Timer] Pause tabata',
  ResetTabata = '[Tabata Timer] Reset tabata',
  IncrementSeconds = '[Tabata Timer] Increment seconds',
  FinishPreparation = '[Tabata Timer] Finish preparation',
  FinishRound = '[Tabata Timer] Finish round',
  FinishRest = '[Tabata Timer] Finish rest',
  FinishTimer = '[Tabata Timer] Finish timer',
  SaveSegmentTimeLeft = '[Tabata Timer] Save segment time left',
  ResumeTabata = '[Tabata Timer] Resume tabata'
}

export class UpdateTabataParams implements Action {
  readonly type = TabataTimerActionTypes.UpdateTabataParams;

  constructor(public payload: TabataParams) {}
}

export class StartTabata implements Action {
  readonly type = TabataTimerActionTypes.StartTabata;

  constructor(public payload: any = null) {}
}

export class PauseTabata implements Action {
  readonly type = TabataTimerActionTypes.PauseTabata;

  constructor(public payload: any = null) {}
}

export class ResetTabata implements Action {
  readonly type = TabataTimerActionTypes.ResetTabata;

  constructor(public payload: any = null) {}
}

export class IncrementSeconds implements Action {
  readonly type = TabataTimerActionTypes.IncrementSeconds;

  constructor(public payload: any = null) {}
}

export class FinishPreparation implements Action {
  readonly type = TabataTimerActionTypes.FinishPreparation;

  constructor(public payload: any = null) {}
}

export class FinishRound implements Action {
  readonly type = TabataTimerActionTypes.FinishRound;

  constructor(public payload: any = null) {}
}

export class FinishRest implements Action {
  readonly type = TabataTimerActionTypes.FinishRest;

  constructor(public payload: any = null) {}
}

export class FinishTimer implements Action {
  readonly type = TabataTimerActionTypes.FinishTimer;

  constructor(public payload: any = null) {}
}

export class SaveSegmentTimeLeft implements Action {
  readonly type = TabataTimerActionTypes.SaveSegmentTimeLeft;

  constructor(public payload: any = null) {}
}

export class ResumeTabata implements Action {
  readonly type = TabataTimerActionTypes.ResumeTabata;

  constructor(public payload: any = null) {}
}

export type TabataTimerActions =
  UpdateTabataParams |
  StartTabata |
  PauseTabata |
  ResetTabata |
  IncrementSeconds |
  FinishPreparation |
  FinishRound |
  FinishRest |
  FinishTimer |
  SaveSegmentTimeLeft |
  ResumeTabata;
