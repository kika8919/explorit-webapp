import { Image } from './image.model';

export interface IHotel {
  _id: string;
  distanceFromCity: string;
  name: string;
  checkIn: string;
  description: string;
  checkOut: string;
  contact: string;
  images: Image[];
  lnglat: { lng: number; lat: number };
  email: string;
  starRating: number;
  price: string;
  amenities: string[];
  customerRatings: number;
  locationId: string;
  showTabs?: boolean;
  activeTab?: number;
}
