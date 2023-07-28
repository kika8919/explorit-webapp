import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { HomeService, IHotel, UserService } from 'src/app/core';
import { BookingPreviewComponent } from './booking-preview/booking-preview.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-hotel-lists',
  templateUrl: './hotel-lists.component.html',
  styleUrls: ['./hotel-lists.component.scss'],
})
export class HotelListsComponent implements OnInit, OnDestroy {
  @Input()
  locationId!: string;

  hotels: IHotel[] = [];
  authSubscription!: Subscription;

  constructor(
    private homeSvc: HomeService,
    private userSvc: UserService,
    private router: Router,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private breakpointObserver: BreakpointObserver
  ) {}

  isMobileView = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return true;
      }
      return false;
    })
  );

  ngOnInit(): void {
    this.homeSvc.getHotelsByLocationId(this.locationId).subscribe({
      next: (data) => {
        for (let hotel of data) {
          hotel.showTabs = false;
          this.hotels.push(hotel);
        }
      },
      error: (error) => {},
    });
  }

  showDescription(hotel: IHotel) {
    hotel.activeTab != 1 && (hotel.showTabs = !hotel.showTabs);
    hotel.activeTab = 0;
  }

  showPhotos(hotel: IHotel) {
    hotel.activeTab != 0 && (hotel.showTabs = !hotel.showTabs);
    hotel.activeTab = 1;
  }

  book(hotel: IHotel) {
    this.authSubscription = this.userSvc.isAuthenticated.subscribe(
      (isAuthenticated) => {
        if (isAuthenticated) {
          const dialogRef = this.dialog.open(BookingPreviewComponent, {
            data: { hotel },
            height: this.isMobileView ? '67%' : '85%',
            width: this.isMobileView ? '100%' : '65%',
            disableClose: true,
            panelClass: 'booking-preview',
          });

          dialogRef.afterClosed().subscribe((result) => {
            result.status === 'success' &&
              this._snackBar.open('Booking Successfull', 'Dismiss', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                duration: 5000,
              });
          });
        } else {
          this.router.navigate(['/login']);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }
}
