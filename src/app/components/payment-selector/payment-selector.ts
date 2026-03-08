import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { PaymentInfo } from '../../models/order.model';

@Component({
  selector: 'app-payment-selector',
  standalone: true,
  imports: [CommonModule, FormsModule, MatRadioModule],
  templateUrl: './payment-selector.html',
})
export class PaymentSelector implements OnInit {
  @Output() paymentSelected = new EventEmitter<PaymentInfo>();

  payments = [
    { label: '現金', value: 'cash' },
    { label: '信用卡支付', value: 'creditCard' },
    { label: 'Line Pay', value: 'linePay' }
  ];

  selectedValue: PaymentInfo = this.payments[0];

  isDisabled(method: PaymentInfo) {
    return method.value === 'creditCard' || method.value === 'linePay';
  }

  ngOnInit(): void {
    this.paymentSelected.emit(this.payments[0]);
  }

  onSelectionChange(method: PaymentInfo) {
    this.paymentSelected.emit(method);
  }
}