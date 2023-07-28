import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService, ILocation } from '../core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  displayedColumns: string[] = ['key', 'value'];
  center!: google.maps.LatLngLiteral;
  center2!: google.maps.LatLngLiteral;
  zoom = 18;
  zoom2 = 12;
  options: google.maps.MapOptions = {
    disableDoubleClickZoom: true,
    mapTypeId: 'roadmap',
    maxZoom: 18,
    minZoom: 11,
    zoomControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_BOTTOM,
    },
  };
  options2: google.maps.MapOptions = {
    disableDoubleClickZoom: true,
    mapTypeId: 'roadmap',
    maxZoom: 18,
    minZoom: 12,
    zoomControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_BOTTOM,
    },
  };
  locationId: string;
  locationDetails!: ILocation;
  markers: any[] = [];
  activityDatasource!: any;
  overviewDatasource!: any;
  constructor(
    private route: ActivatedRoute,
    private homeSvc: HomeService,
    private breakpointObserver: BreakpointObserver
  ) {
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
    this.homeSvc.getHotelsByLocationId(this.locationId).subscribe({
      next: (data) => {
        for (let hotel of data) {
          this.markers.push({
            position: hotel.lnglat,
            title: hotel.name,
            info: hotel.name,
          });
          this.center2 = hotel.lnglat;
        }
      },
      error: (error) => {},
    });
  }

  activeAccordionItems: any = {
    overview: true,
    activities: false,
    hotels: false,
    // Add more accordion items as needed
  };

  isMobileView = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return true;
      }
      return false;
    })
  );

  toggleAccordion(item: string): void {
    this.activeAccordionItems[item] = !this.activeAccordionItems[item];
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
