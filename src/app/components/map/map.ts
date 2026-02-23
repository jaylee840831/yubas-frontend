import { Component, Input, AfterViewInit } from '@angular/core';
import polyline from '@mapbox/polyline';

declare let L: any;

export interface LatLng {
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class Map implements AfterViewInit {
  @Input() coords!: number[][];
  // @Input() start!: LatLng;
  // @Input() end!: LatLng;

  private routeGroup: any;
  private map: any;
  private apiKey = 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjAwYWVlN2YxZWVmYTQzNDc5MTRiOTM4NGNiNDcyYjBkIiwiaCI6Im11cm11cjY0In0=';

  ngAfterViewInit() {
    this.initMap();
  }

  private initMap() {
    this.map = L.map('map').setView([25.0330, 121.5654], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    // 建立圖層群組
    this.routeGroup = L.layerGroup().addTo(this.map);
  }

  // 畫路徑在map
  public drawRoute(coords: number[][]) {
    if (!coords || coords.length < 2) return;

    this.routeGroup.clearLayers();

    const url = 'https://api.openrouteservice.org/v2/directions/driving-car';

    fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': this.apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        coordinates: coords
      })
      })
      .then(res => res.json())
      .then(data => {
        if (!data.routes[0].geometry) {
          console.error('沒有 geometry 資料', data);
          return;
        }

        // 將 encoded polyline 解碼成 [lat, lng] 陣列
        const routeCoords = polyline.decode(data.routes[0].geometry); // [[lat, lng], ...]
        
        const routeLine = L.polyline(routeCoords, {
          color: 'blue',
          weight: 5
        });

        this.routeGroup.addLayer(routeLine);

        // 為所有點加標記
        coords.forEach((point, index) => {
          const lat = point[1];
          const lng = point[0];
          const text = index === 0 ? '起點' 
                    : index === coords.length - 1 ? '終點'
                    : `中途點 ${index}`;
          this.routeGroup.addLayer(
            L.marker([lat, lng]).bindTooltip(text, {
              permanent: true,      // 永久顯示
              direction: 'top',
              offset: [-15, -10],
              className: 'always-label'
            })
          );
        });

        this.map.fitBounds(routeLine.getBounds());
      })
      .catch(err => console.error('路線取得失敗', err));
    }
}
