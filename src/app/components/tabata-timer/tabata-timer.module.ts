import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';

import { reducers } from './reducers';

import { TabataTimerComponent } from './tabata-timer.component';
import { RoundCounterComponent } from './round-counter/round-counter.component';
import { TimerComponent } from './timer/timer.component';
import { TabataFormComponent } from './tabata-form/tabata-form.component';
import { TabataTimerEffects } from './effects/tabata-timer';
import { TabataTimerService } from './services/tabata-timer.service';

@NgModule({
  declarations: [
    TabataTimerComponent,
    RoundCounterComponent,
    TimerComponent,
    TabataFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    StoreModule.forFeature('tabataTimer', reducers),
    EffectsModule.forFeature([ TabataTimerEffects ]),
  ],
  providers: [
    TabataTimerService,
  ],
  exports: [
    TabataTimerComponent,
    RoundCounterComponent,
    TimerComponent,
    TabataFormComponent,
  ],
})
export class TabataTimerModule { }
