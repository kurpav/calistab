import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbTimeInputComponent } from './cb-time-input.component';

describe('CbTimeInputComponent', () => {
  let component: CbTimeInputComponent;
  let fixture: ComponentFixture<CbTimeInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbTimeInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbTimeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
