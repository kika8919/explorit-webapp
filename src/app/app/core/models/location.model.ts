import { IActivity } from './activity.model';
import { Image } from './image.model';

export interface ILocation {
  _id: string;
  area: string;
  city: string;
  description: string;
  state: string;
  country: string;
  images: Image[];
  lnglat: { lng: number; lat: number };
  activities: IActivity[];
}
