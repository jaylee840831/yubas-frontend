import { Component } from '@angular/core';
import { AuthService } from '../../service/auth-service';

interface User {
  username: string;
  phone: string;
}

@Component({
  selector: 'app-member',
  imports: [],
  templateUrl: './member.html',
  styleUrl: './member.css',
})
export class Member {
  user: User = {
    username: '',
    phone: ''
  };

  constructor(
    private authService: AuthService
  ){}

  ngOnInit() {
    this.user = {
      username: this.authService.getUsername(),
      phone: this.authService.getUserPhone()
    }
  }
}
