import { NgModule } from '@angular/core';

import { SharedModule } from './shared/shared.module';
import { TabataTimerModule } from './tabata-timer/tabata-timer.module';

import { NavigationComponent } from './navigation/navigation.component';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { SettingsComponent } from './settings/settings.component';
import { CustomTabataComponent } from './custom-tabata/custom-tabata.component';

@NgModule({
  declarations: [
    NavigationComponent,
    StatusBarComponent,
    SettingsComponent,
    CustomTabataComponent,
  ],
  imports: [
    SharedModule,
    TabataTimerModule
  ],
  exports: [
    NavigationComponent,
    StatusBarComponent,
    SettingsComponent,
    CustomTabataComponent,
  ],
})
export class ComponentsModule { }
