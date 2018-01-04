import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-round-counter',
  templateUrl: './round-counter.component.html',
  styleUrls: ['./round-counter.component.scss']
})
export class RoundCounterComponent implements OnInit {
  @Input() current: number;
  @Input() total: number;

  constructor() { }

  ngOnInit() {}

}
