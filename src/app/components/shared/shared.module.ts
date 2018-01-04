import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { CbSwiperComponent } from './cb-swiper/cb-swiper.component';

const SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
  keyboardControl: true
};

@NgModule({
  declarations: [
    CbSwiperComponent
  ],
  imports: [
    SwiperModule.forRoot(SWIPER_CONFIG)
  ],
  exports: [
    CbSwiperComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule { }
