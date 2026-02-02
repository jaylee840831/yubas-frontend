import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  go_to_line_call(){
    window.open('https://line.me/R/oa/call/@671pygmo?confirmation=true&from=call_url', '_blank');
  }

  go_to_line(){
    window.open('https://page.line.me/yubas', '_blank');
  }

  go_to_fb(){
    window.open('https://www.facebook.com/people/Yubas%E6%A9%9F%E5%A0%B4%E6%8E%A5%E9%80%81/61564645902840/', '_blank');
  }

  go_to_ig(){
    window.open('https://www.instagram.com/yubas0800/', '_blank');
  }

  go_to_youtube(){
    window.open('https://www.youtube.com/@YUBAS%E6%A9%9F%E5%A0%B4%E6%8E%A5%E9%80%81', '_blank');
  }

  go_to_google(){
    window.open('https://share.google/2W5xjO3wXYfhgcbsO', '_blank');
  }
}
