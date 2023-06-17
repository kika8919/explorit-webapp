import { Activity } from './activity.model';
import { Image } from './image.model';

export interface Location {
  _id: string;
  area: string;
  city: string;
  desciption: string;
  state: string;
  country: string;
  images: Image[];
  lnglat: { lng: number; lat: number };
  activities: Activity[];
}
