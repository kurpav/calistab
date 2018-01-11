import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms/src/model';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { TabataParams } from '../models/tabata';
import { Store } from '@ngrx/store';
import { State } from '../../../reducers/index';
import { Observable } from 'rxjs/Observable';

import * as tabataTimer from '../actions/tabata-timer';
import * as fromTabataTimer from '../reducers';

const DEFAULT_TABATAS = 1;
const DEFAULT_TABATA_TIME_OFF = 0;
const DEFAULT_ROUNDS = 5;
const DEFAULT_TIME_ON = 60;
const DEFAULT_TIME_OFF = 30;
const DEFAULT_PREPARATION_TIME = 10;

@Component({
  selector: 'app-tabata-form',
  templateUrl: './tabata-form.component.html',
  styleUrls: ['./tabata-form.component.scss']
})
export class TabataFormComponent implements OnInit, OnDestroy {
  tabataForm: FormGroup;
  totalTime$: Observable<string>;

  private _tabataFormChanges: Subscription;

  constructor(private _fb: FormBuilder, private _store: Store<fromTabataTimer.State>) {
    this.totalTime$ = _store.select(fromTabataTimer.getTotalTime);
  }

  ngOnInit() {
    this.tabataForm = this._fb.group({
      tabatas: [DEFAULT_TABATAS, Validators.required],
      tabataTimeOff: [DEFAULT_TABATA_TIME_OFF, Validators.required],
      rounds: [DEFAULT_ROUNDS, Validators.required],
      roundTimeOn: [DEFAULT_TIME_ON, Validators.required],
      roundTimeOff: [DEFAULT_TIME_OFF, Validators.required],
      preparationTime: [DEFAULT_PREPARATION_TIME, Validators.required],
    });
    this._tabataFormChanges = this.tabataForm.valueChanges.subscribe((value: TabataParams) => {
      this._store.dispatch(new tabataTimer.UpdateTabataParams(value));
    });

    this._store.dispatch(new tabataTimer.UpdateTabataParams({
      tabatas: DEFAULT_TABATAS,
      tabataTimeOff: DEFAULT_TABATA_TIME_OFF,
      rounds: DEFAULT_ROUNDS,
        roundTimeOn: DEFAULT_TIME_ON,
        roundTimeOff: DEFAULT_TIME_OFF,
        preparationTime: DEFAULT_PREPARATION_TIME
      }));
  }

  ngOnDestroy() {
    this._tabataFormChanges.unsubscribe();
  }

}
