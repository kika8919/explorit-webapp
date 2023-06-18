import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Category, Location } from '../models';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private api: ApiService) {}

  getCategories(): Observable<Category[]> {
    return this.api.get('/home/category');
  }

  getLocationByCategoryId(categoryId: string): Observable<Location[]> {
    return this.api.get(`/home/category/${categoryId}`) as Observable<
      Location[]
    >;
  }

  getLocationById(locationId: string): Observable<Location> {
    return this.api.get(`/home/location/${locationId}`) as Observable<Location>;
  }
}
