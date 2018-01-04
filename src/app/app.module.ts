import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { MatSelectModule, MatInputModule, MatButtonModule, MatIconModule } from '@angular/material';

import 'hammerjs';

import { routes } from './routes';
import { reducer } from './reducers';

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { StatusBarComponent } from './components/status-bar/status-bar.component';
import { TabataTimerComponent } from './components/tabata-timer/tabata-timer.component';
import { SettingsComponent } from './components/settings/settings.component';
import { CustomTabataComponent } from './components/custom-tabata/custom-tabata.component';
import { RoundCounterComponent } from './components/tabata-timer/round-counter/round-counter.component';
import { TimerComponent } from './components/tabata-timer/timer/timer.component';
import { SharedModule } from './components/shared/shared.module';
import { TabataFormComponent } from './components/tabata-timer/tabata-form/tabata-form.component';

@NgModule({
  declarations: [
    AppComponent,
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
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { useHash: true }),

    /**
     * StoreModule.provideStore is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.provideStore(reducer),

    /**
     * @ngrx/router-store keeps router state up-to-date in the store and uses
     * the store as the single source of truth for the router's state.
     */
    RouterStoreModule.connectRouter(),

    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    }),

    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
