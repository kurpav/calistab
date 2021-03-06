import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as RouterActions from '../../actions/router';
import { Router } from '@angular/router';
import { State } from '../../reducers/index';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(private _store: Store<State>, private _router: Router) { }

  ngOnInit() {
  }

  changeState(route: string) {
    this._store.dispatch(new RouterActions.Go({ path: [`/${route}`] }));
  }

  isActive(url: string) {
    const instruction: any[] = [url];
    return this._router.isActive(this._router.createUrlTree(instruction), false);
  }
}
