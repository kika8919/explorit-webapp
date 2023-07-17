import { NgModule } from '@angular/core';

import { LocationComponent } from './location.component';
import { SharedModule } from '../shared';
import { LocationRoutingModule } from './location-routing.module';
import { HotelListsComponent } from './hotel-lists/hotel-lists.component';

@NgModule({
  imports: [SharedModule, LocationRoutingModule],
  declarations: [LocationComponent, HotelListsComponent],
  providers: [],
})
export class LocationModule {}
