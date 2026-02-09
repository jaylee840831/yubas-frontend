import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderNoticeDialog } from './order-notice-dialog';

describe('OrderNoticeDialog', () => {
  let component: OrderNoticeDialog;
  let fixture: ComponentFixture<OrderNoticeDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderNoticeDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderNoticeDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
