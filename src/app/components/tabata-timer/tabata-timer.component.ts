import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as tabataTimer from './actions/tabata-timer';
import * as fromTabataTimer from './reducers';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-tabata-timer',
  templateUrl: './tabata-timer.component.html',
  styleUrls: ['./tabata-timer.component.scss']
})
export class TabataTimerComponent implements OnInit, OnDestroy {
  isStarted$: Observable<boolean>;
  currentTime$: Observable<number>;
  currentRound$: Observable<number>;
  totalRounds$: Observable<number>;

  private _segmentSecondsLeft: Subscription;

  constructor(private _store: Store<fromTabataTimer.TabataTimerState>) {
    this.isStarted$ = _store.select(fromTabataTimer.getIsStarted);
    this.currentTime$ = _store.select(fromTabataTimer.getCurrentTime);
    this.totalRounds$ = _store.select(fromTabataTimer.getTotalRounds);
    this.currentRound$ = _store.select(fromTabataTimer.getCurrentRound)
      .withLatestFrom(this.totalRounds$)
      .map(([c, t]) => c > t ? t : c);
  }

  ngOnInit() {
  }

  start() {
    this._segmentSecondsLeft = this._store.select(fromTabataTimer.getSegmentSecondsLeft).take(1).subscribe((x) => {
      if (x === 0) {
        this._store.dispatch(new tabataTimer.StartTabata());
      } else {
        this._store.dispatch(new tabataTimer.ResumeTabata());
      }
    });
  }

  pause() {
    this._store.dispatch(new tabataTimer.PauseTabata());
  }

  reset() {
    this._store.dispatch(new tabataTimer.ResetTabata());
  }

  ngOnDestroy() {
    if (this._segmentSecondsLeft) {
      this._segmentSecondsLeft.unsubscribe();
    }
  }
}
