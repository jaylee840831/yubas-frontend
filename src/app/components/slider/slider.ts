import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.html',
  styleUrls: ['./slider.css']
})
export class Slider implements OnInit, OnDestroy {
  slides = [
    {
      title: '五人座休旅車',
      subtitle: '適合1~3位搭乘',
      quotation_list:[
        {
          location:'基隆市區 - 桃園機場',
          price:'NT$1,600元起'
        },
        {
          location:'台北市區 - 桃園機場',
          price:'NT$1,200元起'
        },
        {
          location:'新竹市區 - 桃園機場',
          price:'NT$1,600元起'
        },
        {
          location:'台中市區 - 桃園機場',
          price:'NT$2,400元起'
        }
      ],
      image: 'assets/car_seat_5.avif'
    },
    {
      title: '七人座商務車',
      subtitle: '適合1~4位搭乘',
      quotation_list:[
        {
          location:'基隆市區 - 桃園機場',
          price:'NT$1,700元起'
        },
        {
          location:'台北市區 - 桃園機場',
          price:'NT$1,300元起'
        },
        {
          location:'新竹市區 - 桃園機場',
          price:'NT$1,700元起'
        },
        {
          location:'台中市區 - 桃園機場',
          price:'NT$2,800元起'
        }
      ],
      image: 'assets/car_seat_7.avif'
    },
    {
      title: '九人座商務車',
      subtitle: '適合4~8位搭乘',
      quotation_list:[
        {
          location:'基隆市區 - 桃園機場',
          price:'NT$2,000元起'
        },
        {
          location:'台北市區 - 桃園機場',
          price:'NT$1,500元起'
        },
        {
          location:'新竹市區 - 桃園機場',
          price:'NT$1,900元起'
        },
        {
          location:'台中市區 - 桃園機場',
          price:'NT$3,000元起'
        }
      ],
      image: 'assets/car_seat_9.avif'
    }
  ];

  constructor(private cdr: ChangeDetectorRef) {}

  currentIndex = 0;
  interval$?: Subscription;
  intervalVal: number=0;

  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    if(this.interval$ != null){
      this.interval$.unsubscribe();
    }
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.cdr.detectChanges();
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.cdr.detectChanges();
  }

  startAutoPlay() {
    this.stopAutoPlay();
    this.interval$ = interval(5000)
      .subscribe(res => this.nextSlide());
  }

  stopAutoPlay() {
    if(this.interval$ != null){
      this.interval$.unsubscribe();
    }
  }

  pause() {
    this.stopAutoPlay();
  }

  resume() {
    this.startAutoPlay();
  }

  // 觸控座標
  private touchStartX = 0;
  private touchEndX = 0;

  // 判斷門檻（px）
  private swipeThreshold = 50;

  onTouchStart(event: TouchEvent) {
    this.pause();
    this.touchStartX = event.touches[0].clientX;
  }

  onTouchMove(event: TouchEvent) {
    this.touchEndX = event.touches[0].clientX;
  }

  onTouchEnd() {
    const diff = this.touchStartX - this.touchEndX;

    // 左滑 → 下一張
    if (diff > this.swipeThreshold) {
      this.nextSlide();
    }

    // 右滑 → 上一張
    if (diff < -this.swipeThreshold) {
      this.prevSlide();
    }

    // 重置
    this.touchStartX = 0;
    this.touchEndX = 0;

    this.resume();
  }
}
