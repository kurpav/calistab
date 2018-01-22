import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { TabataParams } from '../models/tabata';
import { Store } from '@ngrx/store';
import { State } from '../../../reducers/index';
import { Observable } from 'rxjs/Observable';

import * as tabataTimer from '../actions/tabata-timer';
import * as fromTabataTimer from '../reducers';
import { DefaultParams } from '../enums/default-params';

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
      tabatas: [DefaultParams.TABATAS, Validators.required],
      tabataTimeOff: [DefaultParams.TABATA_TIME_OFF, Validators.required],
      rounds: [DefaultParams.ROUNDS, Validators.required],
      roundTimeOn: [DefaultParams.TIME_ON, Validators.required],
      roundTimeOff: [DefaultParams.TIME_OFF, Validators.required],
      preparationTime: [DefaultParams.PREPARATION_TIME, Validators.required],
    });
    this._tabataFormChanges = this.tabataForm.valueChanges.subscribe((value: TabataParams) => {
      this._store.dispatch(new tabataTimer.UpdateTabataParams(value));
    });

    this._store.dispatch(new tabataTimer.UpdateTabataParams({
      tabatas: DefaultParams.TABATAS,
      tabataTimeOff: DefaultParams.TABATA_TIME_OFF,
      rounds: DefaultParams.ROUNDS,
        roundTimeOn: DefaultParams.TIME_ON,
        roundTimeOff: DefaultParams.TIME_OFF,
        preparationTime: DefaultParams.PREPARATION_TIME
      }));
  }

  ngOnDestroy() {
    this._tabataFormChanges.unsubscribe();
  }

}
