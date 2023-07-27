import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  Categories: any;
  FilteredCategories: any[] = [];
  FilteredCities: any[] = [];
  SearchText: string = '';
  SearchCityText: string = '';
  SelectedCategory: any = -1;
  SelectedCity: any = -1;
  ShowCategories: boolean = false;
  ShowCities: boolean = false;
  Cities: any[] = [
    { id: 1, name: 'New York' },
    { id: 1, name: 'Chicago' },
    { id: 1, name: 'Los Angeles' },
    { id: 1, name: 'San Franciso' },
    { id: 1, name: 'Las Vegas' },
  ];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.FilteredCities = [...this.Cities];
    /*
      retreiving categories data from json

    */
    this.httpClient.get('assets/json/categories.json').subscribe((data) => {
      console.log(data);
      this.Categories = data;
      this.FilteredCategories = [...this.Categories];
    });
  }

  /*
      This function is to open Categories dropdown

    */

  onInputClick() {
    this.ShowCategories = true;
  }

  /*
      This function is to open Cities dropdown

    */

  onCityInputClick() {
    this.ShowCities = true;
  }

  /*
      This function is to filter Categories based on Input

    */

  onSearch(event: any) {
    this.ShowCategories = true;
    this.SearchText = event?.target?.value;
    if (this.SearchText === '') {
      this.FilteredCategories = [...this.Categories];
    } else {
      this.FilteredCategories = [...this.Categories];
      this.FilteredCategories = [...this.Categories].filter((ele) => {
        return ele.name.toLowerCase().includes(this.SearchText.toLowerCase());
      });
    }
  }

  /*
      This function is to filter Cities based on Input

    */

  onCitySearch(event: any) {
    this.ShowCities = true;
    this.SearchCityText = event?.target?.value;
    if (this.SearchCityText === '') {
      this.FilteredCities = [...this.Cities];
    } else {
      this.FilteredCities = [...this.Cities];
      this.FilteredCities = [...this.Cities].filter((ele) => {
        return ele.name
          .toLowerCase()
          .includes(this.SearchCityText.toLowerCase());
      });
    }
  }

  /*
      This function selects a category and assign it to a variable
    */

  onCategorySelect(category: any) {
    this.SelectedCategory = category;
    this.SearchText = category.name;
    this.ShowCategories = false;
  }

  /*
      This function selects a city and assign it to a variable
    */

  onCitySelect(city: any) {
    this.SelectedCity = city;
    this.SearchCityText = city.name;
    this.ShowCities = false;
  }

  /*
      This function closes the city dropdown on click elsewhere than options

    */

  closeCitySearch() {
    this.ShowCities = false;
  }

  /*
      This function closes the categories dropdown on click elsewhere than options

    */

  closeCategorySearch() {
    this.ShowCategories = false;
  }
}
