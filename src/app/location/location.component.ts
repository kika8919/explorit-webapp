import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { HomeService, ILocation } from '../core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  displayedColumns: string[] = ['key', 'value'];
  locationId: string;
  locationDetails!: ILocation;
  dataSource!: any;
  constructor(private route: ActivatedRoute, private homeSvc: HomeService) {
    this.locationId = this.route.snapshot.params['locationId'] ?? '';
  }
  ngOnInit(): void {
    this.homeSvc.getLocationById(this.locationId).subscribe({
      next: (data) => {
        this.locationDetails = data;
        this.overviewTab();
      },
      error: (error) => {},
    });
  }

  overviewTab() {
    console.log(this.locationDetails);
    this.dataSource = [
      { key: 'Description', value: this.locationDetails.description },
      { key: 'Country', value: this.locationDetails.country },
      { key: 'State', value: this.locationDetails.state },
      { key: 'City', value: this.locationDetails.city },
    ];
  }
}
