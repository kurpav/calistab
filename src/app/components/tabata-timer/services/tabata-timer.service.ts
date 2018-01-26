import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromTabataTimer from '../reducers';
import * as tabataTimer from '../actions/tabata-timer';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { soundManager, Sound } from '../../../shared/sound-manager';
// import { of } from 'rxjs/observable/of';
// import { _throw } from 'rxjs/observable/throw';
// import { Observable } from 'rxjs/Observable';

@Injectable()
export class TabataTimerService implements OnDestroy {
  private _secondsLeft: number;
  private _timer: Subscription;

  constructor(private _store: Store<fromTabataTimer.TabataTimerState>) {}

  start(seconds: number, action: any) {
      this._timer = Observable.timer(1000, 1000)
        .take(seconds)
        .subscribe((x) => {
          this._secondsLeft = seconds - (x + 1);
          if (this._secondsLeft === 3) {
            soundManager.play(Sound.THREE);
          } else if (this._secondsLeft === 2) {
            soundManager.play(Sound.TWO);
          } else if (this._secondsLeft === 1) {
            soundManager.play(Sound.ONE);
          }
          this._store.dispatch(new tabataTimer.IncrementSeconds());
        },
        err => console.log(err),
        () => {
          this._store.dispatch(action);
          this._secondsLeft = 0;
        });
  }

  pause() {
    this._timer.unsubscribe();
    this._store.dispatch(new tabataTimer.SaveSegmentTimeLeft(this._secondsLeft));
  }

  stop() {
    this._timer.unsubscribe();
  }

  ngOnDestroy() {
    this._timer.unsubscribe();
  }

}
