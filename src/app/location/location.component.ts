import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { HomeService } from '../core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  locationId: string;
  constructor(private route: ActivatedRoute, private homeSvc: HomeService) {
    this.locationId = this.route.snapshot.params['locationId'] ?? '';
  }
  ngOnInit(): void {
    this.homeSvc.getLocationById(this.locationId).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {},
    });
  }
}
