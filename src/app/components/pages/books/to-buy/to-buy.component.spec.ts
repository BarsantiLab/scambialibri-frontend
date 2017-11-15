import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToBuyComponent } from './to-buy.component';

describe('ToBuyComponent', () => {
  let component: ToBuyComponent;
  let fixture: ComponentFixture<ToBuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToBuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
