import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  menuOpen = false;
  blogMenuOpen = false;
  businessMenuOpen = false;
  @ViewChild('blogMenu') blogMenu!: ElementRef;
  @ViewChild('businessMenu') businessMenu!: ElementRef;
  @ViewChild('mainMenu') mainMenu!: ElementRef;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleBlogMenu(event: MouseEvent) {
    event.stopPropagation();   // 防止被 document click 關掉
    this.blogMenuOpen = !this.blogMenuOpen;
  }

  toggleBusinessMenu(e: Event) {
    e.stopPropagation();
    this.businessMenuOpen = !this.businessMenuOpen;
  }

  closeMenuAll() {
    this.menuOpen = false;
    this.blogMenuOpen = false;
    this.businessMenuOpen = false;
  }

  // 監聽整個文件的點擊
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.blogMenuOpen && !this.businessMenuOpen && !this.menuOpen) return;

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
  }
}
