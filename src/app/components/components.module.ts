import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { NavigationComponent } from './navigation/navigation.component';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { TabataTimerComponent } from './tabata-timer/tabata-timer.component';
import { SettingsComponent } from './settings/settings.component';
import { CustomTabataComponent } from './custom-tabata/custom-tabata.component';
import { RoundCounterComponent } from './tabata-timer/round-counter/round-counter.component';
import { TimerComponent } from './tabata-timer/timer/timer.component';
import { TabataFormComponent } from './tabata-timer/tabata-form/tabata-form.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    NavigationComponent,
    StatusBarComponent,
    TabataTimerComponent,
    SettingsComponent,
    CustomTabataComponent,
    RoundCounterComponent,
    TimerComponent,
    TabataFormComponent,
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    NavigationComponent,
    StatusBarComponent,
    TabataTimerComponent,
    SettingsComponent,
    CustomTabataComponent,
    RoundCounterComponent,
    TimerComponent,
    TabataFormComponent,
  ],
})
export class ComponentsModule { }
