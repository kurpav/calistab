import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import * as tabataTimer from '../actions/tabata-timer';
import * as fromTabataTimer from '../reducers';
import { State } from '../reducers/tabata-timer';

import { TabataTimerService } from '../services/tabata-timer.service';
import { Observable } from 'rxjs/Observable';
import { TabataTimerState } from '../reducers';
import { Status } from '../enums/status';
import { soundManager, Sound } from '../../../shared/sound-manager';

@Injectable()
export class TabataTimerEffects {
  @Effect({ dispatch: false })
  start$ = this.actions$.ofType(tabataTimer.TabataTimerActionTypes.StartTabata)
    .withLatestFrom(this._store)
    .do(([action, state]) => {
      const tts: State = state.tabataTimer.tabataTimer;
      if (tts.params.preparationTime > 0) {
        this._tatataTimerService.start(tts.params.preparationTime, new tabataTimer.FinishPreparation());
      } else {
        this._tatataTimerService.start(tts.params.roundTimeOn, new tabataTimer.FinishRound());
      }
    });

  @Effect({ dispatch: false })
  finishPreparation$ = this.actions$.ofType(tabataTimer.TabataTimerActionTypes.FinishPreparation)
  .withLatestFrom(this._store)
  .do(([action, state]) => {
    const tts: State = state.tabataTimer.tabataTimer;
    soundManager.play(Sound.BELL);
    this._tatataTimerService.start(tts.params.roundTimeOn, new tabataTimer.FinishRound());
  });

  @Effect({ dispatch: false })
  finishRound$ = this.actions$.ofType(tabataTimer.TabataTimerActionTypes.FinishRound)
  .withLatestFrom(this._store)
  .do(([action, state]) => {
    const tts: State = state.tabataTimer.tabataTimer;
    const isTimerFinished = tts.currentRound > tts.totalRounds;
    const isTabataFinished = (tts.currentRound !== tts.totalRounds) && (tts.currentRound % tts.params.rounds) === 0;

    if (isTimerFinished) {
      soundManager.play(Sound.END);
      this._store.dispatch(new tabataTimer.FinishTimer());
    } else if (isTabataFinished) {
      soundManager.play(Sound.END_TABATA);
      this._tatataTimerService.start(tts.params.tabataTimeOff, new tabataTimer.FinishRest());
    } else {
      soundManager.play(Sound.END_ROUND);
      this._tatataTimerService.start(tts.params.roundTimeOff, new tabataTimer.FinishRest());
    }
  });

  @Effect({ dispatch: false })
  finishRest$ = this.actions$.ofType(tabataTimer.TabataTimerActionTypes.FinishRest)
  .withLatestFrom(this._store)
  .do(([action, state]) => {
    const tts: State = state.tabataTimer.tabataTimer;
    soundManager.play(Sound.BELL);
    this._tatataTimerService.start(tts.params.roundTimeOn, new tabataTimer.FinishRound());
  });

  @Effect({ dispatch: false })
  pause$ = this.actions$.ofType(tabataTimer.TabataTimerActionTypes.PauseTabata)
  .withLatestFrom(this._store)
  .do(([action, state]) => {
    const tts: State = state.tabataTimer.tabataTimer;
    this._tatataTimerService.pause();
  });

  @Effect({ dispatch: false })
  resume$ = this.actions$.ofType(tabataTimer.TabataTimerActionTypes.ResumeTabata)
  .withLatestFrom(this._store)
  .do(([action, state]) => {
    const tts: State = state.tabataTimer.tabataTimer;
    let nextAction: any = new tabataTimer.FinishRound();
    if (tts.status === Status.REST) {
      nextAction = new tabataTimer.FinishRest();
    }
    this._tatataTimerService.start(tts.segmentSecondsLeft, nextAction);
  });

  @Effect({ dispatch: false })
  reset$ = this.actions$.ofType(tabataTimer.TabataTimerActionTypes.ResetTabata)
  .withLatestFrom(this._store)
  .do(([action, state]) => {
    this._tatataTimerService.stop();
  });

  constructor(
    private actions$: Actions,
    private _tatataTimerService: TabataTimerService,
    private _store: Store<fromTabataTimer.State>
  ) { }
}
