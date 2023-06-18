import { NgModule } from '@angular/core';

import { LocationComponent } from './location.component';
import { SharedModule } from '../shared';
import { LocationRoutingModule } from './location-routing.module';

@NgModule({
  imports: [SharedModule, LocationRoutingModule],
  declarations: [LocationComponent],
  providers: [],
})
export class LocationModule {}
