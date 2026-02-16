import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  userName: string | null = null;
  menuOpen = false;
  blogMenuOpen = false;
  businessMenuOpen = false;
  userMenuOpen = false;
  @ViewChild('userMenu') userMenu!: ElementRef;
  @ViewChild('blogMenu') blogMenu!: ElementRef;
  @ViewChild('businessMenu') businessMenu!: ElementRef;
  @ViewChild('mainMenu') mainMenu!: ElementRef;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userName = this.authService.getUsername();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleBlogMenu(event: MouseEvent) {
    event.stopPropagation();   // 防止被 document click 關掉
    this.blogMenuOpen = !this.blogMenuOpen;
  }

  toggleBusinessMenu(event: Event) {
    event.stopPropagation();
    this.businessMenuOpen = !this.businessMenuOpen;
  }

  toggleUserMenu(event: Event) {
    event.stopPropagation();
    this.userMenuOpen = !this.userMenuOpen;
  }

  closeMenuAll() {
    this.menuOpen = false;
    this.blogMenuOpen = false;
    this.businessMenuOpen = false;
    this.userMenuOpen = false;
  }

  logout() {
    this.closeMenuAll();
    this.authService.logout();
    this.userName = '';
  }

  // 監聽整個文件的點擊
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.blogMenuOpen && !this.businessMenuOpen && !this.menuOpen && !this.userMenuOpen) return;

    // main menu
    const clickedInsideMainMenu =
      this.mainMenu.nativeElement.contains(event.target);

    if (!clickedInsideMainMenu) {
      this.menuOpen = false;
    }
    
    // blog menu
    const clickedInsideBlogMenu =
      this.blogMenu.nativeElement.contains(event.target);

    if (!clickedInsideBlogMenu) {
      this.blogMenuOpen = false;
    }

    // business menu
    const clickedInsideBusinessMenu =
      this.businessMenu.nativeElement.contains(event.target);

    if (!clickedInsideBusinessMenu) {
      this.businessMenuOpen = false;
    }

    // user menu
    const clickedInsideUserMenu =
      this.userMenu.nativeElement.contains(event.target);

    if (!clickedInsideUserMenu) {
      this.userMenuOpen = false;
    }
  }
}
