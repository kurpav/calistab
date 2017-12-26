import { Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TabataTimerComponent } from './components/tabata-timer/tabata-timer.component';
import { CustomTabataComponent } from './components/custom-tabata/custom-tabata.component';
import { SettingsComponent } from './components/settings/settings.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/tabata',
    pathMatch: 'full'
  },
  {
    path: 'tabata',
    component: TabataTimerComponent
  },
  {
    path: 'custom',
    component: CustomTabataComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  }
  // {
  //   path: '**',
  //   component: NotFoundPageComponent
  // }
];
