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
  activityDatasource!: any;
  overviewDatasource!: any;
  constructor(private route: ActivatedRoute, private homeSvc: HomeService) {
    this.locationId = this.route.snapshot.params['locationId'] ?? '';
  }
  ngOnInit(): void {
    this.homeSvc.getLocationById(this.locationId).subscribe({
      next: (data) => {
        this.locationDetails = data;
        this.overviewTab();
        this.activityTab();
      },
      error: (error) => {},
    });
  }

  overviewTab() {
    this.overviewDatasource = [
      { key: 'Description', value: this.locationDetails.description },
      { key: 'Country', value: this.locationDetails.country },
      { key: 'State', value: this.locationDetails.state },
      { key: 'City', value: this.locationDetails.city },
    ];
  }
  activityTab() {
    this.activityDatasource = [
      {
        key: 'Activities',
        value: this.locationDetails.activities
          .map((ele) => {
            return ele.type;
          })
          .join(', '),
      },
    ];
  }
}
