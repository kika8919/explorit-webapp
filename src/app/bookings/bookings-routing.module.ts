import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeAuthResolver } from '../home/home-auth-resolver.service';
import { BookingsComponent } from './bookings.component';

const routes: Routes = [
  {
    path: 'bookings',
    component: BookingsComponent,
    resolve: {
      isAuthenticated: HomeAuthResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingsRoutingModule {}
