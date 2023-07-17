import { Component, Input, OnInit } from '@angular/core';
import { HomeService, IHotel } from 'src/app/core';

@Component({
  selector: 'app-hotel-lists',
  templateUrl: './hotel-lists.component.html',
  styleUrls: ['./hotel-lists.component.scss'],
})
export class HotelListsComponent implements OnInit {
  @Input()
  locationId!: string;

  hotels: IHotel[] = [];

  constructor(private homeSvc: HomeService) {}
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
    hotel.showTabs = !hotel.showTabs;
    hotel.activeTab = 0;
  }
  showPhotos(hotel: IHotel) {
    hotel.showTabs = !hotel.showTabs;
    hotel.activeTab = 1;
  }
}
