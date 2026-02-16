import { Injectable } from '@angular/core';
import { CommonService } from './common-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private commonService: CommonService
  ){}

  getUser(): any {
    if (typeof window !== 'undefined') {
      const userInfo = localStorage.getItem('userInfo');
      return userInfo ? JSON.parse(userInfo) : null;
    }
    return null;
  }

  getUsername(): string {
    const userInfo =  this.getUser() || null;

    if(userInfo != null) {
      const token = this.commonService.decodeBase64(userInfo.userToken).split(':');
      return token[0];
    }

    return '';
  }

  getUserPhone(): string {
    const userInfo =  this.getUser() || null;

    if(userInfo != null) {
      const token = this.commonService.decodeBase64(userInfo.userToken).split(':');
      return token[1];
    }

    return '';
  }

  logout() {
    localStorage.removeItem('userInfo');
  }
}
