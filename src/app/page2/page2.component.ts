import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component implements OnInit {

CategoryFilter : any = -1;
RatingFilter : any = -1;

  constructor() { }

  ngOnInit(): void {
    
  }
  /*
    This function assigns the emitted value of category to a variable to be passed to child component
  */

  onCategorySelect(event:any){
    this.CategoryFilter = event;
  }

  /* 
    This function assigns the emitted value of rating to a variable to be passed to child component
  */

  onRatingSelect(event:any){
    this.RatingFilter = event;
  }

}
