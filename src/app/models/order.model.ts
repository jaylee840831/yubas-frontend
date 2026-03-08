export interface CarType {
  image: string;
  title: string;
  description: string;
  price: number;
}

export interface PaymentInfo {
  label: string;
  value: string;
}

export interface BillInfo {
  number: string;
  company: string;
  address: string;
}

export interface LocationItem {
  name: string;
  lat: number;
  lng: number;
}
