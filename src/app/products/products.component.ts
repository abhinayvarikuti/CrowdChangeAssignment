import { Component, OnInit,Input,OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  Products:any ;
  FilteredProducts : any[] = [];
  DropDownText :string = '';
  Categories:any;

  @Input() SelectedCategory :any = -1;
  @Input() SelectedRating : any= -1;
  topfilters:any=[
    {id:1,name:'Oldest'},
    {id:2,name:'Newest'}

  ]
  constructor(private httpClient : HttpClient) {

   }

  ngOnInit(): void {
    /*
      Retriving products data from products json

    */


    this.httpClient.get("assets/json/products.json").subscribe(data =>{
      this.Products = data;
      this.FilteredProducts = [...this.Products]
    })

    /*
      Retriving products data from categories json

    */

    this.httpClient.get("assets/json/categories.json").subscribe(data =>{
      this.Categories = data;
    })
  }



  ngOnChanges(changes:SimpleChanges){

     /*
      On change of category and rating filter this below code filters the products

    */


    if(this.SelectedCategory == -1 && this.SelectedRating==-1 ){
      this.FilteredProducts = [...this.Products]
    }
    else if(this.SelectedCategory != -1 && this.SelectedRating==-1 )
    {
      let index = [...this.Categories].findIndex(ele=>{
        return ele.id==this.SelectedCategory
      })
      this.FilteredProducts = [...this.Products].filter(ele=>{
        return  ele.categories.includes(this.Categories[index].name) 
      })
    }
    else if(this.SelectedCategory == -1 && this.SelectedRating!=-1 ){
      this.FilteredProducts = [...this.Products].filter(ele=>{
        return  ele.rating >= this.SelectedRating;
      })
    }
    else{
      let index = [...this.Categories].findIndex(ele=>{
        return ele.id==this.SelectedCategory
      })
      this.FilteredProducts = [...this.Products].filter(ele=>{
        return  ele.categories.includes(this.Categories[index].name)&&  ele.rating >= this.SelectedRating
      })
    }
  }

  sortProducts(id:any,name:any){

     /*
      On drop down change sort the products 

    */

    this.DropDownText = name;
    if(id == 1){
     this.FilteredProducts.sort((a,b) => new Date(a.created_at).getTime()- new Date(b.created_at).getTime());

    }
    else{
      this.FilteredProducts.sort((a,b) => new Date(b.created_at).getTime()- new Date(a.created_at).getTime());

    }
  }

}
