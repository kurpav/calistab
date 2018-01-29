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
import { TabataTimerState } from '../reducers';
import { Status } from '../enums/status';
import { Sound, SoundService } from '../../../shared/sound.service';

@Injectable()
export class TabataTimerEffects {
  @Effect({ dispatch: false })
  start$ = this.actions$.ofType(tabataTimer.TabataTimerActionTypes.StartTabata)
    .withLatestFrom(this._store)
    .do(([action, state]) => {
      const tts: State = state.tabataTimer.tabataTimer;
      if (tts.params.preparationTime > 0) {
        this._tabataTimerService.start(tts.params.preparationTime, new tabataTimer.FinishPreparation());
      } else {
        this._tabataTimerService.start(tts.params.roundTimeOn, new tabataTimer.FinishRound());
      }
    });

  @Effect({ dispatch: false })
  finishPreparation$ = this.actions$.ofType(tabataTimer.TabataTimerActionTypes.FinishPreparation)
  .withLatestFrom(this._store)
  .do(([action, state]) => {
    const tts: State = state.tabataTimer.tabataTimer;
    this._soundService.play(Sound.BELL);
    this._tabataTimerService.start(tts.params.roundTimeOn, new tabataTimer.FinishRound());
  });

  @Effect({ dispatch: false })
  finishRound$ = this.actions$.ofType(tabataTimer.TabataTimerActionTypes.FinishRound)
  .withLatestFrom(this._store)
  .do(([action, state]) => {
    const tts: State = state.tabataTimer.tabataTimer;
    const isTimerFinished = tts.currentRound > tts.totalRounds;
    const isTabataFinished = (tts.currentRound !== tts.totalRounds) && (tts.currentRound % tts.params.rounds) === 0;

    if (isTimerFinished) {
      this._soundService.play(Sound.END);
      this._store.dispatch(new tabataTimer.FinishTimer());
    } else if (isTabataFinished) {
      this._soundService.play(Sound.END_TABATA);
      this._tabataTimerService.start(tts.params.tabataTimeOff, new tabataTimer.FinishRest());
    } else {
      this._soundService.play(Sound.END_ROUND);
      this._tabataTimerService.start(tts.params.roundTimeOff, new tabataTimer.FinishRest());
    }
  });

  @Effect({ dispatch: false })
  finishRest$ = this.actions$.ofType(tabataTimer.TabataTimerActionTypes.FinishRest)
  .withLatestFrom(this._store)
  .do(([action, state]) => {
    const tts: State = state.tabataTimer.tabataTimer;
    this._soundService.play(Sound.BELL);
    this._tabataTimerService.start(tts.params.roundTimeOn, new tabataTimer.FinishRound());
  });

  @Effect({ dispatch: false })
  pause$ = this.actions$.ofType(tabataTimer.TabataTimerActionTypes.PauseTabata)
  .withLatestFrom(this._store)
  .do(([action, state]) => {
    const tts: State = state.tabataTimer.tabataTimer;
    this._tabataTimerService.pause();
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
    this._tabataTimerService.start(tts.segmentSecondsLeft, nextAction);
  });

  @Effect({ dispatch: false })
  reset$ = this.actions$.ofType(tabataTimer.TabataTimerActionTypes.ResetTabata)
  .withLatestFrom(this._store)
  .do(([action, state]) => {
    this._tabataTimerService.stop();
  });

  constructor(
    private actions$: Actions,
    private _tabataTimerService: TabataTimerService,
    private _store: Store<fromTabataTimer.State>,
    private _soundService: SoundService
  ) { }
}
