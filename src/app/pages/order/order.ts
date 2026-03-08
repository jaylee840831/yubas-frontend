import { Component, ViewChild, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormArray,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { MatStepperModule, MatStepper } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { Map } from '../../components/map/map';
import { CarSelector } from '../../components/car-selector/car-selector';
import { PaymentSelector } from '../../components/payment-selector/payment-selector';
import { Bill } from '../../components/bill/bill';
import { CustomDialog } from '../../components/custom-dialog/custom-dialog';
import { CommonModule } from '@angular/common';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BillInfo, CarType, LocationItem, PaymentInfo } from '../../models/order.model';

// 驗證時間
export const timeRangeValidator: ValidatorFn = (
  group: AbstractControl,
): ValidationErrors | null => {
  const rideTime = group.get('rideTime')?.value;
  const endTime = group.get('endTime')?.value;

  if (!rideTime) return null;

  const ride = new Date(rideTime);

  const now = new Date();
  now.setSeconds(0);
  now.setMilliseconds(0);

  // 開始時間不能早於現在
  if (ride < now) {
    return { rideTimePast: true };
  }

  // 開始時間不能晚於結束時間
  if (endTime) {
    const end = new Date(endTime);
    if (ride >= end) {
      return { timeRangeInvalid: true };
    }
  }

  return null;
};

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatStepper,
    Map,
    CarSelector,
    PaymentSelector,
    Bill,
  ],
  templateUrl: './order.html',
  styleUrl: './order.css',
})
export class Order implements OnInit {
  TYPE_AIRPORT = 'airport';
  TYPE_CITY = 'city';
  TYPE_CHARTER = 'charter';
  TYPE_LINE = 'line';

  @ViewChild(Map) mapComponent!: Map;

  isLocating = false;
  bookingForm!: FormGroup;
  price: number | null = null;
  currentFormType = 'airport';

  charterTimes = [
    { value: 4, label: '4小時' },
    { value: 8, label: '8小時' },
    { value: 12, label: '12小時' },
  ];

  locations: LocationItem[] = [
    {
      name: '目前位置',
      lat: 0,
      lng: 0,
    },
    {
      name: '桃園國際機場 第一航廈(TPE)',
      lat: 25.081515816647617,
      lng: 121.23910878868612,
    },
    {
      name: '桃園國際機場 第二航廈(TPE)',
      lat: 25.077077463138977,
      lng: 121.2324074293579,
    },
    {
      name: '台北松山機場(TSA)',
      lat: 25.0697,
      lng: 121.5526,
    },
    {
      name: '台中清泉崗機場(RMQ)',
      lat: 24.256416561710555,
      lng: 120.6007469029024,
    },
    {
      name: '高雄小港機場(KHH)',
      lat: 22.5771,
      lng: 120.3495,
    },
  ];

  filteredPickupOptions!: Observable<LocationItem[]>;
  filteredDropoffOptions!: Observable<LocationItem[]>;
  filteredWaypointsOptions: Observable<LocationItem[]>[] = [];

  constructor(
    private fb: FormBuilder,
    private zone: NgZone,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) {
    this.bookingForm = this.fb.group(
      {
        pickup: ['', Validators.required],
        dropoff: ['', Validators.required],
        waypoints: this.fb.array([]), // 中途停靠點
        airplaneNumber: ['', Validators.required],
        note: ['', Validators.required],
        charterTime: [8, Validators.required], // 包車時長
        rideTime: ['', Validators.required], // 開始時間
        endTime: ['', Validators.required], // 結束時間
        adults: [1],
        children: [0],
        childSeat: [0],
        boosterSeat: [0],
        meetAndGreet: [''],
        luggage20: [0],
        luggage24: [0],
        luggage28: [0],
        specialRequests: [''], // 備註
        carType: [null], // 選擇車型
        payment: [null], // 付款方式
        bill: [null], // 發票
      },
      { validators: timeRangeValidator },
    );
  }

  get waypoints() {
    return this.bookingForm.get('waypoints') as FormArray;
  }

  get pickup() {
    return this.bookingForm.get('pickup')?.value;
  }

  get dropoff() {
    return this.bookingForm.get('dropoff')?.value;
  }

  onCarSelected(car: CarType) {
    // console.log('選擇車型:', car);
    this.bookingForm.patchValue({
      carType: car,
    });
  }

  onPaymentSelected(method: PaymentInfo) {
    // console.log('付款方式:', method);
    this.bookingForm.patchValue({
      payment: method,
    });
  }

  onBillChange(bill: BillInfo) {
    // console.log('發票資訊:', bill);
    this.bookingForm.patchValue({
      bill: bill,
    });
  }

  onLocationSelect(option: any, event: any) {
    if (!event.isUserInput) return;

    // console.log('選擇地點:', option.name);

    if (option.name === '目前位置') {
      this.requestLocation();
    }
  }

  // 開啟gps定位
  async requestLocation() {
    if (!navigator.geolocation) {
      alert('您的瀏覽器不支援定位功能');
      return;
    }

    const allow = await this.dialog
      .open(CustomDialog, {
        panelClass: 'dark-dialog',
        data: {
          title: '取得定位',
          message:
            '我們需要您的 GPS 定位來填入目前位置，請確認已開啟手機定位服務。\n\n' +
            '請到手機設定中開啟定位權限。\n' +
            'iPhone：設定 → Safari → 位置 → 允許\n' +
            'Android：設定 → 位置 → 開啟',
        },
        disableClose: true, // 點背景不會關閉
      })
      .afterClosed()
      .toPromise();

    if (!allow) return;

    this.isLocating = true;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        this.zone.run(() => {
          this.locations = [
            {
              name: '目前位置',
              lat: lat,
              lng: lng,
            },
            ...this.locations.filter((loc) => loc.name !== '目前位置'),
          ];

          this.bookingForm.get('pickup')?.updateValueAndValidity();
          this.bookingForm.get('dropoff')?.updateValueAndValidity();
          this.bookingForm.get('waypoints')?.updateValueAndValidity();

          this.isLocating = false;
        });
      },

