import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { BookingsComponent } from './bookings.component';
import { BookingsRoutingModule } from './bookings-routing.module';

@NgModule({
  imports: [SharedModule, BookingsRoutingModule],
  declarations: [BookingsComponent],
  providers: [],
})
export class BookingsModule {}
