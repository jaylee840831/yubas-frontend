import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { CarType } from '../../models/order.model';

@Component({
  selector: 'app-car-selector',
  imports: [MatCardModule, MatRadioModule, MatButtonModule, FormsModule, CommonModule],
  templateUrl: './car-selector.html',
  styleUrl: './car-selector.css',
})
export class CarSelector {
  selectedCarIndex = 0;

  @Output() carSelected = new EventEmitter<CarType>();

  ngOnInit(): void {
    if (this.carTypes.length > 0) {
      this.carSelected.emit(this.carTypes[0]);
    }
  }

  // 選擇的車型資訊
  selectCar(index: number) {
    this.selectedCarIndex = index;
    this.carSelected.emit(this.carTypes[index]); // 傳遞到父元件
  }

  carTypes: CarType[] = [
    {
      image: 'assets/car_seat_5.avif',
      title: '五人座轎車',
      description: '搭乘空間: 3人、2件28吋行李',
      price: 1600,
    },
    {
      image: 'assets/car_seat_5.avif',
      title: '五人座休旅車',
      description: '搭乘空間: 3人、3件28吋行李',
      price: 1600,
    },
    {
      image: 'assets/car_seat_7.avif',
      title: '七人座休旅車',
      description: '搭乘空間: 4人、3件28吋行李',
      price: 1700,
    },
    {
      image: 'assets/car_seat_7.avif',
      title: '七人座商務車',
      description: '搭乘空間: 4人、4件28吋行李',
      price: 1800,
    },
    {
      image: 'assets/car_seat_9.avif',
      title: '九人座商務車',
      description: '搭乘空間: 8人、8件28吋行李',
      price: 2000,
    },
    {
      image: 'assets/car_seat_9.avif',
      title: '豪華商務車',
      description: '搭乘空間: 8人、8件30吋行李',
      price: 2300,
    },
    {
      image: 'assets/car_seat_9.avif',
      title: '尊榮商務車',
      description: '搭乘空間: 7人、7件28吋行李',
      price: 2600,
    },
    {
      image: 'assets/car_seat_5.avif',
      title: '五人座商務車',
      description: '搭乘空間: 3人、2件28吋行李',
      price: 3100,
    },
    {
      image: 'assets/car_seat_9.avif',
      title: '旗艦商務車',
      description: '搭乘空間: 4人、4件28吋行李',
      price: 4800,
    },
  ];
}