      (error) => {
        this.zone.run(() => {
          this.isLocating = false;
        });

        this.handleLocationError(error);
      },

      {
        enableHighAccuracy: true, // 高精度
        timeout: 15000,
        maximumAge: 0, // 不使用快取
      },
    );
  }

  handleLocationError(error: GeolocationPositionError) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert(
          '您已拒絕定位權限。\n\n' +
            '請到手機設定中開啟定位權限。\n\n' +
            'iPhone：設定 → Safari → 位置 → 允許\n' +
            'Android：設定 → 位置 → 開啟',
        );
        break;
      case error.POSITION_UNAVAILABLE:
        alert('目前無法取得定位，請確認手機定位服務已開啟。');
        break;
      case error.TIMEOUT:
        alert('定位逾時，請在空曠處再試一次。');
        break;
      default:
        alert('定位發生未知錯誤。');
    }
  }

  // 不同種類的表單, 移除不需要的欄位驗證
  removeUnusedFieldValidations() {
    if (this.currentFormType === this.TYPE_AIRPORT) {
      this.bookingForm.get('charterTime')?.clearValidators();
      this.bookingForm.get('endTime')?.clearValidators();
      this.bookingForm.get('note')?.clearValidators();
    }
    if (this.currentFormType === this.TYPE_CITY) {
      this.bookingForm.get('charterTime')?.clearValidators();
      this.bookingForm.get('endTime')?.clearValidators();
      this.bookingForm.get('note')?.clearValidators();
      this.bookingForm.get('airplaneNumber')?.clearValidators();
    }
    if (this.currentFormType === this.TYPE_CHARTER) {
      this.bookingForm.get('airplaneNumber')?.clearValidators();
    }

    this.bookingForm.get('charterTime')?.updateValueAndValidity();
    this.bookingForm.get('endTime')?.updateValueAndValidity();
    this.bookingForm.get('note')?.updateValueAndValidity();
    this.bookingForm.get('airplaneNumber')?.updateValueAndValidity();
  }

  // 驗證失敗的欄位顯示紅框
  isInvalid(controlName: string): boolean {
    const control = this.bookingForm.get(controlName);

    // 驗證時間
    if (controlName === 'rideTime') {
      if (this.bookingForm.hasError('rideTimePast')) {
        return true;
      }
    }

    if (controlName === 'rideTime' || controlName === 'endTime') {
      if (this.bookingForm.hasError('timeRangeInvalid')) {
        return true;
      }
    }

    return !!(control?.invalid && (control.dirty || control.touched));
  }

  // 前往步驟二
  goToStep2(stepper: MatStepper) {
    this.removeUnusedFieldValidations();

    // 驗證表單資料
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      return;
    } else {
      const coords: number[][] = [];

      // 起點
      const pickup = this.getLocation(this.bookingForm.value.pickup);
      if (pickup) coords.push([pickup.lng, pickup.lat]);

      // 中途點
      this.bookingForm.value.waypoints.forEach((name: string) => {
        const wp = this.getLocation(name);
        if (wp) coords.push([wp.lng, wp.lat]);
      });

      // 終點
      const dropoff = this.getLocation(this.bookingForm.value.dropoff);
      if (dropoff) coords.push([dropoff.lng, dropoff.lat]);

      // 傳給 map 元件畫路徑, 前往訂單下一步驟
      if (coords.length >= 2) {
        // console.log('送出座標', coords);
        this.mapComponent.drawRoute(coords);
        stepper.next();
      }
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      // console.log(params['type']);
      this.currentFormType = params['type'];
    });

    this.filteredPickupOptions = this.bookingForm.get('pickup')!.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return this._filter(name || '');
      }),
    );

    this.filteredDropoffOptions = this.bookingForm.get('dropoff')!.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return this._filter(name || '');
      }),
    );
  }

  private getLocation(name: string) {
    return this.locations.find((loc) => loc.name === name);
  }

  private _filter(value: any): LocationItem[] {
    const filterValue =
      typeof value === 'string' ? value.toLowerCase() : value?.name?.toLowerCase() || '';

    return this.locations.filter((option) => option.name.toLowerCase().includes(filterValue));
  }

  // 計數器(加)
  increment(field: string) {
    const value = this.bookingForm.get(field)?.value || 0;
    this.bookingForm.get(field)?.setValue(value + 1);
  }

  // 計數器(減)
  decrement(field: string) {
    const value = this.bookingForm.get(field)?.value || 0;
    if (value > 0) {
      this.bookingForm.get(field)?.setValue(value - 1);
    }
  }

  // 新增中途停靠點
  addWaypoint() {
    if (this.waypoints.length < 3) {
      const control = this.fb.control('');

      this.waypoints.push(control);

      this.filteredWaypointsOptions.push(
        control.valueChanges.pipe(
          startWith(''),
          map((value) => this._filter(value)),
        ),
      );
    }
  }

  // 刪除中途停靠點
  removeWaypoint(index: number) {
    this.waypoints.removeAt(index);
    this.filteredWaypointsOptions.splice(index, 1);
  }
}
