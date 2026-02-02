import { Component, Input, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-custom-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-slider.html',
  styleUrls: ['./custom-slider.css']
})
export class CustomSlider implements OnInit, OnDestroy {
  @Input() arrowShow = false;
  @Input() slides: any[] = [];
  @Input() templates: any[] = [];

  currentIndex = 0;
  sub?: Subscription;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.sub = interval(5000).subscribe(() => this.next());
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.cdr.detectChanges();
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.cdr.detectChanges();
  }
}
