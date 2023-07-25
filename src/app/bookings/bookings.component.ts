import { Component, OnInit } from '@angular/core';
import { BookingService, IBooking, User, UserService } from '../core';
import * as moment from 'moment-timezone';
@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss'],
})
export class BookingsComponent implements OnInit {
  currentUser!: User;

  pastBookings: IBooking[] = [];
  upcomingBookings: IBooking[] = [];
  allBookings: IBooking[] = [];
  expandedIndex = 0;
  constructor(
    private userSvc: UserService,
    private bookingSvc: BookingService
  ) {
    this.currentUser = this.userSvc.getCurrentUser();
  }

  ngOnInit(): void {
    this.bookingSvc.getAllBookingsByEmail(this.currentUser.email).subscribe({
      next: (bookings) => {
        this.allBookings = bookings;
        this.categorizeBookings();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  categorizeBookings() {
    for (let booking of this.allBookings) {
      let momentEndDate = moment(booking.dates.end);
      if (momentEndDate.isAfter(moment.now())) {
        this.upcomingBookings.push(booking);
      } else {
        this.pastBookings.push(booking);
      }
    }
  }
}
