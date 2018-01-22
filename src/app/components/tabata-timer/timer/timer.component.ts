import { Component, OnInit, Input } from '@angular/core';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { timeToString } from '../../../shared/utils';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnChanges {
  @Input() time = 0;

  minutes: string;
  seconds: string;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.seconds = `${timeToString(this.time % 60)}`;
    this.minutes = `${timeToString(Math.trunc(this.time / 60))}`;
  }

}
