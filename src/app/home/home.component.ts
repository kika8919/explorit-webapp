import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';

import { Category, HomeService, UserService } from '../core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  selectedCategory!: Category;
  categories!: Category[];

  constructor(
    private homeSvc: HomeService,
    private router: Router,
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.userService.isAuthenticated.subscribe((authenticated) => {
      this.isAuthenticated = authenticated;
    });
    this.getCategories();
  }
  getCategories() {
    this.homeSvc.getCategories().subscribe({
      next: (data) => {
        this.categories = data.map(({ _id, categoryName, description }) => {
          return { _id, categoryName, description };
        });
      },
      error: (error) => {},
    });
  }

  getLocations({ _id }: Category) {
    this.homeSvc.getLocationByCategoryId(_id).subscribe({
      next: (data) => {
        console.log(data)
      },
      error: (error) => {},
    });
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
