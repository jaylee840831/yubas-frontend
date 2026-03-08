import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { BillInfo } from '../../models/order.model';

type InvoiceType = 'personal' | 'company';

@Component({
  selector: 'app-bill',
  imports: [CommonModule, FormsModule, MatRadioModule],
  templateUrl: './bill.html',
  styleUrl: './bill.css',
})
export class Bill {
  bill: BillInfo = {
    number: '',
    company: '',
    address: '',
  };

  invoiceType: InvoiceType = 'personal';

  @Output() billChange = new EventEmitter<BillInfo>();

  onInvoiceTypeChange(type: InvoiceType) {
    this.invoiceType = type;

    // reset 所有欄位
    this.bill = {
      number: '',
      company: '',
      address: '',
    };

    this.emitBill();
  }

  emitBill() {
    this.billChange.emit(this.bill);
  }
}
