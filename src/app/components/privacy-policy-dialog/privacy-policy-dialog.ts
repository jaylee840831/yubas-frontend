import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-privacy-policy-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './privacy-policy-dialog.html',
  styleUrl: './privacy-policy-dialog.css',
})
export class PrivacyPolicyDialog {

}
