import { Component, OnInit } from '@angular/core';

import { Category, Errors, HomeService, UserService, ILocation } from '../core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  selectedCategory!: Category;
  categories!: Category[];
  errors!: Errors;
  isAuthenticated!: boolean;
  locations: ILocation[] = [];
  showCardGrid: boolean = false;

  constructor(private homeSvc: HomeService, private userService: UserService) {}

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
      error: (error) => {
        this.errors = { errors: error };
      },
    });
  }

  getLocations({ _id }: Category) {
    this.homeSvc.getLocationByCategoryId(_id).subscribe({
      next: (data) => {
        this.loadLocations(data);
        this.showCardGrid = true;
      },
      error: (error) => {
        this.errors = { errors: error };
      },
    });
  }

  loadLocations(locations: ILocation[]) {
    this.locations = locations;
  }
}
