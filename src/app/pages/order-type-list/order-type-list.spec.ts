import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTypeList } from './order-type-list';

describe('OrderTypeList', () => {
  let component: OrderTypeList;
  let fixture: ComponentFixture<OrderTypeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderTypeList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderTypeList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
