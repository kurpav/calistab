import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTabataComponent } from './custom-tabata.component';

describe('CustomTabataComponent', () => {
  let component: CustomTabataComponent;
  let fixture: ComponentFixture<CustomTabataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomTabataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTabataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
