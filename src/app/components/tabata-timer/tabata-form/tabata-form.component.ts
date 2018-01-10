import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms/src/model';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Tabata } from '../tabata.model';

const DEFAULT_TABATAS: number = 1;
const DEFAULT_ROUNDS: number = 5;
const DEFAULT_TIME_ON: number = 60;
const DEFAULT_TIME_OFF: number = 30;
const DEFAULT_PREPARATION_TIME: number = 10;

@Component({
  selector: 'app-tabata-form',
  templateUrl: './tabata-form.component.html',
  styleUrls: ['./tabata-form.component.scss']
})
export class TabataFormComponent implements OnInit, OnDestroy {
  tabataForm: FormGroup;
  totalTime: string;
  totalSeconds: number;

  private _tabataFormChanges: Subscription;

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    this.tabataForm = this._fb.group({
      tabatas: [DEFAULT_TABATAS, Validators.required ],
      rounds: [DEFAULT_ROUNDS, Validators.required ],
      timeOn: [DEFAULT_TIME_ON, Validators.required ],
      timeOff: [DEFAULT_TIME_OFF, Validators.required ],
      preparationTime: [DEFAULT_PREPARATION_TIME, Validators.required ],
    });
    this._tabataFormChanges = this.tabataForm.valueChanges.subscribe((value: Tabata) => {
      this._updateTotalTime(value.tabatas, value.rounds, value.timeOn, value.timeOff, value.preparationTime);
    });
    this._updateTotalTime(DEFAULT_TABATAS, DEFAULT_ROUNDS, DEFAULT_TIME_ON, DEFAULT_TIME_OFF, DEFAULT_PREPARATION_TIME);
  }

  private _updateTotalTime(tabatas: number, rounds: number, timeOn: number, timeOff: number, preparationTime: number) {
    this.totalSeconds = tabatas * (rounds * (timeOn + timeOff)) + preparationTime;
    this.totalTime = `${Math.trunc(this.totalSeconds / 60)}:${this.totalSeconds % 60}`;
  }

  ngOnDestroy() {
    this._tabataFormChanges.unsubscribe();
  }

}
