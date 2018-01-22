import { Component, OnInit, ViewEncapsulation, EventEmitter, Output, Input } from '@angular/core';

import { SwiperComponent, SwiperDirective, SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-cb-swiper',
  templateUrl: './cb-swiper.component.html',
  styleUrls: ['./cb-swiper.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CbSwiperComponent implements OnInit {
  @Input() disabled: boolean;
  @Output() indexChange = new EventEmitter<any>();

  public config: SwiperConfigInterface = {
    scrollbar: null,
    direction: 'horizontal',
    slidesPerView: 1,
    scrollbarHide: false,
    keyboardControl: true,
    mousewheelControl: true,
    scrollbarDraggable: true,
    scrollbarSnapOnRelease: true,
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: null,
    prevButton: null
  };

  constructor() { }

  ngOnInit() {
  }

  onIndexChange(index: number) {
    this.indexChange.emit(index);
  }
}
