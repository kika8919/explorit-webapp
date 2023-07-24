import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Category, ILocation, IHotel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private api: ApiService) {}

  getCategories(): Observable<Category[]> {
    return this.api.get('/home/category');
  }

  getLocationByCategoryId(categoryId: string): Observable<ILocation[]> {
    return this.api.get(`/home/category/${categoryId}`) as Observable<
      ILocation[]
    >;
  }

  getLocationById(locationId: string): Observable<ILocation> {
    return this.api.get(
      `/home/location/${locationId}`
    ) as Observable<ILocation>;
  }

  getHotelsByLocationId(locationId: string): Observable<IHotel[]> {
    return this.api.get(`/home/hotels/${locationId}`) as Observable<IHotel[]>;
  }
}
