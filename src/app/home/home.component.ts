import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';

import { UserService } from '../core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  selectedPlace!: string;
  places: string[] = ['Beaches', 'Mountains', 'Cultural'];

  constructor(
    private router: Router,

    private userService: UserService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.userService.isAuthenticated.subscribe((authenticated) => {
      this.isAuthenticated = authenticated;
    });
  }

  getDescription(place: string): string {
    // Add your descriptions for each place
    switch (place) {
      case 'Beaches':
        return 'Experience the tranquility and beauty of sandy beaches, where you can relax and enjoy the sun and sea.';
      case 'Mountains':
        return 'Embark on thrilling adventures amidst majestic mountains, offering breathtaking views and serenity.';
      case 'Cultural':
        return 'Immerse yourself in the vibrant cultures and traditions, visiting historical landmarks and engaging in local customs.';
      default:
        return '';
    }

    function onPlaceSelected(): void {}
  }

  isAuthenticated!: boolean;
  // listConfig: ArticleListConfig = {
  //   type: 'all',
  //   filters: {},
  // };
  // tags: Array<string> = [];
  // tagsLoaded = false;

  //   this.userService.isAuthenticated.subscribe((authenticated) => {
  //     this.isAuthenticated = authenticated;

  //     // set the article list accordingly
  //     if (authenticated) {
  //       this.setListTo('feed');
  //     } else {
  //       this.setListTo('all');
  //     }
  //     this.cd.markForCheck();
  //   });
}

// function onPlaceSelected() {
//   throw new Error('Function not implemented.');
// }
// trackByFn(index: any, item: any) {
//   return index;
// }

// setListTo(type: string = '', filters: Object = {}) {

//   if (type === 'feed' && !this.isAuthenticated) {
//     this.router.navigateByUrl('/login');
//     return;
//   }

//   this.listConfig = { type: type, filters: filters };
// }
