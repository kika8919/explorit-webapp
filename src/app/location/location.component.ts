import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService, ILocation } from '../core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  displayedColumns: string[] = ['key', 'value'];
  center!: google.maps.LatLngLiteral;
  zoom = 18;
  options: google.maps.MapOptions = {
    disableDoubleClickZoom: true,
    mapTypeId: 'hybrid',
    maxZoom: 18,
    minZoom: 15,
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_BOTTOM,
    },
  };
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
    this.center = this.locationDetails.lnglat;
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
