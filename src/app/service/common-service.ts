import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private headerHeightSource = new BehaviorSubject<number>(0);
  headerHeight$ = this.headerHeightSource.asObservable();

  setHeaderHeight(height: number) {
    setTimeout(() => this.headerHeightSource.next(height));
  }

  encodeBase64(str: string): string {
    const bytes = new TextEncoder().encode(str);
    return btoa(String.fromCharCode(...bytes));
  }

  decodeBase64(base64Str: string): string {
    const bytes = atob(base64Str)
      .split('')
      .map((c) => c.charCodeAt(0));
    return new TextDecoder().decode(new Uint8Array(bytes));
  }
}
