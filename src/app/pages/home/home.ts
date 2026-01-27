import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  cards = [
    { title: '用 LINE@ 就能預約', description: '預約不用另外下載任何APP，用LINE就能快速完成資料變更、快速報價、機場接送與其他接送、包車服務預約。', button: '加入LINE@' },
    { title: '全台四大機場接送服務', description: '我們提供桃園機場、松山機場、台中清泉崗和高雄小港機場 深夜尖峰時段皆不加價的接送預約服務。' , button:'線上預約'},
    { title: '出發前 24H 自由取消', description: '您可以隨時自行按鈕取消預約，不用透過客服協助處哩，無條件退款已消費金額點數。', button: '預約注意事項' },
  ];

  newsCards = [
    { title: 'YUBAS機場接送｜桃園機場優惠700元起｜24H線上預約價格、優惠碼',
      description: `
      不論是出國旅遊、商務行程，或清晨、深夜航班，機場交通往往是行程中最需要事先規劃的一環。
      相較臨時叫車或多次轉乘，大多數旅客會選擇事先預約機場接送，
      確保能準時抵達、行李搬運也更輕鬆。YUBAS機場接送 提供全台多條熱門路線的機場接送服務，涵蓋 桃園國際機場、臺北松山機場、臺中清泉崗機場 與 高雄小港機場，
      可依出發地與需求選擇合適車型與時段。此外，平台也不定期整理可於預約時使用的機場接送優惠碼，讓旅客在安排行程的同時，也能更彈性控制交通預算。`,
      imageUrl: 'https://static.wixstatic.com/media/9e5814_8844ad495f564778b196944abe9b1bd8~mv2.png/v1/fill/w_671,h_378,fp_0.50_0.50,lg_1,q_95,enc_avif,quality_auto/9e5814_8844ad495f564778b196944abe9b1bd8~mv2.png'
    },
    { title: '半夜怎麼去機場最安全？紅眼班機族最後都選這一種方式',
      description: `
      選擇紅眼班機雖然能省下不少機票預算，但真正讓人頭痛的，往往不是行李數量或趕著時間報到，
      而是「半夜到底該怎麼去機場？」捷運停駛、晚班客運發車時間少，計程車又讓人擔心安全與價格問題，尤其是女性、長輩或帶小孩的旅客，更不敢冒險。`,
      imageUrl:'https://static.wixstatic.com/media/9e5814_9c01d222d88b4f90a7453f349ad55296~mv2.webp/v1/fill/w_800,h_449,al_c,q_90,enc_avif,quality_auto/9e5814_9c01d222d88b4f90a7453f349ad55296~mv2.webp'
    },
    { title: '機場接送價格怎麼算？2026 最新行情與實際費用查詢',
      description: `
      在規劃出國或返國行程時，「機場接送價格」往往是最多人搜尋、也最容易產生疑問的資訊之一。不少網站會直接列出價目表，但實際預約時卻發現金額不同，讓人不確定到底行情該怎麼看才準。
      事實上，機場接送價格並不是固定一個數字，而是依照明確的計算邏輯而來。只要先了解市場行情區間，再搭配即時報價確認實際條件，就能避免價格落差，也更安心。
      這篇文章會先說明目前市場上的機場接送價格行情，並以桃園機場接送為主要範例，最後教你如何快速查詢符合自己條件的實際費用。`,
      imageUrl:'https://static.wixstatic.com/media/9e5814_6a2c370a89424e8bb4ca5e196b20bff8~mv2.jpg/v1/fill/w_1172,h_660,fp_0.50_0.50,q_90,enc_avif,quality_auto/9e5814_6a2c370a89424e8bb4ca5e196b20bff8~mv2.jpg'
    },
  ];

  reserveCards = [
    { title: '步驟一 註冊實名會員',
      description: '登入會員專區成為YUBAS會員',
      imageUrl: 'https://static.wixstatic.com/media/9e5814_b8fa7df6849e46f78f6705696a939bf3~mv2.jpg/v1/crop/x_225,y_225,w_591,h_591/fill/w_200,h_200,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/9e5814_b8fa7df6849e46f78f6705696a939bf3~mv2.jpg'
    },
    { title: '步驟二 填寫預約資料',
      description: '填寫接送地址時間及預約資訊',
      imageUrl:'https://static.wixstatic.com/media/9e5814_96b5e54651664d62ac89a784a36842bc~mv2.jpg/v1/crop/x_171,y_219,w_591,h_591/fill/w_200,h_200,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E6%B4%BB%E5%8B%95%20(2).jpg'
    },
    { title: '步驟三 完成付費',
      description: '線上轉帳付費確認預約訂單完成',
      imageUrl:'https://static.wixstatic.com/media/9e5814_aa149add03eb468ca1989ec03c85f51f~mv2.jpg/v1/crop/x_253,y_253,w_533,h_533/fill/w_200,h_200,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E6%B4%BB%E5%8B%95%20(3).jpg'
    },
    { title: '步驟四 等候出發',
      description: '出發前會有 LINE、SMS簡訊通知',
      imageUrl:'https://static.wixstatic.com/media/9e5814_ed4c70e1d62a4e4190698f28993ad9f0~mv2.jpg/v1/crop/x_189,y_189,w_662,h_662/fill/w_200,h_200,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E6%B4%BB%E5%8B%95.jpg'
    },
  ];

  textContent = `YUBAS 提供 五人座、七人座、九人座 多種車型選擇，
  個人出行、家庭旅遊，或多人團體行程，都能依實際人數與行李需求彈性安排。
  所有車輛皆定期保養、內裝整潔，並經由審核之專業駕駛服務，
  行程事前報價清楚透明，讓每一趟移動都舒適、安全且無後顧之憂。`;
}
