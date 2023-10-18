import { Component, OnInit } from '@angular/core';
import { FoodService } from '../services/food.service';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})
export class FoodsComponent implements OnInit {
  public foodList:any=[];
  public page:number=1;
  public SearchedFood:any='';
  constructor(private fService:FoodService){}


ngOnInit(): void {
   /* Now call the populatefooods*/
   this.populateFoods();    
}


/* Populate all foodList */
populateFoods(){
    this.fService.getAllFoods().subscribe({
      next:((res:any)=>{
        console.log(res);
        this.foodList=res;
      }),
      error:((error:any)=>{
         console.log(error);
      }),
      complete:(()=>{
        console.log('API call Successfully.....');
      })
    });
}

  
}
