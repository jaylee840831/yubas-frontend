import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderNoticeDialog } from '../components/order-notice-dialog/order-notice-dialog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  // 線上預約注意事項
  orderNoticeDialog(): Observable<boolean> {
    const ref = this.dialog.open(OrderNoticeDialog, {
      width: '70vw',
      maxWidth: '1200px',
      height: '90vh',
      maxHeight: '90vh',
      panelClass: 'dark-dialog'
    });

    return ref.afterClosed();
  }
}
