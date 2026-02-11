import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-order-notice-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatTabsModule, CommonModule],
  templateUrl: './order-notice-dialog.html',
  styleUrl: './order-notice-dialog.css',
})
export class OrderNoticeDialog {
  isMobile = window.innerWidth <= 752;

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth <= 752;
  }
}
