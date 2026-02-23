import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface OrderItem {
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  type: string;
}

const TYPE_AIRPORT = 'airport';
const TYPE_CITY = 'city';
const TYPE_CHARTER = 'charter';
const TYPE_LINE = 'line';

@Component({
  selector: 'app-order-type-list',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './order-type-list.html',
  styleUrl: './order-type-list.css',
})
export class OrderTypeList {
  constructor(
    private router: Router
  ) {}

  orders: OrderItem[] = [
    {
      title:'機場接送',
      description:`出發桃園機場、松山機場、清泉崗機場、高雄小港機場。AI 智慧報價，深夜凌晨不加價。`,
      imageUrl:'assets/service1.avif',
      buttonText:'預約機場接送',
      type: TYPE_AIRPORT
    },
    {
      title:'市區接駁',
      description:`專業市區接駁服務：全台高鐵站、火車站及港口接送。 支援商務接送與大件行李搬運。`,
      imageUrl:'assets/service2.avif',
      buttonText:'預約市區接駁',
      type: TYPE_CITY
    },
    {
      title:'包車服務',
      description:`客製化包車服務：提供多小時/多天台灣旅遊包車、商務考察與彈性用車。`,
      imageUrl:'assets/service3.avif',
      buttonText:'預約包車服務',
      type: TYPE_CHARTER
    },
    {
      title:'智慧客服',
      description:`LINE@植入智慧AI助手，快速報價、即時變更預約資料，提升預約舒適度。`,
      imageUrl:'assets/service_line.avif',
      buttonText:'加入LINE@',
      type: TYPE_LINE
    }
];

  go_to_booking(type: string){
    // console.log(type);

    if(type === TYPE_LINE) {
      window.open('https://page.line.me/yubas', '_blank');
    } else {
      this.router.navigate(['/booking/form'],
        {
          queryParams: {
            type: type
          }
        }
      )
    }
  }
}
