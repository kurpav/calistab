import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromTabataTimer from '../reducers';
import * as tabataTimer from '../actions/tabata-timer';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Sound, SoundService } from '../../../shared/sound.service';

@Injectable()
export class TabataTimerService implements OnDestroy {
  private _secondsLeft: number;
  private _timer: Subscription;

  constructor(
    private _store: Store<fromTabataTimer.TabataTimerState>,
    private _soundService: SoundService,
  ) {}

  start(seconds: number, action: any) {
      this._timer = Observable.timer(1000, 1000)
        .take(seconds)
        .subscribe((x) => {
          this._secondsLeft = seconds - (x + 1);
          if (this._secondsLeft === 3) {
            this._soundService.play(Sound.THREE);
          } else if (this._secondsLeft === 2) {
            this._soundService.play(Sound.TWO);
          } else if (this._secondsLeft === 1) {
            this._soundService.play(Sound.ONE);
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
    if (this._timer) {
      this._timer.unsubscribe();
    }
  }

}
