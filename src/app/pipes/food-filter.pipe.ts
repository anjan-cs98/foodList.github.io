import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'foodFilter'
})
export class FoodFilterPipe implements PipeTransform {

  transform(foodList:any,searchedFood:any):any{

    let sItems=foodList.filter((item:any)=>{
       return (item.food_name.toLowerCase().trim().includes(searchedFood.toLowerCase()));
    })
    return sItems;
  }

}
