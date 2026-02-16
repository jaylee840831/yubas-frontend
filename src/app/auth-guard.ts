import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const hasToken = !!localStorage.getItem('userInfo');

  if (hasToken) {
    // 有登入資料
    return true;
  } else {
    // 沒登入 導向登入頁
    router.navigate(['/login']);
    return false;
  }
};
