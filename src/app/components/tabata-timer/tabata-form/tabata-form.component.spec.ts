import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabataFormComponent } from './tabata-form.component';

describe('TabataFormComponent', () => {
  let component: TabataFormComponent;
  let fixture: ComponentFixture<TabataFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabataFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
