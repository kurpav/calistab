import { State } from '../../reducers';
import { Store } from '@ngrx/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from '../../shared/utils';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss']
})
export class StatusBarComponent implements OnInit, OnDestroy {
  private _routes$: Subscription;
  private STATES_MAP = {
    '/tabata': 'Tabata',
    '/custom': 'Custom',
    '/settings': 'Settings',
  };

  state: string;

  constructor(private _store: Store<State>) { }

  ngOnInit() {
    this._routes$ = this._store.select('router').subscribe((state: RouterReducerState<RouterStateUrl>) => {
      if (state) {
        this.state = this.STATES_MAP[state.state.url];
      }
    });
  }

  ngOnDestroy() {
    this._routes$.unsubscribe();
  }

}
