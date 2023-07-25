import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  BookingService,
  IBooking,
  IHotel,
  User,
  UserService,
} from 'src/app/core';

@Component({
  selector: 'app-booking-preview',
  templateUrl: './booking-preview.component.html',
  styleUrls: ['./booking-preview.component.scss'],
})
export class BookingPreviewComponent implements OnInit {
  currUser!: User;
  isLinear = true;
  adultCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  minDate: Date;
  totalCost: Number = 0;
  durationOfStay = new FormGroup({
    start: new FormControl<Date | null>(null, Validators.required),
    end: new FormControl<Date | null>(null, Validators.required),
  });
  secondFormGroup = new FormGroup({
    headCount: new FormControl<number>(1, [
      Validators.required,
      Validators.min(1),
      Validators.max(10),
    ]),
  });
  thirdFormGroup = new FormGroup({
    contactNo: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{10}'),
    ]),
    email: new FormControl<string>('', [Validators.email]),
  });

  constructor(
    private dialogRef: MatDialogRef<BookingPreviewComponent>,
    private bookingSvc: BookingService,
    private userSvc: UserService,
    @Inject(MAT_DIALOG_DATA) public data: { hotel: IHotel }
  ) {
    this.minDate = new Date();
  }

  ngOnInit(): void {
    this.currUser = this.userSvc.getCurrentUser();
  }

  calcTotalCost() {
    this.totalCost =
      +this.data.hotel.price *
      Math.ceil(+this.secondFormGroup.controls.headCount.value! / 2) *
      ((+this.durationOfStay.controls.end.value! -
        +this.durationOfStay.controls.start.value!) /
        1000 /
        3600 /
        24);
  }

  confirmBooking() {
    const stayDates = {
      end: this.durationOfStay.controls.end.value?.toISOString()!,
      start: this.durationOfStay.controls.start.value?.toISOString()!,
    };
    const bookingInfo: IBooking = {
      hotel: this.data.hotel._id,
      userEmail: this.currUser.email,
      contactPhoneNumber: this.thirdFormGroup.controls.contactNo.value!,
      contactEmail: this.thirdFormGroup.controls.email.value,
      dates: stayDates,
      pricePerNightAtBooking: this.data.hotel.price,
      totalCost: this.totalCost.toString(),
      noOfPeople: this.secondFormGroup.controls.headCount.value!,
    };
    this.bookingSvc.bookNow(bookingInfo).subscribe({
      next: (data) => {
        if (data.status == 'success') {
          this.dialogRef.close(data);
        }
      },
      error: (err) => {
        this.dialogRef.close(err);
        console.log(err);
      },
    });
  }
}
