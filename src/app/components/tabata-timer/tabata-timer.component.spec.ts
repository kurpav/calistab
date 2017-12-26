import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabataTimerComponent } from './tabata-timer.component';

describe('TabataTimerComponent', () => {
  let component: TabataTimerComponent;
  let fixture: ComponentFixture<TabataTimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabataTimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabataTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
