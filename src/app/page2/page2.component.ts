import { Component} from '@angular/core';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component {

CategoryFilter : any;
RatingFilter : number = -1;
  /*
    This function assigns the emitted value of category to a variable to be passed to child component
  */

  onCategorySelect(selectedCategory:number | any){
    this.CategoryFilter = selectedCategory;
  }

  /* 
    This function assigns the emitted value of rating to a variable to be passed to child component
  */

  onRatingSelect(selectedRating:number | any){
    this.RatingFilter = selectedRating;
  }

}
