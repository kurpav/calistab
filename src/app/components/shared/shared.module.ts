import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule, MatInputModule, MatButtonModule, MatIconModule, MatCardModule, MatSlideToggleModule } from '@angular/material';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';


import { CbSwiperComponent } from './cb-swiper/cb-swiper.component';
import { CbTimeInputComponent } from './cb-time-input/cb-time-input.component';

const SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
  keyboardControl: true
};

@NgModule({
  declarations: [
    CbSwiperComponent,
    CbTimeInputComponent
  ],
  imports: [
    SwiperModule.forRoot(SWIPER_CONFIG),
    ReactiveFormsModule,
  ],
  exports: [
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSlideToggleModule,
    CbSwiperComponent,
    CbTimeInputComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule { }
