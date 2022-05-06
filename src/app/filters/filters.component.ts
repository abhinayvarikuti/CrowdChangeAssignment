import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  Categories : any;
  SelectedCategoryFilter:any = -1;
  SelectedRatingFilter:any = -1;
  RatingFilters : any[]=[
    {
      id:5,
      name:'5.0'
    },
    {
      id:4,
      name:'4.0'
    }
    ,{
      id:3,
      name:'3.0'
    },
    {
      id:2,
      name:'2.0'
    },{
      id:1,
      name:'1.0'
    }
  ]
  @Output() EmitSelectedCategory = new EventEmitter<Number>();
  @Output() EmitSelectedRating = new EventEmitter<Number>();
   constructor(private httpClient : HttpClient) { }

  ngOnInit(): void {

    /*
    Fetching Categories data from categories json file
    */

    this.httpClient.get("assets/json/categories.json").subscribe(data =>{
      this.Categories = data;
    })
    
  }

  onCheck(event:any,i:any){
   /*
   On Click of any check box of categories we are assigning the value to a variable to be passed across components
   */
    if(!event.target.checked){
      this.SelectedCategoryFilter = -1;
    }
    else{
      this.SelectedCategoryFilter = i;
    }
    this.EmitSelectedCategory.emit(this.SelectedCategoryFilter)
  }

  onRatingCheck(event:any,i:any){
      /*
   On Click of any check box of ratings we are assigning the value to a variable to be passed across components
   */
    if(!event.target.checked){
      this.SelectedRatingFilter = -1;
    }
    else{
      this.SelectedRatingFilter = i;
    }
    this.EmitSelectedRating.emit(this.SelectedRatingFilter)
  }

  counter(i: number) {
    /*
    This function returns an array of particular length
    */
    return new Array(i);
  }
}


