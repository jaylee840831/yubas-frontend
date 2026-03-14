import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderNoticeDialog } from '../components/order-notice-dialog/order-notice-dialog';
import { ConfirmDialog } from '../components/confirm-dialog/confirm-dialog';
import { PrivacyPolicyDialog } from '../components/privacy-policy-dialog/privacy-policy-dialog';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  // 線上預約注意事項
  orderNoticeDialog(): Observable<boolean> {
    const dialogRef = this.dialog.open(OrderNoticeDialog, {
      width: '90vw',
      maxWidth: '1200px',
      height: '90vh',
      maxHeight: '90vh',
      panelClass: 'dark-dialog',
    });

    return dialogRef.afterClosed();
  }

  async confirmDialog(title: string, message: string): Promise<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      panelClass: 'dark-dialog',
      disableClose: true,
      data: { title, message },
    });

    return await firstValueFrom(dialogRef.afterClosed());
  }

  // 隱私權政策
  async privacyPolicyDialog(): Promise<boolean> {
    const dialogRef = this.dialog.open(PrivacyPolicyDialog, {
      width: '90vw',
      maxWidth: '1200px',
      height: '90vh',
      maxHeight: '90vh',
      panelClass: 'dark-dialog',
    });

    return await firstValueFrom(dialogRef.afterClosed());
  }
}
