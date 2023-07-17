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

  hotels!: IHotel[];

  constructor(private homeSvc: HomeService) {}
  ngOnInit(): void {
    this.homeSvc.getHotelsByLocationId(this.locationId).subscribe({
      next: (data) => {
        this.hotels = data;
      },
      error: (error) => {},
    });
  }

  toggleDescription(hotel: IHotel) {
    hotel.description = hotel.description;
  }

  togglePhotos(hotel: IHotel) {
    hotel.images = hotel.images;
  }
}
