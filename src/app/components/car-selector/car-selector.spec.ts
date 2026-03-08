import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarSelector } from './car-selector';

describe('CarSelector', () => {
  let component: CarSelector;
  let fixture: ComponentFixture<CarSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarSelector],
    }).compileComponents();

    fixture = TestBed.createComponent(CarSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
