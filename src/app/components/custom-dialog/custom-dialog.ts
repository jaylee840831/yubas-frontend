import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';

export interface ConfirmDialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-custom-dialog',
  imports: [
    MatDialogModule
  ],
  templateUrl: './custom-dialog.html',
  styleUrl: './custom-dialog.css',
})
export class CustomDialog {
  constructor(
    public dialogRef: MatDialogRef<CustomDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  onConfirm() {
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
