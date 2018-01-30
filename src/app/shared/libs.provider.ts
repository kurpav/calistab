import { InjectionToken, ValueProvider, ClassProvider } from '@angular/core';

const Howl: InjectionToken<HowlStatic> = new InjectionToken<HowlStatic>('Howl');
const HowlProvider: ValueProvider = { provide: Howl, useValue: window['Howl'] };

const Howler: InjectionToken<HowlerGlobal> = new InjectionToken<HowlerGlobal>('Howler');
const HowlerProvider: ValueProvider = { provide: Howler, useValue: window['Howler'] };

console.log(window['Howl'], window['Howler']);

export { Howl, HowlProvider, Howler, HowlerProvider };
