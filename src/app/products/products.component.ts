import { Component, OnInit,Input, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../services/common.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  Products:any;
  FilteredProducts : any[] = [];
  DropDownText :string = '';
  Categories:any;
  imageUrl = '../../assets/images/';
  a: any[]=[];
  b:any[]=[];
  lenArray:[]=[];
  selecteditem:any
  selectedRatings:any
  result:any
  resultInfo:any
  // @Input() a=[];
  @Input() SelectedCategory :any;
  @Input() SelectedRating : number= -1;
  topfilters:any=[
    {id:1,name:'Oldest'},
    {id:2,name:'Newest'}

  ]
  index: any;
  cat ='';
  rat ='';
  rating = '';
  cating= '';
  c: any;
  rateData: any[] =[];
  constructor(private httpClient : HttpClient,private commonService: CommonService) {}

  ngOnInit(): void {
    /*
      Retriving products data from products json

    */
      this.httpClient.get("assets/json/products.json").subscribe(data =>{
        this.Products = data;
        this.FilteredProducts = [...this.Products]
      })
      this.httpClient.get("assets/json/categories.json").subscribe(data =>{
        this.Categories = data;
      })
       this.commonService.selectedArray.subscribe(data =>{
        this.selecteditem = data;
        this.a = []
        this.FilteredProducts = [];
        if(this.selecteditem === undefined || this.selecteditem.length === 0){
          this.cat = 'false'
          this.cating = 'false'
          this.FilteredProducts = [...this.Products];
      
        }
        if(this.selecteditem.length> 0) {
          this.cat = 'true'
          this.selecteditem.forEach((data:any) =>{
            this.index = [...this.Categories].findIndex(ele=>ele.id === data);
            this.a.push([...this.Products].filter(x=>x.categories.includes(this.Categories[this.index].name)))
        })
        this.FilteredProducts = [...this.a]
        this.FilteredProducts  = this.FilteredProducts.flat();
        this.result = this.FilteredProducts.filter((obj, index, self) =>
        index === self.findIndex((o) => o.id === obj.id)
        );
        this.FilteredProducts = this.FilteredProducts.filter((obj, index, self) =>
        index === self.findIndex((o) => o.id === obj.id)
        );
       this.get(this.result,this.resultInfo)
        }
       
      })
      this.commonService.selectedArrayRatings.subscribe(data =>{
        this.b=[];
        this.selectedRatings = data
        this.FilteredProducts = [];
        if(this.selectedRatings === undefined || this.selectedRatings.length === 0){
          this.rat = 'false';
          this.rating = 'false';
          this.FilteredProducts = [...this.Products];
        }
        if(this.selectedRatings.length > 0){
          this.rat = 'true';
          this.selectedRatings.forEach((data:any) =>{
            var min = data;  var max = parseInt(min) + 0.9;
            this.b.push([...this.Products].filter(x=> x.rating >= min && x.rating <= max))
          })
          this.FilteredProducts = [...this.b];
          this.FilteredProducts  = this.FilteredProducts.flat();
          this.resultInfo = [...this.b].flat();
        }
        this.get(this.result,this.resultInfo)
      })
    /*
      Retriving products data from categories json

    */

   
  }

  get(val?: any,data? : any){
    if(this.cat === 'true' && this.rat === 'true'){
      this.FilteredProducts = val.filter((item1:any) =>
      data.some((item2:any) => item2.id === item1.id)
    );
    }
    else if(this.rating === 'false' && this.cat === 'true'){
      this.FilteredProducts = val
    }
    else if(this.cating === 'false' && this.rat === 'true'){
      this.FilteredProducts = data
    }
    else if(this.rat === 'false' && this.cating === 'false'){
      this.FilteredProducts = [...this.Products];
    }

  }

  ngOnChanges(changes:SimpleChanges){
  }

  sortProducts(id:any,name:any){

     /*
      On drop down change sort the products 

    */

    this.DropDownText = name;
    if(id === 1){
     this.FilteredProducts.sort((a,b) => new Date(a.created_at).getTime()- new Date(b.created_at).getTime());

    }
    else{
      this.FilteredProducts.sort((a,b) => new Date(b.created_at).getTime()- new Date(a.created_at).getTime());

    }
  }

}
