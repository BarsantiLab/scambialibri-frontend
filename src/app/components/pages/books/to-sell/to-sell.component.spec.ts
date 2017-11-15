import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToSellComponent } from './to-sell.component';

describe('ToSellComponent', () => {
  let component: ToSellComponent;
  let fixture: ComponentFixture<ToSellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToSellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
