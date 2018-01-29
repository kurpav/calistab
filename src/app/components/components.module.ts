import { NgModule } from '@angular/core';

import { SharedModule } from './shared/shared.module';
import { TabataTimerModule } from './tabata-timer/tabata-timer.module';
import { SettingsModule } from './settings/settings.module';

import { NavigationComponent } from './navigation/navigation.component';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { CustomTabataComponent } from './custom-tabata/custom-tabata.component';

@NgModule({
  declarations: [
    NavigationComponent,
    StatusBarComponent,
    CustomTabataComponent,
  ],
  imports: [
    SharedModule,
    TabataTimerModule,
    SettingsModule
  ],
  exports: [
    NavigationComponent,
    StatusBarComponent,
    CustomTabataComponent,
  ],
})
export class ComponentsModule { }
