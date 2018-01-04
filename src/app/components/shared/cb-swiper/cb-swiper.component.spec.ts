import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbSwiperComponent } from './cb-swiper.component';

describe('CbSwiperComponent', () => {
  let component: CbSwiperComponent;
  let fixture: ComponentFixture<CbSwiperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbSwiperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
