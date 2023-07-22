import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HomeService, IHotel, UserService } from 'src/app/core';

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
    private router: Router
  ) {}
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
  book() {
    this.authSubscription = this.userSvc.isAuthenticated.subscribe(
      (isAuthenticated) => {
        if (isAuthenticated) {
          window.alert('booking successful');
        } else {
          this.router.navigate(['/login']);
        }
      }
    );
  }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
