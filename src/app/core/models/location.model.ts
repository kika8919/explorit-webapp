export interface Location {
  _id: string;
  area: string;
  city: string;
  desciption: string;
  state: string;
  country: string;
  images: string[];
  lnglat: { lng: number; lat: number };
  activities: any[];
}
