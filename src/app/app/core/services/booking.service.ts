import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { IBooking } from '../models';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private api: ApiService) {}

  bookNow(bookingInfo: IBooking): Observable<any> {
    return this.api.post('/booking', { booking: bookingInfo });
  }

  getAllBookingsByUserId(userId: string): Observable<IBooking[]> {
    return this.api.get(`/booking/${userId}`);
  }
}
